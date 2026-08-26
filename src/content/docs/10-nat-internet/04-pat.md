---
title: 04 — PAT (sobrecarga)
description: Una IP pública para todos, puertos al rescate 🔁
---

<p><small>Una IP pública para todos, puertos al rescate 🔁</small></p>

> 🗺️ **Estás en:** 🌐 U10 → 04 · PAT (sobrecarga)

---

## 📬 La idea en una frase

> **PAT** (*Port Address Translation*, también "NAT de sobrecarga") hace que **muchas IPs privadas compartan una única IP pública** asignando un puerto fuente distinto a cada conexión.

Es el tipo de NAT más usado del planeta: es el motivo por el que tus 300 alumnos, tus 3 PCs de casa y tu móvil comparten la misma IP pública del router sin pisarse. Estático y dinámico (punto 3) traducían solo la IP; PAT traduce **IP y puerto**, y esa diferencia lo cambia todo.

---

## 🔁 ¿Cómo funciona? La historia de dos PCs

Tienes dos PCs y una única IP pública 83.45.12.78. Ambos usan por casualidad el mismo puerto origen:

```
PC1  192.168.1.10:54321  →  8.8.8.8:80
PC2  192.168.1.20:54321  →  8.8.8.8:53
```

Si el router tradujera solo la IP, ambos saldrían como `83.45.12.78:54321`... y cuando llegara la respuesta, ¿a quién se la entrega? **Colisión garantizada.** La solución de PAT es asignar un puerto global distinto a cada conexión:

```
PC1  83.45.12.78:60001  ←──→  192.168.1.10:54321
PC2  83.45.12.78:60002  ←──→  192.168.1.20:54321
```

Ahora la tabla NAT desambigua perfectamente: la respuesta dirigida a `:60001` es de PC1 y la de `:60002` de PC2. **El puerto efímero global actúa como matrícula de cada conversación.**

### El ciclo completo de una conexión

```
1. PC1 envía: 192.168.1.10:54321 → 8.8.8.8:80
2. El router PAT crea la entrada y traduce el origen:
   salida real: 83.45.12.78:60001 → 8.8.8.8:80
3. La respuesta llega: 8.8.8.8:80 → 83.45.12.78:60001
4. El router consulta la tabla y re-traduce:
   destino real: 83.45.12.78:60001 → 192.168.1.10:54321
5. El PC1 recibe su respuesta. PC2, por su parte, juega en otra fila.
```

> 💡 **Analogía:** PAT es el recepcionista del hotel del punto 1, pero con un detalle: además del número de línea, apunta en su libreta **qué extensión (puerto)** usó cada huésped. Sin esa anotación extra, dos huéspedes que marcaran el mismo número a la vez serían imposibles de separar.

---

## ⚙️ Configuración de PAT en Cisco

```bash
R1(config)# access-list 1 permit 192.168.1.0 0.0.0.255
R1(config)# ip nat inside source list 1 interface g0/1 overload
R1(config)# interface g0/0
R1(config-if)# ip nat inside
R1(config)# interface g0/1
R1(config-if)# ip nat outside
```

Desglose de las piezas:

| Pieza | Qué hace |
|---|---|
| `access-list 1 permit 192.168.1.0 0.0.0.255` | Define qué red interna se traduce (192.168.1.0/24) |
| `interface g0/1 overload` | Usa la IP de la interfaz WAN como pública compartida |
| `overload` | La palabra mágica que activa PAT (reutiliza la IP con puertos) |
| `ip nat inside` / `ip nat outside` | Marca qué interfaz mira a la LAN y cuál a Internet |

La clave de PAT frente al dinámico del punto 3: en lugar de `pool PUBLICO`, usas `interface g0/1` (la propia IP de la interfaz WAN) y añades `overload`. Con eso, no hace falta reservar ni una sola IP extra.

---

## 📊 ¿Cuántas conexiones soporta PAT?

Teóricamente, por cada IP pública hay **65.535 puertos** disponibles (los bien conocidos y los efímeros). PAT puede traducir hasta ~65.000 conexiones simultáneas por IP pública:

```
Puertos TCP + UDP por IP pública:  65.535
Puertos reservados (aprox.):       1.000+
Conexiones simultáneas teóricas:   ~64.000-65.000
Conexiones reales en un router doméstico:  unos pocos miles
```

En la práctica, los routers domésticos se saturan con unos pocos miles de conexiones: cada entrada de la tabla consume memoria, y el procesador tiene que traducir paquete a paquete. Las empresas con mucha carga usan **varias IPs públicas con PAT** (un overload por IP) o balancean entre ellas.

> ⚠️ **Límite realista:** el número teórico de ~65000 conexiones es solo eso: teórico. En el [Fireside del cierre](/ApuntesRedes/10-nat-internet/09-cierre) y en las [No hay preguntas tontas](/ApuntesRedes/10-nat-internet/09-cierre) lo matizamos.

---

## 🧠 Mini-chequeo

1. ¿Qué diferencia fundamental hay entre NAT dinámico y PAT?
2. Dos PCs usan el mismo puerto origen al salir por PAT. ¿Cómo los distingue el router?
3. ¿Para qué sirve la palabra `overload` en la configuración?

<details>
<summary>🔄 Respuestas</summary>

1. NAT dinámico traduce solo la **IP** desde un pool; PAT traduce **IP + puerto**, permitiendo que muchas IPs privadas compartan UNA IP pública.
2. PAT les asigna **puertos globales distintos** (60001, 60002…): el puerto global actúa de identificador único de cada conexión en la tabla NAT.
3. `overload` es el modificador que **activa PAT**: permite reutilizar la misma IP pública para muchas conexiones variando los puertos.
</details>

---

## ✅ Resumen en 3 frases

- PAT traduce **IP + puerto**, no solo la IP: por eso cientos de equipos comparten una pública sin colisionar.
- Se configura con `ip nat inside source list X interface <wan> overload` y las marcas inside/outside.
- Su límite son los ~65.000 puertos por IP pública (menos en hardware doméstico), que se amplía con varias IPs.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| PAT | Port Address Translation: sobrecarga de NAT con puertos |
| Overload | Palabra clave Cisco que activa PAT |
| Puerto global | Puerto efímero que asigna NAT en la IP pública |
| Puerto local | Puerto original del equipo interno |
| Tabla NAT | Registro que asocia cada conexión con su traducción |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-nat-internet) · **Anterior:** [03 · NAT estático y dinámico](/ApuntesRedes/10-nat-internet/03-nat-estatico-y-dinamico) · **Siguiente:** [05 · NAT destino (port forwarding)](/ApuntesRedes/10-nat-internet/05-nat-destino)