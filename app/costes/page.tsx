import { CostAnalysis } from "@/components/analysis/cost-analysis"

export default function CostesPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Estructura de Costes</h1>
        <p className="text-xs text-[#227c9d]">Distribución de tus costes como porcentaje de las ventas</p>
      </div>

      <CostAnalysis />
    </div>
  )
}
