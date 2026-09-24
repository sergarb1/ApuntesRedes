import { defineConfig } from 'astro/config';
import starlight from '@astrojs/starlight';

const emojis = ['🚪','📡','🧮','🔀','🌉','🧭','🗣️','🛡️','🌐','🗄️','📶','🔁'];

const unitSlugs = [
  '01-introduccion',
  '02-ethernet-cableado',
  '03-direccionamiento-ip',
  '04-switching',
  '05-trunking-inter-vlan',
  '06-enrutamiento-estatico',
  '07-ospf',
  '08-acl-seguridad',
  '09-nat-pat',
  '10-servicios-red',
  '11-redes-inalambricas',
  '12-alta-disponibilidad',
];

const unitLabels = [
  'Introducción',
  'Ethernet y cableado',
  'Direccionamiento IP y subnetting',
  'Switching y VLAN',
  'Trunking e inter-VLAN',
  'Enrutamiento estático',
  'Enrutamiento dinámico (OSPF)',
  'ACLs y seguridad de red',
  'NAT y PAT',
  'Servicios de red: DHCP, DNS y NTP',
  'Redes inalámbricas',
  'Alta disponibilidad y redundancia',
];

const unidadesExpandidas = {
  '01-introduccion': [
    { slug: '01-introduccion/01-que-es-una-red', label: '1 · ¿Qué es una red?' },
    { slug: '01-introduccion/02-aparatitos', label: '2 · Los aparatitos' },
    { slug: '01-introduccion/03-mac-ip-puertos', label: '3 · MAC, IP y Puertos' },
    { slug: '01-introduccion/04-paquetes-y-protocolos', label: '4 · Paquetes y protocolos' },
    { slug: '01-introduccion/05-dns-y-dhcp', label: '5 · DNS y DHCP' },
    { slug: '01-introduccion/06-metodo-diagnostico', label: '6 · Método de diagnóstico' },
    { slug: '01-introduccion/07-instalacion-packet-tracer', label: '7 · Instalación de Packet Tracer' },
    { slug: '01-introduccion/09-glosario', label: '8 · Glosario' },
    { slug: '01-introduccion/10-preguntas-tontas', label: '9 · Preguntas tontas' },
    { slug: '01-introduccion/08-mapa-del-curso', label: '10 · Mapa del curso' },
  ],
  '02-ethernet-cableado': [
    { slug: '02-ethernet-cableado/01-medios-de-transmision', label: '1 · Medios de transmisión' },
    { slug: '02-ethernet-cableado/02-cable-utp', label: '2 · El cable UTP' },
    { slug: '02-ethernet-cableado/03-directo-cruzado-consola', label: '3 · Directo, cruzado y consola' },
    { slug: '02-ethernet-cableado/04-crimpado-y-comprobacion', label: '4 · Crimpado y comprobación' },
    { slug: '02-ethernet-cableado/05-fibra-optica', label: '5 · Fibra óptica' },
    { slug: '02-ethernet-cableado/06-conceptos-fisicos', label: '6 · Conceptos físicos clave' },
    { slug: '02-ethernet-cableado/07-cableado-estructurado', label: '7 · Cableado estructurado' },
    { slug: '02-ethernet-cableado/08-modelo-osi', label: '8 · El modelo OSI' },
    { slug: '02-ethernet-cableado/09-trama-ethernet', label: '9 · La trama Ethernet' },
    { slug: '02-ethernet-cableado/10-cierre', label: '10 · Cierre' },
  ],
  '03-direccionamiento-ip': [
    { slug: '03-direccionamiento-ip/01-estructura-ipv4', label: '1 · Estructura de IPv4 y cabecera' },
    { slug: '03-direccionamiento-ip/02-binario-y-and', label: '2 · Binario y la operación AND' },
    { slug: '03-direccionamiento-ip/03-clases-de-direcciones', label: '3 · Clases de direcciones' },
    { slug: '03-direccionamiento-ip/04-ip-privadas-y-publicas', label: '4 · IPs privadas y públicas' },
    { slug: '03-direccionamiento-ip/05-mascaras-y-cidr', label: '5 · Máscaras y notación CIDR' },
    { slug: '03-direccionamiento-ip/06-subnetting-paso-a-paso', label: '6 · Subnetting paso a paso' },
    { slug: '03-direccionamiento-ip/07-vlsm', label: '7 · VLSM' },
    { slug: '03-direccionamiento-ip/08-dhcp', label: '8 · DHCP' },
    { slug: '03-direccionamiento-ip/09-estructura-ipv6', label: '9 · Estructura de IPv6' },
    { slug: '03-direccionamiento-ip/10-compresion-y-prefijos', label: '10 · Compresión y prefijos' },
    { slug: '03-direccionamiento-ip/11-tipos-de-direcciones', label: '11 · Tipos de direcciones IPv6' },
    { slug: '03-direccionamiento-ip/12-eui64-y-slaac', label: '12 · EUI-64 y SLAAC' },
    { slug: '03-direccionamiento-ip/13-dhcpv6', label: '13 · DHCPv6' },
    { slug: '03-direccionamiento-ip/14-icmpv6-y-ndp', label: '14 · ICMPv6 y NDP' },
    { slug: '03-direccionamiento-ip/15-mecanismos-de-transicion', label: '15 · Mecanismos de transición' },
    { slug: '03-direccionamiento-ip/16-configuracion-ipv6', label: '16 · Configuración IPv4/IPv6' },
    { slug: '03-direccionamiento-ip/17-cierre', label: '17 · Cierre' },
  ],
  '04-switching': [
    { slug: '04-switching/01-que-es-un-switch', label: '1 · ¿Qué es un switch?' },
    { slug: '04-switching/02-aprendizaje-mac', label: '2 · Aprendizaje de MACs' },
    { slug: '04-switching/03-dominios-colision-broadcast', label: '3 · Dominios de colisión y broadcast' },
    { slug: '04-switching/04-tormenta-de-broadcast', label: '4 · La tormenta de broadcast' },
    { slug: '04-switching/05-stp-fundamentos', label: '5 · STP: fundamentos' },
    { slug: '04-switching/06-puertos-y-estados-stp', label: '6 · Puertos y estados STP' },
    { slug: '04-switching/07-rstp-y-portfast', label: '7 · RSTP y PortFast' },
    { slug: '04-switching/08-que-es-una-vlan', label: '8 · ¿Qué es una VLAN?' },
    { slug: '04-switching/09-tipos-de-vlan', label: '9 · Tipos de VLAN' },
    { slug: '04-switching/10-cierre', label: '10 · Cierre' },
  ],
  '05-trunking-inter-vlan': [
    { slug: '05-trunking-inter-vlan/01-trunks-y-8021q', label: '1 · Trunks y 802.1Q' },
    { slug: '05-trunking-inter-vlan/02-configuracion-y-verificacion', label: '2 · Configuración de trunks' },
    { slug: '05-trunking-inter-vlan/03-inter-vlan-routing', label: '3 · Enrutamiento inter-VLAN' },
    { slug: '05-trunking-inter-vlan/04-switch-capa3', label: '4 · Switch capa 3 y SVIs' },
    { slug: '05-trunking-inter-vlan/05-vtp-y-dtp', label: '5 · VTP y DTP' },
    { slug: '05-trunking-inter-vlan/06-seguridad-en-vlans', label: '6 · Seguridad en VLANs' },
    { slug: '05-trunking-inter-vlan/08-cierre', label: '8 · Cierre' },
  ],
  '06-enrutamiento-estatico': [
    { slug: '06-enrutamiento-estatico/01-componentes-del-router', label: '1 · Componentes del router' },
    { slug: '06-enrutamiento-estatico/02-configuracion-basica', label: '2 · Configuración básica' },
    { slug: '06-enrutamiento-estatico/03-rutas-estaticas', label: '3 · Rutas estáticas' },
    { slug: '06-enrutamiento-estatico/04-ruta-por-defecto', label: '4 · Ruta por defecto' },
    { slug: '06-enrutamiento-estatico/05-como-decide-el-router', label: '5 · Cómo decide un router' },
    { slug: '06-enrutamiento-estatico/06-cierre', label: '6 · Cierre' },
  ],
  '07-ospf': [
    { slug: '07-ospf/01-de-estatico-a-dinamico', label: '1 · De estático a dinámico' },
    { slug: '07-ospf/02-igp-vs-egp', label: '2 · IGP vs EGP y RIP vs OSPF' },
    { slug: '07-ospf/03-conceptos-ospf', label: '3 · Conceptos OSPF' },
    { slug: '07-ospf/04-areas-y-tipos-de-routers', label: '4 · Áreas y tipos de routers' },
    { slug: '07-ospf/05-dr-y-bdr', label: '5 · DR y BDR' },
    { slug: '07-ospf/06-coste-ospf', label: '6 · El coste OSPF' },
    { slug: '07-ospf/07-configuracion-ospf', label: '7 · Configuración OSPF' },
    { slug: '07-ospf/08-ruta-por-defecto-y-diagnostico', label: '8 · Ruta por defecto y diagnóstico' },
    { slug: '07-ospf/09-cierre', label: '9 · Cierre' },
  ],
  '08-acl-seguridad': [
    { slug: '08-acl-seguridad/01-enrutamiento-y-acls', label: '1 · De las rutas a las ACLs' },
    { slug: '08-acl-seguridad/02-acls-conceptos', label: '2 · ACLs: concepto y tipos' },
    { slug: '08-acl-seguridad/03-acl-estandar', label: '3 · ACL estándar' },
    { slug: '08-acl-seguridad/04-acl-extendida-y-nombrada', label: '4 · ACL extendida y nombrada' },
    { slug: '08-acl-seguridad/05-port-security', label: '5 · Port Security' },
    { slug: '08-acl-seguridad/06-cierre', label: '6 · Cierre' },
  ],
  '09-nat-pat': [
    { slug: '09-nat-pat/01-que-es-nat', label: '1 · ¿Qué es NAT?' },
    { slug: '09-nat-pat/02-tipos-de-nat', label: '2 · Tipos de NAT' },
    { slug: '09-nat-pat/03-nat-estatico-y-dinamico', label: '3 · NAT estático y dinámico' },
    { slug: '09-nat-pat/04-pat', label: '4 · PAT (sobrecarga)' },
    { slug: '09-nat-pat/05-nat-destino', label: '5 · NAT destino (port forwarding)' },
    { slug: '09-nat-pat/06-tabla-nat-y-verificacion', label: '6 · Tabla NAT y verificación' },
    { slug: '09-nat-pat/07-problemas-y-soluciones', label: '7 · Problemas y soluciones' },
    { slug: '09-nat-pat/08-configuracion-completa', label: '8 · Configuración completa' },
    { slug: '09-nat-pat/09-cierre', label: '9 · Cierre' },
  ],
  '10-servicios-red': [
    { slug: '10-servicios-red/01-por-que-servicios', label: '1 · Por qué necesitas servicios' },
    { slug: '10-servicios-red/02-dhcp', label: '2 · DHCP: el repartidor de IPs' },
    { slug: '10-servicios-red/03-dhcp-cisco', label: '3 · DHCP en Cisco y helper' },
    { slug: '10-servicios-red/04-dns', label: '4 · DNS: la guía telefónica' },
    { slug: '10-servicios-red/05-registros-dns', label: '5 · Registros y zonas DNS' },
    { slug: '10-servicios-red/06-ntp', label: '6 · NTP: la hora es sagrada' },
    { slug: '10-servicios-red/07-ntp-cisco', label: '7 · NTP en Cisco' },
    { slug: '10-servicios-red/08-diagnostico-servicios', label: '8 · Diagnóstico de servicios' },
    { slug: '10-servicios-red/09-cierre', label: '9 · Cierre' },
  ],
  '11-redes-inalambricas': [
    { slug: '11-redes-inalambricas/01-medio-inalambrico', label: '1 · El medio inalámbrico' },
    { slug: '11-redes-inalambricas/02-medios-inalambricos', label: '2 · Medios y antenas' },
    { slug: '11-redes-inalambricas/03-estandares-80211', label: '3 · Estándares 802.11' },
    { slug: '11-redes-inalambricas/04-topologias', label: '4 · Topologías y modos' },
    { slug: '11-redes-inalambricas/05-cobertura-y-diseno', label: '5 · Cobertura y diseño' },
    { slug: '11-redes-inalambricas/06-seguridad-wlan', label: '6 · Seguridad WLAN' },
    { slug: '11-redes-inalambricas/07-aps-y-wlc', label: '7 · APs y controladores' },
    { slug: '11-redes-inalambricas/08-configuracion-wlan', label: '8 · Configuración WLAN' },
    { slug: '11-redes-inalambricas/09-cierre', label: '9 · Cierre' },
  ],
  '12-alta-disponibilidad': [
    { slug: '12-alta-disponibilidad/01-disponibilidad-y-spofs', label: '1 · Disponibilidad y SPOFs' },
    { slug: '12-alta-disponibilidad/02-stp-redundancia', label: '2 · STP: redundancia sin bucles' },
    { slug: '12-alta-disponibilidad/03-etherchannel', label: '3 · EtherChannel' },
    { slug: '12-alta-disponibilidad/04-stacking', label: '4 · Stacking y chassis virtuales' },
    { slug: '12-alta-disponibilidad/05-fhrp', label: '5 · FHRP: gateway redundante' },
    { slug: '12-alta-disponibilidad/06-hsrp-cisco', label: '6 · HSRP en Cisco' },
    { slug: '12-alta-disponibilidad/07-redundancia-l3', label: '7 · Redundancia en capa 3' },
    { slug: '12-alta-disponibilidad/08-plan-continuidad', label: '8 · Plan de continuidad' },
    { slug: '12-alta-disponibilidad/09-cierre', label: '9 · Cierre' },
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
  { link: `/boletines/boletin-u${code}-inicial`, label: '🟢 Inicial por resolver' },
  { link: `/boletines/boletin-u${code}-inicial-resuelto`, label: '✅ Inicial resuelto' },
  { link: `/boletines/boletin-u${code}-avanzado`, label: '⭐ Avanzado por resolver' },
  { link: `/boletines/boletin-u${code}-avanzado-resuelto`, label: '💪 Avanzado resuelto' },
];

const boletinCodes = Array.from({ length: 12 }, (_, i) => String(i + 1).padStart(2, '0'));

const boletinesGroups = boletinCodes.flatMap((code, i) => {
  const groups = [
    {
      label: `${emojis[i]} Unidad ${code}`,
      collapsed: true,
      items: boletinItems(code),
    },
  ];
  // La unidad 03 tiene además boletines específicos de IPv6
  if (code === '03') {
    groups.push({
      label: `${emojis[i]} Unidad 03 · IPv6`,
      collapsed: true,
      items: [
        { link: '/boletines/boletin-u03-ipv6-inicial', label: '🟢 IPv6 inicial por resolver' },
        { link: '/boletines/boletin-u03-ipv6-inicial-resuelto', label: '✅ IPv6 inicial resuelto' },
        { link: '/boletines/boletin-u03-ipv6-avanzado', label: '⭐ IPv6 avanzado por resolver' },
        { link: '/boletines/boletin-u03-ipv6-avanzado-resuelto', label: '💪 IPv6 avanzado resuelto' },
      ],
    });
  }
  return groups;
});

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
