"use client"

import type React from "react"

import { useState, useRef, useEffect } from "react"
import { useAI } from "@/lib/ai-context"
import { Card } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { X, Send, Loader2 } from "lucide-react"
import { cn } from "@/lib/utils"
import { AnimatedAIIcon } from "@/components/animated-ai-icon"

export function AIChat() {
  const { isChatOpen, toggleChat, messages, sendMessage, isLoading, isConfigured, provider } = useAI()

  const [input, setInput] = useState("")
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const inputRef = useRef<HTMLTextAreaElement>(null)

  // Scroll al final de los mensajes cuando se añade uno nuevo
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  // Focus en el input cuando se abre el chat
  useEffect(() => {
    if (isChatOpen) {
      inputRef.current?.focus()
    }
  }, [isChatOpen])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (input.trim() && !isLoading) {
      sendMessage(input.trim())
      setInput("")
    }
  }

  if (!isChatOpen) return null

  return (
    <div className="fixed bottom-4 right-4 z-50 w-80 md:w-96">
      <Card className="flex flex-col h-96 shadow-lg border-[#02b1c4]/20 transition-all duration-300 hover:shadow-xl hover:-translate-y-0.5">
        <div className="flex items-center justify-between p-3 border-b">
          <div className="flex items-center gap-2">
            <AnimatedAIIcon className="text-[#02b1c4]" size={16} />
            <span className="text-sm font-medium text-[#364f6b]">
              Smart Assistant {provider && `(${provider === "openai" ? "OpenAI" : "Gemini"})`}
            </span>
          </div>
          <Button
            variant="ghost"
            size="icon"
            className="h-6 w-6 hover:bg-[#02b1c4]/10 hover:text-[#02b1c4] transition-all duration-300"
            onClick={toggleChat}
          >
            <X className="h-4 w-4" />
          </Button>
        </div>

        <div className="flex-1 overflow-y-auto p-3 space-y-4">
          {!isConfigured && (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <AnimatedAIIcon className="text-[#02b1c4] mb-2" size={32} />
              <p className="text-sm text-[#364f6b] mb-2">El asistente de IA no está configurado</p>
              <p className="text-xs text-[#227c9d] mb-4">
                Configura tu API key en la sección de configuración para comenzar a usar el asistente
              </p>
              <Button variant="outline" size="sm" className="text-xs" onClick={toggleChat}>
                Cerrar
              </Button>
            </div>
          )}

          {isConfigured && messages.length === 0 && (
            <div className="flex flex-col items-center justify-center h-full text-center p-4">
              <AnimatedAIIcon className="text-[#02b1c4] mb-2" size={32} />
              <p className="text-sm text-[#364f6b] mb-2">¿En qué puedo ayudarte hoy?</p>
              <p className="text-xs text-[#227c9d]">
                Pregúntame sobre tus datos, análisis o recomendaciones para tu restaurante
              </p>
            </div>
          )}

          {messages.map((message, index) => (
            <div
              key={index}
              className={cn(
                "flex flex-col max-w-[85%] rounded-lg p-2.5",
                message.role === "user" ? "bg-[#02b1c4]/10 ml-auto" : "bg-gray-100 mr-auto",
              )}
            >
              <span className="text-xs text-[#364f6b]">{message.content}</span>
              <span className="text-[9px] text-[#227c9d] mt-1 self-end">
                {new Date(message.timestamp).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
              </span>
            </div>
          ))}

          {isLoading && (
            <div className="flex items-center gap-2 bg-gray-100 rounded-lg p-2.5 max-w-[85%] mr-auto">
              <Loader2 className="h-3 w-3 text-[#02b1c4] animate-spin" />
              <span className="text-xs text-[#364f6b]">Pensando...</span>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>

        {isConfigured && (
          <form onSubmit={handleSubmit} className="p-3 border-t flex gap-2">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Escribe tu mensaje..."
              className="flex-1 text-xs resize-none border rounded-md p-2 focus:outline-none focus:ring-1 focus:ring-[#02b1c4] min-h-[40px] max-h-[100px]"
              rows={1}
              onKeyDown={(e) => {
                if (e.key === "Enter" && !e.shiftKey) {
                  e.preventDefault()
                  handleSubmit(e)
                }
              }}
            />
            <Button
              type="submit"
              size="icon"
              className="h-10 w-10 bg-[#02b1c4] hover:bg-[#02b1c4]/90 rounded-full transition-all duration-300 hover:shadow-md hover:shadow-[#02b1c4]/20"
              disabled={!input.trim() || isLoading}
            >
              {isLoading ? <Loader2 className="h-4 w-4 animate-spin" /> : <Send className="h-4 w-4" />}
            </Button>
          </form>
        )}
      </Card>
    </div>
  )
}
