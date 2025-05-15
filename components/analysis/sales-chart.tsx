"use client"

import { BarChart } from "@/components/ui/bar-chart"
import { Card } from "@/components/ui/card"
import { TrendingUp } from "lucide-react"
import { formatCurrency } from "@/lib/chart-utils"
import { themeColors } from "@/lib/theme-config"

interface SalesData {
  dia: string
  valor: number
  comensales: number
  ticketMedio: number
}

interface SalesChartProps {
  data: SalesData[]
  title?: string
  height?: number
}

export function SalesChart({ data, title = "Ventas Diarias (Última Semana)", height = 240 }: SalesChartProps) {
  return (
    <Card className="p-5 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20 hover:-translate-y-0.5 hover:shadow-lg">
      <h3 className="text-sm font-medium text-[#364f6b] mb-4 flex items-center">
        <TrendingUp className="h-4 w-4 mr-2 text-[#02b1c4]" />
        {title}
      </h3>

      <BarChart
        data={data}
        getLabel={(item) => item.dia}
        getValue={(item) => item.valor}
        getColor={(_, index, isActive) =>
          isActive ? themeColors.secondary : `${themeColors.primary}${index % 2 === 0 ? "" : "cc"}`
        }
        height={height}
        gap={12} // Más espacio entre barras
        barRadius={12} // Esquinas más redondeadas
        renderTooltip={(item) => (
          <>
            <div className="text-sm font-bold text-[#364f6b] mb-2">{item.dia}</div>
            <div className="text-xs text-[#364f6b] space-y-1">
              <div className="flex justify-between">
                <span>Ventas:</span>
                <span className="font-medium">{formatCurrency(item.valor)}</span>
              </div>
              <div className="flex justify-between">
                <span>Comensales:</span>
                <span className="font-medium">{item.comensales}</span>
              </div>
              <div className="flex justify-between">
                <span>Ticket medio:</span>
                <span className="font-medium">{formatCurrency(item.ticketMedio)}</span>
              </div>
            </div>
          </>
        )}
      />
    </Card>
  )
}
