---
title: "5 — Cierre: consolida lo aprendido"
description: OSI, MACs y tramas a examen, con caos controlado 🧅
---

<p><small>OSI, MACs y tramas a examen, con caos controlado 🧅</small></p>

> 🗺️ **Estás en:** 🔗 **Capa de enlace y trama Ethernet** → 5 · Cierre: consolida lo aprendido

---

Has recorrido el mapa de las 7 capas, el carné de 48 bits de cada tarjeta, el sobre Ethernet campo a campo y las muñecas rusas de la encapsulación. Este cierre es el aterrizaje: lo juegas, lo diagnosticas y te prepares la pregunta de entrevista. Léelo justo después del [punto 4](/ApuntesRedes/03-capa-de-enlace/04-encapsulacion) y antes de abrir los boletines.

---

## ⭐ Sé el Paquete

> *Eres un paquete IP con una misión: llegar de la PC de Ana al servidor web 93.184.216.34. Acabas de nacer en la pila TCP/IP de su navegador.*

**Paso 1:** Te empaquetan en un segmento TCP (puerto destino 80) y luego en un paquete IP con destino 93.184.216.34. Pero en la puerta de salida te espera la capa 2.

**Paso 2:** Ana sabe la IP del primer salto (192.168.1.1), pero **no tiene su MAC**. La red se para un instante.

**¿Qué ocurre a continuación?**
1. **Llega una trama broadcast con ARP:** *«¿quién tiene la 192.168.1.1?»*, el router responde con su MAC, y por fin te encapsulan en una trama destino MAC del router → ✅ **¡Correcto!** Sin esa traducción no hay trama, y sin trama no sales de la LAN.
2. **Ana te manda directo al servidor con MAC de Ana** → ❌ Las MACs no cruzan routers: el servidor está en otra red; nadie en la LAN tiene su MAC.
3. **El switch te reescribe la IP destino para ayudarte** → ❌ El switch es capa 2: mira MACs y no toca las cabeceras IP ni en broma.

> 💡 **La moraleja del paquete:** la IP te pone en el camino correcto, pero **cada enlace necesita sus propias MACs**, y ARP es el traductor que las consigue.

---

## 🔥 Fireside Chat: MAC vs IP

> *En la puerta de un router, una dirección MAC y una dirección IP discuten mientras pasa un tren de paquetes.*

**MAC:** — Yo mando aquí. Sin mí, ni siquiera llegas al router.

**IP:** — *Tú* mandas aquí. Yo mando en el camino entero: hasta el otro extremo del planeta.

**MAC:** — Planeta, planeta… pero cuando hay router, te quedas sin nada: yo cambio de trama en cada salto y tú te quedas mirando.

**IP:** — Me quedo **igual**. Yo soy el que los routers leen para decidir hacia dónde. Tú eres la etiqueta del tramo de reparto.

**MAC:** — Además soy de fábrica. No me falsifica nadie.

**IP:** — *suspira* Cualquiera te clona con dos comandos. Y yo, al menos, cambio cuando me mudo de casa.

**MAC:** — Eso se llama "ser administrable".

**IP:** — Se llama "no servir para identificarte". Recuerda quién lleva el destino final: yo. Tú solo llegas al de al lado.

**MAC:** — Vale, pero sin mí tu paquete se queda en el portal.

**IP:** — *piensa* … También es verdad. Hacemos pareja: tú el último metro, yo el viaje largo.

**MAC:** — Hasta que alguien invente una capa 2 global.

**IP:** — No lo harán. **Jamás.**

---

## 🕵️ ¿Quién Soy?

1. Soy de 6 bytes en hexadecimal, de fábrica, y cada tarjeta tiene la mía. Los tres primeros bytes huelen a fabricante.

2. Soy la PDU de la capa 2: tengo dos MACs al principio, un EtherType en medio y un CRC al final.

3. Soy `FF:FF:FF:FF:FF:FF`: cuando aparezco, todas las tarjetas de la LAN prestan atención.

4. Soy un modelo de 7 capas que ningún equipo instala, pero todos usamos para hablar de capas.

<details>
<summary>🔄 Respuestas</summary>

1. **La dirección MAC** (concretamente, sus 3 primeros bytes son el OUI del fabricante).
2. **La trama Ethernet** (Ethernet II: Dest MAC + Src MAC + EtherType + payload + FCS).
3. **La dirección de broadcast** — la que llevan los paquetes que van para todos.
4. **El modelo OSI.**
</details>

---

## 🤬 CONRAD VS EL MUNDO: "Le he cambiado la IP y ya no funciona la red"

**Usuario:** — He puesto IP fija a la nueva PC, y ahora no le llega nada. Ya probé con otra IP.
**CONRAD:** — *Y yo ya probé con otra silla y sigo sin comer.*

**Usuario:** — Es que antes funcionaba con DHCP…
**CONRAD:** — Escucha, ingeniero de fin de semana: ¿qué te hace pensar que el problema está en la IP si la trama ni siquiera sale?

**CONRAD:** — La clásica de esta unidad: **clonaste la MAC de la PC antigua** para "que no se note el cambio" en algún filtro por MAC. Ahora hay **dos tarjetas con la misma MAC** en la misma LAN, y el switch no sabe a cuál de las dos mandar la trama: manda una, la otra se queda muda y las respuestas van al revés. IP correcta, cabina de despacho duplicada.

**Realidad:** síntomas típicos de duelo de MACs:
- Ping intermitente: a veces va, a veces no (manda al "equivocado" de los dos)
- La tabla MAC del switch salta entre dos puertos sin parar
- Funciona con DHCP y deja de funcionar con IP fija *solo cuando* copias la MAC

**CONRAD:** — Diagnostica lo que tienes delante: `show mac address-table` (o la tabla de direcciones del switch), compara puerto y MAC, y si hay dos MACs peleándose por el mismo puerto, **quita el clonado**. La IP no es el volante cuando se te ha ido la rueda de la capa 2.

**La lección:** de abajo arriba. Primero: ¿hay trama? ¿La MAC destino es válida? ¿Hay una sola MAC por interfaz? Y solo después, ¿y la IP?

---

## ⚡ Laboratorio de tortura: Wireshark y el caso de la MAC clonada

> **Duración:** 45 min
> **Material:** 2 PCs o VMs en la misma LAN, Wireshark, administrador de red

**Escenario:**
1. Captura tráfico en Wireshark en la PC A y filtra `eth` (o `arp` + `eth.addr`).
2. Desde la PC A, haz un ping a la PC B. Identifica en la captura:
   - la **trama** con la MAC de A (origen) y la de B (destino),
   - si hay ARP: el **request broadcast** y el **reply**.
3. Ahora copia la MAC de la PC B en la PC A (en Windows: propiedades de la tarjeta → Administrador → Dirección física; en Linux: `ip link set dev eth0 address …`).
4. Vuelve a hacer ping desde A hacia B.

**Reto:** ¿el ping llega? ¿Qué ves en la tabla de direcciones MAC del switch? ¿Y en la captura, quién responde al ARP?

**Fallo intencionado:** se te "ha olvidado" restituir la MAC original de la PC A tras el paso 4. Deja el laboratorio en ese estado y pásaselo a un compañero: su misión es encontrar, solo con el switch y Wireshark, por qué la red de la sala va "a ratos".

> **Pista 1 (ARP duplicado):** mira quién responde a *«¿quién tiene la IP de B?»* — si la respuesta sale de dos puertos distintos en momentos distintos, hay dos MACs peleándose.
>
> **Pista 2 (tabla del switch):** una MAC "cangrejo" (que aparece y desaparece entre puertos) es el síntoma clásico del clonado.
>
> **Pista 3 (solución):** devolver la MAC de fábrica a la PC A (o desactivar su interfaz) y comprobar con `ipconfig /all` / `ip link` que cada equipo tiene la suya.

---

## 🧠 Atrévete a pensar

1. Tu PC manda una trama a un servidor de Internet con destino `08:00:27:AA:BB:CC`. ¿De quién es esa MAC: del servidor, del router de casa o de la tarjeta de tu PC? Razona la respuesta con lo del viaje de la encapsulación.
2. Una MAC empieza por `02:…`. Mira los bits del primer byte: ¿unicast o multicast? ¿de fábrica o administrada localmente?
3. ¿Por qué el broadcast (`FF:FF:FF:FF:FF:FF`) no puede usarse para entregar una web a un servidor concreto?
4. El payload de una trama llega con el EtherType `0x86DD`. ¿Qué encontrarás dentro? ¿Quién lo procesa en el siguiente salto: el switch o el router?

<details>
<summary>💡 Soluciones</summary>

1. **Del router (o del primer salto).** La trama no cruza routers: tu PC solo llega al router de casa, que después rehace otra trama hacia el siguiente salto. El servidor web nunca ve su propia MAC en tus tramas.
2. **Unicast administrada localmente (bit I/G = 0 → unicast; bit U/L = 1 → local).** El primer nibble hexadecimal `2` es `0010`: I/G=0, U/L=1.
3. Porque el broadcast es "para todas las tarjetas de **esta** red local": en cuanto hay router, el broadcast no pasa (de hecho, por eso funcionan cosas como DHCP en cada LAN). Un destino concreto necesita una MAC unicast.
4. **IPv6** (`0x86DD` es EtherType de IPv6). Si el siguiente salto es un router de capa 3, será él quien procese el paquete IPv6; el switch solo ha usado las MACs para entregar la trama.
</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. PDU de la capa 2 (5 letras)
4. Los 3 primeros bytes de una MAC (3 letras, sigla)
5. Dirección "para todas" de la LAN (9 letras)
7. Modelo de 7 capas (3 letras, sigla)
8. Servicio que traduce IP a MAC (3 letras)

Vertical:
2. Campo de 4 bytes que valida la trama (3 letras)
3. Primer byte que dice multicast si vale 1 (sigla de 2 letras)
6. Lo que hace cada capa con los datos de la de arriba (13 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. TRAMA, 4. OUI, 5. BROADCAST, 7. OSI, 8. ARP

**Vertical:** 2. FCS, 3. I/G, 6. ENCAPSULACIÓN

</details>

---

## 💬 Preguntas de entrevista de trabajo

1. **"¿Qué diferencia hay entre una dirección MAC y una dirección IP?"**
2. **"¿Cómo averiguarías la MAC del router de una red local desde un PC Windows?"**
3. **"Tu PC no sale a Internet con IP fija. ¿Qué miras primero: IP, MAC o cable? ¿Por qué?"**
4. **"Explícame qué le pasa a un dato desde que el navegador lo manda hasta que sale el cable."**

> 💡 **Cómo encararlas:** la 1 es la de mercado: MAC = identidad de fabricante, capa 2, local y salto a salto; IP = dirección de destino, capa 3, global y de viaje largo. La 2: `ipconfig /all` (Dirección física) o `getmac`. La 3 exige método de abajo arriba: primero enlace (LED, trama, MAC del gateway con `arp -a`), después IP y puerta de enlace. La 4 es tu monólogo de encapsulación: segmento → paquete → trama → bits, con el cambio de MACs en cada router.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Si mi PC tiene una MAC y el servidor también, por qué en Wireshark veo MACs que no son ni la mía ni la del servidor?**

Porque estás viendo **las tramas de tu tramo de red**: tu PC habla con tu router (o con el switch), y en la LAN solo circulan las MACs de los equipos de al lado. El servidor web está al otro lado del planeta: su IP viaja en el paquete, pero su MAC jamás aparece en tu enlace. Si quieres ver más allá de tu router, necesitas capturar "dentro" de la ruta, no en tu enchufe.

> ❓ **¿Se puede cambiar la MAC de una tarjeta?**

Sí: casi todos los sistemas lo permiten (propiedades de la interfaz o `ip link set … address`). Se usa para saltar filtros por MAC, hacer pruebas… y para meter la pata como en el laboratorio. Algunas tarjetas WiFi ni siquiera muestran la de fábrica: traen una aleatoria desde el principio.

> ❓ **¿El switch no debería "no ver" la IP si es capa 2?**

Exacto, y es lo normal: el switch solo lee hasta la cabecera Ethernet. Por eso un switch no se entera de que llevas IPv6 o IPv4 dentro; solo le importa la MAC destino para reenviar o inundar. Para leer la IP necesitas un equipo de **capa 3**: un router (o un switch "con mando" en modo routed).

---

## 🎬 Poscréditos

Una MAC se ha clonado en la sala 3. Dos PC afirman ser la misma, el switch hace malabares entre dos puertos y el ping va como va el tranvía. CONRAD, sin moverse del rack, murmura: *"Primero la trama, luego la IP. Si no hablan en capa 2, discutir de rutas es como gritarle a una puerta cerrada."*

**PRÓXIMAMENTE EN:** Direccionamiento IP y subnetting — dar nombre lógico a cada equipo, medir subredes con la máscara y descubrir por qué 192.168.1.256 no existe. Las MAC ya se conocen; ahora toca que las IPs no se pierdan.

---

## ✅ Criterios de evaluación cubiertos (RA1)

**RA1: Planifica, instala y administra redes cableadas e inalámbricas.**

| CE | Criterio | Cubierto |
|---|---|---|
| RA1·d) | Trama y encapsulación Ethernet | ✅ Puntos 1–4 + 🧠 Atrévete a pensar y ⚡ Laboratorio (punto 5) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-capa-de-enlace) · **Anterior:** [4 · Encapsulación: de la trama al paquete](/ApuntesRedes/03-capa-de-enlace/04-encapsulacion) · **Siguiente:** [Direccionamiento IP y subnetting](/ApuntesRedes/04-direccionamiento-ip)
