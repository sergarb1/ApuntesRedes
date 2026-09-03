---
title: Boletín U12 — Inicial
description: Ejercicios básicos de Diagnóstico y monitorización
---

# 📝 Boletín U12 — Inicial

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

## 7. Filtros de Wireshark

Relaciona cada filtro con lo que muestra:

| Filtro | Qué muestra |
|---|---|
| a) `tcp.flags.syn == 1` | 1. Tráfico DNS |
| b) `ip.addr == 192.168.1.10` | 2. Retransmisiones TCP |
| c) `tcp.analysis.retransmission` | 3. Paquetes SYN (inicio de conexión) |
| d) `dns` | 4. Tráfico de/a esa IP |
| e) `http.request` | 5. Solo peticiones HTTP |

**Pista:** recuerda que los filtros de Wireshark usan la sintaxis `protocolo.campo == valor`. El de retransmisiones es el único que empieza por `tcp.analysis`.

## 8. Niveles de syslog

Ordena estos niveles de severidad de MENOS a MÁS grave:

a) Critical
b) Debug
c) Warning
d) Informational
e) Emergency

Después responde: para un servidor de logs en producción que no debe llenar el disco, ¿qué nivel de logging elegirías y por qué?

**Pista:** recuerda que en syslog el número menor es el más grave (0 = Emergency, 7 = Debug).
