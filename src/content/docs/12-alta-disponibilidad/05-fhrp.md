---
title: "05 — FHRP: el gateway redundante"
description: Una IP, dos routers, cero drama 🎭
---

<p><small>Una IP, dos routers, cero drama 🎭</small></p>

> 🗺️ **Estás en:** 🔁 **UD12 · Alta disponibilidad y redundancia** → 05 · FHRP: el gateway redundante

---

## 📬 La idea en una frase

> Los **FHRP** (*First Hop Redundancy Protocols*) crean una **IP virtual** compartida por dos o más routers: los clientes apuntan a esa IP como gateway y, cuando el router activo muere, el respaldo la toma sin que nadie cambie ni una configuración.

---

## 😱 El problema: el gateway es un SPOF

Todo tu conocimiento de la UD3 aplica: cada cliente de una subred tiene como gateway la IP del router. Si ese router muere:

- Los clientes **no cambian de gateway solos**: su configuración (estática o DHCP) sigue apuntando a la IP muerta.
- La red local funciona (switches, servidores internos), pero **nadie sale**.

Soluciones torpes: cambiar el gateway a mano en cada equipo (MTTR: horas), o DHCP con lease corto (aún dependes de que el cliente renueve). Solución elegante: que **dos routers compartan la misma IP** con un acuerdo automático. Ese acuerdo es el FHRP.

---

## 🎭 El truco: IP virtual + MAC virtual

```
                 clientes (gateway = 192.168.1.1)
                          │
        ┌─────────────────┴─────────────────┐
        │         IP virtual: 192.168.1.1   │
        │         MAC virtual: 0000.0c07.ac01│
        ├─────────────────┬─────────────────┤
   [R1 ACTIVO]        [R2 RESPALDO]
   IP real .2         IP real .3
```

1. Los routers negocian quién es **activo** (atiende la IP virtual) y quién **respaldo** (vigila).
2. El activo responde al ARP de la IP virtual con una **MAC virtual especial**.
3. Los clientes resuelven por ARP la .1 y cachean la MAC virtual: la IP .1 "vive" en ambos routers a la vez.
4. Si el activo muere, el respaldo **asume la IP virtual y empieza a responder por esa MAC**: los clientes no ARPean de nuevo, no tocan nada, el tráfico fluye.

La MAC virtual (en HSRP: `0000.0c07.acXX`, donde XX es el grupo) es la pieza fina: como la dirección de capa 2 no cambia, los switches y los clientes no se enteran del traspié.

---

## 🏆 Los tres FHRP que debes conocer

| Protocolo | Origen | Términos | Detalle |
|---|---|---|---|
| **HSRP** | Cisco | Activo/Standby | El clásico; multi-grupo, prioridades, preempt |
| **VRRP** | Estándar (RFC) | Master/Backup | Puede usar la IP real del router como virtual |
| **GLBP** | Cisco | AVG/AVF | Balancea: varios routers atienden tráfico a la vez |

Notas de uso:

- **HSRP** y **VRRP** son equivalentes funcionales: activo-standby (uno atiende, el otro espera). VRRP gana por ser estándar; HSRP gana en entornos 100 % Cisco y en disponibilidad en Packet Tracer.
- **GLBP** añade balanceo de carga (reparte clientes entre routers por la MAC virtual que asigna). Buen papeleo, poco despliegue real.
- Todos hablan por **multicast** entre routers con sus mensajes de "hola" (*hellos*): si el activo calla (por defecto, ~10 segundos en HSRP; con temporizadores afinados, sub-segundo), el respaldo asume.

---

## ⚖️ Prioridad, preempt y el orden de las cosas

Dos ajustes definen el comportamiento:

- **Prioridad:** el de mayor prioridad gana el papel de activo (en HSRP, por defecto 100).
- **Preempt:** con preempt activo, cuando el router de mayor prioridad vuelve de la muerte, **recupera** el papel de activo. Sin preempt, el respaldo sigue activo hasta que él muera.

¿Preempt o no? Regla práctica: sí, con conmutación limpia, si tu prioridad refleja el diseño (el mejor router sirve). No, si prefieres evitar la fluctuación y te da igual quién sirva mientras haya servicio.

> 💡 **El detalle fino del estado intermedio:** al morir el activo, el respaldo hace un **gratuitous ARP** anunciando la IP virtual con su nueva MAC real asociada a la virtual, refrescando tablas de switches si hiciera falta. La conmutación de HSRP estándar tarda ~10 s; afinando hello/hold (por ejemplo 1/3 s), menos de 4; con versiones modernas, milisegundos.

---

## 🔍 Verificación

| Comando | Qué te cuenta |
|---|---|
| `show standby brief` | Grupos, IP virtual, quién es Active y quién Standby, prioridades |
| `show standby` | Detalle: temporizadores, preempt, MAC virtual |
| `debug standby` | El diálogo de hellos y transiciones (con cuidado) |

Salida típica de `show standby brief` en un par sano:

```
Interface   Grp  Pri  State   Active        Standby       Virtual IP
Gi0/0       1    110  Active  local         192.168.1.3   192.168.1.1
```

Y en el respaldo, el mismo grupo con `State: Standby`. Si ambos dicen `Active`, hay un problema de comunicación entre ellos (¡o una subred mal montada!): los FHRP exigen que ambos routers **se vean entre sí** en la misma LAN.

---

## 🧠 Mini-chequeo

1. ¿Por qué cambiar el gateway de los clientes "a mano" no es una solución de HA? ¿Qué resuelve el FHRP?
2. ¿Qué es la MAC virtual y por qué es clave para que la conmutación sea transparente?
3. Diferencia entre prioridad y preempt en HSRP.
4. ¿Qué diferencia fundamental tiene GLBP frente a HSRP y VRRP?

<details>
<summary>🔄 Respuestas</summary>

1. Porque la config de cada cliente apunta a la IP muerta y cambiarla es lento y propenso a errores (MTTR enorme). El FHRP hace que la **IP del gateway sea virtual y compartida**: el cambio de router es automático y los clientes no tocan nada.
2. Es una MAC reservada del grupo (HSRP: `0000.0c07.acXX`) con la que el activo responde al ARP. Como clientes y switches cachean la MAC (no la IP-MAC del router real), al cambiar de activo el mapeo sigue válido: nada que re-ARPear.
3. **Prioridad** decide quién merece ser activo; **preempt** decide si el de mayor prioridad, al volver, recupera el puesto o deja al actual seguir.
4. **GLBP balancea**: varios routers atienden tráfico simultáneamente (el AVG reparte MACs virtuales entre AVFs). HSRP/VRRP son activo-standby puro.
</details>

---

## ✅ Resumen en 3 frases

- El gateway es un SPOF clásico; los **FHRP** lo eliminan con una **IP virtual** compartida y una **MAC virtual** estable.
- **HSRP** (Cisco) y **VRRP** (estándar) son activo-standby; **GLBP** añade balanceo.
- Prioridad + preempt deciden quién sirve y cuándo recupera; `show standby brief` es tu termómetro.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| IP virtual | La "IP del gateway" que comparten los routers |
| MAC virtual | Dirección de capa 2 estable durante la conmutación |
| Active/Standby | Roles HSRP (Master/Backup en VRRP) |
| Preempt | Recuperación del rol al volver el mejor |
| Gratuitous ARP | Anuncio para refrescar tablas ARP al conmutar |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/12-alta-disponibilidad) · **Anterior:** [04 · Stacking y chassis virtuales](/ApuntesRedes/12-alta-disponibilidad/04-stacking) · **Siguiente:** [06 · HSRP en Cisco](/ApuntesRedes/12-alta-disponibilidad/06-hsrp-cisco)
