---
title: 07 — Direcciones MAC e IP
description: La matrícula y el domicilio de cada dispositivo 🏷️
---

<p><small>La matrícula y el domicilio de cada dispositivo 🏷️</small></p>

> 🗺️ **Estás en:** 🌐 **U02 · Fundamentos de redes** → 07 · Direcciones MAC e IP

---

## 📬 La idea en una frase

> **Cada dispositivo necesita dos direcciones para comunicarse: la MAC (quién eres) y la IP (dónde estás).**

Una la lleva pegada al hardware y no cambia; la otra la decide la red y cambia cuando te mudas. Las dos trabajan juntas en cada paquete.

---

## 🖲 Dirección MAC: la matrícula

La **MAC** (*Media Access Control*) es un identificador único de 48 bits grabado de fábrica en cada interfaz de red.

- Se representa en hexadecimal: `AA:BB:CC:DD:EE:FF` (6 grupos de 2 dígitos).
- Los primeros 24 bits (3 grupos) identifican al **fabricante** (*OUI* — Organizationally Unique Identifier).
- Los 24 restantes son el número propio del dispositivo dentro de ese fabricante.
- **No cambia** (aunque se puede simular por software: *MAC spoofing*).
- Trabaja en la **capa 2** (Enlace).

> **Ejemplos de OUI:** `00:1A:2B` → Cisco · `00:23:5E` → Intel · `3C:07:54` → Raspberry Pi.
> En Windows la ves con `ipconfig /all`; en Linux, con `ip link` o `ifconfig`.

---

## 🌐 Dirección IP: el domicilio (IPv4)

La IP es una dirección **lógica** en la **capa 3**. En la versión **IPv4** son 32 bits, presentados como 4 números de 0 a 255 separados por puntos:

`192.168.1.10`

- **Cambia** según la red a la que te conectes.
- Es única en la red donde estás (no a nivel mundial a secas: se reutilizan rangos privados).
- Se divide en dos partes: **dirección de red** + **dirección de host**.

> En la U05 le daremos la vuelta de cabo a rabo (clases, CIDR, subnetting). Aquí solo presentamos el concepto.

---

## 🎭 La máscara de subred: el código postal

La máscara indica qué parte de la IP identifica la red y qué parte al dispositivo:

```
IP:        192.168.1.10
Máscara:   255.255.255.0  (/24)
Red:       192.168.1.0
Host:      0.0.0.10
```

Los bits a **1** en la máscara marcan la porción de red; los bits a **0** la de host. `255.255.255.0` en binario son 24 unos y 8 ceros → se escribe `/24`.

> 💡 **Analogía:** la IP completa es la dirección postal con ciudad y calle; la máscara es el código postal, que agrupa a todas las IP que viven en el mismo "vecindario" (la misma LAN).

---

## ⚠️ Direcciones especiales

| Dirección | Significado |
|---|---|
| `192.168.1.0` | Dirección de **red** (hosts a 0) |
| `192.168.1.255` | Dirección de **broadcast** (hosts a 1) |
| `192.168.1.1` | Primer host usable (normalmente el gateway) |
| `127.0.0.1` | **Loopback**: tu propio equipo |
| `0.0.0.0` | "Cualquier interfaz" o ruta por defecto |

> 📌 No uses la de red ni la de broadcast para un equipo: "las reserva la propia subred".

---

## 🏢 IP públicas vs privadas

La **IANA** reservó rangos para uso interno (no enrutables en Internet):

| Rango privado | Máscara | Uso típico |
|---|---|---|
| `10.0.0.0/8` | 255.0.0.0 | Grandes empresas |
| `172.16.0.0/12` | 255.240.0.0 | Empresas medianas |
| `192.168.0.0/16` | 255.255.0.0 | Hogar y pequeña oficina |

Las IP privadas se traducen a IP públicas mediante **NAT** (lo verás a fondo en la U11). Por eso aunque millones de hogares usan `192.168.x.x`, en Internet cada uno sale con una IP pública distinta.

---

## 🧭 La analogía completa

```
MAC      = DNI                  → quién eres, no cambia
IP       = dirección postal     → dónde vives, cambia al mudarte
Máscara  = código postal        → delimita tu barrio (tu red)
Puerto   = número de piso       → qué aplicación recibe el mensaje
Gateway  = oficina de correos   → por donde sale tu correo a otras ciudades
DNS      = guía telefónica      → traduce "google.com" en una IP
```

---

## 🔬 Ejemplo resuelto: ¿está mi compañero en mi misma red?

Tu equipo: IP `192.168.1.10` y máscara `255.255.255.0` (/24). Tu compañero: IP `192.168.1.60`.

- Con /24, la parte de red son los 24 primeros bits → tu red es `192.168.1.0`.
- Ambos caen en `192.168.1.0` → **misma red**: pueden comunicarse directamente a través del switch, sin gateway.
- Si el compañero tuviera `192.168.5.60`, su red sería `192.168.5.0` → **red distinta**: haría falta un router, y tu PC dirigiría el paquete al gateway.

| El otro equipo | Su red | ¿Misma red que tú? | Quién interviene |
|---|---|---|---|
| 192.168.1.60 | 192.168.1.0 | Sí | Solo el switch |
| 192.168.5.60 | 192.168.5.0 | No | El router |

---

## 🧠 Mini-chequeo

1. ¿Cuántas direcciones IP utilizables tiene una subred /24?
2. ¿Qué dirección es siempre el loopback y para qué sirve?

<details>
<summary>🔄 Respuestas</summary>

1. Una /24 (`255.255.255.0`) tiene **254 direcciones utilizables** (256 totales menos la de red y la de broadcast).
2. **127.0.0.1**, la dirección de tu propia máquina: sirve para comprobar que la tarjeta de red funciona.

</details>

---

## ✅ Resumen en 3 frases

1. La **MAC** identifica el hardware (capa 2); la **IP** identifica la ubicación en la red (capa 3).
2. La **máscara** separa la parte de red de la de host dentro de la IP.
3. Las direcciones **privadas** se reutilizan por millones de hogares gracias al **NAT**, que las traduce a una IP pública.

> 🐛 **Vocabulario rápido**
>
> | Término | Idea general |
> |---|---|
> | MAC | Matrícula fija en el hardware |
> | IP | Domicilio lógico, cambia según la red |
> | Máscara | Delimita tu red dentro de la IP |
> | Gateway | La puerta de salida hacia otras redes |
> | Loopback | 127.0.0.1: tu propia máquina |
> | Broadcast | Mensaje para todos los de tu red |

📚 [Volver al índice de la unidad](/ApuntesRedes/02-fundamentos-redes) · **Anterior:** [06 · Protocolos](/ApuntesRedes/02-fundamentos-redes/06-protocolos) · **Siguiente:** [08 · Conectividad básica](/ApuntesRedes/02-fundamentos-redes/08-conectividad-basica)