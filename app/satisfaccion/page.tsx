"use client"

import SatisfactionAnalysis from "@/components/analysis/satisfaction-analysis"

export default function SatisfaccionPage() {
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Análisis de Satisfacción</h1>
        <p className="text-xs text-[#227c9d]">Analiza desde diferentes canales la satisfacción de los clientes</p>
      </div>

      <SatisfactionAnalysis />
    </div>
  )
}
