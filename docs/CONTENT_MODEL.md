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
| `slugEs` | Link PT→ES | Será substituído por `translationKey` |

## 9. Funcionalidades ainda não implementadas

- `translationKey` (substituir `slugEs`)
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
5. Implementar `translationKey` e migrar de `slugEs`
6. Criar rota `/publicacoes/<slug>/` com redirects
7. Criar páginas de hubs (templates)
8. Atualizar navbar com nova estrutura de navegação
9. Atualizar sitemap para incluir hubs
10. Migrar breadcrumbs para usar `primaryHub`
11. Migrar drafts completando metadados editoriais
