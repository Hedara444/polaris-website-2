import type { Metadata } from "next";

import { siteConfig } from "@/lib/site-config";
import { mergeKeywords } from "@/lib/utils";

interface MetadataInput {
  title: string;
  description: string;
  path: string;
  keywords?: readonly string[];
}

export function buildMetadata({
  title,
  description,
  path,
  keywords,
}: MetadataInput): Metadata {
  const url = new URL(path, siteConfig.siteUrl).toString();

  return {
    title,
    description,
    keywords: keywords ? [...keywords] : undefined,
    alternates: {
      canonical: url,
    },
    openGraph: {
      title,
      description,
      url,
      siteName: siteConfig.name,
      type: "website",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
  };
}

export function buildContentMetadata(
  input: MetadataInput,
  pageKeywords: readonly string[],
) {
  return buildMetadata({
    ...input,
    keywords: mergeKeywords(pageKeywords, input.keywords),
  });
}
