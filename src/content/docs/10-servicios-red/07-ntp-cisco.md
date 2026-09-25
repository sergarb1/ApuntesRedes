---
title: "07 — NTP en Cisco: configuración y verificación"
description: Manos al reloj del router ⚙️
---

<p><small>Manos al reloj del router ⚙️</small></p>

> 🗺️ **Estás en:** 🗄️ **Servicios de red: DHCP, DNS y NTP** → 07 · NTP en Cisco: configuración y verificación

---

## 📬 La idea en una frase

> Configurar NTP en IOS son tres comandos —fuentes, zona horaria y cliente— y verificarlo son dos: el objetivo es que `show ntp status` te diga **synchronized** y que todos tus dispositivos cuenten la misma historia.

---

## ⚙️ Configuración básica: el router como cliente

Escenario típico: tu router se sincroniza con fuentes públicas (o con el servidor NTP de la empresa) y, a su vez, hace de servidor para el resto de la red, que apuntará a su IP.

```
Router> enable
Router# configure terminal
Router(config)# clock timezone CET 1 0
Router(config)# clock summer-time CEST recurring last Sun Mar 2:00 last Sun Oct 3:00
Router(config)# ntp server es.pool.ntp.org
Router(config)# ntp server hora.roa.es
Router(config)# end
```

Qué acabas de hacer:

| Comando | Efecto |
|---|---|
| `clock timezone CET 1 0` | Zona horaria UTC+1 (hora peninsular de invierno) |
| `clock summer-time CEST recurring…` | Cambio de hora automático (marzo/octubre) |
| `ntp server IP-o-nombre` | Declara una fuente de sincronización (repite por cada fuente) |

> ⚠️ **Ojo con Packet Tracer:** ahí `ntp server` funciona con **IP, no con nombres** (no hay resolución DNS en ese comando). Usa `ntp server 216.239.35.0` o, mejor, la IP de un router interno que haga de stratum superior.

### La hora manual: solo para arrancar

Si el router no tiene NTP aún ni pila de reloj (los equipos antiguos pierden la hora al reiniciar), pónlela a mano **una vez**:

```
Router# clock set 12:30:00 18 Sep 2026
```

Ojo: `clock set` se ejecuta en modo **privilegiado** (no en `configure terminal`) y solo es un parche: la solución real es NTP.

---

## 🏗️ Diseño interno: un máster y todos sus clientes

En redes de empresa o laboratorios sin salida a Internet, el diseño canónico es:

```
      [Router CORE]  ← ntp master (stratum local)
       │      │      │
   [SW-1]  [SW-2]  [R-Sucursal]  ← todos: ntp server <IP-core>
       │
     [PCs]               ← reciben NTP vía DHCP (opción 42) o manual
```

En el core:

```
Router-Core(config)# ntp master 3
```

Eso lo convierte en fuente autoritativa de stratum 3 (elige tú el número) aunque pierda sus fuentes externas. En producción se usa con tiento: mejor tener fuentes externas y dejar `ntp master` como último recurso.

En cada switch/route cliente:

```
Switch(config)# ntp server 10.0.0.1
```

Y para que el core también se sincronice de verdad contra fuera: `ntp server es.pool.ntp.org` + `ntp master 3` como respaldo.

---

## 🔐 NTP con autenticación: porque un mentiroso con reloj es peligroso

Si alguien te impone la hora, te impone tus logs. Un atacante que haga de "servidor NTP falso" puede desplazar tu reloj y provocar errores de certificados o confundir una auditoría. La solución: **autenticar** la relación.

```
Router-Core(config)# ntp authenticate
Router-Core(config)# ntp authentication-key 1 md7 Cl4veNTP2026
Router-Core(config)# ntp trusted-key 1
Router-Core(config)# ntp master 3
```

Y en cada cliente:

```
Switch(config)# ntp authenticate
Switch(config)# ntp authentication-key 1 md7 Cl4veNTP2026
Switch(config)# ntp trusted-key 1
Switch(config)# ntp server 10.0.0.1 key 1
```

Así el cliente solo acepta sincronización firmada con la clave 1. En Packet Tracer la sintaxis `md5` (o `md7` en versiones modernas, que cifra la clave en la config) funciona entre routers y switches igual.

> 💡 **NTP vs SNTP:** SNTP es la versión simplificada del protocolo (mismo formato de paquete, menos disciplina de reloj) que usan cámaras, impresoras y dispositivos embebidos. Tu router habla NTP completo; la cámara de vigilancia, probablemente SNTP. No es "peor": para un dispositivo que solo quiere estar en hora, sobra.

---

## 🔍 Verificación: ¿estamos en hora?

| Comando | Qué te cuenta |
|---|---|
| `show ntp status` | ¿Synchronized? ¿Con qué peer? ¿Qué stratum eres? |
| `show ntp associations` | Las fuentes: IP, stratum, retardo, offset, alcance |
| `show clock detail` | La hora actual y de dónde viene (NTP o manual) |
| `show running-config \| include ntp` | Repaso rápido de lo configurado |

Salida esperada de un cliente bien sincronizado:

```
Router# show ntp status
Clock is synchronized, stratum 3, reference is 10.0.0.1
nominal freq is 250.0000 Hz, actual freq is 249.9995 Hz, precision is 2**10
...

Router# show ntp associations
  address         ref clock       st   when   poll reach  delay  offset   disp
 ~10.0.0.1        .INIT.          16      -     64     0  0.000   0.000  15937
 * sys.peer, # selected, + candidate, - outlier
```

El símbolo `*` delante de la IP indica el **sys.peer**: la fuente elegida. El campo `reach` es un octal de los últimos 8 intentos: `377` significa 8/8 correctos; si ves ceros, hay problema de alcance (conectividad, ACL o autenticación).

---

## 🤬 CONRAD VS EL MUNDO: "Puse la hora a mano y ya está"

**Administrador:** — Sincronizar qué va, puse `clock set` en los tres routers y listo. ¿Para qué más?

**CONRAD:** — A ver, genio. ¿Y el reloj interno del router es un reloj de pulsera Suizo? No. Es un cristal barato que deriva. En dos semanas esos tres routers tienen tres horas distintas. Felicidades: tu red es ahora un testigo de la mancomunidad de horarios impossibles.

**CONRAD:** — Y encima me dices que los logs los tienes en el syslog server. Claro, con tres horas distintas, cuando el atacante entró a las 10:00 en el router A y a las 10:01 en el firewall B, tus logs dicen 10:00 y 13:01. Perfecto para la auditoría. ¡Enhorabuena!

**La lección:** `clock set` es un yeso para un hueso roto: sirve para arrancar, no para vivir. La hora de una red se **distribuye** (NTP), se **autentica** y se **verifica** con `show ntp status` en cada equipo. Si en tu red hay más de un reloj que piensa por sí mismo, tienes un problema de arquitectura, no de tiempo.

---

## 🧠 Mini-chequeo

1. ¿Qué hace `ntp master 3` y cuándo conviene usarlo?
2. ¿Qué tres piezas configuras en un cliente para que acepte solo NTP autenticado?
3. En `show ntp associations`, ¿qué significa el `*` delante de una IP y qué te dice el campo `reach`?
4. Tu switch apunta al core con `ntp server 10.0.0.1 key 1` pero `reach` vale 0. Da tres causas posibles.

<details>
<summary>🔄 Respuestas</summary>

1. Convierte al router en **fuente autoritativa** de stratum 3 (o el que indiques) aunque no tenga fuente externa. Conviene como respaldo interno o en laboratorios; en producción, mejor fuentes externas reales y el máster como plan B.
2. `ntp authenticate`, `ntp authentication-key 1 md5 <clave>`, `ntp trusted-key 1` y declarar la fuente con `ntp server IP key 1`. (La pregunta dice "tres piezas": authenticate + key + trusted-key; el `key 1` va en la línea del server.)
3. El `*` marca el **sys.peer**, la fuente elegida para sincronizar. `reach` es un registro octal de los últimos 8 sondeos: `377` = todo perfecto; `0` = el cliente no alcanza a la fuente.
4. Cualquiera de estas: no hay conectividad IP hacia 10.0.0.1 (routing/ACL), la autenticación no coincide (clave o trusted-key mal puestas en algún extremo), o el servidor no está configurado como fuente (`ntp master`/`ntp server` ausente o error en su config).
</details>

---

## ✅ Resumen en 3 frases

- NTP en IOS: zona horaria + `ntp server` (cliente) y `ntp master` para ser fuente interna.
- La **autenticación** evita que un impostor te dicte la hora; `key` + `trusted-key` en ambos extremos.
- Verificación: `show ntp status` (¿synchronized?), `show ntp associations` (¿quién y cómo de bien?).

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| `ntp master` | Router como fuente autoritativa local |
| `ntp server` | Declara la fuente a la que sincronizar |
| Trusted key | Clave que un cliente exige para aceptar una fuente |
| Sys.peer | La fuente elegida tras las comparaciones NTP |
| Reach | Últimos 8 sondeos en octal (377 = perfecto) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-servicios-red) · **Anterior:** [06 · NTP: la hora es sagrada](/ApuntesRedes/10-servicios-red/06-ntp) · **Siguiente:** [08 · Diagnóstico de servicios](/ApuntesRedes/10-servicios-red/08-diagnostico-servicios)
