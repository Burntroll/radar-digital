# 🚧 Progresso — Radar Digital

> **Stack:** Astro 4 + Tailwind + TypeScript
> **Hospedagem:** Vercel (https://radar-digital-lemon.vercel.app)
> **Domínio:** radardigital.ai (não conectado — preview Vercel apenas)
> **Última atualização:** 13/07/2026 — reconciliação documental pós-Blocos 4 e 5
> **Baseline técnico e documental atual:** `e0c1a9b` — `fix: correct locale dropdown overflow`
> **Checkpoint documental do Bloco 3:** `a52757c` — `docs: close editorial architecture block`
> **GitHub Actions:** 40+ runs, success ✅
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
| 5.5 | Menu de Recursos (disclosure já existe com Guias, Ferramentas, Bônus) | ◐ Parcialmente atendida |
| 5.6 | Menu do Radar Market (anchor principal já existe; submenu pendente) | ◐ Parcialmente atendida |
| 5.7 | Implementar menu mobile | ⏳ Pendente |
| 5.8 | Validar teclado e leitores de tela | ⏳ Pendente |

#### Regressão visual do seletor PT/ES (reaberta)

O commit `e0c1a9b` (`fix: correct locale dropdown overflow`) substituiu o par
`<button>`+`<div>` do seletor de idioma por `<details>`+`<summary>`, o que
melhorou o comportamento fechado — os links internos deixaram de participar da
tabulação quando o disclosure está fechado.

Porém, a validação visual manual posterior confirmou que a regressão visual não
foi resolvida completamente. Ao abrir o seletor PT/ES, o painel continua contido
pela região rolável da navbar em vez de se projetar livremente para baixo sobre
a página, o que produz uma scrollbar ou comportamento de scroll interno na
navegação. A regressão visual está reaberta e precisa de uma task técnica
separada de diagnóstico e correção.

Causa técnica ainda não determinada. Hipóteses para investigação incluem:
ancestral com `overflow` restritivo, contexto de posicionamento ou contêiner
rolável. Nenhuma causa está confirmada.

#### Pendências imediatas

- Regressão visual do seletor PT/ES — reaberta; necessita diagnóstico e correção antes do avanço normal do Bloco 5.
- Commit documental `3c16d97` ainda não publicado.
- Tasks 5.5–5.8 exigem tratamento conforme os estados acima.
- Próxima task técnica ainda não autorizada.
- Plano de Ação 2.0 será atualizado posteriormente em task separada (versão 2.1).

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

> **Próximo ponto de decisão:** Bloco 4 concluído. Content Collections mantidas para o lançamento.
> **Bloco 5 (Navegação e mega menus):** em andamento — Tasks 5.1 a 5.4 concluídas, 5.5 e 5.6 parcialmente atendidas, 5.7 e 5.8 pendentes.
> **Regressão visual do seletor PT/ES:** reaberta (commit `e0c1a9b` publicado, mas a correção visual não foi completa — necessita task técnica separada).
