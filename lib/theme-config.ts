// Configuración central de colores y temas
export const themeColors = {
  // Colores principales según especificaciones
  primary: "#02b1c4", // Color principal
  secondary: "#17c3b2", // Color secundario
  accent: "#fe6d73", // Color de acento
  dark: "#364f6b", // Color que sustituye al negro
  textSecondary: "#227c9d", // Color para textos secundarios
  accentGreen: "#02f2d2", // Color verde acento

  // Colores adicionales
  yellow: "#ffcb77",
  purple: "#edadff",
  blue: "#47b0d7",

  // Colores para categorías específicas
  categories: {
    food: "#17c3b2", // Comida
    service: "#ffcb77", // Servicio
    experience: "#edadff", // Experiencia
    smartTables: "#47b0d7", // Smart Tables
    cost: "#227c9d", // Coste
  },
}

// Configuración para gráficos y visualizaciones
export const chartConfig = {
  barHeight: 64,
  tooltipWidth: 32,
  animationDuration: 300,
  borderRadius: "0.5rem",
}

// Configuración para componentes de tarjetas
export const cardConfig = {
  padding: "p-4",
  hoverTransition: "transition-all duration-300 hover:shadow-md hover:-translate-y-0.5",
  borderHover: "hover:border-[#02b1c4]/20",
}
