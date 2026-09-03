---
title: 07 — ACL estándar
description: Filtrar por IP origen con acceso-list y wildcards, colocándola cerca del destino 🎯
---

<p><small>Filtrar por IP origen con acceso-list y wildcards, colocándola cerca del destino 🎯</small></p>

> 🗺️ **Estás en:** 🧭 **U09 · Routing y ACLs** → 07 · ACL estándar

---

## 📬 La idea en una frase

> Una **ACL estándar** es una lista numerada que filtra el tráfico **solo por dirección IP de origen** usando una wildcard mask, y por eso se aplica **lo más cerca posible del destino**.

En el punto 6 viste el mapa de los tipos. Ahora toca ensuciarse las manos con la más sencilla: la estándar. Su limitación (solo mira el origen) es la que define su colocación y sus peligros. Manejarla bien es el primer nivel de destreza ACL.

---

## 🧮 Sintaxis y wildcard: los números al revés

La sintaxis de una ACL estándar es solo dos palabras y una IP (con su wildcard):

```bash
access-list {número} [permit | deny] {origen} {wildcard}
```

Pero hay un trampa con la **wildcard mask**: es el **inverso** de la máscara de subred. Donde la subred dice "1 = fijo", la wildcard pone "0 = fijo"; donde la subred dice "0 = libre", la wildcard pone "1 = cualquier valor". Es el espejo:

| Máscara de subred | Wildcard equivalente | Qué coincide |
|---|---|---|
| `255.255.255.0` | `0.0.0.255` | Los primeros 24 bits fijos → toda una /24 |
| `255.255.255.255` | `0.0.0.0` | Todos los bits fijos → **solo esa IP** (host) |
| `255.255.0.0` | `0.0.255.255` | Los primeros 16 bits fijos → una /16 |
| `255.255.255.128` | `0.0.0.127` | Los primeros 25 bits fijos → una /25 |

Para pasarlas sin sufrimiento: **resta cada octeto a 255** (o imagina el espejo de la máscara). `255.255.255.0` → `0.0.0.255`. Sencillo y mecánico.

> ⚠️ **CONRAD:** "¿Crees que en `access-list` pones la máscara de subred normal? Estás invitado a ver cómo no bloquea nada de lo que creías. La ACL habla en wildcards. La máscara normal es cosa de `ip route` (punto 3). Dos mundos, dos vocabularios."

---

## 📝 Ejemplo completo: bloquear el resto de la red salvo la oficina

Escenario clásico: la red de administración (192.168.1.0/24) debe poder alcanzar el servidor de la otra red, pero nadie más.

```bash
R1(config)# access-list 10 permit 192.168.1.0 0.0.0.255
R1(config)# access-list 10 deny any                    # Opcional: ya está implícito
R1(config)# interface g0/1
R1(config-if)# ip access-group 10 out
```

Leído en cristiano: "permite el tráfico **originado** en cualquier IP de 192.168.1.0/24; el resto, a la calle." El `deny any` es redundante (ya es implícito), pero escribirlo te hace más legible la intención — en producción se suele dejar fuera porque los contadores se leen mejor.

¿Y si solo quieres que un único PC pase? Wildcard de host:

```bash
R1(config)# access-list 10 permit 192.168.1.10 0.0.0.0
```

`0.0.0.0` = host exacto: solo la IP 192.168.1.10 (nada más, ni la que le sigue).

---

## 🗺️ ¿Por qué una estándar se coloca cerca del destino?

La pregunta que sale en el examen palabra por palabra: *¿dónde pongo la ACL estándar y por qué?*

La respuesta es el ancla de todo este punto:

- La estándar **solo filtra por origen**. Si la pones cerca del origen (digamos en tu router de borde), bloquea a toda esa subred *para todo* — ya no distingues si iba a la web, al servidor de nóminas o a una impresora.
- Colocada **cerca del destino**, decides *exactamente quién llega hasta ahí*. Un intruso mal contenido en el camino no llega a la víctima.

```
                    (colocación A: cerca de origen)        (colocación B: cerca de destino)
origen ─── routerA ──── routerB ──── routerC ──── destino
```

- En **A** bloqueas un origen para todo el mundo.
- En **B** (correcto para estándar) decides quién alcanza el destino concreto. El tráfico permitido gasta ancho de banda de por medio, pero es la única manera de saber "a quién dejo llegar aquí".

---

## 🔎 Verificación: ¿está funcionando lo que escribí?

Dos comandos te cuentan la verdad:

| Comando | Qué te dice |
|---|---|
| `show access-lists` | Las listas y sus **contadores de hits** (matches) por línea |
| `show access-lists 10` | Solo la ACL 10 |
| `show ip interface g0/1` | Qué ACL está aplicada a esa interfaz (y en qué sentido) |

```bash
R1# show access-lists 10
Standard IP access list 10
    10 permit 192.168.1.0 0.0.0.255 (12 matches)
    20 deny   any                  (3 matches)
```

Los números entre paréntesis son tus paquetes que han caído en cada línea. ¿Una regla que no ve "matches"? O no pasa tráfico por ahí, o está mal colocada/escrita: diagnóstico instantáneo.

---

## 🧠 Mini-chequeo

1. Traduce la wildcard `0.0.0.255`: ¿qué bits quedan "libres"?
2. Escribe la ACL que permita solo al host 10.0.0.50 y la apliques outbound en G0/2.
3. ¿Por qué una ACL estándar se coloca cerca del destino y no del origen?

<details>
<summary>🔄 Respuestas</summary>

1. Los **24 primeros bits son fijos** (red) y el último octeto (255 = todos 1s en la wildcard) está libre: coincide con toda la subred /24 del origen indicado.
2. `access-list 10 permit 10.0.0.50 0.0.0.0` → `interface g0/2` → `ip access-group 10 out`.
3. Porque la estándar solo mira el **origen**: si la colocas cerca del origen, bloqueas todo el tráfico de esa IP para cualquier destino. Cerca del destino controlas exactamente quién puede llegar hasta ahí.
</details>

---

## ✅ Resumen en 3 frases

- La ACL estándar filtra **solo por IP origen** usando el número inverso de la máscara: la wildcard.
- `0.0.0.255` = /24, `0.0.0.0` = host exacto, y el `deny any` final es invisible pero implacable.
- Por su ceguera ante el destino, se coloca **cerca del destino**, y `show access-lists` te enseña quién cae en cada línea.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Wildcard mask | Inverso de la máscara de subred (0=fijo, 1=libre) |
| Host exacto | Wildcard `0.0.0.0`: solo coincide esa IP |
| Contadores de hits | Paquetes que han coincidido con cada línea |
| ip access-group | Aplica la ACL numerada a la interfaz |
| ACL estándar | Filtra por IP origen, rango 1-99 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/09-routing-acls) · **Anterior:** [06 · ACLs: concepto y tipos](/ApuntesRedes/09-routing-acls/06-acls-conceptos) · **Siguiente:** [08 · ACL extendida y nombrada](/ApuntesRedes/09-routing-acls/08-acl-extendida-y-nombrada)