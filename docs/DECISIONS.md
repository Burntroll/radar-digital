# Decisões Arquiteturais — Radar Digital

> **Propósito:** Registrar decisões arquiteturais que já estão comprovadas no código, para que outra pessoa ou IA entenda o *porquê* sem depender de histórico de conversas.
> **Última revisão:** 16/07/2026 (Editorial Cream surfaces publicadas)

## Formato: preservação do nome técnico `contentType`

**Decisão:** O campo técnico na collection `artigos` continua chamado `contentType`. O conceito editorial é "formato", mas o nome do campo não foi renomeado para `format` por compatibilidade com o schema existente e os conteúdos já publicados.

**Implementação:** `src/content/config.ts` + `src/config/editorialFormats.ts`
**Status:** ✅ Implementado e documentado

## Formatos: `article` e `guide` ativos, demais planejados

**Decisão:** Dos 7 formatos registrados no vocabulário, apenas `article` e `guide` recebem status `active`. Os demais (`news`, `analysis`, `interview`, `case-study`, `review`) são `planned` — pertencem ao vocabulário aprovado mas não possuem publicações, rotas, páginas ou qualquer efeito público.

**Regra:** O status `planned` não bloqueia a validação do schema. Os 7 IDs são aceitos pelo `contentType`.

**Implementação:** `src/config/editorialFormats.ts`
**Status:** ✅ Implementado e documentado

## Fontes (`sources`): opcional e sem efeito público

**Decisão:** `sources` é um campo de metadata editorial. É opcional tanto para drafts quanto para publicados. Não possui exibição pública, não gera bloco de referências, não adiciona `citation` ao JSON-LD. É um contrato de governança, não um componente de front-end.

**Diferimento explícito:** Exibição pública, `citation` no JSON-LD, paridade automática PT/ES e verificação de cobertura de afirmações ficam para etapa futura.

**Implementação:** `src/content/config.ts` (schema) + conteúdos
**Status:** ✅ Implementado e documentado

## `primaryHub` e `relatedHubs`: metadata preparatória → primeiro consumo funcional

**Decisão (original):** `primaryHub` e `relatedHubs` são armazenados e validados, mas não produzem distribuição pública. Metadata preparatória para futura distribuição editorial.

**Atualização:** `primaryHub` possui piloto de distribuição nas listagens de Marketing Digital (commit `2007b00`). `relatedHubs` possui piloto de distribuição secundária nas listagens de Inteligência Artificial (commit seguinte). A Task 7.14 adiciona um segundo consumidor controlado na homepage: o módulo Editorias conta cobertura única por entrada e só expõe hubs ativos que também possuem rota pública localizada.

**Regras vigentes:**
- `primaryHub` define distribuição editorial principal.
- `relatedHubs` permite distribuição editorial secundária — uma publicação pode aparecer na listagem de um hub adicional sem alterar sua URL canônica.
- A mesma publicação pode aparecer em múltiplas listagens (ex.: Marketing Digital por `primaryHub` e Inteligência Artificial por `relatedHubs`) sem duplicação de conteúdo — é a mesma entrada com a mesma rota.
- Inclusão em listagens secundárias não cria cópia da publicação.
- O consumo público permanece limitado aos dois pilotos existentes e ao módulo Editorias da homepage; nenhum outro hub ganha distribuição ou rota por inferência.
- Rotas e páginas genéricas de hubs continuam futuras.

## Separação: publicações editoriais e collections comerciais

**Decisão:** A collection `artigos` é a collection central de publicações editoriais (artigos e guias). Bônus, Ferramentas, Parceiros e Radar Market permanecem como collections separadas — não são unificadas em uma única collection de "conteúdo". Essa separação é intencional e reflete a diferença de natureza editorial vs. comercial/promocional.

**Não é exceção temporária** — é uma decisão arquitetural. Cada collection tem seu próprio schema, validação e template de página.

**Implementação:** `src/content/config.ts`
**Status:** ✅ Implementado e documentado

## Validação: `npm run build` como gate de frontmatter

**Decisão:** A validação dos dados da Content Collection (Zod schema) é materializada durante o `npm run build`. `npm run check` (`astro check`) valida TypeScript e Astro types, mas **não** valida frontmatter de `.md` em runtime. Portanto, testes negativos de schema devem usar `npm run build`.

**Consequência conhecida:** Arquivos excluídos da descoberta da collection (prefixo `_`, `draft: true` não carregado por `getCollection()`) não são validados pelo build. Essa limitação é aceita e documentada.

**Implementação:** Comportamento do Astro 4 (`astro:content` → `getEntryDataAndImages()`)
**Status:** ✅ Documentado

## Autoria: `Organization` como tipo inicial

**Decisão:** O registro `editorialAuthors.ts` suporta `organization` e `person`. Nesta etapa, apenas `radar-digital` (Organization) está registrado. O JSON-LD gera o autor como `Organization`. Byline individual, página de autor e autoria pessoal ficam para etapa futura.

**Implementação:** `src/config/editorialAuthors.ts` + JSON-LD Article
**Status:** ✅ Implementado; autoria pessoal pendente

## Traduções: `translationKey` como mecanismo de associação

**Decisão:** Pares PT/ES são associados via `translationKey` (string kebab-case compartilhada). O helper `getPublishedTranslationGroup()` resolve os alternates hreflang a partir de entradas reais da collection — não mais de `slugEs`. `slugEs` permanece como campo legado.

**Validação global:** `validatePublishedTranslationGroups()` impede duplicatas de locale por chave e grupos órfãos (apenas um locale publicado).

**Implementação:** `src/utils/editorialTranslations.ts` + schema
**Status:** ✅ Implementado e validado

## Revisor (`reviewerId`): adiado ao Bloco 10

**Decisão:** Não implementar `reviewerId` neste momento porque não existe fluxo real de revisão definido, não há registro de revisores reais, e usar o mesmo autor institucional como revisor criaria metadata artificial.

**Motivo:** O contrato de revisão deverá ser definido junto à estrutura editorial da equipe e à política de correções. Fazer um campo de revisor antes de ter fluxo real de revisão geraria metadata sem correspondência operacional.

**Destino:** Bloco 10 — Institucional, confiança e transparência.
**Status:** 🔄 Adiado por decisão documentada

## Disclosure editorial/comercial: adiado ao Bloco 10

**Decisão:** Não implementar um enum ou campo de disclosure neste momento porque a política editorial/comercial ainda não foi formalizada. Os significados de afiliado, patrocinado, parceiro e publieditorial precisam ser definidos antes do schema.

**Motivo:** Nenhum valor padrão deve ocultar a natureza comercial de conteúdo futuro. Aplicar disclosure sem política definida criaria risco de classificação incorreta.

**Destino:** Bloco 10 — Política de conteúdo comercial; aplicação posterior em conteúdos e cards conforme o modelo aprovado.
**Status:** 🔄 Adiado por decisão documentada

## Encerramento do Bloco 3 — Arquitetura editorial

**Decisão:** Bloco 3 concluído com:
- Modelo editorial estabilizado (4 registros centrais, schema completo)
- Piloto de migração de 8 publicações com metadados editoriais
- Distribuição principal por `primaryHub` (Marketing Digital PT/ES)
- Distribuição secundária por `relatedHubs` (Inteligência Artificial PT/ES)
- Revisor e disclosure adiados ao Bloco 10

**Não autoriza automaticamente:**
- Migração em massa dos 17 drafts
- Criação de páginas, rotas ou navbar de hubs
- Ampliação da distribuição para outros hubs ou páginas sem nova validação
- Remoção do campo legado `categoria`

**Status:** ✅ Bloco 3 concluído

---

## ADR — Estratégia de CMS para o lançamento

**Status:** Aceita

**Data da decisão:** 13/07/2026

**Contexto**

- O Bloco 3 estabilizou o modelo editorial (4 registros centrais, schema completo, validação runtime).
- A task 4.1 documentou requisitos editoriais e 13 respostas estratégicas em `docs/CMS_REQUIREMENTS.md`.
- A task 4.2 comparou quatro alternativas (Content Collections, WordPress Headless, Payload CMS, Sanity) em `docs/CMS_COMPARISON.md`.
- A comparação foi factual e neutra — não declarou vencedor nem recomendou plataforma.
- O cenário atual é de lançamento solo: uma pessoa operando o conteúdo, com apoio de Git e IA.
- O ritmo inicial previsto é de três a cinco publicações semanais como referência, sem compromisso contratual.
- Os principais benefícios de CMS externos (interface visual, permissões, revisão, agendamento, preview) estão ligados ao crescimento para uma equipe não técnica.
- Não existe atualmente um bloqueio editorial que justifique migração.

**Decisão**

- **Astro Content Collections** permanece como fonte editorial para o lançamento e a operação inicial.
- **Git** permanece como fonte de verdade para conteúdo, código, documentação e decisões durante esse período.
- Não haverá integração ou migração para CMS externo no Bloco 4.
- WordPress Headless, Payload CMS e Sanity continuam documentados como alternativas avaliadas, sem preferência futura predefinida.
- Esta decisão será reavaliada por gatilhos operacionais, não por calendário arbitrário.

**Motivos**

- Aderência do sistema atual ao cenário de lançamento.
- A continuidade com Content Collections não introduz novo custo específico de CMS no ambiente atual de pré-lançamento. GitHub Free e Vercel Hobby possuem preço-base gratuito no contexto atual, mas o plano Hobby da Vercel é restrito a uso pessoal e não comercial ([vercel.com/docs/plans/hobby](https://vercel.com/docs/plans/hobby)). O plano de hospedagem e os custos recorrentes deverão ser reavaliados antes do lançamento comercial público. Preços e condições podem mudar.
- Modelo editorial e validações já implementados e validados.
- PT-BR e ES já funcionando com hreflang, canonical e translationKey.
- Histórico e rollback pelo Git.
- CI (GitHub Actions) e deployment (Vercel) já estabilizados.
- Ausência atual de equipe editorial não técnica.
- Ausência de necessidade recorrente de revisão por papéis, agendamento ou preview externo no cenário atual.

**Consequências positivas**

- Nenhuma migração antecipada — zero risco de perda de dados, rotas ou SEO.
- Continuidade operacional sem interrupção do fluxo editorial.
- Preservação de todos os contratos editoriais e de SEO.
- Ausência de novo hosting, banco de dados ou serviço editorial.
- Foco nos próximos blocos do roadmap.
- Decisão baseada em uso real, não em especulação.

**Consequências e limitações aceitas**

- Edição continua dependendo de Markdown e Git.
- Não existe interface visual editorial.
- Não existe fluxo formal de aprovação.
- Não existem papéis e permissões editoriais.
- Não existe agendamento editorial nativo.
- Não existe biblioteca central de mídia.
- Preview por link para editores não técnicos continua ausente.
- Essas limitações são aceitáveis no cenário atual, mas não devem ser ignoradas quando a equipe crescer.

**Gatilhos obrigatórios de reavaliação**

A decisão deve ser reaberta quando um ou mais destes eventos ocorrerem:

1. Entrada efetiva de autores ou editores não técnicos.
2. Equipe editorial crescendo além da operação individual.
3. Necessidade recorrente de separar administrador, editor, autor e revisor.
4. Necessidade operacional de fluxo draft → revisão → aprovação → publicação.
5. Agendamento tornando-se requisito frequente.
6. Preview visual por link tornando-se necessário para terceiros.
7. Markdown e Git causando atrasos, erros ou dependência técnica recorrente.
8. Biblioteca, upload e gestão de mídia tornando-se gargalo.
9. Ritmo editorial aproximando-se de publicação diária.
10. Custo de manutenção do fluxo atual tornando-se maior do que o custo de adoção de CMS.

**Estratégia para futura reavaliação**

- A comparação de `docs/CMS_COMPARISON.md` deverá ser atualizada com preços, versões e capacidades vigentes.
- Nenhuma plataforma futura está pré-selecionada.
- Uma prova de conceito deverá testar somente as incertezas relevantes ao gatilho real.
- Possíveis testes incluem: modelo editorial completo, validações condicionais, associação PT/ES, preview na Vercel, exportação, rollback e experiência de editor não técnico.
- Nenhuma migração em massa poderá ocorrer antes de piloto aprovado.
- Content Collections poderá coexistir temporariamente com uma solução candidata durante eventual transição.
- Slugs, URLs, translationKey, fontes, hubs, tópicos e SEO deverão ser preservados.

**Alternativas consideradas**

- Continuar com Content Collections.
- WordPress Headless.
- Payload CMS.
- Sanity.

As quatro alternativas foram comparadas em `docs/CMS_COMPARISON.md`. Nenhuma recebeu preferência futura.

**Prova de conceito**

- Task 4.3 (prova de conceito): **não necessária neste ciclo**.
- Motivo: nenhuma incerteza técnica impede a decisão de manter o sistema atual.
- Status: não executada por decisão documentada, e não esquecida.
- Poderá ser reaberta no futuro caso um gatilho operacional exija validação prática.

**Resultado**

`MANTER CONTENT COLLECTIONS PARA O LANÇAMENTO — CMS EXTERNO ADIADO ATÉ GATILHOS OPERACIONAIS REAIS`

> **Fontes sobre planos:** A referência ao plano Hobby da Vercel como restrito a uso pessoal e não comercial baseia-se na documentação oficial do plano Hobby ([vercel.com/docs/plans/hobby](https://vercel.com/docs/plans/hobby), acessada em 13/07/2026), que declara textualmente: "the Hobby plan restricts users to non-commercial, personal use only". A referência a planos e preço-base do Vercel Hobby utiliza a página oficial de preços ([vercel.com/docs/pricing](https://vercel.com/docs/pricing), acessada em 13/07/2026). O GitHub Free é descrito na página oficial de preços do GitHub ([github.com/pricing](https://github.com/pricing), acessada em 13/07/2026).

---

## Ativação da navegação principal

**Decisão:** A estrutura-base do navbar (Bloco 5) utiliza um registro central tipado
em `src/config/siteNavigation.ts` com as seguintes regras de ativação:

- Grupos sem página agregadora própria são controles de menu (`<details>/<summary>`),
  não links.
- Grupos sem filhos elegíveis não são renderizados.
- Hubs com status `planned` em `editorialHubs.ts` não aparecem.
- Não são usados menus vazios, placeholders ou labels sem ação.
- Links apontam exclusivamente para rotas públicas já existentes.

**Estado público atual:**

| Área | Tipo | Status |
|------|------|--------|
| Início | anchor | Renderizado |
| Setores | menu (disclosure) | Renderizado (1 filho: IA) |
| Operação | menu (disclosure) | Renderizado (2 filhos: Marketing Digital, Monetização) |
| Verticais | menu | Oculto — nenhum filho elegível (todos planned) |
|| Recursos | menu (disclosure) | Renderizado (1 filho: Guias; Ferramentas e Bônus são anchors independentes) |
| Radar Market | anchor | Renderizado |

**Mega menu de Setores (5.2):** Adicionado `presentation: 'mega'` ao grupo Setores.
Painel com título + descrição localizada para Inteligência Artificial.

**Mega menu agrupado de Operação (5.3):** Adicionado `presentation: 'grouped'` ao
grupo Operação. O painel exibe subgrupos visuais em colunas (Aquisição e
Crescimento → Marketing Digital; Construção e Monetização → Monetização;
Tecnologia e Performance → oculto, sem filhos elegíveis). Mobile usa
`position: fixed` para manter o painel dentro do viewport.

**Auditoria de Verticais (5.4):** A auditoria constatou que nenhum dos quatro
hubs de Verticais — Nutra, Adult, Renda Extra e Outras Verticais — atende os
critérios de ativação. Todos permanecem com status `planned` no registro
editorial, nenhum possui rota pública PT/ES no routeMap, nenhum possui página
física em `src/pages/`, nenhum possui conteúdo editorial publicado com
`primaryHub` ou `relatedHubs`, e nenhum aparece no sitemap. O grupo Verticais
permanece com `eligible: false` e é removido da renderização pelo filtro
`.filter(section => section.eligible)`. Nenhuma implementação foi necessária
neste ciclo. A task deve ser reavaliada somente quando houver filho público
elegível.

**Critério de ativação:** A navegação é determinada pelo registro central,
não derivada automaticamente de `editorialHubs.ts`. Paginas agregadoras
continuam pertencendo ao Bloco 6.

---

## Promoção de Ferramentas e Bônus ao primeiro nível do navbar

**Status:** Aceita (Plano de Ação 2.1)

**Data da decisão:** 13/07/2026

**Contexto**

- Ferramentas (`/ferramentas/`, `/es/herramientas/`) e Bônus (`/bonus/`, `/es/bonos/`) são áreas essenciais para monetização e descoberta no Radar Digital.
- No estado atual, ambos estão agrupados dentro do disclosure de Recursos no navbar.
- O agrupamento dentro de Recursos reduz sua visibilidade e adiciona um clique ao acesso.
- Recursos ainda é necessário como agrupamento para Guias e futuros formatos editoriais (Cases, Entrevistas, Reviews).

**Decisão**

Promover Ferramentas e Bônus a anchors independentes do navbar, mantendo Recursos como disclosure.

**Arquitetura aprovada do navbar**

1. Início — anchor
2. Setores — disclosure (mega menu)
3. Operação — disclosure (agrupado)
4. Verticais — oculto (todos os hubs inelegíveis)
5. Recursos — disclosure (somente Guias; Ferramentas e Bônus removidos)
6. Ferramentas — anchor independente
7. Bônus — anchor independente
8. Radar Market — anchor independente

Complementos: seletor de idioma, theme toggle.

**Composição de Recursos (após a implementação)**

- Guias — elegível e público
- Cases — futuro, oculto enquanto inelegível
- Entrevistas — futuro, oculto enquanto inelegível
- Reviews — futuro, oculto enquanto inelegível

Ferramentas e Bônus não devem aparecer dentro do disclosure.

**Tratamento de Ferramentas e Bônus (após a implementação)**

- Anchor direto, acesso com um clique
- Ícone pequeno + label visível
- Rota pública atual preservada (nenhuma URL alterada)
- Label localizada em PT e ES
- Sem duplicação dentro de Recursos

**Consequências positivas**

- Ferramentas e Bônus ganham acesso direto, reduzindo atrito.
- Recursos permanece como agrupamento editorial, sem ser removido.
- Guias, Cases, Entrevistas e Reviews mantêm seu espaço conceitual dentro de Recursos.
- Nenhuma rota pública é alterada.
- Equivalência PT/ES é preservada.
- Mobile e acessibilidade serão tratados nas Tasks 5.7 e 5.8, sem antecipação.

**Alternativa rejeitada**

Remover Recursos e transformar todos os seus itens em anchors independentes.

Motivo da rejeição:
- Não escala para Cases, Entrevistas e Reviews (adicionaria múltiplos itens no primeiro nível sem agrupamento).
- Elimina um agrupamento editorial ainda útil para os formatos editoriais.
- Sobrecarrega o primeiro nível da navegação.

**Implementação**

A mudança no código (`siteNavigation.ts`, `SiteNavigation.astro`, `ui.ts`) não faz parte desta decisão documental e será realizada em task técnica separada.

---

## Radar Market: manter anchor sem submenu até existir cobertura comercial elegível

**Status:** Aceita

**Data da decisão:** 13/07/2026

**Contexto**

- Landing PT (`/market/`) e ES (`/es/market/`) existentes, respondendo 200.
- 4 categorias localizadas (IA & Automação, Tráfego & Operação, Social & Conteúdo, Cursos & Treinamentos) — pares PT/ES completos.
- 0 itens públicos na collection `marketItems`.
- 1 placeholder em draft (`placeholder-exemplo.md`).
- Ausência de rotas públicas de categoria ou item.
- A landing já apresenta todas as categorias disponíveis.

**Decisão**

- Manter Radar Market como anchor principal.
- Concluir a Task 5.6 sem submenu público neste ciclo.
- Não criar links filhos sem destinos e conteúdo reais.
- Reavaliar o submenu quando houver evidência operacional suficiente.

**Consequências**

- Nenhuma URL muda.
- Nenhuma categoria vazia aparece no navbar.
- Menu mobile e acessibilidade não recebem complexidade prematura.
- Conteúdo e taxonomia comercial continuam sendo tratados nos blocos apropriados.

**Não decidido nesta task**

- Categorias comerciais definitivas.
- Quantidade mínima de itens para justificar submenu.
- Arquitetura de rotas de categoria.
- Páginas individuais de produtos.
- Disclosures comerciais (adiados ao Bloco 10).
- Filtros e busca do Market.

**Divergência de categorias registrada**

Existe uma divergência ainda não resolvida entre as categorias conceituais do Plano 2.1 (Softwares, Cursos, Serviços, Comunidades, Infraestrutura) e as categorias atualmente versionadas (IA & Automação, Tráfego & Operação, Social & Conteúdo, Cursos & Treinamentos). Esta divergência não altera a decisão de manter somente o anchor e deverá ser resolvida no contexto de conteúdo real e monetização (Bloco 13 ou posterior).

---

## Navegação mobile dedicada

**Status:** Aceita

**Data da decisão:** 13/07/2026

**Contexto**

- Abaixo de 1024 px, a faixa horizontal com overflow-x-auto era o único mecanismo de navegação — inadequado para toque em viewports estreitas.
- O desktop (>=1024 px) deveria permanecer integralmente preservado.

**Decisão**

- Mobile não reutiliza a faixa horizontal desktop comprimida.
- Existe uma árvore mobile própria derivada da mesma configuração central `mainNavigation` — não existe segunda taxonomia manual.
- Breakpoint adotado: 1024 px.
- Abaixo de 1024 px: hamburger e painel vertical de largura total abaixo do header.
- A partir de 1024 px: navegação desktop existente, inalterada.
- Accordions nativos (`<details>/<summary>`) para Setores, Operação e Recursos.
- Grupos conceituais de Operação preservados (Aquisição, Construção; Tecnologia oculto por vazio).
- Locale e tema disponíveis dentro do painel.
- Abertura aplica scroll lock no body e `inert` em `<main>` e `<footer>`.
- Fechamento ou redimensionamento para desktop restaura o estado.
- O painel não cria um segundo landmark `<nav>`.
- Nenhuma rota, URL, collection ou conteúdo editorial foi alterado.

**Não decidido nesta task**

- Escape, gestão avançada de foco, fluxo completo de teclado e leitores de tela permanecem para a Task 5.8.
- Acessibilidade completa não está declarada.

**Estado implementado na Task 7.6 (20/07/2026):** a lacuna acima foi encerrada no painel V4. Abertura move o foco para o primeiro destino; Tab/Shift+Tab permanecem contidos entre hamburger e painel; Escape fecha e restaura o foco; accordions respondem a Enter/Espaço; link, resize para desktop e `pagehide` restauram scroll lock e `inert`. O painel recebeu `role="dialog"` e `aria-modal="true"`, sem segundo landmark `<nav>` e sem mudança da taxonomia ou dos destinos.

---

## Ferramentas e Bônus: transição para links somente texto

**Status:** Aceita

**Data da decisão:** 13/07/2026

**Contexto**

Ferramentas (`/ferramentas/`, `/es/herramientas/`) e Bônus (`/bonus/`, `/es/bonos/`) foram promovidos a anchors independentes de primeiro nível na Task 5.5 com a exigência original de "ícone pequeno + label", conforme registrado no Plano de Ação 2.1 e na decisão anterior "Promoção de Ferramentas e Bônus ao primeiro nível do navbar".

Durante o uso contínuo do navbar, os ícones à esquerda dos links adicionam ruído visual sem ganho funcional. A leitura do primeiro nível é mais limpa e rápida com labels textuais apenas.

**Decisão**

- Ferramentas e Bônus permanecem promovidos ao primeiro nível como anchors independentes;
- ambos passam a exibir **apenas label textual** — sem ícone à esquerda;
- a regra vale igualmente para desktop e mobile;
- não haverá links representados somente por ícone;
- PT-BR e ES continuam equivalentes;
- rotas, ordem conceitual do navbar, elegibilidade e ausência de duplicação dentro de Recursos não mudam;
- Radar Market permanece inalterado.

**Relação com decisões anteriores**

Esta decisão substitui exclusivamente o detalhe visual "ícone + label" da decisão anterior "Promoção de Ferramentas e Bônus ao primeiro nível do navbar" e do Plano de Ação 2.1. Ambos os documentos permanecem preservados como registros históricos da intenção original.

**Implementação**

A remoção foi implementada no commit `bd78ec45fec19a5e54ddb3122ba77781d8aec1e9`, publicado em `master`. GitHub Actions run `29284786594` concluído com sucesso. Deployment Vercel e validação remota aprovados em PT e ES, desktop e mobile.

**Resultado**
- Navbar do primeiro nível ficou visualmente mais limpo.
- Código SVG e o campo `icon` do tipo `NavLinkItem` foram removidos dos registros de Ferramentas e Bônus (`src/config/siteNavigation.ts`) e dos componentes de navegação desktop e mobile.
- Nenhuma rota pública foi alterada.
- Labels, ordem e `aria-current` preservados.
- Equivalência PT/ES preservada.
- 41 páginas, 28 URLs e 15 hints mantidos.

---

## Direção Editorial Cream e rollout semântico do tema light

**Status:** Aceita

**Data da decisão:** 14/07/2026

**Contexto**

- O light mode publicado ainda usa a paleta fria consolidada em `c9bbde4` — canvas `#f7f8fc`, cards `#ffffff`, elevado `#f1f5f9`.
- A antiga paleta creme (`#f0ece4`) foi introduzida experimentalmente em `08a74c1` (`💡 Soften light mode: warm cream palette instead of cold slate`).
- O canvas foi posteriormente alterado para a paleta fria atual em `41ff2a4` (`style: update light theme background color`).
- O commit `5c73789` (`refactor: separate semantic color roles`) separou papéis semânticos de cores no `global.css` sem mudança visual intencional — os valores hexadecimais das variáveis existentes foram preservados.
- A auditoria do tema light encontrou pouca separação entre canvas, cards e superfícies elevadas, excesso de aparência SaaS e sobrecarga funcional do ciano em links, interação e foco.
- Warm Slate (paleta atual) não é um tema completo, mas um subproduto de refatorações sucessivas sem direção própria.

**Decisão**

- Adotar **Editorial Cream** como direção estratégica do futuro tema light.
- Não restaurar automaticamente os valores históricos de `08a74c1`.
- Não considerar nenhum conjunto experimental anterior como paleta final.
- Manter **Warm Slate** apenas como fallback conceitual — preservado enquanto durar, não promovido a tema.
- Preservar conceitualmente o dark mode — nenhuma alteração no tema escuro.
- Executar a migração em commits pequenos e isolados, um grupo de tokens por vez.
- Usar ciano luminoso prioritariamente para marca e decoração, não para links e interação primária.
- Usar cores funcionais mais escuras para links, foco e estados ativos.
- Manter papéis próprios para editorial e comercial (roxo editorial, âmbar comercial).

**Camada semântica publicada**

O commit `5c73789` estabeleceu nove papéis semânticos em `:root` e `.dark` em `src/styles/global.css`:

| Papel | Propósito |
|-------|-----------|
| `--color-brand-cyan` | Identidade visual, decoração, gradientes |
| `--color-link` | Links textuais |
| `--color-interactive` | Elementos interativos (botões, hover, tag-pill) |
| `--color-focus` | Indicador de foco (`:focus-visible`) |
| `--color-editorial` | Tratamento editorial (roxo) |
| `--color-editorial-active` | Estado ativo de elementos editoriais |
| `--color-commercial` | Tratamento comercial (âmbar) |
| `--color-surface-header` | Superfície do header |
| `--color-surface-ad` | Superfície de anúncios |

Aliases de compatibilidade preservados:

- `--color-accent: var(--color-link)`
- `--color-accent-purple: var(--color-editorial)`
- `--color-accent-blue` permanece independente

Consumidores existentes (componentes, glass-card, etc.) continuam usando os aliases antigos — a migração para os papéis semânticos é futura.

**Sequência de rollout**

1. Superfícies e bordas do light mode — primeiro estágio visual.
2. Textos e cores funcionais, incluindo foco e estados ativos.
3. Consumidores editoriais e comerciais (roxo e âmbar nos componentes apropriados).
4. Validação consolidada de teclado, foco e leitores de tela na Task 5.8.
5. Nova auditoria completa de contraste e acessibilidade no Bloco 12.

**Estado de implementação (16/07/2026)**

- **Estágio 1 publicado** no commit `39970e26f574f1c2d6c8a640041ade16e00f5fc9` (`style: apply editorial cream surfaces`).
- Alteração limitada a **sete tokens** de superfícies e bordas no bloco `:root` do `src/styles/global.css`:

| Token | Valor |
|-------|-------|
| `--color-surface` | `#f8f4ec` |
| `--color-surface-card` | `#fffdf8` |
| `--color-surface-elevated` | `#f1ebe2` |
| `--color-border` | `#d9d0c3` |
| `--color-border-soft` | `rgba(76, 63, 44, 0.10)` |
| `--color-surface-header` | `#fcf8f1` |
| `--color-surface-ad` | `#f3ede4` |

- Bloco `.dark` permaneceu **byte a byte inalterado**.
- Nenhum token de texto ou cor funcional foi alterado.
- Nenhum consumidor foi migrado — `AdSlot.astro` continua usando `var(--color-surface)`; header e navbar não foram conectados a `--color-surface-header`.
- Validação visual concluída em PT e ES, desktop e mobile.
- GitHub Actions run `29451606166` e Vercel Production aprovados.
- 41 páginas, 28 URLs e 15 hints preservados.
- Contraste de texto primário e secundário ≥ 4,5:1 contra todas as novas superfícies.
- `--color-text-muted` possui 3 combinações abaixo de 4,5:1 — pendência registrada para o estágio 2.

**Primeiro recorte do estágio 2 — neutros de texto**

Publicação no commit `5a41d885c24e27e6a15094d98260cfcd97d723e0` (`style: refine editorial cream text neutrals`).

Alteração limitada a **duas declarações** no bloco `:root` do `src/styles/global.css`:

| Token | Valor anterior | Valor publicado |
|-------|---------------|-----------------|
| `--color-text-secondary` | `#475569` | `#50504c` |
| `--color-text-muted` | `#64748b` | `#696760` |

- `--color-text-primary` permaneceu inalterado em `#0f172a`.
- Bloco `.dark` permaneceu **byte a byte inalterado**.
- Nenhum seletor ou consumidor foi alterado.
- Nenhum componente ou documento foi alterado.
- Contraste de ambos os tokens ≥ 4,5:1 contra as cinco superfícies semânticas (`#f8f4ec`, `#fffdf8`, `#f1ebe2`, `#fcf8f1`, `#f3ede4`). Menor contraste do secondary: ~6,83:1. Menor contraste do muted: ~4,78:1.
- A pendência anterior de três combinações abaixo de 4,5:1 para muted foi resolvida neste conjunto de superfícies.
- Validação visual concluída em PT e ES, desktop e mobile.
- GitHub Actions run `29454165474` e Vercel Production aprovados.
- 41 páginas, 28 URLs e 15 hints preservados.

**Estágio 2 — restante não implementado.** Link, interactive, focus, estados ativos e consumidores editoriais/comerciais ainda não foram decididos nem autorizados.

**Limitações e salvaguardas**

- A implementação do estágio 1 e do primeiro recorte do estágio 2 não conclui o tema Editorial Cream — a aplicação é **parcial**.
- O restante do estágio 2 (link, interactive, focus, estados ativos) e estágios 3 a 5 **não foram implementados**.
- Os valores funcionais cromáticos futuros (link, interactive, focus) **ainda não foram decididos**.
- Consumidores de `--color-surface-header` e `--color-surface-ad` ainda não foram migrados.
- A auditoria atual é **diagnóstico, não certificação WCAG**.
- Os valores de `08a74c1` não são a paleta final — são apenas um experimento anterior.
- O Bloco 5 permanece aberto (Task 5.8 pendente).
- O Bloco 6 permanece bloqueado.
- Esta decisão não autoriza mudança adicional em CSS, componentes, configurações, conteúdos ou rotas.

---

## ADR — Congelamento da direção editorial V4 e implementação incremental

**Data:** 20/07/2026

**Status:** Aceita

**Baseline auditado:** `aad1c0c5b51e185ba3a93e292215bf044afac9eb`

### Contexto

A homepage atual é implementada por dois templates extensos e quase duplicados (`src/pages/index.astro` e `src/pages/es/index.astro`). O header, a navegação, o footer, as queries e os módulos ainda refletem a fase anterior do produto. O Plano de Ação 2.2 e o mockup V4 aprovam uma nova direção: portal editorial creme, preto editorial, verde-lima como sinal, header em três faixas, capa assimétrica e módulos de ritmos variados.

O mockup é uma referência visual demonstrativa. Ele contém navegação, datas, conteúdos, imagens externas e interações simuladas que não obedecem integralmente aos contratos reais do sitemap, do i18n e das Content Collections. Copiá-lo como HTML monolítico criaria duplicação, conteúdo fictício e risco de regressão.

O Plano registra `97490fc397df93b915d72eee7b7595f1766c6b80` como baseline. Antes desta decisão, um commit autorizado preservou artefatos visuais e avançou `master` para `aad1c0c`; não houve mudança no código público da interface. O novo SHA foi auditado limpo e sincronizado com `origin/master` e é o baseline operacional da Task 7.0.

### Decisão

1. A direção V4 fica formalmente aprovada e congelada conforme `docs/DESIGN_V4.md`.
2. O Bloco 7 passa a ser a prioridade imediata. O Bloco 6 será retomado após a estabilização da nova home.
3. A V4 será implementada em tasks pequenas e sequenciais (7.1–7.27), nunca em uma substituição integral da homepage.
4. O HTML do mockup não será copiado para produção. A tradução será feita em componentes Astro, loaders tipados, dados reais, rotas localizadas e Content Collections existentes.
5. PT e ES compartilharão orquestração, componentes e consultas; as páginas de entrada permanecerão nas rotas atuais, sem migração para `[locale]`.
6. `SITEMAP.md`, `siteNavigation.ts`, `routeMap`, o modelo de conteúdo e os componentes de SEO prevalecem sobre rótulos ou links demonstrativos do mockup.
7. Conteúdo publicado deve ser elegível por locale, formato, status e data não futura. Rankings, status “ao vivo”, inscrição em newsletter, ofertas e produtos só aparecem quando sustentados por dados reais.
8. Os tokens atuais serão consolidados e migrados semanticamente; não será criada uma paleta paralela.
9. Canonical, hreflang, schemas, sitemap, acessibilidade, responsividade, performance, dark mode e transparência comercial serão gates explícitos de implementação.
10. A Task 7.0 é somente documental e não autoriza qualquer alteração visual ou funcional.

### Motivos

- Preservar os contratos reais do projeto e a estabilidade da produção.
- Evitar duplicação entre PT e ES e reduzir manutenção de queries divergentes.
- Permitir validação e reversão por fatias pequenas.
- Impedir que dados fictícios do mockup se tornem conteúdo permanente.
- Controlar riscos de SEO, acessibilidade, performance e dark mode antes de um checkpoint amplo.
- Manter clara a separação entre conteúdo editorial e comercial.

### Alternativas consideradas

1. **Copiar o mockup em uma única página/componente.** Rejeitada por criar HTML monolítico, dados hardcoded, links simulados, imagens externas e duplicação da arquitetura existente.
2. **Reescrever toda a home em uma única task.** Rejeitada pelo risco de regressão ampla e dificuldade de validação/rollback.
3. **Criar um protótipo paralelo dentro do repositório.** Rejeitada porque duplicaria a fonte de verdade e não exercitaria os contratos reais.
4. **Concluir o Bloco 6 antes da home.** Adiada; o Plano 2.2 prioriza a estabilização da nova direção editorial, que também definirá padrões reutilizáveis pelos hubs.
5. **Criar componentes separados para PT e ES.** Rejeitada por manter a duplicação atual.
6. **Migrar imediatamente para rota dinâmica `[locale]`.** Rejeitada por ampliar o escopo e elevar risco de canonical/hreflang/redirects.
7. **Usar dados demonstrativos até existir cobertura.** Rejeitada; módulos devem degradar com honestidade ou permanecer ocultos.

### Consequências

- O Bloco 7 possui uma sequência mais longa, porém cada entrega tem objetivo e definição de pronto verificáveis.
- Será necessário extrair a lógica duplicada das homes para um orquestrador e loader compartilhados durante as tasks de implementação.
- Alguns elementos visualmente aprovados podem permanecer ausentes inicialmente: “Mais lidas” depende de audiência auditável; “ao vivo” depende de atualização real; busca e newsletter dependem dos respectivos blocos funcionais.
- A navegação final será visualmente próxima da V4, mas continuará usando os rótulos e destinos reais do projeto.
- O monograma permanece provisório e substituível.
- A política/schema definitivo de disclosure continua no Bloco 10, embora a transparência visual seja obrigatória nos módulos V4.
- A documentação ausente `docs/ROUTES.md` e `docs/I18N.md` permanece como gap, sem criação não autorizada nesta task.

### Riscos

- A implementação incremental pode gerar estados intermediários visualmente híbridos; cada task deve limitar e documentar o recorte.
- Fontes e imagens editoriais podem degradar LCP/CLS.
- A baixa cardinalidade de conteúdo pode fragilizar composições do mockup.
- Queries atuais não bloqueiam explicitamente datas futuras, bônus expirados ou verificação desatualizada.
- A query de categorias de Ferramentas não filtra locale e pode vazar PT na home ES.
- Sticky header, ticker e menus podem causar regressões de teclado, foco, motion e viewport mobile.
- Alterações no shell podem afetar canonical, hreflang, schemas, sitemap e todas as páginas, não só a home.

### Critérios para revisão futura

Esta decisão deve ser revista somente se ocorrer um dos eventos abaixo:

- aprovação formal do logo ou de uma direção de marca incompatível com a V4;
- mudança do sitemap, das rotas localizadas ou da estratégia de idiomas;
- adoção de CMS ou modelo de conteúdo que substitua as Content Collections;
- existência de fonte auditável de audiência/realtime que altere os contratos de “Mais lidas” ou “Radar agora”;
- mudança relevante nos requisitos de disclosure/compliance;
- evidência mensurável de que tipografia, imagens ou composição V4 impedem os budgets de performance/acessibilidade;
- checkpoint 7.27 identificar conflito estrutural não resolvível pelas tasks previstas.

Qualquer revisão exige nova decisão documentada; não deve ocorrer por ajuste incidental de componente.
