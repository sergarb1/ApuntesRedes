---
title: 04 — Topologías y modos de trabajo
description: BSS, ESS, ad-hoc, repetidores y mallas 🕸️
---

<p><small>BSS, ESS, ad-hoc, repetidores y mallas 🕸️</small></p>

> 🗺️ **Estás en:** 📶 **Redes inalámbricas** → 04 · Topologías y modos de trabajo

---

## 📬 La idea en una frase

> Una red WLAN no es "un router con WiFi": es una topología elegida —una celda (BSS), un edificio con varios APs con el mismo SSID (ESS), un puente, una malla— y cada topología responde a una necesidad distinta de cobertura, movilidad o cableado.

---

## 🏗️ Las piezas del léxico 802.11

Estos términos son el idioma de las redes inalámbricas; caen en examen y en entrevistas:

| Término | Significado | Ejemplo |
|---|---|---|
| **BSS** (Basic Service Set) | Un AP + sus clientes asociados | El WiFi de tu casa |
| **BSSID** | La MAC del AP (identifica la BSS) | La MAC de la radio del AP |
| **SSID** | El nombre lógico de la red | "Empresa-WiFi" |
| **ESS** (Extended SS) | Varios APs con el mismo SSID, unidos por cable | El WiFi de todo el edificio |
| **IBSS / ad-hoc** | Clientes hablándose directamente, sin AP | Dos portátiles compartiendo archivos |
| **DS** (Distribution System) | La red cableada que une los APs del ESS | El switch y los trunks ya vistos |

La diferencia SSID/BSSID aclara el gran misterio del "roaming invisible": en un ESS, tu portátil ve **un solo SSID** aunque haya 8 APs; cada AP se distingue por su BSSID (MAC), y el cliente cambia de AP sin que cambie de red. A eso se le llama **roaming**.

```
ESS "Empresa" (un solo SSID, 3 BSS):
                    ┌── switch/cable (DS) ──┐
                    │        │              │
                 [AP-1]   [AP-2]        [AP-3]
                BSS-1     BSS-2         BSS-3
              clientes   clientes      clientes
```

---

## 🎛️ Modos de trabajo de un AP

Un AP profesional no solo "hace WiFi para clientes". Sus modos habituales:

| Modo | Qué hace | Cuándo se usa |
|---|---|---|
| **Root AP / acceso** | Sirve clientes normales | El 90 % de los APs del mundo |
| **Repeater / extensor** | Repite la señal de otro AP por radio | Zonas sin cable donde llegar |
| **Workgroup Bridge** | Conecta dispositivos *sin WiFi* a la red inalámbrica | Una impresora antigua con un solo puerto Ethernet |
| **Bridge (PtP/PtMP)** | Enlace punto a punto o punto-multipunto | Unir edificios (visto en el punto 2) |
| **Mesh** | Cada AP enlaza por radio con sus vecinos y reenvía | Naves, campuses, tramos sin cable |

> ⚠️ **El precio del repetidor:** cada salto inalámbrico **reduce a la mitad el rendimiento** del tramo repetido (la misma radio emite y recibe). Un extensor "barato" colocado a mitad de camino puede darte cobertura pero a la mitad de velocidad… y a veces mucho menos. La primera solución a un agujero de cobertura es casi siempre **mejor cable + un AP más**, no un repetidor.

---

## 🌐 Roaming: la promesa del ESS

El sueño del ESS: caminar con el portátil del despacho a la sala de reuniones sin caída. La realidad: el roaming lo decide **el cliente**, no el AP. Cuando la señal del AP actual baja de un umbral, el cliente busca otro AP con el mismo SSID y se reasocia.

Para que funcione bien:

- **Solapamiento adecuado de cobertura** (~15-20 % entre celdas contiguas).
- **Mismo SSID y mismas credenciales** en todos los APs del ESS.
- **Canales distintos** entre APs vecinos (1-6-11 en 2,4 GHz) para que el cambio no sea de canal ruidoso a canal ruidoso.
- En redes profesionales, ayudantes como 802.11k/r/v (roaming asistido, rápido, de voz).

Si tu ESS está mal diseñado, el "roaming" se convierte en "desconexión de 5 segundos cada vez que cambio de planta".

---

## 🧠 Mini-chequeo

1. ¿Diferencia entre SSID y BSSID?
2. Una impresora solo tiene puerto Ethernet y el cable no llega. ¿Qué modo de AP resuelve el problema?
3. ¿Por qué un repetidor reduce el rendimiento a la mitad?
4. ¿Qué tres condiciones mínimas exige un ESS para que el roaming funcione decentemente?

<details>
<summary>🔄 Respuestas</summary>

1. **SSID** es el nombre lógico de la red (cadena que configuramos); **BSSID** es la MAC de la radio de un AP concreto (identifica cada BSS dentro del ESS).
2. Un **Workgroup Bridge**: el AP actúa como cliente inalámbrico de otra red y da conectividad Ethernet a la impresora.
3. Porque la misma radio que recibe del AP origen reenvía al cliente: no puede recibir y emitir a la vez en el mismo canal, así que cada tramo repetido paga el doble de tiempo de aire.
4. Solapamiento de cobertura (~15-20 %), mismo SSID/credenciales en todos los APs y canales distintos entre vecinos (1-6-11).
</details>

---

## ✅ Resumen en 3 frases

- BSS = una celda; **ESS** = varias celdas con el mismo SSID sobre un DS cableado; ad-hoc = sin AP.
- Los modos de AP (root, repetidor, WGB, bridge, mesh) cubren desde la oficina hasta el campus.
- El roaming lo negocia el cliente; el diseño (solapamiento, SSID común, canales alternos) lo hace posible.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| BSS / BSSID | Celda de un AP / MAC de esa celda |
| ESS | Conjunto de BSSs con el mismo SSID |
| DS | El sistema de distribución cableado que une los APs |
| Workgroup Bridge | AP como cliente para dar WiFi a un equipo sin red |
| Roaming | Cambio de AP sin cambiar de red lógica |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-redes-inalambricas) · **Anterior:** [03 · Estándares 802.11](/ApuntesRedes/11-redes-inalambricas/03-estandares-80211) · **Siguiente:** [05 · Cobertura y diseño](/ApuntesRedes/11-redes-inalambricas/05-cobertura-y-diseno)
