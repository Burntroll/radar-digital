import { ui, type UIKey } from './ui';
import { locales, defaultLocale, enabledLocales, type Locale } from './config';
import { routeMap, type RouteKey } from './routes';

/**
 * Gera o path público de uma rota localizada.
 *
 * Exemplos:
 *   routePath('monetizacao', 'es')           → '/es/monetizacion'
 *   routePath('artigos', 'es', 'meu-slug')   → '/es/articulos/meu-slug'
 *   routePath('bonus', 'pt-BR')              → '/bonus'
 *
 * Usa locales[].prefix da config central, então zh-CN usará /zh-cn/ automaticamente.
 */
export function routePath(key: RouteKey, locale: Locale, ...segments: string[]): string {
  const slug = routeMap[key][locale as keyof (typeof routeMap)[typeof key]];
  const prefix = locales[locale].prefix;
  const base = prefix ? `/${prefix}/${slug}` : `/${slug}`;
  if (segments.length === 0) return base;
  return base + '/' + segments.join('/');
}

export type { RouteKey, Locale, UIKey };

/**
 * Retorna o conjunto de idiomas habilitados no formato { locale: label }.
 * Mantido para compatibilidade com código que usa `languages`.
 */
export const languages = Object.fromEntries(
  enabledLocales.map((l) => [l, locales[l].label])
) as Record<Locale, string>;

export { defaultLocale };

/**
 * Retorna o dateLocale (formato de data) para um dado locale.
 */
export function getDateLocale(locale: Locale): string {
  return locales[locale].dateLocale;
}

/**
 * Extrai o locale a partir do pathname atual.
 * Ex: '/es/parceiros' -> 'es'; '/en/bonus' -> 'en'; '/' -> 'pt-BR'
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  // Procura entre os locales habilitados cujo prefixo não seja vazio
  const match = enabledLocales.find(
    (l) => locales[l].prefix && locales[l].prefix === lang
  );
  return match || defaultLocale;
}

/**
 * Gera o path equivalente em outro locale.
 * - locale padrão (pt-BR): sem prefixo
 * - demais locales: /{prefix}/...
 * - Preserva o restante do path (slug de artigo, categoria, etc.)
 *
 * @deprecated Use localizeRoutePath() para rotas públicas que precisam
 *             de tradução de slug via routeMap.
 */
export function localizePath(path: string, targetLocale: Locale): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const segments = cleanPath.split('/').filter(Boolean);

  // Remove prefixo de locale do início, se existir (qualquer locale habilitado)
  for (const l of enabledLocales) {
    const p = locales[l].prefix;
    if (p && segments[0] === p) {
      segments.shift();
      break;
    }
  }

  const basePath = '/' + segments.join('/');

  if (targetLocale === defaultLocale || !locales[targetLocale].prefix) {
    return basePath || '/';
  }
  return `/${locales[targetLocale].prefix}${basePath === '/' ? '' : basePath}`;
}

/**
 * Localiza uma rota pública traduzindo o primeiro segmento via routeMap.
 *
 * Exemplos:
 *   localizeRoutePath('/bonus/', 'es')                  → '/es/bonos/'
 *   localizeRoutePath('/es/bonos/', 'pt-BR')            → '/bonus/'
 *   localizeRoutePath('/ferramentas/trackers/', 'es')   → '/es/herramientas/trackers/'
 *   localizeRoutePath('/marketing-digital/', 'es')      → '/es/marketing-digital/'
 *   localizeRoutePath('/artigos/meu-slug/', 'es')       → '/es/articulos/meu-slug/'
 *
 * Fallback para localizePath() quando o primeiro segmento
 * não corresponde a nenhuma rota do routeMap.
 */
export function localizeRoutePath(path: string, targetLocale: Locale): string {
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const segments = cleanPath.split('/').filter(Boolean);

  // Detecta e remove prefixo de locale
  for (const l of enabledLocales) {
    const p = locales[l].prefix;
    if (p && segments[0] === p) {
      segments.shift();
      break;
    }
  }

  // Se há primeiro segmento, tenta traduzir via routeMap
  if (segments.length > 0) {
    const first = segments[0];
    for (const key of Object.keys(routeMap) as RouteKey[]) {
      const mapping = routeMap[key] as Record<string, string>;
      for (const localeKey of enabledLocales) {
        if (mapping[localeKey] === first) {
          segments[0] = mapping[targetLocale] ?? first;
          break;
        }
      }
      if (segments[0] !== first) break;
    }
  }

  const basePath = '/' + segments.join('/');

  if (targetLocale === defaultLocale || !locales[targetLocale].prefix) {
    return basePath || '/';
  }
  return `/${locales[targetLocale].prefix}${basePath === '/' ? '' : basePath}`;
}

/**
 * Traduz uma chave da UI.
 * Fallback automático pro PT se a chave não tiver tradução.
 */
export function t(key: UIKey, locale: Locale): string {
  const entry = ui[key];
  if (!entry) {
    console.warn(`[i18n] Missing UI key: ${key}`);
    return key;
  }
  return (entry as any)[locale] ?? (entry as any)[defaultLocale];
}

/**
 * Gera hreflang alternates para todos os idiomas habilitados,
 * usando localizeRoutePath() para traduzir slugs via routeMap.
 */
export function getAlternates(path: string): { lang: string; href: string }[] {
  return enabledLocales.map((lang) => ({
    lang,
    href: localizeRoutePath(path, lang),
  }));
}
