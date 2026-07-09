import { ui, type UIKey } from './ui';
import { locales, defaultLocale, enabledLocales, type Locale } from './config';

export type { Locale, UIKey };

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
 * Gera hreflang alternates para todos os idiomas habilitados.
 */
export function getAlternates(path: string): { lang: string; href: string }[] {
  return enabledLocales.map((lang) => ({
    lang,
    href: localizePath(path, lang),
  }));
}
