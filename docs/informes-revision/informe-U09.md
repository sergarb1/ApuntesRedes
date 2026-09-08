# Informe docente — U09 · Routing y ACLs

**Estado global: 5 / 5**

Unidad didáctica de calidad sobresaliente. El orden docente es óptimo, la explicación técnica es rigurosa y precisa (sin errores factuales en los puntos de control), los boletines están bien graduados con soluciones 1:1 y el cumplimiento de convenciones es ejemplar. Solo tres matices menores, ninguno conceptual.

---

## Orden docente

- ✅ Secuencia óptima: router→config básica→rutas estáticas→ruta por defecto→cómo decide→ACLs concepto→estándar→extendida/nombrada→cierre.
- ✅ Las ACLs llegan tras el routing (correcto: dependen de la decisión de ruta).
- ✅ AD introducida en el punto 4 y reforzada en el 5 (espiral de refuerzo).
- 🟡 En 02:80/69-70, el ejemplo de config básica adelanta dos rutas `ip route` del punto 3, correctamente señalizado ("no corras todavía").

## Calidad de explicación

- ✅ AD con la metáfora de "la nota de confianza", repetida y ampliada.
- ✅ Wildcard explicada con la regla del "inverso" y el truco de restar a 255.
- ✅ Longest prefix match con ejemplo numérico y distinción vs AD.
- ✅ Evaluación secuencial de ACL con diagrama y "el orden ES la política".
- ✅ Deny any implícito presentado como "la regla más importante de la unidad".
- ✅ Established con tabla de flags SYN/ACK y matiz de honestidad (UDP va por otra historia).
- ✅ Analogías: portero de discoteca, mesa de trabajo vs armario (RAM/NVRAM), conductor con llave (next-hop), callejón universal.
- ✅ Jerga en primer uso en todos los términos.

## Contenido

- ✅ ADs 0/1/90/110/120 correctas; wildcard inversa; ACL 1-99/100-199; established solo TCP; ruta flotante solo instala primaria; bloqueo de rangos con wildcard correcta.
- 🟡 `03-rutas-estaticas.md:75` — R2 usa `serial 0/0/0` hacia el ISP, pero la topología R1-R2 es GigabitEthernet (10.0.0.0/30). Ambigüedad entre "enlace serie" y "GigabitEthernet" para el mismo enlace.
- 🟡 `08:55-56` — el ejemplo inicial de ACL nombrada usa `host 173.194.0.0` (imperfecto) y se autocorrige en :66; presentación mejorable.
- 🟡 Boletín avanzado problema 1: R2 (router central) no tiene ruta por defecto ni salida declarada; el enunciado no lo aclara.

## Boletines

- ✅ 8+8 ejercicios, cobertura completa, graduación correcta, soluciones 1:1.
- ✅ Pistas en el avanzado (2, 5, 7, 8) y declarado "En los difíciles tienes pista".
- ✅ Calidad de soluciones alta (razonan, no solo responden).

## Coherencia

- ✅ Referencias U08/U10 correctas y bidireccionales; "punto N" correctos; CEs RA4 coherentes.

## Convenciones

- ✅ `<details>`, es-ES, estilo oracional, formato numérico, personajes: correctos.

## Recomendaciones

1. Unificar el tipo de enlace R1-R2 (serial → GigabitEthernet o nota aclaratoria) en 03:75 y armonizar el laboratorio (09:99).
2. Aclarar en el boletín avanzado problema 1 que R2 no lleva ruta por defecta al ser el centro sin salida externa.
3. Opcional: presentar directamente la versión correcta de la ACL de YouTube (rango /16) y dejar `host` como advertencia.