---
title: 07 — Herramientas de monitorización
description: "Zabbix, PRTG, Nagios y LibreNMS: el panel de control de tu red 📈"
---

<p><small>Zabbix, PRTG, Nagios y LibreNMS: el panel de control de tu red 📈</small></p>

> 🗺️ **Estás en:** 🩺 U11 → 07 · Herramientas de monitorización

---

## 📬 La idea en una frase

> Las herramientas de monitorización son el **centro de control** donde confluyen todo lo que has aprendido: hacen **polling SNMP** (del [punto 4](/ApuntesRedes/11-diagnostico-monitorizacion/04-snmp)), reciben **syslog** (del [punto 5](/ApuntesRedes/11-diagnostico-monitorizacion/05-syslog-y-logging)) y analizan **NetFlow** (del [punto 6](/ApuntesRedes/11-diagnostico-monitorizacion/06-netflow-y-ipfix)), y lo pintan todo en gráficas y alarmas.

Los protocolos son la materia prima; estas herramientas son el panel de instrumentos. Ya no miras un router a la vez: miras **toda la red** en una sola pantalla, con avisos automáticos cuando algo se desvía de lo normal.

---

## ⚔️ El gran comparativo

| Herramienta | Modelo | Puertos | Cifrado | Dato clave |
|---|---|---|---|---|
| **Zabbix** | Agente propio + SNMP | 10051 (agente) | TLS | Moderna, auto-descubrimiento, la más popular hoy |
| **PRTG** | Sensor-based (SNMP/ping/HTTP) | 443 web | TLS | Comercial con licencia gratuita (100 sensores) |
| **Nagios** | Plugins + agente | 5666 (NRPE) | TLS | El veterano, infinita extensibilidad por plugins |
| **LibreNMS** | SNMP auto-discovery | 443 web | TLS | Open source, auto-descubrimiento, librerías PHP |

**Cómo encaja cada una con los protocolos:**

- **SNMP:** todas hacen polling a las OIDs de CPU, tráfico y memoria. Si configuraste el [punto 4](/ApuntesRedes/11-diagnostico-monitorizacion/04-snmp) con `publicia`, estas herramientas ya pueden leerte el router.
- **Syslog:** Zabbix y LibreNMS reciben logs centralizados; Nagios los procesa con plugins. Los mensajes del [punto 5](/ApuntesRedes/11-diagnostico-monitorizacion/05-syslog-y-logging) se convierten en eventos visibles.
- **NetFlow/IPFIX:** Zabbix y LibreNMS actúan como colector del [punto 6](/ApuntesRedes/11-diagnostico-monitorizacion/06-netflow-y-ipfix) y dibujan los *top talkers* en sus dashboards.

---

## 🐝 Zabbix: la referencia moderna

Zabbix combina tres modos de recogida en una sola herramienta:

- **Polling SNMP:** lee las OIDs periódicamente (cada 30s-5min).
- **Agente Zabbix:** un programa ligero instalado en servidores que reporta métricas del sistema operativo (CPU, RAM, disco) con más detalle que SNMP.
- **Traps y syslog:** recibe notificaciones activas de los dispositivos.

Su punto fuerte es el **auto-descubrimiento**: escanea una red, detecta hosts con SNMP y crea los ítems automáticamente. Lo verás en el [boletín avanzado](/ApuntesRedes/boletines/boletin-u11-avanzado) diseñando un plan de monitorización.

> 💡 **Analogía del hospital:** cada herramienta es un tipo de vigilancia. Zabbix es la enfermera que pasa a mirar constantemente (polling); syslog es el historial clínico donde se apunta todo (logs); NetFlow es el portero que anota quién entra y sale (flujos). Ninguna sustituye a las otras: se complementan.

---

## 📡 PRTG: el comercial amable

PRTG es de la escuela "todo incluido": cientos de **sensores** predefinidos (ping, SNMP, HTTP, NetFlow, y hasta temperatura de equipos) que configuras en minutos. Tiene una **licencia gratuita para 100 sensores**, suficiente para una red pequeña de instituto o pyme. Su curva de aprendizaje es la más suave: si necesitas resultados en una tarde, PRTG es tu candidato.

## 🏛️ Nagios: el veterano infinito

Nagios es el abuelo de la monitorización (nació en 1999) y su superpoder es la **extensibilidad**: si algo no existe, alguien ya escribió un *plugin* para ello (hay miles). Su punto débil es la configuración: todo se escribe a mano en archivos de texto, lo que lo hace potente pero laborioso. Es el favorito en entornos Linux grandes y en entrevistas: *"¿Has trabajado con Nagios?"* es una pregunta real.

## 🦉 LibreNMS: el open source autónomo

LibreNMS brilla por su **auto-descubrimiento SNMP**: añades una red y descubre routers, switches, APs y servidores, con gráficas listas sin apenas configuración. Es de la familia *fácil de desplegar*: un contenedor Docker y una comunidad activa. Ideal como primer sistema de monitorización en un centro educativo.

---

## 🧩 Cómo funciona una monitorización típica

Verlo como un flujo de datos ayuda a entender dónde encaja cada pieza:

```
Dispositivos (routers/switches/servidores)
   │  SNMP (polling de OIDs)         │  syslog (UDP/514)     │ NetFlow (flujos)
   ▼                                 ▼                        ▼
┌──────────────────────────────────────────────────────────────────┐
│                       NMS (Zabbix / PRTG / Nagios / LibreNMS)      │
│   ● recolecta  ● guarda en BD  ● grafica  ● evalúa umbrales        │
└──────────────────────────────────────────────────────────────────┘
   │                                          │
   ▼                                          ▼
Dashboard (pantalla del admin)         Alarmas (email, telegram, SMS)
```

El ciclo se repite cada pocos minutos: la herramienta pregunta (polling), almacena, pinta la gráfica y, si una métrica cruza un umbral definido por ti (por ejemplo, CPU > 90% o enlace > 85%), dispara una **alarma**. Ese es el objetivo final: que el administrador se entere del problema **antes** de que el usuario lo note. Es la diferencia entre el [punto 8](/ApuntesRedes/11-diagnostico-monitorizacion/08-caso-practico-de-diagnostico) (reaccionar) y esta unidad de monitorización (prevenir).

> 💡 **Primer proyecto real:** despliega LibreNMS (o Zabbix) en un contenedor Docker, añade la subred de tu centro, y deja que el auto-descubrimiento detecte los equipos. En menos de una tarde tendrás tu primera gráfica de tráfico sin escribir una línea de configuración.

---

## 🧠 Mini-chequeo

1. ¿Qué tienen en común Zabbix, PRTG, Nagios y LibreNMS en su base?
2. Si quieres monitorizar un router que ya tiene `snmp-server community publicia ro`, ¿qué necesitas hacer en la herramienta?
3. ¿Cuándo elegirías PRTG y cuándo Nagios?

<details>
<summary>🔄 Respuestas</summary>

1. Las cuatro se apoyan en **SNMP** como protocolo principal de recogida (más syslog y NetFlow), y ofrecen gráficas + alarmas. Cambian en filosofía, licencia y facilidad.
2. Añadir el host a la herramienta indicando la IP, la comunidad `publicia` y las OIDs a leer; con auto-descubrimiento, a veces ni eso.
3. **PRTG** si buscas resultado rápido con interfaz amigable y presupuesto cero (100 sensores gratis). **Nagios** si necesitas máxima flexibilidad con plugins y una infraestructura Linux gestionable por archivos.
</details>

---

## ✅ Resumen en 3 frases

- Las herramientas de monitorización **integran SNMP + syslog + NetFlow** en un solo panel con gráficas y alarmas.
- **Zabbix** es la moderna de referencia, **PRTG** la más fácil (gratis hasta 100 sensores), **Nagios** el veterano extensible y **LibreNMS** el open source con auto-descubrimiento.
- Elegir una depende de la escala y del tiempo de configuración que quieras invertir: desde una tarde (PRTG) a un proyecto serio (Nagios).

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| NMS | El gestor SNMP: Zabbix, PRTG, Nagios, LibreNMS |
| Polling | Consulta periódica de OIDs (preguntar cada X segundos) |
| Auto-descubrimiento | El NMS detecta hosts e ítems sin configuración manual |
| Sensor / plugin | Unidad de medida concreta (ping, SNMP, HTTP…) |
| Dashboard | Panel gráfico con el estado de toda la red |
| Alerta | Aviso automático cuando una métrica supera un umbral |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-diagnostico-monitorizacion) · **Anterior:** [06 · NetFlow e IPFIX](/ApuntesRedes/11-diagnostico-monitorizacion/06-netflow-y-ipfix) · **Siguiente:** [08 · Caso práctico de diagnóstico](/ApuntesRedes/11-diagnostico-monitorizacion/08-caso-practico-de-diagnostico)