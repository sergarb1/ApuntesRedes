# Informe docente — U10 · Routing dinámico OSPF

**Estado global: 4 / 5**

Unidad de calidad alta: progresión conceptual cuidada, analogías eficaces, secciones obligatorias completas y boletines bien graduados. Los problemas son acotados: un error factual en una pista del boletín avanzado, varias incoherencias menores (N−1 vs 2N−3, etiqueta Gigabit/100Mbps, frase huérfana) y dos imprecisiones conceptuales (wildcard "debe coincidir", "negociar" parámetros).

---

## Orden docente

- ✅ Secuencia óptima y explícitamente anunciada como "libro de 9 capítulos".
- ✅ Buenas decisiones: motivación "no escala" conecta con comparativa; coste (06) se apoya en Dijkstra del 03.
- ✅ Enganche práctico correctamente aplazado.
- 🟡 Convergencia y coste avanzados en la tabla comparativa de 02 (02:57,65) antes de explicarse en 03/06; aceptable como andamiaje.

## Calidad de explicación

- ✅ OSPF (LSA/LSDB/SPF) con cadena de montaje y analogía del mapa colaborativo; ejemplo Dijkstra reutilizado en coste.
- ✅ DR/BDR con analogía del tablón de anuncios/redactor suplente y tabla de estados.
- ✅ Áreas con ASCII del backbone y bloque ABR vs ASBR.
- ✅ Coste con tabla de velocidades y la "trampa del 1 Gbps"; wildcard con el error clásico.
- ✅ Diagnóstico: escalera físico→lógico y lectura de prefijos O/O IA/O*E2.
- 🟡 BGP y EIGRP nunca se expanden en primer uso (02:42-43,49-60).
- 🟡 El Hello "negocia parámetros" (03:75): en realidad los comprueba/valida.

## Contenido

- 🔴 `boletin-U10-avanzado.md:116` — pista falsa: "los timers de Hello/Dead por defecto son 10/40 en broadcast, pero en enlaces punto a punto Serial suelen ser 30/120". Incorrecto: 10/40 aplica también a punto a punto; 30/120 es solo NBMA (Frame Relay). Contradice a su propio resuelto (:133) y a la teoría.
- 🟡 Conteo de adyacencias: el punto 5 enseña "N−1" (05:26,32,116) pero explica que cada router se adyacenta con DR y BDR → 2N−3. El mini-chequeo (05:107) lo reconoce a medias.
- 🟡 `boletin-U10-avanzado-resuelto.md:77` — frase residual contradictoria tras la respuesta correcta del Camino A (coste 2).
- 🟡 `06-coste-ospf.md:76-84` — el enlace R1-R2 etiquetado "Gigabit" y "100Mbps" a la vez; el texto lo llama FastEthernet.
- 🟡 "La wildcard debe coincidir entre vecinos" (07:99, 08:59, 09:83): la wildcard es local; lo que debe coincidir es el área (y timers).
- 🟡 `boletin-U10-avanzado.md:103` — ejercicio 7c: la tabla dice que R-B tiene prioridad 200 y R-C 150, pero la pregunta asume "misma prioridad (1)"; el escenario está mal planteado.
- ✅ Coste 10⁸/BW mínimo 1, AD 110, timers 10/40 broadcast, default-information, DR/BDR sin destronamiento, Router ID, Process ID local, "coste" no "costo": correctos.

## Boletines

- ✅ 8+8 ejercicios, cobertura amplia, graduación correcta, soluciones 1:1.
- ✅ Pistas en inicial (7, 8) y avanzado (7, 8).
- 🟡 La pista del avanzado 8 contiene el error de timers.
- 🟡 El ejercicio 7a del inicial duplica el 1 (misma clasificación IGP/EGP).

## Recomendaciones

1. Corregir la pista del boletín avanzado (10/40 en punto a punto; 30/120 solo NBMA).
2. Limpiar la solución 4a del avanzado (quitar frase residual; explicar que FastEthernet y Gigabit valen 1).
3. Unificar adyacencias en 2N−3 (o aclarar que N−1 solo cuenta con el DR).
4. Reformular "wildcard debe coincidir" → "el área es lo que debe coincidir".
5. Corregir el diagrama Gigabit/100Mbps.
6. Aclarar el escenario 7c (solo R-A y R-B en el segmento).
7. "negociar" → "comprobar"; expandir BGP/EIGRP; sustituir ejercicio 7a duplicado.