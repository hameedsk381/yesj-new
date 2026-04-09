export interface StrapiResponse<T> {
  data: T;
  meta: {
    pagination?: {
      page: number;
      pageSize: number;
      pageCount: number;
      total: number;
    };
  };
}

export interface StrapiEntity<T> {
  id: number;
  attributes: T;
}

export interface StrapiImage {
  data: {
    id: number;
    attributes: {
      url: string;
      alternativeText: string | null;
      width: number;
      height: number;
      formats: any;
    };
  } | null;
}

export interface StrapiProgram {
  slug: string;
  title: string;
  shortTitle: string;
  badge: string;
  tagline: string;
  subheading: string;
  icon: string;
  image: StrapiImage;
  overviewDescription: string;
  megaMenuDescription: string;
  cardBarClassName: string;
  categories: string; // Strapi might store this as a string or relation
  megaMenuGroup: "skill-education" | "youth-community" | "spiritual-celebration";
  sections: any[]; // Dynamic zone
}

export interface StrapiStory {
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  author: string;
  category: string;
  image: StrapiImage;
  featured: boolean;
  publishedAt: string;
}

export interface StrapiEvent {
  title: string;
  description: string;
  date: string;
  location: string;
  fee: string;
  deadline: string;
  image: StrapiImage;
  type: string;
  isActive: boolean;
}
