"use client"

import { useState } from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { CalendarIcon, FilterIcon } from "lucide-react"

// Datos de ejemplo - En una implementación real, estos vendrían de una API
const patternsData = {
  hourlyHeatmap: [
    // Datos para el mapa de calor por hora y día
    // Estructura: { day: string, hour: string, value: number }
    // Se generarían dinámicamente
  ],

  productCombinations: [
    // Datos para las combinaciones de productos
    // Estructura: { source: string, target: string, value: number }
    // Se generarían dinámicamente
  ],

  categoryDistribution: [
    { name: "Smart Food", value: 52300 },
    { name: "Smart Menus", value: 22700 },
    { name: "Smart Pokes", value: 12800 },
    { name: "Smart Drinks", value: 11000 },
    { name: "Smart Tables", value: 8500 },
  ],
}

export function ConsumptionPatterns() {
  const [period, setPeriod] = useState("month")
  const [filter, setFilter] = useState("all")

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex justify-between items-center">
        <div className="flex items-center gap-2">
          <FilterIcon className="h-4 w-4 text-[#227c9d]" />
          <Select value={filter} onValueChange={setFilter}>
            <SelectTrigger className="w-[180px] h-9 text-sm">
              <SelectValue placeholder="Filtrar por" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Todos los productos</SelectItem>
              <SelectItem value="food">Smart Food</SelectItem>
              <SelectItem value="menus">Smart Menus</SelectItem>
              <SelectItem value="pokes">Smart Pokes</SelectItem>
              <SelectItem value="drinks">Smart Drinks</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="flex items-center gap-2">
          <CalendarIcon className="h-4 w-4 text-[#227c9d]" />
          <Select value={period} onValueChange={setPeriod}>
            <SelectTrigger className="w-[180px] h-9 text-sm">
              <SelectValue placeholder="Seleccionar periodo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="week">Última semana</SelectItem>
              <SelectItem value="month">Último mes</SelectItem>
              <SelectItem value="quarter">Último trimestre</SelectItem>
              <SelectItem value="year">Último año</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      {/* Patrones Horarios */}
      <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
        <CardContent className="p-6">
          <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Patrones Horarios</h3>
          <div className="h-[400px] flex items-center justify-center">
            <div className="text-center p-8 bg-gray-50 rounded-lg">
              <p className="text-[#227c9d]">El mapa de calor por hora y día se implementará con datos reales.</p>
              <p className="text-sm text-[#364f6b] mt-2">
                Este visualizador mostrará la intensidad de ventas por hora y día de la semana, permitiendo identificar
                los momentos de mayor actividad.
              </p>
            </div>
          </div>
        </CardContent>
      </Card>

      {/* Gráficos secundarios */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Combinaciones Frecuentes */}
        <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Combinaciones Frecuentes</h3>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-[#227c9d]">El gráfico de red de combinaciones se implementará con datos reales.</p>
                <p className="text-sm text-[#364f6b] mt-2">
                  Esta visualización mostrará qué productos se compran juntos con frecuencia, ayudando a identificar
                  patrones de consumo y oportunidades de venta cruzada.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Distribución por Categoría */}
        <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
          <CardContent className="p-6">
            <h3 className="text-lg font-semibold text-[#364f6b] mb-4">Distribución por Categoría</h3>
            <div className="h-[300px] flex items-center justify-center">
              <div className="text-center p-8 bg-gray-50 rounded-lg">
                <p className="text-[#227c9d]">El gráfico de donut de categorías se implementará con datos reales.</p>
                <p className="text-sm text-[#364f6b] mt-2">
                  Esta visualización mostrará la distribución de ventas por categoría de producto, permitiendo entender
                  la composición del negocio.
                </p>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
