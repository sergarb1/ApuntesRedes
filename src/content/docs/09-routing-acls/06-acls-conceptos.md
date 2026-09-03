---
title: "06 — ACLs: concepto y tipos"
description: "Las listas de la compra del router: permitir, negar y dónde colgarlas 🛡️"
---

<p><small>Las listas de la compra del router: permitir, negar y dónde colgarlas 🛡️</small></p>

> 🗺️ **Estás en:** 🧭 **U09 · Routing y ACLs** → 06 · ACLs: concepto y tipos

---

## 📬 La idea en una frase

> Una **ACL (Access Control List)** es una lista secuencial de reglas `permit`/`deny` que el router evalúa en orden para decidir **qué tráfico deja pasar y qué bloquea**, aplicada a una interfaz en sentido de entrada o de salida.

Acabaste el mundo del routing: el router ya sabe *por dónde* ir. Ahora toca decidir *a quién* dejamos pasar por esa carretera. Las ACLs son el portero de la discoteca de tu red: revisa una a una las reglas de la lista hasta que una coincide.

---

## 📜 Qué es una ACL y cómo se evalúa

Una ACL no es un "concepto": es una **lista numerada de condiciones en orden**. El router evalúa el tráfico **línea por línea, de arriba a abajo**, y en cuanto hay coincidencia, aplica la acción de esa línea (permitir o denegar) y **deja de mirar**.

```
Trafico → ¿coincide línea 1? ──sí──▶ permit/deny (FIN)
    │
    └no── ¿coincide línea 2? ──sí──▶ permit/deny (FIN)
              │
              └no── ... hasta llegar al final
```

> ⚠️ **La regla más importante de toda la unidad — DENY ANY IMPLÍCITO:**
> Al final de toda ACL hay un **deny any implícito**. Si el tráfico no coincide con NINGUNA línea, se **descarta**. Por eso, una ACL sin un `permit any` final se convierte en el "no entra nada" definitivo.

Dos consecuencias prácticas que te harán ganar horas de debugging:

- El **orden importa**: una regla más general puesta antes que una más específica se "come" al resto.
- Casi siempre acabarás con un `permit ... any` o `deny ... any` al final para controlar lo que no has listado.

---

## 🗂️ Los tipos de ACL: estándar, extendida y nombrada

| Tipo | Rango de números | Filtra por | Regla de colocación |
|---|---|---|---|
| **Estándar** | 1-99, 1300-1999 | Solo IP **origen** | Lo más cerca posible del **destino** |
| **Extendida** | 100-199, 2000-2699 | Origen, **destino**, protocolo y **puerto** | Lo más cerca posible del **origen** |
| **Nombrada** | Nombre personalizado | Igual que la extendida (o estándar) | Según el tipo que use |

- La **estándar** es simple: "permito a los de esta IP". Pero como solo mira el origen, si la colocas cerca del origen, bloquea todo lo que venga de esa fuente (aunque vaya a una víctima inocente). Por eso se coloca **cerca del destino**: así estás seguro de a quién permites llegar hasta ahí.
- La **extendida** es la todóloga: puede decir "permito HTTP desde la 192.168.1.0/24 hacia 8.8.8.8". Como puede ser tan precisa, se coloca **cerca del origen**: así el tráfico indeseado se bloquea antes de gastar ancho de banda en la red.
- La **nombrada** usa un nombre (`BLOQUEAR_YOUTUBE`) en lugar de un número, para que la lista diga algo humano.

---

## 🚪 Dónde aplicar la ACL: inbound u outbound

La ACL no funciona sola: hay que **colgarla de una interfaz** con `ip access-group`:

| Aplicación | Cuándo se evalúa | Ejemplo de uso |
|---|---|---|
| **Inbound** | Antes de que el router enrute (a la entrada de la interfaz) | Filtrar tráfico que entra a tu red desde el exterior |
| **Outbound** | Después de que el router enrute, antes de salir por la interfaz | Restringir qué sale de tu red hacia fuera |

La diferencia práctica importa para el byte en cuestión de eficiencia:

- **Inbound** ahorra trabajo de CPU: el paquete se descarta **antes** de que el router pierda tiempo enrutándolo.
- **Outbound** evalúa después de la decisión de ruta, pero permite saber *hacia dónde* va el tráfico.

```bash
R1(config)# interface g0/1
R1(config-if)# ip access-group 10 out      → ACL estándar 10 en salida
R1(config-if)# ip access-group 101 in      → ACL extendida 101 en entrada
```

> ⚠️ **CONRAD:** "Una ACL por sentido por interfaz. DOS ACLs por interfaz (una in + una out) un día te darán sorpresas: evalúan en sitios distintos de la cadena. Piensa si quieres trocear antes o después de enrutar."

---

## 🧭 La regla práctica que te salvará en el examen

Resumiendo la colocación en una frase que entra sola:

> **Las ACLs extendidas, cerca del origen (bloquean antes, ahorran ancho de banda). Las ACLs estándar, cerca del destino (no pueden filtrar por destino, así que las colocas donde marcas quién llega).**

Si alguna vez un instructor te pregunta "¿dónde aplico esta ACL?", responde con eso y tendrás medio ejercicio ganado.

---

## 🧠 Mini-chequeo

1. ¿Cuál es la línea que "todas las ACLs llevan escondida al final"?
2. ¿Qué direcciones filtra una ACL estándar? ¿Y una extendida?
3. ¿En qué se diferencian paran "inbound" y "outbound" respecto al trabajo del router?

<details>
<summary>🔄 Respuestas</summary>

1. El **deny any implícito**: si ninguna línea coincide, el tráfico se descarta. Por eso casi siempre se añade un `permit ... any` explícito al final.
2. La estándar solo la **IP origen**. La extendida puede filtrar por **origen y destino, protocolo y puerto**.
3. **Inbound** evalúa antes de enrutar (descarta antes de gastar CPU enrutando); **outbound** evalúa después de enrutar, ya sabiendo hacia dónde se dirige el paquete.
</details>

---

## ✅ Resumen en 3 frases

- Las ACLs son **listas ordenadas de permit/deny** evaluadas de arriba a abajo, con un **deny any implícito** al final de todo.
- Hay tres sabores: **estándar** (origen, cerca del destino), **extendida** (origen/destino/puerto/protocolo, cerca del origen) y **nombrada**.
- Se cuelgan de una interfaz como **inbound** (antes de enrutar) u **outbound** (después de enrutar).

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| ACL | Lista secuencial de reglas permit/deny |
| Deny any implícito | Regla final invisible que descarta lo no permitido |
| ACL estándar | Filtra solo por IP origen (números 1-99) |
| ACL extendida | Filtra por origen, destino, protocolo y puerto (100-199) |
| ip access-group | Comando que aplica la ACL a una interfaz |
| Inbound / Outbound | Sentido (entrada / salida) en que se evalúa |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-acls) · **Anterior:** [05 · Cómo decide un router](/ApuntesRedes/09-routing-acls/05-como-decide-el-router) · **Siguiente:** [07 · ACL estándar](/ApuntesRedes/09-routing-acls/07-acl-estandar)