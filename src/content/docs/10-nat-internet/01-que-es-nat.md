---
title: 01 — ¿Qué es NAT?
description: La traducción que rescata a IPv4 y por qué existe 🌐
---

<p><small>La traducción que rescata a IPv4 y por qué existe 🌐</small></p>

> 🗺️ **Estás en:** 🌐 U10 → 01 · ¿Qué es NAT?

---

## 📬 La idea en una frase

> **NAT** (*Network Address Translation*) traduce direcciones IP privadas de una LAN a una o más IPs públicas al salir a Internet, y de vuelta cuando llega la respuesta.

Una IP privada (192.168.1.10) no puede viajar por Internet: las direcciones públicas son el único idioma que entiende la red global. NAT es el **intérprete** que se sienta en el borde de tu red y traduce ese idioma privado al público para que tu equipo pueda salir al mundo... y para que el mundo pueda responderle.

Si esto te suena de pasada, es porque ya lo rozaste en las unidades de IPv4. Aquí lo llevamos al fondo: por qué existe, qué resuelve y qué rompe.

---

## 🌍 ¿Por qué existe NAT?

NAT no nació por capricho: nació por necesidad. Tres razones lo explican:

| Razón | Explicación |
|---|---|
| **Agotamiento de IPv4** | No hay suficientes IPs públicas para todos los dispositivos. NAT permite que muchas IPs privadas compartan una pública |
| **Seguridad aparente** | Los dispositivos internos no son visibles directamente desde Internet |
| **Flexibilidad** | Puedes cambiar de ISP sin reconfigurar toda la LAN |

### La razón principal: no hay suficientes IPs

El protocolo IPv4 solo ofrece ~4.300 millones de direcciones. Con un móvil por persona, un portátil, una consola, una tele... nos quedamos cortos hace años. La solución práctica fue **apartar bloques de IPs privadas** (10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16, definidas en el RFC 1918) para uso interno, y que **toda una red comparta una o pocas IPs públicas** mediante NAT. Ese es el motivo que lo explica todo: no hay una pública para cada dispositivo.

> 💡 **Ojo:** las IPs privadas del RFC 1918 se pueden repetir en redes distintas. Lo que las hace únicas en el mundo es la IP pública que les asigna NAT.

### ¿Dónde vive NAT?

NAT vive en el **borde de tu red**: el router que conecta tu LAN con el ISP. Mira el viaje de un paquete con y sin NAT:

```
SIN NAT (ideal)                          CON NAT (realidad)
┌──────┐        ┌────────┐        ┌──────┐        ┌────────┐
│ PC   │────────│ Router │───────►│ PC   │────────│ Router │
│ 8.8.8.1│  IP pública directa       │192.168.1.10│  NAT: traduce │
└──────┘  sale tal cual              └──────┘  a 83.45.12.78
```

En el primer caso el PC sale con su IP tal cual (imposible a escala mundial). En el segundo, el router se queda la IP pública y **traduce** la privada de cada paquete que cruza su interfaz *outside*. Todo el "truco" de NAT ocurre en ese recuadro de la derecha.

---

## 🏨 La analogía del recepcionista de hotel

Imagina un hotel de 300 habitaciones (tu LAN). El hotel tiene un **único número de teléfono público** (tu IP pública). Los huéspedes (tus PCs) no pueden recibir llamadas directas: todo pasa por la recepción.

- Un huésped llama fuera: la recepcionista coge la extensión 204 (192.168.1.10) y marca por la línea principal, apuntando en su libreta: "extensión 204 habló con la oficina de Google, uso la línea 2".
- Cuando Google devuelve la llamada al número público, la recepcionista consulta la libreta y conecta la llamada a la extensión correcta.

Esa libreta es la **tabla NAT**. El recepcionista es el **router con NAT**. Y la traducción de "extensión 204" a "línea pública" es exactamente lo que hace NAT con las IPs y los puertos.

---

## ⚖️ El fin del extremo a extremo

Internet se diseñó con un principio llamado **extremo a extremo**: dos equipos cualquiera podían hablarse directamente, sin intermediarios que alteraran sus datos. Cada máquina tenía su IP pública única y el camino era transparente.

NAT rompe ese principio, y hay que ser consciente de ello:

| Antes de NAT (ideal) | Con NAT (realidad) |
|---|---|
| Cada equipo tiene IP pública propia | Solo el router tiene IP pública |
| Cualquiera puede iniciar conexión entrante | Nadie entra desde fuera salvo que se abran puertos |
| Las aplicaciones hablan sin intermediarios | FTP, VoIP, juegos y VPN necesitan ayudas extra |
| Sin tablas, sin traducciones | El router mantiene y gestiona la tabla NAT |

Estas consecuencias no son "defectos": son el precio de compartir una IP pública entre cientos de equipos. Y de ellas salen los problemas que verás en el [punto 7](/ApuntesRedes/10-nat-internet/07-problemas-y-soluciones) y la discusión del [Fireside Chat del cierre](/ApuntesRedes/10-nat-internet/09-cierre).

---

## 🧠 Mini-chequeo

1. ¿Cuál es la razón principal por la que existe NAT?
2. ¿Qué tres bloques de IPs privadas define el RFC 1918?
3. ¿Qué principio de diseño de Internet rompe NAT? Pon un ejemplo de aplicación que lo sufra.

<details>
<summary>🔄 Respuestas</summary>

1. **El agotamiento de IPv4:** no hay IPs públicas suficientes para todos los dispositivos, así que una LAN comparte una o pocas IPs públicas.
2. **10.0.0.0/8, 172.16.0.0/12 y 192.168.0.0/16**.
3. El **extremo a extremo**. Ejemplo: un servidor FTP externo no puede iniciar una conexión entrante hacia tu PC sin configuraciones especiales (ALG FTP, FTP pasivo...).
</details>

---

## ✅ Resumen en 3 frases

- NAT es el **traductor** de IPs privadas a públicas en el borde de tu red, nacido por el agotamiento de IPv4.
- Su libreta de traducciones (la **tabla NAT**) permite que una sola IP pública sirva a cientos de dispositivos.
- Traducir tiene precio: se rompe el **extremo a extremo**, y algunas aplicaciones exigirán soluciones extra (las verás en el punto 7).

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| NAT | Network Address Translation: traducción de IPs privadas ↔ públicas |
| IP privada | IP del RFC 1918, no enrutable en Internet (192.168.x.x, 10.x.x.x…) |
| IP pública | IP global única, enrutable en Internet |
| Extremo a extremo | Principio de Internet: comunicación directa sin intermediarios |
| Tabla NAT | Registro de traducciones que mantiene el router |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-nat-internet) · **Anterior:** [Índice de la unidad](/ApuntesRedes/10-nat-internet) · **Siguiente:** [02 · Tipos de NAT](/ApuntesRedes/10-nat-internet/02-tipos-de-nat)