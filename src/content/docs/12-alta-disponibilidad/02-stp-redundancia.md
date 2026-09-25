---
title: "02 — STP: redundancia sin bucles"
description: El guardián que bloquea para que la red viva 🌉
---

<p><small>El guardián que bloquea para que la red viva 🌉</small></p>

> 🗺️ **Estás en:** 🔁 **Alta disponibilidad y redundancia** → 02 · STP: redundancia sin bucles

---

## 📬 La idea en una frase

> En una red con caminos duplicados, **STP bloquea deliberadamente los enlaces redundantes** para evitar bucles y los desbloquea solos cuando el camino principal muere: es, exactamente, tu primer mecanismo de alta disponibilidad en capa 2, y se diseña, no se sufre.

En la [unidad de switching](/ApuntesRedes/04-switching) aprendiste el mecanismo (root bridge, costes, estados). Aquí lo miramos con ojos de HA: cómo diseñar la topología para que el bloqueo caiga donde quieres y la conmutación sea rápida.

---

## 🏗️ Diseñar el bloqueo: root bridge con intención

Por defecto, la root bridge es el switch con la MAC más baja: es decir, **el más viejo del edificio**. Diseñar HA significa elegir root y respaldo a mano:

```
SW-Distribucion-1 (prioridad 24576)  ← root planeada
SW-Distribucion-2 (prioridad 28672)  ← respaldo
SW-Acceso-x      (36864+)            ← jamás root
```

```
SW-Dist-1(config)# spanning-tree vlan 1,10,20,99 root primary
SW-Dist-2(config)# spanning-tree vlan 1,10,20,99 root secondary
SW-Acceso(config)# spanning-tree vlan 1-4094 priority 61440
```

Por qué importa: los puertos bloqueados y los caminos activos se calculan **desde la root**. Si la root vive en el switch de acceso de la tercera planta, tu topología activa será un desastre aunque funcione. Root en el núcleo, respaldo en el segundo núcleo, accesos con prioridad alta: el mapa de bloqueos queda donde toca.

---

## 📈 La redundancia en acción: el puerto bloqueado que salva la red

```
        SW-Dist-1 ══════════ SW-Dist-2
             │   \           /  │
             │     \         /  │
        [SW-Acceso-A]════════[SW-Acceso-B]   ← enlace redundante
```

Con dos caminos entre distribución y acceso, STP bloquea uno (por ejemplo, el enlace SW-Acceso-B ↔ SW-Dist-2). Cuando el cable SW-Acceso-A ↔ SW-Dist-1 muere:

1. SW-Acceso-A deja de recibir BPDUs por ese enlace.
2. El puerto afectado pasa de bloqueado a escuchar/aprender (o directamente a forwarding con RSTP).
3. El enlace antes redundante se activa. **El usuario no llegó a levantar la mano.**

Esa es la HA de capa 2 que STP regala: cables muertos que nadie nota. El precio es la **convergencia**: en STP clásico, decenas de segundos; con RSTP, en torno a segundos. Y las protecciones del punto siguiente evitan que la reconvergencia sea un riesgo.

---

## 🛡️ Las protecciones que un diseño HA exige

| Protección | Dónde | Qué hace |
|---|---|---|
| **PortFast** | Puertos hacia PCs | Salta listening/learning: el PC navega al segundo |
| **BPDU Guard** | Puertos con PortFast | Si llega una BPDU (¿alguien coló un switch?), el puerto cae |
| **Root Guard** | Puertos hacia accesos | Impide que un switch ajeno se proclame root |
| **Loop Guard** | Puertos bloqueados por diseño | Si dejan de llegar BPDUs por un unidireccional, bloquea en vez de abrir |

```
SW-Acceso(config)# interface range fastEthernet 0/1-48
SW-Acceso(config-if-range)# spanning-tree portfast
SW-Acceso(config-if-range)# spanning-tree bpduguard enable
SW-Dist-1(config)# interface gigabitEthernet 0/1
SW-Dist-1(config-if)# spanning-tree guard root
```

> ⚠️ **El diseño HA también protege al diseño:** un PortFast sin BPDU Guard es una puerta abierta para que cualquiera enchufe un switch con mejor prioridad y **reordene toda tu topología** (o monte un bucle). En un entorno de alta disponibilidad, PortFast siempre con BPDU Guard.

---

## ⚡ Convergencia: RSTP y el detalle del Edge

| Protocolo | Convergencia típica | Nota |
|---|---|---|
| STP (802.1D) | 30-50 s | Eterno en voz/vídeo |
| RSTP (802.1w) | < 10 s | Negocia con el vecino (proposal/agreement) |
| MSTP (802.1s) | Como RSTP | Varias instancias VLAN en un solo proceso |

Con RSTP, los puertos hacia clientes configurados como **edge** (PortFast) pasan a forwarding instantáneamente, y los enlaces punto a punto entre switches se negocian en segundos. La receta de diseño: RSTP (o MSTP) + PortFast/edge + BPDU Guard + root planeada. El resto son adornos.

---

## 🧠 Mini-chequeo

1. ¿Por qué la root bridge "por defecto" suele ser mala idea?
2. ¿Qué hace BPDU Guard y por qué acompaña siempre a PortFast en un diseño serio?
3. Un enlace redundante está bloqueado por STP. ¿Qué pasa cuando el camino activo muere y cuánto tarda con RSTP?
4. ¿Qué problema previene Root Guard exactamente?

<details>
<summary>🔄 Respuestas</summary>

1. Porque la eliges por **MAC más baja**, es decir, suele ganar el equipo más viejo. La root decide la forma del árbol: si no está en el núcleo, los caminos activos y los bloqueos caen donde no conviene.
2. Corta el puerto si recibe una **BPDU**: evita que un switch "pirata" enchufado a un puerto de usuario (PortFast) participe en el STP, se proclame root o cree bucles.
3. El puerto bloqueado **se activa** automáticamente (de ahí la redundancia) y el servicio se recupera; con RSTP la conmutación ronda los segundos, con STP clásico puede tardar 30-50 s.
4. Impide que un switch en un puerto de acceso "ganador" (prioridad baja) se convierta en root y reordene la topología de toda la red.
</details>

---

## ✅ Resumen en 3 frases

- STP **es** redundancia: bloquea por diseño y desbloquea ante el fallo; el diseño consiste en decidir dónde.
- Root planeada (primary/secondary) + PortFast + **BPDU Guard** + Root Guard = capa 2 de HA adulta.
- Con **RSTP**, la conmutación tras un fallo baja a segundos: imprescindible en voz y vídeo.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Root primary/secondary | Root bridge y respaldo planeados |
| PortFast/Edge | Puerto de usuario a forwarding directo |
| BPDU Guard | Mata el puerto si recibe BPDU |
| Root Guard | Bloquea pretensiones de root ajenas |
| Convergencia | Tiempo hasta que la red se reordena tras un fallo |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-alta-disponibilidad) · **Anterior:** [01 · Disponibilidad y SPOFs](/ApuntesRedes/12-alta-disponibilidad/01-disponibilidad-y-spofs) · **Siguiente:** [03 · EtherChannel](/ApuntesRedes/12-alta-disponibilidad/03-etherchannel)
