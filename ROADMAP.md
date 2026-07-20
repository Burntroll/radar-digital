# Roadmap — Radar Digital

> **Propósito:** Acompanhamento do progresso dos blocos, atualizado pelo Plano de Ação 2.2 e pela direção editorial V4 aprovada. Cada bloco representa um conjunto de entregas relacionadas.
> **Última atualização:** 20/07/2026 — direção V4 congelada e Bloco 7 decomposto

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
> painel vertical, accordions nativos, locale e tema; desktop preservado integralmente.
> Acessibilidade (Task 5.8) permanece pendente. Bloco 5
> continua em andamento.
>
> **Sequência corretiva controlada (antes da Task 5.8, sem reabertura do Bloco 1):**
> - Auditoria do tema light encerrada como diagnóstico, não como certificação de acessibilidade.
> - Camada semântica de cores publicada em `5c73789` — 9 papéis funcionais em `global.css`.
> - Editorial Cream escolhida como direção estratégica; Warm Slate mantida apenas como fallback conceitual.
> - Rollout obrigatório em etapas pequenas e isoladas.
> - **Estágio 1 (superfícies e bordas) publicado** em `39970e2`: canvas `#f8f4ec`, card `#fffdf8`, elevated `#f1ebe2`, borda `#d9d0c3`, border-soft `rgba(76,63,44,.10)`, surface-header `#fcf8f1`, surface-ad `#f3ede4`. PT/ES, mobile e desktop preservados. Dark mode preservado. 41 páginas, 28 URLs e 15 hints mantidos.
> - **Estágio 2 — parcialmente iniciado:** neutros de texto publicados em `5a41d88` (secondary `#50504c`, muted `#696760`; primary `#0f172a` inalterado). Contraste de ambos ≥ 4,5:1 contra as cinco superfícies semânticas. Pendência anterior de muted resolvida. Dark mode preservado. PT/ES, desktop e mobile validados. 41 páginas, 28 URLs e 15 hints mantidos.
> - **Estágio 2 — restante futuro:** link, interactive, focus e estados ativos ainda sem valores finais decididos.
> - **Estágios seguintes previstos:** consumidores editoriais e comerciais → Task 5.8 → auditoria Bloco 12.
> - Task 5.8 executada somente depois de estabilizados os tokens funcionais necessários à validação de foco.
> - Nenhum avanço para o Bloco 6 antes do checkpoint final do Bloco 5.
> - Editorial Cream aplicada parcialmente (apenas estágio 1); consumidores de `--color-surface-header` e `--color-surface-ad` ainda não migrados.
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
|| 5.5 | Menu de Recursos — implementado (disclosure mantido com Guias; Ferramentas e Bônus promovidos a anchors independentes — ícones removidos no commit `bd78ec4`, links exclusivamente textuais) | ✅ Concluído |
||| 5.6 | Menu do Radar Market | ✅ Concluído sem submenu público — anchor mantido; submenu diferido por ausência de conteúdo comercial elegível |
||| 5.7 | Implementar menu mobile | ✅ Concluído — implementado, publicado em master (SHA 6843fc4), validado em CI e Vercel; mobile < 1024 px com hamburger, painel e accordions; desktop preservado a partir de 1024 px; 41 páginas e 28 URLs mantidas |
|| 5.8 | Validar teclado e leitores de tela | ⏳ Pendente |

---

## Bloco 6 — Templates de hubs

> **Prioridade:** retomada somente depois da estabilização da nova home editorial no Bloco 7.

| Componente | Status |
|---|---|
| Templates de hubs ativos | ⏸️ Pendente — retomar após o Bloco 7 |
| Páginas agregadoras de hubs | ⏸️ Pendente — retomar após o Bloco 7 |

---

## Bloco 7 — Nova home editorial (V4 aprovada — prioridade atual)

> **Direção:** a V4 está formalmente aprovada e especificada em `docs/DESIGN_V4.md`. A implementação deve ser incremental, compartilhar componentes/dados entre PT e ES e preservar os contratos atuais de rotas, SEO e Content Collections.

| Task | Entrega fechada | Status |
|---|---|---|
| 7.0 | Congelar a V4 e produzir o mapa técnico | ✅ Concluída — documentação apenas |
| 7.1 | Fundação visual e tokens | ✅ Concluída — camada canônica light/dark, aliases e Tailwind semânticos |
| 7.2 | Tipografia | ✅ Concluída — Inter/Source Serif 4 locais, OFL, subsets PT/ES e escalas V4 |
| 7.3 | Barra superior “Radar agora” | ⏳ Próxima recomendada |
| 7.4 | Masthead | ⏳ Pendente |
| 7.5 | Navegação desktop | ⏳ Pendente |
| 7.6 | Navegação mobile | ⏳ Pendente |
| 7.7 | Capa editorial principal | ⏳ Pendente |
| 7.8 | Notícias secundárias | ⏳ Pendente |
| 7.9 | Painel Radar agora | ⏳ Pendente |
| 7.10 | Assuntos em destaque | ⏳ Pendente |
| 7.11 | Seleção da redação | ⏳ Pendente |
| 7.12 | Últimas publicações | ⏳ Pendente |
| 7.13 | Mais lidas | ⏳ Pendente — depende de fonte auditável |
| 7.14 | Editorias | ⏳ Pendente |
| 7.15 | Resolver hoje | ⏳ Pendente |
| 7.16 | Guias | ⏳ Pendente |
| 7.17 | Ferramentas | ⏳ Pendente |
| 7.18 | Bônus | ⏳ Pendente |
| 7.19 | Radar Market | ⏳ Pendente |
| 7.20 | Newsletter | ⏳ Pendente |
| 7.21 | Footer institucional | ⏳ Pendente |
| 7.22 | Consolidação ES | ⏳ Pendente |
| 7.23 | Dark mode | ⏳ Pendente |
| 7.24 | Responsividade | ⏳ Pendente |
| 7.25 | Acessibilidade | ⏳ Pendente |
| 7.26 | Imagens e performance | ⏳ Pendente |
| 7.27 | Documentação e checkpoint final | ⏳ Pendente |

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
