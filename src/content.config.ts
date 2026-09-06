import { z } from 'astro/zod'
import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/books' }),
  schema: z.object({
    title: z.string(),
    date: z.string(),
    order: z.number().optional(),
  }),
});

export const collections = {
  articles,
};