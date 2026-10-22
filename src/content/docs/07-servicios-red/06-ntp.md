---
title: "6 — NTP: la hora es sagrada"
description: Sin relojes sincronizados, no hay confianza ⏰
---

<p><small>Sin relojes sincronizados, no hay confianza ⏰</small></p>

> 🗺️ **Estás en:** 🗄️ **Servicios de red: DHCP, DNS y NTP** → 6 · NTP: la hora es sagrada

---

## 📬 La idea en una frase

> **NTP** (*Network Time Protocol*) sincroniza los relojes de todos los dispositivos de la red con una fuente común y precisión de milisegundos; sin él, los logs no cuentan la misma historia, los certificados caducan "antes" y la autenticación de dominio se desmorona.

---

## ⏱️ ¿Para qué sirve la hora exacta? (spoiler: para todo)

"Que el reloj vaya un poco desajustado no importa" es la frase que un administrador nunca debería pronunciar. La hora exacta sostiene:

| Ámbito | Qué rompe un reloj desajustado |
|---|---|
| **Logs y auditoría** | Un ataque a las 10:03:12 en el router y a las 10:07:45 en el firewall no se puede correlacionar; si los relojes difieren minutos, la traza se pierde |
| **Certificados TLS** | Si tu reloj va mal, el navegador cree que los certificados "aún no valen" o "ya caducaron" |
| **Kerberos / dominio Windows** | Tolerancia típica de 5 minutos: pasado eso, nadie inicia sesión |
| **Planificación y facturación** | Registros de acceso, logs de proxies, tarificación por tiempo… |

El **orden judicial** de una intrusión, el **debugeo** de una caída y la **validación** de un certificado dependen de que todos los relojes de la red estén de acuerdo. Por eso NTP no es un capricho: es infraestructura crítica.

---

## 🗼 Strata: la jerarquía de la hora

NTP organiza las fuentes de tiempo en niveles llamados **stratum**:

![Cadena de strata NTP: del reloj atómico (stratum 0) a los servidores de referencia, el pool, el router de la oficina y los clientes](/ApuntesRedes/diagrams/u07-ntp-strata.svg)

- **Stratum 0** no se ofrece por red: son las fuentes físicas (reloj atómico, GPS).
- **Stratum 1** son los servidores de referencia públicos (por ejemplo los del proyecto NTP Pool).
- Cada nivel que baja suma 1 al stratum. Un router sincronizado contra un stratum 2 será stratum 3.

> 💡 **Detalle de diseño elegante:** NTP no manda "la hora" a lo bruto: mide cuatro marcas de tiempo (salida, llegada, respuesta y recepción), calcula el offset y el retardo del camino y corrige el reloj de forma gradual, sin saltos bruscos que romperían los logs.

---

## 🇪🇸 ¿De dónde cuelga tu red? Fuentes horarias en España

En producción no sincronizas contra "el reloj de Windows de alguien": apuntas a fuentes fiables, como el **NTP Pool español** (`es.pool.ntp.org`, round-robin de voluntarios), el **Observatorio Naval** (`hora.roa.es`, fuente institucional), el reloj que entrega tu ISP o, si no quieres depender de Internet, una antena **GPS/DCF77** en el rack.

Buena práctica: configuras **varias fuentes** (al menos 3) para que NTP las compare y elija la más consistente; con una sola fuente nunca sabes si ella misma está loca.

---

## 🧠 Mini-chequeo

1. ¿Qué es el stratum? ¿Qué stratum tiene un router sincronizado contra un servidor stratum 2?
2. Da tres consecuencias reales de tener los relojes desajustados en una red.
3. ¿Por qué NTP corrige el reloj de forma gradual y no con un salto?
4. ¿Por qué se recomienda configurar varias fuentes NTP y no una sola?

<details>
<summary>🔄 Respuestas</summary>

1. El nivel de profundidad respecto a la fuente física. Un router contra un stratum 2 queda en **stratum 3**.
2. Logs que no se pueden correlacionar entre equipos, certificados TLS que "caducan" o "aún no valen", y autenticación Kerberos/dominio que rechaza a los usuarios (tolerancia típica de 5 minutos).
3. Porque un salto brusco alteraría el orden de los eventos en los logs y podría romper procesos que miden intervalos; NTP ajusta con "slew" gradual salvo saltos enormes.
4. Porque con una sola fuente no hay con quién contrastar: si esa fuente se vuelve errática, tu red entera se desajusta. Con varias, NTP descarta las inconsistentes.
</details>

---

## ✅ Resumen en 3 frases

- La hora exacta sostiene **logs, certificados y autenticación**: no es un adorno.
- NTP organiza las fuentes en **strata** y corrige gradualmente midiendo el retardo de red.
- Configura **varias fuentes fiables** (pool español, ROA…) y deja que el protocolo elija.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Stratum | Nivel de la fuente respecto al reloj físico |
| Offset | Diferencia entre tu reloj y el de la fuente |
| Drift | Deriva natural del reloj local (ppm) |
| Slew | Corrección gradual del reloj, sin saltos |
| NTP Pool | Red distribuida de servidores de tiempo públicos |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-servicios-red) · **Anterior:** [5 · Registros y zonas DNS](/ApuntesRedes/07-servicios-red/05-registros-dns) · **Siguiente:** [7 · NTP en Cisco: configuración y verificación](/ApuntesRedes/07-servicios-red/07-ntp-cisco)
