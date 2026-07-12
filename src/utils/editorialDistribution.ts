// ═════════════════════════════════════════════════════════════════════════════
// Utilitário de distribuição editorial
//
// Contém funções puras que representam regras de distribuição de conteúdo
// baseadas nos metadados editoriais (primaryHub, locale, etc.).
//
// NENHUMA função neste arquivo deve:
//   - chamar getCollection ou realizar consultas;
//   - ordenar, filtrar por contentType, transformar ou gerar URLs;
//   - importar mais que tipos e registros necessários.
// ═════════════════════════════════════════════════════════════════════════════

import type { CollectionEntry } from 'astro:content';
import type { EditorialHubId } from '../config/editorialHubs';
import type { Locale } from '../i18n/utils';

// ─── Tipos ─────────────────────────────────────────────────────────────────

export type PublishedArticleData = CollectionEntry<'artigos'>['data'];

// ─── Locale helper ──────────────────────────────────────────────────────────

/**
 * Retorna o locale efetivo de uma entrada, considerando o default pt-BR
 * quando o campo locale não é informado.
 */
function effectiveLocale(data: PublishedArticleData): Locale {
  return data.locale || 'pt-BR';
}

// ─── matchesPublishedPrimaryHub ─────────────────────────────────────────────

export type MatchesPublishedPrimaryHubOptions = {
  /** ID do hub editorial que deve corresponder ao primaryHub da entrada */
  primaryHub: EditorialHubId;
  /** Locale esperado. Usa o tipo central Locale do projeto (config.ts → utils). */
  locale: Locale;
};

/**
 * Retorna true quando a entrada da collection artigos é uma publicação
 * não-draft, está associada ao primaryHub informado e corresponde ao locale.
 *
 * Não considera contentType, relatedHubs, topics, formato, ordenação ou
 * qualquer outro campo — esta função representa exclusivamente a regra de
 * publicação principal por hub e locale.
 */
export function matchesPublishedPrimaryHub(
  data: PublishedArticleData,
  options: MatchesPublishedPrimaryHubOptions,
): boolean {
  if (data.draft !== false) return false;
  if (data.primaryHub !== options.primaryHub) return false;
  if (effectiveLocale(data) !== options.locale) return false;
  return true;
}
