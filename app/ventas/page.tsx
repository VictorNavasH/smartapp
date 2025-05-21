"use client"

import { useState } from "react"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SalesOverview } from "@/components/analysis/sales-overview"
import { SalesEvolution } from "@/components/analysis/sales-evolution"
import { ProductsAnalysis } from "@/components/analysis/products-analysis"
import { TicketsAnalysis } from "@/components/analysis/tickets-analysis"
import { ConsumptionPatterns } from "@/components/analysis/consumption-patterns"

export default function VentasPage() {
  const [activeTab, setActiveTab] = useState("resumen")

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Análisis de Ventas</h1>
        <p className="text-xs text-[#227c9d]">Evolución y comportamiento de ventas por categoría y producto</p>
      </div>

      <Tabs defaultValue="resumen" className="w-full" onValueChange={setActiveTab}>
        <TabsList className="border-b w-full justify-start mb-4">
          <TabsTrigger
            value="resumen"
            className="relative h-9 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary"
          >
            Resumen
          </TabsTrigger>
          <TabsTrigger
            value="evolucion"
            className="relative h-9 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary"
          >
            Evolución
          </TabsTrigger>
          <TabsTrigger
            value="productos"
            className="relative h-9 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary"
          >
            Productos
          </TabsTrigger>
          <TabsTrigger
            value="tickets"
            className="relative h-9 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary"
          >
            Tickets
          </TabsTrigger>
          <TabsTrigger
            value="patrones"
            className="relative h-9 rounded-none border-b-2 border-b-transparent data-[state=active]:border-b-primary data-[state=active]:text-primary"
          >
            Patrones
          </TabsTrigger>
        </TabsList>

        <TabsContent value="resumen" className="mt-0">
          <SalesOverview />
        </TabsContent>

        <TabsContent value="evolucion" className="mt-0">
          <SalesEvolution />
        </TabsContent>

        <TabsContent value="productos" className="mt-0">
          <ProductsAnalysis />
        </TabsContent>

        <TabsContent value="tickets" className="mt-0">
          <TicketsAnalysis />
        </TabsContent>

        <TabsContent value="patrones" className="mt-0">
          <ConsumptionPatterns />
        </TabsContent>
      </Tabs>
    </div>
  )
}
