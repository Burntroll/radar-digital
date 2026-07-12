# Roadmap — Radar Digital

> **Propósito:** Acompanhamento do progresso dos blocos do Plano de Ação 2.0. Cada bloco representa um conjunto de entregas relacionadas.
> **Última atualização:** 12/07/2026

## Bloco 1 — Setup e Estrutura

| Componente | Status |
|---|---|
| Stack Astro + Tailwind + TS | ✅ Concluído |
| Deploy Vercel + CI | ✅ Concluído |
| Tema dark/light | ✅ Concluído |
| i18n PT/ES | ✅ Concluído |

## Bloco 2 — Conteúdo e Collections

| Componente | Status |
|---|---|
| Content Collections | ✅ Concluído |
| 8 publicações PT+ES | ✅ Concluído |
| Parceiros, Bônus, Market | ✅ Concluído |

## Bloco 3 — Arquitetura editorial e taxonomia (checkpoint)

### Modelo / Schema
- [x] Registro central de hubs (17, 3 active)
- [x] Registro central de tópicos (6, todos active)
- [x] Registro central de formatos (7, 2 active, 5 planned)
- [x] Registro central de autores (1 organization)
- [x] Schema `contentType` conectado ao registro central
- [x] Schema `primaryHub`, `relatedHubs`, `topics`, `translationKey`, `authorId`, `sources`
- [x] Validação runtime via `npm run build`

### Piloto (parcial)
- [x] 8 publicações migradas com metadados editoriais (primaryHub, topics, translationKey, authorId, sources)
- [x] 4 pares PT/ES com `translationKey`
- [x] Validação de grupos de tradução (sem órfãos, sem duplicatas)
- [x] Variante `guide` do formato validada
- [ ] Distribuição automática PT/ES — pendente

### Distribuição (não iniciada)
- [ ] Listagens por `primaryHub`
- [ ] Listagens por formato
- [ ] Listagens por tópico
- [ ] Breadcrumbs baseados em `primaryHub`
- [ ] Rotas de hubs

### Revisão / Disclosure
- [ ] `reviewerId` — Não implementado
- [ ] Disclosure editorial/comercial — Não implementado

### Documentação
- [x] `docs/CONTENT_MODEL.md` — Modelo editorial completo
- [x] `docs/DECISIONS.md` — Decisões arquiteturais
- [x] `PROGRESSO.md` — Checkpoint do modelo

**Veredito:** 🟡 PARCIAL — checkpoint do modelo concluído (registros, schema, build validation), piloto de metadados concluído, distribuição automática não iniciada, revisão/disclosure pendentes

## Bloco 4 — Páginas e Navegação

| Componente | Status |
|---|---|
| Páginas de hubs | ⏳ Pendente (bloco 3 necessário) |
| Navbar baseado em hubs | ⏳ Pendente |
| Breadcrumbs dinâmicos | ⏳ Pendente |
| Rota canônica /publicacoes/ | ⏳ Pendente |
| Sitemap por hub | ⏳ Pendente |

## Bloco 5 — Infraestrutura e Lançamento

| Componente | Status |
|---|---|
| Domínio próprio | 🔒 Aguardando |
| SEO / Analytics | ⏳ Pendente |
| Privacidade / Termos | ⏳ Pendente |
| Newsletter | ⏳ Pendente |
| Busca interna | ⏳ Pendente |

---

**Nota:** Prioridades dos blocos 4 e 5 não foram alteradas por esta auditoria.
