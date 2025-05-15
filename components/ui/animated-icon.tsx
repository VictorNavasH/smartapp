"use client"

import { motion } from "framer-motion"
import type { LucideIcon } from "lucide-react"
import { cn } from "@/lib/utils"

interface AnimatedIconProps {
  icon: LucideIcon
  color?: string
  size?: number
  className?: string
  onClick?: () => void
  pulse?: boolean
  rotate?: boolean
}

export function AnimatedIcon({
  icon: Icon,
  color = "#02b1c4",
  size = 24,
  className,
  onClick,
  pulse = false,
  rotate = false,
}: AnimatedIconProps) {
  return (
    <motion.div
      className={cn(
        "relative inline-flex items-center justify-center rounded-full",
        onClick ? "cursor-pointer" : "",
        className,
      )}
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
    >
      <motion.div
        className="absolute inset-0 rounded-full opacity-20"
        style={{ backgroundColor: color }}
        animate={
          pulse
            ? {
                scale: [1, 1.2, 1],
                opacity: [0.2, 0.3, 0.2],
              }
            : {}
        }
        transition={
          pulse
            ? {
                duration: 2,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
              }
            : {}
        }
      />
      <motion.div
        animate={
          rotate
            ? {
                rotate: 360,
              }
            : {}
        }
        transition={
          rotate
            ? {
                duration: 8,
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                ease: "linear",
              }
            : {}
        }
      >
        <Icon size={size} color={color} />
      </motion.div>
    </motion.div>
  )
}
