---
title: Boletín de Capa de enlace y trama Ethernet — Inicial
description: Ejercicios básicos de modelo OSI, direcciones MAC, trama Ethernet y encapsulación
---

# 📝 Boletín de Capa de enlace y trama Ethernet — Inicial

> Ejercicios básicos para afianzar el mapa OSI, las direcciones MAC, la trama Ethernet y la encapsulación.

---

## 1. Relaciona capa y PDU

Relaciona cada capa OSI con la PDU que "viaja" en ella:

| Capa | PDU |
|---|---|
| 1 · Física | a) Paquete |
| 2 · Enlace | b) Bits |
| 3 · Red | c) Trama |
| 4 · Transporte | d) Segmento |

## 2. Anatomía de una MAC

Contesta sobre la dirección `00:1A:2B:3C:4D:5E`:

a) ¿Cuántos bytes tiene?
b) ¿Cuáles forman el OUI y quién lo asigna?
c) ¿Qué identifica la parte restante?

## 3. Unicast, multicast o broadcast

Indica de qué tipo es cada dirección MAC:

a) `FF:FF:FF:FF:FF:FF`
b) `00:1A:2B:3C:4D:5E`
c) `01:00:5E:11:22:33`

## 4. Verdadero o falso (MAC e IP)

a) La MAC cambia cada vez que el equipo se conecta a otra red.
b) La IP de destino se conserva de principio a fin del viaje por Internet.
c) Las MACs de la trama se rehacen en cada salto con router.
d) El switch usa las IP para reenviar las tramas.

## 5. Los campos de la trama Ethernet II

Contesta sobre la trama Ethernet (cobre y fibra):

a) ¿Qué tres campos de dirección/tipo lleva al principio de la trama?
b) Si el EtherType es `0x0800`, ¿qué protocolo hay dentro?
c) ¿Qué tamaño mínimo y máximo tiene el payload?
d) ¿Qué significa FCS y qué pasa si no cuadra?

## 6. Ordena la encapsulación

Ordena estos pasos de envío (del 1 al 5):

a) La trama se convierte en bits y salen por el medio
b) El segmento TCP recibe una cabecera IP y se convierte en paquete
c) Los datos de la aplicación se envuelven en una cabecera TCP (segmento)
d) El paquete recibe cabecera Ethernet y FCS (trama)
e) El navegador prepara los datos HTTP

## 7. MAC o IP: ¿cuál?

Relaciona cada frase con MAC o IP:

| Frase | ¿MAC o IP? |
|---|---|
| 1. La escribe el fabricante | a) IP |
| 2. Identifica el destino final en Internet | b) MAC |
| 3. Se cambia en cada salto con router | b) MAC |
| 4. La configuras tú o te la da el DHCP | a) IP |

## 8. El sobre de la capa 2 (802.11 vs 802.3)

Indica V (verdadero) o F (falso) y corrige las falsas:

a) El WiFi no es capa 2 porque no hay cable.
b) La trama WiFi puede llevar hasta 4 direcciones MAC.
c) La cabecera de la trama Ethernet lleva un FCS de 4 bytes.
d) El switch examina el campo EtherType para decidir a qué puerto reenviar.
