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
