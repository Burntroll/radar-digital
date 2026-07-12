# Comparação de Opções de CMS — Radar Digital

> **Propósito:** Comparar factualmente quatro alternativas para gestão de
> conteúdo editorial do Radar Digital, usando como contrato os requisitos
> documentados em `docs/CMS_REQUIREMENTS.md` e o estado real do repositório.
>
> **Data da análise:** 13/07/2026
> **Alternativas comparadas:**
> 1. Manter Astro Content Collections + fluxo Git atual
> 2. WordPress Headless
> 3. Payload CMS
> 4. Sanity
>
> **Documentos usados como contrato:**
> - `docs/CMS_REQUIREMENTS.md` (requisitos e respostas estratégicas)
> - `docs/CONTENT_MODEL.md` (modelo editorial)
> - `docs/DECISIONS.md` (decisões arquiteturais)
> - `ROADMAP.md` (status do projeto)
> - Repositório real (código, schemas, conteúdos, CI, deploy)
>
> **Aviso:** Este documento **não contém escolha final** de CMS. Preços,
> planos e serviços cloud são informações temporais, registradas com data
> de acesso e contexto aplicável. Nenhuma plataforma é declarada vencedora
> ou recomendada.

---

## 1. Baseline Atual

### Capacidades implementadas

O sistema atual utiliza **Astro 4 + Content Collections** com:

| Capacidade | Implementação |
|-----------|--------------|
| Conteúdo | Markdown + YAML frontmatter em `src/content/artigos/<categoria>/` |
| Schema tipado | Zod schema com `.superRefine()` em `src/content/config.ts` |
| Validação runtime | `npm run build` rejeita dados inválidos com mensagens claras |
| Registros centrais | 4 arquivos `editorial*.ts` com tipos derivados (`as const`) |
| Hubs (`primaryHub`) | Campo obrigatório em publicados, validado contra registro |
| Hubs relacionados (`relatedHubs`) | Opcional, 1-3, ≠ primaryHub, exige primaryHub |
| Tópicos (`topics`) | Obrigatório em publicados, 1-5, contra registro |
| Formato (`contentType`) | Default `article`, contra `editorialFormats.ts` |
| Autor (`authorId`) | Obrigatório em publicados, contra `editorialAuthors.ts` |
| Fontes (`sources`) | Opcional, 1-20 itens estruturados com validação |
| Draft | `draft: boolean`, default true, drafts não geram página |
| PT-BR (raiz) | URL `/artigos/<slug>/` |
| ES (`/es/`) | URL `/es/articulos/<slug>/` |
| `translationKey` | Associação PT-ES por chave kebab-case compartilhada |
| hreflang | Automático via `getPublishedTranslationGroup()` |
| JSON-LD | Article, BreadcrumbList, WebSite |
| canonical | Por template |
| CI/CD | GitHub Actions → `npm ci` → `npm run check` → `npm run build` |
| Deploy | Vercel (automático via push em master) |
| Rollback | `git revert` + push |
| Histórico | Git (commits completos) |

### Lacunas já documentadas

| Lacuna | Status |
|--------|--------|
| Interface visual de edição | Ausente |
| Fluxo formal de revisão | Adiado ao Bloco 10 |
| Permissões por papel | Ausente |
| Agendamento editorial | Ausente |
| Biblioteca central de mídia | Ausente |
| Preview editorial antes do merge | Ausente |
| Colaboração simultânea | Eliminada (não é requisito) |
| Edição pelo celular | Eliminada (não é requisito) |
| Auditoria de alterações fora do Git | Ausente |
| Associação operacional de traduções | Ausente |
| Facilidade de uso para não técnicos | Ausente |

---

## 2. Alternativas Comparadas

### 2.1 Content Collections (continuidade)

Manter o modelo atual: Astro Content Collections com Zod schema, Git como
fonte de verdade, edição via IDE/Markdown e deploy via GitHub Actions + Vercel.
Não há introdução de CMS externo.

### 2.2 WordPress Headless

WordPress operado como headless CMS: conteúdo gerenciado via admin WordPress,
exposto via REST API (endpoints `/wp/v2/posts`, `/wp/v2/pages`, taxonomias
customizadas, campos customizados via ACF ou metaboxes). O frontend permanece
em Astro, consumindo a API. Requer instalação WordPress (self-hosted ou
WordPress.com), banco MySQL/MariaDB e servidor PHP.

### 2.3 Payload CMS

Payload é um CMS headless TypeScript-first, open-source (MIT), construído
sobre Next.js (ou Express). Schema definido em TypeScript, admin UI gerada
automaticamente, API REST/GraphQL. Pode ser self-hosted ou usar Payload Cloud.
Usa MongoDB como banco de dados padrão. Foi adquirido pela Figma em 2025.

### 2.4 Sanity

Sanity é uma plataforma gerenciada de conteúdo estruturado (SaaS). Oferece
Content Lake (banco de dados em tempo real), Sanity Studio (admin UI
customizável em React), GROQ como linguagem de consulta, e APIs HTTP.
Possui integração oficial com Astro via `@sanity/astro`. Planos Free e
Growth com pagamento por seat.

---

## 3. Critérios Eliminatórios

Avaliação de cada opção contra contratos mínimos que um CMS futuro precisaria
atender. Classificação:

- **Nativo** = suportado sem configuração adicional relevante
- **Config** = suportado com configuração (plugin, campo customizado, ajuste)
- **Desenv** = requer desenvolvimento adicional significativo
- **Serviço** = depende de serviço externo (plugin pago, serviço cloud)
- **Não atende** = não suportado ou documentado como ausente
- **N/C** = não confirmado na documentação oficial

| Critério | Content Collections | WordPress Headless | Payload | Sanity |
|----------|-------------------|-------------------|---------|--------|
| Uma publicação = uma URL canônica | Nativo | Nativo | Nativo | Nativo |
| Reproduzir modelo editorial (hubs, tópicos, etc.) | Nativo | Config (CPT + ACF + taxonomias) | Nativo | Nativo (schema + references) |
| Associação real entre traduções | Nativo (`translationKey`) | Config (plugin ou desenvolvimento para multilíngue) | Nativo (localization nativa) | Nativo (base language + fields) |
| Exportação e portabilidade verificáveis | Nativo (Git + Markdown) | Config (export XML/WP-CLI) | Nativo (JSON + file export) | Nativo (export dataset CLI) |
| Histórico e rollback | Nativo (Git) | Config (post revisions) | Nativo (versions + drafts) | Nativo (history + draft) |
| Integração com Astro | Nativo (mesmo framework) | Config (REST API fetch) | Config (REST/GraphQL fetch) | Nativo (`@sanity/astro`) |
| Não exigir alteração imediata de rotas públicas | Nativo (mesmas rotas) | Config (rotas paralelas) | Config (rotas paralelas) | Config (rotas paralelas) |
| Preview visual por link (cenário B) | Desenv (Vercel preview deploys) | Serviço (preview via plugin ou hosting) | Nativo (Live Preview) | Nativo (Visual Editing + Presentation) |
| Caminho para usuários não técnicos | Não atende (requer IDE + Git CLI) | Nativo (admin UI + block editor) | Nativo (admin UI gerada) | Nativo (Sanity Studio) |
| Operação de baixa manutenção | Nativo (GitHub + Vercel, sem server) | Serviço (WP hosting gerenciado) | Config (self-hosted requer manutenção) | Nativo (SaaS gerenciado) |
| Mecanismo de saída conhecido (sem lock-in) | Nativo (Markdown + Git) | Config (XML export + WP-CLI) | N/C (export documentado, mas depende do formato) | Nativo (`sanity dataset export`) |

---

## 4. Matriz Comparativa Principal

### 4.1 Modelo Editorial

| Aspecto | Content Collections | WordPress Headless | Payload | Sanity |
|---------|-------------------|-------------------|---------|--------|
| Campos estruturados | Zod schema tipado | ACF/meta fields (strings) | TypeScript schema | Schema JS/TS com tipos |
| Arrays e relações | Zod arrays + `translationKey` | Post meta + taxonomias | Relações nativas + arrays | References + arrays |
| Validações obrigatórias e condicionais | `.superRefine()` | PHP filters (plugin) | `validate` hooks + admin | Schema `validation` + custom |
| Enums e registros controlados | `z.custom()` + `as const` | Taxonomias customizadas + ACF choice | `select` fields com options | `select` + custom validators |
| `primaryHub` | `z.custom<EditorialHubId>()` | Campo ACF + taxonomy | `relationship` field | `reference` to hub doc |
| `relatedHubs` | Zod array com validação | Repetidor ACF | `relationship` array | `array` of references |
| `topics` | Zod array + `z.custom` | Taxonomia customizada | `relationship` array | `array` of references |
| `contentType` | `z.custom<EditorialFormatId>()` | Post type + taxonomy | `select` field | `select` field |
| `authorId` | `z.custom<EditorialAuthorId>()` | Usuário WP nativo | `relationship` to user/author | `reference` to author doc |
| `sources` | Zod array com sub-schema | Meta fields repetíveis | `array` of `group` fields | `array` of objects |
| Drafts | `draft: boolean` | `post_status: draft` | `_status` field | `draft` status nativo |
| `translationKey` | Chave manual no YAML | Plugin (WPML/Polylang) | Localization nativa | `baseLanguage` + field l10n |

### 4.2 Fluxo Editorial

| Aspecto | Content Collections | WordPress Headless | Payload | Sanity |
|---------|-------------------|-------------------|---------|--------|
| Experiência para não técnicos | ❌ (IDE + Git CLI) | ✅ (admin + block editor) | ✅ (admin UI) | ✅ (Sanity Studio) |
| Criação e edição | Markdown manual | Block editor / Classic | Admin UI formulário | Studio + Canvas (AI) |
| Revisão | Não há (só Git diff) | Plugin (ex: PublishPress) | `Publishing Workflows` (Enterprise) | Revisão por documento |
| Aprovação | Git PR (manual) | Plugin | Workflows Enterprise | N/C |
| Papéis e permissões | Acesso ao repositório | 6 papéis nativos (admin → subscriber) | Access Control granular | 2 (Free) a 5+ (Growth) roles |
| Agendamento | Não (push manual) | Nativo (`post_date` futuro) | N/C (possível via hooks) | Nativo (scheduled publishing) |
| Preview visual | Build local apenas | WP admin preview | Live Preview nativo | Visual Editing + Presentation |
| Histórico de revisões | Git commits | Post revisions nativo | Versions (draft/published) | Document history |
| Auditoria de alterações | Git log | Plugin (ex: Activity Log) | Versions + autosave | Dataset history |

### 4.3 Internacionalização

| Aspecto | Content Collections | WordPress Headless | Payload | Sanity |
|---------|-------------------|-------------------|---------|--------|
| PT-BR e ES | Implementado | Plugin (WPML/Polylang) | Localization nativa | Locale field + baseLanguage |
| Associação entre versões | `translationKey` manual | Plugin ou desenvolvimento (WPML, Polylang, etc.) | Campo localizado no mesmo doc | Field-level localization |
| Revisão independente por locale | Por arquivo separado | Por post separado | Por locale no mesmo doc | Por locale no mesmo doc |
| Idiomas futuros (EN, VI, ZH-CN) | Configurados (desativados) | Adicionar locale via plugin | Adicionar locale na config | Adicionar locale no schema |
| Risco de alternates falsos | Validação global (build) | Plugin-dependente | N/C | N/C |
| Preservar `translationKey` | ✅ Campo existente | Precisa de campo customizado | Não aplicável (localization nativa) | Não aplicável (locale field) |

### 4.4 Mídia

| Aspecto | Content Collections | WordPress Headless | Payload | Sanity |
|---------|-------------------|-------------------|---------|--------|
| Upload | Manual (git + path) | Nativo (media library) | Nativo (upload) | Nativo (Studio + Media Library) |
| Biblioteca | Não | ✅ Biblioteca integrada | ✅ Upload + Folders | ✅ Media Library (org) |
| Metadados e alt | Manual no YAML | Alt + caption nativos | Campos no upload | Campos customizáveis |
| Otimização | Não (pendente) | Plugins (Smush, etc.) | Plugins (sharp) | CDN transforms nativas |
| Armazenamento | Git (repositório) | WP uploads dir | Local/S3 | Sanity CDN |
| CDN | Vercel | Plugin CDN | Payload Cloud CDN | Sanity CDN nativa |
| Portabilidade dos arquivos | Git clone | WP-CLI export + download | Download via API | `sanity dataset export` |
| Custos adicionais | Nenhum (Git LFS se necessário) | Storage no hosting | Depende de storage | CDN + storage incluídos no plano |

### 4.5 Integração Técnica

| Aspecto | Content Collections | WordPress Headless | Payload | Sanity |
|---------|-------------------|-------------------|---------|--------|
| Integração com Astro | Concorrentes (mesmo processo) | Fetch REST API | Fetch REST/GraphQL | `@sanity/astro` oficial |
| Build estático | Nativo (SSG) | Possível via API (ISR/SSG) | Possível via API (ISR/SSG) | Nativo via `@sanity/astro` |
| Webhooks | Não | Nativo (wp-webhook) | Nativo (hooks) | Nativo (webhooks) |
| Preview na Vercel | Vercel Preview Deploys | Vercel + WP preview | Payload Live Preview | Sanity Presentation |
| CI | GitHub Actions nativo | CI + WP deploy | CI + rebuild | CI + webhook rebuild |
| Cache e invalidação | Vercel CDN | Vercel + WP | Payload Cloud | Sanity CDN |
| Comportamento em falha do CMS | N/A (arquivos locais) | Site offline se WP cair | Sem conteúdo se Payload cair | Sem conteúdo se Sanity cair |
| Desenvolvimento local | Astro dev server | WP local + Astro dev | Payload local + Astro dev | Sanity CLI + Astro dev |
| Tipagem TypeScript | Zod + tipos derivados | Tipos gerados via ACF? | Tipos gerados do schema | Tipos gerados (`sanity typegen`) |
| Validação durante o build | ✅ `npm run build` | Só no frontend (fetch) | Só no frontend (fetch) | Possível com validation |

### 4.6 Operação e Segurança

| Aspecto | Content Collections | WordPress Headless | Payload | Sanity |
|---------|-------------------|-------------------|---------|--------|
| Hosting | Vercel (serverless) | Self-hosted / WP hosting | Self-hosted / Payload Cloud | Sanity Cloud (SaaS) |
| Banco de dados | Nenhum (arquivos) | MySQL/MariaDB | MongoDB | Content Lake (SaaS) |
| Backups | Git (GitHub) | Plugin ou hosting | Payload Cloud / manual | Sanity gerenciado |
| Atualizações | Dependências npm | WP core + plugins | Payload releases | Gerenciado (SaaS) |
| Patches de segurança | Dependências npm | WP + plugin updates | Self-hosted ou gerenciado | Gerenciado (SaaS) |
| Autenticação | GitHub OAuth | WP users nativo | Payload auth | Sanity auth + SSO |
| Superfície de ataque | Mínima (static files) | Alta (PHP + MySQL) | Média (Node.js + MongoDB) | Mínima (SaaS, gerenciado) |
| Monitoramento | Vercel Analytics | Plugin/hosting | Payload Cloud / manual | Sanity dashboard |
| Responsabilidade operacional | Franciso (npm, Vercel) | Francisco + hosting | Francisco ou Payload Cloud | Sanity |

### 4.7 Portabilidade e Governança

| Aspecto | Content Collections | WordPress Headless | Payload | Sanity |
|---------|-------------------|-------------------|---------|--------|
| Exportação | Git clone (Markdown) | WP-CLI export XML | REST/GraphQL + file export | `sanity dataset export` |
| Formato dos dados exportados | Markdown + YAML | XML (WXR) | JSON | NDJSON (newline-delimited JSON) |
| Versionamento | Git (nativo, completo) | Post revisions (só conteúdo individual) | Versions (draft/published) | Document history |
| Rollback | `git revert` + push | Revisions + restore | Versions API | Document history |
| Migração de entrada | Copiar .md | WP-CLI import | REST API import | `sanity dataset import` |
| Migração de saída | Copiar .md para qualquer lugar | Plugin ou script | Sem mecanismo padronizado confirmado | `sanity dataset export` |
| Risco de lock-in | ✅ Nenhum (Git + Markdown) | ⚠️ Médio (dados em MySQL, plugins) | ⚠️ Médio (MongoDB, schema Payload) | ⚠️ Médio (Content Lake, GROQ) |
| Git como fonte de verdade | ✅ Sim | Parcial (código sim, conteúdo não) | Parcial (código + schema sim, conteúdo não) | Parcial (código sim, conteúdo não) |

### 4.8 Custos

Registrados com data de acesso: **13/07/2026**. Preços podem ter mudado.

| Componente | Content Collections | WordPress Headless | Payload | Sanity |
|------------|-------------------|-------------------|---------|--------|
| Custo mínimo (Cenário A) | Gratuito (Vercel Hobby + GitHub Free) | ~$0-10/mês (WordPress.com Free ou self-hosted básico) | $0 (self-hosted) + server cost (~$5-10/mês) | $0 (Free Plan: 10K docs, 2 datasets, 20 seats) |
| Fatores que aumentam custo | Nenhum (só npm dev) | Hosting, plugins pagos, manutenção | Payload Cloud, MongoDB Atlas, storage | Seats adicionais, datasets extras ($999), docs extras |
| Custo Cenário B | ~$20/mês (Vercel Pro + GitHub) | ~$25-100/mês (WP managed hosting) | Self-hosted ~$20-50/mês ou Payload Cloud (n/c) | 5 seats × $15 = $75/mês (Growth) + add-ons |
| Hosting | Incluído (Vercel) | Separado (WP hosting) | Self ou Cloud | Incluído (SaaS) |
| Banco | Nenhum | MySQL/MariaDB (no hosting) | MongoDB (Atlas ~$0-10/mês) | Incluído |
| Armazenamento | Git (GitHub) | WP hosting disk | Storage server | 100GB CDN (Growth) |
| CDN/Imagens | Vercel CDN | Plugin CDN ou hosting | Cloud CDN | Incluído |
| Backups | Git (gratuito) | Plugin ou hosting backup | Manual ou Cloud | Gerenciado |
| Manutenção | ~0-2h/semana (dependências) | ~2-4h/semana (WP updates + plugins) | ~2-4h/semana (self) ou 0 (Cloud) | ~0h (SaaS) |
| Desenvolvimento adicional | N/A | Integração REST API | Schema + API port | Schema + GROQ queries |

---

## 5. Análise por Alternativa

### 5.1 Content Collections (continuidade)

**Principais aderências:** ✅ Modelo editorial completo já implementado,
✅ validação Zod + runtime, ✅ PT/ES com translationKey, ✅ Git como fonte
de verdade, ✅ custo zero adicional, ✅ deploy Vercel já funciona,
✅ portabilidade total (Markdown).

**Principais lacunas:** ❌ Sem interface visual para editores não técnicos,
❌ Sem fluxo de revisão, ❌ Preview requer build local, ❌ Agendamento exige
push manual, ❌ Mídia sem biblioteca/upload integrado.

**Desenvolvimento adicional necessário:** Interface de edição = zero (não
há roadmap para isso neste modelo). Precisa de ferramentas externas.

**Complexidade operacional:** Baixa para Francisco (usa Git + IA). Alta
para não técnicos.

**Impacto no fluxo Git:** Nenhum. Git continua sendo o centro.

**Impacto no modelo de traduções:** Nenhum. Tudo já implementado.

**Riscos específicos:** Barreira de entrada para editores não técnicos =
inviabiliza crescimento da equipe editorial fora do perfil técnico.

### 5.2 WordPress Headless

**Principais aderências:** ✅ Admin UI madura para editores não técnicos,
✅ Block editor (Gutenberg) WYSIWYG, ✅ 6 papéis de usuário nativos,
✅ Agendamento nativo, ✅ Biblioteca de mídia completa, ✅ Revisions,
✅ Plugins para multilíngue (WPML, Polylang), ✅ REST API.

**Principais lacunas:** ❌ Modelo editorial (hubs, tópicos, sources) exigiria
CPTs + ACF + taxonomias customizadas, ❌ WordPress não oferece nativamente
o fluxo completo de associação entre publicações traduzidas necessário para
o modelo do Radar Digital — normalmente será necessário plugin, Multisite
ou desenvolvimento adicional. Existem opções gratuitas e pagas. A
preservação de `translationKey`, slugs, hreflang e revisão independente
PT/ES precisaria de configuração e possivelmente prova prática,
❌ `translationKey` precisaria de campo customizado, ❌ REST API retorna
mais dados que necessário (overfetch).

**Desenvolvimento adicional necessário:** Migrar schema editorial para
CPTs + ACF fields, configurar REST API endpoints, construir Astro data
layer para consumir WP API, configurar webhooks para rebuild.

**Complexidade operacional:** Média-alta. WordPress + plugins + MySQL
precisam de atualizações regulares. Superfície de segurança maior.

**Impacto no fluxo Git:** Git continuaria para código e docs, mas conteúdo
passaria a viver no banco MySQL do WordPress. Perde-se a paridade conteúdo
versionado + código versionado.

**Estratégia provável de adoção gradual:** Execução paralela temporária:
WP para novas publicações, Content Collections para as existentes.
Migração gradual via script de importação.

**Riscos específicos:** Dependência de plugins pagos para multilinguismo,
segurança WordPress (43% da web = alvo frequente), performance da REST
API sob carga.

### 5.3 Payload CMS

**Principais aderências:** ✅ TypeScript-first — schema em TS similar ao
modelo atual, ✅ Access control granular nativo, ✅ Localization nativa
(campos por locale), ✅ Live Preview nativo, ✅ Versions (draft/published),
✅ Upload + Folders, ✅ REST + GraphQL APIs, ✅ código aberto (MIT).

**Principais lacunas:** ❌ Precisa de servidor Node.js + MongoDB, ❌ Sem
adaptador Astro oficial (requer fetch HTTP via REST ou GraphQL), ❌ Payload
Cloud (serviço gerenciado) — preço não confirmado (página 404),
❌ `Publishing Workflows` é Enterprise (custo não divulgado), ❌ Payload
foi adquirido pela Figma (anúncio 17/06/2025) — roadmap futuro do produto
independente é incerto.

**Desenvolvimento adicional necessário:** Setup de Payload (Next.js),
migração do schema editorial para Payload Collections, configurar
webhooks para rebuild Astro, construir preview integration.

**Complexidade operacional:** Média. Payload Cloud reduz operação, mas
self-hosted exige gerenciamento de Node.js + MongoDB.

**Impacto no fluxo Git:** Código (Astro) continua no Git. Schema do
Payload e conteúdo ficam no MongoDB/Payload Cloud. Perde-se paridade
de versionamento.

**Riscos específicos:** Aquisição pela Figma (dez/2025) cria incerteza
sobre o futuro do produto independente. Pricing não confirmado para
Payload Cloud. Dependência de MongoDB.

### 5.4 Sanity

**Principais aderências:** ✅ SaaS gerenciado (sem operação de servidor),
✅ Integração oficial com Astro (`@sanity/astro`), ✅ Visual Editing +
Presentation (preview visual por link), ✅ Content Lake (tempo real),
✅ Schema flexível com references e arrays, ✅ Locale field nativo,
✅ GROQ query language, ✅ Dataset export/import CLI, ✅ Free plan
robusto (10K docs, 20 seats), ✅ AI features (Content Agent, Canvas).

**Principais lacunas:** ❌ Custo recorrente no Growth ($15/seat/mês,
5 seats = $75/mês para equipe de 5 pessoas — valores diferentes para
equipes menores), ❌ Roles limitados no Free (2) e Growth (5), ❌ Custom
roles só no Enterprise, ❌ Dados não versionados no Git (vivem no Content
Lake), ❌ GROQ é proprietário (embora documentado).

**Desenvolvimento adicional necessário:** Schema migration do Zod para
Sanity schema, GROQ queries para cada página, webhook config para rebuild
Astro na Vercel, setup de Visual Editing.

**Complexidade operacional:** Baixa. SaaS gerenciado. Sanity cuida de
uptime, backups, patches. Francisco gerencia schema e queries.

**Impacto no fluxo Git:** Código Astro continua no Git. Conteúdo migra
para Sanity. Perde-se versionamento Git do conteúdo. Sanity oferece
dataset history e export como alternativa.

**Riscos específicos:** Custo recorrente ($75/mês no Growth para equipe).
Dependência de serviço cloud (sem Sanity = sem conteúdo). GROQ é
proprietário, embora documentado.

---

## 6. Migração e Adoção Gradual

| Aspecto | Content Collections | WordPress | Payload | Sanity |
|---------|-------------------|-----------|---------|--------|
| Manter CC durante transição | ✅ Já está | ✅ Possível (dados bifurcados) | ✅ Possível | ✅ Possível (CC + Sanity) |
| Execução paralela temporária | N/A | ✅ CC para antigos, WP para novos | ✅ CC + Payload | ✅ CC + Sanity |
| Importar 8 publicações atuais | N/A | Script import XML | Script import REST API | `sanity dataset import` |
| Tratar 17 drafts | Manter em CC ou importar | Importar ou criar manualmente | Importar manualmente | Importar via script |
| Preservar slugs e rotas | ✅ Já preservado | ✅ Rotas podem ser iguais | ✅ Rotas podem ser iguais | ✅ Rotas podem ser iguais |
| Preservar `translationKey` | ✅ Já existe | Precisa de campo customizado | Não aplicável (localization nativa) | Não aplicável (locale field) |
| Preservar fontes e taxonomias | ✅ Já existe | CPT + ACF + taxonomias | Collections + fields | Schema references |
| Fallback se integração for abandonada | N/A | Voltar para CC (migração) | Voltar para CC (migração) | Voltar para CC (dataset export) |
| Evitar big-bang migration | N/A | Por categoria/hub | Por categoria/hub | Por categoria/hub |

---

## 7. Comparação dos Cenários A e B

### Cenário A — Lançamento (1 pessoa, baixo custo)

| Necessidade | Content Collections | WordPress Headless | Payload | Sanity |
|-------------|-------------------|-------------------|---------|--------|
| Custo mínimo | **$0** | ~$0-10/mês | ~$5-10/mês (server) | **$0** (Free) |
| Editor não técnico pode usar? | ❌ | ✅ | ✅ | ✅ |
| Validação editorial funciona? | ✅ Já implementado | ⚠️ Precisa configurar | ⚠️ Precisa configurar | ⚠️ Precisa configurar |
|| PT/ES funciona? | ✅ | ⚠️ Requer plugin ou desenvolvimento (gratuito ou pago) | ✅ Localization nativa | ✅ Locale field |
| Preview visual? | ❌ (build local) | ✅ admin preview | ✅ Live Preview | ✅ Visual Editing |
| Manutenção necessária? | **Mínima** | Moderada (WP updates) | Moderada (self) ou Cloud | **Mínima** (SaaS) |

**Análise:** No cenário A, Content Collections já atende todas as
necessidades com **custo zero** e manutenção mínima. As lacunas (falta
de interface visual, preview, agendamento) são contornáveis por Francisco
(usa IA + Git). Qualquer CMS externo adicionaria complexidade operacional
e custo sem benefício imediato para uma operação individual.

### Cenário B — Crescimento (2-5 pessoas, editores não técnicos)

| Necessidade | Content Collections | WordPress Headless | Payload | Sanity |
|-------------|-------------------|-------------------|---------|--------|
| Custo estimado | ~$20/mês (Vercel Pro) | ~$25-100/mês (managed WP) | ~$20-50/mês (self) ou Cloud? | **$75/mês** (5 seats Growth) |
| Editor não técnico pode usar? | ❌ | ✅ | ✅ | ✅ |
| Papéis e permissões | ❌ | ✅ 6 papéis nativos | ✅ Access control granular | ✅ 5 roles (Growth) |
| Fluxo revisão → aprovação | ❌ | ⚠️ Plugin | ⚠️ Enterprise | ⚠️ N/C |
| Agendamento | ❌ | ✅ Nativo | ⚠️ Precisa hooks | ✅ Nativo |
| Preview visual por link | ❌ (só deploy) | ✅ | ✅ Live Preview | ✅ Visual Editing |
| Mídia com upload/biblioteca | ❌ | ✅ Completo | ✅ Upload + Folders | ✅ Media Library |
| Manutenção | Mínima | Moderada | Moderada ou Cloud | Mínima (SaaS) |

**Análise:** No cenário B, Content Collections torna-se uma barreira
para editores não técnicos. WordPress, Payload e Sanity passam a fazer
mais sentido. Sanity oferece a integração Astro mais direta e SaaS
gerenciado. WordPress tem o ecossistema mais maduro para permissões e
agendamento, mas exige configuração adicional para multilíngue (plugin,
Multisite ou desenvolvimento). Payload tem a
vantagem do schema TypeScript, mas a aquisição pela Figma gera incerteza.

---

## 8. Riscos e Incertezas

| Incerteza | Alternativas afetadas | Natureza |
|-----------|----------------------|----------|
| **Payload Cloud pricing** não confirmado (pricing page 404) | Payload | Documentação oficial não acessível |
| **Payload + Figma**: roadmap futuro desconhecido pós-aquisição | Payload | Risco estratégico |
| **WordPress headless + Astro**: a documentação oficial do Astro possui guia para WordPress Headless via REST API, mas isso não significa que o modelo editorial do Radar Digital será reproduzido automaticamente. Campos personalizados, traduções, preview, webhooks e validações exigem desenho e configuração. | WordPress | Requer desenvolvimento |
| **WordPress multilíngue**: o WordPress não oferece nativamente o fluxo completo de associação entre publicações traduzidas necessário para o modelo do Radar Digital. Será necessário plugin (gratuito ou pago), Multisite ou desenvolvimento adicional. O custo e a portabilidade dependem da solução adotada. WPML (pago, ~$79-399/ano) é uma opção, mas existem alternativas gratuitas. | WordPress | Custo e configuração adicionais |
| **Sanity Growth**: $15/seat/mês (exemplo: 5 seats = $75/mês). Equipes de 2-5 pessoas podem gerar valores diferentes. Papéis, permissões, quotas e recursos adicionais podem determinar o plano e o custo final. | Sanity | Custo recorrente |
| **GROQ**: proprietário, embora documentado | Sanity | Risco de lock-in na query language |
| **Validação condicional** (`.superRefine()`): Payload permite funções customizadas de validação (validate hooks, validação no Admin Panel e backend), mas não é a mesma API do Zod. Reproduzir as regras atuais do Radar Digital exigiria implementação e teste. WordPress também requer desenvolvimento customizado (PHP filters). | WordPress, Payload | Requer desenvolvimento customizado |
| **MongoDB**: custo e operação (Payload self-hosted) | Payload | Dependência de infraestrutura externa |
| **Sanity Free**: limite de 10K documentos | Sanity | Pode ser suficiente no lançamento, mas exige upgrade ao crescer |
| **Preview deployment**: Vercel + webhook de rebuild não testado com CMS externo | WordPress, Payload, Sanity | Precisa de prova de conceito |

---

## 9. Pontos Candidatos a Prova de Conceito

Para a task 4.3, qualquer prova de conceito deveria verificar:

| Capacidade | Alternativas relevantes | Por que precisa de prova |
|-----------|------------------------|--------------------------|
| Modelar conteúdo completo (email marketing) com `sources`, `primaryHub`, `topics`, `authorId` | WordPress, Payload, Sanity | Verificar se o schema consegue reproduzir as validações atuais |
| Validar `primaryHub` obrigatório em publicados e opcional em drafts | WordPress, Payload, Sanity | Verificar validação condicional (`.superRefine()` equivalente) |
| Associar PT e ES e gerar hreflang automático | WordPress, Payload, Sanity | Verificar se alternates são gerados corretamente sem intervenção manual |
| Gerar preview na Vercel via webhook | WordPress, Payload, Sanity | Verificar latência, custo e confiabilidade do rebuild |
| Preservar slugs atuais (`/artigos/<slug>/`) sem redirect | WordPress, Payload, Sanity | Verificar se as URLs canônicas não quebram |
| Exportar conteúdo completo em formato portável | WordPress, Payload, Sanity | Verificar se a exportação preserva metadados e relacionamentos |
| Testar rollback de uma publicação | WordPress, Payload, Sanity | Verificar tempo e completeza do rollback via CMS |
| Validar webhook → rebuild Astro na Vercel | WordPress, Payload, Sanity | Verificar se o pipeline CI/CD funciona com CMS externo |
| Testar experiência de editor não técnico criando um artigo com todos os metadados | WordPress, Payload, Sanity | Verificar usabilidade real do admin/studio |

---

## 10. Síntese Sem Decisão

### Opções com contratos majoritariamente atendidos

- **Content Collections**: contratos atendidos **nativamente** no modelo
  editorial, validação, tradução, portabilidade, histórico e CI/CD. Não
  atende o critério "caminho para usuários não técnicos" — bloqueio que
  só se manifesta no cenário B (crescimento).
- **Sanity**: contratos atendidos **nativamente** ou com **configuração**
  mínima na maioria dos eixos, com destaque para integração Astro, Visual
  Editing e SaaS gerenciado. A interface `@sanity/astro` precisaria de
  prova prática para confirmar a reprodução exata do modelo editorial.

### Opções que dependem de trabalho adicional

- **WordPress Headless**: contratos atendidos, mas com **configuração**
  significativa (CPTs, ACF ou campos personalizados, plugin ou
  desenvolvimento para multilíngue, REST API integration). A integração
  Astro–WordPress via REST API é documentada oficialmente, mas o modelo
  editorial do Radar Digital não é reproduzido automaticamente.
- **Payload**: contratos majoritariamente atendidos **nativamente** ou com
  **configuração**. Validações condicionais são possíveis via funções
  customizadas, hooks e validate hooks — não são equivalentes diretos
  ao `.superRefine()` do Zod, mas cobrem funcionalmente o mesmo domínio.
  O Payload self-hosted (MIT) tem custo de software zero; o serviço
  gerenciado Payload Cloud tem preço não confirmado (página 404).

### Opções com informações insuficientes

- **Payload Cloud (serviço gerenciado)**: sem pricing público confirmado
  na data da análise. A página de pricing retorna 404.

### Principais trade-offs

1. **Gratuito hoje vs. investimento futuro**: Content Collections custa $0
   e funciona. Qualquer CMS adiciona custo e complexidade. A questão é
   **quando** a falta de interface visual se torna um bloqueio real.

2. **Portabilidade vs. facilidade**: Content Collections (Markdown + Git)
   é o formato mais portável. CMS externo adiciona facilidade de edição
   em troca de lock-in parcial e custo recorrente.

3. **SaaS gerenciado vs. self-hosted**: Sanity (SaaS) minimiza operação,
   mas gera custo mensal. Payload self-hosted elimina custo de SaaS, mas
   adiciona operação de servidor + MongoDB.

4. **Schema TypeScript nativo vs. adaptação**: Content Collections e Payload
   usam TypeScript para schema (mais próximo do modelo atual). WordPress
   usa PHP + ACF. Sanity usa schema JS/TS.

5. **Integração Astro**: Sanity tem integração oficial (`@sanity/astro`).
   WordPress possui guia oficial de integração headless na documentação do
   Astro (via REST API), mas isso não reproduz automaticamente o modelo
   editorial. Payload requer fetch HTTP manual (REST/GraphQL).

### Incertezas que impedem uma decisão formal

1. **Cenário A vs. B**: A decisão de migrar para CMS externo depende de
   **quando** o cenário B se concretizará. Se Francisco for o único editor
   por meses, Content Collections é suficiente.
2. **Payload pricing cloud**: sem confirmação, não é possível comparar
   custos com Sanity.
3. **Payload + Figma**: o roadmap do produto é incerto.
4. **Experiência real de editor não técnico**: nenhuma das interfaces foi
   testada com usuários reais do projeto.

---

## 11. Fontes Oficiais

| Alternativa | Título | Organização | URL | Data de acesso | Assunto |
|-------------|--------|-------------|-----|---------------|---------|
| WordPress | REST API Handbook | WordPress.org | https://developer.wordpress.org/rest-api/ | 13/07/2026 | REST API endpoints, autenticação |
| WordPress | REST API Reference | WordPress.org | https://developer.wordpress.org/rest-api/reference/ | 13/07/2026 | Endpoints: posts, pages, taxonomias, media, users |
| WordPress | WordPress Features | WordPress.org | https://wordpress.org/about/features/ | 13/07/2026 | User roles, media, comments, publishing tools |
| WordPress | Multilingual WordPress | WordPress.org | https://developer.wordpress.org/advanced-administration/wordpress/multilingual/ | 13/07/2026 | Abordagens de multilinguismo, plugins |
| WordPress | Plugin Directory | WordPress.org | https://wordpress.org/plugins/ | 13/07/2026 | Diretório oficial de plugins (inclui opções gratuitas de multilíngue) |
| Astro | WordPress Headless Guide | Astro | https://docs.astro.build/en/guides/wordpress/ | 13/07/2026 | Guia oficial de integração WordPress headless com Astro |
| Payload | What is Payload | Payload CMS | https://payloadcms.com/docs/getting-started/what-is-payload | 13/07/2026 | Conceitos, admin UI, REST/GraphQL, TypeScript schema |
| Payload | Validation | Payload CMS | https://payloadcms.com/docs/fields/validation | 13/07/2026 | Funções customizadas de validação, validate hooks |
| Payload | Hooks | Payload CMS | https://payloadcms.com/docs/hooks/overview | 13/07/2026 | Hooks no ciclo de vida dos documentos |
| Payload | Live Preview | Payload CMS | https://payloadcms.com/docs/features/live-preview | 13/07/2026 | Preview visual em tempo real |
| Payload | Upload & Storage | Payload CMS | https://payloadcms.com/docs/upload/overview | 13/07/2026 | Upload, storage local/S3, CDN |
| Payload | Versions & Drafts | Payload CMS | https://payloadcms.com/docs/features/versions | 13/07/2026 | Versionamento, drafts, autosave |
| Payload | Self-hosting | Payload CMS | https://payloadcms.com/docs/production/deployment | 13/07/2026 | Deploy self-hosted, requisitos de infraestrutura |
| Payload | GitHub | Payload CMS | https://github.com/payloadcms/payload | 13/07/2026 | Código-fonte, 43.5k stars, MIT license |
| Payload | Figma Announcement | Figma | https://www.figma.com/blog/payload-is-joining-figma/ | 13/07/2026 | Anúncio de 17/06/2025 — Payload entra na Figma |
| Sanity | Docs Home | Sanity | https://www.sanity.io/docs | 13/07/2026 | Documentação geral, Content Lake, Studio, GROQ |
| Sanity | Integrate with Astro | Sanity | https://www.sanity.io/docs/astro | 13/07/2026 | Integração oficial `@sanity/astro`, Visual Editing |
| Sanity | Pricing | Sanity | https://www.sanity.io/pricing | 13/07/2026 | Free ($0), Growth ($15/seat/mês), Enterprise (custom) |
| Sanity | Visual Editing | Sanity | https://www.sanity.io/docs/visual-editing | 13/07/2026 | Presentation Tool, preview visual |
| Radar Digital | CMS_REQUIREMENTS.md | Radar Digital | `docs/CMS_REQUIREMENTS.md` | 13/07/2026 | Requisitos editoriais, respostas estratégicas |
| Radar Digital | CONTENT_MODEL.md | Radar Digital | `docs/CONTENT_MODEL.md` | 13/07/2026 | Modelo editorial completo |
| Radar Digital | DECISIONS.md | Radar Digital | `docs/DECISIONS.md` | 13/07/2026 | Decisões arquiteturais |
