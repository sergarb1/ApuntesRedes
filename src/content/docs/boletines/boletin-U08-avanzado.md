---
title: Boletín U08 — Avanzado
description: Ejercicios avanzados de Routing y ACLs
---

# 📝 Boletín U08 — Avanzado

> Ejercicios que requieren aplicar routing estático y ACLs de forma más profunda.

---

## 1. Configuración multi-routing

Diseña la configuración para 3 routers en línea:

```
R1 (192.168.1.0/24) ──── R2 ──── R3 (192.168.3.0/24)
                          │
                     (192.168.2.0/24)
```

**Enlaces:**
- R1-R2: 10.0.0.0/30
- R2-R3: 10.0.0.4/30

Escribe la **configuración completa** de R1, R2 y R3 (interfaces, rutas estáticas, rutas por defecto).

## 2. ACL extendida: YouTube blocker

El jefe quiere bloquear YouTube (173.194.0.0/16) en horario laboral (9:00-18:00). El resto del tráfico debe permitirse.

a) Escribe la ACL extendida (con time-range)
b) ¿Dónde la aplicas (inbound/outbound, qué interfaz)?
c) ¿Qué pasa si el router no soporta time-range? ¿Alternativa?

**Pista:** `time-range` y `absolute` o `periodic` para horarios.

## 3. Diagnóstico de ACL

Un administrador aplica esta ACL en G0/0 de un router (LAN 192.168.1.0/24):

```
access-list 10 deny 192.168.1.10
access-list 10 permit 192.168.1.0 0.0.0.255
```

a) El PC 192.168.1.10 no puede acceder a Internet. ¿Es normal?
b) ¿Y el PC 192.168.1.20? ¿Puede acceder a Internet?
c) ¿Qué comando usarías para ver si la ACL está funcionando?
d) Si la ACL se aplica outbound en G0/1 (hacia Internet), ¿cómo afecta al tráfico entre PCs de la misma LAN?

## 4. Rutas flotantes

Configura un router con:
- Ruta por defecto primaria hacia 10.0.0.2 (AD=1)
- Ruta por defecto de respaldo hacia 10.0.1.2 (AD=5)
- Ruta estática hacia 192.168.100.0/24 vía 10.0.0.2

a) Escribe los comandos
b) ¿Cuándo se activa la ruta de respaldo?
c) ¿Cómo verificarías que la ruta de respaldo está activa?

## 5. ACL de firewall básico

Diseña una ACL para un router de borde que protege una red interna (192.168.1.0/24):

**Reglas:**
1. Permitir HTTP/HTTPS saliente (cualquier destino)
2. Permitir DNS saliente (UDP 53)
3. Bloquear SSH saliente (TCP 22)
4. Permitir todo el tráfico entrante de conexiones establecidas (tráfico de retorno)
5. Denegar el resto

**Pista:** Usa `established` para permitir tráfico de retorno de conexiones iniciadas internamente.

## 6. Resolución de problemas de rutas

Un router tiene esta configuración:

```
interface g0/0
 ip address 192.168.1.1 255.255.255.0
 no shutdown
interface g0/1
 ip address 10.0.0.1 255.255.255.252
 shutdown
ip route 0.0.0.0 0.0.0.0 10.0.0.2
```

a) ¿Funciona la ruta por defecto? ¿Por qué?
b) ¿Qué comando muestra el problema?
c) ¿Qué cambiarías para que funcione?
