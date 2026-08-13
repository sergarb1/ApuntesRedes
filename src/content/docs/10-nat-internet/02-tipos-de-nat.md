---
title: 02 — Tipos de NAT
description: Cuatro formas de traducir y cuándo usar cada una 🗂️
---

<p><small>Cuatro formas de traducir y cuándo usar cada una 🗂️</small></p>

> 🗺️ **Estás en:** 🌐 U10 → 02 · Tipos de NAT

---

## 📬 La idea en una frase

> NAT no es una sola técnica: son **cuatro** (estático, dinámico, PAT y destino) que responden a una misma pregunta con estrategias distintas —¿quién traduce a quién y cuándo?

Ya sabes qué es NAT y por qué existe (punto 1). Ahora toca conocer su caja de herramientas: cada tipo resuelve un escenario concreto, del servidor que debe ser accesible desde fuera a los 300 alumnos que salen por una misma IP.

---

## 🗂️ Los 4 tipos de NAT

| Tipo | Descripción | Uso típico |
|---|---|---|
| **NAT estático** | 1 IP privada ↔ 1 IP pública (fijo, 1:1) | Servidores accesibles desde fuera |
| **NAT dinámico** | Pool de IPs públicas, asignación dinámica al vuelo | Varias IPs públicas disponibles para salir |
| **PAT (NAT overload)** | Muchas IPs privadas ↔ 1 IP pública variando puertos | El método más común: toda la LAN sale por una IP |
| **NAT destino** | Puerto público ↔ IP:puerto privado (port forwarding) | Exponer servicios internos al exterior |

> 💡 **Dos familias:** los tres primeros son **NAT de origen** (traducen la IP de quien sale), y el último es **NAT de destino** (traduce la IP de quien entra). Esta distinción es oro en exámenes y entrevistas.

---

## 🏢 La analogía del edificio de oficinas

Imagina un edificio de 200 empleados con una única dirección postal pública. Cada tipo de NAT es una política de recepción distinta:

- **NAT estático:** el despacho del director tiene una **línea directa fija** con su nombre. Todo el mundo sabe que llamando a esa línea hablas con él. 1 a 1, para siempre.
- **NAT dinámico:** hay **4 salas de reuniones con teléfono propio**. Cuando un empleado necesita hablar con el exterior, se le asigna una de las 4 líneas mientras dure su llamada. Cuando termina, la línea vuelve al pool.
- **PAT:** todos los empleados usan el **mismo teléfono de la centralita**, y la recepcionista apunta "fulanito habló por la extensión 3" para devolverle la llamada correcta. Muchos a uno, diferenciados por puerto.
- **NAT destino:** la **ventanilla de paquetería** recibe el correo y lo reparte al departamento adecuado: "para el departamento de ventas, se lo lleva la extensión 404". El exterior solo conoce el buzón público.

---

## 🧭 ¿Cuál uso en cada caso?

La decisión depende de **qué necesitas**:

```
¿Necesitas exponer un servicio interno?   → NAT destino (entrante)
¿Tienes una IP pública de sobra y un
  servidor fijo?                          → NAT estático (1:1)
¿Tienes varias IPs públicas y usuarios
  que solo salen?                         → NAT dinámico (pool)
¿Tienes UNA IP pública y cientos de
  usuarios?                               → PAT (sobrecarga)  ← el estándar
```

Regla práctica: **en el mundo real, casi todo es PAT para salir + NAT destino para entrar.** Estático y dinámico son más raros: el primero para servidores con IP fija dedicada, el segundo cayó en desuso al ser caro (necesitas un pool de IPs públicas) y poco flexible.

### Resumen comparativo de los 4 tipos

| Tipo | Traduce | Dirección | ¿Entrante? | Coste en IPs |
|---|---|---|---|---|
| Estático | IP | Origen | Sí (IP fija) | 1 pública por equipo |
| Dinámico | IP | Origen | No | 1 pool para todos |
| PAT | IP + puerto | Origen | No (sin abrir puertos) | 1 pública para todos |
| Destino | IP + puerto | Destino | Sí (por puerto) | Ninguna extra |

Fíjate en la columna "Entrante": **solo estático y destino** dejan entrar tráfico desde fuera. Es la tabla que te sacará de dudas en el examen de identificar tipos.

---

## 🔗 Cada tipo, en su punto

Cada técnica tiene su propio capítulo en esta unidad, con comandos y ejemplos:

- [03 · NAT estático y dinámico](/ApuntesRedes/10-nat-internet/03-nat-estatico-y-dinamico) → el 1:1 fijo y el pool.
- [04 · PAT (sobrecarga)](/ApuntesRedes/10-nat-internet/04-pat) → la traducción con puertos.
- [05 · NAT destino (port forwarding)](/ApuntesRedes/10-nat-internet/05-nat-destino) → abrir puertos hacia dentro.

---

## 🧠 Mini-chequeo

1. ¿Cuál es la diferencia conceptual entre NAT de origen y NAT de destino?
2. Una empresa tiene 6 IPs públicas y 200 usuarios que solo navegan. ¿Qué tipo usarías? ¿Y si tuviera solo 1 IP pública?
3. ¿Para qué sirve NAT estático si ya existe NAT destino?

<details>
<summary>🔄 Respuestas</summary>

1. El **NAT de origen** traduce la IP del equipo que inicia la conexión (estático, dinámico, PAT). El **NAT de destino** traduce la IP del tráfico entrante hacia un servidor interno (port forwarding).
2. Con 6 IPs públicas podrías usar **NAT dinámico** (pool) o, mejor, PAT con esas IPs. Con 1 sola IP pública, **PAT** es la única opción viable.
3. NAT estático sirve cuando un servidor tiene **una IP pública fija dedicada** y debe recibir tráfico en cualquier puerto (o varios), sin depender de reglas puerto a puerto como NAT destino.
</details>

---

## ✅ Resumen en 3 frases

- NAT tiene **4 sabores**: estático (1:1 fijo), dinámico (pool), PAT (muchos:1 con puertos) y destino (entrante por puerto).
- Hay dos familias: **NAT de origen** (los tres primeros) y **NAT de destino** (port forwarding).
- En producción domina la combinación **PAT para salir + NAT destino para entrar**.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| NAT estático | Traducción fija 1 IP privada ↔ 1 IP pública |
| NAT dinámico | Asignación de una IP pública desde un pool |
| PAT | Sobrecarga: muchas IPs privadas comparten una pública con puertos |
| NAT destino | Port forwarding: puerto público → IP:puerto interno |
| Pool | Conjunto de IPs públicas disponibles para asignar |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/10-nat-internet) · **Anterior:** [01 · ¿Qué es NAT?](/ApuntesRedes/10-nat-internet/01-que-es-nat) · **Siguiente:** [03 · NAT estático y dinámico](/ApuntesRedes/10-nat-internet/03-nat-estatico-y-dinamico)