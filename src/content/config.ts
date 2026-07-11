import { defineCollection, z } from 'astro:content';
import { editorialHubs, type EditorialHubId } from '../config/editorialHubs';

const isValidHubId = (val: unknown): val is EditorialHubId =>
  typeof val === 'string' && editorialHubs.some((h) => h.id === val);

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
    updatedAt: z.coerce.date().optional(),
    readTime: z.string(),
    draft: z.boolean().default(true),
    color: z.enum(['cyan', 'purple', 'amber']),
    emoji: z.string().optional(),
    locale: z.enum(['pt-BR', 'es']).default('pt-BR'),
    slugEs: z.string().optional(),
    primaryHub: z.custom<EditorialHubId>(isValidHubId, {
      message: 'primaryHub must match a registered editorial hub ID',
    }).optional(),
    contentType: z.enum(['article', 'guide']).default('article'),
    guideType: z.enum(['tutorial', 'checklist', 'guia', 'estrategia', 'comparacao', 'passo-a-passo']).optional(),
    guideTags: z.array(z.string()).default([]),
    relatedHubs: z.array(
      z.custom<EditorialHubId>(isValidHubId, {
        message: 'relatedHubs must contain only registered editorial hub IDs',
      })
    ).optional(),
    image: z.string().optional(),
    author: z.string().optional(),
  }).superRefine((data, ctx) => {
    // primaryHub required for published content
    if (data.draft === false && !data.primaryHub) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'primaryHub is required for published content (draft: false)',
        path: ['primaryHub'],
      });
    }

    // relatedHubs validations
    if (data.relatedHubs !== undefined) {
      // relatedHubs requires primaryHub
      if (!data.primaryHub) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'relatedHubs requires primaryHub',
          path: ['relatedHubs'],
        });
      }

      // relatedHubs empty when provided
      if (data.relatedHubs.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'relatedHubs must contain at least 1 hub when provided',
          path: ['relatedHubs'],
        });
      }

      // relatedHubs too many
      if (data.relatedHubs.length > 3) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'relatedHubs cannot contain more than 3 hubs',
          path: ['relatedHubs'],
        });
      }

      // relatedHubs duplicates
      if (new Set(data.relatedHubs).size !== data.relatedHubs.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'relatedHubs cannot contain duplicate hub IDs',
          path: ['relatedHubs'],
        });
      }

      // relatedHubs includes primaryHub
      if (data.primaryHub && data.relatedHubs.includes(data.primaryHub)) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'relatedHubs cannot include primaryHub',
          path: ['relatedHubs'],
        });
      }
    }
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
    descriptionEs: z.string().optional(),
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

// ═══════════════════════════════════════════════════════════
// RADAR MARKET — CATEGORIAS
// ═══════════════════════════════════════════════════════════
const marketCategorias = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    emoji: z.string().optional(),
    order: z.number().default(99),
    draft: z.boolean().default(true),
    locale: z.enum(['pt-BR', 'es']).default('pt-BR'),
  }),
});

// ═══════════════════════════════════════════════════════════
// RADAR MARKET — ITENS
// ═══════════════════════════════════════════════════════════
const marketItems = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    description: z.string(),
    category: z.string(),
    partnerName: z.string().optional(),
    productType: z.enum(['curso', 'servico', 'produto-digital', 'template', 'ferramenta', 'outro']).default('outro'),
    price: z.string().optional(),
    currency: z.string().default('BRL'),
    ctaLabel: z.string().default('Conhecer'),
    ctaUrl: z.string().url().optional(),
    status: z.enum(['verified', 'unconfirmed', 'draft', 'expired']).default('draft'),
    verifiedAt: z.string().optional(),
    sourceUrl: z.string().optional(),
    disclaimer: z.string().optional(),
    order: z.number().default(99),
    draft: z.boolean().default(true),
    locale: z.enum(['pt-BR', 'es']).default('pt-BR'),
  }),
});

export const collections = { artigos, parceiros, parceiroCategorias, bonusCategorias, bonuses, marketCategorias, marketItems };
