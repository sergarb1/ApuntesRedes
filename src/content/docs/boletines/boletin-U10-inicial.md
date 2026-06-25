---
title: Boletín U10 — Inicial
description: Ejercicios básicos de NAT
---

# 📝 Boletín U10 — Inicial

> Ejercicios para practicar los fundamentos de NAT.

---

## 1. ¿Qué es NAT?

Define qué es NAT y por qué es necesario en las redes IPv4 actuales.

<details>
<summary>💡 Pista</summary>
Piensa en la escasez de direcciones IPv4 públicas y cómo una LAN privada accede a Internet.
</details>

## 2. Tipos de NAT

Relaciona cada tipo de NAT con su descripción:

| Tipo | Descripción |
|---|---|
| NAT estático | A. Muchas IPs privadas comparten una IP pública variando puertos |
| NAT dinámico | B. Una IP privada fija se traduce a una IP pública fija |
| PAT | C. Se asigna una IP pública de un pool disponible |

## 3. Configura PAT

Escribe los comandos necesarios para configurar PAT en un router Cisco donde:
- Interfaz LAN: GigabitEthernet 0/0 (192.168.1.1/24)
- Interfaz WAN: GigabitEthernet 0/1 (83.45.12.78/30)
- Red interna: 192.168.1.0/24

## 4. Tabla NAT

Un router NAT muestra la siguiente tabla:

```
Pro Inside global      Inside local       Outside local      Outside global
tcp 83.45.12.78:50001  192.168.1.10:54321  8.8.8.8:53         8.8.8.8:53
tcp 83.45.12.78:50002  192.168.1.20:54321  8.8.8.8:53         8.8.8.8:53
```

a) ¿Cuántos dispositivos están haciendo peticiones DNS?
b) ¿Cuál es la IP pública del router?
c) ¿Qué puerto ha asignado NAT al PC 192.168.1.10?

## 5. Verdadero o falso

a) NAT estático permite que múltiples PCs compartan una IP pública.
b) PAT necesita configurar `ip nat inside` y `ip nat outside`.
c) NAT dinámico traduce siempre la misma IP privada a la misma IP pública.
d) `show ip nat translations` muestra las traducciones activas.

## 6. NAT destino (port forwarding)

Quieres que un servidor web interno (192.168.1.10:80) sea accesible desde Internet en la IP pública 83.45.12.78:80. Escribe los comandos necesarios.
