---
title: 01 — ¿Qué es una VLAN?
description: Una red lógica dentro de un switch físico 🏢
---

<p><small>Una red lógica dentro de un switch físico 🏢</small></p>

> 🗺️ **Estás en:** 🏢 **U07 · VLANs** → 01 · ¿Qué es una VLAN?

---

## 📬 La idea en una frase

> Una **VLAN** (*Virtual Local Area Network*) es una **red lógica** creada dentro de un switch físico: los dispositivos de la misma VLAN se comportan como si estuvieran conectados al mismo switch, aunque físicamente compartan hardware con otras VLANs que "no ven".

En U06 viste el switch como un dispositivo que aprende MACs y segmenta el unicast. Ahora le damos un paso más: comprar un switch por departamento es caro, así que partimos uno solo en varios "pedazos" lógicos. Es como un edificio de oficinas: la infraestructura (luz, ascensor, paredes) es común, pero los departamentos no se enteran del ruido de los vecinos.

---

## 🏢 La motivación: no hace falta un switch por departamento

Imagina una empresa con tres departamentos y un único switch de 48 puertos. Sin VLANs, el tráfico de Ventas, RRHH y Dirección **comparten el mismo dominio de broadcast**: el ARP, el DHCP o las videollamadas de un departamento acaban por los puertos de los demás. Eso trae tres problemas gordos:

| Problema | Sin VLANs | Con VLANs |
|---|---|---|
| **Broadcast** | Un broadcast llega a todos los puertos | Cada VLAN es un dominio de broadcast independiente |
| **Seguridad** | Cualquiera puede olfatear el tráfico de los demás | Los unicasts de una VLAN no se reenvían a otras |
| **Flexibilidad** | Reorganizar departamentos = mover cables o comprar switches | Cambiar la VLAN de un puerto es una línea de configuración |

La tabla de ventajas que presentó la unidad anterior sigue siendo la carta de presentación de las VLANs:

| Ventaja | Descripción |
|---|---|
| **Segmentación** | Separa el tráfico de departamentos sin añadir hardware |
| **Reducción de broadcast** | Cada VLAN tiene su propio dominio de broadcast |
| **Seguridad** | Los de VLAN 10 no ven el tráfico de VLAN 20 |
| **Flexibilidad** | Mover a un usuario a otra VLAN = reconfigurar su puerto |
| **Rendimiento** | Menos broadcast y menos tamaño de tabla MAC = mejores tiempos |
| **Simplificación** | Agrupar dispositivos por función, no por ubicación física |

> 💡 **El truco mental:** dentro del switch, cada VLAN es un **switch virtual independiente** con su propia tabla MAC. El switch NO reenvía tramas entre VLANs: es como si no existieran entre sí a nivel de capa 2.

---

## 🕳️ El dominio de broadcast: el límite de la capa 2

Un **dominio de broadcast** es el conjunto de dispositivos que reciben un broadcast (por ejemplo, una trama ARP). En un switch plano, todos los puertos pertenecen a un único dominio de broadcast.

Al crear VLANs, decides **dónde terminan los dominios**:

```
Sin VLANs (un solo dominio de broadcast):
┌────────────────────────────────────┐
│       SWITCH (1 dominio bcast)     │
│  Fa0/1  Fa0/2  Fa0/3  ...  Fa0/48 │
│  PC-A    PC-B    PC-C      PC-D    │
└────────────────────────────────────┘
   Un ARP de PC-A lo ven TODOS.

Con VLANs (3 dominios de broadcast):
┌────────────────────────────────────────────┐
│             SWITCH FÍSICO                  │
│  ┌─VLAN 10─┐  ┌─VLAN 20─┐  ┌─VLAN 30─┐    │
│  │Fa0/1-16 │  │Fa0/17-32│  │Fa0/33-48│    │
│  │ Ventas  │  │ RRHH    │  │ IT      │    │
│  └─────────┘  └─────────┘  └─────────┘    │
│   3 dominios de broadcast separados         │
└────────────────────────────────────────────┘
```

Este es el punto clave de la capa 2 que luego usarás con los routers: **dos VLANs que comparten switch no se ven**. Y "no verse" es exactamente lo que quieres entre departamentos.

---

## 🌐 VLAN 1: la que viene instalada de fábrica

Todos los switches Cisco traen creada la **VLAN 1** y todos los puertos arrancan asignados a ella. Es la VLAN "por defecto" del switch.

| Dato de la VLAN 1 | Valor |
|---|---|
| VLAN por defecto | VLAN 1 (siempre existe, no se puede borrar) |
| Puerto por defecto | Todos los puertos arrancan como access en VLAN 1 |
| Native VLAN por defecto | VLAN 1 (la verás en el punto 3 de trunks) |
| Buena práctica | **No usar VLAN 1 para datos** |

> ⚠️ **CONRAD dice:** "VLAN 1 es el camino de entrada de todo el que no ha configurado nada. Clientes, intrudores y novatos comparten la misma VLAN sin darse cuenta. Cambia la native VLAN, desactiva DTP y usa VLANs numeradas para cada cosa. Y si alguien te pregunta por qué, diles que CONRAD se lo dijo."

Varias marcas usan VLANs numeradas como estándar para evitar la VLAN 1 (Cisco recomienda reservarla y usar VLANs de datos como 10/20/30). Los detalles de hardening los verás en el [punto 7](/ApuntesRedes/07-vlans/07-seguridad-en-vlans).

---

## 🏷️ Los tipos de VLAN a vista de pájaro

Hay más de un tipo de VLAN y cada uno tiene un trabajo. Esta tabla es un adelanto; el [punto 2](/ApuntesRedes/07-vlans/02-tipos-de-vlan) la desarrolla:

| Tipo | Función | Ejemplo |
|---|---|---|
| **VLAN de datos** | Tráfico normal de usuario | VLAN 10 Ventas, VLAN 20 RRHH |
| **VLAN nativa** | Sin etiquetar en el trunk | Por defecto VLAN 1, configurable |
| **VLAN de voz** | Teléfonos IP con prioridad QoS | VLAN 100 voz |
| **VLAN de gestión** | Administración del switch (SSH, SNMP) | VLAN 999 gestión |

> 💡 **Por qué a Windows ya le funciona todo:** cuando conectas un PC a un switch recién configurado con `switchport access vlan 10`, el PC no entiende de VLANs. El switch se encarga de *separar* el tráfico él solito: el PC solo ve "una red normal", pero es una red virtual.

---

## 🧠 Mini-chequeo

1. ¿Qué es exactamente una VLAN y qué relación tiene con el dominio de broadcast?
2. ¿Por qué se considera una buena práctica no usar la VLAN 1 para el tráfico de datos?
3. Dos PCs en VLAN 10 y VLAN 20 comparten el mismo switch físico. ¿Pueden hablarse por el switch directamente? ¿Por qué?

<details>
<summary>🔄 Respuestas</summary>

1. Una **VLAN** es una red lógica dentro de un switch físico: cada VLAN constituye su propio dominio de broadcast y su propia tabla MAC. El switch trata cada VLAN como un switch virtual independiente.
2. Porque es la **VLAN por defecto**: todos los puertos arrancan en ella, se usa como native VLAN y suele quedar fuera de los hardening. Es el primer objetivo de un atacante y donde acaba todo el tráfico mal etiquetado.
3. **No.** Las VLANs aíslan en capa 2: el switch no reenvía tramas entre VLANs. Para comunicarse necesitan un router o un switch de capa 3 (lo verás en los puntos 4 y 5).

</details>

---

## ✅ Resumen en 3 frases

- Una VLAN es un **switch virtual** dentro del switch físico: cada una con su dominio de broadcast y su tabla MAC.
- Las VLANs aportan **segmentación, seguridad, flexibilidad y rendimiento**, y evitan comprar un switch por departamento.
- La **VLAN 1** es la de fábrica y conviene reservarla: los datos deben vivir en VLANs dedicadas.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| VLAN | Red lógica dentro de un switch físico |
| Dominio de broadcast | Grupo de dispositivos que reciben un mismo broadcast |
| VLAN 1 | VLAN por defecto de fábrica (datos, native, gestión si no se cambia) |
| Segmentación | Dividir el tráfico por departamentos u funciones |
| "No se ven" | Las VLANs aíslan en capa 2: no se reenvían tramas entre ellas |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-vlans) · **Anterior:** [Índice de la unidad](/ApuntesRedes/07-vlans) · **Siguiente:** [02 · Tipos de VLAN](/ApuntesRedes/07-vlans/02-tipos-de-vlan)