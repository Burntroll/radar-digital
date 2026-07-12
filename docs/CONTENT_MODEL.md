# Modelo Editorial — Radar Digital

> **Propósito:** Documentar a arquitetura editorial do Radar Digital para que outra pessoa ou IA compreenda o modelo sem depender do histórico das conversas.
>
> **Fonte de verdade:** Plano de Ação 2.0 (arquitetura conceitual) + implementação real no repositório.
>
> **Última revisão:** 12/07/2026 (pós-commit `primaryHub` obrigatório)

## 1. Distinção entre hubs, tópicos, formatos e Recursos

O modelo editorial tem quatro dimensões distintas que não devem ser confundidas:

| Dimensão | O que é | Exemplos |
|---|---|---|
| **Hub** | Destino editorial amplo. Gera página pública. | Marketing Digital, IA, Monetização |
| **Tópico** | Assunto específico e controlado. Não gera página pública automaticamente. | `prompts`, `email-marketing`, `social-media` |
| **Formato** | Tipo editorial da publicação. | `article`, `guide`, `news`, `case`, `interview`, `review` |
| **Recurso** | Área utilitária ou comercial separada dos hubs. | Ferramentas, Bônus |

**Regras:**
- Hubs são registrados em `src/config/editorialHubs.ts`.
- Tópicos são registrados em `src/config/editorialTopics.ts`.
- Formatos são definidos no schema da collection (`contentType`).
- Recursos (Ferramentas, Bônus, Radar Market, Institucional) ficam fora do registro de hubs.
- Guias, Cases, Entrevistas, Reviews, Notícias e Artigos são **formatos**, não hubs.

## 2. Seções da arquitetura

A arquitetura editorial possui seis seções:

1. **Setores** — Análise setorial por indústria (E-commerce, IA, Crypto, iGaming)
2. **Operação** — Conteúdo prático sobre execução e processos
3. **Verticais** — Nichos específicos (Nutra, Adult, Renda Extra)
4. **Recursos** — Ferramentas, Bônus, Guias, Cases, Entrevistas, Reviews
5. **Radar Market** — Marketplace de produtos e serviços
6. **Institucional** — Sobre, Contato, Política Editorial, Privacidade, Termos

Apenas **Setores**, **Operação** e **Verticais** pertencem ao registro de hubs editoriais.

## 3. Registro central de hubs

**Arquivo:** `src/config/editorialHubs.ts`

**Estrutura:**

```typescript
interface EditorialHub {
  id: EditorialHubId;      // ID estável (não muda com idioma)
  section: EditorialSection; // 'sectors' | 'operations' | 'verticals'
  group?: EditorialGroup;    // Apenas para hubs de Operação
  labelPt: string;
  labelEs: string;
  slugPt: string;
  slugEs: string;
  status: EditorialHubStatus; // 'active' | 'planned'
}
```

**Tipos derivados:** `EditorialHub`, `EditorialHubId` e `EditorialHubStatus` são derivados diretamente do array `editorialHubs`, não declarados manualmente.

### Hubs por seção

#### Setores (sectors)

| ID | Label PT | Status |
|---|---|---|
| `ecommerce` | E-commerce | planned |
| `artificial-intelligence` | Inteligência Artificial | **active** |
| `crypto` | Crypto | planned |
| `igaming` | iGaming | planned |

#### Operação (operations)

**Grupo: Aquisição e Crescimento (acquisition-growth)**

| ID | Label PT | Status |
|---|---|---|
| `digital-marketing` | Marketing Digital | **active** |
| `paid-traffic` | Tráfego Pago | planned |
| `affiliates` | Afiliados | planned |
| `seo-content` | SEO e Conteúdo | planned |

**Grupo: Construção e Monetização (building-monetization)**

| ID | Label PT | Status |
|---|---|---|
| `sites-portals` | Sites e Portais | planned |
| `monetization` | Monetização | **active** |

**Grupo: Tecnologia e Performance (technology-performance)**

| ID | Label PT | Status |
|---|---|---|
| `ai-automation` | IA e Automação | planned |
| `contingency-infrastructure` | Contingência e Infraestrutura | planned |
| `data-conversion` | Dados e Conversão | planned |

#### Verticais (verticals)

| ID | Label PT | Status |
|---|---|---|
| `nutra` | Nutra | planned |
| `adult` | Adult | planned |
| `extra-income` | Renda Extra | planned |
| `other-verticals` | Outras Verticais | planned |

**Totais:** 17 hubs | 3 active | 14 planned

**Regras de validação:**
- Hubs de `operations` **exigem** `group` (tipado).
- Hubs de `sectors` ou `verticals` **não podem** ter `group`.
- O registro está protegido com `as const satisfies readonly EditorialHubDefinition[]`.

**O registro ainda não está conectado a:** rotas, navbar, sitemap, breadcrumbs ou páginas públicas de hubs.

## 4. Registro central de tópicos

**Arquivo:** `src/config/editorialTopics.ts`

**Tópicos registrados (todos active):**

| ID | Label PT | Label ES |
|---|---|---|
| `prompts` | Prompts | Prompts |
| `email-marketing` | Email Marketing | Email Marketing |
| `social-media` | Redes Sociais | Redes Sociales |
| `account-security` | Segurança de Contas | Seguridad de Cuentas |
| `analytics-tracking` | Analytics e Tracking | Analytics y Tracking |
| `antidetect` | Antidetect Browsers | Antidetect Browsers |

**Regras:**
- Tópicos **não duplicam** hubs editoriais.
- `paid-traffic`, `affiliates`, `ecommerce`, `monetization`, `seo-content` etc. não são tópicos (são hubs).
- `guideType` (checklist, tutorial, etc.) permanece separado dos tópicos.
- **O registro está conectado ao schema, validado em runtime durante o build.**

## 5. Modelo atual da collection editorial

**Arquivo:** `src/content/config.ts`

**Collection `artigos`:**

```typescript
const artigos = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    categoria: z.enum(['marketing-digital', 'inteligencia-artificial', 'monetizacao']),
    subtema: z.string(),
    excerpt: z.string(),
    date: z.coerce.date(),
    updatedAt: z.coerce.date().optional(),
    readTime: z.string(),
    draft: z.boolean().default(true),
    color: z.enum(['cyan', 'purple', 'amber']),
    emoji: z.string().optional(),
    locale: z.enum(['pt-BR', 'es']).default('pt-BR'),
    slugEs: z.string().optional(),
    primaryHub: z.custom<EditorialHubId>(...).optional(),
    contentType: z.enum(['article', 'guide']).default('article'),
    guideType: z.enum([...]).optional(),
    guideTags: z.array(z.string()).default([]),
    relatedHubs: z.array(z.custom<EditorialHubId>(...)).optional(),
    topics: z.array(z.custom<EditorialTopicId>(...)).optional(),
    image: z.string().optional(),
    author: z.string().optional(),
  }),
});
```

## 6. Regra atual de `primaryHub` e `relatedHubs`

### `primaryHub`

- `primaryHub` é opcional no schema da collection `artigos` para conteúdos com `draft: true`.
- Para conteúdos **publicados** (`draft: false`), `primaryHub` é **obrigatório** — o build falha se ausente.
- A validação é feita em duas camadas:
  1. **Campo:** `z.custom<EditorialHubId>()` valida contra `editorialHubs` (rejeita IDs inválidos).
  2. **Objeto:** `.superRefine()` verifica que `draft: false` implica `primaryHub` presente.
- O tipo inferido continua `EditorialHubId | undefined` (para compatibilidade com drafts).
- A mensagem de erro para publicado sem hub: `"primaryHub is required for published content (draft: false)"`.
- IDs inválidos produzem erro com mensagem: `"primaryHub must match a registered editorial hub ID"`.
- Nenhum ID de hub é duplicado manualmente no schema — usa `z.custom(isValidHubId)` com `.superRefine()`.

### `relatedHubs`

- `relatedHubs` é um campo **opcional** na collection `artigos`.
- Finalidade: distribuição editorial secundária — permite associar uma publicação a hubs adicionais além do `primaryHub`.
- Quando informado, deve conter de **1 a 3** IDs de hubs editoriais registrados.
- Nenhum ID pode ser duplicado dentro da lista.
- Nenhum item pode ser igual ao `primaryHub` da publicação.
- `relatedHubs` **não pode** ser informado se `primaryHub` estiver ausente.
- A ordem informada no YAML é preservada (sem ordenação automática).
- O campo não tem valor padrão — é `undefined` quando não informado.
- A reutiliza o mesmo validador `isValidHubId` usado por `primaryHub`.
- Nenhuma validação depende de `relatedHubs` para conteúdos que não o utilizam.
- `relatedHubs` **não altera** interface pública, rotas, breadcrumbs, canonical, hreflang ou sitemap nesta etapa.
- Nenhuma publicação ainda utiliza `relatedHubs`.

**Mensagens de erro:**

| Condição | Mensagem |
|----------|----------|
| ID inválido | `relatedHubs must contain only registered editorial hub IDs` |
| Lista vazia | `relatedHubs must contain at least 1 hub when provided` |
| Mais de 3 itens | `relatedHubs cannot contain more than 3 hubs` |
| IDs duplicados | `relatedHubs cannot contain duplicate hub IDs` |
| Repete `primaryHub` | `relatedHubs cannot include primaryHub` |
| Sem `primaryHub` | `relatedHubs requires primaryHub` |

### `topics`

- `topics` é um campo **opcional** na collection `artigos` para conteúdos com `draft: true`.
- Para conteúdos **publicados** (`draft: false`), `topics` é **obrigatório** — o build falha se ausente.
- Tipo inferido: `EditorialTopicId[] | undefined`.
- Quando informado, deve conter de **1 a 5** IDs de tópicos registrados.
- Todos os IDs devem existir em `editorialTopics` — validado em runtime.
- Não pode haver IDs duplicados na lista.
- A ordem declarada no frontmatter é preservada.
- O campo não tem valor padrão — é `undefined` quando não informado.
- O validador reutiliza `isValidTopicId`, derivado do registro central.
- `topics` **não altera** interface pública, filtros, rotas, breadcrumbs, canonical, hreflang ou sitemap nesta etapa.
- `guideTags` continua existindo e não foi substituído nesta etapa.
- **8 publicações publicadas** foram migradas com `topics`.
- **Drafts** ainda não foram migrados.

**Mensagens de erro:**

| Condição | Mensagem |
|----------|----------|
| Publicado sem tópicos | `topics is required for published content (draft: false)` |
| ID inválido | `topics must contain only registered editorial topic IDs` |
| Lista vazia | `topics must contain at least 1 topic when provided` |
| Mais de 5 itens | `topics cannot contain more than 5 topics` |
| Tópicos duplicados | `topics cannot contain duplicate topic IDs` |

### `translationKey`

- `translationKey` é um campo **opcional** na collection `artigos`, presente somente em conteúdos que participam de um grupo real de traduções.
- Finalidade: associar de forma estável as versões PT e ES (e futuramente EN, VI, ZH-CN) do mesmo conteúdo, independentemente de slug, título ou URL.
- Formato: `lowercase kebab-case` — regex `/^[a-z0-9]+(?:-[a-z0-9]+)*$/`.
- Mínimo de **3** caracteres, máximo de **64**.
- Versões traduzidas compartilham **exatamente a mesma chave**.
- A chave é um identificador interno **estável e imutável** após a publicação.
- Conteúdos publicados sem tradução **podem ficar sem chave**.
- A chave **não é exibida publicamente** e não determina a URL.
- O esquema não valida chaves entre entradas — essa validação é feita globalmente pelo helper `validatePublishedTranslationGroups()` em `src/utils/editorialTranslations.ts`.

**Validação global (build):** O helper `validatePublishedTranslationGroups()` verifica:

| Regra | Descrição |
|-------|-----------|
| Locale duplicado | Uma chave não pode ter duas publicações publicadas com o mesmo locale |
| Grupo órfão | Uma chave com apenas um locale publicado quebra o build |
| Conteúdo isolado | Publicações sem `translationKey` continuam aceitas |
| N idiomas | O grupo aceita futuramente PT, ES, EN, VI, ZH-CN — sem limite de tamanho |

**Alternates:** Os templates de artigos PT e ES agora derivam os alternates das entradas reais do grupo de tradução (via `getPublishedTranslationGroup()`), não mais de `slugEs`.

**4 pares PT/ES migrados:** `email-marketing-roi`, `social-media-multi-account-management`, `effective-prompts`, `multi-account-security-checklist`.

**`slugEs`** permanece no schema e nos conteúdos como campo legado, mas os templates de artigos não dependem mais dele para hreflang.

**Outras collections** (Ferramentas, Bônus, Radar Market) ainda não foram migradas.

**Drafts** ainda não possuem `translationKey` e não são validados.

### `authorId`

- `authorId` é um campo **opcional** na collection `artigos` para conteúdos com `draft: true`.
- Para conteúdos **publicados** (`draft: false`), `authorId` é **obrigatório** — o build falha se ausente.
- Valor validado em runtime contra o registro central `editorialAuthors.ts`.
- Tipo inferido: `EditorialAuthorId` (derivado do registro).
- O campo `author` (string livre) permanece como legado, mas não é mais utilizado para resolver o autor nas páginas publicadas.
- O registro central suporta `organization` e `person`.
- Nesta etapa, apenas `radar-digital` (Organization) está registrado.
- O JSON-LD gera o autor como `Organization` (não mais `Person`).
- **8 publicações** foram migradas com `authorId: radar-digital`.
- **Drafts** ainda não foram migrados e não exigem `authorId`.
- Nenhuma byline visível foi adicionada nesta etapa.
- Nenhuma página de autor foi criada.
- Autoria pessoal, revisão, fontes e disclosure continuam pendentes.

### `sources`

**Status:** Contrato aprovado — ainda não implementado no schema nem no frontmatter de nenhum conteúdo.

**Propósito:** Metadado editorial estruturado para registrar fontes verificáveis que sustentam afirmações factuais e numéricas no corpo do artigo.

**Natureza do campo:**

- Opcional tanto para conteúdos publicados quanto para drafts.
- Quando informado, deve conter entre **1 e 20 itens**.
- Destinado exclusivamente a fontes editoriais verificáveis.
- **Não representa:** links internos, links contextuais comuns, CTAs, links de afiliados, links comerciais ou links promocionais.
- Não terá efeito público na primeira implementação (sem bloco de referências, sem JSON-LD `citation`, sem links visíveis).
- Não será herdado automaticamente entre traduções — cada entrada de conteúdo declara suas próprias fontes.
- Não haverá validação global de paridade entre idiomas na primeira versão.

**Formato conceitual de cada fonte:**

```typescript
type EditorialSource = {
  title: string;
  publisher: string;
  url: string;
  publishedAt?: Date;
  accessedAt?: Date;
  note?: string;
};
```

**Regras de cada campo:**

| Campo | Obrigatório | Regras |
|-------|-------------|--------|
| `title` | ✅ Sim | Título específico da página, relatório, estudo ou documento. Não pode ser apenas o nome genérico da organização. Deve preservar preferencialmente o título original da fonte. |
| `publisher` | ✅ Sim | Organização, veículo, projeto ou entidade responsável pela publicação. Exemplos conceituais: Litmus, Mailchimp, Apple. Não confundir com o autor do conteúdo do Radar Digital. |
| `url` | ✅ Sim (v1) | URL absoluta. Somente protocolos HTTP ou HTTPS. Deve apontar para a fonte específica — homepage genérica não é suficiente quando existe página específica. URLs duplicadas dentro do mesmo conteúdo serão rejeitadas. |
| `publishedAt` | ❌ Não | Data de publicação ou atualização declarada pela fonte. Deve ser usada quando disponível; não deve ser inventada. |
| `accessedAt` | ❌ Não | Data em que a fonte foi consultada ou verificada. Recomendada para benchmarks, preços, documentação viva e páginas que podem mudar. Não substitui `publishedAt`. |
| `note` | ❌ Não | Contexto editorial curto. Pode registrar limitações, metodologia, paywall ou escopo do dado. Será metadata interna na primeira versão. Não deve ser usada para copiar grandes trechos da fonte. |

**Regras de governança:**

- O schema **não tentará detectar automaticamente** estatísticas, percentuais ou afirmações factuais no corpo Markdown.
- A necessidade editorial de fontes depende de **política e revisão humana**, não de validação automatizada.
- `sources` permanece **opcional** no schema inicial — ausência de fontes não significa automaticamente que o conteúdo está errado.
- Presença de fontes não valida por si só que a afirmação está corretamente representada — fontes precisam realmente sustentar a afirmação associada.
- Um estudo sobre tema semelhante **não pode** ser usado para justificar um número diferente.
- Fontes pagas podem ser utilizadas desde que exista uma URL específica e que limitações de acesso sejam registradas em `note`.

**Escopo adiado (não pertence à primeira versão):**

- `author` da fonte
- `sourceType` (research, article, official-doc, survey etc.)
- Identificador próprio da fonte
- Fontes sem URL pública
- Herança entre traduções
- Validação de equivalência PT/ES
- Detecção automática de afirmações
- Exibição pública (componente visual de referências)
- `citation` no JSON-LD
- `reviewedBy`
- `disclosures`
- Política editorial completa

**Exemplo documental (ilustra o contrato — não implementa o campo no schema):**

```yaml
sources:
  - title: "The ROI of Email Marketing"
    publisher: "Litmus"
    url: "https://www.litmus.com/blog/infographic-the-roi-of-email-marketing"
    publishedAt: 2025-07-16
    accessedAt: 2026-07-12
    note: "Resultados de pesquisa apresentados por faixas de retorno."
```

## 7. Piloto concluído

`primaryHub` foi preenchido em **8 publicações** (4 pares PT/ES):

| Par PT/ES | `primaryHub` | Conteúdo |
|---|---|---|
| `04-email-marketing-vale-a-pena.md` + ES | `digital-marketing` | Artigo: Email Marketing |
| `07-gerenciar-multiplas-contas-redes-sociais.md` + ES | `digital-marketing` | Artigo: Múltiplas Contas |
| `02-prompts-que-funcionam.md` + ES | `ai-automation` | Artigo: Prompts |
| `08-checklist-seguranca-multiconta.md` + ES | `contingency-infrastructure` | Guia: Checklist Segurança |

Todos os 8 commits do piloto foram validados com CI verde e deploy na Vercel.

## 8. Campos legados temporariamente preservados

Durante a transição, estes campos continuam existindo e sendo usados:

| Campo | Função atual | Futuro |
|---|---|---|
| `categoria` | Obrigatório. Usado em breadcrumbs e links. | Será derivado de `primaryHub` ou removido |
| `subtema` | Obrigatório. Badge principal dos cards. | Pode ser substituído por `topics[0]` |
| `contentType` | Inalterado (`article` / `guide`) | Permanecerá |
| `guideType` | Subtipo de guia | Permanecerá |
| `guideTags` | Filtros de Guias | Será substituído por `topics` |
| `slugEs` | Link PT→ES (legado) | Substituído por `translationKey` |
| `author` | Autor legado (string livre) | Substituído por `authorId` |

## 9. Funcionalidades ainda não implementadas

- Remoção de `slugEs` (após migração total)
- Nova rota canônica `/publicacoes/<slug>/`
- Páginas públicas de tópicos
- Páginas públicas e templates de hubs individuais
- Conexão dos hubs ao navbar
- Conexão dos hubs ao sitemap
- Breadcrumbs baseados em `primaryHub`
- Migração dos drafts (14 stubs)
- Obrigatoriedade geral de metadados editoriais

## 10. Regras para futuras mudanças

- Hubs editoriais **não devem** ser duplicados como tópicos.
- `guideType` **não deve** virar tópico (é formato/subtipo).
- Recursos (Ferramentas, Bônus) **não são** hubs editoriais.
- O registro `editorialHubs.ts` é a **única fonte de verdade** para IDs de hubs.
- O registro `editorialTopics.ts` é a **única fonte de verdade** para IDs de tópicos.
- Nenhum ID deve ser duplicado manualmente no schema — usar `z.custom()` com `refine`.
- A validação runtime contra o registro é obrigatória (não apenas type-level).
- Mudanças de rota devem ser acompanhadas de redirect 308.
- Conteúdo sem tradução não deve gerar hreflang falso.

## 11. Sequência prevista de evolução

1. Tornar `primaryHub` obrigatório para publicações publicadas ✅
2. Implementar `relatedHubs` no schema ✅
3. Conectar `topics` ao schema (validação runtime) ✅
4. Migrar `topics` nas 8 publicações publicadas ✅
5. Implementar `translationKey` e migrar pares PT/ES ✅
6. Registro institucional de autoria (`editorialAuthors.ts`) ✅
7. Migrar 8 publicações com `authorId: radar-digital` ✅
8. Corrigir JSON-LD do autor para `Organization` ✅
9. (pendente) Remover `slugEs` dos conteúdos e schema
10. Criar rota `/publicacoes/<slug>/` com redirects
7. Criar páginas de hubs (templates)
8. Atualizar navbar com nova estrutura de navegação
9. Atualizar sitemap para incluir hubs
10. Migrar breadcrumbs para usar `primaryHub`
11. Migrar drafts completando metadados editoriais
