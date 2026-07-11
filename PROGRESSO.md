# 🚧 Progresso — Radar Digital

> **Stack:** Astro 4 + Tailwind + TypeScript
> **Hospedagem:** Vercel (https://radar-digital-lemon.vercel.app)
> **Domínio:** radardigital.ai (não conectado — preview Vercel apenas)
> **Última atualização:** 12/07/2026 — checkpoint documental (sessão 11)
> **Commit validado:** `8dbec2b` — `feat: add primary hub to security checklists`
> **GitHub Actions:** Run #19 ✅ success — 19 runs, todas verdes
> **Idiomas:** PT (raiz, default) + ES (`/es/`) ✅
> **Build:** 41 páginas | **Sitemap:** 28 URLs

## 🟢 Concluído

### Setup & Fundação
- [x] **Pesquisa de stack** (03/07) — Comparação: Astro, WordPress, Next.js, Ghost, Hugo
- [x] **Stack definida** → Astro + Tailwind + TypeScript
- [x] **Projeto criado** + PROGRESSO.md
- [x] **Nome:** Radar Digital
- [x] **Setup Astro + Tailwind** — Build funcional
- [x] **Repositório GitHub** — `github.com/Burntroll/radar-digital`

### Design & UI
- [x] **Sistema de tema Dark/Light** — CSS variables + toggle + localStorage
- [x] **Light mode** — Paleta creme quente (`#f0ece4`), refinamento fino
- [x] **Acessibilidade do nav** — text-base (16px), logo text-xl (20px), gap-6
- [x] **Página 404** — Three.js com radar estilizado + noindex
- [x] **Nav renomeado** — "Parceiros" → "Ferramentas" (PT) / "Herramientas" (ES)
- [x] **Dropdown "Categorias" removido** do menu Ferramentas
- [x] **Locale switcher hover** — Item ativo apaga ao passar mouse no dropdown
- [x] **Badge "Tendências" removido** do hero da home

### Home Editorial
- [x] **AdSlot reutilizável** — Componente com variantes horizontal, in-feed, sidebar
- [x] **Abertura editorial** + Leia primeiro + Últimas publicações + Guias
- [x] **Navegação por intenção** — 6 cards: tráfego, IA, monetizar, guias, ferramentas, bônus
- [x] **Bloco Radar Market** na home
- [x] **Espaçamento padronizado** — py-14, cards limpos
- [x] **Fechamento duplicado removido** das homes PT e ES

### Conteúdo & Collections
- [x] **Content Collections configuradas** — Schema Zod para todas as coleções
- [x] **Sistema draft** — Controle granular de publicação
- [x] **18 stubs de artigos** — Markdown com frontmatter completo
- [x] **8 publicações publicadas** (4 pares PT/ES): Email Marketing, Múltiplas Contas, Prompts, Checklist Segurança
- [x] **6 parceiros PT + ES** — Trackers e Antidetect Browsers
- [x] **9 bônus PT + ES** — Códigos promocionais com status, verifiedAt, sourceUrl
- [x] **2 guias publicados** — Checklist de segurança (PT + ES)
- [x] **1 guia em draft** — Guia de tráfego pago para afiliados

### i18n PT/ES
- [x] **Estrutura bilíngue** — PT na raiz, ES em `/es/...` (41 páginas)
- [x] **Locale switcher** + dicionário i18n (~100+ chaves)
- [x] **Schema com locale** em todas as collections
- [x] **Auditoria i18n** — lang/hreflang/canonical/x-default/og:locale validados
- [x] **Rotas filtradas por locale** + categorias ES

### SEO & Performance
- [x] **Sitemap.xml** — 28 URLs, sem drafts, sem 404
- [x] **Schema.org JSON-LD** — WebSite, Article, BreadcrumbList
- [x] **Open Graph + Twitter Cards** — Em todas as páginas
- [x] **Canonical** — Em todas as páginas
- [x] **`astro check` como quality gate** — 0 erros
- [x] **Contadores de categoria corrigidos** — Só `draft: false`

### Guias, Bônus, Ferramentas, Radar Market
- [x] **Seção Guias** — Busca + filtros por tema (22 tags)
- [x] **Seção Bônus** — Hero + filtros por categoria + grid de cards
- [x] **Ferramentas** — Páginas de categoria com parceiros
- [x] **Radar Market** — Página + coleções + bloco na home

### Infraestrutura
- [x] **Deploy Vercel** — Preview ativo
- [x] **vercel.json** — Config para Astro
- [x] **CSS bundling** — Import via Astro
- [x] **Push autorizado** — Branch master sincronizada
- [x] **GitHub Actions** — Workflow "Quality Check" (19 runs, todas verdes)
- [x] **Vercel deploy automático** — CI aprovou, Vercel deploya automaticamente

### 🔧 Padronização visual (11/jul)
- [x] **`glass-card` e `interactive-card` separados** — Superfície passiva vs interativa
- [x] **CTAs editoriais visíveis sem hover** — `opacity-75` em vez de `opacity-0`
- [x] **AdSlot componentizado** — Placeholders manuais substituídos
- [x] **`EmptyState` padronizado** — Componente compartilhado
- [x] **`CategoryArticleCard` reutilizado** — 6 páginas -> 1 componente
- [x] **Filtros com CSS (sem inline)** — `filter-bar`, `filter-chip`, variantes roxo/ciano
- [x] **Hover por variante** — `@media (hover: hover)` específico por cor
- [x] **Mini-cards de Bônus e Market melhorados** — Tipografia maior, 1 coluna mobile
- [x] **`commercial-cta` padronizado** — Bônus e Ferramentas compartilham classe

### 🏗️ Arquitetura editorial
- [x] **Registro central de hubs** — `src/config/editorialHubs.ts` (17 hubs)
- [x] **Tipos derivados do registro** — `EditorialHubId` é union dos IDs do array
- [x] **Registro central de tópicos** — `src/config/editorialTopics.ts` (6 tópicos)
- [x] **`primaryHub` no schema** — Opcional, validado runtime contra `editorialHubs`
- [x] **Validação negativa** — ID inválido rejeitado com mensagem clara
- [x] **Piloto concluído** — `primaryHub` preenchido em 8 publicações (4 pares PT/ES)

### 📋 Piloto `primaryHub` — 8 publicações

| Par | `primaryHub` | Arquivos |
|---|---|---|
| Email Marketing | `digital-marketing` | `04-email-marketing-vale-a-pena.md` + `vale-la-pena.md` |
| Múltiplas Contas | `digital-marketing` | `07-gerenciar-multiplas-contas.md` + `gestionar-multiples-cuentas.md` |
| Prompts | `ai-automation` | `02-prompts-que-funcionam.md` + `02-crear-prompts-que-funcionan.md` |
| Checklist Segurança | `contingency-infrastructure` | `08-checklist-seguranca-multiconta.md` + `seguridad-multicuenta.md` |

## 🟡 Pendências imediatas

### Arquitetura editorial
- [ ] **Tornar `primaryHub` obrigatório** para conteúdos publicados (opcional em drafts)
- [ ] **`relatedHubs`** — Implementar campo + validação
- [ ] **Conectar `topics` ao schema** — Validar contra `editorialTopics.ts`
- [ ] **Migrar tópicos nos conteúdos** — Preencher `topics` baseado em `subtema` e `guideTags`
- [ ] **`translationKey`** — Substituir `slugEs` por chave bidirecional

### Conteúdo & Rotas
- [ ] **Nova rota canônica** `/publicacoes/<slug>/` com redirect de `/artigos/...`
- [ ] **Páginas públicas de hubs** — Templates para hubs ativos
- [ ] **Conectar hubs ao navbar** — Nova estrutura de navegação
- [ ] **Conectar hubs ao sitemap**
- [ ] **Breadcrumbs baseados em `primaryHub`**
- [ ] **Migração dos drafts** — Preencher metadados editoriais
- [ ] **Publicar mais artigos** — 14 stubs restantes
- [ ] **Paridade ES** dos próximos conteúdos

### Setup técnico
- [ ] **Páginas legais** — Privacidade, Termos, Contato
- [ ] **Newsletter funcional** — Formulário hoje é placeholder
- [ ] **robots.txt** — Somente próximo ao lançamento
- [ ] **RSS feed** — Planejado
- [ ] **Pagefind** — Busca interna (planejado)
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
|---|---|---|
| Nome | **Radar Digital** | ✅ |
| Stack | Astro + Tailwind + TypeScript | ✅ |
| Domínio | `radardigital.ai` | Definido (não conectado) |
| Hospedagem | Vercel | Preview ativo |
| Idiomas ativos | PT (raiz) + ES (`/es/`) | ✅ |
| Idiomas futuros | EN, VI, ZH-CN | Desativados (schema pronto) |
| Quality gate | `astro check` + `astro build` | ✅ |
| `primaryHub` | Opcional, validado runtime | ✅ Implementado |
| `relatedHubs` | Não implementado | Pendente |
| `topics` | Registro criado, não conectado | Pendente |
| `translationKey` | Não implementado | Pendente |
| Rotas de hubs | Planas (não hierárquicas) | Aprovado, não implementado |

---

> **Próxima task recomendada:** Tornar `primaryHub` obrigatório para conteúdos publicados, mantendo opcional em drafts.
