---
title: 07 — Seguridad en VLANs
description: VACL, PVLAN y defensa contra el VLAN hopping 🛡️
---

<p><small>VACL, PVLAN y defensa contra el VLAN hopping 🛡️</small></p>

> 🗺️ **Estás en:** 🏢 **U07 · VLANs** → 07 · Seguridad en VLANs

---

## 📬 La idea en una frase

> Las VLANs separan el tráfico por diseño, pero un atacante puede **saltar de VLAN en VLAN** si le dejas negociar trunks o etiquetar tramas. La defensa son **VACL y PVLAN** (filtrado y aislamiento fino dentro de la VLAN) más un **hardening básico**: sin DTP, sin VLAN 1 y native VLAN cambiada.

Hasta aquí separaste y conectaste VLANs. Ahora toca el lado oscuro: qué pasa cuando alguien no tiene ganas de quedarse en su VLAN. El *VLAN hopping* es real y aparece en cualquier pentest de red interna, así que un administrador decente lo previene.

---

## 🧱 VACL: el filtro dentro de la VLAN

Una **VACL** (*VLAN Access Control List*) filtra el tráfico **dentro de una VLAN**, cosa que una ACL de router no hace (esa funciona en capa 3, en el router). Con VACL decides qué tráfico se permite o se bloquea entre hosts de la *misma* VLAN o hacia otras VLANs en el propio switch.

```bash
Switch(config)# access-list 101 permit ip any any
Switch(config)# access-list 102 deny ip 192.168.10.0 0.0.0.255 192.168.20.0 0.0.0.255

Switch(config)# vlan access-map BLOQUEA 10
Switch(config-access-map)# match ip address 102
Switch(config-access-map)# action drop
Switch(config-access-map)# vlan access-map BLOQUEA 20
Switch(config-access-map)# match ip address 101
Switch(config-access-map)# action forward

Switch(config)# vlan filter BLOQUEA vlan-list 10
```

| Comando | Qué hace |
|---|---|
| `vlan access-map MAPA seq` | Crea reglas secuenciales (se prueban en orden) |
| `match ip address ACL` | Qué tráfico evalúa esa regla |
| `action drop` / `action forward` | Qué hacer con el tráfico que case |
| `vlan filter MAPA vlan-list 10` | Aplica el mapa a la VLAN 10 |

> 💡 **La diferencia con la ACL de router:** la ACL clásica vive en el router y filtra en capa 3 entre subredes. La **VACL** vive en el switch y puede filtrar *dentro* de una VLAN (capa 2), algo que el router nunca ve porque ese tráfico ni le llega.

---

## 🔒 PVLAN: el aislamiento de puertos dentro de la VLAN

Las **PVLAN** (*Private VLAN*) dividen una VLAN en subgrupos de puertos para que **no todos los miembros se vean entre sí**. Es la joya de los entornos ISP y DMZ: en un hosting, cada cliente debe ver solo su servidor, no a los vecinos.

| Tipo de puerto PVLAN | Qué puede hacer |
|---|---|
| **Promiscuous** | Habla con todos (normalmente el gateway o el router) |
| **Isolated** | Solo habla con el promiscuous (nada con otros isolated) |
| **Community** | Habla con su comunidad y el promiscuous |

```
                 ┌──────────────────────────────┐
                 │  GATEWAY (promiscuous)       │
                 └──────────────┬───────────────┘
             ┌──────────────────┼──────────────────┐
     ┌───────┴───────┐   ┌─────┴──────┐   ┌─────┴──────┐
     │ Cliente A     │   │ Cliente B  │   │ Cliente C  │
     │  (isolated)   │   │ (isolated) │   │ (isolated) │
     └───────────────┘   └────────────┘   └────────────┘
     A NO ve a B ni a C; solo habla con el gateway.
```

En universo de correos: los "isolated" son celdas de biblioteca que solo hablan con el bibliotecario. Los "community" son aulas: se hablan entre ellos y con el bibliotecario, pero no con otras aulas.

---

## 🪜 VLAN hopping: el salto de VLAN

Es la familia de ataques para salir de tu VLAN. Los dos vectores principales:

| Vector | Cómo funciona | Defensa |
|---|---|---|
| **Trunk negociado (DTP)** | El atacante pide trunk por DTP y su portátil recibe todas las VLANs | `switchport mode access` + `switchport nonegotiate`; `shutdown` en puertos libres |
| **Double tagging** | Envía una trama con **dos etiquetas 802.1Q**: el primer switch la estampa (native) y el segundo la desetiqueta y la envía a la VLAN objetivo | Native VLAN cambiada y **no usar datos en la native**; segmentar físicamente zonas sensibles |

Secuencia del **double tagging** (el sofisticado):

```
1. Atacante (VLAN nativa) envía trama etiquetada "VLAN 20" DENTRO de otra etiqueta "native".
2. El primer switch quita la primera etiqueta (trata la trama como native).
3. Reenvía la trama por el trunk... con la etiqueta VLAN 20 aún puesta.
4. El segundo switch la ve como tráfico legítimo de VLAN 20 y la entrega al objetivo.
```

No hagas túneles mentales: lo importante es que **si la native VLAN transporta datos y todos usan la 1, el doble etiquetado es gratis**. Por eso el hardening del punto 3 (cambiar la native) no es un capricho.

---

## 🧰 Hardening básico de VLANs (checklist)

El "ritual" para dejar un switch de VLANs a prueba de balas (y de pentesters):

| # | Medida | Comando |
|---|---|---|
| 1 | Puertos de usuario como **access** + sin DTP | `switchport mode access` + `switchport nonegotiate` |
| 2 | Puertos libres **apagados** | `interface range fa0/1-12` → `shutdown` |
| 3 | Cambiar la **native VLAN** a un número alto | `switchport trunk native vlan 99` |
| 4 | **No usar VLAN 1** para datos (usar 10/20/30…) | `switchport access vlan 10` |
| 5 | Limitar VLANs en el trunk | `switchport trunk allowed vlan 10,20,30` |
| 6 | **VACL** para tráfico sensible dentro de VLAN | `vlan access-map` + `vlan filter` |
| 7 | **PVLAN** para hoteles/campus/ISP (aislar entre clientes) | `private-vlan` config |
| 8 | Deshabilitar **VTP** (o VTPv3 off) | `vtp mode transparent` / `vtp mode off` |

> ⚠️ **CONRAD zanja:** "¿Cuál es el mejor firewall de VLANs? Configurar bien el switch. La mitad de los 'ataques a la VLAN' se resuelven con `switchport mode access` y `nonegotiate`. El resto, con native VLAN cambiada y VTP apagado. No inventes."

---

## 🧠 Mini-chequeo

1. ¿En qué se diferencia una VACL de una ACL de router?
2. En una PVLAN, ¿con quién habla un puerto *isolated*? ¿Y uno *community*?
3. Explica en dos líneas el ataque de double tagging y su mitigación principal.

<details>
<summary>🔄 Respuestas</summary>

1. La **VACL** vive en el switch y filtra **dentro de la VLAN** (capa 2/3 combinadas); la ACL de router filtra en capa 3 entre subredes en el router. Con VACL puedes bloquear hosts de la misma VLAN que nunca pasan por un router.
2. Un puerto **isolated** solo habla con el **promiscuous** (el gateway); un **community** habla con su comunidad y el promiscuous, pero no con otras comunidades.
3. El atacante envía una trama con **dos etiquetas**: la primera la descarta el switch (la trata como native) y la segunda la lee el siguiente switch como VLAN legítima, entregándola en la VLAN objetivo. Mitigación: **cambiar la native VLAN y no usarla para datos**.

</details>

---

## ✅ Resumen en 3 frases

- La **VACL** filtra dentro de la VLAN y la **PVLAN** aísla puertos entre sí (promiscuous, isolated, community).
- El **VLAN hopping** aprovecha DTP y el doble etiquetado: apaga DTP y cambia la native VLAN.
- Un **hardening** en 8 pasos (access, nonegotiate, native alta, VLAN 1 prohibida, sin VTP) cierra los frentes clásicos.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| VACL | Lista de control dentro de la VLAN |
| PVLAN | VLAN privada: aíslan puertos (promiscuous, isolated, community) |
| VLAN hopping | Saltar a otra VLAN mediante trunk negociado o double tagging |
| Double tagging | Tramas con dos etiquetas para cruzar a otra VLAN |
| Hardening | Conjunto de medidas de endurecimiento del switch |
| Native VLAN cambiada | Usar un ID alto y dedicado, nunca VLAN 1 |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/07-vlans) · **Anterior:** [06 · VTP y DTP](/ApuntesRedes/07-vlans/06-vtp-y-dtp) · **Siguiente:** [08 · Configuración y verificación](/ApuntesRedes/07-vlans/08-configuracion-y-verificacion)