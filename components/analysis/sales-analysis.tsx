"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import {
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Sector,
} from "recharts"
import { ChartContainer, ChartTooltip, ChartTooltipContent } from "@/components/ui/chart"
import type { DoughnutChartData } from "@/components/ui/doughnut-chart"
import {
  ArrowUpIcon,
  CalendarIcon,
  TrendingUpIcon,
  ShoppingBagIcon,
  UsersIcon,
  CreditCardIcon,
  AwardIcon,
  TrendingDownIcon,
  FilterIcon,
  SunIcon,
  MoonIcon,
  BarChart3Icon,
} from "lucide-react"
import {
  getVentasDiarias,
  getVentasPorTurno,
  getResumenMensual,
  getProyeccionMensual,
  getVentasPorCategoria,
  getProductoEstrella,
  getProductoDescenso,
  type VentasDiariasData,
  type VentasPorTurnoData,
  type ResumenMensualData,
  type ProyeccionMensualData,
  type CategoriaProductoData,
  type ProductoData,
} from "@/lib/data-ventas"
import { formatCurrency } from "@/lib/chart-utils"
import { MetricCard } from "@/components/ui/metric-card"

export function SalesAnalysis() {
  const [selectedMonth, setSelectedMonth] = useState("2025-05")
  const [selectedCategory, setSelectedCategory] = useState("todas")
  const [ventasDiarias, setVentasDiarias] = useState<VentasDiariasData[]>([])
  const [ventasPorTurno, setVentasPorTurno] = useState<VentasPorTurnoData[]>([])
  const [resumenMensual, setResumenMensual] = useState<ResumenMensualData | null>(null)
  const [proyeccionMensual, setProyeccionMensual] = useState<ProyeccionMensualData | null>(null)
  const [ventasPorCategoria, setVentasPorCategoria] = useState<CategoriaProductoData[]>([])
  const [productoEstrella, setProductoEstrella] = useState<ProductoData | null>(null)
  const [productoDescenso, setProductoDescenso] = useState<ProductoData | null>(null)
  const [loading, setLoading] = useState(true)
  const [activeIndex, setActiveIndex] = useState(0)

  const meses = [
    { value: "2025-05", label: "Mayo 2025" },
    { value: "2025-04", label: "Abril 2025" },
    { value: "2025-03", label: "Marzo 2025" },
  ]

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      try {
        const [diarias, turno, resumen, proyeccion, categorias, estrella, descenso] = await Promise.all([
          getVentasDiarias(selectedMonth),
          getVentasPorTurno(selectedMonth),
          getResumenMensual(selectedMonth),
          getProyeccionMensual(selectedMonth),
          getVentasPorCategoria(selectedMonth),
          getProductoEstrella(selectedMonth),
          getProductoDescenso(selectedMonth),
        ])

        setVentasDiarias(diarias)
        setVentasPorTurno(turno)
        setResumenMensual(resumen)
        setProyeccionMensual(proyeccion)
        setVentasPorCategoria(categorias)
        setProductoEstrella(estrella)
        setProductoDescenso(descenso)
      } catch (error) {
        console.error("Error fetching sales analysis data:", error)
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [selectedMonth, selectedCategory])

  // Formatear fecha para mostrar solo el día
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.getDate()
  }

  // Formatear número como euros
  const formatEuro = (value: number) => {
    return formatCurrency(value)
  }

  // Convertir datos de turno para el gráfico de donut
  const ventasPorTurnoDonut: DoughnutChartData[] = ventasPorTurno.map((turno, index) => ({
    name: turno.turno,
    value: turno.total,
    color: index === 0 ? "#02b1c4" : "#17c3b2",
  }))

  // Ordenar categorías por ventas para el ranking
  const categoriasSorted = [...ventasPorCategoria].sort((a, b) => b.totalVentas - a.totalVentas)

  // Renderizado personalizado para el sector activo en el gráfico de turno
  const renderActiveShape = (props: any) => {
    const { cx, cy, innerRadius, outerRadius, startAngle, endAngle, fill, payload, percent, value } = props

    return (
      <g>
        <text x={cx} y={cy - 10} dy={8} textAnchor="middle" fill="#364f6b" className="text-sm font-medium">
          {payload.name}
        </text>
        <text x={cx} y={cy + 10} dy={8} textAnchor="middle" fill="#364f6b" className="text-lg font-bold">
          {formatEuro(value)}
        </text>
        <text x={cx} y={cy + 30} dy={8} textAnchor="middle" fill="#227c9d" className="text-xs">
          {`${(percent * 100).toFixed(0)}%`}
        </text>
        <Sector
          cx={cx}
          cy={cy}
          innerRadius={innerRadius}
          outerRadius={outerRadius + 6}
          startAngle={startAngle}
          endAngle={endAngle}
          fill={fill}
        />
        <Sector
          cx={cx}
          cy={cy}
          startAngle={startAngle}
          endAngle={endAngle}
          innerRadius={outerRadius + 6}
          outerRadius={outerRadius + 10}
          fill={fill}
        />
      </g>
    )
  }

  const onPieEnter = (_: any, index: number) => {
    setActiveIndex(index)
  }

  return (
    <div className="space-y-6">
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
                {ventasPorCategoria.map((categoria) => (
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
          {/* KPIs principales */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            <MetricCard
              title="Ingresos Totales"
              value={formatEuro(resumenMensual?.ventasTotales || 0)}
              change={resumenMensual?.comparativaMesAnterior || 0}
              changeLabel="vs mes anterior"
              icon={<ShoppingBagIcon className="h-4 w-4 text-[#02b1c4]" />}
            />

            <MetricCard
              title="Ticket Medio"
              value={formatEuro(resumenMensual?.ticketMedio || 0)}
              footer="por cliente"
              icon={<CreditCardIcon className="h-4 w-4 text-[#02b1c4]" />}
            />

            <MetricCard
              title="Unidades Vendidas"
              value={resumenMensual?.comandas.toLocaleString() || "0"}
              footer="este mes"
              icon={<UsersIcon className="h-4 w-4 text-[#02b1c4]" />}
            />

            <MetricCard
              title="Progreso Mensual"
              value={`${resumenMensual?.progreso.toFixed(1) || 0}%`}
              footer={
                <div className="w-full bg-gray-100 rounded-full h-1.5 mt-1">
                  <div
                    className="bg-[#02b1c4] h-1.5 rounded-full"
                    style={{ width: `${resumenMensual?.progreso || 0}%` }}
                  ></div>
                </div>
              }
              icon={<TrendingUpIcon className="h-4 w-4 text-[#02b1c4]" />}
            />
          </div>

          {/* Productos destacados */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
            {/* Producto estrella */}
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
              <CardHeader>
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
                        <div className="text-[#02b1c4] text-3xl font-bold">{productoEstrella?.nombre.charAt(0)}</div>
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
                        <ArrowUpIcon className="h-3 w-3 mr-1" />
                        {Math.abs(productoEstrella?.tendencia || 0).toFixed(1)}% vs mes anterior
                      </span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Producto con peor rendimiento */}
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
              <CardHeader>
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
                        <div className="text-[#fe6d73] text-3xl font-bold">{productoDescenso?.nombre.charAt(0)}</div>
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

          {/* Ranking de Ventas por Categoría */}
          <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#364f6b] flex items-center gap-2">
                <BarChart3Icon className="h-5 w-5 text-[#02b1c4]" />
                Ranking de Ventas por Categoría
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {categoriasSorted.slice(0, 5).map((categoria, index) => (
                  <div key={categoria.nombre} className="relative">
                    <div className="flex items-center mb-1">
                      <div className="w-6 h-6 rounded-full bg-gray-100 flex items-center justify-center mr-2">
                        <span className="text-sm font-bold text-[#364f6b]">{index + 1}</span>
                      </div>
                      <span className="text-sm font-medium text-[#364f6b]">{categoria.nombre}</span>
                      <span className="ml-auto text-sm font-bold text-[#364f6b]">
                        {formatEuro(categoria.totalVentas)}
                      </span>
                    </div>
                    <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                      <div
                        className="h-full rounded-full"
                        style={{
                          width: `${(categoria.totalVentas / categoriasSorted[0].totalVentas) * 100}%`,
                          backgroundColor: categoria.color || "#02b1c4",
                        }}
                      ></div>
                    </div>
                    <div className="flex justify-between text-xs text-[#227c9d] mt-1">
                      <span>{categoria.unidadesVendidas.toLocaleString()} unidades</span>
                      <span>Ticket medio: {formatEuro(categoria.ticketMedio)}</span>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Gráfico de evolución diaria */}
          <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#364f6b]">Evolución Diaria de Ventas</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[350px]">
                <ChartContainer
                  config={{
                    total: {
                      label: "Ventas (€)",
                      color: "#02b1c4",
                    },
                    ticketMedio: {
                      label: "Ticket Medio (€)",
                      color: "#17c3b2",
                    },
                    comensales: {
                      label: "Comensales",
                      color: "#fe6d73",
                    },
                  }}
                  className="h-full"
                >
                  <ResponsiveContainer width="100%" height="100%">
                    <AreaChart data={ventasDiarias} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                      <defs>
                        <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#02b1c4" stopOpacity={0.8} />
                          <stop offset="95%" stopColor="#02b1c4" stopOpacity={0.1} />
                        </linearGradient>
                      </defs>
                      <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                      <XAxis dataKey="fecha" tickFormatter={formatDate} stroke="#9ca3af" fontSize={12} />
                      <YAxis yAxisId="left" orientation="left" stroke="#9ca3af" fontSize={12} />
                      <YAxis yAxisId="right" orientation="right" stroke="#9ca3af" fontSize={12} />
                      <ChartTooltip content={<ChartTooltipContent />} />
                      <Legend />
                      <Area
                        yAxisId="left"
                        type="monotone"
                        dataKey="total"
                        stroke="#02b1c4"
                        fillOpacity={1}
                        fill="url(#colorTotal)"
                      />
                      <Line
                        yAxisId="left"
                        type="monotone"
                        dataKey="ticketMedio"
                        stroke="#17c3b2"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                      <Line
                        yAxisId="right"
                        type="monotone"
                        dataKey="comensales"
                        stroke="#fe6d73"
                        strokeWidth={2}
                        dot={{ r: 3 }}
                        activeDot={{ r: 5 }}
                      />
                    </AreaChart>
                  </ResponsiveContainer>
                </ChartContainer>
              </div>
            </CardContent>
          </Card>

          {/* Ventas por turno - Mejorado */}
          <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#364f6b]">Ventas por Turno</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="h-[300px] flex items-center justify-center">
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        activeIndex={activeIndex}
                        activeShape={renderActiveShape}
                        data={ventasPorTurno}
                        cx="50%"
                        cy="50%"
                        innerRadius={60}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="total"
                        onMouseEnter={onPieEnter}
                      >
                        {ventasPorTurno.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={index === 0 ? "#02b1c4" : "#17c3b2"} />
                        ))}
                      </Pie>
                    </PieChart>
                  </ResponsiveContainer>
                </div>
                <div className="flex flex-col justify-center space-y-6">
                  {ventasPorTurno.map((turno, index) => (
                    <div key={turno.turno} className="bg-gray-50 p-4 rounded-lg hover:shadow-md transition-all">
                      <div className="flex items-center gap-2 mb-2">
                        {index === 0 ? (
                          <SunIcon className="h-5 w-5 text-[#02b1c4]" />
                        ) : (
                          <MoonIcon className="h-5 w-5 text-[#17c3b2]" />
                        )}
                        <div className="text-base font-medium text-[#364f6b]">{turno.turno}</div>
                        <div className="ml-auto text-sm font-medium text-[#227c9d]">{turno.porcentaje}% del total</div>
                      </div>
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <div className="text-xs text-[#227c9d]">Ventas</div>
                          <div className="text-lg font-bold text-[#364f6b]">{formatEuro(turno.total)}</div>
                        </div>
                        <div>
                          <div className="text-xs text-[#227c9d]">Comandas</div>
                          <div className="text-lg font-bold text-[#364f6b]">{turno.comandas.toLocaleString()}</div>
                        </div>
                      </div>
                      <div className="mt-2">
                        <div className="text-xs text-[#227c9d] mb-1">Ticket medio</div>
                        <div className="text-sm font-medium text-[#364f6b]">
                          {formatEuro(turno.total / turno.comandas)}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Comparativa de unidades vendidas por categoría */}
          <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
            <CardHeader>
              <CardTitle className="text-lg font-semibold text-[#364f6b]">Ventas por Categoría</CardTitle>
            </CardHeader>
            <CardContent>
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
                    <Bar dataKey="unidadesVendidas" name="Unidades vendidas" radius={[0, 4, 4, 0]}>
                      {ventasPorCategoria.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                    <Bar dataKey="totalVentas" name="Ventas (€)" radius={[0, 4, 4, 0]}>
                      {ventasPorCategoria.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} fillOpacity={0.6} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>
        </>
      )}
    </div>
  )
}
