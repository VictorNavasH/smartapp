"use client"

import { Bell, Calendar, Search, Moon, Sun, Server } from "lucide-react"
import { UserButton } from "@/components/layout/user-button"
import { useState } from "react"
import { useAI } from "@/lib/ai-context"
import { AnimatedAIIcon } from "@/components/animated-ai-icon"

export default function TopBar() {
  // Estado para simular el modo oscuro (en una implementación real, esto vendría de un contexto)
  const [isDarkMode, setIsDarkMode] = useState(false)

  // Estado para el servidor (en una implementación real, esto vendría de una API)
  const [serverStatus, setServerStatus] = useState("active") // 'active', 'warning', 'error'

  // Acceder al contexto de IA
  const { toggleChat, isConfigured } = useAI()

  return (
    <div className="h-[57px] border-b border-gray-100 bg-white/80 backdrop-blur-sm px-4 flex items-center justify-between sticky top-0 z-10">
      <div className="flex items-center gap-4">
        <div className="relative">
          <Search className="absolute left-2.5 top-2.5 h-4 w-4 text-text-secondary" />
          <input
            type="text"
            placeholder="Buscar..."
            className="h-9 w-64 rounded-md border border-gray-200 bg-white pl-9 pr-3 text-xs focus:outline-none focus:ring-1 focus:ring-primary"
          />
        </div>
        <div className="flex items-center gap-1">
          <span className="text-xs text-dark">Periodo:</span>
          <button className="flex items-center gap-1 rounded-md border border-gray-200 px-2 py-1 text-xs text-dark">
            <Calendar className="h-3 w-3 text-primary" />
            <span>Abril 2025</span>
          </button>
        </div>
      </div>

      <div className="flex items-center gap-3">
        {/* Icono de IA con borde animado */}
        <AnimatedAIIcon className={isConfigured ? "text-primary" : "text-dark/70"} onClick={toggleChat} />

        <button className="rounded-full p-1.5 text-dark/70 hover:bg-gray-100 hover:text-dark">
          <Bell className="h-[18px] w-[18px]" />
        </button>

        <div className="h-6 border-l border-gray-200 mx-1"></div>

        {/* Icono de modo oscuro/claro (intercambiable) */}
        <button
          className="rounded-full p-1.5 text-dark/70 hover:bg-gray-100 hover:text-dark"
          title={isDarkMode ? "Cambiar a modo claro" : "Cambiar a modo oscuro"}
          onClick={() => setIsDarkMode(!isDarkMode)}
        >
          {isDarkMode ? <Sun className="h-[18px] w-[18px]" /> : <Moon className="h-[18px] w-[18px]" />}
        </button>

        {/* Icono de estado del VPS con indicador visual */}
        <div className="relative">
          <button
            className={`rounded-full p-1.5 ${
              serverStatus === "active"
                ? "text-secondary shadow-[0_0_4px_rgba(23,195,178,0.4)]"
                : serverStatus === "warning"
                  ? "text-[#ffcb77] shadow-[0_0_4px_rgba(255,203,119,0.4)]"
                  : "text-accent shadow-[0_0_4px_rgba(254,109,115,0.4)]"
            } hover:bg-gray-100`}
            title={
              serverStatus === "active"
                ? "VPS activo y funcionando correctamente"
                : serverStatus === "warning"
                  ? "VPS con advertencias"
                  : "VPS con problemas"
            }
            onClick={() => {
              // Simulación de cambio de estado para demostración
              const states = ["active", "warning", "error"]
              const currentIndex = states.indexOf(serverStatus)
              const nextIndex = (currentIndex + 1) % states.length
              setServerStatus(states[nextIndex])
            }}
          >
            <Server className="h-[18px] w-[18px]" />
          </button>

          {/* Indicador de estado (más pequeño y sutil) */}
          <div
            className={`absolute bottom-0.5 right-0.5 w-2 h-2 rounded-full border border-white ${
              serverStatus === "active" ? "bg-secondary" : serverStatus === "warning" ? "bg-[#ffcb77]" : "bg-accent"
            }`}
          ></div>
        </div>

        <div className="h-6 border-l border-gray-200 mx-1"></div>
        <UserButton />
      </div>
    </div>
  )
}
