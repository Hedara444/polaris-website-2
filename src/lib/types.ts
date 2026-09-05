export type DirectionMode = "ltr" | "rtl" | "auto";
export type PublishStatus = "draft" | "published";

export interface ArticleListItem {
  id: number;
  title: string;
  slug: string;
  description: string;
  coverImageUrl: string | null;
  categoryId: number | null;
  categoryName: string | null;
  direction: DirectionMode;
  publishedAt: string | null;
  updatedAt: string;
}

export interface ArticleDetails extends ArticleListItem {
  bodyHtml: string;
  keywords: string[];
  status: PublishStatus;
}

export interface ArticleEditorInput {
  title: string;
  description: string;
  coverImageUrl: string;
  categoryName: string;
  bodyHtml: string;
  keywords: string[];
  direction: DirectionMode;
  status: PublishStatus;
}

export interface FaqItem {
  id: number;
  question: string;
  answer: string;
  categoryId: number | null;
  categoryName: string | null;
  keywords: string[];
  sortOrder: number;
  status: PublishStatus;
  updatedAt: string;
}

export interface FaqCategoryItem {
  id: number;
  name: string;
  slug: string;
  keywords: string;
  sortOrder: number;
}

export interface FaqCategoryEditorInput {
  name: string;
  keywords: string;
  sortOrder: number;
}

export interface StepsFeatureItem {
  index: string;
  title: string;
  text: string;
  image: string;
  note: string | null;
}

export interface StepsFlowItem {
  title: string;
  text: string;
}

export interface TestimonialItem {
  name: string;
  category: string;
  title: string;
  avatar: string;
  text: string;
}

export interface FaqEditorInput {
  question: string;
  answer: string;
  categoryId: number | null;
  keywords: string[];
  sortOrder: number;
  status: PublishStatus;
}

export interface CategoryItem {
  id: number;
  name: string;
  slug: string;
}

export interface PaginationResult<T> {
  items: T[];
  page: number;
  pageSize: number;
  total: number;
  totalPages: number;
}

export interface DashboardStats {
  articleCount: number;
  faqCount: number;
  publishedArticleCount: number;
}
