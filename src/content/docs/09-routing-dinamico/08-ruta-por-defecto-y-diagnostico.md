---
title: 08 — Ruta por defecto y diagnóstico
description: Cómo anunciar el camino a Internet y cazar fallos de adyacencia 🔍
---

<p><small>Cómo anunciar el camino a Internet y cazar fallos de adyacencia 🔍</small></p>

> 🗺️ **Estás en:** 🗣️ **U09 · Routing dinámico OSPF** → 08 · Ruta por defecto y diagnóstico

---

## 📬 La idea en una frase

> Con `default-information originate`, el router que tiene la ruta por defecto (su salida a Internet) se la **anuncia a todos** los routers OSPF; y para diagnosticar, hay una escalera de comandos que va de lo físico a lo lógico.

Este punto cierra la teoría: cómo dar a toda la red una **puerta de salida única** hacia Internet, y cómo responder a la frase que más oirás como administrador: *"OSPF no levanta"*.

---

## 🌐 Propagar la ruta por defecto

En la [U08](/ApuntesRedes/08-routing-acls) configuraste rutas por defecto con `ip route 0.0.0.0 0.0.0.0`. Ahora toca **compartirla con el resto de routers OSPF**. En el router que conecta con Internet (el borde, normalmente un ASBR):

```bash
R3(config)# ip route 0.0.0.0 0.0.0.0 serial 0/0/0    ; ruta por defecto local
R3(config)# router ospf 1
R3(config-router)# default-information originate     ; la anuncia a OSPF
```

**Qué pasa después:** R3 inyecta la ruta por defecto como una ruta externa (tipo E2) en OSPF, y todos los routers de todas las áreas aprenden que "para salir a Internet, ve hacia el ASBR". Es la diferencia entre configurar 20 routers a mano y configurar uno.

> 💡 **Variante:** si quieres que se anuncie **siempre**, añade `always`: `default-information originate always`. Con `always`, la ruta se anuncia aunque el router no tenga la estática por defecto configurada. Sin `always`, solo se anuncia si la ruta por defecto existe en la tabla local.

---

## 🔍 Escalera de diagnóstico

El orden importa: **de lo físico a lo lógico**. Cada paso descarta un nivel y te acerca al fallo.

```
Paso 1  ping / show ip interface brief   → ¿hay conectividad capa 3?
Paso 2  show ip protocols                → ¿OSPF arranca y declara las redes?
Paso 3  show ip ospf neighbor            → ¿hay vecinos? ¿están en FULL?
Paso 4  show ip ospf database            → ¿la LSDB tiene los LSAs de todos?
Paso 5  show ip route ospf               → ¿aparecen las rutas (prefijo O)?
```

**Causas típicas de "no forma vecindad"** (la lista que cualquier admin repite de memoria):

| Causa | Comando que lo delata |
|---|---|
| Las IPs no hacen ping (capa 3 rota) | `ping` falla |
| El área no coincide entre vecinos | `show ip ospf neighbor` vacío / `show ip protocols` |
| Router ID duplicado | Vecinos que aparecen y desaparecen |
| ACL bloqueando OSPF (protocolo 89) | `show access-lists` / contadores |
| Red no declarada con `network` o wildcard mal | `show ip ospf interface` no muestra la interfaz |
| Hello/Dead timers distintos | `show ip ospf interface` en ambos lados |

> ⚠️ **Y la que más despista:** el **process ID no tiene que coincidir**. Dos routers con `router ospf 1` y `router ospf 2` pueden formar vecindad perfectamente. Lo que tiene que coincidir es el **área**, la **wildcard**, los **timers** y que no haya **firewall/ACL** de por medio.

---

## 🔬 Comandos de verificación completos

```bash
R1# show ip ospf neighbor          → Ver vecinos OSPF (estado, DR/BDR)
R1# show ip ospf database          → Ver LSDB (LSAs de todos los routers)
R1# show ip route ospf             → Rutas aprendidas por OSPF
R1# show ip protocols              → Protocolos de routing activos
R1# debug ip ospf events           → Depurar eventos OSPF (¡con cuidado!)
R1# show ip ospf interface         → Coste, timers y estado por interfaz
```

> 💡 **Un truco de diagnóstico:** `show ip ospf neighbor` vacío pero el enlace con ping OK → el problema está en el **plano OSPF** (área, wildcard, timers, ACL). En cambio, si el ping ya falla, ni te molestes en mirar OSPF: el fallo está más abajo. El laboratorio del [cierre](/ApuntesRedes/09-routing-dinamico/09-cierre) y el boletín avanzado te harán practicar esta escalera.

---

## 🏷️ Leer la tabla de rutas OSPF

Cuando hagas `show ip route ospf`, el prefijo te cuenta la historia:

| Prefijo | Significado |
|---|---|
| `O` | Ruta **interna** al área (la calcula tu propio SPF) |
| `O IA` | Ruta **inter-área** (aprendida a través de un ABR) |
| `O*E2` | Ruta **externa** (la ruta por defecto del ASBR: predeterminada E2) |
| `O E1` / `O E2` | Ruta externa redistribuida (E1 suma el coste interno; E2 no) |

**Ejemplo real de `show ip route`:**
```
R3# show ip route ospf
     10.1.0.0/24 [110/2] via 10.0.0.2, 00:12:03, GigabitEthernet0/0
O IA 10.2.0.0/24 [110/3] via 10.0.1.2, 00:09:41, Serial0/1/0
O*E2 0.0.0.0/0   [110/1] via 10.0.1.2, 00:05:12, Serial0/1/0
```
- `110` es la **administrative distance** de OSPF (se prefiere ante conflictos con otros protocolos).
- El segundo número `[110/2]` es el **coste** acumulado del camino: por eso `show ip route` también responde al [punto 6](/ApuntesRedes/09-routing-dinamico/06-coste-ospf).

**Tabla de AD para recordar (de menor a mayor, más confiable primero):** conectada 0 → estática 1 → eBGP 20 → **OSPF 110** → RIP 120. A menor AD, más preferida: cuando dos protocolos anuncian la misma ruta, gana la de AD menor.

---

## 🧠 Mini-chequeo

1. ¿Qué comando convierte a un router en "emisor" de la ruta por defecto hacia el resto de OSPF?
2. Dos routers no forman vecindad pero el ping entre ellos funciona. ¿Por dónde sigues diagnosticando?
3. ¿Qué diferencia hay entre `default-information originate` y `default-information originate always`?

<details>
<summary>🔄 Respuestas</summary>

1. `default-information originate` (dentro de `router ospf <id>`), en el router que tiene la salida a Internet.
2. Al **plano OSPF**: `show ip ospf interface` (área, wildcard, timers), `show ip protocols` y revisar ACLs que bloqueen el protocolo 89.
3. Con `always`, la ruta por defecto se anuncia **siempre**; sin `always`, solo si la ruta por defecto existe localmente en la tabla de rutas.
</details>

---

## ✅ Resumen en 3 frases

- `default-information originate` propaga la ruta por defecto del ASBR a **toda** la red OSPF (con `always`, incondicionalmente).
- El diagnóstico es una escalera **de abajo arriba**: ping → protocolos → vecinos → LSDB → rutas.
- Cuando el proceso ID "no coincide"… no es el problema: mira área, wildcard, timers y ACLs.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| default-information originate | Anuncia la ruta por defecto a OSPF |
| always | Fuerza el anuncio aunque no exista la ruta local |
| Protocolo 89 | Número de protocolo IP de OSPF |
| AD | Administrative Distance (110 para OSPF) |
| Prefijo O | Rutas internas OSPF en `show ip route` |
| debug ip ospf events | Traza en tiempo real de los eventos OSPF |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-dinamico) · **Anterior:** [07 · Configuración OSPF](/ApuntesRedes/09-routing-dinamico/07-configuracion-ospf) · **Siguiente:** [09 · Cierre](/ApuntesRedes/09-routing-dinamico/09-cierre)