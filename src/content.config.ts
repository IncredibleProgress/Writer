import { z } from 'astro/zod'
import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/books' }),
  schema: z.object({
    title: z.string(),
    status: z.string().optional(),
    date: z.string().optional(),
  }),
});

export const collections = {
  articles,
};