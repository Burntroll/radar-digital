// ═════════════════════════════════════════════════════════════════════════════
// Registro central de autores editoriais
//
// Fonte de verdade para autoria do Radar Digital.
// Suporta autores do tipo organization e person.
//
// TIPAGEM DERIVADA:
//   EditorialAuthorId e EditorialAuthor são derivados do registro.
//   Nunca edite a union manualmente.
// ═════════════════════════════════════════════════════════════════════════════

// ─── Tipos base ───────────────────────────────────────────────────────────────

export type EditorialAuthorKind = 'organization' | 'person';

type BaseAuthorDefinition = {
  id: string;
  kind: EditorialAuthorKind;
  name: string;
  url?: string;
};

// ─── Registro (fonte de verdade única) ─────────────────────────────────────

export const editorialAuthors = [
  {
    id: 'radar-digital',
    kind: 'organization',
    name: 'Radar Digital',
    url: 'https://radardigital.ai/',
  },
] as const satisfies readonly BaseAuthorDefinition[];

// ─── Tipos derivados do registro ──────────────────────────────────────────

export type EditorialAuthor = (typeof editorialAuthors)[number];
export type EditorialAuthorId = EditorialAuthor['id'];

// ─── Helpers ──────────────────────────────────────────────────────────────────

/**
 * Retorna um autor pelo seu ID interno.
 * Apenas IDs existentes no registro são aceitos.
 */
export function getEditorialAuthor(id: EditorialAuthorId): EditorialAuthor | undefined {
  return editorialAuthors.find((a) => a.id === id);
}
