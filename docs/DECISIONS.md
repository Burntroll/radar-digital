# Decisões Arquiteturais — Radar Digital

> **Propósito:** Registrar decisões arquiteturais que já estão comprovadas no código, para que outra pessoa ou IA entenda o *porquê* sem depender de histórico de conversas.
> **Última revisão:** 12/07/2026 (checkpoint do Bloco 3)

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

**Atualização:** `primaryHub` possui piloto de distribuição nas listagens de Marketing Digital (commit `2007b00`). `relatedHubs` possui piloto de distribuição secundária nas listagens de Inteligência Artificial (commit seguinte).

**Regras vigentes:**
- `primaryHub` define distribuição editorial principal.
- `relatedHubs` permite distribuição editorial secundária — uma publicação pode aparecer na listagem de um hub adicional sem alterar sua URL canônica.
- A mesma publicação pode aparecer em múltiplas listagens (ex.: Marketing Digital por `primaryHub` e Inteligência Artificial por `relatedHubs`) sem duplicação de conteúdo — é a mesma entrada com a mesma rota.
- Inclusão em listagens secundárias não cria cópia da publicação.
- Consumo atual está limitado aos dois pilotos existentes (Marketing Digital e Inteligência Artificial).
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
