"use client"

import { motion } from "framer-motion"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
} from "recharts"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { TrendingUp, Users, Calendar, BarChart3 } from "lucide-react"
import type { Guest } from "../../app/admin/dashboard/page"

interface StatisticsContentProps {
  guestData: Guest[]
}

export default function StatisticsContent({ guestData }: StatisticsContentProps) {
  const last7Days = Array.from({ length: 7 }, (_, i) => {
    const date = new Date()
    date.setDate(date.getDate() - (6 - i))
    return date.toISOString().split("T")[0]
  })

  const dailyData = last7Days.map((date) => {
    const count = guestData.filter((guest) => guest.visit_date === date).length
    return {
      date: new Date(date).toLocaleDateString("id-ID", { weekday: "short", day: "numeric" }),
      visitors: count,
    }
  })

  const last6Months = Array.from({ length: 6 }, (_, i) => {
    const date = new Date()
    date.setMonth(date.getMonth() - (5 - i))
    return {
      month: date.getMonth(),
      year: date.getFullYear(),
      name: date.toLocaleDateString("id-ID", { month: "short" }),
    }
  })

  const monthlyData = last6Months.map(({ month, year, name }) => {
    const count = guestData.filter((guest) => {
      const guestDate = new Date(guest.visit_date)
      return guestDate.getMonth() === month && guestDate.getFullYear() === year
    }).length
    return { month: name, visitors: count }
  })

  const purposeData = guestData.reduce(
    (acc, guest) => {
      acc[guest.purpose] = (acc[guest.purpose] || 0) + 1
      return acc
    },
    {} as Record<string, number>,
  )

  const purposeChartData = Object.entries(purposeData).map(([purpose, count]) => ({
    name: purpose,
    value: count,
  }))

  const COLORS = ["#10b981", "#14b8a6", "#64748b", "#f97316", "#8b5cf6", "#0ea5e9"]

  return (
    <motion.div
      key="statistics"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 md:space-y-6"
    >
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-emerald-600 via-teal-700 to-teal-800 rounded-2xl p-8 text-white relative overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-32 h-32 opacity-10">
          <BarChart3 className="w-full h-full" />
        </div>
        <div className="relative z-10">
          <h1 className="text-3xl font-bold mb-2 font-serif">Statistik Pengunjung</h1>
          <p className="text-emerald-100 mb-4">Analisis data kunjungan Desa Cangkoak</p>
          <div className="flex items-center space-x-6 text-emerald-200">
            <div className="flex items-center space-x-2">
              <Users className="w-4 h-4" />
              <span className="text-sm">Total: {guestData.length} pengunjung</span>
            </div>
            <div className="flex items-center space-x-2">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Periode: 6 bulan terakhir</span>
            </div>
          </div>
        </div>
      </motion.div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 p-6">
              <CardTitle className="text-emerald-800 flex items-center space-x-2">
                <TrendingUp className="w-5 h-5" />
                <span>Pengunjung 7 Hari Terakhir</span>
              </CardTitle>
              <CardDescription className="text-teal-700">Tren kunjungan harian</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <BarChart data={dailyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="date" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Bar dataKey="visitors" fill="#10b981" radius={[4, 4, 0, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, x: 20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <Card className="border-0 shadow-lg">
            <CardHeader className="bg-gradient-to-r from-teal-50 to-cyan-50 border-b border-teal-100 p-6">
              <CardTitle className="text-teal-800 flex items-center space-x-2">
                <BarChart3 className="w-5 h-5" />
                <span>Tren Bulanan</span>
              </CardTitle>
              <CardDescription className="text-cyan-700">Perkembangan 6 bulan terakhir</CardDescription>
            </CardHeader>
            <CardContent className="p-6">
              <ResponsiveContainer width="100%" height={300}>
                <LineChart data={monthlyData}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                  <XAxis dataKey="month" stroke="#6b7280" fontSize={12} />
                  <YAxis stroke="#6b7280" fontSize={12} />
                  <Tooltip
                    contentStyle={{
                      backgroundColor: "#f9fafb",
                      border: "1px solid #e5e7eb",
                      borderRadius: "8px",
                    }}
                  />
                  <Line
                    type="monotone"
                    dataKey="visitors"
                    stroke="#14b8a6"
                    strokeWidth={3}
                    dot={{ fill: "#14b8a6", strokeWidth: 2, r: 6 }}
                    activeDot={{ r: 8, stroke: "#14b8a6", strokeWidth: 2 }}
                  />
                </LineChart>
              </ResponsiveContainer>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.3 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="bg-gradient-to-r from-slate-50 to-stone-50 border-b border-slate-100 p-6">
            <CardTitle className="text-slate-800 flex items-center space-x-2">
              <Users className="w-5 h-5" />
              <span>Distribusi Tujuan Kunjungan</span>
            </CardTitle>
            <CardDescription className="text-slate-600">Kategori tujuan kunjungan pengunjung</CardDescription>
          </CardHeader>
          <CardContent className="p-6">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4 md:gap-6">
              <div>
                <ResponsiveContainer width="100%" height={300}>
                  <PieChart>
                    <Pie
                      data={purposeChartData}
                      cx="50%"
                      cy="50%"
                      labelLine={false}
                      label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      outerRadius={80}
                      fill="#8884d8"
                      dataKey="value"
                    >
                      {purposeChartData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <div className="space-y-3">
                {purposeChartData.map((item, index) => (
                  <div key={item.name} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                    <div className="flex items-center space-x-3">
                      <div
                        className="w-4 h-4 rounded-full"
                        style={{ backgroundColor: COLORS[index % COLORS.length] }}
                      />
                      <span className="font-medium text-gray-700">{item.name}</span>
                    </div>
                    <span className="text-gray-900 font-semibold">{item.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}