---
title: 7 — DHCP
description: El conserje que reparte IPs automáticamente con el proceso DORA 🤖
---

<p><small>El conserje que reparte IPs automáticamente con el proceso DORA 🤖</small></p>

> 🗺️ **Estás en:** 🧮 **Direccionamiento IP y subnetting** → 7 · DHCP

---

## 📬 La idea en una frase

> El **DHCP** (*Dynamic Host Configuration Protocol*) asigna automáticamente a cada dispositivo su **IP, máscara, gateway y DNS** con un intercambio de 4 mensajes llamado **DORA**, y puede configurarse en un router Cisco en cinco líneas.

Imagina repartir configuraciones a miles de equipos a mano. DHCP es el conserje que, en cuanto un dispositivo llega, le da la llave (IP) y le dice dónde están las salidas (gateway y DNS). Y si el equipo se va, la llave vuelve al cajón para el siguiente.

---

## 🔄 El proceso DORA

En cuanto arranca un dispositivo sin configuración estática, lanza el baile de cuatro mensajes. El nombre lo dice todo: **D**iscover, **O**ffer, **R**equest, A**CK**.

1. **DISCOVER:** el PC grita a la red buscando servidores DHCP (va a broadcast).
2. **OFFER:** el servidor contesta con una IP "reservada en la caja" y sus extras (máscara, gateway, DNS).
3. **REQUEST:** el PC acepta formalmente esa IP y se la reserva.
4. **ACK:** el servidor confirma. Configuración aplicada.

![Secuencia DORA: Discover, Offer, Request y ACK entre PC y servidor DHCP](/ApuntesRedes/diagrams/u04-dora.svg)

> 💡 **¿Qué pasa si el DHCP no responde?** El PC asigna él mismo una **APIPA (169.254.0.0/16)** y queda "huérfano": habla con la red local pero no sale a Internet. Ese es el dolor de cabeza más típico del ejercicio 6 del [boletín inicial](/ApuntesRedes/boletines/boletin-u04-inicial).

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



## 🛡️ ¿Por qué excluir las IPs estáticas?

Regla de oro que todos los administradores pagan caro algún día:

> 💡 **Siempre excluye las IPs estáticas** del rango DHCP (servidores, routers, impresoras de red). Si no, puede haber **conflictos de IP**.

Con `ip dhcp excluded-address 192.168.1.1 192.168.1.10` apartas, por ejemplo, el router (.1), los servidores (.2-.9) y la impresora (.10) del reparto. Si DHCP entregara `192.168.1.1` —que ya es el gateway—, dos equipos acabarían con la misma IP y la semana sería muy larga. El [boletín avanzado](/ApuntesRedes/boletines/boletin-u04-avanzado) te propone precisamente ese escenario de conflicto.

---

## 🤖 ¿Y DHCPv6?

En IPv6, la dirección puede salir sola (SLAAC)… pero los extras (DNS, ruta por defecto, sufijos) igual te conviene darlos con servidor. **SLAAC y DHCPv6 no son enemigos: se reparten el trabajo.**

| Modo | ¿Quién da la dirección? | ¿Quién da el resto? | Flag en el RA |
|---|---|---|---|
| **SLAAC** (solo) | El propio host (EUI-64/PRIVACY) | El router (RA) | A |
| **Stateless DHCPv6** | El host (SLAAC) | El servidor DHCPv6 | **O** (Other) |
| **Stateful DHCPv6** | El servidor DHCPv6 | El servidor DHCPv6 | **M** (Managed) |

- Los **flags M y O viajan en el Router Advertisement**: la "M" dice "la dirección dáela el servidor" (stateful); la "O", "la dirección te la montas tú, pero pregunta por DNS y demás".
- El estado **sin estado (stateless)** es lo habitual en redes bien diseñadas: SLAAC para la identidad, DHCPv6 para el servicio.
- Y un matiz de examen: DHCPv6 usa **UDP sobre IPv6** y descubre servidores por **multicast** (no hay broadcast en IPv6).

---

## 🧠 Mini-chequeo

1. ¿Qué significa la sigla DORA y qué cuatro mensajes la forman?
2. ¿Qué comando aparta las IPs estáticas del reparto y qué línea del pool entrega el gateway?
3. Un PC muestra IP `169.254.x.x` tras encender. ¿Qué ha pasado?
4. En un RA de IPv6, ¿qué flag indica stateful DHCPv6 y cuál "otros parámetros" (stateless)?

<details>
<summary>🔄 Respuestas</summary>

1. **Discover, Offer, Request, ACK** — el intercambio de 4 mensajes del DHCP.
2. La exclusión: `ip dhcp excluded-address <IP-ini> <IP-fin>`. El gateway se entrega con `default-router` dentro del pool.
3. El **servidor DHCP no respondió** (o está mal configurado/inaccesible): el PC se asignó una **APIPA** (169.254.0.0/16) y queda sin salida a Internet.
4. **M** (Managed) → la dirección la da el servidor (stateful). **O** (Other) → la dirección es de SLAAC y el servidor da el resto (stateless).
</details>

---

## ✅ Resumen en 3 frases

- DHCP reparte **IP, máscara, gateway y DNS** de forma automática mediante el proceso **DORA**.
- En un router Cisco se configura con `ip dhcp pool`, añadiendo `network`, `default-router`, `dns-server` y `lease`.
- **Excluye siempre las IPs estáticas** del pool (`ip dhcp excluded-address`); en IPv6, **SLAAC + DHCPv6 stateless** (flag O) es el dúo habitual.

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

📚 [Volver al índice de la unidad](/ApuntesRedes/04-direccionamiento-ip) · **Anterior:** [6 · VLSM](/ApuntesRedes/04-direccionamiento-ip/06-vlsm) · **Siguiente:** [8 · Estructura de IPv6](/ApuntesRedes/04-direccionamiento-ip/08-estructura-ipv6)