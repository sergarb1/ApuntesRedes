# Informe docente — U12 · Diagnóstico y monitorización

**Estado global: 4,5 / 5**

Unidad sólida, bien ordenada, pedagógicamente madura y técnicamente correcta. La metodología OSI abajo-arriba vertebra todo el contenido, los boletines están bien graduados y no hay errores factuales en los puntos críticos. El único hallazgo real es un enlace de boletines roto en el índice (sistémico, ya corregido en Fase A).

---

## Orden docente

- ✅ Secuencia óptima: metodología→comandos→Wireshark→SNMP→syslog→NetFlow→herramientas→caso práctico→cierre.
- ✅ El caso práctico (08) llega tras toda la teoría.
- 🟡 El caso práctico ejercita solo la mitad reactiva (metodología, comandos, Wireshark); las herramientas de monitorización (SNMP/syslog/NetFlow) solo se mencionan en la tabla "Más allá" (08:85-96). Dado el título "Diagnóstico y monitorización", integrar una pieza de monitorización lo haría redondo.
- 🟡 `12-diagnostico-monitorizacion.md:49` — "los 8 primeros puntos son teoría" pero el punto 08 es un caso práctico.

## Calidad de explicación

- ✅ Metodología OSI con tabla capa→comprobación→comando, regla de oro y analogía del fontanero.
- ✅ Analogías: parte médico (SNMP), bombero vs detectores (SNMP), caja negra (syslog), autopista vs qué coches (NetFlow).
- ✅ Jerga en primer uso: SNMP, NMS, MIB, OID, trap, TTL, RTT, flow.
- ✅ Comandos con su para qué y su salida; aviso de firewalls que bloquean ICMP.

## Contenido

- ✅ Niveles syslog 0-7, puertos SNMP 161/162, Zabbix 10050, netstat -ano/-tulpn, TTL 128-11=117, OID CPU con instancia .1, gateway vs "tu IP local" (sin confusión), caso práctico coherente: todos correctos.
- 🟡 `12-diagnostico-monitorizacion.md:58-61` — enlaces de boletines sin prefijo `boletin-`. **Ya corregido en Fase A.**

## Boletines

- ✅ 8+8 ejercicios, cobertura amplia (CEs h-k), graduación correcta, soluciones 1:1.
- ✅ Pistas en ambos boletines (7 y 8).
- ✅ Detalle técnico acertado: snmpget con comunidad coherente con la config del tema.

## Coherencia

- ✅ U03 (OSI) y U13 (cloud) correctas; "punto N" correctos.

## Convenciones

- ✅ `<details>`, es-ES, estilo oracional, formato numérico (coma decimal en NetFlow) correctos.

## Recomendaciones

1. Añadir una pieza de monitorización al caso práctico (p. ej., verificar uptime del servidor DNS vía SNMP).
2. Precisar la redacción de 12:49 (punto 08 no es teoría).
3. Sugerencia menor: citar puertos 161/162 en el cuerpo de la sección SNMP (hoy solo en crucigrama y boletín).