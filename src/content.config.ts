import { defineCollection, z } from "astro:content";
import { glob } from "astro/loaders";

const projects = defineCollection({
  loader: glob({ pattern: "**/*.mdx", base: "./src/content/projects" }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    summary: z.string(),
    category: z
      .union([z.string(), z.array(z.string())])
      .transform((c) => (Array.isArray(c) ? c : [c])),
    tags: z.array(z.string()).default([]),
    status: z.enum(["active", "progress", "done", "archived"]),
    statusLabel: z.string().optional(),
    year: z.string(),
    role: z.string(),
    timeline: z.string(),
    stack: z.array(z.string()).default([]),
    stats: z
      .array(
        z.object({
          value: z.string(),
          label: z.string(),
          note: z.string().optional(),
        })
      )
      .default([]),
    links: z
      .object({
        github: z.string().optional(),
        demo: z.string().optional(),
        paper: z.string().optional(),
        dataset: z.string().optional(),
      })
      .default({}),
    cover: z.string().optional(),
    coverLabel: z.string().default("project cover"),
    featured: z.boolean().default(false),
    order: z.number().default(99),
  }),
});

export const collections = { projects };
