---
title: U04 — IPv4 y subnetting
description: La calculadora maldita 🧮
---

<p><small>La calculadora maldita 🧮</small></p>

> 🗺️ **El mapa del curso:** 🔌 U03 → **🧮 AQUÍ ESTÁS (U04)** → 🚀 IPv6 → 🔀 Switching → 🏢 VLAN → 🧭 Routing → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ Cloud

---

*La red 192.168.1.0/24 está agotada. No quedan direcciones IP libres. Llegan 50 dispositivos nuevos y todos necesitan conectarse. Dividir la red en subredes más pequeñas parece la única solución.*

En U03 te dejaste las manos en los cables, conectores y medios físicos: los equipos ya tienen por dónde meter los bits. Ahora toca la pieza que ordena la fiesta: la **dirección IP**. Aquí descubrirás que una IPv4 son 32 bits con mucho carácter, que existe un truco matemático llamado **AND** para saber si dos equipos son vecinos, y que subnetear no es maldecir: es prestar bits.

Esta es la unidad de la calculadora. Y de CONRAD, que tiene una bien maldita por culpa de todos los alumnos que intentan hacer subnetting "de memoria". Prepárate para convertir a binario, contar hosts, dividir y subdividir con VLSM y dejar que **DHCP** reparta las IPs para no volverte loco.

Esta unidad se lee como un **libro de 9 capítulos**: cada punto desarrolla una idea completa y enlaza con el siguiente.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Leer una dirección IPv4 como un todo de **32 bits** y reconocer sus 4 octetos en notación decimal punteada.
- Convertir números decimales a **binario** y viceversa, y aplicar la operación **AND** para hallar la dirección de red.
- Clasificar direcciones según las **clases A-E** y explicar cómo **CIDR** acabó con las clases.
- Distinguir IPs **privadas (RFC 1918)** de **públicas** y saber por qué las privadas salvan Internet.
- Calcular la **máscara** y el rango usable de cualquier red a partir de su notación **/n**.
- **Subnetear** una red en subredes iguales y diseñar un **VLSM** sin desperdiciar direcciones.
- Configurar **DHCP** en un router Cisco y explicar el proceso **DORA**.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Estructura de IPv4](/ApuntesRedes/04-ipv4-subnetting/01-estructura-ipv4) | 32 bits, 4 octetos, notación decimal punteada, IPs especiales | Todos |
| [02 · Binario y la operación AND](/ApuntesRedes/04-ipv4-subnetting/02-binario-y-and) | Pesos de bits, conversión, tabla rápida, AND bit a bit | Todos |
| [03 · Clases de direcciones](/ApuntesRedes/04-ipv4-subnetting/03-clases-de-direcciones) | Clases A-E y cómo CIDR las eliminó | Todos |
| [04 · IPs privadas y públicas](/ApuntesRedes/04-ipv4-subnetting/04-ip-privadas-y-publicas) | RFC 1918, NAT, agotamiento del espacio IPv4 | Todos |
| [05 · Máscaras y notación CIDR](/ApuntesRedes/04-ipv4-subnetting/05-mascaras-y-cidr) | Qué es la máscara, tabla completa /30 a /8 | Todos |
| [06 · Subnetting paso a paso](/ApuntesRedes/04-ipv4-subnetting/06-subnetting-paso-a-paso) | Prestar bits, fórmulas, ejemplo completo | Todos |
| [07 · VLSM](/ApuntesRedes/04-ipv4-subnetting/07-vlsm) | Máscara de longitud variable, ejemplo resuelto | Todos |
| [08 · DHCP](/ApuntesRedes/04-ipv4-subnetting/08-dhcp) | DORA, configuración Cisco, Packet Tracer | Todos |
| [09 · Head First (cierre)](/ApuntesRedes/04-ipv4-subnetting/09-head-first) | Be the Packet, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los puntos 1 a 5 son teoría en progresión. En el 6 y el 7 se hacen los cálculos de verdad: subnetting clásico y VLSM. El 8 es DHCP, el repartidor automático de IPs. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u04-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA2)

**RA2: Integra ordenadores y periféricos en redes cableadas e inalámbricas.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| d) | Direccionamiento lógico IP | ✅ Puntos 1-7 + ⚡ Laboratorio (punto 9) |
| g) | Conectividad entre dispositivos | ✅ Punto 8 (DHCP) + ⚡ Laboratorio (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Necesitas refrescar dónde vive la capa IP en la pila y qué es un gateway? → Repasa el [punto 6 de la U02](/ApuntesRedes/02-modelos-osi-analisis/06-ip-ethernet).
- ¿Ya sabes lo básico? → Arranca directamente en el [punto 1](/ApuntesRedes/04-ipv4-subnetting/01-estructura-ipv4).

**📍 Primer punto:** [01 · Estructura de IPv4](/ApuntesRedes/04-ipv4-subnetting/01-estructura-ipv4)  
**⏭️ Al acabar la unidad, continúa en [U05 · IPv6 y transición](/ApuntesRedes/05-ipv6-transicion).**