"use client"

import { useState } from "react"
import { MenuBar } from "@/components/ui/glow-menu"
import { Home, Settings, Users, BarChart2, Mail, Bell, Calendar, FileText } from "lucide-react"

export default function GlowMenuDemo() {
  const [activeItem, setActiveItem] = useState("Dashboard")

  const menuItems = [
    {
      icon: Home,
      label: "Dashboard",
      href: "/",
      gradient: "linear-gradient(135deg, #6366f1 0%, #8b5cf6 100%)",
      iconColor: "text-indigo-500",
    },
    {
      icon: BarChart2,
      label: "Analytics",
      href: "/analytics",
      gradient: "linear-gradient(135deg, #3b82f6 0%, #2dd4bf 100%)",
      iconColor: "text-blue-500",
    },
    {
      icon: Users,
      label: "Customers",
      href: "/customers",
      gradient: "linear-gradient(135deg, #f43f5e 0%, #ec4899 100%)",
      iconColor: "text-rose-500",
    },
    {
      icon: Mail,
      label: "Messages",
      href: "/messages",
      gradient: "linear-gradient(135deg, #f97316 0%, #eab308 100%)",
      iconColor: "text-amber-500",
    },
    {
      icon: Calendar,
      label: "Calendar",
      href: "/calendar",
      gradient: "linear-gradient(135deg, #10b981 0%, #14b8a6 100%)",
      iconColor: "text-emerald-500",
    },
    {
      icon: Settings,
      label: "Settings",
      href: "/settings",
      gradient: "linear-gradient(135deg, #64748b 0%, #94a3b8 100%)",
      iconColor: "text-slate-500",
    },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 p-8">
      <div className="max-w-5xl mx-auto">
        <h1 className="text-2xl font-bold text-[#364f6b] dark:text-white mb-8">GlowMenu Demo</h1>

        <div className="space-y-12">
          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-[#364f6b] dark:text-white">Horizontal Menu</h2>
            <MenuBar items={menuItems} activeItem={activeItem} onItemClick={setActiveItem} className="w-fit" />
            <div className="mt-4 text-sm text-gray-500 dark:text-gray-400">
              Active item: <span className="font-medium text-[#02b1c4]">{activeItem}</span>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-[#364f6b] dark:text-white">Vertical Menu</h2>
            <div className="flex gap-8">
              <MenuBar
                items={menuItems.slice(0, 4)}
                activeItem={activeItem}
                onItemClick={setActiveItem}
                className="flex-col w-fit"
              />
              <div className="flex-1">
                <div className="p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                  <h3 className="font-medium mb-2">How it works:</h3>
                  <ul className="list-disc pl-5 text-sm space-y-1 text-gray-600 dark:text-gray-300">
                    <li>Hover over menu items to see the 3D flip animation</li>
                    <li>Click on items to set them as active</li>
                    <li>Active items maintain their glow effect</li>
                    <li>The menu adapts to light and dark themes</li>
                    <li>Each item has custom gradients and icon colors</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold mb-4 text-[#364f6b] dark:text-white">Custom Styling</h2>
            <MenuBar
              items={[
                {
                  icon: Bell,
                  label: "Notifications",
                  href: "/notifications",
                  gradient: "radial-gradient(circle, rgba(251,113,133,1) 0%, rgba(217,70,239,1) 100%)",
                  iconColor: "text-pink-500",
                },
                {
                  icon: FileText,
                  label: "Documents",
                  href: "/documents",
                  gradient: "radial-gradient(circle, rgba(56,189,248,1) 0%, rgba(59,130,246,1) 100%)",
                  iconColor: "text-sky-500",
                },
              ]}
              activeItem={activeItem}
              onItemClick={setActiveItem}
              className="w-fit bg-gradient-to-r from-gray-50 to-gray-100 dark:from-gray-800 dark:to-gray-700"
            />
          </div>
        </div>

        <div className="mt-8 text-center">
          <a href="/" className="text-[#02b1c4] hover:underline">
            ← Volver al Dashboard
          </a>
        </div>
      </div>
    </div>
  )
}
