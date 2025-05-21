"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { MetricCard } from "@/components/ui/metric-card"
import { CalendarIcon, CreditCardIcon, ShoppingCartIcon, SunIcon, MoonIcon } from "lucide-react"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Cell,
  LineChart,
  Line,
} from "recharts"
import { themeColors } from "@/lib/theme-config"
import { formatCurrency } from "@/lib/chart-utils"

// Datos de ejemplo - En una implementación real, estos vendrían de una API
const ticketsData = {
  averageTicket: 101.25,
  averageGrowth: 3.8,
  itemsPerTicket: 4.2,
  itemsGrowth: 0.5,
  lunchTicket: 85.3,
  dinnerTicket: 115.75,

  ticketDistribution: [
    { range: "0-30€", count: 120, percentage: 9.7 },
    { range: "30-60€", count: 285, percentage: 23.1 },
    { range: "60-90€", count: 345, percentage: 28.0 },
    { range: "90-120€", count: 254, percentage: 20.6 },
    { range: "120-150€", count: 142, percentage: 11.5 },
    { range: "150-200€", count: 65, percentage: 5.3 },
    { range: ">200€", count: 23, percentage: 1.9 },
  ],

  topTickets: [
    {
      id: "T-12458",
      date: "2025-05-10",
      time: "21:15",
      amount: 285.5,
      items: 8,
      categories: ["Smart Food", "Smart Drinks"],
      shift: "Cena",
    },
    {
      id: "T-12302",
      date: "2025-05-08",
      time: "14:30",
      amount: 245.75,
      items: 6,
      categories: ["Smart Menus", "Smart Drinks"],
      shift: "Comida",
    },
    {
      id: "T-12489",
      date: "2025-05-11",
      time: "22:00",
      amount: 235.25,
      items: 7,
      categories: ["Smart Food", "Smart Pokes"],
      shift: "Cena",
    },
    {
      id: "T-12125",
      date: "2025-05-05",
      time: "13:45",
      amount: 225.0,
      items: 5,
      categories: ["Smart Menus"],
      shift: "Comida",
    },
    {
      id: "T-12356",
      date: "2025-05-09",
      time: "20:30",
      amount: 215.8,
      items: 6,
      categories: ["Smart Food", "Smart Drinks"],
      shift: "Cena",
    },
  ],

  ticketTrend: [
    { date: "2025-05-01", average: 95.2 },
    { date: "2025-05-02", average: 97.5 },
    { date: "2025-05-03", average: 105.3 },
    { date: "2025-05-04", average: 102.8 },
    { date: "2025-05-05", average: 98.5 },
    { date: "2025-05-06", average: 99.7 },
    { date: "2025-05-07", average: 100.2 },
    { date: "2025-05-08", average: 103.5 },
    { date: "2025-05-09", average: 108.7 },
    { date: "2025-05-10", average: 110.2 },
    { date: "2025-05-11", average: 105.8 },
    { date: "2025-05-12", average: 101.3 },
    { date: "2025-05-13", average: 102.5 },
    { date: "2025-05-14", average: 103.7 },
  ],
}

export function TicketsAnalysis() {
  const [period, setPeriod] = useState("month")

  // Formatear fecha para mostrar solo el día
  const formatDate = (dateStr: string) => {
    const date = new Date(dateStr)
    return date.getDate()
  }

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

      {/* KPIs */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <MetricCard
          title="TICKET MEDIO"
          value={formatCurrency(ticketsData.averageTicket)}
          change={ticketsData.averageGrowth}
          changeLabel="vs periodo anterior"
          icon={<CreditCardIcon className="h-5 w-5 text-[#02b1c4]" />}
        />

        <MetricCard
          title="ITEMS/TICKET"
          value={ticketsData.itemsPerTicket.toString()}
          change={ticketsData.itemsGrowth}
          changeLabel="vs periodo anterior"
          icon={<ShoppingCartIcon className="h-5 w-5 text-[#02b1c4]" />}
        />

        <MetricCard
          title="MEDIODÍA/NOCHE"
          value={`${formatCurrency(ticketsData.lunchTicket)} / ${formatCurrency(ticketsData.dinnerTicket)}`}
          footer="Ticket medio por turno"
          icon={
            <div className="flex">
              <SunIcon className="h-5 w-5 text-[#ffcb77] mr-1" />
              <MoonIcon className="h-5 w-5 text-[#227c9d]" />
            </div>
          }
        />
      </div>

      {/* Distribución de Tickets */}
      <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Distribución de Tickets por Importe</h3>
          <div className="h-[350px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={ticketsData.ticketDistribution} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#f0f0f0" />
                <XAxis dataKey="range" stroke="#9ca3af" fontSize={12} axisLine={false} tickLine={false} />
                <YAxis stroke="#9ca3af" fontSize={12} axisLine={false} tickLine={false} />
                <Tooltip
                  formatter={(value, name, props) => {
                    if (name === "count") return [`${value} tickets`, "Cantidad"]
                    if (name === "percentage") return [`${value}%`, "Porcentaje"]
                    return [value, name]
                  }}
                  contentStyle={{
                    borderRadius: "8px",
                    border: "none",
                    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "white",
                  }}
                />
                <Bar dataKey="count" fill={themeColors.primary} radius={[4, 4, 0, 0]} barSize={40}>
                  {ticketsData.ticketDistribution.map((entry, index) => (
                    <Cell
                      key={`cell-${index}`}
                      fill={
                        index < 2
                          ? themeColors.categories.food
                          : index < 4
                            ? themeColors.primary
                            : themeColors.secondary
                      }
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2 text-sm text-[#227c9d]">
            Distribución basada en {ticketsData.ticketDistribution.reduce((sum, item) => sum + item.count, 0)} tickets
          </div>
        </CardContent>
      </Card>

      {/* Evolución del Ticket Medio */}
      <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Evolución del Ticket Medio</h3>
          <div className="h-[300px]">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={ticketsData.ticketTrend} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
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
                  stroke="#9ca3af"
                  fontSize={12}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(value) => `${value}€`}
                  domain={["dataMin - 5", "dataMax + 5"]}
                />
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
                <Line
                  type="monotone"
                  dataKey="average"
                  stroke={themeColors.primary}
                  strokeWidth={3}
                  dot={{ r: 0 }}
                  activeDot={{ r: 6, strokeWidth: 0 }}
                />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </CardContent>
      </Card>

      {/* Tickets Destacados */}
      <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Tickets Destacados</h3>
          <div className="space-y-4">
            {ticketsData.topTickets.map((ticket, index) => (
              <div
                key={ticket.id}
                className="p-4 rounded-lg bg-gray-50 hover:bg-gray-100 transition-colors flex flex-col md:flex-row md:items-center gap-4"
              >
                <div className="flex-shrink-0 w-16 h-16 rounded-full bg-[#02b1c4]/10 flex items-center justify-center">
                  <span className="text-xl font-bold text-[#02b1c4]">#{index + 1}</span>
                </div>

                <div className="flex-grow">
                  <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
                    <div>
                      <h4 className="font-medium text-[#364f6b]">{ticket.id}</h4>
                      <p className="text-sm text-[#227c9d]">
                        {new Date(ticket.date).toLocaleDateString("es-ES", { day: "numeric", month: "short" })} •{" "}
                        {ticket.time} • {ticket.shift}
                      </p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-bold text-[#364f6b]">{formatCurrency(ticket.amount)}</p>
                      <p className="text-sm text-[#227c9d]">{ticket.items} items</p>
                    </div>
                  </div>

                  <div className="mt-2 flex flex-wrap gap-2">
                    {ticket.categories.map((category, catIndex) => (
                      <span
                        key={catIndex}
                        className="px-2 py-1 text-xs rounded-full"
                        style={{
                          backgroundColor: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS] + "20",
                          color: CATEGORY_COLORS[category as keyof typeof CATEGORY_COLORS],
                        }}
                      >
                        {category}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}

// Colores para categorías
const CATEGORY_COLORS = {
  "Smart Food": themeColors.categories.food,
  "Smart Menus": themeColors.categories.service,
  "Smart Pokes": themeColors.categories.experience,
  "Smart Drinks": themeColors.yellow,
  "Smart Tables": themeColors.categories.smartTables,
}
