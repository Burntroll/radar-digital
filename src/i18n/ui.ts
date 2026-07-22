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
  'nav.guias':          { 'pt-BR': 'Guias',         'es': 'Guías' },
  'nav.bonus':          { 'pt-BR': 'Bônus',         'es': 'Bonos' },
  'nav.market':         { 'pt-BR': 'Radar Market',  'es': 'Radar Market' },

  // Bloco 5 — novos grupos
  'nav.setores':        { 'pt-BR': 'Setores',       'es': 'Sectores' },
  'nav.operacao':       { 'pt-BR': 'Operação',      'es': 'Operación' },
  'nav.verticais':      { 'pt-BR': 'Verticais',     'es': 'Verticales' },
  'nav.recursos':       { 'pt-BR': 'Recursos',      'es': 'Recursos' },

  // Mega menu — Setores (apenas IA nesta task)
  'nav.ia.desc': {
    'pt-BR': 'Ferramentas, automação, prompts e estratégia de IA aplicada ao marketing digital.',
    'es': 'Herramientas, automatización, prompts y estrategia de IA aplicada al marketing digital.',
  },

  // Mega menu — Operação (grupos visuais)
  'nav.op.aquisicao':   { 'pt-BR': 'Aquisição e Crescimento', 'es': 'Adquisición y Crecimiento' },
  'nav.op.construcao':  { 'pt-BR': 'Construção e Monetização', 'es': 'Construcción y Monetización' },
  'nav.op.tecnologia':  { 'pt-BR': 'Tecnologia e Performance', 'es': 'Tecnología y Rendimiento' },

  // Mega menu — Operação (descrições dos filhos)
  'nav.marketing.desc': {
    'pt-BR': 'Estratégias, canais e execução para adquirir audiência e crescer.',
    'es': 'Estrategias, canales y ejecución para adquirir audiencia y crecer.',
  },
  'nav.monetizacao.desc': {
    'pt-BR': 'Modelos e práticas para transformar audiência e projetos em receita.',
    'es': 'Modelos y prácticas para convertir audiencia y proyectos en ingresos.',
  },

  // Footer
  'footer.copyright':   { 'pt-BR': 'Radar Digital © 2026', 'es': 'Radar Digital © 2026' },
  'footer.privacidade': { 'pt-BR': 'Privacidade',    'es': 'Privacidad' },
  'footer.termos':      { 'pt-BR': 'Termos',         'es': 'Términos' },
  'footer.contato':     { 'pt-BR': 'Contato',        'es': 'Contacto' },

  // Theme toggle
  'theme.toggle':       { 'pt-BR': 'Alternar tema',  'es': 'Cambiar tema' },

  // V4 — Masthead
  'masthead.home.label': { 'pt-BR': 'Radar Digital, início', 'es': 'Radar Digital, inicio' },
  'masthead.tagline':    { 'pt-BR': 'Notícias e inteligência', 'es': 'Noticias e inteligencia' },
  'masthead.theme':      { 'pt-BR': 'Tema', 'es': 'Tema' },

  // V4 — SignalBar
  'signal.label':              { 'pt-BR': 'Radar agora',          'es': 'Radar ahora' },
  'signal.status.updating':    { 'pt-BR': 'Em atualização',       'es': 'En actualización' },
  'signal.topics.label':       { 'pt-BR': 'Assuntos em movimento', 'es': 'Temas en movimiento' },
  'signal.newsletter':         { 'pt-BR': 'Newsletter',           'es': 'Newsletter' },
  'signal.language.change':    { 'pt-BR': 'Mudar idioma',         'es': 'Cambiar idioma' },
  'signal.topic.ai':           { 'pt-BR': 'IA aplicada ao trabalho', 'es': 'IA aplicada al trabajo' },
  'signal.topic.marketing':    { 'pt-BR': 'Marketing digital',    'es': 'Marketing digital' },
  'signal.topic.monetization': { 'pt-BR': 'Novos modelos de monetização', 'es': 'Nuevos modelos de monetización' },
  'signal.topic.guides':       { 'pt-BR': 'Guias para operações digitais', 'es': 'Guías para operaciones digitales' },

  // V4 — Home / Radar agora
  'home.radar.status': {
    'pt-BR': 'Recência editorial',
    'es': 'Recencia editorial',
  },
  'home.radar.updated': {
    'pt-BR': 'Atualizado em',
    'es': 'Actualizado el',
  },
  'home.radar.published': {
    'pt-BR': 'Publicado em',
    'es': 'Publicado el',
  },
  'home.radar.empty': {
    'pt-BR': 'Sem novas publicações além dos destaques.',
    'es': 'No hay nuevas publicaciones además de las destacadas.',
  },
  'home.radar.empty.note': {
    'pt-BR': 'O painel será preenchido quando houver outra história elegível.',
    'es': 'El panel se completará cuando haya otra historia elegible.',
  },
  'home.radar.footer': {
    'pt-BR': 'Datas editoriais verificadas',
    'es': 'Fechas editoriales verificadas',
  },

  // V4 — Home / Assuntos em destaque
  'home.topics.label': {
    'pt-BR': 'Em foco',
    'es': 'En foco',
  },
  'home.topics.a11y': {
    'pt-BR': 'Assuntos em destaque',
    'es': 'Temas destacados',
  },

  // V4 — Home / Seleção da redação
  'home.selection.eyebrow': {
    'pt-BR': 'Seleção da redação',
    'es': 'Selección de la redacción',
  },
  'home.selection.title': {
    'pt-BR': 'O que merece sua atenção agora',
    'es': 'Lo que merece tu atención ahora',
  },
  'home.selection.rule': {
    'pt-BR': 'Conteúdos recentes ainda não exibidos na abertura, em ordem de publicação.',
    'es': 'Contenidos recientes aún no mostrados en la apertura, por orden de publicación.',
  },

  // V4 — Home / Últimas publicações
  'home.latest.eyebrow': {
    'pt-BR': 'Fluxo editorial',
    'es': 'Flujo editorial',
  },
  'home.latest.title': {
    'pt-BR': 'Últimas publicações',
    'es': 'Últimas publicaciones',
  },
  'home.latest.description': {
    'pt-BR': 'Uma leitura rápida das histórias recentes que ainda não apareceram nos destaques acima.',
    'es': 'Una lectura rápida de las historias recientes que aún no aparecieron en los destacados anteriores.',
  },
  'home.latest.empty.title': {
    'pt-BR': 'Sem outras publicações recentes',
    'es': 'No hay otras publicaciones recientes',
  },
  'home.latest.empty.description': {
    'pt-BR': 'As histórias publicadas já estão nos destaques acima. Novos artigos aparecerão aqui sem repetição.',
    'es': 'Las historias publicadas ya están en los destacados anteriores. Los nuevos artículos aparecerán aquí sin repetición.',
  },

  // V4 — Home / Editorias
  'home.hubs.eyebrow': {
    'pt-BR': 'Cobertura editorial',
    'es': 'Cobertura editorial',
  },
  'home.hubs.title': {
    'pt-BR': 'Um portal. Vários radares.',
    'es': 'Un portal. Varios radares.',
  },
  'home.hubs.description': {
    'pt-BR': 'Editorias ativas, com conteúdo publicado e caminhos públicos para aprofundar cada tema.',
    'es': 'Secciones activas, con contenido publicado y rutas públicas para profundizar cada tema.',
  },
  'home.hubs.coverage.singular': {
    'pt-BR': 'publicação distribuída',
    'es': 'publicación distribuida',
  },
  'home.hubs.coverage.plural': {
    'pt-BR': 'publicações distribuídas',
    'es': 'publicaciones distribuidas',
  },
  'home.hubs.cta': {
    'pt-BR': 'Explorar editoria',
    'es': 'Explorar sección',
  },

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
    'pt-BR': 'Prompts, ferramentas e fluxos práticos para ganhar produtividade.',
    'es': 'Prompts, herramientas y flujos prácticos para ganar productividad.',
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

  // Home — masthead & meta
  'home.masthead.desc': {
    'pt-BR': 'Marketing, IA, monetização e ferramentas para quem trabalha na internet.',
    'es': 'Marketing, IA, monetización y herramientas para quien trabaja en internet.',
  },
  'home.meta.desc': {
    'pt-BR': 'Seu radar de tendências em marketing digital, inteligência artificial e monetização.',
    'es': 'Tu radar de tendencias en marketing digital, inteligencia artificial y monetización.',
  },

  // Home — section labels
  'home.section.leia':      { 'pt-BR': 'Leia primeiro',  'es': 'Lee primero' },
  'home.section.intencao':  { 'pt-BR': 'O que você quer resolver hoje?', 'es': '¿Qué quieres resolver hoy?' },
  'home.section.ultimas':   { 'pt-BR': 'Últimas publicações', 'es': 'Últimas publicaciones' },
  'home.section.recomendados': { 'pt-BR': 'Recomendados pela redação', 'es': 'Recomendados por la redacción' },
  'home.section.guias':     { 'pt-BR': 'Guias práticos', 'es': 'Guías prácticas' },
  'home.section.ferramentas': { 'pt-BR': 'Ferramentas na prática', 'es': 'Herramientas en la práctica' },
  'home.section.bonus':     { 'pt-BR': 'Bônus e códigos promocionais', 'es': 'Bonos y códigos promocionales' },
  'home.section.market':    { 'pt-BR': 'Radar Market',    'es': 'Radar Market' },

  // Home — nav cards (intenção)
  'home.card.trafego.title':    { 'pt-BR': 'Quero gerar mais tráfego',  'es': 'Quiero generar más tráfico' },
  'home.card.trafego.desc':     { 'pt-BR': 'Estratégias para atrair mais visitantes, cliques e oportunidades.', 'es': 'Estrategias para atraer más visitantes, clics y oportunidades.' },
  'home.card.ia.title':         { 'pt-BR': 'Quero usar IA no trabalho', 'es': 'Quiero usar IA en el trabajo' },
  'home.card.monetizar.title':  { 'pt-BR': 'Quero monetizar conteúdo',  'es': 'Quiero monetizar contenido' },
  'home.card.monetizar.desc':   { 'pt-BR': 'Ideias para transformar audiência, blogs e projetos digitais em receita.', 'es': 'Ideas para transformar audiencia, blogs y proyectos digitales en ingresos.' },
  'home.card.organizar.title':  { 'pt-BR': 'Quero organizar operações digitais', 'es': 'Quiero organizar operaciones digitales' },
  'home.card.organizar.desc':   { 'pt-BR': 'Guias e checklists para trabalhar melhor com contas, acessos e processos.', 'es': 'Guías y checklists para trabajar mejor con cuentas, accesos y procesos.' },
  'home.card.ferramentas.title': { 'pt-BR': 'Quero encontrar ferramentas', 'es': 'Quiero encontrar herramientas' },
  'home.card.ferramentas.desc':  { 'pt-BR': 'Categorias de ferramentas úteis para marketing, tráfego e monetização.', 'es': 'Categorías de herramientas útiles para marketing, tráfico y monetización.' },
  'home.card.bonus.title':      { 'pt-BR': 'Quero ver bônus e códigos', 'es': 'Quiero ver bonos y códigos' },
  'home.card.bonus.desc':       { 'pt-BR': 'Condições promocionais e benefícios verificados.', 'es': 'Condiciones promocionales y beneficios verificados.' },

  /* Resolver hoje (V4 — Task 7.15) */
  'home.intents.eyebrow':       { 'pt-BR': 'Resolver hoje', 'es': 'Resolver hoy' },
  'home.intents.title':         { 'pt-BR': 'O que você quer resolver?', 'es': '¿Qué quieres resolver?' },
  'home.intents.description':   { 'pt-BR': 'Acessos diretos a conteúdos, guias e ferramentas que resolvem sua intenção.', 'es': 'Accesos directos a contenidos, guías y herramientas que resuelven tu intención.' },
  'home.intents.cta':           { 'pt-BR': 'Acessar', 'es': 'Acceder' },
  'home.intents.a11y':          { 'pt-BR': 'Navegação por intenção', 'es': 'Navegación por intención' },

  // Home — article / guide labels
  'home.article.read':          { 'pt-BR': 'Ler',                'es': 'Leer' },
  'home.article.guide.badge':   { 'pt-BR': 'Guia',               'es': 'Guía' },
  'home.article.guide.read':    { 'pt-BR': 'Ler guia',           'es': 'Leer guía' },

  // Home — guides section
  'home.guides.desc': {
    'pt-BR': 'Checklists e passo a passo para aplicar no dia a dia.',
    'es': 'Checklists y paso a paso para aplicar en el día a día.',
  },
  'home.guides.all':            { 'pt-BR': 'Ver todos os guias', 'es': 'Ver todas las guías' },

  // Home — tools section
  'home.tools.desc': {
    'pt-BR': 'Categorias úteis para operações digitais, conteúdo, tráfego e monetização.',
    'es': 'Categorías útiles para operaciones digitales, contenido, tráfico y monetización.',
  },
  'home.tools.empty':           { 'pt-BR': 'Diretório em construção.', 'es': 'Directorio en construcción.' },
  'home.tools.cta':             { 'pt-BR': 'Ver ferramentas',    'es': 'Ver herramientas' },

  // Home — bonus section
  'home.bonus.desc': {
    'pt-BR': 'Condições úteis para ferramentas do mercado digital, com status claro.',
    'es': 'Condiciones útiles para herramientas del mercado digital, con estado claro.',
  },
  'home.bonus.verified':        { 'pt-BR': '✓ verificado',       'es': '✓ verificado' },
  'home.bonus.empty':           { 'pt-BR': 'Nenhum bônus verificado no momento.', 'es': 'Ningún bono verificado por el momento.' },
  'home.bonus.cta':             { 'pt-BR': 'Ver bônus',          'es': 'Ver bonos' },

  // Home — market section
  'home.market.desc': {
    'pt-BR': 'Produtos, cursos e soluções para quem trabalha com marketing, IA e monetização.',
    'es': 'Productos, cursos y soluciones para quienes trabajan con marketing, IA y monetización.',
  },
  'home.market.empty':          { 'pt-BR': 'Categorias em construção.', 'es': 'Categorías en construcción.' },
  'home.market.cta':            { 'pt-BR': 'Explorar Radar Market', 'es': 'Explorar Radar Market' },

  // Home — newsletter
  'home.newsletter.badge':        { 'pt-BR': 'Fique ligado',        'es': 'Mantente al tanto' },
  'home.newsletter.title.prefix': { 'pt-BR': 'Receba o',            'es': 'Recibe la' },
  'home.newsletter.title.word':   { 'pt-BR': 'sinal',               'es': 'señal' },
  'home.newsletter.desc': {
    'pt-BR': 'Assine e seja o primeiro a saber quando novos artigos chegarem no Radar Digital. Sem spam, só conteúdo de verdade.',
    'es': 'Suscríbete y sé el primero en saber cuando lleguen nuevos artículos al Radar Digital. Sin spam, solo contenido real.',
  },
  'home.newsletter.placeholder':  { 'pt-BR': 'seu@email.com',       'es': 'tu@email.com' },
  'home.newsletter.cta':          { 'pt-BR': 'Assinar',             'es': 'Suscribirse' },

  // Home — empty states
  'home.empty.articles':      { 'pt-BR': 'Nenhum artigo publicado ainda.', 'es': 'Ningún artículo publicado aún.' },
  'home.empty.articles.soon': { 'pt-BR': 'Nenhum artigo publicado ainda. Volte em breve.', 'es': 'Ningún artículo publicado aún. Vuelve pronto.' },

  // Home — CTA final
  'home.cta.tagline':         { 'pt-BR': 'Captando sinais, entregando valor.', 'es': 'Captando señales, entregando valor.' },

  // Layout — meta defaults
  'layout.meta.desc': {
    'pt-BR': 'Radar Digital — Marketing Digital, IA e Monetização',
    'es': 'Radar Digital — Marketing Digital, IA y Monetización',
  },
  'layout.meta.ogdesc': {
    'pt-BR': 'Seu radar de tendências em marketing, inteligência artificial e monetização digital.',
    'es': 'Tu radar de tendencias en marketing, inteligencia artificial y monetización digital.',
  },
  'layout.locale.label': { 'pt-BR': 'PT', 'es': 'ES' },

  // Market
  'market.title':                { 'pt-BR': 'Radar Market', 'es': 'Radar Market' },
  'market.description': {
    'pt-BR': 'Produtos, cursos e soluções para quem trabalha com marketing, IA e monetização.',
    'es': 'Productos, cursos y soluciones para quienes trabajan con marketing, IA y monetización.',
  },
  'market.hero.desc': {
    'pt-BR': 'Curadoria editorial de produtos, cursos, serviços e soluções de parceiros do mercado digital. Cada item publicado passa por avaliação de utilidade, reputação e transparência.',
    'es': 'Curaduría editorial de productos, cursos, servicios y soluciones de socios del mercado digital. Cada publicación pasa por evaluación de utilidad, reputación y transparencia.',
  },
  'market.stats.categorias':      { 'pt-BR': 'Categorias', 'es': 'Categorías' },
  'market.stats.produtos':        { 'pt-BR': 'Produtos disponíveis', 'es': 'Productos disponibles' },
  'market.section.categorias':    { 'pt-BR': 'Categorias', 'es': 'Categorías' },
  'market.empty':                 { 'pt-BR': 'Nenhuma categoria disponível ainda.', 'es': 'Ninguna categoría disponible aún.' },
  'market.section.placeholder':   { 'pt-BR': 'O que poderá aparecer aqui', 'es': 'Lo que podrá aparecer aquí' },
  'market.placeholder.ia':        { 'pt-BR': 'Agentes de IA', 'es': 'Agentes de IA' },
  'market.placeholder.automacao': { 'pt-BR': 'Automações e templates', 'es': 'Automatizaciones y templates' },
  'market.placeholder.proxies':   { 'pt-BR': 'Proxies e infraestrutura', 'es': 'Proxies e infraestructura' },
  'market.placeholder.social':    { 'pt-BR': 'Produtos para social e conteúdo', 'es': 'Productos para social y contenido' },
  'market.placeholder.cursos':    { 'pt-BR': 'Cursos de e-commerce, afiliados e IA', 'es': 'Cursos de e-commerce, afiliados e IA' },
  'market.placeholder.trafego':   { 'pt-BR': 'Tráfego pago e monetização', 'es': 'Tráfico pago y monetización' },
  'market.notice.title':          { 'pt-BR': 'Curadoria editorial', 'es': 'Curaduría editorial' },
  'market.notice.desc': {
    'pt-BR': 'Os produtos e ofertas do Radar Market passam por curadoria editorial. Quando uma oferta estiver disponível, ela deverá informar parceiro, benefício, status e fonte de verificação sempre que aplicável.',
    'es': 'Los productos y ofertas de Radar Market pasan por curaduría editorial. Cuando una oferta esté disponible, deberá informar socio, beneficio, estado y fuente de verificación siempre que sea aplicable.',
  },

  // Categorias (genérico)
  'cat.articles.planned': { 'pt-BR': 'Artigos planejados', 'es': 'Artículos planeados' },
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
    'es': 'Infoproductos, afiliados, suscripciones, dropshipping, SaaS y modelos de negocio escalables que realmente funcionan.',
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
  'parceiros.sections.subtitle': {
    'pt-BR': 'Cada categoria traz uma explicação do segmento e os parceiros que recomendamos.',
    'es': 'Cada categoría trae una explicación del segmento y los socios que recomendamos.',
  },
  'parceiros.category.cta':     { 'pt-BR': 'Ver parceiros',  'es': 'Ver socios' },
  'parceiros.detail.cta.see':   { 'pt-BR': 'Ver diretório completo', 'es': 'Ver directorio completo' },
  'parceiros.detail.dropdown.title': { 'pt-BR': 'Categorias',  'es': 'Categorías' },

  // Parceiros - UI labels da página de ferramentas
  'parceiros.sections.title':       { 'pt-BR': 'Escolha o nicho',           'es': 'Elige el nicho' },
  'parceiros.sections.title.prefix': { 'pt-BR': 'Escolha o',               'es': 'Elige el' },
  'parceiros.category.label':       { 'pt-BR': 'Categoria',                'es': 'Categoría' },
  'parceiros.count.singular':       { 'pt-BR': 'ferramenta',               'es': 'herramienta' },
  'parceiros.count.plural':         { 'pt-BR': 'ferramentas',              'es': 'herramientas' },
  'parceiros.stats.tools':          { 'pt-BR': 'Ferramentas',              'es': 'Herramientas' },
  'parceiros.slug.section.prefix':  { 'pt-BR': 'Parceiros do',             'es': 'Socios del' },
  'parceiros.slug.other':           { 'pt-BR': 'Outras categorias',        'es': 'Otras categorías' },
  'parceiros.slug.empty': {
    'pt-BR': 'Estamos curando os parceiros desta categoria. Volte em alguns dias.',
    'es': 'Estamos curando los socios de esta categoría. Vuelve en unos días.',
  },

  // Bonus
  'bonus.title':        { 'pt-BR': 'Bônus e Códigos Promocionais', 'es': 'Bonos y Códigos Promocionales' },
  'bonus.subtitle':     {
    'pt-BR': 'Cupons, descontos, bônus e condições especiais de ferramentas úteis para marketing digital, afiliados, tráfego pago, automação, monetização e operações digitais.',
    'es': 'Cupones, descuentos, bonos y condiciones especiales de herramientas útiles para marketing digital, afiliados, tráfico pagado, automatización, monetización y operaciones digitales.',
  },
  'bonus.filter.all':   { 'pt-BR': 'Todos',          'es': 'Todos' },
  'bonus.ad.placeholder': { 'pt-BR': 'Espaço reservado para anúncio', 'es': 'Espacio reservado para anuncio' },
  'bonus.cta.use':      { 'pt-BR': 'Usar código',    'es': 'Usar código' },
  'bonus.expires':      { 'pt-BR': 'Expira',         'es': 'Expira' },
  'bonus.noresults':    { 'pt-BR': 'Nenhum bônus encontrado para esta categoria.', 'es': 'Ningún bono encontrado para esta categoría.' },
  'bonus.featured':     { 'pt-BR': 'Destaque',       'es': 'Destacado' },
  'bonus.stats.bonuses': { 'pt-BR': 'Bônus disponíveis', 'es': 'Bonos disponibles' },

  // Bonus - UI labels
  'bonus.stats.categorias': { 'pt-BR': 'Categorias', 'es': 'Categorías' },
  'bonus.filter.label':     { 'pt-BR': 'Filtrar por categoria', 'es': 'Filtrar por categoría' },
  'bonus.code.label':       { 'pt-BR': 'Código', 'es': 'Código' },

  // Bonus - categorias (traduzidas)
  'bonus.cat.antidetect-browsers':  { 'pt-BR': 'Antidetect Browsers', 'es': 'Navegadores Antidetect' },
  'bonus.cat.cloaking':             { 'pt-BR': 'Cloaking',            'es': 'Cloaking' },
  'bonus.cat.trackers':             { 'pt-BR': 'Trackers',            'es': 'Trackers' },
  'bonus.cat.spy-services':         { 'pt-BR': 'Spy Services',        'es': 'Spy Services' },
  'bonus.cat.criativos':            { 'pt-BR': 'Criativos',           'es': 'Creativos' },
  'bonus.cat.proxies':              { 'pt-BR': 'Proxies',             'es': 'Proxies' },
  'bonus.cat.gateways-pagamento':   { 'pt-BR': 'Gateways de Pagamento', 'es': 'Pasarelas de Pago' },
  'bonus.cat.contas-verificacao':   { 'pt-BR': 'Contas e Verificação', 'es': 'Cuentas y Verificación' },
  'bonus.cat.automacao':            { 'pt-BR': 'Automação',           'es': 'Automatización' },
  'bonus.cat.afiliados-cpa':        { 'pt-BR': 'Afiliados e CPA',     'es': 'Afiliados y CPA' },

  // AdSlot
  'adslot.label':       { 'pt-BR': 'Publicidade',      'es': 'Publicidad' },
  'adslot.placeholder': { 'pt-BR': 'Espaço reservado', 'es': 'Espacio reservado' },

  // Locale switcher
  'locale.switcher.label': { 'pt-BR': 'Idioma', 'es': 'Idioma' },
  'locale.unavailable':    { 'pt-BR': 'Em breve em', 'es': 'Próximamente en' },

  // Mobile navigation
  'nav.menu.label': {
    'pt-BR': 'Navegação principal',
    'es': 'Navegación principal',
  },
  'nav.menu.open': {
    'pt-BR': 'Abrir menu',
    'es': 'Abrir menú',
  },
  'nav.menu.close': {
    'pt-BR': 'Fechar menu',
    'es': 'Cerrar menú',
  },
  'nav.menu.language': {
    'pt-BR': 'Idioma',
    'es': 'Idioma',
  },

  // Guias
  'guias.title':        { 'pt-BR': 'Guias práticos para operações digitais', 'es': 'Guías prácticas para operaciones digitales' },
  'guias.subtitle':     {
    'pt-BR': 'Encontre tutoriais, checklists e conteúdos práticos sobre marketing digital, IA, monetização, tráfego pago, afiliados e ferramentas.',
    'es': 'Encuentra tutoriales, checklists y contenidos prácticos sobre marketing digital, IA, monetización, tráfico pago, afiliados y herramientas.',
  },
  'guias.search.placeholder': { 'pt-BR': 'Pesquisar guia, tema ou ferramenta...', 'es': 'Buscar guía, tema o herramienta...' },
  'guias.filter.all':  { 'pt-BR': 'Todos', 'es': 'Todos' },
  'guias.ad.placeholder': { 'pt-BR': 'Espaço reservado para anúncio', 'es': 'Espacio reservado para anuncio' },
  'guias.cta.read':    { 'pt-BR': 'Ler guia', 'es': 'Leer guía' },
  'guias.noresults':   { 'pt-BR': 'Nenhum guia encontrado. Tente buscar por outro tema ou remover alguns filtros.', 'es': 'No se encontró ninguna guía. Intenta buscar otro tema o quitar algunos filtros.' },
  'guias.empty.title': { 'pt-BR': 'Nenhum guia disponível ainda', 'es': 'Ninguna guía disponible aún' },

  // Guias - filtros
  'guias.filter.meta-ads':           { 'pt-BR': 'Meta Ads',           'es': 'Meta Ads' },
  'guias.filter.tiktok-ads':         { 'pt-BR': 'TikTok Ads',         'es': 'TikTok Ads' },
  'guias.filter.google-ads':         { 'pt-BR': 'Google Ads',         'es': 'Google Ads' },
  'guias.filter.seo':                { 'pt-BR': 'SEO',                'es': 'SEO' },
  'guias.filter.redes-sociais':      { 'pt-BR': 'Redes Sociais',      'es': 'Redes Sociales' },
  'guias.filter.youtube':            { 'pt-BR': 'YouTube',            'es': 'YouTube' },
  'guias.filter.email-marketing':    { 'pt-BR': 'Email Marketing',    'es': 'Email Marketing' },
  'guias.filter.inteligencia-artificial': { 'pt-BR': 'Inteligência Artificial', 'es': 'Inteligencia Artificial' },
  'guias.filter.prompts':            { 'pt-BR': 'Prompts',            'es': 'Prompts' },
  'guias.filter.automacao':          { 'pt-BR': 'Automação',          'es': 'Automatización' },
  'guias.filter.afiliados-cpa':      { 'pt-BR': 'Afiliados e CPA',    'es': 'Afiliados y CPA' },
  'guias.filter.igaming-betting':    { 'pt-BR': 'iGaming e Betting',  'es': 'iGaming y Betting' },
  'guias.filter.crypto':             { 'pt-BR': 'Crypto',             'es': 'Crypto' },
  'guias.filter.e-commerce':         { 'pt-BR': 'E-commerce',         'es': 'E-commerce' },
  'guias.filter.marketplaces':       { 'pt-BR': 'Marketplaces',       'es': 'Marketplaces' },
  'guias.filter.monetizacao':        { 'pt-BR': 'Monetização',        'es': 'Monetización' },
  'guias.filter.analytics-tracking': { 'pt-BR': 'Analytics e Tracking', 'es': 'Analytics y Tracking' },
  'guias.filter.ferramentas':        { 'pt-BR': 'Ferramentas',        'es': 'Herramientas' },
  'guias.filter.proxies':            { 'pt-BR': 'Proxies',            'es': 'Proxies' },
  'guias.filter.antidetect':         { 'pt-BR': 'Antidetect Browsers', 'es': 'Antidetect Browsers' },
  'guias.filter.criativos':          { 'pt-BR': 'Criativos',          'es': 'Creativos' },
  'guias.filter.seguranca-contas':   { 'pt-BR': 'Segurança de Contas', 'es': 'Seguridad de Cuentas' },
  'guias.filter.conteudo':           { 'pt-BR': 'Conteúdo',           'es': 'Contenido' },
} as const;

export type UIKey = keyof typeof ui;
