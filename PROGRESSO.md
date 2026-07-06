# 🚧 Progresso — Radar Digital (Marketing Digital, IA & Monetização)

> **Stack:** Astro + Headless CMS (a definir)  
> **Hospedagem:** Vercel / Cloudflare Pages  
> **Última atualização:** 07/07/2026

---

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

---

## 🟡 Em andamento

- [ ] **Ajustar light mode** (ainda claro demais) — paleta creme quente
- [ ] **Primeiro artigo de verdade**
- [ ] **Páginas de categoria** (marketing-digital, inteligencia-artificial, monetizacao)

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
