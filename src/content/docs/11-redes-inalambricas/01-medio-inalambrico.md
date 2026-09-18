---
title: 01 — El medio inalámbrico
description: El aire como cable que nadie controla 🌬️
---

<p><small>El aire como cable que nadie controla 🌬️</small></p>

> 🗺️ **Estás en:** 📶 **UD11 · Redes inalámbricas** → 01 · El medio inalámbrico

---

## 📬 La idea en una frase

> El WiFi usa **ondas de radio** en dos bandas —2,4 GHz y 5 GHz (y ahora 6 GHz)— divididas en **canales**; como el aire es compartido, la cobertura, los canales y las interferencias son las tres decisiones que definen si tu red vuela o agoniza.

---

## 📻 Radiofrecuencia para administradores

No necesitas ser ingeniero de telecomunicaciones, pero sí tres ideas de radio:

1. **Frecuencia = canal de emisión.** 2,4 GHz y 5 GHz son trozos del espectro repartidos en canales numerados.
2. **Más frecuencia, más velocidad pero menos alcance y peor penetración.** Las ondas de 5 GHz se cansan antes y atraviesan paredes peor que las de 2,4 GHz.
3. **El medio es compartido y público.** Cualquiera puede emitir en esas frecuencias (con límites de potencia); por eso existen las interferencias y por eso la seguridad importa tanto.

| Propiedad | 2,4 GHz | 5 GHz | 6 GHz (WiFi 6E/7) |
|---|---|---|---|
| Alcance | Mayor | Medio | Menor |
| Penetración de paredes | Buena | Regular | Pobre |
| Canales limpios | 3 | Muchos | Montones |
| Interferencias (microondas, BT…) | Muchas | Pocas | Casi nulas |
| Velocidad máxima | Baja | Alta | Muy alta |

> 💡 **Regla de oro del diseño:** 2,4 GHz para cobertura y compatibilidad; 5 GHz para rendimiento. Si tu red solo tiene un SSID con banda única, estás dejando rendimiento tirado.

---

## 🎚️ Los canales: el parking del espectro

Cada banda se divide en canales numerados. En 2,4 GHz (canales 1 a 13 en Europa) cada canal ocupa unos 20 MHz pero los canales están separados solo 5 MHz: **se solapan**. Solo hay tres canales que NO se pisan entre sí:

```
Canal:    1      2      3      4      5      6      7      8      9     10     11 ...
Espectro: [███████████████]                      (canal 1: 2412 MHz)
                 [███████████████]               (canal 6: 2437 MHz)
                                [███████████████](canal 11: 2462 MHz)
          1, 6 y 11: los únicos que no se solapan ✔
```

Usar canales como el 3 o el 8 en un edificio con varios APs es sembrar coches en medio del parking: todos se molestan. En 5 GHz la historia es más amable: canales de 20/40/80/160 MHz con menos solapamiento y menos aparatos viejos metiendo ruido (aunque también menor alcance).

---

## 😤 Los enemigos del aire

| Enemigo | Qué hace | Dónde vive |
|---|---|---|
| **Otros WiFi** | El SSID del vecino en tu mismo canal | Edificios de pisos, oficinas compartidas |
| **Microondas** | Ruido de banda ancha en 2,4 GHz | Cocinas, cafeterías |
| **Bluetooth** | Salta por 2,4 GHz pisando tu canal | Auriculares, teclados |
| **Hormigón y metal** | Atenuan o reflejan la señal | Paredes de carga, ascensores, armarios |
| **Agua** | Absorbe 2,4 GHz con entusiasmo | Acuarios, paredes húmedas, personas |
| **Emisores no WiFi** | Videocámaras analógicas, teléfonos DECT, NFC | Instalaciones antiguas |

Por eso el mismo AP que funciona perfecto en tu casa se desploma en una cafetería llena: **el aire no se compra, se comparte.**

---

## 📐 Qué se mide: señal, ruido y SNR

- **RSSI / nivel de señal:** la potencia recibida, en dBm (número negativo, más cercano a 0 = mejor). Regla práctica: −60 dBm excelente, −67 dBm bien para voz/vídeo, −70 dBm aceptable para datos, −80 dBm para sufrir.
- **Ruido de fondo:** lo que emite todo lo demás en tu canal.
- **SNR (relación señal/ruido):** la diferencia entre ambas. Por debajo de ~20 dB, el rendimiento se degrada aunque "veas tres barras".

> ⚠️ **CONRAD dice:** "Tres barras en el móvil no son un diagnóstico. Tres barras con SNR de 10 dB es como un coche con depósito lleno y el motor fundido: hay señal, no hay red. Mide con una app de spectrometer o con el propio AP antes de afirmar tonterías."

---

## 🧠 Mini-chequeo

1. ¿Por qué solo se recomiendan los canales 1, 6 y 11 en 2,4 GHz?
2. Un cliente ve la red a −55 dBm pero la conexión va a trompos. ¿Qué medida te falta para el diagnóstico?
3. ¿Qué banda elegirías para los terminales de una nave industrial con mucho metal y por qué?

<details>
<summary>🔄 Respuestas</summary>

1. Porque cada canal ocupa ~20 MHz y solo están separados 5 MHz: los canales 1, 6 y 11 son los únicos tres que **no se solapan** entre sí; cualquier otro convive a medias con dos vecinos.
2. El **ruido de fondo/SNR**. Con −55 dBm de señal y mucho ruido, la relación señal/ruido es mala y el rendimiento se hunde. Medir señal sin ruido es media diagnosis.
3. La que funcione tras **medir**, pero en metal los 2,4 GHz suelen sufrir reflexiones y 5 GHz peor penetración… la respuesta profesional es un site survey: no hay banda ganadora en abstracto, hay una banda que funciona con esos obstáculos y esa ubicación de APs.
</details>

---

## ✅ Resumen en 3 frases

- El WiFi vive en **2,4 y 5 GHz** divididos en canales; el aire es un medio compartido que nadie controla.
- En 2,4 GHz solo hay **3 canales limpios (1, 6, 11)**; en 5 GHz hay sitio de sobra.
- El diagnóstico inalámbrico mide **señal Y ruido** (SNR); las barras del móvil no son un dato.

## 🐛 Vocabulario rápido

| Término | Idea general |
|---|---|
| Canal | Trozo numerado del espectro donde emite un AP |
| Solapamiento | Canales vecinos que comparten espectro |
| RSSI/dBm | Nivel de señal recibida (−60 mejor que −75) |
| SNR | Señal menos ruido: la métrica que manda |
| Site survey | Medición de cobertura y ruido in situ |

---

📚 [Volver al índice de la unidad](/ApuntesRedes/11-redes-inalambricas) · **Anterior:** [Índice de la unidad](/ApuntesRedes/11-redes-inalambricas) · **Siguiente:** [02 · Medios y antenas](/ApuntesRedes/11-redes-inalambricas/02-medios-inalambricos)
