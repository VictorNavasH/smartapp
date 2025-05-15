import { supabaseAdmin } from "./supabase"
import { cache } from "./cache"

// Tipos de datos
export type VentasData = {
  fecha: string
  total: number
  comensales: number
  ticketMedio: number
}

export type CostesData = {
  categoria: string
  valor: number
  porcentaje: number
}

export type OcupacionData = {
  fecha: string
  ocupacion: number
  mesas: number
}

export type SatisfaccionData = {
  fecha: string
  puntuacion: number
  comentarios: number
}

// Nuevo tipo para tickets cerrados
export type TicketCerradoData = {
  id: string
  fecha_hora: string
  num_comensales: number
  importe_total: number
  importe_comida: number
  importe_bebida: number
  importe_postre: number
  metodo_pago: string
  id_camarero: string
  id_mesa: number
  duracion_minutos: number
  propina: number
  descuento: number
  codigo_promocion: string | null
  observaciones: string | null
}

// Nuevos tipos para análisis de ventas
export type VentasPorCanalData = {
  canal: string
  total: number
  porcentaje: number
  comandas: number
}

export type VentasPorTurnoData = {
  turno: string
  total: number
  porcentaje: number
  comandas: number
}

export type VentasDiariasData = {
  fecha: string
  total: number
  comandas: number
  comensales: number
  ticketMedio: number
}

export type ResumenMensualData = {
  ventasTotales: number
  ticketMedio: number
  comandas: number
  comparativaMesAnterior: number
}

export type ProyeccionMensualData = {
  acumulado: number
  objetivo: number
  progreso: number
  diasRestantes: number
  proyeccion: number
}

// Nuevos tipos para análisis de productos
export type ProductoData = {
  id: string
  nombre: string
  categoria: string
  precio: number
  unidadesVendidas: number
  ingresos: number
  tendencia: number // porcentaje de cambio vs mes anterior
}

export type CategoriaProductoData = {
  nombre: string
  totalVentas: number
  unidadesVendidas: number
  ticketMedio: number
}

// Función para obtener datos de ventas
export async function getVentasData(startDate?: string, endDate?: string): Promise<VentasData[]> {
  const cacheKey = `ventas-${startDate || "all"}-${endDate || "all"}`

  // Intentar obtener del caché
  const cachedData = cache.get(cacheKey)
  if (cachedData) {
    return cachedData as VentasData[]
  }

  try {
    let query = supabaseAdmin.from("ventas").select("*").order("fecha", { ascending: false })

    if (startDate) {
      query = query.gte("fecha", startDate)
    }

    if (endDate) {
      query = query.lte("fecha", endDate)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    const formattedData = data.map((item) => ({
      fecha: item.fecha,
      total: item.total,
      comensales: item.comensales,
      ticketMedio: item.total / item.comensales,
    }))

    // Guardar en caché
    cache.set(cacheKey, formattedData)

    return formattedData
  } catch (error) {
    console.error("Error fetching ventas data:", error)
    return []
  }
}

// Función para obtener datos de costes
export async function getCostesData(): Promise<CostesData[]> {
  const cacheKey = "costes"

  // Intentar obtener del caché
  const cachedData = cache.get(cacheKey)
  if (cachedData) {
    return cachedData as CostesData[]
  }

  try {
    const { data, error } = await supabaseAdmin.from("costes").select("*")

    if (error) {
      throw error
    }

    // Calcular el total para los porcentajes
    const total = data.reduce((sum, item) => sum + item.valor, 0)

    const formattedData = data.map((item) => ({
      categoria: item.categoria,
      valor: item.valor,
      porcentaje: (item.valor / total) * 100,
    }))

    // Guardar en caché
    cache.set(cacheKey, formattedData)

    return formattedData
  } catch (error) {
    console.error("Error fetching costes data:", error)
    return []
  }
}

// Función para obtener datos de ocupación
export async function getOcupacionData(startDate?: string, endDate?: string): Promise<OcupacionData[]> {
  const cacheKey = `ocupacion-${startDate || "all"}-${endDate || "all"}`

  // Intentar obtener del caché
  const cachedData = cache.get(cacheKey)
  if (cachedData) {
    return cachedData as OcupacionData[]
  }

  try {
    let query = supabaseAdmin.from("ocupacion").select("*").order("fecha", { ascending: false })

    if (startDate) {
      query = query.gte("fecha", startDate)
    }

    if (endDate) {
      query = query.lte("fecha", endDate)
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    const formattedData = data.map((item) => ({
      fecha: item.fecha,
      ocupacion: item.ocupacion,
      mesas: item.mesas,
    }))

    // Guardar en caché
    cache.set(cacheKey, formattedData)

    return formattedData
  } catch (error) {
    console.error("Error fetching ocupacion data:", error)
    return []
  }
}

// Función para obtener datos de satisfacción
export async function getSatisfaccionData(): Promise<SatisfaccionData[]> {
  const cacheKey = "satisfaccion"

  // Intentar obtener del caché
  const cachedData = cache.get(cacheKey)
  if (cachedData) {
    return cachedData as SatisfaccionData[]
  }

  try {
    const { data, error } = await supabaseAdmin.from("satisfaccion").select("*").order("fecha", { ascending: false })

    if (error) {
      throw error
    }

    const formattedData = data.map((item) => ({
      fecha: item.fecha,
      puntuacion: item.puntuacion,
      comentarios: item.comentarios,
    }))

    // Guardar en caché
    cache.set(cacheKey, formattedData)

    return formattedData
  } catch (error) {
    console.error("Error fetching satisfaccion data:", error)
    return []
  }
}

// Nueva función para obtener datos de tickets cerrados
export async function getTicketsCerradosData(
  startDate?: string,
  endDate?: string,
  filters?: Record<string, any>,
): Promise<TicketCerradoData[]> {
  const cacheKey = `tickets-${startDate || "all"}-${endDate || "all"}-${JSON.stringify(filters || {})}`

  // Intentar obtener del caché
  const cachedData = cache.get(cacheKey)
  if (cachedData) {
    return cachedData as TicketCerradoData[]
  }

  try {
    let query = supabaseAdmin.from("tickets_cerrados").select("*").order("fecha_hora", { ascending: false })

    if (startDate) {
      query = query.gte("fecha_hora", startDate)
    }

    if (endDate) {
      query = query.lte("fecha_hora", endDate)
    }

    // Aplicar filtros adicionales si existen
    if (filters) {
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null) {
          query = query.eq(key, value)
        }
      })
    }

    const { data, error } = await query

    if (error) {
      throw error
    }

    // Guardar en caché
    cache.set(cacheKey, data)

    return data as TicketCerradoData[]
  } catch (error) {
    console.error("Error fetching tickets cerrados data:", error)
    return []
  }
}

// Función para obtener análisis de tickets cerrados
export async function getTicketsAnalisis(
  startDate?: string,
  endDate?: string,
): Promise<{
  totalTickets: number
  importeTotal: number
  ticketMedio: number
  comenasalesMedio: number
  duracionMedia: number
  propinaMedia: number
  metodoPagoDistribucion: Record<string, number>
  ticketsPorDia: Record<string, number>
  ticketsPorHora: Record<string, number>
}> {
  try {
    const tickets = await getTicketsCerradosData(startDate, endDate)

    if (!tickets.length) {
      return {
        totalTickets: 0,
        importeTotal: 0,
        ticketMedio: 0,
        comenasalesMedio: 0,
        duracionMedia: 0,
        propinaMedia: 0,
        metodoPagoDistribucion: {},
        ticketsPorDia: {},
        ticketsPorHora: {},
      }
    }

    // Calcular métricas
    const totalTickets = tickets.length
    const importeTotal = tickets.reduce((sum, ticket) => sum + ticket.importe_total, 0)
    const ticketMedio = importeTotal / totalTickets
    const comenasalesMedio = tickets.reduce((sum, ticket) => sum + ticket.num_comensales, 0) / totalTickets
    const duracionMedia = tickets.reduce((sum, ticket) => sum + (ticket.duracion_minutos || 0), 0) / totalTickets
    const propinaMedia = tickets.reduce((sum, ticket) => sum + (ticket.propina || 0), 0) / totalTickets

    // Distribución por método de pago
    const metodoPagoDistribucion: Record<string, number> = {}
    tickets.forEach((ticket) => {
      metodoPagoDistribucion[ticket.metodo_pago] = (metodoPagoDistribucion[ticket.metodo_pago] || 0) + 1
    })

    // Tickets por día de la semana
    const ticketsPorDia: Record<string, number> = {}
    const diasSemana = ["Domingo", "Lunes", "Martes", "Miércoles", "Jueves", "Viernes", "Sábado"]
    tickets.forEach((ticket) => {
      const fecha = new Date(ticket.fecha_hora)
      const diaSemana = diasSemana[fecha.getDay()]
      ticketsPorDia[diaSemana] = (ticketsPorDia[diaSemana] || 0) + 1
    })

    // Tickets por hora
    const ticketsPorHora: Record<string, number> = {}
    tickets.forEach((ticket) => {
      const fecha = new Date(ticket.fecha_hora)
      const hora = fecha.getHours()
      ticketsPorHora[hora] = (ticketsPorHora[hora] || 0) + 1
    })

    return {
      totalTickets,
      importeTotal,
      ticketMedio,
      comenasalesMedio,
      duracionMedia,
      propinaMedia,
      metodoPagoDistribucion,
      ticketsPorDia,
      ticketsPorHora,
    }
  } catch (error) {
    console.error("Error analyzing tickets data:", error)
    return {
      totalTickets: 0,
      importeTotal: 0,
      ticketMedio: 0,
      comenasalesMedio: 0,
      duracionMedia: 0,
      propinaMedia: 0,
      metodoPagoDistribucion: {},
      ticketsPorDia: {},
      ticketsPorHora: {},
    }
  }
}

// Nuevas funciones para análisis de ventas
export async function getVentasPorCanal(mes: string): Promise<VentasPorCanalData[]> {
  // En un entorno real, esto se obtendría de Supabase
  // Para este ejemplo, usamos datos simulados
  return mockVentasPorCanalData
}

export async function getVentasPorTurno(mes: string): Promise<VentasPorTurnoData[]> {
  // En un entorno real, esto se obtendría de Supabase
  // Para este ejemplo, usamos datos simulados
  return mockVentasPorTurnoData
}

export async function getVentasDiarias(mes: string): Promise<VentasDiariasData[]> {
  // En un entorno real, esto se obtendría de Supabase
  // Para este ejemplo, usamos datos simulados
  return mockVentasDiariasData
}

export async function getResumenMensual(mes: string): Promise<ResumenMensualData> {
  // En un entorno real, esto se obtendría de Supabase
  // Para este ejemplo, usamos datos simulados
  return mockResumenMensualData
}

export async function getProyeccionMensual(mes: string): Promise<ProyeccionMensualData> {
  // En un entorno real, esto se obtendría de Supabase
  // Para este ejemplo, usamos datos simulados
  return mockProyeccionMensualData
}

// Nuevas funciones para análisis de productos
export async function getTopProductos(mes: string, limit = 5): Promise<ProductoData[]> {
  // En un entorno real, esto se obtendría de Supabase
  // Para este ejemplo, usamos datos simulados
  return mockProductosData.slice(0, limit)
}

export async function getVentasPorCategoria(mes: string): Promise<CategoriaProductoData[]> {
  // En un entorno real, esto se obtendría de Supabase
  // Para este ejemplo, usamos datos simulados
  return mockCategoriaProductoData
}

export async function getProductoEstrella(mes: string): Promise<ProductoData> {
  // En un entorno real, esto se obtendría de Supabase
  // Para este ejemplo, usamos el primer producto de los datos simulados
  return mockProductosData[0]
}

export async function getProductoDescenso(mes: string): Promise<ProductoData> {
  // En un entorno real, esto se obtendría de Supabase
  // Para este ejemplo, usamos el último producto de los datos simulados
  return mockProductosData[mockProductosData.length - 1]
}

// Datos simulados para desarrollo
export const mockVentasData: VentasData[] = [
  { fecha: "2025-05-01", total: 3250, comensales: 82, ticketMedio: 39.63 },
  { fecha: "2025-05-02", total: 4120, comensales: 98, ticketMedio: 42.04 },
  { fecha: "2025-05-03", total: 5840, comensales: 142, ticketMedio: 41.13 },
  { fecha: "2025-05-04", total: 4350, comensales: 105, ticketMedio: 41.43 },
  { fecha: "2025-05-05", total: 2680, comensales: 68, ticketMedio: 39.41 },
  { fecha: "2025-05-06", total: 1450, comensales: 38, ticketMedio: 38.16 },
  { fecha: "2025-05-07", total: 3560, comensales: 89, ticketMedio: 40.0 },
]

export const mockCostesData: CostesData[] = [
  { categoria: "Materia Prima", valor: 15360, porcentaje: 32 },
  { categoria: "Personal", valor: 18240, porcentaje: 38 },
  { categoria: "Alquiler", valor: 5760, porcentaje: 12 },
  { categoria: "Suministros", valor: 3840, porcentaje: 8 },
  { categoria: "Marketing", valor: 2400, porcentaje: 5 },
  { categoria: "Otros", valor: 2400, porcentaje: 5 },
]

export const mockOcupacionData: OcupacionData[] = [
  { fecha: "2025-05-01", ocupacion: 65, mesas: 15 },
  { fecha: "2025-05-02", ocupacion: 78, mesas: 18 },
  { fecha: "2025-05-03", ocupacion: 92, mesas: 22 },
  { fecha: "2025-05-04", ocupacion: 85, mesas: 20 },
  { fecha: "2025-05-05", ocupacion: 54, mesas: 13 },
  { fecha: "2025-05-06", ocupacion: 42, mesas: 10 },
  { fecha: "2025-05-07", ocupacion: 71, mesas: 17 },
]

export const mockSatisfaccionData: SatisfaccionData[] = [
  { fecha: "2025-05-01", puntuacion: 4.2, comentarios: 5 },
  { fecha: "2025-05-02", puntuacion: 4.5, comentarios: 8 },
  { fecha: "2025-05-03", puntuacion: 4.3, comentarios: 12 },
  { fecha: "2025-05-04", puntuacion: 4.1, comentarios: 7 },
  { fecha: "2025-05-05", puntuacion: 4.4, comentarios: 4 },
  { fecha: "2025-05-06", puntuacion: 4.0, comentarios: 3 },
  { fecha: "2025-05-07", puntuacion: 4.6, comentarios: 9 },
]

// Datos simulados para tickets cerrados
export const mockTicketsCerradosData: TicketCerradoData[] = [
  {
    id: "1",
    fecha_hora: "2025-05-07T20:30:00Z",
    num_comensales: 4,
    importe_total: 156.5,
    importe_comida: 98.0,
    importe_bebida: 48.5,
    importe_postre: 10.0,
    metodo_pago: "Tarjeta",
    id_camarero: "c1",
    id_mesa: 8,
    duracion_minutos: 95,
    propina: 15.0,
    descuento: 0,
    codigo_promocion: null,
    observaciones: null,
  },
  {
    id: "2",
    fecha_hora: "2025-05-07T14:15:00Z",
    num_comensales: 2,
    importe_total: 68.2,
    importe_comida: 45.0,
    importe_bebida: 18.2,
    importe_postre: 5.0,
    metodo_pago: "Efectivo",
    id_camarero: "c2",
    id_mesa: 4,
    duracion_minutos: 65,
    propina: 5.0,
    descuento: 0,
    codigo_promocion: null,
    observaciones: "Clientes habituales",
  },
  {
    id: "3",
    fecha_hora: "2025-05-06T21:00:00Z",
    num_comensales: 6,
    importe_total: 245.8,
    importe_comida: 165.0,
    importe_bebida: 68.8,
    importe_postre: 12.0,
    metodo_pago: "Tarjeta",
    id_camarero: "c3",
    id_mesa: 12,
    duracion_minutos: 120,
    propina: 24.0,
    descuento: 0,
    codigo_promocion: null,
    observaciones: "Celebración de cumpleaños",
  },
  {
    id: "4",
    fecha_hora: "2025-05-06T13:45:00Z",
    num_comensales: 3,
    importe_total: 98.5,
    importe_comida: 65.0,
    importe_bebida: 24.5,
    importe_postre: 9.0,
    metodo_pago: "Bizum",
    id_camarero: "c1",
    id_mesa: 6,
    duracion_minutos: 75,
    propina: 8.0,
    descuento: 0,
    codigo_promocion: null,
    observaciones: null,
  },
  {
    id: "5",
    fecha_hora: "2025-05-05T20:15:00Z",
    num_comensales: 2,
    importe_total: 78.3,
    importe_comida: 52.0,
    importe_bebida: 18.3,
    importe_postre: 8.0,
    metodo_pago: "Tarjeta",
    id_camarero: "c2",
    id_mesa: 2,
    duracion_minutos: 85,
    propina: 7.0,
    descuento: 0,
    codigo_promocion: null,
    observaciones: null,
  },
]

// Nuevos datos simulados para análisis de ventas
export const mockVentasPorCanalData: VentasPorCanalData[] = [
  { canal: "Smart Table", total: 28500, porcentaje: 45, comandas: 620 },
  { canal: "TakeAway", total: 15800, porcentaje: 25, comandas: 410 },
  { canal: "Walk-in", total: 12600, porcentaje: 20, comandas: 280 },
  { canal: "Delivery", total: 6300, porcentaje: 10, comandas: 150 },
]

export const mockVentasPorTurnoData: VentasPorTurnoData[] = [
  { turno: "Comida", total: 37800, porcentaje: 60, comandas: 840 },
  { turno: "Cena", total: 25200, porcentaje: 40, comandas: 620 },
]

export const mockVentasDiariasData: VentasDiariasData[] = [
  { fecha: "2025-05-01", total: 1850, comandas: 42, comensales: 95, ticketMedio: 44.05 },
  { fecha: "2025-05-02", total: 2100, comandas: 48, comensales: 110, ticketMedio: 43.75 },
  { fecha: "2025-05-03", total: 3450, comandas: 78, comensales: 180, ticketMedio: 44.23 },
  { fecha: "2025-05-04", total: 3200, comandas: 72, comensales: 165, ticketMedio: 44.44 },
  { fecha: "2025-05-05", total: 1750, comandas: 40, comensales: 90, ticketMedio: 43.75 },
  { fecha: "2025-05-06", total: 1650, comandas: 38, comensales: 85, ticketMedio: 43.42 },
  { fecha: "2025-05-07", total: 1950, comandas: 45, comensales: 105, ticketMedio: 43.33 },
  { fecha: "2025-05-08", total: 2050, comandas: 47, comensales: 115, ticketMedio: 43.62 },
  { fecha: "2025-05-09", total: 2350, comandas: 54, comensales: 125, ticketMedio: 43.52 },
  { fecha: "2025-05-10", total: 3550, comandas: 80, comensales: 185, ticketMedio: 44.38 },
  { fecha: "2025-05-11", total: 3300, comandas: 75, comensales: 170, ticketMedio: 44.0 },
  { fecha: "2025-05-12", total: 1800, comandas: 41, comensales: 95, ticketMedio: 43.9 },
  { fecha: "2025-05-13", total: 1700, comandas: 39, comensales: 90, ticketMedio: 43.59 },
  { fecha: "2025-05-14", total: 2000, comandas: 46, comensales: 110, ticketMedio: 43.48 },
  { fecha: "2025-05-15", total: 2150, comandas: 49, comensales: 120, ticketMedio: 43.88 },
]

export const mockResumenMensualData: ResumenMensualData = {
  ventasTotales: 63000,
  ticketMedio: 43.75,
  comandas: 1460,
  comparativaMesAnterior: 8.5,
}

export const mockProyeccionMensualData: ProyeccionMensualData = {
  acumulado: 34850,
  objetivo: 70000,
  progreso: 49.8,
  diasRestantes: 16,
  proyeccion: 69700,
}

// Nuevos datos simulados para análisis de productos
export const mockProductosData: ProductoData[] = [
  {
    id: "p1",
    nombre: "Hamburguesa Gourmet",
    categoria: "Hamburguesas",
    precio: 12.95,
    unidadesVendidas: 320,
    ingresos: 4144,
    tendencia: 15,
  },
  {
    id: "p2",
    nombre: "Pizza Margarita",
    categoria: "Pizzas",
    precio: 9.95,
    unidadesVendidas: 280,
    ingresos: 2786,
    tendencia: 8,
  },
  {
    id: "p3",
    nombre: "Ensalada César",
    categoria: "Ensaladas",
    precio: 8.5,
    unidadesVendidas: 210,
    ingresos: 1785,
    tendencia: 5,
  },
  {
    id: "p4",
    nombre: "Pasta Carbonara",
    categoria: "Pastas",
    precio: 11.5,
    unidadesVendidas: 195,
    ingresos: 2242.5,
    tendencia: 3,
  },
  {
    id: "p5",
    nombre: "Tarta de Chocolate",
    categoria: "Postres",
    precio: 5.95,
    unidadesVendidas: 175,
    ingresos: 1041.25,
    tendencia: 12,
  },
  {
    id: "p6",
    nombre: "Sushi Variado",
    categoria: "Sushi",
    precio: 14.95,
    unidadesVendidas: 150,
    ingresos: 2242.5,
    tendencia: 20,
  },
  {
    id: "p7",
    nombre: "Paella Mixta",
    categoria: "Arroces",
    precio: 13.95,
    unidadesVendidas: 130,
    ingresos: 1813.5,
    tendencia: -5,
  },
  {
    id: "p8",
    nombre: "Cóctel Mojito",
    categoria: "Bebidas",
    precio: 7.5,
    unidadesVendidas: 220,
    ingresos: 1650,
    tendencia: 10,
  },
  {
    id: "p9",
    nombre: "Café Especial",
    categoria: "Bebidas",
    precio: 3.5,
    unidadesVendidas: 350,
    ingresos: 1225,
    tendencia: 2,
  },
  {
    id: "p10",
    nombre: "Nachos con Guacamole",
    categoria: "Entrantes",
    precio: 6.95,
    unidadesVendidas: 180,
    ingresos: 1251,
    tendencia: -8,
  },
]

export const mockCategoriaProductoData: CategoriaProductoData[] = [
  { nombre: "Hamburguesas", totalVentas: 8250, unidadesVendidas: 580, ticketMedio: 14.22 },
  { nombre: "Pizzas", totalVentas: 6850, unidadesVendidas: 520, ticketMedio: 13.17 },
  { nombre: "Bebidas", totalVentas: 5950, unidadesVendidas: 950, ticketMedio: 6.26 },
  { nombre: "Pastas", totalVentas: 4350, unidadesVendidas: 380, ticketMedio: 11.45 },
  { nombre: "Ensaladas", totalVentas: 3250, unidadesVendidas: 350, ticketMedio: 9.29 },
  { nombre: "Postres", totalVentas: 2950, unidadesVendidas: 420, ticketMedio: 7.02 },
  { nombre: "Entrantes", totalVentas: 2650, unidadesVendidas: 380, ticketMedio: 6.97 },
  { nombre: "Arroces", totalVentas: 2450, unidadesVendidas: 180, ticketMedio: 13.61 },
  { nombre: "Sushi", totalVentas: 2300, unidadesVendidas: 160, ticketMedio: 14.38 },
]
