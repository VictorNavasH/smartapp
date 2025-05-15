import type React from "react"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
// Actualizar las importaciones del sidebar y topbar
import AppSidebar from "@/components/layout/app-sidebar"
import TopBar from "@/components/layout/top-bar"
import { AIProvider } from "@/lib/ai-context"
import { AIChat } from "@/components/ai-chat"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "NÜA Smart App",
  description: "Aplicación de análisis para restaurantes",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="es">
      <body className={inter.className}>
        <AIProvider>
          <div className="flex min-h-screen">
            <AppSidebar />
            <div className="flex-1 flex flex-col ml-16 md:ml-64 relative">
              {/* Se ha eliminado el degradado global */}
              <TopBar />
              <main className="flex-1 p-4 md:p-6">{children}</main>
            </div>
            <AIChat />
          </div>
        </AIProvider>
      </body>
    </html>
  )
}
