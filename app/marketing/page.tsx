import type React from "react"
import { Card } from "@/components/ui/card"
import { Megaphone, TrendingUp, Users, MousePointer, Globe, Instagram, Facebook } from "lucide-react"

export default function MarketingPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Marketing Digital</h1>
        <p className="text-xs text-[#227c9d]">Análisis y rendimiento de tus campañas de marketing digital</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
        <MetricCard
          title="Visitas Web"
          value="3,842"
          change={15.2}
          changeLabel="vs. mes anterior"
          icon={<Globe className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Seguidores Instagram"
          value="2,156"
          change={8.7}
          changeLabel="vs. mes anterior"
          icon={<Instagram className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Seguidores Facebook"
          value="1,845"
          change={3.2}
          changeLabel="vs. mes anterior"
          icon={<Facebook className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Reservas Online"
          value="245"
          change={22.5}
          changeLabel="vs. mes anterior"
          icon={<MousePointer className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
            <TrendingUp className="h-4 w-4 mr-2 text-[#02b1c4]" />
            Rendimiento de Campañas
          </h3>
          <div className="space-y-3">
            <CampaignItem
              name="Promoción Fin de Semana"
              platform="Instagram"
              reach="3,245"
              engagement="8.7%"
              conversions="42"
              roi="320%"
            />
            <CampaignItem
              name="Menú Degustación"
              platform="Facebook"
              reach="2,890"
              engagement="5.2%"
              conversions="35"
              roi="280%"
            />
            <CampaignItem
              name="Happy Hour"
              platform="Google Ads"
              reach="4,120"
              engagement="3.8%"
              conversions="28"
              roi="210%"
            />
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
            <Users className="h-4 w-4 mr-2 text-[#02b1c4]" />
            Audiencia Digital
          </h3>
          <div className="space-y-4">
            <div>
              <p className="text-xs font-medium text-[#364f6b] mb-1">Distribución por Edad</p>
              <div className="grid grid-cols-5 gap-1">
                {[
                  { age: "18-24", percentage: 15 },
                  { age: "25-34", percentage: 35 },
                  { age: "35-44", percentage: 25 },
                  { age: "45-54", percentage: 18 },
                  { age: "55+", percentage: 7 },
                ].map((group, i) => (
                  <div key={i} className="flex flex-col items-center">
                    <div className="w-full bg-gray-100 rounded-full h-24 relative">
                      <div
                        className="bg-[#02b1c4] rounded-t-full absolute bottom-0 w-full"
                        style={{ height: `${group.percentage}%` }}
                      ></div>
                    </div>
                    <span className="text-[10px] text-[#227c9d] mt-1">{group.age}</span>
                    <span className="text-[10px] font-medium text-[#364f6b]">{group.percentage}%</span>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <p className="text-xs font-medium text-[#364f6b] mb-1">Intereses Principales</p>
              <div className="grid grid-cols-2 gap-2">
                <InterestItem name="Gastronomía" percentage={85} />
                <InterestItem name="Vinos" percentage={62} />
                <InterestItem name="Eventos" percentage={48} />
                <InterestItem name="Viajes" percentage={42} />
              </div>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h3 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
          <Megaphone className="h-4 w-4 mr-2 text-[#02b1c4]" />
          Recomendaciones de Marketing
        </h3>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <RecommendationCard
            title="Campaña de Email"
            description="Envía una campaña a clientes que no han visitado en los últimos 2 meses con un 15% de descuento."
            impact="Alto"
            effort="Bajo"
          />
          <RecommendationCard
            title="Contenido Instagram"
            description="Aumenta la frecuencia de publicación a 4-5 veces por semana con contenido detrás de escenas."
            impact="Medio"
            effort="Medio"
          />
          <RecommendationCard
            title="Google My Business"
            description="Actualiza tu perfil con nuevas fotos y responde a todas las reseñas pendientes."
            impact="Medio"
            effort="Bajo"
          />
        </div>
      </Card>
    </div>
  )
}

interface MetricCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
  icon: React.ReactNode
}

function MetricCard({ title, value, change, changeLabel, icon }: MetricCardProps) {
  return (
    <Card className="p-2.5 relative transform scale-95 origin-top-left">
      {icon && <div className="absolute top-2.5 right-2.5 bg-gray-50 rounded-full p-1.5 bg-opacity-70">{icon}</div>}

      <div className="mb-1 pr-7">
        <span className="text-xs font-medium text-[#364f6b]">{title}</span>
      </div>
      <div className="flex items-baseline">
        <span className="text-lg font-bold text-[#02b1c4]">{value}</span>
      </div>
      <div className="flex items-center mt-1">
        <TrendingUp className="h-3 w-3 text-[#17c3b2] mr-1" />
        <span className="text-xs text-[#17c3b2]">
          +{change}% {changeLabel}
        </span>
      </div>
    </Card>
  )
}

interface CampaignItemProps {
  name: string
  platform: string
  reach: string
  engagement: string
  conversions: string
  roi: string
}

function CampaignItem({ name, platform, reach, engagement, conversions, roi }: CampaignItemProps) {
  return (
    <div className="border-b border-gray-100 pb-2 last:border-0 last:pb-0">
      <div className="flex justify-between items-start mb-1">
        <div>
          <p className="text-xs font-medium text-[#364f6b]">{name}</p>
          <p className="text-[10px] text-[#227c9d]">{platform}</p>
        </div>
        <span className="text-[10px] font-medium text-[#17c3b2] bg-[#17c3b2]/10 px-2 py-0.5 rounded-full">
          ROI: {roi}
        </span>
      </div>
      <div className="grid grid-cols-3 gap-2">
        <div>
          <p className="text-[10px] text-[#227c9d]">Alcance</p>
          <p className="text-xs font-medium text-[#364f6b]">{reach}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#227c9d]">Engagement</p>
          <p className="text-xs font-medium text-[#364f6b]">{engagement}</p>
        </div>
        <div>
          <p className="text-[10px] text-[#227c9d]">Conversiones</p>
          <p className="text-xs font-medium text-[#364f6b]">{conversions}</p>
        </div>
      </div>
    </div>
  )
}

interface InterestItemProps {
  name: string
  percentage: number
}

function InterestItem({ name, percentage }: InterestItemProps) {
  return (
    <div>
      <div className="flex justify-between items-center mb-1">
        <span className="text-[10px] text-[#364f6b]">{name}</span>
        <span className="text-[10px] font-medium text-[#364f6b]">{percentage}%</span>
      </div>
      <div className="w-full bg-gray-100 rounded-full h-1.5">
        <div className="bg-[#02b1c4] h-1.5 rounded-full" style={{ width: `${percentage}%` }}></div>
      </div>
    </div>
  )
}

interface RecommendationCardProps {
  title: string
  description: string
  impact: "Alto" | "Medio" | "Bajo"
  effort: "Alto" | "Medio" | "Bajo"
}

function RecommendationCard({ title, description, impact, effort }: RecommendationCardProps) {
  return (
    <div className="border rounded-lg p-3">
      <h4 className="text-xs font-medium text-[#364f6b] mb-1">{title}</h4>
      <p className="text-[10px] text-[#227c9d] mb-2">{description}</p>
      <div className="flex justify-between">
        <div className="flex items-center">
          <span className="text-[10px] text-[#227c9d] mr-1">Impacto:</span>
          <span
            className={`text-[10px] font-medium ${
              impact === "Alto" ? "text-[#17c3b2]" : impact === "Medio" ? "text-[#02b1c4]" : "text-[#227c9d]"
            }`}
          >
            {impact}
          </span>
        </div>
        <div className="flex items-center">
          <span className="text-[10px] text-[#227c9d] mr-1">Esfuerzo:</span>
          <span
            className={`text-[10px] font-medium ${
              effort === "Bajo" ? "text-[#17c3b2]" : effort === "Medio" ? "text-[#02b1c4]" : "text-[#fe6d73]"
            }`}
          >
            {effort}
          </span>
        </div>
      </div>
    </div>
  )
}
