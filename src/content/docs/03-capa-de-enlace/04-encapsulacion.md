---
title: "4 — Encapsulación: de la trama al paquete"
description: Las muñecas rusas de la red, capa a capa 🪆
---

<p><small>Las muñecas rusas de la red, capa a capa 🪆</small></p>

> 🗺️ **Estás en:** 🔗 **Capa de enlace y trama Ethernet** → 4 · Encapsulación: de la trama al paquete

---

## 📬 La idea en una frase

> **Encapsular** es que cada capa **envuelva los datos de la de arriba con su propia cabecera**: la capa 4 añade los puertos, la 3 la dirección IP y la 2 las MACs — y al llegar, cada capa **se quita su sobre** y pasa el contenido de dentro.

---

## 🧅 Las muñecas rusas (PDU y cabeceras)

Ya sabes de la [unidad anterior](/ApuntesRedes/03-capa-de-enlace/01-modelo-osi) que cada capa tiene su PDU. Ahora mira **cómo se consigue**: los datos no viajan solos, viajan *envueltos*.

```
[        datos de tu aplicación (HTTP…)        ]
                │  + cabecera TCP (puertos)
                ▼
[  segmento TCP: cabecera + datos  ]
                │  + cabecera IP (IPs origen/destino)
                ▼
[  paquete IP: cabecera + segmento  ]
                │  + cabecera Ethernet (MACs) + FCS
                ▼
[  trama Ethernet: MACs + IP + TCP + datos + FCS  ]
                │  capa 1: a la línea
                ▼
   101100…  (bits por cobre / fibra / aire)
```

| Capa | PDU | Cabecera que añade | Ejemplo de campo clave |
|---|---|---|---|
| 4 · Transporte | Segmento / datagrama | TCP o UDP | Puertos 80, 443, 22 |
| 3 · Red | **Paquete** | IP | IP origen y destino |
| 2 · Enlace | **Trama** | Ethernet | MAC origen y destino + FCS |
| 1 · Física | Bits | — (solo señal) | Pulsos, luz, ondas |

**Regla de oro:** la cabecera de cada capa solo la entienden las **máquinas de su capa**. El switch mira las MACs y ni sabe que hay un puerto 80 dentro; el router mira la IP y le da igual quién la envió por cable o por WiFi.

---

## 🚚 Un viaje de verdad: PC → router → servidor web

Tu PC pide una página. Mira quién escribe qué cabecera y **qué cambia en cada salto**:

| Tramo | MAC origen → destino (trama) | IP origen → destino (paquete) | ¿Qué cambia? |
|---|---|---|---|
| PC → router (tu LAN) | PC → **router** (puerta de enlace) | PC → servidor web | La trama la encabeza tu PC y la recoge el router |
| Router → servidor | **router** → siguiente salto | PC → servidor web | **Nuevas MACs**, misma IP de destino |
| Respuesta | servidor → router → PC | servidor → PC | Al revés, y tu PC sigue recibiendo con su MAC |

Dos lecturas clave del viaje:

1. **Las MACs viven del salto en salto** (de un lado del cable al otro). En cuanto hay router, la trama muere y nace otra con otras MACs.
2. **La IP de destino viaja intacta** de principio a fin: es la que permite que el paquete encuentre su camino por Internet.

> 💡 **Dónde se ve esto en clase:** con Wireshark, en tu PC verás tramas **tuya ↔ tu router** (por eso "tú" no ves la MAC del servidor web, aunque su IP esté en el paquete). El siguiente salto lo vive otro enlace.

---

## 📥 Desencapsular: el proceso al revés

Al recibir, cada capa hace lo contrario: **quita su cabecera, valida y sube el contenido**:

1. **Capa 2:** ¿la MAC destino es la mía (o broadcast)? ¿FCS correcto? → si todo cuadra, quita cabecera Ethernet y entrega el paquete IP.
2. **Capa 3:** ¿la IP destino soy yo? → quita cabecera IP y entrega el segmento al protocolo TCP/UDP.
3. **Capa 4:** el puerto destino decide a qué programa va (80 → navegador).
4. **Aplicación:** los datos, ya sin ningún sobre.

Si algo falla en el camino (FCS malo, IP de destino equivocada), la capa correspondiente **descarta** y ya está: nadie "arregla" una trama por la mitad; se tira y alguien reenvía si hace falta.

---

## 🔮 Solo el nombre: ARP otra vez

Para que la PC escriba la trama al router, necesita la **MAC del router** — no la conoce de fábrica. Ahí entra **ARP**: *«¿quién tiene la IP 192.168.1.1?»* → el router responde con su MAC. El ida y vuelta completo está en la [unidad de dirección IP](/ApuntesRedes/04-direccionamiento-ip/01-estructura-ipv4); aquí ya tienes el porqué: **encapsular en capa 2 exige conocer la MAC del próximo salto**.

---

## 🧠 Mini-chequeo

1. ¿Qué cabecera añade cada una de estas capas: 4, 3 y 2? ¿Y qué PDU resulta?
2. En la tabla del viaje: ¿por qué la IP destino no cambia y las MAC sí?
3. Si el FCS de una trama no cuadra, ¿qué hace la capa 2? ¿Y quién reenvía después?
4. ¿Qué le pasa al contenido de la cabecera TCP cuando el paquete llega al servidor?

<details>
<summary>🔄 Respuestas</summary>

1. **Capa 4:** cabecera TCP/UDP (puertos) → **segmento**; **capa 3:** cabecera IP → **paquete**; **capa 2:** cabecera + FCS Ethernet → **trama**.
2. Las **MACs identifican los extremos de cada enlace** (salto a salto); la **IP identifica el destino final** y debe aguantar todo el recorrido para que los routers puedan enrutar.
3. **Descarta la trama** (no la entrega). El reenvío lo decide el emisor: si es importante (TCP), retransmite el segmento y este genera una trama nueva.
4. **Se quita:** el servidor recibe los datos ya desencapsulados (el contenido HTTP), no "ve" la cabecera TCP al final del viaje.
</details>

---

## ✅ Resumen en 3 frases

- **Encapsular** es envolver: cada capa añade su cabecera (y la 2 su FCS) sobre los datos de la capa superior, produciendo su PDU (segmento → paquete → trama → bits).
- En cada salto con router, **las MACs de la trama se rehacen** (enlace nuevo, enlace nuevo) mientras la **IP de destino se conserva** entera.
- Al llegar, el proceso es inverso: cada capa **valida, se quita su cabecera** y entrega el contenido de dentro.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Encapsulación | Añadir cabecera propia sobre los datos de arriba |
| Desencapsulación | Quitar cabeceras al recibir, capa a capa |
| Segmento | PDU de la capa 4 (TCP/UDP) |
| Paquete | PDU de la capa 3 (IP) |
| Salto | Tramo de un enlace (router a router); cada salto, sus MACs |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-capa-de-enlace) · **Anterior:** [3 · La trama Ethernet](/ApuntesRedes/03-capa-de-enlace/03-trama-ethernet) · **Siguiente:** [5 · Cierre: consolida lo aprendido](/ApuntesRedes/03-capa-de-enlace/05-cierre)
