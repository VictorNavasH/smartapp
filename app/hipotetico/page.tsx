import type React from "react"
import { Card } from "@/components/ui/card"
import { FlaskConical, TrendingUp, ArrowRight, DollarSign, BarChart2, Users } from "lucide-react"

export default function HipoteticoPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Análisis Hipotético</h1>
        <p className="text-xs text-[#227c9d]">Simulaciones y escenarios para la toma de decisiones estratégicas</p>
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
          <FlaskConical className="h-4 w-4 mr-2 text-[#02b1c4]" />
          Simulador de Escenarios
        </h3>
        <p className="text-xs text-[#227c9d] mb-4">Explora el impacto potencial de diferentes cambios en tu negocio</p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <ScenarioCard
            title="Aumento de Precios"
            description="Simula el impacto de un incremento en los precios de tu carta"
            icon={<DollarSign className="h-4 w-4" />}
            scenarios={[
              { name: "Incremento 5%", impact: "+€2,400 mensuales", risk: "Bajo" },
              { name: "Incremento 10%", impact: "+€4,600 mensuales", risk: "Medio" },
              { name: "Incremento 15%", impact: "+€6,200 mensuales", risk: "Alto" },
            ]}
          />

          <ScenarioCard
            title="Reducción de Costes"
            description="Simula el impacto de optimizar diferentes áreas de costes"
            icon={<TrendingUp className="h-4 w-4" />}
            scenarios={[
              { name: "Personal -5%", impact: "+€1,800 mensuales", risk: "Bajo" },
              { name: "Materia Prima -8%", impact: "+€2,200 mensuales", risk: "Medio" },
              { name: "Suministros -10%", impact: "+€950 mensuales", risk: "Bajo" },
            ]}
          />

          <ScenarioCard
            title="Expansión de Servicios"
            description="Simula el impacto de añadir nuevos servicios a tu oferta"
            icon={<BarChart2 className="h-4 w-4" />}
            scenarios={[
              { name: "Delivery", impact: "+€3,200 mensuales", risk: "Medio" },
              { name: "Eventos privados", impact: "+€4,800 mensuales", risk: "Medio" },
              { name: "Clases de cocina", impact: "+€1,500 mensuales", risk: "Bajo" },
            ]}
          />
        </div>
      </Card>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3">Análisis de Sensibilidad</h3>
          <p className="text-xs text-[#227c9d] mb-3">Cómo afectan diferentes variables a tu beneficio mensual</p>

          <div className="space-y-4">
            <SensitivityItem
              name="Precio Medio"
              currentValue="€40.00"
              sensitivity={[
                { change: "-10%", impact: "-€9,600" },
                { change: "-5%", impact: "-€4,800" },
                { change: "+5%", impact: "+€4,800" },
                { change: "+10%", impact: "+€9,600" },
              ]}
            />

            <SensitivityItem
              name="Ocupación"
              currentValue="68%"
              sensitivity={[
                { change: "-10%", impact: "-€7,200" },
                { change: "-5%", impact: "-€3,600" },
                { change: "+5%", impact: "+€3,600" },
                { change: "+10%", impact: "+€7,200" },
              ]}
            />

            <SensitivityItem
              name="Coste Personal"
              currentValue="38%"
              sensitivity={[
                { change: "+5%", impact: "-€2,400" },
                { change: "+2%", impact: "-€960" },
                { change: "-2%", impact: "+€960" },
                { change: "-5%", impact: "+€2,400" },
              ]}
            />
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3">Proyección a 12 Meses</h3>
          <p className="text-xs text-[#227c9d] mb-3">Estimación de resultados basada en tendencias actuales</p>

          <div className="h-48 flex items-end justify-between gap-1">
            {[
              { month: "May", value: 12500 },
              { month: "Jun", value: 14200 },
              { month: "Jul", value: 16800 },
              { month: "Ago", value: 18500 },
              { month: "Sep", value: 16200 },
              { month: "Oct", value: 15400 },
              { month: "Nov", value: 14800 },
              { month: "Dic", value: 18900 },
              { month: "Ene", value: 13600 },
              { month: "Feb", value: 14200 },
              { month: "Mar", value: 15800 },
              { month: "Abr", value: 17200 },
            ].map((month, i) => (
              <div key={i} className="relative h-full flex-1 flex flex-col justify-end">
                <div
                  className="bg-[#02b1c4] rounded-t w-full"
                  style={{ height: `${(month.value / 19000) * 100}%` }}
                ></div>
                <span className="text-[9px] text-[#227c9d] text-center mt-1">{month.month}</span>
              </div>
            ))}
          </div>

          <div className="flex justify-between items-center mt-2">
            <div className="text-xs text-[#227c9d]">
              Beneficio estimado: <span className="font-medium text-[#17c3b2]">€188,100</span>
            </div>
            <div className="text-xs text-[#227c9d]">
              Crecimiento: <span className="font-medium text-[#17c3b2]">+15.2%</span>
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
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">€40</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">4.7/5</td>
                <td className="py-2 px-2 text-xs text-center text-[#364f6b]">68%</td>
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
