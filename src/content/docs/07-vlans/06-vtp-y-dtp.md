---
title: 06 — VTP y DTP
description: Los protocolos que propagan VLANs... y los riesgos que traen 🎭
---

<p><small>Los protocolos que propagan VLANs... y los riesgos que traen 🎭</small></p>

> 🗺️ **Estás en:** 🏢 **U07 · VLANs** → 06 · VTP y DTP

---

## 📬 La idea en una frase

> **VTP** (*VLAN Trunking Protocol*) propaga la base de datos de VLANs entre switches automáticamente, y **DTP** (*Dynamic Trunking Protocol*) negocia si un puerto es trunk o access. Ambos "te hacen la vida fácil"... y ambos son la puerta de entrada a desastres de seguridad y VLANs que desaparecen.

En los puntos 3 y 4 te creaste las VLANs a mano en cada switch. Estos dos protocolos prometen automatizarlo. Aquí verás por qué la industria moderna te recomienda **apagarlos o usarlos con muchísimo cuidado**.

---

## 📡 VTP: el repartidor de VLANs

VTP distribuye la lista de VLANs del "switch boss" (server) al resto (clients). Cuando creas la VLAN 40 en el server, todos los switches de la red la aprenden solos por el trunk.

### Los tres modos VTP

| Modo | ¿Crea/modifica VLANs? | ¿Recibe anuncios? | ¿Propaga anuncios? | Uso típico |
|---|---|---|---|---|
| **Server** | ✅ Sí | Sí | Sí | El de referencia: es el "catálogo" de VLANs |
| **Client** | ❌ No (solo copia) | Sí | Sí (los reenvía) | Switches de distribución que siguen al server |
| **Transparent** | ✅ Sí (locales) | No (los ignora) | Sí (los deja pasar) | La "isla": VLANs propias, no participa |

En VTP **v2**, si configuras `vlan 40` en un client, el comando "se lo traga" pero al reiniciar la VLAN no existe: el client no guarda cambios propios, solo copia la base del server. En VTP **v3**, el mode *off* es el recomendado: no envía ni procesa anuncios VTP en absoluto.

### El número de revisión: la bomba de relojería

Cada switch VTP lleva un **revision number** que sube con cada cambio de su base de datos. La regla es implacable:

> El switch con el **revision number más alto** impone su base de datos a toda la red.

El escenario del desastre:

```
Red actual: server con revision nº 100  (VLANs 10, 20, 30 configuradas)
Nuevo switch: server "usado" con revision nº 500... y base de datos EMPTY
Al conectarlo por un trunk:
→ Anuncia su revision 500 > 100
→ TODOS los switches borran las VLANs 10, 20, 30
```

Sí: un switch de segunda mano, reseteado a medias o flasheado, puede **arrasar la base de datos de toda la red** en segundos. Es un clásico de *VTP disaster* en administración real.

> ⚠️ **CONRAD escupe:** "¿VTP? En mi red no. Primero: revision number 500 y adiós VLANs. Segundo: si un atacante se ata a un trunk y anuncia revision más alta, borra la red desde el parking. Recomendación oficial de la industria: **no usar VTP** (o VTPv3 en mode *off*). Las VLANs se configuran a mano y se documentan."

### Cómo evitar el desastre

- Usar **VTP transparent** o **VTPv3 mode off**: el switch no participa y no propaga nada.
- Comprobar el **revision number** (`show vtp status`) de todo switch antes de enchufarlo a la red.
- Resetear la base VTP del equipo de segunda mano: `delete flash:vlan.dat` antes de conectarlo.
- Documentar siempre la base de datos de VLANs (la config es tu backup).

---

## 🤝 DTP: el negociador de trunks

DTP decide automáticamente si un puerto se convierte en trunk. Con `switchport mode dynamic desirable` (predeterminado en muchos switches Cisco), el puerto pregunta a su vecino "¿te hago trunk?" y si responde afirmativamente... te monta un trunk sin que nadie lo pidiera.

| Modo de puerto | ¿Negocia con DTP? | ¿Puede volverse trunk? |
|---|---|---|
| `switchport mode access` | No | No |
| `switchport mode trunk` | Sí (desactivable) | Ya es trunk |
| `switchport mode dynamic desirable` | Sí (propone) | Sí, negocia de forma activa |
| `switchport mode dynamic auto` | Sí (acepta) | Sí, si el otro propone |
| `switchport nonegotiate` | No (nunca emite DTP) | Solo si se declara trunk a mano |

### El riesgo de seguridad de DTP

Un atacante con un PC conectado a un puerto en `dynamic desirable` puede **negociar un trunk** y, si el trunk transporta todas las VLANs, leer/u olfatear el tráfico de todas ellas desde el pasillo. Es el vector principal del *VLAN hopping* (punto 7).

Mitigación en una línea:

```bash
Switch(config-if)# switchport mode access
Switch(config-if)# switchport nonegotiate
```

O en los puertos no usados, directamente `shutdown`. **Nunca dejes un puerto en `dynamic desirable` sin vigilancia.**

---

## 🔍 Verificación y comandos

```bash
Switch# show vtp status              # estado VTP: mode, revision number, domain
Switch# show interfaces trunk        # qué puertos son trunk y con qué native/allowed
Switch# show dtp interface fa0/24    # estado de negociación DTP del puerto
```

> 💡 **Regla de oro operativa:** configurar `vtp mode transparent` (o VTPv3 *off*) + `switchport nonegotiate` en los trunks + `switchport mode access` en los puertos de usuario. Cero protocolos negociadores, cero sorpresas.

---

## 🧠 Mini-chequeo

1. ¿Por qué un switch "usado" con revision number alto puede borrar las VLANs de toda la red?
2. ¿Cuál es la diferencia entre VTP transparent y VTPv3 mode off?
3. ¿Qué riesgo de seguridad introduce DTP y con qué comando lo neutralizas?

<details>
<summary>🔄 Respuestas</summary>

1. Porque VTP `propaga la base de datos del switch con mayor revision number`. Si un switch con revisión 500 (y base vacía) se conecta a una red cuyo server tiene revisión 100, impone la suya y todas las VLANs desaparecen.
2. **Transparent** no participa (tiene sus VLANs locales) pero **sí reenvía** anuncios ajenos; **VTPv3 mode off** no procesa ni propaga anuncios: es una isla total. El *off* es más seguro.
3. DTP permite a un portátil **negociar un trunk** (si el puerto está en `dynamic desirable`) y acceder a todas las VLANs. Se mitiga con `switchport mode access` + `switchport nonegotiate` (y `shutdown` en puertos libres).

</details>

---

## ✅ Resumen en 3 frases

- **VTP** automatiza la distribución de VLANs, pero su *revision number* es peligroso: un switch con revisión mayor arrasa la base de datos.
- **DTP** negocia trunks automáticamente y abre la puerta al *VLAN hopping*: hay que desactivarlo.
- La recomendación moderna: **no usar VTP** o VTPv3 *off*, y **`switchport nonegotiate`** en todos los trunks.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| VTP | Protocolo que distribuye las VLANs por la red (server/client/transparent) |
| Revision number | Contador de la base VTP; el más alto manda |
| VTP transparent | No participa, solo reenvía anuncios |
| DTP | Protocolo que negocia si un puerto es trunk o access |
| `switchport nonegotiate` | Apaga la negociación DTP en el puerto |
| VLAN hopping | Ataque que negocia un trunk para acceder a todas las VLANs |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-vlans) · **Anterior:** [05 · Switch capa 3 y SVIs](/ApuntesRedes/07-vlans/05-switch-capa3) · **Siguiente:** [07 · Seguridad en VLANs](/ApuntesRedes/07-vlans/07-seguridad-en-vlans)