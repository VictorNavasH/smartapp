"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { themeColors } from "@/lib/theme-config"
import { Info, TrendingUp, TrendingDown, Award, Target } from "lucide-react"

interface BenchmarkData {
  category: string
  value: number
  industryAverage: number
  topPerformers: number
  percentile?: number
  trend?: "up" | "down" | "stable"
  icon?: React.ReactNode
}

interface BenchmarkVisualizationProps {
  data: BenchmarkData[]
  title?: string
  subtitle?: string
  showComparison?: boolean
  animationDuration?: number
}

export function BenchmarkVisualization({
  data,
  title = "Benchmarks del Sector",
  subtitle = "Comparativa con la media del sector y los mejores restaurantes",
  showComparison = true,
  animationDuration = 0.8,
}: BenchmarkVisualizationProps) {
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null)
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  // Calcular el percentil si no está definido
  const processedData = data.map((item) => {
    if (item.percentile === undefined) {
      // Calcular percentil basado en la posición relativa entre la media y los top performers
      const range = item.topPerformers - item.industryAverage
      const position = item.value - item.industryAverage
      const calculatedPercentile = Math.min(100, Math.max(0, 50 + (position / range) * 50))
      return { ...item, percentile: calculatedPercentile }
    }
    return item
  })

  // Función para determinar el color basado en el percentil
  const getPercentileColor = (percentile: number) => {
    if (percentile >= 80) return themeColors.secondary
    if (percentile >= 60) return themeColors.primary
    if (percentile >= 40) return themeColors.yellow
    if (percentile >= 20) return themeColors.purple
    return themeColors.accent
  }

  // Función para obtener el icono de tendencia
  const getTrendIcon = (trend?: "up" | "down" | "stable") => {
    if (trend === "up") return <TrendingUp className="h-3.5 w-3.5 text-[#17c3b2]" />
    if (trend === "down") return <TrendingDown className="h-3.5 w-3.5 text-[#fe6d73]" />
    return null
  }

  return (
    <div className="space-y-4">
      <div className="flex justify-between items-start">
        <div>
          <h3 className="text-sm font-medium text-[#364f6b]">{title}</h3>
          <p className="text-xs text-[#227c9d]">{subtitle}</p>
        </div>
        <div className="flex items-center gap-2 text-xs text-[#227c9d]">
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#17c3b2]"></span>
            Tu negocio
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#227c9d]"></span>
            Media sector
          </span>
          <span className="flex items-center gap-1">
            <span className="w-2.5 h-2.5 rounded-full bg-[#fe6d73]"></span>
            Top performers
          </span>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {processedData.map((item, index) => (
          <motion.div
            key={item.category}
            className="relative bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 hover:shadow-md transition-all duration-300 cursor-pointer"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            whileHover={{ scale: 1.02 }}
            onClick={() => setSelectedIndex(selectedIndex === index ? null : index)}
          >
            <div className="p-4">
              <div className="flex justify-between items-start mb-3">
                <div className="flex items-center gap-2">
                  {item.icon || (
                    <div
                      className="p-1.5 rounded-full"
                      style={{ backgroundColor: `${getPercentileColor(item.percentile || 0)}20` }}
                    >
                      <Target className="h-4 w-4" style={{ color: getPercentileColor(item.percentile || 0) }} />
                    </div>
                  )}
                  <h4 className="text-sm font-medium text-[#364f6b]">{item.category}</h4>
                </div>
                {getTrendIcon(item.trend)}
              </div>

              <div className="flex items-end justify-between mb-2">
                <div>
                  <div className="text-xs text-[#227c9d]">Tu valor</div>
                  <div className="text-xl font-bold text-[#364f6b]">
                    {typeof item.value === "number" ? `${item.value}%` : item.value}
                  </div>
                </div>
                <div className="text-right">
                  <div className="text-xs text-[#227c9d]">Percentil</div>
                  <div className="text-lg font-bold" style={{ color: getPercentileColor(item.percentile || 0) }}>
                    {Math.round(item.percentile || 0)}
                  </div>
                </div>
              </div>

              {/* Barra de progreso estilizada */}
              <div className="relative h-3 bg-gray-100 rounded-full overflow-hidden mt-2">
                {/* Marcador de media del sector */}
                <div
                  className="absolute top-0 bottom-0 w-0.5 bg-[#227c9d] z-10"
                  style={{ left: `${(item.industryAverage / item.topPerformers) * 100}%` }}
                ></div>

                {/* Marcador de top performers */}
                <div className="absolute top-0 bottom-0 w-0.5 bg-[#fe6d73] z-10" style={{ left: "100%" }}></div>

                {/* Barra de progreso animada */}
                <motion.div
                  className="absolute top-0 left-0 h-full rounded-full"
                  style={{
                    background: `linear-gradient(90deg, ${getPercentileColor(
                      item.percentile || 0,
                    )}80, ${getPercentileColor(item.percentile || 0)})`,
                  }}
                  initial={{ width: 0 }}
                  animate={{ width: `${(item.value / item.topPerformers) * 100}%` }}
                  transition={{ duration: animationDuration, ease: "easeOut" }}
                ></motion.div>
              </div>

              <div className="flex justify-between mt-1 text-[10px] text-[#227c9d]">
                <span>0%</span>
                <span>{item.topPerformers}%</span>
              </div>
            </div>

            {/* Panel expandible con detalles */}
            <AnimatePresence>
              {selectedIndex === index && showComparison && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden"
                >
                  <div className="p-4 pt-0">
                    <div className="h-px bg-gray-100 w-full my-3"></div>
                    <div className="grid grid-cols-3 gap-2">
                      <div className="text-center">
                        <div className="text-xs text-[#227c9d]">Tu negocio</div>
                        <div className="text-sm font-bold text-[#364f6b]">{item.value}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-[#227c9d]">Media sector</div>
                        <div className="text-sm font-bold text-[#364f6b]">{item.industryAverage}%</div>
                      </div>
                      <div className="text-center">
                        <div className="text-xs text-[#227c9d]">Top performers</div>
                        <div className="text-sm font-bold text-[#364f6b]">{item.topPerformers}%</div>
                      </div>
                    </div>

                    <div className="mt-3 flex items-start gap-2">
                      <Info className="h-3.5 w-3.5 text-[#227c9d] mt-0.5" />
                      <p className="text-xs text-[#227c9d]">
                        {item.percentile && item.percentile >= 80
                          ? "¡Excelente! Estás entre los mejores del sector."
                          : item.percentile && item.percentile >= 50
                            ? "Buen trabajo. Estás por encima de la media del sector."
                            : "Hay oportunidades de mejora para alcanzar la media del sector."}
                      </p>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Indicador de posición */}
            <div
              className="absolute top-0 left-0 h-1 w-full"
              style={{
                background: `linear-gradient(90deg, ${getPercentileColor(item.percentile || 0)}, transparent)`,
              }}
            ></div>
          </motion.div>
        ))}
      </div>

      {/* Visualización radial para comparación general */}
      {isVisible && (
        <motion.div
          className="mt-6 bg-white rounded-xl overflow-hidden shadow-sm border border-gray-100 p-4"
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <h3 className="text-sm font-medium text-[#364f6b] mb-4">Comparativa Global</h3>

          <div className="relative h-64 flex items-center justify-center">
            {/* Círculos concéntricos */}
            {[...Array(5)].map((_, i) => (
              <motion.div
                key={`circle-${i}`}
                className="absolute rounded-full border border-gray-100"
                style={{
                  width: `${(i + 1) * 20}%`,
                  height: `${(i + 1) * 20}%`,
                  opacity: 0.1 + i * 0.1,
                }}
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 0.1 + i * 0.1 }}
                transition={{ duration: 0.5, delay: 0.5 + i * 0.1 }}
              ></motion.div>
            ))}

            {/* Líneas radiales */}
            {processedData.map((item, index) => {
              const angle = (index * 360) / processedData.length
              return (
                <motion.div
                  key={`line-${index}`}
                  className="absolute top-1/2 left-1/2 h-px bg-gray-200 origin-left"
                  style={{
                    width: "50%",
                    transform: `rotate(${angle}deg)`,
                  }}
                  initial={{ opacity: 0, scaleX: 0 }}
                  animate={{ opacity: 0.5, scaleX: 1 }}
                  transition={{ duration: 0.3, delay: 0.8 + index * 0.05 }}
                ></motion.div>
              )
            })}

            {/* Puntos de datos */}
            {processedData.map((item, index) => {
              const angle = (index * 360) / processedData.length
              const radius = (item.value / item.topPerformers) * 50
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius

              return (
                <motion.div
                  key={`point-${index}`}
                  className="absolute h-3 w-3 rounded-full bg-white border-2 flex items-center justify-center"
                  style={{
                    top: `calc(50% + ${y}%)`,
                    left: `calc(50% + ${x}%)`,
                    transform: "translate(-50%, -50%)",
                    borderColor: getPercentileColor(item.percentile || 0),
                  }}
                  initial={{ scale: 0, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1 + index * 0.1 }}
                  whileHover={{ scale: 1.5 }}
                >
                  <motion.div
                    className="h-1.5 w-1.5 rounded-full"
                    style={{ backgroundColor: getPercentileColor(item.percentile || 0) }}
                  ></motion.div>
                </motion.div>
              )
            })}

            {/* Área de datos */}
            <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
              <motion.path
                d={
                  processedData
                    .map((item, index) => {
                      const angle = (index * 360) / processedData.length
                      const radius = (item.value / item.topPerformers) * 50
                      const x = Math.cos((angle * Math.PI) / 180) * radius
                      const y = Math.sin((angle * Math.PI) / 180) * radius
                      return `${index === 0 ? "M" : "L"} ${50 + x} ${50 + y}`
                    })
                    .join(" ") + " Z"
                }
                fill="rgba(2, 177, 196, 0.1)"
                stroke="#02b1c4"
                strokeWidth="1"
                strokeLinejoin="round"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.5, delay: 1.2 }}
              />
            </svg>

            {/* Área de media del sector */}
            <svg className="absolute inset-0 w-full h-full" style={{ overflow: "visible" }}>
              <motion.path
                d={
                  processedData
                    .map((item, index) => {
                      const angle = (index * 360) / processedData.length
                      const radius = (item.industryAverage / item.topPerformers) * 50
                      const x = Math.cos((angle * Math.PI) / 180) * radius
                      const y = Math.sin((angle * Math.PI) / 180) * radius
                      return `${index === 0 ? "M" : "L"} ${50 + x} ${50 + y}`
                    })
                    .join(" ") + " Z"
                }
                fill="none"
                stroke="#227c9d"
                strokeWidth="1"
                strokeDasharray="3,3"
                initial={{ pathLength: 0, opacity: 0 }}
                animate={{ pathLength: 1, opacity: 0.7 }}
                transition={{ duration: 1.5, delay: 1.5 }}
              />
            </svg>

            {/* Etiquetas */}
            {processedData.map((item, index) => {
              const angle = (index * 360) / processedData.length
              const radius = 55
              const x = Math.cos((angle * Math.PI) / 180) * radius
              const y = Math.sin((angle * Math.PI) / 180) * radius

              return (
                <motion.div
                  key={`label-${index}`}
                  className="absolute text-xs font-medium text-[#364f6b] text-center"
                  style={{
                    top: `calc(50% + ${y}%)`,
                    left: `calc(50% + ${x}%)`,
                    transform: "translate(-50%, -50%)",
                    maxWidth: "80px",
                  }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5, delay: 1.7 + index * 0.1 }}
                >
                  {item.category}
                </motion.div>
              )
            })}

            {/* Centro */}
            <motion.div
              className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 h-8 w-8 rounded-full bg-white shadow-md flex items-center justify-center"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.5, delay: 0.3 }}
            >
              <Award className="h-4 w-4 text-[#02b1c4]" />
            </motion.div>
          </div>

          <div className="mt-4 flex justify-center gap-6 text-xs text-[#227c9d]">
            <div className="flex items-center gap-1">
              <div className="h-2 w-6 bg-[#02b1c4] opacity-70 rounded-sm"></div>
              <span>Tu negocio</span>
            </div>
            <div className="flex items-center gap-1">
              <div className="h-2 w-6 border-b border-dashed border-[#227c9d]"></div>
              <span>Media del sector</span>
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
