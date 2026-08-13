---
title: 07 — RSTP y PortFast
description: La red que converge en segundos, no en minutos ⚡
---

<p><small>La red que converge en segundos, no en minutos ⚡</small></p>

> 🗺️ **Estás en:** 🔀 U06 → 07 · RSTP y PortFast

---

## 📬 La idea en una frase

> **RSTP** (*Rapid Spanning Tree Protocol*, IEEE 802.1w) acelera STP de 30-50 segundos a **1-3 segundos** gracias a un handshake de propuesta/acuerdo entre switches; **PortFast** y **BPDUGuard** hacen lo propio en los puertos de acceso que solo se conectan a PCs.

---

## ⚡ RSTP: STP con prisa

STP clásico era lento porque cada puerto esperaba sus temporizadores (Max Age, Forward Delay). RSTP cambia el enfoque: los puertos **negocian** con un handshake **propuesta/acuerdo**, sin esperar temporizadores. La topología converge en segundos.

| Característica | STP (802.1D) | RSTP (802.1w) |
|---|---|---|
| Convergencia | 30-50 segundos | **1-3 segundos** |
| Roles de puerto | Root, Designated, Blocked | Root, Designated, **Alternate, Backup** |
| Estados | 5 (Blocking, Listening, Learning, Forwarding, Disabled) | **3** (Discarding, Learning, Forwarding) |
| Tipos de enlace | No distingue | **Edge** (acceso), Point-to-Point, Shared |
| Propuesta/Acuerdo | No | **Sí** (handshake rápido) |

> 💡 **Los 3 estados de RSTP:** RSTP fusiona Blocking + Listening + Disabled en un único **Discarding**. Menos estados, misma función, más velocidad.

Los puertos se clasifican en RSTP:

| Tipo de puerto | Uso |
|---|---|
| **Edge port** | Conectado a un PC/impresora (no aprende switches) |
| **Point-to-Point** | Conectado a otro switch por enlace directo |
| **Shared** | Enlace compartido (hub): rara vez hoy en día |

---

## 🏃 PortFast: el atajo para puertos de acceso

Un PC enchufado a un puerto normal de STP espera **hasta 50 segundos** hasta poder hablar: los estados Listening y Learning bloquean la comunicación mientras convergen. En un puerto de acceso (que solo conecta PCs, nunca switches), ese retraso es puro desperdicio.

**PortFast** declara el puerto como **edge port**: salta los estados Listening y Learning y pasa **directamente a Forwarding**. El PC obtiene IP al instante.

```bash
# Configurar PortFast en un puerto de acceso
Switch(config)# interface fa0/24
Switch(config-if)# spanning-tree portfast
```

> ⚠️ **¡Cuidado!** PortFast debe usarse SOLO en puertos de acceso. Si conectas un switch a un puerto PortFast, el nuevo enlace entra en forwarding sin verificar, y puedes crear un **bucle silencioso**. Por eso existe BPDUGuard.

---

## 🛡️ BPDUGuard: el guardián del puerto

Si un puerto PortFast recibe una **BPDU**, es señal de que alguien ha conectado un switch donde solo debía haber un PC. **BPDUGuard** lo detecta y **deshabilita el puerto** (estado *errdisable*):

```bash
Switch(config-if)# spanning-tree bpduguard enable
```

```
PC autorizado:   ── no envía BPDUs ──▶ puerto feliz (forwarding)
Switch pirata:   ── envía BPDUs ────▶ puerto bloqueado (errdisable)
```

> 💡 **errdisable:** cuando un puerto entra en errdisable se desactiva automáticamente. Para recuperarlo: `shutdown` + `no shutdown`, o configurar recuperación automática con `errdisable recovery`. Lo vemos de nuevo en el [punto 8](/ApuntesRedes/06-switching-stp/08-port-security).

---

## 🧠 Mini-chequeo

1. ¿Cuánto tarda RSTP en converger? ¿Por qué es más rápido que STP?
2. ¿Qué hace PortFast exactamente en un puerto de acceso?
3. ¿Por qué BPDUGuard deshabilita un puerto PortFast que recibe BPDUs?

<details>
<summary>🔄 Respuestas</summary>

1. **1-3 segundos**, porque usa un handshake de **propuesta/acuerdo** entre switches en lugar de esperar temporizadores.
2. Lo declara **edge port** y lo lleva **directamente a Forwarding**, saltando Listening y Learning.
3. Porque recibir una BPDU indica que hay un **switch conectado** donde solo debería haber un PC: posible bucle. BPDUGuard lo pone en **errdisable** para proteger la red.
</details>

---

## ✅ Resumen en 3 frases

- RSTP (802.1w) converge en 1-3 segundos con handshake propuesta/acuerdo y solo 3 estados.
- PortFast acelera los puertos de acceso saltando al estado Forwarding al instante.
- BPDUGuard vigila los puertos PortFast y los deshabilita si detectan un switch: es la seguridad contra bucles silenciosos.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| RSTP | Rapid STP (IEEE 802.1w), converge en segundos |
| Edge port | Puerto conectado solo a un PC |
| PortFast | Configuración que salta a Forwarding al instante |
| BPDUGuard | Deshabilita el puerto si recibe BPDUs |
| errdisable | Estado de puerto deshabilitado por error detectado |
| Propuesta/Acuerdo | Handshake RSTP que acelera la convergencia |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-switching-stp) · **Anterior:** [06 · Puertos y estados STP](/ApuntesRedes/06-switching-stp/06-puertos-y-estados-stp) · **Siguiente:** [08 · Port Security](/ApuntesRedes/06-switching-stp/08-port-security)