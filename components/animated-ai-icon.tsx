"use client"

import { Sparkles } from "lucide-react"
import { motion, useAnimationFrame, useMotionTemplate, useMotionValue, useTransform } from "framer-motion"
import { useRef } from "react"

export function AnimatedAIIcon({
  className = "",
  size = 18,
  onClick,
}: { className?: string; size?: number; onClick?: () => void }) {
  return (
    <button
      onClick={onClick}
      className={`relative rounded-full p-1.5 ${className} hover:text-[#02b1c4] transition-colors duration-300 group`}
      title="Asistente IA"
    >
      <div className="relative">
        {/* Icono de Sparkles */}
        <Sparkles className={`h-[${size}px] w-[${size}px] relative z-10`} />

        {/* Efecto de borde animado */}
        <div className="absolute inset-[-4px] rounded-full overflow-hidden">
          <MovingBorderEffect />
        </div>

        {/* Fondo blanco para el icono */}
        <span className="absolute inset-[-2px] rounded-full bg-white"></span>
      </div>
    </button>
  )
}

function MovingBorderEffect() {
  const pathRef = useRef<SVGRectElement>(null)
  const progress = useMotionValue<number>(0)

  useAnimationFrame((time) => {
    const length = pathRef.current?.getTotalLength() || 0
    if (length) {
      const pxPerMillisecond = length / 2000 // 2000ms para una vuelta completa
      progress.set((time * pxPerMillisecond) % length)
    }
  })

  const x = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.x || 0)
  const y = useTransform(progress, (val) => pathRef.current?.getPointAtLength(val)?.y || 0)

  const transform = useMotionTemplate`translateX(${x}px) translateY(${y}px) translateX(-50%) translateY(-50%)`

  return (
    <>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        preserveAspectRatio="none"
        className="absolute h-full w-full"
        width="100%"
        height="100%"
      >
        <rect fill="none" width="100%" height="100%" rx="50%" ry="50%" ref={pathRef} />
      </svg>
      <motion.div
        style={{
          position: "absolute",
          top: 0,
          left: 0,
          display: "inline-block",
          transform,
        }}
      >
        <div className="h-3 w-3 opacity-[0.8] bg-[radial-gradient(#ffcb77_40%,transparent_60%)]" />
      </motion.div>
    </>
  )
}
