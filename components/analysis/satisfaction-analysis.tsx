"use client"

import type React from "react"
import { useState } from "react"
import { Card } from "@/components/ui/card"
import {
  UtensilsCrossed,
  Users,
  Sparkles,
  LayoutGrid,
  DollarSign,
  TrendingUp,
  Star,
  ThumbsUp,
  MessageCircle,
  BarChart,
  Calendar,
} from "lucide-react"
import { themeColors } from "@/lib/theme-config"
import { motion } from "framer-motion"
import { BarChart as BarChartComponent } from "@/components/ui/bar-chart"
import { MenuBar } from "@/components/menu-bar"

// Componente para tarjetas de métricas
function MetricCard({
  title,
  value,
  subValue,
  change,
  icon,
  color = themeColors.primary,
}: {
  title: string
  value: string
  subValue?: string
  change?: { value: number; label: string }
  icon: React.ReactNode
  color?: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-5 flex flex-col space-y-3 relative overflow-hidden h-full">
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: color }}></div>
        <div className="flex justify-between items-center">
          <h3 className="text-lg font-bold text-[#364f6b]">{title}</h3>
          <div className="bg-gray-50 rounded-full p-2.5">{icon}</div>
        </div>
        <div className="flex items-end space-x-1">
          <span className="text-3xl font-bold" style={{ color }}>
            {value}
          </span>
          {subValue && <span className="text-sm text-[#227c9d] mb-1">{subValue}</span>}
        </div>
        {change && (
          <div className="flex items-center space-x-1">
            <TrendingUp className="h-4 w-4 text-green-500" />
            <span className="text-sm text-green-500">
              {change.value > 0 ? "+" : ""}
              {change.value}% {change.label}
            </span>
          </div>
        )}
      </Card>
    </motion.div>
  )
}

// Componente para tarjetas de categoría
function CategoryCard({
  title,
  value,
  icon: Icon,
  color,
}: {
  title: string
  value: number
  icon: React.ElementType
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
      transition={{ duration: 0.3 }}
    >
      <Card className="p-5 flex flex-col space-y-3 relative overflow-hidden h-full">
        <div className="absolute inset-0 rounded-lg opacity-5" style={{ backgroundColor: color }}></div>
        <div className="flex justify-between items-center relative">
          <h4 className="font-medium text-[#364f6b]">{title}</h4>
          <Icon className="h-5 w-5" style={{ color }} />
        </div>
        <div className="flex items-end space-x-1 relative">
          <span className="text-3xl font-bold" style={{ color }}>
            {value.toFixed(1)}
          </span>
          <span className="text-xs text-[#227c9d] mb-1">/10</span>
        </div>
        <div className="w-full bg-gray-100 rounded-full h-3 relative overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            animate={{ width: `${(value / 10) * 100}%` }}
            transition={{ duration: 1, delay: 0.2 }}
            className="h-3 rounded-full"
            style={{ backgroundColor: color }}
          ></motion.div>
        </div>
      </Card>
    </motion.div>
  )
}

// Componente para tarjetas de recomendación
function RecommendationCard({
  title,
  description,
  color,
  index,
}: {
  title: string
  description: string
  color: string
  index: number
}) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.3, delay: index * 0.1 }}
      whileHover={{ x: 4, boxShadow: "0 4px 12px rgba(0,0,0,0.05)" }}
    >
      <Card className="p-5 border-l-4 h-full" style={{ borderLeftColor: color }}>
        <h4 className="font-medium mb-2 text-[#364f6b]">{title}</h4>
        <p className="text-sm text-[#227c9d]">{description}</p>
      </Card>
    </motion.div>
  )
}

// Componente para comentarios de clientes
function CommentCard({
  author,
  date,
  rating,
  comment,
  source,
  sentiment,
  delay = 0,
}: {
  author: string
  date: string
  rating: number
  comment: string
  source: string
  sentiment: "positive" | "neutral" | "negative"
  delay?: number
}) {
  const sentimentColor = sentiment === "positive" ? "#17c3b2" : sentiment === "negative" ? "#fe6d73" : "#ffcb77"

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3, delay }}
      whileHover={{ y: -4, boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)" }}
    >
      <Card className="p-5 relative overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-1" style={{ backgroundColor: sentimentColor }}></div>
        <div className="flex justify-between items-start mb-3">
          <div>
            <h4 className="font-medium text-[#364f6b]">{author}</h4>
            <p className="text-xs text-[#227c9d]">
              {date} • {source}
            </p>
          </div>
          <div className="flex items-center">
            {[...Array(5)].map((_, i) => (
              <Star
                key={i}
                className="h-4 w-4"
                fill={i < rating ? "#ffcb77" : "none"}
                color={i < rating ? "#ffcb77" : "#e2e8f0"}
              />
            ))}
          </div>
        </div>
        <p className="text-sm text-[#364f6b]">"{comment}"</p>
        <div
          className="mt-3 text-xs px-2 py-1 rounded-full inline-block"
          style={{
            backgroundColor: `${sentimentColor}20`,
            color: sentimentColor,
          }}
        >
          {sentiment === "positive" ? "Positivo" : sentiment === "negative" ? "Negativo" : "Neutral"}
        </div>
      </Card>
    </motion.div>
  )
}

// Componente principal de análisis de satisfacción
export function SatisfactionAnalysis() {
  const [activeSource, setActiveSource] = useState("Conclusiones unificadas")

  // Datos de categorías
  const categories = [
    { title: "Comida", value: 8.7, icon: UtensilsCrossed, color: themeColors.yellow }, // Cambiado a amarillo
    { title: "Servicio", value: 9.2, icon: Users, color: themeColors.categories.service },
    { title: "Experiencia", value: 8.5, icon: Sparkles, color: themeColors.categories.experience },
    { title: "Smart Tables", value: 7.8, icon: LayoutGrid, color: themeColors.categories.smartTables },
    { title: "Coste", value: 7.2, icon: DollarSign, color: themeColors.categories.cost },
  ]

  // Datos de evolución mensual
  const monthlyData = [
    { month: "Nov", value: 7.8 },
    { month: "Dic", value: 7.9 },
    { month: "Ene", value: 8.1 },
    { month: "Feb", value: 7.7 },
    { month: "Mar", value: 8.0 },
    { month: "Abr", value: 8.3 },
  ]

  // Datos de recomendaciones
  const recommendations = [
    {
      title: "Mejora en la carta",
      description: "Basado en las opiniones, considera añadir más opciones vegetarianas y veganas a la carta.",
      color: themeColors.categories.food,
    },
    {
      title: "Formación de personal",
      description: "Programa sesiones de formación adicionales para el personal sobre atención al cliente.",
      color: themeColors.categories.service,
    },
    {
      title: "Ambiente del local",
      description: "Considera ajustar la iluminación y música ambiente según las opiniones recibidas.",
      color: themeColors.categories.experience,
    },
    {
      title: "Uso de Smart Tables",
      description: "Implementa un tutorial breve para clientes nuevos sobre cómo utilizar las Smart Tables.",
      color: themeColors.categories.smartTables,
    },
  ]

  // Datos de comentarios
  const comments = [
    {
      author: "María G.",
      date: "15 Abr 2025",
      rating: 5,
      comment:
        "La comida estaba deliciosa y el servicio fue excelente. Las Smart Tables son muy intuitivas y facilitan mucho el pedido.",
      source: "Google",
      sentiment: "positive" as const,
    },
    {
      author: "Carlos R.",
      date: "12 Abr 2025",
      rating: 4,
      comment:
        "Buena experiencia en general. La comida tardó un poco en llegar, pero estaba muy buena. El ambiente es agradable.",
      source: "Encuesta interna",
      sentiment: "positive" as const,
    },
    {
      author: "Laura M.",
      date: "10 Abr 2025",
      rating: 3,
      comment:
        "La comida estaba bien, pero el precio me pareció un poco elevado para lo que ofrecen. El servicio fue correcto.",
      source: "Google",
      sentiment: "neutral" as const,
    },
    {
      author: "Javier P.",
      date: "8 Abr 2025",
      rating: 2,
      comment:
        "Tuve problemas con las Smart Tables, no funcionaban correctamente y nadie vino a ayudarnos. La comida estaba fría.",
      source: "Encuesta interna",
      sentiment: "negative" as const,
    },
  ]

  // Datos de encuestas por fuente
  const surveyData = {
    "Conclusiones unificadas": {
      rating: 8.3,
      change: 0.3,
      responses: 1248,
      responseChange: 12,
      categories: categories,
    },
    Google: {
      rating: 4.7,
      change: 0.2,
      responses: 842,
      responseChange: 15,
      categories: [
        { title: "Comida", value: 8.8, icon: UtensilsCrossed, color: themeColors.yellow }, // Cambiado a amarillo
        { title: "Servicio", value: 9.0, icon: Users, color: themeColors.categories.service },
        { title: "Experiencia", value: 8.6, icon: Sparkles, color: themeColors.categories.experience },
        { title: "Smart Tables", value: 7.5, icon: LayoutGrid, color: themeColors.categories.smartTables },
        { title: "Coste", value: 7.0, icon: DollarSign, color: themeColors.categories.cost },
      ],
    },
    "Encuesta interna": {
      rating: 8.6,
      change: 0.4,
      responses: 406,
      responseChange: 8,
      categories: [
        { title: "Comida", value: 8.5, icon: UtensilsCrossed, color: themeColors.yellow }, // Cambiado a amarillo
        { title: "Servicio", value: 9.4, icon: Users, color: themeColors.categories.service },
        { title: "Experiencia", value: 8.3, icon: Sparkles, color: themeColors.categories.experience },
        { title: "Smart Tables", value: 8.1, icon: LayoutGrid, color: themeColors.categories.smartTables },
        { title: "Coste", value: 7.4, icon: DollarSign, color: themeColors.categories.cost },
      ],
    },
  }

  // Menú de fuentes de encuestas
  const menuItems = [
    {
      icon: BarChart,
      label: "Conclusiones unificadas",
      gradient: "radial-gradient(circle, rgba(2,177,196,0.15) 0%, rgba(2,177,196,0) 70%)",
      iconColor: "text-[#364f6b]",
    },
    {
      icon: Star,
      label: "Google",
      gradient: "radial-gradient(circle, rgba(255,203,119,0.15) 0%, rgba(255,203,119,0) 70%)",
      iconColor: "text-[#364f6b]",
    },
    {
      icon: MessageCircle,
      label: "Encuesta interna",
      gradient: "radial-gradient(circle, rgba(23,195,178,0.15) 0%, rgba(23,195,178,0) 70%)",
      iconColor: "text-[#364f6b]",
    },
  ]

  // Datos actuales según la fuente seleccionada
  const currentData = surveyData[activeSource as keyof typeof surveyData]

  return (
    <div className="space-y-6">
      {/* Selector de fuente de encuestas */}
      <div className="mb-6">
        <MenuBar
          items={menuItems}
          activeItem={activeSource}
          onItemClick={setActiveSource}
          className="w-full max-w-2xl mx-auto"
        />
      </div>

      {/* Métricas principales */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
        <MetricCard
          title={
            activeSource === "Google"
              ? "Puntuación Google"
              : activeSource === "Encuesta interna"
                ? "Satisfacción Web"
                : "Nota Global"
          }
          value={activeSource === "Google" ? "4.7" : currentData.rating.toFixed(1)}
          subValue={activeSource === "Google" ? "/5" : "/10"}
          change={{ value: currentData.change, label: "vs. mes anterior" }}
          icon={
            activeSource === "Google" ? (
              <Star className="h-5 w-5 text-[#ffcb77]" />
            ) : (
              <ThumbsUp className="h-5 w-5 text-[#02b1c4]" />
            )
          }
          color={activeSource === "Google" ? themeColors.yellow : themeColors.primary}
        />

        <Card className="p-5 flex flex-col space-y-3 relative overflow-hidden">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#02b1c4]"></div>
          <div className="flex justify-between items-center">
            <h3 className="text-lg font-bold text-[#364f6b]">Progreso Objetivo</h3>
            <div className="bg-gray-50 rounded-full p-2.5">
              <TrendingUp className="h-5 w-5 text-[#02b1c4]" />
            </div>
          </div>

          <div className="flex justify-between items-center">
            <span className="text-2xl font-bold text-[#02b1c4]">85%</span>
            <div className="w-20 h-20 relative">
              <svg className="w-20 h-20 transform -rotate-90" viewBox="0 0 36 36">
                <circle cx="18" cy="18" r="16" fill="none" stroke="#f3f4f6" strokeWidth="3.5" />
                <motion.circle
                  cx="18"
                  cy="18"
                  r="16"
                  fill="none"
                  stroke="#02b1c4"
                  strokeWidth="3.5"
                  strokeDasharray="100"
                  initial={{ strokeDashoffset: "100" }}
                  animate={{ strokeDashoffset: "15" }}
                  transition={{ duration: 1.5, ease: "easeInOut" }}
                  strokeLinecap="round"
                />
              </svg>
            </div>
          </div>

          <div>
            <div className="flex justify-between items-center mb-1">
              <span className="text-sm text-[#227c9d]">Actual: 4.1/5</span>
              <span className="text-sm text-[#227c9d]">Meta: 4.8/5</span>
            </div>
            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <motion.div
                initial={{ width: 0 }}
                animate={{ width: "85%" }}
                transition={{ duration: 1, delay: 0.3 }}
                className="bg-[#02b1c4] h-3 rounded-full"
              ></motion.div>
            </div>
          </div>
        </Card>

        <MetricCard
          title="Participación"
          value={currentData.responses.toString()}
          change={{ value: currentData.responseChange, label: "vs. mes anterior" }}
          icon={<Calendar className="h-5 w-5 text-[#02b1c4]" />}
        />
      </div>

      {/* Categorías */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#364f6b]">Nota por Área</h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {currentData.categories.map((category, index) => (
            <CategoryCard
              key={category.title}
              title={category.title}
              value={category.value}
              icon={category.icon}
              color={category.color}
            />
          ))}
        </div>
      </div>

      {/* Evolución mensual */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        <Card className="p-5 flex flex-col space-y-3">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#02b1c4]"></div>
          <h3 className="text-xl font-bold text-[#364f6b]">Evolución Mensual</h3>

          <BarChartComponent
            data={monthlyData}
            getLabel={(item) => item.month}
            getValue={(item) => item.value}
            getColor={(_, index, isActive) =>
              isActive ? themeColors.secondary : `${themeColors.primary}${index % 2 === 0 ? "" : "cc"}`
            }
            height={200}
            gap={12}
            barRadius={12}
            renderTooltip={(item) => (
              <>
                <div className="text-sm font-bold text-[#364f6b] mb-2">{item.month}</div>
                <div className="text-xs text-[#364f6b]">
                  <div className="flex justify-between">
                    <span>Puntuación:</span>
                    <span className="font-medium">{item.value.toFixed(1)}/10</span>
                  </div>
                </div>
              </>
            )}
          />
        </Card>

        <Card className="p-5 flex flex-col space-y-3">
          <div className="absolute top-0 left-0 right-0 h-1 bg-[#02b1c4]"></div>
          <h3 className="text-xl font-bold text-[#364f6b]">Distribución de Puntuaciones</h3>

          <div className="flex-1 flex flex-col justify-center space-y-4">
            {[5, 4, 3, 2, 1].map((rating) => {
              // Porcentajes simulados para cada puntuación
              const percentages = {
                5: 68,
                4: 22,
                3: 7,
                2: 2,
                1: 1,
              }

              return (
                <div key={rating} className="flex items-center gap-3">
                  <div className="flex items-center w-12">
                    {[...Array(rating)].map((_, i) => (
                      <Star key={i} className="h-3 w-3" fill="#ffcb77" color="#ffcb77" />
                    ))}
                  </div>
                  <div className="flex-1">
                    <div className="w-full bg-gray-100 rounded-full h-2.5 overflow-hidden">
                      <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: `${percentages[rating as keyof typeof percentages]}%` }}
                        transition={{ duration: 1, delay: 0.3 + (5 - rating) * 0.1 }}
                        className="h-full rounded-full"
                        style={{ backgroundColor: rating > 3 ? "#17c3b2" : rating === 3 ? "#ffcb77" : "#fe6d73" }}
                      ></motion.div>
                    </div>
                  </div>
                  <div className="w-10 text-right">
                    <span className="text-xs font-medium text-[#364f6b]">
                      {percentages[rating as keyof typeof percentages]}%
                    </span>
                  </div>
                </div>
              )
            })}
          </div>
        </Card>
      </div>

      {/* Comentarios destacados */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#364f6b]">Comentarios Destacados</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {comments.map((comment, index) => (
            <CommentCard
              key={index}
              author={comment.author}
              date={comment.date}
              rating={comment.rating}
              comment={comment.comment}
              source={comment.source}
              sentiment={comment.sentiment}
              delay={index * 0.1}
            />
          ))}
        </div>
      </div>

      {/* Recomendaciones */}
      <div className="space-y-4">
        <h3 className="text-xl font-bold text-[#364f6b]">Recomendaciones</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {recommendations.map((recommendation, index) => (
            <RecommendationCard
              key={index}
              title={recommendation.title}
              description={recommendation.description}
              color={recommendation.color}
              index={index}
            />
          ))}
        </div>
      </div>
    </div>
  )
}

// Exportación por defecto para compatibilidad
export default SatisfactionAnalysis
