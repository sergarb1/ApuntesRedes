---
title: 06 — NetFlow e IPFIX
description: "Ver el tráfico con ojos de ingeniero: qué fluye por la red 📊"
---

<p><small>Ver el tráfico con ojos de ingeniero: qué fluye por la red 📊</small></p>

> 🗺️ **Estás en:** 🩺 U11 → 06 · NetFlow e IPFIX

---

## 📬 La idea en una frase

> **NetFlow** es una tecnología de **análisis de tráfico** que resume cada conversación de la red en un **registro de flujo** (quién habló con quién, con qué puertos, cuántos bytes y cuándo), y lo envía a un **colector** que lo grafica. **IPFIX** es su versión estandarizada.

SNMP (del [punto 4](/ApuntesRedes/11-diagnostico-monitorizacion/04-snmp)) te dice *cuánto* tráfico hay en una interfaz. NetFlow te dice *qué es* ese tráfico: qué IPs hablan entre sí, con qué protocolo y cuánto consumen. Es la diferencia entre saber que la autopista está llena y saber *qué coches la ocupan*.

---

## 🧩 ¿Qué es un "flujo"?

Un **flujo** (flow) es una conversación identificada por sus 7 campos clave:

```
IP origen  +  Puerto origen  +  IP destino  +  Puerto destino  +  Protocolo  +  TOS  +  Interfaz
```

Cuando un router ve paquetes que comparten esos campos durante un tiempo, los agrupa en un solo registro de flujo. No captura el contenido (nada de payload), solo el **resumen estadístico**: paquetes, bytes y marca de tiempo. Eso es lo que hace a NetFlow barato y escalable.

```
Router que habla NetFlow:

  Cliente A ──► Cliente B   (HTTP 80)
  Cliente A ──► Servidor X  (HTTPS 443)
  Backup ─────► Backup remoto (SSH 22)

  Registros de flujo enviados al colector:
  ┌─────────────────────────────────────────────┐
  │ A:12345 → B:80   TCP   1.2 MB   08:00-08:05 │
  │ A:54321 → X:443  TCP  45.0 MB   08:00-08:05 │
  │ Bk:4444 → R:22   TCP 120.0 MB   08:00-08:05 │
  └─────────────────────────────────────────────┘
```

Con esos tres registros ya sabes lo que vale la pena investigar: hay un backup (SSH) que consume 120 MB en cinco minutos, mientras la web mueve 45 MB. Si a las 9 de la mañana la red va lenta, NetFlow te dirá **quién** es el culpable en segundos.

---

## 🏗️ Componentes de un sistema NetFlow

```
┌──────────┐   flujos exportados   ┌────────────┐
│ Router / │ ────────────────────► │ Colector   │ ──► Base de datos ──► Dashboard
│ Switch   │  (puerto 2055/9995)   │ + Analizador│
└──────────┘                       └────────────┘
   (exportador)                      (NetFlow analyzer, Elastic, Zabbix...)
```

- **Exportador:** el dispositivo (router/switch) que detecta los flujos y los envía. En Cisco se configura con `ip flow export destination`.
- **Colector:** el servidor que recibe los registros (puertos típicos **2055** o **9995**) y los almacena.
- **Analizador:** el software que los grafica (Cisco NetFlow Analyzer, Elastic Stack, los dashboards de Zabbix o LibreNMS). Los verás en el [punto 7](/ApuntesRedes/11-diagnostico-monitorizacion/07-herramientas-de-monitorizacion).

**IPFIX** es la estandarización de NetFlow por el IETF (RFC 7011): mismo concepto, formato abierto e interoperable entre fabricantes. Cuando veas *"sFlow"* o *"NetStream"*, son variantes con el mismo espíritu: muestrear tráfico y resumirlo en flujos.

---

## 📊 NetFlow vs SNMP: dos preguntas distintas

La comparación estrella de entrevistas:

| Aspecto | SNMP | NetFlow/IPFIX |
|---|---|---|
| Qué pregunta | **¿Cuánto** tráfico hay en esta interfaz? | **¿Qué** tráfico es ese? (quién, a dónde) |
| Formato | Contadores por interfaz (polling) | Registros de flujo por conversación |
| Granularidad | Solo estadísticas de interfaz | IPs, puertos, protocolos, bytes |
| Método | El gestor **pregunta** (polling) | El dispositivo **envía** los flujos |
| Dato clave | `ifInOctets`, `ifOutOctets` | Tuplas origen/destino + volumen |

En cristiano: SNMP te dice que el enlace G0/1 va al 95%; NetFlow te dice que el 80% de ese 95% es un backup que debería estar en horario nocturno. Juntos son la pareja de investigación perfecta.

---

## ⚙️ Configuración básica en Cisco

```bash
R1(config)# ip flow-export destination 192.168.100.50 2055
R1(config)# ip flow-export version 9
R1(config)# ip flow-export source loopback 0
R1(config)# interface GigabitEthernet0/1
R1(config-if)# ip flow ingress        # analizar el tráfico de entrada
R1(config-if)# ip flow egress         # y el de salida
```

La configuración es simétrica a la de syslog y SNMP: un destino, una versión y un origen estable. El detalle nuevo es que **el muestreo se activa por interfaz** (`ip flow ingress`/`egress`), diciendo "en esta puerta quiero medir el tráfico". Sin esa línea, el router no genera flujos.

---

## 🧠 Mini-chequeo

1. Un usuario dice "la red va lenta". ¿Qué te aporta NetFlow que no te dé SNMP?
2. ¿NetFlow captura el contenido de los paquetes (el payload)? ¿Por qué?
3. ¿Cuál es el puerto típico de un colector NetFlow y quién lo escucha?

<details>
<summary>🔄 Respuestas</summary>

1. NetFlow te dice **qué conversaciones** consumen el ancho de banda (IPs, puertos, volumen), no solo que la interfaz está saturada. Con eso identificas al culpable (un backup, una descarga, un bucle) en lugar de limitarte a ver el contador.
2. **No**: NetFlow solo resume estadísticas (quién, puertos, bytes, tiempo). Esa es su ventaja: bajo coste y no expone datos sensibles. Capturar el contenido es trabajo de Wireshark, del [punto 3](/ApuntesRedes/11-diagnostico-monitorizacion/03-wireshark).
3. El **colector** escucha en el puerto **2055** (también 9995) recibiendo los registros exportados por los routers.
</details>

---

## ✅ Resumen en 3 frases

- NetFlow/IPFIX resume cada conversación en un **registro de flujo** y lo envía a un **colector** para analizar qué tráfico circula.
- Se compone de **exportador** (router/switch), **colector** (servidor) y **analizador** (dashboard), y se activa por interfaz.
- Frente a SNMP (¿cuánto?), NetFlow responde **¿qué?**: quién habla con quién, con qué puertos y cuánto consume.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Flujo | Conversación resumida: IPs, puertos, protocolo, bytes |
| Exportador | Dispositivo que detecta y envía los flujos |
| Colector | Servidor que recibe y almacena los flujos (2055/9995) |
| IPFIX | Versión estandarizada de NetFlow (RFC 7011) |
| Análisis pasivo | El dispositivo observa y reporta sin pedirle nada |
| Top talkers | Los hosts que más tráfico generan (salida típica) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-diagnostico-monitorizacion) · **Anterior:** [05 · Syslog y logging](/ApuntesRedes/11-diagnostico-monitorizacion/05-syslog-y-logging) · **Siguiente:** [07 · Herramientas de monitorización](/ApuntesRedes/11-diagnostico-monitorizacion/07-herramientas-de-monitorizacion)