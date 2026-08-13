---
title: 04 — Dispositivos de red
description: Quién conecta, quién decide y en qué capa vive cada uno 🔌
---

<p><small>Quién conecta, quién decide y en qué capa vive cada uno 🔌</small></p>

> 🗺️ **Estás en:** 🌐 **U01 · Fundamentos de redes** → 04 · Dispositivos de red

---

## 📬 La idea en una frase

> **Cada dispositivo de red tiene un rol distinto, y el truco está en saber en qué capa del modelo OSI trabaja.**

A más capas asciende, más inteligente (y más caro) es. Si dominas esto, medio curso ganado.

---

## 🗺 El mapa por capas

| Dispositivo | Capa OSI | Función principal |
|---|---|---|
| **Repetidor** | 1 (Física) | Regenera la señal para alargar el cable |
| **Hub** | 1 (Física) | Repite señales por todos sus puertos |
| **Bridge** | 2 (Enlace) | Une dos segmentos usando direcciones MAC |
| **Switch** | 2 (Enlace) | Conecta equipos en una LAN; aprende MAC |
| **Router** | 3 (Red) | Conecta redes distintas usando IP |
| **Módem** | 1 (Física) | Convierte la señal cobre/fibra y digital |
| **Access Point (AP)** | 1-2 | Da WiFi a la red cableada |
| **Firewall** | 3-4 | Filtra el tráfico con reglas de seguridad |

<figure class="diagram-figure">
  <img src="/ApuntesRedes/diagrams/dispositivos-osi.svg" alt="Dispositivos de red mapeados a sus capas OSI" class="diagram-img" loading="lazy" />
  <figcaption class="diagram-caption">A más capas se asciende, más inteligente es el dispositivo (y más caro).</figcaption>
</figure>

---

## 🔁 Repetidor y hub: los "eco" de la capa 1

- **Repetidor:** regenera la señal para superar la distancia máxima del cable. Una señal eléctrica se degrada con la distancia; el repetidor la "limpia" y la reenvía. Hoy se integra dentro de switches y AP, no como caja propia.
- **Hub:** cuando recibe una señal por un puerto, la replica por todos los demás. No segmenta, no aprende, no filtra. Todo lo que llega a un puerto se repite en todo.

> ⚠️ **El problema del hub:** si dos dispositivos transmiten a la vez, se produce una **colisión** y se pierden los datos. Cuanto más gente conectes, más colisiones y peor rendimiento. Los hubs están **prácticamente desusados** desde los años 2000.

---

## 🎯 Switch: el enchufe inteligente

Dispositivo de **capa 2** (Enlace). Cuando recibe una trama, **lee la dirección MAC destino** y la reenvía solo por el puerto adecuado. Si no la conoce en su tabla, **inunda** la trama por todos los puertos menos el de origen, pero **aprende** y la próxima vez lo hará bien.

Cada vez que una trama pasa por el switch, registra:

- La **MAC origen** → la asocia al puerto por donde entró.
- El **puerto** → para futuras tramas hacia ese destino.

El switch **segmenta los dominios de colisión**: cada puerto es un dominio independiente. PC-A y PC-B pueden hablar mientras PC-C y PC-D hablan sin interferirse.

**Tabla MAC del switch (ejemplo):**

| Dirección MAC | Puerto |
|---|---|
| AA:BB:CC:11:22:33 | 1 |
| AA:BB:CC:44:55:66 | 2 |
| AA:BB:CC:77:88:99 | 3 |

---

## 🧭 Router: el cerebro que encamina

Dispositivo de **capa 3** (Red) que conecta **redes diferentes**. Es el que decide por dónde enviar cada paquete:

- Lee direcciones **IP** (no MAC).
- Mantiene una **tabla de rutas** con redes destino y el siguiente salto (*next-hop*).
- Decide por qué interfaz enviar cada paquete.
- Conecta tu LAN con Internet (o con otras LANs remotas).

**Tabla de rutas (ejemplo simplificado):**

| Red destino | Máscara | Siguiente salto | Interfaz |
|---|---|---|---|
| 192.168.1.0 | 255.255.255.0 | Directa | GigabitEthernet0/0 |
| 10.0.0.0 | 255.0.0.0 | 192.168.1.254 | GigabitEthernet0/1 |
| 0.0.0.0 | 0.0.0.0 | 81.22.45.1 | WAN |

La última es la **ruta por defecto** (*default gateway*): todo el tráfico sin destino concreto va ahí.

> 💡 **Regla sencilla:** el switch conecta dispositivos dentro de la misma red; el router conecta redes diferentes entre sí.

---

## 📡 Otros que verás muy pronto

- **Módem:** convierte la señal de tu proveedor (fibra, cobre, satélite) a una señal digital. Es el "intérprete" entre el mundo del operador y tu red.
- **Access Point (AP):** convierte la señal cableada en WiFi. Conecta dispositivos inalámbricos a tu LAN. No confundas con un router: el AP no enruta, solo extiende la capa 2 al aire.
- **Firewall:** filtra el tráfico según reglas (IP origen, puerto, protocolo). Puede ser hardware (máquina dedicada) o software (firewall del propio sistema).
- **Bridge:** precursor del switch, con solo 2 puertos: une dos LAN separadas y filtra el tráfico sobrante entre segmentos.

---

## ⚡ ¿Qué dispositivo en cada momento?

| Situación | Dispositivo |
|---|---|
| 3 equipos en la misma oficina | 1 switch |
| Dos plantas que deben verse entre sí | 2 switches enlazados (árbol) |
| Una LAN que debe salir a Internet | 1 router (o router-módem del operador) |
| Mala señal de WiFi en una oficina | AP o router WiFi |
| Quiero impedir que toda la red se exponga a Internet | Firewall |
| Un cable demasiado largo | Repetidor o switch intermediario |

---

## 🔬 Ejemplo guiado: cómo aprende el switch

PC-A (MAC `AA:AA:..:11`) envía su primera trama a PC-B (MAC `BB:BB:..:22`):

1. La trama llega al **puerto 1**. El switch lee la MAC origen y anota "AA:..:11 → puerto 1".
2. No conoce la MAC destino → **inunda** la trama por los puertos 2, 3 y 4.
3. PC-B (en el puerto 2) recibe la trama y responde. Esa respuesta entra por el puerto 2, y el switch anota "BB:..:22 → puerto 2".
4. A partir de ahí, el switch reenvía las tramas entre A y B **solo por el puerto 2**, sin molestar al resto.

| Momento | Tabla MAC del switch |
|---|---|
| Antes de la primera trama | vacía |
| Entra la trama de A | AA:AA:..:11 → puerto 1 |
| Entra la respuesta de B | AA:AA:..:11 → 1 · BB:BB:..:22 → 2 |

---

## 🧠 Mini-chequeo

1. ¿En qué capa trabaja un hub? ¿Y un switch?
2. Además de IP y máscara, ¿qué necesita configurarse en un PC para salir de su red local?

<details>
<summary>🔄 Respuestas</summary>

1. El **hub** en la capa 1 (repite señales); el **switch** en la capa 2 (aprende MACs y segmenta).
2. Un **gateway** válido (la IP del router por donde debe salir) y, para usar nombres, un **DNS**.

</details>

---

## ✅ Resumen en 3 frases

1. Los dispositivos se distinguen por la **capa OSI** en la que trabajan: hub (1), switch (2), router (3).
2. El **switch** conecta equipos dentro de una LAN; el **router** conecta LAN entre sí.
3. En el mundo real, todo suele venir unificado en el **router doméstico**: tiene switch, AP, firewall y módem en una sola caja.

> 🐛 **Vocabulario rápido**
>
> | Término | Idea general |
> |---|---|
> | MAC | La "matrícula" fija en el hardware (capa 2) |
> | Switch | Conecta equipos de una LAN y aprende MACs |
> | Router | Une redes distintas mirando IPs |
> | Hub | Repite a todos los puertos (obsoleto) |
> | AP | El punto de acceso WiFi |
> | Módem | Traduce la señal de tu proveedor |

📚 [Volver al índice de la unidad](/ApuntesRedes/01-fundamentos-redes) · **Anterior:** [03 · Topologías](/ApuntesRedes/01-fundamentos-redes/03-topologias) · **Siguiente:** [05 · El modelo OSI](/ApuntesRedes/01-fundamentos-redes/05-modelo-osi)