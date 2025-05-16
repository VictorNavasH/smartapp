"use client"

import type React from "react"
import { useState } from "react"
import { motion } from "framer-motion"

interface LineChartProps<T> {
  data: T[]
  getLabel: (item: T) => string
  getValue: (item: T) => number
  getColor?: string
  gradientColor?: string
  height?: number
  showTooltip?: boolean
  renderTooltip?: (item: T) => React.ReactNode
  onPointClick?: (item: T, index: number) => void
  lineWidth?: number
  showDots?: boolean
  dotSize?: number
  showArea?: boolean
}

export function LineChart<T>({
  data,
  getLabel,
  getValue,
  getColor = "#02b1c4",
  gradientColor = "#fe6d73",
  height = 200,
  showTooltip = true,
  renderTooltip,
  onPointClick,
  lineWidth = 2.5,
  showDots = true,
  dotSize = 3.5,
  showArea = true,
}: LineChartProps<T>) {
  const [activeIndex, setActiveIndex] = useState<number | null>(null)

  // Calcular el valor máximo para escalar la línea
  const maxValue = Math.max(...data.map(getValue))
  const minValue = Math.min(...data.map(getValue))
  const range = maxValue - minValue
  const paddedMax = maxValue + range * 0.1
  const paddedMin = Math.max(0, minValue - range * 0.1)
  const paddedRange = paddedMax - paddedMin

  // Calcular puntos para la línea
  const points = data.map((item, index) => {
    const x = (index / (data.length - 1)) * 100
    const y = 100 - ((getValue(item) - paddedMin) / paddedRange) * 100
    return { x, y, item, index }
  })

  // Crear el path para la línea
  const linePath = points
    .map((point, i) => {
      return i === 0 ? `M ${point.x} ${point.y}` : `L ${point.x} ${point.y}`
    })
    .join(" ")

  // Crear el path para el área bajo la línea
  const areaPath = `${linePath} L ${points[points.length - 1].x} 100 L ${points[0].x} 100 Z`

  return (
    <div className="w-full">
      <div className="relative" style={{ height: `${height}px` }}>
        <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
          {/* Definir gradiente */}
          <defs>
            <linearGradient id="areaGradient" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor={gradientColor} stopOpacity="0.3" />
              <stop offset="100%" stopColor={gradientColor} stopOpacity="0.02" />
            </linearGradient>
          </defs>

          {/* Líneas de referencia horizontales */}
          <line x1="0" y1="0" x2="100" y2="0" stroke="#f0f0f0" strokeWidth="0.5" />
          <line x1="0" y1="25" x2="100" y2="25" stroke="#f0f0f0" strokeWidth="0.5" />
          <line x1="0" y1="50" x2="100" y2="50" stroke="#f0f0f0" strokeWidth="0.5" />
          <line x1="0" y1="75" x2="100" y2="75" stroke="#f0f0f0" strokeWidth="0.5" />
          <line x1="0" y1="100" x2="100" y2="100" stroke="#f0f0f0" strokeWidth="0.5" />

          {/* Área bajo la línea con gradiente */}
          {showArea && (
            <motion.path
              d={areaPath}
              fill="url(#areaGradient)"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8 }}
            />
          )}

          {/* Línea principal */}
          <motion.path
            d={linePath}
            fill="none"
            stroke={gradientColor}
            strokeWidth={lineWidth}
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0, opacity: 0 }}
            animate={{ pathLength: 1, opacity: 1 }}
            transition={{ duration: 1.2, ease: "easeInOut" }}
          />

          {/* Puntos en la línea */}
          {showDots &&
            points.map((point, index) => (
              <motion.circle
                key={index}
                cx={point.x}
                cy={point.y}
                r={activeIndex === index ? dotSize * 1.5 : dotSize}
                fill={activeIndex === index ? gradientColor : "white"}
                stroke={gradientColor}
                strokeWidth="1.5"
                className="cursor-pointer"
                initial={{ opacity: 0, scale: 0 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3, delay: 0.6 + index * 0.1 }}
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => onPointClick?.(point.item, point.index)}
              />
            ))}

          {/* Área interactiva transparente para cada segmento */}
          {points.map((point, index) => {
            // Calcular el ancho de cada segmento
            const segmentWidth = 100 / (data.length - 1)
            const x = point.x - segmentWidth / 2

            return (
              <rect
                key={`area-${index}`}
                x={Math.max(0, x)}
                y={0}
                width={segmentWidth}
                height={100}
                fill="transparent"
                className="cursor-pointer"
                onMouseEnter={() => setActiveIndex(index)}
                onMouseLeave={() => setActiveIndex(null)}
                onClick={() => onPointClick?.(point.item, point.index)}
              />
            )
          })}
        </svg>

        {/* Etiquetas del eje X */}
        <div className="flex justify-between mt-1">
          {data.map((item, index) => (
            <div
              key={index}
              className={`text-xs text-center transition-colors duration-200 ${
                activeIndex === index ? "text-[#364f6b] font-medium" : "text-[#227c9d]"
              }`}
              style={{ width: `${100 / data.length}%` }}
            >
              {getLabel(item)}
            </div>
          ))}
        </div>

        {/* Tooltip */}
        {showTooltip && activeIndex !== null && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="absolute bg-white shadow-md rounded-lg p-2.5 z-10 w-32 transition-opacity duration-200"
            style={{
              left: `${points[activeIndex].x}%`,
              top: `${Math.min(points[activeIndex].y - 5, 70)}%`,
              transform: "translate(-50%, -100%)",
            }}
          >
            {renderTooltip ? (
              renderTooltip(data[activeIndex])
            ) : (
              <>
                <div className="text-xs font-bold text-[#364f6b] mb-1">{getLabel(data[activeIndex])}</div>
                <div className="text-xs text-[#364f6b]">
                  <div className="flex justify-between">
                    <span>Valor:</span>
                    <span className="font-medium">
                      {typeof getValue(data[activeIndex]) === "number"
                        ? getValue(data[activeIndex]).toLocaleString()
                        : getValue(data[activeIndex])}
                    </span>
                  </div>
                </div>
              </>
            )}
            <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-1/2 rotate-45 w-2 h-2 bg-white"></div>
          </motion.div>
        )}
      </div>

      {/* Leyenda */}
      <div className="mt-2 flex justify-end items-center text-xs text-[#227c9d]">
        <div className="flex items-center">
          <span className="w-2.5 h-2.5 rounded-full mr-1.5" style={{ backgroundColor: gradientColor }}></span>
          <span>Evolución de costes</span>
        </div>
      </div>
    </div>
  )
}
