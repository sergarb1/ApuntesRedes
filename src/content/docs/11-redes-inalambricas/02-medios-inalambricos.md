---
title: 02 — Medios y antenas
description: La señal que se estira, se enfoca y se pierde 📡
---

<p><small>La señal que se estira, se enfoca y se pierde 📡</small></p>

> 🗺️ **Estás en:** 📶 **UD11 · Redes inalámbricas** → 02 · Medios y antenas

---

## 📬 La idea en una frase

> La antena no crea señal: **reparte** la que le da el transceptor entre energía que se expande (omnidireccional) o energía que se concentra (direccional), y esa elección —junto a la altura, la potencia y los obstáculos— decide si tu enlace llega, se cae o espía el vecino.

En la [UD2](/ApuntesRedes/02-ethernet-cableado) viste el aire como "el medio flexible pero impredecible". Este punto es su manual de instrucciones: cómo orientar la energía, cuánta potencia es legal (y útil) y cómo unir dos edificios sin zanjas.

---

## 📡 Tipos de antena y para qué sirve cada una

| Antena | Patrón | Uso típico |
|---|---|---|
| **Omnidireccional** (rubber duck, techo) | 360° horizontal | Cubrir una planta desde el centro |
| **Panel / sectorial** | ~60-120° | Pasillos, fachadas, cubrir desde una esquina |
| **Yagi** | Estrecho (~30-45°) | Enlaces punto a punto de media distancia |
| **Parabólica** | Muy estrecho | Enlaces exteriores de kilómetros |

La **ganancia** (en dBi) no amplifica: reordena. Una antena de 8 dBi omnidireccional aplana su "donut" de cobertura: gana distancia en horizontal pero la pierde en vertical. En una planta, perfecto. Para cubrir dos plantas desde el techo de la inferior, fatal.

```
Omnidireccional (donut):        Direccional (foco):
      ╭───────╮                      ▲
     /         \                     │
    |     AP    |                    │ → la energía va al objetivo
     \         /                      │
      ╰───────╯
```

---

## ⚖️ Potencia, EIRP y la ley

La potencia que sale al aire (EIRP = potencia del transceptor + ganancia de la antena − pérdidas de cable) está **limitada por regulación**: en Europa, 100 mW (20 dBm) en 2,4 GHz y hasta 1 W en 5 GHz según subbanda. Subir potencia no siempre mejora la red:

- El cliente oye mejor al AP… pero el AP no oye mejor al cliente (el móvil no puede emitir tan fuerte): desequilibrio de enlace.
- Contaminas más canales vecinos y provocas **interferencia co-canal** en edificios con varios APs.

> 💡 **Menos es más en WLAN:** en oficinas con muchos APs, bajar la potencia (¡y elegir canales limpios!) da mejor red que cuatro APs gritándose entre sí.

---

## 🌉 Enlaces punto a punto: unir edificios sin fibra

Dos edificios del campus, 800 metros, sin posibilidad de zanja. Solución: dos APs direccionales alineados, en modo bridge:

1. **Línea de vista** (line of sight): los dos extremos deben verse sin obstáculos; con la distancia, cuenta también la **zona de Fresnel**, una elipse alrededor del haz que debe estar casi libre.
2. **Canales y potencias legales**, y el mismo canal en ambos extremos.
3. **Seguridad**: WPA2/WPA3-Enterprise o PSK robusta + ACLs, porque un bridge sin asegurar es un agujero con antena.
4. **Alineación**: se monta, se mide la señal (interfaz web del AP o comandos del fabricante) y se afina la orientación milímetro a milímetro.

Para enlaces exteriores, las bandas de 5 GHz dan más canales y menos interferencias; y si necesitas más de un salto, entra el terreno de las mallas (mesh) del [punto 4](/ApuntesRedes/11-redes-inalambricas/04-topologias).

---

## 🧠 Mini-chequeo

1. ¿Qué antena eliges para cubrir un pasillo largo desde un extremo y por qué?
2. ¿Por qué subir la potencia del AP puede empeorar la red?
3. Dos edificios a 2 km con línea de vista. ¿Qué montas y con qué antenas?

<details>
<summary>🔄 Respuestas</summary>

1. Una **panel/sectorial** de ~90-120°: concentra la energía a lo largo del pasillo en vez de desperdiciarla hacia atrás y hacia arriba.
2. Porque el enlace es bidireccional: el cliente (móvil) no puede responder con la misma potencia, y una potencia excesiva ensucia los canales vecinos y genera interferencia co-canal con otros APs.
3. Un **enlace bridge punto a punto** en 5 GHz con dos antenas direccionales alineadas (parabólicas o Yagi de alta ganancia), mismo canal en ambos extremos, seguridad robusta y zona de Fresnel libre.
</details>

---

## ✅ Resumen en 3 frases

- La antena **reparte** la energía: omni para cobertura, direccional para foco y enlaces.
- La ganancia en dBi redistribuye la señal; el **EIRP** tiene límites legales y subirla no siempre mejora nada.
- Los **enlaces punto a punto** (bridges) unen edificios: línea de vista, Fresnel, canal común y seguridad.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| dBi | Ganancia de antena respecto a la isotrópica |
| EIRP | Potencia efectiva radiada (legalmente limitada) |
| Zona de Fresnel | Elipse alrededor del haz que debe estar despejada |
| Bridge/PtP | Enlace inalámbrico entre dos puntos fijos |
| Omni vs direccional | Repartir 360° vs concentrar el haz |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-redes-inalambricas) · **Anterior:** [01 · El medio inalámbrico](/ApuntesRedes/11-redes-inalambricas/01-medio-inalambrico) · **Siguiente:** [03 · Estándares 802.11](/ApuntesRedes/11-redes-inalambricas/03-estandares-80211)
