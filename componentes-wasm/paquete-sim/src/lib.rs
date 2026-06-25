// ============================================================
// paquete-sim — Simulador didáctico de envío de paquetes
// Apuntes PAR — U01: Fundamentos de redes
//
// ¿Qué hace este programa?
//   Simula el viaje de un paquete (P4QU3T3) desde un origen
//   hasta un destino, mostrando cada paso del proceso:
//   ARP, conmutación, routing, etc.
//
// ¿Cómo compilarlo?
//   1. Instala Rust: https://rustup.rs
//   2. Instala wasm-pack: cargo install wasm-pack
//   3. En esta carpeta: wasm-pack build --target web
//   4. El .wasm se genera en pkg/
//
// ¿Cómo usarlo en la web?
//   import init, { simular_envio } from './pkg/paquete_sim.js';
//   await init();
//   const resultado = simular_envio("192.168.1.10", "8.8.8.8");
//   console.log(resultado);
// ============================================================

use wasm_bindgen::prelude::*;

/// Representa un paquete IP viajando por la red
#[wasm_bindgen]
pub struct Paquete {
    pub origen: String,
    pub destino: String,
    pub ttl: u8,
    pub payload: String,
    pub mac_origen: String,
    pub mac_destino: String,
    pub paso_actual: usize,
    pub historia: Vec<String>,
}

#[wasm_bindgen]
impl Paquete {
    /// Crea un nuevo paquete P4QU3T3 listo para viajar
    pub fn new(origen: String, destino: String) -> Paquete {
        Paquete {
            origen,
            destino,
            ttl: 64,          // Time To Live estándar
            payload: String::from("Hola, soy P4QU3T3!"),
            mac_origen: String::from("AA:BB:CC:DD:EE:01"),
            mac_destino: String::new(),  // Aún no sabemos la MAC destino
            paso_actual: 0,
            historia: Vec::new(),
        }
    }

    /// Simula el viaje completo paso a paso
    /// Devuelve un array con cada paso del proceso
    pub fn viajar(&mut self) -> Vec<String> {
        self.historia.clear();
        self.paso_actual = 0;

        // Paso 1: ¿Está el destino en la misma red?
        self.historia.push(format!(
            "[Paso {}] 🏠 P4QU3T3 nace en {}. Quiere ir a {}.",
            self.paso_actual, self.origen, self.destino
        ));
        self.paso_actual += 1;

        // Comprobamos si la IP destino está en la misma subred (simplificado)
        if self.destino.starts_with("192.168.") {
            // Misma red local
            self.historia.push(format!(
                "[Paso {}] 🔍 El destino está en la misma red. Consultando tabla ARP...",
                self.paso_actual
            ));
            self.paso_actual += 1;

            // Simulamos que NO tenemos la MAC en caché
            self.historia.push(format!(
                "[Paso {}] ❓ Tabla ARP vacía. Lanzando ARP Request (broadcast) por la MAC de {}...",
                self.paso_actual, self.destino
            ));
            self.paso_actual += 1;

            self.historia.push(format!(
                "[Paso {}] 📢 Switch recibe broadcast y lo inunda por todos los puertos.",
                self.paso_actual
            ));
            self.paso_actual += 1;

            self.historia.push(format!(
                "[Paso {}] ✅ Destino responde con ARP Reply. MAC conocida: BB:BB:BB:BB:BB:BB.",
                self.paso_actual
            ));
            self.mac_destino = String::from("BB:BB:BB:BB:BB:BB");
            self.paso_actual += 1;

            self.historia.push(format!(
                "[Paso {}] 🚀 Enviando trama Ethernet: MAC_origen={}, MAC_destino={}.",
                self.paso_actual, self.mac_origen, self.mac_destino
            ));
        } else {
            // El destino está en otra red → necesitamos el gateway
            self.historia.push(format!(
                "[Paso {}] 🌍 El destino está en OTRA red. Necesito el gateway (192.168.1.1).",
                self.paso_actual
            ));
            self.paso_actual += 1;

            self.historia.push(format!(
                "[Paso {}] 🔍 Consultando tabla ARP por la MAC del gateway...",
                self.paso_actual
            ));
            self.paso_actual += 1;

            self.historia.push(format!(
                "[Paso {}] ✅ MAC del gateway: CC:CC:CC:CC:CC:CC. Enviando paquete al router.",
                self.paso_actual
            ));
            self.mac_destino = String::from("CC:CC:CC:CC:CC:CC");
            self.paso_actual += 1;

            self.historia.push(format!(
                "[Paso {}] 🧭 Router recibe el paquete, consulta su tabla de rutas...",
                self.paso_actual
            ));
            self.paso_actual += 1;

            self.historia.push(format!(
                "[Paso {}] 🗺️  Tiene ruta a {} por la interfaz WAN. Reenvía. TTL ahora: {}.",
                self.paso_actual, self.destino, self.ttl - 1
            ));
            self.ttl -= 1;
        }

        // Paso final
        self.historia.push(format!(
            "[Paso {}] 🎉 P4QU3T3 ha llegado a {} (o al menos lo intentó). Viaje completado.",
            self.paso_actual, self.destino
        ));

        self.historia.clone()
    }

    /// Obtiene el paso actual del viaje
    pub fn paso_actual(&self) -> usize {
        self.paso_actual
    }

    /// Obtiene el TTL restante
    pub fn ttl_restante(&self) -> u8 {
        self.ttl
    }
}

/// Función principal para WASM: simula un envío y devuelve los pasos
#[wasm_bindgen]
pub fn simular_envio(origen: &str, destino: &str) -> Vec<String> {
    let mut paquete = Paquete::new(origen.to_string(), destino.to_string());
    paquete.viajar()
}
