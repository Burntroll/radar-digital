// ═════════════════════════════════════════════════════════════════════════════
// Validação global de grupos de tradução editorial
//
// Funções para validar e consultar grupos de tradução entre publicações
// da collection artigos, usando translationKey como identificador estável.
// ═════════════════════════════════════════════════════════════════════════════

import type { CollectionEntry } from 'astro:content';

type ArtigoEntry = CollectionEntry<'artigos'>;

/**
 * Locales ordenados deterministicamente para geração de alternates.
 * pt-BR primeiro, depois es, depois demais (futuros).
 */
const ALT_ORDER: Record<string, number> = {
  'pt-BR': 0,
  'es': 1,
};

/**
 * Agrupa entradas publicadas por translationKey.
 * Entradas sem chave ficam em grupo próprio (só elas mesmas).
 */
function groupPublishedByKey(entries: ArtigoEntry[]): Record<string, ArtigoEntry[]> {
  const published = entries.filter((e) => e.data.draft === false);
  const groups: Record<string, ArtigoEntry[]> = {};

  for (const entry of published) {
    const key = entry.data.translationKey ?? `__no_key__${entry.slug}`;
    if (!groups[key]) {
      groups[key] = [];
    }
    groups[key].push(entry);
  }

  return groups;
}

/**
 * Valida todos os grupos de tradução entre publicações publicadas.
 *
 * Regras:
 * 1. No máximo uma publicação por locale em cada chave.
 * 2. Uma chave utilizada deve formar grupo real (>=2 locales diferentes).
 * 3. Conteúdo sem chave continua válido.
 *
 * Lança erro com detalhes se alguma regra for violada.
 */
export function validatePublishedTranslationGroups(entries: ArtigoEntry[]): void {
  const groups = groupPublishedByKey(entries);
  const errors: string[] = [];

  const groupKeys = Object.keys(groups);

  for (let g = 0; g < groupKeys.length; g++) {
    const key = groupKeys[g];
    const group: any[] = groups[key];
    // Pula grupos sem chave real (conteúdos isolados)
    if (key.startsWith('__no_key__')) continue;

    // Conta locales presentes
    const localeCount: Record<string, string[]> = {};
    for (let i = 0; i < group.length; i++) {
      const entry: any = group[i];
      const loc = entry.data.locale;
      if (!localeCount[loc]) {
        localeCount[loc] = [];
      }
      localeCount[loc].push(entry.id || entry.slug);
    }

    // Regra 1: locale duplicado na mesma chave
    for (const loc of Object.keys(localeCount)) {
      const entries = localeCount[loc];
      if (entries.length > 1) {
        errors.push(
          `Duplicate locale "${loc}" for translationKey "${key}" in: ${entries.join(', ')}`
        );
      }
    }

    // Regra 2: chave com apenas um locale publicado
    if (Object.keys(localeCount).length < 2) {
      const locs = Object.keys(localeCount).join(', ');
      const slugs = group.map((e) => e.slug).join(', ');
      errors.push(
        `translationKey "${key}" has only one published locale (${locs}) — entries: ${slugs}`
      );
    }
  }

  if (errors.length > 0) {
    throw new Error(
      `Translation group validation failed:\n${errors.map((e) => `  - ${e}`).join('\n')}`
    );
  }
}

/**
 * Retorna as publicações do mesmo grupo de tradução que a entrada fornecida.
 *
 * Para entradas sem translationKey, retorna apenas a própria entrada.
 * Ordem determinística: pt-BR primeiro, depois es, depois outros.
 */
export function getPublishedTranslationGroup(
  entries: ArtigoEntry[],
  entry: ArtigoEntry
): ArtigoEntry[] {
  const published = entries.filter((e) => e.data.draft === false);
  const key = entry.data.translationKey;

  if (!key) {
    return [entry];
  }

  const group = published.filter((e) => e.data.translationKey === key);

  // Ordem determinística
  return group.sort((a, b) => {
    const orderA = ALT_ORDER[a.data.locale] ?? 99;
    const orderB = ALT_ORDER[b.data.locale] ?? 99;
    return orderA - orderB;
  });
}
