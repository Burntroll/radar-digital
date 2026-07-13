# Roadmap — Radar Digital

> **Propósito:** Acompanhamento do progresso dos blocos do Plano de Ação 2.1. Cada bloco representa um conjunto de entregas relacionadas.
> **Última atualização:** 13/07/2026 — reconciliação documental com estado atual do Bloco 5

## Bloco 1 — Sistema visual e componentes

| Componente | Status |
|---|---|
| Stack Astro + Tailwind + TS | ✅ Concluído |
| Deploy Vercel + CI | ✅ Concluído |
| Tema dark/light | ✅ Concluído |
| i18n PT/ES | ✅ Concluído |

## Bloco 2 — Contrato do sitemap

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

## Bloco 4 — Decisão sobre CMS (✅ CONCLUÍDO)

> **Veredito:** Bloco 4 concluído. Content Collections mantidas para o lançamento.
> CMS externo adiado até gatilhos operacionais reais (documentados em docs/DECISIONS.md).
> Nenhum CMS externo foi implementado. Nenhuma prova de conceito foi executada.

### Tasks

| ID | Task | Status |
|---|---|---|
| 4.1 | Levantar requisitos editoriais para decisão sobre CMS | ✅ Concluído |
| 4.2 | Comparar alternativas de CMS (Content Collections, WordPress Headless, Payload, Sanity) | ✅ Concluído |
| 4.3 | Criar prova de conceito (se necessária) | ⏭️ Não necessária neste ciclo |
| 4.4 | Registrar decisão formal em ADR | ✅ Concluído |

### Componentes previstos

| Componente | Status |
|---|---|
| Páginas de hubs | ⏳ Pendente |
| Navbar baseado em hubs | ⏳ Pendente |
| Breadcrumbs dinâmicos | ⏳ Pendente |
| Rota canônica /publicacoes/ | ⏳ Pendente |
| Sitemap por hub | ⏳ Pendente |

## Bloco 5 — Navegação e Mega Menus (🔄 EM ANDAMENTO)

> **Veredito:** Estrutura-base do navbar implementada. Usa registro central tipado
> (`src/config/siteNavigation.ts`) e `<details>/<summary>` para grupos. Apenas itens
> com rota pública e filhos elegíveis são renderizados. Mega menus de Setores (5.2)
> e Operação (5.3) concluídos — Setores com painel simples + descrição, Operação
> com painel agrupado em 3 subseções visuais. Verticais permanece oculto (todos
> planned). A auditoria da Task 5.4 constatou que nenhum hub de Verticais (Nutra,
> Adult, Renda Extra, Outras Verticais) possui filho público elegível — todos
> continuam planned, sem rota, página ou conteúdo publicado. Verticais permanece
> totalmente ausente do HTML. A task foi encerrada neste ciclo sem alteração de
> código e poderá ser reavaliada quando houver filho elegível. Menu de Recursos
> (Task 5.5) concluído — Recursos permanece disclosure com somente Guias no estado
> atual; Ferramentas e Bônus são anchors independentes. Radar Market possui anchor
> principal e a Task 5.6 foi concluída sem submenu público — o anchor atual é
> suficiente para o estado comercial presente; submenu será reavaliado quando
> houver cobertura comercial real e destinos válidos. Task 5.7 (menu mobile)
> concluída — navegação mobile dedicada abaixo de 1024 px com hamburger,
> painel vertical, accordions nativos, locale e tema; desktop preservado
> integralmente. Acessibilidade (Task 5.8) permanece pendente. Bloco 5
> continua em andamento.
>
> **Regressão visual do seletor PT/ES — encerrada (commit `ef99fb9`):**
> causa confirmada — wrapper com `overflow-x-auto` incluía links, idioma e tema.
> Solução: faixa rolável limitada aos links; idioma e tema fora dela.
> Validado remotamente em PT/ES, light/dark, 390/768/1024/1440 px.
> `scrollHeight` do wrapper permanece em 40 px com o locale aberto.
> Nenhuma scrollbar vertical residual.
>
> Preview público: https://radar-digital-lemon.vercel.app/

### Tasks

| ID | Task | Status |
|---|---|---|
| 5.1 | Criar estrutura-base do navbar aprovado | ✅ Concluído |
| 5.2 | Implementar mega menu de Setores | ✅ Concluído |
| 5.3 | Implementar mega menu agrupado de Operação | ✅ Concluído |
|| 5.4 | Menu de Verticais | ✅ Concluído neste ciclo — nenhuma implementação necessária |
|| 5.5 | Menu de Recursos — implementado (disclosure mantido com Guias; Ferramentas e Bônus como anchors independentes com ícone + label) | ✅ Concluído |
||| 5.6 | Menu do Radar Market | ✅ Concluído sem submenu público — anchor mantido; submenu diferido por ausência de conteúdo comercial elegível |
||| 5.7 | Implementar menu mobile | ✅ Concluído — implementado, publicado em master (SHA 6843fc4), validado em CI e Vercel; mobile < 1024 px com hamburger, painel e accordions; desktop preservado a partir de 1024 px; 41 páginas e 28 URLs mantidas |
|| 5.8 | Validar teclado e leitores de tela | ⏳ Pendente |

---

## Bloco 6 — Templates de hubs

| Componente | Status |
|---|---|
| Templates de hubs ativos | ⏳ Pendente |
| Páginas agregadoras de hubs | ⏳ Pendente |

---

## Bloco 7 — Nova home editorial

| Componente | Status |
|---|---|
| Home editorial renovada | ⏳ Pendente |

---

## Bloco 8 — Arquivo geral e descoberta

| Componente | Status |
|---|---|
| Página de arquivo, busca, categorias | ⏳ Pendente |

---

## Bloco 9 — Newsletter e formulários

| Componente | Status |
|---|---|
| Formulário de inscrição, gestão de leads | ⏳ Pendente |

---

## Bloco 10 — Institucional, confiança e transparência

| Componente | Status |
|---|---|
| Sobre, Contato, Política Editorial, Privacidade, Termos | ⏳ Pendente |
| Revisor (reviewerId) — adiado do Bloco 3 | ⏳ Pendente |
| Disclosure editorial/comercial — adiado do Bloco 3 | ⏳ Pendente |

---

## Bloco 11 — SEO editorial avançado

| Componente | Status |
|---|---|
| Schema markup avançado, otimização on-page | ⏳ Pendente |

---

## Bloco 12 — Mídia, performance e acessibilidade

| Componente | Status |
|---|---|
| Imagens otimizadas, performance Core Web Vitals, acessibilidade completa | ⏳ Pendente |

---

## Bloco 13 — Conteúdo real e monetização

| Componente | Status |
|---|---|
| Publicação em massa, conteúdo editorial, monetização inicial | ⏳ Pendente |

---

## Bloco 14 — Preparação multilíngue

| Componente | Status |
|---|---|
| EN, VI, ZH-CN (schemas prontos, desativados) | ⏳ Pendente |

---

## Bloco 15 — EN como idioma piloto

| Componente | Status |
|---|---|
| Inglês como próximo idioma ativo | ⏳ Pendente |

---

## Bloco 16 — Pré-lançamento público

| Componente | Status |
|---|---|
| Domínio próprio, Search Console, Analytics, auditoria final | ⏳ Pendente |

---

## Bloco 17 — Operação pós-lançamento

| Componente | Status |
|---|---|
| Operação contínua, métricas, evolução | ⏳ Pendente |
