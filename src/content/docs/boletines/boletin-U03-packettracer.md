---
title: Boletín UD3 — Packet Tracer
description: Prácticas guiadas de direccionamiento IP y DHCP en Packet Tracer (y Wireshark) 🖥️
---

# 🖥️ Boletín UD3 — Packet Tracer

> **Variante práctica de nivel único** (no es el par inicial/avanzado). Ocho micro-prácticas de baja dificultad en **Packet Tracer** para que el direccionamiento deje de ser magia: IPs estáticas, DHCP en router, APIPA, un poco de Wireshark (DORA y ARP) y un cierre con IPv6. Ideal tras leer los puntos 1–8 y 16 de la unidad.

> 🧰 **Requisitos:** Cisco Packet Tracer. Wireshark opcional (si no, usa *Simulation mode* y los PDU details de PT).

---

## 1. IP estática: vecinos en la misma subred

Monta **2 PCs + 1 switch**. Asigna `PC0 → 192.168.10.10/24` y `PC1 → 192.168.10.11/24` (IP, máscara y gateway en blanco por ahora). Haz `ping` de `PC0` a `PC1`.

> 💡 **Pista:** si el primer ping pierde un paquete, espera y repite: suele ser el ARP.

## 2. Fallo intencionado: máscara que no toca

Con la misma topología, cambia la máscara de `PC1` a `255.255.255.128` (/25) sin mover la IP. Vuelve a hacer `ping` de `PC0` a `PC1` y explica por qué (o por qué no) responde.

> 💡 **Pista:** calcula la red de cada uno con la operación AND. ¿Siguen siendo vecinos?

## 3. Dos subredes, cero routers

Usa `192.168.10.0/24` en `PC0` y `192.168.20.0/24` en `PC1` (misma capa 2, sin router). Intenta un `ping`. ¿Funciona? ¿Qué ruta intentaría usar cada PC para llegar al otro?

> 💡 **Pista:** mira la tabla de rutas (`route print` en Windows / `netstat -r`) y piensa en el dominio de broadcast.

## 4. DHCP en el router Cisco

Añade un **Router** al switch, conecta G0/0 a la red, dale `192.168.10.1/24` a esa interfaz y configura un pool DHCP en el router (network, default-router, dns-server). Pon las PCs en **DHCP** y comprueba con `ipconfig` que cada una recibe una IP del rango.

> 💡 **Pista:** no olvides `no shutdown` en la interfaz; si la PC se queda en 169.254.x.x, el pool o la interfaz no está como crees.

## 5. APIPA: cuando el DHCP no contesta

Apaga o desconfigura el servicio DHCP del router (o desconecta el router). Renueva la IP de una PC en DHCP y comprueba la dirección que obtiene. ¿Qué rango es? ¿Puede salir a Internet en este laboratorio?

> 💡 **Pista:** el rango lo viste en el punto 1 de la teoría de esta UD.

## 6. Wireshark: el baile DORA

Con el DHCP del router **activo** de nuevo, limpia la configuración de una PC (`ipconfig /release` y `/renew` en Command Prompt) mientras capturas en su interfaz. Filtra `bootp` o `dhcp` y localiza los 4 mensajes.

> 💡 **Pista:** si tu PT no exporta pcap, usa *Simulation mode* filtrando DHCP y lee los tipos de mensaje de cada sobre.

## 7. Wireshark: ARP bajo el ping

Con la topología del ejercicio 1, borra la caché ARP de `PC0` (`arp -d *`) y haz un `ping` a `PC1`. En la captura, separa los **ARP** (0x0806) de los **ICMP**. ¿Qué ocurre primero y por qué?

> 💡 **Pista:** sin MAC destino no se puede encapsular el ICMP en la trama.

## 8. IPv6 en PT: estático o SLAAC

En *Config → IPv6 Configuration* de las PCs, prueba **ambos** caminos: (a) dirección estática `2001:DB8:1::10/64` + gateway; (b) *Autoconfig* / SLAAC si el router anuncia prefijo (habilita `ipv6 unicast-routing` y da una `ipv6 address …/64` a G0/0). Comprueba con `ping` IPv6 entre PCs o hacia el router.

> 💡 **Pista:** recuerda el comando global que no puede faltar en el router (punto 16 de la unidad).

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto UD3 | Punto |
|---|---|---|
| 1 | IP estática y misma subred | 1–2 |
| 2–3 | AND, máscaras, límites de subred | 2, 5–6 |
| 4–5 | DHCP pool, excluded, APIPA | 8 |
| 6 | DORA paso a paso | 8 |
| 7 | ARP (puente UD2→UD3) | 1 |
| 8 | IPv6 estático / SLAAC | 12, 16 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-direccionamiento-ip) · **También:** [Resuelto](/ApuntesRedes/boletines/boletin-u03-packettracer-resuelto)
