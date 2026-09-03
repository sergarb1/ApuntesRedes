---
title: 03 — El modelo TCP/IP
description: El modelo que realmente manda en Internet 🌐
---

<p><small>El modelo que realmente manda en Internet 🌐</small></p>

> 🗺️ **Estás en:** 📡 **U03 · Modelos OSI y análisis** → 03 · El modelo TCP/IP

---

## 📬 La idea en una frase

> El modelo **TCP/IP** es el que se usa de verdad en Internet: menos académico y más práctico que OSI, con **4 capas** que fusionan las 7 del modelo teórico.

Surgió del proyecto **ARPANET** en los años 70, antes que OSI, y por eso ganó la partida: Internet se construyó sobre él. OSI es un plano precioso; TCP/IP es el que se enchufa de verdad.

---

## 🕰️ ¿De dónde viene?

En 1984 la ISO publicó el modelo OSI como marco de referencia. Pero mientras tanto, los investigadores de ARPANET (el antepasado de Internet) ya habían construido una red que funcionaba con un modelo más simple, nacido de las cabeceras reales de sus protocolos: TCP (transporte) e IP (red).

La lección histórica: **el que funciona se queda, aunque el académico sea más bonito**. El Fireside Chat del [cierre de la unidad](/ApuntesRedes/03-modelos-osi-analisis/09-cierre) dramatiza justo esta tensión.

---

## 🧱 Las 4 capas de TCP/IP

| Capa TCP/IP | OSI equivalente | Protocolos principales |
|---|---|---|
| **Aplicación** | 7 + 6 + 5 (Aplicación, Presentación, Sesión) | HTTP, DNS, FTP, SMTP, SSH, TLS |
| **Transporte** | 4 (Transporte) | TCP, UDP |
| **Internet** | 3 (Red) | IP, ICMP, ARP |
| **Acceso a Red** | 2 + 1 (Enlace, Física) | Ethernet, WiFi, PPP |

Dos fusiones resumen la diferencia:

- **Aplicación = OSI 7-6-5:** no hay capas separadas de Presentación ni Sesión; TLS, la compresión y los "checkpoints" se negocian dentro del protocolo de aplicación.
- **Acceso a Red = OSI 2-1:** el cable y el formato de trama se juntan, porque en la práctica van cohesionados.

```
OSI 7-6-5 ──────→ TCP/IP Aplicación   (todo en una)
OSI 4     ──────→ TCP/IP Transporte   (igual)
OSI 3     ──────→ TCP/IP Internet     (igual)
OSI 2-1   ──────→ TCP/IP Acceso Red   (fusión)
```

---

## ⚖️ OSI vs TCP/IP: tabla para decidir

| Criterio | OSI | TCP/IP |
|---|---|---|
| Nº de capas | 7 | 4 |
| Origen | Teórico (ISO, 1984) | Práctico (ARPANET, años 70) |
| Uso real | Referencia docente | El que usa Internet |
| Separación Presentación/Sesión | Sí | No (fusionadas) |
| Cabeceras | Concepto | Coinciden con las reales |

> 💡 **Más útil aún que la tabla:** sé capaz de decir *qué capa OSI equivale a qué capa TCP/IP* y por qué la fusión funciona. Es una pregunta recurrente en entrevistas de administración de redes.

---

## 🧠 ¿Cuándo pienso en cuál?

- Si hablas de **protocolos reales** (HTTP, TCP, IP, Ethernet): piensa en TCP/IP, porque sus nombres coinciden con las cabeceras que verás en [Wireshark](/ApuntesRedes/03-modelos-osi-analisis/08-wireshark).
- Si hablas de **conceptos y responsabilidades** (¿qué capa cifra? ¿cuál decide la ruta?): piensa en OSI, porque separa más fino y sirve para diagnosticar.
- El truco profesional: explicar con OSI y operar con TCP/IP.

---

## 🧠 Mini-chequeo

1. ¿Qué capas del OSI fusiona TCP/IP en su "Aplicación"? ¿Y en su "Acceso a Red"?
2. ¿Por qué ganó TCP/IP si OSI es posterior y más completo en teoría?
3. Un entrevistador pregunta "¿en qué capa trabaja un router?". ¿Respondes con OSI o TCP/IP? ¿Por qué?

<details>
<summary>🔄 Respuestas</summary>

1. **Aplicación** fusiona OSI 7+6+5; **Acceso a Red** fusiona OSI 2+1.
2. Porque **Internet ya se construyó sobre TCP/IP** antes de que OSI fuera un estándar: el que funciona sobrevive, aunque el académico tenga mejor fama.
3. Con **OSI**: capa 3 (Red). Es la respuesta clásica de entrevista, porque OSI separa conceptos; operativamente dirías que "trabaja con IP", que es capa Internet de TCP/IP.
</details>

---

## ✅ Resumen en 3 frases

- TCP/IP es el modelo **de facto** de Internet, con 4 capas que fusionan las 7 de OSI.
- Aplicación = 7-6-5; Acceso a Red = 2-1; Transporte e Internet se mantienen iguales.
- En entrevistas y diagnósticos: **explica con OSI, opera con TCP/IP**.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| ARPANET | Red pionera (años 70) de la que nació Internet |
| Capa Internet | La capa IP de TCP/IP (equivale a OSI 3) |
| Acceso a Red | La capa que junta cable y trama (OSI 2-1) |
| Modelo de facto | El que se usa realmente, aunque no sea "oficial" |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-modelos-osi-analisis) · **Anterior:** [02 · Las 7 capas en detalle](/ApuntesRedes/03-modelos-osi-analisis/02-las-7-capas) · **Siguiente:** [04 · Encapsulación](/ApuntesRedes/03-modelos-osi-analisis/04-encapsulacion)