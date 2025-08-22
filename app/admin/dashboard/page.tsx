"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { SidebarInset, SidebarTrigger } from "@/components/ui/sidebar"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import DashboardContent from "@/components/dashboard/DashboardContent"
import GuestTable from "@/components/dashboard/GuestTable"
import StatisticsContent from "@/components/dashboard/StatisticsContent"
import SettingsContent from "@/components/dashboard/SettingsContent"
import { createClient } from "@/lib/supabase/client"

export interface Guest {
  id: string
  created_at: string
  full_name: string
  address: string
  phone: string | null
  purpose: string
  visit_date: string
}

const menuItems = [
  { id: "dashboard", title: "Dashboard" },
  { id: "guests", title: "Data Tamu" },
  { id: "statistics", title: "Statistik" },
  { id: "settings", title: "Pengaturan" },
]

export default function AdminDashboardPage() {
  const searchParams = useSearchParams()
  const [activeTab, setActiveTab] = useState("dashboard")
  const [guestData, setGuestData] = useState<Guest[]>([])
  const [userName, setUserName] = useState<string>("Admin")
  const [loading, setLoading] = useState(true)
  const supabase = createClient()

  useEffect(() => {
    const tab = searchParams.get("tab") || "dashboard"
    setActiveTab(tab)
  }, [searchParams])

  useEffect(() => {
    const fetchGuests = async () => {
      setLoading(true)
      try {
        const { data, error } = await supabase
          .from("guests")
          .select("*")
          .order("created_at", { ascending: false })

        if (error) {
          console.error("Failed to fetch guests:", error)
          setGuestData([])
        } else {
          setGuestData(data as Guest[])
        }
      } catch (error) {
        console.error("Database connection error:", error)
        setGuestData([])
      }
      setLoading(false)
    }

    const fetchUser = async () => {
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        console.error("Failed to fetch user:", error)
      } else {
        const name = data.user?.user_metadata?.name || "Admin"
        setUserName(name)
      }
    }

    fetchGuests()
    fetchUser()
  }, [supabase])

  const renderContent = () => {
    switch (activeTab) {
      case "guests":
        return <GuestTable guestData={guestData} setGuestData={setGuestData} loading={loading} />
      case "statistics":
        return <StatisticsContent guestData={guestData} />
      case "settings":
        return <SettingsContent />
      case "dashboard":
      default:
        return <DashboardContent guestData={guestData} userName={userName} />
    }
  }

  return (
    <SidebarInset>
      <motion.header
        className="flex h-16 shrink-0 items-center gap-2 border-b border-emerald-100 px-4 bg-white/80 backdrop-blur-md sticky top-0 z-40"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <SidebarTrigger className="-ml-1 text-emerald-700 hover:bg-emerald-50" />
        <div className="flex items-center space-x-2 ml-2">
          <motion.div
            className="w-8 h-8 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-md overflow-hidden"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/logo.webp"
              alt="Logo Desa Cangkoak"
              width={24}
              height={24}
              className="object-contain w-5 h-5"
            />
          </motion.div>
          <div>
            <h1 className="text-lg font-semibold text-emerald-800 font-serif">
              {menuItems.find((item) => item.id === activeTab)?.title || "Dashboard"}
            </h1>
            <p className="text-xs text-teal-700">Desa Cangkoak</p>
          </div>
        </div>
      </motion.header>
      <main className="flex-1 p-4 sm:p-6 lg:p-8">
        <AnimatePresence mode="wait">{renderContent()}</AnimatePresence>
      </main>
    </SidebarInset>
  )
}