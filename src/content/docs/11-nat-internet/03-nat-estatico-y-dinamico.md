---
title: 03 — NAT estático y dinámico
description: El 1:1 fijo y el pool de IPs públicas 🎯
---

<p><small>El 1:1 fijo y el pool de IPs públicas 🎯</small></p>

> 🗺️ **Estás en:** 🌐 U11 → 03 · NAT estático y dinámico

---

## 📬 La idea en una frase

> **NAT estático** casa una IP privada con una pública para siempre (1:1 fijo); **NAT dinámico** reparte IPs públicas de un pool entre quien las necesita en ese momento.

Ambos son **NAT de origen** (traducen a quien sale). La diferencia es el compromiso: estático es un matrimonio blindado, dinámico es una flota de coches de empresa que se reparte según demanda. Son los dos tipos "clásicos" de la lista del [punto 2](/ApuntesRedes/11-nat-internet/02-tipos-de-nat), y aunque hoy PAT se los come en popularidad, siguen apareciendo en exámenes y en redes bien planificadas.

---

## 🔒 NAT estático (1:1)

Cada IP privada tiene una traducción **permanente** hacia una IP pública. La entrada vive en la tabla NAT desde que se configura, sin caducar.

```
192.168.1.10  ←──siempre──→  83.45.12.78
```

**¿Para qué se usa?** Para equipos que deben ser siempre accesibles desde fuera con la misma IP: un servidor web, un servidor de correo, un equipo de gestión. Como la traducción es fija, el exterior siempre encuentra el mismo "número de puerta".

### Configuración en Cisco

```bash
R1(config)# ip nat inside source static 192.168.1.10 83.45.12.78
R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside
```

Fíjate en la estructura del comando: *`ip nat inside source static <IP privada> <IP pública>`*. El orden importa: primero lo que hay *dentro* y luego su equivalente *fuera*.

### La entrada en la tabla

```
Pro  Inside global      Inside local       Outside local      Outside global
---  83.45.12.78        192.168.1.10       ---                ---
```

Como es una traducción fija, la entrada no caduca: estará ahí mientras la regla exista. Eso también significa que **ocupa una IP pública entera para un solo equipo**: es el tipo más caro en direcciones.

---

## 🎡 NAT dinámico (pool)

En lugar de una pareja fija, defines un **pool** de IPs públicas (ej. 83.45.12.78-83.45.12.81). Cuando un equipo interno quiere salir, el router le asigna una de esas IPs mientras dure su conexión; cuando termina, la devuelve al pool.

```
Usuarios          Pool público disponible
192.168.1.10  →   83.45.12.78
192.168.1.20  →   83.45.12.79
192.168.1.30  →   83.45.12.80   (el .81 queda libre hasta que haga falta)
```

**Ventaja:** no necesitas una pública por equipo, solo tantas como conexiones simultáneas quieras permitir. **Limitación:** no sirve para servicios entrantes —como la traducción cambia al vuelo, nadie externo sabe qué IP pública corresponde a cada servidor.

### Configuración en Cisco

```bash
R1(config)# ip nat pool PUBLICO 83.45.12.78 83.45.12.81 netmask 255.255.255.252
R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255
R1(config)# ip nat inside source list 1 pool PUBLICO
R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside
```

La **access-list** define *quién* puede traducirse (la red 192.168.1.0/24) y el **pool** define *con qué* IPs públicas. Si el pool se agota, los siguientes equipos se quedan sin salida hasta que se libere una dirección.

---

## ⚖️ Comparativa rápida

| Aspecto | NAT estático | NAT dinámico |
|---|---|---|
| Relación IP | 1:1 permanente | Muchos:a-pocos, temporal |
| ¿Sirve para servicios entrantes? | Sí, siempre en la misma IP | No, la IP cambia |
| Entrada en la tabla NAT | Fija, no caduca | Se crea/borra con la conexión |
| Coste en IPs públicas | 1 pública por equipo | Un pool para toda la LAN |
| Uso típico | Servidores | Tráfico saliente con varias IPs |

> ⚠️ **Error clásico:** confundir "dinámico" con "PAT". NAT dinámico traduce la **IP** desde un pool; PAT además traduce los **puertos** para que muchos equipos compartan UNA misma IP. Si PAT te suena a magia, el siguiente punto es tuyo.

---

## 🧠 Mini-chequeo

1. Un servidor web debe recibir tráfico externo siempre en la misma IP pública. ¿NAT estático o dinámico?
2. ¿Por qué NAT dinámico no sirve para servicios entrantes?
3. ¿Qué ocurre si el pool de NAT dinámico se agota?

<details>
<summary>🔄 Respuestas</summary>

1. **NAT estático**: la traducción fija 1:1 garantiza que el exterior siempre encuentra el servidor en la misma IP pública.
2. Porque la IP pública asignada **cambia con cada conexión**: nadie externo puede "apuntar" a un servidor que no tiene dirección estable.
3. Los equipos que intenten salir **se quedan sin traducción** (y sin acceso externo) hasta que una conexión termine y libere una IP del pool.
</details>

---

## ✅ Resumen en 3 frases

- **NAT estático** casa una IP privada con una pública para siempre: ideal para servidores entrantes.
- **NAT dinámico** reparte IPs de un pool al vuelo: útil para salir con varias públicas, pero inútil para servicios entrantes.
- Ambos traducen solo la **IP**; cuando necesites que cientos de equipos compartan una sola pública, necesitas **PAT** (siguiente punto).

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| NAT estático | Traducción fija 1:1 privada ↔ pública |
| NAT dinámico | Asignación temporal de IPs de un pool |
| Pool | Rango de IPs públicas disponibles |
| ip nat inside source static | Comando Cisco de NAT estático |
| Access-list (NAT) | Define qué tráfico se traduce |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-nat-internet) · **Anterior:** [02 · Tipos de NAT](/ApuntesRedes/11-nat-internet/02-tipos-de-nat) · **Siguiente:** [04 · PAT (sobrecarga)](/ApuntesRedes/11-nat-internet/04-pat)