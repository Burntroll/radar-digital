# 🚧 Progresso — Radar Digital

> **Stack:** Astro 4 + Tailwind + TypeScript
> **Hospedagem:** Vercel (https://radar-digital-lemon.vercel.app)
> **Domínio:** radardigital.ai (não conectado — preview Vercel apenas)
> **Última atualização:** 12/07/2026 — checkpoint do Bloco 3 (arquitetura editorial)
> **Último commit:** `b540374` — `refactor: centralize editorial format registry`
> **GitHub Actions:** 36+ runs, success ✅
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

### Pendências conhecidas e formalmente adiadas (comportamento não público)
- [x] **`relatedHubs` sem distribuição** — Metadata preparatória, 0 publicações usando
- [x] **Formatos `planned` sem efeito público** — Vocabulário aprovado, sem rota/página/HTML
- [x] **`sources` sem exibição pública** — Metadata interna, sem `citation` no JSON-LD
- [x] **Nenhuma distribuição por hub/forma/tópico** — Campos armazenados, não consumidos para listagens

## 🟡 Pendências imediatas (Bloco 3)

### Pendências do modelo editorial
- [ ] **Distribuição por `primaryHub`** — Rotas, listagens, breadcrumbs ainda usam `categoria`
- [ ] **`relatedHubs` sem uso** — Nenhuma publicação utiliza o campo
- [ ] **Revisor (`reviewerId`)** — Não implementado, sem adiamento documentado
- [ ] **Disclosure editorial/comercial** — Não implementado, sem adiamento documentado
- [ ] **Formatos ativos sem efeito público** — `guide` e `article` não diferenciam rota, template ou listagem
- [ ] **Migração dos drafts (17)** — Preencher metadados editoriais

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

> **Próximo ponto de decisão:** Definir o menor piloto técnico de distribuição por `primaryHub` em PT/ES, sem migrar os drafts e sem antecipar navbar, novas rotas públicas, sitemap ou páginas de hubs. A decisão seguinte deverá determinar se o piloto começa por uma camada interna de seleção/consulta, uma listagem já existente ou uma página controlada prevista no contrato de rotas.
