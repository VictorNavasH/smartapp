"use client"

import type React from "react"
import { createContext, useContext, useState, useEffect } from "react"

type AIProvider = "openai" | "gemini" | null
type AIMessage = {
  role: "user" | "assistant" | "system"
  content: string
  timestamp: Date
}

interface AIContextType {
  provider: AIProvider
  setProvider: (provider: AIProvider) => void
  apiKey: string | null
  setApiKey: (key: string) => void
  isConfigured: boolean
  isChatOpen: boolean
  toggleChat: () => void
  messages: AIMessage[]
  addMessage: (message: Omit<AIMessage, "timestamp">) => void
  clearMessages: () => void
  isLoading: boolean
  sendMessage: (message: string) => Promise<void>
}

const AIContext = createContext<AIContextType | undefined>(undefined)

export function AIProvider({ children }: { children: React.ReactNode }) {
  const [provider, setProvider] = useState<AIProvider>(null)
  const [apiKey, setApiKey] = useState<string | null>(null)
  const [isChatOpen, setIsChatOpen] = useState(false)
  const [messages, setMessages] = useState<AIMessage[]>([])
  const [isLoading, setIsLoading] = useState(false)

  // Cargar configuración desde localStorage al iniciar
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedProvider = localStorage.getItem("ai-provider") as AIProvider
      const savedApiKey = localStorage.getItem("ai-api-key")

      if (savedProvider) setProvider(savedProvider)
      if (savedApiKey) setApiKey(savedApiKey)
    }
  }, [])

  // Guardar configuración en localStorage cuando cambia
  useEffect(() => {
    if (typeof window !== "undefined" && provider) {
      localStorage.setItem("ai-provider", provider)
    }
  }, [provider])

  useEffect(() => {
    if (typeof window !== "undefined" && apiKey) {
      localStorage.setItem("ai-api-key", apiKey)
    }
  }, [apiKey])

  const toggleChat = () => setIsChatOpen(!isChatOpen)

  const addMessage = (message: Omit<AIMessage, "timestamp">) => {
    setMessages((prev) => [...prev, { ...message, timestamp: new Date() }])
  }

  const clearMessages = () => setMessages([])

  const isConfigured = !!provider && !!apiKey

  const sendMessage = async (message: string) => {
    if (!isConfigured || isLoading) return

    // Añadir mensaje del usuario
    addMessage({ role: "user", content: message })
    setIsLoading(true)

    try {
      // Si no hay mensajes previos, añadir un mensaje de sistema para contextualizar
      if (messages.length === 0) {
        const systemMessage = {
          role: "system" as const,
          content:
            "Eres un asistente de análisis de restaurantes que ayuda a interpretar datos, proporcionar insights y responder preguntas sobre el negocio. Tus respuestas deben ser concisas, relevantes y orientadas a la acción.",
        }

        // No añadimos este mensaje a la UI, pero sí a la API
        const response = await fetchAIResponse([systemMessage, { role: "user", content: message }])
        addMessage({ role: "assistant", content: response })
      } else {
        // Enviar todos los mensajes para mantener el contexto de la conversación
        const response = await fetchAIResponse([...messages, { role: "user", content: message }])
        addMessage({ role: "assistant", content: response })
      }
    } catch (error) {
      console.error("Error al enviar mensaje a la IA:", error)
      addMessage({
        role: "assistant",
        content:
          "Lo siento, ha ocurrido un error al procesar tu mensaje. Por favor, verifica tu configuración de IA o inténtalo de nuevo más tarde.",
      })
    } finally {
      setIsLoading(false)
    }
  }

  const fetchAIResponse = async (messages: { role: string; content: string }[]): Promise<string> => {
    if (provider === "openai") {
      return fetchFromOpenAI(messages)
    } else if (provider === "gemini") {
      return fetchFromGemini(messages)
    }
    throw new Error("Proveedor de IA no configurado")
  }

  const fetchFromOpenAI = async (messages: { role: string; content: string }[]): Promise<string> => {
    // Simulación de respuesta para este ejemplo
    // En una implementación real, aquí iría la llamada a la API de OpenAI
    await new Promise((resolve) => setTimeout(resolve, 1000)) // Simular latencia

    // Respuestas simuladas basadas en palabras clave
    const lastMessage = messages[messages.length - 1].content.toLowerCase()

    if (lastMessage.includes("ventas")) {
      return "Basado en los datos actuales, tus ventas muestran un incremento del 12% respecto al mes anterior. Te recomendaría analizar qué días tienen mejor rendimiento para optimizar tu personal."
    } else if (lastMessage.includes("costes") || lastMessage.includes("gastos")) {
      return "Tus costes de personal (38%) están por encima del benchmark del sector (30%). Considera revisar tus turnos de trabajo para optimizar este aspecto."
    } else if (lastMessage.includes("ocupación")) {
      return "La ocupación media es del 68%, con picos los fines de semana. Los martes muestran la ocupación más baja (45%). Podrías considerar promociones especiales para ese día."
    } else {
      return "Puedo ayudarte a analizar cualquier aspecto de tu restaurante. ¿Qué te gustaría saber sobre ventas, costes, ocupación o satisfacción de clientes?"
    }
  }

  const fetchFromGemini = async (messages: { role: string; content: string }[]): Promise<string> => {
    // Simulación similar para Gemini
    await new Promise((resolve) => setTimeout(resolve, 1000))

    const lastMessage = messages[messages.length - 1].content.toLowerCase()

    if (lastMessage.includes("punto de equilibrio")) {
      return "Has alcanzado el 68% de tu punto de equilibrio este mes. Para llegar al 100%, necesitas incrementar tus ventas en €15,360. Considera estrategias para aumentar el ticket medio o la ocupación."
    } else if (lastMessage.includes("recomendación") || lastMessage.includes("consejo")) {
      return "Basado en tus datos, te recomendaría: 1) Optimizar costes de personal, 2) Crear promociones para los días de baja ocupación, 3) Revisar la estrategia de precios para incrementar el ticket medio."
    } else if (lastMessage.includes("tendencia")) {
      return "Las tendencias actuales muestran un crecimiento sostenido en ventas (+12%) y ocupación (+5%). Tu ticket medio también está aumentando gradualmente, lo que indica una buena aceptación de tus precios."
    } else {
      return "Estoy aquí para ayudarte a analizar tu negocio. Puedo ofrecerte insights sobre punto de equilibrio, tendencias, o recomendaciones específicas. ¿En qué área necesitas ayuda?"
    }
  }

  const value = {
    provider,
    setProvider,
    apiKey,
    setApiKey,
    isConfigured,
    isChatOpen,
    toggleChat,
    messages,
    addMessage,
    clearMessages,
    isLoading,
    sendMessage,
  }

  return <AIContext.Provider value={value}>{children}</AIContext.Provider>
}

export function useAI() {
  const context = useContext(AIContext)
  if (context === undefined) {
    throw new Error("useAI debe ser usado dentro de un AIProvider")
  }
  return context
}
