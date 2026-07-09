// ═══════════════════════════════════════════════════════════
// MAPA DE ROTAS LOCALIZADAS
// ═══════════════════════════════════════════════════════════
// Chave = identificador interno (sempre em pt).
// Valor = slug público por locale.
//
// Uso: routePath('monetizacao', locale) → '/monetizacao' (pt) ou '/es/monetizacion' (es)
//      routePath('artigos', locale, slug) → '/es/articulos/02-crear-prompts-que-funcionan'
// ═══════════════════════════════════════════════════════════

export const routeMap = {
  // Categorias de artigos
  'marketing-digital':       { 'pt-BR': 'marketing-digital',       'es': 'marketing-digital' },
  'inteligencia-artificial': { 'pt-BR': 'inteligencia-artificial', 'es': 'inteligencia-artificial' },
  'monetizacao':             { 'pt-BR': 'monetizacao',             'es': 'monetizacion' },

  // Páginas estruturais
  'bonus':                   { 'pt-BR': 'bonus',                   'es': 'bonos' },
  'parceiros':               { 'pt-BR': 'parceiros',               'es': 'herramientas' },
  'guias':                   { 'pt-BR': 'guias',                   'es': 'guias' },
  'market':                  { 'pt-BR': 'market',                  'es': 'market' },

  // Prefixo de artigos
  'artigos':                 { 'pt-BR': 'artigos',                 'es': 'articulos' },
} as const;

export type RouteKey = keyof typeof routeMap;
