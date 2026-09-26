# Matriz de solapamientos — revisión vigente

Conceptos que aparecen en **varias unidades**. Conteo = ficheros `.md` (índice + puntos) de esa unidad que mencionan el término (baseline F0, 2026-09-26). Mención ≠ duplicado: hay que leer contexto en la sesión de cada unidad.

Veredictos: ✅ mención legítima · ↪️ mover a … · ❌ quitar · ⏳ por decidir.

| Concepto | Unidades (menciones) | Veredicto |
|---|---|---|
| **DHCP** | introducción (9) · IP (11) · trunking (7) · servicios (10) · switching (2) · NAT (3) · AD (5) · inalámbricas (3) | ⏳ ¿intro/IP explican y servicios detallan? ¿`07-dhcp-por-vlan` duplica el de servicios? |
| **DNS** | introducción (9) · IP (9) · servicios (10) · NAT (2) · inalámbricas (3) | ⏳ frontera intro/IP ↔ servicios |
| **ARP** | ethernet (1) · IP (5) · switching (2) · trunking (3) · enrutamiento (3) · AD (2) · introducción (1) | ⏳ regla: puente en Ethernet, desarrollo en IP (¿cumple?) |
| **STP** | switching (7) · AD (7) · **ethernet (3)** · introducción (1) · inalámbricas (1) | ⏳ ¿ethernet fuera de alcance? (regla: solo capas 1–2) |
| **802.11 / WiFi** | ethernet (2+3) · inalámbricas (6+9) · NAT (2+3) · introducción (6) | ⏳ mención en Ethernet vs desarrollo en inalámbricas |
| **Ruta por defecto** | enrutamiento (5) · OSPF (4) · IP (1) | ⏳ ¿06 enseña y 07 solo repite o recalcula? |
| **Port Security** | ACL (5) · switching (1) | ⏳ ¿va con ACL o con switching? |
| **VLAN** | switching (11) · trunking (9) · AD (6) · introducción (5) · inalámbricas (5) · servicios (3) | ⏳ reparto switching ↔ trunking |
| **HSRP** | AD (8) · **inalámbricas (1)** | ⏳ ¿por qué HSRP en inalámbricas? |
| **NAT** | NAT (10) · IP (6) · introducción (2) · ACL (3) · resto: 1–2 (referencias) | ⏳ |
| **OSPF** | OSPF (10) · enrutamiento (5) · IP (4) · AD (3) · resto (1–2) | ⏳ puentes de enrutamiento |
| **ICMP** | IP (5) · ACL (2) · enrutamiento (2) · boletines (14) | ⏳ |
| **MTU** | ethernet (2) · IP (2) | ⏳ regla: fragmentación/MTU → IP |
| **IPv6** | IP (10 ficheros propios) | ⏳ ¿la unidad de IP está desequilibrada (18 ficheros, 10 IPv6)? |

## Fronteras ya documentadas en AGENTS

- Ethernet vive solo en capas 1–2 (sin ARP/IPv4/MTU en profundidad; WiFi solo a nivel de trama).
- Boletines de Ethernet: ejercicios WiFi → inalámbricas; ARP/MTU/cabecera → dirección IP.

## Estado

- [x] Baseline F0 (conteo por unidad)
- [ ] Sesión 01 · introducción
- [ ] Sesiones 02–12
- [ ] Cierre transversal
