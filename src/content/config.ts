import { defineCollection, z } from 'astro:content';
import { editorialHubs, type EditorialHubId } from '../config/editorialHubs';
import { editorialTopics, type EditorialTopicId } from '../config/editorialTopics';
import { editorialAuthors, type EditorialAuthorId } from '../config/editorialAuthors';
import { editorialFormats, type EditorialFormatId } from '../config/editorialFormats';

const isValidHubId = (val: unknown): val is EditorialHubId =>
  typeof val === 'string' && editorialHubs.some((h) => h.id === val);

const isValidTopicId = (val: unknown): val is EditorialTopicId =>
  typeof val === 'string' &&
  editorialTopics.some((topic) => topic.id === val);

const isValidAuthorId = (val: unknown): val is EditorialAuthorId =>
  typeof val === 'string' &&
  editorialAuthors.some((author) => author.id === val);

const isValidFormatId = (val: unknown): val is EditorialFormatId =>
  typeof val === 'string' &&
  editorialFormats.some((f) => f.id === val);

// ─── Sources schema ────────────────────────────────────────────────────
const editorialSourceSchema = z.object({
  title: z.string().trim().min(1, 'source title must not be empty'),
  publisher: z.string().trim().min(1, 'source publisher must not be empty'),
  url: z
    .string()
    .trim()
    .url('source url must be a valid absolute URL')
    .refine(
      (val) => val.startsWith('http://') || val.startsWith('https://'),
      'source url must use HTTP or HTTPS'
    ),
  publishedAt: z.coerce.date().optional(),
  accessedAt: z.coerce.date().optional(),
  note: z
    .string()
    .trim()
    .min(1, 'source note must not be empty')
    .optional(),
});

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
    contentType: z.custom<EditorialFormatId>(isValidFormatId, {
      message: 'contentType must match a registered editorial format ID',
    }).default('article'),
    guideType: z.enum(['tutorial', 'checklist', 'guia', 'estrategia', 'comparacao', 'passo-a-passo']).optional(),
    guideTags: z.array(z.string()).default([]),
    relatedHubs: z.array(
      z.custom<EditorialHubId>(isValidHubId, {
        message: 'relatedHubs must contain only registered editorial hub IDs',
      })
    ).optional(),
    topics: z.array(
      z.custom<EditorialTopicId>(isValidTopicId, {
        message: 'topics must contain only registered editorial topic IDs',
      })
    ).optional(),
    authorId: z.custom<EditorialAuthorId>(isValidAuthorId, {
      message: 'authorId must match a registered editorial author ID',
    }).optional(),
    sources: z.array(editorialSourceSchema).optional(),
    translationKey: z
      .string()
      .min(3)
      .max(64)
      .regex(
        /^[a-z0-9]+(?:-[a-z0-9]+)*$/,
        'translationKey must use lowercase kebab-case'
      )
      .optional(),
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

    // topics validations
    if (data.draft === false) {
      if (!data.topics || data.topics.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'topics is required for published content (draft: false)',
          path: ['topics'],
        });
      }
    }

    if (data.topics !== undefined) {
      // topics empty when provided
      if (data.topics.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'topics must contain at least 1 topic when provided',
          path: ['topics'],
        });
      }

      // topics too many
      if (data.topics.length > 5) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'topics cannot contain more than 5 topics',
          path: ['topics'],
        });
      }

      // topics duplicates
      if (new Set(data.topics).size !== data.topics.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'topics cannot contain duplicate topic IDs',
          path: ['topics'],
        });
      }
    }

    // authorId required for published content
    if (data.draft === false && !data.authorId) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: 'authorId is required for published content (draft: false)',
        path: ['authorId'],
      });
    }

    // sources validations
    if (data.sources !== undefined) {
      // sources empty when provided
      if (data.sources.length === 0) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'sources must contain at least 1 source when provided',
          path: ['sources'],
        });
      }

      // sources too many
      if (data.sources.length > 20) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'sources cannot contain more than 20 sources',
          path: ['sources'],
        });
      }

      // sources duplicate URLs (exact string match after trim)
      const urls = data.sources.map((s) => s.url.trim());
      if (new Set(urls).size !== urls.length) {
        ctx.addIssue({
          code: z.ZodIssueCode.custom,
          message: 'sources cannot contain duplicate URLs',
          path: ['sources'],
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
