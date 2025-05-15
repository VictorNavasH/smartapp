"use client"

import { useState, useEffect } from "react"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useAI } from "@/lib/ai-context"
import { Settings, Key, Save, Check, AlertTriangle } from "lucide-react"

export default function ConfiguracionPage() {
  const { provider, setProvider, apiKey, setApiKey, isConfigured } = useAI()

  const [selectedProvider, setSelectedProvider] = useState<"openai" | "gemini" | null>(null)
  const [keyInput, setKeyInput] = useState("")
  const [isSaved, setIsSaved] = useState(false)
  const [showKey, setShowKey] = useState(false)

  // Cargar valores actuales
  useEffect(() => {
    setSelectedProvider(provider)
    setKeyInput(apiKey || "")
  }, [provider, apiKey])

  const handleSave = () => {
    if (selectedProvider) {
      setProvider(selectedProvider)
      setApiKey(keyInput)
      setIsSaved(true)

      // Resetear el estado después de 3 segundos
      setTimeout(() => {
        setIsSaved(false)
      }, 3000)
    }
  }

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Configuración</h1>
        <p className="text-xs text-[#227c9d]">Personaliza la configuración de tu aplicación</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Card className="p-4">
          <h2 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
            <Settings className="h-4 w-4 mr-2 text-[#02b1c4]" />
            Configuración General
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#364f6b] block mb-1">Tema</label>
              <select className="w-full text-xs border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]">
                <option value="light">Claro</option>
                <option value="dark">Oscuro</option>
                <option value="system">Sistema</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[#364f6b] block mb-1">Idioma</label>
              <select className="w-full text-xs border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]">
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="ca">Català</option>
              </select>
            </div>

            <div>
              <label className="text-xs font-medium text-[#364f6b] block mb-1">Moneda</label>
              <select className="w-full text-xs border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]">
                <option value="EUR">Euro (€)</option>
                <option value="USD">Dólar ($)</option>
                <option value="GBP">Libra (£)</option>
              </select>
            </div>
          </div>
        </Card>

        <Card className="p-4">
          <h2 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
            <Key className="h-4 w-4 mr-2 text-[#02b1c4]" />
            Configuración de IA
          </h2>

          <div className="space-y-4">
            <div>
              <label className="text-xs font-medium text-[#364f6b] block mb-1">Proveedor de IA</label>
              <div className="flex gap-2">
                <button
                  className={`flex-1 text-xs py-2 px-3 rounded-md border transition-colors ${
                    selectedProvider === "openai"
                      ? "bg-[#02b1c4] text-white border-[#02b1c4]"
                      : "bg-white text-[#364f6b] border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedProvider("openai")}
                >
                  OpenAI
                </button>
                <button
                  className={`flex-1 text-xs py-2 px-3 rounded-md border transition-colors ${
                    selectedProvider === "gemini"
                      ? "bg-[#02b1c4] text-white border-[#02b1c4]"
                      : "bg-white text-[#364f6b] border-gray-200 hover:bg-gray-50"
                  }`}
                  onClick={() => setSelectedProvider("gemini")}
                >
                  Gemini
                </button>
              </div>
            </div>

            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="text-xs font-medium text-[#364f6b]">API Key</label>
                <button className="text-[10px] text-[#02b1c4] hover:underline" onClick={() => setShowKey(!showKey)}>
                  {showKey ? "Ocultar" : "Mostrar"}
                </button>
              </div>
              <div className="relative">
                <input
                  type={showKey ? "text" : "password"}
                  value={keyInput}
                  onChange={(e) => setKeyInput(e.target.value)}
                  placeholder={`Introduce tu ${selectedProvider === "openai" ? "OpenAI" : selectedProvider === "gemini" ? "Gemini" : "IA"} API Key`}
                  className="w-full text-xs border rounded-md p-2 pr-10 focus:outline-none focus:ring-1 focus:ring-[#02b1c4]"
                />
                <Key className="absolute right-3 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-[#227c9d]" />
              </div>
              <p className="text-[10px] text-[#227c9d] mt-1">
                Tu API key se almacena localmente y nunca se comparte con terceros.
              </p>
            </div>

            <div className="flex justify-between items-center">
              <div className="flex items-center">
                {isConfigured ? (
                  <>
                    <Check className="h-3.5 w-3.5 text-[#17c3b2] mr-1.5" />
                    <span className="text-xs text-[#17c3b2]">IA configurada correctamente</span>
                  </>
                ) : (
                  <>
                    <AlertTriangle className="h-3.5 w-3.5 text-[#fe6d73] mr-1.5" />
                    <span className="text-xs text-[#fe6d73]">IA no configurada</span>
                  </>
                )}
              </div>

              <Button
                onClick={handleSave}
                disabled={!selectedProvider || !keyInput}
                className="text-xs h-8 bg-[#02b1c4] hover:bg-[#02b1c4]/90"
              >
                {isSaved ? (
                  <>
                    <Check className="h-3.5 w-3.5 mr-1.5" />
                    Guardado
                  </>
                ) : (
                  <>
                    <Save className="h-3.5 w-3.5 mr-1.5" />
                    Guardar
                  </>
                )}
              </Button>
            </div>
          </div>
        </Card>
      </div>

      <Card className="p-4">
        <h2 className="text-sm font-medium text-[#364f6b] mb-3">Configuración de Notificaciones</h2>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#364f6b]">Alertas de ventas</p>
              <p className="text-[10px] text-[#227c9d]">
                Recibe alertas cuando las ventas estén por debajo del objetivo
              </p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#02b1c4]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#364f6b]">Alertas de costes</p>
              <p className="text-[10px] text-[#227c9d]">Recibe alertas cuando los costes superen el presupuesto</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#02b1c4]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#364f6b]">Recomendaciones de IA</p>
              <p className="text-[10px] text-[#227c9d]">Recibe recomendaciones personalizadas basadas en tus datos</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" defaultChecked />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#02b1c4]"></div>
            </label>
          </div>

          <div className="flex items-center justify-between">
            <div>
              <p className="text-xs font-medium text-[#364f6b]">Notificaciones por email</p>
              <p className="text-[10px] text-[#227c9d]">Recibe un resumen diario por email</p>
            </div>
            <label className="relative inline-flex items-center cursor-pointer">
              <input type="checkbox" className="sr-only peer" />
              <div className="w-9 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#02b1c4]"></div>
            </label>
          </div>
        </div>
      </Card>
    </div>
  )
}
