---
title: Boletín de ACLs y seguridad de red — Packet Tracer resuelto
description: Soluciones paso a paso de las ACLs, VTY y port security en Packet Tracer ✅
---

> Misma numeración y enunciados que el [por-resolver](/ApuntesRedes/boletines/boletin-u11-packettracer). Comandos, valores exactos y qué deberías ver en cada paso.

---

## 1. La red en pie, y una web que abre

**Solución:**

```
! R1
R1(config)# interface g0/0
R1(config-if)# ip address 192.168.1.1 255.255.255.0
R1(config-if)# no shutdown
R1(config)# interface g0/1
R1(config-if)# ip address 10.0.0.1 255.255.255.252
R1(config-if)# no shutdown
R1(config)# ip route 192.168.2.0 255.255.255.0 10.0.0.2

! R2
R2(config)# interface g0/0
R2(config-if)# ip address 10.0.0.2 255.255.255.252
R2(config-if)# no shutdown
R2(config)# interface g0/1
R2(config-if)# ip address 192.168.2.1 255.255.255.0
R2(config-if)# no shutdown
R2(config)# ip route 192.168.1.0 255.255.255.0 10.0.0.1
```

**Esperado:** `PC1` abre `http://192.168.2.10` en el navegador y el `ping` a SRV1 responde. Sin ACLs, todo pasa: ese es el punto de partida.

---

## 2. ACL estándar: echar a PC1 de la LAN2

**Solución:**

```
R2(config)# access-list 10 deny host 192.168.1.10
R2(config)# access-list 10 permit any
R2(config)# interface g0/1
R2(config-if)# ip access-group 10 out
```

**Esperado:**

- `ping` de `PC1` a `192.168.2.10` → **falla** (timeout; la ACL descarta en silencio).
- `ping` de `PC2` → **OK**.
- `show access-lists 10` → el contador de `deny host 192.168.1.10` sube con cada intento de PC1; el de `permit` con el tráfico de PC2.

**Por qué en `G0/1 out`:** una ACL estándar filtra solo por origen, así que se coloca **lo más cerca posible del destino**, para no bloquear a PC1 el acceso a otras redes que nada tienen que ver.

---

## 3. Wildcards: solo pasa la mitad de la LAN

**Solución:**

```
R2(config)# interface g0/1
R2(config-if)# no ip access-group 10 out
R2(config)# no access-list 10
R2(config)# access-list 20 permit 192.168.1.16 0.0.0.15
R2(config)# interface g0/1
R2(config-if)# ip access-group 20 out
```

**Esperado:** solo `PC2` (`.20`) llega a la LAN2. `PC1` (`.10`) y `ADMIN` (`.50`) fallan.

- `192.168.1.16` + wildcard `0.0.0.15` = bloque `.16`–`.31` (16 direcciones).
- `.10` cae **antes** del bloque, `.50` cae **después**: los dos quedan fuera.
- No hace falta `deny any` al final: toda ACL lleva un **deny implícito** en la última línea.

> ℹ️ El contador del `permit` confirma que la wildcard funciona; el deny implícito no se ve en la lista, así que el tráfico descartado **no** suma en ninguna línea visible.

---

## 4. Fallo 1: el orden de las líneas

**Solución:**

```
R1(config)# no access-list 101
R1(config)# access-list 101 permit tcp host 192.168.1.10 host 192.168.2.10 eq 80
R1(config)# access-list 101 deny ip any any
```

**Diagnóstico con la ACL mal ordenada:**

- `ping` de `PC1` a SRV1 → falla; navegador de `PC2` → **también** falla, y el `ping` de PC2 también.
- `show access-lists 101` → el contador de `deny ip any any` sube **siempre**; el del `permit` se queda a **0**.
- Conclusión: la primera línea coincide con todo y decide; lo de abajo no se evalúa.

**Arreglo:** borrar la ACL (`no access-list 101`), recrearla con el `permit` arriba y volver a aplicarla (al borrar la ACL, la interfaz pierde la referencia: reaplica con `ip access-group 101 out`).

> ⚠️ Para reordenar reglas no se edita la lista: se borra y se vuelve a escribir en el orden correcto (o se usa una ACL nombrada, que sí permite insertar líneas).

---

## 5. ACL extendida: bloquear la web, no la red

**Solución:**

```
R1(config)# access-list 103 deny tcp 192.168.1.0 0.0.0.255 host 192.168.2.10 eq 80
R1(config)# access-list 103 permit ip any any
R1(config)# interface g0/1
R1(config-if)# ip access-group 103 out
```

**Esperado:**

- Navegador de `PC1` a `http://192.168.2.10` → **no carga**; `ping` a SRV1 → **sigue funcionando** (es ICMP, no TCP/80).
- Navegador de `PC2` → tampoco carga (la regla afecta a toda la LAN1).
- `show access-lists 103` → suben los contadores del `deny` (TCP/80) y del `permit` (el resto).

**Por qué el `permit ip any any` es necesario:** sin él, el deny implícito bloquearía también el ping, el DNS y todo lo demás. La ACL extendida filtra por protocolo y puerto, así que se bloquea **lo que toca** y se deja pasar el resto explícitamente.

---

## 6. Fallo 2: la ACL en el sitio equivocado

**Solución:**

```
R1(config)# interface g0/1
R1(config-if)# no ip access-group 103 out
R1(config)# interface g0/0
R1(config-if)# ip access-group 103 out
```

**Diagnóstico:**

- Navegador de `PC1` → **abre la web** como si nada. La ACL no está filtrando.
- `show ip interface g0/0` → `Outgoing access list is 103`: está aplicada, pero en la puerta equivocada.
- `show access-lists 103` → **todos los contadores a 0**: la ACL no está viendo ese tráfico.
- `show ip interface g0/1` → sin lista: el tráfico de la LAN1 hacia R2 sale por ahí sin pasar por ninguna ACL.

**Arreglo:** quitar de `G0/0` y aplicar en `G0/1 out`. El tráfico de los PCs hacia la LAN2 **entra** por `G0/0` (dirección `in`) y **sale** por `G0/1` (dirección `out`): solo la salida hacia R2 es el punto por el que pasa.

**Lección:** dirección (`in`/`out`) e interfaz son parte de la ACL. Una ACL perfecta en el sitio equivocado no filtra nada, y el contador a cero es la pista.

---

## 7. ACL nombrada y VTY: el admin sí, los demás no

**Solución:**

```
! Política de web
R1(config)# ip access-list extended WEB_SOLO_ADMIN
R1(config-ext-nacl)# permit tcp host 192.168.1.50 host 192.168.2.10 eq 80
R1(config-ext-nacl)# deny tcp any host 192.168.2.10 eq 80
R1(config-ext-nacl)# permit ip any any
R1(config-ext-nacl)# exit
R1(config)# interface g0/1
R1(config-if)# no ip access-group 103 out
R1(config-if)# ip access-group WEB_SOLO_ADMIN out

! Protección de la administración
R1(config)# enable secret clase
R1(config)# access-list 5 permit host 192.168.1.50
R1(config)# line vty 0 4
R1(config-line)# password cisco
R1(config-line)# login
R1(config-line)# access-class 5 in
```

**Esperado:**

- Navegador de `ADMIN` → **abre** la web; `PC1` y `PC2` → no cargan; el `ping` funciona desde todos.
- Telnet desde `ADMIN` a `192.168.1.1` → pide contraseña y entra; desde `PC1` → `Connection refused` / timeout.
- `show access-lists` → contadores del `permit host 192.168.1.50` (tráfico del admin), del `deny` (el resto de la web) y del `permit ip any any` (todo lo demás).

**Detalle clave:** el `permit` del administrador va **primero**; si el `deny` fuese antes, el admin caería en el mismo saco. Y en las líneas VTY el comando es `access-class`, no `access-group` (ese es de interfaces).

---

## 8. Fallo 3 + reto: port security y el puerto en errdisable

**Solución:**

```
SW1(config)# interface fa0/1
SW1(config-if)# switchport mode access
SW1(config-if)# switchport port-security
SW1(config-if)# switchport port-security maximum 1
SW1(config-if)# switchport port-security mac-address sticky
SW1(config-if)# switchport port-security violation shutdown
```

**Esperado antes del cambio:** `show port-security interface fa0/1` muestra `Port Status: Secure-up`, `Maximum MAC Addresses: 1` y la MAC de PC1 en *Sticky MAC Addresses*.

**Cuando entra PC2:**

- `show port-security interface fa0/1` → `Port Status: Secure-shutdown` y `Violation Count: 1`.
- `show interfaces status` → `err-disabled` en `Fa0/1`.
- `show port-security interface fa0/1` sigue mostrando la MAC sticky de PC1: **el puerto está apagado, pero la MAC antigua no se ha borrado**.

**Por qué `shutdown` / `no shutdown` no basta:** el puerto vuelve a arrancar, ve la MAC de PC2 otra vez y, como la sticky de PC1 sigue ocupando el único hueco, **vuelve a violar y a errdisable**. Se queda en bucle.

**Recuperación correcta:**

```
SW1(config)# interface fa0/1
SW1(config-if)# no switchport port-security mac-address sticky
SW1(config-if)# switchport port-security mac-address sticky
SW1(config-if)# shutdown
SW1(config-if)# no shutdown
```

(Equivale a limpiar la tabla sticky: `clear port-security sticky interface fa0/1`.) Con `PC1` reconectado, `show port-security interface fa0/1` vuelve a `Secure-up` con una sola MAC.

**Lección:** port security protege el **puerto**, no al usuario. La MAC sticky sobrevive al cable y al `shutdown`; si no se limpia, el puerto se queda peleado con el nuevo equipo. Y el diagnóstico empieza siempre por `show port-security interface` y `show interfaces status`.

---

## 📋 Criterios de esta práctica

| Ejercicio | Concepto | Punto |
|---|---|---|
| 1 | Base de red y servicio HTTP | 1 |
| 2 | ACL estándar y colocación | 2–3 |
| 3 | Wildcards | 3 |
| 4 | Orden de evaluación (fallo) | 1–2 |
| 5 | ACL extendida con puertos | 4 |
| 6 | ACL en la interfaz equivocada (fallo) | 1, 4 |
| 7 | ACL nombrada y `access-class` en VTY | 4 |
| 8 | Port security, errdisable y MAC sticky (fallo) | 5 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-acl-seguridad) · **También:** [Por resolver](/ApuntesRedes/boletines/boletin-u11-packettracer)
