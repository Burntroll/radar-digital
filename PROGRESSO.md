# 🚧 Progresso — Radar Digital (Marketing Digital, IA & Monetização)

> **Stack:** Astro + Tailwind  
> **Hospedagem:** Vercel (https://radar-digital-lemon.vercel.app)  
> **Domínio:** radardigital.ai  
> **Última atualização:** 08/07/2026  
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
- [x] **Design da Home** — Hero com gradiente, glass cards, newsletter, stats
- [x] **Sistema de Tema Dark/Light** — CSS variables + toggle + localStorage
- [x] **Light mode ajustado** — Paleta creme quente (`#f0ece4`)
- [x] **Acessibilidade do nav** — text-base (16px), logo text-xl (20px), gap-6
- [x] **Página 404** — Three.js com radar estilizado + noindex
- [x] **Páginas de categoria** — `/marketing-digital`, `/inteligencia-artificial`, `/monetizacao` com identidade visual (Cyan, Roxo, Âmbar)
- [x] **Nav renomeado** — "Parceiros" → "Ferramentas" (PT) / "Herramientas" (ES)
- [x] **Dropdown "Categorias" removido** do menu Ferramentas
- [x] **Locale switcher hover** — Item ativo apaga ao passar mouse no dropdown
- [x] **Badge "Tendências" removido** do hero da home

### Conteúdo & Collections
- [x] **Content Collections configuradas** — Schema Zod para artigos, parceiros, categorias de parceiros
- [x] **18 stubs de artigos** — Markdown com frontmatter completo (08/07)
- [x] **Sistema draft: true** — Artigos não publicam até virar a chave
- [x] **6 parceiros reais publicados** — Binom/Keitaro/BeMob (Trackers) + Dolphin Anty/AdsPower/Multilogin (Antidetect)
- [x] **2 artigos publicados** — "Email marketing ainda vale a pena?" + "Como gerenciar múltiplas contas de redes sociais"
- [x] **Home dinâmica** — "Últimos do Radar" puxa artigos reais do banco

### i18n PT/ES
- [x] **Estrutura bilíngue completa** — PT na raiz, ES em `/es/...`. 21 páginas geradas
- [x] **Locale switcher** — Dropdown com bandeiras PT/ES, hreflang automático
- [x] **Dicionário i18n** — ~50 chaves PT/ES (nav, footer, home, categorias, parceiros)
- [x] **Schema com locale** — Campo `locale` em todas collections + `slugEs` opcional
- [x] **Auditoria técnica i18n** — lang/hreflang/canonical/x-default/og:locale validados
- [x] **Empty state ES** — Categorias sem artigos mostram "Próximamente"

### SEO & Performance
- [x] **Sitemap.xml** — `@astrojs/sitemap` instalado, 20 URLs, sem drafts, sem 404
- [x] **Domínio** — `radardigital.ai` configurado no astro.config.mjs
- [x] **Schema.org JSON-LD** — Componente SEO.astro com WebSite + BreadcrumbList + Article
- [x] **BreadcrumbList** — JSON-LD em home, categorias, parceiros, artigos (PT + ES)
- [x] **Article JSON-LD** — Apenas em artigos publicados, com headline/description/datePublished/publisher
- [x] **Canonical** — Em todas as páginas com URL canônica
- [x] **404 sem hreflang ES falso** — Apenas hreflang pt-BR + noindex
- [x] **Nome do autor removido** — Projeto sem identificação pessoal

### Infraestrutura
- [x] **Deploy Vercel** — https://radar-digital-lemon.vercel.app
- [x] **vercel.json** — Config para Astro (framework, buildCommand, outputDirectory)
- [x] **CSS bundling corrigido** — Import via Astro em vez de link tag (resolve 404 no Vercel)

## 🟡 Em andamento

- [ ] **Light mode** — refinamento fino (contraste, paleta)
- [ ] **Mais parceiros reais** — Popular 2-3 das outras 6 categorias (Spy, Criativos, Proxies, etc.)
- [ ] **Tradução de conteúdo** — Artigos .md duplicados em /es/ com locale: 'es' e slugEs

## 🔴 Próximos Passos

1. **Conteúdo**
   - Terceiro artigo real (14 stubs restantes)
   - Traduzir artigos PT → ES conforme prioridade

2. **Setup técnico**
   - RSS feed
   - Pagefind (busca interna)
   - Schema.org Article aprimorado (image, author real)

3. **Infraestrutura**
   - Domínio próprio radardigital.ai na Vercel
   - Google Search Console + Analytics
   - Imagens otimizadas (WebP/AVIF)

## 📌 Decisões Tomadas

| Decisão | Opção | Status |
|---------|-------|--------|
| Nome | **Radar Digital** ✅ | Definido |
| Stack | Astro ✅ | Definido |
| Domínio | radardigital.ai ✅ | Definido |
| Hospedagem | Vercel ✅ | Deploy feito |
| Idiomas | PT (default) + ES | ✅ Implementado |
| Nav "Parceiros" | "Ferramentas" (PT) / "Herramientas" (ES) | ✅ |
| CMS | Decap CMS (Git-based) ou Strapi | A definir |
| Busca | Pagefind | Planejado |
| Comentários | Giscus (GitHub Discussions) | Planejado |
| Analytics | Plausible ou Umami | Planejado |

---

> ⚡ *Próxima sessão: continuar produção de conteúdo e avançar nos próximos passos.*
