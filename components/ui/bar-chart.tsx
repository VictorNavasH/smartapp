"use client"

import type React from "react"

import { useState } from "react"
import { Info } from "lucide-react"
import { motion } from "framer-motion"

interface BarChartProps<T> {
  data: T[]
  getLabel: (item: T) => string
  getValue: (item: T) => number
  getColor?: (item: T, index: number, isActive: boolean) => string
  height?: number
  showTooltip?: boolean
  renderTooltip?: (item: T) => React.ReactNode
  onBarClick?: (item: T, index: number) => void
  gap?: number
  barRadius?: number
}

export function BarChart<T>({
  data,
  getLabel,
  getValue,
  getColor = (_, index, isActive) => (isActive ? "#17c3b2" : "#02b1c4"),
  height = 200,
  showTooltip = true,
  renderTooltip,
  onBarClick,
  gap = 8, // Espacio entre barras (en píxeles)
  barRadius = 8, // Radio de las esquinas (en píxeles)
}: BarChartProps<T>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Calcular el valor máximo para escalar las barras
  const maxValue = Math.max(...data.map(getValue))

  return (
    <div className="w-full">
      <div className="flex items-end justify-between relative" style={{ height: `${height}px`, gap: `${gap}px` }}>
        {data.map((item, index) => {
          const value = getValue(item)
          const label = getLabel(item)
          const isActive = activeIndex === index
          const barHeight = `${(value / maxValue) * 100}%`
          const barColor = getColor(item, index, isActive)

          return (
            <div
              key={index}
              className="relative h-full flex-1 flex flex-col justify-end group"
              onMouseEnter={() => setActiveIndex(index)}
              onMouseLeave={() => setActiveIndex(null)}
              onClick={() => onBarClick?.(item, index)}
            >
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{
                  height: barHeight,
                  opacity: 1,
                  scale: isActive ? 1.05 : 1,
                }}
                transition={{
                  duration: 0.5,
                  ease: "easeOut",
                  delay: index * 0.05, // Efecto escalonado
                }}
                className="w-full flex items-center justify-center group-hover:brightness-110 relative overflow-hidden"
                style={{
                  borderRadius: `${barRadius}px ${barRadius}px 0 0`,
                  backgroundColor: barColor,
                  boxShadow: isActive ? "0 4px 12px rgba(0,0,0,0.1)" : "none",
                }}
              >
                {/* Efecto de brillo en la parte superior */}
                <div
                  className="absolute top-0 left-0 right-0 h-1/4 bg-white opacity-20 rounded-t-lg"
                  style={{ borderRadius: `${barRadius}px ${barRadius}px 0 0` }}
                />

                <span className="text-white text-xs font-medium px-1 py-0.5 z-10">
                  {typeof value === "number" ? value.toLocaleString() : value}
                </span>
              </motion.div>

              <span className="text-xs text-[#227c9d] text-center mt-2 transition-colors duration-300 group-hover:text-[#364f6b]">
                {label}
              </span>

              {/* Tooltip mejorado */}
              {showTooltip && isActive && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="absolute bottom-full left-1/2 transform -translate-x-1/2 mb-6 bg-white shadow-lg rounded-xl p-3 z-10 w-36 transition-opacity duration-300"
                >
                  {renderTooltip ? (
                    renderTooltip(item)
                  ) : (
                    <>
                      <div className="text-sm font-bold text-[#364f6b] mb-2">{label}</div>
                      <div className="text-xs text-[#364f6b]">
                        <div className="flex justify-between">
                          <span>Valor:</span>
                          <span className="font-medium">
                            {typeof value === "number" ? value.toLocaleString() : value}
                          </span>
                        </div>
                      </div>
                    </>
                  )}
                  <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-3 h-3 bg-white"></div>
                </motion.div>
              )}
            </div>
          )
        })}

        {/* Línea de referencia y etiqueta para el valor máximo */}
        <div className="absolute top-0 left-0 right-0 border-t border-dashed border-gray-200">
          <span className="absolute right-0 transform -translate-y-1/2 text-xs text-[#227c9d] px-1 bg-white">
            {typeof maxValue === "number" ? maxValue.toLocaleString() : maxValue}
          </span>
        </div>
      </div>

      {/* Leyenda */}
      <div className="mt-4 flex justify-between items-center">
        <div className="flex items-center">
          <Info className="h-4 w-4 text-[#227c9d] mr-1" />
          <span className="text-xs text-[#227c9d]">Pasa el cursor sobre las barras para ver más detalles</span>
        </div>
      </div>
    </div>
  )
}
