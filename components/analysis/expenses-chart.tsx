"use client"

import { BarChart } from "@/components/ui/bar-chart"
import { Card } from "@/components/ui/card"
import { CreditCard } from "lucide-react"
import { formatCurrency } from "@/lib/chart-utils"
import { themeColors } from "@/lib/theme-config"

interface ExpensesData {
  dia: string
  valor: number
  personal: number
  materia: number
  otros: number
}

interface ExpensesChartProps {
  data: ExpensesData[]
  title?: string
  height?: number
}

export function ExpensesChart({ data, title = "Gastos Diarios (Última Semana)", height = 240 }: ExpensesChartProps) {
  return (
    <Card className="p-5 transition-all duration-300 hover:shadow-md hover:border-[#fe6d73]/20 hover:-translate-y-0.5 hover:shadow-lg">
      <h3 className="text-sm font-medium text-[#364f6b] mb-4 flex items-center">
        <CreditCard className="h-4 w-4 mr-2 text-[#fe6d73]" />
        {title}
      </h3>

      <BarChart
        data={data}
        getLabel={(item) => item.dia}
        getValue={(item) => item.valor}
        getColor={(_, index, isActive) =>
          isActive ? themeColors.accent : `${themeColors.accent}${index % 2 === 0 ? "cc" : "99"}`
        }
        height={height}
        gap={12} // Más espacio entre barras
        barRadius={12} // Esquinas más redondeadas
        renderTooltip={(item) => (
          <>
            <div className="text-sm font-bold text-[#364f6b] mb-2">{item.dia}</div>
            <div className="text-xs text-[#364f6b] space-y-1">
              <div className="flex justify-between">
                <span>Total:</span>
                <span className="font-medium">{formatCurrency(item.valor)}</span>
              </div>
              <div className="flex justify-between">
                <span>Personal:</span>
                <span className="font-medium">{formatCurrency(item.personal)}</span>
              </div>
              <div className="flex justify-between">
                <span>Materia prima:</span>
                <span className="font-medium">{formatCurrency(item.materia)}</span>
              </div>
              <div className="flex justify-between">
                <span>Otros:</span>
                <span className="font-medium">{formatCurrency(item.otros)}</span>
              </div>
            </div>
          </>
        )}
      />
    </Card>
  )
}
