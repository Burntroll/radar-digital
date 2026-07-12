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
function groupPublishedByKey(entries: ArtigoEntry[]): Map<string, ArtigoEntry[]> {
  const published = entries.filter((e) => e.data.draft === false);
  const groups = new Map<string, ArtigoEntry[]>();

  for (const entry of published) {
    const key = entry.data.translationKey ?? `__no_key__${entry.slug}`;
    if (!groups.has(key)) {
      groups.set(key, []);
    }
    groups.get(key)!.push(entry);
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

  for (const [key, group] of groups) {
    // Pula grupos sem chave real (conteúdos isolados)
    if (key.startsWith('__no_key__')) continue;

    // Conta locales presentes
    const localeCount = new Map<string, string[]>();
    for (const entry of group) {
      const loc = entry.data.locale;
      if (!localeCount.has(loc)) {
        localeCount.set(loc, []);
      }
      localeCount.get(loc)!.push(entry.id || entry.slug);
    }

    // Regra 1: locale duplicado na mesma chave
    for (const [loc, entries] of localeCount) {
      if (entries.length > 1) {
        errors.push(
          `Duplicate locale "${loc}" for translationKey "${key}" in: ${entries.join(', ')}`
        );
      }
    }

    // Regra 2: chave com apenas um locale publicado
    if (localeCount.size < 2) {
      const locs = Array.from(localeCount.keys()).join(', ');
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
