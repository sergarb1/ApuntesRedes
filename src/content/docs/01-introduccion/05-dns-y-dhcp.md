---
title: 05 — DNS y DHCP
description: La agenda telefónica y el recepcionista que nadie ve 📖
---

<p><small>La agenda telefónica y el recepcionista que nadie ve 📖</small></p>

> 🗺️ **Estás en:** 🚪 **U01 · Introducción** → 05 · DNS y DHCP

---

## 📬 La idea en una frase

> **Las máquinas solo entienden de números (direcciones IP) para conectarse, pero como los humanos somos incapaces de memorizarlos, necesitamos servicios automáticos que traduzcan nombres a números y que nos asignen direcciones al entrar en una red.**

---

## 📖 DNS (Domain Name System): La agenda telefónica

Imagina que quieres llamar a un amigo por teléfono. Tú no tecleas su número de nueve cifras; abres tu agenda, buscas "Carlos" y le das a llamar. Tu móvil se encarga de buscar a qué número real corresponde ese nombre.

El DNS hace exactamente lo mismo, pero en Internet:

- Los humanos usamos nombres de dominio fáciles de recordar (como `www.google.com` o `www.gva.es`).
- Los ordenadores y routers solo saben llegar al destino si tienen la Dirección IP (como `8.8.8.8` o `193.144.127.40`).
- Cuando escribes una web en el navegador, tu equipo primero le pregunta en secreto al servidor DNS: *"Oye, ¿qué IP tiene google.com?"*. El DNS mira en su inmensa base de datos, te devuelve el número, y entonces tu navegador ya puede ir a esa dirección.

Sin DNS, Internet seguiría funcionando perfectamente, pero para entrar en cualquier web tendrías que memorizar y teclear números de 32 bits en la barra de direcciones.

---

## 🏨 DHCP (Dynamic Host Configuration Protocol): El recepcionista

En el punto 3 vimos que, al llevar tu portátil del instituto a tu casa, tu dirección IP cambia. ¿Pero quién te la cambia? No hay un señor dentro del cable escribiendo números.

Ahí entra el protocolo DHCP. Piensa en él como el recepcionista de un hotel:

1. Llegas con tu equipo a una red nueva (te conectas al Wi-Fi o pinchas el cable).
2. Tu equipo grita: *"¡Hola! Soy nuevo aquí (y esta es mi MAC). ¿Alguien me da una IP válida para que pueda hablar?"*.
3. El servidor DHCP (que en casa suele estar integrado dentro del router) le responde: *"Bienvenido. Toma esta IP (192.168.1.33) para ti. Úsala mientras estés aquí"*.

| Servicio invisible | 🧠 Qué problema resuelve | 🏢 La analogía |
|---|---|---|
| **Servidor DNS** | Traduce nombres amigables (humanos) a direcciones IP (máquinas). | La agenda de contactos o la guía telefónica. |
| **Servidor DHCP** | Reparte direcciones IP automáticamente para que los equipos no colisionen. | El recepcionista del hotel que reparte las llaves de las habitaciones. |

---

## 🚨 Ojo novato: El fallo de DNS camuflado de "No tengo Internet"

Como administrador, verás esta situación cientos de veces. Alguien te dice: *"No me va Internet, no carga ninguna web"*. Pero resulta que sus descargas de fondo siguen funcionando o puede hacer un ping a una IP numérica.

Lo que ha ocurrido es que sí tiene conexión a Internet, pero su servidor DNS se ha caído. Como su equipo no puede traducir "google.com" a números, el navegador no sabe a dónde ir y da error, aunque la conexión física y la IP estén perfectas.

---

## ✅ Resumen en 3 frases

1. Las máquinas se comunican exclusivamente usando direcciones IP numéricas, no nombres.
2. El servicio DNS actúa como una agenda telefónica que traduce los dominios web que nosotros escribimos a las IPs que entienden los ordenadores.
3. El servicio DHCP es el encargado de repartir direcciones IP de forma automática a cada dispositivo que se conecta a la red, evitando que tengamos que configurarlas a mano una a una.

---

## 🔥 Fireside Chat: DNS vs DHCP

> *Dos servicios invisibles toman un café en la cafetería del servidor.*

**DNS:** — Sin mí, la gente teclearía `8.8.8.8` en vez de `google.com`. Sería como tener que memorizar el número de teléfono de cada persona en vez de guardarla en la agenda.

**DHCP:** — Sin mí, cada vez que alguien se conectara a una red nueva, tendría que configurar la IP a mano. ¿Te imaginas 30 PC en un aula y cada uno con su IP configurada a mano?

**DNS:** — Los dos somos invisibles, pero el usuario nos echa de menos en cuanto fallamos.

**DHCP:** — Es verdad. Cuando yo fallo, nadie tiene IP. Cuando tú fallas, nadie sabe a dónde ir.

**DNS:** — Somos como el agua y la luz: no nos miras hasta que no llega.

---

## 🕵️ ¿Quién Soy?

Adivina qué servicio de red soy:

1. **Traduzco nombres a números.** Sin mí, tendrías que memorizar IP's para entrar a cualquier web.
2. **Reparto direcciones.** Cuando llegas a una red nueva, yo te doy una IP para que puedas hablar.
3. **Me confunden con "no tengo Internet".** Pero en realidad el problema soy yo, no la conexión.

<details>
<summary>🔄 Respuestas</summary>

1. **DNS** — la agenda telefónica de Internet.
2. **DHCP** — el recepcionista que reparte IPs.
3. **DNS** — cuando falla, parece que no hay Internet, pero la conexión funciona.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "No tengo Internet"

> *CONRAD, nuestro switch cascarrabias, opina sobre el diagnóstico más típico.*

**CONRAD:** — ¡OTRA VEZ! Viene un alumno y me dice: *"CONRAD, no me va Internet, no carga ninguna web."* Y yo: vale, ¿has probado a hacer `ping 8.8.8.8`? *Sí, responde*. ¿Y `ping google.com`? *No, no responde*. ¡Pues **tu DNS está caído**, tontín! Tienes Internet, pero tu equipo no sabe traducir nombres a IPs. No es que no tengasInternet; es que tu agenda telefónica está rota. Configura otro DNS (como `8.8.8.8` de Google o `1.1.1.1` de Cloudflare) y verás cómo todo vuelve a la vida.

**La lección:** "No carga ninguna web" no siempre es "no hay Internet". Haz `ping 8.8.8.8` primero; si responde, el problema es DNS, no la conexión.

---

## ⚡ Laboratorio de tortura: DNS caído

> **Duración estimada:** 15 minutos
> **Herramienta:** Packet Tracer

**El escenario:** Tienes 1 PC conectado a un router. El PC tiene IP estática (`192.168.1.10/24`), gateway `192.168.1.1` y DNS `8.8.8.8`. Haces `ping google.com` y funciona.

**Fallo intencionado:** Cambias la IP del DNS a `8.8.8.9` (una IP que no existe). Ahora `ping 8.8.8.8` funciona, pero `ping google.com` falla.

**Tu tarea:** Diagnosticar por qué "no funciona Internet" (aunque la conexión física está bien).

**Pistas (no antes de intentar):**

1. Haz `ping 8.8.8.8`. ¿Responde? *Sí → la conexión a Internet funciona.*
2. Haz `ping google.com`. ¿Responde? *No → el DNS no puede traducir el nombre.*
3. El problema es que **el DNS apunta a una IP que no existe**. Solución: cambia el DNS a `8.8.8.8` o `1.1.1.1`.

> ⚠️ **El fallo es: DNS configurado a una IP inalcanzable.** Lección: siempre comprueba si el fallo es de conexión (ping a IP) o de DNS (ping a nombre).

---

## 🏆 Logros de esta sección

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **DNS Master** | Explicar qué hace el DNS sin usar la palabra "traducir" |
| 🏅 **DHCP Detective** | Saber cómo tu PC obtiene una IP automáticamente |
| 🏅 **Cazador de DNS** | Encontrar el fallo del laboratorio en menos de 2 minutos |

---

## 🧠 Atrévete a pensar

1. **¿Qué pasaría si todos los DNS del mundo se cayeran a la vez?** ¿Seguiría funcionando Internet?
2. **¿Qué diferencia hay entre una IP estática y una IP asignada por DHCP?** ¿Cuándo usarías cada una?
3. **Un usuario dice "no me va la web, pero sí me va el correo".** ¿Qué puede estar pasando?

<details>
<summary>💡 Soluciones</summary>

1. **Internet seguiría funcionando**, pero los usuarios no podrían acceder a webs por nombre (google.com no resolvería). Solo podrían usar IPs numéricas. Es como tener un teléfono que solo funciona con números, sin agenda.
2. **Estática:** la configuras a mano y no cambia (ideal para servidores). **DHCP:** el router la asigna automáticamente y puede cambiar (ideal para portátiles y móviles).
3. El **DNS puede estar caído** (el correo usa IP directa o tiene su propia resolución) o el **puerto 80/443 puede estar bloqueado** pero el puerto de correo no.

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Servicio que traduce nombres a IPs (3 letras)
3. Protocolo que reparte IPs automáticamente (4+2+3+2+4+2+4+2+6+3+4 letras)

Vertical:
2. Nombre que escribes en el navegador (7+3 letras)
4. Dirección IP que usa Google como DNS (1+1+1+1+1+1 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. DNS · 3. DHCP
**Vertical:** 2. DOMINIO · 4. 8.8.8.8

</details>

---

## 💬 Preguntas de entrevista de trabajo

> Preguntas reales que te harían para administrador de redes junior.

1. **"¿Qué es el DNS? Explícalo a un niño."**
2. **"Un usuario dice 'no me va Internet'. ¿Qué pasos de diagnóstico das?"**
3. **"¿Qué es DHCP? ¿Por qué es útil?"**
4. **"¿Qué diferencia hay entre una IP estática y una dinámica?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Puedo tener un DNS sin Internet?**

**Sí.** Puedes montar un DNS local en tu red (por ejemplo, para resolver nombres de servidores internos). Ese DNS no necesita Internet para funcionar, pero necesitaría Internet (o un DNS externo) para resolver nombres fuera de tu red.

---

> ❓ **¿Qué pasa si dos PC tienen la misma IP por DHCP?**

**No debería pasar.** El servidor DHCP lleva un registro de las IPs que ha asignado y no repite una que ya esté en uso. Si pasa (por un error de configuración), se genera un **conflicto de IP** y una de las dos PC pierde conectividad.

---

## 🎬 Poscréditos

El DNS y el DHCP están sentados en la cafetería del servidor. De repente, el DNS se pone pálido: *"Me he caído... 300 usuarios no pueden acceder a ninguna web"*. El DHCP le da una palmada en la espalda: *"Tranquilo, yo reparto IPs mientras te recuperas. Pero si me caigo yo... nadie tiene IP nueva"*. Se miran: *"Somos los héroes invisibles"*.

**PRÓXIMAMENTE EN 06:** La mente del administrador — diagnóstico de averías con la escalera del ping. 🔧

---

📚 [Volver al índice de la unidad](/ApuntesRedes/01-introduccion) · **Anterior:** [04 · Paquetes y protocolos](/ApuntesRedes/01-introduccion/04-paquetes-y-protocolos) · **Siguiente:** [06 · Método de diagnóstico](/ApuntesRedes/01-introduccion/06-metodo-diagnostico)
