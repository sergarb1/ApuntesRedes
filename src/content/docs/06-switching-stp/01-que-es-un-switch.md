---
title: 01 — ¿Qué es un switch?
description: El cerebro de la red local, reenviando tramas sin repetirlas 🔀
---

<p><small>El cerebro de la red local, reenviando tramas sin repetirlas 🔀</small></p>

> 🗺️ **Estás en:** 🔀 U06 → 01 · ¿Qué es un switch?

---

## 📬 La idea en una frase

> Un **switch** es un dispositivo de **capa 2** (Enlace) que reenvía tramas Ethernet **solo por el puerto adecuado**, basándose en las **direcciones MAC**. Aprende quién vive en cada puerto y, a diferencia del hub, no repite todo el tráfico a todos los dispositivos.

Es el corazoncito de toda red local moderna. Mientras un hub es como un altavoz en una asamblea (todo el mundo oye todo), el switch es como una centralita que conecta exactamente a las dos personas que quieren hablar.

---

## 🏢 ¿Dónde vive el switch?

El switch trabaja en la **capa 2 del modelo OSI**, la capa de Enlace. Su "idioma" son las **tramas Ethernet** y su herramienta de decisión es la **dirección MAC** de 48 bits (ej. `0050.7966.6800`).

| Aspecto | Detalle |
|---|---|
| Capa OSI | 2 (Enlace de datos) |
| Unidad de datos | Trama (*frame*) Ethernet |
| Decide con | Dirección MAC destino |
| Dirección MAC | 48 bits, escrita en hexadecimal (ej. `AA:BB:CC:DD:EE:FF`) |

Recuerda el reparto de poderes: si la decisión se toma con **IP**, el dispositivo es un **router** (capa 3). El switch vive un piso más abajo, en el mundo de las MACs. Cuando llegues a la [U07 de VLANs](/ApuntesRedes/07-vlans) verás que hasta los switches pueden "subir de piso" cuando trabajan en capa 3, pero eso es otro capítulo.

---

## 🔀 Switch vs hub: el salto de calidad

El hub (repetidor multipuerto) es el abuelo de las redes: recibe una señal por un puerto y la **retransmite por todos los demás**, sin preguntarse nada. El switch lo supera porque **aprende** y **segmenta**.

```
HUB:                        SWITCH:
[PC1]──┐                    [PC1]──┐
        ├─[HUB]──[PC2]             ├─[SWITCH]──[PC2]
[PC3]──┘                    [PC3]──┘

PC1 envía a PC2:            PC1 envía a PC2:
  PC3 también lo recibe       PC3 NO lo recibe
  → desperdicio de ancho      → tráfico privado y ordenado
```

| Característica | Hub | Switch |
|---|---|---|
| Capa | 1 (Física) | 2 (Enlace) |
| ¿Aprende MACs? | No | Sí |
| Reenvío | A todos los puertos | Solo al puerto del destino |
| Segmenta colisiones | No (1 dominio global) | Sí (1 dominio por puerto) |
| Uso actual | Museos, sniffing puntual | Todo |

> 💡 **Analogía del repartidor:** el hub es un mensajero que entrega cada carta a toda la manzana; el switch es uno que sabe en qué portal vive cada vecino y llama solo a la puerta correcta.

---

## 🧠 ¿Qué hace con cada trama?

Todo el trabajo del switch se reduce a una tabla mental y una pregunta: **¿conozco la MAC destino?**

| Situación | Acción del switch |
|---|---|
| MAC destino **conocida** | Reenvía solo por el puerto correspondiente |
| MAC destino **desconocida** | **Inunda**: envía por todos los puertos excepto el de origen |
| MAC destino = broadcast (`FFFF.FFFF.FFFF`) | Inunda por todos los puertos |
| MAC destino = multicast | Depende de IGMP snooping |

Ese "inundar" (*flooding*) no es una chapuza: es un mecanismo de aprendizaje. Al inundar, el destino acaba respondiendo, y su respuesta permite al switch aprender dónde vive. Lo estudiamos al detalle en el [siguiente punto](/ApuntesRedes/06-switching-stp/02-aprendizaje-mac).

---

## 🧠 Mini-chequeo

1. ¿En qué capa OSI trabaja el switch y con qué dirección decide el reenvío?
2. ¿Qué hace el switch cuando recibe una trama con una MAC destino que NO conoce?
3. ¿Por qué el hub es un problema si varios PCs hablan a la vez?

<details>
<summary>🔄 Respuestas</summary>

1. **Capa 2 (Enlace)**. Decide con la **dirección MAC** destino de la trama Ethernet.
2. La **inunda** por todos los puertos excepto el de origen, esperando que el destino responda y así aprender su puerto.
3. Porque comparte **un único dominio de colisión**: si dos tramas se cruzan, colisionan y hay que reenviarlas. (Los dominios se explican en el punto 3).
</details>

---

## ✅ Resumen en 3 frases

- El switch es un dispositivo de capa 2 que reenvía tramas por el puerto correcto usando direcciones MAC.
- A diferencia del hub (que lo repite todo), el switch aprende y segmenta la red.
- Cuando no conoce la MAC destino, **inunda**; esa inundación es el mecanismo que le permite aprender.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Switch | Dispositivo de capa 2 que conmuta tramas por MAC |
| Trama (frame) | PDU de la capa de Enlace |
| MAC | Identificador físico de 48 bits de cada interfaz |
| Inundar (flood) | Enviar por todos los puertos menos el de origen |
| Hub | Repetidor de capa 1 que lo retransmite todo |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-switching-stp) · **Anterior:** [Índice de la unidad](/ApuntesRedes/06-switching-stp) · **Siguiente:** [02 · Aprendizaje de MACs](/ApuntesRedes/06-switching-stp/02-aprendizaje-mac)