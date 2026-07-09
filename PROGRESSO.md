# 🚧 Progresso — Radar Digital (Marketing Digital, IA & Monetização)

> **Stack:** Astro + Tailwind
> **Hospedagem:** Vercel (https://radar-digital-lemon.vercel.app)
> **Domínio:** radardigital.ai
> **Última atualização:** 09/07/2026 (sessão 4 — redesign completo da home)
> **Idiomas:** PT (default) + ES ✅

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
- [x] **Light mode ajustado** — Paleta creme quente (`#f0ece4`)
- [x] **Acessibilidade do nav** — text-base (16px), logo text-xl (20px), gap-6
- [x] **Página 404** — Three.js com radar estilizado + noindex
- [x] **Nav renomeado** — "Parceiros" → "Ferramentas" (PT) / "Herramientas" (ES)
- [x] **Dropdown "Categorias" removido** do menu Ferramentas
- [x] **Locale switcher hover** — Item ativo apaga ao passar mouse no dropdown
- [x] **Badge "Tendências" removido** do hero da home

### 🏠 Home Editorial (redesign completo — sessão 4)
- [x] **Filtros explícitos** — Home usa `contentType: "article"` em vez de `!== 'guide'`
- [x] **AdSlot reutilizável** — Componente com variantes horizontal, in-feed, sidebar
- [x] **Abertura editorial** — Masthead compacto "Radar Digital" + subtítulo
- [x] **Leia primeiro** — Artigo principal (2/3) + 2 secundários (1/3) + guia condicional
- [x] **Navegação por intenção** — 6 cards: tráfego, IA, monetizar, guias, ferramentas, bônus
- [x] **Últimas publicações** — Lista editorial + AdSlot in-feed + Recomendados
- [x] **Guias práticos** — Seção condicional (CTA para /guias/ quando sem guias publicados)
- [x] **Ferramentas na prática** — Categorias reais (Trackers, Antidetect) como chips
- [x] **Bônus e códigos promocionais** — 3 bônus verificados (RedTrack, AdHeart, Anstrex)
- [x] **Radar Market** — Bloco na home com 4 categorias do Market
- [x] **Polimento visual** — Espaçamento padronizado (py-14), cards limpos (border em vez de glass-card), newsletter sem glow
- [x] **Editorias do Radar removido** — Redundante com bloco de intenção

### Conteúdo & Collections
- [x] **Content Collections configuradas** — Schema Zod para todas as coleções
- [x] **18 stubs de artigos** — Markdown com frontmatter completo
- [x] **Sistema draft: true** — Artigos não publicam até virar a chave
- [x] **6 parceiros reais publicados** — Binom/Keitaro/BeMob (Trackers) + Dolphin Anty/AdsPower/Multilogin (Antidetect)
- [x] **3 artigos publicados em PT** — Email marketing, Gerenciar múltiplas contas, Prompts que funcionam
- [x] **3 artigos traduzidos para ES** — Mesmos artigos em espanhol com locale: 'es'
- [x] **Home dinâmica** — Artigos reais do banco, filtrados por locale
- [x] **contentType explícito** — Todos os 24 artigos têm contentType: "article" | "guide"
- [x] **Datas normalizadas** — Datas futuras corrigidas para passado (06-08/07/2026)
- [x] **updatedAt** — Campo opcional + aviso "Atualizado em DD/MM/AAAA às HH:MM"

### i18n PT/ES
- [x] **Estrutura bilíngue completa** — PT na raiz, ES em `/es/...`. 27 páginas geradas
- [x] **Locale switcher** — Dropdown com bandeiras PT/ES, hreflang automático
- [x] **Dicionário i18n** — ~100+ chaves PT/ES
- [x] **Schema com locale** — Campo `locale` em todas collections
- [x] **Auditoria técnica i18n** — lang/hreflang/canonical/x-default/og:locale validados
- [x] **Rotas PT/ES filtradas por locale** — Conteúdo não vaza entre idiomas

### SEO & Performance
- [x] **Sitemap.xml** — 27 URLs, sem drafts, sem 404
- [x] **Schema.org JSON-LD** — WebSite + BreadcrumbList + Article
- [x] **Canonical** — Em todas as páginas
- [x] **404 sem hreflang ES falso**
- [x] **Nome do autor removido** — Projeto sem identificação pessoal

### Bônus & Códigos Promocionais
- [x] **Seção Bônus** — Página /bonus e /es/bonus com hero, filtros, grid de cards
- [x] **9 cards publicados** (PT + ES) com status, verifiedAt, sourceUrl
- [x] **Auditoria de bônus** — Apenas verified aparecem na home; sourceUrl externa verificada

### Parceiros / Ferramentas
- [x] **6 parceiros em PT + ES** — Trackers + Antidetect Browsers
- [x] **Nav dropdown com categorias**

### Guias
- [x] **Seção Guias** — Página /guias e /es/guias com busca + 24 filtros
- [x] **2 guias de teste draft:true** — Sem rota pública, sem sitemap

### 🛒 Radar Market (nova seção — sessão 4)
- [x] **Collection `marketItems`** — Schema completo (title, price, category, status, etc.)
- [x] **Collection `marketCategorias`** — 4 categorias: IA & Automação, Tráfego & Operação, Social & Conteúdo, Cursos & Treinamentos
- [x] **Página /market** — Hero editorial + grid de categorias + preview de itens + aviso de curadoria
- [x] **Página /es/market** — Mesma estrutura, traduzida
- [x] **Nav link** — "Radar Market" no menu principal PT/ES
- [x] **Bloco na home** — Radar Market antes da newsletter

### Infraestrutura
- [x] **Deploy Vercel** — https://radar-digital-lemon.vercel.app
- [x] **vercel.json** — Config para Astro
- [x] **CSS bundling corrigido** — Import via Astro em vez de link tag

## 🟡 Em andamento

- [ ] **Light mode** — refinamento fino (contraste, paleta)
- [ ] **Mais parceiros reais** — Popular categorias vazias (Spy, Criativos, Proxies, etc.)
- [ ] **Próximo artigo real** — 14 stubs restantes
- [ ] **Publicar guias de verdade** — 2 guias de teste em draft
- [ ] **Produtos do Radar Market** — Publicar itens reais quando houver dados

## 🔴 Próximos Passos

1. **Conteúdo**
   - Quarto artigo real (14 stubs restantes)
   - Publicar guias (draft → false)
   - Versão ES dos próximos conteúdos

2. **Setup técnico**
   - RSS feed
   - Pagefind (busca interna)
   - Schema.org Article aprimorado (image, author real)

3. **Infraestrutura**
   - Domínio próprio radardigital.ai na Vercel
   - Google Search Console + Analytics
   - Imagens otimizadas (WebP/AVIF)

4. **Radar Market**
   - Publicar primeiros produtos reais com parceiros verificados

## 📌 Decisões Tomadas

| Decisão | Opção | Status |
|---------|-------|--------|
| Nome | **Radar Digital** ✅ | Definido |
| Stack | Astro ✅ | Definido |
| Domínio | radardigital.ai ✅ | Definido |
| Hospedagem | Vercel ✅ | Deploy feito |
| Idiomas | PT (default) + ES | ✅ Implementado |
| Nav "Parceiros" | "Ferramentas" (PT) / "Herramientas" (ES) | ✅ |
| Tipo de conteúdo | contentType: "article" \| "guide" | ✅ |
| Home editorial | 7 seções (sem Editorias — redundante) | ✅ Redesign completo |
| CMS | Decap CMS (Git-based) ou Strapi | A definir |
| Busca | Pagefind | Planejado |
| Comentários | Giscus (GitHub Discussions) | Planejado |
| Analytics | Plausible ou Umami | Planejado |

---

> ⚡ *Próxima sessão: continuar produção de conteúdo e avançar nos próximos passos.*
