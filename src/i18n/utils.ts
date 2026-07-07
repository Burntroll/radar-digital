import { ui, languages, defaultLocale, type Locale, type UIKey } from './ui';

/**
 * Extrai o locale a partir do pathname atual.
 * Ex: '/es/parceiros' -> 'es'; '/parceiros' -> 'pt-BR'
 */
export function getLocaleFromUrl(url: URL): Locale {
  const [, lang] = url.pathname.split('/');
  if (lang === 'es') return 'es';
  return defaultLocale;
}

/**
 * Gera o path equivalente em outro locale.
 * - Se a URL atual é '/parceiros' e o target é 'es', retorna '/es/parceiros'
 * - Se a URL atual é '/es/parceiros' e o target é 'pt-BR', retorna '/parceiros'
 * - Preserva o restante do path (slug de artigo, categoria, etc.)
 */
export function localizePath(path: string, targetLocale: Locale): string {
  // Remove barra inicial pra padronizar
  const cleanPath = path.startsWith('/') ? path.slice(1) : path;
  const segments = cleanPath.split('/').filter(Boolean);

  // Se o primeiro segmento é um locale conhecido, tira ele
  if (segments[0] === 'es' || segments[0] === 'pt-BR') {
    segments.shift();
  }

  const basePath = '/' + segments.join('/');

  if (targetLocale === defaultLocale) {
    return basePath || '/';
  }
  return `/${targetLocale}${basePath === '/' ? '' : basePath}`;
}

/**
 * Traduz uma chave da UI.
 * t(ui, 'nav.home', 'es') -> 'Inicio'
 * Fallback automático pro PT se a chave não tiver tradução.
 */
export function t(key: UIKey, locale: Locale): string {
  const entry = ui[key];
  if (!entry) {
    console.warn(`[i18n] Missing UI key: ${key}`);
    return key;
  }
  return entry[locale] ?? entry[defaultLocale];
}

/**
 * Helper pra gerar hreflang tags.
 */
export function getAlternates(path: string): { lang: string; href: string }[] {
  return (Object.keys(languages) as Locale[]).map((lang) => ({
    lang,
    href: localizePath(path, lang),
  }));
}

export { ui, languages, defaultLocale };
export type { Locale, UIKey };
