import type { CollectionEntry } from 'astro:content';
import type { Locale } from '../i18n/utils';

export type HomeArticle = CollectionEntry<'artigos'>;

export interface HomeRadarItem {
  article: HomeArticle;
  activityDate: Date;
  activityKind: 'published' | 'updated';
}

export interface HomeEditorialData {
  publishedArticles: HomeArticle[];
  leadArticle: HomeArticle | null;
  secondaryArticles: HomeArticle[];
  radarNowItems: HomeRadarItem[];
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

  const leadArticle = publishedArticles[0] ?? null;
  const secondaryArticles = publishedArticles.slice(1, 3);
  const featuredIds = new Set([
    ...(leadArticle ? [leadArticle.id] : []),
    ...secondaryArticles.map(({ id }) => id),
  ]);
  const radarNowItems = publishedArticles
    .filter(({ id }) => !featuredIds.has(id))
    .map((article): HomeRadarItem => {
      const updatedAt = article.data.updatedAt;
      const hasVerifiedUpdate = Boolean(updatedAt && updatedAt.getTime() <= buildTimestamp);

      return {
        article,
        activityDate: hasVerifiedUpdate ? updatedAt! : article.data.date,
        activityKind: hasVerifiedUpdate ? 'updated' : 'published',
      };
    })
    .sort((first, second) => {
      const dateDifference = second.activityDate.getTime() - first.activityDate.getTime();
      if (dateDifference) return dateDifference;
      if (first.article.id < second.article.id) return -1;
      if (first.article.id > second.article.id) return 1;
      return 0;
    })
    .slice(0, 4);

  return { publishedArticles, leadArticle, secondaryArticles, radarNowItems };
}

export async function loadHomeEditorialData(
  locale: Locale,
  buildTime = new Date(),
): Promise<HomeEditorialData> {
  const { getCollection } = await import('astro:content');
  const entries = await getCollection('artigos');
  return selectHomeArticles(entries, locale, buildTime);
}
