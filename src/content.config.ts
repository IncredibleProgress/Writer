import { z } from 'astro/zod'
import { glob } from 'astro/loaders';
import { defineCollection } from 'astro:content';

const articles = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/markdown' }),
  schema: z.object({
    title: z.string(),
    part: z.number(),
    date: z.string(),
  }),
});

export const collections = {
  articles,
};