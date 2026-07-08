---
title: "Cómo crear prompts que realmente funcionan"
categoria: "inteligencia-artificial"
subtema: "Prompting"
excerpt: "La anatomía de un prompt profesional: contexto, restricciones, ejemplos y estructura. Framework probado en producción."
date: 2026-08-05
readTime: "9 min"
draft: false
color: "purple"
emoji: "💬"
locale: "es"
isGuide: true
guideTags: ["prompts", "inteligencia-artificial", "conteudo", "ferramentas"]
guideType: "tutorial"
---
# Cómo crear prompts que realmente funcionan

**La mayoría de la gente trata el prompt como "una petición informal a la IA". Por eso los resultados son mediocres. Un prompt profesional es ingeniería de instrucción: tiene estructura, tiene variables, tiene especificación de salida.**

Voy a mostrarte el framework que uso en producción — en copy, análisis de datos, código, investigación. El método es lo suficientemente simple como para caber en la cabeza, lo suficientemente riguroso como para funcionar con Claude, GPT, Gemini y modelos locales. No es "truquito", es un proceso replicable.

La buena noticia: una vez que entiendes la anatomía, crear un buen prompt se vuelve tan natural como escribir un buen email. Y el salto de calidad es brutal — un prompt vago da una respuesta genérica, un prompt estructurado da una respuesta que parece escrita por alguien que entendió tu contexto.

---

## Por qué un prompt vago da un resultado mediocre

El modelo no "adivina" lo que quieres. Responde probabilísticamente basado en patrones de entrenamiento. Si pides:

> *"Escríbeme un email de ventas para mi producto"*

El modelo irá en **modo genérico**: email genérico, para público genérico, con tono genérico. No es culpa del modelo — diste información genérica, recibes una respuesta genérica. La Ley de Garbage In, Garbage Out aplica tanto a la IA como a la programación.

La solución: dar al modelo el mismo contexto que le darías a un **empleado nuevo muy competente, pero que acaba de entrar en la empresa hoy**. Sabe escribir muy bien — solo que no sabe nada sobre tu negocio, tu público, tu tono de voz, tus restricciones.

---

## La anatomía de un prompt profesional

Un prompt bien estructurado tiene seis bloques. No hace falta usarlos todos siempre, pero conocerlos te da vocabulario para combinarlos según el caso.

### 1. **Rol (Role)** — ¿Quién es el modelo en este contexto?

Define la perspectiva, el nivel de senioridad, el dominio de conocimiento.

- ❌ *"Escribe un texto sobre inversiones"*
- ✅ *"Eres un asesor financiero CFP con 15 años de experiencia en renta fija para personas de clase media en España"*

El segundo activa un conocimiento mucho más específico del modelo.

### 2. **Contexto (Context)** — ¿Dónde estamos, cuál es el escenario?

Por qué existe esta tarea, cuál es el historial, cuál es el objetivo mayor.

> *"Estoy lanzando un curso de inversiones para principiantes. La landing page está convirtiendo al 1,2% (por debajo de la meta del 3%). Quiero probar una nueva copy que hable más a quienes tienen miedo de invertir por haber perdido dinero en el pasado."*

Sin contexto, el modelo inventa. Con contexto, tiene un punto de apoyo.

### 3. **Tarea (Task)** — ¿Qué quieres que haga exactamente?

Verbo de acción + entregable específico.

- ❌ *"Haz un texto bueno"*
- ✅ *"Escribe 3 variaciones de titular de hasta 60 caracteres, y 1 párrafo de apertura (máximo 80 palabras) para cada variación."*

Cuanto más específico es el entregable, mejor es la respuesta.

### 4. **Restricciones (Constraints)** — ¿Qué NO puede hacer?

Las restricciones son subestimadas. Es donde eliminas el 80% de las respuestas malas.

> *"No uses jerga técnica. No menciones 'riesgo' sin explicarlo en lenguaje sencillo. No prometas rentabilidad. Usa 'tú' en lugar de 'usted'. Evita clichés como 'mercado financiero' sin cualificación."*

### 5. **Formato de salida (Output format)** — ¿Cómo entregarlo?

Markdown, JSON, lista, tabla, párrafos cortos, código con comentarios... El modelo responde bien a un formato explícito.

> *"Responde en JSON con los campos: titular, apertura, observaciones. Cada variación numerada."*

### 6. **Ejemplos (Few-shot)** — Muestra, no solo digas

Cuando el tono o el formato es crítico, mostrar un ejemplo vale oro.

> *"Ejemplo de tono deseado:* 'Si perdiste dinero intentando invertir, no es falta de habilidad — es falta de método. Este curso te da el método que me hubiera gustado tener.' *Usa este nivel de empatía directa, sin paternalismo."*

Few-shot es el "truco" más poderoso. Los modelos imitan patrones mejor de lo que siguen instrucciones abstractas.

---

## Framework práctico: el método RICCE

He resumido los seis bloques en un acrónimo que cabe en cualquier prompt: **RICCE**.

| Letra | Bloque | ¿Qué responde? |
|-------|--------|----------------|
| **R** | Rol | ¿Quién es el modelo? |
| **I** | Input | ¿Cuál es el material / contexto de entrada? |
| **C** | Constraints | ¿Qué no puede hacer? |
| **C** | Context | Escenario, objetivo, por qué |
| **E** | Example | Cómo debe sonar / verse |

Aplicación rápida: antes de enviar el prompt, repasa los 5. Si alguno está vacío, llénalo. Si todos están llenos, la respuesta tiene un 90%+ de probabilidad de estar en el camino correcto.

---

## Antes y después: la misma petición, dos prompts

**Escenario**: necesitas una bio de LinkedIn para un consultor de marketing que atiende PYMEs.

### ❌ Prompt malo

> *"Escribe una bio de LinkedIn para mí. Soy consultor de marketing, atiendo pequeñas empresas, tengo 8 años de experiencia."*

**Respuesta típica del modelo** (genérica, vacía):
> *"Profesional de marketing apasionado por los resultados, con 8 años de experiencia ayudando a pequeñas empresas a crecer. Especialista en estrategias digitales, enfocado en entregar valor y superar expectativas. ¿Hablemos?"*

Parece una bio. No dice nada.

### ✅ Prompt RICCE

> **Rol**: Eres un copywriter sénior especializado en LinkedIn para consultores B2B en España.
>
> **Context**: Mi cliente es consultor de marketing, 8 años de experiencia, atiende PYMEs de 10-50 empleados en el sector servicios. Quiere posicionarse como "traductor de marketing para dueño de empresa que no tiene tiempo ni equipo". Su diferencial: él mismo fue dueño de PYME, entiende el dolor del gestor sobrecargado. Tono deseado: directo, sin hype, con humor sutil. Audiencia: CEOs y directores comerciales de PYMEs.
>
> **Constraints**: Máx 1.500 caracteres. Sin "apasionado por", "especialista en" o clichés de LinkedIn. No uses primera persona del plural ("nosotros"). Muestra, no digas que eres especialista. Incluye una frase de provocación al final para iniciar una conversación.
>
> **Example de tono** (de una bio buena de otro profesional, NO del cliente): *"No vendo magia. Vendo proceso. Y el proceso, se conversa."*
>
> **Output**: 3 variaciones de bio, cada una con un ángulo ligeramente diferente (una más técnica, una más humana, una más provocativa).

**Respuesta típica** (con este prompt):
tres bios específicas, con tono consistente, sin clichés, con ángulos claros para elegir. **Es otro nivel.**

---

## Casos de uso donde el RICCE brilla

### Copywriting / marketing
Rol = copywriter sénior + Context = público + Constraints = sin cliché + Example = tono

### Análisis de datos
Rol = analista de datos + Input = dataset o esquema + Constraints = enfoque en X + Output = formato de informe

### Código
Rol = ingeniero + Context = stack + Constraints = compatibilidad + Example = fragmento de código en el estilo

### Investigación / síntesis
Rol = investigador + Input = fuentes + Constraints = solo hechos verificables + Output = viñetas con jerarquía

### Traducción con contexto
Rol = traductor literario + Context = tono del original + Constraints = mantener juegos de palabras si los hay

La estructura es la misma. Solo cambia el dominio.

---

## Errores comunes que cuestan tiempo (y dinero en API)

### 1. Pedir demasiado en un solo prompt
"Vale, escribe el ebook entero de 30 páginas." Resultado: libro genérico. Solución: divídelo en prompts más pequeños (1 prompt por capítulo).

### 2. Instrucciones contradictorias
"Sé conciso. Desarrolla cada punto con profundidad y ejemplos detallados." ¿Cuál es? Conflicto = el modelo decide por ti = resultado aleatorio.

### 3. No iterar
Un prompt rara vez queda bien a la primera. Trátalo como una conversación: envía, lee, pide ajuste. El RICCE te da una base sólida para iterar.

### 4. Olvidar decir lo que NO quieres
Las restricciones negativas son tan importantes como las positivas. "No uses emojis" es más útil que "usa un tono profesional".

### 5. Confundir modelo bueno con prompt bueno
GPT-5, Claude 4.5, Gemini 2.5 — todos son excelentes. La diferencia del 90% en el output viene del prompt, no del modelo. No cambies de herramienta esperando un milagro: refina el prompt.

---

## Cuándo el prompting estructurado NO basta

Honestidad: hay tareas donde un prompt bien hecho **no resuelve**:
- Cálculos que requieren precisión absoluta → usa código
- Conocimiento muy reciente (post-corte de entrenamiento) → usa RAG o búsqueda
- Dominio muy específico y oscuro → el modelo puede alucinar, valida siempre
- Decisiones con consecuencias graves (médicas, legales) → IA auxilia, no reemplaza

El prompting es la base. Para ir más allá, lo combinas con: tools, RAG, fine-tuning, agents. Pero **empieza por el prompt bien hecho**. Es lo que destraba el 80% de los resultados.

---

## Conclusión

Un prompt profesional es ingeniería, no suerte. El framework RICCE (Rol, Input, Constraints, Context, Example) te da un checklist mental que funciona para cualquier modelo y cualquier tarea.

La diferencia entre *"escríbeme un email"* y el prompt estructurado que mostré es la diferencia entre un resultado genérico y un resultado que parece escrito por alguien que te conoce. **Y eso vale dinero** — en conversión, en tiempo ahorrado, en calidad de decisión.

**Acción concreta para hoy:**

1. Toma una tarea que suelas pedirle a la IA (email, post, análisis, código).
2. Reescríbela usando el RICCE. 5 minutos, sin prisas.
3. Compara el output nuevo con el antiguo. Guarda el prompt nuevo en un documento.
4. Repite con 2-3 tareas diferentes. En una semana, se vuelve automático.

En 30 días, tendrás una biblioteca de prompts personales probados que cubren el 80% de tu trabajo con IA.

---

> 💡 *¿Tienes una tarea específica que haces cada semana y quieres un prompt RICCE listo? Envíame la petición (y contexto) y lo preparo para ti.*
