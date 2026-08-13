## ADDED Requirements

### Requirement: Estructura de páginas del Tema 0

El Tema 0 se organiza como una página índice más seis puntos encadenados, uno por tema a tratar.

#### Scenario: Páginas del Tema 0 presentes
- **WHEN** un revisor abre la carpeta `00-introduccion/`
- **THEN** existen una página índice (`00-introduccion.md`) y seis puntos de contenido: qué es una red, términos básicos, mapa del curso, herramientas, método de diagnóstico y glosario/FAQ

#### Scenario: Boletines del Tema 0 presentes
- **WHEN** se busca el boletín del Tema 0
- **THEN** existen `boletin-U00-inicial` / `boletin-U00-inicial-resuelto` y `boletin-U00-avanzado` / `boletin-U00-avanzado-resuelto` en `src/content/docs/boletines/`, con el mismo patrón que el resto de unidades

### Requirement: Punto de partida del curso

El Tema 0 es la primera etapa visible del curso y el punto de entrada desde la portada y el sidebar.

#### Scenario: Entrada destacada
- **WHEN** un usuario abre la portada o el sidebar del curso
- **THEN** el Tema 0 aparece antes de la U01 como punto de partida, y la ruta del paquete (en índice y en U01) lo refleja como primer elemento

### Requirement: Comprensibilidad de principiante absoluto

Cada punto del Tema 0 se escribe para alguien que no ha tocado nunca una red.

#### Scenario: Sin jerga en el primer punto
- **WHEN** un lector lee los puntos 01 (¿qué es una red?) y 02 (términos básicos)
- **THEN** no aparece ningún término técnico sin definición inmediata en un panel de "vocabulario" que explique la palabra en una frase

#### Scenario: Analogías en todo el Tema
- **WHEN** se explica un concepto nuevo (IP, MAC, router, paquete…)
- **THEN** se usa al menos una analogía de la vida diaria (cartero, calles, pisos, transporte de paquetes) que relacione el concepto con algo ya conocido