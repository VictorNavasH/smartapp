"use client"

import { useState } from "react"
import { MenuBar } from "@/components/ui/glow-menu"
import { LayoutDashboard, BarChart2, Users, Settings, TrendingUp, DollarSign } from "lucide-react"
import { ThemeProvider } from "@/components/theme-provider"

export default function Home() {
  const [activeItem, setActiveItem] = useState("Dashboard")

  const menuItems = [
    {
      icon: LayoutDashboard,
      label: "Dashboard",
      href: "/",
      gradient: "linear-gradient(135deg, #22d3ee 0%, #0ea5e9 100%)",
      iconColor: "text-blue-500",
    },
    {
      icon: BarChart2,
      label: "Analytics",
      href: "/analytics",
      gradient: "linear-gradient(135deg, #a78bfa 0%, #8b5cf6 100%)",
      iconColor: "text-purple-500",
    },
    {
      icon: TrendingUp,
      label: "Performance",
      href: "/performance",
      gradient: "linear-gradient(135deg, #4ade80 0%, #22c55e 100%)",
      iconColor: "text-green-500",
    },
    {
      icon: DollarSign,
      label: "Finance",
      href: "/finance",
      gradient: "linear-gradient(135deg, #fcd34d 0%, #f59e0b 100%)",
      iconColor: "text-amber-500",
    },
    {
      icon: Users,
      label: "Customers",
      href: "/customers",
      gradient: "linear-gradient(135deg, #fb7185 0%, #e11d48 100%)",
      iconColor: "text-rose-500",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      gradient: "linear-gradient(135deg, #94a3b8 0%, #64748b 100%)",
      iconColor: "text-slate-500",
    },
  ]

  return (
    <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
      <main className="flex min-h-screen flex-col items-center justify-center p-24 bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800">
        <div className="max-w-5xl w-full space-y-12">
          <div className="space-y-4">
            <h1 className="text-3xl font-bold text-center">GlowMenu Component Demo</h1>
            <p className="text-center text-gray-500 dark:text-gray-400">
              Hover over the menu items to see the 3D flip and glow effects
            </p>
          </div>

          <div className="flex justify-center">
            <MenuBar items={menuItems} activeItem={activeItem} onItemClick={setActiveItem} className="mx-auto" />
          </div>

          <div className="p-8 bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700">
            <h2 className="text-2xl font-bold mb-4">Active Section: {activeItem}</h2>
            <p className="text-gray-600 dark:text-gray-300">
              This is the content area for the {activeItem} section. Click on different menu items to change the
              content.
            </p>
          </div>
        </div>
      </main>
    </ThemeProvider>
  )
}
