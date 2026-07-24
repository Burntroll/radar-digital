# 🚧 Progresso — Radar Digital

> **Stack:** Astro 4 + Tailwind + TypeScript
> **Hospedagem:** Vercel (https://radar-digital-lemon.vercel.app)
> **Domínio:** radardigital.ai (não conectado — preview Vercel apenas)
> **Última atualização:** 23/07/2026 — Painel "Radar agora" alinhado ao mockup V4: header em linha única ("Radar agora" à esquerda + "● EM MOVIMENTO" à direita, dot pulsante com `prefers-reduced-motion` respeitado), removido override de coluna no desktop, texto do status atualizado PT/ES (era "Recência editorial"); imagens reais na abertura (hero + 2 secundárias): 3 fotos Unsplash verificadas por conteúdo (social/prompting/email) em `public/images/artigos/`, campo `image:` nos 6 frontmatters PT/ES, camada `.editorial-lead__media`/`.secondary-lead__media` (z:-2 sob os overlays, hover zoom) — validado em browser PT/ES; respiro de 24px do AdSlot horizontal; sessão anterior: refinamento visual V4 (16 itens + ajustes de revisão): cursor pointer nas pills EM FOCO, kickers em pílula verde simétricos, pills do topic-rail transparentes, overlay de busca fora do header, anel de foco verde, cards Resolver Hoje sem "ACESSAR", Seleção da Redação removida, marca Georgia 600/#10131A, favicon RD, hero do artigo como banner escuro editorial (PT e ES). Tudo não commitado.
> **Baseline remoto auditado para a Task 7.0:** `aad1c0c5b51e185ba3a93e292215bf044afac9eb` — `chore: preserve visual exploration artifacts`; `master` e `origin/master` sincronizados, ahead/behind `0/0`
> **Checkpoint final do Bloco 7:** `42c277d` — `docs: close Bloco 7 checkpoint — V4 stable, recommend Bloco 6`
> **Checkpoint documental do Bloco 3:** `a52757c` — `docs: close editorial architecture block`
> **GitHub Actions:** success ✅ (todos os commits do Bloco 7)
> **Vercel:** conteúdo atualizado confirmado (R1 — 6 fetches com cache busting)
> **Idiomas:** PT (raiz, default) + ES (`/es/`) ✅
> **Build:** 41 páginas | **Sitemap:** 28 URLs
> **Quality gate:** `npm run build` valida dados da collection; `npm run check` valida TypeScript/Astro (não frontmatter)

## 🟢 Concluído

### Setup & Fundação
- [x] **Stack:** Astro + Tailwind + TypeScript
- [x] **Repositório:** `github.com/Burntroll/radar-digital`
- [x] **Deploy Vercel** — Preview automático via CI
- [x] **GitHub Actions** — Workflow quality-check.yml (npm ci → check → build)
- [x] **Redirects ES** + fallback

### Design & UI
- [x] **Tema Dark/Light** — CSS variables + toggle + localStorage
- [x] **Light mode** — Editorial Cream surfaces publicadas no commit `39970e2` (canvas `#f8f4ec`, card `#fffdf8`, elevated `#f1ebe2`, borda `#d9d0c3`); primeiro estágio aplicado parcialmente (superfícies e bordas); estágio 2 iniciado parcialmente em `5a41d88` (neutros de texto: secondary `#50504c`, muted `#696760`; primary `#0f172a` inalterado); antiga paleta creme (`#f0ece4`, introduzida em `08a74c1`) preservada como referência histórica
- [x] **Página 404** — Three.js com radar estilizado + noindex
- [x] **Nav renomeado** — "Ferramentas" (PT) / "Herramientas" (ES)
- [x] **Locale switcher** — Dropdown PT/ES com hreflang
- [x] **Componentes padronizados** — glass-card, interactive-card, AdSlot, EmptyState, CategoryArticleCard
- [x] **Camada semântica de cores** — 9 papéis (brand-cyan, link, interactive, focus, editorial, editorial-active, commercial, surface-header, surface-ad) + aliases de compatibilidade (`--color-accent`, `--color-accent-purple`); publicada no commit `5c73789` sem mudança visual intencional; dark mode preservado conceitual e tecnicamente
- [x] **Task 7.0 — direção editorial V4 congelada** — `docs/DESIGN_V4.md` traduz o Plano de Ação 2.2 e o mockup aprovado para a arquitetura Astro/Content Collections real, mapeia componentes/dados/riscos e decompõe o Bloco 7 em tasks 7.1–7.27. Esta task não alterou homepage, layout, componentes, CSS, rotas, conteúdos, configuração ou dependências.
- [x] **Task 7.1 — fundação visual e tokens V4** — camada canônica light/dark publicada em `global.css`, aliases antigos preservados, namespaces Tailwind semânticos adicionados e matriz de migração/contraste registrada em `docs/DESIGN_V4.md`; nenhum componente, layout, conteúdo ou markup da home foi alterado.
- [x] **Task 7.2 — tipografia V4** — Inter 4.1 funcional e Source Serif 4.005 editorial self-hosted sob OFL, subsets variáveis PT/ES medidos, escalas tipográficas tokenizadas, preload limitado à Inter crítica e `@import` remoto removido; header e módulos da home não foram reestruturados.
- [x] **Task 7.3 — barra superior “Radar agora”** — `SignalBar` global com status honesto “Em atualização”, assuntos ligados apenas a rotas existentes, acesso localizado à newsletter e ao idioma alternativo, repetição visual fora da árvore acessível e movimento pausável/reduzido; sitemap e rotas preservados.
- [x] **Task 7.4 — masthead editorial V4** — marca e utilidades separadas da navegação, monograma provisório isolado, data corrente localizada em PT/ES, newsletter e tema reais no desktop e composição compacta com hamburger no mobile; busca fictícia, novas rotas e alterações da homepage permaneceram fora do escopo.
- [x] **Task 7.5 — navegação desktop V4** — faixa editorial aplicada ao contrato real de `siteNavigation.ts`, com grupos Setores, Operação e Recursos, links de primeiro nível preservados, estados hover/active/focus e disclosures acessíveis por teclado, Escape e clique fora; navegação mobile, rotas e sitemap permaneceram inalterados.
- [x] **Task 7.6 — navegação mobile V4** — hamburger e painel adaptados aos tokens editoriais, mantendo a árvore real, locale e tema; foco inicial, trap Tab/Shift+Tab, Escape com retorno, accordions por teclado, touch, scroll lock, `inert` e transição para desktop foram validados em PT/ES e 320–1023px.
- [x] **Task 7.7 — capa editorial principal V4** — loader tipado e compartilhado filtra publicação, formato, locale e data futura com desempate determinístico; `EditorialLead` serve PT/ES com uma única H1, URL/data localizadas, fallback institucional sem link e mídia provisória sem ativo remoto; secundárias permanecem para a 7.8.
- [x] **Task 7.8 — notícias secundárias V4** — `SecondaryLeads` compartilhado consome os dois artigos seguintes do loader sem repetir a principal; variantes feature/compact, headings H2, datas/URLs localizadas e recomposição 0/1/2+ substituem os cards iguais da abertura, enquanto o guia permanece apenas em seu módulo próprio e Radar agora não foi iniciado.
- [x] **Task 7.9 — painel Radar agora V4** — loader exclui toda a dobra já destacada e ordena até quatro entradas por `updatedAt` verificável ou data publicada; `RadarNow` compartilhado usa datas absolutas PT/ES, estado vazio localizado e grade responsiva, sem alegação realtime, tempo relativo, links fictícios ou animação automática.
- [x] **Task 7.10 — Assuntos em destaque V4** — loader cruza topics ativos com cobertura publicada real de artigos e guias em cada locale; `TopicRail` compartilhado preserva a ordem do registro em uma lista semântica com rolagem manual e foco visível, mantendo os seis itens como texto porque ainda não existem rotas públicas de topic, sem links ou movimento fictícios.
- [x] **Task 7.11 — Seleção da redação V4** — regra `remaining-recency` seleciona até três conteúdos publicados de formatos ativos depois de excluir principal, secundárias e Radar agora; o acervo atual rende um checklist real por locale, exibido por `EditorialSelection`/`StoryCard` com URL, data, leitura e fallback de mídia honestos, sem CTA de arquivo ou curadoria fictícia.
- [x] **Task 7.12 — Últimas publicações V4** — loader prepara até seis artigos por ordem estável depois de excluir todos os módulos V4 anteriores; `LatestPublications`/`StoryRow` substituem a lista legada e sua lateral duplicada, enquanto o acervo atual renderiza estado zero PT/ES porque os três artigos publicados já estão na dobra, sem arquivo, paginação ou linhas fictícias.
- [x] **Task 7.13 — Mais lidas V4** — auditoria de código, schemas, configuração, dependências e deploy confirmou que não existe fonte de audiência, janela temporal ou regra de desempate verificáveis; conforme o contrato aprovado, o módulo permanece ausente em PT/ES e nenhuma métrica, posição, chave de UI ou infraestrutura foi fabricada.
- [x] **Task 7.14 — Editorias V4** — loader cruza hubs ativos, rotas públicas e cobertura publicada por `primaryHub`/`relatedHubs`; Inteligência Artificial e Marketing Digital aparecem uma vez em PT/ES com contagens deduplicadas, enquanto Monetização sem cobertura e todos os hubs planejados permanecem ocultos.
- [x] **Task 7.15 — Resolver hoje V4** — `IntentNavigator` compartilhado substitui a grade inline legada por intenções data-driven: cada contrato resolve um `href` real ou `null`, intenções editoriais exigem cobertura publicada do hub e as funcionais exigem rota/conteúdo elegível; no acervo atual renderizam tráfego, IA, guias, ferramentas e bônus com rotas PT/ES corretas via `routePath`, enquanto Monetização fica oculta por falta de cobertura — zero cards decorativos.
- [x] **Task 7.16 — Guias V4** — `GuideHighlights` compartilhado substitui a seção inline legada; loader extrai guias (`contentType: guide`) com prioridade sobre a seleção da redação, exclui itens já usados nas seções superiores, máx. 3; PT renderiza 1 guia (checklist segurança), ES 1 guia (checklist seguridad), ambos com hrefs localizados via `routePath`; fallback localizado quando vazio; zero duplicação.
- [x] **Task 7.17 — Ferramentas V4** — `ToolDirectory` compartilhado substitui a seção inline legada; loader carrega `parceiroCategorias` publicadas (estrutural, sem filtro de locale), resolve `descriptionEs` com fallback para `description`; disclosure comercial visível em PT/ES; 2 categorias (Trackers, Antidetect Browsers) com hrefs localizados (`/ferramentas/*`, `/es/herramientas/*`); ES sem cópia PT; fallback localizado quando vazio.
- [x] **Task 7.18 — Bônus V4** — `BonusDeals` compartilhado (op-cards V4 com monograma, badge verificado e cupom em `code`) substitui a seção inline legada; loader filtra somente `status === 'verified'` E vigentes (`expiresAt` nulo ou posterior ao build) no locale corrente, ordena por `order`, máx. 3; PT/ES renderizam RedTrack, AdHeart e Anstrex (ordem aprovada no Plano 2.2) com códigos reais e hrefs localizados (`/bonus`, `/es/bonos`); expirados (SMS-Activate) e não confirmados (Keitaro, Proxy-Seller) permanecem ocultos; disclosure comercial visível; fallback localizado quando vazio.
- [x] **Task 7.19 — Radar Market V4** — `MarketShowcase` compartilhado substitui a seção inline legada; loader filtra `marketCategorias` publicadas no locale, ordena por `order`; PT/ES renderizam 4 categorias na ordem aprovada (IA & Automação, Tráfego & Operação, Social & Conteúdo, Cursos & Treinamentos); placeholder draft permanece oculto; disclosure comercial visível; links para `/market` e `/es/market`; fallback localizado quando vazio.
- [x] **Task 7.20 — Newsletter V4** — `NewsletterBlock.astro` compartilhado substitui blocos inline PT/ES. Apresentação editorial estática e honesta: sem `<form>`, `<input>`, `<button>`, `onsubmit`, `alert()` ou textos que prometiam assinatura funcional. Todo texto via `t()` com chaves `eyebrow`, `title`, `status`, `note`. Conteúdo localizado: "Newsletter / O sinal chega em breve / Em preparação" (PT) e "Newsletter / La señal llegará pronto / En preparación" (ES). Âncoras preservadas (`/#newsletter`, `/es/#newsletter`). Tokens V4 (sem cyan legado). Light/dark validados. Publicado no commit `7ce36d7` (GitHub Actions Quality Check #90 — success). Validação remota: 3/3 fetches com cache busting confirmam conteúdo novo e formulário ausente. 41 páginas, 28 URLs preservadas. Associação deployment/SHA não comprovada por API, mas conteúdo servido corresponde ao commit publicado. Integração real permanece no Bloco 9. Footer mantido fora do escopo (Task 7.21).
- [x] **Task 7.27 — Documentação e checkpoint final** — Reconciliação completa do DESIGN_V4.md: Tasks 7.20–7.27 atualizadas com ✅ e notas de implementação. Matriz de aceite do Bloco 7 fechada (18/18 critérios atendidos). Dívida registrada (11 itens com bloco/task futuro). Recomendação formal: Bloco 7 concluído e estável, retomar Bloco 6 (Hubs) como próxima prioridade. Baseline: `d0e0b07` (23/07/2026). 41 páginas, 28 URLs, 0 errors, 13 hints.
- [x] **Task 7.26 — Imagens e performance** — Auditoria de Core Web Vitals via Playwright (preview local). CLS: 0,0002 PT / 0,0003 ES (orçamento ≤0,1). FCP: 524ms PT / 452ms ES. TTFB: 20ms/5ms. Load: 160ms/93ms. Transfer total: 182KB. Decoded: 283KB. 6 resources (4 CSS, 2 JS). Fontes: Inter 67.576B + Source Serif 4 94.304B = 161.880B, ambas preloaded, OFL 1.1. Bundle: JS ~7,4KB (6 arquivos), CSS ~123KB (2 arquivos). dist total: 1,6MB. Zero imagens editoriais (placeholders emoji), zero hotlinks. `StoryCard`/`StoryRow` já preparados com `loading="lazy"`, `decoding="async"`, `width`/`height` explícitos. **Dependência pendente:** mídia editorial licenciada (DESIGN_V4.md §15). **Sem alteração de código.**
- [x] **Task 7.25 — Acessibilidade** — Auditoria axe-core (WCAG 2.0/2.1 AA + best-practice) via Playwright PT/ES. Antes: 3 violações (22 nodes contraste + 2 landmarks). Depois dos fixes: 9 nodes contraste (todos `aria-hidden="true"` decorativos: números gigantes, setas →, monogramas de bônus) + 2 landmarks documentados. **Fixes aplicados** (commit `f738b38`): novos tokens `--color-eyebrow-editorial` (#5f4fe8 light / #8b80ff dark) e `--color-eyebrow-commercial` (#8a5a00 light / #f59e0b dark) com contraste AA; 7 eyebrows migrados; `guide-highlights__badge` e `bonus-deals__verified` migrados; `site-footer__portal` opacidade 0.35→0.55; `ad-slot` opacity removido (label e text). **Landmarks documentados:** RadarNow `<aside>` dentro de `<main>` é semanticamente correto (conteúdo tangencial); SignalBar e RadarNow com nomes distintos via `t()` — renomear alteraria UX aprovada. **Reduced motion:** ticker desativado (`animation: none`), scan-line dark-only com opacidade reduzida. **Foco visível:** 2px solid verde-sinal (`--color-focus`). Teclado já validado na Task 5.8.
- [x] **Task 7.24 — Responsividade** — Auditoria em 9 breakpoints (320, 375, 390, 768, 820, 1024, 1280, 1440, 1920px) + zoom 200% via Playwright. Zero overflow horizontal estrutural em todos (`scrollWidth === clientWidth`). Ticker da SignalBar em ≥1024px é overflow intencional contido por `overflow: hidden` + `aria-hidden`. Ordem DOM == ordem visual (11 seções). Sticky header 126px (conforme spec), SignalBar `relative` (sai no scroll). Transição nav mobile→desktop em 1024px. Zoom 200%: overflow=0, structural=0. PT e ES idênticos em todos os cenários. **Sem alteração de código.**
- [x] **Task 7.23 — Dark mode** — Auditoria + fix mínimo. Tokens dark completos no `global.css` (16 papéis com equivalentes). 21/22 componentes V4 usam exclusivamente `var(--color-*)`. Fix único: `BrandMark.astro` ring `rgb(244 241 233 / 0.14)` → `rgb(var(--color-text-inverse-rgb) / 0.14)` (commit `8d146cd`). Validação Playwright PT/ES: zero light leaks, todos os módulos com cores dark corretas (canvas `#0a0b0f`, cards `#111318`, footer/signalbar `#05070a`), contraste AA/AAA (primário 17,43:1, secundário 9,41:1, muted 5,79:1, link 12,53:1, signal 17,07:1, live 7,46:1, inverse 17,87:1), flash prevention funcional (light/dark preference + theme-color), toggle funcional com persistência em localStorage.
- [x] **Task 7.22 — Consolidação ES** — Auditoria de paridade integral PT/ES da V4. 104 chaves `t()` completas (0 ausentes), 18 valores idênticos classificados (marca/sigla/termo internacional), zero fallback PT público, rotas localizadas via `routePath()`, datas via `getDateLocale(locale)`, conteúdo comercial ES correto (Ferramentas `descriptionEs`, Bônus `-es.md`, Market categorias ES), canonical/hreflang bidirecional em 14 pares, paridade visual desktop (overflow=0, 1 H1, 1 footer) e mobile 390×844 (M1 — Playwright Chromium, zero overflow estrutural, menu mobile funcional PT/ES com inert correto), remoto R1 (6 fetches com cache busting, conteúdo novo consistente). Achados legados (ternários inline, cyan em páginas não-V4, branches mortas) registrados como dívida fora do escopo. **Sem alteração de código.** Veredito A.
- [x] **Task 7.21 — Footer institucional V4** — `SiteFooter.astro` compartilhado substitui footer inline do Layout. Links reais via `routePath()` (IA, Marketing, Monetização, Guias, Ferramentas, Bônus, Market), idiomas com `hreflang`/`aria-current`, transparência comercial localizada, copyright. Zero `href="#"`, zero cyan legado, zero links fictícios (Privacidade/Termos/Contato omitidos — Bloco 10). Commits: `3e848d7` (implementação) + `59c5a10` (fix: seletor `[data-site-footer]` no inert do menu mobile, substituindo `querySelector('footer')` genérico que capturava footer interno do RadarNow). Publicado em `59c5a10` (push autorizado). 41 páginas, 28 URLs.
- [x] **Task 5.8 — Auditoria de acessibilidade por teclado da navegação** — Baseline auditado `658f215`. Desktop PT e ES validados: Enter, Space, Tab, Escape, exclusividade entre disclosures, clique externo, `aria-expanded` sincronizado, foco visível, `aria-current`. Mobile: foco inicial no primeiro link do painel, focus trap com 14 elementos, inert, scroll lock, Escape fecha e restaura. Nenhuma falha de teclado reproduzida. **Sem alteração de código.** Testes de leitor de tela, viewport mobile real e transição de breakpoints transferidos para a Task 7.25 (ROADMAP).

### Conteúdo & Collections
- [x] **Content Collections** — Zod schemas para todas as coleções
- [x] **8 publicações PT + ES** (4 pares): Email Marketing, Múltiplas Contas, Prompts, Checklist Segurança
- [x] **17 drafts** em 3 categorias
- [x] **6 parceiros PT + ES** — Trackers e Antidetect Browsers
- [x] **9 bônus PT + ES** — Códigos promocionais com status
- [x] **2 guias publicados + 1 draft**
- [x] **Radar Market** — Coleção + página + bloco na home

### i18n PT/ES
- [x] **Estrutura bilíngue** — PT na raiz, ES em `/es/`
- [x] **Dicionário i18n** — ~100+ chaves PT/ES
- [x] **Route map** — `artigos`→`articulos`, `bonus`→`bonos`, etc.
- [x] **hreflang bidirecional** + x-default apontando para PT
- [x] **5 idiomas configurados** — PT, ES (ativos) + EN, VI, ZH-CN (desativados)

### 🔧 Bloco 4 — Decisão sobre CMS (✅ CONCLUÍDO)

#### Tasks

| ID | Task | Status |
|---|---|---|
| 4.1 | Levantar necessidades editoriais para decisão sobre CMS | ✅ Concluído |
| 4.2 | Comparar opções de CMS (Content Collections, WordPress Headless, Payload, Sanity) | ✅ Concluído |
| 4.3 | Criar prova de conceito (se necessária) | ⏭️ Não necessária neste ciclo |
| 4.4 | Registrar decisão formal em ADR | ✅ Concluído |

#### Decisão

- **Astro Content Collections** mantida como fonte editorial para o lançamento e operação inicial.
- **Git** permanece como fonte de verdade para conteúdo, código, documentação e decisões.
- Nenhum CMS externo (WordPress, Payload, Sanity) foi implementado.
- Nenhuma prova de conceito foi executada.
- Decisão registrada em `docs/DECISIONS.md` (ADR — Estratégia de CMS para o lançamento).
- Reavaliação condicionada a gatilhos operacionais (equipe não técnica, fluxo de revisão, agendamento, etc.).

#### Documentação produzida

- [x] **`docs/CMS_REQUIREMENTS.md`** — Requisitos editoriais e 13 respostas estratégicas
- [x] **`docs/CMS_COMPARISON.md`** — Comparação factual de 4 alternativas sem vencedor
- [x] **`docs/DECISIONS.md`** — ADR com decisão, motivos, limitações e gatilhos de reavaliação

---

### 🔧 Bloco 5 — Navegação e mega menus (🔄 EM ANDAMENTO)

#### Tasks

| ID | Task | Status |
|---|---|---|
| 5.1 | Estrutura-base do navbar (Início, Setores, Operação, Recursos, Radar Market, idioma, tema) | ✅ Concluído |
| 5.2 | Mega menu de Setores (apenas IA elegível; E-commerce, Crypto, iGaming fora da navegação) | ✅ Concluído |
| 5.3 | Mega menu agrupado de Operação (apenas hubs elegíveis — Marketing Digital e Monetização) | ✅ Concluído |
| 5.4 | Verticais (todos os hubs inelegíveis — ausente do navbar é comportamento aprovado) | ✅ Concluído sem implementação pública |
| 5.5 | Menu de Recursos — implementado (disclosure mantido com Guias; Ferramentas e Bônus promovidos a anchors independentes — ícones removidos no commit `bd78ec4`, links exclusivamente textuais) | ✅ Concluído |
|| 5.6 | Menu do Radar Market (anchor principal mantido; sem submenu público neste ciclo — sem conteúdo comercial elegível) | ✅ Concluído |
|| 5.7 | Implementar menu mobile — dedicado, responsivo (< 1024 px), com hamburger, painel, accordions, locale e tema; navbar desktop preservado | ✅ Concluído |
|| **5.8** | **Validar teclado e leitores de tela** | **✅ Concluída como auditoria de baseline — sem correção de código necessária. Testes de leitor de tela, viewport mobile real e transição de breakpoints transferidos para a Task 7.25 (ROADMAP).** |

#### Regressão visual do seletor PT/ES — encerrada

A regressão foi corrigida pelo commit `ef99fb9`
(`fix: detach locale dropdown from nav overflow`).

**Causa confirmada:** o wrapper externo da navbar
(`<div class="flex items-center gap-4 overflow-x-auto">`) incluía links, seletor
de idioma e theme toggle, fazendo o painel absoluto do locale participar da
região rolável. `overflow-x: auto` impunha `overflow-y: auto`, e ao abrir o
dropdown o `scrollHeight` do container saltava de 40 px para 118 px, criando
scrollbar vertical de 78 px.

**Solução:** os links de navegação ganharam um container rolável próprio em
`SiteNavigation.astro`; locale switcher e theme toggle foram movidos para fora
dele. O wrapper externo perdeu o `overflow-x-auto`.

**Resultado remoto validado (Playwright, 8 combinações):**
- PT `/` e ES `/es/` nos breakpoints 390, 768, 1024 e 1440 px
- `scrollHeight` do wrapper permanece em 40 px com o locale aberto em todos os cenários
- Diferença `scrollHeight - clientHeight`: 0 px
- Nenhuma scrollbar vertical na navbar
- Nenhum clipping do painel
- GitHub Actions e Vercel aprovados (SHA `ef99fb9`)
- Demais menus inalterados

#### Arquitetura implementada (Task 5.5)

Decisão do Plano de Ação 2.1 registrada em `docs/DECISIONS.md`:

- Recursos permanece como disclosure no navbar;
- Guias continua dentro de Recursos;
- Ferramentas e Bônus foram promovidos a anchors independentes de primeiro nível (ícones removidos no commit `bd78ec4` — links exclusivamente textuais em desktop e mobile);
- Ferramentas e Bônus não são duplicados dentro de Recursos;
- Cases, Entrevistas e Reviews permanecem condicionais à elegibilidade futura;
- Nenhuma rota pública foi alterada.

Implementada nos commits `e2aef6d` e `8dade9c`. Validado em PT e ES.

**Validação remota (Task 5.5):** publicada no checkpoint `1f478c5`, aprovada no GitHub Actions run `29265816504`, implantada no preview Vercel, validada remotamente em PT e ES. Mantidas 41 páginas, 28 URLs e 15 hints conhecidos.

#### Pendências imediatas

- Regressão visual do seletor PT/ES — encerrada (commit `ef99fb9`).
- Task 5.5 implementada e validada (commits `e2aef6d` + `8dade9c`). Ícones de Ferramentas e Bônus removidos no commit `bd78ec4` — links exclusivamente textuais em desktop e mobile, PT e ES.
- Task 5.6 concluída — anchor mantido; submenu inelegível neste ciclo por ausência de conteúdo comercial real, destinos válidos e equivalência PT/ES.
- Task 5.7 concluída, publicada e validada — navegação mobile dedicada (< 1024 px) com hamburger, painel vertical, accordions nativos, locale e tema; desktop integralmente preservado.
- Task 5.8 (teclado e leitores de tela) continua pendente, não iniciada e não autorizada.
- Plano de Ação 2.1 atualizado e aprovado; implementação da arquitetura concluída.
- **Camada semântica de cores** publicada em `5c73789` — 9 papéis definidos em `global.css` sem mudança visual intencional.
- **Editorial Cream surfaces publicadas** em `39970e2` — 7 tokens de superfícies e bordas do light mode alterados (canvas, card, elevated, border, border-soft, surface-header, surface-ad); dark mode preservado; consumidores de header e anúncio ainda não migrados.
- **Neutros de texto publicados** em `5a41d88` — secondary `#50504c`, muted `#696760`; contraste mínimo ≥ 4,5:1 contra as cinco superfícies semânticas; pendência anterior de muted abaixo de 4,5:1 resolvida neste conjunto de superfícies. Não constitui certificação WCAG global.
- **Restante do estágio 2:** link, interactive, focus, estados ativos — ainda não iniciado; consumidores editoriais e comerciais futuros.
- **Bloco 5:** ainda em andamento (Task 5.8 pendente).
- **Bloco 6:** ainda bloqueado.

**Resumo da auditoria da Task 5.6:** 4 categorias localizadas (IA & Automação, Tráfego & Operação, Social & Conteúdo, Cursos & Treinamentos), 0 itens públicos, 1 placeholder em draft, nenhuma rota de categoria ou item. A landing já expõe toda a estrutura atualmente disponível. Submenu considerado inelegível neste ciclo.

---

### 🔧 Bloco 3 — Arquitetura editorial e taxonomia

#### Registros centrais
- [x] **`editorialHubs.ts`** — 17 hubs (3 active, 14 planned)
- [x] **`editorialTopics.ts`** — 6 tópicos (todos active)
- [x] **`editorialFormats.ts`** — 7 formatos (2 active, 5 planned)
- [x] **`editorialAuthors.ts`** — 1 autor institucional (`radar-digital`, Organization)
- [x] **Todos os registros** — `as const satisfies`, tipos derivados, sem lista manual de IDs

#### Schema (collection `artigos`)
- [x] **`contentType`** — Validado contra registro central (`editorialFormats.ts`), default `article`, aceita planned
- [x] **`primaryHub`** — Opcional em drafts, obrigatório em publicados
- [x] **`relatedHubs`** — Opcional, 1–3 IDs, ≠ primaryHub, exige primaryHub
- [x] **`topics`** — Opcional em drafts, obrigatório em publicados, 1–5 IDs
- [x] **`translationKey`** — Opcional, lowercase kebab-case, 3–64 chars
- [x] **`authorId`** — Opcional em drafts, obrigatório em publicados, validado contra registro central
- [x] **`sources`** — Opcional (publicados e drafts), 1–20 itens, title/publisher/url obrigatórios, HTTP/HTTPS, sem duplicatas, sem efeito público
- [x] **Validação `.superRefine()`** — Unifica todas as regras cross-field
- [x] **Validação global `validatePublishedTranslationGroups()`** — Duplicatas e grupos órfãos
- [x] **Validação runtime:** `npm run build` rejeita dados inválidos com mensagem clara

#### Distribuição editorial (pilotos ativos)
- [x] **Distribuição principal** — Marketing Digital PT/ES seleciona por `primaryHub: digital-marketing` (`matchesPublishedPrimaryHub`)
- [x] **Distribuição secundária** — Inteligência Artificial PT/ES seleciona por `primaryHub` ou `relatedHubs` com hub `artificial-intelligence` (`matchesPublishedEditorialHub`)
- [x] **Par de prompts** — `primaryHub: ai-automation` + `relatedHubs: [artificial-intelligence]`; aparece em IA por distribuição secundária; URL canônica única
- [x] **`categoria` não governa mais** as listagens de Marketing Digital e Inteligência Artificial (campo legado preservado)

#### SEO
- [x] **JSON-LD Article** — Autor como `Organization` (não mais `Person`), com `url`
- [x] **JSON-LD BreadcrumbList** — Em todas as páginas
- [x] **JSON-LD WebSite** — Nas homes
- [x] **Campos legados preservados** — `slugEs`, `author` (string), `guideTags`

### Migrações concluídas
- [x] **`primaryHub`** — 8 publicações migradas (4 pares PT/ES)
- [x] **`topics`** — 8 publicações migradas (equivalência PT/ES)
- [x] **`translationKey`** — 8 publicações migradas (4 chaves)
- [x] **`authorId`** — 8 publicações migradas (`radar-digital`)
- [x] **`sources`** — 8 publicações migradas (4 pares PT/ES)

### Correções editoriais aplicadas
- [x] **Email Marketing** — ROI corrigido para dados do State of Email 2025 (Litmus), open rate atualizado para 35,63% (Mailchimp), CTR para 2,62%, remoção de "4 bilhões" e "0,8s". Links inline para Litmus, Mailchimp, Apple.
- [x] **Múltiplas Contas** — Remoção de "80%" e "quase metade" (pesquisa informal não verificável). Substituição por redação qualitativa.

### Documentação
- [x] **`docs/CONTENT_MODEL.md`** — Modelo editorial completo (hubs, tópicos, formatos, schemas, validação)
- [x] **`docs/DECISIONS.md`** — Decisões arquiteturais documentadas
- [x] **`ROADMAP.md`** — Status do Bloco 3 detalhado

### Pendências conhecidas e formalmente adiadas
- [x] **Formatos `planned` sem efeito público** — Vocabulário aprovado, sem rota/página/HTML
- [x] **`sources` sem exibição pública** — Metadata interna, sem `citation` no JSON-LD
- [x] **Revisor (`reviewerId`)** — Adiado ao Bloco 10 (não há fluxo real de revisão definido)
- [x] **Disclosure editorial/comercial** — Adiado ao Bloco 10 (política editorial/comercial não formalizada)
- [x] **Distribuição por tópicos e formatos** — Não implementada; pilotos limitados a `primaryHub` e `relatedHubs`
- [x] **Template genérico de hubs e páginas novas** — Não implementado; pilotos usam listagens existentes

## 🟡 Pendências imediatas (Bloco 3)

### Pendências do modelo editorial
- [ ] **Formatos ativos sem efeito público** — `guide` e `article` não diferenciam rota, template ou listagem
- [ ] **Migração dos drafts (17)** — Preencher metadados editoriais
- [ ] **Distribuição por tópicos** — Ainda não implementada
- [ ] **Distribuição por formato** — Ainda não implementada

### Conteúdo & Rotas (geral)
- [ ] **Nova rota canônica** `/publicacoes/<slug>/` com redirect
- [ ] **Páginas públicas de hubs** — Templates para hubs ativos
- [ ] **Conectar hubs ao navbar**
- [ ] **Conectar hubs ao sitemap**
- [ ] **Breadcrumbs baseados em `primaryHub`**
- [ ] **Remover `slugEs`** — Após migração total para `translationKey`
- [ ] **Publicar mais artigos** — 14 stubs restantes

### Setup técnico
- [ ] **Páginas legais** — Privacidade, Termos, Contato
- [ ] **Newsletter funcional**
- [ ] **robots.txt**
- [ ] **RSS feed**
- [ ] **Pagefind** — Busca interna
- [ ] **Schema Article com image**

### Radar Market
- [ ] **Produtos reais** — Publicar itens verificados

### Infraestrutura
- [ ] **Domínio próprio** — Conectar radardigital.ai
- [ ] **Google Search Console + Analytics**
- [ ] **Preparar novos idiomas** — EN, VI, ZH-CN
- [ ] **Imagens otimizadas** — WebP/AVIF

### Pré-lançamento
- [ ] **Auditoria final** — SEO, performance, acessibilidade, conteúdo
- [ ] **Conectar domínio** — Só então tornar público

## 📌 Decisões Tomadas

| Decisão | Opção | Status |
|---------|-------|--------|
| Nome | **Radar Digital** | ✅ |
| Stack | Astro + Tailwind + TypeScript | ✅ |
| Domínio | radardigital.ai | Definido (não conectado) |
| Hospedagem | Vercel | Preview ativo |
| Idiomas ativos | PT (raiz) + ES (`/es/`) | ✅ |
| Idiomas futuros | EN, VI, ZH-CN | Desativados (schema pronto) |
| Quality gate | `npm run build` valida dados da collection; `npm run check` valida TypeScript | ✅ |
| `contentType` | Nome técnico preservado por compatibilidade; vocabulário centralizado em `editorialFormats.ts` | ✅ |
| `primaryHub` | Obrigatório p/ publicados, opcional em drafts | ✅ |
| `relatedHubs` | Opcional, 1–3 IDs, validado runtime | ✅ |
| `topics` | Obrigatório p/ publicados, validado runtime | ✅ |
| `translationKey` | Opcional, kebab-case, associado via helper global | ✅ |
| `authorId` | Obrigatório p/ publicados, Organization no JSON-LD | ✅ |
| `sources` | Opcional, 1–20 itens, title/publisher/url obrigatórios, sem efeito público | ✅ |
| `sources` notes | Metadata interna, sem exibição pública, sem `citation` JSON-LD | ✅ |
| Autores futuros | Registro central suporta Person | Estrutura pronta |
| Rotas de hubs | Planas (não hierárquicas) | Aprovado, não implementado |
| Publicações vs comerciais | `artigos` como collection central editorial; Bônus, Ferramentas, Radar Market como collections separadas | ✅ |

---

> **Task 7.0 concluída:** especificação V4 congelada sobre o baseline auditado `aad1c0c`; nenhuma alteração visual ou funcional foi implementada.
> **Task 7.1 concluída:** camada canônica V4, aliases de compatibilidade, primitives de layout e integração Tailwind implementados; header e homepage permanecem estruturalmente inalterados.
> **Task 7.2 concluída:** Inter/Source Serif 4 locais e licenciadas, repertório PT/ES validado, 161.880 bytes potenciais e somente 67.576 bytes preloaded no estado atual; nenhuma reestruturação de header ou homepage foi realizada.
> **Task 7.3 concluída:** SignalBar PT/ES integrada ao layout, sem alegação realtime, com destinos públicos existentes, comportamento responsivo e controle de movimento; nenhuma rota ou entrada de sitemap foi criada.
> **Task 7.4 concluída:** `Masthead` e `BrandMark` integrados ao layout compartilhado, alturas 78/70/64px e bloco sticky desktop de 126px validados; Source Serif 4 passou a ser preloaded acima da dobra, elevando o orçamento crítico de fontes para 161.880 bytes; nenhuma rota, conteúdo ou módulo da homepage foi alterado.
> **Task 7.5 concluída:** navegação desktop V4 integrada ao contrato de `siteNavigation.ts`, com disclosures exclusivos, teclado, Escape, clique fora, estados PT/ES e light/dark validados em 1024/1280/1440px; nenhuma rota, conteúdo, configuração, dependência ou navegação mobile foi alterada.
> **Task 7.6 concluída:** navegação mobile V4 integrada ao contrato existente, com diálogo modal, foco contido e reversível, accordions acessíveis, altura dinâmica e utilidades PT/ES validadas; nenhuma rota, conteúdo, configuração ou dependência foi alterada.
> **Task 7.7 concluída:** reportagem principal compartilhada em PT/ES, seleção determinística sem conteúdo futuro, uma H1 por home, fallback 0/1 e composição 320–1440px validados; nenhuma rota, schema, conteúdo ou dependência foi alterada.
> **Task 7.8 concluída:** duas chamadas secundárias compartilhadas em PT/ES, deduplicadas da principal, com pesos feature/compact e degradação estável para 0/1/2+; guia mantido em seu módulo próprio e nenhuma rota, schema, conteúdo ou dependência foi alterada.
> **Task 7.9 concluída:** painel Radar agora compartilhado em PT/ES, deduplicado da dobra e baseado somente em datas editoriais verificáveis; estado vazio real, ausência de movimento automático e composição 320–1440px validados sem alterar conteúdo ou rotas.
> **Task 7.10 concluída:** TopicRail compartilhado em PT/ES com os seis topics ativos e cobertos, ordem do registro, lista semântica e rolagem manual acessível; ausência de rotas foi tratada como texto, sem anchors ou destinos fabricados.
> **Task 7.11 concluída:** Seleção da redação compartilhada em PT/ES com regra `remaining-recency` explícita, deduplicação dos módulos V4 anteriores e um checklist real por locale; cardinalidade zero oculta o módulo e nenhum schema, conteúdo ou destino foi fabricado.
> **Task 7.12 concluída:** Últimas publicações compartilhada em PT/ES com ordem imutável, limite de seis e deduplicação integral dos módulos V4 anteriores; o estado real atual é vazio e localizado, sem repetir a dobra ou fabricar arquivo, recomendação e paginação.
> **Task 7.13 concluída sem UI:** a auditoria não encontrou fonte de audiência, janela temporal, regra de desempate ou adapter verificáveis; “Mais lidas” permanece ausente por contrato, e Analytics continua como dependência pendente do Bloco 16/decisão própria.
> **Task 7.14 concluída:** Editorias compartilhadas em PT/ES cruzam status ativo, rota real e cobertura publicada deduplicada; o módulo expõe somente Inteligência Artificial e Marketing Digital, sem criar URLs, ativar hubs planejados ou preencher Monetização sem base factual.
> **Task 7.19 concluída:** `MarketShowcase` substitui a seção inline legada por vitrine V4 com disclosure; 4 categorias PT/ES na ordem aprovada, placeholder draft oculto, links localizados para `/market` e `/es/market`.
> **Task 7.21 concluída e publicada:** `SiteFooter.astro` com rotas reais PT/ES, disclosure e fix de inert (`59c5a10`). Push autorizado.
> **Próxima task técnica recomendada:** **7.22 — Consolidação ES**, ainda não iniciada.
> **Prioridade dos blocos:** Bloco 7 é a prioridade atual; Bloco 6 será retomado depois da estabilização da home.
> **Bloco 5 (Navegação e mega menus):** ✅ concluído — Tasks 5.1 a 5.7 implementadas, 5.8 encerrada como auditoria de baseline (sem correção de código).
> **Regressão visual do seletor PT/ES:** encerrada (commit `ef99fb9` — `fix: detach locale dropdown from nav overflow`).
> **Editorial Cream surfaces:** publicadas em `39970e2` — 7 tokens de superfícies e bordas do light mode; primeiro estágio parcialmente aplicado.
> **Neutros de texto:** secondary `#50504c` e muted `#696760` publicados em `5a41d88`; estágio 2 parcialmente iniciado; papéis funcionais cromáticos e estágios 3 a 5 futuros.
