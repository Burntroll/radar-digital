// ═════════════════════════════════════════════════════════════════════════════
// Registro central de formatos editoriais
//
// Este arquivo é a fonte de verdade para os formatos editoriais do Radar Digital.
// Está conectado ao schema da collection artigos e validado em runtime.
//
// TIPAGEM DERIVADA:
//   EditorialFormatId e EditorialFormat são derivados do registro (editorialFormats).
//   Nunca edite a union manualmente — altere apenas os objetos no array.
//
// REGRAS:
//   - active significa que o formato já é usado no acervo atual.
//   - planned significa que o formato pertence ao vocabulário aprovado,
//     mas ainda não possui publicações classificadas.
//   - O status não bloqueia valores no schema — os 7 IDs são válidos.
// ═════════════════════════════════════════════════════════════════════════════

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type EditorialFormatStatus = 'active' | 'planned';

// ─── Tipo de definição ────────────────────────────────────────────────────────

type EditorialFormatDefinition = {
  id: string;
  labelPt: string;
  labelEs: string;
  status: EditorialFormatStatus;
};

// ─── Registro (fonte de verdade única) ─────────────────────────────────────

export const editorialFormats = [
  {
    id: 'article',
    labelPt: 'Artigo',
    labelEs: 'Artículo',
    status: 'active',
  },
  {
    id: 'guide',
    labelPt: 'Guia',
    labelEs: 'Guía',
    status: 'active',
  },
  {
    id: 'news',
    labelPt: 'Notícia',
    labelEs: 'Noticia',
    status: 'planned',
  },
  {
    id: 'analysis',
    labelPt: 'Análise',
    labelEs: 'Análisis',
    status: 'planned',
  },
  {
    id: 'interview',
    labelPt: 'Entrevista',
    labelEs: 'Entrevista',
    status: 'planned',
  },
  {
    id: 'case-study',
    labelPt: 'Estudo de caso',
    labelEs: 'Caso de estudio',
    status: 'planned',
  },
  {
    id: 'review',
    labelPt: 'Review',
    labelEs: 'Reseña',
    status: 'planned',
  },
] as const satisfies readonly EditorialFormatDefinition[];

// ─── Tipos derivados do registro ──────────────────────────────────────────

export type EditorialFormat = (typeof editorialFormats)[number];
export type EditorialFormatId = EditorialFormat['id'];
