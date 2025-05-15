"use client"

import { Card } from "@/components/ui/card"
import { ArrowUp, ArrowDown } from "lucide-react"
import { cn } from "@/lib/utils"
import type { ReactNode } from "react"

interface MetricCardProps {
  title: string
  value: string
  subValue?: string
  change?: number
  changeLabel?: string
  footer?: string
  negative?: boolean
  action?: string
  icon?: ReactNode
  className?: string
  onClick?: () => void
}

export function MetricCard({
  title,
  value,
  subValue,
  change,
  changeLabel,
  footer,
  negative,
  action,
  icon,
  className,
  onClick,
}: MetricCardProps) {
  // Determinar el color de fondo basado en si es negativo o no
  const bgColorClass = negative
    ? "bg-gradient-to-br from-[#fe6d73]/[0.03] to-white"
    : "bg-gradient-to-br from-[#02b1c4]/[0.03] to-white"

  return (
    <Card
      className={cn(
        `p-3 relative transform scale-95 origin-top-left ${bgColorClass} transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20 hover:-translate-y-0.5 hover:shadow-lg`,
        onClick ? "cursor-pointer" : "",
        className,
      )}
      onClick={onClick}
    >
      {/* Icono en la esquina superior derecha con mejor margen */}
      {icon && (
        <div className="absolute top-2.5 right-2.5 bg-gray-50 rounded-full p-1.5 bg-opacity-70 transition-all duration-300 group-hover:bg-opacity-100 group-hover:scale-110">
          {icon}
        </div>
      )}

      <div className="mb-1 pr-7">
        <span className="text-sm font-medium text-[#364f6b] transition-colors duration-300 group-hover:text-[#02b1c4]">
          {title}
        </span>
      </div>
      <div className="flex items-baseline">
        <span className="text-xl font-bold text-[#02b1c4] transition-all duration-300 group-hover:text-[#17c3b2] group-hover:translate-x-0.5 leading-tight">
          {value}
        </span>
        {subValue && <span className="text-sm ml-1 text-[#227c9d]">{subValue}</span>}
      </div>
      {change !== undefined && (
        <div className="flex items-center mt-1">
          {change > 0 ? (
            <ArrowUp className="h-3 w-3 text-[#17c3b2] mr-1 transition-transform duration-300 group-hover:scale-110" />
          ) : (
            <ArrowDown className="h-3 w-3 text-[#fe6d73] mr-1 transition-transform duration-300 group-hover:scale-110" />
          )}
          <span
            className={cn(
              "text-sm transition-colors duration-300 leading-tight",
              change > 0 ? "text-[#17c3b2]" : "text-[#fe6d73]",
              negative && change > 0 ? "text-[#fe6d73]" : "",
              negative && change <= 0 ? "text-[#17c3b2]" : "",
            )}
          >
            {change > 0 ? "+" : ""}
            {change}% {changeLabel}
          </span>
        </div>
      )}
      {footer && (
        <div className="mt-1.5 text-sm text-[#227c9d] transition-colors duration-300 group-hover:text-[#364f6b] leading-tight">
          {footer}
        </div>
      )}
      {action && (
        <div className="mt-1.5 flex justify-end">
          <span className="text-sm text-[#02b1c4] cursor-pointer transition-all duration-300 group-hover:text-[#17c3b2] group-hover:underline">
            {action}
          </span>
        </div>
      )}
    </Card>
  )
}
