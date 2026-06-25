const pasos = [
  { icon: '🏠', text: 'P4QU3T3 nace en <strong>192.168.1.10</strong> con destino <strong>8.8.8.8</strong>' },
  { icon: '🌍', text: 'El destino está en <strong>OTRA red</strong>. Necesitamos el gateway <strong>192.168.1.1</strong>' },
  { icon: '🔍', text: 'Consultando tabla ARP por la MAC del gateway...', detail: 'Tabla ARP vacía. Lanzando ARP Request (broadcast)' },
  { icon: '📢', text: 'Switch recibe la trama broadcast y la inunda por todos los puertos' },
  { icon: '✅', text: 'Gateway responde con <strong>ARP Reply</strong>', detail: 'MAC: CC:CC:CC:CC:CC:CC' },
  { icon: '🧭', text: 'Router recibe el paquete, decrementa TTL (64→63) y consulta su tabla de rutas' },
  { icon: '🗺️', text: 'Tiene ruta a <strong>8.8.8.0/24</strong> por la interfaz WAN. Reenvía el paquete' },
  { icon: '🎉', text: 'P4QU3T3 ha salido hacia Internet. Viaje completado.' },
];

export function crearSimulador(container) {
  container.innerHTML = `
    <div class="sim-card">
      <div class="sim-header">
        <span class="sim-badge">🌐 Simulador de envío de paquetes</span>
        <span class="sim-sub">Haz clic en "Enviar paquete" para ver el viaje paso a paso</span>
      </div>
      <div class="sim-topology">
        <div class="sim-node" data-node="pc">
          <div class="sim-node-icon">🖥️</div>
          <div class="sim-node-label">PC-A<br><small>192.168.1.10</small></div>
        </div>
        <div class="sim-arrow">→</div>
        <div class="sim-node" data-node="switch">
          <div class="sim-node-icon">🔀</div>
          <div class="sim-node-label">Switch<br><small>Capa 2</small></div>
        </div>
        <div class="sim-arrow">→</div>
        <div class="sim-node" data-node="router">
          <div class="sim-node-icon">🌐</div>
          <div class="sim-node-label">Gateway<br><small>192.168.1.1</small></div>
        </div>
        <div class="sim-arrow">→</div>
        <div class="sim-node" data-node="wan">
          <div class="sim-node-icon">☁️</div>
          <div class="sim-node-label">Internet</div>
        </div>
      </div>
      <div class="sim-controls">
        <button class="sim-btn" id="sim-start">🚀 Enviar paquete</button>
        <button class="sim-btn sim-btn-secondary" id="sim-reset" style="display:none">🔄 Reiniciar</button>
      </div>
      <div class="sim-log" id="sim-log"></div>
    </div>
  `;

  const log = container.querySelector('#sim-log');
  const startBtn = container.querySelector('#sim-start');
  const resetBtn = container.querySelector('#sim-reset');
  let pasoActual = 0;

  function highlightNode(nombre) {
    container.querySelectorAll('.sim-node').forEach(n => n.classList.remove('active'));
    const node = container.querySelector(`[data-node="${nombre}"]`);
    if (node) node.classList.add('active');
  }

  function mostrarPaso(i) {
    if (i >= pasos.length) {
      startBtn.style.display = 'none';
      resetBtn.style.display = 'inline-flex';
      return;
    }
    const p = pasos[i];
    const entry = document.createElement('div');
    entry.className = 'sim-step';
    entry.innerHTML = `<span class="sim-step-icon">${p.icon}</span>
      <div class="sim-step-body">
        <div class="sim-step-text">${p.text}</div>
        ${p.detail ? `<div class="sim-step-detail">${p.detail}</div>` : ''}
      </div>`;
    log.appendChild(entry);
    entry.scrollIntoView({ behavior: 'smooth', block: 'nearest' });

    const nodeMap = [
      'pc', 'pc', 'pc', 'switch', 'router', 'router', 'router', 'wan'
    ];
    highlightNode(nodeMap[i] || 'pc');
  }

  function iniciar() {
    pasoActual = 0;
    log.innerHTML = '';
    highlightNode('pc');
    startBtn.textContent = '⏳ Enviando...';
    startBtn.disabled = true;
    const iv = setInterval(() => {
      mostrarPaso(pasoActual);
      pasoActual++;
      if (pasoActual >= pasos.length) {
        clearInterval(iv);
        startBtn.style.display = 'none';
        resetBtn.style.display = 'inline-flex';
      }
    }, 800);
  }

  function reiniciar() {
    pasoActual = 0;
    log.innerHTML = '';
    highlightNode('pc');
    startBtn.style.display = 'inline-flex';
    startBtn.textContent = '🚀 Enviar paquete';
    startBtn.disabled = false;
    resetBtn.style.display = 'none';
  }

  startBtn.addEventListener('click', iniciar);
  resetBtn.addEventListener('click', reiniciar);
}
