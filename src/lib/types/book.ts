export type Book = {
  title: string;
  author: string;
  description: string;
  image_url?: string;
  review_url?: string;
  amazon_url?: string;
  read_date?: string;
  rating?: number;
  tags: string[];
  created_at: string;
};
