---
title: 01 — De las rutas a las ACLs
description: Antes de filtrar, saber por dónde viaja 🗺️
---

<p><small>Antes de filtrar, saber por dónde viaja 🗺️</small></p>

> 🗺️ **Estás en:** 🛡️ **UD8 · ACLs y seguridad de red** → 01 · De las rutas a las ACLs

---

## 📬 La idea en una frase

> Las ACLs filtran el tráfico que los routers **encaminan**: para dominarlas necesitas pensar como un router —de dónde viene el paquete, a dónde va, por qué interfaz sale— y esa es exactamente la base que construyes en este punto antes de escribir una sola lista.

---

## 🧭 El mapa mental del router

En la [UD6](/ApuntesRedes/06-enrutamiento-estatico) configuraste rutas y viste cómo el router consulta su tabla. El flujo completo de un paquete que entra en un router:

```
1. Llega el paquete por una interfaz
2. ¿Capa 2 correcta? (MAC, FCS)  → si no, descarta
3. ¿Hay ACL de entrada en esa interfaz? → si niega, descarta
4. Busca la ruta en la tabla (longest prefix match)
   → si no hay ruta, descarta (ICMP unreachable)
5. ¿Hay ACL de salida en la interfaz de destino? → si niega, descarta
6. Reencapsula (nueva MAC de destino) y envía
```

Las ACLs se cuelgan de los pasos 3 y 5: son los **dos puntos de control** donde el router pregunta "¿te dejo pasar?". Todo el resto de la unidad gira alrededor de entender ese flujo: qué es "entrada" y qué es "salida" depende siempre del punto de vista del **router**, no del usuario.

---

## 🚦 Entrada vs salida: el punto de vista del router

Este es el gran malentendido de las ACLs. Las direcciones no son "hacia dentro de la empresa" o "hacia Internet": son **respecto de cada interfaz del router**:

| Dirección | Significado real |
|---|---|
| **In** (entrada) | El paquete **entra al router** por esa interfaz (llega de la red conectada ahí) |
| **Out** (salida) | El paquete **sale del router** por esa interfaz (va hacia la red conectada ahí) |

Ejemplo: el router tiene `G0/0` hacia tu LAN y `G0/1` hacia Internet.

- "Bloquear que la LAN salga a Internet" = ACL **out** en `G0/1` (o **in** en `G0/0`: mismo efecto, distinto lugar).
- "Proteger la LAN del exterior" = ACL **in** en `G0/1` (o **out** en `G0/0`).

> 💡 **Dónde colocar es la mitad del examen:** una ACL que filtra tráfico de origen A hacia destino B puede ir en muchas interfaces y en dos direcciones. La buena práctica (que verás en el punto 3): **extendidas cerca del origen; estándar cerca del destino.**

---

## 🛡️ Las tres capas de seguridad de una red Cisco

Las ACLs son una pieza del puzzle de seguridad perimetral e interna; ten el mapa completo:

| Capa | Herramienta | Qué controla |
|---|---|---|
| **Acceso físico/management** | Contraseñas, SSH, listas de acceso a la VTY | Quién administra los equipos |
| **Tráfico entre segmentos** | ACLs en routers/switches L3 | Qué red habla con qué red (y qué puertos) |
| **Dispositivo final** | Port Security (UD5), firewall, NAC | Qué equipo se enchufa y qué servicios usa |

Esta unidad se centra en la capa media (ACLs + hardening básico del router), con una incursión en la tercera (Port Security, ya conocida). La gestión segura del equipo la viste en la [UD6](/ApuntesRedes/06-enrutamiento-estatico/02-configuracion-basica): SSH, contraseñas y banner incluidos.

---

## 🧠 Mini-chequeo

1. Reproduce de memoria el flujo de un paquete en un router, señalando los dos puntos donde actúan las ACLs.
2. Router con `G0/0` a la LAN y `G0/1` al ISP: ¿en qué interfaz y dirección pondrías una ACL para bloquear el telnet que viene de Internet hacia un servidor de tu LAN?
3. ¿Por qué "in" y "out" no significan "de dentro" y "de fuera" de la empresa?

<details>
<summary>🔄 Respuestas</summary>

1. Llega → capa 2 → **ACL in** → tabla de rutas → **ACL out** → reencapsula → sale. Los dos puntos de control son la ACL de entrada en la interfaz de llegada y la de salida en la interfaz de destino.
2. Lo limpio: **in** en `G0/1` (la interfaz donde llega el tráfico del ISP). También funcionaría out en G0/0, pero la práctica es filtrar cuanto antes, cerca del origen, para no gastar recursos en tráfico que luego se descarta.
3. Porque la referencia es **cada interfaz del router**, no la empresa: "in" = entra al router por esa interfaz; "out" = sale del router hacia esa interfaz. En un router de 5 interfaces, "dentro" y "fuera" cambian según cuál mires.
</details>

---

## ✅ Resumen en 3 frases

- El router decide con su tabla, pero las **ACLs son sus dos aduanas**: entrada y salida por interfaz.
- **In/out se definen respecto de cada interfaz** del router; confundirlo es el error nº 1 de esta unidad.
- Las ACLs controlan el tráfico entre segmentos dentro de las tres capas de seguridad de la red.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| ACL in/out | Filtro en la entrada/salida de una interfaz del router |
| Longest prefix match | La ruta más específica gana (UD6) |
| VTY | Las líneas de acceso de administración del equipo |
| Hardening | Endurecer la configuración de un equipo |
| Perímetro | La frontera entre tu red y el resto del mundo |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/08-acl-seguridad) · **Anterior:** [Índice de la unidad](/ApuntesRedes/08-acl-seguridad) · **Siguiente:** [02 · ACLs: concepto y tipos](/ApuntesRedes/08-acl-seguridad/02-acls-conceptos)
