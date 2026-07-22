import type { CollectionEntry } from 'astro:content';
import { editorialFormats } from '../config/editorialFormats';
import { editorialHubs, type EditorialHubId } from '../config/editorialHubs';
import { editorialTopics, type EditorialTopicId } from '../config/editorialTopics';
import { routePath, t, type Locale, type RouteKey, type UIKey } from '../i18n/utils';

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

export interface HomeHubItem {
  id: EditorialHubId;
  label: string;
  description: string;
  monogram: string;
  href: string;
  coverageCount: number;
}

export type HomeIntentKind = 'editorial' | 'functional';

export interface HomeIntentItem {
  id: string;
  kind: HomeIntentKind;
  emoji: string;
  titleKey: UIKey;
  descriptionKey: UIKey;
  href: string;
}

export interface HomeEditorialData {
  publishedArticles: HomeArticle[];
  leadArticle: HomeArticle | null;
  secondaryArticles: HomeArticle[];
  radarNowItems: HomeRadarItem[];
  topicRailItems: HomeTopicItem[];
  editorialSelectionArticles: HomeArticle[];
  latestPublicationArticles: HomeArticle[];
  editorialHubItems: HomeHubItem[];
  intentItems: HomeIntentItem[];
}

interface HomeHubRouteContract {
  routeKey: RouteKey;
  descriptionKey: UIKey;
  monogram: string;
}

const homeHubRouteContracts: Partial<Record<EditorialHubId, HomeHubRouteContract>> = {
  'artificial-intelligence': {
    routeKey: 'inteligencia-artificial',
    descriptionKey: 'nav.ia.desc',
    monogram: 'IA',
  },
  'digital-marketing': {
    routeKey: 'marketing-digital',
    descriptionKey: 'nav.marketing.desc',
    monogram: 'MD',
  },
  monetization: {
    routeKey: 'monetizacao',
    descriptionKey: 'nav.monetizacao.desc',
    monogram: 'M',
  },
};

// ─── Contratos de intenção (Task 7.15 — Resolver hoje) ─────────────────────
//
// Cada intenção mapeia uma necessidade do leitor para um destino real:
//   - editorial: hub ativo com rota pública, exibido somente quando o hub
//     possui cobertura publicada no locale corrente (mesma regra de 7.14).
//   - functional: rota estrutural existente (guias, ferramentas, bônus),
//     exibida somente quando possui conteúdo publicado no locale corrente.
//
// Intenções sem rota, sem cobertura ou com formato planejado permanecem
// ocultas — nenhum card decorativo é renderizado.
interface HomeIntentContract {
  id: string;
  kind: HomeIntentKind;
  emoji: string;
  titleKey: UIKey;
  descriptionKey: UIKey;
  resolve: (args: {
    locale: Locale;
    hubCoverage: ReadonlyMap<EditorialHubId, number>;
    publishedEntries: readonly HomeArticle[];
  }) => string | null;
}

const homeIntentContracts: readonly HomeIntentContract[] = [
  {
    id: 'trafego',
    kind: 'editorial',
    emoji: '📈',
    titleKey: 'home.card.trafego.title',
    descriptionKey: 'home.card.trafego.desc',
    resolve: ({ locale, hubCoverage }) =>
      (hubCoverage.get('digital-marketing') ?? 0) > 0
        ? routePath('marketing-digital', locale)
        : null,
  },
  {
    id: 'ia',
    kind: 'editorial',
    emoji: '🤖',
    titleKey: 'home.card.ia.title',
    descriptionKey: 'home.card.ia.desc',
    resolve: ({ locale, hubCoverage }) =>
      (hubCoverage.get('artificial-intelligence') ?? 0) > 0
        ? routePath('inteligencia-artificial', locale)
        : null,
  },
  {
    id: 'monetizar',
    kind: 'editorial',
    emoji: '💰',
    titleKey: 'home.card.monetizar.title',
    descriptionKey: 'home.card.monetizar.desc',
    resolve: ({ locale, hubCoverage }) =>
      (hubCoverage.get('monetization') ?? 0) > 0
        ? routePath('monetizacao', locale)
        : null,
  },
  {
    id: 'guias',
    kind: 'functional',
    emoji: '📋',
    titleKey: 'home.card.organizar.title',
    descriptionKey: 'home.card.organizar.desc',
    resolve: ({ locale, publishedEntries }) =>
      publishedEntries.some(({ data }) => data.contentType === 'guide')
        ? routePath('guias', locale)
        : null,
  },
  {
    id: 'ferramentas',
    kind: 'functional',
    emoji: '🧰',
    titleKey: 'home.card.ferramentas.title',
    descriptionKey: 'home.card.ferramentas.desc',
    resolve: ({ locale }) => routePath('parceiros', locale),
  },
  {
    id: 'bonus',
    kind: 'functional',
    emoji: '🎁',
    titleKey: 'home.card.bonus.title',
    descriptionKey: 'home.card.bonus.desc',
    resolve: ({ locale }) => routePath('bonus', locale),
  },
];

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
  const occupiedEditorialIds = new Set([
    ...upperEditorialIds,
    ...editorialSelectionArticles.map(({ id }) => id),
  ]);
  const latestPublicationArticles = publishedArticles
    .filter(({ id }) => !occupiedEditorialIds.has(id))
    .slice(0, 6);

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
  const hubCoverage = publishedEntries.reduce((coverage, { data }) => {
    if (!activeEditorialFormats.has(data.contentType)) return coverage;
    const hubIds = new Set<EditorialHubId>([
      ...(data.primaryHub ? [data.primaryHub] : []),
      ...(data.relatedHubs ?? []),
    ]);
    for (const hubId of hubIds) {
      coverage.set(hubId, (coverage.get(hubId) ?? 0) + 1);
    }
    return coverage;
  }, new Map<EditorialHubId, number>());
  const editorialHubItems = editorialHubs.flatMap((hub): HomeHubItem[] => {
    if (hub.status !== 'active') return [];

    const routeContract = homeHubRouteContracts[hub.id];
    if (!routeContract) return [];

    const coverageCount = hubCoverage.get(hub.id) ?? 0;
    if (coverageCount === 0) return [];

    return [{
      id: hub.id,
      label: locale === 'es' ? hub.labelEs : hub.labelPt,
      description: t(routeContract.descriptionKey, locale),
      monogram: routeContract.monogram,
      href: routePath(routeContract.routeKey, locale),
      coverageCount,
    }];
  });

  const intentItems = homeIntentContracts.flatMap((contract): HomeIntentItem[] => {
    const href = contract.resolve({ locale, hubCoverage, publishedEntries });
    if (!href) return [];

    return [{
      id: contract.id,
      kind: contract.kind,
      emoji: contract.emoji,
      titleKey: contract.titleKey,
      descriptionKey: contract.descriptionKey,
      href,
    }];
  });

  return {
    publishedArticles,
    leadArticle,
    secondaryArticles,
    radarNowItems,
    topicRailItems,
    editorialSelectionArticles,
    latestPublicationArticles,
    editorialHubItems,
    intentItems,
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
