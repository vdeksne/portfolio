import * as z from "zod";
import type { ArticleMeta, FaqData, PageMeta, Project } from "@/lib/content";

export const localeSchema = z.enum(["en", "lv"]);

export const faqSchema: z.ZodType<FaqData> = z.object({
  title: z.string(),
  subtitle: z.string(),
  faqQuestions: z.array(
    z.object({
      title: z.string(),
      questions: z.array(
        z.object({
          label: z.string(),
          content: z.string(),
        })
      ),
    })
  ),
});

export const stackSchema = z.object({
  items: z.array(
    z.object({
      name: z.string(),
      link: z.string(),
      icon: z.string(),
    })
  ),
});

export const experiencesSchema = z.object({
  items: z.array(
    z.object({
      title: z.string().min(1),
      company: z.string().min(1),
      date: z.string().min(1),
    }),
  ),
});

export const projectSchema: z.ZodType<Project> = z.object({
  name: z.string().min(1),
  image: z.string().min(1),
  link: z.string().min(1),
  release: z.string().min(1),
  date: z.string().optional(),
  featured: z.boolean().optional(),
});

export const pageMetaSchema: z.ZodType<PageMeta> = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().optional(),
});

export const pageWriteSchema = z.object({
  meta: pageMetaSchema,
  block: z.string().min(1).max(64),
  slots: z.record(z.string(), z.string()),
});

export const articleMetaSchema: z.ZodType<ArticleMeta> = z.object({
  title: z.string().min(1),
  description: z.string().min(1),
  date: z.string().min(1),
  image: z.string().min(1),
  readingTime: z.string().min(1),
  tags: z.array(z.string()),
});

export const articleWriteSchema = z.object({
  meta: articleMetaSchema,
  body: z.string(),
});

export const articleCreateSchema = z.object({
  slug: z.string().regex(/^[a-z0-9]+(?:-[a-z0-9]+)*$/),
  meta: articleMetaSchema,
  body: z.string(),
});
