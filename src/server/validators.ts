import { z } from "zod";

export const articleInputSchema = z
  .object({
    title: z.string().min(3),
    description: z.string().min(10),
    coverImageUrl: z
      .string()
      .trim()
      .min(1, "Cover image is required.")
      .refine(
        (value: string) =>
          value.endsWith(".jpg") ||
          value.endsWith(".jpeg") ||
          value.endsWith(".webp"),
        "Cover image must be a .jpg, .jpeg, or .webp file path.",
      ),
    // Legacy single-category payload; new clients send categoryNames.
    categoryName: z.string().min(1).optional(),
    categoryNames: z.array(z.string()).optional(),
    bodyHtml: z.string().min(3),
    keywords: z.array(z.string()).default([]),
    direction: z.enum(["ltr", "rtl", "auto"]),
    status: z.enum(["draft", "published"]),
  })
  .refine(
    (value) =>
      (value.categoryNames && value.categoryNames.length > 0) ||
      (value.categoryName && value.categoryName.trim().length > 0),
    { message: "At least one category is required.", path: ["categoryNames"] },
  );

export const faqInputSchema = z.object({
  question: z.string().min(5),
  answer: z.string().min(5),
  categoryId: z.number().nullable().default(null),
  keywords: z.array(z.string()).default([]),
  sortOrder: z.number().int(),
  status: z.enum(["draft", "published"]),
});

export const articleCategoryInputSchema = z.object({
  name: z.string().trim().min(1, "Category name is required."),
});

export const faqCategoryInputSchema = z.object({
  name: z.string().min(1),
  keywords: z.string().default(""),
  sortOrder: z.number().int().default(0),
});
