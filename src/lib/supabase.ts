import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Gadget = {
  id: string;
  name: string;
  slug: string;
  description: string;
  image_url?: string;
  category: string;
  review_url?: string;
  amazon_url?: string;
  tags: string[];
  created_at: string;
  updated_at: string;
};

export type Book = {
  id: string;
  title: string;
  slug: string;
  author: string;
  description: string;
  image_url?: string;
  review_url?: string;
  amazon_url?: string;
  read_date?: string;
  rating?: number;
  tags: string[];
  created_at: string;
  updated_at: string;
};
