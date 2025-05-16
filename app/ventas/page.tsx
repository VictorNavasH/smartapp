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
        <TabsList className="border-b w-full justify-start mb-4">
          <TabsTrigger
            value="ventas"
            className="relative h-9 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary"
          >
            Análisis de Ventas
          </TabsTrigger>
          <TabsTrigger
            value="productos"
            className="relative h-9 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary"
          >
            Análisis de Productos
          </TabsTrigger>
          <TabsTrigger
            value="equilibrio"
            className="relative h-9 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary"
          >
            Punto de Equilibrio
          </TabsTrigger>
        </TabsList>

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
