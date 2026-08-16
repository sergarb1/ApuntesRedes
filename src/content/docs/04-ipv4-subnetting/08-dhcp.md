---
title: 08 — DHCP
description: El conserje que reparte IPs automáticamente con el proceso DORA 🤖
---

<p><small>El conserje que reparte IPs automáticamente con el proceso DORA 🤖</small></p>

> 🗺️ **Estás en:** 🧮 **U04 · IPv4 y subnetting** → 08 · DHCP

---

## 📬 La idea en una frase

> El **DHCP** (*Dynamic Host Configuration Protocol*) asigna automáticamente a cada dispositivo su **IP, máscara, gateway y DNS** con un intercambio de 4 mensajes llamado **DORA**, y puede configurarse en un router Cisco en cinco líneas.

Imagina repartir configuraciones a miles de equipos a mano. DHCP es el conserje que, en cuanto un dispositivo llega, le da la llave (IP) y le dice dónde están las salidas (gateway y DNS). Y si el equipo se va, la llave vuelve al cajón para el siguiente.

---

## 🔄 El proceso DORA

En cuanto arranca un dispositivo sin configuración estática, lanza el baile de cuatro mensajes. El nombre lo dice todo: **D**iscover, **O**ffer, **R**equest, A**CK**.

```
PC                         Servidor DHCP
 │                              │
 ├──── DHCP DISCOVER ─────────►│  Búsqueda de servidor DHCP
 │◄──── DHCP OFFER ────────────┤  Oferta: "Toma 192.168.1.20"
 ├──── DHCP REQUEST ──────────►│  Aceptación: "Quiero esa IP"
 │◄──── DHCP ACK ──────────────┤  Confirmación: "Es tuya"
```

1. **DISCOVER:** el PC grita a la red buscando servidores DHCP (va a broadcast).
2. **OFFER:** el servidor contesta con una IP "reservada en la caja" y sus extras (máscara, gateway, DNS).
3. **REQUEST:** el PC acepta formalmente esa IP y se la reserva.
4. **ACK:** el servidor confirma. Configuración aplicada. 

> 💡 **¿Qué pasa si el DHCP no responde?** El PC asigna él mismo una **APIPA (169.254.0.0/16)** y queda "huérfano": habla con la red local pero no sale a Internet. Ese es el dolor de cabeza más típico del punto 8 del [boletín inicial](/ApuntesRedes/boletines/boletin-u04-inicial).

---

## ⚙️ Configuración en un router Cisco

El router puede hacer de servidor DHCP con un pool. La configuración típica cabe en un puñado de líneas:

```
ip dhcp pool VENTAS
 network 192.168.1.0 255.255.255.128
 default-router 192.168.1.1
 dns-server 8.8.8.8 1.1.1.1
 lease 8

ip dhcp excluded-address 192.168.1.1 192.168.1.10
```

Desgranando:

- `ip dhcp pool VENTAS` → crea un pool llamado VENTAS.
- `network 192.168.1.0 255.255.255.128` → el rango que reparte (aquí, una subred /25).
- `default-router 192.168.1.1` → el gateway que anuncia a los clientes.
- `dns-server 8.8.8.8 1.1.1.1` → los servidores DNS que reparte.
- `lease 8` → el tiempo de contrato de la IP (8 días).
- `ip dhcp excluded-address 192.168.1.1 192.168.1.10` → saca del pool las IPs fijas antes de repartir, para que DHCP no las pise con las estáticas.

---

## 📦 DHCP en Packet Tracer

En Packet Tracer tienes tres caminos para montar un servidor DHCP:

1. **Router** → con `ip dhcp pool` en CLI, como arriba.
2. **Servidor dedicado** → en la pestaña *Config → DHCP*: seleccionas el servicio, defines la red, la IP por defecto (gateway), el DNS y el rango máximo de usuarios.
3. **Switch multicapa** → con comandos similares a los del router si tiene capacidades de capa 3.

> ⚠️ **En Packet Tracer, primero la estrella:** verifica los LEDs y las VLAN antes de culpar al DHCP. Un PC que se queda en APIPA suele ser porque el servidor DHCP está en otra VLAN sin DHCP relay, no porque el pool esté mal.

---

## 🛡️ ¿Por qué excluir las IPs estáticas?

Regla de oro que todos los administradores pagan caro algún día:

> 💡 **Siempre excluye las IPs estáticas** del rango DHCP (servidores, routers, impresoras de red). Si no, puede haber **conflictos de IP**.

Con `ip dhcp excluded-address 192.168.1.1 192.168.1.10` apartas, por ejemplo, el router (.1), los servidores (.2-.9) y la impresora (.10) del reparto. Si DHCP entregara `192.168.1.1` —que ya es el gateway—, dos equipos acabarían con la misma IP y la semana sería muy larga. El [boletín avanzado](/ApuntesRedes/boletines/boletin-u04-avanzado) te propone precisamente ese escenario de conflicto.

---

## 🧠 Mini-chequeo

1. ¿Qué significa la sigla DORA y qué cuatro mensajes la forman?
2. ¿Qué comando aparta las IPs estáticas del reparto y qué línea del pool entrega el gateway?
3. Un PC muestra IP `169.254.x.x` tras encender. ¿Qué ha pasado?

<details>
<summary>🔄 Respuestas</summary>

1. **Discover, Offer, Request, ACK** — el intercambio de 4 mensajes del DHCP.
2. La exclusión: `ip dhcp excluded-address <IP-ini> <IP-fin>`. El gateway se entrega con `default-router` dentro del pool.
3. El **servidor DHCP no respondió** (o está mal configurado/inaccesible): el PC se asignó una **APIPA** (169.254.0.0/16) y queda sin salida a Internet.
</details>

---

## ✅ Resumen en 3 frases

- DHCP reparte **IP, máscara, gateway y DNS** de forma automática mediante el proceso **DORA**.
- En un router Cisco se configura con `ip dhcp pool`, añadiendo `network`, `default-router`, `dns-server` y `lease`.
- **Excluye siempre las IPs estáticas** del pool (`ip dhcp excluded-address`) para evitar conflictos de IP.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| DHCP | Protocolo de asignación automática de configuración IP |
| DORA | Discover, Offer, Request, ACK: el proceso de 4 mensajes |
| Pool | Rango de direcciones que el servidor DHCP puede repartir |
| Lease | Tiempo de contrato de una IP concedida |
| Excluded-address | IPs apartadas del pool (las estáticas) |
| APIPA | IP autoasignada 169.254.x.x si DHCP no responde |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/04-ipv4-subnetting) · **Anterior:** [07 · VLSM](/ApuntesRedes/04-ipv4-subnetting/07-vlsm) · **Siguiente:** [09 · Cierre](/ApuntesRedes/04-ipv4-subnetting/09-cierre)