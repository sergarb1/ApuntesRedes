---
title: 08 — Port Security
description: "Blindar los puertos: quién puede conectarse y quién no 🔒"
---

<p><small>Blindar los puertos: quién puede conectarse y quién no 🔒</small></p>

> 🗺️ **Estás en:** 🔀 U06 → 08 · Port Security

---

## 📬 La idea en una frase

> **Port Security** limita cuántas direcciones MAC puede aprender un puerto y qué hacer si se supera ese límite: así solo los equipos autorizados pueden conectarse a ese puerto del switch.

Es la respuesta al ataque de CAM flooding del [punto 2](/ApuntesRedes/06-switching-stp/02-aprendizaje-mac): si limitas las MACs por puerto, un atacante no puede llenar la tabla CAM ni conectar dispositivos no autorizados.

---

## 🔒 ¿Qué problema resuelve?

Un puerto de switch abierto acepta cualquier equipo: cualquiera puede enchufar su portátil (o un switch pirata) y entrar en la red. Port Security da control sobre el **puerto físico**:

| Ataque | Mitigación de Port Security |
|---|---|
| CAM flooding (llenar la tabla MAC) | `maximum` limita las MACs aprendidas |
| Portátil no autorizado | `maximum` + violación por defecto (shutdown) |
| Switch no administrado conectado | Se supera el máximo y el puerto se desactiva |

---

## 🛠️ Configuración básica

```bash
Switch(config)# interface fa0/1
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 2
Switch(config-if)# switchport port-security mac-address sticky
Switch(config-if)# switchport port-security violation shutdown
```

---

## 📋 Los parámetros clave

| Parámetro | Descripción |
|---|---|
| `maximum` | Nº máximo de MACs permitidas en el puerto (**por defecto 1**) |
| `mac-address sticky` | Aprende la MAC automáticamente y la **guarda en la config** (no caduca) |
| `violation shutdown` | **Deshabilita el puerto** si se supera el máximo (por defecto) |
| `violation restrict` | Descarta el tráfico extra pero **no deshabilita** el puerto |
| `violation protect` | Descarta el tráfico extra **sin notificar** (silencioso) |

> 💡 **Sticky MAC:** con `mac-address sticky`, la primera MAC que aprende el puerto se convierte en permanente (queda escrita en la configuración en ejecución). Si reinicias el switch, esa MAC sigue siendo la única bienvenida.

---

## 🚨 La violación en acción

Escenario típico: configuras el puerto de la impresora con `maximum 1` y `violation shutdown`. El usuario enchufa su portátil además de la impresora → aparecen **2 MACs** en un puerto que solo permite 1 → **¡violación!**

```
MAC 1 (impresora) → aprendida OK
MAC 2 (portátil)  → supera el máximo
  → violation shutdown → puerto en errdisable
```

Recuperar el puerto:

```bash
Switch(config)# interface fa0/1
Switch(config-if)# shutdown
Switch(config-if)# no shutdown
```

O recuperación automática:

```bash
Switch(config)# errdisable recovery cause psecure-violation
Switch(config)# errdisable recovery interval 300
```

---

## 🔎 Verificación

```bash
Switch# show port-security
Switch# show port-security interface fa0/1
Switch# show mac address-table secure
```

| Comando | Qué muestra |
|---|---|
| `show port-security` | Resumen de puertos seguros y violaciones |
| `show port-security interface fa0/1` | Estado, máximo, MACs actuales y tipo de violación de un puerto |
| `show mac address-table secure` | Las MACs marcadas como SECURE (sticky) |

> ⚠️ **Ojo con los modos:** `shutdown` es la violación por defecto y la más segura, pero deja el puerto caído. `restrict` y `protect` no desactivan el puerto (mejor disponibilidad, peor control). Elige según el caso.

---

## 🧠 Mini-chequeo

1. ¿Cuántas MACs permite por defecto un puerto con port security?
2. ¿Qué hace `mac-address sticky`?
3. Un puerto entra en errdisable por violación: ¿cómo lo recuperas?

<details>
<summary>🔄 Respuestas</summary>

1. **1 MAC** por defecto.
2. Aprende la primera MAC y la **guarda en la configuración** como permanente (no caduca).
3. Con `shutdown` + `no shutdown` en el puerto, o configurando `errdisable recovery cause psecure-violation`.
</details>

---

## ✅ Resumen en 3 frases

- Port Security limita las MACs por puerto (`maximum`, por defecto 1) y define qué hacer al superarlas.
- `mac-address sticky` convierte la MAC aprendida en permanente.
- La violación por defecto (`shutdown`) pone el puerto en errdisable; se recupera a mano o con errdisable recovery.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Port Security | Técnica que limita MACs por puerto |
| maximum | Nº máximo de MACs permitidas |
| Sticky MAC | MAC aprendida y guardada como permanente |
| Violación | Superar el máximo permitido en un puerto |
| errdisable | Puerto deshabilitado por el switch al detectar un error |
| `violation shutdown` | Modo que desactiva el puerto al violarse |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/06-switching-stp) · **Anterior:** [07 · RSTP y PortFast](/ApuntesRedes/06-switching-stp/07-rstp-y-portfast) · **Siguiente:** [09 · Head First (cierre)](/ApuntesRedes/06-switching-stp/09-head-first)