"use client"
import { Button } from "@/components/ui/moving-border"
import { Sparkles } from "lucide-react"
import { useAI } from "@/lib/ai-context"

export function SmartAssistantButton() {
  const { toggleChat, isConfigured } = useAI()

  return (
    <Button
      onClick={toggleChat}
      containerClassName="h-12 w-12 md:h-14 md:w-auto md:px-6 transform scale-[0.727] origin-center"
      borderClassName="bg-[radial-gradient(#ffcb77_40%,transparent_60%)]"
      className={`bg-white/10 border-[#02b1c4]/20 ${
        isConfigured ? "text-[#02b1c4]" : "text-[#364f6b]/70"
      } hover:text-[#02b1c4] transition-colors duration-300 backdrop-blur-md`}
      borderRadius="9999px"
    >
      <div className="flex items-center gap-2">
        <Sparkles className="h-5 w-5" />
        <span className="hidden md:inline text-sm font-medium">Smart Assistant</span>
      </div>
    </Button>
  )
}
