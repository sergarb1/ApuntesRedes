---
title: Boletín UD3 — Inicial (Resuelto)
description: Soluciones de ejercicios básicos de IPv4, cabecera, ARP, fragmentación y subnetting
---

# ✅ Boletín UD3 — Inicial (Resuelto)

---

## 1. Conversión binario

a) 192 → **11000000**
b) 10 → **00001010**
c) 255 → **11111111**
d) 0 → **00000000**

## 2. Conversión a decimal

a) 11000000 → **192**
b) 10101000 → **168**
c) 00001010 → **10**
d) 11111111 → **255**

## 3. ¿Qué máscara es?

/24 → b) 255.255.255.0  
/16 → c) 255.255.0.0  
/30 → a) 255.255.255.252  
/8 → d) 255.0.0.0

## 4. Verdadero o falso

a) **Falso.** IPv4 tiene 32 bits (4 octetos).
b) **Falso.** Cada octeto va de 0 a 255. 256 no existe en un octeto de 8 bits.
c) **Verdadero.** La última dirección del rango es el broadcast.
d) **Verdadero.** Dynamic Host Configuration Protocol.
e) **Falso.** Las IPs privadas (RFC 1918) no son enrutables en Internet. Necesitan NAT.

## 5. Calcula hosts

a) /24 → 256 - 2 = **254 hosts**
b) /27 → 32 - 2 = **30 hosts**
c) /30 → 4 - 2 = **2 hosts**
d) /29 → 8 - 2 = **6 hosts**

## 6. Identifica el tipo

a) 10.0.0.15 → **Privada** (clase A, RFC 1918)
b) 8.8.8.8 → **Pública** (DNS de Google)
c) 192.168.1.1 → **Privada** (clase C, RFC 1918)
d) 127.0.0.1 → **Especial** (loopback/localhost)
e) 172.16.0.100 → **Privada** (clase B, RFC 1918)
f) 169.254.1.1 → **Especial** (APIPA, cuando DHCP no responde)

## 7. Calcula la dirección de red

a) `192.168.1.37` & `255.255.255.0` → la máscara deja pasar los 3 primeros octetos y borra el último → **192.168.1.0/24**

```
IP:      192.168.1.37  → 11000000.10101000.00000001.00100101
Máscara: 255.255.255.0 → 11111111.11111111.11111111.00000000
AND:                   → 11000000.10101000.00000001.00000000
Red:     192.168.1.0
```

b) `10.0.0.150` & `255.0.0.0` → **10.0.0.0/8**

```
IP:      10.0.0.150  → 00001010.00000000.00000000.10010110
Máscara: 255.0.0.0   → 11111111.00000000.00000000.00000000
AND:                 → 00001010.00000000.00000000.00000000
Red:     10.0.0.0
```

c) `172.16.0.200` & `255.255.255.128` → el octeto mágico es el último: `200 = 11001000`, `128 = 10000000` → AND = `10000000` = 128 → **172.16.0.128/25**

```
IP:      172.16.0.200  → 10101100.00010000.00000000.11001000
Máscara: 255.255.255.128 → 11111111.11111111.11111111.10000000
AND:                    → 10101100.00010000.00000000.10000000
Red:     172.16.0.128
```

d) `192.168.1.66` & `255.255.255.192` → octeto mágico el último: `66 = 01000010`, `192 = 11000000` → AND = `01000000` = 64 → **192.168.1.64/26**

```
IP:      192.168.1.66  → 11000000.10101000.00000001.01000010
Máscara: 255.255.255.192 → 11111111.11111111.11111111.11000000
AND:                    → 11000000.10101000.00000001.01000000
Red:     192.168.1.64
```

## 8. Subredes iguales

a) **2 bits:** `2ⁿ ≥ 4` → n = 2 (2² = 4).
b) Nueva máscara: **/26 = 255.255.255.192** (`11111111.11111111.11111111.11000000`).
c) Hosts=(32 − 26 = 6 bits) → 2⁶ − 2 = **62 hosts útiles** por subred.
d) Incremento = 2⁶ = 64:

| Subred | Red | Primer host | Último host | Broadcast |
|---|---|---|---|---|
| 1 | 192.168.5.0/26 | 192.168.5.1 | 192.168.5.62 | 192.168.5.63 |
| 2 | 192.168.5.64/26 | 192.168.5.65 | 192.168.5.126 | 192.168.5.127 |
| 3 | 192.168.5.128/26 | 192.168.5.129 | 192.168.5.190 | 192.168.5.191 |
| 4 | 192.168.5.192/26 | 192.168.5.193 | 192.168.5.254 | 192.168.5.255 |

## 9. Cabecera IPv4

**Matching:** 1 → c (TTL) · 2 → a (Protocolo) · 3 → b (IPs) · 4 → d (fragmentación)

**V/F:**

e) **Verdadero.** 5 words de 32 bits = **20 bytes** (sin opciones).
f) **Falso.** El checksum de la cabecera solo valida **la cabecera** en cada salto. Los datos los protegen TCP/UDP; el enlace, el FCS de la trama.
g) **Verdadero.** Cada router resta 1 al TTL; a 0 se descarta y se suele notificar ICMP "Time Exceeded" (base del `traceroute`).

## 10. ARP en la red local

a) **ARP Request** en broadcast: MAC destino `FF:FF:FF:FF:FF:FF`. Pregunta: *"¿quién tiene 192.168.1.20?"*.
b) El host dueño de `192.168.1.20` responde con un **ARP Reply en unicast** incluyendo su MAC.
c) Guarda el par **IP → MAC** en la **tabla ARP**. En Windows: `arp -a` (en Linux, `ip neigh`).
d) **IP → MAC** (dirección lógica a dirección de enlace). La inversa no hace falta: la MAC solo se usa en el medio local.

## 11. MTU y fragmentación

a) Payload útil por fragmento = 1500 − 20 = **1480 bytes** (1480 es múltiplo de 8, como exige el offset).
b) Datos totales = 4000.  
   - Frag 1: 1480 · Frag 2: 1480 · Frag 3: **1040** (4000 − 2960).  
   → **3 fragmentos.** El último mide 1040 + 20 = **1060 bytes** en total.
c) **Flag MF** (*More Fragments*) = **1** en los que no son el último; el último lleva **MF = 0**.
d) **El host destino.** Los routers solo fragmentan si hace falta; no reensamblan.
