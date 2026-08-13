---
title: 06 — Puertos y estados STP
description: Roles de puerto y los 4 estados hasta reenviar 🚦
---

<p><small>Roles de puerto y los 4 estados hasta reenviar 🚦</small></p>

> 🗺️ **Estás en:** 🔀 U06 → 06 · Puertos y estados STP

---

## 📬 La idea en una frase

> Cada puerto de un switch recibe de STP un **rol** (Root, Designated, Alternate o Backup) que define para qué sirve, y además pasa por **estados** (Blocking, Listening, Learning, Forwarding) que determinan si reenvía o no tráfico mientras la red converge.

En el punto 5 vimos quién es el rey (el Root Bridge). Ahora toca ver qué papel juega cada puerto en el reino y cuánto tarda en "ponerse en marcha".

---

## 🎭 Los roles de puerto

| Rol | Descripción |
|---|---|
| **Root Port (RP)** | El **mejor puerto hacia el Root Bridge**. Cada switch no-root tiene exactamente **1**. |
| **Designated Port (DP)** | El **mejor puerto en cada segmento**. Hay **1 por segmento** (el que ofrece el camino más barato al Root). |
| **Alternate Port (AP)** | Puerto **bloqueado** que proporciona un camino alternativo al Root (respaldo). |
| **Backup Port (BP)** | Puerto bloqueado **redundante dentro del mismo segmento** (raro en redes típicas). |

```
         [Root Bridge]
            │  DP        ← todos los puertos del root son DP
       ┌────┴────┐
       │         │
     [S2]      [S3]
   RP │         │ RP      ← cada switch no-root: 1 RP
   AP │(bloq.)  │
       └────────┘
        segmento con su DP
```

> 💡 **Truco de examen:** el Root Bridge tiene **todos** sus puertos en rol Designated. Los switches no-root tienen **un Root Port** (su mejor salida hacia la raíz) y, si hay redundancia, **Alternate Ports** bloqueados.

---

## 🚦 Los estados de puerto

Un puerto que arranca no reenvía tráfico de golpe: necesita tiempo para **asegurarse de que no crea un bucle**. Por eso pasa por estos estados:

| Estado | ¿Reenvía tráfico? | ¿Aprende MACs? | Tiempo |
|---|---|---|---|
| **Blocking** | No | No | 20 s (Max Age) |
| **Listening** | No | No | 15 s |
| **Learning** | No | Sí | 15 s |
| **Forwarding** | Sí | Sí | Indefinido |
| **Disabled** | No | No | Administrativo |

```
Blocking ──▶ Listening ──▶ Learning ──▶ Forwarding
  20 s          15 s          15 s          ¡ya!
   (escucha     (escucha      (aprende      (reenvía
    BPDUs)      BPDUs, no     MACs, no      datos)
                reenvía)      reenvía)
```

**Tiempo total de convergencia STP: 30-50 segundos.** ¡Una eternidad en redes modernas! Si un PC se conecta a un puerto sin protección, tardará hasta 50 segundos en poder hablar. Por eso existen PortFast y RSTP, que verás en el [punto 7](/ApuntesRedes/06-switching-stp/07-rstp-y-portfast).

---

## 🖥️ Ver el estado de STP en Cisco

```bash
# Ver el rol y estado de cada puerto
Switch# show spanning-tree

# Resultado (resumen):
#   Root ID    Priority 4096   Address 0011.2233.4400
#   Bridge ID  Priority 32768  Address 0011.2233.4401
#   Fa0/1  Role Root       State FORWARDING
#   Fa0/2  Role Alternate  State BLOCKING
```

En la salida ves dos datos clave: quién es el **Root** (arriba) y qué rol/estado tiene **cada puerto** de este switch.

> 💡 **Leer la salida:** un puerto `Root FORWARDING` es la vía principal hacia el Root Bridge; un `Alternate BLOCKING` es el respaldo dormido. Si el primero falla, el segundo pasa a forwarding en cuanto converge.

---

## 🧠 Mini-chequeo

1. ¿Cuántos Root Ports tiene un switch que NO es Root Bridge?
2. ¿En qué estado aprende MACs pero NO reenvía tráfico?
3. ¿Cuánto tarda STP en converger por defecto?

<details>
<summary>🔄 Respuestas</summary>

1. Exactamente **1**: su mejor puerto hacia el Root Bridge.
2. En **Learning** (aprende MACs, no reenvía datos).
3. **30-50 segundos** (20 s Max Age + 15 s Listening + 15 s Learning, según el escenario).
</details>

---

## ✅ Resumen en 3 frases

- Los roles STP son Root (1 por switch no-root), Designated (1 por segmento), Alternate y Backup (bloqueados).
- Los estados van de Blocking a Forwarding pasando por Listening y Learning, aprendiendo MACs solo en Learning.
- La convergencia STP de 30-50 s es lenta: es el motor de la evolución a RSTP.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Root Port (RP) | Mejor puerto hacia el Root Bridge |
| Designated Port (DP) | Mejor puerto de cada segmento |
| Alternate Port (AP) | Puerto bloqueado de respaldo |
| Blocking | Estado que escucha BPDUs sin reenviar (20 s) |
| Listening | Escucha BPDUs, no aprende (15 s) |
| Learning | Aprende MACs, no reenvía (15 s) |
| Forwarding | Estado normal: reenvía y aprende |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-switching-stp) · **Anterior:** [05 · STP: fundamentos](/ApuntesRedes/06-switching-stp/05-stp-fundamentos) · **Siguiente:** [07 · RSTP y PortFast](/ApuntesRedes/06-switching-stp/07-rstp-y-portfast)