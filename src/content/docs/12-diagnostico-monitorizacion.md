---
title: U12 — Diagnóstico y monitorización
description: Apágalo y vuelve a encenderlo 🧠
---

<p><small>Apágalo y vuelve a encenderlo 🧠</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 **DIAGNÓSTICO** → ☁️ Cloud

---

*En el camino de un paquete a través de la red pueden ocurrir múltiples fallos: cables rotos, ACLs que bloquean tráfico legítimo, NAT mal configurado, rutas perdidas... ¿Cómo se diagnostica una red cuando algo falla?*

Bienvenido al arte del troubleshooting: la habilidad más valiosa de un administrador de redes. En las unidades anteriores construiste la red paquete a paquete; ahora toca el lado oscuro del oficio, cuando algo se rompe y hay que saber por dónde empezar a mirar. Aprenderás a razonar **de abajo hacia arriba** (del cable a la aplicación), a dominar los comandos que todo administrador tiene en la punta de los dedos, a leer el alma de los paquetes con Wireshark y a montar una monitorización profesional con SNMP, syslog y NetFlow para que los fallos te avisen antes de que el usuario lo note.

Esta unidad se lee como un **libro de 9 capítulos**: cada punto desarrolla una idea completa y enlaza con el siguiente.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Aplicar una metodología de diagnóstico estructurada siguiendo el modelo OSI de abajo arriba.
- Usar los comandos esenciales (ping, traceroute, netstat, nslookup/dig, telnet) e interpretar su salida.
- Capturar tráfico con Wireshark, aplicar filtros, analizar TCP (handshake, retransmisiones, ventana, RTT) y seguir el flujo de una conversación (Follow TCP Stream).
- Explicar la arquitectura de SNMP: NMS, agente, MIB y OID, y las diferencias entre las versiones v1, v2c y v3.
- Configurar SNMP y syslog en dispositivos Cisco y montar un logging centralizado.
- Describir NetFlow/IPFIX y en qué se diferencia de SNMP.
- Comparar herramientas de monitorización como Zabbix, PRTG, Nagios y LibreNMS.
- Resolver un caso práctico de red averiada aplicando todo lo anterior.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Metodología de diagnóstico](/ApuntesRedes/12-diagnostico-monitorizacion/01-metodologia-de-diagnostico) | Diagnóstico OSI de abajo arriba y la regla de oro | Todos |
| [02 · Comandos esenciales](/ApuntesRedes/12-diagnostico-monitorizacion/02-comandos-esenciales) | ping, traceroute, netstat, nslookup/dig | Todos |
| [03 · Wireshark y análisis TCP](/ApuntesRedes/12-diagnostico-monitorizacion/03-wireshark) | Filtros, handshake, retransmisiones, Follow Stream | Todos |
| [04 · SNMP](/ApuntesRedes/12-diagnostico-monitorizacion/04-snmp) | Arquitectura, MIB, OID, versiones y configuración Cisco | Todos |
| [05 · Syslog y logging](/ApuntesRedes/12-diagnostico-monitorizacion/05-syslog-y-logging) | Niveles, logging centralizado, rsyslog | Todos |
| [06 · NetFlow e IPFIX](/ApuntesRedes/12-diagnostico-monitorizacion/06-netflow-y-ipfix) | Análisis de tráfico y diferencia con SNMP | Todos |
| [07 · Herramientas de monitorización](/ApuntesRedes/12-diagnostico-monitorizacion/07-herramientas-de-monitorizacion) | Zabbix, PRTG, Nagios, LibreNMS | Todos |
| [08 · Caso práctico de diagnóstico](/ApuntesRedes/12-diagnostico-monitorizacion/08-caso-practico-de-diagnostico) | Troubleshooting real con las 5 capas | Todos |
| [09 · Cierre](/ApuntesRedes/12-diagnostico-monitorizacion/09-cierre) | Sé el Diagnóstico, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u13-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u13-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u13-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u13-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA2/Transversal)

**RA2/Transversal: Diagnóstico y monitorización.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| h) | Mapa físico y lógico | ✅ Puntos 1 y 2 + ⚡ Laboratorio (punto 9) |
| i) | Monitorización SNMP | ✅ Punto 4 + 🧠 Atrévete a pensar (punto 9) |
| j) | Herramientas de diagnóstico | ✅ Puntos 2, 3 y 7 + 🔥 Fireside (punto 9) |
| k) | Syslog y logging | ✅ Punto 5 + 💬 Entrevista (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

¿Acabas de terminar la U11 de NAT y buscas aplicar lo aprendido? → Empieza por el [punto 1](/ApuntesRedes/12-diagnostico-monitorizacion/01-metodologia-de-diagnostico): la metodología te da el mapa mental, y el resto de capítulos lo llenan de herramientas. Si prefieres un enfoque más práctico, salta directamente al [punto 8](/ApuntesRedes/12-diagnostico-monitorizacion/08-caso-practico-de-diagnostico), ataca el caso real y vuelve a los puntos de teoría cuando necesites refrescar un comando o una configuración.

¿Ya dominas ping y Wireshark? → Repasa el [punto 4 de SNMP](/ApuntesRedes/12-diagnostico-monitorizacion/04-snmp) y el [punto 5 de syslog](/ApuntesRedes/12-diagnostico-monitorizacion/05-syslog-y-logging), que son la base de cualquier monitorización seria, y luego ponte a prueba con el [cierre](/ApuntesRedes/12-diagnostico-monitorizacion/09-cierre) y sus boletines.

**📍 Primer punto:** [01 · Metodología de diagnóstico](/ApuntesRedes/12-diagnostico-monitorizacion/01-metodologia-de-diagnostico)  
**⏭️ Al acabar la unidad, continúa en [U13 · Cloud, virtualización y futuro](/ApuntesRedes/13-cloud-virtualizacion-futuro).