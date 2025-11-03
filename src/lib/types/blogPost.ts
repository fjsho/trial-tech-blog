export type BlogPost = {
  id: string;
  title: string;
  slug: string;
  description: string;
  content: string;
  external_url?: string;
  platform: string;
  published_at: string;
  tags: string[];
  created_at: string;
  updated_at: string;
};

