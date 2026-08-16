---
title: 01 — Metodología de diagnóstico
description: Diagnosticar de abajo arriba, del cable a la aplicación 🩺
---

<p><small>Diagnosticar de abajo arriba, del cable a la aplicación 🩺</small></p>

> 🗺️ **Estás en:** 🩺 U11 → 01 · Metodología de diagnóstico

---

## 📬 La idea en una frase

> El troubleshooting no es talento: es **método**. Ante un fallo, el administrador sube capa por capa del modelo OSI —de la física a la aplicación— comprobando en cada nivel qué funciona y qué no, hasta aislar dónde vive el problema.

El grito de "no me va Internet" no dice nada por sí solo. Con método, en cambio, cada comprobación descarta niveles enteros del modelo: si el cable tiene luz, la capa 1 probablemente está bien; si hay ping al gateway, la capa 3 de tu lado funciona... Cada respuesta "sí" o "no" te acerca al fallo, como un juego de adivinanzas en el que solo puedes hacer preguntas binarias.

Antes de seguir, recuerda el [mapa de capas de la U02](/ApuntesRedes/02-modelos-osi-analisis/01-modelo-osi): lo que viste como teoría ahora se convierte en tu herramienta de trabajo.

---

## 🪜 El método OSI de abajo arriba

Nunca se empieza por la aplicación. El orden natural es: primero el cable, luego la trama, luego el paquete, y solo al final el servicio. ¿Por qué? Porque cada capa depende de la anterior: no puedes resolver un problema de DNS (capa 7) si antes no sabes que el tráfico IP (capa 3) llega.

| Capa | Qué comprobar | Comandos |
|---|---|---|
| **1 Física** | Cable conectado, LEDs, CRC errors | `show interface`, `show port` |
| **2 Enlace** | MAC table, VLAN, STP | `show mac address-table`, `show spanning-tree` |
| **3 Red** | IP, máscara, gateway, rutas | `ping`, `ipconfig`, `show ip route` |
| **4 Transporte** | Puertos abiertos, ACLs | `telnet`, `netstat`, `show access-lists` |
| **5-7 Aplicación** | DNS, HTTP, aplicación | `nslookup`, `curl`, logs de aplicación |

Fíjate en el patrón: las capas 1 y 2 se comprueban en el switch y en el cable; la capa 3 en el equipo y en el router; la capa 4 en las ACLs y los puertos; y la capa 7 en los servidores de aplicación. **Cada capa tiene su escenario**, y confundirlos es el error más caro del diagnóstico: pedirle al cable que resuelva un DNS no tiene sentido, igual que pedirle al servidor web que arregle un cable pelado.

> 💡 **Analogía del fontanero:** un fontanero nunca abre el grifo del último piso sin mirar antes la llave de paso de la calle. La presión llega por etapas, y cada llave corta un tramo. Tú haces lo mismo con ping: cada destino que responde te confirma que "hasta aquí la cañería está bien" y te permite descartar todo el tramo anterior.

---

## 👑 La regla de oro

> **Regla de oro:** Pingea tu gateway primero. Si funciona, pingea más allá. Si falla, revisa capas 1 y 2.

Esta frase resume media unidad. Vamos a desgranarla:

- **Ping al gateway (tu IP local).** Si falla, el problema está en tu LAN: cable, switch, VLAN o tu propia configuración IP. No tiene sentido mirar nada más.
- **Ping a 8.8.8.8 (fuera).** Si el gateway responde pero este falla, el problema está en la salida: router de borde, NAT, ACL de salida o el ISP.
- **Ping a google.com (por nombre).** Si 8.8.8.8 responde pero google.com no, el problema es de **resolución DNS** (capa 7), no de red.

```
Progresión de pruebas                 → Qué te dice
────────────────────────────         → ─────────────────────────────
ping 192.168.1.1 (gateway)   ✗        → LAN rota: capa 1, 2 o 3 local
ping gateway ✓ → ping 8.8.8.8 ✗       → Sale mal de tu red: NAT, ACL, ISP
ping 8.8.8.8 ✓ → ping google.com ✗    → DNS mal configurado (capa 7)
ping google.com ✓ pero web no carga   → HTTP/HTTPS, proxy o servidor (capa 7)
```

Cada línea de esta tabla es un mini-diagnóstico completo. Si lo memorizas, ya no vuelves a decir "no me va Internet" sin saber por dónde empezar. Y ojo: esta progresión es la misma que verás aplicada de forma interactiva en el [Sé el Diagnóstico del cierre](/ApuntesRedes/11-diagnostico-monitorizacion/09-cierre).

---

## 🗺️ El mapa físico y el mapa lógico

Antes de diagnosticar hay que **saber qué hay montado**: ninguna metodología funciona a ciegas. Todo administrador maneja dos mapas:

- **Mapa físico:** qué equipo está conectado a qué puerto del switch, en qué rack, por qué cable. Responde a "¿dónde está esto?". Se construye con `show cdp neighbors` (Cisco Discovery Protocol) y un plano de planta bien etiquetado.
- **Mapa lógico:** IPs, VLANs, subredes, rutas, protocolos y servicios que corren *sobre* ese cableado. Responde a "¿cómo se hablan los equipos?". Sale de `show ip interface brief`, `show vlan brief`, `show ip route` y las configuraciones.

```
Mapa físico (dónde)                  Mapa lógico (cómo)
─────────────────────                ────────────────────────────
PC-A  → puerto 12 SW1                PC-A: 192.168.10.10/24 · VLAN 10
SW1   → puerto 24 → R1 G0/0         VLAN 10 = 192.168.10.0/24 · GW 192.168.10.1
R1    → G0/1 → ISP                  Ruta por defecto → ISP
```

El CE **h)** de esta unidad ("mapa físico y lógico") se juega aquí: si tu mapa está desactualizado, estarás diagnosticiando contra un plano falso, y todo lo que descubras será contradictorio. Mantener ambos mapas al día **es** parte del trabajo, no una tarea extra.

---

## 🧠 Mini-chequeo

1. Un usuario dice "no me va Internet". El ping a su gateway funciona. ¿Qué compruebas a continuación?
2. ¿En qué capa buscarías un contador de `CRC errors` alto en una interfaz?
3. ¿Por qué se diagnostica de abajo arriba y no al revés?

<details>
<summary>🔄 Respuestas</summary>

1. **Ping más allá del gateway** (por ejemplo `ping 8.8.8.8`): si falla, el problema está en la salida de la red (NAT, ACL, ISP), no en la LAN del usuario.
2. **Capa 1 (Física)**: los errores CRC son típicos de cable defectuoso, interferencia o mal contacto, y se ven con `show interface`.
3. Porque cada capa superior **depende** de las inferiores: no sirve de nada probar DNS si el paquete IP no llega. Empezar por abajo descarta las causas más baratas y rápidas primero.
</details>

---

## ✅ Resumen en 3 frases

- El diagnóstico se hace **de abajo arriba**: física → enlace → red → transporte → aplicación.
- Cada capa tiene sus comprobaciones y comandos: el switch (1-2), el router (3), las ACLs (4) y los servidores (7).
- La **regla de oro** —ping al gateway, luego fuera, luego por nombre— aísla el fallo con tres pruebas.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Troubleshooting | Proceso metódico de localización y corrección de fallos |
| Mapa físico | Cómo están cableados los equipos (qué va a qué puerto) |
| Mapa lógico | IPs, VLANs, rutas y protocolos sobre el físico |
| Capa 1/2 | Cable, LEDs, CRC, MAC table, STP: el "cuerpo" de la red |
| Capa 3/4 | IP, rutas, puertos y ACLs: el "cerebro" de la red |
| Capa 7 | DNS, HTTP, aplicación: el "usuario final" de la red |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-diagnostico-monitorizacion) · **Anterior:** [Índice de la unidad](/ApuntesRedes/11-diagnostico-monitorizacion) · **Siguiente:** [02 · Comandos esenciales](/ApuntesRedes/11-diagnostico-monitorizacion/02-comandos-esenciales)