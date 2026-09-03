---
title: 03 — Rutas estáticas
description: Enseñar al router el camino con ip route y una topología R1-R2 🗺️
---

<p><small>Enseñar al router el camino con ip route y una topología R1-R2 🗺️</small></p>

> 🗺️ **Estás en:** 🧭 **U09 · Routing y ACLs** → 03 · Rutas estáticas

---

## 📬 La idea en una frase

> Una **ruta estática** es un camino que el administrador le escribe al router a mano con `ip route`: no aprende, no se adapta, pero es **predecible, segura y sin consumo de ancho de banda**.

En el punto 2 dejaste al router con sus interfaces y su IP. Pero "tener interfaces" no es "saber llegar a las redes ajenas": el router solo conoce **directamente** las redes conectadas a sus puertos. Para el resto, o le enseñas tú (ruta estática) o que aprenda él (routing dinámico, U10). Aquí mandamos nosotros.

---

## 🧭 La sintaxis: una línea que abre un camino

El verbo mágico es `ip route`, y su forma general es:

```bash
ip route {red_destino} {máscara} {siguiente_salto | interfaz_salida}
```

| Parámetro | Qué es | Ejemplo |
|---|---|---|
| **red_destino** | La red que queremos alcanzar | `192.168.2.0` |
| **máscara** | Su máscara de subred (no una wildcard) | `255.255.255.0` |
| **siguiente_salto** | La IP del router al que entregar el paquete | `10.0.0.2` |
| **interfaz_salida** | Alternativa: salir por una interfaz concreta | `g0/1` (o `serial 0/0/0`) |

> ⚠️ **Ojo de principiante:** en `ip route` la máscara es **la normal** (`255.255.255.0`), no la wildcard que verás en las ACLs. Confundir ambas es la fuente de un boletín entero de fallos.

---

## 🏞️ La topología pomo de la unidad: R1-R2

Todo este punto gira alrededor de dos routers unidos por un enlace WAN:

```
R1 ──── 10.0.0.0/30 ──── R2 ──── Internet
 │                           │
192.168.1.0/24           192.168.2.0/24
```

- **R1** tiene la LAN1 (192.168.1.0/24) y el enlace (10.0.0.0/30) con IP `10.0.0.1`.
- **R2** tiene la LAN2 (192.168.2.0/24) y el enlace con IP `10.0.0.2`, además de su salida a Internet.

Con solo sus interfaces, **R1 no sabe nada de 192.168.2.0/24** y **R2 no sabe nada de 192.168.1.0/24**. Hay que contárselo a los dos. Nota que el enlace /30 solo tiene dos IPs utilizables: `10.0.0.1` y `10.0.0.2`. Justo para un punto a punto.

---

## 📝 Los ejemplos que hay que entender (y no copiar a lo bruto)

```bash
# En R1: para llegar a la LAN de R2
R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2

# En R2: para llegar a la LAN de R1
R2(config)# ip route 192.168.1.0 255.255.255.0 10.0.0.1
```

Fíjate en el patrón: **red destino + máscara + la IP del vecino**. No ponemos la LAN de cada uno (esa ya la conoce por tener su interfaz dentro). Ponemos la red *ajena* y decimos "mételo por este muñeco".

Y el último recurso, la ruta hacia fuera:

```bash
# En R1: TODO lo que no tenga ruta concreta, que salga por el vecino
R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2   # Default (punto 4)

# En R2: hacia el ISP, usando interfaz de salida
R2(config)# ip route 0.0.0.0 0.0.0.0 serial 0/0/0
```

El `0.0.0.0 0.0.0.0` es la **ruta por defecto**: atrapa todo lo que no tenga un camino más específico. En el punto 4 la trituramos a fondo.

---

## ⚖️ Next-hop vs interfaz de salida: ¿cuándo uso cada uno?

| Opción | Comando | Cuándo usarla |
|---|---|---|
| **Siguiente salto (next-hop)** | `ip route X.X.X.X MASK 10.0.0.2` | Lo normal: apunta a la IP del router vecino |
| **Interfaz de salida** | `ip route X.X.X.X MASK g0/1` | Enlaces punto a punto (serial), cuando no hay otra IP en el enlace |

¿Cuál elegir? La regla de convivencia pacífica:

- Para **redes Ethernet** (GigabitEthernet), usa **next-hop**: si pones solo la interfaz, el router hará ARP por cada destino (o fallará al responder), algo chapucero.
- Para **enlaces seriales punto a punto**, da igual o incluso mejor la **interfaz de salida**, porque solo existen dos extremos en el enlace.

> 💡 **CONRAD:** "El next-hop es el conductor al que le das la llave. La interfaz es decir 'sal de la cochera' sin saber quién te va a coger el paquete. En Ethernet, da la llave."

---

## 🔎 Verificación: show ip route

Configurar sin mirar es rezar. Después de tus rutas, `show ip route` es el espejo de la verdad:

```bash
R1# show ip route
     10.0.0.0/30 is subnetted, 1 subnets
C       10.0.0.0/30 is directly connected, GigabitEthernet0/1
L       10.0.0.1/32 is directly connected, GigabitEthernet0/1
     192.168.1.0/24 is directly connected, GigabitEthernet0/0
C       192.168.1.0/24 is directly connected, GigabitEthernet0/0
L       192.168.1.1/32 is directly connected, GigabitEthernet0/0
S       192.168.2.0/24 [1/0] via 10.0.0.2
```

Lo que debes saber leer:

| Código | Tipo de ruta | Quién la crea |
|---|---|---|
| **C** | Conectada | La interfaz con IP y `no shutdown` |
| **L** | Local | La propia IP de la interfaz |
| **S** | Estática | Tu comando `ip route` |
| **D / O / R** | Dinámicas (EIGRP/OSPF/RIP) | Protocolos de routing (U10) |

La línea `S 192.168.2.0/24 [1/0] via 10.0.0.2` significa: ruta **S**tática hacia la LAN de R2, con **distancia administrativa [1]** y métrica [0], que se alcanza vía el vecino `10.0.0.2`. Si no aparece ninguna `S`, comprueba: ¿la IP de la interfaz está bien?, ¿el vecino es alcanzable?, ¿la máscara es correcta?

Para una comprobación rápida:

```bash
R1# show ip route 192.168.2.0     → Solo esa ruta
R1# show ip route static          → Solo las estáticas
R1# show ip route connected       → Solo las conectadas
```

---

## 🧠 Mini-chequeo

1. Escribe la ruta para que R1 llegue a la red 172.16.5.0/24 a través de 10.0.0.2.
2. ¿Qué diferencia hay entre usar `10.0.0.2` y usar `g0/1` como siguiente salto?
3. En `show ip route`, ¿qué significan las letras `C`, `L` y `S`?

<details>
<summary>🔄 Respuestas</summary>

1. `ip route 172.16.5.0 255.255.255.0 10.0.0.2`.
2. `10.0.0.2` es el **next-hop**: se entrega al router vecino. `g0/1` es la **interfaz de salida**: se reenvía por el puerto (típico en enlaces punto a punto). En Ethernet se prefiere el next-hop.
3. **C** = conectada (red directamente en una interfaz), **L** = local (la IP del propio puerto), **S** = estática (la que configuras con `ip route`).
</details>

---

## ✅ Resumen en 3 frases

- Una ruta estática se escribe con `ip route red máscara {next-hop | interfaz}` y **no se adapta por sí sola** a los cambios de la red.
- En Ethernet se usa el **next-hop**; en enlaces punto a punto, la interfaz de salida.
- `show ip route` es tu espejo: una `S` aparecida significa camino aprendido; sin `S`, revisa vecino, máscara y `no shutdown`.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Ruta estática | Camino escrito a mano con `ip route` |
| Next-hop | IP del siguiente router al que entregar el paquete |
| Interfaz de salida | Puerto por el que reenviar (típico en seriales) |
| Ruta conectada (C) | Red directamente unida a una interfaz del router |
| Ruta local (L) | La IP propia de la interfaz |
| `show ip route` | Muestra la tabla de rutas y sus códigos |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-acls) · **Anterior:** [02 · Configuración básica](/ApuntesRedes/09-routing-acls/02-configuracion-basica) · **Siguiente:** [04 · Ruta por defecto](/ApuntesRedes/09-routing-acls/04-ruta-por-defecto)