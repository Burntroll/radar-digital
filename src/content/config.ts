import { defineCollection, z } from 'astro:content';

// ═══════════════════════════════════════════════════════════
// ARTIGOS DO BLOG
// ═══════════════════════════════════════════════════════════
const artigos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    categoria: z.enum(['marketing-digital', 'inteligencia-artificial', 'monetizacao']),
    subtema: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    readTime: z.string(),
    draft: z.boolean().default(true),
    color: z.enum(['cyan', 'purple', 'amber']),
    emoji: z.string().optional(),
    locale: z.enum(['pt-BR', 'es']).default('pt-BR'),
    // Slug traduzido opcional. Se não tiver, gera URL no locale correspondente
    // usando o filename + aviso de "sem versão nesse idioma"
    slugEs: z.string().optional(),
  }),
});

// ═══════════════════════════════════════════════════════════
// PARCEIROS
// ═══════════════════════════════════════════════════════════
const parceiros = defineCollection({
  type: 'content',
  schema: z.object({
    name: z.string(),
    category: z.string(), // slug da categoria (ex: 'trackers', 'antidetect-browsers')
    excerpt: z.string(),
    website: z.string().url(),
    logo: z.string().optional(), // caminho /public/... ou URL externa
    featured: z.boolean().default(false),
    languages: z.array(z.string()).default(['pt-BR']), // ex: ['pt-BR', 'en', 'es']
    tags: z.array(z.string()).default([]),
    buttonText: z.string().default('Conhecer'),
    draft: z.boolean().default(true),
    locale: z.enum(['pt-BR', 'es']).default('pt-BR'),
    slugEs: z.string().optional(),
  }),
});

// ═══════════════════════════════════════════════════════════
// CATEGORIAS DE PARCEIROS
// ═══════════════════════════════════════════════════════════
const parceiroCategorias = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    // slug vem do filename (trackers.md → "trackers")
    description: z.string(),
    order: z.number().default(99),
    draft: z.boolean().default(true),
    locale: z.enum(['pt-BR', 'es']).default('pt-BR'),
    // O body da categoria é a introdução explicativa do nicho (opcional)
  }),
});

export const collections = { artigos, parceiros, parceiroCategorias };
