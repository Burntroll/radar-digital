# 🚧 Progresso — Radar Digital

> **Stack:** Astro 4 + Tailwind + TypeScript
> **Hospedagem:** Vercel (https://radar-digital-lemon.vercel.app)
> **Domínio:** radardigital.ai (não conectado — preview Vercel apenas)
> **Última atualização:** 12/07/2026 — autoria institucional concluída (sessão 16)
> **Último commit:** `b8a789a` — `fix: TS comparison in authorType resolution`
> **GitHub Actions:** 21 runs, 20 success ✅, 1 failure (corrigido)
> **Idiomas:** PT (raiz, default) + ES (`/es/`) ✅
> **Build:** 41 páginas | **Sitemap:** 28 URLs

## 🟢 Concluído

### Setup & Fundação
- [x] **Stack:** Astro + Tailwind + TypeScript
- [x] **Repositório:** `github.com/Burntroll/radar-digital`
- [x] **Deploy Vercel** — Preview automático via CI
- [x] **GitHub Actions** — Workflow quality-check.yml (npm ci → check → build)
- [x] **vercel.json** — Redirects ES + fallback

### Design & UI
- [x] **Tema Dark/Light** — CSS variables + toggle + localStorage
- [x] **Light mode** — Paleta creme quente (`#f0ece4`)
- [x] **Página 404** — Three.js com radar estilizado + noindex
- [x] **Nav renomeado** — "Ferramentas" (PT) / "Herramientas" (ES)
- [x] **Locale switcher** — Dropdown PT/ES com hreflang
- [x] **Componentes padronizados** — glass-card, interactive-card, AdSlot, EmptyState, CategoryArticleCard

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

### 🔧 Arquitetura editorial

#### Registros centrais
- [x] **`editorialHubs.ts`** — 17 hubs (3 active, 14 planned)
- [x] **`editorialTopics.ts`** — 6 tópicos (todos active)
- [x] **`editorialAuthors.ts`** — 1 autor institucional (`radar-digital`, Organization)

#### Schema (collection `artigos`)
- [x] **`primaryHub`** — Opcional em drafts, obrigatório em publicados
- [x] **`relatedHubs`** — Opcional, 1–3 IDs, ≠ primaryHub, exige primaryHub
- [x] **`topics`** — Opcional em drafts, obrigatório em publicados, 1–5 IDs
- [x] **`translationKey`** — Opcional, lowercase kebab-case, 3–64 chars
- [x] **`authorId`** — Opcional em drafts, obrigatório em publicados, validado contra registro central
- [x] **Validação `.superRefine()`** — Unifica todas as regras cross-field
- [x] **Validação global `validatePublishedTranslationGroups()`** — Duplicatas e grupos órfãos

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

## 🟡 Pendências imediatas

### Conteúdo & Rotas
- [ ] **Migração dos drafts (17)** — Preencher metadados editoriais
- [ ] **Nova rota canônica** `/publicacoes/<slug>/` com redirect
- [ ] **Páginas públicas de hubs** — Templates para hubs ativos
- [ ] **Conectar hubs ao navbar**
- [ ] **Conectar hubs ao sitemap**
- [ ] **Breadcrumbs baseados em `primaryHub`**
- [ ] **Remover `slugEs`** — Após migração total para `translationKey`
- [ ] **Publicar mais artigos** — 14 stubs restantes
- [ ] **Autores pessoais** — Registro, byline, página de autor

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
| Quality gate | `astro check` + `astro build` | ✅ |
| `primaryHub` | Obrigatório p/ publicados, opcional em drafts | ✅ |
| `relatedHubs` | Opcional, 1–3 IDs, validado runtime | ✅ |
| `topics` | Obrigatório p/ publicados, validado runtime | ✅ |
| `translationKey` | Opcional, kebab-case, associado via helper global | ✅ |
| `authorId` | Obrigatório p/ publicados, Organization no JSON-LD | ✅ |
| Autores futuros | Registro central suporta Person | Estrutura pronta |
| Rotas de hubs | Planas (não hierárquicas) | Aprovado, não implementado |

---

> **Próxima task recomendada:** Migrar drafts (17) com metadados editoriais ou implementar páginas de hubs.
