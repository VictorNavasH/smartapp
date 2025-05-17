"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { useAI } from "@/lib/ai-context"
import {
  Settings,
  Key,
  Save,
  Check,
  AlertTriangle,
  Users,
  Utensils,
  Home,
  Laptop,
  TrendingUp,
  DollarSign,
  MoreHorizontal,
  PlusCircle,
  Trash2,
  BarChart2,
  Info,
} from "lucide-react"
import { motion } from "framer-motion"
import { themeColors } from "@/lib/theme-config"
import { BarChart } from "@/components/ui/bar-chart"
import { MetricCard } from "@/components/ui/metric-card"
import { BenchmarkVisualization } from "@/components/ui/benchmark-visualization"

// Tipos para los datos de estructura de costes
interface RestaurantBaseData {
  totalCapacity: number
  dailyShifts: number
  capacityPerShift: number[]
  breakEvenPoint: number
  averageTicket: number
  expectedGrossMargin: number
}

interface CostItem {
  id: string
  name: string
  amount: number
  percentOfSales?: number
  percentOfTotalCost?: number
}

interface CostCategory {
  id: string
  name: string
  icon: React.ElementType
  color: string
  items: CostItem[]
  total: number
  percentOfSales?: number
  percentOfTotalCost?: number
}

export default function ConfiguracionPage() {
  const { provider, setProvider, apiKey, setApiKey, isConfigured } = useAI()

  const [selectedProvider, setSelectedProvider] = useState<"openai" | "gemini" | null>(null)
  const [keyInput, setKeyInput] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const [showKey, setShowKey] = useState(false)
  const [activeTab, setActiveTab] = useState("general")
  const [costSubTab, setCostSubTab] = useState("datos-base")

  // Estado para los datos base del restaurante
  const [baseData, setBaseData] = useState<RestaurantBaseData>({
    totalCapacity: 80,
    dailyShifts: 2,
    capacityPerShift: [40, 40],
    breakEvenPoint: 25000,
    averageTicket: 35,
    expectedGrossMargin: 65,
  })

  // Estado para las categorías de costes
  const [costCategories, setCostCategories] = useState<CostCategory[]>([
    {
      id: "personal",
      name: "Personal",
      icon: Users,
      color: themeColors.accent,
      items: [
        { id: "personal-1", name: "Salarios", amount: 12000 },
        { id: "personal-2", name: "Seguridad Social", amount: 3600 },
      ],
      total: 15600,
    },
    {
      id: "food",
      name: "Alimentación y Bebidas",
      icon: Utensils,
      color: themeColors.yellow,
      items: [
        { id: "food-1", name: "Materia prima", amount: 8500 },
        { id: "food-2", name: "Bebidas", amount: 3200 },
      ],
      total: 11700,
    },
    {
      id: "facilities",
      name: "Instalaciones",
      icon: Home,
      color: themeColors.dark,
      items: [
        { id: "facilities-1", name: "Alquiler", amount: 4500 },
        { id: "facilities-2", name: "Mantenimiento", amount: 800 },
        { id: "facilities-3", name: "Suministros", amount: 1200 },
        { id: "facilities-4", name: "Seguros", amount: 350 },
      ],
      total: 6850,
    },
    {
      id: "technology",
      name: "Tecnología",
      icon: Laptop,
      color: themeColors.primary,
      items: [
        { id: "tech-1", name: "Software", amount: 450 },
        { id: "tech-2", name: "Hardware", amount: 250 },
      ],
      total: 700,
    },
    {
      id: "marketing",
      name: "Marketing",
      icon: TrendingUp,
      color: themeColors.secondary,
      items: [
        { id: "marketing-1", name: "Publicidad", amount: 1200 },
        { id: "marketing-2", name: "Promociones", amount: 800 },
      ],
      total: 2000,
    },
    {
      id: "financial",
      name: "Financieros",
      icon: DollarSign,
      color: themeColors.blue,
      items: [
        { id: "financial-1", name: "Intereses", amount: 600 },
        { id: "financial-2", name: "Comisiones bancarias", amount: 150 },
      ],
      total: 750,
    },
    {
      id: "others",
      name: "Otros",
      icon: MoreHorizontal,
      color: themeColors.purple,
      items: [{ id: "others-1", name: "Varios", amount: 400 }],
      total: 400,
    },
  ])

  // Datos de benchmarks del sector
  const benchmarkData = [
    {
      category: "Margen Bruto",
      value: 68,
      industryAverage: 62,
      topPerformers: 75,
      trend: "up" as const,
      icon: (
        <div className="p-1.5 rounded-full" style={{ backgroundColor: `${themeColors.secondary}20` }}>
          <TrendingUp className="h-4 w-4" style={{ color: themeColors.secondary }} />
        </div>
      ),
    },
    {
      category: "Coste Personal",
      value: 32,
      industryAverage: 35,
      topPerformers: 28,
      trend: "down" as const,
      icon: (
        <div className="p-1.5 rounded-full" style={{ backgroundColor: `${themeColors.accent}20` }}>
          <Users className="h-4 w-4" style={{ color: themeColors.accent }} />
        </div>
      ),
    },
    {
      category: "Coste Alimentos",
      value: 28,
      industryAverage: 30,
      topPerformers: 25,
      trend: "down" as const,
      icon: (
        <div className="p-1.5 rounded-full" style={{ backgroundColor: `${themeColors.yellow}20` }}>
          <Utensils className="h-4 w-4" style={{ color: themeColors.yellow }} />
        </div>
      ),
    },
    {
      category: "Ocupación Media",
      value: 72,
      industryAverage: 65,
      topPerformers: 85,
      trend: "up" as const,
    },
    {
      category: "Rotación Mesas",
      value: 2.1,
      industryAverage: 1.8,
      topPerformers: 2.5,
      trend: "up" as const,
    },
    {
      category: "Ticket Medio",
      value: 35,
      industryAverage: 32,
      topPerformers: 45,
      trend: "stable" as const,
    },
  ]

  // Calcular totales
  const totalCosts = costCategories.reduce((sum, category) => sum + category.total, 0)
  const estimatedMonthlySales = baseData.averageTicket * baseData.totalCapacity * 30 * 0.7 // 70% de ocupación media

  // Calcular porcentajes
  const categoriesWithPercentages = costCategories.map((category) => ({
    ...category,
    percentOfSales: (category.total / estimatedMonthlySales) * 100,
    percentOfTotalCost: (category.total / totalCosts) * 100,
    items: category.items.map((item) => ({
      ...item,
      percentOfSales: (item.amount / estimatedMonthlySales) * 100,
      percentOfTotalCost: (item.amount / totalCosts) * 100,
    })),
  }))

  // Cargar valores actuales
  useEffect(() => {
    setSelectedProvider(provider)
    setKeyInput(apiKey || "")
  }, [provider, apiKey])

  const handleSave = () => {
    if (selectedProvider) {
      setProvider(selectedProvider)
      setApiKey(keyInput)
      setIsSaved(true)

      // Resetear el estado después de 3 segundos
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }
  }

  // Función para actualizar los datos base
  const handleBaseDataUpdate = () => {
    // Aquí iría la lógica para guardar los datos en el backend
    console.log("Datos base actualizados:", baseData)
  }

  // Función para añadir un nuevo ítem de coste
  const handleAddCostItem = (categoryId: string) => {
    setCostCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          const newItem = {
            id: `${categoryId}-${category.items.length + 1}`,
            name: "Nuevo concepto",
            amount: 0,
          }
          return {
            ...category,
            items: [...category.items, newItem],
            total: category.total, // Se actualizará cuando se edite el importe
          }
        }
        return category
      }),
    )
  }

  // Función para eliminar un ítem de coste
  const handleRemoveCostItem = (categoryId: string, itemId: string) => {
    setCostCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          const updatedItems = category.items.filter((item) => item.id !== itemId)
          const newTotal = updatedItems.reduce((sum, item) => sum + item.amount, 0)
          return {
            ...category,
            items: updatedItems,
            total: newTotal,
          }
        }
        return category
      }),
    )
  }

  // Función para actualizar un ítem de coste
  const handleUpdateCostItem = (categoryId: string, itemId: string, field: string, value: any) => {
    setCostCategories((prevCategories) =>
      prevCategories.map((category) => {
        if (category.id === categoryId) {
          const updatedItems = category.items.map((item) => {
            if (item.id === itemId) {
              return { ...item, [field]: field === "amount" ? Number.parseFloat(value) || 0 : value }
            }
            return item
          })
          const newTotal = updatedItems.reduce((sum, item) => sum + item.amount, 0)
          return {
            ...category,
            items: updatedItems,
            total: newTotal,
          }
        }
        return category
      }),
    )
  }

  // Datos para el gráfico de barras
  const chartData = categoriesWithPercentages.map((category) => ({
    label: category.name,
    value: category.percentOfTotalCost || 0,
    color: category.color,
  }))

  // Calcular el punto de equilibrio en comensales
  const breakEvenInCustomers = Math.ceil(baseData.breakEvenPoint / baseData.averageTicket)

  // Calcular el estado actual vs objetivo
  const currentRevenue = estimatedMonthlySales
  const breakEvenPercentage = (currentRevenue / baseData.breakEvenPoint) * 100
  const breakEvenStatus = breakEvenPercentage >= 100 ? "success" : breakEvenPercentage >= 80 ? "warning" : "danger"

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Configuración</h1>
        <p className="text-xs text-[#227c9d]">Personaliza la configuración de tu aplicación</p>
      </div>

      <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
        <TabsList className="grid grid-cols-4 mb-4">
          <TabsTrigger value="general" className="text-xs">
            General
          </TabsTrigger>
          <TabsTrigger value="notificaciones" className="text-xs">
            Notificaciones
          </TabsTrigger>
          <TabsTrigger value="costes" className="text-xs">
            Estructura de Costes
          </TabsTrigger>
          <TabsTrigger value="benchmarks" className="text-xs">
            Benchmarks
          </TabsTrigger>
        </TabsList>

        <TabsContent value="general" className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Card className="p-4">
              <h2 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
                <Settings className="h-4 w-4 mr-2 text-[#02b1c4]" />
                Configuración General
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[#364f6b] block mb-1">Tema</label>
                  <select className="w-full text-xs border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]">
                    <option value="light">Claro</option>
                    <option value="dark">Oscuro</option>
                    <option value="system">Sistema</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#364f6b] block mb-1">Idioma</label>
                  <select className="w-full text-xs border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]">
                    <option value="es">Español</option>
                    <option value="en">English</option>
                    <option value="ca">Català</option>
                  </select>
                </div>

                <div>
                  <label className="text-xs font-medium text-[#364f6b] block mb-1">Moneda</label>
                  <select className="w-full text-xs border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]">
                    <option value="EUR">Euro (€)</option>
                    <option value="USD">Dólar ($)</option>
                    <option value="GBP">Libra (£)</option>
                  </select>
                </div>
              </div>
            </Card>

            <Card className="p-4">
              <h2 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
                <Key className="h-4 w-4 mr-2 text-[#02b1c4]" />
                Configuración de IA
              </h2>

              <div className="space-y-4">
                <div>
                  <label className="text-xs font-medium text-[#364f6b] block mb-1">Proveedor de IA</label>
                  <div className="flex gap-2">
                    <button
                      className={`flex-1 text-xs py-2 px-3 rounded-md border transition-colors ${
                        selectedProvider === "openai"
                          ? "bg-[#02b1c4] text-white border-[#02b1c4]"
                          : "bg-white text-[#364f6b] border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedProvider("openai")}
                    >
                      OpenAI
                    </button>
                    <button
                      className={`flex-1 text-xs py-2 px-3 rounded-md border transition-colors ${
                        selectedProvider === "gemini"
                          ? "bg-[#02b1c4] text-white border-[#02b1c4]"
                          : "bg-white text-[#364f6b] border-gray-200 hover:bg-gray-50"
                      }`}
                      onClick={() => setSelectedProvider("gemini")}
                    >
                      Gemini
                    </button>
                  </div>
                </div>

                <div>
                  <div className="flex justify-between items-center mb-1">
                    <label className="text-xs font-medium text-[#364f6b]">API Key</label>
                    <button className="text-[10px] text-[#02b1c4] hover:underline" onClick={() => setShowKey(!showKey)}>
                      {showKey ? "Ocultar" : "Mostrar"}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showKey ? "text" : "password"}
                      value={keyInput}
                      onChange={(e) => setKeyInput(e.target.value)}
                      placeholder={`Introduce tu ${selectedProvider === "openai" ? "OpenAI" : selectedProvider === "gemini" ? "Gemini" : "IA"} API Key`}
                      className="w-full text-xs border rounded-md p-2 pr-10 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]"
                    />
                    <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-[#227c9d]" />
                  </div>
                  <p className="text-[10px] text-[#227c9d] mt-1">
                    Tu API key se almacena localmente y nunca se comparte con terceros.
                  </p>
                </div>

                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    {isConfigured ? (
                      <>
                        <Check className="h-3.5 w-3.5 text-[#17c3b2] mr-1.5" />
                        <span className="text-xs text-[#17c3b2]">IA configurada correctamente</span>
                      </>
                    ) : (
                      <>
                        <AlertTriangle className="h-3.5 w-3.5 text-[#fe6d73] mr-1.5" />
                        <span className="text-xs text-[#fe6d73]">IA no configurada</span>
                      </>
                    )}
                  </div>

                  <Button
                    onClick={handleSave}
                    disabled={!selectedProvider || !keyInput}
                    className="text-xs h-8 bg-[#02b1c4] hover:bg-[#02b1c4]/90"
                  >
                    {isSaved ? (
                      <>
                        <Check className="h-3.5 w-3.5 mr-1.5" />
                        Guardado
                      </>
                    ) : (
                      <>
                        <Save className="h-3.5 w-3.5 mr-1.5" />
                        Guardar
                      </>
                    )}
                  </Button>
                </div>
              </div>
            </Card>
          </div>
        </TabsContent>

        <TabsContent value="notificaciones">
          <Card className="p-4">
            <h2 className="text-sm font-medium text-[#364f6b] mb-3">Configuración de Notificaciones</h2>

            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#364f6b]">Alertas de ventas</p>
                  <p className="text-[10px] text-[#227c9d]">
                    Recibe alertas cuando las ventas estén por debajo del objetivo
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#02b1c4]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#364f6b]">Alertas de costes</p>
                  <p className="text-[10px] text-[#227c9d]">Recibe alertas cuando los costes superen el presupuesto</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#02b1c4]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#364f6b]">Recomendaciones de IA</p>
                  <p className="text-[10px] text-[#227c9d]">
                    Recibe recomendaciones personalizadas basadas en tus datos
                  </p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" defaultChecked />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#02b1c4]"></div>
                </label>
              </div>

              <div className="flex items-center justify-between">
                <div>
                  <p className="text-xs font-medium text-[#364f6b]">Notificaciones por email</p>
                  <p className="text-[10px] text-[#227c9d]">Recibe un resumen diario por email</p>
                </div>
                <label className="relative inline-flex items-center cursor-pointer">
                  <input type="checkbox" className="sr-only peer" />
                  <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#02b1c4]"></div>
                </label>
              </div>
            </div>
          </Card>
        </TabsContent>

        <TabsContent value="costes" className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#364f6b] mb-1">Estructura de Costes & Punto de Equilibrio</h2>
            <p className="text-xs text-[#227c9d]">
              Introduce y analiza los costes de tu restaurante para mejorar la rentabilidad y preparar la expansión
            </p>
          </div>

          {/* Subtabs para la sección de costes */}
          <Tabs value={costSubTab} onValueChange={setCostSubTab} className="w-full">
            <TabsList className="grid grid-cols-3 mb-4">
              <TabsTrigger value="datos-base" className="text-xs">
                Datos Base
              </TabsTrigger>
              <TabsTrigger value="costes-detalle" className="text-xs">
                Estructura de Costes
              </TabsTrigger>
              <TabsTrigger value="resumen" className="text-xs">
                Resumen Visual
              </TabsTrigger>
            </TabsList>

            {/* Contenido de la pestaña Datos Base */}
            <TabsContent value="datos-base" className="space-y-4">
              <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
                <h3 className="text-sm font-medium text-[#364f6b] mb-3">Datos Base del Restaurante</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="totalCapacity" className="text-xs text-[#227c9d]">
                      Capacidad total
                    </Label>
                    <Input
                      id="totalCapacity"
                      type="number"
                      value={baseData.totalCapacity}
                      onChange={(e) =>
                        setBaseData({ ...baseData, totalCapacity: Number.parseInt(e.target.value) || 0 })
                      }
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="dailyShifts" className="text-xs text-[#227c9d]">
                      Número de turnos diarios
                    </Label>
                    <Input
                      id="dailyShifts"
                      type="number"
                      value={baseData.dailyShifts}
                      onChange={(e) => {
                        const shifts = Number.parseInt(e.target.value) || 1
                        setBaseData({
                          ...baseData,
                          dailyShifts: shifts,
                          capacityPerShift: Array(shifts).fill(Math.floor(baseData.totalCapacity / shifts)),
                        })
                      }}
                      className="h-8 text-xs"
                      min={1}
                    />
                  </div>

                  {Array.from({ length: baseData.dailyShifts }).map((_, index) => (
                    <div key={`shift-${index}`} className="space-y-2">
                      <Label htmlFor={`capacityShift${index + 1}`} className="text-xs text-[#227c9d]">
                        Capacidad turno {index + 1}
                      </Label>
                      <Input
                        id={`capacityShift${index + 1}`}
                        type="number"
                        value={baseData.capacityPerShift[index] || 0}
                        onChange={(e) => {
                          const newCapacities = [...baseData.capacityPerShift]
                          newCapacities[index] = Number.parseInt(e.target.value) || 0
                          setBaseData({ ...baseData, capacityPerShift: newCapacities })
                        }}
                        className="h-8 text-xs"
                      />
                    </div>
                  ))}

                  <div className="space-y-2">
                    <Label htmlFor="breakEvenPoint" className="text-xs text-[#227c9d]">
                      Punto de equilibrio (€)
                    </Label>
                    <Input
                      id="breakEvenPoint"
                      type="number"
                      value={baseData.breakEvenPoint}
                      onChange={(e) =>
                        setBaseData({ ...baseData, breakEvenPoint: Number.parseInt(e.target.value) || 0 })
                      }
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="averageTicket" className="text-xs text-[#227c9d]">
                      Ticket medio (€)
                    </Label>
                    <Input
                      id="averageTicket"
                      type="number"
                      value={baseData.averageTicket}
                      onChange={(e) =>
                        setBaseData({ ...baseData, averageTicket: Number.parseInt(e.target.value) || 0 })
                      }
                      className="h-8 text-xs"
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="expectedGrossMargin" className="text-xs text-[#227c9d]">
                      Margen bruto esperado (%)
                    </Label>
                    <Input
                      id="expectedGrossMargin"
                      type="number"
                      value={baseData.expectedGrossMargin}
                      onChange={(e) =>
                        setBaseData({ ...baseData, expectedGrossMargin: Number.parseInt(e.target.value) || 0 })
                      }
                      className="h-8 text-xs"
                      min={0}
                      max={100}
                    />
                  </div>
                </div>

                <div className="mt-4 flex justify-end">
                  <Button onClick={handleBaseDataUpdate} className="text-xs h-8 gap-1.5">
                    <Save className="h-3.5 w-3.5" />
                    Actualizar datos base
                  </Button>
                </div>
              </Card>

              {/* KPIs calculados */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <MetricCard
                  title="Ventas estimadas mensuales"
                  value={`€${estimatedMonthlySales.toLocaleString()}`}
                  subValue="basado en 70% ocupación"
                  icon={<TrendingUp className="h-3.5 w-3.5 text-[#02b1c4]" />}
                />

                <MetricCard
                  title="Punto de equilibrio"
                  value={`€${baseData.breakEvenPoint.toLocaleString()}`}
                  subValue={`${breakEvenInCustomers} comensales`}
                  icon={<BarChart2 className="h-3.5 w-3.5 text-[#02b1c4]" />}
                />

                <MetricCard
                  title="Costes totales"
                  value={`€${totalCosts.toLocaleString()}`}
                  subValue={`${((totalCosts / estimatedMonthlySales) * 100).toFixed(1)}% de ventas`}
                  icon={<DollarSign className="h-3.5 w-3.5 text-[#02b1c4]" />}
                  negative={true}
                />

                <MetricCard
                  title="Estado actual"
                  value={breakEvenStatus === "success" ? "Por encima" : "Por debajo"}
                  subValue={`${breakEvenPercentage.toFixed(0)}% del objetivo`}
                  icon={
                    breakEvenStatus === "success" ? (
                      <TrendingUp className="h-3.5 w-3.5 text-[#17c3b2]" />
                    ) : (
                      <AlertTriangle className="h-3.5 w-3.5 text-[#fe6d73]" />
                    )
                  }
                  negative={breakEvenStatus !== "success"}
                />
              </div>
            </TabsContent>

            {/* Contenido de la pestaña Estructura de Costes */}
            <TabsContent value="costes-detalle" className="space-y-4">
              {categoriesWithPercentages.map((category) => (
                <Card
                  key={category.id}
                  className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-2">
                      <div className="p-1.5 rounded-full" style={{ backgroundColor: `${category.color}20` }}>
                        <category.icon className="h-4 w-4" style={{ color: category.color }} />
                      </div>
                      <h3 className="text-sm font-medium text-[#364f6b]">{category.name}</h3>
                    </div>
                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold text-[#364f6b]">€{category.total.toLocaleString()}</span>
                      <span className="text-xs text-[#227c9d]">
                        ({category.percentOfTotalCost?.toFixed(1)}% del total)
                      </span>
                    </div>
                  </div>

                  {/* Cabecera de la tabla */}
                  <div className="grid grid-cols-12 gap-2 mb-1 px-2">
                    <div className="col-span-5 text-xs font-medium text-[#227c9d]">Concepto</div>
                    <div className="col-span-2 text-xs font-medium text-[#227c9d] text-right">Importe (€)</div>
                    <div className="col-span-2 text-xs font-medium text-[#227c9d] text-right">% ventas</div>
                    <div className="col-span-2 text-xs font-medium text-[#227c9d] text-right">% coste total</div>
                    <div className="col-span-1"></div>
                  </div>

                  {/* Ítems de coste */}
                  <div className="space-y-1">
                    {category.items.map((item) => (
                      <div key={item.id} className="grid grid-cols-12 gap-2 items-center bg-gray-50 p-2 rounded-md">
                        <div className="col-span-5">
                          <Input
                            value={item.name}
                            onChange={(e) => handleUpdateCostItem(category.id, item.id, "name", e.target.value)}
                            className="h-7 text-xs"
                          />
                        </div>
                        <div className="col-span-2">
                          <Input
                            type="number"
                            value={item.amount}
                            onChange={(e) => handleUpdateCostItem(category.id, item.id, "amount", e.target.value)}
                            className="h-7 text-xs text-right"
                          />
                        </div>
                        <div className="col-span-2 text-xs text-right text-[#227c9d]">
                          {item.percentOfSales?.toFixed(1)}%
                        </div>
                        <div className="col-span-2 text-xs text-right text-[#227c9d]">
                          {item.percentOfTotalCost?.toFixed(1)}%
                        </div>
                        <div className="col-span-1 flex justify-end">
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-6 w-6 p-0"
                            onClick={() => handleRemoveCostItem(category.id, item.id)}
                          >
                            <Trash2 className="h-3.5 w-3.5 text-[#fe6d73]" />
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>

                  {/* Botón para añadir nuevo ítem */}
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 text-xs h-7 gap-1.5 text-[#02b1c4]"
                    onClick={() => handleAddCostItem(category.id)}
                  >
                    <PlusCircle className="h-3.5 w-3.5" />
                    Añadir concepto
                  </Button>
                </Card>
              ))}

              {/* Panel de ayuda */}
              <Card className="p-4 bg-gray-50 border-dashed transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
                <div className="flex items-start gap-3">
                  <Info className="h-5 w-5 text-[#02b1c4] mt-0.5" />
                  <div>
                    <h4 className="text-sm font-medium text-[#364f6b] mb-1">Ayuda</h4>
                    <p className="text-xs text-[#227c9d]">
                      Si tienes conectado Zoho Books, algunos costes pueden actualizarse automáticamente. Solo añade
                      manualmente los costes no sincronizados.
                    </p>
                  </div>
                </div>
              </Card>
            </TabsContent>

            {/* Contenido de la pestaña Resumen Visual */}
            <TabsContent value="resumen" className="space-y-4">
              {/* Gráfico de barras */}
              <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
                <h3 className="text-sm font-medium text-[#364f6b] mb-3">Distribución de Costes</h3>

                <div className="h-64">
                  <BarChart
                    data={chartData}
                    getLabel={(item) => item.label}
                    getValue={(item) => item.value}
                    getColor={(item, _, isActive) => (isActive ? item.color : `${item.color}90`)}
                    height={250}
                    renderTooltip={(item) => (
                      <>
                        <div className="text-sm font-bold text-[#364f6b] mb-2">{item.label}</div>
                        <div className="text-xs text-[#364f6b]">
                          <div className="flex justify-between">
                            <span>% del coste total:</span>
                            <span className="font-medium">{item.value.toFixed(1)}%</span>
                          </div>
                        </div>
                      </>
                    )}
                  />
                </div>
              </Card>

              {/* Punto de equilibrio vs ingresos actuales */}
              <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
                <h3 className="text-sm font-medium text-[#364f6b] mb-3">Punto de Equilibrio vs Ingresos Actuales</h3>

                <div className="relative h-16 bg-gray-100 rounded-md overflow-hidden">
                  {/* Barra de progreso */}
                  <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-[#02b1c4] to-[#17c3b2]"
                    style={{ width: `${Math.min(breakEvenPercentage, 100)}%` }}
                    initial={{ width: 0 }}
                    animate={{ width: `${Math.min(breakEvenPercentage, 100)}%` }}
                    transition={{ duration: 1, ease: "easeOut" }}
                  />

                  {/* Línea de punto de equilibrio */}
                  <div className="absolute top-0 left-[100%] h-full border-l-2 border-dashed border-[#fe6d73] transform -translate-x-full">
                    <div className="absolute top-0 transform -translate-x-1/2 -translate-y-1/2 bg-white text-[#fe6d73] text-xs font-medium px-1 rounded">
                      Punto de equilibrio
                    </div>
                  </div>

                  {/* Valor actual */}
                  <div className="absolute top-1/2 left-0 transform -translate-y-1/2 ml-3 text-white text-sm font-bold">
                    €{currentRevenue.toLocaleString()} ({breakEvenPercentage.toFixed(0)}%)
                  </div>
                </div>

                <div className="flex justify-between mt-3 text-xs">
                  <div className="text-[#227c9d]">€0</div>
                  <div className="text-[#fe6d73] font-medium">€{baseData.breakEvenPoint.toLocaleString()}</div>
                  <div className="text-[#227c9d]">€{(baseData.breakEvenPoint * 1.5).toLocaleString()}</div>
                </div>
              </Card>

              {/* Indicador de desviación y estado */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
                  <h3 className="text-sm font-medium text-[#364f6b] mb-3">Indicador de Desviación</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1">
                      <div className="text-xs text-[#227c9d]">Costes sobre ventas</div>
                      <div className="text-lg font-bold text-[#364f6b]">
                        {((totalCosts / estimatedMonthlySales) * 100).toFixed(1)}%
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs text-[#227c9d]">Objetivo</div>
                      <div className="text-lg font-bold text-[#364f6b]">
                        {(100 - baseData.expectedGrossMargin).toFixed(1)}%
                      </div>
                    </div>

                    <div className="space-y-1">
                      <div className="text-xs text-[#227c9d]">Desviación</div>
                      <div
                        className={`text-lg font-bold ${
                          ((totalCosts / estimatedMonthlySales) * 100) <= (100 - baseData.expectedGrossMargin)
                            ? "text-[#17c3b2]"
                            : "text-[#fe6d73]"
                        }`}
                      >
                        {((totalCosts / estimatedMonthlySales) * 100 - (100 - baseData.expectedGrossMargin)).toFixed(1)}
                        %
                      </div>
                    </div>
                  </div>
                </Card>

                <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20">
                  <h3 className="text-sm font-medium text-[#364f6b] mb-3">Estado Actual / Objetivo</h3>

                  <div className="flex items-center justify-between">
                    <div className="space-y-1 text-center">
                      <div className="text-xs text-[#227c9d]">Ventas actuales</div>
                      <div className="text-lg font-bold text-[#364f6b]">€{estimatedMonthlySales.toLocaleString()}</div>
                    </div>

                    <div
                      className={`text-2xl font-bold ${
                        breakEvenStatus === "success"
                          ? "text-[#17c3b2]"
                          : breakEvenStatus === "warning"
                            ? "text-[#ffcb77]"
                            : "text-[#fe6d73]"
                      }`}
                    >
                      {breakEvenStatus === "success" ? "✓" : breakEvenStatus === "warning" ? "!" : "✗"}
                    </div>

                    <div className="space-y-1 text-center">
                      <div className="text-xs text-[#227c9d]">Punto de equilibrio</div>
                      <div className="text-lg font-bold text-[#364f6b]">
                        €{baseData.breakEvenPoint.toLocaleString()}
                      </div>
                    </div>
                  </div>

                  <div className="mt-3 text-xs text-center text-[#227c9d]">
                    {breakEvenStatus === "success"
                      ? "¡Felicidades! Estás por encima del punto de equilibrio."
                      : breakEvenStatus === "warning"
                        ? "Estás cerca del punto de equilibrio, pero aún no lo has alcanzado."
                        : "Necesitas aumentar tus ventas o reducir costes para alcanzar el punto de equilibrio."}
                  </div>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>

        <TabsContent value="benchmarks" className="space-y-4">
          <div>
            <h2 className="text-xl font-bold text-[#364f6b] mb-1">Benchmarks del Sector</h2>
            <p className="text-xs text-[#227c9d]">
              Compara tu rendimiento con la media del sector y los mejores restaurantes
            </p>
          </div>

          {/* Visualización de benchmarks */}
          <BenchmarkVisualization data={benchmarkData} />
        </TabsContent>
      </Tabs>
    </div>
  )
}
