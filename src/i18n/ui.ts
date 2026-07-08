// ═══════════════════════════════════════════════════════════
// DICIONÁRIO DE TRADUÇÕES DA UI
// ═══════════════════════════════════════════════════════════
// Adicione chaves novas aqui conforme a UI for crescendo.
// Estrutura: { chave: { 'pt-BR': '...', 'es': '...' } }
// Acesse via t(ui, 'chave', locale) — fallback automático pra PT.
// ═══════════════════════════════════════════════════════════

export const languages = {
  'pt-BR': 'Português',
  'es': 'Español',
} as const;

export type Locale = keyof typeof languages;
export const defaultLocale: Locale = 'pt-BR';
export const locales: Locale[] = Object.keys(languages) as Locale[];

export const ui = {
  // Nav
  'nav.home':           { 'pt-BR': 'Início',         'es': 'Inicio' },
  'nav.marketing':      { 'pt-BR': 'Marketing',      'es': 'Marketing' },
  'nav.ia':             { 'pt-BR': 'IA',             'es': 'IA' },
  'nav.monetizacao':    { 'pt-BR': 'Monetização',    'es': 'Monetización' },
  'nav.parceiros':      { 'pt-BR': 'Ferramentas',  'es': 'Herramientas' },

  // Footer
  'footer.copyright':   { 'pt-BR': 'Radar Digital © 2026', 'es': 'Radar Digital © 2026' },
  'footer.privacidade': { 'pt-BR': 'Privacidade',    'es': 'Privacidad' },
  'footer.termos':      { 'pt-BR': 'Termos',         'es': 'Términos' },
  'footer.contato':     { 'pt-BR': 'Contato',        'es': 'Contacto' },

  // Theme toggle
  'theme.toggle':       { 'pt-BR': 'Alternar tema',  'es': 'Cambiar tema' },

  // Home
  'home.hero.badge':    { 'pt-BR': 'Tendências',     'es': 'Tendencias' },
  'home.hero.title1':   { 'pt-BR': 'Marketing,',     'es': 'Marketing,' },
  'home.hero.title2':   { 'pt-BR': 'IA &',           'es': 'IA &' },
  'home.hero.title3':   { 'pt-BR': 'Monetização',    'es': 'Monetización' },
  'home.hero.subtitle': {
    'pt-BR': 'Estratégias, ferramentas e o que está movendo o ponteiro do marketing digital em 2026. Sem hype, sem enrolação.',
    'es': 'Estrategias, herramientas y lo que está moviendo el indicador del marketing digital en 2026. Sin hype, sin rodeos.',
  },
  'home.sections.title':  { 'pt-BR': 'Explore por área', 'es': 'Explora por área' },
  'home.articles.title':  { 'pt-BR': 'Últimos do Radar', 'es': 'Últimos del Radar' },
  'home.articles.all':    { 'pt-BR': 'Ver todos',         'es': 'Ver todos' },

  // Cards da home
  'home.card.marketing.desc': {
    'pt-BR': 'SEO, tráfego pago, redes sociais, email marketing, funis de venda e tudo que move o ponteiro do seu negócio digital.',
    'es': 'SEO, tráfico pagado, redes sociales, email marketing, embudos de venta y todo lo que mueve el indicador de tu negocio digital.',
  },
  'home.card.ia.desc': {
    'pt-BR': 'Ferramentas, prompts, automações, agentes e tudo que está mudando (de verdade) com IA em 2026.',
    'es': 'Herramientas, prompts, automatizaciones, agentes y todo lo que está cambiando (de verdad) con IA en 2026.',
  },
  'home.card.monetizacao.desc': {
    'pt-BR': 'Infoprodutos, afiliados, assinaturas, dropshipping, publicidade digital e modelos de negócio escaláveis.',
    'es': 'Infoproductos, afiliados, suscripciones, dropshipping, publicidad digital y modelos de negocio escalables.',
  },
  'home.card.parceiros.desc': {
    'pt-BR': 'Trackers, antidetect, spy services, criativos, gateways, proxies. Ferramentas curadas por nicho.',
    'es': 'Trackers, antidetect, spy services, creativos, gateways, proxies. Herramientas curadas por nicho.',
  },
  'home.card.explorar': { 'pt-BR': 'Explorar', 'es': 'Explorar' },
  'home.card.diretorio': { 'pt-BR': 'Ver diretório', 'es': 'Ver directorio' },

  // Categorias (genérico)
  'cat.articles.planned': { 'pt-BR': 'Artigos planejados', 'es': 'Artículos planejados' },
  'cat.articles.published': { 'pt-BR': 'Publicados', 'es': 'Publicados' },
  'cat.breadcrumb.home':  { 'pt-BR': 'Início', 'es': 'Inicio' },
  'cat.breadcrumb.youarehere': { 'pt-BR': 'Você está em', 'es': 'Estás en' },
  'cat.empty.title':      { 'pt-BR': 'Em breve', 'es': 'Próximamente' },
  'cat.empty.desc':       { 'pt-BR': 'Estamos preparando conteúdo pra essa categoria. Volte em alguns dias.', 'es': 'Estamos preparando contenido para esta categoría. Vuelve en unos días.' },
  'cat.tag.em-breve':     { 'pt-BR': 'Em breve', 'es': 'Próximamente' },
  'cat.tag.featured':     { 'pt-BR': 'Destaque', 'es': 'Destacado' },
  'cat.cta.back':         { 'pt-BR': 'Voltar para a home', 'es': 'Volver al inicio' },
  'cat.cta.back.parceiros': { 'pt-BR': 'Ver todas as categorias', 'es': 'Ver todas las categorías' },
  'cat.cta.see.more':     { 'pt-BR': 'Ver mais artigos de', 'es': 'Ver más artículos de' },

  // Categorias - nomes
  'cat.marketing.name':     { 'pt-BR': 'Marketing Digital',  'es': 'Marketing Digital' },
  'cat.marketing.tagline':  { 'pt-BR': 'Estratégias, tráfego e conversão', 'es': 'Estrategias, tráfico y conversión' },
  'cat.marketing.desc':     {
    'pt-BR': 'SEO, tráfego pago, redes sociais, email marketing, funis de venda e tudo que move o ponteiro do seu negócio digital.',
    'es': 'SEO, tráfico pagado, redes sociales, email marketing, embudos de venta y todo lo que mueve el indicador de tu negocio digital.',
  },
  'cat.ia.name':     { 'pt-BR': 'Inteligência Artificial', 'es': 'Inteligencia Artificial' },
  'cat.ia.tagline':  { 'pt-BR': 'Ferramentas, automação e estratégia', 'es': 'Herramientas, automatización y estrategia' },
  'cat.ia.desc':     {
    'pt-BR': 'IA aplicada ao marketing e ao negócio: ferramentas, prompts, automações, agentes e tudo que está mudando (de verdade) em 2026.',
    'es': 'IA aplicada al marketing y al negocio: herramientas, prompts, automatizaciones, agentes y todo lo que está cambiando (de verdad) en 2026.',
  },
  'cat.monetizacao.name':    { 'pt-BR': 'Monetização', 'es': 'Monetización' },
  'cat.monetizacao.tagline': { 'pt-BR': 'Modelos de negócio digital', 'es': 'Modelos de negocio digital' },
  'cat.monetizacao.desc':    {
    'pt-BR': 'Infoprodutos, afiliados, assinaturas, dropshipping, SaaS e modelos de negócio escaláveis que funcionam de verdade.',
    'es': 'Infoproductos, afiliados, suscripciones, dropshipping, SaaS y modelos de negocio escalables que funcionan de la verdad.',
  },

  // Parceiros
  'parceiros.title':    { 'pt-BR': 'Parceiros & Ferramentas', 'es': 'Socios & Herramientas' },
  'parceiros.tagline':  { 'pt-BR': 'Diretório curado',        'es': 'Directorio curado' },
  'parceiros.subtitle': {
    'pt-BR': 'Curadoria de ferramentas, serviços e plataformas que recomendamos por nicho. Cada parceiro listado aqui passou por critério: utilidade real, mercado ativo, reputação consistente.',
    'es': 'Curaduría de herramientas, servicios y plataformas que recomendamos por nicho. Cada socio listado aquí pasó por criterio: utilidad real, mercado activo, reputación consistente.',
  },
  'parceiros.stats.categorias': { 'pt-BR': 'Categorias',     'es': 'Categorías' },
  'parceiros.stats.parceiros':  { 'pt-BR': 'Ferramentas listadas', 'es': 'Herramientas listadas' },
  'parceiros.stats.destaques':  { 'pt-BR': 'Em destaque',    'es': 'Destacados' },
  'parceiros.sections.title':   { 'pt-BR': 'Escolha o nicho', 'es': 'Elige el nicho' },
  'parceiros.sections.subtitle': {
    'pt-BR': 'Cada categoria traz uma explicação do segmento e os parceiros que recomendamos.',
    'es': 'Cada categoría trae una explicación del segmento y los socios que recomendamos.',
  },
  'parceiros.category.cta':     { 'pt-BR': 'Ver parceiros',  'es': 'Ver socios' },
  'parceiros.detail.cta.see':   { 'pt-BR': 'Ver diretório completo', 'es': 'Ver directorio completo' },
  'parceiros.detail.dropdown.title': { 'pt-BR': 'Categorias',  'es': 'Categorías' },

  // Locale switcher
  'locale.switcher.label': { 'pt-BR': 'Idioma', 'es': 'Idioma' },
  'locale.unavailable':    { 'pt-BR': 'Em breve em', 'es': 'Próximamente en' },
} as const;

export type UIKey = keyof typeof ui;
