---
title: "Boletín U01 — Avanzado (Resuelto)"
description: Soluciones de los ejercicios avanzados de la Unidad 01
---

# 💪 Boletín U01 — Avanzado (Resuelto)

---

## 1. Diagnóstico completo: "No tengo Internet"

Pasos en orden, de lo más físico a lo más lógico:

1. **Peldaño 0 — Luces:** miro si la lucecita del puerto de red del PC y del switch están encendidas. Si alguna está apagada → problema físico (cable suelto o puerto apagado).
2. **Peldaño 1 — Loopback:** `ping 127.0.0.1`. Si responde → la tarjeta de red del PC funciona. Si no → problema en la pila TCP/IP del equipo.
3. **Peldaño 2 — Gateway:** `ping 192.168.1.1` (o la IP del router). Si responde → la red local está bien. Si no → problema de cable, switch o configuración IP.
4. **Peldaño 3 — Internet:** `ping 8.8.8.8`. Si responde → el router saca a Internet. Si no → problema en el router o en el operador.
5. **Peldaño 4 — DNS:** `ping www.google.com`. Si responde → todo funciona. Si no → el DNS está caído (la conexión funciona, pero no se traducen nombres).

Deducción: en cuanto un peldaño falla, **ahí está el problema**. No necesitas mirar los de arriba.

## 2. La historia de un paquete

1. **Capa de enlace (Ethernet):** el PC encapsula el paquete en una trama Ethernet. Necesita la MAC del gateway (la obtiene con ARP si no la tiene). La trama viaja por el cable hasta el switch, que la reenvía al router根据la MAC destino.
2. **Capa de red (IP):** el router lee el sobre IP, ve que el destino (`142.250.185.78`) no está en su subred, y consulta su tabla de rutas para decidir por dónde enviarlo. El paquete salta de router en router hasta llegar a la red de Google.
3. **Capa de transporte (TCP):** TCP se asegura de que el paquete llega completo y en orden. Si se pierde uno, lo reenvía. Abre una conexión (handshake) antes de empezar.
4. **Capa de aplicación (HTTP):** el navegador envía una petición HTTP GET al servidor de Google. El servidor responde con el HTML de la página, que viaja de vuelta en múltiples paquetes.

## 3. ARP, el protocolo olvidado

1. Tu PC quiere hacer ping a `192.168.1.1` pero no tiene la MAC del gateway en su tabla ARP.
2. La capa de enlace no puede construir la trama sin la MAC destino. Se "bloquea".
3. Tu PC envía un paquete **ARP Request** en broadcast: *"¿Quién tiene la IP 192.168.1.1?"* — lo reciben todos los equipos de la subred.
4. El router reconoce su IP y responde con un **ARP Reply** en unicast: *"Yo, y mi MAC es aa:bb:cc:dd:ee:ff"*.
5. Tu PC guarda la MAC en su tabla ARP y ahora sí puede construir la trama Ethernet con la MAC del gateway.
6. El paquete de ping sale por la tarjeta de red hacia el router.

Sin ARP, la capa 2 (Ethernet) no puede funcionar porque no sabe a quién enviar la trama.

## 4. Argumenta contra Conrad

1. **Si reinicias todo, pierdes la información del fallo.** El momento en que se produce el error es el mejor momento para capturar datos: logs, estado de las interfaces, tablas ARP. Si reinicias, todo se borra y el problema vuelve a aparecer sin pistas.
2. **El reinicio es una solución temporal, no una solución real.** Si el problema era un cable suelto, el reinicio "lo arregla" por casualidad (al volver a arrancar, se reestablece algo), pero la causa raíz sigue ahí y volverá a pasar.
3. **El usuario necesita saber qué pasó.** Si un profesor te llama y tú solo reinicias, la próxima vez lo hará él solo sin diagnosticar. Si le explicas "el cable estaba suelto", aprende y no te vuelve a llamar por lo mismo.

## 5. Diseña la red del aula

**Topología:** estrella (todos los PC conectados a un switch central).

**Dispositivos necesarios:**
- **1 switch de 48 puertos** (con 30 PC + 1 impresora = 31 puertos, sobran 17 para crecimiento). Un switch de 24 puertos no alcanza; necesitarías dos, lo que complica la instalación.
- **1 router** conectado a un puerto del switch para la salida a Internet.
- **Cable UTP Cat6** desde cada PC hasta el switch.

**Justificación:**
- El switch conecta todos los PC entre sí (capa 2).
- El router une el aula con Internet (capa 3).
- La impresora se conecta al switch y todos la alcanzan.
- Con un solo switch de 48 puertos, la topología es simple, fácil de mantener y con margen para crecer.

## 6. Mente binaria

a) 4 bytes × 8 bits/byte = **32 bits**.
b) 320 bits ÷ 8 bits/byte = **40 bytes**.
c) 4 letras = 4 bytes; 4 × 8 = **32 bits**.

## 7. El mapa del curso

1. **Sin saber qué es una red, no sabrías para qué configuras cada aparato.** Si no conoces las 4 piezas (dispositivos finales, de interconexión, medio, protocolos), configurar un switch o un router sería como girar una llave sin saber qué puerta abre.
2. **El método de diagnóstico en capas lo usarás en cada laboratorio del curso.** Desde la U02 hasta la U13, cada vez que algo falle, volverás a la escalera del ping. Aprenderlo primero te da una herramienta que acompaña todo el curso.

## 8. El entorno de trabajo: Preparación del taller virtual

a) **Por qué usar un simulador:** Packet Tracer es el entorno virtual gratuito para estudiantes que nos permite arrastrar dispositivos, simular tráfico y probar configuraciones complejas sin el riesgo de apagar una red real, romper hardware costoso o interrumpir el trabajo de otros usuarios. Es la herramienta indispensable para aprender aplicando la regla de oro: primero hazlo, luego entiéndelo.

b) **Protocolo ante incidencias de instalación:** Si el simulador no arranca o da problemas al iniciar sesión con la cuenta de la Cisco Networking Academy, el administrador no recurre al azar ni formatea el equipo. El procedimiento consiste en: verificar los requisitos del sistema operativo, comprobar la conexión a Internet que valida las credenciales y, en caso de persistir el error, documentar el mensaje exacto de la excepción y compartirlo de forma estructurada en el Foro de la Unidad de la plataforma para solucionarlo de manera colaborativa y asíncrona.
