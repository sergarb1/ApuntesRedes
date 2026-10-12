---
title: 2 — Direcciones MAC
description: La identidad de la tarjeta de red, en 48 bits 🪪
---

<p><small>La identidad de la tarjeta de red, en 48 bits 🪪</small></p>

> 🗺️ **Estás en:** 🔗 **Capa de enlace y trama Ethernet** → 2 · Direcciones MAC

---

## 📬 La idea en una frase

> La **dirección MAC** es el **nombre de pila de la tarjeta de red**: **6 bytes en hexadecimal** que la capa 2 usa para decidir *¿esta trama es para mí?* — la escriben en fábrica, es única en el mundo y ya la has visto impresa dentro de la trama Ethernet.

---

## 🧅 Cómo se escribe una MAC

Son **48 bits (6 bytes)** expresados en hexadecimal, normalmente en **6 pares**:

```
00:1A:2B:3C:4D:5E      (los dos puntos es lo típico)
00-1A-2B-3C-4D-5E      (guiones, también válido)
001A.2B3C.4D5E         (el estilo Cisco)
```

Los **3 primeros bytes** son el **OUI** (*Organizationally Unique Identifier*): el carné de fabricante que asigna el IEEE. Los **3 últimos** los reparte el fabricante entre sus tarjetas.

| Parte | Tamaño | Quién la asigna | Qué identifica |
|---|---|---|---|
| **OUI** (los 3 primeros bytes) | 24 bits | IEEE → fabricante | La marca de la tarjeta (Intel, TP-Link…) |
| **NIC** (los 3 últimos) | 24 bits | Fabricante | La tarjeta concreta de la serie |

> 🔍 **Truco para mirar OUIs:** en `ipconfig /all` o en `ip link` verás la MAC de tu interfaz. Los primeros 6 caracteres dicen quién fabricó esa placa (salvo que alguien la haya "disfrazado", que esto llega abajo).

---

## 🎭 Unicast, multicast y broadcast

El primer byte de la MAC lleva dos bits con nombre raro que deciden **para quién es la trama**:

- **Bit I/G (Individual/Group):** 0 = **unicast** (una tarjeta concreta), 1 = **multicast** (un grupo).
- **Bit U/L (Local/Universal):** 0 = MAC de fábrica (**global**), 1 = MAC **administrada localmente** (la cambias tú).

| Tipo | Ejemplo | Quién la recoge |
|---|---|---|
| **Unicast** | `00:1A:2B:3C:4D:5E` | Solo esa tarjeta |
| **Multicast** | `01:00:5E:…` | El grupo que esté suscrito (por ejemplo, IPv6 multicast) |
| **Broadcast** | `FF:FF:FF:FF:FF:FF` | **Todas** las tarjetas de la red local |

El broadcast `FF:FF:FF:FF:FF:FF` lo usarás mil veces: es la MAC de "todos a la vez", la que llevan los descubrimientos (ARP, DHCP…).

---

## 🆚 MAC frente a IP: dos carnés, dos ámbitos

| | **MAC** (capa 2) | **IP** (capa 3) |
|---|---|---|
| ¿Para qué sirve? | Entregar la trama **en tu red local** | Llevar el paquete **hasta otra red** |
| ¿Quién la pone? | El fabricante (fábrica) | La configuras tú (o DHCP) |
| ¿Cambia al mover de red? | **No** (es la tarjeta) | **Sí** (otra red, otra IP) |
| ¿Enruta Internet? | No: cada salto se cambia | Sí: la IP de destino acompaña todo el viaje |
| Alcance | Tu LAN | El mundo |

**En una frase:** la MAC lleva la trama *de switch en switch*; la IP lleva el paquete *de red en red*. Cuando el paquete cruza un router, las **MACs de la trama se cambian** (las de los extremos del siguiente tramo) pero la **IP de destino no toca** — lo verás de cerca en [encapsulación](/ApuntesRedes/03-capa-de-enlace/04-encapsulacion).

---

## 🕵️ ¿Dónde vive y cómo la ves?

- **En la tarjeta de red:** cada NIC (cable o WiFi) trae su MAC; muchas permiten **cambiarla** (*MAC spoofing*), algo que usan los ciberdelincuentes… y los administradores para saltarse filtros por MAC.
- **En la trama:** la trama Ethernet lleva **MAC de origen y de destino** (las viste campo a campo en el [punto 3](/ApuntesRedes/03-capa-de-enlace/03-trama-ethernet)).
- **En el switch:** el switch **aprende** de dónde viene cada trama y rellena su tabla de direcciones — por eso te conoce sin que configures nada (el detalle está en la [unidad de switching](/ApuntesRedes/05-switching/02-aprendizaje-mac)).

Para verla en tu equipo:

```powershell
# Windows
ipconfig /all        # "Dirección física"
getmac
```

```bash
# Linux / macOS
ip link
ifconfig -a
```

---

## 🔗 El puente con IP: ARP (solo la puerta)

Tu PC tiene la IP del servidor web pero **no su MAC**: no puede escribir el campo destino de la trama. La solución es **ARP**: pregunta por broadcast *«¿quién tiene la IP 192.168.1.1?»* y quien la tenga responde con su MAC. Ese ida y vuelta (request broadcast, reply unicast) se estudia en detalle en la [unidad de dirección IP](/ApuntesRedes/04-direccionamiento-ip/01-estructura-ipv4); aquí solo te queda el nexo: **para hablar en capa 2 hace falta una MAC, y ARP es el servicio que traduce IP a MAC**.

---

## 🧠 Mini-chequeo

1. Una MAC `00:1A:2B:3C:4D:5E`: ¿cuántos bytes son, cuáles son el OUI y qué dice el IEEE?
2. ¿Qué MAC es broadcast y en qué tipo de trama aparece?
3. Te mudas de casa con el mismo ordenador: ¿tu MAC cambia? ¿Y tu IP?
4. Si el primer bit del primer byte de una MAC vale 1, ¿de qué tipo es?

<details>
<summary>🔄 Respuestas</summary>

1. **6 bytes** (48 bits); los 3 primeros (`00:1A:2B`) son el **OUI** asignado por el IEEE al fabricante; los 3 restantes los reparte el fabricante.
2. **`FF:FF:FF:FF:FF:FF`** — aparece en tramas de **broadcast** (por ejemplo, las preguntas ARP y los anuncios DHCP).
3. La **MAC no cambia** (es la de la tarjeta); la **IP sí**, porque tu nueva red te da otra.
4. **Multicast** (bit I/G = 1): la trama va a un grupo, no a una tarjeta concreta.
</details>

---

## ✅ Resumen en 3 frases

- La MAC es un **identificador de 48 bits en hexadecimal** que la capa 2 usa para la entrega local: OUI de fabricante + número de serie.
- **MAC e IP no compiten:** la MAC lleva tramas *en la red de al lado* (y cambia en cada salto entre switches/routers); la IP lleva paquetes *por todo el camino*.
- **Broadcast (`FF:FF:FF:FF:FF:FF`)** y ARP son el puente entre ambos mundos: sin MAC no hay trama, y ARP traduce la IP que conoces en la MAC que necesitas.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| MAC | Dirección de capa 2, 48 bits, de fábrica |
| OUI | Los 3 primeros bytes: el sello del fabricante |
| Unicast / multicast / broadcast | Para una tarjeta / un grupo / todas |
| ARP | Servicio que traduce IP a MAC (lo verás en IP) |
| Spoofing de MAC | Cambiar la MAC para suplantar o saltarse filtros |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-capa-de-enlace) · **Anterior:** [1 · El modelo OSI](/ApuntesRedes/03-capa-de-enlace/01-modelo-osi) · **Siguiente:** [3 · La trama Ethernet](/ApuntesRedes/03-capa-de-enlace/03-trama-ethernet)
