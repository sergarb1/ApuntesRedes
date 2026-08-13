---
title: 08 — ACL extendida y nombrada
description: Filtrar por protocolo y puerto, horarios laborales y tráfico de retorno con ACLs de lujo 🚀
---

<p><small>Filtrar por protocolo y puerto, horarios laborales y tráfico de retorno con ACLs de lujo 🚀</small></p>

> 🗺️ **Estás en:** 🧭 **U08 · Routing y ACLs** → 08 · ACL extendida y nombrada

---

## 📬 La idea en una frase

> La **ACL extendida** filtra por origen, **destino**, protocolo y **puerto**; la **nombrada** le pone nombre humano a esa lógica; y con **`time-range`** y **`established`** puedes hacer que las reglas cambien con el reloj y con el estado de la conexión.

Has dominado al portero básico (estándar). Ahora toca el portero con lista de invitados, detector facial y horario de apertura. Aquí es donde las políticas de red de verdad se escriben: "HTTP solo hacia Google, en horario laboral, y que vuelva el tráfico de retorno".

---

## 🧮 Sintaxis extendida: más campos, más poder

Fíjate en cómo se multiplican los campos respecto a la estándar:

```bash
access-list {número} [permit | deny] [protocolo] [origen wildcard] [destino wildcard] [eq puerto]
```

Los números van del **100 al 199** (y ampliados **2000-2699**). Y lee este ejemplo del archivo original: el clásico "web solo hacia Google DNS".

```bash
R1(config)# access-list 101 permit tcp 192.168.1.0 0.0.0.255 host 8.8.8.8 eq 80
R1(config)# access-list 101 permit udp 192.168.1.0 0.0.0.255 any eq 53
R1(config)# access-list 101 deny ip any any
R1(config)# interface g0/1
R1(config-if)# ip access-group 101 out
```

| Trozo del comando | Significado |
|---|---|
| `permit tcp 192.168.1.0 0.0.0.255` | Deja pasar TCP originado en la /24 |
| `host 8.8.8.8 eq 80` | Con destino **solo** al host 8.8.8.8 y **puerto 80** (HTTP) |
| `permit udp ... any eq 53` | Y UDP a cualquier destino en el puerto 53 (DNS) |
| `deny ip any any` | El resto, fuera (un deny final explícito con el que cerramos) |

Puedes usar `host` en lugar de una wildcard para destinos/orígenes exactos: `host 8.8.8.8` = `8.8.8.8 0.0.0.0`. Menos texto, misma idea.

---

## 🏷️ ACL nombrada: la lista con nombre propio

Cuando la ACL se vuelve una política (y tu jefe quiere entenderla), se usa la **nombrada**. En vez de un número espantoso, un nombre que dice lo que hace:

```bash
R1(config)# ip access-list extended BLOQUEAR_YOUTUBE
R1(config-ext-nacl)# deny tcp any host 173.194.0.0 eq 80
R1(config-ext-nacl)# deny tcp any host 173.194.0.0 eq 443
R1(config-ext-nacl)# permit ip any any
R1(config-ext-nacl)# exit
R1(config)# interface g0/1
R1(config-if)# ip access-group BLOQUEAR_YOUTUBE out
```

Observa:

- Se entra a un **submodo** propio (`config-ext-nacl#`): a partir de ahí escribes solo reglas, sin repetir `access-list 101` en cada línea.
- `173.194.0.0` sin wildcard más que la de host... espera: aquí sería `host 173.194.0.0` (esa IP concreta) o `173.194.0.0 0.0.0.255` si quieres todo el bloque de Google. En el ejemplo, cuidado: poner `host` limita a una sola IP — en producción querrías `173.194.0.0 0.0.255.255` para el rango completo de YouTube.
- La aplicación es idéntica: `ip access-group NOMBRE out`.

---

## ⏰ time-range: la política que nace a las 9 y muere a las 18

A los jefes les encanta esto: bloquear YouTube **solo en horario laboral**. La receta tiene dos piezas: un `time-range` que define el horario y la referencia a ese rango dentro de la ACL:

```bash
R1(config)# time-range LABORAL
R1(config-time-range)# periodic weekdays 9:00 to 18:00
R1(config-time-range)# exit

R1(config)# ip access-list extended BLOQUEAR_YT_LABORAL
R1(config-ext-nacl)# deny tcp any 173.194.0.0 0.0.255.255 eq 80 time-range LABORAL
R1(config-ext-nacl)# deny tcp any 173.194.0.0 0.0.255.255 eq 443 time-range LABORAL
R1(config-ext-nacl)# permit ip any any
R1(config-ext-nacl)# exit

R1(config)# interface g0/1
R1(config-if)# ip access-group BLOQUEAR_YT_LABORAL out
```

- `periodic weekdays 9:00 to 18:00`: de lunes a viernes, de 9 a 18. También existe `periodic daily` (todos los días) u `absolute` (fechas).
- La regla con `time-range` **solo se evalúa cuando el reloj del router dice que estamos dentro del rango**. Fuera de horario, la línea se ignora y el `permit ip any any` lo deja pasar.
- Acuérdate del `ntp` (o al menos `clock set` correcto): un time-range con reloj desviado está decidiendo mal.

---

## 🔄 established: que vuelva el tráfico de retorno

Un clásico de los routers de borde: quieres bloquear el tráfico entrante, pero **no** el retorno de conexiones que tus usuarios iniciaron. Tu ACL en la interfaz hacia Internet diría:

```bash
R1(config)# ip access-list extended FIREWALL
R1(config-ext-nacl)# permit tcp any 192.168.1.0 0.0.0.255 established
R1(config-ext-nacl)# permit udp ... (los retornos UDP van por puertos efímeros, otra historia)
```

El parámetro `established` deja pasar paquetes TCP cuyo **flag ACK está activo**: es decir, tráfico de una conversación ya iniciada, no de una petición entrante nueva (esas viajan con SYN). No es un firewall de estado completo, pero es el mecanismo ACL clásico para una política de retorno.

| Estado del paquete | Flag | ¿Pasa con `established`? |
|---|---|---|
| Nueva conexión entrante | SYN | ❌ Se bloquea |
| Retorno de conexión iniciada por ti | ACK | ✅ Pasa |

---

## 🔎 Verificación y troubleshooting

Los mismos comandos de siempre, con un truco extra debajo:

```bash
R1# show access-lists                → Todas las ACLs con contadores
R1# show access-lists 101            → La numerada 101
R1# show access-lists BLOQUEAR_YT    → La nombrada
R1# show ip interface g0/1           → ACLs aplicadas a la interfaz
R1# debug ip packet ...              → Ver paquetes en acción (¡con cuidado! alto consumo)
```

Consejos de diagnóstico que ahorran un café:

- **Los contadores no suben** → el tráfico ni toca esa interfaz, o la ACL está mal aplicada (¿dónde la colgaste? ¿in/out bien?).
- **Los contadores suben pero los usuarios se quejan** → es una línea que debería coincidir antes. Reordena: reglas específicas arriba, generales abajo.
- **El `deny any` implícito te lo come todo** → revisa que existe tu `permit ip any any` final si quieres que "lo no listado" pase.
- **time-range "no funciona"** → `show time-range LABORAL`. El reloj del router manda.

---

## 🧠 Mini-chequeo

1. Escribe la ACL extendida numerada que permita TCP hacia el host 8.8.8.8 en puerto 443 desde 192.168.1.0/24.
2. ¿Qué hace `established` en una ACL de borde?
3. ¿Por qué la regla `deny ... time-range LABORAL` se ignora fuera de horario?

<details>
<summary>🔄 Respuestas</summary>

1. `access-list 101 permit tcp 192.168.1.0 0.0.0.255 host 8.8.8.8 eq 443` (y luego tu `deny`/`permit` de cierre).
2. Deja pasar paquetes TCP con el **flag ACK** activo: el retorno de las conversaciones que iniciaron tus usuarios. Bloquea así las conexiones entrantes nuevas (SYN) sin romper lo saliente.
3. Las líneas con `time-range` **solo se evalúan dentro del rango definido**. Fuera, el router las ignora y continúa con la siguiente regla (normalmente el `permit ip any any` o el deny implícito).
</details>

---

## ✅ Resumen en 3 frases

- La ACL **extendida** (100-199) filtra por origen, destino, protocolo y puerto: el estándar de las políticas serias.
- La **nombrada** ordena la lógica con nombres humanos y `time-range` la hace dependiente del reloj (YouTube, solo en horario laboral).
- `established` devuelve el tráfico de retorno a las conexiones iniciadas internamente, y los contadores de `show access-lists` revelan dónde se resuelve cada paquete.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| ACL extendida | Filtra por origen, destino, protocolo y puerto |
| ACL nombrada | Usa un nombre (`ip access-list extended NOMBRE`) |
| `eq puerto` | Filtra por puerto destino (80, 443, 53…) |
| time-range | Ventana horaria (periodic/absolute) que activa o duerme una regla |
| established | Permite tráfico TCP de conversaciones ya iniciadas (ACK) |
| Submodo config-ext-nacl | Modo para escribir reglas de una ACL nombrada |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/08-routing-acls) · **Anterior:** [07 · ACL estándar](/ApuntesRedes/08-routing-acls/07-acl-estandar) · **Siguiente:** [09 · Head First](/ApuntesRedes/08-routing-acls/09-head-first)