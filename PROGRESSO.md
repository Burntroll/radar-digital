# 🚧 Progresso — Radar Digital (Marketing Digital, IA & Monetização)

# 🚧 Progresso — Radar Digital (Marketing Digital, IA & Monetização)

> **Stack:** Astro + Headless CMS (a definir)  
> **Hospedagem:** Vercel / Cloudflare Pages  
> **Última atualização:** 08/07/2026  
> **Idiomas:** PT (default) + ES ✅

## 🟢 Concluído

- [x] **Pesquisa de stack** (03/07) — Comparação: Astro, WordPress, Next.js, Ghost, Hugo
- [x] **Definição da stack** → **Astro** escolhido (melhor SEO, performance e custo)
- [x] **Relatório salvo** em `C:\Users\Doma\pesquisa_stack_portal\pesquisa_stack_portal_2026.md`
- [x] **Análise do plano de ação** (`plano_acao_portal_seo.pdf`) lido e compreendido
- [x] **Pesquisa de mercado** adicional baixada
- [x] **Pasta do projeto criada:** `C:\Users\Doma\portal-marketing-digital\`
- [x] **Sistema de progresso:** PROGRESSO.md criado
- [x] **Nome definido:** **Radar Digital** 🎯 (07/07)
- [x] **Setup Astro + Tailwind** — Projeto criado, build funcional (07/07)
- [x] **Design da Home** — Hero com gradiente, glass cards, placeholder artigos, newsletter (07/07)
- [x] **Sistema de Tema Dark/Light** — CSS variables + toggle + localStorage (07/07)
- [x] **Repositório GitHub criado** — `github.com/Burntroll/radar-digital` (07/07)
- [x] **Página 404** — Three.js com radar estilizado (anéis, scan line, blips, estrelas) + deriva espacial (07/07)
- [x] **Light mode ajustado** — Paleta creme quente (`#f0ece4`) para conforto visual (07/07)
- [x] **Páginas de categoria criadas** — `/marketing-digital`, `/inteligencia-artificial`, `/monetizacao` (08/07)
- [x] **Cada categoria com identidade visual** — Cyan (Marketing), Roxo (IA), Âmbar (Monetização) (08/07)
- [x] **6 cards de artigos planejados** por categoria com subtema, readTime, excerpt (08/07)
- [x] **Content Collections configuradas** — `src/content/config.ts` com schema Zod (08/07)
- [x] **18 stubs de artigos criados** — Markdown com frontmatter completo + esqueleto estruturado (H2/bullets) por categoria (08/07)
- [x] **Sistema draft: true** — Artigos não publicam até você virar a chave (08/07)
- [x] **Rota dinâmica `/artigos/[...slug]`** — Renderiza artigo individual com tipografia dedicada (08/07)
- [x] **Páginas de categoria refatoradas** — Agora puxam do `getCollection()` (não mais hardcoded) (08/07)
- [x] **Build validado** — `astro build` passa; rota dinâmica gera página só pra `draft: false` (08/07)
- [x] **Seção Parceiros & Ferramentas** — 2 collections (parceiros + parceiroCategorias) + 3 páginas (`/parceiros`, `/parceiros/[slug]`, cards filtrados) (08/07)
- [x] **8 categorias planejadas** — Trackers, Antidetect, Spy, Criativos, Gateways, Proxies, SMS, Cursos (08/07)
- [x] **6 parceiros reais publicados** — Binom/Keitaro/BeMob (Trackers) + Dolphin Anty/AdsPower/Multilogin (Antidetect) (08/07)
- [x] **Header expandido** — Link "Parceiros" no nav, card extra na home (08/07)
- [x] **Cards de parceiros com header 180px** — Logo quadrada, badge Destaque, ordem alfabética (08/07)
- [x] **Acessibilidade do nav** — Texto text-base (16px), logo text-xl (20px), gap-6 (24px) (08/07)
- [x] **i18n PT/ES completo** — Estrutura bilíngue: PT na raiz (/, /parceiros, /artigos), ES em (/es/...). 19 páginas geradas. (08/07)
- [x] **Locale switcher no nav** — Dropdown com bandeirinha e bandeiras PT/ES, hreflang automático, og:locale dinâmico (08/07)
- [x] **Dicionário i18n** — `src/i18n/ui.ts` com ~50 chaves PT/ES (nav, footer, home, categorias, parceiros) (08/07)
- [x] **Schema com locale** — Campo `locale` adicionado em todas collections + `slugEs` opcional pra slugs traduzidos (08/07)
- [x] **Auditoria técnica i18n** — Validação completa: 19 páginas (10 PT + 9 ES), lang/hreflang/canonical/x-default/og:locale todos corretos, locale switcher leva pra página equivalente, sem vazamento PT↔ES, filtro de collections funcionando, padrão de URL conforme combinado (08/07)
- [x] **Bugs i18n corrigidos** — Home PT tinha "señal" e placeholder "tu@email.com" vazado; canonical adicionado em todas as páginas (08/07)
- [x] **Auditoria técnica i18n** — Validação completa: 19 páginas (10 PT + 9 ES), lang/hreflang/canonical/x-default/og:locale todos corretos, locale switcher leva pra página equivalente, sem vazamento PT↔ES, filtro de collections funcionando, padrão de URL conforme combinado (08/07)
- [x] **Bugs i18n corrigidos** — Home PT tinha "señal" e placeholder "tu@email.com" vazado; canonical adicionado em todas as páginas (08/07)

---

## 🟡 Em andamento

- [ ] **Light mode** — refinamento fino (contraste, paleta)
- [ ] **Mais parceiros reais** — Popular 2-3 das outras 6 categorias (Spy, Criativos, Proxies, etc.)
- [ ] **Tradução de conteúdo** — Artigos .md duplicados em /es/ com locale: 'es' e slugEs

---

## 🔴 Próximos Passos

1. **Conteúdo**
   - Segundo artigo real dos 16 stubs restantes
   - Traduzir artigos PT → ES conforme prioridade

2. **Setup técnico**
   - **Sitemap.xml** com suporte i18n (não existe ainda)
   - **Empty state ES** nas páginas de categoria vazias (mostrar "Em breve em espanhol" em vez de grid vazio)
   - **404 hreflang es** — remover hreflang es do /404 (não tem equivalente)
   - Adicionar `@astrojs/mdx` e `@astrojs/sitemap`
   - Schema.org JSON-LD (Article, BreadcrumbList)
   - RSS feed
   - Pagefind (busca interna)

3. **Infraestrutura**
   - Deploy Vercel + domínio
   - Google Search Console + Analytics (com suporte a múltiplos locales)

---

## 🔴 Próximos Passos

1. **Setup técnico**
   - Content Collections do Astro para artigos em Markdown
   - Adicionar `@astrojs/mdx` e `@astrojs/sitemap`
   - Schema.org JSON-LD (Article, BreadcrumbList)
   - RSS feed
   - Pagefind (busca interna)

2. **Conteúdo**
   - Primeiro artigo real (escolher entre os 18 planejados nas 3 categorias)

3. **Infraestrutura**
   - Deploy Vercel + domínio
   - Google Search Console + Analytics

---

## 🔴 Próximos Passos

1. **Decisões de identidade**
   - Tema visual (dark/light)
   - Referência de estilo (Linear, Vercel, Notion, ou próprio)

2. **Setup técnico**
   - Criar projeto Astro com estrutura de pastas
   - Configurar integrações: sitemap, mdx, tailwind
   - Layout base: header, footer, navegação
   - Sistema de artigos em Markdown com frontmatter
   - Schema.org Article (JSON-LD)
   - Sitemap.xml + RSS feed
   - Busca interna (Pagefind)
   - Imagens: WebP/AVIF automático

3. **Infraestrutura**
   - Repositório GitHub
   - Deploy automático (Vercel/Cloudflare)
   - Google Search Console + Analytics

---

## 📌 Decisões Tomadas

| Decisão | Opção | Status |
|---------|-------|--------|
| Nome | **Radar Digital** ✅ | Definido |
| Stack | Astro ✅ | Definido |
| Hospedagem | Vercel ou Cloudflare Pages | A definir |
| CMS | Decap CMS (Git-based) ou Strapi | A definir |
| Busca | Pagefind | Planejado |
| Comentários | Giscus (GitHub Discussions) | Planejado |
| Analytics | Plausible ou Umami | Planejado |
| Idiomas | PT (default) + ES | ✅ Implementado |

---

## 📂 Estrutura de Pastas (planejada)

```
portal-marketing-digital/
├── src/
│   ├── content/               ← Artigos em Markdown/MDX
│   │   ├── marketing-digital/
│   │   ├── inteligencia-artificial/
│   │   └── monetizacao/
│   ├── layouts/
│   │   └── ArticleLayout.astro
│   ├── components/
│   │   ├── Header.astro
│   │   ├── SEO.astro
│   │   └── RelatedPosts.astro
│   └── pages/
│       ├── index.astro
│       ├── blog/[...slug].astro
│       └── sitemap.xml.js
├── PROGRESSO.md               ← ← ← Este arquivo
└── astro.config.mjs
```

---

> ⚡ *Próxima sessão: definir nome e começar a codar.*
