import { KpiDetails } from "@/components/kpi-details"

export default function KpisPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">KPIs</h1>
        <p className="text-xs text-[#227c9d]">
          Análisis detallado de los indicadores clave de rendimiento de tu restaurante
        </p>
      </div>

      <KpiDetails />
    </div>
  )
}
