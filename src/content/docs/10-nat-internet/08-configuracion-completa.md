---
title: 08 — Configuración completa
description: El laboratorio NAT completo de principio a fin 🛠️
---

<p><small>El laboratorio NAT completo de principio a fin 🛠️</small></p>

> 🗺️ **Estás en:** 🌐 U10 → 08 · Configuración completa

---

## 📬 La idea en una frase

> Este punto junta **todo** lo aprendido en un único escenario: PAT para que la LAN salga a Internet, NAT destino para exponer un servidor, y la verificación de que cada traducción funciona — el mismo montaje que repetirás en el ⚡ Laboratorio del cierre.

Ya tienes las piezas: el concepto (punto 1), los tipos (2), estático y dinámico (3), PAT (4), port forwarding (5) y verificación (6). Ahora toca el montaje real: un router Cisco en Packet Tracer, una LAN, un servidor web y el mundo exterior.

---

## 🏗️ Escenario del laboratorio

```
          ┌─────────────┐      g0/1      ┌────────────────┐
  PC1 ────┤             │  203.0.113.1   │   ISP / WAN     │
  PC2 ────┤  R1 g0/0    ├────────────────┤   Internet      │
  PC3 ────┤  192.168.1.1│                └────────────────┘
  WEB ────┤  192.168.1.10 (servidor)
          └─────────────┘
```

| Elemento | Dirección | Papel |
|---|---|---|
| R1 g0/0 (LAN) | 192.168.1.1/24 | Interfaz `inside` |
| R1 g0/1 (WAN) | 203.0.113.1/30 | Interfaz `outside`, IP pública |
| PC1, PC2, PC3 | 192.168.1.10, .20, .30 | Equipos que salen por PAT |
| Servidor web | 192.168.1.10:80 | Servicio a exponer al exterior |

> ⚠️ **Detalle que confunde:** PC1 y el servidor web comparten IP en este guion (192.168.1.10). En un montaje real serían equipos distintos; aquí los separamos en los pasos para que veas las dos caras de NAT por separado. Si quieres ser estricto, usa 192.168.1.10 para el servidor y .11-.13 para los PCs.

---

## 🧩 Paso 1: PAT para toda la LAN

Los tres PCs salen a Internet compartiendo la IP pública de la interfaz WAN:

```bash
R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255
R1(config)# ip nat inside source list 1 interface g0/1 overload
```

La access-list define *quién* (la red 192.168.1.0/24) y `interface g0/1 overload` define *con qué* (la IP de la WAN, reutilizada con puertos). Este es el PAT del punto 4.

## 🧩 Paso 2: NAT destino para el servidor web

Queremos que desde fuera se acceda a la IP pública en el puerto 80 y llegue al servidor interno:

```bash
R1(config)# ip nat inside source static tcp 192.168.1.10 80 203.0.113.1 80
```

Un cliente externo que visite `http://203.0.113.1` llegará al servidor web de la LAN. (En la vida real esa IP pública la asigna el ISP; aquí es la de g0/1.)

## 🧩 Paso 3: marca las interfaces (¡el paso que se olvida!)

NAT necesita saber qué interfaz es *inside* y cuál *outside*. Sin esto, **nada de lo anterior funciona**:

```bash
R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside
```

> 💡 **Reflexión:** mira cuántos "grandes" comandos de NAT hay (access-list, overload, static…) y cuán pequeño es este. Es el ejemplo perfecto de que en redes lo importante no es lo complejo, sino lo que **falta**.

## 🧩 Paso 4: verificación

Genera tráfico (un ping o una web desde PC1) y comprueba:

```bash
R1# show ip nat translations          → ¿aparecen entradas?
R1# show ip nat statistics            → ¿suben los Hits?
R1# debug ip nat                     → ¿ves traducir en directo?
```

Salida esperada tras navegar desde PC1:

```
Pro  Inside global      Inside local       Outside local      Outside global
tcp  203.0.113.1:60001  192.168.1.11:54321  8.8.8.8:80         8.8.8.8:80
tcp  203.0.113.1:60002  192.168.1.12:54321  8.8.8.8:80         8.8.8.8:80
tcp  203.0.113.1:80     192.168.1.10:80     ---                ---
```

Fíjate: las dos primeras filas son **dinámicas** (PAT, de los PCs) y la tercera es **estática** (NAT destino, del servidor). Aprende a distinguirlas de un vistazo: las estáticas no tienen "Outside".

## 🧹 Paso 5: limpieza

Al terminar las pruebas, vacía las traducciones dinámicas:

```bash
R1# clear ip nat translation *
```

> ⚠️ **Ojo:** `clear ip nat translation *` borra las entradas **dinámicas**, pero las **estáticas** (NAT destino) se recrean solas, porque viven en la configuración.

---

## 💥 El fallo intencionado de la unidad

El escenario viene con una trampa oculta (la encontrarás también en el ⚡ Laboratorio del cierre):

> **Olvida `ip nat inside` en la interfaz LAN y `ip nat outside` en la WAN.**

¿Qué ocurre? **NAT no traduce nada.** Los comandos de traducción existen, la access-list es correcta, el overload está puesto... pero el router no sabe qué tráfico es interno y cuál externo, así que no sabe qué paquetes debe traducir. La tabla NAT permanece vacía (`show ip nat translations` sin salida) y los PCs no salen a Internet.

**El diagnóstico (de la práctica de U11):**

```
1. ¿Ping al gateway?            → sí
2. ¿Ping a la IP de la WAN?     → sí
3. ¿Ping a 8.8.8.8?             → no
4. show ip nat translations     → VACÍA ← pista principal
5. show ip nat statistics       → misses sin hits
6. Revisar interfaces           → ¡falta ip nat inside/outside!
```

Cuando la tabla está vacía con tráfico circulando, el sospechoso número uno es la marca de interfaces. Es el fallo más repetido en la historia de NAT y, por eso, el que debes aprender a cazar.

---

## 🧠 Mini-chequeo

1. Escribe el orden completo de configuración de NAT para el escenario del laboratorio.
2. ¿Cómo distingues una entrada estática de una dinámica en `show ip nat translations`?
3. Un compañero configuró todo "igual" que tú y no sale a Internet. La tabla NAT está vacía. ¿Qué miras primero?

<details>
<summary>🔄 Respuestas</summary>

1. 1) access-list para la red interna → 2) `ip nat inside source list 1 interface g0/1 overload` → 3) NAT destino con `ip nat inside source static tcp ...` → 4) `ip nat inside` en g0/0 y `ip nat outside` en g0/1.
2. Las **estáticas** no muestran columnas *Outside* (la traducción es global y permanente); las **dinámicas** (PAT) muestran puertos en *Inside global* y destino completo.
3. **Comprobar `ip nat inside`/`ip nat outside` en las interfaces.** Tabla vacía + tráfico = marca de interfaces (o access-list mal escrita) como sospechoso principal.
</details>

---

## ✅ Resumen en 3 frases

- El montaje completo es: access-list + PAT overload + NAT destino + **marcas inside/outside** en las interfaces.
- La verificación se hace con `show ip nat translations`, `show ip nat statistics` y `debug ip nat`.
- El fallo estrella de la unidad es **olvidar `ip nat inside/outside`**: la tabla queda vacía y nada traduce, aunque el resto esté perfecto.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Inside / Outside | Marcas de interfaz que indican a NAT qué tráfico traducir |
| Overload | Activa PAT sobre la IP de la interfaz WAN |
| Entrada estática | Traducción fija en la tabla (no tiene columna Outside) |
| Entrada dinámica | Traducción temporal creada por PAT/pool |
| clear ip nat translation * | Vaciar las traducciones dinámicas |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-nat-internet) · **Anterior:** [07 · Problemas y soluciones](/ApuntesRedes/10-nat-internet/07-problemas-y-soluciones) · **Siguiente:** [09 · Cierre](/ApuntesRedes/10-nat-internet/09-cierre)