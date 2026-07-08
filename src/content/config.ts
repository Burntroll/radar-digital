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
    category: z.string(),
    excerpt: z.string(),
    website: z.string().url(),
    logo: z.string().optional(),
    featured: z.boolean().default(false),
    languages: z.array(z.string()).default(['pt-BR']),
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
    description: z.string(),
    order: z.number().default(99),
    draft: z.boolean().default(true),
    locale: z.enum(['pt-BR', 'es']).default('pt-BR'),
  }),
});

// ═══════════════════════════════════════════════════════════
// CATEGORIAS DE BÔNUS
// ═══════════════════════════════════════════════════════════
const bonusCategorias = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string().optional(),
    order: z.number().default(99),
    draft: z.boolean().default(true),
    locale: z.enum(['pt-BR', 'es']).default('pt-BR'),
  }),
});

// ═══════════════════════════════════════════════════════════
// BÔNUS / CÓDIGOS PROMOCIONAIS
// ═══════════════════════════════════════════════════════════
const bonuses = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    productName: z.string(),
    category: z.string(),
    promoCode: z.string(),
    description: z.string(),
    benefit: z.string().optional(),
    website: z.string().url(),
    logo: z.string().optional(),
    image: z.string().optional(),
    featured: z.boolean().default(false),
    expiresAt: z.date().nullable().default(null),
    verifiedAt: z.string().optional(),
    sourceUrl: z.string().optional(),
    status: z.enum(['verified', 'unconfirmed', 'expired']).default('unconfirmed'),
    buttonText: z.string().default('Usar código'),
    draft: z.boolean().default(true),
    order: z.number().default(99),
    locale: z.enum(['pt-BR', 'es']).default('pt-BR'),
  }),
});

export const collections = { artigos, parceiros, parceiroCategorias, bonusCategorias, bonuses };
