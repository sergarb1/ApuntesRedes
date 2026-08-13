# tema-cero — Estándar del Tema 0 de introducción

> El Tema 0 es la puerta de entrada del curso para personas sin ningún conocimiento previo de redes. Lleva boletines propios con el mismo patrón que el resto de unidades.

## ADDED Requirements

### Requirement: Orientación de principiante absoluto

El Tema 0 parte de cero y no asume ningún conocimiento previo de informática de redes.

#### Scenario: Primera lectura sin jerga
- **WHEN** una persona que nunca ha tocado redes lee el Tema 0 de principio a fin
- **THEN** comprende qué es una red, por qué existen y qué va a aprender en el curso, con lenguaje llano y analogías cotidianas

#### Scenario: Conceptos previos cubiertos
- **WHEN** el alumno llega a la U01
- **THEN** ya conoce (o sabe dónde consultar) los términos básicos que U01 da por supuestos: dispositivo, cable, WiFi, paquete, bit, IP, MAC, servidor, router — sin necesidad de memorizarlos

### Requirement: Mapa del curso

El Tema 0 presenta el recorrido completo de las unidades.

#### Scenario: Ruta del curso
- **WHEN** un alumno consulta el apartado de mapa del curso
- **THEN** ve las 13 etapas (Tema 0 + U1…U12) con una frase para cada una y entiende el orden lógico de encadenado

### Requirement: Herramientas de laboratorio

El Tema 0 prepara el entorno práctico.

#### Scenario: Primeros pasos de herramienta
- **WHEN** un alumno sigue el apartado de herramientas
- **THEN** aprende qué es Packet Tracer y Wireshark, cómo instalarlos o acceder a ellos, y completa un mini ejercicio de 5 minutos (encender, cablear y ver una interfaz)

### Requirement: Método de diagnóstico desde el inicio

El alumno adopta el enfoque de diagnóstico del administrador de red desde el día uno.

#### Scenario: Método de resolución de problemas
- **WHEN** se explica qué hace un administrador de redes
- **THEN** se presenta el método de diagnóstico en capas (de lo físico a lo lógico) como habilidad transversal que recorrerá todo el curso

### Requirement: Boletines integrados con el patrón del curso

El Tema 0 lleva boletines de ejercicios, con la misma estructura que el resto de unidades.

#### Scenario: Par resuelto / por resolver
- **WHEN** un revisor busca el boletín del Tema 0
- **THEN** existen `boletin-U00-inicial` / `boletin-U00-inicial-resuelto` y `boletin-U00-avanzado` / `boletin-U00-avanzado-resuelto`, bajo el mismo patrón que el resto de unidades y enlazados desde la portada y el sidebar

#### Scenario: Refuerzo de los puntos del Tema 0
- **WHEN** un alumno resuelve los boletines del Tema 0
- **THEN** practica los conceptos del tema (qué es una red, términos básicos, herramientas, método de diagnóstico, mapa del curso) aplicando la graduación inicial → avanzado de `contenido-boletin`