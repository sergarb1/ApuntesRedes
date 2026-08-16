---
title: U12 — Cloud, virtualización y futuro
description: La nube que no es vapor ☁️
---

<p><small>La nube que no es vapor ☁️</small></p>

> 🗺️ **Ruta del paquete:** 🏠 Origen → 📦 Encapsulado → 🔌 Cable → 🏷️ IP → 🌍 IPv6 → 🔀 Switch → 🏢 VLAN → 🧭 Router → 🗣️ OSPF → 🌐 NAT → 🩺 Diagnóstico → ☁️ **CLOUD**

---

*El recorrido del paquete ha llegado a su punto más avanzado. El mundo ha cambiado: ya no se trata solo de cables y routers físicos, ahora todo es "nube". Servidores en datacenters remotos que llamamos "cloud".*

Bienvenido a la última unidad de la asignatura. Durante once unidades has seguido al paquete desde que nace en tu navegador hasta que cruza NAT y vuelve. Ahora llega el final del viaje: entenderás que todo lo que has aprendido —cables, IP, switches, routers, VLANs, routing, NAT— sigue vivo, pero **transformado en software**. Aquí la física se convierte en lógica: virtualización, contenedores, SDN, NFV y cloud networking.

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros desarrollan cada idea y enlazan con el siguiente, y el 9º es el aterrizaje práctico con el que **se cierra la asignatura**. Si llegaste hasta aquí, solo te queda un esfuerzo: atar todos los cabos.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Distinguir los modelos cloud **IaaS, PaaS y SaaS** con ejemplos reales, y elegir el adecuado para cada necesidad.
- Explicar los tipos de cloud **pública, privada e híbrida** y cuándo usar cada uno.
- Describir la **virtualización**: hypervisors Tipo 1 y 2, switches virtuales y VRF.
- Configurar **redes Docker** (bridge, host, none, overlay) y hacer que contenedores se comuniquen.
- Explicar **SDN**: plano de control centralizado, plano de datos y OpenFlow.
- Explicar **NFV** y cómo sustituye appliances físicos por software.
- Describir el **cloud networking** con AWS: VPC, subnets, Internet Gateway, NAT y Security Groups.
- Relacionar **IoT, 5G y edge computing** con las implicaciones de red que traen.
- Debatir el **futuro de Internet**: IPv6, IPv8, RINA y NDN, y valorar qué es real y qué es investigación.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · Modelos cloud](/ApuntesRedes/12-cloud-virtualizacion-futuro/01-modelos-cloud) | IaaS, PaaS, SaaS y tipos de cloud | Todos |
| [02 · Virtualización de redes](/ApuntesRedes/12-cloud-virtualizacion-futuro/02-virtualizacion-de-redes) | Hypervisors, switches virtuales y VRF | Todos |
| [03 · Docker networking](/ApuntesRedes/12-cloud-virtualizacion-futuro/03-docker-networking) | Redes de contenedores: bridge, host, none, overlay | Todos |
| [04 · SDN](/ApuntesRedes/12-cloud-virtualizacion-futuro/04-sdn) | Plano de control vs plano de datos, OpenFlow | Todos |
| [05 · NFV](/ApuntesRedes/12-cloud-virtualizacion-futuro/05-nfv) | Funciones de red virtualizadas | Todos |
| [06 · Cloud networking](/ApuntesRedes/12-cloud-virtualizacion-futuro/06-cloud-networking) | VPC, subnets, security groups, NAT (AWS) | Todos |
| [07 · IoT, 5G y edge computing](/ApuntesRedes/12-cloud-virtualizacion-futuro/07-iot-5g-y-edge) | Dispositivos masivos, latencia y datos en el borde | Todos |
| [08 · El futuro de Internet](/ApuntesRedes/12-cloud-virtualizacion-futuro/08-el-futuro-de-internet) | IPv8, RINA, NDN y los límites de IP | Todos |
| [09 · Cierre](/ApuntesRedes/12-cloud-virtualizacion-futuro/09-cierre) | Sé la Nube, Fireside, Laboratorio Docker, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión: primero "qué comprar" (modelos cloud), luego "dónde corre" (virtualización), después "cómo se conecta" (Docker, SDN, NFV, cloud), y por último "qué viene" (IoT, 5G, futuro). El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empieza siempre por el resuelto para ver el estilo y luego intenta el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u12-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u12-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u12-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u12-avanzado" class="elink">⭐ Avanzado por resolver</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (Ampliación)

| CE | Criterio | Dónde se cubre |
|---|---|---|
| **Ampliación** | Cloud, SDN y virtualización | ✅ Unidad completa (puntos 1-6 y 9) |
| **Ampliación** | IPv8 y futuro | ✅ Análisis y debate (puntos 7-8 y 9) |
| d) | Frame Relay, RDSI, ADSL | ✅ Mencionado en contexto histórico (punto 8) |
| e) | WiFi vs WiMax | ✅ En U10 |
| f) | UMTS y HSDPA | ✅ Mencionado en U10 |

---

## 🚪 ¿Por dónde empiezo?

¿Llegas con dudas de los conceptos clásicos? Antes de entrar en la nube conviene tener frescos el [routing dinámico](/ApuntesRedes/09-routing-dinamico) y la [monitorización y diagnóstico](/ApuntesRedes/11-diagnostico-monitorizacion): aquí damos por sabido cómo se encamina un paquete y cómo se diagnostica un fallo. Un repaso rápido por el [Fireside de la U10](/ApuntesRedes/10-nat-internet/09-cierre) también te ayuda a entender qué es NAT y por qué en cloud aparece "reinventado" como Internet Gateway.

¿Ya dominas la base? Entonces arranca directamente en el [punto 1 · Modelos cloud](/ApuntesRedes/12-cloud-virtualizacion-futuro/01-modelos-cloud) y avanza en orden: cada capítulo enlaza con el siguiente. Si quieres el resumen visual de todo lo que vas a ver, échale un ojo al mapa de arriba y al [cierre de la unidad](/ApuntesRedes/12-cloud-virtualizacion-futuro/09-cierre), que es el broche final del curso.

**📍 Primer punto:** [01 · Modelos cloud](/ApuntesRedes/12-cloud-virtualizacion-futuro/01-modelos-cloud)  
**🏁 ¡Fin del viaje!** Completa los 9 capítulos, resuelve los boletines y reclama el logro de **Network Master**. Esta unidad cierra la asignatura... pero el aprendizaje de redes no termina aquí.