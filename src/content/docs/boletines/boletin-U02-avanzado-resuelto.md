---
title: Boletín U02 — Avanzado (Resuelto)
description: Soluciones de los ejercicios avanzados de Fundamentos de Redes
---

# ✅ Boletín U02 — Avanzado (Resuelto)

---

## 1. Diagnóstico de red

PC-A ve a PC-B (misma red) pero no llega a `8.8.8.8` (Internet).

**Causas probables (por orden de probabilidad):**
1. El **gateway por defecto** de PC-A no está configurado o es incorrecto. PC-A no sabe dónde dejar los paquetes para salir de su red.
2. El **router** no tiene ruta a Internet o carece de NAT.
3. El router no tiene conexión con el ISP (corte del operador).

**Más probable:** el gateway por defecto de PC-A. Es la causa clásica de "me veo contigo, pero no con el mundo".

## 2. Diseño de red mínima

a) **Dispositivos:** 1 switch (los puertos sobran si eliges bien) + 1 router para Internet.
   - Puertos consumidos: 15 PCs + 2 impresoras + 1 servidor + 1 enlace al router = 19. Un switch de **24 puertos** deja márgen ante fallos.
   - Cables: 19 UTP.

b) **Direccionamiento privado:**
   - Red: `192.168.0.0/24` (máscara `255.255.255.0`).
   - Router (gateway): `192.168.0.1`.
   - Servidor: `192.168.0.2`.
   - Impresoras: `192.168.0.3` y `192.168.0.4`.
   - PCs: rango DHCP `192.168.0.10 → 192.168.0.24`.

## 3. ¿Cuántos dominios?

a) **Dominios de colisión:** cada puerto de switch es un dominio de colisión propio.
   - 3 PCs → 3 dominios.
   - 2 enlaces entre switches → 2 dominios más (uno en cada lado del enlace, 2 por dirección al final del segmento, pero se cuentan los del medio como 2 dominios separados).
   - Total: **5 dominios de colisión**.

b) **Dominios de broadcast:** los switches NO segmentan broadcast y los enlaces no añaden ninguno. Toda la red comparte un único dominio de broadcast (el router lo segmentaría si hubiera otra red detrás). Total: **1 dominio de broadcast**.

## 4. ARP en acción

a) Lanza un **ARP Request** de tipo **broadcast** (lo escuchan todos).
b) MAC destino **`FF:FF:FF:FF:FF:FF`** (dirección de difusión).
c) PC-B responde con un **ARP Reply** de tipo **unicast**, direccionado directamente a PC-A.
d) La respuesta contiene la resolución: "La IP `10.0.0.2` pertenece a la MAC `BB:BB:BB:BB:BB:BB`".

## 5. Desencapsulación: el viaje inverso

a) La capa **2 (Enlace)** elimina la cabecera Ethernet y queda el **paquete** IP.
b) La capa **3 (Red)** elimina la cabecera IP y queda el **segmento** TCP.
c) La capa **4 (Transporte)** elimina la cabecera TCP y queda la **petición** `GET /index.html`.
d) El contenido sube a la capa 7 (Aplicación), donde el servidor web lo procesa y responde.

>Truco: es el mismo "empaquetado" del envío pero al revés — cada capa quita su cabecera.

## 6. Diferencia práctica: hub, switch y router

a) **Hub.** Red pequeña de los 90: barato y suficiente, aunque todo el tráfico colisiona en un solo dominio. Hoy nadie lo usaría.
b) **Switch.** Cada PC tiene puerto dedicado: ancho de banda íntegro y sin colisiones por equipo.
c) **Router.** Une dos redes diferentes (`192.168.1.0/24` y `10.0.0.0/16`) y decide por dónde enviar cada paquete.

## 7. Verdadero o falso

a) **Verdadero.** Es la función principal del router: encaminar entre redes distintas.
b) **Falso.** El switch no entiende de IP. Trabaja solo con MACs dentro de la misma red.
c) **Verdadero.** En bus, una rotura del cable central parte la red en dos segmentos aislados.
d) **Verdadero.** En estrella todo pasa por el punto central; sin él, nadie se comunica.
e) **Falso.** La IP la asigna DHCP y cambia con la red a la que te conectas; la que permanece fija es la MAC. En casa y en el trabajo tienes la misma MAC, pero IP distinta.

## 8. Puertos bien conocidos en acción

a) El puerto **80/HTTP** o **443/HTTPS** está bloqueado en el router. Sin ellos no hay navegación web.
b) El puerto **22 (SSH)**. Es administración cifrada; reenviar el **21 (FTP)** sería un riesgo porque las credenciales viajan en texto claro.
c) El puerto **53 (DNS)** traduce nombres a IPs. Bloqueado, el navegador no sabrá qué dirección hay detrás de una URL y **no resolverá ningún dominio** (indicaría "servidor no encontrado").