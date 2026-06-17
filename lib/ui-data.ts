export type TableStatus =
  | "libre"
  | "reservada"
  | "ocupada"
  | "enviada"
  | "cobro"
  | "incidencia";

export type Table = {
  id: string;
  name: string;
  zone: string;
  seats: number;
  status: TableStatus;
  total: number;
  covers: number;
  elapsed: string;
  reservation?: string;
};

export type OrderLine = {
  id: string;
  name: string;
  qty: number;
  price: number;
  station: "cocina" | "barra" | "postres";
  status: "borrador" | "enviada" | "preparando" | "lista" | "servida";
  note?: string;
};

export type Product = {
  id: string;
  name: string;
  category: string;
  price: number;
  station: "cocina" | "barra" | "postres";
  visible: boolean;
  source: "Cheffing";
};

export type AdminModule = {
  title: string;
  href: string;
  description: string;
  status: string;
};

export const staffContext = {
  service: "Cena",
  turn: "Turno tarde",
  user: "Operador inicial",
  date: "17/06/2026",
};

export const operatorLinks = [
  { href: "/pos", label: "POS sala" },
  { href: "/pos/comanda", label: "Comanda" },
  { href: "/pos/cobro", label: "Cobro" },
  { href: "/cocina", label: "Cocina/barra" },
  { href: "/ticket", label: "Ticket" },
  { href: "/turno", label: "Turno" },
];

export const adminLinks = [
  { href: "/admin", label: "Admin" },
  { href: "/admin/catalogo", label: "Catalogo" },
  { href: "/admin/mesas", label: "Mesas" },
  { href: "/admin/reservas", label: "Reservas" },
  { href: "/admin/comandas", label: "Comandas" },
  { href: "/admin/produccion", label: "Produccion" },
  { href: "/admin/caja", label: "Caja" },
  { href: "/admin/informes", label: "Informes" },
  { href: "/admin/usuarios", label: "Usuarios" },
  { href: "/ayuda", label: "Ayuda" },
];

export const zones = ["Terraza", "Sala", "Invernadero", "Barra"];

export const tables: Table[] = [
  {
    id: "t1",
    name: "Mesa 1",
    zone: "Terraza",
    seats: 2,
    status: "libre",
    total: 0,
    covers: 0,
    elapsed: "0 min",
  },
  {
    id: "t2",
    name: "Mesa 2",
    zone: "Terraza",
    seats: 4,
    status: "reservada",
    total: 0,
    covers: 4,
    elapsed: "18 min",
    reservation: "Reserva ejemplo 21:00",
  },
  {
    id: "t3",
    name: "Mesa 3",
    zone: "Sala",
    seats: 4,
    status: "ocupada",
    total: 68.5,
    covers: 3,
    elapsed: "42 min",
  },
  {
    id: "t4",
    name: "Mesa 4",
    zone: "Sala",
    seats: 2,
    status: "enviada",
    total: 31.9,
    covers: 2,
    elapsed: "25 min",
  },
  {
    id: "t5",
    name: "Mesa 5",
    zone: "Invernadero",
    seats: 6,
    status: "cobro",
    total: 124.8,
    covers: 5,
    elapsed: "76 min",
  },
  {
    id: "t6",
    name: "Mesa 6",
    zone: "Barra",
    seats: 2,
    status: "incidencia",
    total: 18.4,
    covers: 2,
    elapsed: "33 min",
  },
  {
    id: "t7",
    name: "Mesa 7",
    zone: "Sala",
    seats: 4,
    status: "libre",
    total: 0,
    covers: 0,
    elapsed: "0 min",
  },
  {
    id: "t8",
    name: "Mesa 8",
    zone: "Terraza",
    seats: 2,
    status: "ocupada",
    total: 42.2,
    covers: 2,
    elapsed: "51 min",
  },
];

export const products: Product[] = [
  {
    id: "p1",
    name: "Croquetas de la casa",
    category: "Entrantes",
    price: 8.5,
    station: "cocina",
    visible: true,
    source: "Cheffing",
  },
  {
    id: "p2",
    name: "Ensalada Sikim",
    category: "Entrantes",
    price: 12,
    station: "cocina",
    visible: true,
    source: "Cheffing",
  },
  {
    id: "p3",
    name: "Arroz del dia",
    category: "Platos",
    price: 18.5,
    station: "cocina",
    visible: true,
    source: "Cheffing",
  },
  {
    id: "p4",
    name: "Pescado plancha",
    category: "Platos",
    price: 22,
    station: "cocina",
    visible: true,
    source: "Cheffing",
  },
  {
    id: "p5",
    name: "Agua",
    category: "Bebidas",
    price: 2.5,
    station: "barra",
    visible: true,
    source: "Cheffing",
  },
  {
    id: "p6",
    name: "Copa de vino",
    category: "Bebidas",
    price: 5.2,
    station: "barra",
    visible: true,
    source: "Cheffing",
  },
  {
    id: "p7",
    name: "Postre de la casa",
    category: "Postres",
    price: 7.5,
    station: "postres",
    visible: true,
    source: "Cheffing",
  },
  {
    id: "p8",
    name: "Cafe",
    category: "Bebidas",
    price: 1.8,
    station: "barra",
    visible: true,
    source: "Cheffing",
  },
];

export const orderLines: OrderLine[] = [
  {
    id: "l1",
    name: "Croquetas de la casa",
    qty: 2,
    price: 8.5,
    station: "cocina",
    status: "enviada",
    note: "Sin salsa, ejemplo",
  },
  {
    id: "l2",
    name: "Arroz del dia",
    qty: 1,
    price: 18.5,
    station: "cocina",
    status: "preparando",
  },
  {
    id: "l3",
    name: "Copa de vino",
    qty: 2,
    price: 5.2,
    station: "barra",
    status: "lista",
  },
  {
    id: "l4",
    name: "Postre de la casa",
    qty: 1,
    price: 7.5,
    station: "postres",
    status: "borrador",
    note: "Pendiente de enviar",
  },
];

export const productionTickets = [
  {
    id: "K-104",
    table: "Mesa 3",
    station: "cocina",
    elapsed: "12 min",
    status: "preparando",
    lines: ["2 Croquetas de la casa", "1 Arroz del dia"],
    notes: "Sin salsa. Alergenos por confirmar.",
    printStatus: "Salida prevista a ruta cocina",
  },
  {
    id: "B-031",
    table: "Mesa 4",
    station: "barra",
    elapsed: "6 min",
    status: "enviada",
    lines: ["2 Copa de vino", "1 Agua"],
    notes: "Servir con hielo aparte.",
    printStatus: "Impresion pendiente de conectar",
  },
  {
    id: "P-008",
    table: "Mesa 5",
    station: "postres",
    elapsed: "3 min",
    status: "lista",
    lines: ["1 Postre de la casa"],
    notes: "Mesa en cobro.",
    printStatus: "Sin trabajo real de impresora",
  },
];

export const adminModules: AdminModule[] = [
  {
    title: "Catalogo POS",
    href: "/admin/catalogo",
    description: "Visibilidad TPV, estacion y precio de referencia desde Cheffing.",
    status: "Shell",
  },
  {
    title: "Mesas y zonas",
    href: "/admin/mesas",
    description: "Mapa fisico, capacidad y agrupaciones futuras.",
    status: "Shell",
  },
  {
    title: "Reservas",
    href: "/admin/reservas",
    description: "Relacion conceptual entre reservas y sesiones de mesa.",
    status: "Shell",
  },
  {
    title: "Produccion",
    href: "/admin/produccion",
    description: "Estaciones, rutas logicas e intentos de impresion previstos.",
    status: "Shell",
  },
  {
    title: "Caja",
    href: "/admin/caja",
    description: "Resumen de cobros, movimientos y cierre de turno.",
    status: "Inicial",
  },
  {
    title: "Usuarios",
    href: "/admin/usuarios",
    description: "Capacidades POS propuestas, sin auth real.",
    status: "Plan",
  },
];

export const orderReview = [
  {
    id: "CMD-1004",
    table: "Mesa 3",
    status: "En cocina",
    total: 68.5,
    payment: "Pendiente",
  },
  {
    id: "CMD-1005",
    table: "Mesa 5",
    status: "En cobro",
    total: 124.8,
    payment: "Parcial",
  },
  {
    id: "CMD-1006",
    table: "Barra 2",
    status: "Cerrada",
    total: 18.4,
    payment: "Tarjeta pendiente",
  },
];

export const permissions = [
  "Acceso POS",
  "Gestionar comandas",
  "Enviar a cocina/barra",
  "Anular/cancelar items",
  "Tomar cobros",
  "Cerrar turnos",
  "Administracion POS",
];

export function formatCurrency(value: number) {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency: "EUR",
  }).format(value);
}

export function orderTotal(lines = orderLines) {
  return lines.reduce((total, line) => total + line.price * line.qty, 0);
}
