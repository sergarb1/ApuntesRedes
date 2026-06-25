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
          items: unitSlugs.map((slug, i) => ({
            slug,
            label: `${emojis[i]} ${i+1}. ${unitLabels[i]}`,
          })),
        },
        {
          label: '📝 Boletines',
          collapsed: true,
          items: [
            { link: '/boletines/boletin-u01-inicial-resuelto', label: '✅ U01 — Inicial' },
            { link: '/boletines/boletin-u01-avanzado-resuelto', label: '💪 U01 — Avanzado' },
            { link: '/boletines/boletin-u02-inicial-resuelto', label: '✅ U02 — Inicial' },
            { link: '/boletines/boletin-u02-avanzado-resuelto', label: '💪 U02 — Avanzado' },
            { link: '/boletines/boletin-u03-inicial-resuelto', label: '✅ U03 — Inicial' },
            { link: '/boletines/boletin-u03-avanzado-resuelto', label: '💪 U03 — Avanzado' },
            { link: '/boletines/boletin-u04-inicial-resuelto', label: '✅ U04 — Inicial' },
            { link: '/boletines/boletin-u04-avanzado-resuelto', label: '💪 U04 — Avanzado' },
            { link: '/boletines/boletin-u05-inicial-resuelto', label: '✅ U05 — Inicial' },
            { link: '/boletines/boletin-u05-avanzado-resuelto', label: '💪 U05 — Avanzado' },
            { link: '/boletines/boletin-u06-inicial-resuelto', label: '✅ U06 — Inicial' },
            { link: '/boletines/boletin-u06-avanzado-resuelto', label: '💪 U06 — Avanzado' },
            { link: '/boletines/boletin-u07-inicial-resuelto', label: '✅ U07 — Inicial' },
            { link: '/boletines/boletin-u07-avanzado-resuelto', label: '💪 U07 — Avanzado' },
            { link: '/boletines/boletin-u08-inicial-resuelto', label: '✅ U08 — Inicial' },
            { link: '/boletines/boletin-u08-avanzado-resuelto', label: '💪 U08 — Avanzado' },
            { link: '/boletines/boletin-u09-inicial-resuelto', label: '✅ U09 — Inicial' },
            { link: '/boletines/boletin-u09-avanzado-resuelto', label: '💪 U09 — Avanzado' },
            { link: '/boletines/boletin-u10-inicial-resuelto', label: '✅ U10 — Inicial' },
            { link: '/boletines/boletin-u10-avanzado-resuelto', label: '💪 U10 — Avanzado' },
            { link: '/boletines/boletin-u11-inicial-resuelto', label: '✅ U11 — Inicial' },
            { link: '/boletines/boletin-u11-avanzado-resuelto', label: '💪 U11 — Avanzado' },
            { link: '/boletines/boletin-u12-inicial-resuelto', label: '✅ U12 — Inicial' },
            { link: '/boletines/boletin-u12-avanzado-resuelto', label: '💪 U12 — Avanzado' },
          ],
        },
      ],
    }),
  ],
});
