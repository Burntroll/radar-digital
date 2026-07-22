# Design V4 — especificação técnica da direção editorial

> **Status:** aprovado e congelado para implementação incremental.
> **Autoridade:** especificação técnica normativa da Task 7.0 do Plano de Ação 2.2.
> **Baseline auditado:** `aad1c0c5b51e185ba3a93e292215bf044afac9eb` (`chore: preserve visual exploration artifacts`), sincronizado com `origin/master` em 20/07/2026.
> **Implementação acumulada:** Tasks 7.1–7.14 concluídas (tokens visuais, fundação tipográfica, SignalBar, masthead, navegação desktop/mobile, abertura editorial principal/secundária, painel Radar agora, Assuntos em destaque, Seleção da redação, Últimas publicações, auditoria de Mais lidas e Editorias); o ranking permanece ausente por não existir fonte auditável de audiência, e os demais módulos editoriais da homepage ainda não foram reestruturados.

## 1. Status e autoridade

Este documento congela a direção visual V4 aprovada e a traduz para a arquitetura real do Radar Digital. Ele é a fonte de verdade para as próximas tasks do Bloco 7 quando houver conflito entre uma interpretação visual do mockup e uma implementação ad hoc.

A ordem de precedência é:

1. contratos funcionais e editoriais já aprovados no repositório;
2. esta especificação técnica;
3. Plano de Ação 2.2;
4. mockup V4 como referência visual, não como código de produção.

O HTML do mockup não deve ser copiado, incorporado nem convertido em um componente monolítico. Os conteúdos, links, datas, imagens externas e interações simuladas nele existentes são demonstrativos.

O Plano de Ação 2.2 documenta `97490fc397df93b915d72eee7b7595f1766c6b80` como baseline. Antes da Task 7.0, um commit autorizado preservou os artefatos visuais e avançou `master` para `aad1c0c`; não houve mudança em código de produção nesse intervalo. O SHA `aad1c0c` é, portanto, o baseline operacional auditado desta especificação.

## 2. Referências utilizadas

- `Radar_Digital_Plano_de_Acao_2_2_Design_V4.pdf`, lido integralmente (32 páginas).
- `radar-digital-home-mockup-header-separado-v4.html`, SHA-256 `64b68d47645e14805eb7e6ad269c78fd6e77c9dab10d113d7483e280b38a2ba7`, coincidente com o hash normativo do Plano.
- `PROGRESSO.md`.
- `ROADMAP.md`.
- `docs/SITEMAP.md`.
- `docs/CONTENT_MODEL.md`.
- `docs/DECISIONS.md`.
- Home PT: `src/pages/index.astro`.
- Home ES: `src/pages/es/index.astro`.
- Layout, SEO e estilos: `src/layouts/Layout.astro`, `src/components/SEO.astro`, `src/styles/global.css` e `tailwind.config.mjs`.
- Navegação: `src/components/SiteNavigation.astro`, `src/components/MobileNavigation.astro` e `src/config/siteNavigation.ts`.
- Componentes compartilhados: `AdSlot.astro`, `CategoryArticleCard.astro` e `EmptyState.astro`.
- i18n e rotas: `src/i18n/config.ts`, `src/i18n/routes.ts`, `src/i18n/ui.ts` e `src/i18n/utils.ts`.
- Dados: `src/content/config.ts`, registries editoriais, helpers de distribuição/tradução e frontmatter das collections.
- Homepage atualmente publicada no preview Vercel, inspecionada em desktop.

`docs/ROUTES.md` e `docs/I18N.md`, listados pelo Plano como fontes obrigatórias, não existem no baseline auditado. Eles não são criados nesta task por estarem fora da lista de arquivos permitidos. Para esta especificação, seus contratos foram reconstruídos a partir de `docs/SITEMAP.md` e do código citado acima. A ausência permanece como lacuna de governança a resolver em task documental própria.

## 3. Conceito editorial da V4

A V4 deve parecer um portal editorial real: autoridade jornalística, ritmo de atualização, hierarquia tipográfica forte, composição assimétrica e variedade de formatos. A estética é contemporânea e próxima de um público jovem, sem reproduzir padrões de dashboard, landing page SaaS ou mosaico infinito de cards equivalentes.

O sistema visual alterna superfícies claras de leitura com áreas de contraste em preto editorial. O verde-lima funciona como sinal de atividade, foco pontual ou status; não é fundo dominante. A densidade de informação deve ser compensada por intervalos de descanso, mudanças de escala e módulos com ritmos diferentes.

Conteúdo editorial e conteúdo comercial devem ser reconhecíveis antes do clique. Elementos comerciais nunca podem simular recomendação jornalística independente.

## 4. Características da marca

- O nome “Radar Digital” é o elemento principal e recebe forte destaque editorial no masthead.
- A marca deve transmitir sinal, curadoria, velocidade e contexto, sem estética de ferramenta corporativa.
- O monograma `RD` e qualquer símbolo usado no mockup são provisórios até a aprovação do logo final.
- O placeholder de marca deve ser isolado em um componente substituível, sem embutir sua geometria em múltiplos arquivos.
- O preto editorial sustenta autoridade; o creme sustenta leitura; o verde-lima comunica sinal; coral e violeta são auxiliares controlados.
- Gradientes genéricos, glassmorphism intenso, sombras grandes, excesso de ícones e arredondamento indiscriminado não pertencem à V4.

## 5. Tipografia

### 5.1 Função editorial

A fonte editorial adotada é **Source Serif 4 4.005**, reservada para marca, manchetes principais, títulos de seção de alto peso e chamadas especiais. Ela é distribuída pela Adobe Fonts sob SIL Open Font License 1.1, cobre o repertório necessário a PT/ES e entra no projeto como WOFF2 variável local. A pilha canônica é `"Source Serif 4 Variable", "Source Serif 4", Georgia, "Times New Roman", serif`.

Escala proposta:

| Papel | Desktop | Mobile | Peso | Line-height |
|---|---:|---:|---:|---:|
| Marca | `clamp(2.4rem, 4vw, 4.5rem)` | mínimo `2.4rem` | 700–800 | 0,9–1,0 |
| Manchete principal | `clamp(2.25rem, 4.6vw, 5rem)` | mínimo `2.25rem` | 650–800 | 0,95–1,04 |
| Título de módulo | `clamp(1.75rem, 2.8vw, 3rem)` | mínimo `1.75rem` | 650–750 | 1,0–1,1 |
| Título de card | `clamp(1.15rem, 1.8vw, 1.75rem)` | mínimo `1.15rem` | 650–750 | 1,1–1,2 |

### 5.2 Função funcional

**Inter 4.1** é a fonte funcional adotada para navegação, resumos, metadados, botões, disclosures e formulários. Ela é distribuída pelo projeto Inter sob SIL Open Font License 1.1 e entra como WOFF2 variável local. A pilha canônica é `"Inter Variable", Inter, ui-sans-serif, system-ui, -apple-system, "Segoe UI", sans-serif`.

| Papel | Tamanho | Peso | Line-height |
|---|---:|---:|---:|
| Corpo | 1rem–1.125rem | 400 | 1,55–1,7 |
| Resumo | 0.95rem–1.1rem | 400–500 | 1,45–1,6 |
| Navegação | 0.82rem–0.95rem | 600–700 | 1,2 |
| Metadado | 0.72rem–0.85rem | 500–700 | 1,3 |
| Eyebrow/disclosure | 0.68rem–0.78rem | 700–800 | 1,2; tracking moderado |

JetBrains Mono foi retirada do carregamento: o uso atual de `font-mono` limita-se a códigos/cupons pontuais e passa a usar `ui-monospace`, `SFMono-Regular`, Consolas e `Liberation Mono`. Uma fonte mono externa só pode voltar com uso funcional recorrente e orçamento próprio.

### 5.3 Estratégia de carregamento implementada

- O `@import` remoto do Google Fonts foi removido. Os arquivos ficam em `public/fonts/`, com as licenças OFL preservadas em `public/fonts/licenses/`.
- Inter usa os eixos `wght 400–900` e `opsz 14–32`; Source Serif 4 usa `wght 600–900` e `opsz 16–60`. Não há arquivos itálicos porque não existe consumo V4 aprovado nesta etapa.
- O subconjunto inclui Basic Latin, Latin-1, Latin Extended-A, Latin Extended Additional, pontuação geral e símbolos monetários necessários. Foram verificados `áéíóúàâêôãõüñç`, suas maiúsculas, `¿`, `¡`, aspas editoriais, travessões e algarismos.
- Ambos usam `font-display: swap`, `font-optical-sizing: auto` e fallbacks nativos próximos. Caracteres fora do subconjunto caem na pilha do sistema por `unicode-range`.
- Inter e Source Serif 4 recebem preload em `Layout.astro`: a primeira sustenta a interface funcional e a segunda passou a compor a marca editorial acima da dobra na Task 7.4. Novos pesos, estilos ou famílias não devem ser preloaded sem consumo crítico comprovado.
- Os tokens `--font-family-*` e `--type-*` são expostos pelo Tailwind como `font-sans`, `font-editorial`, `font-mono` e `text-v4-*`. A serif está aplicada somente à assinatura editorial do masthead; os módulos da home continuam aguardando suas tasks próprias.

| Arquivo de produção | Fonte oficial | Eixos preservados | Tamanho |
|---|---|---|---:|
| `inter-variable-latin-ext.woff2` | Inter 4.1 (`e3a3d4c`) | `wght 400–900`, `opsz 14–32` | 67.576 bytes |
| `source-serif-4-variable-latin-ext.woff2` | Source Serif 4.005 (`2823e99`) | `wght 600–900`, `opsz 16–60` | 94.304 bytes |
| **Total potencial** | — | — | **161.880 bytes** |

Os arquivos oficiais completos somavam 781.340 bytes; o recorte reduz 79,3% desse total. Desde a Task 7.4, os 161.880 bytes dos dois subsets variáveis são críticos e preloaded porque Inter e Source Serif 4 aparecem acima da dobra. Esse orçamento deve ser reavaliado em 7.26 com dados reais de LCP e cache.

## 6. Paleta

### 6.1 Light

| Papel | Valor proposto | Uso |
|---|---|---|
| Canvas creme | `#f8f4ec` | Fundo editorial principal; já existe como `--color-surface` |
| Superfície clara | `#fffdf8` | Cards e leitura; já existe como `--color-surface-card` |
| Superfície sutil | `#f1ebe2` | Separação tonal; já existe como `--color-surface-elevated` |
| Borda | `#d9d0c3` | Divisores e contornos; já existe como `--color-border` |
| Texto primário | `#10131a` | Títulos e corpo de maior contraste |
| Texto secundário | `#50504c` | Resumos; já publicado |
| Texto discreto | `#696760` | Metadados; já publicado e condicionado a contraste |
| Preto editorial | `#0b0f16` | SignalBar e módulos escuros |
| Verde-sinal | `#c7ff32` | Indicadores e detalhes pontuais |
| Coral ao vivo | `#ff5f45` | Estado de atualização/alerta |
| Violeta auxiliar | `#6657ff` | Destaque editorial limitado |

### 6.2 Dark

| Papel | Valor proposto | Uso |
|---|---|---|
| Canvas | `#0a0b0f` | Fundo principal já existente |
| Superfície | `#111318` | Cards já existentes |
| Superfície elevada | `#1a1d24` | Separação tonal já existente |
| Borda | `#2a2e37` | Divisores com contraste suficiente |
| Texto primário | `#f4f1e9` | Títulos e corpo |
| Texto secundário | `#b8b3a8` | Resumos |
| Texto discreto | `#8f8b82` | Metadados, após validação AA |
| Preto editorial | `#05070a` | Áreas de máximo contraste |
| Verde-sinal | `#c7ff32` | Mesmo significado do light |
| Coral ao vivo | `#ff715c` | Estado de atualização |
| Violeta auxiliar | `#8b80ff` | Destaque limitado |

O dark mode não deve ser uma inversão mecânica. Imagens, bordas, overlays, foco e disclosures devem ser avaliados em contexto.

## 7. Tokens implementados na Task 7.1

A Task 7.1 publicou uma única camada canônica em `src/styles/global.css`, com equivalentes light/dark e valores RGB para os modificadores de opacidade do Tailwind. Os nomes antigos permanecem somente como aliases de compatibilidade; não existe uma segunda paleta independente.

### 7.1 Cores canônicas

| Token | Light | Dark | Tailwind |
|---|---|---|---|
| `--color-canvas` | `#f8f4ec` | `#0a0b0f` | `canvas`, `surface` |
| `--color-surface-primary` | `#fffdf8` | `#111318` | `surface-primary` |
| `--color-surface-secondary` | `#f1ebe2` | `#1a1d24` | `surface-secondary` |
| `--color-surface-contrast` | `#0b0f16` | `#05070a` | `surface-contrast` |
| `--color-text-primary` | `#10131a` | `#f4f1e9` | `text-text-primary` |
| `--color-text-secondary` | `#50504c` | `#b8b3a8` | `text-text-secondary` |
| `--color-text-muted` | `#696760` | `#8f8b82` | `text-text-muted` |
| `--color-text-inverse` | `#f4f1e9` | `#f4f1e9` | `text-text-inverse` |
| `--color-border` | `#d9d0c3` | `#2a2e37` | `line` |
| `--color-editorial-black` | `#0b0f16` | `#05070a` | `editorial-black` |
| `--color-signal` | `#c7ff32` | `#c7ff32` | `signal` |
| `--color-live` | `#ff5f45` | `#ff715c` | `live` |
| `--color-editorial-accent` | `#6657ff` | `#8b80ff` | `editorial` |
| `--color-commercial` | `#f59e0b` | `#f59e0b` | `commercial` |
| `--color-link` | `#006c7a` | `#64dff2` | `link` |
| `--color-focus` | `#6657ff` | `#c7ff32` | `focus` |

### 7.2 Primitivos de layout

- Container: `--container-editorial: 90rem` e `max-w-editorial`.
- Gutter responsivo: `--gutter-page: clamp(0.75rem, 2vw, 1.25rem)` e utilities `*-page-gutter`.
- Espaçamento: `--space-1` a `--space-10`, cobrindo `4, 8, 12, 16, 20, 24, 32, 40, 56, 72px`, expostos no Tailwind como `v4-1` a `v4-10`.
- Raios: `--radius-sm` (8px), `--radius-md` (15px) e `--radius-lg` (22px), expostos como `rounded-v4-*`.
- Sombras: `--shadow-resting` e `--shadow-raised`, com pares light/dark, expostas como `shadow-v4-*`.
- Offset sticky futuro: 126px no desktop e 64px abaixo de 1024px, exposto como `header-sticky`.
- Tokens de família e escala foram implementados na Task 7.2 conforme a seção 5, sem aplicação estrutural antecipada aos módulos.

### 7.3 Migração e compatibilidade

| Nome existente | Fonte canônica V4 | Estado |
|---|---|---|
| `--color-surface` | `--color-canvas` | Alias preservado |
| `--color-surface-card` | `--color-surface-primary` | Alias preservado |
| `--color-surface-elevated` | `--color-surface-secondary` | Alias preservado |
| `--color-surface-header` | `--color-canvas` | Alias preservado |
| `--color-surface-ad` | `--color-surface-secondary` | Alias preservado |
| `--color-brand-cyan` | `--color-link` | Alias legado; consumidores serão migrados por módulo |
| `--color-interactive` | `--color-link` | Alias preservado |
| `--color-editorial` | `--color-editorial-accent` | Alias preservado |
| `--color-editorial-active` | `--color-editorial-accent` | Alias preservado |
| `--color-accent` | `--color-link` | Alias legado preservado |
| `--color-accent-blue` | `--color-link` | Alias legado preservado |
| `--color-accent-purple` | `--color-editorial-accent` | Alias legado preservado |

Os namespaces Tailwind customizados `radar` e `accent`, sem consumidores no baseline, foram substituídos pelos papéis semânticos acima. Utilities e componentes existentes continuam funcionando pelos aliases CSS.

### 7.4 Contraste auditado

Menor contraste de texto/link contra as três superfícies do respectivo tema:

| Papel | Light | Dark | Resultado |
|---|---:|---:|---|
| Texto primário | 15,68:1 | 14,94:1 | AA/AAA |
| Texto secundário | 6,83:1 | 8,07:1 | AA |
| Texto muted | 4,78:1 | 4,97:1 | AA para texto normal |
| Link | 5,17:1 | 10,75:1 | AA para texto normal |
| Indicador de foco | 4,05:1 | 14,28:1 | supera 3:1 para componentes não textuais |

O verde-sinal possui 16,25:1 sobre o preto editorial light; o coral `live` possui 6,37:1. No dark, o coral possui 7,46:1 sobre o preto editorial. O verde não substitui cor de texto corrido ou link.

## 8. Grid e largura máxima

- Container editorial: `min(1440px, calc(100vw - 40px))` em telas largas.
- Gutter mínimo: 20px por lado no desktop, 16px no tablet e 12–16px no mobile.
- Grid-base desktop: 12 colunas, gap de 20–24px.
- Tablet: 8 colunas, gap de 16–20px.
- Mobile: 4 colunas, gap de 12–16px.
- A capa deve permitir 6–8 colunas para a principal, 2–3 para secundárias e 3–4 para o Radar agora, adaptadas ao conteúdo disponível.
- Linhas de leitura longa devem limitar texto corrido a aproximadamente 65–75 caracteres.
- Módulos não precisam compartilhar a mesma borda visual; precisam compartilhar alinhamentos estruturais.

## 9. Espaçamentos

Escala proposta: `4, 8, 12, 16, 20, 24, 32, 40, 56, 72px`.

- Dentro de controles: 8–12px.
- Dentro de cards: 16–24px.
- Entre título e conteúdo de módulo: 20–32px.
- Entre módulos de mesma superfície: 40–56px.
- Na troca entre superfícies claras e escuras: 56–72px.
- O espaçamento deve produzir respiro editorial; não usar padding grande para esconder falta de hierarquia.

## 10. Raios e sombras

- `radius-sm`: 8px para controles compactos.
- `radius-md`: 12–15px para cards funcionais.
- `radius-lg`: 20–22px somente em módulos especiais.
- 30px, presente no mockup, é teto excepcional e não padrão.
- Capas, listas e módulos jornalísticos podem usar raio zero ou mínimo.
- Sombra de repouso: curta, baixa opacidade, apenas quando a borda não resolve separação.
- Sombra elevada: exclusiva para menus, overlays e elementos temporariamente sobrepostos.
- Glassmorphism e blur não são linguagem principal da V4.

## 11. Breakpoints

| Faixa | Contrato |
|---|---|
| até 389px | Mobile estreito; sem dependência de largura mínima |
| 390–767px | Mobile padrão |
| 768–1023px | Tablet |
| 1024–1439px | Desktop; mantém o contrato atual de troca do menu em 1024px |
| 1440px ou mais | Desktop amplo com container máximo |

Breakpoints representam mudança de composição, não apenas redução de fonte. O layout deve ser verificado também em larguras intermediárias de 320, 375, 820, 1280 e 1920px.

## 12. Header

### 12.1 Barra “Radar agora”

- Faixa preta, compacta, anterior ao masthead.
- Contém rótulo “Radar agora”, indicador de atualização verdadeiro, trilho de assuntos e acessos a newsletter e idiomas.
- O movimento deve poder ser pausado por hover e foco e ser desativado com `prefers-reduced-motion`.
- Repetições visuais do trilho são `aria-hidden`; leitores de tela recebem uma lista única.
- “Ao vivo” só pode ser exibido quando houver fonte e janela de atualização que sustentem a afirmação. Sem isso, usar “Em atualização” ou apenas “Radar agora”.
- A barra sai do viewport no scroll; não ocupa altura sticky permanente.

**Estado implementado na Task 7.3:** `SignalBar.astro` usa “Em atualização”, sem pulso ou alegação realtime. O trilho aponta somente para as rotas localizadas e publicadas de IA, marketing, monetização e guias. A primeira lista concentra links e ordem de tabulação; a cópia visual usa texto com `aria-hidden`. A animação pausa por hover ou foco, desaparece com `prefers-reduced-motion` e o trilho inteiro é removido abaixo de 1024px. Newsletter leva à seção já existente da home localizada; idioma leva diretamente ao alternate válido da página. O header existente passou de `fixed` para `sticky`, permitindo que a barra saia naturalmente no scroll sem alterar sitemap, canonical ou hreflang.

### 12.2 Masthead

- Altura de referência: 78px desktop, 70px tablet, 64px mobile.
- Marca e nome à esquerda/centro conforme a faixa; data localizada, busca, tema e ação editorial como utilidades.
- Busca não deve abrir overlay fictício. Enquanto a busca real não existir, o controle deve ficar oculto ou claramente indisponível, sem simular resultado.
- Ação editorial deve apontar para rota real; caso contrário, não aparece.
- Monograma provisório isolado e substituível.

**Estado implementado na Task 7.4:** `Masthead.astro` separa marca e utilidades da navegação e `BrandMark.astro` concentra o monograma provisório, marcado por `data-brand-status="provisional"`. No desktop, a faixa mede 78px e exibe data corrente localizada, marca centralizada, link real para a newsletter e o controle de tema existente; nenhum controle de busca é renderizado. No tablet mede 70px e no mobile 64px, mantendo somente marca e hamburger. `Layout.astro` preserva SEO, canonical e hreflang, e agrupa masthead + navegação em um bloco sticky de 126px no desktop, enquanto a SignalBar sai do viewport. PT/ES compartilham o mesmo componente e chaves de `ui.ts`; a data recebe fallback no build e é atualizada no cliente sem dependência externa. O preload de Source Serif 4 foi ativado porque a família passou a ser usada acima da dobra.

### 12.3 Navegação

- Faixa própria abaixo da marca, com contrato derivado de `siteNavigation.ts` e `SITEMAP.md`.
- Os rótulos demonstrativos do mockup não substituem a navegação real.
- Desktop mantém disclosure para Setores, Operação e Recursos; Ferramentas, Bônus e Market permanecem links de primeiro nível.
- Mobile mantém hamburger, painel e accordions, adicionando gestão completa de foco e Escape.
- Locale e tema continuam fora do container horizontal da lista principal.

**Estado implementado na Task 7.5:** `SiteNavigation.astro` aplica a faixa editorial V4 somente ao desktop, preservando integralmente os rótulos, grupos e destinos de `siteNavigation.ts`. Setores, Operação e Recursos permanecem disclosures exclusivos entre si, com abertura por Enter/Espaço, fechamento por Escape com retorno de foco e clique fora; os estados hover, active e focus-visible usam os tokens V4. Ferramentas, Bônus e Radar Market permanecem links de primeiro nível. A navegação mobile, as rotas, o sitemap, as utilidades, o masthead e a SignalBar não foram alterados.

**Estado implementado na Task 7.6:** `MobileNavigation.astro` traduz a composição compacta V4 para a árvore real de `siteNavigation.ts`, mantendo Setores, Operação e Recursos como accordions e Ferramentas, Bônus e Radar Market como links diretos. O painel usa semântica de diálogo modal sem criar outro landmark de navegação, move o foco para o primeiro link, contém Tab/Shift+Tab, fecha com Escape e restaura o foco no hamburger. Scroll lock, `inert`, altura disponível, fechamento por link e transição para desktop são reversíveis; locale e tema permanecem utilidades internas. PT/ES, light/dark e 320–1023px foram validados sem alteração de rotas ou sitemap.

### 12.4 Sticky

- Masthead e navegação formam o bloco sticky; a SignalBar não é sticky.
- O offset deve ser um token compartilhado para anchors e foco.
- Ao reduzir altura no scroll, a transição não pode alterar a ordem de tabulação nem produzir CLS.
- No mobile, apenas a faixa necessária à marca e ao menu permanece sticky; o painel é modal semântico com restauração de foco.

## 13. Arquitetura da homepage

Ordem normativa:

1. `AdSlot` superior, quando elegível.
2. Abertura editorial assimétrica: reportagem principal, secundárias e Radar agora.
3. Trilho de assuntos em destaque.
4. Seleção da redação.
5. “O que você quer resolver hoje?”.
6. Últimas publicações.
7. Mais lidas.
8. Editorias/hubs.
9. Guias.
10. Ferramentas.
11. Bônus.
12. Radar Market.
13. Newsletter.
14. Footer institucional único.

Módulos podem compartilhar uma mesma faixa responsiva, mas a ordem semântica do DOM deve permanecer lógica. A alternância de superfícies claras e escuras deve criar ritmo, não dividir cada bloco em uma caixa.

## 14. Especificação dos módulos

| Módulo | Fonte de dados e comportamento | Fallback honesto |
|---|---|---|
| Ad superior | `AdSlot.astro`; disclosure localizado; sem bloquear LCP | Ocultar o slot se não houver campanha, sem espaço vazio artificial |
| Reportagem principal | Artigo publicado, locale corrente, formato elegível, data não futura; maior peso visual e uma única H1 da página | Primeiro artigo elegível; se não houver, intro institucional localizada sem link falso |
| Notícias secundárias | Próximos artigos elegíveis, sem repetir a principal; pesos e formatos visuais diferentes | Renderizar uma só secundária ou reduzir a grade, sem placeholders permanentes |
| Radar agora | Lista compacta de artigos recentes; `updatedAt` real quando disponível | Usar datas absolutas localizadas; nunca inventar minutos, status “ao vivo” ou atualização |
| Assuntos em destaque | Registry de topics e cobertura publicada | Item sem rota permanece texto; nenhum link para página inexistente |
| Seleção da redação | Curadoria explícita futura ou regra documentada estável | Enquanto não houver campo de curadoria, usar recorte editorial determinístico e nomeá-lo com honestidade |
| Resolver hoje | Hubs/formatos ativos que levam a rotas existentes e resolvem intenção | Ocultar entradas sem rota ou cobertura; não expor formatos planejados |
| Últimas publicações | Artigos publicados do locale, sem data futura, ordenados por data desc.; paginação/arquivo só quando existir | Lista menor e `EmptyState` localizado |
| Mais lidas | Métrica auditável de audiência e janela temporal explícita | Ocultar módulo; não substituir por ranking editorial sem mudar o rótulo |
| Editorias | Hubs ativos com rota e cobertura; `primaryHub` é vínculo principal, `relatedHubs` amplia descoberta sem duplicar URL | Mostrar apenas hubs ativos/elegíveis |
| Guias | `artigos` com `contentType: guide`, publicados e localizados | Ocultar ou estado vazio localizado, sem card fictício |
| Ferramentas | Collections comerciais `parceiroCategorias`/`parceiros`; categorias e parceiros publicados/elegíveis | Mostrar categorias reais; em ES, usar campos localizados; ocultar vazio |
| Bônus | `bonuses` com `draft: false`, locale, `status: verified`, sem expiração e verificação vigente | Omitir item expirado; se nenhum elegível, ocultar módulo ou estado honesto |
| Radar Market | Categorias publicadas localizadas; itens somente quando `marketItems` tiverem cobertura real | Manter navegação por categorias e estado vazio; não fabricar produtos |
| Newsletter | UI localizada e disclosure; integração real pertence ao Bloco 9 | CTA informativo ou formulário desabilitado com mensagem honesta; nenhum `alert()` de falso sucesso |
| Footer | Um único footer no layout com links institucionais reais, locale, disclosure e utilidades | Ocultar links sem rota; nunca usar `#` como destino público |

**Estado implementado na Task 7.7:** `homeData.ts` centraliza a seleção editorial PT/ES, filtrando `draft: false`, formato `article`, locale exato e `date <= buildTime`, com ordenação decrescente e desempate estável por ID. `EditorialLead.astro` concentra o template da manchete e recebe a entrada tipada nas duas homes; a história real possui uma única H1, URL e data localizadas e mídia visual explicitamente provisória sem imagem remota. Cardinalidade zero renderiza intro institucional localizada sem link; cardinalidade um não cria secundárias vazias.

**Estado implementado na Task 7.8:** `SecondaryLeads.astro` recebe do mesmo loader até dois artigos posteriores à principal, preservando ordem, locale e deduplicação estrutural. A primeira chamada possui maior peso e resumo; a segunda é compacta, sem repetir o mosaico de cards iguais. A grade omite a coluna quando não há secundária, ocupa o slot inteiro com uma entrada e distribui duas entradas assimetricamente. Datas, URLs e headings são reais/localizados; mídia permanece provisória e sem ativo remoto. O guia saiu somente da abertura e continua no módulo próprio existente; Radar agora não foi iniciado.

**Estado implementado na Task 7.9:** `homeData.ts` exclui manchete e secundárias antes de montar até quatro entradas de `radarNowItems`; a ordem usa `updatedAt` apenas quando real e não futuro, com fallback para `date` e desempate estável. `RadarNow.astro` exibe datas absolutas localizadas e rótulos distintos para publicação/atualização, sem tempo relativo, “ao vivo”, atualização contínua ou destino fictício. Como os três artigos elegíveis atuais já ocupam a manchete e as secundárias, PT/ES renderizam o estado vazio localizado. A grade passa a três colunas em telas largas e mantém a ordem semântica ao recompor tablet/mobile; não há animação automática.

**Estado implementado na Task 7.10:** `homeData.ts` cruza o registro central de topics com cobertura publicada, localizada e não futura de artigos e guias, preservando a ordem determinística do registro. Os seis topics ativos possuem cobertura real em PT/ES. Como `editorialTopics.ts` proíbe slugs ou rotas nesta etapa, `TopicRail.astro` os apresenta como texto em uma única lista semântica, sem anchors, `href="#"` ou páginas fabricadas. A faixa usa rolagem horizontal manual com região focável e foco visível, sem ticker ou movimento automático; por isso não há controle de pausa a expor, e `prefers-reduced-motion` permanece sem animação.

**Estado implementado na Task 7.11:** a regra `remaining-recency` usa conteúdos publicados, localizados, não futuros e de formatos ativos, ordenados por `date` decrescente com desempate por ID. O loader exclui reportagem principal, secundárias e entradas do Radar agora antes de selecionar até três histórias. O acervo atual deixa um checklist real por locale; `EditorialSelection.astro` e `StoryCard.astro` o apresentam com H2/H3, URL/data/leitura localizadas, resumo somente na variante principal e mídia local opcional com fallback visual explícito. Não existe CTA para arquivo porque essa rota ainda não foi implementada; cardinalidade zero oculta o módulo. A deduplicação desta task cobre os módulos V4 anteriores, enquanto os módulos legados abaixo permanecem intactos até suas tasks próprias, especialmente 7.12 e 7.16.

**Estado implementado na Task 7.12:** `latestPublicationArticles` preserva a ordem imutável do loader, aceita somente `article`, exclui todos os IDs já usados na abertura, Radar agora e Seleção da redação e limita o resultado a seis entradas. Os três artigos publicados atuais já aparecem na dobra, então PT/ES renderizam cardinalidade zero com mensagem localizada, sem repetir histórias. `LatestPublications.astro` mantém a faixa normativa de contraste e `StoryRow.astro` prepara a variante 1–6 com URL, data, leitura e mídia local opcional. A lista legada, seus `.sort()` mutantes, a lateral duplicada de recomendados e o AdSlot in-feed acoplado foram removidos. Não há CTA de arquivo ou paginação porque pertencem ao Bloco 8.

**Estado auditado na Task 7.13:** o projeto não possui integração de analytics, repositório ou artefato de pageviews, campo de audiência nas Content Collections, adapter de ranking, janela temporal nem regra de desempate baseada em métricas. `package.json`, `astro.config.mjs`, `vercel.json`, schemas e código-fonte não oferecem uma origem verificável; Analytics permanece pendente no Bloco 16. Conforme as decisões vigentes, nenhum `MostRead`, chave de interface, número, posição ou fallback editorial foi criado: “Mais lidas” permanece totalmente ausente em PT/ES até uma decisão própria definir fonte, janela, atualização, desempate e indisponibilidade.

**Estado implementado na Task 7.14:** `homeData.ts` cruza hubs `active`, allowlist de rotas públicas e cobertura publicada/não futura por `primaryHub` ou `relatedHubs`, limitada aos formatos editoriais ativos. Cada entrada conta uma única vez por hub e cada destino aparece uma única vez no componente. O acervo atual torna elegíveis Inteligência Artificial (uma publicação relacionada) e Marketing Digital (duas publicações principais) em PT/ES; Monetização possui rota e status ativo, mas fica ausente por cobertura zero, enquanto todos os hubs `planned` permanecem fora. `EditorialHubs.astro` apresenta somente esses dois destinos reais em uma lista semântica responsiva, sem artigos duplicados, rotas genéricas, cards vazios ou taxonomias ativadas.

## 15. Regras para imagens

- Somente ativos locais ou pipeline de mídia controlado; URLs externas de Unsplash não são solução de produção.
- Fotografia editorial contemporânea, relevante ao conteúdo e com licença/proveniência registrada.
- Usar `astro:assets`/`Image` quando aplicável, dimensões explícitas, `srcset`, `sizes`, AVIF/WebP e fallback.
- Imagem LCP da capa: carregamento prioritário, sem `loading="lazy"`, tamanho responsivo e compressão medida.
- Imagens abaixo da dobra: lazy loading e decoding assíncrono.
- CSS background apenas para decoração; conteúdo editorial deve usar elemento de imagem com `alt` apropriado.
- `alt` descreve informação, não repete título; imagens decorativas têm `alt=""`.
- Definir `aspect-ratio` por variante para evitar CLS; corte via `object-fit` com foco editorial revisado.
- Dark mode pode usar overlay controlado, mas não trocar o significado da imagem.

## 16. Regras editoriais de títulos, resumos e metadados

- Uma única H1 na home; títulos de módulos em H2 e histórias em H3/H4 conforme hierarquia real.
- Manchete principal: até aproximadamente 75 caracteres; não truncar informação essencial por CSS.
- Cards: preferir 55–90 caracteres e no máximo três linhas nas variantes compactas.
- Resumos: 120–180 caracteres em destaque; 90–140 em cards; omitir quando a densidade exigir, sem texto artificial.
- Eyebrow indica editoria/formato real, não cor decorativa.
- Datas são localizadas (`pt-BR`/`es`) e nunca futuras para conteúdo publicado.
- `updatedAt` só aparece se representar atualização editorial efetiva.
- Autor e leitura aparecem apenas quando os dados existirem e forem corretos.
- A mesma URL não deve ocupar mais de um slot da mesma dobra, mesmo quando `relatedHubs` a torna elegível em múltiplos contextos.

## 17. Dados vazios e fallbacks

- A consulta central deve filtrar `draft: false`, locale exato, formato elegível e `date <= buildTime`.
- A home não quebra por cardinalidade baixa: grades se recompõem para 0, 1, 2 ou mais itens.
- Não usar lorem ipsum, datas fabricadas, URLs `#`, imagens remotas temporárias ou cards vazios permanentes.
- `EmptyState.astro` pode ser preservado, com tratamento visual adaptado e cópia localizada.
- Módulo sem base factual deve ser ocultado ou renomeado. “Mais lidas” exige métricas; “Ao vivo” exige atualização real; “Newsletter enviada” exige integração real.
- Bônus vencidos ou com verificação desatualizada não aparecem. A regra exata de vigência deve ser formalizada antes da implementação.
- Market sem itens públicos mostra categorias/explicação honesta, não vitrine fictícia.
- Falhas de tradução não devem cair silenciosamente para PT em superfícies V4 aprovadas; o gate deve detectar chaves ausentes.

## 18. Integração PT/ES

- PT continua na raiz; ES continua em `/es/`. Não migrar para `[locale]` no Bloco 7.
- `routeMap`, `routePath`, `localizeRoutePath` e `getAlternates` continuam sendo o contrato de URLs.
- A home PT e ES devem consumir o mesmo orquestrador e o mesmo loader tipado, recebendo `locale` e cópias por `ui.ts`.
- Não criar componentes duplicados por idioma.
- Datas usam locale; titles, labels, disclosures, estados vazios, `aria-labels` e mensagens de erro também.
- `translationKey` associa equivalentes sem alterar canônicas.
- A query de `parceiroCategorias` hoje não filtra locale e a home ES não aplica os campos espanhóis; isso deve ser corrigido na task do módulo Ferramentas.
- Qualquer nova chave precisa existir em PT e ES antes do merge.
- Canonical, hreflang e `x-default` permanecem responsabilidade do `Layout.astro`/`SEO.astro`.

## 19. Light/dark

- O mecanismo atual de classe `.dark`, preferência do sistema e `localStorage('radar-theme')` é preservado.
- O script inline deve continuar evitando flash de tema incorreto.
- Todos os tokens V4 precisam de par light/dark; consumidores usam papéis semânticos, não hex direto.
- SignalBar e módulos em preto editorial mantêm identidade nos dois temas, com ajustes de borda e texto.
- Verde-lima, coral, violeta e cores comerciais devem passar contraste em fundo claro e escuro.
- Imagens, overlays, focus rings, estados hover/active/disabled e campos de formulário entram na matriz de validação.
- O `theme-color` do documento deve acompanhar o tema quando a task correspondente alterar a superfície do masthead.

## 20. Acessibilidade

- Incluir skip link e landmarks únicos: header, nav, main e footer.
- Preservar ordem visual compatível com ordem do DOM.
- Todo controle tem nome acessível, estado e alvo reais.
- Indicadores não dependem apenas de cor; animação de “live” tem texto equivalente.
- Foco visível com contraste mínimo 3:1 e sem ser coberto pelo sticky header.
- Menu desktop: abrir/fechar por teclado, fechar com Escape e manter foco previsível.
- Menu mobile: trap de foco quando modal, Escape, retorno ao botão, scroll lock e `inert` controlados.
- Ticker pausa em hover/foco; `prefers-reduced-motion: reduce` remove deslocamento, pulso, scan line e transições não essenciais.
- Alvos interativos: mínimo aproximado de 44×44px em touch.
- Headings, listas de ranking, timestamps e disclosures usam semântica nativa.
- Formulários têm label persistente, erros associados e mensagens em região `aria-live` apenas quando reais.
- Validar teclado completo, leitores de tela e zoom de 200% antes do checkpoint final.

## 21. Performance

- Preservar geração estática e minimizar JavaScript cliente.
- Orquestração e queries devem ocorrer no build; interatividade só para menu, tema, ticker pausável e controles reais.
- Não duplicar markup extenso de ticker para tecnologia assistiva.
- Definir orçamento inicial para a home: LCP ≤ 2,5s, CLS ≤ 0,1 e INP ≤ 200ms no percentil aplicável, medidos em build/preview representativo.
- Medir tamanho de imagens e fontes por task; hero é o ativo prioritário.
- Não adicionar dependência para comportamento que CSS/HTML/Astro resolvem.
- Evitar queries repetidas e `.sort()` mutante em múltiplos trechos; o loader compartilhado prepara coleções uma vez e deduplica IDs/URLs.
- `npm run check` e `npm run build` continuam gates mínimos; Lighthouse e inspeção do bundle entram nas tasks 7.26/7.27.

## 22. Conteúdo comercial e disclosures

- Ferramentas, Bônus e Radar Market usam collections separadas da editorial, conforme `CONTENT_MODEL.md`.
- Cada módulo recebe rótulo localizado como “Conteúdo comercial”, “Oferta verificada” ou formulação aprovada que descreva a relação real.
- Links afiliados e códigos não podem receber linguagem de independência editorial enganosa.
- Bônus exige `status: verified`, vigência e data de verificação; item expirado não aparece.
- Market só promove produto real, publicado e elegível. O baseline contém categorias publicadas, mas nenhum item público.
- A política/schema definitivo de disclosure permanece no Bloco 10; a V4 implementa transparência visual sem antecipar campos não aprovados.
- O contraste visual distingue módulos comerciais, mas não os transforma em anúncios agressivos nem os esconde.

## 23. Mapeamento da arquitetura atual

### 23.1 Arquivos que constroem as homes

| Área | Arquivos atuais | Diagnóstico |
|---|---|---|
| Home PT | `src/pages/index.astro` | Template completo de 582 linhas, queries e módulos no mesmo arquivo |
| Home ES | `src/pages/es/index.astro` | Template completo de 543 linhas, quase duplicado da versão PT |
| Layout compartilhado | `src/layouts/Layout.astro` | SEO, canonical/hreflang, tema, header, nav, main e footer |
| Header/navbar | `Layout.astro`, `SiteNavigation.astro`, `MobileNavigation.astro`, `siteNavigation.ts` | Contrato funcional existente deve prevalecer |
| Componentes de apoio | `AdSlot.astro`, `CategoryArticleCard.astro`, `EmptyState.astro`, `SEO.astro` | Base reutilizável, com adaptação visual seletiva |
| Estilos/tokens | `src/styles/global.css`, `tailwind.config.mjs` | Tokens semânticos parciais, light/dark por classe, fontes remotas |
| i18n/rotas | `src/i18n/*` | PT raiz, ES `/es`, route map e dicionário compartilhado |
| Conteúdo | `src/content/config.ts`, collections e registries | Content Collections tipadas; editorial e comercial separados |

### 23.2 Queries atuais da home

- Artigos: `draft === false`, `contentType === 'article'`, locale; ordenação por `date` descendente; apenas três na abertura.
- Guias: mesma collection `artigos`, `contentType === 'guide'`, locale; apenas o mais recente.
- Ferramentas: `parceiroCategorias` publicadas por `order`, sem filtro de locale na query atual.
- Bônus: `draft === false`, `status === 'verified'`, locale, ordem e três itens; não há filtro explícito de expiração ou frescor de verificação.
- Market: `marketCategorias` publicadas e localizadas; a home não consome `marketItems`.
- Não existe query compartilhada PT/ES, guarda explícita de data futura, fonte de audiência para “Mais lidas” nem feed realtime para “Radar agora”.

### 23.3 Regras existentes a preservar

- Publicado editorial: `draft: false`; `primaryHub`, `topics` e `authorId` obrigatórios; formatos ativos são `article` e `guide`.
- `relatedHubs`: opcional, 1–3 IDs, sem duplicar `primaryHub`; não cria URL adicional.
- `translationKey`: associação estável entre idiomas.
- Hubs ativos: inteligência artificial, marketing digital e monetização; demais planejados não têm efeito público.
- Formatos planejados não criam rotas/módulos automaticamente.
- Ferramentas, Bônus e Market permanecem collections comerciais próprias.
- Rotas públicas e navegação são regidas por `SITEMAP.md`, `routeMap` e `siteNavigation.ts`.

## 24. Componentes preserváveis, adaptáveis e novos

### Preservar

- `Layout.astro` como proprietário de SEO, canonical, hreflang, tema e shell, alterado incrementalmente.
- `SEO.astro` e seus schemas existentes.
- `siteNavigation.ts` como registro central do menu.
- Helpers de i18n/rotas e registries editoriais.
- `AdSlot.astro` como API de slot localizado.
- `EmptyState.astro` como comportamento, com revisão visual.
- Content Collections e schemas atuais; expansão de schema exige task própria e autorização.

### Adaptar

- `SiteNavigation.astro`: linguagem visual V4, sticky e teclado/Escape.
- `MobileNavigation.astro`: linguagem V4, trap/retorno de foco e Escape.
- `CategoryArticleCard.astro`: decidir se evolui para variante de história ou é substituído gradualmente por `StoryCard` sem quebrar hubs.
- `AdSlot.astro`: superfícies/disclosure V4 e colapso honesto.
- `EmptyState.astro`: remover aparência glass excessiva e localizar todas as cópias.
- `Layout.astro`: separar SignalBar, Masthead, navegação e footer sem perder SEO/tema.
- `global.css`: migrar consumidores para tokens semânticos sem criar paleta paralela.

### Criar

- `SignalBar.astro`.
- `Masthead.astro` e placeholder isolado de marca.
- Um orquestrador compartilhado da home, por exemplo `HomeEditorial.astro`.
- Um loader/helper tipado, por exemplo `src/utils/homeData.ts`, com filtros, deduplicação e fallbacks.
- `EditorialLead.astro` e `SecondaryLead.astro`.
- `RadarNow.astro`.
- `TopicRail.astro`.
- `EditorialSection.astro`.
- `StoryCard.astro` e/ou `StoryRow.astro` com variantes explícitas.
- `MostRead.astro`, somente quando houver fonte auditável.
- Módulos de Editorias, Guias, Ferramentas, Bônus e Market como consumidores tipados.
- `NewsletterBlock.astro` sem sucesso simulado.
- `InstitutionalFooter.astro` com rotas reais.

Os nomes são propostas de responsabilidade, não autorização para criação imediata. A task específica pode ajustar nomes mantendo os limites.

## 25. Sequência de implementação

Cada task abaixo é pequena, fechada e sequencial. Uma task não autoriza itens listados em “fora”.

### 7.1 — Fundação visual e tokens

- **Objetivo:** consolidar aliases e tokens V4 em light/dark sem alterar estrutura da home.
- **Dependências:** Task 7.0.
- **Arquivos prováveis:** `src/styles/global.css`, `tailwind.config.mjs`, documentação de tokens.
- **Fora:** fontes, componentes, markup da home, navegação.
- **Validação:** contraste automatizado/manual, diff de tokens, `check`, `build`, PT/ES light/dark.
- **Risco principal:** criar uma segunda paleta ou quebrar consumidores antigos.
- **Pronto:** tabela de migração aplicada, aliases preservados e nenhuma regressão estrutural.

### 7.2 — Tipografia

- **Objetivo:** decidir, licenciar e carregar as fontes editorial/funcional com escalas V4.
- **Dependências:** 7.1.
- **Arquivos prováveis:** `global.css`, `tailwind.config.mjs`, ativos locais de fonte, configuração de preload no layout.
- **Fora:** reestruturação do header e dos módulos.
- **Validação:** PT/ES, fallbacks, CLS, peso transferido, `check` e `build`.
- **Risco principal:** regressão de LCP/CLS ou cobertura incompleta de caracteres.
- **Pronto:** concluída em 20/07/2026; fontes e fallbacks medidos, sem `@import` bloqueante e com pesos/eixos mínimos para os papéis aprovados.

### 7.3 — Barra superior “Radar agora”

- **Objetivo:** implementar SignalBar com status honesto, assuntos e acessos existentes.
- **Dependências:** 7.1–7.2; chaves PT/ES.
- **Arquivos prováveis:** novo componente, `Layout.astro`, `ui.ts`, estilos.
- **Fora:** masthead, nav e feed realtime.
- **Validação:** teclado, pausa, reduced motion, PT/ES, light/dark, `check`/`build`.
- **Risco principal:** alegar “ao vivo” sem fonte ou duplicar conteúdo para leitor de tela.
- **Pronto:** concluída em 20/07/2026; uma única barra responsiva, sem dados fictícios, com destinos reais, repetição visual oculta da árvore acessível e movimento controlável.

### 7.4 — Masthead

- **Objetivo:** separar marca e utilidades do menu, com monograma provisório isolado.
- **Dependências:** 7.1–7.3.
- **Arquivos prováveis:** novo `Masthead`, `Layout.astro`, `ui.ts`.
- **Fora:** busca simulada, logo definitivo, mudança da navegação.
- **Validação:** alturas, foco, data localizada, tema, CLS, PT/ES.
- **Risco principal:** utilidades falsas ou quebra do script de tema.
- **Pronto:** concluída em 20/07/2026; masthead compacto e localizado, marca provisória isolada, data corrente, tema e newsletter funcionais, sem busca ou rota inexistente, validado em 390/820/1440px.

### 7.5 — Navegação desktop

- **Objetivo:** aplicar a V4 ao menu desktop preservando o contrato aprovado.
- **Dependências:** 7.4 e contrato do Bloco 5.
- **Arquivos prováveis:** `SiteNavigation.astro`, `Layout.astro`, estilos.
- **Fora:** novos rótulos/rotas, menu mobile.
- **Validação:** teclado, Escape, foco, 1024/1280/1440px, rotas PT/ES.
- **Risco principal:** substituir o sitemap real pelos rótulos do mockup.
- **Pronto:** concluída em 20/07/2026; menus e disclosures reais acessíveis em PT/ES, teclado e clique fora validados, estados V4 light/dark aplicados e ausência de overflow confirmada em 1024/1280/1440px, sem alteração da navegação mobile.

### 7.6 — Navegação mobile

- **Objetivo:** adaptar hamburger/painel à V4 e concluir gestão de foco.
- **Dependências:** 7.5.
- **Arquivos prováveis:** `MobileNavigation.astro`, `Layout.astro`, estilos.
- **Fora:** mudança de sitemap e novos destinos.
- **Validação:** 320–1023px, teclado, touch, Escape, trap/retorno de foco, scroll lock.
- **Risco principal:** foco escapar para a página ou body permanecer bloqueado.
- **Pronto:** concluída em 20/07/2026; painel navegável e reversível em PT/ES, trap/retorno de foco, Escape, accordions, touch, scroll lock e altura disponível validados em 320–1023px, sem regressão desktop.

### 7.7 — Capa editorial principal

- **Objetivo:** criar a reportagem principal e o loader compartilhado inicial.
- **Dependências:** 7.1–7.6.
- **Arquivos prováveis:** home PT/ES, orquestrador/loader e `EditorialLead`.
- **Fora:** secundárias, Radar agora, imagens finais se ainda não aprovadas.
- **Validação:** query por locale/data/formato, H1 único, cardinalidade 0/1, canonical/hreflang.
- **Risco principal:** duplicar lógica entre PT/ES ou exibir conteúdo futuro.
- **Pronto:** concluída em 20/07/2026; principal real e determinística em PT/ES, filtro de data futura, cardinalidades 0/1, H1 único, fallback honesto e template compartilhado validados, sem antecipar secundárias ou imagem final.

### 7.8 — Notícias secundárias

- **Objetivo:** adicionar chamadas secundárias com pesos visuais distintos.
- **Dependências:** 7.7.
- **Arquivos prováveis:** `SecondaryLead`, orquestrador/loader e estilos.
- **Fora:** Radar agora e ranking.
- **Validação:** deduplicação, 0/1/2+ itens, headings e responsividade inicial.
- **Risco principal:** repetir a principal ou voltar ao mosaico de cards iguais.
- **Pronto:** concluída em 20/07/2026; composição assimétrica compartilhada em PT/ES, dados reais sem repetir a principal, cardinalidades 0/1/2+, headings e responsividade validados, sem iniciar Radar agora ou ranking.

### 7.9 — Painel Radar agora

- **Objetivo:** criar lista de notícias rápidas baseada em recência verificável.
- **Dependências:** 7.7–7.8.
- **Arquivos prováveis:** `RadarNow`, loader, `ui.ts`.
- **Fora:** websocket, CMS realtime e timestamps fabricados.
- **Validação:** datas localizadas, sem duplicação da dobra, estados vazios, reduced motion.
- **Risco principal:** promessa de tempo real sem infraestrutura.
- **Pronto:** concluída em 20/07/2026; painel compartilhado PT/ES, datas/atualizações verificáveis, deduplicação da dobra, estado vazio e composição 320–1440px validados, sem realtime, timestamps relativos ou ranking.

### 7.10 — Assuntos em destaque

- **Objetivo:** implementar TopicRail com topics ativos e cobertura real.
- **Dependências:** 7.9 e registries editoriais.
- **Arquivos prováveis:** `TopicRail`, loader, `ui.ts`.
- **Fora:** criação automática de páginas de topic.
- **Validação:** links apenas para rotas reais, teclado, pausa/reduced motion.
- **Risco principal:** links quebrados ou ticker inacessível.
- **Pronto:** concluída em 20/07/2026; lista única semântica PT/ES, seis topics ativos com cobertura real, rolagem manual por teclado e sem movimento automático, links ou destinos fictícios.

### 7.11 — Seleção da redação

- **Objetivo:** criar módulo curado com regra explícita e histórias deduplicadas.
- **Dependências:** 7.7–7.10.
- **Arquivos prováveis:** `EditorialSection`, `StoryCard/Row`, loader.
- **Fora:** novo campo de schema sem ADR própria.
- **Validação:** regra documentada, headings, locale, cards com/sem resumo/imagem.
- **Risco principal:** chamar algoritmo implícito de seleção editorial.
- **Pronto:** concluída em 20/07/2026; regra `remaining-recency` documentada, até três histórias deduplicadas dos módulos V4 anteriores, um checklist real PT/ES no acervo atual e fallback oculto sem cards, imagens ou destinos fictícios.

### 7.12 — Últimas publicações

- **Objetivo:** substituir a lista atual por módulo V4 compartilhado e tipado.
- **Dependências:** 7.11.
- **Arquivos prováveis:** `StoryRow`, orquestrador/loader, home PT/ES.
- **Fora:** página de arquivo/paginação do Bloco 8.
- **Validação:** ordem, data não futura, dedupe, 0–N itens, SEO e build.
- **Risco principal:** query repetida/mutante e conteúdo duplicado.
- **Pronto:** concluída em 20/07/2026; lista compartilhada e tipada de até seis artigos, ordem estável e deduplicada dos módulos V4 anteriores, estado zero real/localizado no acervo atual e nenhuma rota, paginação, recomendação ou linha fictícia.

### 7.13 — Mais lidas

- **Objetivo:** implementar ranking somente com uma fonte auditável e janela definida.
- **Dependências:** 7.12 e decisão de analytics/dados.
- **Arquivos prováveis:** `MostRead`, adapter de dados e `ui.ts`.
- **Fora:** ranking inventado e instalação ampla de analytics.
- **Validação:** origem, janela, empate, ausência de dados, acessibilidade da lista.
- **Risco principal:** métrica enganosa ou indisponível no build estático.
- **Pronto:** concluída em 20/07/2026 sem UI; a auditoria confirmou ausência de fonte, janela e regra de desempate auditáveis, portanto o módulo permanece ausente e a dependência de analytics/dados fica registrada para decisão própria.

### 7.14 — Editorias

- **Objetivo:** apresentar hubs ativos com cobertura e rotas existentes.
- **Dependências:** 7.12 e registries/hub routes atuais.
- **Arquivos prováveis:** módulo de hubs, loader e home compartilhada.
- **Fora:** ativar os 14 hubs planejados ou criar rotas genéricas.
- **Validação:** `primaryHub`/`relatedHubs`, dedupe de URL, PT/ES, estados vazios.
- **Risco principal:** expor taxonomia planejada sem página pública.
- **Pronto:** concluída em 20/07/2026; somente Inteligência Artificial e Marketing Digital são exibidas, com cobertura publicada deduplicada, destinos PT/ES existentes, estado zero oculto e nenhuma URL ou taxonomia adicional.

### 7.15 — Resolver hoje ✅

- **Objetivo:** traduzir intenções em acessos editoriais/funcionais reais.
- **Dependências:** 7.14 e mapa de rotas.
- **Arquivos:** `src/utils/homeData.ts` (contratos de intenção + `intentItems`), `src/components/IntentNavigator.astro`, `src/i18n/ui.ts` (chaves `home.intents.*`), `src/styles/global.css` (`.intent-navigator`), homes PT/ES.
- **Fora:** novas ferramentas, formulários ou formatos planejados.
- **Validação:** todos os destinos, cópia PT/ES, headings e touch.
- **Risco principal:** cards decorativos sem resolução real.
- **Pronto:** cada ação leva a conteúdo/rota elegível e usa hierarquia V4.
- **Implementação:** `IntentNavigator` é data-driven — cada contrato resolve um `href` real ou `null`; intenções editoriais (tráfego, IA, monetizar) exigem cobertura publicada do hub, e as funcionais (guias, ferramentas, bônus) exigem rota/conteúdo elegível. No acervo atual, Monetização fica oculta por falta de cobertura; as cinco restantes renderizam com rotas PT/ES corretas (`routePath`). Zero cards decorativos.

### 7.16 — Guias ✅

- **Objetivo:** criar módulo V4 para artigos `contentType: guide`.
- **Dependências:** 7.12.
- **Arquivos prováveis:** módulo de Guias, loader, home compartilhada.
- **Fora:** mudar schema ou página agregadora de guias.
- **Validação:** locale, data, 0/1/N, link correto, canonical/hreflang.
- **Risco principal:** confundir guia com artigo ou repetir histórias.
- **Pronto:** guias publicados reais com fallback localizado.
- **Implementação:** `GuideHighlights.astro` compartilhado; loader extrai guias antes da seleção da redação (prioridade de formato), exclui `occupiedEditorialIds`, máx. 3; fallback localizado quando vazio; PT 1 guia, ES 1 guia, sem duplicação.

### 7.17 — Ferramentas

- **Objetivo:** implementar módulo comercial usando categorias/parceiros reais e campos localizados.
- **Dependências:** 7.16 e política visual de disclosure.
- **Arquivos prováveis:** módulo de Ferramentas, loader comercial, `ui.ts`.
- **Fora:** novo parceiro, schema ou alegação comercial não verificada.
- **Validação:** ES sem cópia PT, disclosure, links, 0/N, teclado.
- **Risco principal:** vazamento de idioma e opacidade comercial.
- **Pronto:** conteúdo publicado, localizado e claramente comercial.

### 7.18 — Bônus

- **Objetivo:** exibir somente ofertas verificadas, vigentes e localizadas.
- **Dependências:** 7.17 e regra formal de vigência.
- **Arquivos prováveis:** módulo de Bônus, loader, talvez validação documental do schema em task própria.
- **Fora:** criar códigos ou alterar termos de parceiros.
- **Validação:** status, expiração, `verifiedAt`, locale, copy/disclosure.
- **Risco principal:** publicar oferta vencida ou não verificada.
- **Pronto:** regras automatizadas e fallback honesto sem códigos fictícios.

### 7.19 — Radar Market

- **Objetivo:** apresentar categorias e somente itens comerciais públicos elegíveis.
- **Dependências:** 7.17 e cobertura de Market.
- **Arquivos prováveis:** módulo Market, loader comercial, `ui.ts`.
- **Fora:** fabricar catálogo ou publicar draft.
- **Validação:** categorias PT/ES, status dos itens, links, zero itens.
- **Risco principal:** vitrine vazia mascarada por conteúdo demo.
- **Pronto:** categorias reais e estado transparente; itens apenas quando publicados.

### 7.20 — Newsletter

- **Objetivo:** aplicar a apresentação V4 sem simular inscrição.
- **Dependências:** 7.1–7.2 e decisão do Bloco 9 para integração.
- **Arquivos prováveis:** `NewsletterBlock`, `ui.ts`, home compartilhada.
- **Fora:** backend de leads, automação de e-mail e consentimento não aprovado.
- **Validação:** labels, erros/estado desabilitado, PT/ES, teclado, dark.
- **Risco principal:** falso sucesso ou coleta sem governança.
- **Pronto:** CTA/formulário descreve a capacidade real e é acessível.

### 7.21 — Footer institucional

- **Objetivo:** separar footer do layout e remover destinos fictícios.
- **Dependências:** mapa de rotas institucionais disponível.
- **Arquivos prováveis:** `InstitutionalFooter`, `Layout.astro`, `ui.ts`.
- **Fora:** criar páginas institucionais do Bloco 10.
- **Validação:** nenhum `#`, landmarks, PT/ES, contraste, mobile.
- **Risco principal:** links para páginas inexistentes.
- **Pronto:** um único footer, somente com destinos reais e disclosures adequados.

### 7.22 — Consolidação ES

- **Objetivo:** auditar paridade integral da V4 espanhola sobre componentes compartilhados.
- **Dependências:** 7.3–7.21.
- **Arquivos prováveis:** `ui.ts`, loaders/componentes compartilhados, home ES mínima.
- **Fora:** terceira língua e migração `[locale]`.
- **Validação:** rotas, cópias, datas, aria, canonical/hreflang e conteúdo comercial.
- **Risco principal:** fallback silencioso para PT ou divergência de template.
- **Pronto:** paridade funcional/visual PT-ES sem componentes duplicados.

### 7.23 — Dark mode

- **Objetivo:** concluir os equivalentes dark de todos os módulos V4.
- **Dependências:** 7.1 e módulos 7.3–7.22.
- **Arquivos prováveis:** tokens/estilos e componentes consumidores.
- **Fora:** redesign específico separado do light.
- **Validação:** contraste, flash de tema, imagens/overlays, estados de interação.
- **Risco principal:** inversão mecânica e texto/verde sem contraste.
- **Pronto:** matriz de módulos/estados aprovada nos dois temas.

### 7.24 — Responsividade

- **Objetivo:** consolidar composição e densidade em todos os breakpoints.
- **Dependências:** 7.3–7.23.
- **Arquivos prováveis:** estilos e componentes V4.
- **Fora:** novos módulos ou conteúdo.
- **Validação:** 320, 375, 390, 768, 820, 1024, 1280, 1440 e 1920px; zoom 200%.
- **Risco principal:** overflow, ordem visual/DOM divergente e sticky excessivo.
- **Pronto:** nenhum overflow horizontal ou conteúdo inacessível; composições documentadas.

### 7.25 — Acessibilidade

- **Objetivo:** auditoria e correção transversal de teclado, semântica, foco e motion.
- **Dependências:** 7.3–7.24 e pendência 5.8 coordenada.
- **Arquivos prováveis:** Layout, navegações, componentes V4 e estilos.
- **Fora:** certificação formal WCAG por terceiro.
- **Validação:** axe/Lighthouse, teclado, leitores de tela, reduced motion, contraste e zoom.
- **Risco principal:** tratar auditoria automatizada como cobertura completa.
- **Pronto:** fluxos críticos manuais aprovados e falhas automáticas relevantes zeradas/documentadas.

### 7.26 — Imagens e performance

- **Objetivo:** integrar mídia editorial final e fechar orçamento de Core Web Vitals/bundle.
- **Dependências:** componentes estáveis e ativos licenciados.
- **Arquivos prováveis:** assets locais, componentes de imagem, páginas/home e configuração estritamente necessária.
- **Fora:** hotlinks e biblioteca de mídia sem uso.
- **Validação:** formatos/tamanhos, LCP/CLS/INP, rede simulada, alt e proveniência.
- **Risco principal:** hero pesado ou fontes/imagens ampliarem LCP.
- **Pronto:** mídia licenciada otimizada, dimensões explícitas e orçamento atendido/documentado.

### 7.27 — Documentação e checkpoint final

- **Objetivo:** reconciliar especificação, implementação e evidências antes de retomar o Bloco 6.
- **Dependências:** 7.1–7.26 concluídas ou impedimentos formalizados.
- **Arquivos prováveis:** `DESIGN_V4.md`, `DECISIONS.md`, `ROADMAP.md`, `PROGRESSO.md` e apenas correções já identificadas pela validação.
- **Fora:** iniciar templates de hubs ou novos módulos.
- **Validação:** `git diff --check`, `npm run check`, `npm run build`, sitemap/rotas, SEO, visual PT/ES, light/dark, desktop/mobile, a11y e performance.
- **Risco principal:** declarar a V4 estável com dívida não registrada.
- **Pronto:** matriz de aceite fechada, baseline publicado e recomendação formal para retomada do Bloco 6.

## 26. Critérios de aceite visual e técnico

### Visual

- Três faixas distintas no topo: SignalBar, masthead e navegação.
- Fundo editorial creme com alternância controlada de módulos pretos.
- Verde-lima usado como sinal, não como superfície dominante.
- Capa assimétrica com principal, secundárias de pesos diferentes e Radar agora.
- Hierarquia tipográfica editorial evidente e diversidade de layouts.
- Nenhum mosaico infinito, aparência SaaS/dashboard, gradiente genérico, glassmorphism ou arredondamento excessivo.
- PT/ES, light/dark e composições mobile/desktop aprovados.

### Técnico

- Componentes Astro pequenos e compartilhados; sem HTML monolítico e sem duplicação PT/ES.
- Conteúdo real de Content Collections, com filtros de publicação, locale, data e elegibilidade.
- Nenhuma data futura, URL externa de imagem final, link `#` ou sucesso simulado.
- Canonical, hreflang, schemas, sitemap e 28 URLs preservados salvo decisão posterior explícita.
- Uma H1, headings coerentes, teclado completo, foco, reduced motion e zoom.
- Imagens locais/gerenciadas, responsivas e dimensionadas; fontes medidas.
- `git diff --check`, `npm run check` e `npm run build` verdes em cada checkpoint.
- Sem dependência nova sem justificativa e task própria.

## 27. Riscos e dependências

| Risco/dependência | Tratamento |
|---|---|
| Big bang da homepage | Tasks 7.1–7.27 isoladas e reversíveis |
| Mockup divergir do sitemap | Contrato real de `siteNavigation.ts`/`SITEMAP.md` prevalece |
| Duplicação PT/ES | Orquestrador e loader compartilhados; páginas finas por locale |
| Conteúdo insuficiente | Grades adaptáveis, módulos ocultáveis e estados honestos |
| “Mais lidas” sem analytics | Não renderizar até existir fonte auditável |
| “Radar agora” sem realtime | Usar recência/data real e rótulo não enganoso |
| Bônus expirados | Filtro de expiração e verificação antes da exibição |
| ES de Ferramentas em PT | Aplicar campos/localização explícita no loader |
| Fontes e hero degradarem LCP | Self-host/subset, preload mínimo e pipeline responsivo |
| Sticky prejudicar viewport/foco | SignalBar não sticky, offset tokenizado, testes mobile/zoom |
| Regressão SEO | Preservar Layout/SEO, uma URL por conteúdo e matriz canonical/hreflang/schema |
| Regressão sitemap/rotas | Nenhuma rota no Bloco 7 sem decisão; comparar 28 URLs |
| Dark mode por inversão | Tokens semânticos e revisão de imagens/estados por módulo |
| Movimento inacessível | pausa e `prefers-reduced-motion` em ticker, pulso e scan line |
| Disclosure definitivo pendente | Transparência visual agora; política/schema final no Bloco 10 |
| `ROUTES.md`/`I18N.md` ausentes | Registrar gap e criar somente em task documental autorizada |

## 28. Itens explicitamente fora da V4

- Logo final e manual completo de marca.
- CMS externo ou migração das Content Collections.
- Migração de rotas para `[locale]` ou habilitação de EN/VI/ZH.
- Novas rotas de topics, formatos ou hubs planejados.
- Busca, arquivo geral e descoberta, que pertencem ao Bloco 8.
- Backend e gestão de leads da newsletter, que pertencem ao Bloco 9.
- Páginas institucionais e schema/política definitiva de disclosure, que pertencem ao Bloco 10.
- Analytics/infraestrutura de ranking sem decisão própria.
- Produtos, ofertas, parceiros, datas ou imagens fictícias.
- Logo/monograma do mockup como ativo definitivo.
- Cópia do HTML V4, protótipo paralelo ou componente único da home.
- Alteração visual ou funcional realizada pela Task 7.0.
