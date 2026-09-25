---
title: 01 — Por qué necesitas servicios
description: La red como plataforma, no como fin 🏗️
---

<p><small>La red como plataforma, no como fin 🏗️</small></p>

> 🗺️ **Estás en:** 🗄️ **Servicios de red: DHCP, DNS y NTP** → 01 · Por qué necesitas servicios

---

## 📬 La idea en una frase

> Una red no se monta para tener cables y routers: se monta para **dar servicio**. Y hay tres servicios que no pueden faltar en ninguna red seria: **DHCP** (reparte direcciones), **DNS** (traduce nombres a IPs) y **NTP** (mantiene los relojes en hora). Sin ellos, la red enciende luces… y poco más.

---

## 🏗️ De la infraestructura a la plataforma

En las unidades anteriores levantaste el esqueleto: cables y tramas, direcciones y subredes, switches y VLANs, routers y rutas, filtrado y salida a Internet. Ese esqueleto resuelve el problema del **transporte**: que un paquete llegue de A a B.

Pero los usuarios no piden transporte; piden **trabajo hecho**: abrir una web, imprimir, iniciar sesión, guardar un archivo. Entre el transporte y el trabajo hay una capa de servicios que convierte "red que funciona" en "red que se usa":

| Servicio | Pregunta que resuelve | Si se cae… |
|---|---|---|
| **DHCP** | ¿Qué IP, máscara, gateway y DNS me tocan? | Los equipos se quedan sin dirección y "no hay red" |
| **DNS** | ¿Qué IP tiene www.ejemplo.es? | Nada carga por nombre, aunque la conectividad esté perfecta |
| **NTP** | ¿Qué hora es, exactamente? | Los logs no se correlacionan, los certificados fallan, Kerberos se cae |

Fíjate en la paradoja: son los servicios más **invisibles** para el usuario y los más **visibles** cuando fallan. Un usuario puede no saber qué es DHCP, pero sabe perfectamente que "Internet no va".

---

## 🎫 El principio de todo automático

Un administrador que asigna IPs a mano en una red de 200 equipos pierde la vida en hojas de cálculo y se equivoca igual. Los servicios de red nacen de un principio simple: **la configuración repetible se automatiza**.

- **DHCP** automatiza la capa 3 por equipo: IP, máscara, gateway, servidores DNS y más (opciones).
- **DNS** automatiza la memoria humana: tú recuerdas nombres, la red recuerda números.
- **NTP** automatiza el consenso horario: todos los dispositivos acuerdan la misma hora con precisión de milisegundos.

> 💡 **La regla de oro del administrador:** todo lo que un usuario necesite para trabajar debería llegarle **solo** al enchufar el cable o al unirse al WiFi. DHCP es el primer eslabón de esa experiencia.

---

## 🧩 Servicios centralizados vs servicios en el router

¿Dónde vive cada servicio? Tienes dos grandes opciones y ambas son válidas:

| Opción | Ejemplo típico | Cuándo se usa |
|---|---|---|
| **En el router/firewall** | DHCP y DNS en el router Cisco de la sucursal | Redes pequeñas, sucursales, laboratorios |
| **En servidores dedicados** | Windows Server, BIND, Samba | Redes medianas y grandes, integración con dominio |

En esta unidad aprenderás a montarlos en **Cisco IOS** (que es lo que vas a configurar en Packet Tracer y lo que pide el currículo), pero los conceptos —lease, zona, stratum— son idénticos en cualquier plataforma: un servidor Windows DHCP usa los mismos mensajes DORA que un router Cisco.

---

## 🕸️ La dependencia entre servicios

Lo que hace difícil diagnosticar estos servicios es que **se necesitan entre sí**, en cadena:

```
DHCP ── entrega la IP del servidor DNS ──► DNS
DNS ── necesita la hora para firmar/caducar ──► NTP
NTP ── a veces se descubre por nombre ──► DNS
```

Si un portátil "no navega", puede ser DNS caído… o DHCP que no entregó el DNS correcto… o NTP desajustado que invalida las credenciales del dominio. El diagnóstico de servicios es un ejercicio de orden: primero verifica el abajo, después el de encima. Lo practicarás en el [punto 8](/ApuntesRedes/10-servicios-red/08-diagnostico-servicios).

---

## 🧠 Mini-chequeo

1. ¿Qué tres servicios forman el trío básico de cualquier red y qué problema resuelve cada uno?
2. Un cliente navega por IP (`142.250.200.99`) pero no por nombre (`www.google.com`). ¿Qué servicio sospechas primero?
3. ¿Por qué decimos que los servicios de red son "invisibles cuando funcionan"?

<details>
<summary>🔄 Respuestas</summary>

1. **DHCP** (asignación automática de configuración IP), **DNS** (resolución de nombres a IPs) y **NTP** (sincronización horaria).
2. **DNS.** Por IP funciona → conectividad y routing correctos; por nombre no → la resolución de nombres es el eslabón roto (o el DNS que entregó DHCP es erróneo).
3. Porque el usuario los consume sin darse cuenta (la web "abre", la IP "sale sola") y solo los nota cuando fallan, y entonces parece que "se ha caído Internet" aunque la red esté perfecta.
</details>

---

## ✅ Resumen en 3 frases

- Una red sin servicios es transporte sin trabajo: **DHCP, DNS y NTP** son el mínimo imprescindible.
- El principio rector es la **automatización**: el usuario enchufa y trabaja.
- Los servicios **se dependen en cadena**, por eso su diagnóstico se hace en orden de abajo hacia arriba.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Servicio de red | Proceso que ofrece una función a los clientes (IP, nombres, hora…) |
| Lease | Concesión temporal de una IP por DHCP |
| Resolución | Traducción de un nombre de dominio a una IP (o al revés) |
| Stratum | Nivel de profundidad respecto a la fuente horaria en NTP |
| Automatización | Que la configuración llegue sola, sin intervención manual |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-servicios-red) · **Anterior:** [Índice de la unidad](/ApuntesRedes/10-servicios-red) · **Siguiente:** [02 · DHCP: el repartidor de IPs](/ApuntesRedes/10-servicios-red/02-dhcp)
