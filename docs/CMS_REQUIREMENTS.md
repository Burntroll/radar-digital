# Levantamento de Requisitos para Decisão sobre CMS

> **Propósito:** Reunir a base factual para a futura decisão sobre CMS. Este documento
> não contém escolha, recomendação ou comparação de plataformas. As seções 1 a 8
> documentam o estado atual e as necessidades editoriais confirmadas ou pendentes.
> A seção 9 registra os critérios objetivos para a comparação futura (task 4.2).
>
> **Última atualização:** 13/07/2026 — auditoria inicial (task 4.1)

---

## 1. Escopo

Este documento reúne requisitos editoriais para a futura decisão sobre CMS
do Radar Digital. Ele **não contém**:

- Escolha ou recomendação de plataforma;
- Comparação entre WordPress, Payload, Content Collections ou alternativas;
- Prova de conceito;
- Estimativas de custo ou prazo de migração;
- Decisão sobre qual solução adotar.

Todo conteúdo aqui é baseado em evidências do repositório e da documentação
existente em `docs/`. Lacunas estão explicitamente marcadas como pendentes de
decisão estratégica por Francisco ou pela equipe editorial.

---

## 2. Estado Editorial Atual

### 2.1 Onde o conteúdo é criado e editado

O conteúdo é criado/alterado como arquivos **Markdown (.md)** em:

```
src/content/artigos/<categoria>/<slug>.md
```

As categorias são diretórios: `marketing-digital/`, `inteligencia-artificial/`,
`monetizacao/`. Cada arquivo contém frontmatter YAML seguido do corpo em
Markdown. A edição é feita diretamente no sistema de arquivos por meio de
um editor de código (IDE/VS Code) — não há interface visual de edição.

### 2.2 Validação de frontmatter

O frontmatter é validado pelo **Zod schema** definido em
`src/content/config.ts` (collection `artigos`). A validação inclui:

- Tipos nativos (string, boolean, array, etc.);
- Campos validados contra registros centrais via `z.custom()`:
  - `primaryHub` → `editorialHubs.ts`
  - `relatedHubs` → `editorialHubs.ts`
  - `topics` → `editorialTopics.ts`
  - `contentType` → `editorialFormats.ts`
  - `authorId` → `editorialAuthors.ts`
- Validação cross-field via `.superRefine()`:
  - `draft: false` → `primaryHub` obrigatório
  - `draft: false` → `topics` obrigatório (1-5)
  - `draft: false` → `authorId` obrigatório
  - `relatedHubs` exige `primaryHub`, 1-3 itens, ≠ primaryHub
  - `sources`: 1-20 itens, URL HTTP/HTTPS, sem duplicatas
- Validação global em runtime via `validatePublishedTranslationGroups()`:
  - Impede locale duplicado por `translationKey`
  - Impede grupo órfão (apenas 1 locale publicado)

**A validação é materializada durante `npm run build`.** `npm run check`
(`astro check`) valida TypeScript/Astro types, mas **não** valida os dados
das Content Collections. O build rejeita dados inválidos com mensagem
clara e falha o CI.

### 2.3 Controle de drafts

O campo `draft: boolean` (default `true`) controla o estado de cada artigo:

- `draft: true`: o artigo **não aparece** nas listagens e **não gera página**.
  O build não valida metadados editoriais obrigatórios para drafts.
- `draft: false`: o artigo **gera página estática**, aparece nas listagens,
  **exige** `primaryHub`, `topics` e `authorId`.

`getStaticPaths()` nos templates de artigos filtra `data.draft === false`
— drafts são excluídos da geração de páginas. O Astro descobre arquivos
`.md` mesmo com `draft: true`, mas eles não entram na rota.

Drafts **não** têm interface visual separada, preview ou agendamento.

### 2.4 Associação PT-BR e ES

A associação entre versões é feita pelo campo `translationKey`:

- String kebab-case compartilhada entre pares PT e ES
- Exemplo: `email-marketing-roi` para o artigo de Email Marketing em PT e ES
- A validação global exige **pelo menos 2 locales publicados** por chave
- `slugEs` permanece como campo legado, mas os templates não dependem mais dele
- `getPublishedTranslationGroup()` resolve alternates hreflang a partir das
  entradas reais da collection

**Estrutura de locales:**
- PT-BR: raiz (`/artigos/<slug>/`)
- ES: prefixo `/es/articulos/<slug>/`
- EN, VI, ZH-CN: configurados mas desativados (`enabled: false`)

### 2.5 Metadados editoriais

| Campo | Drafts | Publicados | Validação |
|-------|--------|------------|-----------|
| `primaryHub` | Opcional | **Obrigatório** | Contra `editorialHubs.ts` |
| `relatedHubs` | Opcional | Opcional (requer primaryHub) | 1-3 hubs, ≠ primaryHub |
| `topics` | Opcional | **Obrigatório** | 1-5, contra `editorialTopics.ts` |
| `contentType` | Default `article` | Default `article` | Contra `editorialFormats.ts` |
| `authorId` | Opcional | **Obrigatório** | Contra `editorialAuthors.ts` |
| `sources` | Opcional | Opcional | 1-20, URL obrigatória |
| `translationKey` | Opcional | Opcional (se traduzido) | kebab-case, 3-64 chars |

### 2.6 Distribuição editorial

Atualmente implementada em duas páginas:

1. **Marketing Digital** (`/marketing-digital/`): filtra por
   `matchesPublishedPrimaryHub(data, { primaryHub: 'digital-marketing', locale })`
2. **Inteligência Artificial** (`/inteligencia-artificial/`): filtra por
   `matchesPublishedEditorialHub(data, { hub: 'artificial-intelligence', locale })`
   — considera tanto `primaryHub` quanto `relatedHubs`
3. **Monetização** (`/monetizacao/`): ainda usa o campo legado `categoria`

Guias (`contentType: 'guide'`) são excluídos das listagens por regra
própria (`data.contentType !== 'guide'`).

### 2.7 Pipeline de publicação (Git → CI → Vercel)

```
Edição local (.md)
  → git add + git commit
    → git push origin master
      → GitHub Actions (quality-check.yml)
        → npm ci
          → npm run check (valida TS/Astro types)
            → npm run build (valida dados da collection + gera HTML)
              → Vercel deploy (produção)
```

O fluxo não tem:
- Branch de staging ou PR intermediário
- Etapa de revisão humana entre push e publicação
- Agendamento temporal
- Preview editorial antes do merge
- Publicação seletiva (tudo que está em `master` é publicado)

### 2.8 Histórico e rollback

- **Histórico:** todo o conteúdo é versionado no Git. Cada alteração gera
  um commit com SHA. O GitHub mantém o histórico completo.
- **Rollback:** `git revert <SHA>` + push para master. O deploy da Vercel
  reflete o commit do topo de master.
- **Comparação entre versões:** `git diff` entre SHAs.
- **Não há:** interface visual de histórico, diff do conteúdo, auditoria
  de alterações fora do Git, ou comparação entre versões de draft/publicado.

---

## 3. Inventário de Atores e Papéis

| Ator | Status | Evidência |
|------|--------|-----------|
| **Autor institucional** | `radar-digital` (Organization) | `editorialAuthors.ts` — único registro |
| **Revisor (`reviewerId`)** | **Ausente** — adiado ao Bloco 10 | `docs/DECISIONS.md` |
| **Fluxo formal de revisão** | **Ausente** — não definido | `docs/DECISIONS.md` |
| **Disclosure editorial/comercial** | **Ausente** — adiado ao Bloco 10 | `docs/DECISIONS.md` |
| **Permissões editoriais diferenciadas** | **Ausentes** — não definidas | Repositório: único contribuidor |

**Não há evidência no repositório de:**
- Múltiplos autores registrados
- Revisores ou editores
- Administradores do CMS
- Tamanho atual ou projetado de equipe

> **Nota:** O único committer identificado nos commits é
> `Burntroll <fco.silva.dev@gmail.com>` (Francisco). Não há como inferir
> se Francisco será o único editor ou se haverá equipe futura — essa
> decisão está pendente.

---

## 4. Matriz de Requisitos

### Convenção

| Valor | Significado |
|-------|-------------|
| **Nativo** | O Astro Content Collection schema suporta nativamente ou com configuração trivial |
| **Git/CI/Vercel** | Resolvido pelo fluxo Git → GitHub Actions → Vercel |
| **Ausente** | Não existe no modelo atual |
| **Não confirmado** | Pode ou não ser necessário — depende de decisão editorial |
| **Parcial** | Existe de forma limitada ou não produtiva |

### 4.1 Criação e Edição

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Criar novo artigo | Editor de código + arquivo .md | Git/CI/Vercel | Necessária | Conteúdo em `src/content/artigos/` | Sem interface visual |
| Editar artigo existente | Editor de código | Git/CI/Vercel | Necessária | Histórico de commits | Sem preview visual |
| Interface visual de edição | **Ausente** | Ausente | Depende de decisão | Inexistente | Pergunta 1 |
| WYSIWYG / rich text | **Ausente** | Ausente | Depende de decisão | Inexistente | Pergunta 2 |
| Edição mobile | **Ausente** | Ausente | Depende de decisão | Inexistente | Pergunta 11 |

### 4.2 Drafts

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Rascunho privado | `draft: boolean` | Nativo | Necessária | Schema: `draft: z.boolean().default(true)` | Drafts não geram página |
| Draft não validado editorialmente | Metadados opcionais em drafts | Nativo | Necessária | Schema: `primaryHub` optional se draft | Drafts pulam validação |
| Draft salvo sem build | Alteração local + git (sem push) | Git/CI/Vercel | Necessária | Fluxo Git sem push | Sem preview público |
| Draft versionado | Git | Git/CI/Vercel | Necessária | Commits locais | |
| Listagem de drafts | **Ausente** (drafts visíveis no FS) | Ausente | Provável | ROADMAP.md pendências | Sem interface |

### 4.3 Revisão e Aprovação

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Revisor designado | **Ausente** | Ausente | Depende de decisão | Adiado ao Bloco 10 | Pergunta 5 |
| Fluxo de aprovação antes de publicar | **Ausente** | Ausente | Depende de decisão | Adiado ao Bloco 10 | Pergunta 5 |
| Notificação de revisão pendente | **Ausente** | Ausente | Depende de decisão | Inexistente | Pergunta 5 |
| Histórico de revisões | Git | Git/CI/Vercel | Necessária | Commits | Sem interface visual |

### 4.4 Permissões e Usuários

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Papéis editoriais (autor, revisor, admin) | **Ausente** | Ausente | Depende de decisão | Inexistente | Pergunta 3 |
| Autenticação | **Ausente** | Ausente | Depende de decisão | Inexistente | |
| Permissão granular por collection | **Ausente** | Ausente | Futura | Inexistente | |

### 4.5 Agendamento

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Publicar em data futura | **Ausente** | Ausente | Depende de decisão | Inexistente | Pergunta 6 |
| Publicar em horário específico | **Ausente** | Ausente | Futura | Inexistente | |
| Rascunho programado | **Ausente** | Ausente | Futura | Inexistente | |

### 4.6 Preview

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Preview antes do push | Build local (`npm run build`) | Nativo | Necessária | Fluxo de desenvolvimento | Requer CLI + build local |
| Preview via link compartilhável | **Ausente** (só após deploy) | Ausente | Depende de decisão | Inexistente | |
| Preview de draft | **Ausente** | Ausente | Provável | Drafts não geram HTML | Pergunta 14 |
| Preview de conteúdo não commitado | **Ausente** | Ausente | Futura | Inexistente | |

### 4.7 Mídia e Imagens

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Campo `image` no schema | `image: z.string().optional()` | Nativo | Necessária | Schema | Apenas URL string |
| Upload de imagens integrado | **Ausente** | Ausente | Depende de decisão | Inexistente | Pergunta 9 |
| Biblioteca central de mídia | **Ausente** | Ausente | Depende de decisão | Inexistente | Pergunta 9 |
| Otimização de imagens | **Ausente** | Ausente | Futura | Pendência em PROGRESSO.md | WebP/AVIF |
| Redimensionamento automático | **Ausente** | Ausente | Futura | Inexistente | |

### 4.8 Taxonomias e Metadados

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Hubs editoriais controlados | `editorialHubs.ts` | Nativo | Necessária | Registro central com tipos derivados | 17 hubs, 3 active |
| Tópicos controlados | `editorialTopics.ts` | Nativo | Necessária | Registro central conectado ao schema | 6 tópicos |
| Formatos editoriais controlados | `editorialFormats.ts` | Nativo | Necessária | 7 formatos, 2 active | |
| `primaryHub` e `relatedHubs` | Schema + distribuição | Nativo | Necessária | Pilotos ativos | |
| `topics` | Schema + validação | Nativo | Necessária | Migrado em 8 publicações | |
| Categorização legada (`categoria`) | Preservado temporariamente | Nativo | Necessária (transição) | Campo legado | Será removido |

### 4.9 Autoria

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Autor institucional único | `radar-digital` (Organization) | Nativo | Necessária | `editorialAuthors.ts` | |
| Múltiplos autores registrados | Suportado pelo schema, não populado | Nativo | Provável | `editorialAuthors.ts` suporta `person` | |
| Byline individual visível | **Ausente** | Ausente | Provável | DECISIONS.md | |
| Página de autor | **Ausente** | Ausente | Futura | DECISIONS.md | |

### 4.10 Fontes

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Fontes estruturadas | `sources` no schema | Nativo | Necessária | 8 publicações migradas | Metadata interna |
| Validação de fontes | Zod schema | Nativo | Necessária | 6 regras de validação | |
| Exibição pública de fontes | **Ausente** | Ausente | Futura | Adiado | |
| `citation` no JSON-LD | **Ausente** | Ausente | Futura | Adiado | |

### 4.11 Disclosures

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Disclosure editorial/comercial | **Ausente** | Ausente | Depende de decisão | Adiado ao Bloco 10 | Pergunta 5 |

### 4.12 Traduções e Associação entre Locales

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Associação PT-ES por chave estável | `translationKey` | Nativo | Necessária | 4 pares migrados | |
| Validação de grupos de tradução | `validatePublishedTranslationGroups()` | Nativo | Necessária | Build falha se grupo órfão | |
| hreflang automático | `getPublishedTranslationGroup()` nos templates | Nativo | Necessária | HTML gerado com alternates | |
| Interface para associar traduções | **Ausente** | Ausente | Depende de decisão | Inexistente | Pergunta 7 |
| Locais futuros (EN, VI, ZH-CN) | Configurados, `enabled: false` | Nativo | Futura | `i18n/config.ts` | Estrutura pronta |
| Paridade PT/ES de fontes | **Ausente** | Ausente | Futura | Adiado | |

### 4.13 Validação de Campos

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Validação contra registros centrais | Zod schema + `z.custom()` | Nativo | Necessária | 4 registros centrais | |
| Validação cross-field | `.superRefine()` | Nativo | Necessária | Schema | |
| Validação global entre entradas | `validatePublishedTranslationGroups()` | Nativo | Necessária | Build | |
| Mensagens de erro claras | Sim | Nativo | Necessária | Schema documentado | |

### 4.14 SEO Editorial

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| JSON-LD Article | Template gera | Nativo | Necessária | HTML verificado | |
| JSON-LD BreadcrumbList | Todas as páginas | Nativo | Necessária | HTML verificado | |
| JSON-LD WebSite | Homes | Nativo | Necessária | HTML verificado | |
| canonical | Por template | Nativo | Necessária | HTML verificado | |
| hreflang | Alternates por translation group | Nativo | Necessária | HTML verificado | |
| Campo `image` para JSON-LD | String opcional | Nativo | Necessária | Schema | Sem upload integrado |

### 4.15 Histórico e Versionamento

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Versionamento de conteúdo | Git | Git/CI/Vercel | Necessária | Repositório completo | |
| Diff entre versões | `git diff` | Git/CI/Vercel | Necessária | CLI | Sem interface visual |
| Atribuição de alterações | Commits com autor | Git/CI/Vercel | Necessária | Git log | |

### 4.16 Rollback

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Reverter publicação | `git revert` + push | Git/CI/Vercel | Necessária | Fluxo Git | Requer CLI |
| Reverter conteúdo editado | `git checkout` anterior | Git/CI/Vercel | Necessária | Fluxo Git | Requer CLI |
| Rollback com um clique | **Ausente** | Ausente | Depende de decisão | Inexistente | |

### 4.17 Publicação

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Publicar diretamente | `git push origin master` | Git/CI/Vercel | Necessária | Fluxo atual | |
| Publicação sem CLI | **Ausente** | Ausente | Depende de decisão | Inexistente | |
| Publicação de conteúdo específico | Tudo em master é publicado | Git/CI/Vercel | Necessária (atual) | Workflow push | Pode mudar |

### 4.18 Integração com CI e Deployment

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| CI automático no push | GitHub Actions (`quality-check.yml`) | Git/CI/Vercel | Necessária | Workflow ativo | |
| Build falha em dados inválidos | `npm run build` falha | Git/CI/Vercel | Necessária | Schema + CI | |
| Deploy automático | Vercel integrada | Git/CI/Vercel | Necessária | Deployments confirmados | |
| Preview deploy por PR | **Ausente** | Ausente | Provável | PR não usado | |

### 4.19 Importação e Exportação

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Exportar conteúdo | Git clone | Git/CI/Vercel | Necessária | Repositório público | |
| Importar conteúdo batch | Copiar arquivos .md | Git/CI/Vercel | Necessária | Conteúdo existente | Sem validação visual |
| Migração de CMS externo | **Nunca feita** | Ausente | Futura | Inexistente | Não há CMS anterior |

### 4.20 Backup

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Backup do conteúdo | Git (GitHub remoto) | Git/CI/Vercel | Necessária | Repositório remoto | |
| Backup do banco de dados | **Não aplicável** — sem banco | Ausente | — | Conteúdo em arquivos | |
| Backup automático periódico | **Ausente** | Ausente | Futura | Inexistente | Git já cobre |

### 4.21 Portabilidade e Lock-in

| Necessidade | Estado atual | Suporte atual | Prioridade | Evidência | Observação |
|-------------|-------------|---------------|-----------|-----------|------------|
| Conteúdo em formato aberto | Markdown + YAML | Nativo | Necessária | Todos os arquivos .md | |
| Schema em código | TypeScript (Zod) | Nativo | Necessária | `config.ts` | |
| Taxonomia em código | TypeScript (`as const`) | Nativo | Necessária | 4 registros centrais | |
| Dependência de plataforma Astro | Content Collections | Nativo | Necessária | Arquitetura atual | Migração de CMS exigiria reescrever |

---

## 5. Capacidades Atuais que Não Devem Ser Perdidas

Uma eventual solução futura precisaria preservar os seguintes contratos:

| Contrato | Estado atual | Evidência |
|----------|-------------|-----------|
| PT-BR na raiz (`/artigos/<slug>/`) | Implementado | `i18n/config.ts` + `i18n/routes.ts` |
| ES em `/es/articulos/<slug>/` | Implementado | `src/pages/es/articulos/[...slug].astro` |
| Locales futuros desativados (EN, VI, ZH-CN) | Configurados, `enabled: false` | `i18n/config.ts` |
| `translationKey` baseado em traduções reais | Implementado + validado | `editorialTranslations.ts` |
| `primaryHub` | Schema + distribuição | `config.ts` + `editorialDistribution.ts` |
| `relatedHubs` | Schema + distribuição secundária | `config.ts` + `editorialDistribution.ts` |
| `topics` controlados | Schema + validação | `editorialTopics.ts` + `config.ts` |
| Formatos editoriais controlados (`contentType`) | Schema + registro central | `editorialFormats.ts` |
| `authorId` | Schema + registro central | `editorialAuthors.ts` |
| `sources` estruturadas | Schema + validação | `config.ts` |
| Draft | `draft: boolean` | Schema |
| Uma publicação = uma URL canônica | Rotas atuais | `[...slug].astro` |
| Validação durante o build | `npm run build` falha em dados inválidos | Workflow |
| canonical, hreflang e x-default | Gerado nos templates | `[...slug].astro` |
| GitHub Actions (CI) | `quality-check.yml` | Workflow |
| Preview e deploy na Vercel | CI → deploy automático | Deployments |
| Histórico e rollback do Git | Commits + revert | Repositório |
| Zod schema tipado para frontmatter | `config.ts` | Schema |
| Registros centrais com tipos derivados | 4 arquivos `editorial*.ts` | Código |
| Separação entre collections editoriais e comerciais | `artigos` vs outras collections | `config.ts` |
| Distribuição editorial por hub | `matchesPublishedPrimaryHub` + `matchesPublishedEditorialHub` | `editorialDistribution.ts` |
| JSON-LD (Article, BreadcrumbList, WebSite) | Gerado nos layouts | Templates |
| redirects server-side (Vercel) | `vercel.json` | Config |

---

## 6. Lacunas Confirmadas

As lacunas abaixo são **demonstráveis** — existem no repositório e não exigem
interpretação. Cada lacuna está acompanhada da evidência correspondente.

### 6.1 Interface visual para edição

**Evidência:** Não existe interface visual. Todo conteúdo é Markdown editado
em editor de código. Não há formulário, rich text, preview visual ao vivo
ou upload integrado de imagens.

**Impacto:** Edição requer conhecimento técnico (Git, CLI, frontmatter YAML).
Barreira para editores não técnicos.

### 6.2 Fluxo formal de revisão

**Evidência:** `reviewerId` adiado ao Bloco 10 (`docs/DECISIONS.md`).
Não há campo de revisor, nem etapa de aprovação entre edição e publicação.
Push em master = publicação imediata.

**Impacto:** Conteúdo publicado sem revisão por segundo par. Sem trilha de
quem aprovou ou revisou cada publicação.

### 6.3 Permissões por papel

**Evidência:** Não há autenticação, login, papéis ou permissões. O único
controle é o acesso ao repositório GitHub.

**Impacto:** Qualquer pessoa com push access ao repositório pode publicar
diretamente. Sem diferenciação entre autor, revisor e administrador.

### 6.4 Agendamento editorial

**Evidência:** Não há campo de data de publicação futura, fila de
publicação, ou mecanismo de publish schedule. `draft: false` + push
publica imediatamente.

**Impacto:** Publicação depende de push manual no momento desejado.

### 6.5 Biblioteca central de mídia

**Evidência:** Campo `image: z.string().optional()` aceita URL string.
Não há upload, storage, otimização ou biblioteca de imagens integradas.

**Impacto:** Imagens precisam ser hospedadas externamente e referenciadas
por URL. Sem gestão centralizada.

### 6.6 Preview editorial antes do merge

**Evidência:** Não há PR workflow. Opções atuais: (a) build local
(`npm run build`) ou (b) deploy (push para master). Não há preview
intermediário.

**Impacto:** Editor não consegue ver o conteúdo renderizado antes de
publicar, a menos que execute build local.

### 6.7 Colaboração simultânea

**Evidência:** Git não foi projetado para edição simultânea do mesmo
arquivo. Edição concorrente gera merge conflicts.

**Impacto:** Dois editores não podem alterar o mesmo artigo ao mesmo tempo
sem risco de conflito.

### 6.8 Auditoria de alterações fora do Git

**Evidência:** Não há log de auditoria além do Git. Não há registro de
quem visualizou, editou sem commit, ou exportou conteúdo.

**Impacto:** Alterações locais não commitadas não são rastreáveis.

### 6.9 Associação operacional de traduções

**Evidência:** `translationKey` exige edição manual do YAML nos dois
arquivos (PT e ES). Não há interface para criar ou gerenciar pares de
tradução.

**Impacto:** Associar traduções exige conhecimento do schema e edição
manual de frontmatter. Risco de erros de digitação na chave.

### 6.10 Facilidade de uso para pessoas não técnicas

**Evidência:** Todo o fluxo editorial requer: editor de código, Git CLI,
conhecimento de YAML frontmatter, schema Zod, tipos TypeScript, build
CLI, push via terminal.

**Impacto:** Inviável para editores sem background técnico. Restringe
quem pode produzir conteúdo.

---

## 7. Perguntas Estratégicas Pendentes

As respostas para estas perguntas são necessárias **antes** da comparação
de alternativas de CMS (task 4.2). As perguntas estão numeradas para
referência cruzada com a matriz de requisitos.

| # | Pergunta | Impacto na decisão |
|---|----------|-------------------|
| 1 | Quantas pessoas editarão o portal? (1, 2-5, 6+) | Determina necessidade de multiusuário, permissões e colaboração |
| 2 | Qual o nível técnico dessas pessoas? (dev, tech-savvy, não técnico) | Determina necessidade de interface visual vs. Git-based |
| 3 | Existe necessidade real de papéis e permissões (autor, revisor, admin)? | Determina complexidade do modelo de usuários |
| 4 | Existe necessidade de aprovação antes de publicar? | Determina necessidade de workflow de revisão |
| 5 | Qual a frequência de publicação esperada? (semanal, diária, múltiplas/dia) | Determina necessidade de automação e agendamento |
| 6 | Existe necessidade de agendar publicações para data/hora futura? | Determina necessidade de publish schedule |
| 7 | Quem produzirá as traduções (PT→ES)? O mesmo autor, tradutor dedicado, ou IA? | Determina workflow de tradução |
| 8 | Como versões PT/ES serão revisadas? Juntas, separadas, por pessoas diferentes? | Determina workflow de revisão multilíngue |
| 9 | Qual o volume e fluxo esperado de imagens? (poucas, muitas, com otimização?) | Determina necessidade de DAM/mídia |
| 10 | Existe necessidade de edição pelo celular? | Determina necessidade de mobile-first/ui responsiva |
| 11 | Existe necessidade de colaboração simultânea (dois editores no mesmo artigo)? | Determina necessidade de real-time collaboration ou locking |
| 12 | Qual a tolerância a custos mensais recorrentes? (gratuito, baixo, moderado) | Filtra opções por modelo de precificação |
| 13 | Quem será responsável pela manutenção e segurança da infraestrutura? | Determina SaaS vs self-hosted |
| 14 | É importante manter todo o conteúdo versionado no Git (Git-centric)? | Determina compatibilidade com Git-based vs database CMS |
| 15 | Existe necessidade de preview visual sem intervenção técnica? | Determina necessidade de preview environments |

> **Instrução:** Estas perguntas devem ser respondidas por Francisco ou
> pela equipe editorial antes de qualquer comparação de plataformas.
> Não responda estas perguntas neste documento. Elas serão usadas como
> entrada na task 4.2.

---

## 8. Critérios para a Futura Comparação (task 4.2)

Os critérios abaixo são objetivos e serão usados na comparação de
alternativas na task 4.2. Nenhuma ferramenta é comparada neste documento.

| Critério | Descrição | O que avaliar |
|----------|-----------|---------------|
| **Aderência ao modelo editorial** | Capacidade de representar hubs, tópicos, formatos, autores, fontes | Suporte a taxonomias customizadas, campos controlados, validação |
| **Experiência editorial** | Interface de edição adequada ao perfil da equipe | WYSIWYG, formulários, preview, facilidade de uso |
| **Permissões** | Controle de acesso por papel | Autenticação, papéis, permissão por collection/campo |
| **Revisão** | Workflow de aprovação antes da publicação | Draft → review → publish, notificações, histórico |
| **Tradução** | Suporte a conteúdo multilíngue com associação entre locales | Pares de tradução, interface de associação, validação de paridade |
| **Preview** | Visualização do conteúdo renderizado antes da publicação | Preview por link, preview de draft, preview de conteúdo não publicado |
| **Mídia** | Gestão de imagens e arquivos | Upload, storage, otimização, biblioteca central |
| **Integração Astro** | Compatibilidade com o framework e o build estático atual | Geração SSG, Content Collections, Zod schema, rotas |
| **Validação tipada** | Capacidade de validar campos contra registros controlados | Schema tipado, validação runtime, mensagens de erro |
| **Portabilidade** | Facilidade de migrar conteúdo para fora da plataforma | Formato aberto (Markdown + YAML), exportação, sem lock-in |
| **Segurança** | Postura de segurança da plataforma | Autenticação, SSO, auditoria, patches, compliance |
| **Manutenção** | Esforço necessário para manter a solução rodando | Updates, backup, monitoramento, suporte |
| **Custo** | Custo total de propriedade | Licenciamento, hospedagem, add-ons, equipe |
| **Complexidade operacional** | Curva de aprendizado e esforço operacional diário | Setup, daily ops, troubleshooting, documentação |
| **Backup e rollback** | Capacidade de recuperar conteúdo e reverter publicações | Snapshots, restore, versionamento |
| **Risco de lock-in** | Dependência de plataforma proprietária ou formato proprietário | Exportação padrão, API aberta, ausência de vendor lock-in |
| **Adoção gradual** | Possibilidade de migrar conteúdo aos poucos, sem big bang | Dual publication, importação incremental, coexistência |
| **Manter Content Collections** | Possibilidade de continuar usando Astro Content Collections como fonte primária | Compatibilidade com Astro 4+, SSG |

---

## 9. Riscos de Decisão Prematura

Com base no estado atual do projeto, os seguintes riscos foram identificados
caso uma decisão sobre CMS seja tomada antes de responder às perguntas
estratégicas da seção 7:

### 9.1 Superdimensionamento

Sem saber quantas pessoas editarão o portal (pergunta 1) e o nível técnico
delas (pergunta 2), há risco de escolher uma solução corporativa pesada
(com custos, complexidade operacional e infraestrutura desnecessários)
para um projeto que pode continuar sendo editorialmente tocado por uma
única pessoa técnica.

### 9.2 Subdimensionamento

Inversamente, assumir que o modelo atual (Git + editor de código) é
suficiente pode bloquear o crescimento se a equipe editorial crescer
e incluir pessoas não técnicas.

### 9.3 Lock-in prematuro

Migrar conteúdo do formato atual (Markdown + YAML no Git) para um CMS
proprietário pode criar dependência de plataforma antes que o modelo
editorial esteja maduro. O Bloco 10 (disclosure, política editorial)
ainda não foi definido.

### 9.4 Custo operacional

Qualquer CMS adiciona custo de manutenção (atualizações, segurança,
backup, uptime) que o modelo atual (GitHub + Vercel) praticamente não
tem. Adotar um CMS antes de entender o custo tolerável (pergunta 12)
e a responsabilidade pela manutenção (pergunta 13) pode criar despesa
recorrente inesperada.

### 9.5 Complexidade sem ganho

O modelo editorial atual (Zod schema + 4 registros centrais + validação
runtime) já representa contratos editoriais rigorosos. Um CMS que não
seja capaz de reproduzir esses contratos (primaryHub condicional, grupos
de tradução, validação cross-field) representaria retrocesso na
qualidade dos dados editoriais.

### 9.6 Perda de portabilidade

O formato atual (Markdown + YAML + Git) é o formato mais portável
possível — qualquer sistema consegue ler e exportar isso. Migrar para
um CMS que armazene conteúdo em banco de dados proprietário reduziria
essa portabilidade.

---

## 10. Veredito da Auditoria

**Task 4.1: Concluída**

O levantamento factual está completo nos seguintes aspectos:

1. ✅ O fluxo editorial atual está documentado em detalhes (seção 2)
2. ✅ O inventário de atores e papéis reflete exatamente o que existe no
   repositório, sem invenções (seção 3)
3. ✅ A matriz de requisitos cobre 21 dimensões editoriais com estado
   atual, suporte, prioridade e evidência (seção 4)
4. ✅ As capacidades a preservar estão listadas com 22 contratos
   confirmados (seção 5)
5. ✅ As lacunas confirmadas são demonstráveis e baseadas em evidência
   (seção 6)
6. ✅ As perguntas estratégicas (seção 7) estão claramente registradas
   para Francisco responder
7. ✅ Os critérios de comparação (seção 8) estão definidos para a task 4.2
8. ✅ Os riscos de decisão prematura estão explicitados (seção 9)

**O que impede a task 4.2 de começar imediatamente:**

A ausência de respostas para as perguntas da seção 7 **não** é uma falha
desta auditoria — é o resultado esperado. O objetivo da task 4.1 era
produzir a base factual, não responder as perguntas estratégicas. A
task 4.2 só deve começar após Francisco responder às perguntas 1 a 15,
pois sem essas respostas qualquer comparação de CMS seria especulativa.
