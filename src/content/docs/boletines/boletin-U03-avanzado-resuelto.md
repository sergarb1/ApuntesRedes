---
title: Boletín U03 — Avanzado (Resuelto)
description: Soluciones ejercicios avanzados de Infraestructura Física de Red
---

# ✅ Boletín U03 — Avanzado (Resuelto)

---

## 1. Diagnóstico de cableado

a) **Causas posibles:**
   - Solo 2 pares conectados (mal crimpado) → negociación a 100 Mbps
   - Cable Cat5e dañado o de mala calidad
   - El switch o PC tienen el puerto configurado manualmente a 100 Mbps
   - Cable demasiado largo (>100 m)

b) **Herramientas:** Comprobador de cables (para verificar continuidad de los 4 pares), y la configuración de red del PC/switch (para ver velocidad negociada).

c) **Prueba de diagnóstico:**
   - Probar el mismo cable con otro PC y otro puerto del switch
   - Probar otro cable conocido bueno en el mismo PC y puerto
   - Si el cable nuevo funciona a 1 Gbps → el cable original está dañado
   - Si ningún cable funciona a 1 Gbps → problema en PC o switch

## 2. Diseño de cableado estructurado

a) **Switches:**
   - Planta 1: 1 switch de 48 puertos (para 40 puestos + servidores)
   - Planta 2: 1 switch de 48 puertos (para 30 puestos)
   - Switch de core en la sala de servidores

b) **Cable:**
   - Puestos: Cat6 (estándar para 1 Gbps)
   - Uplinks entre plantas: fibra multimodo (OM3/OM4, 10 Gbps)

c) **Patch panels:** 1 panel de 48 puertos por planta, cerca del switch correspondiente.

d) **Conexión entre plantas:** Fibra multimodo desde cada switch de planta hasta el switch de core en la sala de servidores, usando módulos SFP+.

## 3. Cálculo de atenuación

a) Potencia recibida = 2 dBm - 21.3 dB = **-19.3 dBm**

b) **Sí funciona.** -19.3 dBm > -20 dBm (el umbral del receptor). La señal es válida.

c) A 120 metros: atenuación proporcional = 21.3 × (120/100) = 25.56 dB
   Potencia recibida = 2 - 25.56 = **-23.56 dBm**
   **No funciona.** -23.56 dBm está por debajo del umbral de -20 dBm.

## 4. Fibra vs Cobre: caso real

a) **200 m:** Cobre Cat6a (funciona a 10 Gbps hasta 100 m) o fibra multimodo
   **500 m:** Fibra multimodo (el cobre no llega a 500 m)
   **2000 m:** Fibra monomodo (obligatorio para 2 km)

b) **200-500 m:** Fibra multimodo OM3/OM4 (10 Gbps, hasta 550 m)
   **2000 m:** Fibra monomodo OS2 (10 Gbps, hasta 40 km)

c) **Conectores:** LC (estándar en SFP)
   **Módulos SFP:**
   - 200-500 m: SFP+ 10GBASE-SR (multimodo, 850 nm)
   - 2000 m: SFP+ 10GBASE-LR (monomodo, 1310 nm)

## 5. Pinout y solución de problemas

a) **Falla el pin 3** (el cuarto LED no se enciende: posición 3 de 8).

b) **Par 3-6** (blanco/verde y verde en T568B, o blanco/naranja y naranja en T568A). El pin 3 forma parte del par transmisión/recepción junto con el pin 6.

c) **Funcionará parcialmente.** 100Base-TX solo necesita los pares 1-2 y 3-6. Como falla el par 3-6, el cable **no funcionará ni a 100 Mbps**. Para Gigabit (que necesita los 4 pares), tampoco funcionará.

## 6. Diseña el latiguillo perfecto

**Herramientas:** Crimpadora RJ45, pelacables, cortador, comprobador de cables.

**Pasos:**
1. **Pelar:** Con el pelacables, retira unos 2 cm de la funda exterior. Con cuidado de no dañar los hilos internos.
2. **Ordenar (T568B, clip hacia abajo, mirando el conector de frente):**
   - Pin 1: Blanco/Naranja
   - Pin 2: Naranja
   - Pin 3: Blanco/Verde
   - Pin 4: Azul
   - Pin 5: Blanco/Azul
   - Pin 6: Verde
   - Pin 7: Blanco/Marrón
   - Pin 8: Marrón
3. **Cortar:** Con la crimpadora, corta los hilos rectos dejando aproximadamente 1 cm desde la funda.
4. **Insertar:** Mete los hilos en el conector RJ45, empujando hasta que los veas asomar por el frente (por los contactos dorados). La funda debe quedar dentro del conector (el pasador de sujeción la agarra).
5. **Crimpar:** Introduce el conector en la crimpadora y aprieta firmemente hasta oír un clic.
6. **Comprobar:** Usa el tester para verificar continuidad en todos los pines (1-8 en orden). Si algún LED no se enciende o el orden es incorrecto, corta y repite.

**Señal de crimpado correcto:** Todos los contactos dorados están hundidos uniformemente, la funda está sujeta por el pasador, y el tester muestra LEDs 1-8 en secuencia correcta.
