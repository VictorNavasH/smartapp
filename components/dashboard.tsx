"use client"

import { Card } from "@/components/ui/card"
import {
  InfoIcon,
  DollarSignIcon,
  PercentIcon,
  TicketIcon,
  CalendarCheckIcon,
  PiggyBankIcon,
  CreditCardIcon,
  StarIcon,
  BellIcon,
  BuildingIcon,
  AlertTriangleIcon,
  TrendingDownIcon,
} from "lucide-react"
import { AIInsights } from "@/components/ai-insights"
import { MetricCard } from "@/components/ui/metric-card"
import { SalesChart } from "@/components/analysis/sales-chart"
import { ExpensesChart } from "@/components/analysis/expenses-chart"
import { GlowingEffect } from "@/components/ui/glowing-effect"

export function Dashboard() {
  // Datos de ventas diarias con más información
  const ventasDiarias = [
    { dia: "Lun", valor: 2500, comensales: 62, ticketMedio: 40.32 },
    { dia: "Mar", valor: 1400, comensales: 35, ticketMedio: 40.0 },
    { dia: "Mié", valor: 3500, comensales: 85, ticketMedio: 41.18 },
    { dia: "Jue", valor: 3600, comensales: 88, ticketMedio: 40.91 },
    { dia: "Vie", valor: 4600, comensales: 110, ticketMedio: 41.82 },
    { dia: "Sáb", valor: 5800, comensales: 138, ticketMedio: 42.03 },
    { dia: "Dom", valor: 4200, comensales: 102, ticketMedio: 41.18 },
  ]

  // Datos de gastos diarios
  const gastosDiarios = [
    { dia: "Lun", valor: 1800, personal: 950, materia: 650, otros: 200 },
    { dia: "Mar", valor: 1100, personal: 650, materia: 350, otros: 100 },
    { dia: "Mié", valor: 2600, personal: 1200, materia: 1100, otros: 300 },
    { dia: "Jue", valor: 2700, personal: 1250, materia: 1150, otros: 300 },
    { dia: "Vie", valor: 3400, personal: 1600, materia: 1500, otros: 300 },
    { dia: "Sáb", valor: 4200, personal: 2000, materia: 1800, otros: 400 },
    { dia: "Dom", valor: 3100, personal: 1500, materia: 1300, otros: 300 },
  ]

  // Datos de distribución de costes
  const distribucionCostes = [
    { categoria: "Alimentos y Bebidas", porcentaje: 30, color: "#17c3b2" },
    { categoria: "Personal", porcentaje: 38, color: "#fe6d73" },
    { categoria: "Instalaciones", porcentaje: 12, color: "#364f6b" },
    { categoria: "Operativos", porcentaje: 4, color: "#ffcb77" },
    { categoria: "Marketing y Ventas", porcentaje: 4, color: "#02b1c4" },
    { categoria: "Administrativos y Financieros", porcentaje: 5, color: "#d9bbff" },
  ]

  // Datos de cuentas bancarias
  const cuentasBancarias = [
    {
      banco: "Banc Sabadell",
      color: "#0075C9",
      cuentas: [{ tipo: "Débito", saldo: 12450.75 }],
    },
    {
      banco: "CaixaBank",
      color: "#007EAA",
      cuentas: [
        { tipo: "Débito", saldo: 8320.5 },
        { tipo: "Crédito", saldo: -2150.25, limite: 5000 },
      ],
    },
    {
      banco: "BBVA",
      color: "#004481",
      cuentas: [
        { tipo: "Débito", saldo: 5680.3 },
        { tipo: "Crédito", saldo: -3450.6, limite: 6000 },
      ],
    },
  ]

  // Datos de alertas
  const alertas = [
    {
      tipo: "warning",
      icono: AlertTriangleIcon,
      titulo: "Gasto en Personal",
      mensaje: "38% de ventas (10% sobre benchmark)",
    },
    {
      tipo: "warning",
      icono: InfoIcon,
      titulo: "Materia Prima",
      mensaje: "32% de ventas (2% sobre benchmark)",
    },
    {
      tipo: "success",
      icono: TrendingDownIcon,
      titulo: "Ventas Semanales",
      mensaje: "15% superiores a semana anterior",
    },
    {
      tipo: "warning",
      icono: TrendingDownIcon,
      titulo: "Ocupación Martes",
      mensaje: "45% vs 65% objetivo",
    },
  ]

  const totalCostes = distribucionCostes.reduce((sum, item) => sum + item.porcentaje, 0)

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-bold text-[#364f6b] transform scale-110 origin-left">Smart Dashboard</h1>
        <p className="text-xs text-[#227c9d]">Resumen general del rendimiento de NÜA Smart Restaurant</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Ventas Acumuladas"
          value="€42,850"
          change={12}
          changeLabel="vs. mes anterior"
          footer="Proyección: €68,560"
          icon={<DollarSignIcon className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Ocupación Media"
          value="68%"
          change={5}
          changeLabel="vs. mes anterior"
          footer="Meta mensual: 75%"
          icon={<PercentIcon className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Ticket Medio"
          value="€39.75"
          change={3.2}
          changeLabel="vs. mes anterior"
          footer="Tendencia: €41.20"
          icon={<TicketIcon className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Reservas Acumuladas"
          value="342"
          change={4}
          changeLabel="vs. mes anterior"
          footer="Proyección: 520"
          icon={<CalendarCheckIcon className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricCard
          title="Beneficio Neto"
          value="€10,712.50"
          change={14.0}
          changeLabel="vs. mes anterior"
          footer="Margen: 25%"
          icon={<PiggyBankIcon className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Gastos Acumulados"
          value="€32,137.50"
          change={3.2}
          changeLabel="vs. mes anterior"
          footer="Presupuesto: €29,995.00"
          negative
          icon={<CreditCardIcon className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Puntuación Google"
          value="4.7"
          subValue="/5"
          change={0.2}
          changeLabel="vs. mes anterior"
          footer="Reseñas: 42 nuevas"
          icon={<StarIcon className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
        <MetricCard
          title="Alertas Activas"
          value="3"
          footer="2 críticas, 1 advertencia"
          action="Ver detalles"
          icon={<BellIcon className="h-3.5 w-3.5 text-[#02b1c4]" />}
        />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="p-5 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20 md:col-span-2 hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden">
          {/* Añadimos el efecto de brillo */}
          <GlowingEffect
            spread={30}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.01}
            borderWidth={2}
            variant="default"
          />

          <h3 className="text-sm font-medium text-[#364f6b] mb-3">Progreso hacia Punto de Equilibrio (Abril 2025)</h3>
          <p className="text-xs text-[#227c9d] mb-4">Has alcanzado el 68% del punto de equilibrio este mes</p>

          <div className="flex flex-col justify-center">
            <div className="flex items-center justify-between mb-2">
              <span className="text-xs font-medium text-[#364f6b]">€32,640 de €48,000</span>
              <span className="text-xs font-medium text-[#02b1c4]">68%</span>
            </div>

            <div className="w-full bg-gray-100 rounded-full h-3 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#fe6d73] via-[#17c3b2] to-[#02b1c4] h-3 rounded-full transition-all duration-700"
                style={{ width: "68%" }}
              ></div>
            </div>

            <p className="text-xs text-[#227c9d] mt-3 text-center">
              Necesitas <span className="font-medium text-[#fe6d73]">€15,360</span> más en ventas para alcanzar el punto
              de equilibrio
            </p>

            {/* Distribución de Costes */}
            <div className="mt-5">
              <div className="flex items-center justify-between mb-2">
                <span className="text-xs font-medium text-[#364f6b]">Distribución de Costes</span>
                <span className="text-xs text-[#227c9d]">Total: {totalCostes}%</span>
              </div>

              <div className="w-full h-8 rounded-lg overflow-hidden flex">
                {distribucionCostes.map((item, index) => (
                  <div
                    key={index}
                    className="h-full flex items-center justify-center text-white text-xs font-medium"
                    style={{
                      backgroundColor: item.color,
                      width: `${item.porcentaje}%`,
                    }}
                  >
                    {item.porcentaje}%
                  </div>
                ))}
              </div>

              <div className="flex flex-wrap gap-3 mt-3 justify-center">
                {distribucionCostes.map((item, index) => (
                  <div key={index} className="flex items-center gap-1.5">
                    <div className="w-2.5 h-2.5 rounded-full" style={{ backgroundColor: item.color }}></div>
                    <span className="text-xs text-[#364f6b]">{item.categoria}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </Card>

        {/* Componente de Insights de IA */}
        <AIInsights />
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Gráfica de Ventas Diarias */}
        <SalesChart data={ventasDiarias} />

        {/* Gráfica de Gastos Diarios */}
        <ExpensesChart data={gastosDiarios} />
      </div>

      {/* Alertas y Resumen Bancario en grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {/* Alertas y Notificaciones (rediseñadas) */}
        <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20 hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden">
          {/* Añadimos el efecto de brillo */}
          <GlowingEffect
            spread={30}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.01}
            borderWidth={2}
            variant="default"
          />

          <h3 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
            <BellIcon className="h-4 w-4 mr-2 text-[#02b1c4]" />
            Alertas y Notificaciones
          </h3>
          <div className="pt-2 flex flex-col justify-center h-[calc(100%-36px)]">
            <div className="space-y-3">
              {alertas.map((alerta, index) => (
                <div
                  key={index}
                  className={`flex items-center gap-3 p-3 rounded-xl border-l-4 transition-all duration-300 cursor-pointer hover:-translate-y-0.5 hover:shadow-sm relative overflow-hidden
                    ${alerta.tipo === "warning" ? "bg-[#fe6d73]/5 border-[#fe6d73] hover:bg-[#fe6d73]/10" : ""}
                    ${alerta.tipo === "info" ? "bg-[#02b1c4]/5 border-[#02b1c4] hover:bg-[#02b1c4]/10" : ""}
                    ${alerta.tipo === "success" ? "bg-[#17c3b2]/5 border-[#17c3b2] hover:bg-[#17c3b2]/10" : ""}
                  `}
                >
                  {/* Efecto de brillo para cada alerta */}
                  <GlowingEffect
                    spread={20}
                    glow={true}
                    disabled={false}
                    proximity={30}
                    inactiveZone={0.01}
                    borderWidth={1}
                    variant="default"
                  />

                  <div
                    className={`p-2 rounded-full transition-transform duration-300 group-hover:scale-110
                      ${alerta.tipo === "warning" ? "bg-[#fe6d73]/10 text-[#fe6d73]" : ""}
                      ${alerta.tipo === "info" ? "bg-[#02b1c4]/10 text-[#02b1c4]" : ""}
                      ${alerta.tipo === "success" ? "bg-[#17c3b2]/10 text-[#17c3b2]" : ""}
                      ${alerta.titulo === "Materia Prima" ? "bg-[#ffcb77]/10 text-[#ffcb77]" : ""}
                    `}
                  >
                    <alerta.icono className="h-4 w-4" />
                  </div>
                  <div className="flex-1">
                    <p className="text-sm font-medium text-[#364f6b]">{alerta.titulo}</p>
                    <p className="text-xs text-[#227c9d]">{alerta.mensaje}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>

        {/* Resumen de Cuentas Bancarias (sin mini gráficos) */}
        <Card className="p-4 transition-all duration-300 hover:shadow-md hover:border-[#02b1c4]/20 hover:-translate-y-0.5 hover:shadow-lg relative overflow-hidden">
          {/* Añadimos el efecto de brillo */}
          <GlowingEffect
            spread={30}
            glow={true}
            disabled={false}
            proximity={50}
            inactiveZone={0.01}
            borderWidth={2}
            variant="default"
          />

          <h3 className="text-sm font-medium text-[#364f6b] mb-3 flex items-center">
            <BuildingIcon className="h-4 w-4 mr-2 text-[#02b1c4]" />
            Resumen de Cuentas Bancarias
          </h3>
          <div className="pt-2 flex flex-col justify-center h-[calc(100%-36px)]">
            <div className="space-y-3">
              {cuentasBancarias.map((banco, index) => (
                <div
                  key={index}
                  className="border border-gray-100 rounded-xl p-3 transition-all duration-300 hover:bg-gray-50/50 cursor-pointer hover:-translate-y-0.5 hover:shadow-sm relative overflow-hidden"
                >
                  {/* Efecto de brillo para cada banco */}
                  <GlowingEffect
                    spread={20}
                    glow={true}
                    disabled={false}
                    proximity={30}
                    inactiveZone={0.01}
                    borderWidth={1}
                    variant="default"
                  />

                  <div className="flex items-center mb-2">
                    <div
                      className="w-3 h-3 rounded-full mr-2 transition-transform duration-300 hover:scale-110"
                      style={{ backgroundColor: banco.color }}
                    ></div>
                    <span className="text-sm font-medium text-[#364f6b]">{banco.banco}</span>
                  </div>
                  <div className="space-y-2">
                    {banco.cuentas.map((cuenta, cIndex) => (
                      <div key={cIndex} className="flex items-center justify-between group">
                        <div className="flex items-center">
                          {cuenta.tipo === "Débito" ? (
                            <CreditCardIcon className="h-3.5 w-3.5 mr-1.5 text-[#17c3b2] transition-transform duration-300 group-hover:scale-110" />
                          ) : (
                            <CreditCardIcon className="h-3.5 w-3.5 mr-1.5 text-[#fe6d73] transition-transform duration-300 group-hover:scale-110" />
                          )}
                          <span className="text-xs text-[#227c9d] transition-colors duration-300 group-hover:text-[#364f6b]">
                            {cuenta.tipo}
                          </span>
                        </div>
                        <div className="flex-1 mx-3 h-4 flex items-center">
                          <div className="w-full h-2 bg-gray-100 rounded-full overflow-hidden">
                            <div
                              className={`h-full rounded-full transition-all duration-500 ${
                                cuenta.tipo === "Débito" ? "bg-[#17c3b2]" : "bg-[#fe6d73]"
                              } group-hover:brightness-110`}
                              style={{
                                width:
                                  cuenta.tipo === "Débito"
                                    ? "100%"
                                    : `${(Math.abs(cuenta.saldo) / (cuenta.limite || 1)) * 100}%`,
                              }}
                            ></div>
                          </div>
                        </div>
                        <div>
                          <span
                            className={`text-sm font-medium transition-all duration-300 ${
                              cuenta.tipo === "Débito"
                                ? "text-[#17c3b2] group-hover:text-[#17c3b2]/80"
                                : "text-[#fe6d73] group-hover:text-[#fe6d73]/80"
                            }`}
                          >
                            {cuenta.saldo >= 0 ? "€" : "-€"}
                            {Math.abs(cuenta.saldo).toLocaleString(undefined, {
                              minimumFractionDigits: 2,
                              maximumFractionDigits: 2,
                            })}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </Card>
      </div>
    </div>
  )
}
