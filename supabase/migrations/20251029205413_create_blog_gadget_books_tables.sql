/*
  # Create blog, gadget, and books tables

  ## Overview
  This migration creates tables for storing blog posts, gadgets, and books.
  All tables include proper RLS policies for secure data access.

  ## Tables Created

  ### 1. blog_posts
  - `id` (uuid, primary key) - Unique identifier for each blog post
  - `title` (text) - Blog post title
  - `slug` (text, unique) - URL-friendly slug for the post
  - `description` (text) - Short description or excerpt
  - `content` (text) - Full blog post content
  - `external_url` (text, nullable) - Link to external platform (Zenn/Qiita)
  - `platform` (text, nullable) - Platform name (e.g., 'zenn', 'qiita', 'blog')
  - `published_at` (timestamptz) - Publication date
  - `tags` (text[]) - Array of tags for categorization
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ### 2. gadgets
  - `id` (uuid, primary key) - Unique identifier for each gadget
  - `name` (text) - Gadget name
  - `slug` (text, unique) - URL-friendly slug
  - `description` (text) - Short description
  - `image_url` (text, nullable) - Image URL
  - `category` (text) - Category (e.g., 'laptop', 'keyboard', 'mouse', 'monitor')
  - `review_url` (text, nullable) - Link to detailed review
  - `amazon_url` (text, nullable) - Amazon affiliate link
  - `tags` (text[]) - Array of tags
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ### 3. books
  - `id` (uuid, primary key) - Unique identifier for each book
  - `title` (text) - Book title
  - `slug` (text, unique) - URL-friendly slug
  - `author` (text) - Book author
  - `description` (text) - Short description or review
  - `image_url` (text, nullable) - Book cover image URL
  - `review_url` (text, nullable) - Link to detailed review
  - `amazon_url` (text, nullable) - Amazon affiliate link
  - `read_date` (date, nullable) - Date when book was read
  - `rating` (integer, nullable) - Rating (1-5)
  - `tags` (text[]) - Array of tags
  - `created_at` (timestamptz) - Record creation timestamp
  - `updated_at` (timestamptz) - Record update timestamp

  ## Security
  - RLS is enabled on all tables
  - Public read access is granted to all users
  - Only authenticated users can insert, update, or delete records
*/

-- Create blog_posts table
CREATE TABLE IF NOT EXISTS blog_posts (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  content text NOT NULL DEFAULT '',
  external_url text,
  platform text DEFAULT 'blog',
  published_at timestamptz DEFAULT now(),
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create gadgets table
CREATE TABLE IF NOT EXISTS gadgets (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  description text NOT NULL,
  image_url text,
  category text NOT NULL DEFAULT 'other',
  review_url text,
  amazon_url text,
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Create books table
CREATE TABLE IF NOT EXISTS books (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  title text NOT NULL,
  slug text UNIQUE NOT NULL,
  author text NOT NULL,
  description text NOT NULL,
  image_url text,
  review_url text,
  amazon_url text,
  read_date date,
  rating integer CHECK (rating >= 1 AND rating <= 5),
  tags text[] DEFAULT '{}',
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Enable RLS
ALTER TABLE blog_posts ENABLE ROW LEVEL SECURITY;
ALTER TABLE gadgets ENABLE ROW LEVEL SECURITY;
ALTER TABLE books ENABLE ROW LEVEL SECURITY;

-- Create policies for blog_posts
CREATE POLICY "Anyone can read blog posts"
  ON blog_posts FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert blog posts"
  ON blog_posts FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update blog posts"
  ON blog_posts FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete blog posts"
  ON blog_posts FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for gadgets
CREATE POLICY "Anyone can read gadgets"
  ON gadgets FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert gadgets"
  ON gadgets FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update gadgets"
  ON gadgets FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete gadgets"
  ON gadgets FOR DELETE
  TO authenticated
  USING (true);

-- Create policies for books
CREATE POLICY "Anyone can read books"
  ON books FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Authenticated users can insert books"
  ON books FOR INSERT
  TO authenticated
  WITH CHECK (true);

CREATE POLICY "Authenticated users can update books"
  ON books FOR UPDATE
  TO authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "Authenticated users can delete books"
  ON books FOR DELETE
  TO authenticated
  USING (true);

-- Create indexes for better query performance
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON blog_posts(published_at DESC);
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_gadgets_category ON gadgets(category);
CREATE INDEX IF NOT EXISTS idx_gadgets_slug ON gadgets(slug);
CREATE INDEX IF NOT EXISTS idx_books_read_date ON books(read_date DESC);
CREATE INDEX IF NOT EXISTS idx_books_slug ON books(slug);
