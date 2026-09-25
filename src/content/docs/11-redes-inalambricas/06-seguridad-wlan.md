---
title: 06 — Seguridad WLAN
description: Del candado roto de WEP al WPA3 de verdad 🔐
---

<p><small>Del candado roto de WEP al WPA3 de verdad 🔐</small></p>

> 🗺️ **Estás en:** 📶 **Redes inalámbricas** → 06 · Seguridad WLAN

---

## 📬 La idea en una frase

> En una red cableada el atacante necesita un enchufe; en una inalámbrica, necesita estar a 50 metros. Por eso la seguridad WLAN tiene su propia historia —WEP roto, WPA parche, WPA2 estándar, WPA3 actual— y su regla de oro: **el cifrado no es opcional, y la clave compartida no es identidad**.

---

## 🪦 La historia del cifrado WLAN (y por qué la recuerdas)

| Protocolo | Estado | Por qué |
|---|---|---|
| **WEP** | ☠️ Muerto desde hace años | RC4 con IVs de 24 bits: se rompe en minutos con herramientas automáticas |
| **WPA** | ☠️ Retirado | Parche provisional (TKIP) sobre WEP-compatible; también roto |
| **WPA2** | ✅ El estándar durante 15+ años | AES-CCMP; sigue siendo válido, PSK o Enterprise |
| **WPA3** | ✅ El actual | SAE en vez de PSK, *forward secrecy*, protección a claves débiles; WPA3-Personal y WPA3-Enterprise |

> ⚠️ **WPA2 tambaleó en 2017:** la vulnerabilidad KRACK atacaba el handshake de WPA2, y los fabricantes parchearon equipos con actualizaciones. Moraleja doble: mantén el firmware al día, y no confundas "estándar vigente" con "configuración eterna".

---

## 🔑 PSK vs Enterprise: la decisión que define tu red

| | **WPA2/WPA3-Personal (PSK)** | **WPA2/WPA3-Enterprise (802.1X)** |
|---|---|---|
| Credencial | Una clave compartida por todos | Usuario/contraseña o certificado **por persona** |
| ¿Quién valida? | El AP compara la clave | Un servidor **RADIUS** valida cada usuario |
| Si alguien se va | Cambias la clave en todos los equipos | Desactivas su cuenta y listo |
| Trazabilidad | Todos son "la clave" | Logs por usuario (quién, cuándo, qué AP) |
| Coste/complejidad | Cero (el router de casa) | RADIUS + identidad (NPS, FreeRADIUS, ISE…) |

Reglas prácticas:

- **Casa / PYME pequeña:** WPA3-Personal (o WPA2 con AES si hay clientes viejos).
- **Empresa / centro educativo:** WPA2/WPA3-Enterprise con RADIUS; si no hay infraestructura de identidad, PSK distintos **por SSID y por grupo**, con la red de invitados aislada.
- **Invitados:** SSID aparte, PSK rotatoria o portal cautivo, y **aislamiento de clientes** + acceso solo a Internet (¡ACLs/firewall! lo de seguridad sirve).

> 💡 **El SSID oculto no es seguridad:** ocultar el beacon solo impide que aparezca en la lista; el SSID viaja en claro en las asociaciones de los clientes y cualquier herramienta lo muestra en segundos. Y el **filtrado por MAC**, lo mismo: se clona en un clic. Ambos son decoración, no barreras.

---

## 🏗️ Anatomía de una WLAN empresarial segura

```
                        ┌──────────────┐
   Portátiles ──(WiFi)──│      AP      │── trunk ──┌──────────────┐
                        │ (solo puente)│           │    Switch    │
   Móviles    ──(WiFi)──│              │           └──────┬───────┘
                        └──────────────┘                  │
                       SSID "CORP" → VLAN 10 ─────────────┤→ firewall/router
                       SSID "INVITADOS" → VLAN 99 ────────┘
                                  │
                        (VLAN 99: solo salida a Internet,
                         clientes aislados entre sí)
```

Las piezas clave:

1. **Un SSID por propósito**, cada uno con su VLAN: corporativo, invitados, IoT/dispositivos. El AP solo "puentea" el WiFi al cable; la segregación real la hacen las VLANs y las ACLs.
2. **802.1X + RADIUS** para el SSID corporativo: identidad real, logs reales.
3. **Invitados en VLAN propia**, aislados entre sí y solo con salida a Internet.
4. **Gestión del AP aparte**: interfaz de administración solo desde la VLAN de gestión, con credenciales propias (nada de dejar admin/admin).

---

## 🤬 CONRAD VS EL MUNDO: "WEP tiene un candado, luego es seguro"

**Usuario:** — Mi router tiene WEP. Tiene el candadito y me pide clave. Es seguro, ¿no?

**CONRAD:** — Seguro como una puerta de cartón con la foto de un candado. WEP se rompe en minutos, con herramientas gratuitas, recogiendo tráfico de tu red. El candadito de la interfaz es una foto de candado, no un candado.

**CONRAD:** — Y de propina: si me dices que ocultaste el SSID "por si acaso" y filtraste MACs "para reforzar", has decorado el cartón. El SSID oculto viaja en claro y la MAC se clona. Ni una ni otra son seguridad: son pintura.

**La lección:** la seguridad WLAN moderna se resume en: **WPA2-AES o WPA3**, credenciales por persona (Enterprise) cuando la organización importa, y segmentación de invitados/IoT en VLANs aisladas. Todo lo demás es decoración.

---

## 🧠 Mini-chequeo

1. ¿Por qué WEP se considera roto de forma definitiva?
2. ¿Qué cambia exactamente al pasar de PSK a Enterprise (802.1X)? ¿Qué hardware extra necesitas?
3. Un SSID oculto y un filtro MAC, ¿qué aportan de seguridad real?
4. Diseña los SSIDs de un instituto con profesores, alumnos e invitados. ¿Qué VLANs y seguridad pones a cada uno?

<details>
<summary>🔄 Respuestas</summary>

1. Su IV de 24 bits hace que las claves se reutilicen pronto y el cifrado RC4 caiga ante análisis estadístico: con tráfico suficiente (que se puede provocar con inyecciones), la clave se recupera en minutos.
2. La validación pasa del AP (que solo compara la clave compartida) a un **servidor RADIUS** que autentica a cada usuario; necesitas infraestructura de identidad (RADIUS: NPS, FreeRADIUS…) y configurar 802.1X en APs. Ganas identidad por usuario, logs y bajas instantáneas.
3. Casi nada. El SSID oculto aparece en las tramas de asociación de cualquier cliente legítimo (y las herramientas lo revelan); la MAC se clona. Son obstáculos estéticos.
4. SSID "PROFES" → VLAN de profesores, WPA3/WPA2-Enterprise con RADIUS; SSID "ALUMNOS" → VLAN de alumnos, WPA2/WPA3 (PSK gestionada o Enterprise según recursos) con ACLs hacia la red interna; SSID "INVITADOS" → VLAN propia, PSK rotatoria o portal, aislamiento de clientes y solo Internet.
</details>

---

## ✅ Resumen en 3 frases

- WEP y WPA están muertos: **WPA2-AES como mínimo** y **WPA3** cuando los clientes lo soporten.
- **PSK** comparte una clave; **Enterprise (802.1X+RADIUS)** identifica personas: la elección depende del tamaño y del riesgo.
- La seguridad real se completa con **VLANs por SSID**, invitados aislados y gestión del AP protegida; ocultar SSID o filtrar MACs es pintura.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| PSK | Clave precompartida (Personal) |
| 802.1X | Autenticación de puerto: pide identidad antes de dar red |
| RADIUS | Servidor que valida credenciales 802.1X |
| SAE | El handshake de WPA3 (sustituto de PSK) |
| Portal cautivo | Página de login para invitados |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-redes-inalambricas) · **Anterior:** [05 · Cobertura y diseño](/ApuntesRedes/11-redes-inalambricas/05-cobertura-y-diseno) · **Siguiente:** [07 · APs y controladores](/ApuntesRedes/11-redes-inalambricas/07-aps-y-wlc)
