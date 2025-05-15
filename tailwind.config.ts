import type { Config } from "tailwindcss"
import flattenColorPalette from "tailwindcss/lib/util/flattenColorPalette"

const config: Config = {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "#02b1c4",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "#17c3b2",
          foreground: "hsl(var(--secondary-foreground))",
        },
        accent: {
          DEFAULT: "#fe6d73",
          foreground: "hsl(var(--accent-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        dark: "#364f6b",
        "text-secondary": "#227c9d",
        "accent-green": "#02f2d2",
      },
      scale: {
        "85": "0.85",
        "765": "0.765",
        "727": "0.727",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        orbit: {
          "0%": { transform: "rotate(0deg) translateX(10px) rotate(0deg)" },
          "100%": { transform: "rotate(360deg) translateX(10px) rotate(-360deg)" },
        },
        "orbit-reverse": {
          "0%": { transform: "rotate(0deg) translateX(10px) rotate(0deg)" },
          "100%": { transform: "rotate(-360deg) translateX(10px) rotate(360deg)" },
        },
      },
      animation: {
        orbit: "orbit 3s linear infinite",
        "orbit-reverse": "orbit-reverse 4s linear infinite",
      },
      utilities: {
        ".animation-delay-500": {
          "animation-delay": "500ms",
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
}

// Esta función añade cada color de Tailwind como una variable CSS global, ej. var(--sky-500)
function addVariablesForColors({ addBase, theme }: any) {
  const allColors = flattenColorPalette(theme("colors"))
  const newVars = Object.fromEntries(Object.entries(allColors).map(([key, val]) => [`--${key}`, val]))

  addBase({
    ":root": newVars,
  })
}

// Añadir el plugin a la configuración
config.plugins = [...config.plugins, addVariablesForColors]

export default config
