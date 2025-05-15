"use client"

import * as React from "react"
import { motion } from "framer-motion"
import { cn } from "@/lib/utils"
import type { LucideIcon } from "lucide-react"
import { BarChart, StarIcon, MessageCircle } from "lucide-react"

interface MenuItem {
  icon: LucideIcon | React.FC
  label: string
  gradient: string
  iconColor: string
}

interface MenuBarProps extends React.HTMLAttributes<HTMLDivElement> {
  items: MenuItem[]
  activeItem?: string
  onItemClick?: (label: string) => void
}

export const MenuBar = React.forwardRef<HTMLDivElement, MenuBarProps>(
  ({ className, items, activeItem, onItemClick, ...props }, ref) => {
    const menuItems = [
      {
        icon: BarChart,
        label: "Conclusiones unificadas",
        gradient: "radial-gradient(circle, rgba(2,177,196,0.15) 0%, rgba(2,177,196,0) 70%)",
        iconColor: "text-[#364f6b]",
      },
      {
        icon: StarIcon,
        label: "Google",
        gradient: "radial-gradient(circle, rgba(255,203,119,0.15) 0%, rgba(255,203,119,0) 70%)",
        iconColor: "text-[#364f6b]",
      },
      {
        icon: MessageCircle,
        label: "Encuesta interna",
        gradient: "radial-gradient(circle, rgba(237,173,255,0.15) 0%, rgba(237,173,255,0) 70%)",
        iconColor: "text-[#364f6b]",
      },
    ]

    return (
      <div
        ref={ref}
        className={cn(
          "p-1 rounded-xl bg-white/80 backdrop-blur-sm border border-border/30 shadow-sm relative overflow-hidden",
          className,
        )}
        {...props}
      >
        <ul className="flex items-center gap-1 relative z-10">
          {items.map((item, index) => {
            const Icon = item.icon
            const isActive = item.label === activeItem

            return (
              <motion.li key={item.label} className="relative flex-1">
                <button
                  onClick={() => onItemClick?.(item.label)}
                  className="w-full flex items-center justify-center gap-1 px-2 py-1 rounded-lg text-[#227c9d] hover:text-[#364f6b] transition-colors relative"
                >
                  {/* Efecto de resplandor (glow) */}
                  {isActive && (
                    <motion.div
                      className="absolute inset-0 -z-10 rounded-lg opacity-100"
                      layoutId="glow"
                      transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                      style={{
                        background: item.gradient,
                        boxShadow: "0 0 20px 5px rgba(2,177,196,0.1)",
                      }}
                    />
                  )}

                  <span className={cn("text-[#364f6b]", isActive && "text-[#02b1c4]")}>
                    <Icon className="h-3 w-3" />
                  </span>
                  <span className={cn("text-xs", isActive && "font-medium text-[#02b1c4]")}>{item.label}</span>
                </button>
              </motion.li>
            )
          })}
        </ul>
      </div>
    )
  },
)

MenuBar.displayName = "MenuBar"
