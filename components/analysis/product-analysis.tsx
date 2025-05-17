"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from "recharts"
import {
  CalendarIcon,
  FilterIcon,
  TrendingUpIcon,
  TrendingDownIcon,
  AwardIcon,
  ShoppingBagIcon,
  Clock,
} from "lucide-react"
import {
  getTopProductos,
  getVentasPorCategoria,
  getProductoEstrella,
  getProductoDescenso,
  type ProductoData,
  type CategoriaProductoData,
  CATEGORIAS_NUA,
} from "@/lib/data-ventas"
import { ServiceTimeAnalysis } from "./service-time-analysis"

export function ProductAnalysis() {
  const [activeTab, setActiveTab] = useState("productos")
  const [selectedMonth, setSelectedMonth] = useState("2025-05")
  const [selectedCategory, setSelectedCategory] = useState("todas")
  const [topProductos, setTopProductos] = useState<ProductoData[]>([])
  const [ventasPorCategoria, setVentasPorCategoria] = useState<CategoriaProductoData[]>([])
  const [productoEstrella, setProductoEstrella] = useState<ProductoData | null>(null)
  const [productoDescenso, setProductoDescenso] = useState<ProductoData | null>(null)
  const [loading, setLoading] = useState(true)

  const meses = [
    { value: "2025-05", label: "Mayo 2025" },
    { value: "2025-04", label: "Abril 2025" },
    { value: "2025-03", label: "Marzo 2025" },
  ]

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [top, categorias, estrella, descenso] = await Promise.all([
          getTopProductos(selectedMonth),
          getVentasPorCategoria(selectedMonth),
          getProductoEstrella(selectedMonth),
          getProductoDescenso(selectedMonth),
        ])

        setTopProductos(top)
        setVentasPorCategoria(categorias)
        setProductoEstrella(estrella)
        setProductoDescenso(descenso)
      } catch (error) {
        console.error("Error fetching product analysis data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedMonth, selectedCategory])

  // Formatear número como euros
  const formatEuro = (value: number) => {
    return new Intl.NumberFormat("es-ES", { style: "currency", currency: "EUR" }).format(value)
  }

  // Generar datos para mini gráficos
  const generateMiniChartData = (producto: ProductoData) => {
    const result = []
    for (let i = 0; i < 7; i++) {
      result.push({
        name: `Día ${i + 1}`,
        value: Math.max(5, Math.floor(Math.random() * producto.unidadesVendidas * 0.2)),
      })
    }
    return result
  }

  return (
    <div className="space-y-6">
      <Tabs defaultValue="productos" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="border-b w-full justify-start mb-4">
          <TabsTrigger
            value="productos"
            className="relative h-9 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary"
          >
            <ShoppingBagIcon className="h-4 w-4 mr-2" />
            Análisis de Productos
          </TabsTrigger>
          <TabsTrigger
            value="tiempos"
            className="relative h-9 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary"
          >
            <Clock className="h-4 w-4 mr-2" />
            Tiempos de Servicio
          </TabsTrigger>
        </TabsList>

        <TabsContent value="productos" className="mt-0">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div className="flex items-center gap-2">
              <FilterIcon className="h-4 w-4 text-[#227c9d]" />
              <span className="text-sm text-[#364f6b]">Filtros:</span>
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <div className="flex items-center gap-2">
                <CalendarIcon className="h-4 w-4 text-[#227c9d]" />
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[140px] h-8 text-sm">
                    <SelectValue placeholder="Seleccionar mes" />
                  </SelectTrigger>
                  <SelectContent>
                    {meses.map((mes) => (
                      <SelectItem key={mes.value} value={mes.value}>
                        {mes.label}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <span className="h-4 w-4 rounded-full bg-[#02b1c4]"></span>
                <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                  <SelectTrigger className="w-[180px] h-8 text-sm">
                    <SelectValue placeholder="Todas las categorías" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="todas">Todas las categorías</SelectItem>
                    {CATEGORIAS_NUA.map((categoria) => (
                      <SelectItem key={categoria.nombre} value={categoria.nombre}>
                        {categoria.nombre}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>
          </div>

          {loading ? (
            <div className="flex justify-center items-center h-64">
              <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02b1c4]"></div>
            </div>
          ) : (
            <>
              {/* Top 5 productos más vendidos */}
              <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300 mt-6">
                <div className="absolute inset-x-0 top-0 h-[80px] bg-gradient-to-r from-[#02b1c4]/10 via-[#17c3b2]/10 to-[#02f2d2]/10 rounded-t-lg pointer-events-none" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-lg font-semibold text-[#364f6b] flex items-center gap-2">
                    <ShoppingBagIcon className="h-5 w-5 text-[#02b1c4]" />
                    Top 5 Productos Más Vendidos
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                      <thead className="bg-gray-50">
                        <tr>
                          <th
                            scope="col"
                            className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Producto
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Categoría
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Unidades
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Ingresos
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Precio Medio
                          </th>
                          <th
                            scope="col"
                            className="px-3 py-3 text-center text-xs font-medium text-gray-500 uppercase tracking-wider"
                          >
                            Tendencia
                          </th>
                        </tr>
                      </thead>
                      <tbody className="bg-white divide-y divide-gray-200">
                        {topProductos.map((producto, index) => (
                          <tr key={producto.id} className="hover:bg-gray-50">
                            <td className="px-3 py-4 whitespace-nowrap">
                              <div className="flex items-center">
                                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center">
                                  {index === 0 && <AwardIcon className="h-4 w-4 text-[#ffcb77]" />}
                                  {index !== 0 && <span className="text-[#02b1c4] font-bold">{index + 1}</span>}
                                </div>
                                <div className="ml-3">
                                  <div className="text-sm font-medium text-[#364f6b]">{producto.nombre}</div>
                                </div>
                              </div>
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                              {producto.categoria}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {producto.unidadesVendidas.toLocaleString()}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {formatEuro(producto.ingresos)}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-sm text-gray-500 text-right">
                              {formatEuro(producto.precio)}
                            </td>
                            <td className="px-3 py-4 whitespace-nowrap text-center">
                              <div className="flex items-center justify-center">
                                <div className="h-8 w-16">
                                  <ResponsiveContainer width="100%" height="100%">
                                    <LineChart data={generateMiniChartData(producto)}>
                                      <Line
                                        type="monotone"
                                        dataKey="value"
                                        stroke={producto.tendencia > 0 ? "#17c3b2" : "#fe6d73"}
                                        strokeWidth={2}
                                        dot={false}
                                      />
                                    </LineChart>
                                  </ResponsiveContainer>
                                </div>
                                <span
                                  className={`ml-2 text-xs flex items-center ${
                                    producto.tendencia > 0 ? "text-[#17c3b2]" : "text-[#fe6d73]"
                                  }`}
                                >
                                  {producto.tendencia > 0 ? (
                                    <TrendingUpIcon className="h-3 w-3 mr-1" />
                                  ) : (
                                    <TrendingDownIcon className="h-3 w-3 mr-1" />
                                  )}
                                  {Math.abs(producto.tendencia).toFixed(1)}%
                                </span>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </CardContent>
              </Card>

              {/* Ventas por categoría */}
              <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300 mt-6">
                <div className="absolute inset-x-0 top-0 h-[80px] bg-gradient-to-r from-[#02b1c4]/10 via-[#17c3b2]/10 to-[#02f2d2]/10 rounded-t-lg pointer-events-none" />
                <CardHeader className="relative z-10">
                  <CardTitle className="text-lg font-semibold text-[#364f6b]">Ventas por Categoría</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    <div className="h-[400px]">
                      <ResponsiveContainer width="100%" height="100%">
                        <BarChart
                          data={ventasPorCategoria}
                          layout="vertical"
                          margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                        >
                          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                          <XAxis type="number" stroke="#9ca3af" fontSize={12} />
                          <YAxis
                            dataKey="nombre"
                            type="category"
                            width={150}
                            stroke="#9ca3af"
                            fontSize={12}
                            tickFormatter={(value) => (value.length > 20 ? `${value.substring(0, 20)}...` : value)}
                          />
                          <Tooltip
                            formatter={(value: number, name: string) => {
                              if (name === "unidadesVendidas") return [value.toLocaleString(), "Unidades vendidas"]
                              if (name === "totalVentas") return [formatEuro(value), "Ventas totales"]
                              return [value, name]
                            }}
                            labelFormatter={(value) => value}
                          />
                          <Legend />
                          <Bar dataKey="totalVentas" name="Ventas (€)" radius={[0, 4, 4, 0]}>
                            {ventasPorCategoria.map((entry, index) => (
                              <Cell key={`cell-${index}`} fill={entry.color} />
                            ))}
                          </Bar>
                        </BarChart>
                      </ResponsiveContainer>
                    </div>
                    <div>
                      <div className="overflow-x-auto">
                        <table className="min-w-full divide-y divide-gray-200">
                          <thead className="bg-gray-50">
                            <tr>
                              <th
                                scope="col"
                                className="px-3 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Categoría
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Ventas
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Unidades
                              </th>
                              <th
                                scope="col"
                                className="px-3 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider"
                              >
                                Ticket Medio
                              </th>
                            </tr>
                          </thead>
                          <tbody className="bg-white divide-y divide-gray-200">
                            {ventasPorCategoria.map((categoria, index) => (
                              <tr key={categoria.nombre} className="hover:bg-gray-50">
                                <td className="px-3 py-3 whitespace-nowrap text-sm font-medium text-gray-900 flex items-center">
                                  <span
                                    className="w-3 h-3 rounded-full mr-2"
                                    style={{ backgroundColor: categoria.color }}
                                  ></span>
                                  {categoria.nombre}
                                </td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                                  {formatEuro(categoria.totalVentas)}
                                </td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                                  {categoria.unidadesVendidas.toLocaleString()}
                                </td>
                                <td className="px-3 py-3 whitespace-nowrap text-sm text-gray-500 text-right">
                                  {formatEuro(categoria.ticketMedio)}
                                </td>
                              </tr>
                            ))}
                          </tbody>
                        </table>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Productos destacados */}
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mt-6">
                {/* Producto estrella */}
                <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
                  <div className="absolute inset-x-0 top-0 h-[80px] bg-gradient-to-r from-[#02b1c4]/10 via-[#17c3b2]/10 to-[#02f2d2]/10 rounded-t-lg pointer-events-none" />
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-lg font-semibold text-[#364f6b] flex items-center gap-2">
                      <AwardIcon className="h-5 w-5 text-[#ffcb77]" />
                      Producto Estrella del Mes
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {productoEstrella?.imagen ? (
                            <img
                              src={productoEstrella.imagen || "/placeholder.svg"}
                              alt={productoEstrella.nombre}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-[#02b1c4] text-3xl font-bold">
                              {productoEstrella?.nombre.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="absolute -top-2 -right-2 bg-[#ffcb77] text-white rounded-full p-1">
                          <AwardIcon className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#364f6b]">{productoEstrella?.nombre}</h3>
                        <p className="text-sm text-[#227c9d]">{productoEstrella?.categoria}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-[#227c9d]">Unidades vendidas</p>
                            <p className="text-lg font-semibold text-[#364f6b]">
                              {productoEstrella?.unidadesVendidas.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#227c9d]">Ingresos</p>
                            <p className="text-lg font-semibold text-[#364f6b]">
                              {formatEuro(productoEstrella?.ingresos || 0)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className="text-xs flex items-center text-[#17c3b2]">
                            <TrendingUpIcon className="h-3 w-3 mr-1" />
                            {Math.abs(productoEstrella?.tendencia || 0).toFixed(1)}% vs mes anterior
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>

                {/* Producto con peor rendimiento */}
                <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
                  <div className="absolute inset-x-0 top-0 h-[80px] bg-gradient-to-r from-[#02b1c4]/10 via-[#17c3b2]/10 to-[#02f2d2]/10 rounded-t-lg pointer-events-none" />
                  <CardHeader className="relative z-10">
                    <CardTitle className="text-lg font-semibold text-[#364f6b] flex items-center gap-2">
                      <TrendingDownIcon className="h-5 w-5 text-[#fe6d73]" />
                      Producto con Peor Rendimiento
                    </CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-col md:flex-row gap-4 items-center">
                      <div className="relative">
                        <div className="w-20 h-20 rounded-full bg-gray-100 flex items-center justify-center overflow-hidden">
                          {productoDescenso?.imagen ? (
                            <img
                              src={productoDescenso.imagen || "/placeholder.svg"}
                              alt={productoDescenso.nombre}
                              className="w-full h-full object-cover"
                            />
                          ) : (
                            <div className="text-[#fe6d73] text-3xl font-bold">
                              {productoDescenso?.nombre.charAt(0)}
                            </div>
                          )}
                        </div>
                        <div className="absolute -top-2 -right-2 bg-[#fe6d73] text-white rounded-full p-1">
                          <TrendingDownIcon className="h-4 w-4" />
                        </div>
                      </div>
                      <div className="flex-1">
                        <h3 className="text-xl font-bold text-[#364f6b]">{productoDescenso?.nombre}</h3>
                        <p className="text-sm text-[#227c9d]">{productoDescenso?.categoria}</p>
                        <div className="mt-2 grid grid-cols-2 gap-2">
                          <div>
                            <p className="text-xs text-[#227c9d]">Unidades vendidas</p>
                            <p className="text-lg font-semibold text-[#364f6b]">
                              {productoDescenso?.unidadesVendidas.toLocaleString()}
                            </p>
                          </div>
                          <div>
                            <p className="text-xs text-[#227c9d]">Ingresos</p>
                            <p className="text-lg font-semibold text-[#364f6b]">
                              {formatEuro(productoDescenso?.ingresos || 0)}
                            </p>
                          </div>
                        </div>
                        <div className="mt-2 flex items-center">
                          <span className="text-xs flex items-center text-[#fe6d73]">
                            <TrendingDownIcon className="h-3 w-3 mr-1" />
                            {Math.abs(productoDescenso?.tendencia || 0).toFixed(1)}% vs mes anterior
                          </span>
                        </div>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </>
          )}
        </TabsContent>

        <TabsContent value="tiempos" className="mt-0">
          <ServiceTimeAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}
