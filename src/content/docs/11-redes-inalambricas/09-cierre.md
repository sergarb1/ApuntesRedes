---
title: "09 — Cierre: consolida lo aprendido"
description: El cierre práctico de la U11, con canales, SSIDs y vecinos ruidosos 📶
---

<p><small>El cierre práctico de la U11, con canales, SSIDs y vecinos ruidosos 📶</small></p>

> 🗺️ **Estás en:** 📶 **UD11 · Redes inalámbricas** → 09 · Cierre

---

Has terminado la teoría: sabes por qué solo hay tres canales limpios en 2,4 GHz, cómo se diseña la cobertura de un edificio, qué cambia entre PSK y Enterprise y por qué un AP lightweight obedece a un controlador. Este cierre es el aterrizaje: recorres lo aprendido con juegos, un laboratorio WLAN con fallos a propósito y las preguntas de la entrevista. Léelo justo después del [punto 8](/ApuntesRedes/11-redes-inalambricas/08-configuracion-wlan) y antes de abrir los boletines.

---

## ⭐ Sé el Paquete

> *Eres un portátil de la empresa, en la sala de reuniones del segundo piso. Tu usuario abre la tapa y te toca reconectar con el mundo, sin cable, como toda la vida.*

**Paso 1:** Tu adaptador escanea el aire y encuentra `CORP-EMPRESA` en el canal 6, señal −58 dBm. También ve `CORP-EMPRESA` en el canal 11 y `INVITADOS` en el 1. Tres APs, dos redes, un ESS.

**Paso 2:** Te asocias al AP del canal 6 con 802.1X: pides identidad, el AP la reenvía por CAPWAP al WLC, el WLC consulta al RADIUS y este responde "sí, es él". Recibes IP por DHCP (192.168.10.44) y DNS de la casa.

**Paso 3:** Tu usuario se va a la cafetería del edificio vecino. Tu señal baja (−74 dBm) y decides, por tu cuenta, buscar un AP mejor: te reasocias al del canal 11. El WLC, que ya lo sabía, mueve tu sesión sin perder la IP. Nadie nota nada.

**¿Qué ha pasado?**
1. **Has hecho roaming dentro de un ESS bien diseñado** → ✅ ¡Correcto! Mismo SSID, canales alternos, solapamiento de cobertura y el WLC coordinando: cambiaste de BSS sin cambiar de red.
2. **Se ha caído la red y te has reconectado** → ❌ No hubo caída: la IP se conservó y no hubo re-autenticación desde cero. Eso es roaming, no reinicio.
3. **El DHCP te ha dado una IP nueva en otro AP** → ❌ Si cambiara la IP, las sesiones se cortarían. El DS (cable) une todos los APs en la misma red lógica: la IP es la misma.

> 💡 **La moraleja del portátil nómada:** el roaming fluido no lo regala el fabricante: se diseña. Mismo SSID, credenciales iguales, canales alternos, solapamiento del 15-20 % y, si es serio, 802.11k/r/v. Lo que el usuario llama "WiFi bueno" es diseño de radio bien hecho.

---

## 🔥 Fireside Chat: WiFi vs Cable

> *En el rack de la sala de servidores, un latiguillo Cat6 y el AP del techo discuten mientras los ventiladores hacen el coro.*

**Cable:** — Yo ofrezco 1 Gbps garantizado, full-duplex, sin vecinos, sin microondas, sin sorpresas. El túnel de 100 metros es mío.

**WiFi:** — Yo ofrezco libertad: el portátil que entra a la sala, el móvil del director, la tablet del repartidor. Ninguno de ellos llevaba tu RJ45 en el bolsillo.

**Cable:** — Pero tu velocidad es una promesa con asterisco: la mitad de la teórica si hace buen tiempo, y si el vecino decide poner un AP en el canal 6, a llorar al lavabo.

**WiFi:** — Y tu "garantía" exige obra civil, canaletas, rosetas y que nadie mueva el mueble. Yo levanto una sala en veinte minutos.

**Cable:** — Pues mira, en este mismo rack hay un switch de 48 puertos lleno de cables… y tres APs encima. ¿De dónde crees que sale mi señal hacia ellos? Un cable.

**WiFi:** — Toque de gracia aceptado. Yo soy el último salto, no la espina dorsal. Y el que sabe dónde acaba su territorio no compite contigo: te usa.

**Cable:** — Trato hecho: puestos fijos y backbone, tú. Salas, visitas y movilidad, él. La red buena no elige: combina.

**WiFi:** — Lo que nos dijeron el primer día del curso y nadie escucha: *el WiFi complementa al cable, no lo sustituye.*

---

## 🕵️ ¿Quién Soy?

1. Soy tres canales que no se pisan en 2,4 GHz y el primer examen de cualquier diseño WLAN.

2. Anuncia la red en beacons, vivo en la radio del AP y no debo confundirme con el nombre que ven los clientes.

3. Yo guardo la clave compartida de todos; mi hermano mayor pregunta usuario por usuario a un servidor RADIUS.

4. Solo hago radio y por CAPWAP obedezo a un cerebro central.

<details>
<summary>🔄 Respuestas</summary>

1. **Canales 1, 6 y 11** — Los tres no solapados de 2,4 GHz.
2. **BSSID** — La MAC del AP; el nombre que ven los clientes es el SSID.
3. **WPA2/WPA3-Personal (PSK)** — Enterprise es el hermano con 802.1X/RADIUS.
4. **AP lightweight** — Radio local, control central en el WLC.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "Puse el router en el armario y el WiFi va mal en toda la casa"

**Usuario:** — Este router es una porquería: dos barras en la cocina y una en el patio. Y eso que está nuevo.

**CONRAD:** — ¿Y dónde lo tienes enchufado, pequeña joya? En el armario de la entrada, dentro, rodeado de madera, mantas y el boiler. Claro que va mal: le has puesto una jaula de Faraday artesanal.

**CONRAD:** — Y no me digas que "compraste un repetidor" y lo pusiste al lado del router. El repetidor repite la señal pobre que ya recibió: has amplificado el fracaso.

**La lección:** la colocación es la mitad del WiFi: centro del área a cubrir, en alto, sin metal ni agua alrededor, antena vertical. Antes de gastar un euro: cambia el sitio, elige canal limpio (1-6-11) y mide. El 80 % de los "malos routers" son buenos routers mal puestos.

---

## ⚡ Laboratorio de tortura: WLAN con dos SSIDs y un intruso

> **Duración:** 1,5 horas
> **Material:** Packet Tracer — 1 router 2911, 1 switch 2960, 2 APs domésticos, 3 laptops (WPC300N), 1 PC

**Montaje:** Router → Switch; del switch salen PC-1 (VLAN 10), AP-1 (trunk 10,99) y AP-2 (trunk 10,99). Las laptops se reparten entre ambos APs.

**Configura al inicio:**
1. Router: subinterfaces .10 y .99 (gateway 192.168.10.1 y 192.168.99.1) + pool DHCP para ambas VLANs.
2. AP-1: SSID `CORP` canal 1 / SSID `INVITADOS` canal 11 (si el AP es single-SSID, usa AP-1=CORP y AP-2=INVITADOS en canales 1 y 11).
3. Switch: trunks con VLANs 10,99 permitidas hacia los APs.
4. Verifica: laptops de `CORP` con IP 192.168.10.x, invitados con 192.168.99.x, y los invitados NO pingen a 192.168.10.x.

**Ahora, SIN MIRAR, tu profesor introduce TRES fallos:**
- Fallo A: cambia el canal de AP-1 al 11 (mismo que AP-2).
- Fallo B: en el switch, cambia el puerto del AP-1 a `access vlan 99`.
- Fallo C: quita el pool DHCP de la VLAN 99.

**Reto:** diagnosticar los tres fallos solo con clientes, `show` del switch y `ipconfig`. Documenta síntoma → escalón → causa → solución.

**Fallo intencionado extra:** el profesor baja la seguridad de `INVITADOS` a WEP con clave "12345" "para que entren fácil". El reto adicional: explicar en dos líneas por qué eso es un agujero y qué se debe usar en su lugar.

> **Pista 1 (fallo A):** los clientes de ambas redes van lentos y el analizador ve dos APs gritando en el 11. Los canales no se eligen por sorteo.
>
> **Pista 2 (fallo B):** los clientes de `CORP` en AP-1 reciben IP 192.168.99.x o no reciben IP. ¿Qué lleva ese puerto, trunk o access? ¿Qué VLANs debe transportar?
>
> **Pista 3 (fallo C):** los invitados conectan al WiFi pero se quedan en APIPA (169.254.x.x). Escalón 1 de la escalera: ¿quién les da IP?

---

## 🏆 Logros de esta unidad

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Planificador de canales** | Diseñar un plan 1-6-11 para una planta de 6 APs sin solapes |
| 🏅 **Bilingüe SSID/VLAN** | Montar dos SSIDs en dos VLANs con trunk y DHCP a la primera |
| 🏅 **Cazador de vecinos** | Con una app analyzer, encontrar el canal sucio de tu propia casa |
| 🏅 **Aguafiestas de invitados** | Dejar la red de invitados navegando pero sin ver la LAN |

---

## 🧠 Atrévete a pensar

1. Una nave industrial de 2.000 m² con estanterías metálicas altas necesita WiFi para lectores de códigos. ¿Cómo adaptas el diseño respecto a una oficina normal?
2. ¿Por qué en un ESS con roaming conviene desactivar los canales automáticos y fijarlos a mano (o vigilar el RRM)?
3. Un cliente se asocia a tu SSID con señal −50 dBm pero la red "va a saltos". ¿Qué dos medidas te faltan y qué buscarías en cada una?
4. Te piden WiFi en el patio del instituto, sin posibilidad de cablear el exterior. ¿Qué dos opciones técnicas propones y qué riesgos tiene cada una?

<details>
<summary>💡 Soluciones</summary>

1. Las estanterías metálicas crean reflexiones y sombras: APs **más numerosos y con menos potencia** (celdas pequeñas) colocados en los pasillos estrechos, preferencia por 2,4 GHz (mejor penetración y los lectores suelen ser banda estrecha), y site survey in situ obligatorio: en metal no hay diseño sobre plano que sobreviva.
2. Porque el roaming exige un plan predecible: si "auto" deja dos APs vecinos en el mismo canal, creas interferencia co-canal justo en la zona de solapamiento donde el cliente debe cambiar de AP. Con RRM, se vigila que la automatización respete los planes.
3. **SNR/ruido** (señal alta con ruido alto = conexión a saltos; mide con analyzer qué canal está contaminado) y **capacidad del AP** (¿cuántos clientes comparten ese tiempo de aire? `show dot11 associations`). Señal no es rendimiento.
4. Opción A: enlace punto a punto desde el edificio hasta un AP exterior en el patio (protección IP65, PoE, Fresnel). Opción B: AP mesh exterior que enlaza por radio con el edificio. Riesgos: temperatura/humedad, seguridad (exterior = alcance desde la calle → revisar potencia, PSK robusta/Enterprise, aislamiento), y legalidad de EIRP.

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Nombre lógico de la red que ven los clientes
3. Protocolo de túnel entre AP lightweight y WLC
5. Antena que concentra el haz en una dirección
7. Medida de señal en dBm respecto a milivatios (sigla)

Vertical:
2. Los tres canales limpios de 2,4 GHz (números)
4. Servidor que valida 802.1X
6. Técnica de WiFi 6 que reparte el canal en subcanales
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. SSID, 3. CAPWAP, 5. DIRECCIONAL, 7. RSSI

**Vertical:** 2. 1-6-11, 4. RADIUS, 6. OFDMA

</details>

---

## 💬 Preguntas de entrevista de trabajo

1. **"Tenemos una oficina de dos plantas con quejas de WiFi lento. ¿Por dónde empiezas?"**
2. **"¿Por qué no usarías WEP ni ocultarías el SSID? Explícalo como si yo fuera el gerente."**
3. **"¿Qué diferencia hay entre WPA2-PSK y WPA2-Enterprise y cuándo pondrías cada uno?"**
4. **"¿Qué es CAPWAP y qué ventaja real da un controlador?"**
5. **"El almacén necesita WiFi pero es todo metal. ¿Qué haces?"**

> 💡 **Cómo encararlas:** la 1 pide método: site survey (medir señal/canales/ruido), plan 1-6-11, revisar capacidad por zona y no "comprar más APs" a ciegas. La 2, en lenguaje llano: WEP se rompe en minutos y ocultar el SSID es como esconder la puerta pero gritar la dirección; el gerente entiende "candado roto" y "pintura". La 3: clave compartida frente a identidad por usuario con RADIUS; PSK en casa/PYME, Enterprise en organización con usuarios y baja de personal. La 4: túnel AP↔WLC que centraliza configuración, RRM y roaming; la ventaja real es gestión única y roaming fluido cuando la flota crece. La 5: survey obligatorio, celdas pequeñas con APs en zonas altas libres, 2,4 GHz como candidata, y validar con medición real, no con planos.

---

## 🤷 No hay preguntas tontas

> ❓ **¿Cuántos clientes soporta "un AP"?**

No hay número mágico: depende del uso. Un AP doméstico se ahoga con 15 videollamadas pero aguantará 40 móviles de WhatsApp; un AP profesional bien colocado atiende 50-100 clientes con tráfico moderado. La métrica real no es "clientes conectados" sino **tiempo de aire consumido**. Por eso los diseños serios hablan de capacidad por zona, no de límite global.

> ❓ **¿Los 5 GHz llegan peor a través de paredes, verdad? ¿Y entonces para qué los quiero?**

Exacto: se atenúan más. Pero esa misma "debilidad" es una herramienta: celdas más contenidas (menos contaminación entre APs), más canales limpios y velocidad mayor. En oficinas, 5 GHz es la banda de rendimiento y 2,4 GHz la de compatibilidad y alcance. Buena red = ambas bandas, bien repartidas.

> ❓ **Mi vecino tiene el canal 6 y yo también. ¿Me pongo en el 3 para "estar entre medias"?**

No: el 3 **solapa** tanto con el 1 como con el 6, así que estorbarías a dos redes en vez de compartir protocolo con una. La convivencia WiFi tiene un mecanismo (escuchar antes de hablar en el mismo canal); dos redes que se ven y usan el mismo canal se coordinan mal pero se coordinan; en canales solapados, pura interferencia. Si ves al vecino en el 6, tu sitio es el 1 o el 11, nunca el 3.

---

## 🎬 Poscréditos

El portátil nómada cerró la sesión en la cafetería, el RADIUS contó su entrada y el WLC movió su sesión de AP en AP sin que el usuario notara nada. El usuario, eufórico, exclamó: "¡Este WiFi es buenísimo!" CONRAD, desde la consola del WLC, suspiró: *"Buenísimo. Diseñado. Medido. Con canales alternos y un trunk bien puesto. Pero sí, buenísimo… Presenta mi parte también, ingrato."*

**PRÓXIMAMENTE EN U12:** Alta disponibilidad y redundancia: STP con EtherChannel, FHRPs (HSRP/VRRP/GLBP), stacked switches y por qué la red que "nunca falla" es la que se diseña para fallar bien. Ahora que el aire está dominado, toca que todo siga vivo cuando algo se rompe.

---

## ✅ Criterios de evaluación cubiertos (RA1/RA2)

**RA2: Integra ordenadores y periféricos en redes cableadas e inalámbricas.**

| CE | Criterio | Cubierto |
|---|---|---|
| e) | Estándares para redes inalámbricas | ✅ Puntos 1, 3 y 5 |
| f) | Integración de equipos inalámbricos | ✅ Puntos 4, 7-8 y ⚡ Laboratorio |
| g) | Seguridad en WLAN | ✅ Punto 6 + 🧠 Atrévete (punto 9) |
| b) | Medios de transmisión no guiados | ✅ Puntos 1-2 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-redes-inalambricas) · **Anterior:** [08 · Configuración y verificación](/ApuntesRedes/11-redes-inalambricas/08-configuracion-wlan) · **Siguiente:** [UD12 · Alta disponibilidad y redundancia](/ApuntesRedes/12-alta-disponibilidad)
