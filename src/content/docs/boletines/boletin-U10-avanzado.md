---
title: Boletín UD10 — Avanzado
description: Ejercicios avanzados de servicios de red (DHCP, DNS y NTP)
---

# 📝 Boletín UD10 — Avanzado

> Ejercicios que requieren aplicar DHCP, DNS y NTP de forma combinada. En los difíciles tienes pista.

---

## 1. DHCP en el router Cisco

Configura el router R1 como servidor DHCP para la LAN 192.168.1.0/24:

- Rango excluido: .1 a .20 (infraestructura)
- Gateway: 192.168.1.1
- DNS: 8.8.8.8 y 1.1.1.1
- Concesión de 3 días

a) Escribe la configuración completa.
b) Un PC no recibe IP. Enumera tu secuencia de diagnóstico (comandos y qué buscas en cada uno).

**Pista:** `ip dhcp excluded-address` + `ip dhcp pool`.

## 2. DNS jerárquico

Explica el recorrido completo de una consulta DNS para `www.ejemplo.es` la primera vez que la hace un equipo (cachés vacías):

a) ¿Quién pregunta a quién? Enumera los pasos (resolver local → raíz → TLD → autoritativo).
b) ¿Qué pasa la segunda vez, cinco minutos después?
c) ¿Qué papel juega el TTL de los registros?

## 3. Selección de registros para un mini-proyecto

Tu centro va a publicar: web (`www.instituto.edu`), correo propio, y un alias corto `aulas` que apunta al mismo servidor que `www`. El servidor tiene IP 198.51.100.10 (IPv4) y 2001:db8::10 (IPv6). El correo lo gestiona un proveedor externo.

a) Escribe los registros mínimos con sus tipos.
b) ¿Qué registro necesitarías añadir para que `mail.proveedor.com` reciba el correo en nombre del instituto?
c) Un compañero propone un registro CNAME para el dominio raíz `instituto.edu`. ¿Es buena idea?

## 4. Diagnóstico con nslookup

Interpreta estas salidas y di qué está pasando en cada caso:

a)
```
Servidor: UnKnown
Address: 192.168.1.1

*** No se puede encontrar el nombre del servidor: DNS request timed out.
Nombre: www.ejemplo.es
```

b)
```
Nombre: www.ejemplo.es
Address: 203.0.113.99
Aliases: www.ejemplo.es
          web.ejemplo.es
```

c) `nslookup www.ejemplo.es 8.8.8.8` responde correctamente, pero el navegador no abre la web.

## 5. NTP con jerarquía

Tu red tiene un router de borde (R1), un switch de distribución (S1) y decenas de switches de acceso.

a) Diseña la jerarquía NTP: ¿de dónde toma la hora cada nivel? ¿Qué estrato quedaría aproximadamente en cada uno?
b) Escribe la configuración de R1 y S1.
c) ¿Qué comando usas en S1 para comprobar con quién está sincronizado y en qué estrato está?

## 6. Los tres servicios en un solo caso

Escenario: tras una caída eléctrica, el aula de informática no navega. Un alumno apunta estos datos de su PC:

- IP: 169.254.18.42, máscara 255.255.0.0
- DNS en blanco
- La hora del equipo está bien

a) ¿Qué servicio está fallando? ¿Cómo se llama ese rango 169.254.x.x?
b) El profesor comprueba el switch del aula y no está en la VLAN correcta. ¿Por qué eso explica el fallo de DHCP?
c) Arreglada la VLAN, el PC navega por IP pero `www.google.com` sigue fallando. ¿Qué compruebas ahora y con qué comando?
d) Al final del caso, ¿por qué el reloj del PC estaba bien? ¿Qué le pasó al switch, entonces?

**Pista:** APIPA y su rango 169.254.0.0/16; y piensa quién da la hora a quién en cada dispositivo.

## 7. DHCPv6 y doble pila

El centro quiere IPv6 en el aula: prefijo 2001:db8:ab::/64, gateway fe80::1, DNS 2001:4860:4860::8888.

a) ¿Dos formas de dar dirección IPv6 a los clientes? Describe brevemente SLAAC y stateful DHCPv6.
b) ¿Qué opción usarías si solo quieres repartir DNS y dominio (las direcciones las autoconfiguran los PCs)?
c) Escribe la config de un router Cisco para la opción b).

## 8. El "no tiene Internet" clásico

Una usuaria llama: "no tengo Internet". Su PC muestra: IP correcta 192.168.1.50 (DHCP OK), gateway correcto, pero `nslookup www.elmundo.es` falla; `nslookup www.elmundo.es 1.1.1.1` funciona.

a) ¿Qué capa/servicio está sano y cuál roto?
b) ¿Qué dos arreglos inmediatos propones?
c) ¿Por qué NO es un problema de NTP, de DHCP ni de routing?
