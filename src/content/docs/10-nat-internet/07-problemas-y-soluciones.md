---
title: 07 — Problemas y soluciones
description: Cuando NAT rompe aplicaciones, ALGs y compañía ⚠️
---

<p><small>Cuando NAT rompe aplicaciones, ALGs y compañía ⚠️</small></p>

> 🗺️ **Estás en:** 🌐 U10 → 07 · Problemas y soluciones

---

## 📬 La idea en una frase

> NAT rompe el principio de **extremo a extremo** (punto 1), y algunas aplicaciones lo pagan caro: FTP, VoIP, juegos y VPN necesitan soluciones especiales — **ALGs**, **UPnP**, **STUN/TURN** o **NAT-T** — para sobrevivir detrás de una traducción.

Todo lo que has configurado hasta ahora (estático, dinámico, PAT, destino) tiene un precio oculto: hay aplicaciones que **esconden IPs dentro de sus propios datos**, y NAT solo traduce cabeceras IP, no el interior del paquete. Ahí empieza el drama.

---

## ⚠️ La tabla de los problemas clásicos

| Aplicación | Problema | Solución |
|---|---|---|
| **FTP activo** | El servidor intenta conectar al cliente por un puerto, pero NAT no sabe a quién | ALG FTP en el router, o FTP pasivo |
| **VoIP/SIP** | Las IPs en el payload del protocolo no se traducen | ALG SIP, STUN, TURN |
| **P2P/Juegos** | Necesitan puertos abiertos dinámicamente | UPnP, NAT-PMP, port forwarding manual |
| **VPN (IPsec)** | IPsec no pasa NAT sin configuración especial | NAT-T (NAT Traversal) |

### FTP activo, el ejemplo estrella

FTP tiene dos canales: control (puerto 21) y datos. En **FTP activo**, el cliente le dice al servidor "conéctate a mí por el puerto 1025" mediante el comando `PORT`, que lleva su IP privada escrita dentro:

```
Cliente: PORT 192,168,1,10,4,1   (192.168.1.10:1025)
Servidor: intenta conectar a 192.168.1.10:1025  →  ¡pero esa IP no existe fuera!
```

NAT traduce la cabecera IP, pero **no toca la IP que viaja dentro del comando PORT**. El servidor externo intenta alcanzar una IP privada inalcanzable. Soluciones: usar **FTP pasivo** (el cliente inicia ambas conexiones) o activar el **ALG FTP** del router, que inspecciona el comando PORT y lo reescribe.

---

## 🤖 ALGs: los traductores del payload

Un **ALG** (*Application Layer Gateway*) es una funcionalidad del router que conoce un protocolo de aplicación concreto y traduce las IPs que viajan dentro de sus datos, además de la cabecera.

```
Sin ALG:  cabecera IP traducida, pero "192.168.1.10" dentro de PORT intacta → fallo
Con ALG:  cabecera IP traducida Y "192.168.1.10:1025" reescrita a "83.45.12.78:xxxxx" → OK
```

Cada ALG entiende un protocolo: hay ALG FTP, ALG SIP (VoIP), ALG TFTP... El precio: más CPU en el router y, a veces, incompatibilidades (un ALG mal hecho rompe más de lo que arregla).

---

## 🔓 UPnP: comodidad con riesgo

**UPnP** (*Universal Plug and Play*) permite que un dispositivo interno pida al router abrir puertos automáticamente, sin intervención humana. Es la salvación de consolas y aplicaciones P2P:

```
1. La consola dice al router: "abre el puerto 3074 hacia mí".
2. El router crea la regla NAT destino en segundos.
3. El juego funciona sin tocar nada a mano.
```

**El peligro:** cualquier programa malicioso dentro de tu LAN puede hacer lo mismo. Un malware puede abrir un puerto para recibir conexiones sin que lo sepas. Por eso en redes serias (empresas, institutos) **UPnP suele estar desactivado** y se abre cada puerto a mano.

---

## 🛡️ NAT-T: el puente para IPsec

**IPsec** protege la integridad de sus paquetes: si NAT modifica la cabecera IP (cambiando la IP origen), la verificación de integridad **falla** y el paquete se descarta. Solución: **NAT-T (NAT Traversal)** encapsula los paquetes IPsec dentro de **UDP** (puerto 4500):

```
IPsec:  ESP | payload   →  falla al cambiar la IP
NAT-T:  UDP | ESP | payload  →  NAT traduce UDP sin problema, IPsec intacto
```

**STUN/TURN/ICE** son la familia de técnicas de *NAT traversal* que usan VoIP y WebRTC: STUN descubre tu IP pública real, TURN actúa de retransmisor cuando ni siquiera eso basta, e ICE coordina todas las opciones.

---

## 📶 Bonus: WiFi vs WiMax (CE e)

El resultado de aprendizaje de esta unidad incluye distinguir **WiFi** de **WiMax**, dos tecnologías de acceso inalámbrico que suenan parecidas y no lo son:

| Aspecto | WiFi (802.11) | WiMax (802.16) |
|---|---|---|
| Alcance | Metros (una casa, una oficina) | Kilómetros (una ciudad, una zona rural) |
| Estándar | IEEE 802.11 | IEEE 802.16 |
| Uso típico | LAN inalámbrica doméstica/empresa | Acceso de banda ancha de larga distancia |
| Modelo | Acceso local al propio router | Alternativa al cable/ADSL en zonas sin cobertura |

Los **estándares 802.11** que verás en cualquier router actual:

| Estándar | Nombre comercial | Bandas | Velocidad máxima |
|---|---|---|---|
| 802.11n | WiFi 4 | 2.4 GHz | ~600 Mbps |
| 802.11ac | WiFi 5 | 5 GHz | ~1.3 Gbps (hasta 6.9 en multi-antena) |
| 802.11ax | WiFi 6 | 2.4 + 5 GHz | ~9.6 Gbps |
| 802.11be | WiFi 7 | 2.4 + 5 + 6 GHz | ~46 Gbps |

> 💡 **Dato rápido:** el "6E" que ves en muchos routers (WiFi 6E) significa *WiFi 6 extendido*: la novedad es que abre la banda de **6 GHz**, con más espectro libre de interferencias. Es la pista del crucigrama del cierre.

---

## 🧠 Mini-chequeo

1. ¿Por qué falla FTP activo detrás de NAT? ¿Qué dos soluciones hay?
2. ¿Por qué se considera peligroso tener UPnP activado?
3. ¿Qué hace NAT-T con los paquetes IPsec para que NAT los acepte?

<details>
<summary>🔄 Respuestas</summary>

1. El servidor FTP intenta conectar al cliente usando una IP privada que viaja dentro del comando PORT, y NAT no la traduce. Soluciones: **FTP pasivo** o **ALG FTP**.
2. Porque cualquier programa de la LAN (incluido malware) puede pedir al router que **abra puertos automáticamente**, creando rutas de entrada sin control.
3. NAT-T **encapsula IPsec dentro de UDP** (puerto 4500): NAT traduce UDP con normalidad y la verificación de integridad de IPsec queda intacta.
</details>

---

## ✅ Resumen en 3 frases

- NAT rompe el extremo a extremo: FTP activo, VoIP, juegos y VPN necesitan ayudas para sobrevivir.
- Los **ALGs** traducen IPs que viajan dentro del payload; **UPnP** automatiza puertos (con riesgo); **NAT-T** rescata a IPsec.
- **WiFi** (802.11, metros) y **WiMax** (802.16, kilómetros) son primas, no hermanas: de n/ac/ax/be a la familia 802.11 le va muy bien.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| ALG | Gateway que traduce IPs dentro del payload (FTP, SIP…) |
| UPnP | Apertura automática de puertos por petición del equipo interno |
| NAT-T | Encapsulado UDP (4500) para que IPsec atraviese NAT |
| STUN/TURN | Técnicas de NAT traversal para VoIP/WebRTC |
| WiFi vs WiMax | 802.11 (LAN, metros) vs 802.16 (MAN, kilómetros) |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-nat-internet) · **Anterior:** [06 · Tabla NAT y verificación](/ApuntesRedes/10-nat-internet/06-tabla-nat-y-verificacion) · **Siguiente:** [08 · Configuración completa](/ApuntesRedes/10-nat-internet/08-configuracion-completa)