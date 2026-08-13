import { randomUUID } from "node:crypto";
import { mkdir, writeFile } from "node:fs/promises";
import path from "node:path";

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
  const relativePath = `/articles-assets/${fileName}`;
  const targetDirectory = path.join(process.cwd(), "public", "articles-assets");
  const targetFile = path.join(targetDirectory, fileName);

  await mkdir(targetDirectory, { recursive: true });
  await writeFile(targetFile, Buffer.from(await asset.arrayBuffer()));

  return NextResponse.json({ path: relativePath });
}
