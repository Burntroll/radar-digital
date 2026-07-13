# Sitemap — Radar Digital

> **Propósito:** Documentar a estrutura de navegação principal e a organização do site.
> **Última atualização:** 13/07/2026

## Navegação principal (navbar)

A ordem conceitual dos itens do navbar é:

1. **Início** — anchor
2. **Setores** — disclosure (mega menu)
3. **Operação** — disclosure (agrupado)
4. **Verticais** — oculto; aparece somente quando houver hubs elegíveis (atualmente nenhum)
5. **Recursos** — disclosure
6. **Ferramentas** — anchor independente (promovido a primeiro nível)
7. **Bônus** — anchor independente (promovido a primeiro nível)
8. **Radar Market** — anchor independente

Complementos (não fazem parte da enumeração editorial dos anchors principais):

- Seletor de idioma (PT/ES)
- Theme toggle (dark/light)

### Estado público atual

No estado atual, a ordem visível no navbar é:

- Início
- Setores
- Operação
- Recursos
- Ferramentas
- Bônus
- Radar Market
- (seletor de idioma)
- (theme toggle)

Verticais não aparece por não possuir hubs elegíveis.

### Composição de Recursos

Recursos é um disclosure que agrupa formatos editoriais e materiais utilitários:

- **Guias** — elegível e público
- **Cases** — futuro, oculto enquanto inelegível
- **Entrevistas** — futuro, oculto enquanto inelegível
- **Reviews** — futuro, oculto enquanto inelegível

Ferramentas e Bônus não aparecem dentro do disclosure de Recursos — foram promovidos a anchors independentes por decisão arquitetural.

### Ferramentas e Bônus

Ferramentas e Bônus são exceções estratégicas promovidas ao primeiro nível por sua relevância para monetização e descoberta. Ambos:

- São anchors diretos (acesso com um clique)
- Usam ícone pequeno + label
- Mantêm a rota pública atual (nenhuma URL é alterada)
- Possuem label localizada em PT e ES
- Não são duplicados dentro de Recursos

### Verticais

Verticais permanece como grupo conceitual no registro de navegação, mas com `eligible: false` até que ao menos um de seus hubs (Nutra, Adult, Renda Extra, Outras Verticais) possua conteúdo público elegível com rota. Nenhum espaço vazio, placeholder ou item desabilitado deve aparecer.

### Radar Market

Radar Market é uma área comercial separada, com anchor independente no navbar. Permanece distinto dos demais grupos editoriais.

**Estado atual (Task 5.6 concluída):**
- Radar Market permanece como anchor principal, sem submenu público neste ciclo.
- Categorias internas da landing (IA & Automação, Tráfego & Operação, Social & Conteúdo, Cursos & Treinamentos) não são itens do navbar.
- Não existem rotas públicas de categoria ou item.
- Menus vazios ou baseados em placeholders são proibidos.
- Um submenu futuro depende de conteúdo comercial real, destinos válidos e equivalência localizada.
- A ausência do submenu é uma decisão de elegibilidade, não uma limitação acidental.
