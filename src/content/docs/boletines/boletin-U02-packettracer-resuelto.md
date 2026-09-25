---
title: Boletín UD2 — Packet Tracer resuelto
description: Soluciones paso a paso de las prácticas de capas 1 y 2 en Packet Tracer ✅
---

# ✅ Boletín UD2 — Packet Tracer resuelto

> Misma numeración y enunciados que el [por-resolver](/ApuntesRedes/boletines/boletin-u02-packettracer). Aquí tienes el camino completo: qué clicar, qué comando pegar y qué deberías ver.

---

## 1. Primera topología: 3 PC y un switch

**Solución:**

1. En PT, coloca **3 PCs** y **1 Switch** (2960 vale).
2. Cable **Copper Straight-Through** de cada PC al switch (PC ↔ switch = directo).
3. Enciende las interfaces si están apagadas (en *Config → FastEthernet* → *On*).
4. IPs estáticas en *Desktop → IP Configuration*:
   - `PC0`: `192.168.1.10`, máscara `255.255.255.0`
   - `PC1`: `192.168.1.11`
   - `PC2`: `192.168.1.12`
5. En `PC0`, *Desktop → Command Prompt*: `ping 192.168.1.12`.

**Esperado:** tras 1–2 echo (el ARP resolviéndose), replies al 100%:

```
Reply from 192.168.1.12: bytes=32 time<1ms TTL=128
```

**Si falla:** revisa cable (debe ser straight-through), que todas las IPs estén en la **misma subred** y los LEDs en verde.

---

## 2. PC a PC: ¿qué cable?

**Solución:**

1. Quita el switch de la ecuación: solo `PC0` y `PC1`, cable de cobre entre sus FastEthernet.
2. Prueba `ping 192.168.1.11` desde `PC0`.
3. Si da *Destination host unreachable*, cambia a **Copper Cross-Over** (o comprueba si tu PT conecta automáticamente con Auto-MDI-X).

**Esperado:** con el cable **cruzado** (o auto), el ping responde. Con cable **directo** entre dos PCs “iguales”, en PT clásico no hay enlace: el LED se queda en rojo y el ping no sale.

**Regla:** PC ↔ PC y switch ↔ switch = **cruzado**; PC ↔ switch = **directo** (hoy Auto-MDI-X lo simplifica en hardware real, pero en el examen manda la regla).

---

## 3. La tabla MAC del switch

**Solución:**

1. Clic en `Switch0` → pestaña **CLI** (Enter si pide initial config dialog → `no`).
2. `enable` (o `en`) y luego:

```
show mac address-table
```

**Esperado:** tras los pings del ejercicio 1, verás entradas tipo:

```
Vlan    Mac Address       Type        Ports
----    -----------       --------    -----
   1    00D0.xxxx.xxA     DYNAMIC     Fa0/1
   1    00D0.xxxx.xxB     DYNAMIC     Fa0/2
```

Cada MAC aprendida apunta al puerto de la PC correspondiente. Si está vacía: haz `ping` otra vez y repite el `show`.

---

## 4. Fallo de capa 1 a propósito

**Solución:**

1. Selecciona el cable de `PC0` y bórralo (o en la interfaz de la PC: *Config → FastEthernet → Off*).
2. `ping 192.168.1.11` desde **`PC1`** (no depende del cable de PC0): debe responder igual.
3. `ping 192.168.1.11` desde **`PC0`**: falla.

**Interpretación:**

- Solo el host desconectado pierde conectividad → el fallo es **enlace físico del PC0**, capa 1.
- Si se hubiera ido el cable del switch hacia todos, fallaría para todos: ahí el problema sería el enlace/trunk o el switch.
- En OSI: el *ping* de PC0 no genera trama en la red → fallo **capa 1** (medio), no de direccionamiento.

---

## 5. Modo Simulation: sigue la trama

**Solución:**

1. Abajo a la derecha: **Simulation** (junto a *Realtime*).
2. En *Simulation Panel*, filtra o añade solo **ICMP** si hay demasiados protocolos.
3. `PC0` → Command Prompt → `ping 192.168.1.11` → botón **Capture / Forward** (▶) en cada evento.

**Esperado (flujo típico):**

1. PC0 encapsula ICMP en **Ethernet**: origen MAC de PC0, destino MAC del switch (broadcast ARP antes, si no hay cache).
2. Switch recibe, mira su tabla MAC, sale por el puerto de PC1.
3. PC1 contesta: ICMP reply con MACs invertidas.

En cada sobre, pestaña *Outbound PDU details*: confirma **EtherType** y direcciones MAC en cada salto (la IP de capa 3 no cambia en la LAN; las MAC se actualizan por enlace).

---

## 6. Wireshark: EtherType de un ping

**Solución (Wireshark real o detalle de capas de PT):**

1. Captura en la interfaz de `PC0` (o exporta tráfico de PT).
2. `ping 192.168.1.11` → para la captura.
3. Filtro: `icmp`.
4. Clic en una trama → árbol **Ethernet II**.

**Esperado:**

| Campo | Valor típico |
|---|---|
| Destination | MAC de `PC1` (o del switch en el 1er salto) |
| Source | MAC de `PC0` |
| Type | **IPv4 (0x0800)** |

El EtherType `0x0800` es el que ya viste en la trama Ethernet de la UD2: el payload de esa trama es un paquete IPv4.

---

## 7. Wireshark: ¿dónde está el ARP?

**Solución:**

1. En la misma captura, filtra `arp`.
2. Justo antes del primer `ping` exitoso deberías ver:

```
Who has 192.168.1.11? Tell 192.168.1.10   (request, EtherType 0x0806)
192.168.1.11 is at 00:xx:xx:xx:xx:xx       (reply)
```

**Interpretación:** la PC no sabe la MAC del destino → manda ARP en broadcast → la respuesta mete la MAC en la caché ARP → los pings siguientes salen sin volver a preguntar. Si el primer ping da 1 perdido y el resto va, casi siempre es este proceso.

---

## 8. Hub o switch: dominio de colisión

**Solución:**

1. **Topología A:** 3 PCs + un **Hub** (repetidor de capa 1).
2. **Topología B:** 3 PCs + un **Switch**.
3. Desde PC-A, haz ping a PC-B y observa con *Simulation* o captura a quién llega cada trama.

**Esperado:**

| | Hub | Switch |
|---|---|---|
| Trama de PC-A | Sale por **todos** los puertos | Solo al **puerto de PC-B** |
| Dominio de colisión | Uno grande para el hub | **1 por puerto** (switch = N dominios) |
| Broadcast | A todos | A todos (mismo dominio de broadcast salvo VLAN) |

**Frase:** el hub es *mira todos* (capa 1 pura); el switch aprende MACs y solo inunda cuando no sabe el destino (o es broadcast).

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto UD2 | Capa |
|---|---|---|
| 1–2 | Cables directo/cruzado, montaje | 1 |
| 3 | Tabla MAC, switches | 2 |
| 4 | Diagnóstico de fallo físico | 1 / OSI |
| 5 | Simulation mode, flujo de la trama | 1–2 |
| 6–7 | EtherType, MACs, ARP (aporte a UD3) | 2 |
| 8 | Hub vs switch | 1–2 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/02-ethernet-cableado) · **También:** [Por resolver](/ApuntesRedes/boletines/boletin-u02-packettracer)
