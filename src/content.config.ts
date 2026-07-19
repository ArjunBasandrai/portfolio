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
    year: z.string(),
    publishedDate: z.coerce.date().optional(),
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
    coverSquare: z.string().optional(),
    coverVideo: z.string().optional(),
    coverLabel: z.string().default("project cover"),
    featured: z.boolean().default(false),
    major: z.boolean().default(false),
    hide: z.boolean().default(false),
    order: z.number().default(99),
  }).refine(
    (data) => !data.featured || (typeof data.coverSquare === "string" && data.coverSquare.trim().length > 0),
    {
      message: "Featured projects require a square `coverSquare` image (1:1) for the featured panel.",
      path: ["coverSquare"],
    }
  ),
});

export const collections = { projects };
