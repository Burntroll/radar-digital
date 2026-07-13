// ═════════════════════════════════════════════════════════════════════════════
// Registro central da estrutura de navegação principal
//
// Este arquivo é a fonte de verdade para a árvore de navegação do Radar Digital.
// Diferencia:
//   - link: item com rota pública própria (anchor)
//   - group: item sem rota agregadora, que agrupa filhos elegíveis (disclosure)
//
// REGRAS DE ATIVAÇÃO:
//   - link: só pode existir se houver rota pública real
//   - group: só renderiza se possuir ao menos um filho elegível
//   - hubs com status 'planned' em editorialHubs.ts NÃO aparecem
//   - groups sem filhos elegíveis não são renderizados
//   - nenhum link pode apontar para rota inexistente
// ═════════════════════════════════════════════════════════════════════════════

export type NavItemType = 'link' | 'group';

export type NavIcon = 'tools' | 'bonus';

export interface NavLinkItem {
  type: 'link';
  labelKey: string;       // chave em ui.ts
  routeKey?: string;      // chave no routeMap (opcional — home usa '' )
  /** slug adicional (ex: slug do artigo) */
  slug?: string;
  /** chave i18n para descrição no mega menu */
  descKey?: string;
  /** ícone pequeno para anchors promovidos (Ferramentas, Bônus) */
  icon?: NavIcon;
}

/** Subgrupo visual dentro de um NavGroupItem com presentation='grouped' */
export interface NavGroupedSubGroup {
  labelKey: string;       // chave em ui.ts (título do grupo visual)
  children: NavLinkItem[];
}

export interface NavGroupItem {
  type: 'group';
  labelKey: string;       // chave em ui.ts (rótulo do grupo)
  children: (NavLinkItem | NavGroupItem)[];
  /**
   * 'mega'  = painel simples com título + descrição (Setores)
   * 'grouped' = painel com subgrupos visuais e colunas (Operação)
   */
  presentation?: 'mega' | 'grouped';
  /** Subgrupos visuais (usado com presentation='grouped') */
  groups?: NavGroupedSubGroup[];
}

export type NavItem = NavLinkItem | NavGroupItem;

export interface NavSection {
  id: string;
  item: NavItem;
  /** true = item apto a renderizar no estado atual */
  eligible: boolean;
}

/**
 * Estrutura central da navegação principal.
 *
 * Ordem conceitual do registro:
 * Início → Setores → Operação → Verticais → Recursos → Ferramentas → Bônus → Radar Market
 *
 * Verticais não é renderizado no estado público enquanto permanecer inelegível.
 *
 * Cada entrada declara elegibilidade separadamente do registro,
 * permitindo que Verticais exista no modelo mas não seja renderizado
 * até que possua filho elegível com rota pública.
 */
export const mainNavigation: NavSection[] = [
  {
    id: 'home',
    eligible: true,
    item: {
      type: 'link',
      labelKey: 'nav.home',
      // home: prefix '/' é tratado diretamente pelo componente
    },
  },
  {
    id: 'sectors',
    eligible: true,
    item: {
      type: 'group',
      labelKey: 'nav.setores',
      presentation: 'mega',
      children: [
        {
          type: 'link',
          labelKey: 'nav.ia',
          routeKey: 'inteligencia-artificial',
          descKey: 'nav.ia.desc',
        },
      ],
    },
  },
  {
    id: 'operations',
    eligible: true,
    item: {
      type: 'group',
      labelKey: 'nav.operacao',
      presentation: 'grouped',
      children: [
        {
          type: 'link',
          labelKey: 'nav.marketing',
          routeKey: 'marketing-digital',
          descKey: 'nav.marketing.desc',
        },
        {
          type: 'link',
          labelKey: 'nav.monetizacao',
          routeKey: 'monetizacao',
          descKey: 'nav.monetizacao.desc',
        },
      ],
      groups: [
        {
          labelKey: 'nav.op.aquisicao',
          children: [
            {
              type: 'link',
              labelKey: 'nav.marketing',
              routeKey: 'marketing-digital',
              descKey: 'nav.marketing.desc',
            },
          ],
        },
        {
          labelKey: 'nav.op.construcao',
          children: [
            {
              type: 'link',
              labelKey: 'nav.monetizacao',
              routeKey: 'monetizacao',
              descKey: 'nav.monetizacao.desc',
            },
          ],
        },
        {
          labelKey: 'nav.op.tecnologia',
          children: [],
        },
      ],
    },
  },
  {
    id: 'verticals',
    eligible: false,      // planned — sem filho active com rota pública
    item: {
      type: 'group',
      labelKey: 'nav.verticais',
      children: [],
    },
  },
  {
    id: 'resources',
    eligible: true,
    item: {
      type: 'group',
      labelKey: 'nav.recursos',
      children: [
        {
          type: 'link',
          labelKey: 'nav.guias',
          routeKey: 'guias',
        },
      ],
    },
  },
  {
    id: 'tools',
    eligible: true,
    item: {
      type: 'link',
      labelKey: 'nav.parceiros',
      routeKey: 'parceiros',
      icon: 'tools',
    },
  },
  {
    id: 'bonuses',
    eligible: true,
    item: {
      type: 'link',
      labelKey: 'nav.bonus',
      routeKey: 'bonus',
      icon: 'bonus',
    },
  },
  {
    id: 'market',
    eligible: true,
    item: {
      type: 'link',
      labelKey: 'nav.market',
      routeKey: 'market',
    },
  },
];
