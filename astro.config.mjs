import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const emojis = ['🌐','📡','🔌','🧮','🚀','🔀','🏢','🧭','🗣️','🌐','🩺','☁️'];

const unitSlugs = [
  '01-fundamentos-redes',
  '02-modelos-osi-analisis',
  '03-infraestructura-fisica',
  '04-ipv4-subnetting',
  '05-ipv6-transicion',
  '06-switching-stp',
  '07-vlans',
  '08-routing-acls',
  '09-routing-dinamico',
  '10-nat-internet',
  '11-diagnostico-monitorizacion',
  '12-cloud-virtualizacion-futuro',
];

const unitLabels = [
  'Fundamentos de redes',
  'Modelos OSI y análisis',
  'Infraestructura física',
  'IPv4 y subnetting',
  'IPv6 y transición',
  'Switching y STP',
  'VLANs',
  'Routing y ACLs',
  'Routing dinámico',
  'NAT y acceso a Internet',
  'Diagnóstico y monitorización',
  'Cloud, virtualización y futuro',
];

const tema0 = {
  slug: '00-introduccion',
  label: 'Introducción',
  puntos: [
    { slug: '00-introduccion/01-que-es-una-red', label: 'Qué es una red' },
    { slug: '00-introduccion/02-terminos-basicos', label: 'Términos que no se ven' },
    { slug: '00-introduccion/03-mapa-del-curso', label: 'El mapa del curso' },
    { slug: '00-introduccion/04-herramientas', label: 'Herramientas del oficio' },
    { slug: '00-introduccion/05-metodo-diagnostico', label: 'Mente de administrador' },
    { slug: '00-introduccion/06-glosario-y-faq', label: 'Glosario y preguntas tontas' },
  ],
};

const unidadesExpandidas = {
  '01-fundamentos-redes': [
    { slug: '01-fundamentos-redes/01-que-es-una-red', label: '1 · ¿Qué es una red?' },
    { slug: '01-fundamentos-redes/02-tipos-y-alcance', label: '2 · Tipos de red y alcance' },
    { slug: '01-fundamentos-redes/03-topologias', label: '3 · Topologías' },
    { slug: '01-fundamentos-redes/04-dispositivos', label: '4 · Dispositivos de red' },
    { slug: '01-fundamentos-redes/05-modelo-osi', label: '5 · El modelo OSI' },
    { slug: '01-fundamentos-redes/06-protocolos', label: '6 · Protocolos' },
    { slug: '01-fundamentos-redes/07-direcciones-mac-ip', label: '7 · MAC e IP' },
    { slug: '01-fundamentos-redes/08-conectividad-basica', label: '8 · Conectividad básica' },
    { slug: '01-fundamentos-redes/09-cierre', label: '9 · Cierre' },
  ],
  '02-modelos-osi-analisis': [
    { slug: '02-modelos-osi-analisis/01-modelo-osi', label: '1 · El modelo OSI' },
    { slug: '02-modelos-osi-analisis/02-las-7-capas', label: '2 · Las 7 capas en detalle' },
    { slug: '02-modelos-osi-analisis/03-modelo-tcp-ip', label: '3 · El modelo TCP/IP' },
    { slug: '02-modelos-osi-analisis/04-encapsulacion', label: '4 · Encapsulación' },
    { slug: '02-modelos-osi-analisis/05-tcp-y-udp', label: '5 · TCP y UDP' },
    { slug: '02-modelos-osi-analisis/06-ip-ethernet', label: '6 · IP y Ethernet' },
    { slug: '02-modelos-osi-analisis/07-puertos-y-sockets', label: '7 · Puertos y sockets' },
    { slug: '02-modelos-osi-analisis/08-wireshark', label: '8 · Wireshark' },
    { slug: '02-modelos-osi-analisis/09-cierre', label: '9 · Cierre' },
  ],
  '07-vlans': [
    { slug: '07-vlans/01-que-es-una-vlan', label: '1 · ¿Qué es una VLAN?' },
    { slug: '07-vlans/02-tipos-de-vlan', label: '2 · Tipos de VLAN' },
    { slug: '07-vlans/03-trunks-y-8021q', label: '3 · Trunks y 802.1Q' },
    { slug: '07-vlans/04-inter-vlan-routing', label: '4 · Inter-VLAN routing' },
    { slug: '07-vlans/05-switch-capa3', label: '5 · Switch capa 3 y SVIs' },
    { slug: '07-vlans/06-vtp-y-dtp', label: '6 · VTP y DTP' },
    { slug: '07-vlans/07-seguridad-en-vlans', label: '7 · Seguridad en VLANs' },
    { slug: '07-vlans/08-configuracion-y-verificacion', label: '8 · Configuración y verificación' },
    { slug: '07-vlans/09-cierre', label: '9 · Cierre' },
  ],
  '08-routing-acls': [
    { slug: '08-routing-acls/01-componentes-del-router', label: '1 · Componentes del router' },
    { slug: '08-routing-acls/02-configuracion-basica', label: '2 · Configuración básica' },
    { slug: '08-routing-acls/03-rutas-estaticas', label: '3 · Rutas estáticas' },
    { slug: '08-routing-acls/04-ruta-por-defecto', label: '4 · Ruta por defecto' },
    { slug: '08-routing-acls/05-como-decide-el-router', label: '5 · Cómo decide un router' },
    { slug: '08-routing-acls/06-acls-conceptos', label: '6 · ACLs: concepto y tipos' },
    { slug: '08-routing-acls/07-acl-estandar', label: '7 · ACL estándar' },
    { slug: '08-routing-acls/08-acl-extendida-y-nombrada', label: '8 · ACL extendida y nombrada' },
    { slug: '08-routing-acls/09-cierre', label: '9 · Cierre' },
  ],
  '03-infraestructura-fisica': [
    { slug: '03-infraestructura-fisica/01-medios-de-transmision', label: '1 · Medios de transmisión' },
    { slug: '03-infraestructura-fisica/02-cable-utp', label: '2 · El cable UTP' },
    { slug: '03-infraestructura-fisica/03-directo-cruzado-consola', label: '3 · Directo, cruzado y consola' },
    { slug: '03-infraestructura-fisica/04-crimpado-y-comprobacion', label: '4 · Crimpado y comprobación' },
    { slug: '03-infraestructura-fisica/05-fibra-optica', label: '5 · Fibra óptica' },
    { slug: '03-infraestructura-fisica/06-wifi', label: '6 · WiFi' },
    { slug: '03-infraestructura-fisica/07-conceptos-fisicos', label: '7 · Conceptos físicos clave' },
    { slug: '03-infraestructura-fisica/08-cableado-estructurado', label: '8 · Cableado estructurado' },
    { slug: '03-infraestructura-fisica/09-cierre', label: '9 · Cierre' },
  ],
  '04-ipv4-subnetting': [
    { slug: '04-ipv4-subnetting/01-estructura-ipv4', label: '1 · Estructura de IPv4' },
    { slug: '04-ipv4-subnetting/02-binario-y-and', label: '2 · Binario y la operación AND' },
    { slug: '04-ipv4-subnetting/03-clases-de-direcciones', label: '3 · Clases de direcciones' },
    { slug: '04-ipv4-subnetting/04-ip-privadas-y-publicas', label: '4 · IPs privadas y públicas' },
    { slug: '04-ipv4-subnetting/05-mascaras-y-cidr', label: '5 · Máscaras y notación CIDR' },
    { slug: '04-ipv4-subnetting/06-subnetting-paso-a-paso', label: '6 · Subnetting paso a paso' },
    { slug: '04-ipv4-subnetting/07-vlsm', label: '7 · VLSM' },
    { slug: '04-ipv4-subnetting/08-dhcp', label: '8 · DHCP' },
    { slug: '04-ipv4-subnetting/09-cierre', label: '9 · Cierre' },
  ],
  '05-ipv6-transicion': [
    { slug: '05-ipv6-transicion/01-estructura-ipv6', label: '1 · Estructura de IPv6' },
    { slug: '05-ipv6-transicion/02-compresion-y-prefijos', label: '2 · Compresión y prefijos' },
    { slug: '05-ipv6-transicion/03-tipos-de-direcciones', label: '3 · Tipos de direcciones' },
    { slug: '05-ipv6-transicion/04-eui64-y-slaac', label: '4 · EUI-64 y SLAAC' },
    { slug: '05-ipv6-transicion/05-dhcpv6', label: '5 · DHCPv6' },
    { slug: '05-ipv6-transicion/06-icmpv6-y-ndp', label: '6 · ICMPv6 y NDP' },
    { slug: '05-ipv6-transicion/07-mecanismos-de-transicion', label: '7 · Mecanismos de transición' },
    { slug: '05-ipv6-transicion/08-configuracion-ipv6', label: '8 · Configuración IPv6' },
    { slug: '05-ipv6-transicion/09-cierre', label: '9 · Cierre' },
  ],
  '06-switching-stp': [
    { slug: '06-switching-stp/01-que-es-un-switch', label: '1 · ¿Qué es un switch?' },
    { slug: '06-switching-stp/02-aprendizaje-mac', label: '2 · Aprendizaje de MACs' },
    { slug: '06-switching-stp/03-dominios-colision-broadcast', label: '3 · Dominios de colisión y broadcast' },
    { slug: '06-switching-stp/04-tormenta-de-broadcast', label: '4 · La tormenta de broadcast' },
    { slug: '06-switching-stp/05-stp-fundamentos', label: '5 · STP: fundamentos' },
    { slug: '06-switching-stp/06-puertos-y-estados-stp', label: '6 · Puertos y estados STP' },
    { slug: '06-switching-stp/07-rstp-y-portfast', label: '7 · RSTP y PortFast' },
    { slug: '06-switching-stp/08-port-security', label: '8 · Port Security' },
    { slug: '06-switching-stp/09-cierre', label: '9 · Cierre' },
  ],
  '09-routing-dinamico': [
    { slug: '09-routing-dinamico/01-de-estatico-a-dinamico', label: '1 · De estático a dinámico' },
    { slug: '09-routing-dinamico/02-igp-vs-egp', label: '2 · IGP vs EGP y RIP vs OSPF' },
    { slug: '09-routing-dinamico/03-conceptos-ospf', label: '3 · Conceptos OSPF' },
    { slug: '09-routing-dinamico/04-areas-y-tipos-de-routers', label: '4 · Áreas y tipos de routers' },
    { slug: '09-routing-dinamico/05-dr-y-bdr', label: '5 · DR y BDR' },
    { slug: '09-routing-dinamico/06-coste-ospf', label: '6 · El coste OSPF' },
    { slug: '09-routing-dinamico/07-configuracion-ospf', label: '7 · Configuración OSPF' },
    { slug: '09-routing-dinamico/08-ruta-por-defecto-y-diagnostico', label: '8 · Ruta por defecto y diagnóstico' },
    { slug: '09-routing-dinamico/09-cierre', label: '9 · Cierre' },
  ],
  '10-nat-internet': [
    { slug: '10-nat-internet/01-que-es-nat', label: '1 · ¿Qué es NAT?' },
    { slug: '10-nat-internet/02-tipos-de-nat', label: '2 · Tipos de NAT' },
    { slug: '10-nat-internet/03-nat-estatico-y-dinamico', label: '3 · NAT estático y dinámico' },
    { slug: '10-nat-internet/04-pat', label: '4 · PAT (sobrecarga)' },
    { slug: '10-nat-internet/05-nat-destino', label: '5 · NAT destino (port forwarding)' },
    { slug: '10-nat-internet/06-tabla-nat-y-verificacion', label: '6 · Tabla NAT y verificación' },
    { slug: '10-nat-internet/07-problemas-y-soluciones', label: '7 · Problemas y soluciones' },
    { slug: '10-nat-internet/08-configuracion-completa', label: '8 · Configuración completa' },
    { slug: '10-nat-internet/09-cierre', label: '9 · Cierre' },
  ],
  '11-diagnostico-monitorizacion': [
    { slug: '11-diagnostico-monitorizacion/01-metodologia-de-diagnostico', label: '1 · Metodología de diagnóstico' },
    { slug: '11-diagnostico-monitorizacion/02-comandos-esenciales', label: '2 · Comandos esenciales' },
    { slug: '11-diagnostico-monitorizacion/03-wireshark', label: '3 · Wireshark y análisis TCP' },
    { slug: '11-diagnostico-monitorizacion/04-snmp', label: '4 · SNMP' },
    { slug: '11-diagnostico-monitorizacion/05-syslog-y-logging', label: '5 · Syslog y logging' },
    { slug: '11-diagnostico-monitorizacion/06-netflow-y-ipfix', label: '6 · NetFlow e IPFIX' },
    { slug: '11-diagnostico-monitorizacion/07-herramientas-de-monitorizacion', label: '7 · Herramientas de monitorización' },
    { slug: '11-diagnostico-monitorizacion/08-caso-practico-de-diagnostico', label: '8 · Caso práctico de diagnóstico' },
    { slug: '11-diagnostico-monitorizacion/09-cierre', label: '9 · Cierre' },
  ],
  '12-cloud-virtualizacion-futuro': [
    { slug: '12-cloud-virtualizacion-futuro/01-modelos-cloud', label: '1 · Modelos cloud' },
    { slug: '12-cloud-virtualizacion-futuro/02-virtualizacion-de-redes', label: '2 · Virtualización de redes' },
    { slug: '12-cloud-virtualizacion-futuro/03-docker-networking', label: '3 · Docker networking' },
    { slug: '12-cloud-virtualizacion-futuro/04-sdn', label: '4 · SDN' },
    { slug: '12-cloud-virtualizacion-futuro/05-nfv', label: '5 · NFV' },
    { slug: '12-cloud-virtualizacion-futuro/06-cloud-networking', label: '6 · Cloud networking' },
    { slug: '12-cloud-virtualizacion-futuro/07-iot-5g-y-edge', label: '7 · IoT, 5G y edge computing' },
    { slug: '12-cloud-virtualizacion-futuro/08-el-futuro-de-internet', label: '8 · El futuro de Internet' },
    { slug: '12-cloud-virtualizacion-futuro/09-cierre', label: '9 · Cierre' },
  ],
};

const unidades = unitSlugs.map((slug, i) => {
  const label = `${emojis[i]} ${i + 1}. ${unitLabels[i]}`;
  if (unidadesExpandidas[slug]) {
    return {
      label,
      collapsed: true,
      items: [
        { slug, label: 'Índice de la unidad' },
        ...unidadesExpandidas[slug],
      ],
    };
  }
  return { slug, label };
});

const boletinItems = (code) => [
  { link: `/boletines/boletin-u${code}-inicial-resuelto`, label: '✅ Inicial resuelto' },
  { link: `/boletines/boletin-u${code}-inicial`, label: '🟢 Inicial por resolver' },
  { link: `/boletines/boletin-u${code}-avanzado-resuelto`, label: '💪 Avanzado resuelto' },
  { link: `/boletines/boletin-u${code}-avanzado`, label: '⭐ Avanzado por resolver' },
];

const boletinCodes = ['00', ...Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'))];

const boletinesGroups = boletinCodes.map((code, i) => ({
  label: code === '00' ? '🚪 Tema 00' : `${emojis[i - 1]} Unidad ${code}`,
  collapsed: true,
  items: boletinItems(code),
}));

export default defineConfig({
  site: 'https://sergarb1.github.io/ApuntesRedes',
  base: '/ApuntesRedes',
  integrations: [
    starlight({
      title: 'Apuntes PAR',
      description: 'Planificación y Administración de Redes — 12 unidades didácticas. CC BY-SA 4.0 — Sergi Garcia Barea',
      customCss: [
        './src/styles/custom.css',
        '@fontsource/geist-sans',
      ],
      locales: {
        root: { label: 'Castellano', lang: 'es' },
      },
      defaultLocale: 'root',
      tableOfContents: false,
      social: [
        { icon: 'github', label: 'GitHub', href: 'https://github.com/sergarb1/ApuntesRedes' },
      ],
      head: [
        { tag: 'meta', attrs: { name: 'theme-color', content: '#2563eb' } },
        { tag: 'link', attrs: { rel: 'icon', type: 'image/svg+xml', href: '/ApuntesRedes/favicon.svg' } },
      ],
      sidebar: [
        {
          slug: 'index',
          label: 'Inicio',
        },
        {
          label: `🚪 Tema 0 · ${tema0.label}`,
          items: [
            { slug: tema0.slug, label: '🏠 Bienvenida e índice' },
            ...tema0.puntos.map((p) => ({ slug: p.slug, label: p.label })),
          ],
        },
        {
          label: '📚 Unidades',
          items: unidades,
        },
        {
          label: '📝 Boletines',
          collapsed: true,
          items: boletinesGroups,
        },
      ],
    }),
  ],
});