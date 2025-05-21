"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MetricCard } from "@/components/ui/metric-card"
import { CalendarIcon, TrendingUpIcon, ShoppingBagIcon, CreditCardIcon } from "lucide-react"
import { PieChart, Pie, Cell, ResponsiveContainer, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip } from "recharts"
import { themeColors } from "@/lib/theme-config"
import { formatCurrency } from "@/lib/chart-utils"

// Datos de ejemplo - En una implementación real, estos vendrían de una API
const salesData = {
  totalSales: 124568,
  totalTickets: 1234,
  averageTicket: 101.25,
  salesGrowth: 12.5,
  ticketsGrowth: 8.3,
  averageGrowth: 3.8,

  shiftDistribution: [
    { name: "Mediodía", value: 52500, percentage: 42 },
    { name: "Noche", value: 72068, percentage: 58 },
  ],

  topProducts: [
    { name: "Hamburguesa Deluxe", sales: 18500, category: "Smart Food" },
    { name: "Menú Premium", sales: 15200, category: "Smart Menus" },
    { name: "Poke Bowl", sales: 12800, category: "Smart Pokes" },
    { name: "Ensalada César", sales: 9800, category: "Smart Food" },
    { name: "Pasta Carbonara", sales: 8900, category: "Smart Food" },
  ],
}

export function SalesOverview() {
  const [period, setPeriod] = useState("month")

  // Colores para el gráfico de distribución por turno
  const SHIFT_COLORS = [themeColors.primary, themeColors.secondary]

  // Colores para el gráfico de productos top
  const PRODUCT_COLORS = [
    themeColors.categories.food,
    themeColors.categories.service,
    themeColors.categories.experience,
    themeColors.categories.smartTables,
    themeColors.categories.cost,
  ]

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex justify-end">
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

      {/* KPIs Principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="VENTAS TOTALES"
          value={formatCurrency(salesData.totalSales)}
          change={salesData.salesGrowth}
          changeLabel="vs periodo anterior"
          icon={<ShoppingBagIcon className="h-5 w-5 text-[#02b1c4]" />}
        />

        <MetricCard
          title="TICKETS"
          value={salesData.totalTickets.toLocaleString()}
          change={salesData.ticketsGrowth}
          changeLabel="vs periodo anterior"
          icon={<CreditCardIcon className="h-5 w-5 text-[#02b1c4]" />}
        />

        <MetricCard
          title="PROMEDIO"
          value={formatCurrency(salesData.averageTicket)}
          change={salesData.averageGrowth}
          changeLabel="vs periodo anterior"
          icon={<TrendingUpIcon className="h-5 w-5 text-[#02b1c4]" />}
        />
      </div>

      {/* Gráficos */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Distribución por Turno */}
        <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Distribución por Turno</h3>
            <div className="h-[300px] flex items-center justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={salesData.shiftDistribution}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                    label={({ name, percentage }) => `${name}: ${percentage}%`}
                    labelLine={false}
                  >
                    {salesData.shiftDistribution.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={SHIFT_COLORS[index % SHIFT_COLORS.length]} />
                    ))}
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
            <div className="flex justify-center gap-8 mt-2">
              {salesData.shiftDistribution.map((entry, index) => (
                <div key={index} className="flex items-center gap-2">
                  <div
                    className="w-3 h-3 rounded-full"
                    style={{ backgroundColor: SHIFT_COLORS[index % SHIFT_COLORS.length] }}
                  />
                  <span className="text-sm text-[#364f6b]">
                    {entry.name}: {formatCurrency(entry.value)}
                  </span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Top Productos */}
        <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Top Productos</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart
                  data={salesData.topProducts}
                  layout="vertical"
                  margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                >
                  <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                  <XAxis
                    type="number"
                    stroke="#9ca3af"
                    fontSize={12}
                    tickFormatter={(value) => formatCurrency(value)}
                  />
                  <YAxis
                    dataKey="name"
                    type="category"
                    width={150}
                    stroke="#9ca3af"
                    fontSize={12}
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
                  <Bar dataKey="sales" radius={[0, 4, 4, 0]}>
                    {salesData.topProducts.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={PRODUCT_COLORS[index % PRODUCT_COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
