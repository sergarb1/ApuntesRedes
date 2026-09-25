---
title: Boletín de ACL y seguridad — Avanzado
description: Ejercicios avanzados de ACLs y seguridad de red
---

# 📝 Boletín de ACL y seguridad — Avanzado

> Ejercicios que requieren aplicar ACLs con criterio. En los difíciles tienes pista.

---

## 1. ACL extendida: YouTube blocker

El jefe quiere bloquear YouTube (173.194.0.0/16) en horario laboral (9:00-18:00). El resto del tráfico debe permitirse.

a) Escribe la ACL extendida (con time-range)
b) ¿Dónde la aplicas (inbound/outbound, qué interfaz)?
c) ¿Qué pasa si el router no soporta time-range? ¿Alternativa?

**Pista:** `time-range` y `absolute` o `periodic` para horarios.

## 2. Diagnóstico de ACL

Un administrador aplica esta ACL en G0/0 de un router (LAN 192.168.1.0/24):

```
access-list 10 deny 192.168.1.10
access-list 10 permit 192.168.1.0 0.0.0.255
```

a) El PC 192.168.1.10 no puede acceder a Internet. ¿Es normal?
b) ¿Y el PC 192.168.1.20? ¿Puede acceder a Internet?
c) ¿Qué comando usarías para ver si la ACL está funcionando?
d) Si la ACL se aplica outbound en G0/1 (hacia Internet), ¿cómo afecta al tráfico entre PCs de la misma LAN?

## 3. ACL de firewall básico

Diseña una ACL para un router de borde que protege una red interna (192.168.1.0/24):

**Reglas:**
1. Permitir HTTP/HTTPS saliente (cualquier destino)
2. Permitir DNS saliente (UDP 53)
3. Bloquear SSH saliente (TCP 22)
4. Permitir todo el tráfico entrante de conexiones establecidas (tráfico de retorno)
5. Denegar el resto

**Pista:** Usa `established` para permitir tráfico de retorno de conexiones iniciadas internamente.

## 4. ACL nombrada para horario

Escribe una ACL nombrada `BLOQUEAR_STREAMING` que bloquee el puerto **443** (HTTPS) **cualquier día de 9:00 a 18:00** para la red interna 192.168.1.0/24, permitiendo el resto del tráfico. Incluye el `time-range`, la ACL y su aplicación en la interfaz hacia Internet (G0/1).

**Pista:** usa `time-range` con `periodic daily`, referencia la regla con `time-range`, acaba con `permit ip any any` (recuerda el deny any implícito) y aplica la ACL outbound en G0/1.

## 5. El orden de las líneas importa

Estas dos ACLs tienen las mismas líneas en distinto orden. ¿Qué tráfico pasa en cada caso?

**ACL A:**
```
access-list 20 deny 192.168.1.0 0.0.0.255
access-list 20 permit any
```

**ACL B:**
```
access-list 20 permit any
access-list 20 deny 192.168.1.0 0.0.0.255
```

a) ¿Qué hace cada una?
b) ¿Qué principio rompe la ACL B?

**Pista:** el router evalúa las líneas **en orden** y para en la primera coincidencia.

## 6. ACL con error clásico

Quieres permitir solo SSH a un servidor (10.0.0.50) desde la red de administración (192.168.100.0/24). Un compañero escribe:

```
access-list 110 permit tcp 192.168.100.0 0.0.0.255 host 10.0.0.50 eq 22
access-list 110 deny ip any any
access-list 110 permit icmp any any
```

a) ¿Funciona el ping hacia el servidor? ¿Por qué?
b) ¿Cómo reordenas las líneas para conseguirlo? (pista: en una ACL numerada no puedes reordenar; ¿cómo se hace entonces?)
c) ¿Es necesaria la línea `deny ip any any`?

## 7. Port Security

Un switch tiene la interfaz G0/1 conectada al PC de recepción. Configura Port Security para que:

a) Solo aprenda una MAC y la guarde en la running-config (sticky).
b) Si llega otra MAC, descarte los paquetes infractores pero no apague el puerto y genere mensajes de log.
c) Escribe la configuración completa y el comando para ver el estado.

**Pista:** `switchport port-security violation restrict` + `logging` integrado.

## 8. Mini-caso final

Un instituto pide: "la sala de profesores (192.168.10.0/24) no puede usar el WiFi de alumnos (192.168.20.0/24), pero ambos deben salir a Internet (G0/2 del router) y los profesores acceden al servidor de notas (10.0.0.5) por HTTPS".

a) Diseña las ACLs mínimas (nómbralas) y di en qué interfaz/sentido las aplicas.
b) ¿Qué pasa con el retorno del tráfico de profesores hacia el servidor con tu diseño?
c) ¿Qué le dirías al director si pide "bloquear YouTube por completo"? (reflexiona: ACLs vs herramientas adecuadas)
