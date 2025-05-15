"use client"

import { Card } from "@/components/ui/card"
import { TrendingUpIcon, ArrowUpIcon, ArrowDownIcon } from "lucide-react"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export function KpiDetails() {
  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <KpiCard title="Ticket Medio" value="€40.12" change={9.9} changeLabel="vs. mismo mes año anterior" />
        <KpiCard title="Comensales Mensuales" value="2,450" change={5.2} changeLabel="vs. mismo mes año anterior" />
        <KpiCard title="Ocupación Media" value="68%" change={3} changeLabel="vs. mismo mes año anterior" />
        <KpiCard title="Rotación de Mesas" value="1.8" change={0.2} changeLabel="vs. mismo mes año anterior" />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
            <TrendingUpIcon className="h-4 w-4 mr-2 text-[#17c3b2]" />
            Análisis de Ticket Medio
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <AnalysisItem label="Comida" value="€35.40" trend="down" percentage={75} />
            <AnalysisItem label="Cena" value="€45.80" trend="up" percentage={100} />
            <AnalysisItem label="Entre Semana" value="€38.20" trend="down" percentage={83} />
            <AnalysisItem label="Fin de Semana" value="€42.90" trend="up" percentage={93} />
          </div>

          <div className="flex items-start gap-2 bg-amber-50 p-2 rounded border-l-4 border-amber-400">
            <div>
              <p className="text-xs font-medium text-[#364f6b]">Recomendación</p>
              <p className="text-xs text-[#227c9d]">
                El ticket medio de comidas está por debajo del objetivo. Considera promocionar entrantes o postres para
                aumentarlo.
              </p>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
            <TrendingUpIcon className="h-4 w-4 mr-2 text-[#17c3b2]" />
            Análisis de Ocupación
          </h3>

          <div className="grid grid-cols-2 gap-4 mb-4">
            <AnalysisItem label="Comida" value="62%" trend="up" percentage={62} />
            <AnalysisItem label="Cena" value="74%" trend="up" percentage={74} />
            <AnalysisItem label="Entre Semana" value="58%" trend="down" percentage={58} />
            <AnalysisItem label="Fin de Semana" value="88%" trend="up" percentage={88} />
          </div>

          <div className="flex items-start gap-2 bg-green-50 p-2 rounded border-l-4 border-green-400">
            <div>
              <p className="text-xs font-medium text-[#364f6b]">Recomendación</p>
              <p className="text-xs text-[#227c9d]">
                La ocupación entre semana podría mejorarse. Considera crear promociones especiales para los días con
                menor afluencia.
              </p>
            </div>
          </div>
        </Card>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3">Evolución de Ticket Medio</h3>
          <div className="h-48 flex items-end justify-between gap-1">
            {[36.5, 37.2, 38.8, 40.1].map((value, i) => (
              <div key={i} className="relative h-full flex-1 flex flex-col justify-end">
                <div
                  className="bg-[#17c3b2] rounded-t w-full"
                  style={{ height: `${((value - 35) / 10) * 100}%` }}
                ></div>
                <span className="text-[9px] text-[#227c9d] text-center mt-1">{["Ene", "Feb", "Mar", "Abr"][i]}</span>
                <span className="text-[8px] text-[#227c9d] text-center">€{value.toFixed(1)}</span>
              </div>
            ))}
          </div>
        </Card>

        <Card className="p-4">
          <h3 className="text-sm font-medium text-[#364f6b] mb-3">Comensales por Día</h3>
          <div className="h-48 flex items-end justify-between gap-1">
            {[65, 72, 88, 95, 120, 145, 110].map((value, i) => (
              <div key={i} className="relative h-full flex-1 flex flex-col justify-end">
                <div className="bg-[#17c3b2] rounded-t w-full" style={{ height: `${(value / 150) * 100}%` }}></div>
                <span className="text-[9px] text-[#227c9d] text-center mt-1">
                  {["Lun", "Mar", "Mié", "Jue", "Vie", "Sáb", "Dom"][i]}
                </span>
                <span className="text-[8px] text-[#227c9d] text-center">{value}</span>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </div>
  )
}

interface KpiCardProps {
  title: string
  value: string
  change: number
  changeLabel: string
}

function KpiCard({ title, value, change, changeLabel }: KpiCardProps) {
  return (
    <Card className="p-3 relative overflow-hidden transition-transform duration-300 hover:-translate-y-1 hover:shadow-lg cursor-pointer">
      {/* Mantenemos el GlowingEffect exactamente como estaba */}
      <GlowingEffect
        spread={40}
        glow={true}
        disabled={false}
        proximity={64}
        inactiveZone={0.01}
        borderWidth={3}
        variant="default"
      />

      {/* Añadimos SOLO la sombra difuminada verde sin modificar nada más */}
      <div className="absolute inset-0 rounded-lg shadow-[inset_0px_0px_20px_rgba(23,195,178,0.15)] pointer-events-none"></div>

      {/* Mantenemos exactamente la estructura original */}
      <div className="mb-1 relative z-10">
        <span className="text-xs font-medium text-[#227c9d]">{title}</span>
      </div>
      <div className="mb-1 relative z-10">
        <span className="text-xl font-bold text-[#17c3b2]">{value}</span>
      </div>
      <div className="text-[10px] text-muted-foreground relative z-10 opacity-80">
        {change > 0 ? "+" : ""}
        {change}% {changeLabel}
      </div>
    </Card>
  )
}

interface AnalysisItemProps {
  label: string
  value: string
  trend: "up" | "down"
  percentage: number
}

function AnalysisItem({ label, value, trend, percentage }: AnalysisItemProps) {
  return (
    <div className="relative overflow-hidden rounded-lg p-2 bg-white shadow-sm transition-transform duration-300 hover:-translate-y-1 hover:shadow-md cursor-pointer">
      {/* Mantenemos el GlowingEffect exactamente como estaba */}
      <GlowingEffect
        spread={30}
        glow={true}
        disabled={false}
        proximity={40}
        inactiveZone={0.01}
        borderWidth={1.5}
        variant="default"
      />

      {/* Añadimos SOLO la sombra difuminada verde sin modificar nada más */}
      <div className="absolute inset-0 rounded-lg shadow-[inset_0px_0px_15px_rgba(23,195,178,0.12)] pointer-events-none"></div>

      {/* Mantenemos exactamente la estructura original */}
      <div className="flex justify-between items-center mb-1 relative z-10">
        <div className="flex items-center">
          {trend === "up" ? (
            <ArrowUpIcon className="h-3 w-3 text-green-500 mr-1" />
          ) : (
            <ArrowDownIcon className="h-3 w-3 text-amber-500 mr-1" />
          )}
          <span className="text-xs font-medium text-[#364f6b]/70">{label}</span>
        </div>
      </div>
      <div className="text-sm font-bold text-[#17c3b2] relative z-10">{value}</div>
      <div className="w-full h-1 bg-gray-200 rounded-full mt-1 overflow-hidden relative z-10">
        <div
          className="h-full rounded-full bg-gradient-to-r from-[#fe6d73] via-[#ffcb77] to-[#17c3b2]"
          style={{ width: `${percentage}%` }}
        ></div>
      </div>
    </div>
  )
}
