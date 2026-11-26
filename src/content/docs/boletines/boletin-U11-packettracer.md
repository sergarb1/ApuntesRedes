---
title: Boletín de ACLs y seguridad de red — Packet Tracer
description: Prácticas guiadas de ACLs, VTY y port security en Packet Tracer 🖥️
---

> **Variante práctica de nivel único** (no es el par inicial/avanzado). Ocho micro-prácticas de baja dificultad en **Packet Tracer** para poner porteros a la red: ACL estándar, wildcards, ACL extendida y nombrada, protección de las líneas VTY y port security en el switch. Tres de ellas llevan un **fallo intencionado** que tienes que diagnosticar. Ideal tras leer los puntos 1–5 de la unidad.

> 🧰 **Requisitos:** Cisco Packet Tracer. Necesitas 1 switch (`2960`), 2 routers (`2911`), 3 PCs y 1 Server (con el servicio **HTTP** activo). Necesitarás además un **hub** o un segundo switch para el ejercicio 8. El resuelto está justo al lado: úsalo solo cuando te atasques.

---

## 📋 Direccionamiento de la práctica

| Equipo | Interfaz | IP / máscara | Para qué |
|---|---|---|---|
| R1 | G0/0 | 192.168.1.1/24 | LAN1 (hacia SW1) |
| R1 | G0/1 | 10.0.0.1/30 | Enlace con R2 |
| R2 | G0/0 | 10.0.0.2/30 | Enlace con R1 |
| R2 | G0/1 | 192.168.2.1/24 | LAN2 (hacia SRV1) |
| PC1 | Fa0 | 192.168.1.10/24 · gw .1 | Usuario normal |
| PC2 | Fa0 | 192.168.1.20/24 · gw .1 | Usuario normal |
| ADMIN | Fa0 | 192.168.1.50/24 · gw .1 | Administrador (con permiso especial) |
| SRV1 | Fa0 | 192.168.2.10/24 · gw .1 | Servidor web de la LAN2 |
| SW1 | Fa0/1 · Fa0/2 · Fa0/3 | — | PC1 · PC2 · ADMIN |
| SW1 | Fa0/24 | — | Enlace con R1 G0/0 |

**Topología:** `SW1 — R1 — R2 — SRV1`, con los tres PCs colgando de SW1.

---

## 1. La red en pie, y una web que abre

Monta la topología con el direccionamiento de la tabla: interfaces en los dos routers, IPs estáticas en los PCs y en SRV1, y las dos rutas estáticas (cada router hacia la LAN del otro). Activa el servicio **HTTP** en SRV1 y crea un `index.html` sencillo desde *Services → HTTP*.

Comprueba en el navegador de `PC1` que abre `http://192.168.2.10` y que el `ping` también responde.

> 💡 **Pista:** si el navegador no abre pero el ping sí, el problema no es de red: revisa que el servicio HTTP esté *ON* en SRV1.

## 2. ACL estándar: echar a PC1 de la LAN2

Crea una ACL estándar numerada `10` que **deniegue solo a `PC1`** (`192.168.1.10`) y permita el resto, y aplícala en R2 **de salida** hacia la LAN2 (`G0/1 out`).

Prueba desde `PC1` y desde `PC2` un `ping` a SRV1, y mira el contador de la ACL con `show access-lists`.

> 💡 **Pista:** la ACL estándar solo mira la **IP de origen**. `deny host 192.168.1.10` + `permit any` es todo lo que necesitas. Si el ping sigue funcionando, comprueba en qué interfaz y en qué dirección la has aplicado.

## 3. Wildcards: solo pasa la mitad de la LAN

Sustituye la ACL anterior por una `20` que permita **solo el rango `192.168.1.16`–`192.168.1.31`** y deniegue el resto. Aplícala otra vez en `R2 G0/1 out`.

Prueba los tres PCs: `PC1` (`.10`), `PC2` (`.20`) y `ADMIN` (`.50`). Explica por qué pasa exactamente uno.

> 💡 **Pista:** el rango `.16`–`.31` es un bloque de 16 direcciones: red `192.168.1.16` y wildcard `0.0.0.15`. La wildcard marca los bits que **no** importan.

## 4. Fallo 1: el orden de las líneas

Crea una ACL extendida `101` en R1 con estas dos líneas **en este orden** y aplícala en `G0/1 out`:

```
deny ip any any
permit tcp host 192.168.1.10 host 192.168.2.10 eq 80
```

Prueba el navegador y el `ping` desde `PC1` y desde `PC2`. Después mira `show access-lists 101` y explica qué contador sube.

Arréglalo dejando el `permit` por delante del `deny`.

> 💡 **Pista:** una ACL se lee **de arriba abajo y se detiene en la primera coincidencia**. Si el `deny ip any any` está arriba, el `permit` de abajo es decoración: no se evalúa nunca.

## 5. ACL extendida: bloquear la web, no la red

En R1, crea la ACL extendida `103` que **deniegue HTTP** desde toda la LAN1 hacia SRV1 (`192.168.2.10`, puerto 80) y permita el resto. Aplícala en `R1 G0/1 out`.

Comprueba que el navegador de `PC1` ya no abre la web **pero el `ping` sigue funcionando**, y que `PC2` tampoco puede navegar. ¿Por qué no necesitas un `deny` para el resto del tráfico?

> 💡 **Pista:** `deny tcp 192.168.1.0 0.0.0.255 host 192.168.2.10 eq 80` + `permit ip any any`. El `eq 80` es lo que convierte un bloqueo total en un bloqueo **solo de web**.

## 6. Fallo 2: la ACL en el sitio equivocado

Quita la ACL de `G0/1` y aplícala, tal cual, en `R1 G0/0` de salida (`ip access-group 103 out`). Vuelve a probar el navegador desde `PC1`.

¿Se bloquea algo? Diagnostica con `show ip interface g0/0`, `show ip interface g0/1` y `show access-lists 103`, y devuélvela a su sitio.

> 💡 **Pista:** `G0/0 out` filtra lo que el router **envía hacia los PCs**, no lo que los PCs envían hacia la LAN2. Si los contadores de la ACL están a cero, la ACL no está viendo ese tráfico: no es que esté mal escrita, es que está en otra puerta.

## 7. ACL nombrada y VTY: el admin sí, los demás no

Crea una ACL extendida **nombrada** `WEB_SOLO_ADMIN` en R1 con estas reglas, en este orden: permitir HTTP desde `ADMIN` (`192.168.1.50`) a SRV1, denegar HTTP desde cualquier origen a SRV1 y permitir todo lo demás. Aplícala en `G0/1 out` y prueba el navegador desde los tres PCs.

Después protege la administración del router: una ACL estándar `5` que permita **solo a ADMIN** y se aplique a las líneas `vty 0 4` con `access-class 5 in`. Necesitarás `enable secret` y una contraseña de línea para entrar por telnet. Prueba el telnet desde `PC1` y desde `ADMIN`.

> 💡 **Pista:** el `permit` del admin tiene que ir **antes** del `deny`; si no, el administrador entra en el mismo saco que todos. Para las VTY, `access-class` (no `access-group`) es el comando de las líneas.

## 8. Fallo 3 + reto: port security y el puerto en errdisable

En SW1, protege el puerto de `PC1` (`Fa0/1`) con port security: máximo **1** MAC, `sticky` y violación `shutdown`. Comprueba con `show port-security interface fa0/1` que ha aprendido la MAC de PC1.

Ahora desconecta `PC1` y conecta `PC2` en ese mismo puerto (o mete un hub con los dos). El puerto se apaga: **errdisable**.

Diagnostica qué ha pasado, intenta recuperarlo con `shutdown` / `no shutdown` y explica por qué vuelve a caer. Encuentra la recuperación correcta y deja el puerto funcionando con `PC1` otra vez.

> 💡 **Pista:** la MAC sticky **no caduca**: se queda en la configuración aunque desconectes el equipo. Al enchufar otro, el puerto ve dos MACs donde solo permite una. Mira `show port-security interface fa0/1` (sección *Sticky MAC Addresses*) y `show mac address-table secure` antes de tocar nada.

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto | Punto |
|---|---|---|
| 1 | Base de red y servicio HTTP | 1 |
| 2 | ACL estándar y colocación | 2–3 |
| 3 | Wildcards | 3 |
| 4 | Orden de evaluación (fallo) | 1–2 |
| 5 | ACL extendida con puertos | 4 |
| 6 | ACL en la interfaz equivocada (fallo) | 1, 4 |
| 7 | ACL nombrada y `access-class` en VTY | 4 |
| 8 | Port security, errdisable y MAC sticky (fallo) | 5 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-acl-seguridad) · **También:** [Resuelto](/ApuntesRedes/boletines/boletin-u11-packettracer-resuelto)
