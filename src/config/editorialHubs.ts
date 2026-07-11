// ═════════════════════════════════════════════════════════════════════════════
// Registro central de hubs editoriais
//
// Este arquivo é a fonte de verdade para a taxonomia de hubs do Radar Digital.
// Ele não está conectado ao schema, rotas, navbar ou sitemap — é apenas um
// registro tipado que outras partes do sistema podem consultar futuramente.
//
// Seções: Setores (sectors), Operação (operations), Verticais (verticals)
// ═════════════════════════════════════════════════════════════════════════════

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type EditorialSection = 'sectors' | 'operations' | 'verticals';

export type EditorialGroup =
  | 'acquisition-growth'
  | 'building-monetization'
  | 'technology-performance';

export type EditorialHubStatus = 'active' | 'planned';

// ─── Hub ID (union de todos os IDs) ───────────────────────────────────────────

export type EditorialHubId =
  // Setores
  | 'ecommerce'
  | 'artificial-intelligence'
  | 'crypto'
  | 'igaming'
  // Operação — Aquisição e Crescimento
  | 'digital-marketing'
  | 'paid-traffic'
  | 'affiliates'
  | 'seo-content'
  // Operação — Construção e Monetização
  | 'sites-portals'
  | 'monetization'
  // Operação — Tecnologia e Performance
  | 'ai-automation'
  | 'contingency-infrastructure'
  | 'data-conversion'
  // Verticais
  | 'nutra'
  | 'adult'
  | 'extra-income'
  | 'other-verticals';

// ─── Estrutura de cada hub ────────────────────────────────────────────────────

export interface EditorialHub {
  /** ID interno estável (não muda com idioma) */
  id: EditorialHubId;
  /** Seção à qual o hub pertence */
  section: EditorialSection;
  /** Grupo dentro da seção (apenas para hubs de Operação) */
  group?: EditorialGroup;
  /** Label em português */
  labelPt: string;
  /** Label em espanhol */
  labelEs: string;
  /** Slug público em português */
  slugPt: string;
  /** Slug público em espanhol */
  slugEs: string;
  /** Status do hub */
  status: EditorialHubStatus;
}

// ─── Registro ─────────────────────────────────────────────────────────────────

export const editorialHubs: EditorialHub[] = [
  // ═══════════════════════════════════════════════════════════════════════════
  // SETORES
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ecommerce',
    section: 'sectors',
    labelPt: 'E-commerce',
    labelEs: 'E-commerce',
    slugPt: 'ecommerce',
    slugEs: 'ecommerce',
    status: 'planned',
  },
  {
    id: 'artificial-intelligence',
    section: 'sectors',
    labelPt: 'Inteligência Artificial',
    labelEs: 'Inteligencia Artificial',
    slugPt: 'inteligencia-artificial',
    slugEs: 'inteligencia-artificial',
    status: 'active',
  },
  {
    id: 'crypto',
    section: 'sectors',
    labelPt: 'Crypto',
    labelEs: 'Cripto',
    slugPt: 'crypto',
    slugEs: 'cripto',
    status: 'planned',
  },
  {
    id: 'igaming',
    section: 'sectors',
    labelPt: 'iGaming',
    labelEs: 'iGaming',
    slugPt: 'igaming',
    slugEs: 'igaming',
    status: 'planned',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OPERAÇÃO — Aquisição e Crescimento
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'digital-marketing',
    section: 'operations',
    group: 'acquisition-growth',
    labelPt: 'Marketing Digital',
    labelEs: 'Marketing Digital',
    slugPt: 'marketing-digital',
    slugEs: 'marketing-digital',
    status: 'active',
  },
  {
    id: 'paid-traffic',
    section: 'operations',
    group: 'acquisition-growth',
    labelPt: 'Tráfego Pago',
    labelEs: 'Tráfico Pago',
    slugPt: 'trafego-pago',
    slugEs: 'trafico-pago',
    status: 'planned',
  },
  {
    id: 'affiliates',
    section: 'operations',
    group: 'acquisition-growth',
    labelPt: 'Afiliados',
    labelEs: 'Afiliados',
    slugPt: 'afiliados',
    slugEs: 'afiliados',
    status: 'planned',
  },
  {
    id: 'seo-content',
    section: 'operations',
    group: 'acquisition-growth',
    labelPt: 'SEO e Conteúdo',
    labelEs: 'SEO y Contenido',
    slugPt: 'seo-conteudo',
    slugEs: 'seo-contenido',
    status: 'planned',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OPERAÇÃO — Construção e Monetização
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'sites-portals',
    section: 'operations',
    group: 'building-monetization',
    labelPt: 'Sites e Portais',
    labelEs: 'Sitios y Portales',
    slugPt: 'sites-portais',
    slugEs: 'sitios-portales',
    status: 'planned',
  },
  {
    id: 'monetization',
    section: 'operations',
    group: 'building-monetization',
    labelPt: 'Monetização',
    labelEs: 'Monetización',
    slugPt: 'monetizacao',
    slugEs: 'monetizacion',
    status: 'active',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // OPERAÇÃO — Tecnologia e Performance
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'ai-automation',
    section: 'operations',
    group: 'technology-performance',
    labelPt: 'IA e Automação',
    labelEs: 'IA y Automatización',
    slugPt: 'ia-automacao',
    slugEs: 'ia-automatizacion',
    status: 'planned',
  },
  {
    id: 'contingency-infrastructure',
    section: 'operations',
    group: 'technology-performance',
    labelPt: 'Contingência e Infraestrutura',
    labelEs: 'Contingencia e Infraestructura',
    slugPt: 'contingencia-infraestrutura',
    slugEs: 'contingencia-infraestructura',
    status: 'planned',
  },
  {
    id: 'data-conversion',
    section: 'operations',
    group: 'technology-performance',
    labelPt: 'Dados e Conversão',
    labelEs: 'Datos y Conversión',
    slugPt: 'dados-conversao',
    slugEs: 'datos-conversion',
    status: 'planned',
  },

  // ═══════════════════════════════════════════════════════════════════════════
  // VERTICAIS
  // ═══════════════════════════════════════════════════════════════════════════
  {
    id: 'nutra',
    section: 'verticals',
    labelPt: 'Nutra',
    labelEs: 'Nutra',
    slugPt: 'nutra',
    slugEs: 'nutra',
    status: 'planned',
  },
  {
    id: 'adult',
    section: 'verticals',
    labelPt: 'Adult',
    labelEs: 'Adult',
    slugPt: 'adult',
    slugEs: 'adult',
    status: 'planned',
  },
  {
    id: 'extra-income',
    section: 'verticals',
    labelPt: 'Renda Extra',
    labelEs: 'Ingresos Extra',
    slugPt: 'renda-extra',
    slugEs: 'ingresos-extra',
    status: 'planned',
  },
  {
    id: 'other-verticals',
    section: 'verticals',
    labelPt: 'Outras Verticais',
    labelEs: 'Otras Verticales',
    slugPt: 'outras-verticais',
    slugEs: 'otras-verticales',
    status: 'planned',
  },
];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Retorna um hub pelo seu ID interno.
 * Útil para consultar labels, slugs e metadata sem percorrer o array manualmente.
 */
export function getEditorialHub(id: EditorialHubId): EditorialHub | undefined {
  return editorialHubs.find((h) => h.id === id);
}

/**
 * Retorna todos os hubs de uma seção.
 */
export function getHubsBySection(section: EditorialSection): EditorialHub[] {
  return editorialHubs.filter((h) => h.section === section);
}

/**
 * Retorna todos os hubs de um grupo (válido apenas para Operação).
 */
export function getHubsByGroup(group: EditorialGroup): EditorialHub[] {
  return editorialHubs.filter((h) => h.group === group);
}

/**
 * Retorna apenas hubs com status 'active'.
 */
export function getActiveHubs(): EditorialHub[] {
  return editorialHubs.filter((h) => h.status === 'active');
}
