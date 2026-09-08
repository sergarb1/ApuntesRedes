# Informe docente — U06 · IPv6 y transición

**Estado global: 4 / 5**

Contenido técnico muy sólido y preciso (2¹²⁸, EUI-64, solicited-node, NAT64/DNS64, DAD, RDNSS — todo verificado correcto), ordenación coherente y boletines bien graduados. Se descuenta por un defecto de navegación en el índice (ya corregido en Fase A) y dos ambigüedades didácticas en el boletín avanzado.

---

## Orden docente

- ✅ Progresión correcta: base notacional→compresión→tipos→EUI-64/SLAAC→DHCPv6→NDP→transición→configuración→cierre.
- ✅ SLAAC (04) antes que NDP (06): ordenación "concepto antes de mecanismo" válida y bien enlazada.
- ✅ Cierre correctamente situado tras configuración; el índice avisa del flujo.

## Calidad de explicación

- ✅ Direcciones de ejemplo válidas y bien comprimidas (verificadas una a una).
- ✅ EUI-64 interno coherente entre unidad y boletín (021A:2BFF:FE3C:4D5E).
- ✅ Jerga en primer uso: LLA/GUA/ULA, solicited-node, EUI-64.
- ✅ Analogías: número de teléfono fijo, farmacia 24h (anycast), "el ARP nuevo" (NDP), desperdicio elegante.

## Contenido

- 🔴 `06-ipv6-transicion.md:58-61` — enlaces de boletines sin prefijo `boletin-` (404). **Ya corregido en Fase A.**
- 🟡 `boletin-U06-avanzado.md:16-17` + resuelto:12 — ejercicio 1a contradictorio ("Oficina central: /48 completa" + "5 sedes desde el mismo /48") y la solución da tres respuestas distintas (/51, /48, /52) sin resolver.
- 🟡 `boletin-U06-avanzado-resuelto.md:36` — afirma que `2001:db8::` "es enrutable / puede acceder a Internet"; es prefijo de documentación (RFC 3849), no enrutable en Internet real.
- 🟡 `05-dhcpv6.md:37` — "M=1 (O irrelevante)": RFC 8415 requiere O=1 también cuando M=1. Simplificación aceptable pero no exacta.
- ✅ 2¹²⁸, rangos GUA/LLA/ULA/multicast, EUI-64 FFFE+U/L, grupos cero del `::`, RDNSS solo IPv6, DAD, solicited-node, NAT64/DNS64, PMTUD: correctos.

## Boletines

- ✅ 8+8 ejercicios, soluciones 1:1, graduación correcta, pistas en 7/8 del avanzado.
- ✅ EUI-64, tipos y valores coinciden con la unidad.
- 🟡 Defectos ya citados: ejercicio 1a ambigüedad y matiz de `2001:db8::` no enrutable.

## Coherencia y convenciones

- ✅ "punto N" y U0X correctos; `<details>`, es-ES, estilo oracional, formato numérico correctos.

## Recomendaciones

1. Reformular el ejercicio 1a del boletín avanzado (enunciado + solución).
2. Matizar `2001:DB8::/32` como no enrutable en Internet real.
3. Afinar `05-dhcpv6.md:37` (M=1 → O=1 también).
4. Matizar la afirmación histórica de 01:25 ("Europa recibió la parte del león").