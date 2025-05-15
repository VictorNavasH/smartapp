// Tipos para el análisis de ventas
export interface VentasDiariasData {
  fecha: string
  total: number
  ticketMedio: number
  comensales: number
}

export interface VentasPorCanalData {
  canal: string
  total: number
  porcentaje: number
}

export interface VentasPorTurnoData {
  turno: string
  total: number
  comandas: number
}

export interface ResumenMensualData {
  ventasTotales: number
  ticketMedio: number
  comandas: number
  comparativaMesAnterior: number
  objetivo: number
  progreso: number
}

export interface ProyeccionMensualData {
  acumulado: number
  objetivo: number
  proyeccion: number
  progreso: number
  diasRestantes: number
}

// Tipos para el análisis de productos
export interface ProductoData {
  id: string
  nombre: string
  categoria: string
  unidadesVendidas: number
  ingresos: number
  precio: number
  tendencia: number
  imagen?: string
}

export interface CategoriaProductoData {
  nombre: string
  totalVentas: number
  unidadesVendidas: number
  ticketMedio: number
  color: string
}

// Categorías reales de NÜA Smart App
export const CATEGORIAS_NUA = [
  { nombre: "Smart Food para Compartir", color: "#02b1c4" },
  { nombre: "Smart Menús", color: "#17c3b2" },
  { nombre: "Smart Pokes", color: "#02f2d2" },
  { nombre: "Kids Edition", color: "#fe6d73" },
  { nombre: "Dulce", color: "#ffcb77" },
  { nombre: "Mojitos & Cocktails", color: "#227c9d" },
  { nombre: "Tea & Liqueurs", color: "#364f6b" },
  { nombre: "Smart Drinks sin alcohol", color: "#7fc8f8" },
]

// Productos reales de NÜA Smart App
export const PRODUCTOS_NUA = [
  { nombre: "NÜA Smart Poke", categoria: "Smart Pokes" },
  { nombre: "Smart Chicken Noodles", categoria: "Smart Food para Compartir" },
  { nombre: "Smart Love Menú", categoria: "Smart Menús" },
  { nombre: "Smart Burger Edition", categoria: "Smart Menús" },
  { nombre: "Smart Kids Pasta", categoria: "Kids Edition" },
  { nombre: "Smart Chocolate Cake", categoria: "Dulce" },
  { nombre: "Smart Mojito", categoria: "Mojitos & Cocktails" },
  { nombre: "Smart Green Tea", categoria: "Tea & Liqueurs" },
  { nombre: "Smart Lemonade", categoria: "Smart Drinks sin alcohol" },
  { nombre: "Smart Veggie Bowl", categoria: "Smart Food para Compartir" },
  { nombre: "Smart Poke Deluxe", categoria: "Smart Pokes" },
  { nombre: "Smart Pizza de la Casa", categoria: "Smart Food para Compartir" },
]

// Funciones para obtener datos simulados
export async function getVentasDiarias(mes: string): Promise<VentasDiariasData[]> {
  // Simulamos datos para 30 días
  const result: VentasDiariasData[] = []
  const [year, month] = mes.split("-").map(Number)

  const daysInMonth = new Date(year, month, 0).getDate()

  for (let day = 1; day <= daysInMonth; day++) {
    const date = new Date(year, month - 1, day)
    if (date > new Date()) continue // No incluir fechas futuras

    result.push({
      fecha: date.toISOString().split("T")[0],
      total: 1000 + Math.random() * 2000,
      ticketMedio: 20 + Math.random() * 15,
      comensales: 50 + Math.random() * 100,
    })
  }

  return result
}

export async function getVentasPorTurno(mes: string): Promise<VentasPorTurnoData[]> {
  // Datos simulados de ventas por turno
  return [
    {
      turno: "Comida",
      total: 15000 + Math.random() * 5000,
      comandas: 500 + Math.floor(Math.random() * 200),
    },
    {
      turno: "Cena",
      total: 20000 + Math.random() * 5000,
      comandas: 600 + Math.floor(Math.random() * 200),
    },
  ]
}

export async function getResumenMensual(mes: string): Promise<ResumenMensualData> {
  // Datos simulados de resumen mensual
  const ventasTotales = 35000 + Math.random() * 10000
  const objetivo = 45000 + Math.random() * 5000
  const progreso = (ventasTotales / objetivo) * 100

  return {
    ventasTotales,
    ticketMedio: 25 + Math.random() * 10,
    comandas: 1200 + Math.floor(Math.random() * 300),
    comparativaMesAnterior: -5 + Math.random() * 15,
    objetivo,
    progreso,
  }
}

export async function getProyeccionMensual(mes: string): Promise<ProyeccionMensualData> {
  // Datos simulados de proyección mensual
  const acumulado = 25000 + Math.random() * 10000
  const objetivo = 45000 + Math.random() * 5000
  const progreso = (acumulado / objetivo) * 100

  return {
    acumulado,
    objetivo,
    proyeccion: acumulado * 1.2,
    progreso,
    diasRestantes: 10 + Math.floor(Math.random() * 10),
  }
}

export async function getVentasPorCategoria(mes: string): Promise<CategoriaProductoData[]> {
  // Datos simulados de ventas por categoría
  return CATEGORIAS_NUA.map((categoria) => ({
    nombre: categoria.nombre,
    totalVentas: 1000 + Math.random() * 5000,
    unidadesVendidas: 50 + Math.floor(Math.random() * 200),
    ticketMedio: 10 + Math.random() * 20,
    color: categoria.color,
  }))
}

export async function getTopProductos(mes: string, limit = 5): Promise<ProductoData[]> {
  // Datos simulados de top productos
  const productos = [...PRODUCTOS_NUA]
  // Ordenar aleatoriamente para simular diferentes tops cada vez
  productos.sort(() => Math.random() - 0.5)

  return productos.slice(0, limit).map((producto, index) => ({
    id: `prod-${index + 1}`,
    nombre: producto.nombre,
    categoria: producto.categoria,
    unidadesVendidas: 50 + Math.floor(Math.random() * 150),
    ingresos: 500 + Math.random() * 2000,
    precio: 10 + Math.random() * 20,
    tendencia: -10 + Math.random() * 30,
  }))
}

export async function getProductoEstrella(mes: string): Promise<ProductoData> {
  // Datos simulados de producto estrella
  const randomIndex = Math.floor(Math.random() * PRODUCTOS_NUA.length)
  const producto = PRODUCTOS_NUA[randomIndex]

  return {
    id: "prod-estrella",
    nombre: producto.nombre,
    categoria: producto.categoria,
    unidadesVendidas: 180 + Math.floor(Math.random() * 50),
    ingresos: 2500 + Math.random() * 1000,
    precio: 15 + Math.random() * 5,
    tendencia: 10 + Math.random() * 15,
    imagen: `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(producto.nombre)}`,
  }
}

export async function getProductoDescenso(mes: string): Promise<ProductoData> {
  // Datos simulados de producto en descenso
  const randomIndex = Math.floor(Math.random() * PRODUCTOS_NUA.length)
  const producto = PRODUCTOS_NUA[randomIndex]

  return {
    id: "prod-descenso",
    nombre: producto.nombre,
    categoria: producto.categoria,
    unidadesVendidas: 40 + Math.floor(Math.random() * 30),
    ingresos: 400 + Math.random() * 300,
    precio: 8 + Math.random() * 4,
    tendencia: -15 - Math.random() * 10,
    imagen: `/placeholder.svg?height=80&width=80&query=${encodeURIComponent(producto.nombre)}`,
  }
}
