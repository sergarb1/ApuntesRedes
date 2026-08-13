---
title: "08 — Conectividad básica: ping, ARP y gateway"
description: Las primeras herramientas del detective de redes 🔍
---

<p><small>Las primeras herramientas del detective de redes 🔍</small></p>

> 🗺️ **Estás en:** 🌐 **U01 · Fundamentos de redes** → 08 · Conectividad básica

---

## 📬 La idea en una frase

> **Con 4 comandos (`ipconfig`, `ping`, `arp`, `tracert`) puedes diagnosticar el 90% de los problemas típicos de una red pequeña.**

Aquí los verás uno a uno, con un ejemplo de salida y qué significa cada dato.

---

## 🚪 El gateway: la puerta de salida

El **gateway por defecto** (*default gateway*) es el dispositivo que permite salir de tu red local hacia otras redes. Normalmente es un router con una IP dentro de tu subred (por ejemplo `192.168.1.1`).

Cuando tu PC quiere hablar con algo que está **fuera de su red**:

1. Compara su IP y máscara con la IP destino para saber si está en la misma red.
2. Si está fuera, encapsula el paquete con la **MAC del gateway** como destino (no la del destino final).
3. El gateway recibe el paquete, consulta su tabla de rutas y lo reenvía hacia el destino.

**Configuración típica de un PC en una LAN:**

```
IP:         192.168.1.10
Máscara:    255.255.255.0
Gateway:    192.168.1.1
DNS:        8.8.8.8
```

---

## 🧰 Los 4 comandos básicos

### 1) `ipconfig` (Windows) / `ip addr` (Linux)

Muestra la configuración IP del equipo.

```bash
ipconfig          # resumen
ipconfig /all     # detalle: incluye MAC y DNS
ip addr           # Linux
```

**Qué debes mirar:** ¿tiene IP válida? ¿La máscara es correcta? ¿Tiene gateway? ¿Tiene DNS? ¿Cuál es la MAC?

### 2) `ping`

Envía paquetes **ICMP** *Echo Request* y espera la respuesta. Prueba conectividad end-to-end.

```bash
ping 8.8.8.8          # por IP, no usa DNS
ping -n 4 google.com  # Windows, 4 paquetes
ping -c 4 google.com  # Linux/macOS, 4 paquetes
```

**Qué te cuenta:** si el destino es accesible, el tiempo ida y vuelta (**RTT**), el % de paquete perdido y si la respuesta es por nombre o por IP.

### 3) `arp -a`

Gestiona la **tabla ARP** local: las traducciones IP ↔ MAC que ya ha aprendido.

```bash
arp -a              # listar todas
arp -d 192.168.1.1  # borrar una entrada
arp -d *            # limpiar la tabla
```

> 💡 Si `ping` al gateway falla pero `arp -a` no muestra la MAC del gateway, el problema seguro que está en la capa 2 (cable, switch o configuración).

### 4) `tracert` / `traceroute`

Muestra la **ruta** que siguen los paquetes hasta el destino, salto a salto:

```bash
tracert 8.8.8.8      # Windows
traceroute 8.8.8.8   # Linux/macOS
```

Cada línea es un **router intermedio** (salto) con su latencia. Aquí ves exactamente dónde se corta el camino.

---

## 🌍 Escenario completo: ¿qué pasa cuando haces `ping 8.8.8.8`?

```
Tu PC (192.168.1.10) → ping 8.8.8.8
```

1. El sistema ve que `8.8.8.8` **no está en tu misma red** (compara IP/máscara).
2. Consulta su tabla de rutas → debe ir al gateway `192.168.1.1`.
3. Consulta la tabla ARP local → busca la MAC del gateway.
4. Si no está, lanza un **ARP Request** de difusión: "¿Quién tiene 192.168.1.1?"
5. El gateway responde con **ARP Reply** con su MAC (`aa:bb:cc:01:01:01`).
6. Tu PC envía el paquete ICMP con: **MAC destino = la del gateway**, **IP destino = $8.8.8.8$**.
7. El switch lo reenvía al puerto del gateway.
8. El router ve que la IP destino es `8.8.8.8`, consulta su tabla de rutas y lo reenvía hacia su ISP.
9. El ISP lo encamina hasta Google.
10. Google responde con **Echo Reply**, camino inverso.
11. Tu PC muestra: `Reply from 8.8.8.8: bytes=32 time=12ms TTL=117`.

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/flujo-arp-gateway.svg" alt="Flujo ARP: PC solicita la MAC del gateway para salir a Internet" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">El PC necesita la MAC del gateway para enviar paquetes fuera de su red; ARP resuelve esa IP a su MAC.</figcaption>
</figure>

---

## 🩺 Protocolo de diagnóstico en 6 pasos

Cuando un usuario dice *"no tengo Internet"*, este es el orden que nunca falla:

| Paso | Comando | ¿Qué comprueba? |
|---|---|---|
| 1 | `ipconfig` | ¿Tengo IP y gateway válidos? |
| 2 | `ping 127.0.0.1` | ¿Funciona mi tarjeta de red? (loopback) |
| 3 | `ping 192.168.1.1` | ¿Llego al gateway? |
| 4 | `ping 8.8.8.8` | ¿Llego a Internet? (sin DNS) |
| 5 | `ping google.com` | ¿Funciona la resolución DNS? |
| 6 | `tracert 8.8.8.8` | ¿En qué salto se pierde el paquete? |

> 💡 **Regla de oro:** ve de la base a lo abstracto. Si falla el paso 1, no tiene sentido probar el 5. Cuando un paso falla, ese es tu problema.

---

## 📄 Ejemplo resuelto: leer un `ipconfig /all`

Salida típica de un PC sano en una LAN:

```
Adaptador Ethernet Ethernet1:
   Dirección IPv4......... : 192.168.1.10
   Máscara de subred...... : 255.255.255.0
   Puerta de enlace....... : 192.168.1.1
```

Qué concluimos con una mirada:

- **192.168.1.10/24**: IP privada correcta dentro de esa LAN.
- **Gateway 192.168.1.1**: coincide con el router; sin esto, no hay salida a Internet.
- Si en lugar de `192.168.x.x` vieras **169.254.x.x** (*APIPA*), el PC no ha encontrado un DHCP: problema típico de cable, switch o configuración.

---

## 🧠 Mini-chequeo

1. Si `ping 127.0.0.1` falla, ¿qué significa realmente?
2. ¿En qué paso del método de 6 compruebas si el problema es la resolución DNS?

<details>
<summary>🔄 Respuestas</summary>

1. Que **tu propia tarjeta de red no funciona** (capa física o driver); nada que ver con la red todavía.
2. En el paso 5 (`ping google.com`): si por IP (paso 4) funciona y por nombre no, el **DNS** es el sospechoso.

</details>

---

## ✅ Resumen en 3 frases

1. El **gateway** es la puerta hacia otras redes; para salir de tu LAN, el paquete viaja con la **MAC del gateway**.
2. `ipconfig` te muestra el estado, `ping` la conectividad, `arp` las traducciones IP↔MAC y `tracert` dónde se corta la ruta.
3. Diagnostica siempre **de abajo a arriba**: físico → IP → gateway → Internet → DNS.

> 🐛 **Vocabulario rápido**
>
> | Término | Idea general |
> |---|---|
> | Gateway | Puerta de salida de tu red |
> | ARP | Traduce IP a MAC en tu red local |
> | Ping | Prueba de conectividad (ICMP) |
> | RTT | Tiempo de ida y vuelta |
> | Loopback | 127.0.0.1, tu propia máquina |
> | TTL | Contador que evita bucles infinitos |

📚 [Volver al índice de la unidad](/ApuntesRedes/01-fundamentos-redes) · **Anterior:** [07 · Direcciones MAC e IP](/ApuntesRedes/01-fundamentos-redes/07-direcciones-mac-ip) · **Siguiente:** [09 · Head First](/ApuntesRedes/01-fundamentos-redes/09-head-first)