"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { Card } from "@/components/ui/card"
import {
  ArrowRightIcon,
  TrendingUpIcon,
  CalendarIcon,
  DollarSignIcon,
  UsersIcon,
  LineChartIcon,
  ShieldIcon,
  HomeIcon,
  UserIcon,
  LightbulbIcon,
  BriefcaseIcon,
  PackageIcon,
  PercentIcon,
  CreditCardIcon,
  TagIcon,
  BarChart3Icon,
  PieChartIcon,
  ArrowDownIcon,
} from "lucide-react"
import { cn } from "@/lib/utils"

export function BreakEvenAnalysis() {
  const [activeTab, setActiveTab] = useState<"general" | "detallado" | "proyeccion">("general")
  const [hoverPosition, setHoverPosition] = useState<number | null>(null)
  const chartRef = useRef<HTMLDivElement>(null)
  const [mounted, setMounted] = useState(false)

  // Aseguramos que el componente esté montado antes de aplicar efectos
  useEffect(() => {
    setMounted(true)
    return () => setMounted(false)
  }, [])

  // Función para manejar el movimiento del ratón sobre la gráfica
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!chartRef.current) return

    const rect = chartRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const relativeX = x / rect.width

    // Solo actualizar si está dentro de los límites
    if (relativeX >= 0 && relativeX <= 1) {
      setHoverPosition(relativeX)
    }
  }

  const handleMouseLeave = () => {
    setHoverPosition(null)
  }

  return (
    <div className="space-y-4">
      {/* Tabs de navegación */}
      <div className="flex space-x-1 bg-gray-100 p-1 rounded-lg">
        <TabButton
          active={activeTab === "general"}
          onClick={() => setActiveTab("general")}
          icon={<LineChartIcon className="h-3.5 w-3.5 mr-1.5" />}
        >
          General
        </TabButton>
        <TabButton
          active={activeTab === "detallado"}
          onClick={() => setActiveTab("detallado")}
          icon={<BarChart3Icon className="h-3.5 w-3.5 mr-1.5" />}
        >
          Detallado
        </TabButton>
        <TabButton
          active={activeTab === "proyeccion"}
          onClick={() => setActiveTab("proyeccion")}
          icon={<LineChartIcon className="h-3.5 w-3.5 mr-1.5" />}
        >
          Proyección
        </TabButton>
      </div>

      {/* KPIs principales en una fila, con el mismo diseño que el Dashboard */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard
          title="Punto de Equilibrio"
          value="€48,000"
          description="Ingresos necesarios este mes para cubrir todos los costes."
          icon={<TrendingUpIcon className="h-4 w-4 text-[#17c3b2]" />}
          mounted={mounted}
        />
        <KpiCard
          title="Comensales Necesarios"
          value="1,200"
          description="Según ticket medio actual de €40."
          icon={<UsersIcon className="h-4 w-4 text-[#17c3b2]" />}
          mounted={mounted}
        />
        <KpiCard
          title="Ticket Medio Necesario"
          value="€40"
          description="Para alcanzar el punto de equilibrio estimado."
          icon={<DollarSignIcon className="h-4 w-4 text-[#17c3b2]" />}
          mounted={mounted}
        />
        <KpiCard
          title="Margen de Seguridad"
          value="+12%"
          description="Porcentaje por encima del punto de equilibrio alcanzado."
          icon={<ShieldIcon className="h-4 w-4 text-[#17c3b2]" />}
          positive={true}
          mounted={mounted}
        />
      </div>

      {/* Vista específica según la pestaña seleccionada */}
      {activeTab === "general" && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-2">Análisis del Punto de Equilibrio</h3>
          <p className="text-xs text-[#227c9d] mb-4">El punto donde tus ingresos igualan a tus costes totales</p>

          <div
            ref={chartRef}
            className="h-64 relative mb-4 mx-6 rounded-md overflow-hidden"
            onMouseMove={handleMouseMove}
            onMouseLeave={handleMouseLeave}
          >
            {/* Fondo con gradiente sutil */}
            <div className="absolute inset-0 bg-gradient-to-b from-gray-50 to-white"></div>

            {/* Líneas de referencia horizontales */}
            <div className="absolute top-1/4 left-0 right-0 h-px bg-gray-100"></div>
            <div className="absolute top-1/2 left-0 right-0 h-px bg-gray-100"></div>
            <div className="absolute top-3/4 left-0 right-0 h-px bg-gray-100"></div>

            {/* Eje X */}
            <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-gray-200"></div>

            {/* Eje Y */}
            <div className="absolute top-0 bottom-0 left-0 w-0.5 bg-gray-200"></div>

            {/* Línea de Costes Totales con degradado superior mejorado */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div
                className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#fe6d73] to-[#fe6d73]"
                style={{
                  transform: "rotate(-10deg)",
                  transformOrigin: "left",
                  boxShadow: "0 0 8px rgba(254, 109, 115, 0.5)",
                }}
              ></div>
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  clipPath: "polygon(0% 80%, 100% 40%, 100% 100%, 0% 100%)",
                  background: "linear-gradient(to bottom, rgba(254, 109, 115, 0.2), rgba(254, 109, 115, 0.05))",
                }}
              ></div>
            </div>

            {/* Línea de Ingresos con degradado superior mejorado */}
            <div className="absolute top-0 left-0 w-full h-full">
              <div
                className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#17c3b2] to-[#17c3b2]"
                style={{
                  transform: "rotate(-20deg)",
                  transformOrigin: "left",
                  boxShadow: "0 0 8px rgba(23, 195, 178, 0.5)",
                }}
              ></div>
              <div
                className="absolute top-0 left-0 w-full h-full"
                style={{
                  clipPath: "polygon(0% 100%, 100% 30%, 100% 100%, 0% 100%)",
                  background: "linear-gradient(to bottom, rgba(23, 195, 178, 0.2), rgba(23, 195, 178, 0.05))",
                }}
              ></div>
            </div>

            {/* Área de beneficio */}
            <div
              className="absolute top-0 left-0 w-full h-full"
              style={{
                clipPath: "polygon(40% 40%, 100% 30%, 100% 40%, 40% 40%)",
                background: "linear-gradient(to bottom, rgba(23,195,178,0.2), rgba(23,195,178,0.05))",
              }}
            ></div>

            {/* Punto de Equilibrio */}
            <div
              className="absolute w-4 h-4 rounded-full bg-white border-2 border-[#364f6b] shadow-md"
              style={{ left: "40%", bottom: "40%", transform: "translate(-50%, 50%)" }}
            ></div>

            {/* Barra indicadora vertical que sigue al ratón */}
            {hoverPosition !== null && (
              <>
                {/* Barra vertical */}
                <div
                  className="absolute top-0 bottom-0 w-px bg-gradient-to-b from-[#364f6b] via-[#364f6b]/70 to-[#364f6b]/30 z-10"
                  style={{ left: `${hoverPosition * 100}%` }}
                ></div>

                {/* Tooltip con información */}
                <div
                  className="absolute bg-white rounded-md shadow-md p-2 z-20 border border-gray-200 text-[10px] w-32"
                  style={{
                    left: `${Math.min(Math.max(hoverPosition * 100, 10), 90)}%`,
                    bottom: "calc(100% - 40px)",
                    transform: "translateX(-50%)",
                  }}
                >
                  <div className="font-medium text-[#364f6b] mb-1">
                    {hoverPosition < 0.4 ? "Zona de Pérdidas" : "Zona de Beneficios"}
                  </div>
                  <div className="grid grid-cols-2 gap-x-1 gap-y-0.5">
                    <span className="text-[#227c9d]">Ventas:</span>
                    <span className="text-[#17c3b2] font-medium">€{Math.round(10000 + hoverPosition * 60000)}</span>
                    <span className="text-[#227c9d]">Costes:</span>
                    <span className="text-[#fe6d73] font-medium">€{Math.round(30000 - hoverPosition * 10000)}</span>
                    <span className="text-[#227c9d]">Margen:</span>
                    <span className={`font-medium ${hoverPosition < 0.4 ? "text-[#fe6d73]" : "text-[#17c3b2]"}`}>
                      {hoverPosition < 0.4 ? "-" : "+"}€
                      {Math.abs(Math.round(10000 + hoverPosition * 60000 - (30000 - hoverPosition * 10000)))}
                    </span>
                  </div>
                </div>
              </>
            )}

            {/* Etiquetas del eje X con mejor espaciado */}
            <div className="absolute bottom-2 left-0 text-[10px] text-[#227c9d]">€10k</div>
            <div className="absolute bottom-2 left-1/4 text-[10px] text-[#227c9d]">€25k</div>
            <div className="absolute bottom-2 left-2/4 text-[10px] text-[#227c9d] font-medium">€40k</div>
            <div className="absolute bottom-2 left-3/4 text-[10px] text-[#227c9d]">€55k</div>
            <div className="absolute bottom-2 right-0 text-[10px] text-[#227c9d]">€70k</div>

            {/* Leyenda mejorada */}
            <div className="absolute top-2 right-2 bg-white/80 backdrop-blur-sm rounded-md p-1.5 shadow-sm border border-gray-100">
              <div className="flex items-center gap-1.5 mb-1">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#fe6d73]"></div>
                <div className="text-[10px] text-[#364f6b]">Costes Totales</div>
              </div>
              <div className="flex items-center gap-1.5">
                <div className="w-2.5 h-2.5 rounded-sm bg-[#17c3b2]"></div>
                <div className="text-[10px] text-[#364f6b]">Ingresos</div>
              </div>
            </div>

            {/* Etiquetas del eje Y */}
            <div className="absolute top-2 left-2 text-[10px] text-[#227c9d]">€70k</div>
            <div className="absolute top-1/4 left-2 text-[10px] text-[#227c9d]">€52.5k</div>
            <div className="absolute top-1/2 left-2 text-[10px] text-[#227c9d]">€35k</div>
            <div className="absolute top-3/4 left-2 text-[10px] text-[#227c9d]">€17.5k</div>
          </div>
        </Card>
      )}

      {activeTab === "detallado" && (
        <div className="space-y-4">
          {/* Encabezado con estilo mejorado */}
          <div className="bg-gradient-to-r from-[#17c3b2]/10 to-white p-4 rounded-lg border border-[#17c3b2]/20">
            <h3 className="text-sm font-medium text-[#364f6b] mb-1">Análisis Detallado del Punto de Equilibrio</h3>
            <p className="text-xs text-[#227c9d]">
              Desglose completo de los componentes que determinan tu punto de equilibrio
            </p>
          </div>

          {/* Resumen visual del punto de equilibrio */}
          <Card className="p-4 overflow-hidden relative">
            <div className="absolute top-0 right-0 w-24 h-24 bg-[#17c3b2]/5 rounded-bl-full"></div>

            <div className="flex flex-col md:flex-row gap-4 items-center">
              <div className="w-full md:w-1/3 flex flex-col items-center justify-center p-4">
                <PieChartIcon className="h-10 w-10 text-[#17c3b2] mb-2" />
                <span className="text-xs text-[#227c9d] text-center">Punto de Equilibrio</span>
                <span className="text-2xl font-bold text-[#364f6b]">€30,758</span>
                <div className="mt-2 flex items-center text-[10px] text-[#17c3b2]">
                  <ArrowDownIcon className="h-3 w-3 mr-1" />
                  <span>-4.2% vs. mes anterior</span>
                </div>
              </div>

              <div className="w-full md:w-2/3">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-xs font-medium text-[#364f6b]">Fórmula de Cálculo</span>
                  <span className="text-[10px] text-[#227c9d] bg-gray-50 px-2 py-1 rounded">
                    Costes Fijos / Margen de Contribución
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-[#fe6d73]/5 p-3 rounded-lg border border-[#fe6d73]/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-[#364f6b]">Costes Fijos</span>
                      <span className="text-sm font-bold text-[#fe6d73]">€20,300</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#fe6d73] rounded-full" style={{ width: "100%" }}></div>
                    </div>
                  </div>

                  <div className="bg-[#17c3b2]/5 p-3 rounded-lg border border-[#17c3b2]/10">
                    <div className="flex justify-between items-center mb-1">
                      <span className="text-xs font-medium text-[#364f6b]">Margen de Contribución</span>
                      <span className="text-sm font-bold text-[#17c3b2]">66%</span>
                    </div>
                    <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
                      <div className="h-full bg-[#17c3b2] rounded-full" style={{ width: "66%" }}></div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          {/* Costes Fijos con visualización mejorada */}
          <Card className="overflow-hidden">
            <div className="bg-[#fe6d73]/10 px-4 py-2 border-b border-[#fe6d73]/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <BarChart3Icon className="h-4 w-4 text-[#fe6d73] mr-2" />
                  <h4 className="text-xs font-medium text-[#364f6b]">Costes Fijos Mensuales</h4>
                </div>
                <span className="text-sm font-bold text-[#fe6d73]">€20,300</span>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                <CostItem
                  icon={<HomeIcon className="h-3.5 w-3.5" />}
                  label="Alquiler"
                  value="€4,500"
                  percentage={22}
                  color="#fe6d73"
                />
                <CostItem
                  icon={<UserIcon className="h-3.5 w-3.5" />}
                  label="Personal"
                  value="€12,000"
                  percentage={59}
                  color="#fe6d73"
                />
                <CostItem
                  icon={<LightbulbIcon className="h-3.5 w-3.5" />}
                  label="Suministros"
                  value="€1,800"
                  percentage={9}
                  color="#fe6d73"
                />
                <CostItem
                  icon={<BriefcaseIcon className="h-3.5 w-3.5" />}
                  label="Marketing"
                  value="€1,200"
                  percentage={6}
                  color="#fe6d73"
                />
                <CostItem
                  icon={<PackageIcon className="h-3.5 w-3.5" />}
                  label="Otros"
                  value="€800"
                  percentage={4}
                  color="#fe6d73"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-[#364f6b]">Total Costes Fijos</span>
                  <span className="text-sm font-bold text-[#fe6d73]">€20,300</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Costes Variables con visualización mejorada */}
          <Card className="overflow-hidden">
            <div className="bg-[#ffcb77]/10 px-4 py-2 border-b border-[#ffcb77]/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <PercentIcon className="h-4 w-4 text-[#ffcb77] mr-2" />
                  <h4 className="text-xs font-medium text-[#364f6b]">Costes Variables (% sobre ventas)</h4>
                </div>
                <span className="text-sm font-bold text-[#ffcb77]">34%</span>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-3">
                <CostItem
                  icon={<PackageIcon className="h-3.5 w-3.5" />}
                  label="Materia Prima"
                  value="28%"
                  percentage={82}
                  color="#ffcb77"
                />
                <CostItem
                  icon={<CreditCardIcon className="h-3.5 w-3.5" />}
                  label="Comisiones"
                  value="3%"
                  percentage={9}
                  color="#ffcb77"
                />
                <CostItem
                  icon={<LightbulbIcon className="h-3.5 w-3.5" />}
                  label="Suministros Variables"
                  value="2%"
                  percentage={6}
                  color="#ffcb77"
                />
                <CostItem
                  icon={<TagIcon className="h-3.5 w-3.5" />}
                  label="Otros Variables"
                  value="1%"
                  percentage={3}
                  color="#ffcb77"
                />
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-[#364f6b]">Total Costes Variables</span>
                  <span className="text-sm font-bold text-[#ffcb77]">34%</span>
                </div>
              </div>
            </div>
          </Card>

          {/* Simulador interactivo */}
          <Card className="overflow-hidden">
            <div className="bg-[#17c3b2]/10 px-4 py-2 border-b border-[#17c3b2]/20">
              <div className="flex justify-between items-center">
                <div className="flex items-center">
                  <TrendingUpIcon className="h-4 w-4 text-[#17c3b2] mr-2" />
                  <h4 className="text-xs font-medium text-[#364f6b]">Impacto en el Punto de Equilibrio</h4>
                </div>
              </div>
            </div>

            <div className="p-4">
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <ImpactCard
                    title="Reducir Costes Fijos"
                    value="-10%"
                    impact="-€3,076"
                    description="Reducir los costes fijos en un 10% disminuiría tu punto de equilibrio"
                    color="#17c3b2"
                    positive={true}
                  />
                  <ImpactCard
                    title="Aumentar Margen"
                    value="+5%"
                    impact="-€2,154"
                    description="Aumentar el margen de contribución en 5 puntos reduciría tu punto de equilibrio"
                    color="#17c3b2"
                    positive={true}
                  />
                  <ImpactCard
                    title="Reducir Materia Prima"
                    value="-3%"
                    impact="-€1,384"
                    description="Reducir el coste de materia prima en un 3% mejoraría tu punto de equilibrio"
                    color="#17c3b2"
                    positive={true}
                  />
                </div>

                <div className="relative p-3 rounded-lg overflow-hidden group transition-all duration-300 hover:shadow-md">
                  {/* Fondo base con gradiente muy sutil */}
                  <div className="absolute inset-0 bg-white rounded-lg"></div>

                  {/* Borde con efecto arcoíris sutil */}
                  <div className="absolute inset-0 rounded-lg border border-transparent bg-gradient-to-r from-[#17c3b2]/20 via-[#ffcb77]/20 to-[#fe6d73]/20 opacity-50 group-hover:opacity-70 transition-opacity duration-500"></div>

                  {/* Sombra arcoíris interna muy sutil */}
                  <div className="absolute inset-0 rounded-lg shadow-[inset_0px_0px_8px_rgba(23,195,178,0.2),inset_0px_0px_8px_rgba(255,203,119,0.1),inset_0px_0px_8px_rgba(254,109,115,0.1)] opacity-40 group-hover:opacity-60 transition-opacity duration-500"></div>

                  {/* Efecto de brillo que se mueve sutilmente */}
                  <div className="absolute -inset-[100%] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(23,195,178,0.1)_0deg,rgba(255,203,119,0.1)_120deg,rgba(254,109,115,0.1)_240deg,rgba(23,195,178,0.1)_360deg)] opacity-30 group-hover:opacity-50 animate-[spin_15s_linear_infinite] blur-xl"></div>

                  {/* Contenido real */}
                  <div className="relative z-10">
                    <div className="flex items-center mb-2">
                      <ShieldIcon className="h-4 w-4 text-[#17c3b2] mr-2" />
                      <span className="text-xs font-medium text-[#364f6b]">Recomendación</span>
                    </div>
                    <p className="text-[11px] text-[#227c9d]">
                      Basado en tu estructura de costes, la estrategia más efectiva sería{" "}
                      <span className="font-medium text-[#17c3b2]">reducir los costes fijos</span>, especialmente en
                      personal y alquiler, que representan el 81% de tus costes fijos totales.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        </div>
      )}

      {activeTab === "proyeccion" && (
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-2">Proyección Mensual</h3>
          <p className="text-xs text-[#227c9d] mb-4">
            Estimación de ventas y punto de equilibrio para los próximos meses
          </p>

          <div className="space-y-3">
            <MonthProjection month="Mayo 2025" sales="€52,400" breakEven="€48,000" margin="+9.2%" status="positive" />
            <MonthProjection month="Junio 2025" sales="€58,600" breakEven="€47,500" margin="+23.4%" status="positive" />
            <MonthProjection month="Julio 2025" sales="€62,800" breakEven="€49,200" margin="+27.6%" status="positive" />
            <MonthProjection month="Agosto 2025" sales="€45,800" breakEven="€48,600" margin="-5.8%" status="negative" />
            <MonthProjection
              month="Septiembre 2025"
              sales="€54,200"
              breakEven="€48,800"
              margin="+11.1%"
              status="positive"
            />
          </div>
        </Card>
      )}

      {/* Mini KPIs debajo del gráfico */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MiniKpiCard
          title="Días Restantes"
          value="6"
          description="Días estimados para alcanzar el punto de equilibrio"
          icon={<CalendarIcon className="h-3.5 w-3.5 text-[#17c3b2]" />}
          mounted={mounted}
        />
        <MiniKpiCard
          title="Ventas Faltantes"
          value="€4,200"
          description="Para alcanzar el punto de equilibrio este mes"
          icon={<DollarSignIcon className="h-3.5 w-3.5 text-[#17c3b2]" />}
          mounted={mounted}
        />
        <MiniKpiCard
          title="Comensales Promedio"
          value="42/día"
          description="vs. 40/día requeridos para equilibrio"
          icon={<UsersIcon className="h-3.5 w-3.5 text-[#17c3b2]" />}
          positive={true}
          mounted={mounted}
        />
        <MiniKpiCard
          title="Proyección Mensual"
          value="€52,400"
          description="Estimación de ventas al ritmo actual"
          icon={<LineChartIcon className="h-3.5 w-3.5 text-[#17c3b2]" />}
          mounted={mounted}
        />
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-[#364f6b] mb-2">Simulador de Escenarios</h3>
        <p className="text-xs text-[#227c9d] mb-4">Cómo afectarían diferentes cambios a tu punto de equilibrio</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScenarioCard
            title="Reducción de Costes Fijos"
            value="€3,600"
            description="Reducción mensual en alquiler y suministros"
            impact="Reduce el punto de equilibrio en €4,800"
            color="#17c3b2"
            mounted={mounted}
          />

          <ScenarioCard
            title="Aumento del Ticket Medio"
            value="€2.50"
            description="Incremento en el ticket medio por cliente"
            impact="Reduce el punto de equilibrio en €3,000"
            color="#02b1c4"
            mounted={mounted}
          />

          <ScenarioCard
            title="Reducción de Costes Variables"
            value="4%"
            description="Reducción en costes de materia prima"
            impact="Reduce el punto de equilibrio en €1,920"
            color="#02f2d2"
            mounted={mounted}
          />
        </div>
      </Card>
    </div>
  )
}

interface TabButtonProps {
  active: boolean
  onClick: () => void
  children: React.ReactNode
  icon?: React.ReactNode
}

function TabButton({ active, onClick, children, icon }: TabButtonProps) {
  return (
    <button
      onClick={onClick}
      className={cn(
        "flex items-center text-xs font-medium px-3 py-1.5 rounded-md transition-all duration-200",
        active ? "bg-white text-[#364f6b] shadow-sm" : "text-[#227c9d] hover:text-[#364f6b] hover:bg-white/50",
      )}
    >
      {icon}
      {children}
    </button>
  )
}

interface KpiCardProps {
  title: string
  value: string
  description: string
  icon?: React.ReactNode
  positive?: boolean
  negative?: boolean
  mounted: boolean
}

function KpiCard({ title, value, description, icon, positive, negative, mounted }: KpiCardProps) {
  return (
    <Card className="p-3 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group">
      {/* Sombra difuminada verde sutil */}
      <div className="absolute inset-0 rounded-lg shadow-[inset_0px_0px_20px_rgba(23,195,178,0.15)] pointer-events-none"></div>

      {/* Efecto de brillo mejorado - solo se muestra cuando el componente está montado */}
      {mounted && (
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute -inset-[1px] bg-[radial-gradient(circle_at_50%_50%,rgba(23,195,178,0.15),transparent_60%)] blur-md"></div>
          <div className="absolute -inset-[1px] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(2,177,196,0.1)_0deg,rgba(23,195,178,0.1)_90deg,rgba(2,242,210,0.1)_180deg,rgba(34,124,157,0.1)_270deg,rgba(2,177,196,0.1)_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      )}

      {/* Contenido de la tarjeta con el estilo unificado del Dashboard */}
      <div className="mb-1 flex items-center relative z-10">
        {icon && <span className="mr-1.5">{icon}</span>}
        <span className="text-xs font-medium text-[#227c9d]">{title}</span>
      </div>
      <div className="mb-1 relative z-10">
        <span
          className={cn(
            "text-xl font-bold",
            positive ? "text-[#17c3b2]" : negative ? "text-[#fe6d73]" : "text-[#17c3b2]",
          )}
        >
          {value}
        </span>
      </div>
      <div className="text-[10px] text-muted-foreground relative z-10 opacity-80">{description}</div>
    </Card>
  )
}

interface MiniKpiCardProps {
  title: string
  value: string
  description: string
  icon?: React.ReactNode
  positive?: boolean
  negative?: boolean
  mounted: boolean
}

function MiniKpiCard({ title, value, description, icon, positive, negative, mounted }: MiniKpiCardProps) {
  return (
    <Card className="p-2 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer group">
      {/* Sombra difuminada verde sutil */}
      <div className="absolute inset-0 rounded-lg shadow-[inset_0px_0px_15px_rgba(23,195,178,0.12)] pointer-events-none"></div>

      {/* Efecto de brillo mejorado - solo se muestra cuando el componente está montado */}
      {mounted && (
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute -inset-[1px] bg-[radial-gradient(circle_at_50%_50%,rgba(23,195,178,0.12),transparent_60%)] blur-md"></div>
          <div className="absolute -inset-[1px] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(2,177,196,0.08)_0deg,rgba(23,195,178,0.08)_90deg,rgba(2,242,210,0.08)_180deg,rgba(34,124,157,0.08)_270deg,rgba(2,177,196,0.08)_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      )}

      {/* Contenido de la tarjeta con el estilo unificado del Dashboard pero más compacto */}
      <div className="flex items-center justify-between mb-1 relative z-10">
        <div className="flex items-center">
          {icon && <span className="mr-1">{icon}</span>}
          <span className="text-[11px] font-medium text-[#227c9d]">{title}</span>
        </div>
        <span
          className={cn(
            "text-sm font-bold",
            positive ? "text-[#17c3b2]" : negative ? "text-[#fe6d73]" : "text-[#17c3b2]",
          )}
        >
          {value}
        </span>
      </div>
      <div className="text-[9px] text-muted-foreground relative z-10 opacity-80">{description}</div>
    </Card>
  )
}

interface CostItemProps {
  icon: React.ReactNode
  label: string
  value: string
  percentage: number
  color: string
}

function CostItem({ icon, label, value, percentage, color }: CostItemProps) {
  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1">
        <div className="flex items-center">
          <div
            className={`h-5 w-5 rounded-full flex items-center justify-center mr-2 text-white`}
            style={{ backgroundColor: color }}
          >
            {icon}
          </div>
          <span className="text-[11px] text-[#364f6b] group-hover:font-medium transition-all">{label}</span>
        </div>
        <span className="text-[11px] font-medium" style={{ color }}>
          {value}
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-500 group-hover:opacity-90"
          style={{ width: `${percentage}%`, backgroundColor: color }}
        ></div>
      </div>
    </div>
  )
}

interface ImpactCardProps {
  title: string
  value: string
  impact: string
  description: string
  color: string
  positive: boolean
}

function ImpactCard({ title, value, impact, description, color, positive }: ImpactCardProps) {
  return (
    <div className="border rounded-lg overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-md group">
      <div className="px-3 py-2 border-b" style={{ backgroundColor: `${color}10`, borderColor: `${color}20` }}>
        <span className="text-xs font-medium text-[#364f6b]">{title}</span>
      </div>
      <div className="p-3">
        <div className="flex justify-between items-center mb-2">
          <span className="text-[11px] text-[#227c9d]">Cambio:</span>
          <span className="text-sm font-bold" style={{ color }}>
            {value}
          </span>
        </div>
        <div className="flex justify-between items-center mb-3">
          <span className="text-[11px] text-[#227c9d]">Impacto:</span>
          <span
            className="text-xs font-medium px-2 py-0.5 rounded-full"
            style={{ backgroundColor: `${color}15`, color }}
          >
            {impact}
          </span>
        </div>
        <p className="text-[10px] text-[#227c9d]">{description}</p>
      </div>
    </div>
  )
}

interface DetailItemProps {
  label: string
  value: string
  subtext?: string
  bold?: boolean
  color?: string
}

function DetailItem({ label, value, subtext, bold = false, color }: DetailItemProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <span className={`text-[11px] ${bold ? "font-medium" : ""} text-[#364f6b]`}>{label}</span>
        {subtext && <p className="text-[9px] text-[#227c9d] opacity-70">{subtext}</p>}
      </div>
      <span
        className={`text-[11px] ${bold ? "font-medium" : ""}`}
        style={{ color: color || (bold ? "#364f6b" : "#227c9d") }}
      >
        {value}
      </span>
    </div>
  )
}

interface MonthProjectionProps {
  month: string
  sales: string
  breakEven: string
  margin: string
  status: "positive" | "negative" | "neutral"
}

function MonthProjection({ month, sales, breakEven, margin, status }: MonthProjectionProps) {
  return (
    <div className="flex items-center border rounded-md p-2">
      <div className="w-1/4">
        <span className="text-xs font-medium text-[#364f6b]">{month}</span>
      </div>
      <div className="w-1/4">
        <span className="text-[11px] text-[#227c9d]">Ventas:</span>
        <span className="text-xs font-medium text-[#17c3b2] ml-1">{sales}</span>
      </div>
      <div className="w-1/4">
        <span className="text-[11px] text-[#227c9d]">P. Equilibrio:</span>
        <span className="text-xs font-medium text-[#364f6b] ml-1">{breakEven}</span>
      </div>
      <div className="w-1/4 flex justify-end">
        <span
          className={`text-xs font-medium px-2 py-0.5 rounded-full ${
            status === "positive"
              ? "bg-[#17c3b2]/10 text-[#17c3b2]"
              : status === "negative"
                ? "bg-[#fe6d73]/10 text-[#fe6d73]"
                : "bg-gray-100 text-[#364f6b]"
          }`}
        >
          {margin}
        </span>
      </div>
    </div>
  )
}

interface ScenarioCardProps {
  title: string
  value: string
  description: string
  impact: string
  color: string
  mounted: boolean
}

function ScenarioCard({ title, value, description, impact, color, mounted }: ScenarioCardProps) {
  return (
    <div className="border rounded-lg p-3 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer group">
      {/* Sombra difuminada verde sutil */}
      <div className="absolute inset-0 rounded-lg shadow-[inset_0px_0px_15px_rgba(23,195,178,0.12)] pointer-events-none"></div>

      {/* Efecto de brillo mejorado - solo se muestra cuando el componente está montado */}
      {mounted && (
        <div className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none overflow-hidden">
          <div className="absolute -inset-[1px] bg-[radial-gradient(circle_at_50%_50%,rgba(23,195,178,0.12),transparent_60%)] blur-md"></div>
          <div className="absolute -inset-[1px] bg-[conic-gradient(from_0deg_at_50%_50%,rgba(2,177,196,0.08)_0deg,rgba(23,195,178,0.08)_90deg,rgba(2,242,210,0.08)_180deg,rgba(34,124,157,0.08)_270deg,rgba(2,177,196,0.08)_360deg)] opacity-0 group-hover:opacity-100 transition-opacity duration-700"></div>
        </div>
      )}

      {/* Contenido original de la tarjeta de escenario */}
      <h4 className="text-xs font-medium text-[#364f6b] mb-1 relative z-10">{title}</h4>

      <div className="text-center my-3 relative z-10">
        <span className="text-xl font-bold" style={{ color }}>
          {value}
        </span>
      </div>

      <p className="text-[10px] text-[#227c9d] mb-3 relative z-10">{description}</p>

      <div className="flex items-center gap-1 text-[10px] font-medium relative z-10" style={{ color }}>
        <ArrowRightIcon className="h-3 w-3" />
        <span>{impact}</span>
      </div>
    </div>
  )
}
