---
title: Boletín U11 — Inicial
description: Ejercicios básicos de NAT
---

# 📝 Boletín U11 — Inicial

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

## 7. ¿Qué tipo de NAT es?

Identifica el tipo de NAT que se aplica en cada escenario:

| Escenario | Tipo de NAT |
|---|---|
| a) El servidor web de la empresa (192.168.1.10) siempre sale a Internet como 83.45.12.78 | |
| b) La oficina tiene un pool de 4 IPs públicas (83.45.12.78-81) y cada usuario toma una al salir | |
| c) 300 alumnos de un instituto salen todos por la misma IP pública del router | |
| d) Un cliente de Internet visita 83.45.12.78:8080 y llega al servidor interno 192.168.1.10:80 | |

**Pista:** recuerda la tabla de tipos del punto 2 de la unidad: estático (1:1 fijo), dinámico (pool), PAT (muchos:1 con puertos) y destino (puerto público → IP:puerto interno).

## 8. Lee la tabla NAT

El router muestra esta tabla:

```
Pro Inside global      Inside local       Outside local      Outside global
tcp 83.45.12.78:60001  192.168.1.10:54321  8.8.8.8:53         8.8.8.8:53
tcp 83.45.12.78:60002  192.168.1.20:54321  8.8.8.8:53         8.8.8.8:53
tcp 83.45.12.78:60003  192.168.1.30:49152  142.250.184.4:443  142.250.184.4:443
```

a) ¿Cuántas conexiones hay activas y de qué tipo de tráfico?
b) ¿Qué puerto efímero original usaba el PC 192.168.1.30?
c) ¿Por qué dos PCs pueden usar el mismo puerto origen (54321) sin conflicto?
d) ¿A qué servicio destino van las dos primeras conexiones? ¿Y la tercera?

**Pista:** los puertos efímeros (49152-65535) los elige cada PC; NAT añade un puerto global único por conexión (60001, 60002…) para desambiguar. Fíjate en la columna *Outside local* para saber el destino.