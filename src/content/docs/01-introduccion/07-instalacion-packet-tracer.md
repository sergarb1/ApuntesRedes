---
title: 07 — Instalación de Packet Tracer
description: Prepara tu laboratorio virtual antes de tocar cables reales 🛠️
---

<p><small>Prepara tu laboratorio virtual antes de tocar cables reales 🛠️</small></p>

> 🗺️ **Estás en:** 🚪 **U01 · Introducción** → 07 · Instalación de Packet Tracer

---

## 📬 La idea en una frase

> **Antes de empezar a construir redes en la pizarra, necesitamos instalar nuestro laboratorio virtual de bolsillo para poder experimentar, romper y configurar sin miedo a dañar ningún equipo real.**

---

## 📥 ¿Cómo conseguir Packet Tracer gratis?

Packet Tracer es la herramienta oficial de simulación de Cisco y es completamente gratuita para estudiantes. Para descargarlo de forma legal y segura, sigue estos pasos:

1. Entra en la plataforma oficial de la **Cisco Networking Academy (NetAcad)** a través de su web: [https://www.netacad.com/](https://www.netacad.com/).
2. **Regístrate** de forma gratuita en el curso introductorio o de descargas disponible para estudiantes.
3. Dirígete al apartado de recursos o descargas y **baja el instalador** correspondiente a tu sistema operativo (Windows o Linux).
4. Ejecuta el archivo descargado y pulsa **"Siguiente, siguiente, siguiente"** para completar la instalación estándar sin necesidad de tocar configuraciones raras.

---

## 📺 Vídeo de apoyo en YouTube

Si durante el proceso de registro o instalación te surge alguna pequeña duda visual con los menús de Cisco, puedes echarle un vistazo a estos tutoriales paso a paso:

- **Windows:** [https://www.youtube.com/watch?v=pv5sdrHvWgE](https://www.youtube.com/watch?v=pv5sdrHvWgE)
- **Linux:** [https://youtu.be/BKe5Tc9ePsY](https://youtu.be/BKe5Tc9ePsY)

---

## ✅ Resumen en 3 frases

1. Packet Tracer es gratuito para estudiantes y se descarga desde la web oficial de Cisco Networking Academy.
2. La instalación es estándar: descargar, ejecutar y seguir los pasos sin configurar nada raro.
3. Si te trabas con el registro o los menús, hay tutoriales en YouTube que te guían paso a paso.

---

## 🔥 Fireside Chat: Packet Tracer vs Hardware real

> *Dos herramientas de red debaten en el armario de comunicaciones.*

**Packet Tracer:** — Yo soy el laboratorio seguro. Puedes montar 50 PC, 10 routers y 5 switches en un minuto, y si lo destrozas, solo pulsas "nuevo" y empiezas de cero. Sin cables, sin polvo, sin que el profesor te regañe.

**Hardware real:** — Claro, pero yo soy la verdad. Cuando enchufas un cable y ves la luz del LED, eso no es simulación: es la realidad. Yo te enseño lo que es un cable suelto, un puerto quemado o un switch que se cuelga de verdad.

**Packet Tracer:** — ¿Y cuántos alumnos pueden practicar a la vez contigo? ¿Cuántos switches tienes? Yo permito que 30 personas monten su red al mismo tiempo sin esperar cola.

**Hardware real:** — *suspiro* Tienes razón en que soy escaso. Pero cuando el examen es real y toca tocar un switch de verdad, ahí estoy yo.

**Packet Tracer:** — Somos complementarios, no rivales. Yo para aprender; tú para consolidar.

---

## 🕵️ ¿Quién Soy?

Adivina qué herramienta de red soy:

1. **Soy un simulador gratuito de Cisco.** Puedo montar redes completas en un ordenador sin cables ni equipos físicos.
2. **Soy la lupa de alta precisión.** Capturo y muestro cada paquete que pasa por la red, byte a byte.
3. **Soy el sonar del submarino.** Envío un pulso y compruebo si otro equipo responde.

<details>
<summary>🔄 Respuestas</summary>

1. **Packet Tracer** — el laboratorio virtual de bolsillo.
2. **Wireshark** — el analizador de paquetes.
3. **ping** — la herramienta de diagnóstico más básica.

</details>

---

## 🤬 CONRAD VS EL MUNDO: "Packet Tracer no es real"

> *CONRAD, nuestro switch cascarrabias, opina sobre los que desprecian el simulador.*

**CONRAD:** — ¡OTRA VEZ! Viene un alumno y me dice: *"CONRAD, ¿para qué uso Packet Tracer si en el instituto hay switches de verdad?"* Y yo: **¡PORQUE SI TOCAS EL SWITCH DE VERDAD SIN SABER LO QUE HACES, LO ROMPES!** Packet Tracer es tu taller seguro: ahí aprendes a configurar VLANs, a cablear routers, a hacer ping sin miedo. Cuando entiendas lo que haces, AHÍ SÍ tocas el hardware real. Pero si empiezas por el hardware sin saber, vas a costar más en arreglar que en aprender.

**La lección:** Packet Tracer no es "juguete": es la herramienta que te permite equivocarte sin consecuencias. Úsala sin vergüenza.

---

## ⚡ Laboratorio de tortura: Instala y comprueba

> **Duración estimada:** 15 minutos
> **Herramienta:** Navegador web + Packet Tracer

**El escenario:** Sigue estos pasos y comprueba que todo funciona:

1. Entra en [netacad.com](https://www.netacad.com/) y regístrate.
2. Descarga Packet Tracer para tu sistema operativo.
3. Instálalo con la configuración por defecto.
4. Ábrelo y comprueba que puedes arrastrar un PC y un switch al lienzo.
5. Conecta el PC al switch con un cableEthernet (automático).
6. Asigna una IP al PC (`192.168.1.10/24`) y comprueba que el LED del puerto se enciende.

**Si todo funciona:** ¡enhorabuena! Tu laboratorio virtual está listo para el curso.

**Si algo falla:**
- ¿No te deja registrarte? Prueba con otro navegador o correo.
- ¿El instalador no abre? Comprueba que tienes permisos de administrador.
- ¿No se ven los LEDs? Asegúrate de haber asignado una IP y de que el cable esté conectado.

---

## 🏆 Logros de esta sección

| Logro | Cómo conseguirlo |
|---|---|
| 🏅 **Instalador relámpago** | Tener Packet Tracer instalado y abriendo sin errores |
| 🏅 **Primera red** | Montar 1 PC + 1 switch en Packet Tracer y ver el LED encendido |

---

## 🧠 Atrévete a pensar

1. **¿Por qué se recomienda Packet Tracer en vez de tocar hardware real** al principio del curso?
2. **¿Qué Limitaciones tiene Packet Tracer** respecto al hardware real? (Pista: piensa en lo que no puedes hacer con un simulador.)
3. **¿En qué momento del curso pasarías de Packet Tracer a hardware real?** ¿Por qué?

<details>
<summary>💡 Soluciones</summary>

1. Porque permite **equivocarse sin consecuencias**: si configuras mal un switch en Packet Tracer, solo pulsas "nuevo"; si lo haces en un switch real, puede costar tiempo y dinero arreglarlo.
2. Packet Tracer **no模拟a todo**: por ejemplo, no puedes ver LEDs物理icos, no puedes probar fibra óptica, y algunos protocolos avanzados no estánimplementados al 100%.
3. Cuando domines los conceptos básicos (IP, switch, router, ping), es buen momento para tocar hardware real y comprobar que lo que sabes funciona en la realidad.

</details>

---

## 🧩 Crucigrama de bits

```
Horizontal:
1. Herramienta gratuita de Cisco para simular redes (6+7+8 letras)
3. El hardware donde aprendes "de verdad" (7+4+4+4+5+5 letras)

Vertical:
2. El simulador donde equivocarse sin miedo (6+7+8 letras)
4. La herramienta que captura paquetes reales (9+9+7+5+4+5 letras)
```

<details>
<summary>📝 Soluciones</summary>

**Horizontal:** 1. PACKET TRACER · 3. HARDWARE REAL
**Vertical:** 2. PACKET TRACER · 4. WIRESHARK

</details>

---

## 💬 Preguntas de entrevista de trabajo

> Preguntas reales que te harían para administrador de redes junior.

1. **"¿Qué es Packet Tracer? ¿Lo usarías en producción?"**
2. **"¿Cuál es la diferencia entre simular una red y montarla en hardware real?"**
3. **"Un compañero dice que Packet Tracer es 'de niños'. ¿Qué le respondes?"**

---

## 🤷 No hay preguntas tontas

> ❓ **¿Packet Tracer es legal?**

**Sí, completamente.** Es una herramienta gratuita de Cisco para estudiantes y profesores de la Networking Academy. Lo que no puedes hacer es redistribuirlo ni usarlo con fines comerciales.

---

> ❓ **¿Puedo usar Packet Tracer en Linux?**

**Sí.** Cisco proporciona版本 para Windows y Linux. La instalación en Linux es igual de sencilla: descargas el paquete `.deb` o `.flatpak` y lo instalas con doble clic o desde terminal.

---

## 🎬 Poscréditos

Packet Tracer se abre por primera vez en tu ordenador. Un PC virtual aparece en el lienzo y dice: *"¿Esto es todo? ¿Dónde están los cables reales?"*. Un switch virtual le responde: *"Tranquilo, aquí no hay cables que desconectar. Pero cuando aprendas, allá fuera te esperan los de verdad."*.

**PRÓXIMAMENTE EN 08:** El mapa del curso — las 12 etapas del viaje de PAR. 🗺️

---

📚 [Volver al índice de la unidad](/ApuntesRedes/01-introduccion) · **Anterior:** [06 · Método de diagnóstico](/ApuntesRedes/01-introduccion/06-metodo-diagnostico) · **Siguiente:** [08 · Glosario](/ApuntesRedes/01-introduccion/09-glosario)
