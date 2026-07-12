// ═════════════════════════════════════════════════════════════════════════════
// Utilitário de distribuição editorial
//
// Contém funções puras que representam regras de distribuição de conteúdo
// baseadas nos metadados editoriais (primaryHub, relatedHubs, locale, etc.).
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

// ─── Helper privado ─────────────────────────────────────────────────────────

/**
 * Retorna o locale efetivo de uma entrada, considerando o default pt-BR
 * quando o campo locale não é informado.
 */
function effectiveLocale(data: PublishedArticleData): Locale {
  return data.locale || 'pt-BR';
}

/**
 * Retorna true se a entrada é uma publicação não-draft e corresponde ao locale.
 * Esta é a base comum para todas as funções de distribuição.
 */
function isPublishedInLocale(data: PublishedArticleData, locale: Locale): boolean {
  return data.draft === false && effectiveLocale(data) === locale;
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
  if (!isPublishedInLocale(data, options.locale)) return false;
  if (data.primaryHub !== options.primaryHub) return false;
  return true;
}

// ─── matchesPublishedEditorialHub ────────────────────────────────────────────

export type MatchesPublishedEditorialHubOptions = {
  /** ID do hub editorial a verificar (primário ou relacionado) */
  hub: EditorialHubId;
  /** Locale esperado */
  locale: Locale;
};

/**
 * Retorna true quando a entrada da collection artigos é uma publicação
 * não-draft, corresponde ao locale e está associada ao hub informado
 * como **primário** (primaryHub) ou **relacionado** (relatedHubs).
 *
 * Uma publicação pode aparecer em mais de uma listagem sem duplicação
 * do conteúdo — cada página de hub a inclui se houver correspondência.
 *
 * A URL canônica e a rota do artigo permanecem determinadas pelo slug
 * original; inclusão em listagens secundárias não cria cópia da publicação.
 */
export function matchesPublishedEditorialHub(
  data: PublishedArticleData,
  options: MatchesPublishedEditorialHubOptions,
): boolean {
  if (!isPublishedInLocale(data, options.locale)) return false;
  if (data.primaryHub === options.hub) return true;
  if (data.relatedHubs && data.relatedHubs.includes(options.hub)) return true;
  return false;
}
