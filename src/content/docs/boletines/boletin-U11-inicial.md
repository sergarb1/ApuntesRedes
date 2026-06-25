---
title: Boletín U11 — Inicial
description: Ejercicios básicos de Diagnóstico y monitorización
---

# 📝 Boletín U11 — Inicial

> Ejercicios para practicar los fundamentos de diagnóstico de redes.

---

## 1. Metodología de troubleshooting

Ordena los siguientes pasos de diagnóstico siguiendo el modelo OSI de abajo arriba:

- ( ) Hacer ping a 8.8.8.8
- ( ) Comprobar que el cable está conectado
- ( ) Hacer nslookup del dominio
- ( ) Hacer ping al gateway
- ( ) Comprobar la tabla MAC del switch

## 2. Comandos de diagnóstico

Relaciona cada comando con su función:

| Comando | Función |
|---|---|
| ping | A. Muestra la ruta hasta un destino |
| traceroute | B. Prueba conectividad básica |
| nslookup | C. Captura paquetes en tiempo real |
| Wireshark | D. Resuelve nombres DNS |
| netstat | E. Muestra conexiones activas |

## 3. Interpreta un ping

Un usuario ejecuta `ping 8.8.8.8` y obtiene:

```
Reply from 8.8.8.8: bytes=32 time=15ms TTL=117
Reply from 8.8.8.8: bytes=32 time=14ms TTL=117
Reply from 8.8.8.8: bytes=32 time=16ms TTL=117
Reply from 8.8.8.8: bytes=32 time=15ms TTL=117
```

a) ¿Hay conectividad con 8.8.8.8?
b) ¿La latencia es buena o mala?
c) ¿Qué significa TTL=117?

## 4. Configura SNMP

Un router Cisco debe ser monitorizado por SNMP. Escribe los comandos para:
- Configurar comunidad de solo lectura "monitor"
- Configurar comunidad de lectura-escritura "admin"
- Especificar ubicación "SalaServidores"
- Enviar traps al gestor 192.168.1.100

## 5. Verdadero o falso

a) SNMP v3 cifra la comunicación.
b) Wireshark solo funciona en Windows.
c) Si ping al gateway funciona pero ping a 8.8.8.8 no, el problema está en la LAN.
d) syslog nivel 0 es el menos grave.

## 6. Análisis de traceroute

Un administrador ejecuta `tracert google.com` y ve:

```
1   1ms    1ms    1ms   192.168.1.1
2   10ms   10ms   10ms  10.0.0.1
3   *      *      *     Request timed out.
4   20ms   20ms   20ms  216.58.214.14
```

a) ¿Cuántos saltos hay hasta el destino?
b) ¿Qué significa el salto 3 con asteriscos?
c) ¿El destino final es accesible?
