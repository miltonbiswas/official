// src/types/index.ts

export interface BlogPost {
  _id: string;
  title: string;
  subtitle?: string;

  slug: string; // URL identifier
  content: string;

  coverImage?: string; // Hero banner image

  author?: string; // Default or assigned writer

  tags: string[];
  category: string;

  seoTitle?: string;
  seoDescription?: string;

  readingTime: number; // in minutes

  isPublished: boolean;
  featured?: boolean; // highlight on home page
  allowComments?: boolean; // enable/disable comments

  createdAt: string;
  updatedAt: string; // Required for editing UI
  publishedAt?: string | null;

  views?: number; // viewer analytics
  likes?: number; // engagement count

  revisionHistory?: {
    updatedAt: string;
    updatedBy?: string;
    changes?: string;
  }[];
}
