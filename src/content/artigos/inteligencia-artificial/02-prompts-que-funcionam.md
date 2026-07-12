---
title: "Como criar prompts que realmente funcionam"
categoria: "inteligencia-artificial"
subtema: "Prompting"
excerpt: "A anatomia de um prompt profissional: contexto, restrições, exemplos e estrutura. Framework testado em produção."
date: 2026-07-07
updatedAt: 2026-07-08T14:30:00
readTime: "9 min"
draft: false
color: "purple"
emoji: "💬"
locale: "pt-BR"
slugEs: "inteligencia-artificial/02-crear-prompts-que-funcionan"
translationKey: effective-prompts
authorId: radar-digital
sources:
  - title: "Prompt engineering"
    publisher: "OpenAI"
    url: "https://platform.openai.com/docs/guides/prompt-engineering"
    accessedAt: 2026-07-12
    note: "Guia oficial sobre técnicas de engenharia de prompt, incluindo uso de role, contexto, instruções, exemplos few-shot e formatação de saída."
  - title: "Prompt engineering overview"
    publisher: "Anthropic"
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/overview"
    accessedAt: 2026-07-12
    note: "Visão geral das técnicas de prompt engineering para Claude, incluindo clareza, uso de exemplos e estruturação."
  - title: "Prompting best practices"
    publisher: "Anthropic"
    url: "https://platform.claude.com/docs/en/build-with-claude/prompt-engineering/prompting-best-practices"
    accessedAt: 2026-07-12
    note: "Práticas recomendadas para elaboração de prompts com Claude, abrangendo role prompting, XML tags e chain-of-thought."
  - title: "Prompting strategies"
    publisher: "Google"
    url: "https://ai.google.dev/gemini-api/docs/prompting-strategies"
    accessedAt: 2026-07-12
    note: "Estratégias de prompt para Gemini API, incluindo contexto, instruções e configuração de saída."
primaryHub: ai-automation
topics:
  - prompts
relatedHubs:
  - artificial-intelligence
contentType: "article"
---


**A maioria das pessoas trata prompt como "pedido informal pra IA". Por isso os resultados são medianos. Prompt profissional é engenharia de instrução: tem estrutura, tem variáveis, tem especificação de saída.**

Vou te mostrar o framework que eu uso em produção — em copy, análise de dados, código, pesquisa. O método é simples o suficiente pra caber na cabeça, rigoroso o suficiente pra funcionar com Claude, GPT, Gemini e modelos locais. Não é "truquezinho", é processo replicável.

A boa notícia: depois que você entende a anatomia, criar bom prompt vira tão natural quanto escrever um bom email. E o salto de qualidade é brutal — prompt vago dá resposta genérica, prompt estruturado dá resposta que parece escrita por alguém que entendeu seu contexto.

---

## Por que prompt vago dá resultado medíocre

O modelo não "adivinha" o que você quer. Ele responde probabilisticamente baseado em padrões do treino. Se você pede:

> *"Me escreve um email de vendas pro meu produto"*

O modelo vai no **modo genérico**: email genérico, pra público genérico, com tom genérico. Não é culpa do modelo — você deu informação genérica, recebe resposta genérica. A Lei de Garbage In, Garbage Out vale pra IA tanto quanto pra programação.

A solução: dar ao modelo o mesmo contexto que você daria a um **funcionário novo muito competente, mas que acabou de entrar na empresa hoje**. Ele sabe escrever muito bem — só não sabe nada sobre seu negócio, seu público, seu tom de voz, suas restrições.

---

## A anatomia de um prompt profissional

Um prompt bem estruturado tem seis blocos. Não precisa usar todos sempre, mas conhecer eles te dá vocabulário pra combinar conforme o caso.

### 1. **Papel (Role)** — Quem é o modelo nesse contexto?

Define a perspectiva, o nível de senioridade, o domínio de conhecimento.

- ❌ *"Escreve um texto sobre investimentos"*
- ✅ *"Você é um planejador financeiro CFP com 15 anos de experiência em renda fixa para pessoa física de classe média no Brasil"*

O segundo ativa conhecimento muito mais específico do modelo.

### 2. **Contexto (Context)** — Onde estamos, qual o cenário?

Por que essa tarefa existe, qual o histórico, qual o objetivo maior.

> *"Estou lançando um curso de investimentos pra iniciantes. A landing page tá convertendo 1,2% (abaixo da meta de 3%). Quero testar uma nova copy que fale mais com quem tem medo de investir por causa de ter perdido dinheiro no passado."*

Sem contexto, o modelo inventa. Com contexto, ele tem onde pisar.

### 3. **Tarefa (Task)** — O que você quer que ele faça exatamente?

Verbo de ação + entregável específico.

- ❌ *"Faz um texto bom"*
- ✅ *"Escreve 3 variações de headline de até 60 caracteres, e 1 parágrafo de abertura (máximo 80 palavras) para cada variação."*

Quanto mais específico o entregável, melhor a resposta.

### 4. **Restrições (Constraints)** — O que ele NÃO pode fazer?

Restrições são subestimadas. É onde você elimina 80% das respostas ruins.

> *"Não use jargão técnico. Não mencione 'risco' sem explicar em linguagem simples. Não prometa rentabilidade. Use 'você' em vez de 'você pode'. Evite clichês como 'mercado financeiro' sem qualificação."*

### 5. **Formato de saída (Output format)** — Como entregar?

Markdown, JSON, lista, tabela, parágrafos curtos, código com comentários... O modelo atende bem a formato explícito.

> *"Responda em JSON com os campos: headline, abertura, observações. Cada variação numerada."*

### 6. **Exemplos (Few-shot)** — Mostre, não só fale

Quando o tom ou formato é crítico, mostrar um exemplo vale ouro.

> *"Exemplo de tom desejado:* 'Se você perdeu dinheiro tentando investir, não é falta de jeito — é falta de método. Esse curso te dá o método que eu queria ter tido.' *Use esse nível de empatia direta, sem paternalismo."*

Few-shot é o "truque" mais poderoso. Modelos imitam padrão melhor do que seguem instrução abstrata.

---

## Framework prático: o método RICCE

Encurtei os seis blocos em uma sigla que cabe em qualquer prompt: **RICCE**.

| Letra | Bloco | O que responde |
|-------|-------|----------------|
| **R** | Role | Quem é o modelo? |
| **I** | Input | Qual o material / contexto de entrada? |
| **C** | Constraints | O que não pode? |
| **C** | Context | Cenário, objetivo, por quê |
| **E** | Example | Como deve soar / parecer? |

Aplicação rápida: antes de mandar o prompt, passe o olho nos 5. Se algum estiver vazio, preenche. Se todos estiverem preenchidos, a resposta tem 90%+ de chance de estar no caminho certo.

---

## Antes e depois: o mesmo pedido, dois prompts

**Cenário**: você precisa de uma bio de LinkedIn pra um consultor de marketing que atende PMEs.

### ❌ Prompt ruim

> *"Escreve uma bio de LinkedIn pra mim. Sou consultor de marketing, atendo pequenas empresas, tenho 8 anos de experiência."*

**Resposta típica do modelo** (genérica, vazia):
> *"Profissional de marketing apaixonado por resultados, com 8 anos de experiência ajudando pequenas empresas a crescerem. Especialista em estratégias digitais, focado em entregar valor e superar expectativas. Vamos conversar?"*

Parece bio. Não diz nada.

### ✅ Prompt RICCE

> **Role**: Você é um copywriter sênior especializado em LinkedIn para consultores B2B no Brasil.
>
> **Context**: Meu cliente é consultor de marketing, 8 anos de experiência, atende PMEs de 10-50 funcionários no setor de serviços. Ele quer se posicionar como "tradutor de marketing pra dono de empresa que não tem tempo nem equipe". Diferencial: ele já foi dono de PME, entende a dor do gestor sobrecarregado. Tom desejado: direto, sem hype, com humor sutil. Audience: CEOs e diretores comerciais de PMEs.
>
> **Constraints**: Máx 1.500 caracteres. Sem "apaixonado por", "especialista em" ou clichês de LinkedIn. Não usar primeira pessoa do plural ("nós"). Mostrar, não falar que é especialista. Incluir uma frase de provocação no final pra puxar conversa.
>
> **Example de tom** (de uma bio boa de outro profissional, NÃO do cliente): *"Não vendo mágica. Vendo processo. E processo, a gente conversa."*
>
> **Output**: 3 variações de bio, cada uma com ângulo levemente diferente (uma mais técnica, uma mais humana, uma mais provocativa).

**Resposta típica** (com esse prompt):
três bios específicas, com tom consistente, sem clichê, com ângulos claros pra você escolher. **É outro nível.**

---

## Casos de uso onde o RICCE brilha

### Copywriting / marketing
Role = copywriter senior + Context = público + Constraints = sem clichê + Example = tom

### Análise de dados
Role = analista de dados + Input = dataset ou schema + Constraints = foco em X + Output = formato de relatório

### Código
Role = engenheiro + Context = stack + Constraints = compatibilidade + Example = trecho de código no estilo

### Pesquisa / síntese
Role = pesquisador + Input = fontes + Constraints = apenas fatos verificáveis + Output = bullet points com hierarquia

### Tradução com contexto
Role = tradutor literário + Context = tom do original + Constraints = manter trocadilhos se houver

A estrutura é a mesma. Muda só o domínio.

---

## Erros comuns que custam tempo (e dinheiro em API)

### 1. Pedir demais em um único prompt
"Tá, escreve o ebook inteiro de 30 páginas." Resultado: livro genérico. Solução: quebre em prompts menores (1 prompt por capítulo).

### 2. Instruções conflitantes
"Sê conciso. Desenvolve cada ponto com profundidade e exemplos detalhados." Qual é? Conflito = modelo decide por você = resultado aleatório.

### 3. Não iterar
Prompt raramente fica bom de primeira. Trate como conversa: manda, lê, pede ajuste. O RICCE te dá base sólida pra iterar.

### 4. Esquecer de dizer o que NÃO quer
Restrições negativas são tão importantes quanto positivas. "Não use emoji" é mais útil do que "use tom profissional".

### 5. Confundir modelo bom com prompt bom
GPT-5, Claude 4.5, Gemini 2.5 — todos são excelentes. A diferença de 90% no output vem do prompt, não do modelo. Não troque de ferramenta esperando milagre: refine o prompt.

---

## Quando o prompting estruturado NÃO basta

Honestidade: tem tarefas onde prompt bem feito **não resolve**:
- Cálculos que exigem precisão absoluta → use código
- Conhecimento muito recente (pós-corte de treino) → use RAG ou busca
- Domínio muito específico e obscuro → modelo pode alucinar, valide sempre
- Decisões com consequências grandes (médicas, jurídicas) → IA辅助, não substitui

Prompting é a base. Pra ir além, você combina com: tools, RAG, fine-tuning, agents. Mas **começa pelo prompt bem feito**. É o que destrava 80% dos resultados.

---

## Conclusão

Prompt profissional é engenharia, não sorte. O framework RICCE (Role, Input, Constraints, Context, Example) te dá um checklist mental que funciona pra qualquer modelo e qualquer tarefa.

A diferença entre *"me escreve um email"* e o prompt estruturado que mostrei é a diferença entre resultado genérico e resultado que parece escrito por alguém que te conhece. **E isso vale dinheiro** — em conversão, em tempo economizado, em qualidade de decisão.

**Ação concreta pra hoje:**

1. Pega uma tarefa que você costuma pedir pra IA (email, post, análise, código).
2. Reescreve usando o RICCE. 5 minutos, sem pressa.
3. Compara o output novo com o antigo. Salva o prompt novo num doc.
4. Repete com 2-3 tarefas diferentes. Em uma semana, vira automático.

Em 30 dias, você tem uma biblioteca de prompts pessoais testados que cobrem 80% do seu trabalho com IA.

---

> 💡 *Tem uma tarefa específica que você faz toda semana e quer um prompt RICCE pronto? Manda o pedido (e contexto) que eu monto pra você.*
