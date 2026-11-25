// Datos de negocio compartidos por todas las páginas.
// Cambia aquí contacto, planes o preguntas frecuentes sin tocar los componentes.

export const site = {
  name: 'Agencia Manglar',
  shortName: 'Manglar',
  url: 'https://agenciamanglar.mx',
  email: 'contacto@agenciamanglar.mx',
  whatsappNumber: '525544636484',
  phoneDisplay: '+52 55 4463 6484',
  social: {
    tiktok: 'https://tiktok.com/@agenciamanglar.mx',
    instagram: 'https://instagram.com/agenciamanglar.mx',
  },
} as const;

export const whatsappLink = (
  message = 'Hola, me gustaría conocer los servicios de Agencia Manglar para la operación de mi catálogo.'
) => `https://wa.me/${site.whatsappNumber}?text=${encodeURIComponent(message)}`;

export const marketplaces = [
  {
    id: 'shein',
    name: 'SHEIN',
    desc: 'Preparación de fichas, imágenes y publicación para el canal de moda y estilo de vida.',
  },
  {
    id: 'mercado-libre',
    name: 'Mercado Libre',
    desc: 'Organización de atributos, variantes y publicaciones según los requisitos de cada categoría.',
  },
  {
    id: 'tiktok-shop',
    name: 'TikTok Shop',
    desc: 'Catálogo listo para un canal de descubrimiento con fichas claras y visuales consistentes.',
  },
] as const;

export type MarketplaceId = (typeof marketplaces)[number]['id'];

export const marketplaceHref = (id: MarketplaceId) => `/marketplaces/${id}/`;

type BenefitIcon = 'video' | 'camera' | 'layers' | 'upload' | 'refresh' | 'clock' | 'store' | 'rocket' | 'file' | 'shield';

/** Contenido de las páginas /marketplaces/<id>/. */
export const marketplacePages: Record<
  MarketplaceId,
  {
    seoTitle: string;
    seoDescription: string;
    eyebrow: string;
    title: string;
    subtitle: string;
    cta: string;
    availability: string;
    benefitsTitle: string;
    benefitsLead: string;
    benefits: { icon: BenefitIcon; title: string; desc: string }[];
    contactTitle: string;
    contactLead: string;
  }
> = {
  shein: {
    seoTitle: 'Operación de catálogo en SHEIN México | Agencia Manglar',
    seoDescription:
      'Fotografía comercial, fichas de producto, publicación y mantenimiento de tu catálogo en SHEIN México. Servicio gestionado para fabricantes, distribuidores y marcas.',
    eyebrow: 'Marketplace · SHEIN',
    title: 'Tu catálogo en SHEIN, preparado y operado por nuestro equipo.',
    subtitle:
      'Preparamos imágenes comerciales, organizamos tus fichas y publicamos y mantenemos tus productos en SHEIN México, ya sea que estés comenzando o que ya vendas en el canal.',
    cta: 'Solicitar diagnóstico para SHEIN',
    availability:
      'SHEIN es nuestro canal de arranque: el primer mes de todos los planes se enfoca en SHEIN para establecer un flujo de trabajo ordenado.',
    benefitsTitle: 'Lo que hacemos por tu catálogo en SHEIN.',
    benefitsLead:
      'Nos encargamos de las tareas repetitivas de catálogo para que tu equipo se concentre en producto, inventario y ventas.',
    benefits: [
      { icon: 'camera', title: 'Imágenes con criterios del canal', desc: 'Fotografías comerciales con fondos, encuadres y formatos consistentes para moda y estilo de vida.' },
      { icon: 'file', title: 'Fichas completas', desc: 'Títulos, atributos, tallas y variantes organizados según la categoría de cada producto.' },
      { icon: 'refresh', title: 'Publicación y mantenimiento', desc: 'Cargamos productos, corregimos incidencias y mantenemos el catálogo actualizado.' },
    ],
    contactTitle: 'Hablemos de tu catálogo en SHEIN.',
    contactLead:
      'Cuéntanos qué vendes y en qué punto estás con SHEIN. Te contactamos para revisar contigo qué haría falta para operar tu catálogo.',
  },
  'mercado-libre': {
    seoTitle: 'Operación de catálogo en Mercado Libre | Agencia Manglar',
    seoDescription:
      'Organizamos atributos, variantes, imágenes y publicaciones de tu catálogo en Mercado Libre México. Servicio gestionado para fabricantes, distribuidores y marcas.',
    eyebrow: 'Marketplace · Mercado Libre',
    title: 'Tu catálogo en Mercado Libre, ordenado categoría por categoría.',
    subtitle:
      'Adaptamos tus fichas, imágenes y variantes a los requisitos de cada categoría de Mercado Libre y nos encargamos de su publicación y mantenimiento.',
    cta: 'Solicitar diagnóstico para Mercado Libre',
    availability:
      'Mercado Libre se incorpora a partir del segundo mes, en los planes con dos o más marketplaces, una vez establecido el flujo de trabajo en SHEIN. La fecha exacta se define según tu catálogo.',
    benefitsTitle: 'Lo que hacemos por tu catálogo en Mercado Libre.',
    benefitsLead:
      'Cada categoría pide atributos y criterios propios. Nosotros adaptamos tu información para que tus publicaciones estén completas y consistentes.',
    benefits: [
      { icon: 'layers', title: 'Atributos y variantes', desc: 'Capturamos medidas, colores, tallas y atributos obligatorios según cada categoría.' },
      { icon: 'camera', title: 'Imágenes adaptadas', desc: 'Ajustamos fotografías a los formatos y criterios visuales que pide el canal.' },
      { icon: 'upload', title: 'Publicación y seguimiento', desc: 'Publicamos, revisamos incidencias y mantenemos tus fichas actualizadas.' },
    ],
    contactTitle: 'Hablemos de tu catálogo en Mercado Libre.',
    contactLead:
      'Cuéntanos qué vendes y cómo está organizado tu catálogo. Te contactamos para revisar contigo cómo sumar Mercado Libre a tu operación.',
  },
  'tiktok-shop': {
    seoTitle: 'Operación de catálogo en TikTok Shop | Agencia Manglar',
    seoDescription:
      'Preparamos fichas claras, visuales consistentes y publicaciones de tu catálogo en TikTok Shop México. Servicio gestionado para fabricantes, distribuidores y marcas.',
    eyebrow: 'Marketplace · TikTok Shop',
    title: 'Tu catálogo listo para TikTok Shop.',
    subtitle:
      'Preparamos fichas claras y visuales consistentes para un canal de descubrimiento, y nos encargamos de publicar y mantener tus productos en TikTok Shop México.',
    cta: 'Solicitar diagnóstico para TikTok Shop',
    availability:
      'TikTok Shop se incorpora a partir del segundo mes, en los planes con dos o más marketplaces, una vez establecido el flujo de trabajo en SHEIN. La fecha exacta se define según tu catálogo.',
    benefitsTitle: 'Lo que hacemos por tu catálogo en TikTok Shop.',
    benefitsLead:
      'En un canal de descubrimiento, la presentación del producto importa. Preparamos tu catálogo para que se vea claro y consistente.',
    benefits: [
      { icon: 'camera', title: 'Visuales consistentes', desc: 'Imágenes comerciales con una identidad visual coherente en todo tu catálogo.' },
      { icon: 'file', title: 'Fichas claras', desc: 'Títulos, descripciones y variantes fáciles de entender para quien descubre tu producto.' },
      { icon: 'store', title: 'Tienda y mantenimiento', desc: 'Publicamos, organizamos tu tienda y mantenemos tus productos al día.' },
      { icon: 'video', title: 'TikTok LIVE', desc: 'Planeamos y conducimos tus transmisiones en vivo con presentador de nuestro equipo.' },
    ],
    contactTitle: 'Hablemos de tu catálogo en TikTok Shop.',
    contactLead:
      'Cuéntanos qué vendes y cómo está organizado tu catálogo. Te contactamos para revisar contigo cómo sumar TikTok Shop a tu operación.',
  },
};

export const problems = [
  {
    title: 'Fotografías preparadas a mano',
    desc: 'Recortes, fondos y formatos distintos para cada canal consumen horas de tu equipo.',
  },
  {
    title: 'Catálogos incompletos',
    desc: 'Fichas sin atributos, descripciones genéricas o datos dispersos en hojas de cálculo.',
  },
  {
    title: 'Variantes inconsistentes',
    desc: 'Tallas, colores y medidas que se capturan diferente en cada marketplace.',
  },
  {
    title: 'Publicación repetitiva',
    desc: 'Cargar el mismo producto varias veces, con reglas distintas en cada plataforma.',
  },
  {
    title: 'Requisitos que cambian por canal',
    desc: 'Cada marketplace pide categorías, campos e imágenes con criterios propios.',
  },
  {
    title: 'Nuevos canales que no arrancan',
    desc: 'Abrir un marketplace adicional se pospone porque nadie tiene tiempo para prepararlo.',
  },
] as const;

export const services = [
  {
    icon: 'camera',
    title: 'Fotografía comercial y optimización de catálogos',
    desc: 'Creamos imágenes comerciales y optimizamos fichas de producto para mejorar su presentación, visibilidad y calidad en cada marketplace.',
    points: ['Fotografías con IA y títulos comerciales', 'Fichas completas y categorización correcta', 'Carga masiva y multipublicación'],
  },
  {
    icon: 'store',
    title: 'Operación y diseño de tienda',
    desc: 'Gestionamos el mantenimiento de tu catálogo y desarrollamos una identidad visual consistente que fortalezca la presencia de tu marca.',
    points: ['Actualización y mantenimiento de productos', 'Diseño de tienda y banners comerciales', 'Corrección de incidencias y seguimiento'],
  },
  {
    icon: 'tag',
    title: 'Gestión de campañas y promociones',
    desc: 'Planificamos y administramos acciones comerciales para impulsar la visibilidad de tus productos y aprovechar oportunidades de venta.',
    points: ['Gestión de campañas por marketplace', 'Configuración de cupones y promociones', 'Seguimiento de resultados comerciales'],
  },
  {
    icon: 'upload',
    title: 'Expansión a nuevos marketplaces',
    desc: 'Adaptamos y publicamos tu catálogo en nuevos canales de venta, respetando los requisitos y criterios de cada plataforma.',
    points: ['Adaptación de fichas por canal', 'Publicación y categorización por marketplace', 'Revisión de requisitos y publicaciones'],
  },
] as const;

/** Sección TikTok LIVE del home (servicio complementario, sin precio publicado). */
export const liveService = {
  eyebrow: 'TikTok LIVE',
  title: 'Transmisiones en vivo con estructura comercial.',
  lead: 'Planeamos, producimos y conducimos tus sesiones de TikTok LIVE. Nuestro equipo pone al presentador, prepara los productos y opera la transmisión de principio a fin.',
  cta: 'Quiero operar mi TikTok LIVE',
  whatsappMessage: 'Hola, me interesa la gestión de TikTok LIVE con Agencia Manglar.',
  note: 'Disponible desde el inicio del servicio. El alcance y la frecuencia de las transmisiones se definen durante el diagnóstico.',
  highlights: [
    'Presentador de nuestro equipo incluido',
    'Disponible desde el inicio del servicio',
    'Estrategia, operación y análisis a nuestro cargo',
  ],
  phases: [
    {
      label: 'Antes',
      title: 'Estrategia y preparación',
      desc: 'Definimos el objetivo de la sesión, el guion y los productos que se van a presentar.',
      points: ['Guion y orden de productos', 'Productos anclados y ofertas listas', 'Presentador asignado de nuestro equipo'],
    },
    {
      label: 'Durante',
      title: 'Transmisión en vivo',
      desc: 'Nuestro presentador conduce la sesión mientras el equipo opera la transmisión detrás de cámara.',
      points: ['Conducción a cargo de nuestro presentador', 'Promociones activadas en el momento indicado', 'Interacción con la audiencia'],
    },
    {
      label: 'Después',
      title: 'Análisis y mejora',
      desc: 'Revisamos cómo funcionó la sesión y documentamos lo aprendido para sostener el canal.',
      points: ['Ventas por producto', 'Comportamiento de la audiencia', 'Ajustes para la siguiente sesión'],
    },
  ],
} as const;

export const processSteps = [
  {
    title: 'Diagnóstico inicial',
    desc: 'Conocemos tu catálogo, tu operación actual y lo que necesitas resolver.',
  },
  {
    title: 'Alcance y marketplaces',
    desc: 'Definimos juntos los canales, el volumen de trabajo y las prioridades.',
  },
  {
    title: 'Fotografías y fichas',
    desc: 'Preparamos imágenes e información de producto con criterios consistentes.',
  },
  {
    title: 'Publicación y revisión',
    desc: 'Cargamos los productos y revisamos que se publiquen como se planeó.',
  },
  {
    title: 'Seguimiento y evolución',
    desc: 'Corregimos incidencias, actualizamos fichas y sumamos canales según tu plan.',
  },
] as const;

export const plans = [
  {
    id: 'esencial',
    name: 'Esencial',
    marketplaces: 1,
    marketsLabel: '1 marketplace: SHEIN, TikTok o Mercado Libre',
    price: 10000,
    summary: 'Comienza a vender en un nuevo canal.',
    entry: true,
  },
  {
    id: 'crecimiento',
    name: 'Crecimiento',
    marketplaces: 2,
    marketsLabel: '2 marketplaces',
    price: null,
    summary: 'Amplía tu presencia comercial.',
  },
  {
    id: 'expansion',
    name: 'Expansión',
    marketplaces: 3,
    marketsLabel: '3 marketplaces',
    price: null,
    summary: 'Centraliza tu estrategia multicanal.',
  },
] as const;

export const planIncludes = [
  'Fotografía comercial y optimización de catálogos',
  'Operación y diseño de tienda',
  'Gestión de campañas y promociones',
  'Publicación en los marketplaces de tu plan',
] as const;

export type FaqItem = { question: string; answer: string };

export const faqs: FaqItem[] = [
  {
    question: '¿Qué hace exactamente Agencia Manglar?',
    answer:
      'Nos encargamos de la operación del catálogo de productos de tu empresa en marketplaces: creamos fotografías comerciales, optimizamos y publicamos tus fichas, damos mantenimiento al catálogo, diseñamos tu tienda y gestionamos campañas y promociones en los canales contratados. Además, producimos TikTok LIVE para tu marca, con un presentador de nuestro equipo. Es un servicio gestionado por nuestro equipo, no un software que tengas que usar.',
  },
  {
    question: '¿Puedo contratar el servicio si ya vendo en SHEIN?',
    answer:
      'Sí. Muchas empresas que ya venden en SHEIN u otros marketplaces nos contratan para externalizar las tareas repetitivas de catálogo y liberar tiempo de su equipo interno.',
  },
  {
    question: '¿Puedo contratar varios marketplaces?',
    answer:
      'Sí. Nuestros planes cubren de uno a tres marketplaces: SHEIN, Mercado Libre y TikTok Shop. El primer mes siempre se enfoca en SHEIN y los demás canales se incorporan después, según tu plan.',
  },
  {
    question: '¿Por qué el primer mes se trabaja solo con SHEIN?',
    answer:
      'Porque necesitamos conocer tu catálogo y establecer un flujo de trabajo ordenado antes de replicarlo en otros canales. Concentrarnos en un solo marketplace al inicio reduce errores y nos permite definir criterios que después se adaptan al resto.',
  },
  {
    question: '¿Qué incluye la gestión de TikTok LIVE?',
    answer:
      'Definimos la estrategia comercial de cada transmisión, preparamos los productos anclados y las promociones, ponemos al presentador, operamos la sesión en vivo y revisamos los resultados para ajustar las siguientes. Está disponible desde el inicio del servicio y su alcance se define durante el diagnóstico. Como en el resto de nuestro trabajo, no garantizamos un volumen de ventas.',
  },
  {
    question: '¿Quién mantiene el control de mis cuentas?',
    answer:
      'Tú. Las cuentas de seller son de tu empresa y siguen a tu nombre. Para operar, nos otorgas los accesos necesarios dentro de las opciones que ofrece cada marketplace, y puedes retirarlos cuando lo decidas.',
  },
  {
    question: '¿Qué incluye el precio mensual?',
    answer:
      'El precio mensual cubre la operación del catálogo en el número de marketplaces de tu plan: fotografía comercial y optimización de catálogos, operación y diseño de tienda, gestión de campañas y promociones, y publicación en los canales de tu plan. El alcance operativo concreto se define durante el diagnóstico, antes de comenzar.',
  },
];

export const formatMXN = (value: number) =>
  new Intl.NumberFormat('es-MX', { style: 'currency', currency: 'MXN', maximumFractionDigits: 0 }).format(value);

export const mailtoLink = (
  subject = 'Solicitud de diagnóstico — Agencia Manglar',
) => `mailto:${site.email}?subject=${encodeURIComponent(subject)}`;
