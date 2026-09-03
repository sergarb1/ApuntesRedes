---
title: 01 — Modelos cloud
description: IaaS, PaaS y SaaS, y los tres tipos de nube 🏗️
---

<p><small>IaaS, PaaS y SaaS, y los tres tipos de nube 🏗️</small></p>

> 🗺️ **Estás en:** ☁️ U13 → 01 · Modelos cloud

---

## 📬 La idea en una frase

> La nube no es "un sitio donde guardas cosas": es **alquilar capacidad de procesamiento, almacenamiento y red por Internet bajo demanda**. Y según cuánto gestiones tú, hablas de **IaaS, PaaS o SaaS**.

Es el mismo principio que alquilar un piso en lugar de comprarlo: pagas por lo que usas, lo amplías cuando lo necesitas y no te preocupas de la fontanería... salvo que decidas encargarte tú de la fontanería (IaaS), que te la dejen a medio montar (PaaS) o que te entreguen las llaves de un hotel (SaaS).

Esta unidad parte de un punto importante: **la nube no es vapor**. Detrás hay centros de datos con fibra, routers, switches y servidores como los que has estudiado durante toda la asignatura. El salto es que **dejas de tocar el hardware** y operas con software. Esto es el cierre de tu viaje: [en el punto 2](/ApuntesRedes/13-cloud-virtualizacion-futuro/02-virtualizacion-de-redes) verás dónde viven esas VMs.

---

## ☁️ ¿Qué es "la nube" de verdad?

Cuando un proveedor te vende "nube", te está vendiendo **tres recursos básicos bajo demanda**:

| Recurso | Qué alquilas | Ejemplo real |
|---|---|---|
| **Procesamiento** | Procesadores y memoria (VMs o contenedores) | AWS EC2, Azure VMs |
| **Almacenamiento** | Discos virtuales, bases de datos, objetos | AWS S3, Google Drive |
| **Red** | VPC, subredes, balanceadores, firewalls | AWS VPC, Azure VNet |

El término "nube" viene de los diagramas de red: una nube dibujaba "una red compleja cuyo interior no te hace falta dibujar". Hoy esa abstracción es un negocio. La diferencia con un datacenter clásico es que **todo se aprovisiona por API en segundos**, no en semanas de rack y cableado.

> 💡 **Analogía del restaurante:** IaaS = alquilas la cocina (el local, los fogones, la vajilla) y cocinas tú. PaaS = te sirven la masa hecha y el relleno, y tú solo la montas y horneas. SaaS = te sientan y te traen el plato hecho. La red y los servidores siempre están detrás; lo que cambia es **cuánto gestionas tú**.

---

## 🧱 IaaS, PaaS y SaaS: el menú de la nube

| Modelo | Qué ofrece | Qué gestionas tú | Ejemplo |
|---|---|---|---|
| **IaaS** (*Infrastructure as a Service*) | VMs, almacenamiento, redes virtuales | El SO, la app, las redes dentro de la VM | AWS EC2, Azure VMs |
| **PaaS** (*Platform as a Service*) | Plataforma de desarrollo + despliegue | Solo tu código | Heroku, Google App Engine |
| **SaaS** (*Software as a Service*) | Aplicación completa lista para usar | Nada, solo los datos | Gmail, Office 365, Dropbox |

En orden de responsabilidad: en **IaaS** tú pones el sistema operativo, el middleware y la app (y pagas la red virtual). En **PaaS** el proveedor gestiona el SO y la plataforma: despliegas código y listo. En **SaaS** todo está hecho: abres el navegador y usas la aplicación.

> ⚠️ **Trampa de exámenes:** si te dicen "usamos Heroku para desplegar", es **PaaS**. Si te dicen "montamos una VM EC2", es **IaaS**. Si es "usamos Gmail", es **SaaS**. Asocia siempre con el *nivel de control*.

---

## 🏢 Tipos de cloud: pública, privada e híbrida

| Tipo | Descripción | Cuándo usarla |
|---|---|---|
| **Pública** | Recursos compartidos, Internet, **multitenant** | Startups, apps escalables, baja exigencia de control |
| **Privada** | Dedicada a una organización, **on-premise** | Bancos, sanidad, datos muy sensibles |
| **Híbrida** | Mezcla de pública y privada con **interconexión** | Picos de carga en pública + datos críticos en privada |

**Multitenant** significa que un mismo servidor físico atiende a varios clientes a la vez, separados por virtualización y redes virtuales (ahí verás de nuevo el concepto de [VPC en el punto 6](/ApuntesRedes/13-cloud-virtualizacion-futuro/06-cloud-networking)). En la privada, en cambio, la infraestructura es solo tuya, aunque suele ser más cara. La híbrida combina lo mejor de ambos mundos: la privada guarda lo sensible y la pública absorbe los picos con una VPN o conexión dedicada entre ambas.

---

## 💡 ¿Cómo elegir el modelo correcto?

Pregúntate siempre **quién gestiona qué**:

```
¿Necesitas control total del SO y la red? ──► IaaS (EC2, Azure VM)
        │
        ▼
¿Solo quieres desplegar código sin gestionar servidores? ──► PaaS (Heroku, App Engine)
        │
        ▼
¿Quieres una app terminada para usuarios finales? ──► SaaS (Gmail, Dropbox)
```

Y en cuanto al tipo: ¿datos que no pueden salir de tu edificio? **Privada**. ¿Necesitas escalar a millones de usuarios ya? **Pública**. ¿Las dos cosas a la vez? **Híbrida**. No hay una respuesta universal: hay un **presupuesto y un apetito de riesgo** distintos en cada empresa.

---

## 🧠 Mini-chequeo

1. Una empresa despliega una app en una VM EC2 con su propio SO Linux y configura la red virtual. ¿Qué modelo cloud es?
2. El departamento de RRHH usa Gmail y Office 365. ¿Qué modelo cloud es?
3. Un banco guarda los datos de clientes en su propio datacenter pero usa la nube pública para picos de carga. ¿Qué tipo de cloud es?

<details>
<summary>🔄 Respuestas</summary>

1. **IaaS** — gestionas tú el SO y la red dentro de la VM (AWS EC2 es el ejemplo clásico).
2. **SaaS** — aplicaciones completas accesibles por Internet sin gestión de nada (Gmail, Office 365).
3. **Híbrida** — mezcla privada (datos en el datacenter propio) y pública (picos de carga) con interconexión.
</details>

---

## ✅ Resumen en 3 frases

- La nube alquila procesamiento, almacenamiento y red por Internet: **IaaS** (tú lo gestionas todo), **PaaS** (solo tu código) y **SaaS** (nada que gestionar).
- El tipo de cloud se elige según control y sensibilidad de los datos: **pública, privada o híbrida**.
- La nube es física de verdad: todo lo aprendido en la asignatura sigue ahí, operado por software.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| IaaS | Infraestructura bajo demanda (VMs, redes, almacenamiento) |
| PaaS | Plataforma de desarrollo y despliegue gestionada |
| SaaS | Aplicación completa lista para usar |
| Cloud pública | Recursos compartidos, multitenant, por Internet |
| Cloud privada | Dedicada a una organización, on-premise |
| Cloud híbrida | Mezcla pública + privada con interconexión |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/13-cloud-virtualizacion-futuro) · **Anterior:** [Índice de la unidad](/ApuntesRedes/13-cloud-virtualizacion-futuro) · **Siguiente:** [02 · Virtualización de redes](/ApuntesRedes/13-cloud-virtualizacion-futuro/02-virtualizacion-de-redes)