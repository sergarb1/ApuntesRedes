---
title: 08 — Wireshark
description: "El microscopio de redes: captura, filtra y sigue el flujo 🔬"
---

<p><small>El microscopio de redes: captura, filtra y sigue el flujo 🔬</small></p>

> 🗺️ **Estás en:** 📡 **U03 · Modelos OSI y análisis** → 08 · Wireshark

---

## 📬 La idea en una frase

> **Wireshark** captura todos los paquetes que pasan por una interfaz y te permite inspeccionarlos **capa por capa**: la herramienta que convierte la teoría OSI en evidencia visible.

Es la navaja suiza del diagnóstico de red y el protagonista del [Laboratorio de tortura](/ApuntesRedes/03-modelos-osi-analisis/09-cierre) de esta unidad.

---

## 🖥️ La interfaz principal

Al abrir Wireshark encuentras cuatro bloques:

1. **Lista de interfaces:** eliges la activa (Ethernet o WiFi) y pulsas *Start*.
2. **Ventana de paquetes (arriba):** todos los paquetes en tiempo real, con nº, hora, origen, destino, protocolo e info.
3. **Detalles del paquete (medio):** árbol expandible con **cada capa OSI** (Ethernet → IP → TCP → HTTP).
4. **Bytes sin procesar (abajo):** el paquete en hexadecimal y ASCII.

> ⚠️ **Limitación que debes conocer:** en una red con switch, solo ves tu propio tráfico unicast y el broadcast (ARP, DHCP). Para ver tráfico ajeno necesitas un hub, un puerto espejo o ARP spoofing. Wireshark no es magia: es un espejo de *tu* tráfico.

---

## 🎣 Filtros básicos

La sintaxis vale una fortuna en el trabajo real:

| Filtro | Qué hace |
|---|---|
| `dns` | Solo tráfico DNS |
| `http` | Solo tráfico HTTP |
| `tcp` | Solo segmentos TCP |
| `udp` | Solo datagramas UDP |
| `ip.addr == 192.168.1.1` | Tráfico hacia/desde una IP |
| `tcp.port == 443` | Tráfico en el puerto 443 |
| `arp` | Solo paquetes ARP |
| `icmp` | Solo ICMP (ping) |
| `!dns` | Todo EXCEPTO DNS |
| `tcp.analysis.flags` | Paquetes TCP con problemas |

**Operadores:** `&&` o `and` (y), `||` u `or` (o), `!` (negación). Combinar es lo normal.

**Ejemplos resueltos de combinaciones:**

- Todo HTTP desde una IP concreta: `http && ip.src == 192.168.1.10`
- Puerto 22 o 443: `tcp.port == 22 || tcp.port == 443`
- DNS que NO consulta a google.com: `dns && !(dns.qry.name == "google.com")`
- Paquetes con errores: `tcp.analysis.flags`

---

## 🧭 Filtros por capa OSI

Relaciona cada capa con su filtro — la misma tabla que aparece en exámenes:

| Capa OSI | Filtro | Ejemplo |
|---|---|---|
| Capa 7 | `http`, `dns`, `tls` | `http.request.method == "POST"` |
| Capa 4 | `tcp`, `udp` | `tcp.port == 22` |
| Capa 3 | `ip`, `ipv6`, `icmp` | `ip.src == 10.0.0.1` |
| Capa 2 | `eth`, `arp` | `eth.addr == aa:bb:cc:dd:ee:ff` |

---

## 🎨 Colores por defecto

Wireshark pinta los paquetes para que un vistazo te diga de qué va:

- **Morado claro:** tráfico TCP.
- **Azul claro:** tráfico UDP.
- **Verde claro:** tráfico HTTP.
- **Amarillo claro:** tráfico DNS.
- **Rojo claro:** errores o retransmisiones.

> 💡 **Regla ocular:** si en una captura ves mucho rojo en la fila TCP, hay pérdidas → sospecha de congestión o enlaces saturados (control de flujo del [punto 5](/ApuntesRedes/03-modelos-osi-analisis/05-tcp-y-udp)).

---

## 💬 Seguimiento del flujo TCP

Wireshark puede **reconstruir una conversación entera**. Botón derecho sobre un paquete → *Follow* → *TCP Stream*: aparece el diálogo completo cliente↔servidor como un chat.

```
GET / HTTP/1.1
Host: google.com

HTTP/1.1 200 OK
Content-Type: text/html
...
```

Es la forma más rápida de depurar un protocolo de aplicación: no lees paquetes, lees **la conversación** que tus datos mantuvieron.

---

## 🧠 Mini-chequeo

1. Escribe el filtro para ver **solo HTTPS** (443) que **no** proceda de la IP 192.168.1.1.
2. ¿Por qué en un switch no ves el tráfico de otros equipos y en un hub sí?
3. Si quieres ver la conversación HTTP completa entre dos equipos, ¿qué haces con Wireshark?

<details>
<summary>🔄 Respuestas</summary>

1. `tcp.port == 443 && !(ip.src == 192.168.1.1)`.
2. El switch **aisla el tráfico unicast** (solo lo envía al puerto de destino); el hub lo **replica por todos** los puertos. En el hub todo es visible, en el switch no.
3. Clic derecho sobre un paquete HTTP → **Follow → TCP Stream**: se muestra la conversación completa viajando en ambas direcciones.
</details>

---

## ✅ Resumen en 3 frases

- Wireshark muestra el paquete **capa por capa** y con **filtros** afinas qué estudias.
- Los **colores** (TCP/UDP/HTTP/errores) te dan el diagnóstico de un vistazo.
- **Follow TCP Stream** convierte paquetes en conversación legible: el súper poder para depurar.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Captura | Guardar paquetes de una interfaz para analizarlos |
| Filtro | Regla tipo `tcp.port == 443` que selecciona tráfico |
| Stream | La conversación completa entre dos sockets |
| Puerto espejo | Configuración del switch para clonar tráfico |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-modelos-osi-analisis) · **Anterior:** [07 · Puertos y sockets](/ApuntesRedes/03-modelos-osi-analisis/07-puertos-y-sockets) · **Siguiente:** [09 · Cierre](/ApuntesRedes/03-modelos-osi-analisis/09-cierre)