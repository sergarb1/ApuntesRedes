---
title: 02 — Comandos esenciales
description: "Ping, traceroute, netstat y nslookup: la navaja suiza del administrador 🛠️"
---

<p><small>Ping, traceroute, netstat y nslookup: la navaja suiza del administrador 🛠️</small></p>

> 🗺️ **Estás en:** 🩺 U12 → 02 · Comandos esenciales

---

## 📬 La idea en una frase

> Hay cinco herramientas que todo administrador lleva en el bolsillo: **ping** (¿hay conectividad?), **traceroute** (¿por dónde va?), **netstat** (¿qué puertos están abiertos?), **nslookup/dig** (¿los nombres se resuelven?) y **telnet** (¿un puerto concreto responde?). Con estas cinco se resuelve el 90% de los problemas del día a día.

Son los complementos del método del [punto 1](/ApuntesRedes/12-diagnostico-monitorizacion/01-metodologia-de-diagnostico): cada comando interroga a una capa del modelo OSI. Saber *qué pregunta hace cada uno* es tan importante como saber escribirlo.

---

## 🏓 Ping: la prueba de vida

Ping usa el protocolo **ICMP**: envía un *Echo Request* (tipo 8) y espera un *Echo Reply* (tipo 0). Si el reply llega, hay conectividad IP de extremo a extremo.

```bash
# Linux/Windows
ping 8.8.8.8
ping -c 4 8.8.8.8    # Linux: 4 paquetes
ping -n 4 8.8.8.8    # Windows: 4 paquetes
```

**Códigos ICMP que debes conocer de memoria:**

| Código | Nombre | Qué significa |
|---|---|---|
| 0 | Echo Reply | El destino responde: ¡hay vida! |
| 3 | Destination Unreachable | Algo no encuentra la ruta o bloquea el destino |
| 8 | Echo Request | La petición de ping en sí misma |
| 11 | Time Exceeded | Se superó el TTL: posible bucle de routing |

Un detalle que confunde a los novatos: **ping también falla cuando el firewall bloquea ICMP**, aunque la red esté perfecta. Por eso, cuando un ping "falla", conviene confirmar con una prueba de puerto (telnet) antes de declarar la red muerta. Lo verás en el [caso práctico del punto 8](/ApuntesRedes/12-diagnostico-monitorizacion/08-caso-practico-de-diagnostico).

---

## 🗺️ Traceroute: la ruta, salto a salto

Si ping dice *qué*, traceroute dice *por dónde*. Cada salto se descubre enviando paquetes con TTL creciente: el primer router los descarta y avisa con ICMP *Time Exceeded* (tipo 11), y así sucesivamente.

```bash
tracert 8.8.8.8        # Windows
traceroute 8.8.8.8     # Linux
```

Cada salto muestra:

- **Número de salto** (hop)
- **IP del router intermedio**
- **RTT** (3 mediciones)
- `* * *` si no responde (puede ser firewall que bloquea ICMP)

> 💡 **Cómo leer asteriscos:** un salto con `* * *` pero con respuestas en los saltos posteriores NO es un problema: es un router que no contesta ICMP pero sí encamina. El problema real es cuando los asteriscos se quedan ahí y nada avanza más allá.

Las variantes **pathping** (Windows) combinan traceroute con estadísticas de pérdida por salto, y **mtr** (Linux) hace lo mismo en tiempo real, refrescándose como un top. Son ideales cuando la red "va lenta": te dicen exactamente *en qué salto* se pierden paquetes.

---

## 🔌 Netstat: puertos y conexiones

Netstat es el catálogo de conexiones del equipo: qué puertos escuchan, quién está conectado a quién y en qué estado TCP se encuentra cada conversación.

```bash
netstat -ano           # Windows: conexiones activas + PID
netstat -tulpn         # Linux: puertos en escucha
```

**Estados que verás a menudo:**

| Estado | Significado |
|---|---|
| LISTENING | Un servicio esperando conexiones (puerto abierto) |
| ESTABLISHED | Conexión activa y funcionando |
| TIME_WAIT | La conexión se cerró y queda "enfriando" el cierre |
| SYN_SENT | Intento de conexión sin respuesta: destino inaccesible |

Si un servicio "no va", lo primero es `netstat` en el servidor: ¿está el puerto en LISTENING? Si no aparece, el problema es que el servicio no está corriendo o se configuró mal, y no hay que tocar la red. Este es el complemento natural de telnet, que probamos a continuación.

---

## 🔍 Nslookup / Dig: el servicio de nombres

Cuando los nombres no resuelven, todo el mundo "navega mal" aunque la red esté perfecta. Estas herramientas interrogan al DNS directamente:

```bash
nslookup google.com
nslookup google.com 8.8.8.8    # Usar un DNS específico
dig google.com                  # Linux, más detallado
```

`dig` es verboso y potente: muestra la respuesta completa, el TTL de la caché y los servidores autoritativos. `nslookup` es el clásico, presente en Windows y Linux. Probar con un DNS distinto (`8.8.8.8`) es la prueba definitiva: si con el DNS público funciona y con el tuyo no, el problema está en tu servidor de nombres, no en la resolución global.

---

## 📞 Telnet: ¿responde el puerto?

Telnet es el "pulsómetro de puertos". Si logras conectar, el puerto está abierto y aceptando TCP:

```bash
telnet intranet.empresa.com 443   # ¿Responde el 443?
```

- **Conecta** → el puerto está abierto (quizá el problema está en la capa 7, en la aplicación).
- **Connection refused** → el puerto está cerrado o el servicio no escucha.
- **Timeout** → el tráfico no llega: probablemente una ACL, un firewall o la ruta.

> ⚠️ Telnet es antiguo y no cifra nada, así que en producción se sustituye por `nc` (netcat) o `openssl s_client -connect host:port` para probar puertos. La idea es la misma: hacer el three-way handshake TCP y ver si responde.

---

## 🧠 Mini-chequeo

1. Un ping a 8.8.8.8 da siempre `Request timed out`, pero telnet a 8.8.8.8:443 conecta. ¿Qué está pasando?
2. En netstat ves una conexión en estado `SYN_SENT` que no avanza. ¿Qué interpretas?
3. `nslookup` funciona con el DNS de Google pero no con el del centro. ¿Dónde está el problema?

<details>
<summary>🔄 Respuestas</summary>

1. **El firewall bloquea ICMP pero no TCP**: la red está bien (hay conectividad) y es el filtro de ICMP el que silencia el ping. Nunca declares una red muerta solo por un ping.
2. El paquete SYN sale pero no llega respuesta: el destino es inalcanzable, hay una ACL/firewall que bloquea el puerto, o el servicio no escucha. Revisa rutas y ACLs.
3. **En tu servidor DNS local** (o en la resolución configurada): el DNS del centro no responde o está mal configurado. Es un problema de capa 7, no de red.
</details>

---

## ✅ Resumen en 3 frases

- **ping** y **traceroute** prueban la conectividad IP; traceroute añade la ruta salto a salto.
- **netstat** y **telnet** interrogan la capa 4: puertos en escucha y accesibilidad de servicios.
- **nslookup/dig** diagnostican la capa 7: si el nombre no resuelve, nada más importa para el usuario.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| ICMP | Protocolo de control que usa ping (tipos 0, 3, 8, 11) |
| Hop | Cada router intermedio que cruza un paquete |
| RTT | Round Trip Time: tiempo de ida y vuelta |
| LISTENING | Estado de un puerto abierto esperando conexiones |
| TTL | Contador que decrece por salto y evita bucles |
| Follow-up | Comandos combinados: pathping, mtr, netcat |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-diagnostico-monitorizacion) · **Anterior:** [01 · Metodología de diagnóstico](/ApuntesRedes/12-diagnostico-monitorizacion/01-metodologia-de-diagnostico) · **Siguiente:** [03 · Wireshark y análisis TCP](/ApuntesRedes/12-diagnostico-monitorizacion/03-wireshark)