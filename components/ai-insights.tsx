"use client"

import { Card } from "@/components/ui/card"
import { TrendingUp, AlertTriangle, Info } from "lucide-react"
import { useAI } from "@/lib/ai-context"
import { AnimatedIcon } from "@/components/ui/animated-icon"
import { motion } from "framer-motion"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export function AIInsights() {
  const { isConfigured, toggleChat } = useAI()

  // Insights simulados (en una implementación real, estos vendrían de la API de IA)
  const insights = [
    {
      type: "opportunity",
      title: "Oportunidad de incremento de ventas",
      description: "Tus datos muestran que podrías aumentar el ticket medio en €2.50 con estrategias de venta cruzada.",
      icon: TrendingUp,
      color: "#17c3b2",
    },
    {
      type: "warning",
      title: "Costes de personal elevados",
      description: "Tus costes de personal (38%) están por encima del benchmark del sector (30%).",
      icon: AlertTriangle,
      color: "#fe6d73",
    },
    {
      type: "info",
      title: "Tendencia positiva en ocupación",
      description: "La ocupación ha aumentado un 5% respecto al mes anterior, especialmente los fines de semana.",
      icon: Info,
      color: "#02b1c4",
    },
  ]

  if (!isConfigured) {
    return (
      <Card
        className="p-5 bg-gradient-to-br from-[#02b1c4]/5 to-white transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20 cursor-pointer hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden"
        onClick={toggleChat}
      >
        {/* Añadimos el efecto de brillo */}
        <GlowingEffect
          spread={30}
          glow={true}
          disabled={false}
          proximity={50}
          inactiveZone={0.01}
          borderWidth={2}
          variant="default"
        />

        <div className="flex items-center gap-2 mb-3">
          <AnimatedIcon icon={Info} color="#02b1c4" size={20} pulse />
          <h3 className="text-sm font-medium text-[#364f6b]">Insights de IA</h3>
        </div>

        <div className="flex flex-col items-center justify-center py-6 text-center">
          <AnimatedIcon icon={Info} color="#02b1c4" size={32} pulse rotate />
          <p className="text-sm text-[#364f6b] mt-3 mb-1">Configura tu asistente de IA</p>
          <p className="text-xs text-[#227c9d] mb-4">
            Obtén insights personalizados y recomendaciones basadas en tus datos
          </p>
          <motion.button
            className="text-sm bg-[#02b1c4] text-white px-4 py-2 rounded-lg hover:bg-[#02b1c4]/90 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            Configurar ahora
          </motion.button>
        </div>
      </Card>
    )
  }

  return (
    <Card className="p-5 bg-gradient-to-br from-[#02b1c4]/5 to-white transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20 hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden">
      {/* Añadimos el efecto de brillo */}
      <GlowingEffect
        spread={30}
        glow={true}
        disabled={false}
        proximity={50}
        inactiveZone={0.01}
        borderWidth={2}
        variant="default"
      />

      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2">
          <AnimatedIcon icon={Info} color="#02b1c4" size={20} pulse />
          <h3 className="text-sm font-medium text-[#364f6b]">Insights de IA</h3>
        </div>
        <motion.button
          className="text-xs text-[#02b1c4] hover:underline flex items-center"
          onClick={toggleChat}
          whileHover={{ x: 3 }}
        >
          Preguntar a la IA
        </motion.button>
      </div>

      <div className="space-y-3">
        {insights.map((insight, index) => (
          <motion.div
            key={index}
            className="p-3 rounded-xl border-l-4 bg-white shadow-sm relative overflow-hidden"
            style={{ borderLeftColor: insight.color }}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            whileHover={{ scale: 1.02, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
          >
            {/* Efecto de brillo para cada insight */}
            <GlowingEffect
              spread={20}
              glow={true}
              disabled={false}
              proximity={30}
              inactiveZone={0.01}
              borderWidth={1}
              variant="default"
            />

            <div className="flex gap-3">
              <div className="rounded-full p-2 flex-shrink-0" style={{ backgroundColor: `${insight.color}20` }}>
                <insight.icon size={16} color={insight.color} />
              </div>
              <div>
                <h4 className="text-sm font-medium text-[#364f6b] mb-1">{insight.title}</h4>
                <p className="text-xs text-[#227c9d]">{insight.description}</p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </Card>
  )
}
