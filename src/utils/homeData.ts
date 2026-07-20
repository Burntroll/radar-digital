import type { CollectionEntry } from 'astro:content';
import { editorialFormats } from '../config/editorialFormats';
import { editorialTopics, type EditorialTopicId } from '../config/editorialTopics';
import type { Locale } from '../i18n/utils';

export type HomeArticle = CollectionEntry<'artigos'>;

export interface HomeRadarItem {
  article: HomeArticle;
  activityDate: Date;
  activityKind: 'published' | 'updated';
}

export interface HomeTopicItem {
  id: EditorialTopicId;
  label: string;
  coverageCount: number;
  href: string | null;
}

export interface HomeEditorialData {
  publishedArticles: HomeArticle[];
  leadArticle: HomeArticle | null;
  secondaryArticles: HomeArticle[];
  radarNowItems: HomeRadarItem[];
  topicRailItems: HomeTopicItem[];
  editorialSelectionArticles: HomeArticle[];
}

const activeEditorialFormats = new Set(
  editorialFormats
    .filter(({ status }) => status === 'active')
    .map(({ id }) => id),
);

function compareByPublishedDate(first: HomeArticle, second: HomeArticle): number {
  const dateDifference = second.data.date.getTime() - first.data.date.getTime();
  if (dateDifference) return dateDifference;
  if (first.id < second.id) return -1;
  if (first.id > second.id) return 1;
  return 0;
}

export function selectHomeArticles(
  entries: HomeArticle[],
  locale: Locale,
  buildTime: Date,
): HomeEditorialData {
  const buildTimestamp = buildTime.getTime();
  const publishedEntries = entries.filter(({ data }) => (
    data.draft === false
    && (data.locale || 'pt-BR') === locale
    && data.date.getTime() <= buildTimestamp
  ));
  const orderedPublishedEntries = [...publishedEntries].sort(compareByPublishedDate);
  const publishedArticles = orderedPublishedEntries
    .filter(({ data }) => data.contentType === 'article');

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

  const upperEditorialIds = new Set([
    ...featuredIds,
    ...radarNowItems.map(({ article }) => article.id),
  ]);
  const editorialSelectionArticles = orderedPublishedEntries
    .filter(({ id, data }) => (
      activeEditorialFormats.has(data.contentType)
      && !upperEditorialIds.has(id)
    ))
    .slice(0, 3);

  const topicCoverage = publishedEntries.reduce((coverage, { data }) => {
    for (const topicId of data.topics ?? []) {
      coverage.set(topicId, (coverage.get(topicId) ?? 0) + 1);
    }
    return coverage;
  }, new Map<EditorialTopicId, number>());
  const topicRailItems = editorialTopics
    .filter(({ id, status }) => status === 'active' && topicCoverage.has(id))
    .map(({ id, labelPt, labelEs }): HomeTopicItem => ({
      id,
      label: locale === 'es' ? labelEs : labelPt,
      coverageCount: topicCoverage.get(id)!,
      // O registro de topics ainda não define rotas públicas.
      href: null,
    }));

  return {
    publishedArticles,
    leadArticle,
    secondaryArticles,
    radarNowItems,
    topicRailItems,
    editorialSelectionArticles,
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
