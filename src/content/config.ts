import { defineCollection, z } from "astro:content";

const postsCollection = defineCollection({
    schema: z.object({
      title: z.string(),
      pubDate: z.date(),
      description: z.string(),
      author: z.string(),

      image: z.object({
        url: z.string(),
        alt: z.string()
      }),

      tags: z.array(z.string()),
      faq: z.array(z.object({ question: z.string(), answer: z.string() })).optional()
    })
 });

export const collections = {
  posts: postsCollection,
};