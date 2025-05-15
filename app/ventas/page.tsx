"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesAnalysis } from "@/components/analysis/sales-analysis"
import { ProductAnalysis } from "@/components/analysis/product-analysis"
import { BreakEvenAnalysis } from "@/components/analysis/break-even-analysis"

export default function VentasPage() {
  const [activeTab, setActiveTab] = useState("ventas")

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Análisis de Ventas</h1>
        <p className="text-xs text-[#227c9d]">Evolución y comportamiento de ventas por categoría y producto</p>
      </div>

      <Tabs defaultValue="ventas" className="w-full" onValueChange={setActiveTab}>
        <div className="relative">
          <div className="absolute inset-x-0 top-0 h-[80px] bg-gradient-to-r from-[#02b1c4]/10 via-[#17c3b2]/10 to-[#02f2d2]/10 rounded-t-lg pointer-events-none" />
          <TabsList className="w-full bg-transparent relative z-10 mb-4">
            <TabsTrigger
              value="ventas"
              className={`flex-1 data-[state=active]:bg-white data-[state=active]:text-[#02b1c4] data-[state=active]:shadow-md transition-all`}
            >
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#02b1c4]"></span>
                Análisis de Ventas
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="productos"
              className={`flex-1 data-[state=active]:bg-white data-[state=active]:text-[#17c3b2] data-[state=active]:shadow-md transition-all`}
            >
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#17c3b2]"></span>
                Análisis de Productos
              </span>
            </TabsTrigger>
            <TabsTrigger
              value="equilibrio"
              className={`flex-1 data-[state=active]:bg-white data-[state=active]:text-[#02f2d2] data-[state=active]:shadow-md transition-all`}
            >
              <span className="flex items-center gap-2">
                <span className="w-3 h-3 rounded-full bg-[#02f2d2]"></span>
                Punto de Equilibrio
              </span>
            </TabsTrigger>
          </TabsList>
        </div>

        <TabsContent value="ventas" className="mt-0">
          <SalesAnalysis />
        </TabsContent>

        <TabsContent value="productos" className="mt-0">
          <ProductAnalysis />
        </TabsContent>

        <TabsContent value="equilibrio" className="mt-0">
          <BreakEvenAnalysis />
        </TabsContent>
      </Tabs>
    </div>
  )
}
