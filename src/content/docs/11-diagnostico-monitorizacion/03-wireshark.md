---
title: 03 — Wireshark y análisis TCP
description: Filtros, handshake, retransmisiones y Follow TCP Stream 🐟
---

<p><small>Filtros, handshake, retransmisiones y Follow TCP Stream 🐟</small></p>

> 🗺️ **Estás en:** 🩺 U11 → 03 · Wireshark y análisis TCP

---

## 📬 La idea en una frase

> Wireshark es la **navaja suiza** del administrador: captura cada paquete que pasa por una interfaz, lo decodifica por protocolo y te permite ver con tus propios ojos lo que los comandos del [punto 2](/ApuntesRedes/11-diagnostico-monitorizacion/02-comandos-esenciales) solo insinúan.

Ping te dice "no hay respuesta"; Wireshark te enseña *por qué*: el SYN sale, ¿vuelve el SYN-ACK? ¿Se pierde a mitad? ¿Se retransmite? Ver el tráfico de verdad convierte el diagnóstico en una ciencia exacta.

---

## 🎯 Filtros esenciales

Capturar sin filtrar es mirar un estadio de reojo. Los filtros de Wireshark tienen su propia sintaxis (display filters) y son el día a día del análisis:

| Filtro | Qué muestra |
|---|---|
| `ip.addr == 192.168.1.10` | Tráfico de/a esa IP |
| `tcp.port == 80` | Tráfico HTTP |
| `http.request` | Solo peticiones HTTP |
| `tcp.flags.syn == 1` | Paquetes SYN (inicio de conexión) |
| `tcp.analysis.retransmission` | Retransmisiones TCP |
| `dns` | Tráfico DNS |
| `icmp` | Tráfico ICMP |

Los filtros se combinan con operadores lógicos, igual que en programación: `ip.src == 192.168.1.10 && tcp.port == 443`, `dns && !(dns.qry.name == "google.com")`, o `tcp.analysis.flags` para ver todos los problemas TCP de golpe (retransmisiones, duplicados, ventanas caídas).

> 💡 **Colores que hablan:** Wireshark pinta los paquetes. Lo negro/rojo suele ser errores o retransmisiones; el verde claro son tráfico HTTP; el azul, UDP. Antes de leer un campo, deja que el color te oriente: si tu captura está llena de rojo, ya sabes por dónde mirar.

---

## 🤝 Análisis TCP: el corazón de Wireshark

El análisis de TCP con Wireshark es la sección reina de esta unidad. Hay cuatro patrones que debes reconocer al instante:

**1. Handshake (3 paquetes):** `SYN → SYN-ACK → ACK`. Su presencia confirma que la conexión se estableció; su ausencia delata un fallo de conectividad o un firewall que descarta paquetes.

**2. Retransmisiones:** si ves muchos `[TCP Retransmission]`, hay **pérdida de paquetes o congestión**. El emisor no recibe ACK dentro del tiempo previsto y reenvía. Causas típicas: buffer lleno, ancho de banda insuficiente, cable defectuoso o un equipo saturado.

**3. Window size (tamaño de ventana):** el receptor anuncia cuántos bytes puede recibir. Si **baja a 0**, el receptor está saturado y pide "no me envíes más"; es la señal clásica de un servidor o aplicación sobrecargada.

**4. RTT (Round Trip Time):** el tiempo de ida y vuelta de cada segmento. Un **RTT alto** delata latencia elevada; un RTT que crece de forma constante suele indicar colas llenas en algún punto intermedio.

```
Cómo leer un flujo problemático:

Paquete 1:  [SYN]            → Sale normal
Paquete 2:  [SYN, ACK]       → El servidor responde
Paquete 3:  [ACK]            → Conexión establecida
Paquete 4:  [PSH, ACK] GET / → Petición de página
Paquete 5:  [TCP Retransmission]  ← No llegó ACK de 4
Paquete 6:  [TCP Retransmission]  ← Se reenvía otra vez
Paquete 7:  [TCP Window Update] Window=0  ← El receptor está saturado
```

Ese patrón —handshake OK, luego retransmisiones y ventana a cero— es el retrato robot de un servidor web ahogado.

---

## 🧵 Follow TCP Stream: la conversación completa

Ver paquetes sueltos es leer palabras; seguir el flujo es leer la conversación. En Wireshark:

> Wireshark → Click derecho en un paquete TCP → **Follow → TCP Stream**

Wireshark reconstruye **toda la conversación** entre el cliente y el servidor: cada byte enviado y recibido, ordenado y legible. Es la forma más rápida de leer una petición HTTP completa, ver si el servidor responde `200 OK` o un `404`, o confirmar que el contenido viaja cifrado (si es HTTPS verás un galimatías ininteligible, y eso ya es información: la capa 4 funciona y la 7 está cifrada).

El detalle de la captura —que se hace en el equipo o, con [port mirroring](/ApuntesRedes/11-diagnostico-monitorizacion/09-head-first), en el switch— es lo que convierte a Wireshark en la herramienta de diagnóstico definitiva.

---

## 🧠 Mini-chequeo

1. En una captura ves `SYN` seguido de otro `SYN` sin `SYN-ACK` entre ellos. ¿Qué está pasando?
2. ¿Qué significa ver `Window = 0` en los ACKs de un servidor?
3. Sigues un Follow TCP Stream y ves solo caracteres ilegibles. ¿Qué deduces?

<details>
<summary>🔄 Respuestas</summary>

1. **El SYN se pierde o es descartado**: el emisor reenvía el SYN porque no recibe respuesta. El destino no contesta: firewall, ACL, equipo apagado o ruta rota.
2. El receptor está **saturado** (buffer lleno) y pide que dejen de enviarle datos. Es un problema de capacidad del servidor o de la aplicación, no de la red.
3. Que el flujo está **cifrado** (HTTPS/TLS) o es binario. Eso confirma que la conexión funciona y que el contenido no se puede inspeccionar en claro: un comportamiento esperado, no un fallo.
</details>

---

## ✅ Resumen en 3 frases

- Los **filtros** de Wireshark (`ip.addr`, `tcp.port`, `tcp.analysis.retransmission`…) te llevan directo al paquete que importa.
- El **análisis TCP** se reduce a cuatro patrones: handshake, retransmisiones, window size y RTT.
- **Follow TCP Stream** reconstruye la conversación completa y es la prueba definitiva para saber si un servicio responde.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Display filter | Filtro que oculta paquetes que no cumplen la condición |
| Handshake | SYN → SYN-ACK → ACK: apertura de una conexión TCP |
| Retransmisión | Reenvío de un segmento cuyo ACK no llegó a tiempo |
| Window size | Bytes que el receptor admite antes de pedir pausa |
| RTT | Tiempo de ida y vuelta de un segmento |
| Follow TCP Stream | Reconstrucción legible de una conversación TCP |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-diagnostico-monitorizacion) · **Anterior:** [02 · Comandos esenciales](/ApuntesRedes/11-diagnostico-monitorizacion/02-comandos-esenciales) · **Siguiente:** [04 · SNMP](/ApuntesRedes/11-diagnostico-monitorizacion/04-snmp)