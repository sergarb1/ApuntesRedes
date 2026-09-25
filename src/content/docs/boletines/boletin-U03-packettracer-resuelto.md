---
title: Boletín UD3 — Packet Tracer resuelto
description: Soluciones paso a paso de las prácticas de IP, DHCP y IPv6 en Packet Tracer ✅
---

# ✅ Boletín UD3 — Packet Tracer resuelto

> Misma numeración y enunciados que el [por-resolver](/ApuntesRedes/boletines/boletin-u03-packettracer). Comandos, valores exactos y qué deberías ver en cada paso.

---

## 1. IP estática: vecinos en la misma subred

**Solución:**

1. 2 PCs + switch, cable straight-through.
2. `PC0` → *Desktop → IP Configuration*: `192.168.10.10`, máscara `255.255.255.0`.
3. `PC1`: `192.168.10.11`, máscara `255.255.255.0`.
4. `PC0`: `ping 192.168.10.11`.

**Esperado:** tras un posible primer timeout (ARP), replies al 100%.

**AND de comprobación:** ambas IPs con `/24` dan red `192.168.10.0` → vecinas → el switch las une sin router.

---

## 2. Fallo intencionado: máscara que no toca

**Solución:**

1. `PC1` → máscara `255.255.255.128` (IP sigue siendo `192.168.10.11`).
2. Desde `PC0`: `ping 192.168.10.11`.

**Qué pasa en la práctica (PT):**

- **PC0** ( /24 ): red `192.168.10.0` → destino **en su red** → ARP en la LAN.
- **PC1** ( /25 ): su red es `192.168.10.0/25` (hosts .1–.126) o `192.168.10.128/25`… en este caso `192.168.10.11` **sí** cae en `192.168.10.0/25`, así que muchas veces **el ping acaba yendo**.
- La trampa real aparece cuando la IP del vecino queda **fuera** de tu rango calculado: entonces tu PC trata el destino como “otra red” y, **sin gateway configurado**, no sabe por dónde salir → *Destination host unreachable* o timeout.

**Conclusión de examen:** el AND decide vecindad; máscaras distintas en la misma LAN rompen la idea de “misma subred” y es el clásico fallo de configuración.

---

## 3. Dos subredes, cero routers

**Solución:**

1. `PC0`: `192.168.10.10/24`. `PC1`: `192.168.20.10/24`. Ambas al mismo switch.
2. `ping 192.168.20.10` desde `PC0`.

**Esperado:** **no hay reply** (timeout / unreachable).

**Por qué:** el AND de cada uno da redes distintas (`192.168.10.0` vs `192.168.20.0`). PC0 manda el paquete “fuera de mi red” hacia su gateway… y **no hay gateway** (ni router). El switch solo mueve tramas en la misma capa 2 / mismo dominio de broadcast: no reencamina entre subredes IP.

---

## 4. DHCP en el router Cisco

**Solución:**

1. Router `R0` → G0/0 al switch.
2. CLI del router:

```
enable
configure terminal
interface GigabitEthernet0/0
 ip address 192.168.10.1 255.255.255.0
 no shutdown
 exit
ip dhcp excluded-address 192.168.10.1 192.168.10.5
ip dhcp pool RED
 network 192.168.10.0 255.255.255.0
 default-router 192.168.10.1
 dns-server 8.8.8.8
```

3. En cada PC: *IP Configuration → DHCP* → *Request*.

**Esperado (Command Prompt):**

```
IPv4 Address. . . . . . : 192.168.10.6   (o .7, según orden)
Subnet Mask . . . . . . : 255.255.255.0
Default Gateway . . . . : 192.168.10.1
```

La primera IP fuera del rango excluido confirma que el pool reparte. Ping al gateway (`ping 192.168.10.1`) → OK.

---

## 5. APIPA: cuando el DHCP no contesta

**Solución:**

1. En el router: `no ip service dhcp` (o desconecta G0/0 / apaga el router).
2. En la PC: *IP Configuration → DHCP* (o `ipconfig /renew`).

**Esperado:**

```
IPv4 Address. . . . . . : 169.254.x.x
Subnet Mask . . . . . . : 255.255.0.0
```

**Rango:** `169.254.0.0/16` (APIPA). En este laboratorio **no hay router hacia otras redes**, así que ni siquiera probarías salida a Internet: con DHCP caído, la PC queda “sola” en la intentona de autoconfiguración. En un escenario real con router sí: hablaría con su LAN directa pero no cruzaría el gateway.

---

## 6. Wireshark: el baile DORA

**Solución:**

1. Restaura el DHCP del router (o vuelve a conectar R0).
2. En la PC: captura en FastEthernet + `ipconfig /release` y luego `/renew`.
3. Filtro Wireshark: `bootp` o `dhcp` (PT puede etiquetarlo como DHCP).

**Esperado, en orden:**

| # | Mensión | Direcciones | En una frase |
|---|---|---|---|
| 1 | **DHCP Discover** | origen 0.0.0.0 → 255.255.255.255 | “¿Alguien reparte IPs?” |
| 2 | **DHCP Offer** | servidor → cliente | “Toma 192.168.10.6” |
| 3 | **DHCP Request** | cliente → servidor | “Acepto esa” |
| 4 | **DHCP ACK** | servidor → cliente | “Confirmada” |

Si solo ves Discover y no hay Offer: revisa pool, VLAN o que el router tenga IP en la interfaz de la red del cliente.

---

## 7. Wireshark: ARP bajo el ping

**Solución:**

1. `PC0` Command Prompt:

```
arp -d *
ping 192.168.10.11
```

2. Captura filtrada: `arp` y luego `icmp`.

**Esperado:**

1. **ARP Request** (broadcast): *Who has 192.168.10.11? Tell 192.168.10.10* → EtherType `0x0806`.
2. **ARP Reply**: *192.168.10.11 is at 00:…* → se llena la caché ARP.
3. **ICMP Echo / Reply** → EtherType `0x0800`.

**Conclusión:** sin la MAC del vecino no hay trama Ethernet completa; el ARP es el puente obligatorio capa 3 → capa 2 en IPv4 (en IPv6 ese papel lo hace NDP, punto 14).

---

## 8. IPv6 en PT: estático o SLAAC

**Solución (a) — estático:**

1. Router: `ipv6 unicast-routing`; en G0/0: `ipv6 address 2001:DB8:1::1/64` y `no shutdown`.
2. PCs en *Config → IPv6*:
   - `PC0`: `2001:DB8:1::10`, prefix `/64`, gateway `2001:DB8:1::1` (o la LLA del router).
   - `PC1`: `2001:DB8:1::11`.
3. `ping 2001:DB8:1::11` (o hacia el router).

**Solución (b) — SLAAC (si tu versión lo soporta bien):**

1. Con el router anunciando la interfaz `/64` y `ipv6 unicast-routing` activo, en la PC: *IPv6 Configuration → Autoconfig* / DHCPv6 según el laboratorio.
2. Comprueba la dirección generada con `ipconfig` y haz un ping IPv6.

**Esperado:** replies IPv6 al 100% en (a). En (b), aparece una GUA que empieza por `2001:db8:1:…` más la link-local `fe80::…` automática. Si `ping` falla, el primer sospechoso es `show ipv6 interface brief` en el router: interfaz down o sin dirección (el fallo clásico del laboratorio de la unidad).

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto UD3 | Punto |
|---|---|---|
| 1 | IP estática y misma subred | 1–2 |
| 2–3 | AND, máscaras, límites de subred | 2, 5–6 |
| 4–5 | DHCP pool, excluded, APIPA | 8 |
| 6 | DORA paso a paso | 8 |
| 7 | ARP (puente UD2→UD3) | 1 |
| 8 | IPv6 estático / SLAAC | 12, 16 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-direccionamiento-ip) · **También:** [Por resolver](/ApuntesRedes/boletines/boletin-u03-packettracer)
