---
title: 03 — Trunks y 802.1Q
description: El etiquetado que lleva varias VLANs por un mismo cable 🏷️
---

<p><small>El etiquetado que lleva varias VLANs por un mismo cable 🏷️</small></p>

> 🗺️ **Estás en:** 🏢 **U08 · VLANs** → 03 · Trunks y 802.1Q

---

## 📬 La idea en una frase

> Un **trunk** es un enlace que transporta tráfico de **múltiples VLANs** entre dos switches; el estándar **802.1Q** inserta **4 bytes** de etiqueta dentro de cada trama para que el switch destino sepa a qué VLAN pertenece.

Sin trunks, cada VLAN necesitaría su propio cable entre switches, y eso volvía a multiplicar el hardware. Con un trunk, un único cable transporta diez VLANs: cada trama viaja con una etiqueta que dice "soy de la VLAN 10" y el otro extremo la entrega al puerto correcto.

---

## 🏷️ La trama 802.1Q

Cuando una trama Ethernet entra en un trunk, el switch le inserta una **etiqueta de 4 bytes** entre la MAC de origen y el campo EtherType:

```
┌─────────────────────────────────────────────────────────────┐
│ MAC Dest │ MAC Orig │ *802.1Q* │ EtherType │ Payload │ FCS │
└─────────────────────────────────────────────────────────────┘
                              │
                        4 bytes insertados:
                        ┌──────────────┬──────────────┐
                        │ TPID (0x8100)│  PRI  │ VLAN ID │
                        └──────────────┴───────┴─────────┘
                        2 bytes       3 bits  12 bits
```

Los tres campos de la etiqueta, desglosados:

| Campo | Tamaño | Valor | Qué hace |
|---|---|---|---|
| **TPID** (*Tag Protocol ID*) | 2 bytes | `0x8100` | Marca que la trama está etiquetada 802.1Q |
| **PRI** (*Priority*, 802.1p) | 3 bits | 0-7 | Prioridad QoS (voz suele llevar 5) |
| **VLAN ID** | 12 bits | 1-4094 (0 y 4095 reservadas) | Identifica la VLAN a la que pertenece la trama |

> 💡 **Consecuencia del VLAN ID de 12 bits:** el estándar permite **4096** IDs (0 a 4095), pero 0 y 4095 están reservadas, así que el máximo usable es **4094** VLANs. Los switches baratos soportan muchas menos: échale un ojo a la hoja de especificaciones.

El FCS se recalcula siempre que cambia la trama: introducir la etiqueta modifica la trama, así que el checksum de cola se vuelve a calcular en cada extremo que añade o quita la etiqueta.

---

## 🔗 ¿Qué es un trunk?

Un **trunk** es un puerto configurado para transportar varias VLANs. Por el puerto **access** solo pasa la VLAN de su departamento; por el **trunk** pasa todo el catálogo de VLANs permitidas, todas etiquetadas salvo la native:

```
Switch A (puerto Fa0/24, trunk) ──── Switch B (puerto Fa0/24, trunk)
        │                                    │
   VLAN 10 (Ventas)                    VLAN 10 (Ventas)
   VLAN 20 (RRHH)                      VLAN 20 (RRHH)
   VLAN 30 (IT)                        VLAN 30 (IT)
```

Sin el trunk, las VLANs de Ventas a un lado del edificio no llegarían a las del otro. Con él, un cable sostiene todas las VLANs del edificio. El mismo concepto se usa entre switch y router (punto 4) o entre switch y switch para los enlaces de core.

---

## ⚙️ Configuración de un trunk en Cisco IOS

En el switch, el puerto que va al otro extremo se configura así:

```bash
Switch1(config)# interface fa0/24
Switch1(config-if)# switchport mode trunk
Switch1(config-if)# switchport trunk native vlan 99
Switch1(config-if)# switchport trunk allowed vlan 10,20,30
```

| Comando | Efecto |
|---|---|
| `switchport mode trunk` | Fuerza al puerto a ser trunk (no negociado) |
| `switchport trunk native vlan 99` | Cambia la native VLAN (¡importante: NO dejarla en 1!) |
| `switchport trunk allowed vlan 10,20,30` | Limita las VLANs que cruzan el trunk (menos broadcasts, más seguridad) |

> ⚠️ **CONRAD alerta:** `allowed vlan` es una *whitelist*. Si un día creas la VLAN 40 y no la añades a `allowed`, NO pasará por el trunk y te pasarás dos horas mirando el access. Y si pones `allowed vlan 10,20` en un extremo y `10,20,30` en otro, la VLAN 30 del primer switch no cruzará jamás.

---

## 🌊 La native VLAN: la que viaja sin etiqueta

En un trunk, **la native VLAN no se etiqueta**: sus tramas viajan "peladas" por el enlace. Esto sirve para tráfico de control (CDP, VTP, DTP) y se creó para mantener compatibilidad con equipo antiguo que no entiende 802.1Q.

| Característica | Valor típico |
|---|---|
| VLAN por defecto | VLAN 1 |
| ¿Se etiqueta? | **No** (las demás sí) |
| ¿Debe coincidir en ambos extremos? | **Sí, obligatorio** |
| Recomendado | Un número alto y dedicado (ej. 99 o 999), nunca VLAN 1 |

### El problema clásico: native VLAN distinta en cada extremo

Si el Switch A tiene native VLAN 99 y el Switch B native VLAN 1, ocurre lo siguiente:

1. A manda una trama "de control" sin etiqueta por el trunk (pensando que va a la VLAN 99).
2. B la recibe sin etiqueta… y como para B la native es la 1, la "interpreta" como VLAN 1.
3. El tráfico de la sensata VLAN 1 de A y el de la 99 de B se mezclan: conectividad rara, mensajes de error en ambos logs y —con mala leche— una vía para ataques de doble etiquetado.

```
Switch A                          Switch B
─────────────────────────────────────────────
native VLAN: 99                   native VLAN: 1
trama sin etiqueta →  "VLAN 99"   trama sin etiqueta → "VLAN 1" ❌ MISMATCH
```

> ⚠️ **Síntoma del mismatch:** el switch ladra por el log *"Native VLAN mismatch discovered on Fa0/24"* y el tráfico de DHCP/ARP entre VLANs "va y viene a ratos". La solución es una línea: que ambos extremos declaren la **misma** native VLAN. Lo compruebas con `show interface trunk`.

---

## 🔍 Verificación rápida

Los tres comandos que te sacan del apuro en cualquier truco de trunks:

```bash
Switch# show interfaces trunk          # lista trunks, native VLAN, VLANs permitidas
Switch# show vlan brief                # qué puertos están en cada VLAN (access)
Switch# show running-config interface fa0/24   # la config exacta del puerto
```

`show interfaces trunk` es el más valioso del punto: te muestra en una sola pantalla los *allowed VLANs*, la *native VLAN* y si hay discordancia entre extremos.

---

## 🧠 Mini-chequeo

1. ¿Cuántos bytes añade 802.1Q a una trama y qué tres campos transporta la etiqueta?
2. ¿Qué diferencia hay entre un puerto access y un puerto trunk?
3. Configuras el trunk con native VLAN 99 en un lado y 1 en el otro. ¿Qué ocurre y con qué comando lo detectas?

<details>
<summary>🔄 Respuestas</summary>

1. Añade **4 bytes** entre la MAC origen y el EtherType: **TPID** (0x8100), **PRI** (3 bits de QoS/802.1p) y **VLAN ID** (12 bits).
2. El **access** pertenece a una sola VLAN, sin etiquetar; el **trunk** transporta varias VLANs, todas etiquetadas salvo la native.
3. Aparece el mensaje *"Native VLAN mismatch"* y las tramas sin etiquetar caen en la VLAN equivocada en cada extremo. Se detecta con **`show interfaces trunk`**, que muestra la native de cada lado. Se arregla declarando la **misma** native en ambos.

</details>

---

## ✅ Resumen en 3 frases

- El **802.1Q** mete **4 bytes** (TPID + PRI + VLAN ID) dentro de cada trama para que viajen muchas VLANs por un único cable.
- Un **trunk** es el enlace que transporta todas las VLANs permitidas, controladas con `switchport mode trunk` y `switchport trunk allowed vlan`.
- La **native VLAN** no se etiqueta y debe ser **idéntica en ambos extremos**, y su desajuste es la incidencia clásica de los trunks.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Trunk | Enlace que transporta múltiples VLANs |
| 802.1Q | Estándar de etiquetado VLAN (4 bytes) |
| TPID | Campo 0x8100 que marca la trama etiquetada |
| VLAN ID | Los 12 bits que identifican la VLAN (1-4094) |
| Native VLAN | VLAN sin etiquetar en el trunk (VLAN 1 por defecto) |
| `allowed vlan` | Lista blanca de VLANs que cruzan el trunk |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/08-vlans) · **Anterior:** [02 · Tipos de VLAN](/ApuntesRedes/08-vlans/02-tipos-de-vlan) · **Siguiente:** [04 · Inter-VLAN routing](/ApuntesRedes/08-vlans/04-inter-vlan-routing)