"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  LayoutDashboard,
  TrendingUp,
  DollarSign,
  BarChart2,
  Users,
  CreditCard,
  ThumbsUp,
  LineChart,
  Settings,
  HelpCircle,
  Megaphone,
  FlaskConical,
} from "lucide-react"

export default function AppSidebar() {
  const pathname = usePathname()

  const menuItems = [
    { name: "Dashboard", href: "/", icon: LayoutDashboard },
    { name: "Análisis de Ventas", href: "/ventas", icon: TrendingUp },
    { name: "Análisis de Costes", href: "/costes", icon: DollarSign },
    { name: "Análisis de KPI's", href: "/kpis", icon: BarChart2 },
    { name: "Marketing Digital", href: "/marketing", icon: Megaphone },
    { name: "Análisis Hipotético", href: "/hipotetico", icon: FlaskConical },
    { name: "Análisis Bancario", href: "/bancario", icon: CreditCard },
    { name: "Análisis de Ocupación", href: "/ocupacion", icon: Users },
    { name: "Análisis de Satisfacción", href: "/satisfaccion", icon: ThumbsUp },
    { name: "Forecast", href: "/forecast", icon: LineChart },
    { name: "Configuración", href: "/configuracion", icon: Settings },
    { name: "Ayuda", href: "/ayuda", icon: HelpCircle },
  ]

  return (
    <aside className="fixed left-0 top-0 h-screen bg-white border-r border-gray-100 z-40 w-16 md:w-64 transition-all duration-300 ease-in-out flex flex-col">
      <div className="p-4 border-b border-gray-100 h-[57px] flex items-center">
        <div className="flex items-center justify-center md:justify-start">
          <img src="/images/logo.png" alt="NÜA SMART RESTAURANT" className="h-6 w-auto hidden md:block" />
          <span className="text-sm font-bold text-dark md:hidden">NÜA</span>
        </div>
      </div>
      <nav className="p-1.5 flex-1 overflow-y-auto">
        <ul className="space-y-0.5">
          {menuItems.map((item) => {
            const isActive = pathname === item.href
            const Icon = item.icon

            return (
              <li key={item.href}>
                <Link
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2 rounded-md transition-colors text-xs ${
                    isActive ? "bg-[#02b1c4] text-white" : "text-[#364f6b] hover:bg-gray-100"
                  }`}
                >
                  <Icon size={18} />
                  <span className="hidden md:block">{item.name}</span>
                </Link>
              </li>
            )
          })}
        </ul>
      </nav>
    </aside>
  )
}
