import { TicketsAnalisis } from "@/components/analysis/tickets-analisis"

export default function TicketsPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Análisis de Tickets</h1>
        <p className="text-xs text-[#227c9d]">Análisis detallado de tickets cerrados y comportamiento de ventas</p>
      </div>

      <TicketsAnalisis />
    </div>
  )
}
