---
title: Boletín de ACL y seguridad — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de ACLs y seguridad de red
---

# ✅ Boletín de ACL y seguridad — Avanzado (Resuelto)

---

## 1. ACL extendida: YouTube blocker

a) **ACL con time-range:**
```bash
time-range LABORAL
 periodic weekdays 9:00 to 18:00

ip access-list extended BLOQUEAR_YT
 deny tcp any 173.194.0.0 0.0.255.255 eq 80 time-range LABORAL
 deny tcp any 173.194.0.0 0.0.255.255 eq 443 time-range LABORAL
 permit ip any any
```

b) **Aplicar:** Outbound en G0/1 (hacia Internet), para filtrar tráfico saliente.

c) **Alternativa sin time-range:** no se puede definir "9 a 18" con la ACL pura; habría que cambiar manualmente la ACL cada mañana y cada tarde (desastrosamente manual) o gestionarlo con un script/programación externa que alterne las versiones de política. Por eso `time-range` existe.

## 2. Diagnóstico de ACL

a) **Sí, es normal.** La línea 1 deniega explícitamente 192.168.1.10. La línea 2 permite al resto de la red. El deny any implícito está al final.

b) **Sí, 192.168.1.20 puede** porque coincide con la línea 2 (permit 192.168.1.0/24).

c) `show access-lists 10` — Muestra los contadores de hits de cada línea.

d) **No afecta.** La ACL está en G0/1 (outbound). El tráfico entre PCs de la misma LAN no pasa por el router, solo por el switch. Las ACLs en interfaces del router solo afectan al tráfico que pasa por el router.

## 3. ACL de firewall básico

```bash
ip access-list extended FIREWALL_INTERNO
 permit tcp 192.168.1.0 0.0.0.255 any eq 80
 permit tcp 192.168.1.0 0.0.0.255 any eq 443
 permit udp 192.168.1.0 0.0.0.255 any eq 53
 deny tcp 192.168.1.0 0.0.0.255 any eq 22
 deny ip any any

interface g0/1
 ip access-group FIREWALL_INTERNO out

ip access-list extended FIREWALL_RETORNO
 permit tcp any 192.168.1.0 0.0.0.255 established
 permit udp any eq 53 192.168.1.0 0.0.0.255 any
 deny ip any any

interface g0/1
 ip access-group FIREWALL_RETORNO in
```

(Las respuestas DNS no son TCP: si solo dejas el `established`, la consulta sale pero la respuesta muere en el `deny ip any any`. Por eso la línea UDP con puerto de origen 53.)

## 4. ACL nombrada para horario

```bash
time-range LABORAL_DIARIO
 periodic daily 9:00 to 18:00

ip access-list extended BLOQUEAR_STREAMING
 deny tcp 192.168.1.0 0.0.0.255 any eq 443 time-range LABORAL_DIARIO
 permit ip any any

interface g0/1
 ip access-group BLOQUEAR_STREAMING out
```

**Lectura:** de 9 a 18 todos los días, el tráfico HTTPS originado en la red interna se deniega; el resto de horario (y el resto de tráfico, como el puerto 80) pasa. El `permit ip any any` + el deny implícito se encargan del resto.

## 5. El orden de las líneas importa

a) **ACL A:** deniega todo el tráfico de 192.168.1.0/24 y deja pasar el resto.
**ACL B:** la primera línea `permit any` coincide con TODO (incluida 192.168.1.0/24), así que la segunda línea jamás se evalúa: la ACL permite absolutamente todo y la denegación es letra muerta.

b) **Rompe el principio de "primera coincidencia gana"** (y el de ordenar primero lo más específico). Las ACLs no son un listado de intenciones: son una cadena de evaluación secuencial.

## 6. ACL con error clásico

a) **No.** La línea `deny ip any any` está en medio: al evaluarla, todo lo que no sea SSH de administración (incluido ICMP) muere ahí. El `permit icmp` de abajo nunca se consulta: la ACL se detiene en la primera coincidencia.

b) **En una ACL numerada no se puede reordenar ni insertar en medio**: la solución canónica es borrarla y reescribirla en el orden correcto:

```bash
no access-list 110
access-list 110 permit icmp any any
access-list 110 permit tcp 192.168.100.0 0.0.0.255 host 10.0.0.50 eq 22
access-list 110 deny ip any any
```

(Si la política va a crecer, en la próxima escríbela como ACL **nombrada**: `ip access-list extended SOLO_SSH`… allí sí puedes insertar, borrar y reordenar líneas con sus números de secuencia.)

c) **No es necesaria.** El `deny ip any any` implícito del final ya hace ese trabajo. Escribirla solo aporta legibilidad explícita (y contadores visibles).

## 7. Port Security

a) y b) y c) **Configuración completa:**
```bash
interface g0/1
 switchport mode access
 switchport port-security
 switchport port-security maximum 1
 switchport port-security mac-address sticky
 switchport port-security violation restrict
```

- **sticky:** la MAC aprendida se escribe en la running-config (guárdala con `copy run start` para hacerla permanente).
- **restrict:** descarta los paquetes del infractor, genera mensajes de log y contadores, pero el puerto sigue activo para la MAC legítima (a diferencia de `shutdown`, que tumba el puerto entero).

**Verificación:**
```bash
show port-security interface g0/1
show port-security address
```

## 8. Diagnóstico de port security

a) **Ocurrió porque** el usuario conectó un switch no administrado. Los PCs de ambos usuarios tienen MACs diferentes, y el switch de red ve más de 1 MAC en el puerto, superando el límite (maximum 1).

b) **Dos cambios:**
   1. Aumentar `maximum` a un valor razonable (ej. 5-10) si es un puerto compartido
   2. Cambiar `violation` a `restrict` (descarta tráfico extra pero no deshabilita el puerto) o `protect` (descarta silenciosamente)

c) **Recuperar el puerto:**
   ```bash
   Switch(config)# interface fa0/1
   Switch(config-if)# shutdown
   Switch(config-if)# no shutdown
   ```
   O configurar `errdisable recovery cause psecure-violation` para recuperación automática.

## 9. Laboratorio: Port Security en la sala de profesores

a) y b) Configuración completa:

```bash
Switch(config)# interface fa0/24
Switch(config-if)# switchport mode access
Switch(config-if)# switchport port-security
Switch(config-if)# switchport port-security maximum 1
Switch(config-if)# switchport port-security mac-address sticky
Switch(config-if)# switchport port-security violation shutdown
```

c) Verificación: `Switch# show port-security interface fa0/24` (muestra el máximo, las MACs seguras y el estado del puerto).

d) La violación ocurre porque la **MAC sticky del PC original NO caduca**: aunque el PC se desenchufe, su MAC permanece aprendida como permanente. Al conectar el portátil, su MAC nueva hace un total de 2 MACs en el puerto y se supera el máximo (1) → violación shutdown → errdisable.

e) Recuperar el puerto:

```bash
Switch(config)# interface fa0/24
Switch(config-if)# shutdown
Switch(config-if)# no shutdown
```

(O configurar `errdisable recovery cause psecure-violation`.)

f) Sin perder seguridad, puedes:
   - Aumentar `maximum` a 2 si es un puerto compartido.
   - Configurar el **envejecimiento de la port security** para que la MAC sticky expire si el dispositivo se desenchufa (las sticky necesitan `aging static` para poder caducar):
     ```bash
     Switch(config-if)# switchport port-security aging time 5
     Switch(config-if)# switchport port-security aging type inactivity
     Switch(config-if)# switchport port-security aging static
     ```
   - O usar `violation restrict` (descarta el tráfico extra sin deshabilitar el puerto), aunque es menos estricto.

## 10. Mini-caso final

a) **Diseño mínimo (extendidas, cerca del origen):**

```bash
ip access-list extended PROFES
 deny ip 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255
 permit tcp 192.168.10.0 0.0.0.255 host 10.0.0.5 eq 443
 permit ip 192.168.10.0 0.0.0.255 any
```
Aplicada **in** en la interfaz VLAN/interfaz de la red de profesores (donde entra su tráfico al router).

**Nota:** no hace falta ACL para "el WiFi de alumnos no accede a profesores": con la primera línea de PROFES ya se corta el ida; para el corte completo bidireccional se añadiría una ACL espejo en la red de alumnos (`deny ip 192.168.20.0 0.0.0.255 192.168.10.0 0.0.0.255` + `permit ip any any`).

b) **El retorno del servidor (10.0.0.5 → 192.168.10.x) no cruza la ACL de PROFES** (esa solo filtra el tráfico *originado* en profesores, aplicada in en su interfaz). El retorno llega por G0/0/servidores y lo encamina el router normalmente. Si hubiéramos puesto una ACL en la interfaz del servidor, sí tendríamos que prever el retorno.

c) **Reflexión:** una ACL por IP es una herramienta burda para bloquear YouTube: CDN compartidas con otros servicios, apps que cambian de IPs, HTTPS que impide ver dominios... Para eso hay proxies/filtros DNS (o firewalls de siguiente generación). Las ACLs sirven para políticas simples por red/puerto; para "bloquear YouTube" honestamente mejor un filtro DNS o un proxy. Es una conversación de expectativas, no de comandos.