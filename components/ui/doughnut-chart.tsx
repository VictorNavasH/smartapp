"use client"
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts"
import { ChartContainer } from "@/components/ui/chart"
import { formatPercentage } from "@/lib/chart-utils"

export interface DoughnutChartData {
  name: string
  value: number
  color: string
}

interface DoughnutChartProps {
  data: DoughnutChartData[]
  title?: string
  valuePrefix?: string
  valueSuffix?: string
  formatValue?: (value: number) => string
  innerRadius?: number
  outerRadius?: number
  className?: string
  showLegend?: boolean
  showLabels?: boolean
  showTooltip?: boolean
  height?: number
}

export function DoughnutChart({
  data,
  title,
  valuePrefix = "",
  valueSuffix = "",
  formatValue,
  innerRadius = 60,
  outerRadius = 80,
  className = "",
  showLegend = true,
  showLabels = false,
  showTooltip = true,
  height = 300,
}: DoughnutChartProps) {
  // Calcular el total para los porcentajes
  const total = data.reduce((sum, entry) => sum + entry.value, 0)

  // Crear configuración para el ChartContainer
  const chartConfig = data.reduce((config, item) => {
    return {
      ...config,
      [item.name]: {
        label: item.name,
        color: item.color,
      },
    }
  }, {})

  // Función para formatear el valor según el tipo
  const formatValueFn = formatValue || ((value: number) => `${valuePrefix}${value}${valueSuffix}`)

  // Renderizador de etiquetas personalizado
  const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index, name }: any) => {
    const RADIAN = Math.PI / 180
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5
    const x = cx + radius * Math.cos(-midAngle * RADIAN)
    const y = cy + radius * Math.sin(-midAngle * RADIAN)

    return showLabels ? (
      <text
        x={x}
        y={y}
        fill="#364f6b"
        textAnchor={x > cx ? "start" : "end"}
        dominantBaseline="central"
        className="text-xs font-medium"
      >
        {`${name} (${formatPercentage(percent * 100, 0)})`}
      </text>
    ) : null
  }

  // Componente de tooltip personalizado
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload
      return (
        <div className="bg-white p-2 border rounded-md shadow-sm">
          <p className="text-sm font-medium text-[#364f6b]">{data.name}</p>
          <p className="text-sm text-[#227c9d]">
            {formatValueFn(data.value)} ({formatPercentage((data.value / total) * 100, 1)})
          </p>
        </div>
      )
    }
    return null
  }

  return (
    <div className={`w-full ${className}`}>
      {title && <h3 className="text-sm font-medium text-[#364f6b] mb-2">{title}</h3>}
      <div style={{ width: "100%", height }}>
        <ChartContainer config={chartConfig} className="h-full">
          <ResponsiveContainer width="100%" height="100%">
            <PieChart>
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={showLabels}
                label={renderCustomizedLabel}
                innerRadius={innerRadius}
                outerRadius={outerRadius}
                fill="#8884d8"
                paddingAngle={2}
                dataKey="value"
              >
                {data.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              {showTooltip && <Tooltip content={<CustomTooltip />} />}
              {showLegend && (
                <Legend
                  layout="horizontal"
                  verticalAlign="bottom"
                  align="center"
                  formatter={(value, entry, index) => <span className="text-sm text-[#364f6b]">{value}</span>}
                />
              )}
            </PieChart>
          </ResponsiveContainer>
        </ChartContainer>
      </div>
      <div className="mt-2 grid grid-cols-2 gap-2">
        <div className="text-center">
          <p className="text-sm text-[#227c9d]">Total</p>
          <p className="text-lg font-bold text-[#364f6b]">{formatValueFn(total)}</p>
        </div>
        <div className="text-center">
          <p className="text-sm text-[#227c9d]">Promedio</p>
          <p className="text-lg font-bold text-[#364f6b]">{formatValueFn(total / (data.length || 1))}</p>
        </div>
      </div>
    </div>
  )
}
