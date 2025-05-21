"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MetricCard } from "@/components/ui/metric-card"
import { CalendarIcon, TrendingUpIcon, ClockIcon } from "lucide-react"
import {
  LineChart,
  Line,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import { themeColors } from "@/lib/theme-config"
import { formatCurrency } from "@/lib/chart-utils"

// Datos de ejemplo - En una implementación real, estos vendrían de una API
const evolutionData = {
  bestDay: {
    day: "Viernes",
    sales: 8456,
    growth: 15.2,
  },
  bestHour: {
    hour: "20:00 - 21:00",
    sales: 1234,
    growth: 8.7,
  },

  dailySales: [
    { date: "2025-05-01", sales: 4200, tickets: 42 },
    { date: "2025-05-02", sales: 4800, tickets: 48 },
    { date: "2025-05-03", sales: 6500, tickets: 65 },
    { date: "2025-05-04", sales: 5800, tickets: 58 },
    { date: "2025-05-05", sales: 4300, tickets: 43 },
    { date: "2025-05-06", sales: 4900, tickets: 49 },
    { date: "2025-05-07", sales: 5200, tickets: 52 },
    { date: "2025-05-08", sales: 5600, tickets: 56 },
    { date: "2025-05-09", sales: 6800, tickets: 68 },
    { date: "2025-05-10", sales: 7200, tickets: 72 },
    { date: "2025-05-11", sales: 6300, tickets: 63 },
    { date: "2025-05-12", sales: 5100, tickets: 51 },
    { date: "2025-05-13", sales: 5400, tickets: 54 },
    { date: "2025-05-14", sales: 5700, tickets: 57 },
  ],

  weekdaySales: [
    { day: "Lunes", sales: 15200, tickets: 152 },
    { day: "Martes", sales: 14800, tickets: 148 },
    { day: "Miércoles", sales: 16500, tickets: 165 },
    { day: "Jueves", sales: 18200, tickets: 182 },
    { day: "Viernes", sales: 25400, tickets: 254 },
    { day: "Sábado", sales: 22800, tickets: 228 },
    { day: "Domingo", sales: 19600, tickets: 196 },
  ],
}

export function SalesEvolution() {
  const [timeframe, setTimeframe] = useState("day")

  // Formatear fecha para mostrar solo el día
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.getDate()
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex justify-between items-center">
        <div className="flex gap-2">
          <button
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              timeframe === "day" ? "bg-[#02b1c4] text-white" : "bg-gray-100 text-[#364f6b] hover:bg-gray-200"
            }`}
            onClick={() => setTimeframe("day")}
          >
            Día
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              timeframe === "week" ? "bg-[#02b1c4] text-white" : "bg-gray-100 text-[#364f6b] hover:bg-gray-200"
            }`}
            onClick={() => setTimeframe("week")}
          >
            Semana
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              timeframe === "month" ? "bg-[#02b1c4] text-white" : "bg-gray-100 text-[#364f6b] hover:bg-gray-200"
            }`}
            onClick={() => setTimeframe("month")}
          >
            Mes
          </button>
          <button
            className={`px-4 py-2 text-sm rounded-md transition-colors ${
              timeframe === "quarter" ? "bg-[#02b1c4] text-white" : "bg-gray-100 text-[#364f6b] hover:bg-gray-200"
            }`}
            onClick={() => setTimeframe("quarter")}
          >
            Trimestre
          </button>
        </div>

        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-[#227c9d]" />
          <Select defaultValue="may">
            <SelectTrigger className="w-[180px] h-9 text-sm">
              <SelectValue placeholder="Seleccionar mes" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="may">Mayo 2025</SelectItem>
              <SelectItem value="apr">Abril 2025</SelectItem>
              <SelectItem value="mar">Marzo 2025</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <MetricCard
          title="MEJOR DÍA"
          value={evolutionData.bestDay.day}
          subValue={formatCurrency(evolutionData.bestDay.sales)}
          change={evolutionData.bestDay.growth}
          changeLabel="vs promedio"
          icon={<TrendingUpIcon className="h-5 w-5 text-[#02b1c4]" />}
        />

        <MetricCard
          title="MEJOR HORA"
          value={evolutionData.bestHour.hour}
          subValue={formatCurrency(evolutionData.bestHour.sales) + "/hora"}
          change={evolutionData.bestHour.growth}
          changeLabel="vs promedio"
          icon={<ClockIcon className="h-5 w-5 text-[#02b1c4]" />}
        />
      </div>

      {/* Gráfico principal de evolución */}
      <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Evolución de Ventas</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={evolutionData.dailySales} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                <defs>
                  <linearGradient id="colorSales" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor={themeColors.primary} stopOpacity={0.8} />
                    <stop offset="95%" stopColor={themeColors.primary} stopOpacity={0.1} />
                  </linearGradient>
                </defs>
                <XAxis
                  dataKey="date"
                  tickFormatter={formatDate}
                  stroke="#9ca3af"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  padding={{ left: 10, right: 10 }}
                />
                <YAxis
                  stroke="#9ca3af"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value / 1000}k`}
                />
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <Tooltip
                  formatter={(value) => formatCurrency(value as number)}
                  labelFormatter={(label) => {
                    const date = new Date(label)
                    return date.toLocaleDateString("es-ES", {
                      weekday: "long",
                      year: "numeric",
                      month: "long",
                      day: "numeric",
                    })
                  }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                  }}
                />
                <Area
                  type="monotone"
                  dataKey="sales"
                  stroke={themeColors.primary}
                  fillOpacity={1}
                  fill="url(#colorSales)"
                  strokeWidth={3}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos secundarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Ventas por día de la semana */}
        <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Ventas por Día de Semana</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={evolutionData.weekdaySales} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis dataKey="day" stroke="#9ca3af" fontSize={12} axisLine={false} tickLine={false} />
                  <YAxis
                    stroke="#9ca3af"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value / 1000}k`}
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
                  <Bar dataKey="sales" fill={themeColors.primary} radius={[4, 4, 0, 0]} barSize={30}>
                    {evolutionData.weekdaySales.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={
                          entry.day === "Viernes" || entry.day === "Sábado"
                            ? themeColors.primary
                            : themeColors.secondary
                        }
                      />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </CardContent>
        </Card>

        {/* Tickets vs Ventas */}
        <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Tickets vs Ventas</h3>
            <div className="h-[300px]">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={evolutionData.dailySales} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                  <XAxis
                    dataKey="date"
                    tickFormatter={formatDate}
                    stroke="#9ca3af"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <YAxis
                    yAxisId="left"
                    stroke="#9ca3af"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                    tickFormatter={(value) => `${value / 1000}k`}
                  />
                  <YAxis
                    yAxisId="right"
                    orientation="right"
                    stroke="#9ca3af"
                    fontSize={12}
                    axisLine={false}
                    tickLine={false}
                  />
                  <Tooltip
                    formatter={(value, name) => {
                      if (name === "sales") return formatCurrency(value as number)
                      return value
                    }}
                    labelFormatter={(label) => {
                      const date = new Date(label)
                      return date.toLocaleDateString("es-ES", {
                        weekday: "long",
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })
                    }}
                    contentStyle={{
                      borderRadius: "8px",
                      border: "none",
                      boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                      backgroundColor: "white",
                    }}
                  />
                  <Line
                    yAxisId="left"
                    type="monotone"
                    dataKey="sales"
                    stroke={themeColors.primary}
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                  <Line
                    yAxisId="right"
                    type="monotone"
                    dataKey="tickets"
                    stroke={themeColors.accent}
                    strokeWidth={3}
                    dot={{ r: 0 }}
                    activeDot={{ r: 6, strokeWidth: 0 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </div>
            <div className="flex justify-center gap-8 mt-4">
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColors.primary }} />
                <span className="text-sm text-[#364f6b]">Ventas (€)</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 rounded-full" style={{ backgroundColor: themeColors.accent }} />
                <span className="text-sm text-[#364f6b]">Tickets</span>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
