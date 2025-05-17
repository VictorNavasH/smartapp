"use client"

import { useState, useEffect } from "react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  BarChart,
  Bar,
  Cell,
} from "recharts"
import {
  Clock,
  Filter,
  Calendar,
  ChefHat,
  Award,
  AlertCircle,
  ArrowUpRight,
  ArrowDownRight,
  Search,
  X,
  BarChart2,
} from "lucide-react"
import { motion } from "framer-motion"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"

// Tipos de datos
interface PlatoTiempo {
  id: string
  nombre: string
  categoria: string
  tiempoMedio: number // en segundos
  registros: number
  estado: "ok" | "warning" | "alert" | "excluded"
  tendencia: number // porcentaje de cambio
}

interface ResumenTiempos {
  tiempoMedioGlobal: number // en segundos
  platoMasRapido: {
    nombre: string
    tiempo: number
  }
  platoMasLento: {
    nombre: string
    tiempo: number
  }
  tiemposPorCategoria: {
    categoria: string
    tiempo: number
    color: string
  }[]
  alertas: number
}

interface RegistroTiempo {
  fecha: string
  turno: string
  duracion: number // en segundos
}

interface HistogramaData {
  rango: string
  cantidad: number
}

// Datos simulados
const mockPlatos: PlatoTiempo[] = [
  {
    id: "1",
    nombre: "Pollo crujiente",
    categoria: "Smart Food",
    tiempoMedio: 455, // 7:35 min
    registros: 64,
    estado: "ok",
    tendencia: -5.2,
  },
  {
    id: "2",
    nombre: "Hamburguesa clásica",
    categoria: "Smart Food",
    tiempoMedio: 380, // 6:20 min
    registros: 87,
    estado: "ok",
    tendencia: 2.1,
  },
  {
    id: "3",
    nombre: "Ensalada César",
    categoria: "Smart Food",
    tiempoMedio: 240, // 4:00 min
    registros: 42,
    estado: "ok",
    tendencia: -8.5,
  },
  {
    id: "4",
    nombre: "Pasta Carbonara",
    categoria: "Smart Food",
    tiempoMedio: 510, // 8:30 min
    registros: 56,
    estado: "warning",
    tendencia: 12.3,
  },
  {
    id: "5",
    nombre: "Poke Salmón",
    categoria: "Smart Pokes",
    tiempoMedio: 320, // 5:20 min
    registros: 93,
    estado: "ok",
    tendencia: -3.7,
  },
  {
    id: "6",
    nombre: "Poke Atún",
    categoria: "Smart Pokes",
    tiempoMedio: 335, // 5:35 min
    registros: 78,
    estado: "ok",
    tendencia: 1.5,
  },
  {
    id: "7",
    nombre: "Pizza Margarita",
    categoria: "Smart Food",
    tiempoMedio: 720, // 12:00 min
    registros: 35,
    estado: "alert",
    tendencia: 15.8,
  },
  {
    id: "8",
    nombre: "Poke Personalizado",
    categoria: "Smart Pokes (BYO)",
    tiempoMedio: 0,
    registros: 0,
    estado: "excluded",
    tendencia: 0,
  },
  {
    id: "9",
    nombre: "Crea tu Smart Poke",
    categoria: "Smart Pokes (BYO)",
    tiempoMedio: 0,
    registros: 0,
    estado: "excluded",
    tendencia: 0,
  },
  {
    id: "10",
    nombre: "Tarta de chocolate",
    categoria: "Postres",
    tiempoMedio: 180, // 3:00 min
    registros: 47,
    estado: "ok",
    tendencia: -1.2,
  },
]

const mockResumen: ResumenTiempos = {
  tiempoMedioGlobal: 405, // 6:45 min
  platoMasRapido: {
    nombre: "Tarta de chocolate",
    tiempo: 180, // 3:00 min
  },
  platoMasLento: {
    nombre: "Pizza Margarita",
    tiempo: 720, // 12:00 min
  },
  tiemposPorCategoria: [
    { categoria: "Smart Food", tiempo: 461, color: "#17c3b2" },
    { categoria: "Smart Pokes", tiempo: 328, color: "#02b1c4" },
    { categoria: "Postres", tiempo: 210, color: "#3d5a80" },
  ],
  alertas: 2,
}

const mockRegistros: RegistroTiempo[] = [
  { fecha: "2025-05-15", turno: "Comida", duracion: 460 },
  { fecha: "2025-05-14", turno: "Cena", duracion: 445 },
  { fecha: "2025-05-14", turno: "Comida", duracion: 470 },
  { fecha: "2025-05-13", turno: "Cena", duracion: 450 },
  { fecha: "2025-05-13", turno: "Comida", duracion: 455 },
  { fecha: "2025-05-12", turno: "Cena", duracion: 440 },
  { fecha: "2025-05-12", turno: "Comida", duracion: 465 },
]

const mockEvolucion = [
  { fecha: "2025-05-01", tiempo: 480 },
  { fecha: "2025-05-02", tiempo: 475 },
  { fecha: "2025-05-03", tiempo: 470 },
  { fecha: "2025-05-04", tiempo: 465 },
  { fecha: "2025-05-05", tiempo: 460 },
  { fecha: "2025-05-06", tiempo: 455 },
  { fecha: "2025-05-07", tiempo: 450 },
  { fecha: "2025-05-08", tiempo: 455 },
  { fecha: "2025-05-09", tiempo: 460 },
  { fecha: "2025-05-10", tiempo: 455 },
  { fecha: "2025-05-11", tiempo: 450 },
  { fecha: "2025-05-12", tiempo: 455 },
  { fecha: "2025-05-13", tiempo: 450 },
  { fecha: "2025-05-14", tiempo: 445 },
  { fecha: "2025-05-15", tiempo: 455 },
]

const mockHistograma: HistogramaData[] = [
  { rango: "3-4 min", cantidad: 2 },
  { rango: "4-5 min", cantidad: 5 },
  { rango: "5-6 min", cantidad: 12 },
  { rango: "6-7 min", cantidad: 18 },
  { rango: "7-8 min", cantidad: 15 },
  { rango: "8-9 min", cantidad: 8 },
  { rango: "9-10 min", cantidad: 4 },
]

// Función para formatear segundos a minutos:segundos
const formatTiempo = (segundos: number): string => {
  if (segundos === 0) return "—"
  const minutos = Math.floor(segundos / 60)
  const segs = segundos % 60
  return `${minutos.toString().padStart(2, "0")}:${segs.toString().padStart(2, "0")} min`
}

export function ServiceTimeAnalysis() {
  const [selectedCategoria, setSelectedCategoria] = useState<string>("todas")
  const [selectedTurno, setSelectedTurno] = useState<string>("todos")
  const [selectedPeriodo, setSelectedPeriodo] = useState<string>("semana")
  const [searchTerm, setSearchTerm] = useState<string>("")
  const [selectedPlato, setSelectedPlato] = useState<PlatoTiempo | null>(null)
  const [filteredPlatos, setFilteredPlatos] = useState<PlatoTiempo[]>(mockPlatos)
  const [loading, setLoading] = useState<boolean>(true)

  // Categorías disponibles
  const categorias = ["Smart Food", "Smart Pokes", "Postres", "Smart Pokes (BYO)"]

  // Turnos disponibles
  const turnos = ["Comida", "Cena"]

  // Periodos disponibles
  const periodos = [
    { value: "semana", label: "Última semana" },
    { value: "mes", label: "Último mes" },
    { value: "trimestre", label: "Último trimestre" },
    { value: "personalizado", label: "Personalizado" },
  ]

  // Efecto para simular carga de datos
  useEffect(() => {
    const timer = setTimeout(() => {
      setLoading(false)
    }, 1000)

    return () => clearTimeout(timer)
  }, [])

  // Efecto para filtrar platos
  useEffect(() => {
    let filtered = [...mockPlatos]

    // Filtrar por categoría
    if (selectedCategoria !== "todas") {
      filtered = filtered.filter((plato) => plato.categoria === selectedCategoria)
    }

    // Filtrar por búsqueda
    if (searchTerm) {
      filtered = filtered.filter((plato) => plato.nombre.toLowerCase().includes(searchTerm.toLowerCase()))
    }

    setFilteredPlatos(filtered)
  }, [selectedCategoria, searchTerm])

  // Función para obtener el color según el estado
  const getStatusColor = (estado: string): string => {
    switch (estado) {
      case "ok":
        return "bg-green-100 text-green-800"
      case "warning":
        return "bg-yellow-100 text-yellow-800"
      case "alert":
        return "bg-red-100 text-red-800"
      case "excluded":
        return "bg-gray-100 text-gray-500"
      default:
        return "bg-gray-100 text-gray-800"
    }
  }

  // Función para obtener el icono según el estado
  const getStatusIcon = (estado: string) => {
    switch (estado) {
      case "ok":
        return <span className="h-2 w-2 rounded-full bg-green-500 mr-1.5"></span>
      case "warning":
        return <span className="h-2 w-2 rounded-full bg-yellow-500 mr-1.5"></span>
      case "alert":
        return <span className="h-2 w-2 rounded-full bg-red-500 mr-1.5"></span>
      case "excluded":
        return <span className="h-2 w-2 rounded-full bg-gray-400 mr-1.5"></span>
      default:
        return null
    }
  }

  // Función para obtener el texto según el estado
  const getStatusText = (estado: string): string => {
    switch (estado) {
      case "ok":
        return "OK"
      case "warning":
        return "Lento"
      case "alert":
        return "Crítico"
      case "excluded":
        return "Excluido"
      default:
        return ""
    }
  }

  // Función para renderizar la tendencia
  const renderTendencia = (tendencia: number) => {
    if (tendencia === 0) return null

    return (
      <span className={`flex items-center text-xs ${tendencia < 0 ? "text-green-600" : "text-red-600"}`}>
        {tendencia < 0 ? <ArrowDownRight className="h-3 w-3 mr-0.5" /> : <ArrowUpRight className="h-3 w-3 mr-0.5" />}
        {Math.abs(tendencia).toFixed(1)}%
      </span>
    )
  }

  return (
    <div className="space-y-6">
      {/* Filtros */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-white p-4 rounded-lg shadow-sm">
        <div className="flex items-center gap-2">
          <Filter className="h-4 w-4 text-[#227c9d]" />
          <span className="text-sm text-[#364f6b]">Filtros:</span>
        </div>
        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="h-4 w-4 rounded-full bg-[#02b1c4]"></span>
            <Select value={selectedCategoria} onValueChange={setSelectedCategoria}>
              <SelectTrigger className="w-[180px] h-8 text-sm">
                <SelectValue placeholder="Todas las categorías" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todas">Todas las categorías</SelectItem>
                {categorias.map((categoria) => (
                  <SelectItem key={categoria} value={categoria}>
                    {categoria}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-[#227c9d]" />
            <Select value={selectedPeriodo} onValueChange={setSelectedPeriodo}>
              <SelectTrigger className="w-[150px] h-8 text-sm">
                <SelectValue placeholder="Seleccionar periodo" />
              </SelectTrigger>
              <SelectContent>
                {periodos.map((periodo) => (
                  <SelectItem key={periodo.value} value={periodo.value}>
                    {periodo.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="flex items-center gap-2">
            <Clock className="h-4 w-4 text-[#227c9d]" />
            <Select value={selectedTurno} onValueChange={setSelectedTurno}>
              <SelectTrigger className="w-[120px] h-8 text-sm">
                <SelectValue placeholder="Todos los turnos" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="todos">Todos los turnos</SelectItem>
                {turnos.map((turno) => (
                  <SelectItem key={turno} value={turno}>
                    {turno}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-[#02b1c4]"></div>
        </div>
      ) : (
        <>
          {/* Panel resumen general */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {/* Tiempo medio global */}
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-[4px] bg-[#02b1c4]" />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-[#02b1c4]/10 p-2">
                    <Clock className="h-5 w-5 text-[#02b1c4]" />
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    Global
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-[#364f6b]">Tiempo medio de cocina</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold text-[#364f6b]">{formatTiempo(mockResumen.tiempoMedioGlobal)}</h3>
                    <span className="ml-2 text-xs text-[#227c9d]">por plato</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plato más rápido */}
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-[4px] bg-[#17c3b2]" />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-[#17c3b2]/10 p-2">
                    <Award className="h-5 w-5 text-[#17c3b2]" />
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    Más rápido
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-[#364f6b]">{mockResumen.platoMasRapido.nombre}</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold text-[#364f6b]">
                      {formatTiempo(mockResumen.platoMasRapido.tiempo)}
                    </h3>
                    <span className="ml-2 text-xs text-[#227c9d]">promedio</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Plato más lento */}
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-[4px] bg-[#fe6d73]" />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-[#fe6d73]/10 p-2">
                    <Clock className="h-5 w-5 text-[#fe6d73]" />
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    Más lento
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-[#364f6b]">{mockResumen.platoMasLento.nombre}</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold text-[#364f6b]">
                      {formatTiempo(mockResumen.platoMasLento.tiempo)}
                    </h3>
                    <span className="ml-2 text-xs text-[#227c9d]">promedio</span>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Alertas */}
            <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
              <div className="absolute inset-x-0 top-0 h-[4px] bg-[#ffcb77]" />
              <CardContent className="pt-6">
                <div className="flex items-center justify-between">
                  <div className="rounded-full bg-[#ffcb77]/10 p-2">
                    <AlertCircle className="h-5 w-5 text-[#ffcb77]" />
                  </div>
                  <Badge variant="outline" className="text-xs font-normal">
                    Alertas
                  </Badge>
                </div>
                <div className="mt-3">
                  <p className="text-sm font-medium text-[#364f6b]">Platos con tiempo excesivo</p>
                  <div className="flex items-baseline mt-1">
                    <h3 className="text-2xl font-bold text-[#364f6b]">{mockResumen.alertas}</h3>
                    <span className="ml-2 text-xs text-[#227c9d]">platos</span>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Tiempo medio por categoría */}
          <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-[80px] bg-gradient-to-r from-[#02b1c4]/10 via-[#17c3b2]/10 to-[#02f2d2]/10 rounded-t-lg pointer-events-none" />
            <CardHeader className="relative z-10">
              <CardTitle className="text-lg font-semibold text-[#364f6b] flex items-center gap-2">
                <ChefHat className="h-5 w-5 text-[#02b1c4]" />
                Tiempo medio por categoría
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="h-[200px]">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart
                    data={mockResumen.tiemposPorCategoria}
                    layout="vertical"
                    margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
                  >
                    <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                    <XAxis
                      type="number"
                      stroke="#9ca3af"
                      fontSize={12}
                      tickFormatter={(value) => `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`}
                    />
                    <YAxis dataKey="categoria" type="category" width={120} stroke="#9ca3af" fontSize={12} />
                    <Tooltip
                      formatter={(value: number) => [
                        `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")} min`,
                        "Tiempo medio",
                      ]}
                      labelFormatter={(value) => `Categoría: ${value}`}
                    />
                    <Bar dataKey="tiempo" name="Tiempo medio (min:seg)" radius={[0, 4, 4, 0]}>
                      {mockResumen.tiemposPorCategoria.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={entry.color} />
                      ))}
                    </Bar>
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </CardContent>
          </Card>

          {/* Tabla de análisis por plato */}
          <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
            <div className="absolute inset-x-0 top-0 h-[80px] bg-gradient-to-r from-[#02b1c4]/10 via-[#17c3b2]/10 to-[#02f2d2]/10 rounded-t-lg pointer-events-none" />
            <CardHeader className="relative z-10">
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <CardTitle className="text-lg font-semibold text-[#364f6b] flex items-center gap-2">
                  <BarChart2 className="h-5 w-5 text-[#02b1c4]" />
                  Análisis por plato
                </CardTitle>
                <div className="relative mt-2 sm:mt-0">
                  <Search className="absolute left-2 top-1/2 transform -translate-y-1/2 h-4 w-4 text-gray-400" />
                  <Input
                    placeholder="Buscar plato..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="pl-8 h-8 text-sm w-full sm:w-[200px]"
                  />
                  {searchTerm && (
                    <button
                      onClick={() => setSearchTerm("")}
                      className="absolute right-2 top-1/2 transform -translate-y-1/2"
                    >
                      <X className="h-4 w-4 text-gray-400" />
                    </button>
                  )}
                </div>
              </div>
            </CardHeader>
            <CardContent>
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead className="w-[300px]">Plato</TableHead>
                      <TableHead>Categoría</TableHead>
                      <TableHead className="text-right">Tiempo Medio</TableHead>
                      <TableHead className="text-right">Nº registros</TableHead>
                      <TableHead className="text-center">Estado</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredPlatos.map((plato) => (
                      <TableRow
                        key={plato.id}
                        className={`cursor-pointer hover:bg-gray-50 ${plato.estado === "excluded" ? "opacity-60" : ""}`}
                        onClick={() => plato.estado !== "excluded" && setSelectedPlato(plato)}
                      >
                        <TableCell className="font-medium">
                          <div className="flex items-center">
                            {plato.nombre}
                            {plato.estado === "excluded" && (
                              <Badge variant="outline" className="ml-2 text-xs">
                                Excluido
                              </Badge>
                            )}
                          </div>
                        </TableCell>
                        <TableCell>{plato.categoria}</TableCell>
                        <TableCell className="text-right">
                          <div className="flex items-center justify-end">
                            {formatTiempo(plato.tiempoMedio)}
                            {plato.estado !== "excluded" && renderTendencia(plato.tendencia)}
                          </div>
                        </TableCell>
                        <TableCell className="text-right">{plato.registros > 0 ? plato.registros : "—"}</TableCell>
                        <TableCell className="text-center">
                          {plato.estado !== "excluded" ? (
                            <div className="flex items-center justify-center">
                              <Badge className={`${getStatusColor(plato.estado)}`}>
                                <div className="flex items-center">
                                  {getStatusIcon(plato.estado)}
                                  {getStatusText(plato.estado)}
                                </div>
                              </Badge>
                            </div>
                          ) : (
                            <div className="flex items-center justify-center">
                              <span className="text-gray-400">—</span>
                            </div>
                          )}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </div>
            </CardContent>
          </Card>

          {/* Vista detallada por plato */}
          {selectedPlato && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3 }}>
              <Card className="overflow-hidden bg-white hover:shadow-md transition-all duration-300">
                <div className="absolute inset-x-0 top-0 h-[80px] bg-gradient-to-r from-[#02b1c4]/10 via-[#17c3b2]/10 to-[#02f2d2]/10 rounded-t-lg pointer-events-none" />
                <CardHeader className="relative z-10">
                  <div className="flex justify-between items-center">
                    <CardTitle className="text-lg font-semibold text-[#364f6b]">
                      Detalle: {selectedPlato.nombre}
                    </CardTitle>
                    <Button variant="ghost" size="sm" onClick={() => setSelectedPlato(null)} className="h-8 px-2">
                      <X className="h-4 w-4" />
                    </Button>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {/* Evolución del tiempo promedio */}
                    <div>
                      <h3 className="text-sm font-medium text-[#364f6b] mb-4">Evolución del tiempo promedio</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <LineChart data={mockEvolucion} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis
                              dataKey="fecha"
                              stroke="#9ca3af"
                              fontSize={12}
                              tickFormatter={(value) => value.split("-")[2]}
                            />
                            <YAxis
                              stroke="#9ca3af"
                              fontSize={12}
                              tickFormatter={(value) =>
                                `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")}`
                              }
                            />
                            <Tooltip
                              formatter={(value: number) => [
                                `${Math.floor(value / 60)}:${(value % 60).toString().padStart(2, "0")} min`,
                                "Tiempo",
                              ]}
                              labelFormatter={(value) => `Fecha: ${value}`}
                            />
                            <Line
                              type="monotone"
                              dataKey="tiempo"
                              stroke="#02b1c4"
                              strokeWidth={2}
                              dot={{ r: 3, fill: "#02b1c4" }}
                              activeDot={{ r: 5, fill: "#02b1c4" }}
                            />
                          </LineChart>
                        </ResponsiveContainer>
                      </div>
                    </div>

                    {/* Histograma de frecuencia */}
                    <div>
                      <h3 className="text-sm font-medium text-[#364f6b] mb-4">Distribución de tiempos</h3>
                      <div className="h-[250px]">
                        <ResponsiveContainer width="100%" height="100%">
                          <BarChart data={mockHistograma} margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
                            <XAxis dataKey="rango" stroke="#9ca3af" fontSize={12} />
                            <YAxis stroke="#9ca3af" fontSize={12} />
                            <Tooltip
                              formatter={(value: number) => [value, "Cantidad"]}
                              labelFormatter={(value) => `Rango: ${value}`}
                            />
                            <Bar dataKey="cantidad" name="Cantidad" fill="#17c3b2" radius={[4, 4, 0, 0]} />
                          </BarChart>
                        </ResponsiveContainer>
                      </div>
                    </div>
                  </div>

                  {/* Últimos registros */}
                  <div className="mt-6">
                    <h3 className="text-sm font-medium text-[#364f6b] mb-4">Últimos registros</h3>
                    <div className="overflow-x-auto">
                      <Table>
                        <TableHeader>
                          <TableRow>
                            <TableHead>Fecha</TableHead>
                            <TableHead>Turno</TableHead>
                            <TableHead className="text-right">Duración</TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {mockRegistros.map((registro, index) => (
                            <TableRow key={index}>
                              <TableCell>{registro.fecha}</TableCell>
                              <TableCell>{registro.turno}</TableCell>
                              <TableCell className="text-right">{formatTiempo(registro.duracion)}</TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          )}
        </>
      )}
    </div>
  )
}
