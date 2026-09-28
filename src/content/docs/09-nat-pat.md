---
title: NAT y PAT
description: Disfraces para salir a Internet 🌐
---

<p><small>Disfraces para salir a Internet 🌐</small></p>

> 🗺️ **El mapa del curso:** 🗣️ OSPF → **🌐 AQUÍ ESTÁS** → 🛡️ ACLs → 📶 WiFi

---

*Tu oficina tiene 200 equipos con direcciones privadas (192.168.x.x) que Internet no sabe alcanzar. Aun así, todos navegan, sincronizan y videollaman con una sola IP pública. ¿Truco? No: NAT, el traductor de direcciones que convierte una limitación del mundo IPv4 en una infraestructura universal.*

Bienvenido a la unidad donde tu red privada sale al mundo. Tras el enrutamiento dinámico de la [unidad de OSPF](/ApuntesRedes/08-ospf), aquí juegas con la frontera: qué es NAT, sus tipos (estático, dinámico, PAT), cómo se configura en el router Cisco, cómo publicar servicios hacia fuera (port forwarding) y qué problemas trae de regalo. Los routers ya saben por dónde ir; ahora les toca traducir la dirección para que Internet sepa devolver el camino.

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros son teoría en progresión y el 9º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar por qué existe NAT y qué problema de agotamiento de IPv4 resuelve.
- Diferenciar NAT estático, dinámico y PAT (sobrecarga), y elegir el adecuado.
- Identificar inside/outside, local/global en cada sentido del tráfico.
- Configurar PAT en un router Cisco y verificarlo con `show ip nat translations`.
- Publicar servicios internos hacia Internet (NAT de destino / port forwarding).
- Diagnosticar los problemas típicos de las aplicaciones detrás de NAT (FTP, VoIP, juegos, VPN) y sus soluciones.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · ¿Qué es NAT?](/ApuntesRedes/09-nat-pat/01-que-es-nat) | El problema de IPv4 y la idea del traductor | Todos |
| [02 · Tipos de NAT](/ApuntesRedes/09-nat-pat/02-tipos-de-nat) | Estático, dinámico y PAT a vista de pájaro | Todos |
| [03 · NAT estático y dinámico](/ApuntesRedes/09-nat-pat/03-nat-estatico-y-dinamico) | Uno a uno y por pool | Todos |
| [04 · PAT (sobrecarga)](/ApuntesRedes/09-nat-pat/04-pat) | Puertos como identificador, tabla de traducciones | Clave |
| [05 · NAT destino (port forwarding)](/ApuntesRedes/09-nat-pat/05-nat-destino) | Port forwarding: publicar servicios | Todos |
| [06 · Tabla NAT y verificación](/ApuntesRedes/09-nat-pat/06-tabla-nat-y-verificacion) | show ip nat translations/statistics | Práctico |
| [07 · Problemas y soluciones](/ApuntesRedes/09-nat-pat/07-problemas-y-soluciones) | Lo que NAT rompe y cómo se arregla | Clave |
| [08 · Configuración completa](/ApuntesRedes/09-nat-pat/08-configuracion-completa) | El laboratorio paso a paso | Práctico |
| [09 · Cierre](/ApuntesRedes/09-nat-pat/09-cierre) | Sé el NAT, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u09-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u09-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u09-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u09-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA7)

**RA7: Conecta redes privadas a redes públicas identificando y aplicando diferentes tecnologías.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| a) | Se han descrito las ventajas e inconvenientes del uso de la traducción de direcciones de red (NAT) | ✅ Teoría (puntos 1-2) + 🔥 Fireside Chat (punto 9) |
| b) | Se ha utilizado NAT para realizar la traducción estática de direcciones de red | ✅ Punto 3 + ⚡ Laboratorio (punto 9) |
| c) | Se ha utilizado NAT para realizar la traducción dinámica de direcciones de red | ✅ Puntos 3-4 + ⚡ Laboratorio (punto 9) |
| d) | Se han descrito las características de las tecnologías «Frame Relay», RDSI y ADSL | ✅ Punto 7 (WAN heredada) |
| e) | Se han descrito las analogías y diferencias entre las tecnologías «Wifi» y «Wimax» | ✅ Punto 7 (estándares 802.11) |
| f) | Se han descrito las características de las tecnologías UMTS y HSDPA | ✅ Punto 7 (móvil 3G/3.5G) |

> ℹ️ El **port forwarding** (punto 5 + ⚡ Laboratorio, NAT destino) es contenido de la unidad — el bloque «NAT destino» —, no un CE: la letra d) oficial corresponde a las WAN heredadas.

---

## 🚪 ¿Por dónde empiezo?

- ¿Las IPs privadas no te suenan? Repasa el [punto 4 de dirección IP](/ApuntesRedes/03-direccionamiento-ip/04-ip-privadas-y-publicas): NAT nace de esa separación.
- ¿Ya conoces NAT de casa? El [punto 4 (PAT)](/ApuntesRedes/09-nat-pat/04-pat) es donde se explica de verdad cómo funciona tu router.

**📍 Primer punto:** [01 · ¿Qué es NAT?](/ApuntesRedes/09-nat-pat/01-que-es-nat)  
**⏭️ Al acabar la unidad, continúa en [ACLs y seguridad de red](/ApuntesRedes/10-acl-seguridad).**
