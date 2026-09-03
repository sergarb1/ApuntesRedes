---
title: 05 — Syslog y logging
description: Logs centralizados, niveles de severidad y rsyslog 📝
---

<p><small>Logs centralizados, niveles de severidad y rsyslog 📝</small></p>

> 🗺️ **Estás en:** 🩺 U12 → 05 · Syslog y logging

---

## 📬 La idea en una frase

> **Syslog** es el protocolo estándar para enviar mensajes de log de un dispositivo (router, switch, servidor) a un servidor central, etiquetando cada mensaje con una **facilidad** (origen) y una **severidad** (gravedad), para que un administrador pueda investigar el pasado de la red.

SNMP te dice el presente (del [punto 4](/ApuntesRedes/12-diagnostico-monitorizacion/04-snmp)); syslog te guarda el **pasado**. Cuando a las 3 de la madrugada un enlace se cae y se recupera, nadie está mirando, pero syslog lo tiene escrito con fecha y hora. Es la caja negra de la red.

---

## 🚨 Niveles de syslog: del incendio al rumor

Cada mensaje lleva un nivel de severidad del 0 al 7. Este orden es **casi el único que hay que memorizar en esta unidad**, y esconde una trampa: **el número menor es el más grave**.

| Nivel | Severidad | Descripción |
|---|---|---|
| 0 | Emergency | Sistema inusable |
| 1 | Alert | Acción inmediata |
| 2 | Critical | Condición crítica |
| 3 | Error | Error |
| 4 | Warning | Advertencia |
| 5 | Notice | Normal pero significativo |
| 6 | Informational | Informativo |
| 7 | Debug | Depuración |

> ⚠️ **Trampa clásica de exámenes:** nivel 0 (Emergency) es el **más** grave y nivel 7 (Debug) el **menos**. Si configuras `logging trap debugging`, estás pidiendo que se envíe TODO, incluida la severidad 7, que llena el disco del servidor en cuestión de horas. En producción se usa `logging trap notifications` (severidad 5) o `informational` (6), para tener suficiente detalle sin ahogar el servidor.

---

## 📦 El formato del mensaje

Un log syslog bien formado identifica **quién, cuándo y qué** en una sola línea:

```
Jun 24 14:05:33 R1-sede %LINEPROTO-5-UPDOWN: Line protocol on Interface GigabitEthernet0/1, changed state to up
```

Partes clave:

- **`Jun 24 14:05:33`** — fecha y hora (se activa con `service timestamps log datetime msec`).
- **`R1-sede`** — el hostname del emisor (fundamental cuando tienes 50 routers).
- **`%LINEPROTO-5-UPDOWN`** — la facilidad `LINEPROTO` y la **severidad 5** (Notice).
- **El texto** — el evento ocurrido. Este concreto dice que la interfaz G0/1 volvió a estar *up*: la firma de un enlace que se cae y se recupera.

---

## ⚙️ Configurar syslog en Cisco

```bash
R1(config)# logging host 192.168.1.100
R1(config)# logging trap debugging            # Nivel máximo (¡ojo! normalmente mejor 5 o 6)
R1(config)# logging source-interface loopback 0
R1(config)# service timestamps log datetime msec
```

Cada línea tiene su porqué:

- **`logging host 192.168.1.100`** — el destino: el servidor de logs (normalmente UDP/514, sin confirmación).
- **`logging trap <nivel>`** — el **umbral de severidad** que se envía al servidor: solo se reenvían los mensajes con severidad menor o igual al nivel indicado.
- **`logging source-interface loopback 0`** — fuerza que todos los mensajes salgan con la IP del loopback (una IP estable), aunque la interfaz por la que salen cambie. Así el servidor siempre ve el mismo origen.
- **`service timestamps log datetime msec`** — añade fecha y hora real al log (¡y con milisegundos!): imprescindible para correlacionar eventos entre equipos.

---

## 🖥️ El servidor: rsyslog en Linux

En el servidor receptor, `rsyslog` (el syslog de referencia en Linux) escucha en el puerto **514/UDP** y guarda los mensajes. La configuración mínima:

```bash
# En /etc/rsyslog.conf: activar el módulo UDP
module(load="imudp")
input(type="imudp" port="514")

# Guardar los mensajes de los routers en un archivo aparte
:hostname, isequal, "R1-sede"  /var/log/red/r1-sede.log

# Reiniciar para aplicar
sudo systemctl restart rsyslog
```

Con esta config, cada router tiene su propio archivo de log. El siguiente paso natural es un **visor centralizado** (Kibana/Grafana o incluso la pestaña de logs de Zabbix) para buscar patrones: "¿cuántas veces se ha caído este enlace esta semana?" es una pregunta que solo tiene respuesta si tienes syslog montado. Lo verás combinado con las herramientas del [punto 7](/ApuntesRedes/12-diagnostico-monitorizacion/07-herramientas-de-monitorizacion).

> 💡 **Prueba rápida sin servidor:** `logging console` muestra los logs en la consola del dispositivo, y `show logging` los muestra en el propio router. Son el mini-syslog que tienes siempre a mano mientras montas el servidor central.

---

## 🧠 Mini-chequeo

1. Ordena de más a menos grave: Informational, Critical, Debug, Warning.
2. Si un administrador configura `logging trap debugging`, ¿qué riesgo corre?
3. ¿Para qué sirve `logging source-interface loopback 0`?

<details>
<summary>🔄 Respuestas</summary>

1. **Critical (2) → Warning (4) → Informational (6) → Debug (7)**. Recuerda: número bajo = gravedad alta.
2. Que se envíen **todos** los mensajes, incluida la severidad 7 (Debug), que genera un volumen enorme y **llenará el disco** del servidor de logs. En producción se usa nivel 5 o 6.
3. Para que todos los mensajes salgan con una **IP estable** (la del loopback) independientemente de la interfaz de salida. El servidor siempre verá el mismo origen y podrá identificar al equipo sin ambigüedades.
</details>

---

## ✅ Resumen en 3 frases

- Syslog centraliza los logs de todos los equipos en un servidor, con **facilidad** (origen) y **severidad** (0-7) en cada mensaje.
- En Cisco se configura con `logging host`, `logging trap <nivel>` y `service timestamps`, y en Linux se recibe con **rsyslog** (UDP/514).
- Un nivel de producción sensato es **5 (notifications)** o **6 (informational)**: 7 (debug) llenaría el disco.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Syslog | Protocolo estándar de logs entre dispositivos y servidor |
| Facilidad | Origen del mensaje (LINEPROTO, SYS, IF, etc.) |
| Severidad | Gravedad del 0 (Emergency) al 7 (Debug) |
| rsyslog | Implementación de syslog de referencia en Linux |
| Trap (syslog) | Umbral de severidad que decide qué se reenvía |
| Timestamp | Marca de fecha/hora, imprescindible para correlacionar |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-diagnostico-monitorizacion) · **Anterior:** [04 · SNMP](/ApuntesRedes/12-diagnostico-monitorizacion/04-snmp) · **Siguiente:** [06 · NetFlow e IPFIX](/ApuntesRedes/12-diagnostico-monitorizacion/06-netflow-y-ipfix)