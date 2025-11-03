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

export const collections = {
  gadgets: gadgetsCollection,
};
