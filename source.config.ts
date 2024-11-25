import {
  defineDocs,
  defineConfig,
  defineCollections,
  frontmatterSchema,
} from 'fumadocs-mdx/config';
import { z } from 'zod';

export const { docs, meta } = defineDocs();

export const blog = defineCollections({
  dir: 'content/blogs',
  type: 'doc',
  schema: frontmatterSchema.extend({
    title: z.string(),
    description: z.string(),
    date: z.string().date().or(z.date()),
    image: z.string().optional(),
    authors: z.array(z.string()).default([]),
    keywords: z.array(z.string()).default([]),
    tags: z.array(z.string()).default([]),
  }),
});

export default defineConfig();
