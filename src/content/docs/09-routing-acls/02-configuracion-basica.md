---
title: 02 — Configuración básica
description: Modos CLI, primeros comandos y la configuración mínima de un router 🛠️
---

<p><small>Modos CLI, primeros comandos y la configuración mínima de un router 🛠️</small></p>

> 🗺️ **Estás en:** 🧭 **U09 · Routing y ACLs** → 02 · Configuración básica

---

## 📬 La idea en una frase

> Antes de que un router enrute una sola cosa, hay que **darle nombre, protegerlo y ponerle IPs a sus interfaces**: eso es la configuración básica, y se hace desde la **CLI** mediante modos con distinto nivel de privilegio.

En el punto 1 viste de qué está hecha la caja. Ahora toca encenderla y hablarle. Y se le habla por **línea de comandos**, organizada en modos: a más poder, más cuidado. Este es el punto donde todo empieza a escribirse como en el mundo real.

---

## 🧭 Los modos CLI: la escalera de privilegios

La CLI de Cisco es una escalera. Empiezas abajo y subes según lo que quieras hacer. Cada modo tiene su propio *prompt* —fíjate en que el prompt siempre te dice dónde estás:

| Modo | Prompt | Comando para entrar | Qué puedes hacer |
|---|---|---|---|
| Usuario | `Router>` | acceso directo | Ver cosas básicas, poco más |
| Privilegiado | `Router#` | `enable` | Todos los `show`, debug básicos |
| Configuración global | `Router(config)#` | `configure terminal` | Cambios que afectan al equipo entero |
| Configuración de interfaz | `Router(config-if)#` | `interface g0/0` | Puertos: IP, shutdown, descripción |
| Configuración de línea | `Router(config-line)#` | `line console 0` | Consola y VTY (acceso remoto) |

Dos reglas que CONRAD repite hasta la saciedad:

- El **prompt te delata**: si no ves `(config)`, no estás configurando; estás mirando.
- Casi todo lo que configures se escribe con **verbos en minúscula y en varios pasos**. No es Windows: no hay menús, hay palabras.

---

## 🔐 Configuración mínima: hostname y contraseñas

Esto es lo primero que hace cualquier administrador con un router recién sacado de la caja. Configuración minimalista pero con cabeza:

```bash
Router> enable
Router# configure terminal
Router(config)# hostname R1
R1(config)# enable secret MiClaveSegura

R1(config)# line console 0
R1(config-line)# password consola123
R1(config-line)# login
R1(config-line)# exit

R1(config)# line vty 0 4
R1(config-line)# password ssh123
R1(config-line)# login
R1(config-line)# transport input ssh

R1(config)# interface gigabitethernet 0/0
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# no shutdown
R1(config-if)# description LAN Oficina

R1(config)# interface gigabitethernet 0/1
R1(config-if)# ip address 10.0.0.1 255.255.255.252
R1(config-if)# no shutdown
R1(config-if)# description WAN Enlace R1-R2

R1(config)# ip route 0.0.0.0 0.0.0.0 10.0.0.2
R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2
```

Desmenucemos lo importante:

- `enable secret MiClaveSegura`: la contraseña para pasar a modo privilegiado, **almacenada cifrada**. Nunca uses `enable password`, que viaja en claro.
- `line console 0`: protege el puerto de consola (el cable físico). `password` + `login` obliga a pedirla.
- `line vty 0 4`: las 5 sesiones de **acceso remoto** (telnet/SSH). `transport input ssh` hace que SOLO acepte SSH, no telnet. Seguridad barata y muy efectiva.
- `no shutdown`: sin esto, la interfaz queda *administratively down* y el enlace no funciona. La mitad de los "no me enruta nada" del mundo vienen de aquí.

Ves arriba `192.168.1.1/24` en G0/0 (tu LAN) y `10.0.0.1/30` en G0/1 (el enlace hacia el otro router). Las rutas `ip route` ya las configuré para adelantar el punto 3 — no corras todavía.

---

## 🌐 Las interfaces: IP, descripción y no shutdown

Cada interfaz es un "hueco de red" del router. El patrón es siempre el mismo:

```
interface <tipo><nº>
 ip address <IP> <máscara>
 description <para qué sirve>
 no shutdown
```

| Comando | Efecto |
|---|---|
| `ip address 192.168.1.1 255.255.255.0` | Le da la IP al puerto en la red 192.168.1.0/24 |
| `description LAN Oficina` | Una nota para que tú (y tu yo del futuro) sepas qué va conectado ahí |
| `no shutdown` | Enciende la interfaz a nivel administrativo |
| `shutdown` | La apaga (útil para aislar un puerto) |

> 💡 **Detalle de examen:** la *encapsulación* de un enlace serie también se configura en la interfaz (p. ej. `encapsulation ppp`), pero en los routers modernos GigabitEthernet ya viene con su encapsulación por defecto.

---

## 🔎 Comandos de verificación: la prueba del algodón

No has terminado hasta que lo **verificas**. La familia `show` + un `ping`/`traceroute` te cuentan si lo que configuraste está vivo:

```bash
R1# show ip interface brief     → Resumen de interfaces (IP, estado, protocolo)
R1# show ip route               → Tabla de rutas
R1# show interfaces             → Estadísticas detalladas
R1# ping 192.168.2.1            → Prueba conectividad
R1# traceroute 8.8.8.8          → Traza la ruta hasta el destino
```

| Comando | Qué detecta |
|---|---|
| `show ip interface brief` | G0/1 aparece `administratively down` si olvidaste `no shutdown` |
| `show ip route` | Si una ruta no está instalada, no aparecerá (lo verás en el punto 3) |
| `ping 192.168.2.1` | Si responde `!!!!`, hay conectividad; `.....` es silencio total |
| `traceroute 8.8.8.8` | Cada `*` o salto te dice hasta dónde llega el tráfico antes de perderse |

> ⚠️ **CONRAD:** "Ping del 80% de los problemas resueltos: `show ip interface brief` + `ping`. Si los dos están bien y sigue sin ir, entonces empieza a llorar."

---

## 🧠 Mini-chequeo

1. ¿Qué comando te cambia al modo que muestra el prompt `R1(config-if)#`?
2. Acabas de ver en `show ip interface brief` que G0/1 está `administratively down`. ¿Qué falta en su configuración?
3. ¿Por qué en las líneas VTY escribimos `transport input ssh`?

<details>
<summary>🔄 Respuestas</summary>

1. `configure terminal` entra en configuración global (`config#`), y desde ahí `interface g0/1` te baja a `config-if#`.
2. El `no shutdown` (o la interfaz está apagada con `shutdown`). Adminstrativamente abajo = el router la tiene apagada por configuración.
3. Para que el acceso remoto acepte **solo SSH** y no telnet: la contraseña viaja cifrada y nadie puede entrar en claro.
</details>

---

## ✅ Resumen en 3 frases

- La CLI se organiza en **modos** y el *prompt* te dice en cuál estás (`#`, `(config)#`, `(config-if)#`…).
- La configuración mínima es **hostname + enable secret + consola/vty con SSH + IPs en interfaces con `no shutdown`**.
- Tienes que **verificar** con `show ip interface brief`, `ping` y `traceroute`: configurar y no comprobar es lanzar un dado.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| CLI | Interfaz de línea de comandos: la forma de configurar el router |
| Prompt | Texto que indica el modo actual (`Router#`, `R1(config-if)#`) |
| VTY | Líneas de acceso remoto (telnet/SSH) del router |
| `no shutdown` | Enciende una interfaz administrativamente |
| Administratively down | Interfaz apagada por configuración, aunque el cable esté puesto |
| `show ip interface brief` | Resumen de estado e IPs de todas las interfaces |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-acls) · **Anterior:** [01 · Componentes del router](/ApuntesRedes/09-routing-acls/01-componentes-del-router) · **Siguiente:** [03 · Rutas estáticas](/ApuntesRedes/09-routing-acls/03-rutas-estaticas)