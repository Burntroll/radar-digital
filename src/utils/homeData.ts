import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/utils';

export type HomeArticle = CollectionEntry<'artigos'>;

export interface HomeEditorialData {
  publishedArticles: HomeArticle[];
  leadArticle: HomeArticle | null;
  secondaryArticles: HomeArticle[];
}

export function selectHomeArticles(
  entries: HomeArticle[],
  locale: Locale,
  buildTime: Date,
): HomeEditorialData {
  const buildTimestamp = buildTime.getTime();
  const publishedArticles = entries
    .filter(({ data }) => (
      data.draft === false
      && data.contentType === 'article'
      && (data.locale || 'pt-BR') === locale
      && data.date.getTime() <= buildTimestamp
    ))
    .sort((first, second) => {
      const dateDifference = second.data.date.getTime() - first.data.date.getTime();
      if (dateDifference) return dateDifference;
      if (first.id < second.id) return -1;
      if (first.id > second.id) return 1;
      return 0;
    });

  return {
    publishedArticles,
    leadArticle: publishedArticles[0] ?? null,
    secondaryArticles: publishedArticles.slice(1, 3),
  };
}

export async function loadHomeEditorialData(
  locale: Locale,
  buildTime = new Date(),
): Promise<HomeEditorialData> {
  const { getCollection } = await import('astro:content');
  const entries = await getCollection('artigos');
  return selectHomeArticles(entries, locale, buildTime);
}
