import { defineCollection, z } from 'astro:content';

const gadgetsCollection = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    description: z.string(),
    image_url: z.string().optional(),
    category: z.string(),
    review_url: z.string().optional(),
    amazon_url: z.string().optional(),
    tags: z.array(z.string()).default([]),
    created_at: z.string(),
  }),
});

const booksCollection = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    author: z.string(),
    description: z.string(),
    image_url: z.string().optional(),
    review_url: z.string().optional(),
    amazon_url: z.string().optional(),
    read_date: z.string().optional(),
    rating: z.number().min(1).max(5).optional(),
    tags: z.array(z.string()).default([]),
    created_at: z.string(),
  }),
});

export const collections = {
  gadgets: gadgetsCollection,
  books: booksCollection,
};
