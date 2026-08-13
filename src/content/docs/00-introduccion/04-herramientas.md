---
title: 04 — Las herramientas del oficio
description: Packet Tracer y Wireshark, y tu primera red montada en 5 minutos 🛠️
---

<p><small>Packet Tracer y Wireshark, y tu primera red montada en 5 minutos 🛠️</small></p>

> 🗺️ **Estás en:** 🚪 **Tema 0** → 04 · Las herramientas del oficio

---

## 🛠️ Packet Tracer: tu laboratorio de bolsillo

El administrador de redes trabaja con máquinas de miles de euros… cuando está en el trabajo. Para **aprender**, sería un desperdicio (y un peligro) romper el switch del instituto. Por eso existe el **simulador**:

- **Packet Tracer** es un programa de Cisco, **gratuito para estudiantes**, donde arrastras y sueltas ordenadores, switches, routers y cables sobre un lienzo **virtual** y los haces funcionar como si fueran físicos.
- Sirve para **montar redes enteras sin comprar ni una pieza**, probar configuraciones a tu aire y comprobar si "funcionaría" antes de tocar un equipo real.
- Se consigue registrándote en la **Cisco Networking Academy** (la versión para estudiantes se descarga desde su web, sin coste). Es el entorno con el que se trabaja la parte práctica de este curso.

La gran ventaja del simulador sobre el hardware real está en la palabra **miedo**: en la vida real, apagar un switch mientras toda la oficina trabaja es un drama; en Packet Tracer, un clic en *reiniciar* y listo. Puedes equivocarte a tus anchas, destrozar el cableado a sangre fría y experimentar con todo sin consecuencias.

| En el hardware real | En Packet Tracer |
|---|---|
| Cada equipo cuesta dinero y ocupa sitio | Todo es virtual, infinito y gratis |
| Un error apaga la red del centro | Un error solo apaga tu paciencia |
| Configurar requiere paciencia y cuidado con cada comando | Puedes repetir el experimento cien veces |
| No puedes "abrir" un equipo por dentro | Puedes romper y desmontar lo que quieras |

> 💡 **Nota mental:** no es un muñeco inservible. Detrás de cada clic hay los mismos comandos, protocolos y lógicas que usarías en una red real. Lo que aprendas aquí se traslada *casi* tal cual al material de verdad.

---

## 🔬 Wireshark: la lupa de alta precisión

Si Packet Tracer es el *taller* donde construyes la red, **Wireshark** es el **microscopio** que te deja ver lo que realmente pasa por el cable. Es una herramienta gratuita y open source que hace exactamente una cosa, pero bien hecha:

- **Captura paquetes**: cuando la lanzas sobre una interfaz, guarda en una lista *todo* el tráfico que entra y sale de tu máquina en tiempo real.
- **Te enseña de qué va**: cada línea de la lista es un paquete, y al hacer clic puedes ver en detalle su contenido: qué viene, qué lleva, de quién es, a qué servicio va.
- **Te acostumbra a la interfaz**: tres zonas que usarás cientos de veces.

| Zona de Wireshark | Qué hace |
|---|---|
| Botón **start / stop** | Empezar o parar la captura |
| **Lista de paquetes** | El historial de lo que ha pasado: hora, origen, destino y protocolo |
| **Panel de detalles** | El paquete "abierto en canal": cada dato dentro de cada sobre |
| **Barra de filtros** | Mostrar solo lo que te interesa (por ejemplo, solo ping) |

> ⚠️ **Copiado a fuego desde ya:** Wireshark ve *todo* el tráfico de la interfaz en la que capturas. **No captures redes de personas sin su permiso**: en tu casa o en el lab es genial; sobre la red de otra gente, capturar sin permiso es ilegal y, además, va contra toda ética profesional.

Con la lupa lista puedes hacer tu primer experimento: abre Wireshark, pulsa *capturar* en la interfaz de tu tarjeta de red y, mientras captura, abre una página web. Pulsa *parar* y mira la lista: es una miríada de protocolos que hoy te suenan raros, pero ya estás viendo los "sobres" de la página 02 en directo. En la U02 los desmontamos uno a uno; hoy basta con comprobar que la red **se deja ver**.

---

## 📥 Instalación rápida

No te asustes: es más corto que la lista de la compra de un lunes. Sigue estos pasos y en un rato tienes el laboratorio montado.

<details>
<summary>🪟 En Windows (pasos express)</summary>

1. Abre el navegador, busca **Cisco Networking Academy → Packet Tracer** y descarga el instalador (`.exe`) para Windows.
2. Ejecuta el instalador con doble clic y acepta los pasos **siguiente → siguiente → instalar** (valen las opciones por defecto).
3. Al acabar, abre Packet Tracer con el acceso que se crea en el escritorio.
4. Para **Wireshark**: descarga el instalador desde el sitio oficial (el botón verde grande de la "versión estable") y también lo instalas con siguiente → siguiente.
5. Paso extra: al arrancar, lee la licencia y entra en el modo de exploración sin miedo. Ya está.

</details>

<details>
<summary>🐧 Instalación en Linux (apt, paso a paso)</summary>

1. **Packet Tracer:** Cisco publica paquetes `.deb` y `.rpm`. Descarga el `.deb` desde la Net Academy y, en la terminal, instala con `sudo apt install ./PaquetePacketTracer.deb` (si el nombre es largo, escribe `./Paq` y pulsa **Tab** para autocompletar).
2. **Wireshark:** en Ubuntu y derivados, `sudo apt install wireshark`. Durante la instalación te preguntará si los usuarios sin privilegios pueden capturar paquetes: responde **No** para poder iniciarlo desde cualquier terminal sin problemas.
3. Para capturar siendo usuario normal sin `sudo`: `sudo usermod -aG wireshark $USER` y **cierra sesión o reinicia** para que el grupo se haga efectivo.
4. Ya tenemos todo: comprueba que las dos aplicaciones aparecen en el menú y abre Packet Tracer.

</details>

---

## 🧪 Primera práctica: 2 ordenadores hablándose (5 minutos)

Es la práctica "de bautismo" del curso: **montar una red LAN mínima** con dos PC y un switch, y comprobar que se entienden con un **ping visual**. Paso a paso:

1. **Abre** Packet Tracer con una red en blanco (tu lienzo).
2. En la barra inferior, entra en **End Devices** y arrastra **2 PCs** al lienzo.
3. Entra en **Switches** y arrastra **un switch** (uno sencillo vale).
4. En **Conexiones**, elige el cable **Cobre directo** y conecta: el PC0 a un puerto del switch y el PC1 a otro puerto. Ahora fíjate: los **puntos** de los puertos deben pasar a verde.
5. Haz clic en el **PC0** → **Desktop** (Escritorio) → **IPConfig** y pon: **IP: 192.168.0.1**, máscara `255.255.255.0`.
6. Haz lo mismo en el **PC1** con **IP: 192.168.0.2** y la misma máscara.
7. Vuelve al **PC0** → **Desktop** → **Prompt de comandos** y escribe el **comando más bonito del curso**: `ping 192.168.0.2`.

Si todo está bien, cada respuesta debe llegar con "Reply…". Enhorabuena: acabas de montar, configurar y probar una red, literalmente, de 0 a 1.

### 🧠 Qué has hecho hoy (sin darte cuenta)

Acabas de reproducir el "viaje tipo" del curso: dos dispositivos finales, un dispositivo de interconexión (el switch), un medio (el cable) y un protocolo (el ping, que viaja sobre ICMP). Esa combinación — **dispositivos finales + interconexión + protocolo** — se repite en cada práctica desde ahora, solo con más piezas. Empezar por ella no fue casualidad.

### 🎬 El "ping visual" (modo simulación)

<details>
<summary>🎬 Paso a paso del ping visual</summary>

1. Con los dos PC configurados, cambia Packet Tracer al **modo simulación** (pestaña *Simulation*, la de la rejilla).
2. Abre el **Command Prompt** del PC0 y escribe `ping 192.168.0.2` (con Enter).
3. Ahora, cada vez que pulses **el botón de paso/adelante**, verás un **sobre** (PDU) saltando del PC0 al switch y del switch al PC1: es el **paquete** de la página anterior, ahora dibujado delante de tus narices.
4. Pulsa **Play** para dejarlo solo; al final, la petición ICMP y respuesta de ida y vuelta quedan registradas en la lista de eventos.
5. Repite el ejercicio con otro PC más (PC2 → `192.168.0.3`) y fíjate en lo que cambia: ahora el switch decide a qué puerto enviar cada sobre. Ya has visto, en miniatura, todo lo que harás en la U06.
</details>

### 🙈 Los fallos más típicos (y su solución)

<details>
<summary>🚨 Fallos comunes en tu primera red</summary>

| El síntoma | La causa probable | La solución rápida |
|---|---|---|
| Los puntos del cable siguen **rojos/amarillos** | El enlace no se levantó: cable mal conectado o del tipo equivocado | Revisa que ambos extremos apunten a puertos del switch y elige cable **directo** |
| **PC0 no tiene IP** con IPConfig en blanco | No has puesto la dirección IP en ese PC | Pon una IP de la subred correcta en cada equipo |
| El ping da "tiempo de espera agotado" | Las IPs están en **subredes distintas** (p. ej. 192.168.1.x y 192.168.2.x) | Pon ambas a la misma subred (192.168.0.1 y 192.168.0.2) |
| No ves ningún `Reply` aunque configuraste bien | El switch está **apagado** (símbolo de apagado / sin luz) | Haz clic en el switch y dale a encendido (Power) |
| Todo está verde pero nada llega | El PC destino tiene el **firewall** que bloquea el ping | En Packet Tracer apaga el firewall desde Desktop → config del PC |

</details>

---

## ⚠️ Dos advertencias de sentido común

Con herramientas doblemente potentes conviene llevar un tornillo bien atornillado en la cabeza:

- **La herramienta se usa con oficio, no con miedo.** Estás en modo seguro: los fallos en Packet Tracer no rompen nada. Rompe, prueba, borra y vuelve a empezar. Cuantos más errores arregles, mejor administrador serás.
- **Tampoco hay excusa para el descuido con Wireshark**: capturar paquetes de redes ajenas sin permiso es ilegal. La regla del buen técnico: **no captures nada que no sea tuyo, de tu instituto o de un contenedor de pruebas.**

---

## ✅ Resumen en 3 frases

1. **Packet Tracer** es tu laboratorio virtual para montar redes sin miedo a romper nada, y **Wireshark** tu lupa para leer los paquetes.
2. Instalarlos (Windows o Linux) era más rápido de lo que pensabas: es de "siguiente, siguiente", sin dramas.
3. Con 2 PCs, 1 switch y dos IPs ya has montado y **hecho ping**: ese flujo de sobres que acabas de ver es el corazón de todo lo que viene.

📚 [Volver al índice del Tema 0](/ApuntesRedes/00-introduccion) · **Siguiente:** [05 · La mente de un administrador](/ApuntesRedes/00-introduccion/05-metodo-diagnostico)