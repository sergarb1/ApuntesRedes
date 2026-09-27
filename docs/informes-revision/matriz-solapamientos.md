# Matriz de solapamientos — revisión vigente

Conceptos que aparecen en **varias unidades**. Conteo = ficheros `.md` (índice + puntos) de esa unidad que mencionan el término (baseline F0, 2026-09-26). Mención ≠ duplicado: hay que leer contexto en la sesión de cada unidad.

Veredictos: ✅ mención legítima · ↪️ mover a … · ❌ quitar · ⏳ por decidir.

| Concepto | Unidades (menciones) | Veredicto |
|---|---|---|
| **DHCP** | introducción (9) · IP (11) · trunking (7) · servicios (10) · switching (2) · NAT (3) · AD (5) · inalámbricas (3) | ✅ sesión 03 (lado IP) + ✅ sesión 05 (lado trunking): IP es la casa del DORA, la config en router, exclusiones y DHCPv6 (punto 8 y 13, lab y boletines); trunking (`07-dhcp-por-vlan`) es la casa del escenario con VLANs (pool por VLAN + `ip helper-address`). Queda solo el lado servidor en la sesión 10 |
| **DNS** | introducción (9) · IP (9) · servicios (10) · NAT (2) · inalámbricas (3) | ✅ sesión 03 (lado IP): solo como opción DHCP, "máquina DNS" y DNS64 (transición); el servidor DNS va en servicios. Frontera intro ↔ servicios pendiente |
| **ARP** | ethernet (1) · IP (5) · switching (2) · trunking (3) · enrutamiento (3) · AD (2) · introducción (1) | ✅ sesión 02: puente en Ethernet (solo EtherType 0x0806 + enlace a IP) → desarrollo en IP (cadena verificada en la sesión 03) |
| **STP** | switching (7) · AD (7) · **ethernet (3)** · introducción (1) · inalámbricas (1) | ✅ sesión 02: falso positivo en ethernet = cable *apantallado* (Shielded Twisted Pair), no Spanning Tree |
| **802.11 / WiFi** | ethernet (2+3) · inalámbricas (6+9) · NAT (2+3) · introducción (6) | ✅ sesión 02: mención a nivel de capa 1 y de trama (puntos 1 y 9), enlaza a inalámbricas; sin canales/seguridad propios |
| **Ruta por defecto** | enrutamiento (5) · OSPF (4) · IP (1) | ✅ sesión 03: IP solo la menciona una vez (sin desarrollo); el peso es de enrutamiento/OSPF. Sesión 06 = casa del enrutamiento (punto 4: default + flotantes); ✅ sesión 07 cierra la pata OSPF (`default-information originate`, punto 8) |
| **Port Security** | ACL (5) · switching (1) | ✅ sesión 04: switching solo el punta de `02-aprendizaje-mac` (defensa del CAM flooding, con enlace); concepto, violaciones, errdisable y recovery = ACL (punto 5). Los 2 ejercicios de Port Security que tenía el boletín avanzado de switching se han **movido** al boletín avanzado de ACL (sin duplicar) |
| **VLAN** | switching (11) · trunking (9) · AD (6) · introducción (5) · inalámbricas (5) · servicios (3) | ✅ sesión 04 (reparto switching ↔ trunking): switching = casa del concepto (índice + puntos 8-9 + config mínima nueva + lab de segmentación); trunking = 802.1Q, configuración de trunks, VTP/DTP y seguridad (sus puntos 1-6); AD, inalámbricas y servicios = sus propias sesiones |
| **HSRP** | AD (8) · **inalámbricas (1)** | ⏳ ¿por qué HSRP en inalámbricas? |
| **NAT** | NAT (10) · IP (6) · introducción (2) · ACL (3) · resto: 1–2 (referencias) | ✅ sesión 03 (lado IP): privadas como motivo de RFC1918 + NAT64/DNS64 como transición (ya sin "NAT inverso"); detalle en la unidad de NAT |
| **OSPF** | OSPF (10) · enrutamiento (5) · IP (4) · AD (3) · resto (1–2) | ✅ sesión 03 (lado IP): las 4 menciones de IP son puentes forward sin desarrollo. ✅ sesión 06 confirma el lado enrutamiento: sus 5 apariciones son la tabla de AD (puntos 4-5) y puentes forward. ✅ sesión 07 = casa de OSPF (teoría + `default-information originate`) |
| **ICMP** | IP (5) · ACL (2) · enrutamiento (2) · boletines (14) | ✅ sesión 03: ICMPv4 solo en TTL/Time Exceeded/traceroute; ICMPv6+NDP tienen punto propio; el resto son usos operativos |
| **MTU** | ethernet (2) · IP (2) | ✅ sesión 02: en Ethernet solo "techo de la trama 1500 y fragmenta la capa 3" con enlace a IP; sesión 03 confirma el desarrollo en `01-estructura-ipv4` |
| **IPv6** | IP (10 ficheros propios) | ✅ sesión 03: 8 de 17 puntos (09-16) es el peso del RA2·d "IPv4/IPv6" y esta es la única unidad que cubre IPv6 — equilibrio justificado, se mantiene |

## Fronteras ya documentadas en AGENTS

- Ethernet vive solo en capas 1–2 (sin ARP/IPv4/MTU en profundidad; WiFi solo a nivel de trama).
- Boletines de Ethernet: ejercicios WiFi → inalámbricas; ARP/MTU/cabecera → dirección IP.

## Estado

- [x] Baseline F0 (conteo por unidad)
- [x] Sesión 01 · introducción — sin candidatos a mover/quitar: sus menciones de DHCP/DNS/ARP/WiFi/VLAN/OSPF/NAT son vocabulario o puente; los duplicados eran internos (05↔10 y FAQ↔Atrévete del punto 10) y están resueltos. Ver [revision-U01-introduccion.md](revision-U01-introduccion.md).
- [x] Sesión 02 · ethernet y cableado — sin candidatos a mover/quitar: ARP solo como EtherType (puente a IP), MTU solo como techo de trama, WiFi a nivel de capas 1–2 con enlace a inalámbricas; STP en esta unidad es cable apantallado (falso positivo). Ver [revision-U02-ethernet-cableado.md](revision-U02-ethernet-cableado.md).
- [x] Sesión 03 · direccionamiento IP — sin candidatos a mover/quitar: rutas estáticas solo como referencia adelantada en el lab, ACL fuera del lab (sustituidas por un fallo DHCP propio), NAT/OSPF solo puentes forward, ICMPv6 con punto propio. Cerradas las filas DHCP/DNS/NAT/OSPF/ICMP/IPv6/MTU/Ruta por defecto (lado IP). Ver [revision-U03-direccionamiento-ip.md](revision-U03-direccionamiento-ip.md).
- [x] Sesión 04 · switching y VLAN — candidato a mover resuelto: los 2 ejercicios de Port Security del boletín avanzado → boletín avanzado de ACL (lado ACL ya cerrado: su sesión cubrirá el resto). Cerradas las filas Port Security y VLAN (reparto switching ↔ trunking); el "Puente al DHCP" del punto 8 de VLAN es puente legítimo (la fila DHCP queda con el cruce trunking ↔ servicios de la sesión 10). Ver [revision-U04-switching-vlan.md](revision-U04-switching-vlan.md).
- [x] Sesión 05 · trunking e inter-VLAN — sin candidatos a mover/quitar: VLAN = reparto ya cerrado en la sesión 04; DHCP con el lado trunking cerrado (queda solo el lado servidor, sesión 10); ACL solo como puente (VACL propia y "más adelante" en un boletín). CEs de la unidad alineados con letras oficiales (RA4·d, RA5·c–f). Ver [revision-U05-trunking-inter-vlan.md](revision-U05-trunking-inter-vlan.md).
- [x] Sesión 06 · enrutamiento estático — sin candidatos a mover/quitar: OSPF solo puentes y tabla de AD; ARP/ICMP usos operativos (filas ya cerradas); banner reclamado por ACL se cubre aquí (punto 2). Corregidos la ruta por defecto de R2 (se apuntaba a sí mismo) y el laboratorio (red B sin definir, defaults que enmascaraban los fallos). Ver [revision-U06-enrutamiento-estatico.md](revision-U06-enrutamiento-estatico.md).
- [x] Sesión 07 · OSPF — sin candidatos a mover/quitar: la teoría de OSPF es su casa; los 5 usos en estático son tabla de AD y puentes forward, y en IP son puentes. Cerradas las filas OSPF y Ruta por defecto (pata OSPF con `default-information originate`). Corregidos el RA6/CEs del índice (estaban inventados), el fallo intencionado del cierre (decía FULL donde no hay vecindad) y el 7a duplicado del boletín inicial. Ver [revision-U07-ospf.md](revision-U07-ospf.md).
- [ ] Sesiones 08–12
- [ ] Cierre transversal
