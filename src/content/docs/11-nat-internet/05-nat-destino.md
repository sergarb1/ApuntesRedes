---
title: 05 — NAT destino (port forwarding)
description: Exponer un servicio interno al mundo 🚪
---

<p><small>Exponer un servicio interno al mundo 🚪</small></p>

> 🗺️ **Estás en:** 🌐 U11 → 05 · NAT destino (port forwarding)

---

## 📬 La idea en una frase

> **NAT destino** (port forwarding) traduce el tráfico **entrante**: cuando alguien de Internet llama al puerto público X de tu IP pública, el router lo reenvía a la IP:puerto de un servidor interno.

Hasta aquí, todos los tipos traducían a los que **salían**. Pero hay un problema: ¿cómo accede un cliente de Internet a tu servidor web que vive en 192.168.1.10, una IP privada que nadie externo conoce? No puede entrar directo... a menos que el router "abra una puerta" en su IP pública. Eso es exactamente NAT destino.

---

## 🚪 El problema que resuelve

Sin NAT destino, el tráfico entrante no tiene a dónde ir:

```
Internet → 83.45.12.78:80  →  ¿y ahora qué?  →  NADIE
```

El router recibe la petición en su IP pública, pero no sabe qué equipo interno la busca. NAT destino responde a esa pregunta con una regla:

```
Internet → 83.45.12.78:80  →  regla NAT destino  →  192.168.1.10:80
```

Cualquier paquete que llegue a la IP pública en el puerto 80 se reenvía, con el destino reescrito, al servidor web interno. Es el "buzón de paquetería" del edificio de oficinas del punto 2: el exterior solo conoce la dirección pública, y la recepción reparte.

---

## ⚙️ Configuración en Cisco

```bash
R1(config)# ip nat inside source static tcp 192.168.1.10 80 83.45.12.78 80
R1(config)# ip nat inside source static tcp 192.168.1.10 443 83.45.12.78 443
R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside
```

Desglose del comando, que se lee casi como una frase:

| Parte | Significado |
|---|---|
| `ip nat inside source static` | Regla NAT fija para tráfico interno |
| `tcp` | Solo para ese protocolo (también existe `udp`) |
| `192.168.1.10 80` | IP y puerto **interno** (a dónde mandarlo) |
| `83.45.12.78 80` | IP y puerto **públicos** (por dónde se entra) |

> 💡 **Truco mental:** NAT destino es un NAT estático *especializado por puerto*. Por eso el comando se parece tanto al del punto 3: la diferencia es que añades `tcp`/`udp` y el puerto.

### Puertos distintos fuera y dentro

No tienes por qué usar el mismo puerto. Puedes esconder servicios: los usuarios entran por `83.45.12.78:8080` y el servidor interno escucha en el 80:

```bash
R1(config)# ip nat inside source static tcp 192.168.1.10 80 83.45.12.78 8080
```

Esto permite **un servidor, muchos servicios**, o **muchos servidores, una sola IP**:

```
Puerto público 8080 → 192.168.1.10:80   (servidor web)
Puerto público 8443 → 192.168.1.10:443  (HTTPS del mismo)
Puerto público 2222 → 192.168.1.20:22   (SSH de OTRO servidor)
```

---

## 🔄 El viaje del paquete entrante

```
1. Cliente externo: 200.50.10.5:45000 → 83.45.12.78:8080
2. El router consulta su regla de NAT destino:
   destino 83.45.12.78:8080 → 192.168.1.10:80
3. Reenvía a la LAN: 200.50.10.5:45000 → 192.168.1.10:80
4. El servidor interno responde y el router re-traduce
   el origen antes de salir a Internet.
```

Observa que la IP de **origen** (el cliente externo) no se toca: solo se traduce el destino entrante. Por eso se llama *NAT de destino*.

---

## 🔍 Por qué "he abierto el puerto pero no funciona"

El error más repetido en soporte técnico. Abriste el puerto en NAT y desde fuera no entra nadie. Antes de tirar el router por la ventana, revisa en orden:

| # | Comprobación | Herramienta |
|---|---|---|
| 1 | ¿El firewall del router permite el puerto? | Revisa ACLs/reglas de seguridad |
| 2 | ¿El firewall del equipo interno lo permite? | Windows Firewall / ufw / firewalld |
| 3 | ¿El servicio se ejecuta en la IP destino correcta? | `netstat -tulpn` en el servidor |
| 4 | ¿La IP privada destino cambió por DHCP? | Reserva DHCP o IP estática al servidor |
| 5 | ¿El ISP bloquea el puerto? | Prueba con otro puerto >1024 |

**El diagnóstico de oro:** desde fuera, `telnet IP_PUBLICA puerto` (o `Test-NetConnection` en PowerShell). Si el puerto está cerrado, recorre la lista de arriba; si responde, el problema no es de NAT.

---

## 🧠 Mini-chequeo

1. ¿Qué diferencia hay entre NAT destino y NAT estático?
2. ¿Cómo expones dos servidores internos distintos con una sola IP pública?
3. Un cliente externo no llega a tu servidor web tras abrir el puerto 80. ¿Cuál es la primera comprobación?

<details>
<summary>🔄 Respuestas</summary>

1. NAT destino traduce el **tráfico entrante por puerto** (port forwarding); NAT estático casa una IP privada con una pública de forma global y fija.
2. Con **puertos públicos distintos** apuntando a cada servidor: `83.45.12.78:8080 → 192.168.1.10:80` y `83.45.12.78:2222 → 192.168.1.20:22`.
3. Probar la conectividad desde fuera (`telnet IP_PUBLICA 80`) y luego revisar firewalls (router y equipo), servicio activo e IP destino fija.
</details>

---

## ✅ Resumen en 3 frases

- NAT destino traduce el **tráfico entrante**: puerto público → IP:puerto interno.
- Se configura con `ip nat inside source static tcp IP_int Puerto IP_pub Puerto` y permite exponer varios servicios con una sola IP.
- Cuando "no funciona", el fallo suele estar en firewalls, servicio parado o IP cambiada — no en la regla NAT.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| NAT destino | Traducción del tráfico entrante hacia un servidor interno |
| Port forwarding | Nombre popular de NAT destino |
| Puerto público | Puerto que se expone hacia Internet |
| Puerto interno | Puerto real del servicio en el servidor |
| `ip nat inside source static tcp` | Comando Cisco de NAT destino |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-nat-internet) · **Anterior:** [04 · PAT (sobrecarga)](/ApuntesRedes/11-nat-internet/04-pat) · **Siguiente:** [06 · Tabla NAT y verificación](/ApuntesRedes/11-nat-internet/06-tabla-nat-y-verificacion)