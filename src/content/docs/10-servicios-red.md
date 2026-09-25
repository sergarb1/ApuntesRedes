---
title: "Servicios de red: DHCP, DNS y NTP"
description: Los tres mugrientos que hacen que todo funcione sin que nadie se dé cuenta 🗄️
---

<p><small>Los tres mugrientos que hacen que todo funcione sin que nadie se dé cuenta 🗄️</small></p>

> 🗺️ **El mapa del curso:** 🧭 Routing → 🗣️ OSPF → 🛡️ ACLs → 🌐 NAT → **🗄️ AQUÍ ESTÁS** → 📶 WiFi → 🔁 Alta disponibilidad

---

*Un usuario conecta su portátil a la red de la empresa y, sin tocar nada, tiene IP, sabe dónde está el gateway, resuelve nombres de dominio y encima su reloj está en hora exacta. No hay magia: hay tres servicios trabajando en silencio. DHCP le dio dirección, DNS tradujo "www.ejemplo.es" en una IP y NTP puso en hora el reloj del sistema.*

Bienvenido a la unidad de los servicios invisibles. Hasta ahora has construido la red: medios, direcciones, conmutación, enrutamiento, seguridad y salida a Internet. Pero una red sin servicios es un edificio con luces y sin ascensor: funciona el esqueleto, pero nadie puede trabajar. Aquí despliegas los tres servicios críticos que toda red profesional necesita para que los usuarios ni se enteren de que la red existe.

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros son teoría en progresión y el 9º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar el proceso DORA de DHCP (Discover, Offer, Request, Ack) y qué campos viajan en cada paso.
- Configurar un servidor DHCP en router Cisco (pool, exclusiones, reservas) y depurar asignaciones con `show ip dhcp binding`.
- Entender los agentes de reenvío (ip helper-address) para servir DHCP entre subredes distintas.
- Describir la resolución jerárquica de DNS: recursiva, iterativa, caché, registros A, AAAA, CNAME, MX y PTR.
- Montar y verificar DNS en Cisco IOS y diagnosticar problemas con `nslookup` y `dig`.
- Justificar por qué la sincronización horaria (NTP) es crítica para logs, certificados y autenticación.
- Configurar NTP con autenticación entre dispositivos Cisco.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Por qué necesitas servicios](/ApuntesRedes/10-servicios-red/01-por-que-servicios) | La red como plataforma de servicios y el principio "todo automático" | Todos |
| [02 · DHCP: el repartidor de IPs](/ApuntesRedes/10-servicios-red/02-dhcp) | DORA, pools, leases y opciones | Todos |
| [03 · DHCP en Cisco y helper](/ApuntesRedes/10-servicios-red/03-dhcp-cisco) | Configuración IOS, exclusiones, reservas e ip helper-address | Todos |
| [04 · DNS: la guía telefónica](/ApuntesRedes/10-servicios-red/04-dns) | Resolución jerárquica, recursiva vs iterativa, caché | Todos |
| [05 · Registros y zonas DNS](/ApuntesRedes/10-servicios-red/05-registros-dns) | A, AAAA, CNAME, MX, NS, PTR y zonas directa/inversa | Clave |
| [06 · NTP: la hora es sagrada](/ApuntesRedes/10-servicios-red/06-ntp) | Strata, drift, y por qué sin hora no hay logs ni certificados | Todos |
| [07 · NTP en Cisco](/ApuntesRedes/10-servicios-red/07-ntp-cisco) | Configuración, autenticación y verificación | Avanzado |
| [08 · Diagnóstico de servicios](/ApuntesRedes/10-servicios-red/08-diagnostico-servicios) | nslookup, dig, debug dhcp y el método de los tres fallos | Clave |
| [09 · Cierre](/ApuntesRedes/10-servicios-red/09-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u10-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u10-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u10-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u10-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA2)

**RA2: Integra ordenadores y periféricos en redes cableadas e inalámbricas.**

| CE | Criterio | Dónde se cubre |
|---|---|---|
| g) | Instalación de servidores DHCP/DNS | ✅ Puntos 2, 3, 4 y 5 + ⚡ Laboratorio (punto 9) |
| h) | Resolución de nombres | ✅ Puntos 4 y 5 + 🧠 Atrévete a pensar (punto 9) |
| i) | Servicios de infraestructura | ✅ Puntos 6 y 7 + 💬 Entrevista (punto 9) |
| d) | Direccionamiento lógico | ✅ Puntos 2 y 3 (asignación automática) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Recuerdas el punto de DHCP de la [unidad de dirección IP](/ApuntesRedes/03-direccionamiento-ip)? Aquí lo llevamos del concepto al despliegue real en Cisco.
- ¿Ya sabes lo básico? → Arranca directamente en el [punto 1](/ApuntesRedes/10-servicios-red/01-por-que-servicios).

**📍 Primer punto:** [01 · Por qué necesitas servicios](/ApuntesRedes/10-servicios-red/01-por-que-servicios)  
**⏭️ Al acabar la unidad, continúa en [Redes inalámbricas](/ApuntesRedes/11-redes-inalambricas).**
