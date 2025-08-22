"use client"

import { motion } from "framer-motion"
import { Users, Calendar, TrendingUp, MapPin, TreePine, Home } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import type { Guest } from "../../app/admin/dashboard/page"

interface DashboardContentProps {
  guestData: Guest[]
  userName: string
}

export default function DashboardContent({ guestData, userName }: DashboardContentProps) {
  const today = new Date().toISOString().split("T")[0]
  const todayGuests = guestData.filter((guest) => guest.visit_date === today)
  
  const thisMonth = new Date().getMonth()
  const thisYear = new Date().getFullYear()
  const monthlyGuests = guestData.filter((guest) => {
    const guestDate = new Date(guest.visit_date)
    return guestDate.getMonth() === thisMonth && guestDate.getFullYear() === thisYear
  })

  const stats = [
    {
      title: "Pengunjung Hari Ini",
      value: todayGuests.length,
      description: "Tamu yang berkunjung hari ini",
      icon: Users,
      gradient: "from-emerald-500 to-emerald-600",
      bgColor: "bg-emerald-50",
      textColor: "text-emerald-700",
    },
    {
      title: "Total Bulan Ini",
      value: monthlyGuests.length,
      description: "Akumulasi pengunjung bulan ini",
      icon: Calendar,
      gradient: "from-teal-500 to-teal-600",
      bgColor: "bg-teal-50",
      textColor: "text-teal-700",
    },
    {
      title: "Total Keseluruhan",
      value: guestData.length,
      description: "Semua data pengunjung",
      icon: TrendingUp,
      gradient: "from-slate-500 to-slate-600",
      bgColor: "bg-slate-50",
      textColor: "text-slate-700",
    },
  ]

  const recentGuests = guestData.slice(0, 5)

  return (
    <motion.div
      key="dashboard"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
      className="space-y-4 md:space-y-6"
    >
      {/* Welcome Header */}
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.6 }}
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-teal-800 p-8 text-white"
      >
        <div className="absolute -top-4 -right-4 opacity-10">
          <TreePine className="h-32 w-32" />
        </div>
        <div className="absolute -bottom-4 -left-4 opacity-10">
          <Home className="h-24 w-24" />
        </div>
        
        <div className="relative z-10">
          <h1 className="mb-2 text-3xl font-bold font-serif">
            Selamat Datang, {userName}!
          </h1>
          <p className="mb-4 text-emerald-100">
            Dashboard Buku Tamu Digital Desa Cangkoak
          </p>
          <div className="flex items-center space-x-2 text-emerald-200">
            <MapPin className="h-4 w-4" />
            <span className="text-sm">
              Kecamatan Dukupuntang, Kabupaten Cirebon
            </span>
          </div>
        </div>
      </motion.div>

      {/* Statistics Cards */}
      <div className="grid grid-cols-1 gap-4 md:gap-6 md:grid-cols-3">
        {stats.map((stat, index) => (
          <motion.div
            key={stat.title}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="overflow-hidden border-0 shadow-lg transition-all duration-300 hover:shadow-xl">
              <CardHeader className={`p-6 ${stat.bgColor}`}>
                <div className="flex items-center justify-between">
                  <div className={`flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${stat.gradient} shadow-lg`}>
                    <stat.icon className="h-6 w-6 text-white" />
                  </div>
                  <Badge 
                    variant="secondary" 
                    className={`bg-white/90 ${stat.textColor} border-0`}
                  >
                    Live
                  </Badge>
                </div>
              </CardHeader>
              
              <CardContent className="p-6">
                <div className="space-y-2">
                  <div className="text-3xl font-bold text-gray-900">
                    {stat.value}
                  </div>
                  <div className="text-sm font-medium text-gray-700">
                    {stat.title}
                  </div>
                  <div className="text-xs text-gray-500">
                    {stat.description}
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        ))}
      </div>

      {/* Recent Guests */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.4 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
            <CardTitle className="flex items-center space-x-2 text-emerald-800">
              <Users className="h-5 w-5" />
              <span>Pengunjung Terbaru</span>
            </CardTitle>
            <CardDescription className="text-teal-700">
              5 pengunjung terakhir yang tercatat
            </CardDescription>
          </CardHeader>
          
          <CardContent className="p-0">
            {recentGuests.length > 0 ? (
              <div className="divide-y divide-gray-100">
                {recentGuests.map((guest, index) => (
                  <motion.div
                    key={guest.id}
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.1 }}
                    className="p-6 transition-colors duration-200 hover:bg-emerald-50/50"
                  >
                    <div className="flex items-center justify-between">
                      <div className="space-y-2">
                        <div className="font-medium text-gray-900">
                          {guest.full_name}
                        </div>
                        <div className="text-sm text-gray-600">
                          {guest.address}
                        </div>
                        <div className="inline-block rounded-full bg-emerald-100 px-3 py-1 text-xs text-emerald-700">
                          {guest.purpose}
                        </div>
                      </div>
                      
                      <div className="space-y-2 text-right">
                        <div className="text-sm font-medium text-gray-700">
                          {new Date(guest.visit_date).toLocaleDateString("id-ID")}
                        </div>
                        <div className="text-xs text-gray-500">
                          {new Date(guest.created_at).toLocaleTimeString("id-ID", {
                            hour: "2-digit",
                            minute: "2-digit",
                          })}
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div className="p-8 text-center text-gray-500">
                <Users className="mx-auto mb-4 h-12 w-12 text-gray-300" />
                <p>Belum ada data pengunjung</p>
              </div>
            )}
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}