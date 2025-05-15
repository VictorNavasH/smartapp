"use client"

import { useState } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  CheckIcon,
  XIcon,
  TrendingUpIcon,
  DollarSignIcon,
  PercentIcon,
  BarChart2Icon,
  CalendarIcon,
  AlertTriangleIcon,
  ArrowRightIcon,
  ChevronDownIcon,
  FilterIcon,
} from "lucide-react"
import { motion, AnimatePresence } from "framer-motion"
import { themeColors } from "@/lib/theme-config"
import { BarChart } from "@/components/ui/bar-chart"
import { MetricCard } from "@/components/ui/metric-card"

export function CostAnalysis() {
  const [activeView, setActiveView] = useState<"costes" | "ventas">("costes")
  const [selectedPeriod, setSelectedPeriod] = useState("abril")
  const [showDetails, setShowDetails] = useState<string | null>(null)

  // Datos de estructura de costes (como % de costes totales)
  const estructuraCostes = [
    { categoria: "Materia Prima", valor: 32, porcentaje: 32, color: themeColors.yellow, icon: DollarSignIcon },
    { categoria: "Personal", valor: 38, porcentaje: 38, color: themeColors.accent, icon: PercentIcon },
    { categoria: "Alquiler", valor: 12, porcentaje: 12, color: themeColors.dark, icon: DollarSignIcon },
    { categoria: "Suministros", valor: 8, porcentaje: 8, color: themeColors.textSecondary, icon: DollarSignIcon },
    { categoria: "Marketing", valor: 5, porcentaje: 5, color: themeColors.primary, icon: DollarSignIcon },
    { categoria: "Otros", valor: 5, porcentaje: 5, color: themeColors.accentGreen, icon: DollarSignIcon },
  ]

  // Datos de estructura de costes (como % de ventas)
  const estructureCostesVentas = [
    { categoria: "Materia Prima", valor: 24, porcentaje: 24, color: themeColors.yellow, icon: DollarSignIcon },
    { categoria: "Personal", valor: 28.5, porcentaje: 28.5, color: themeColors.accent, icon: PercentIcon },
    { categoria: "Alquiler", valor: 9, porcentaje: 9, color: themeColors.dark, icon: DollarSignIcon },
    { categoria: "Suministros", valor: 6, porcentaje: 6, color: themeColors.textSecondary, icon: DollarSignIcon },
    { categoria: "Marketing", valor: 3.75, porcentaje: 3.75, color: themeColors.primary, icon: DollarSignIcon },
    { categoria: "Otros", valor: 3.75, porcentaje: 3.75, color: themeColors.accentGreen, icon: DollarSignIcon },
  ]

  // Datos de evolución mensual de costes
  const evolucionCostes = [
    { mes: "Ene", total: 45200, materiaprima: 14464, personal: 17176, alquiler: 5424, otros: 8136 },
    { mes: "Feb", total: 44800, materiaprima: 14336, personal: 17024, alquiler: 5376, otros: 8064 },
    { mes: "Mar", total: 46500, materiaprima: 14880, personal: 17670, alquiler: 5580, otros: 8370 },
    { mes: "Abr", total: 48000, materiaprima: 15360, personal: 18240, alquiler: 5760, otros: 8640 },
  ]

  // Datos de benchmarks por categoría
  const benchmarks = [
    {
      categoria: "Materia Prima",
      actual: 32,
      target: { min: 25, max: 30 },
      status: "warning",
      color: themeColors.yellow, // Asegurarse de que sea amarillo
    },
    { categoria: "Personal", actual: 38, target: { min: 25, max: 30 }, status: "error", color: themeColors.accent },
    { categoria: "Alquiler", actual: 12, target: { min: 10, max: 15 }, status: "success", color: themeColors.dark },
    {
      categoria: "Suministros",
      actual: 8,
      target: { min: 5, max: 10 },
      status: "success",
      color: themeColors.textSecondary,
    },
    { categoria: "Marketing", actual: 5, target: { min: 3, max: 7 }, status: "success", color: themeColors.primary },
    { categoria: "Otros", actual: 5, target: { min: 5, max: 10 }, status: "success", color: themeColors.accentGreen },
  ]

  // Datos de recomendaciones
  const recomendaciones = [
    {
      categoria: "Personal",
      valor: 38,
      descripcion: "Reduce al 30% o menos. Salarios, seguridad social y otros costes relacionados con el personal.",
      tipo: "warning",
      color: themeColors.accent, // Color rojo para Personal
    },
    {
      categoria: "Materia Prima",
      valor: 32,
      descripcion:
        "Reduce al 30% o menos. Incluye todos los ingredientes y productos utilizados en la elaboración de platos.",
      tipo: "warning",
      color: themeColors.yellow, // Color amarillo para Materia Prima
    },
  ]

  // Datos de KPIs de costes
  const kpisCostes = [
    {
      titulo: "Coste Total",
      valor: "€48,000",
      cambio: 3.2,
      comparacion: "vs. mes anterior",
      icon: <DollarSignIcon className="h-3.5 w-3.5 text-[#02b1c4]" />,
    },
    {
      titulo: "% sobre Ventas",
      valor: "75%",
      cambio: -1.5,
      comparacion: "vs. mes anterior",
      icon: <PercentIcon className="h-3.5 w-3.5 text-[#02b1c4]" />,
    },
    {
      titulo: "Coste por Comensal",
      valor: "€29.81",
      cambio: 1.2,
      comparacion: "vs. mes anterior",
      icon: <BarChart2Icon className="h-3.5 w-3.5 text-[#02b1c4]" />,
    },
    {
      titulo: "Tendencia",
      valor: "Estable",
      cambio: 0,
      comparacion: "últimos 3 meses",
      icon: <TrendingUpIcon className="h-3.5 w-3.5 text-[#02b1c4]" />,
    },
  ]

  // Datos de alertas de costes
  const alertasCostes = [
    {
      tipo: "warning",
      titulo: "Personal por encima del benchmark",
      mensaje: "38% vs 30% recomendado",
      color: themeColors.accent, // Color rojo para Personal
    },
    {
      tipo: "warning",
      titulo: "Materia Prima por encima del benchmark",
      mensaje: "32% vs 30% recomendado",
      color: themeColors.yellow, // Color amarillo para Materia Prima
    },
  ]

  // Determinar qué datos mostrar según la vista activa
  const datosActuales = activeView === "costes" ? estructuraCostes : estructureCostesVentas
  const tituloVista =
    activeView === "costes" ? "Estructura de Costes (% sobre costes totales)" : "Estructura de Costes (% sobre ventas)"

  return (
    <div className="space-y-4">
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {kpisCostes.map((kpi, index) => (
          <MetricCard
            key={index}
            title={kpi.titulo}
            value={kpi.valor}
            change={kpi.cambio}
            changeLabel={kpi.comparacion}
            icon={kpi.icon}
            negative={
              kpi.cambio > 0 &&
              (kpi.titulo === "Coste Total" || kpi.titulo === "% sobre Ventas" || kpi.titulo === "Coste por Comensal")
            }
          />
        ))}
      </div>

      {/* Selector de vista y período */}
      <div className="flex flex-wrap justify-between items-center gap-2 mb-1">
        <div className="flex gap-2">
          <Button
            variant={activeView === "costes" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("costes")}
            className="text-xs"
          >
            % sobre Costes
          </Button>
          <Button
            variant={activeView === "ventas" ? "default" : "outline"}
            size="sm"
            onClick={() => setActiveView("ventas")}
            className="text-xs"
          >
            % sobre Ventas
          </Button>
        </div>
        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-[#227c9d]" />
          <select
            className="text-xs border rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]"
            value={selectedPeriod}
            onChange={(e) => setSelectedPeriod(e.target.value)}
          >
            <option value="enero">Enero 2025</option>
            <option value="febrero">Febrero 2025</option>
            <option value="marzo">Marzo 2025</option>
            <option value="abril">Abril 2025</option>
          </select>
        </div>
      </div>

      {/* Gráfico principal y desglose */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        {/* Gráfico circular */}
        <Card className="p-4 lg:col-span-1 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
          <h3 className="text-sm font-medium text-[#364f6b] mb-1">Distribución</h3>
          <p className="text-xs text-[#227c9d] mb-2">
            {activeView === "costes" ? "Como porcentaje del total de costes" : "Como porcentaje de las ventas totales"}
          </p>

          <div className="relative h-48 w-48 mx-auto mb-3">
            <motion.svg
              viewBox="0 0 100 100"
              className="w-full h-full"
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 1, ease: "easeOut" }}
            >
              {datosActuales.map((item, index) => {
                // Calcular posición en el círculo
                const startAngle = datosActuales.slice(0, index).reduce((sum, curr) => sum + curr.porcentaje, 0) * 3.6
                const endAngle = startAngle + item.porcentaje * 3.6

                // Convertir a coordenadas
                const startX = 50 + 40 * Math.cos(((startAngle - 90) * Math.PI) / 180)
                const startY = 50 + 40 * Math.sin(((startAngle - 90) * Math.PI) / 180)
                const endX = 50 + 40 * Math.cos(((endAngle - 90) * Math.PI) / 180)
                const endY = 50 + 40 * Math.sin(((endAngle - 90) * Math.PI) / 180)

                // Determinar si el arco es mayor a 180 grados
                const largeArcFlag = item.porcentaje > 50 ? 1 : 0

                return (
                  <motion.path
                    key={index}
                    d={`M 50 50 L ${startX} ${startY} A 40 40 0 ${largeArcFlag} 1 ${endX} ${endY} Z`}
                    fill={item.color}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                    whileHover={{ scale: 1.05 }}
                    className="cursor-pointer"
                    onClick={() => setShowDetails(item.categoria)}
                  />
                )
              })}
              <circle cx="50" cy="50" r="25" fill="white" />
              <text x="50" y="48" textAnchor="middle" fontSize="6" fontWeight="bold" fill="#364f6b">
                Total
              </text>
              <text x="50" y="56" textAnchor="middle" fontSize="8" fontWeight="bold" fill="#364f6b">
                100%
              </text>
            </motion.svg>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {datosActuales.map((item, index) => (
              <motion.div
                key={index}
                className="flex items-center gap-1.5 cursor-pointer p-1 rounded-md hover:bg-gray-50"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
                onClick={() => setShowDetails(item.categoria)}
                whileHover={{ scale: 1.02 }}
              >
                <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                <span className="text-[#364f6b] flex-1 text-xs">{item.categoria}</span>
                <span className="font-medium text-[#364f6b] text-xs">{item.porcentaje}%</span>
              </motion.div>
            ))}
          </div>
        </Card>

        {/* Desglose detallado */}
        <Card className="p-4 lg:col-span-2 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
          <div className="flex justify-between items-center mb-2">
            <h3 className="text-sm font-medium text-[#364f6b]">Desglose Detallado</h3>
            <Button variant="outline" size="sm" className="text-xs gap-1 h-7 px-2">
              <FilterIcon className="h-3 w-3" />
              Filtrar
            </Button>
          </div>

          <div className="space-y-3">
            {datosActuales.map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              >
                <div className="flex justify-between items-center mb-1">
                  <div className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></span>
                    <span className="text-xs font-medium text-[#364f6b]">{item.categoria}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <span className="text-xs font-bold" style={{ color: item.color }}>
                      {activeView === "costes" ? `${item.porcentaje}%` : `${item.porcentaje}%`}
                    </span>
                    <span className="text-xs text-[#227c9d]">
                      {activeView === "costes"
                        ? `€${(item.valor * 480).toLocaleString()}`
                        : `€${(item.valor * 640).toLocaleString()}`}
                    </span>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="h-5 w-5 p-0"
                      onClick={() => setShowDetails(showDetails === item.categoria ? null : item.categoria)}
                    >
                      <ChevronDownIcon
                        className={`h-3.5 w-3.5 transition-transform ${showDetails === item.categoria ? "rotate-180" : ""}`}
                      />
                    </Button>
                  </div>
                </div>
                <AnimatePresence>
                  {showDetails === item.categoria && (
                    <motion.div
                      className="p-2 rounded-md bg-gray-50 text-xs text-[#227c9d]"
                      initial={{ opacity: 0, height: 0 }}
                      animate={{ opacity: 1, height: "auto" }}
                      exit={{ opacity: 0, height: 0 }}
                      transition={{ duration: 0.2 }}
                    >
                      {item.categoria} incluye todos los gastos relacionados con {item.categoria.toLowerCase()}.
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            ))}
          </div>
        </Card>
      </div>

      {/* Evolución mensual de costes */}
      <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-[#364f6b]">Evolución Mensual de Costes</h3>
          <div className="flex items-center gap-2">
            <select
              className="text-xs border rounded-md p-1 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]"
              value={selectedPeriod}
              onChange={(e) => setSelectedPeriod(e.target.value)}
            >
              <option value="enero">Enero 2025</option>
              <option value="febrero">Febrero 2025</option>
              <option value="marzo">Marzo 2025</option>
              <option value="abril">Abril 2025</option>
            </select>
            <Button variant="outline" size="sm" className="text-xs gap-1 h-7 px-2">
              <FilterIcon className="h-3 w-3" />
              Filtrar
            </Button>
          </div>
        </div>
        <BarChart
          data={evolucionCostes}
          getLabel={(item) => item.mes}
          getValue={(item) => item.total}
          getColor={(_, index, isActive) =>
            isActive ? themeColors.secondary : `${themeColors.primary}${index % 2 === 0 ? "" : "cc"}`
          }
          height={180}
          gap={12}
          barRadius={8}
          renderTooltip={(item) => (
            <>
              <div className="text-sm font-bold text-[#364f6b] mb-2">{item.mes} 2025</div>
              <div className="text-xs text-[#364f6b] space-y-1">
                <div className="flex justify-between">
                  <span>Total:</span>
                  <span className="font-medium">€{item.total.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Materia Prima:</span>
                  <span className="font-medium">€{item.materiaprima.toLocaleString()}</span>
                </div>
                <div className="flex justify-between">
                  <span>Personal:</span>
                  <span className="font-medium">€{item.personal.toLocaleString()}</span>
                </div>
              </div>
            </>
          )}
        />
      </Card>

      {/* Benchmarks y recomendaciones */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        {/* Benchmarks */}
        <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
          <h3 className="text-sm font-medium text-[#364f6b] mb-2">Benchmarks</h3>
          <p className="text-xs text-[#227c9d] mb-3">Compara tus costes con los benchmarks del sector</p>
          <div className="space-y-2">
            {benchmarks.map((benchmark, index) => (
              <div key={index} className="flex items-center justify-between text-xs">
                <div className="flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: benchmark.color }}></span>
                  <span className="text-[#364f6b]">{benchmark.categoria}</span>
                </div>
                <div className="flex items-center gap-3">
                  <span className="font-medium">{benchmark.actual}%</span>
                  <span className="text-gray-500">
                    ({benchmark.target.min}-{benchmark.target.max}%)
                  </span>
                  {benchmark.status === "success" && <CheckIcon className="h-4 w-4 text-green-500" />}
                  {benchmark.status === "warning" && (
                    <AlertTriangleIcon
                      className="h-4 w-4"
                      style={{
                        color: benchmark.categoria === "Materia Prima" ? themeColors.yellow : "text-yellow-500",
                      }}
                    />
                  )}
                  {benchmark.status === "error" && <XIcon className="h-4 w-4 text-red-500" />}
                </div>
              </div>
            ))}
          </div>
        </Card>

        {/* Recomendaciones */}
        <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
          <h3 className="text-sm font-medium text-[#364f6b] mb-2">Recomendaciones</h3>
          <p className="text-xs text-[#227c9d] mb-3">Acciones recomendadas para optimizar tus costes</p>
          <div className="space-y-2">
            {recomendaciones.map((recomendacion, index) => (
              <div key={index} className="flex items-start gap-3 text-xs">
                {recomendacion.tipo === "warning" && (
                  <AlertTriangleIcon className="h-4 w-4" style={{ color: recomendacion.color || "#ffcb77" }} />
                )}
                <div
                  className="space-y-1 border-l-2 pl-2"
                  style={{ borderLeftColor: recomendacion.color || "#ffcb77" }}
                >
                  <div className="flex items-center gap-1">
                    <span className="font-medium text-[#364f6b]">{recomendacion.categoria}</span>
                    <span className="text-gray-500">({recomendacion.valor}%)</span>
                  </div>
                  <p className="text-[#227c9d]">{recomendacion.descripcion}</p>
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>

      {/* Alertas de costes */}
      <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
        <div className="flex justify-between items-center mb-3">
          <h3 className="text-sm font-medium text-[#364f6b]">Alertas de Costes</h3>
          <Button variant="outline" size="sm" className="text-xs gap-1 h-7 px-2">
            Ver todas
            <ArrowRightIcon className="h-3 w-3" />
          </Button>
        </div>
        <div className="space-y-2">
          {alertasCostes.map((alerta, index) => (
            <div key={index} className="flex items-center gap-3 text-xs">
              {alerta.tipo === "warning" && (
                <AlertTriangleIcon className="h-4 w-4" style={{ color: alerta.color || "#ffcb77" }} />
              )}
              <div className="space-y-0.5 border-l-2 pl-2" style={{ borderLeftColor: alerta.color || "#ffcb77" }}>
                <span className="font-medium text-[#364f6b]">{alerta.titulo}</span>
                <p className="text-[#227c9d]">{alerta.mensaje}</p>
              </div>
            </div>
          ))}
        </div>
      </Card>
    </div>
  )
}
