"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  BarChart2,
  TrendingUp,
  Clock,
  Users,
  CreditCard,
  Calendar,
  DollarSign,
  Filter,
  Download,
  Search,
  CreditCardIcon as CardIcon,
  Banknote,
  Smartphone,
  Gift,
  PercentIcon,
  X,
} from "lucide-react"
import { mockTicketsCerradosData, type TicketCerradoData } from "@/lib/data"

export function TicketsAnalisis() {
  const [tickets, setTickets] = useState<TicketCerradoData[]>([])
  const [filteredTickets, setFilteredTickets] = useState<TicketCerradoData[]>([])
  const [dateRange, setDateRange] = useState<{ start: string; end: string }>({
    start: "2025-05-01",
    end: "2025-05-07",
  })
  const [searchTerm, setSearchTerm] = useState("")
  const [activeFilter, setActiveFilter] = useState<string | null>(null)

  // Cargar datos (simulados por ahora)
  useEffect(() => {
    // En una implementación real, aquí se llamaría a la API
    setTickets(mockTicketsCerradosData)
    setFilteredTickets(mockTicketsCerradosData)
  }, [])

  // Filtrar tickets por fecha y término de búsqueda
  useEffect(() => {
    let result = tickets

    // Filtrar por fecha
    if (dateRange.start && dateRange.end) {
      result = result.filter((ticket) => {
        const ticketDate = new Date(ticket.fecha_hora)
        return ticketDate >= new Date(dateRange.start) && ticketDate <= new Date(dateRange.end)
      })
    }

    // Filtrar por término de búsqueda
    if (searchTerm) {
      result = result.filter((ticket) => ticket.observaciones?.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    // Filtrar por filtro activo
    if (activeFilter) {
      switch (activeFilter) {
        case "tarjeta":
          result = result.filter((ticket) => ticket.metodo_pago === "Tarjeta")
          break
        case "efectivo":
          result = result.filter((ticket) => ticket.metodo_pago === "Efectivo")
          break
        case "bizum":
          result = result.filter((ticket) => ticket.metodo_pago === "Bizum")
          break
        case "propina":
          result = result.filter((ticket) => ticket.propina > 0)
          break
        case "descuento":
          result = result.filter((ticket) => ticket.descuento > 0)
          break
      }
    }

    setFilteredTickets(result)
  }, [tickets, dateRange, searchTerm, activeFilter])

  // Calcular métricas
  const totalTickets = filteredTickets.length
  const importeTotal = filteredTickets.reduce((sum, ticket) => sum + ticket.importe_total, 0)
  const ticketMedio = totalTickets > 0 ? importeTotal / totalTickets : 0
  const comensalesMedio =
    totalTickets > 0 ? filteredTickets.reduce((sum, ticket) => sum + ticket.num_comensales, 0) / totalTickets : 0
  const duracionMedia =
    totalTickets > 0 ? filteredTickets.reduce((sum, ticket) => sum + ticket.duracion_minutos, 0) / totalTickets : 0
  const propinaMedia =
    totalTickets > 0 ? filteredTickets.reduce((sum, ticket) => sum + ticket.propina, 0) / totalTickets : 0

  // Distribución por método de pago
  const metodoPagoDistribucion: Record<string, number> = {}
  filteredTickets.forEach((ticket) => {
    metodoPagoDistribucion[ticket.metodo_pago] = (metodoPagoDistribucion[ticket.metodo_pago] || 0) + 1
  })

  return (
    <div className="space-y-4">
      {/* Filtros y controles */}
      <Card className="p-4">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#02b1c4]" />
            <span className="text-xs font-medium text-[#364f6b]">Periodo:</span>
            <select
              className="text-xs border rounded-md p-1.5 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]"
              value={`${dateRange.start}|${dateRange.end}`}
              onChange={(e) => {
                const [start, end] = e.target.value.split("|")
                setDateRange({ start, end })
              }}
            >
              <option value="2025-05-01|2025-05-07">Última semana</option>
              <option value="2025-04-01|2025-05-07">Último mes</option>
              <option value="2025-02-01|2025-05-07">Último trimestre</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <div className="relative">
              <Search className="absolute left-2.5 top-2.5 h-3.5 w-3.5 text-[#227c9d]" />
              <input
                type="text"
                placeholder="Buscar en observaciones..."
                className="h-8 w-48 rounded-md border border-gray-200 bg-white pl-8 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-[#02b1c4]"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs h-8 gap-1 relative ${activeFilter ? "border-[#02b1c4] text-[#02b1c4]" : ""}`}
              onClick={() => setActiveFilter(activeFilter ? null : "tarjeta")}
            >
              <Filter className={`h-3.5 w-3.5 ${activeFilter ? "text-[#02b1c4]" : ""}`} />
              Filtros
              {activeFilter && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-[#02b1c4] text-[10px] text-white">
                  1
                </span>
              )}
            </Button>
            <Button variant="outline" size="sm" className="text-xs h-8 gap-1">
              <Download className="h-3.5 w-3.5" />
              Exportar
            </Button>
          </div>
        </div>

        {/* Filtros rápidos */}
        {activeFilter !== null && (
          <div className="flex flex-wrap gap-2 mt-3">
            <Button
              variant="outline"
              size="sm"
              className={`text-xs h-7 flex items-center gap-1.5 transition-all duration-200 ${
                activeFilter === "tarjeta"
                  ? "bg-[#02b1c4]/10 border-[#02b1c4] text-[#02b1c4] shadow-sm shadow-[#02b1c4]/20"
                  : ""
              }`}
              onClick={() => setActiveFilter(activeFilter === "tarjeta" ? null : "tarjeta")}
            >
              <CardIcon className="h-3 w-3" />
              Tarjeta
              {activeFilter === "tarjeta" && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#02b1c4] text-[10px] text-white">
                  <X className="h-2.5 w-2.5" />
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs h-7 flex items-center gap-1.5 transition-all duration-200 ${
                activeFilter === "efectivo"
                  ? "bg-[#02b1c4]/10 border-[#02b1c4] text-[#02b1c4] shadow-sm shadow-[#02b1c4]/20"
                  : ""
              }`}
              onClick={() => setActiveFilter(activeFilter === "efectivo" ? null : "efectivo")}
            >
              <Banknote className="h-3 w-3" />
              Efectivo
              {activeFilter === "efectivo" && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#02b1c4] text-[10px] text-white">
                  <X className="h-2.5 w-2.5" />
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs h-7 flex items-center gap-1.5 transition-all duration-200 ${
                activeFilter === "bizum"
                  ? "bg-[#02b1c4]/10 border-[#02b1c4] text-[#02b1c4] shadow-sm shadow-[#02b1c4]/20"
                  : ""
              }`}
              onClick={() => setActiveFilter(activeFilter === "bizum" ? null : "bizum")}
            >
              <Smartphone className="h-3 w-3" />
              Bizum
              {activeFilter === "bizum" && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#02b1c4] text-[10px] text-white">
                  <X className="h-2.5 w-2.5" />
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs h-7 flex items-center gap-1.5 transition-all duration-200 ${
                activeFilter === "propina"
                  ? "bg-[#02b1c4]/10 border-[#02b1c4] text-[#02b1c4] shadow-sm shadow-[#02b1c4]/20"
                  : ""
              }`}
              onClick={() => setActiveFilter(activeFilter === "propina" ? null : "propina")}
            >
              <Gift className="h-3 w-3" />
              Con propina
              {activeFilter === "propina" && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#02b1c4] text-[10px] text-white">
                  <X className="h-2.5 w-2.5" />
                </span>
              )}
            </Button>
            <Button
              variant="outline"
              size="sm"
              className={`text-xs h-7 flex items-center gap-1.5 transition-all duration-200 ${
                activeFilter === "descuento"
                  ? "bg-[#02b1c4]/10 border-[#02b1c4] text-[#02b1c4] shadow-sm shadow-[#02b1c4]/20"
                  : ""
              }`}
              onClick={() => setActiveFilter(activeFilter === "descuento" ? null : "descuento")}
            >
              <PercentIcon className="h-3 w-3" />
              Con descuento
              {activeFilter === "descuento" && (
                <span className="flex h-4 w-4 items-center justify-center rounded-full bg-[#02b1c4] text-[10px] text-white">
                  <X className="h-2.5 w-2.5" />
                </span>
              )}
            </Button>
          </div>
        )}
      </Card>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="Total Tickets"
          value={totalTickets.toString()}
          icon={<BarChart2 className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Importe Total"
          value={`€${importeTotal.toFixed(2)}`}
          icon={<DollarSign className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Ticket Medio"
          value={`€${ticketMedio.toFixed(2)}`}
          icon={<TrendingUp className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Comensales/Ticket"
          value={comensalesMedio.toFixed(1)}
          icon={<Users className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
        <MetricCard
          title="Duración Media"
          value={`${duracionMedia.toFixed(0)} min`}
          icon={<Clock className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Propina Media"
          value={`€${propinaMedia.toFixed(2)}`}
          icon={<DollarSign className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Método Pago Principal"
          value={Object.entries(metodoPagoDistribucion).sort((a, b) => b[1] - a[1])[0]?.[0] || "N/A"}
          icon={<CreditCard className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
      </div>

      {/* Tabla de tickets */}
      <Card className="p-4">
        <h3 className="text-sm font-medium text-[#364f6b] mb-3">Tickets Recientes</h3>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[700px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 text-xs font-medium text-[#364f6b]">Fecha</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Mesa</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Comensales</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Importe</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Método</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Duración</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Propina</th>
                <th className="text-left py-2 px-2 text-xs font-medium text-[#364f6b]">Observaciones</th>
              </tr>
            </thead>
            <tbody>
              {filteredTickets.map((ticket) => (
                <tr key={ticket.id} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-2 text-xs text-[#364f6b]">
                    {new Date(ticket.fecha_hora).toLocaleString("es-ES", {
                      day: "2-digit",
                      month: "2-digit",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                  <td className="py-2 px-2 text-xs text-center text-[#364f6b]">{ticket.id_mesa}</td>
                  <td className="py-2 px-2 text-xs text-center text-[#364f6b]">{ticket.num_comensales}</td>
                  <td className="py-2 px-2 text-xs text-center font-medium text-[#02b1c4]">
                    €{ticket.importe_total.toFixed(2)}
                  </td>
                  <td className="py-2 px-2 text-xs text-center text-[#364f6b]">{ticket.metodo_pago}</td>
                  <td className="py-2 px-2 text-xs text-center text-[#364f6b]">{ticket.duracion_minutos} min</td>
                  <td className="py-2 px-2 text-xs text-center text-[#364f6b]">
                    {ticket.propina > 0 ? `€${ticket.propina.toFixed(2)}` : "-"}
                  </td>
                  <td className="py-2 px-2 text-xs text-[#364f6b]">{ticket.observaciones || "-"}</td>
                </tr>
              ))}
              {filteredTickets.length === 0 && (
                <tr>
                  <td colSpan={8} className="py-4 text-center text-xs text-[#227c9d]">
                    No se encontraron tickets con los filtros aplicados
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </Card>

      {/* Gráficos y análisis */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3">Distribución por Método de Pago</h3>

          <div className="space-y-3">
            {Object.entries(metodoPagoDistribucion).map(([metodo, cantidad]) => (
              <div key={metodo}>
                <div className="flex justify-between items-center mb-1">
                  <span className="text-xs text-[#364f6b]">{metodo}</span>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-medium text-[#364f6b]">{cantidad}</span>
                    <span className="text-xs text-[#227c9d]">({((cantidad / totalTickets) * 100).toFixed(1)}%)</span>
                  </div>
                </div>
                <div className="w-full bg-gray-100 rounded-full h-1.5">
                  <div
                    className="bg-[#02b1c4] h-1.5 rounded-full"
                    style={{ width: `${(cantidad / totalTickets) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3">Desglose de Importes</h3>

          <div className="h-48 relative">
            {/* Gráfico de desglose (simplificado) */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-32 h-32 rounded-full border-8 border-[#02b1c4] relative">
                <div
                  className="absolute inset-0 border-8 border-transparent border-t-[#fe6d73] border-r-[#fe6d73]"
                  style={{ borderRadius: "50%", transform: "rotate(45deg)" }}
                ></div>
                <div
                  className="absolute inset-0 border-8 border-transparent border-b-[#ffcb77]"
                  style={{ borderRadius: "50%", transform: "rotate(45deg)" }}
                ></div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 flex justify-around">
              <div className="text-center">
                <div className="w-3 h-3 bg-[#02b1c4] rounded-full mx-auto"></div>
                <span className="text-[10px] text-[#364f6b] block mt-1">Comida</span>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-[#fe6d73] rounded-full mx-auto"></div>
                <span className="text-[10px] text-[#364f6b] block mt-1">Bebida</span>
              </div>
              <div className="text-center">
                <div className="w-3 h-3 bg-[#ffcb77] rounded-full mx-auto"></div>
                <span className="text-[10px] text-[#364f6b] block mt-1">Postre</span>
              </div>
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  icon?: React.ReactNode
}

function MetricCard({ title, value, icon }: MetricCardProps) {
  return (
    <Card className="p-2.5 relative transform scale-95 origin-top-left bg-gradient-to-br from-[#02b1c4]/[0.03] to-white">
      {icon && <div className="absolute top-2.5 right-2.5 bg-gray-50 rounded-full p-1.5 bg-opacity-70">{icon}</div>}

      <div className="mb-1 pr-7">
        <span className="text-xs font-medium text-[#364f6b]">{title}</span>
      </div>
      <div className="flex items-baseline">
        <span className="text-lg font-bold text-[#02b1c4]">{value}</span>
      </div>
    </Card>
  )
}
