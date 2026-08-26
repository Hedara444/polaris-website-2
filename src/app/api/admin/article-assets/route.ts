import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

import { put } from "@vercel/blob";
import { NextResponse } from "next/server";

import { slugify } from "@/lib/utils";
import { requireAdminApiAccess } from "@/server/auth";

const allowedExtensions = new Set([".jpg", ".jpeg", ".webp"]);
const maxFileSizeBytes = 5 * 1024 * 1024;

export async function POST(request: Request) {
  const session = await requireAdminApiAccess(request);
  if (!session) {
    return NextResponse.json({ error: "Unauthorized." }, { status: 401 });
  }

  const formData = await request.formData();
  const asset = formData.get("file");

  if (!(asset instanceof File)) {
    return NextResponse.json({ error: "Cover image file is required." }, { status: 400 });
  }

  if (asset.size === 0) {
    return NextResponse.json({ error: "Cover image file is empty." }, { status: 400 });
  }

  if (asset.size > maxFileSizeBytes) {
    return NextResponse.json({ error: "Cover image must be 5 MB or smaller." }, { status: 400 });
  }

  const extension = path.extname(asset.name).toLowerCase();
  if (!allowedExtensions.has(extension)) {
    return NextResponse.json(
      { error: "Cover image must be a .jpg, .jpeg, or .webp file." },
      { status: 400 },
    );
  }

  if (asset.type && !asset.type.startsWith("image/")) {
    return NextResponse.json({ error: "Uploaded file must be an image." }, { status: 400 });
  }

  const baseName = path.basename(asset.name, extension);
  const safeName = slugify(baseName) || "article-cover";
  const fileName = `${safeName}-${randomUUID()}${extension}`;
  const useBlobStorage = process.env.BLOB_STORAGE_ENABLED?.trim().toLowerCase() === "true";

  if (!useBlobStorage) {
    const relativePath = `/articles-assets/${fileName}`;
    const targetDirectory = path.join(process.cwd(), "public", "articles-assets");
    const targetFile = path.join(targetDirectory, fileName);

    await mkdir(targetDirectory, { recursive: true });
    await writeFile(targetFile, Buffer.from(await asset.arrayBuffer()));

    return NextResponse.json({ path: relativePath });
  }

  if (!process.env.BLOB_READ_WRITE_TOKEN?.trim()) {
    return NextResponse.json(
      {
        error:
          "Photo storage is configured to use Vercel Blob, but BLOB_READ_WRITE_TOKEN is missing. Add the token to your local environment or set BLOB_STORAGE_ENABLED=false to store photos in public/articles-assets.",
      },
      { status: 503 },
    );
  }

  try {
    const blob = await put(`articles-assets/${fileName}`, asset, {
      access: "public",
      contentType: asset.type || `image/${extension.slice(1)}`,
      addRandomSuffix: false,
      allowOverwrite: false,
    });

    return NextResponse.json({ path: blob.url });
  } catch (error) {
    console.error("[article-assets] Vercel Blob upload failed:", error);
    return NextResponse.json(
      {
        error:
          "The photo could not be uploaded to Vercel Blob. Check that BLOB_READ_WRITE_TOKEN belongs to the correct Blob store and is available in this environment.",
      },
      { status: 502 },
    );
  }
}
