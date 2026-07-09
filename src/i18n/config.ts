// ═══════════════════════════════════════════════════════════
// CONFIGURAÇÃO CENTRAL DE IDIOMAS
// ═══════════════════════════════════════════════════════════
// Adicione novos idiomas aqui — o restante do sistema
// (rotas, hreflang, formatação de data) se adapta automaticamente.
// ═══════════════════════════════════════════════════════════

export const locales = {
  'pt-BR': {
    label: 'Português',
    shortLabel: 'PT',
    prefix: '',         // raiz /
    dateLocale: 'pt-BR',
    flag: '🇧🇷',
    enabled: true,
  },
  'es': {
    label: 'Español',
    shortLabel: 'ES',
    prefix: 'es',
    dateLocale: 'es-ES',
    flag: '🇪🇸',
    enabled: true,
  },
  'en': {
    label: 'English',
    shortLabel: 'EN',
    prefix: 'en',
    dateLocale: 'en-US',
    flag: '🇺🇸',
    enabled: false,     // ainda não implementado
  },
  'vi': {
    label: 'Tiếng Việt',
    shortLabel: 'VI',
    prefix: 'vi',
    dateLocale: 'vi-VN',
    flag: '🇻🇳',
    enabled: false,     // ainda não implementado
  },
  'zh-CN': {
    label: '简体中文',
    shortLabel: 'ZH',
    prefix: 'zh-cn',
    dateLocale: 'zh-CN',
    flag: '🇨🇳',
    enabled: false,     // ainda não implementado
  },
} as const;

export type Locale = keyof typeof locales;
export const defaultLocale: Locale = 'pt-BR';
export const supportedLocales = Object.keys(locales) as Locale[];
export const enabledLocales = supportedLocales.filter((l) => locales[l].enabled);
