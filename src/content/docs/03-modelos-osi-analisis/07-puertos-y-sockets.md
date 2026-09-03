---
title: 07 — Puertos y sockets
description: La puerta de cada servicio y la dirección completa de un extremo 🚪
---

<p><small>La puerta de cada servicio y la dirección completa de un extremo 🚪</small></p>

> 🗺️ **Estás en:** 📡 **U03 · Modelos OSI y análisis** → 07 · Puertos y sockets

---

## 📬 La idea en una frase

> La **IP** localiza la máquina y el **puerto** localiza la aplicación dentro de esa máquina. Juntos forman un **socket**: la dirección completa de un extremo de la comunicación.

Sin puertos, una sola IP no podría atender a la vez el navegador, el correo y el juego sin mezclarse. Con puertos, cada aplicación tiene su puerta.

---

## 🚪 ¿Qué es un puerto?

Un **puerto** es un número de **16 bits** (del 0 al 65535) que identifica una aplicación o servicio dentro de un equipo. La capa 4 (TCP y UDP) lo usa para decidir a qué programa entregar los datos.

**Rangos de puertos:**

| Rango | Nombre | Ejemplos |
|---|---|---|
| 0-1023 | **Well-Known** | HTTP(80), HTTPS(443), SSH(22), DNS(53) |
| 1024-49151 | **Registered** | MySQL(3306), RDP(3389), Minecraft(25565) |
| 49152-65535 | **Dynamic/Private** | Puertos efímeros usados por los clientes |

> 💡 **Regla de entrevista:** los *well-known* son 0-1023 y requieren privilegios de administrador para abrirse en un servidor. El **80 y el 443 a memoria** te salvan en cualquier examen.

---

## 🧦 El socket: IP + puerto

Un **socket** es la combinación `IP:puerto` que identifica a un único extremo de una conversación:

```
Socket = 192.168.1.10:443
         ↑ IP          ↑ Puerto
```

**¿Por qué hace falta el socket?** Porque una conexión real se define por **dos sockets**: el del origen y el del destino. Cambia el puerto de origen (aunque sea la misma IP) y cambias de conversación.

¿Y la diferencia entre puerto y socket, que preguntan siempre?

| | Puerto | Socket |
|---|---|---|
| Qué es | Un número (0-65535) | IP + puerto (`192.168.1.10:443`) |
| Qué identifica | Una aplicación o servicio | Un extremo completo de la conexión |
| Cuántos por equipo | Hasta 65535 | Tantos como conversaciones haya |

---

## 🧭 Ejemplo resuelto: cómo navegas

Cuando abres `https://example.com`, tu PC y el servidor negocian un socket de cada lado:

```
Origen:  192.168.1.10:54321       (tu IP + puerto efímero)
Destino: 142.250.184.4:443        (IP del servidor + puerto HTTPS)
```

El puerto de **origen es efímero** (49152-65535): tu navegador lo elige al azar para esa pestaña. El de **destino es well-known** (443): todos los servidores web escuchan ahí. Así el servidor sabe que la petición entra por HTTPS y no por otra cosa.

> 💡 **Detalle de red:** cada pestaña del navegador usa un puerto efímero distinto de tu misma IP. Eso permite tener 10 webs abiertas con 10 conversaciones distintas y que ninguna se mezcle: cada una tiene su socket de origen.

---

## 🔎 Puertos importantes para el resto del curso

Estos puertos los verás una y otra vez en laboratorios, Wireshark y boletines:

| Puerto | Protocolo | Uso típico |
|---|---|---|
| 22/TCP | SSH | Administración remota segura |
| 53/UDP (y TCP) | DNS | Resolución de nombres |
| 80/TCP | HTTP | Web sin cifrar |
| 443/TCP | HTTPS | Web cifrada |
| 67/68/UDP | DHCP | Configuración automática de IPs |
| 21/TCP | FTP | Transferencia de archivos |

Para *dónde se usa cada uno*, mira el [punto 6 de U02](/ApuntesRedes/02-fundamentos-redes/06-protocolos) y el lab del [cierre de unidad](/ApuntesRedes/03-modelos-osi-analisis/09-cierre): ahí capturarás varias de estas puertas de verdad.

---

## 🧠 Mini-chequeo

1. Tu navegador abre una web HTTPS. ¿Qué puerto de origen y qué puerto de destino usa (rango)?
2. ¿Cuántos sockets puede identificar una misma IP? Pon un ejemplo de dos conversaciones simultáneas.
3. ¿Por qué no puede DHCP reservarse el puerto 80?

<details>
<summary>🔄 Respuestas</summary>

1. **Origen:** puerto efímero (49152-65535). **Destino:** **443** (HTTPS).
2. Hasta 65535 por protocolo (TCP y UDP por separado). Ejemplo: pestaña 1 usa `192.168.1.10:54001` y pestaña 2 `192.168.1.10:54002`, ambas hacia el mismo servidor 443.
3. Porque el **80** es un puerto *well-known* reservado a HTTP; DHCP usa los **67/68** que le pertenecen.
</details>

---

## ✅ Resumen en 3 frases

- El puerto localiza la **aplicación**; la IP localiza la **máquina**.
- El **socket** (`IP:puerto`) es el identificador completo de un extremo de la conexión.
- Origen efímero + destino well-known: así se entienden clientes y servidores.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Puerto | Número de 16 bits que identifica un servicio |
| Socket | Dirección completa `IP:puerto` de un extremo |
| Well-known | Puertos 0-1023 reservados a servicios universales |
| Efímero | Puertos 49152-65535 que los clientes eligen al azar |
| Multiplexación | Varias apps compartiendo una misma IP vía puertos |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/03-modelos-osi-analisis) · **Anterior:** [06 · IP y Ethernet](/ApuntesRedes/03-modelos-osi-analisis/06-ip-ethernet) · **Siguiente:** [08 · Wireshark](/ApuntesRedes/03-modelos-osi-analisis/08-wireshark)