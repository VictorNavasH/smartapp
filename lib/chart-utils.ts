// Función para formatear números como moneda
export function formatCurrency(value: number, currency = "EUR"): string {
  return new Intl.NumberFormat("es-ES", {
    style: "currency",
    currency,
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  }).format(value)
}

// Función para formatear porcentajes
export function formatPercentage(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`
}

// Función para formatear fechas
export function formatDate(date: Date | string, options?: Intl.DateTimeFormatOptions): string {
  const defaultOptions: Intl.DateTimeFormatOptions = {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  }

  const dateObj = typeof date === "string" ? new Date(date) : date
  return new Intl.DateTimeFormat("es-ES", options || defaultOptions).format(dateObj)
}

// Función para calcular el cambio porcentual
export function calculatePercentageChange(current: number, previous: number): number {
  if (previous === 0) return 0
  return ((current - previous) / previous) * 100
}

// Función para generar colores degradados
export function generateGradient(startColor: string, endColor: string, steps: number): string[] {
  const result: string[] = []

  // Convertir colores hexadecimales a RGB
  const startRGB = hexToRgb(startColor)
  const endRGB = hexToRgb(endColor)

  if (!startRGB || !endRGB) return Array(steps).fill(startColor)

  for (let i = 0; i < steps; i++) {
    const r = Math.round(startRGB.r + (endRGB.r - startRGB.r) * (i / (steps - 1)))
    const g = Math.round(startRGB.g + (endRGB.g - startRGB.g) * (i / (steps - 1)))
    const b = Math.round(startRGB.b + (endRGB.b - startRGB.b) * (i / (steps - 1)))

    result.push(rgbToHex(r, g, b))
  }

  return result
}

// Función auxiliar para convertir hexadecimal a RGB
function hexToRgb(hex: string): { r: number; g: number; b: number } | null {
  const shorthandRegex = /^#?([a-f\d])([a-f\d])([a-f\d])$/i
  hex = hex.replace(shorthandRegex, (_, r, g, b) => r + r + g + g + b + b)

  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex)
  return result
    ? {
        r: Number.parseInt(result[1], 16),
        g: Number.parseInt(result[2], 16),
        b: Number.parseInt(result[3], 16),
      }
    : null
}

// Función auxiliar para convertir RGB a hexadecimal
function rgbToHex(r: number, g: number, b: number): string {
  return `#${((1 << 24) | (r << 16) | (g << 8) | b).toString(16).slice(1)}`
}
