# Roadmap — Radar Digital

> **Propósito:** Acompanhamento do progresso dos blocos do Plano de Ação 2.0. Cada bloco representa um conjunto de entregas relacionadas.
> **Última atualização:** 12/07/2026 — encerramento do Bloco 3

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

## Bloco 3 — Arquitetura editorial e taxonomia (✅ CONCLUÍDO)

> **Veredito:** Bloco 3 concluído. Revisor e disclosure adiados ao Bloco 10 por decisão documentada.

### Tasks

| ID | Task | Status |
|---|---|---|
| 3.1 | Inventariar collections e campos | ✅ Concluído |
| 3.2 | Definir collection central | ✅ Concluído |
| 3.3 | Definir formatos editoriais | ✅ Concluído |
| 3.4 | Definir hubs válidos | ✅ Concluído |
| 3.5 | Implementar `primaryHub` | ✅ Concluído |
| 3.6 | Implementar `relatedHubs` | ✅ Concluído |
| 3.7 | Implementar tópicos controlados | ✅ Concluído |
| 3.8 | Implementar `translationKey` | ✅ Concluído |
| 3.9 | Implementar autoria e fontes | ✅ Concluído (autor institucional + fontes) |
| 3.10 | Executar piloto de migração | ✅ Concluído |

### Critérios de pronto

| Critério | Status |
|---|---|
| Schema estável e documentado | ✅ Atendido |
| Ausência de metadados essenciais quebra o build | ✅ Atendido |
| Distribuição automática funciona em PT/ES | ✅ Atendido (2 pilotos publicados) |
| Piloto aprovado antes da migração em massa | ✅ Atendido |

### O que foi implementado

- 4 registros centrais (hubs, tópicos, formatos, autores)
- Schema completo com validação runtime
- 8 publicações migradas com metadados editoriais
- Distribuição principal por `primaryHub` em Marketing Digital PT/ES
- Distribuição secundária por `relatedHubs` em Inteligência Artificial PT/ES
- `categoria` não governa mais as listagens conectadas (campo legado preservado)
- Build, CI, Vercel, HTML e SEO validados

### O que NÃO foi feito (fora do escopo)

- Templates genéricos de hubs
- Páginas novas de hubs
- Navbar dinâmica por hub
- Breadcrumbs baseados em `primaryHub`
- Rotas canônicas `/publicacoes/`
- Distribuição por tópicos ou formatos
- Remoção de `categoria`
- Migração dos 17 drafts
- CMS

### Decisões adiadas

- **Revisor (`reviewerId`)** — Adiado ao Bloco 10. Não há fluxo real de revisão definido.
- **Disclosure editorial/comercial** — Adiado ao Bloco 10. Política editorial/comercial não formalizada.

## Bloco 4 — Páginas e Navegação (✅ CONCLUÍDO)

> **Veredito:** Bloco 4 concluído. Content Collections mantidas para o lançamento.
> CMS externo adiado até gatilhos operacionais reais (documentados em docs/DECISIONS.md).
> Nenhum CMS externo foi implementado. Nenhuma prova de conceito foi executada.

### Tasks

| ID | Task | Status |
|---|---|---|
| 4.1 | Levantar requisitos editoriais para decisão sobre CMS | ✅ Concluído |
|| 4.2 | Comparar alternativas de CMS (Content Collections, WordPress Headless, Payload, Sanity) | ✅ Concluído |
|| 4.3 | Criar prova de conceito (se necessária) | ⏭️ Não necessária neste ciclo |
|| 4.4 | Registrar decisão formal em ADR | ✅ Concluído |

### Componentes previstos

| Componente | Status |
|---|---|
| Páginas de hubs | ⏳ Pendente |
| Navbar baseado em hubs | ⏳ Pendente |
| Breadcrumbs dinâmicos | ⏳ Pendente |
| Rota canônica /publicacoes/ | ⏳ Pendente |
| Sitemap por hub | ⏳ Pendente |

## Bloco 5 — Navegação e Mega Menus (🔄 INICIADO)

> **Veredito:** Estrutura-base do navbar implementada. Usa registro central tipado
> (`src/config/siteNavigation.ts`) e `<details>/<summary>` para grupos. Apenas itens
> com rota pública e filhos elegíveis são renderizados. Verticais permanece oculto
> (todos os hubs planned). Hubs planned não aparecem. Mega menus completos, menu
> mobile e auditoria de teclado continuam pendentes nas tasks 5.2 a 5.8.

### Tasks

| ID | Task | Status |
|---|---|---|
| 5.1 | Criar estrutura-base do navbar aprovado | ✅ Concluído |
| 5.2 | Implementar mega menus completos | ⏳ Pendente |
| 5.3 | Implementar menu mobile | ⏳ Pendente |
| 5.4 | Integrar dropdown de parceiros dinâmico | ⏳ Pendente |
| 5.5 | Auditar sessões ativas e aria-current | ⏳ Pendente |
| 5.6 | Auditar contraste e foco | ⏳ Pendente |
| 5.7 | Auditar navegação por teclado e leitores de tela | ⏳ Pendente |
| 5.8 | Finalizar e validar acessibilidade | ⏳ Pendente |

---

## Bloco 6 — Infraestrutura e Lançamento

| Componente | Status |
|---|---|
| Domínio próprio | 🔒 Aguardando |
| SEO / Analytics | ⏳ Pendente |
| Privacidade / Termos | ⏳ Pendente |
| Newsletter | ⏳ Pendente |
| Busca interna | ⏳ Pendente |

---

**Nota:** Prioridades dos blocos 4 e 5 não foram alteradas por este encerramento.
