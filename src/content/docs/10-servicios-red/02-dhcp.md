---
title: "02 — DHCP: el repartidor de IPs"
description: Cuatro mensajes y una dirección servida 📦
---

<p><small>Cuatro mensajes y una dirección servida 📦</small></p>

> 🗺️ **Estás en:** 🗄️ **Servicios de red: DHCP, DNS y NTP** → 02 · DHCP: el repartidor de IPs

---

## 📬 La idea en una frase

> **DHCP** (*Dynamic Host Configuration Protocol*) asigna automáticamente a cada cliente su configuración IP —dirección, máscara, gateway y DNS— mediante un diálogo de cuatro mensajes que debes conocer de memoria: **DORA**.

En la [unidad de dirección IP](/ApuntesRedes/03-direccionamiento-ip) viste qué es DHCP y para qué sirve. Aquí vamos a abrir la caja: cómo negocia el cliente, qué contiene una concesión (lease) y qué decisiones toma el servidor. Es el mismo protocolo si el servidor es un router Cisco, un Windows Server o el router de tu casa.

---

## 🤝 DORA: la coreografía de cuatro mensajes

Cuando un equipo se conecta y está configurado para "obtener una dirección automáticamente", ocurre esto:

| Paso | Mensaje | Quién | Qué viaja | Envoltura |
|---|---|---|---|---|
| 1 | **D**iscover | Cliente → todos | "¿Hay algún servidor DHCP por ahí?" | Broadcast (255.255.255.255) |
| 2 | **O**ffer | Servidor → cliente | "Yo tengo la 192.168.1.50 para ti, con máscara y lease de 24 h" | Broadcast o unicast |
| 3 | **R**equest | Cliente → servidor elegido | "Vale, me quedo esa dirección" | Broadcast (avisa a otros servers) |
| 4 | **A**ck | Servidor → cliente | "Confirmado: es tuya hasta las X, y por cierto, tu gateway es…" | Broadcast o unicast |

```
CLIENTE                        SERVIDOR DHCP
   |                                 |
   |──── DISCOVER (broadcast) ──────►|  "¿Alguien ahí?"
   |◄──── OFFER ─────────────────────|  "Te ofrezco 192.168.1.50"
   |──── REQUEST (broadcast) ───────►|  "Me la quedo"
   |◄──── ACK ───────────────────────|  "Tuya por 24 horas"
   |                                 |
   |  El cliente ya tiene IP ✔       |
```

> 💡 **Por qué Request es broadcast:** puede haber más de un servidor DHCP escuchando. El cliente solo acepta una oferta, y avisando en broadcast les dice a los demás "tu oferta no ha sido la elegida", para que liberen la dirección reservada.

---

## 📋 Qué entrega exactamente DHCP

Una concesión no es solo la IP. El servidor entrega un paquete de configuración completo:

| Opción DHCP | Qué es | Ejemplo típico |
|---|---|---|
| 1 (Subnet Mask) | Máscara de subred | 255.255.255.0 |
| 3 (Router) | Gateway por defecto | 192.168.1.1 |
| 6 (DNS) | Servidores DNS | 192.168.1.10 y 8.8.8.8 |
| 15 (Domain) | Sufijo DNS del dominio | empresa.local |
| 51 (Lease Time) | Duración de la concesión | 86400 s (24 h) |
| 66/150 (TFTP) | Servidor de configuración (teléfonos IP) | 192.168.1.20 |

Las opciones 66/150 explican por qué un teléfono IP "sabe" dónde está la centralita sin configurar nada a mano: se lo dice DHCP.

---

## ⏳ La concesión: no es para siempre

DHCP no regala direcciones: las **presta**. El ciclo de vida de un lease:

1. **Asignación:** DORA completo; el cliente recibe la IP con un tiempo de concesión.
2. **T1 (50 % del lease):** el cliente intenta **renovar** con el servidor original (Request unicast → Ack).
3. **T2 (87,5 %):** si el servidor original no responde, el cliente pide en broadcast a cualquier servidor.
4. **Expiración:** si nadie responde, el cliente suelta la dirección y vuelve a empezar por Discover.

```
0%────────────50%────────────87.5%──────────100%
│  USO NORMAL  │  T1: renovar   │  T2: rebroadcast  │  │
│              │  con el server │  con cualquiera   │EXPIRA
```

Este diseño hace que un servidor DHCP caído no tumbe la red de golpe: los clientes ya tienen su lease y van renovando. Por eso en redes grandes se dejan leases de horas o días, nunca de minutos.

---

## 🎯 Reservas: la IP fija sin configurar a mano

¿Una impresora, una cámara o un servidor necesitan IP fija? Tienes dos caminos:

| Camino | Cómo | Ventaja | Inconveniente |
|---|---|---|---|
| **IP estática en el equipo** | La escribes en el dispositivo | No depende de DHCP | Riesgo de duplicados, gestión manual |
| **Reserva DHCP** | Asocias su MAC a una IP en el servidor | Gestión centralizada, cero errores de duplicado | Requiere tocar el servidor |

La reserva (o *asignación manual* en la jerga RFC) es la práctica recomendada: el servidor siempre dará la misma IP a esa MAC, pero sigues teniendo toda la gestión en un único sitio.

---

## 🧠 Mini-chequeo

1. Recita de memoria los cuatro mensajes de DORA y quién los envía.
2. ¿Por qué el mensaje Request se envía en broadcast y no directamente al servidor elegido?
3. Un servidor DHCP se cae a las 9:00 con leases de 24 horas repartidas la noche anterior. ¿Los clientes dejan de funcionar al instante? ¿Por qué?
4. ¿Qué diferencia hay entre una IP estática y una reserva DHCP?

<details>
<summary>🔄 Respuestas</summary>

1. **Discover** (cliente, broadcast), **Offer** (servidor), **Request** (cliente, broadcast), **Ack** (servidor). Disco-Oferta-Petición-Confirmación.
2. Para que **otros servidores DHCP** que hicieron ofertas sepan que no fueron elegidos y liberen la dirección que reservaron para ese cliente.
3. **No.** Los clientes conservan su concesión hasta el 50 % (T1) del lease e intentan renovar; con 24 h de lease, seguirán operando muchas horas aunque el servidor esté caído.
4. La IP estática se configura **en el propio equipo**; la reserva la gestiona **el servidor DHCP**, que siempre asignará esa IP a la MAC registrada. La reserva centraliza la gestión y evita duplicados.
</details>

---

## ✅ Resumen en 3 frases

- DHCP asigna IP, máscara, gateway y DNS con el diálogo **DORA**.
- La concesión se **renueva al 50 %** y rebroadcastea al 87,5 %: caída del servidor ≠ caída de la red.
- Para IPs fijas usa **reservas por MAC**, no configuración manual en cada equipo.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| DORA | Discover, Offer, Request, Ack: el diálogo de asignación |
| Lease | Concesión temporal de una dirección |
| T1 / T2 | Instantes de renovación (50 %) y rebroadcast (87,5 %) |
| Opciones DHCP | Parámetros extra entregados con la IP (gateway, DNS, TFTP…) |
| Reserva | Asociación fija MAC → IP en el servidor |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-servicios-red) · **Anterior:** [01 · Por qué necesitas servicios](/ApuntesRedes/10-servicios-red/01-por-que-servicios) · **Siguiente:** [03 · DHCP en Cisco y el agente de reenvío](/ApuntesRedes/10-servicios-red/03-dhcp-cisco)
