---
title: Boletín de Enrutamiento estático — Inicial (Resuelto)
description: Soluciones de los ejercicios básicos de enrutamiento estático
---

# ✅ Boletín de Enrutamiento estático — Inicial (Resuelto)

---

## 1. Componentes del router

1 → b (RAM: configuración activa, tabla de rutas)
2 → c (NVRAM: startup-config)
3 → a (Flash: IOS)
4 → d (ROM: ROMMON)

## 2. Verdadero o falso

a) **Verdadero.** Las rutas estáticas se configuran con `ip route`.
b) **Verdadero.** 0.0.0.0/0 es la ruta de último recurso.
c) **Falso.** Si el next-hop es inalcanzable, la ruta NO se instala en la tabla de rutas (aunque la tengas escrita en la config).
d) **Verdadero.** Las rutas estáticas tienen AD 1 y métrica 0.
e) **Verdadero.** `show ip route` muestra las rutas del router.

## 3. ¿Qué comando?

1 → c (`ip route 0.0.0.0 0.0.0.0` = ruta por defecto)
2 → b (`show ip route` = tabla de rutas)
3 → a (`show ip interface brief` = estado de interfaces)
4 → d (`ip route` con red específica = ruta estática)

## 4. Modos del router

1. b) Usuario (`Router>`)
2. d) Privilegiado (`Router#`)
3. a) Configuración global (`Router(config)#`)
4. c) Configuración de interfaz (`Router(config-if)#`)

## 5. Anatomía de una ruta

- `S` → origen estático (aprendida con `ip route`)
- `192.168.3.0/24` → red destino y su prefijo
- `[1/0]` → distancia administrativa 1 / métrica 0
- `via 10.0.0.2` → next-hop: a quién le paso el paquete

## 6. Tu primera ruta estática

```bash
ip route 192.168.2.0 255.255.255.0 10.0.0.2
```

Red destino + máscara + next-hop. Sin el `via`: en IOS el next-hop se escribe tal cual al final del comando.

## 7. ¿Ruta por defecto o ruta específica?

**Ruta por defecto.** Con una única salida, cualquier destino que no sea la LAN propia va a ese next-hop: `ip route 0.0.0.0 0.0.0.0 <ip_salida>`. Cincuenta rutas específicas serían 50 líneas que mantener a mano para cubrir lo mismo.

## 8. Verificación

1. `show running-config | include ip route` → ¿está escrita la ruta? (fallo típico: errata en la IP)
2. `show ip route` → ¿aparece con una `S`? Si no aparece, el next-hop es inalcanzable: mira `show ip interface brief` (punto 3).
3. `show ip interface brief` → ¿la interfaz de salida está Up/Up? Si está down/down (cable) o administratively down (falta `no shutdown`), la ruta no se instala.