---
title: U11 — Redes inalámbricas
description: Libertad sin cables, con vecinos incluidos 📶
---

<p><small>Libertad sin cables, con vecinos incluidos 📶</small></p>

> 🗺️ **El mapa del curso:** 🌐 NAT → 🗄️ Servicios → **📶 AQUÍ ESTÁS (U11)** → 🔁 Alta disponibilidad

---

*En el aire de una oficina caben una videollamada, veinte móviles, las impresoras, las cámaras y el router del piso de al lado. Todos gritando al mismo tiempo en las mismas frecuencias. Que el WiFi funcione no es magia: es ingeniería de radio, y esta unidad te enseña a hacerla.*

Bienvenido a la unidad donde sueltas los cables. En la [UD2](/ApuntesRedes/02-ethernet-cableado) viste el medio inalámbrico como "el aire: flexible pero impredecible". Ahora lo domas: los estándares 802.11 y sus bandas, cómo se diseña una cobertura sin agujeros ni interferencias, cómo se configura un AP de verdad (SSID, VLANs, seguridad WPA2/WPA3) y cómo se integra todo en tu red cableada sin abrir agujeros de seguridad.

Esta unidad se lee como un **libro de 9 capítulos**: los 8 primeros son teoría en progresión y el 9º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar cómo se organizan las bandas de 2,4 y 5 GHz en canales y por qué solo hay 3 canales limpios en 2,4 GHz.
- Diferenciar los estándares 802.11 (n/ac/ax) y elegir el adecuado para cada escenario.
- Diseñar la cobertura de un edificio: colocación de APs, solapamiento, canales alternos y gestión de interferencias.
- Configurar SSIDs, modos de un AP (autónomo, controlador, mesh) y el modo de trabajo (repetidor, bridge, workgroup bridge).
- Integrar el WiFi en la red cableada mediante VLANs por SSID y trunks (todo lo de la UD5 servirá).
- Aplicar seguridad WPA2-PSK/WPA3-SAE/WPA2-Enterprise, y explicar por qué WEP/WPA están muertos.
- Diagnosticar redes WLAN: niveles de señal, ruido, solapamiento de canales y los comandos `show` de IOS.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · El medio inalámbrico](/ApuntesRedes/11-redes-inalambricas/01-medio-inalambrico) | Radiofrecuencia, bandas, canales y los males del aire | Todos |
| [02 · Medios y antenas](/ApuntesRedes/11-redes-inalambricas/02-medios-inalambricos) | Tipos de antena, ganancia, dBi y enlaces punto a punto | Todos |
| [03 · Estándares 802.11](/ApuntesRedes/11-redes-inalambricas/03-estandares-80211) | De 802.11b a WiFi 7: velocidades, bandas y características | Todos |
| [04 · Topologías y modos de trabajo](/ApuntesRedes/11-redes-inalambricas/04-topologias) | BSS, ESS, ad-hoc, repetidor, bridge, mesh | Todos |
| [05 · Cobertura y diseño](/ApuntesRedes/11-redes-inalambricas/05-cobertura-y-diseno) | Plan de canales, solapamiento, site survey | Clave |
| [06 · Seguridad WLAN](/ApuntesRedes/11-redes-inalambricas/06-seguridad-wlan) | WEP→WPA3, PSK vs Enterprise, invitados aislados | Clave |
| [07 · APs y controladores](/ApuntesRedes/11-redes-inalambricas/07-aps-y-wlc) | Autónomo vs lightweight, WLC, CAPWAP | Avanzado |
| [08 · Configuración y verificación](/ApuntesRedes/11-redes-inalambricas/08-configuracion-wlan) | WLAN en router Cisco home-office y AP en Packet Tracer | Todos |
| [09 · Cierre](/ApuntesRedes/11-redes-inalambricas/09-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 8 primeros puntos son teoría en progresión. El 9º es el aterrizaje práctico: léelo justo después del 8º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u11-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u11-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u11-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u11-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA1/RA2)

| CE | Criterio | Dónde se cubre |
|---|---|---|
| RA2·e) | Estándares para redes inalámbricas | ✅ Puntos 1, 3 y 5 |
| RA2·f) | Integración de equipos inalámbricos | ✅ Puntos 4, 7 y 8 + ⚡ Laboratorio (punto 9) |
| RA1·b) | Medios de transmisión (no guiados) | ✅ Puntos 1 y 2 |
| RA2·g) | Seguridad en redes inalámbricas | ✅ Punto 6 + 🧠 Atrévete a pensar (punto 9) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Vienes de la [UD2](/ApuntesRedes/02-ethernet-cableado)? El punto "WiFi" que viste allí era el aperitivo; aquí está el menú completo.
- ¿Ya conoces los estándares? → Salta a la [cobertura y diseño](/ApuntesRedes/11-redes-inalambricas/05-cobertura-y-diseno), que es donde se juega el examen de la vida real.

**📍 Primer punto:** [01 · El medio inalámbrico](/ApuntesRedes/11-redes-inalambricas/01-medio-inalambrico)  
**⏭️ Al acabar la unidad, continúa en [UD12 · Alta disponibilidad y redundancia](/ApuntesRedes/12-alta-disponibilidad).**
