---
title: U10 — NAT y acceso a Internet
description: Internet no funciona otra vez 🌐
---

<p><small>Internet no funciona otra vez 🌐</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 **NAT** → 🩺 Diagnóstico → ☁️ Cloud

---

*Una IP privada (192.168.1.10) no puede viajar por Internet. Las direcciones públicas son el único idioma que entiende la red global. Alguien debe traducir esa dirección para poder salir al mundo.*

Ese alguien es **NAT**. En esta unidad le abrimos la puerta: entenderás por qué existe, cuáles son sus 4 tipos de traducción, cómo leer su tabla de traducciones, por qué algunas aplicaciones (FTP, VoIP, juegos online) se enfadan con él y cómo configurarlo de principio a fin en un router Cisco dentro de Packet Tracer.

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros desarrollan la teoría en progresión (cada uno enlaza con el siguiente) y el 9º es el aterrizaje práctico con juegos, laboratorio de tortura y entrevista de trabajo.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar por qué existe NAT y qué ventajas e inconvenientes aporta frente a una red sin traducción.
- Distinguir NAT estático, NAT dinámico, PAT y NAT destino, y elegir el tipo correcto para cada escenario.
- Configurar PAT para que una LAN entera salga a Internet con una única IP pública.
- Exponer servicios internos con NAT destino (port forwarding) y diagnosticar por qué "no funciona".
- Leer e interpretar la tabla NAT (`show ip nat translations`) y verificar el estado con los comandos de Cisco.
- Explicar los problemas de NAT con aplicaciones (FTP activo, VoIP, P2P, IPsec) y sus soluciones (ALGs, NAT-T, UPnP).
- Diferenciar WiFi vs WiMax y nombrar los estándares 802.11 actuales.
- Completar un laboratorio Packet Tracer de NAT con fallo intencionado y diagnosticarlo.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · ¿Qué es NAT?](/ApuntesRedes/10-nat-internet/01-que-es-nat) | Concepto, motivación y el fin del extremo a extremo | Todos |
| [02 · Tipos de NAT](/ApuntesRedes/10-nat-internet/02-tipos-de-nat) | Los 4 tipos de traducción y cuándo usar cada uno | Todos |
| [03 · NAT estático y dinámico](/ApuntesRedes/10-nat-internet/03-nat-estatico-y-dinamico) | El 1:1 fijo y el pool de IPs públicas | Todos |
| [04 · PAT (sobrecarga)](/ApuntesRedes/10-nat-internet/04-pat) | Muchas IPs privadas, una pública, puertos al rescate | Todos |
| [05 · NAT destino (port forwarding)](/ApuntesRedes/10-nat-internet/05-nat-destino) | Exponer servicios internos al exterior | Todos |
| [06 · Tabla NAT y verificación](/ApuntesRedes/10-nat-internet/06-tabla-nat-y-verificacion) | Campos de la tabla, timeouts y comandos show | Todos |
| [07 · Problemas y soluciones](/ApuntesRedes/10-nat-internet/07-problemas-y-soluciones) | ALGs, UPnP, NAT-T y WiFi vs WiMax | Todos |
| [08 · Configuración completa](/ApuntesRedes/10-nat-internet/08-configuracion-completa) | El laboratorio Packet Tracer de principio a fin | Todos |
| [09 · Head First (cierre)](/ApuntesRedes/10-nat-internet/09-head-first) | Sé el NAT, Fireside, Laboratorio de Tortura, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u10-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u10-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u10-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u10-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA7)

**RA7: Conecta redes privadas a redes públicas.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| a) | Ventajas e inconvenientes de NAT | ✅ Puntos 1 y 2 + 🔥 Fireside (punto 9) |
| b) | NAT estático | ✅ Punto 3 + ⚡ Laboratorio (punto 9) |
| c) | NAT dinámico/PAT | ✅ Puntos 3 y 4 + ⚡ Laboratorio (punto 9) |
| d) | Port forwarding | ✅ Punto 5 + ⚡ Laboratorio (punto 9) |
| e) | WiFi vs WiMax | ✅ Punto 7 (estándares 802.11) |

---

## 🚪 ¿Por dónde empiezo?

¿Vienes de la U09 con el router ya enrutando con OSPF? Entonces tienes el medio para traducir: arranca directamente en el [01 · ¿Qué es NAT?](/ApuntesRedes/10-nat-internet/01-que-es-nat) y sigue la progresión hasta el 9º punto.

¿Necesitas refrescar direccionamiento IPv4, subredes o IPs públicas vs privadas? Repasa el índice de la [U04 · IPv4 y subnetting](/ApuntesRedes/04-ipv4-subnetting) antes de lanzarte: NAT se entiende mucho mejor cuando tienes clara la diferencia entre una IP privada y una pública.

**📍 Primer punto:** [01 · ¿Qué es NAT?](/ApuntesRedes/10-nat-internet/01-que-es-nat)  
**⏭️ Al acabar la unidad, continúa en [U11 · Diagnóstico y monitorización](/ApuntesRedes/11-diagnostico-monitorizacion).**