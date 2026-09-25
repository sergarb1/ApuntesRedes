---
title: Switching y VLAN
description: El switch que aprende y la red que se divide 🔀
---

<p><small>El switch que aprende y la red que se divide 🔀</small></p>

> 🗺️ **El mapa del curso:** 🧮 IP → **🔀 AQUÍ ESTÁS** → 🌉 Trunking → 🧭 Routing

---

*Conectas cuatro equipos a un switch, cada uno por su cable, y ninguno pisa a nadie. Un año después, ese mismo switch tiene 48 equipos, tres departamentos que no deberían verse entre sí y una tormenta de broadcasts a punto de subir por los cables. Bienvenido al mundo de la conmutación, donde el orden se construye en capa 2.*

Bienvenido a la unidad del switch. En la [unidad de dirección IP](/ApuntesRedes/03-direccionamiento-ip) diste a los equipos direcciones; aquí el switch aprende a entregarlas trama a trama: cómo aprende MACs, qué son los dominios de colisión y broadcast, por qué STP salva la red de sí misma y cómo las VLANs parten un switch físico en varios lógicos. La primera mitad del curso se cierra aquí; la [unidad de trunking e inter-VLAN](/ApuntesRedes/05-trunking-inter-vlan) llevará esas VLANs entre switches y las hará hablar.

Esta unidad se lee como un **libro de 10 capítulos**: los 9 primeros son teoría en progresión y el 10º es el aterrizaje práctico con laboratorio.

---

## 🎯 Objetivo de la unidad

Al terminar, serás capaz de:

- Explicar cómo un switch aprende MACs y reenvía tramas (tabla CAM, flooding, aging).
- Diferenciar dominios de colisión y dominios de broadcast, y calcular cuántos hay en una topología.
- Explicar la tormenta de broadcast y el papel de STP en redes con redundancia.
- Diseñar el root bridge y proteger el árbol con PortFast, BPDU Guard y Root Guard.
- Diferenciar RSTP de STP y justificar PortFast en puertos de usuario.
- Crear VLANs, asignarlas a puertos y explicar qué es un dominio de broadcast por VLAN.
- Clasificar los tipos de VLAN (datos, nativa, voz, gestión) y sus buenas prácticas.
- Configurar y verificar switches con las `show` esenciales.

---

## 🗺️ Mapa de la unidad

| Punto | Qué aprenderás | Nivel |
|---|---|---|
| [01 · ¿Qué es un switch?](/ApuntesRedes/04-switching/01-que-es-un-switch) | Conmutación, modo store-and-forward vs cut-through | Todos |
| [02 · Aprendizaje de MACs](/ApuntesRedes/04-switching/02-aprendizaje-mac) | Tabla CAM, flooding, aging y tráfico desconocido | Todos |
| [03 · Dominios de colisión y broadcast](/ApuntesRedes/04-switching/03-dominios-colision-broadcast) | Contar dominios por topología | Todos |
| [04 · La tormenta de broadcast](/ApuntesRedes/04-switching/04-tormenta-de-broadcast) | Bucles, tormentas y por qué la red se ahoga | Todos |
| [05 · STP: fundamentos](/ApuntesRedes/04-switching/05-stp-fundamentos) | Root bridge, costes, puertos elegidos | Clave |
| [06 · Puertos y estados STP](/ApuntesRedes/04-switching/06-puertos-y-estados-stp) | Blocking, listening, learning, forwarding | Todos |
| [07 · RSTP y PortFast](/ApuntesRedes/04-switching/07-rstp-y-portfast) | Convergencia rápida, edge y BPDUGuard | Todos |
| [08 · ¿Qué es una VLAN?](/ApuntesRedes/04-switching/08-que-es-una-vlan) | Segmentación lógica y dominios de broadcast | Todos |
| [09 · Tipos de VLAN](/ApuntesRedes/04-switching/09-tipos-de-vlan) | Datos, nativa, voz y gestión | Todos |
| [10 · Cierre](/ApuntesRedes/04-switching/10-cierre) | Sé el Paquete, Fireside, Laboratorio, Crucigrama… | Todos |

> 📖 **Flujo de lectura:** los 9 primeros puntos son teoría en progresión. El 10º es el aterrizaje práctico: léelo justo después del 9º y antes de abrir los boletines.

---

## 📝 Boletines de la unidad

> Practica con los pares del curso: empezar siempre el resuelto para ver el estilo y luego intentar el por-resolver.

<div class="ejercicio-links">
  <a href="/ApuntesRedes/boletines/boletin-u04-inicial" class="elink">🟢 Inicial por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-inicial-resuelto" class="elink">✅ Inicial resuelto</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-avanzado" class="elink">⭐ Avanzado por resolver</a>
  <a href="/ApuntesRedes/boletines/boletin-u04-avanzado-resuelto" class="elink">💪 Avanzado resuelto</a>
</div>

---

## ✅ Criterios de evaluación cubiertos (RA3/RA5)

| CE | Criterio | Dónde se cubre |
|---|---|---|
| RA3 | Administración de conmutadores | ✅ Puntos 1-2, 5-7 + ⚡ Laboratorio (punto 10) |
| RA5 | Segmentación y reducción de dominios | ✅ Puntos 3-4 y 8-9 + 🧠 Atrévete a pensar (punto 10) |
| RA3·c) | Redundancia sin bucles (STP) | ✅ Puntos 4-7 + 💬 Entrevista (punto 10) |

---

## 🚪 ¿Por dónde empiezo?

- ¿Vienes de la unidad anterior? Perfecto: aquí los bits ya tienen direcciones y ahora aprenden a viajar ordenados.
- ¿Solo te interesan las VLANs? Salta al [punto 8](/ApuntesRedes/04-switching/08-que-es-una-vlan), pero repasa el [punto 3](/ApuntesRedes/04-switching/03-dominios-colision-broadcast) para entender qué estás separando.

**📍 Primer punto:** [01 · ¿Qué es un switch?](/ApuntesRedes/04-switching/01-que-es-un-switch)  
**⏭️ Al acabar la unidad, continúa en [Trunking y enrutamiento inter-VLAN](/ApuntesRedes/05-trunking-inter-vlan).**
