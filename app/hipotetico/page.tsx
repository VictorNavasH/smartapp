"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Slider } from "@/components/ui/slider"
import { FlaskConical, TrendingUp, ArrowRight, DollarSign, BarChart2, Users, RefreshCw, Info } from "lucide-react"
import { LineChart } from "@/components/ui/line-chart"

export default function HipoteticoPage() {
  // Estado para los controles del simulador
  const [ticketMedio, setTicketMedio] = useState(40)
  const [ocupacion, setOcupacion] = useState(68)
  const [costesPersonal, setCostesPersonal] = useState(38)
  const [costesMateriaPrima, setCostesMateriaPrima] = useState(28)
  const [preciosMedio, setPreciosMedio] = useState(0) // % de cambio

  // Estado para los resultados calculados
  const [resultados, setResultados] = useState({
    beneficioMensual: 12500,
    margenBeneficio: 15.2,
    puntoEquilibrio: 48000,
    comensalesNecesarios: 1200,
    impactoTicket: 0,
    impactoOcupacion: 0,
    impactoCostesPersonal: 0,
    impactoCostesMateriaPrima: 0,
  })

  // Recalcular resultados cuando cambian los inputs
  useEffect(() => {
    // Valores base
    const ventasBase = 63000
    const beneficioBase = 12500
    const comensalesBase = 1800

    // Calcular impactos
    const impactoTicket = (ticketMedio - 40) * comensalesBase * 0.8
    const impactoOcupacion = ((ocupacion - 68) / 68) * ventasBase * 0.7
    const impactoCostesPersonal = ((38 - costesPersonal) / 38) * (ventasBase * 0.38)
    const impactoCostesMateriaPrima = ((28 - costesMateriaPrima) / 28) * (ventasBase * 0.28)
    const impactoPrecios = (preciosMedio / 100) * ventasBase

    // Calcular nuevo beneficio
    const nuevoBeneficio =
      beneficioBase +
      impactoTicket +
      impactoOcupacion +
      impactoCostesPersonal +
      impactoCostesMateriaPrima +
      impactoPrecios
    const nuevoMargen = (nuevoBeneficio / (ventasBase * (1 + preciosMedio / 100))) * 100

    // Calcular nuevo punto de equilibrio
    const costosFijos = ventasBase * 0.38 * (costesPersonal / 38) // Ajustado por cambio en costes de personal
    const margenContribucion = 1 - costesMateriaPrima / 100 - 0.06 // Otros costes variables
    const nuevoPuntoEquilibrio = costosFijos / margenContribucion

    // Actualizar resultados
    setResultados({
      beneficioMensual: Math.round(nuevoBeneficio),
      margenBeneficio: Math.round(nuevoMargen * 10) / 10,
      puntoEquilibrio: Math.round(nuevoPuntoEquilibrio),
      comensalesNecesarios: Math.round(nuevoPuntoEquilibrio / ticketMedio),
      impactoTicket,
      impactoOcupacion,
      impactoCostesPersonal,
      impactoCostesMateriaPrima,
    })
  }, [ticketMedio, ocupacion, costesPersonal, costesMateriaPrima, preciosMedio])

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Análisis Hipotético</h1>
        <p className="text-xs text-[#227c9d]">Simulaciones y escenarios para la toma de decisiones estratégicas</p>
      </div>

      <Card className="p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center">
            <FlaskConical className="h-4 w-4 mr-2 text-[#02b1c4]" />
            <h3 className="text-sm font-medium text-[#364f6b]">Simulador de Escenarios</h3>
          </div>
          <button
            className="flex items-center text-xs text-[#02b1c4] hover:text-[#017a85] transition-colors"
            onClick={() => {
              setTicketMedio(40)
              setOcupacion(68)
              setCostesPersonal(38)
              setCostesMateriaPrima(28)
              setPreciosMedio(0)
            }}
          >
            <RefreshCw className="h-3 w-3 mr-1" />
            Restablecer valores
          </button>
        </div>
        <p className="text-xs text-[#227c9d] mb-4">Ajusta las variables para ver cómo afectarían a tu negocio</p>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Panel de controles */}
          <div className="space-y-5 p-4 border rounded-lg">
            <h4 className="text-xs font-medium text-[#364f6b] mb-3">Ajusta las variables</h4>

            {/* Control de Ticket Medio */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-[#227c9d] flex items-center">
                  <DollarSign className="h-3 w-3 mr-1 text-[#02b1c4]" />
                  Ticket Medio
                </label>
                <span className="text-xs font-medium text-[#364f6b]">€{ticketMedio.toFixed(2)}</span>
              </div>
              <Slider
                value={[ticketMedio]}
                min={30}
                max={50}
                step={0.5}
                onValueChange={(value) => setTicketMedio(value[0])}
                className="py-1"
              />
              <div className="flex justify-between text-[9px] text-[#227c9d]">
                <span>€30</span>
                <span>€40</span>
                <span>€50</span>
              </div>
            </div>

            {/* Control de Ocupación */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-[#227c9d] flex items-center">
                  <Users className="h-3 w-3 mr-1 text-[#02b1c4]" />
                  Ocupación
                </label>
                <span className="text-xs font-medium text-[#364f6b]">{ocupacion}%</span>
              </div>
              <Slider
                value={[ocupacion]}
                min={40}
                max={95}
                step={1}
                onValueChange={(value) => setOcupacion(value[0])}
                className="py-1"
              />
              <div className="flex justify-between text-[9px] text-[#227c9d]">
                <span>40%</span>
                <span>68%</span>
                <span>95%</span>
              </div>
            </div>

            {/* Control de Costes de Personal */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-[#227c9d] flex items-center">
                  <Users className="h-3 w-3 mr-1 text-[#fe6d73]" />
                  Coste de Personal (% ventas)
                </label>
                <span className="text-xs font-medium text-[#364f6b]">{costesPersonal}%</span>
              </div>
              <Slider
                value={[costesPersonal]}
                min={30}
                max={45}
                step={0.5}
                onValueChange={(value) => setCostesPersonal(value[0])}
                className="py-1"
              />
              <div className="flex justify-between text-[9px] text-[#227c9d]">
                <span>30%</span>
                <span>38%</span>
                <span>45%</span>
              </div>
            </div>

            {/* Control de Costes de Materia Prima */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-[#227c9d] flex items-center">
                  <BarChart2 className="h-3 w-3 mr-1 text-[#fe6d73]" />
                  Coste Materia Prima (% ventas)
                </label>
                <span className="text-xs font-medium text-[#364f6b]">{costesMateriaPrima}%</span>
              </div>
              <Slider
                value={[costesMateriaPrima]}
                min={20}
                max={35}
                step={0.5}
                onValueChange={(value) => setCostesMateriaPrima(value[0])}
                className="py-1"
              />
              <div className="flex justify-between text-[9px] text-[#227c9d]">
                <span>20%</span>
                <span>28%</span>
                <span>35%</span>
              </div>
            </div>

            {/* Control de Cambio en Precios */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label className="text-xs text-[#227c9d] flex items-center">
                  <TrendingUp className="h-3 w-3 mr-1 text-[#02b1c4]" />
                  Cambio en Precios
                </label>
                <span
                  className={`text-xs font-medium ${preciosMedio > 0 ? "text-[#17c3b2]" : preciosMedio < 0 ? "text-[#fe6d73]" : "text-[#364f6b]"}`}
                >
                  {preciosMedio > 0 ? "+" : ""}
                  {preciosMedio}%
                </span>
              </div>
              <Slider
                value={[preciosMedio]}
                min={-15}
                max={15}
                step={1}
                onValueChange={(value) => setPreciosMedio(value[0])}
                className="py-1"
              />
              <div className="flex justify-between text-[9px] text-[#227c9d]">
                <span>-15%</span>
                <span>0%</span>
                <span>+15%</span>
              </div>
            </div>
          </div>

          {/* Panel de resultados */}
          <div className="space-y-5">
            <div className="grid grid-cols-2 gap-4">
              <ResultadoCard
                title="Beneficio Mensual"
                value={`€${resultados.beneficioMensual.toLocaleString()}`}
                icon={<DollarSign className="h-4 w-4" />}
                color={resultados.beneficioMensual >= 12500 ? "#17c3b2" : "#fe6d73"}
                change={`${resultados.beneficioMensual >= 12500 ? "+" : ""}${Math.round((resultados.beneficioMensual - 12500) / 125)}%`}
                baseline="vs. actual"
              />
              <ResultadoCard
                title="Margen de Beneficio"
                value={`${resultados.margenBeneficio}%`}
                icon={<TrendingUp className="h-4 w-4" />}
                color={resultados.margenBeneficio >= 15.2 ? "#17c3b2" : "#fe6d73"}
                change={`${resultados.margenBeneficio >= 15.2 ? "+" : ""}${(resultados.margenBeneficio - 15.2).toFixed(1)}%`}
                baseline="vs. actual"
              />
              <ResultadoCard
                title="Punto de Equilibrio"
                value={`€${resultados.puntoEquilibrio.toLocaleString()}`}
                icon={<BarChart2 className="h-4 w-4" />}
                color={resultados.puntoEquilibrio <= 48000 ? "#17c3b2" : "#fe6d73"}
                change={`${resultados.puntoEquilibrio <= 48000 ? "-" : "+"}${Math.abs(Math.round((resultados.puntoEquilibrio - 48000) / 480))}%`}
                baseline="vs. actual"
              />
              <ResultadoCard
                title="Comensales Necesarios"
                value={resultados.comensalesNecesarios.toLocaleString()}
                icon={<Users className="h-4 w-4" />}
                color={resultados.comensalesNecesarios <= 1200 ? "#17c3b2" : "#fe6d73"}
                change={`${resultados.comensalesNecesarios <= 1200 ? "-" : "+"}${Math.abs(Math.round((resultados.comensalesNecesarios - 1200) / 12))}%`}
                baseline="vs. actual"
              />
            </div>

            <div className="border rounded-lg p-4">
              <h4 className="text-xs font-medium text-[#364f6b] mb-3 flex items-center">
                <Info className="h-3.5 w-3.5 mr-1.5 text-[#02b1c4]" />
                Impacto de cada variable
              </h4>

              <div className="space-y-3">
                <ImpactoItem
                  label="Ticket Medio"
                  value={`€${Math.round(resultados.impactoTicket).toLocaleString()}`}
                  porcentaje={Math.round(resultados.impactoTicket / 125)}
                  positivo={resultados.impactoTicket >= 0}
                />
                <ImpactoItem
                  label="Ocupación"
                  value={`€${Math.round(resultados.impactoOcupacion).toLocaleString()}`}
                  porcentaje={Math.round(resultados.impactoOcupacion / 125)}
                  positivo={resultados.impactoOcupacion >= 0}
                />
                <ImpactoItem
                  label="Costes de Personal"
                  value={`€${Math.round(resultados.impactoCostesPersonal).toLocaleString()}`}
                  porcentaje={Math.round(resultados.impactoCostesPersonal / 125)}
                  positivo={resultados.impactoCostesPersonal >= 0}
                />
                <ImpactoItem
                  label="Costes de Materia Prima"
                  value={`€${Math.round(resultados.impactoCostesMateriaPrima).toLocaleString()}`}
                  porcentaje={Math.round(resultados.impactoCostesMateriaPrima / 125)}
                  positivo={resultados.impactoCostesMateriaPrima >= 0}
                />
                <ImpactoItem
                  label="Cambio en Precios"
                  value={`€${Math.round((preciosMedio / 100) * 63000).toLocaleString()}`}
                  porcentaje={Math.round(((preciosMedio / 100) * 63000) / 125)}
                  positivo={preciosMedio >= 0}
                />
              </div>

              <div className="mt-4 pt-3 border-t border-gray-100">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-medium text-[#364f6b]">Impacto Total en Beneficio</span>
                  <span
                    className={`text-sm font-bold ${resultados.beneficioMensual >= 12500 ? "text-[#17c3b2]" : "text-[#fe6d73]"}`}
                  >
                    {resultados.beneficioMensual >= 12500 ? "+" : ""}€
                    {Math.abs(resultados.beneficioMensual - 12500).toLocaleString()}
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3">Análisis de Sensibilidad</h3>
          <p className="text-xs text-[#227c9d] mb-3">Cómo afectan diferentes variables a tu beneficio mensual</p>

          <div className="space-y-4">
            <SensitivityItem
              name="Precio Medio"
              currentValue={`€${ticketMedio.toFixed(2)}`}
              sensitivity={[
                { change: "-10%", impact: `-€${Math.round(0.1 * ticketMedio * 1800 * 0.8).toLocaleString()}` },
                { change: "-5%", impact: `-€${Math.round(0.05 * ticketMedio * 1800 * 0.8).toLocaleString()}` },
                { change: "+5%", impact: `+€${Math.round(0.05 * ticketMedio * 1800 * 0.8).toLocaleString()}` },
                { change: "+10%", impact: `+€${Math.round(0.1 * ticketMedio * 1800 * 0.8).toLocaleString()}` },
              ]}
            />

            <SensitivityItem
              name="Ocupación"
              currentValue={`${ocupacion}%`}
              sensitivity={[
                { change: "-10%", impact: `-€${Math.round(((0.1 * ocupacion) / 68) * 63000 * 0.7).toLocaleString()}` },
                { change: "-5%", impact: `-€${Math.round(((0.05 * ocupacion) / 68) * 63000 * 0.7).toLocaleString()}` },
                { change: "+5%", impact: `+€${Math.round(((0.05 * ocupacion) / 68) * 63000 * 0.7).toLocaleString()}` },
                { change: "+10%", impact: `+€${Math.round(((0.1 * ocupacion) / 68) * 63000 * 0.7).toLocaleString()}` },
              ]}
            />

            <SensitivityItem
              name="Coste Personal"
              currentValue={`${costesPersonal}%`}
              sensitivity={[
                { change: "+5%", impact: `-€${Math.round(0.05 * 63000).toLocaleString()}` },
                { change: "+2%", impact: `-€${Math.round(0.02 * 63000).toLocaleString()}` },
                { change: "-2%", impact: `+€${Math.round(0.02 * 63000).toLocaleString()}` },
                { change: "-5%", impact: `+€${Math.round(0.05 * 63000).toLocaleString()}` },
              ]}
            />
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3">Proyección a 12 Meses</h3>
          <p className="text-xs text-[#227c9d] mb-3">Estimación de resultados basada en los cambios simulados</p>

          <div className="h-48">
            <LineChart
              data={[
                { month: "May", value: resultados.beneficioMensual },
                { month: "Jun", value: resultados.beneficioMensual * 1.05 },
                { month: "Jul", value: resultados.beneficioMensual * 1.15 },
                { month: "Ago", value: resultados.beneficioMensual * 1.25 },
                { month: "Sep", value: resultados.beneficioMensual * 1.1 },
                { month: "Oct", value: resultados.beneficioMensual * 1.05 },
                { month: "Nov", value: resultados.beneficioMensual * 1 },
                { month: "Dic", value: resultados.beneficioMensual * 1.3 },
                { month: "Ene", value: resultados.beneficioMensual * 0.9 },
                { month: "Feb", value: resultados.beneficioMensual * 0.95 },
                { month: "Mar", value: resultados.beneficioMensual * 1.05 },
                { month: "Abr", value: resultados.beneficioMensual * 1.15 },
              ]}
              getLabel={(item) => item.month}
              getValue={(item) => item.value}
              gradientColor="#02b1c4"
              height={180}
              showTooltip={true}
              renderTooltip={(item) => (
                <>
                  <div className="text-xs font-bold text-[#364f6b] mb-1">{item.month}</div>
                  <div className="text-xs text-[#364f6b]">
                    <div className="flex justify-between">
                      <span>Beneficio:</span>
                      <span className="font-medium">€{Math.round(item.value).toLocaleString()}</span>
                    </div>
                  </div>
                </>
              )}
            />
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-[#227c9d]">
              Beneficio estimado:{" "}
              <span className="font-medium text-[#17c3b2]">
                €{Math.round(resultados.beneficioMensual * 12.95).toLocaleString()}
              </span>
            </div>
            <div className="text-xs text-[#227c9d]">
              Crecimiento:{" "}
              <span className="font-medium text-[#17c3b2]">
                {resultados.beneficioMensual >= 12500 ? "+" : ""}
                {Math.round(((resultados.beneficioMensual * 12.95 - 12500 * 12.95) / (12500 * 12.95)) * 100)}%
              </span>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
          <Users className="h-4 w-4 mr-2 text-[#02b1c4]" />
          Análisis de Competencia
        </h3>
        <p className="text-xs text-[#227c9d] mb-4">Comparativa con competidores y oportunidades de diferenciación</p>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[600px]">
            <thead>
              <tr className="border-b border-gray-200">
                <th className="text-left py-2 px-2 text-xs font-medium text-[#364f6b]">Restaurante</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Precio Medio</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Puntuación</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Ocupación</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Fortalezas</th>
                <th className="text-center py-2 px-2 text-xs font-medium text-[#364f6b]">Oportunidades</th>
              </tr>
            </thead>
            <tbody>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2 text-xs font-medium text-[#364f6b]">Tu Restaurante</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">€{ticketMedio.toFixed(2)}</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">4.7/5</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">{ocupacion}%</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">Calidad, Servicio</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">Marketing, Delivery</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2 text-xs font-medium text-[#364f6b]">Competidor A</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">€45</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">4.5/5</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">72%</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">Ubicación, Ambiente</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">Calidad, Precio</td>
              </tr>
              <tr className="border-b border-gray-100">
                <td className="py-2 px-2 text-xs font-medium text-[#364f6b]">Competidor B</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">€35</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">4.2/5</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">65%</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">Precio, Variedad</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">Servicio, Ambiente</td>
              </tr>
              <tr>
                <td className="py-2 px-2 text-xs font-medium text-[#364f6b]">Competidor C</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">€38</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">4.6/5</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">70%</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">Marketing, Delivery</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">Calidad, Exclusividad</td>
              </tr>
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  )
}

interface ScenarioCardProps {
  title: string
  description: string
  icon: React.ReactNode
  scenarios: {
    name: string
    impact: string
    risk: "Alto" | "Medio" | "Bajo"
  }[]
}

function ScenarioCard({ title, description, icon, scenarios }: ScenarioCardProps) {
  return (
    <div className="border rounded-lg p-3">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-full bg-[#02b1c4]/10 text-[#02b1c4]">{icon}</div>
        <div>
          <h4 className="text-xs font-medium text-[#364f6b]">{title}</h4>
          <p className="text-[10px] text-[#227c9d]">{description}</p>
        </div>
      </div>

      <div className="space-y-2 mt-3">
        {scenarios.map((scenario, index) => (
          <div key={index} className="flex items-center justify-between">
            <div className="flex items-center gap-1">
              <ArrowRight className="h-3 w-3 text-[#02b1c4]" />
              <span className="text-[10px] text-[#364f6b]">{scenario.name}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-[10px] font-medium text-[#17c3b2]">{scenario.impact}</span>
              <span
                className={`text-[9px] px-1.5 py-0.5 rounded-full ${
                  scenario.risk === "Alto"
                    ? "bg-[#fe6d73]/10 text-[#fe6d73]"
                    : scenario.risk === "Medio"
                      ? "bg-[#ffcb77]/10 text-[#ffcb77]"
                      : "bg-[#17c3b2]/10 text-[#17c3b2]"
                }`}
              >
                {scenario.risk}
              </span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface SensitivityItemProps {
  name: string
  currentValue: string
  sensitivity: {
    change: string
    impact: string
  }[]
}

function SensitivityItem({ name, currentValue, sensitivity }: SensitivityItemProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs font-medium text-[#364f6b]">{name}</span>
        <span className="text-xs text-[#227c9d]">Actual: {currentValue}</span>
      </div>
      <div className="flex justify-between items-center">
        {sensitivity.map((item, index) => (
          <div key={index} className="text-center">
            <span
              className={`text-[10px] font-medium ${item.impact.startsWith("+") ? "text-[#17c3b2]" : "text-[#fe6d73]"}`}
            >
              {item.impact}
            </span>
            <div className={`text-[9px] mt-1 ${item.change.startsWith("+") ? "text-[#17c3b2]" : "text-[#fe6d73]"}`}>
              {item.change}
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

interface ResultadoCardProps {
  title: string
  value: string
  icon: React.ReactNode
  color: string
  change: string
  baseline: string
}

function ResultadoCard({ title, value, icon, color, change, baseline }: ResultadoCardProps) {
  return (
    <div className="border rounded-lg p-3 transition-all duration-300 hover:shadow-md">
      <div className="flex items-center gap-2 mb-2">
        <div className="p-1.5 rounded-full" style={{ backgroundColor: `${color}15`, color }}>
          {icon}
        </div>
        <span className="text-xs font-medium text-[#364f6b]">{title}</span>
      </div>

      <div className="text-center mb-2">
        <span className="text-xl font-bold" style={{ color }}>
          {value}
        </span>
      </div>

      <div className="flex justify-center items-center text-[10px]">
        <span className="text-[#227c9d] mr-1">{baseline}:</span>
        <span className="font-medium" style={{ color }}>
          {change}
        </span>
      </div>
    </div>
  )
}

interface ImpactoItemProps {
  label: string
  value: string
  porcentaje: number
  positivo: boolean
}

function ImpactoItem({ label, value, porcentaje, positivo }: ImpactoItemProps) {
  const color = positivo ? "#17c3b2" : "#fe6d73"
  const width = Math.min(Math.abs(porcentaje), 100)

  return (
    <div className="group">
      <div className="flex justify-between items-center mb-1">
        <span className="text-[11px] text-[#364f6b]">{label}</span>
        <span className="text-[11px] font-medium" style={{ color }}>
          {positivo && value !== "€0" ? "+" : ""}
          {value}
        </span>
      </div>
      <div className="h-1.5 w-full bg-gray-100 rounded-full overflow-hidden relative">
        <div
          className="h-full rounded-full transition-all duration-500 absolute"
          style={{
            width: `${width}%`,
            backgroundColor: color,
            right: positivo ? "auto" : 0,
            left: positivo ? 0 : "auto",
          }}
        ></div>
      </div>
    </div>
  )
}
