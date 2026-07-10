# 🚧 Progresso — Radar Digital (Marketing Digital, IA & Monetização)

> **Stack:** Astro 4 + Tailwind + TypeScript
> **Hospedagem:** Vercel (https://radar-digital-lemon.vercel.app)
> **Domínio:** radardigital.ai (não conectado — preview Vercel apenas)
> **Última atualização:** 10/07/2026 (sessão 9 — finalização dos quality gates)
> **Idiomas:** PT (raiz, default) + ES (`/es/`) ✅
> **Build:** 41 páginas | **Sitemap:** 28 URLs

## 🟢 Concluído

### Setup & Fundação
- [x] **Pesquisa de stack** (03/07) — Comparação: Astro, WordPress, Next.js, Ghost, Hugo
- [x] **Definição da stack** → **Astro** escolhido (melhor SEO, performance e custo)
- [x] **Pasta do projeto criada** + PROGRESSO.md
- [x] **Nome definido:** **Radar Digital** 🎯 (07/07)
- [x] **Setup Astro + Tailwind** — Projeto criado, build funcional (07/07)
- [x] **Repositório GitHub** — `github.com/Burntroll/radar-digital`

### Design & UI
- [x] **Sistema de Tema Dark/Light** — CSS variables + toggle + localStorage
- [x] **Light mode ajustado** — Paleta creme quente (`#f0ece4`), refinamento fino
- [x] **Acessibilidade do nav** — text-base (16px), logo text-xl (20px), gap-6
- [x] **Página 404** — Three.js com radar estilizado + noindex
- [x] **Nav renomeado** — "Parceiros" → "Ferramentas" (PT) / "Herramientas" (ES)
- [x] **Dropdown "Categorias" removido** do menu Ferramentas
- [x] **Locale switcher hover** — Item ativo apaga ao passar mouse no dropdown
- [x] **Badge "Tendências" removido** do hero da home

### 🏠 Home Editorial
- [x] **Filtros explícitos** — Home usa `contentType: "article"` em vez de `!== 'guide'`
- [x] **AdSlot reutilizável** — Componente com variantes horizontal, in-feed, sidebar
- [x] **Abertura editorial** — Masthead compacto + subtítulo
- [x] **Leia primeiro** — Artigo principal + 2 secundários + guia condicional
- [x] **Navegação por intenção** — 6 cards: tráfego, IA, monetizar, guias, ferramentas, bônus
- [x] **Últimas publicações** — Lista editorial + AdSlot in-feed + Recomendados
- [x] **Guias práticos** — Seção condicional
- [x] **Ferramentas na prática** — Categorias reais (Trackers, Antidetect) como chips
- [x] **Bônus e códigos promocionais** — 3 bônus verificados
- [x] **Radar Market** — Bloco na home
- [x] **Espaçamento padronizado** — py-14, cards limpos, newsletter sem glow
- [x] **Fechamento duplicado removido** — Seção "CTA FINAL" com copyright redundante foi retirada das homes PT e ES

### Conteúdo & Collections
- [x] **Content Collections configuradas** — Schema Zod para todas as coleções
- [x] **Sistema draft: true/false** — Controle granular de publicação
- [x] **18 stubs de artigos** — Markdown com frontmatter completo
- [x] **6 parceiros reais publicados** — Binom/Keitaro/BeMob + Dolphin Anty/AdsPower/Multilogin
- [x] **3 artigos publicados em PT** — Email marketing, Gerenciar múltiplas contas, Prompts que funcionam
- [x] **3 artigos traduzidos para ES** — Mesmos artigos em espanhol com `locale: 'es'`
- [x] **2 guias publicados** — Checklist de segurança (PT + ES)
- [x] **Home dinâmica** — Artigos reais do banco, filtrados por locale
- [x] **Datas normalizadas** — Datas corrigidas para passado (06-08/07/2026)
- [x] **H1 duplicados removidos** — Título `#` no corpo removido de todos os 23 artigos (6 publicados + 17 drafts)

### i18n PT/ES
- [x] **Estrutura bilíngue completa** — PT na raiz, ES em `/es/...`. 41 páginas geradas
- [x] **Locale switcher** — Dropdown com bandeiras PT/ES, hreflang automático
- [x] **Dicionário i18n** — ~100+ chaves PT/ES
- [x] **Schema com locale** — Campo `locale` em todas collections
- [x] **Auditoria técnica i18n** — lang/hreflang/canonical/x-default/og:locale validados
- [x] **Rotas PT/ES filtradas por locale** — Conteúdo não vaza entre idiomas
- [x] **Categorias de Ferramentas em ES** — Trackers e Antidetect Browsers com descrições em espanhol + validação (build quebra se `descriptionEs` faltar em categoria publicada)

### SEO & Performance
- [x] **Sitemap.xml** — 28 URLs, sem drafts, sem 404
- [x] **Schema.org JSON-LD** — `WebSite` (somente nas homes), `Article` (artigos), `BreadcrumbList` (páginas internas)
- [x] **Open Graph** — `og:title`, `og:description`, `og:type` (website/article), `og:url`, `og:site_name`, `og:locale`
- [x] **Twitter Cards** — `twitter:card` (summary / summary_large_image), `twitter:title`, `twitter:description`
- [x] **Canonical** — Em todas as páginas
- [x] **404 sem hreflang ES falso**
- [x] **`astro check` como quality gate** — 0 erros, 0 warnings, 5 hints
- [x] **Contadores de categoria corrigidos** — "Publicados" (só draft: false), removido "Planejados" e tag "Em breve"

### Bônus & Códigos Promocionais
- [x] **Seção Bônus** — Página /bonus e /es/bonos com hero, filtros, grid de cards
- [x] **Tipagem client-side** — Scripts de filtro com tipos corretos (HTMLButtonElement, HTMLElement, HTMLInputElement)
- [x] **9 cards publicados** (PT + ES) com status, verifiedAt, sourceUrl

### Parceiros / Ferramentas
- [x] **6 parceiros em PT + ES** — Trackers + Antidetect Browsers
- [x] **Nav dropdown com categorias**

### Guias
- [x] **Seção Guias** — Página /guias e /es/guias com busca + filtros
- [x] **2 guias publicados** (draft: false) — Checklist de segurança multi-conta (PT + ES)

### 🛒 Radar Market
- [x] **Collection `marketItems`** — Schema completo
- [x] **Collection `marketCategorias`** — 4 categorias
- [x] **Página /market** + /es/market — Hero + grid + preview + aviso de curadoria
- [x] **Bloco na home**

### Infraestrutura
- [x] **Deploy Vercel** — https://radar-digital-lemon.vercel.app
- [x] **vercel.json** — Config para Astro
- [x] **CSS bundling corrigido** — Import via Astro
- [x] **`.astro/` removido do rastreamento Git** — settings.json e types.d.ts não são mais versionados
- [x] **Push autorizado** — Branch master sincronizada com origin/master (7 commits enviados)

## 🟡 Próximas pendências

### Conteúdo
- [ ] **14 stubs restantes** — Publicar mais artigos reais
- [ ] **Guias de verdade** — Conteúdo original nos 2 guias publicados (hoje são templates)
- [ ] **ES dos próximos conteúdos** — Manter paridade PT/ES
- [ ] **Revisão editorial e fontes** — Auditoria de citações, dados e referências

### Setup técnico
- [ ] **GitHub Actions** — CI para check + build automatizado
- [ ] **Páginas legais** — Privacidade, Termos, Contato
- [ ] **Newsletter funcional** — Formulário hoje é placeholder com alert
- [ ] **robots.txt** — Somente próximo ao lançamento público
- [ ] **RSS feed** — Planejado
- [ ] **Pagefind** — Busca interna (planejado)
- [ ] **Schema Article com image** — Campo image no schema, aguardando assets visuais

### Radar Market
- [ ] **Produtos reais** — Publicar itens verificados com parceiros

### Infraestrutura
- [ ] **Domínio próprio** — Conectar radardigital.ai à Vercel
- [ ] **Google Search Console + Analytics**
- [ ] **Preparar arquitetura para novos idiomas** — EN, VI, ZH-CN desativados
- [ ] **Imagens otimizadas** — WebP/AVIF

### Pré-lançamento
- [ ] **Auditoria final** — SEO, performance, acessibilidade, conteúdo
- [ ] **Conectar domínio** — Só então tornar público

## 📌 Decisões Tomadas

| Decisão | Opção | Status |
|---------|-------|--------|
| Nome | **Radar Digital** ✅ | Definido |
| Stack | Astro + Tailwind + TypeScript ✅ | Definido |
| Domínio | radardigital.ai ✅ | Definido (não conectado) |
| Hospedagem | Vercel ✅ | Preview ativo |
| Idiomas | PT (raiz) + ES (`/es/`) | ✅ Implementado |
| Idiomas futuros | EN, VI, ZH-CN | Desativados (prontos no schema) |
| Nav "Parceiros" | "Ferramentas" (PT) / "Herramientas" (ES) | ✅ |
| Content type | `article` \| `guide` | ✅ |
| Quality gate | `astro check` + `astro build` | ✅ |
| Busca | Pagefind | Planejado |
| Comentários | Giscus (GitHub Discussions) | Planejado |
| Analytics | Plausible ou Umami | Planejado |

---

> ⚡ *Próxima sessão: produção de conteúdo e preparação para lançamento público.*
