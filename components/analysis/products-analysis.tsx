"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MetricCard } from "@/components/ui/metric-card"
import { Search, CalendarIcon, TrendingUpIcon, AwardIcon, DollarSignIcon, TrendingDownIcon } from "lucide-react"
import {
  ResponsiveContainer,
  Treemap,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Cell,
  PieChart,
  Pie,
} from "recharts"
import { themeColors } from "@/lib/theme-config"
import { formatCurrency } from "@/lib/chart-utils"

// Datos de ejemplo - En una implementación real, estos vendrían de una API
const productsData = {
  starProduct: {
    name: "Hamburguesa Deluxe",
    category: "Smart Food",
    sales: 18500,
    units: 925,
    growth: 15.2,
  },
  mostProfitable: {
    name: "Menú Premium",
    category: "Smart Menus",
    sales: 15200,
    units: 380,
    growth: 8.7,
  },
  trend: {
    name: "Ensaladas",
    direction: "up",
    growth: 22.5,
  },

  productMap: [
    { name: "Hamburguesa Deluxe", category: "Smart Food", value: 18500, units: 925 },
    { name: "Menú Premium", category: "Smart Menus", value: 15200, units: 380 },
    { name: "Poke Bowl", category: "Smart Pokes", value: 12800, units: 640 },
    { name: "Ensalada César", category: "Smart Food", value: 9800, units: 490 },
    { name: "Pasta Carbonara", category: "Smart Food", value: 8900, units: 445 },
    { name: "Pizza Margarita", category: "Smart Food", value: 8200, units: 410 },
    { name: "Sushi Variado", category: "Smart Food", value: 7800, units: 260 },
    { name: "Menú Ejecutivo", category: "Smart Menus", value: 7500, units: 250 },
    { name: "Ensalada Mixta", category: "Smart Food", value: 6900, units: 345 },
    { name: "Tarta de Queso", category: "Smart Food", value: 6500, units: 325 },
    { name: "Café Premium", category: "Smart Drinks", value: 5800, units: 580 },
    { name: "Smoothie Verde", category: "Smart Drinks", value: 5200, units: 260 },
  ],

  categorySales: [
    { name: "Smart Food", value: 52300 },
    { name: "Smart Menus", value: 22700 },
    { name: "Smart Pokes", value: 12800 },
    { name: "Smart Drinks", value: 11000 },
    { name: "Smart Tables", value: 8500 },
  ],

  topProducts: [
    { name: "Hamburguesa Deluxe", sales: 18500, category: "Smart Food" },
    { name: "Menú Premium", sales: 15200, category: "Smart Menus" },
    { name: "Poke Bowl", sales: 12800, category: "Smart Pokes" },
    { name: "Ensalada César", sales: 9800, category: "Smart Food" },
    { name: "Pasta Carbonara", sales: 8900, category: "Smart Food" },
  ],
}

// Colores para categorías
const CATEGORY_COLORS = {
  "Smart Food": themeColors.categories.food,
  "Smart Menus": themeColors.categories.service,
  "Smart Pokes": themeColors.categories.experience,
  "Smart Drinks": themeColors.yellow,
  "Smart Tables": themeColors.categories.smartTables,
}

export function ProductsAnalysis() {
  const [period, setPeriod] = useState("month")
  const [category, setCategory] = useState("all")
  const [searchTerm, setSearchTerm] = useState("")

  // Filtrar productos por búsqueda
  const filteredProducts = productsData.productMap.filter(
    (product) =>
      product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.category.toLowerCase().includes(searchTerm.toLowerCase()),
  )

  // Datos para el treemap
  const treemapData = [
    {
      name: "Productos",
      children: filteredProducts.map((product) => ({
        name: product.name,
        category: product.category,
        size: product.value,
        units: product.units,
      })),
    },
  ]

  // Colores para el gráfico de categorías
  const COLORS = Object.values(CATEGORY_COLORS)

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="relative w-full sm:w-auto">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-[#227c9d]" />
          <input
            type="text"
            placeholder="Buscar producto..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="pl-10 pr-4 py-2 w-full sm:w-[300px] border border-gray-200 rounded-md text-sm focus:outline-none focus:ring-1 focus:ring-[#02b1c4]"
          />
        </div>

        <div className="flex items-center gap-4">
          <div className="flex items-center gap-2">
            <Select value={category} onValueChange={setCategory}>
              <SelectTrigger className="w-[180px] h-9 text-sm">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">Todas las categorías</SelectItem>
                <SelectItem value="food">Smart Food</SelectItem>
                <SelectItem value="menus">Smart Menus</SelectItem>
                <SelectItem value="pokes">Smart Pokes</SelectItem>
                <SelectItem value="drinks">Smart Drinks</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="flex items-center gap-2">
            <CalendarIcon className="h-4 w-4 text-[#227c9d]" />
            <Select value={period} onValueChange={setPeriod}>
              <SelectTrigger className="w-[180px] h-9 text-sm">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="week">Última semana</SelectItem>
                <SelectItem value="month">Último mes</SelectItem>
                <SelectItem value="quarter">Último trimestre</SelectItem>
                <SelectItem value="year">Último año</SelectItem>
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="PRODUCTO ESTRELLA"
          value={productsData.starProduct.name}
          subValue={formatCurrency(productsData.starProduct.sales)}
          footer={`${productsData.starProduct.units} unidades`}
          change={productsData.starProduct.growth}
          changeLabel="vs periodo anterior"
          icon={<AwardIcon className="h-5 w-5 text-[#ffcb77]" />}
        />

        <MetricCard
          title="MÁS RENTABLE"
          value={productsData.mostProfitable.name}
          subValue={formatCurrency(productsData.mostProfitable.sales)}
          footer={`${productsData.mostProfitable.units} unidades`}
          change={productsData.mostProfitable.growth}
          changeLabel="vs periodo anterior"
          icon={<DollarSignIcon className="h-5 w-5 text-[#17c3b2]" />}
        />

        <MetricCard
          title="TENDENCIA"
          value={productsData.trend.name}
          change={productsData.trend.growth}
          changeLabel="crecimiento"
          icon={
            productsData.trend.direction === "up" ? (
              <TrendingUpIcon className="h-5 w-5 text-[#17c3b2]" />
            ) : (
              <TrendingDownIcon className="h-5 w-5 text-[#fe6d73]" />
            )
          }
        />
      </div>

      {/* Mapa de Productos */}
      <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Mapa de Productos</h3>
          <div className="h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <Treemap
                data={treemapData}
                dataKey="size"
                aspectRatio={4 / 3}
                stroke="#fff"
                fill="#8884d8"
                content={({ root, depth, x, y, width, height, index, payload, colors, rank, name }) => {
                  const item = root.children?.[index] || {}
                  const category = item.category as keyof typeof CATEGORY_COLORS
                  const color = CATEGORY_COLORS[category] || themeColors.primary

                  return (
                    <g>
                      <rect
                        x={x}
                        y={y}
                        width={width}
                        height={height}
                        style={{
                          fill: color,
                          stroke: "#fff",
                          strokeWidth: 2,
                          fillOpacity: 0.8,
                        }}
                      />
                      {width > 50 && height > 30 && (
                        <>
                          <text
                            x={x + width / 2}
                            y={y + height / 2 - 8}
                            textAnchor="middle"
                            fill="#fff"
                            fontSize={12}
                            fontWeight="bold"
                          >
                            {item.name}
                          </text>
                          <text x={x + width / 2} y={y + height / 2 + 8} textAnchor="middle" fill="#fff" fontSize={10}>
                            {formatCurrency(item.size)}
                          </text>
                        </>
                      )}
                    </g>
                  )
                }}
              >
                <Tooltip
                  content={({ payload }) => {
                    if (payload && payload.length > 0) {
                      const item = payload[0].payload
                      return (
                        <div className="bg-white p-3 rounded-md shadow-md border border-gray-100">
                          <p className="font-medium">{item.name}</p>
                          <p className="text-sm text-[#227c9d]">{item.category}</p>
                          <p className="text-sm mt-1">Ventas: {formatCurrency(item.size)}</p>
                          <p className="text-sm">Unidades: {item.units}</p>
                        </div>
                      )
                    }
                    return null
                  }}
                />
              </Treemap>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos secundarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Top 5 Productos */}
        <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Top 5 Productos</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={productsData.topProducts}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" horizontal={true} vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    type="number"
                    stroke="#9ca3af"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={150}
                    stroke="#9ca3af"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => (value.length > 15 ? `${value.substring(0, 15)}...` : value)}
                  />
                  <Tooltip
                    formatter={(value) => formatCurrency(value as number)}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                    }}
                  />
                  <Bar dataKey="sales" radius={[0, 4, 4, 0]} barSize={30}>
                    {productsData.topProducts.map((entry, index) => {
                      const category = entry.category as keyof typeof CATEGORY_COLORS
                      return <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[category] || themeColors.primary} />
                    })}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Ventas por Categoría */}
        <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Ventas por Categoría</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={productsData.categorySales}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={120}
                    fill="#8884d8"
                    dataKey="value"
                    label={({ name, percent }) => `${name}: ${(percent * 100).toFixed(0)}%`}
                  >
                    {productsData.categorySales.map((entry, index) => {
                      const category = entry.name as keyof typeof CATEGORY_COLORS
                      return (
                        <Cell key={`cell-${index}`} fill={CATEGORY_COLORS[category] || COLORS[index % COLORS.length]} />
                      )
                    })}
                  </Pie>
                  <Tooltip
                    formatter={(value) => formatCurrency(value as number)}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                    }}
                  />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="flex flex-wrap justify-center gap-4 mt-2">
              {productsData.categorySales.map((entry, index) => {
                const category = entry.name as keyof typeof CATEGORY_COLORS
                return (
                  <div key={index} className="flex items-center gap-2">
                    <div
                      className="w-3 h-3 rounded-full"
                      style={{ backgroundColor: CATEGORY_COLORS[category] || COLORS[index % COLORS.length] }}
                    />
                    <span className="text-sm text-[#364f6b]">
                      {entry.name}: {formatCurrency(entry.value)}
                    </span>
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
