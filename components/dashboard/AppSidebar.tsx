"use client"

import { Calendar, Home, Users, BarChart3, Settings, LogOut, MapPin } from "lucide-react"
import { useSearchParams, useRouter } from "next/navigation"
import { motion } from "framer-motion"
import Image from "next/image"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarSeparator,
} from "@/components/ui/sidebar"
import { Button } from "@/components/ui/button"
import { createClient } from "@/lib/supabase/client"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin/dashboard?tab=dashboard",
    icon: Home,
    tab: "dashboard",
  },
  {
    title: "Data Tamu",
    url: "/admin/dashboard?tab=guests",
    icon: Users,
    tab: "guests",
  },
  {
    title: "Statistik",
    url: "/admin/dashboard?tab=statistics",
    icon: BarChart3,
    tab: "statistics",
  },
  {
    title: "Pengaturan",
    url: "/admin/dashboard?tab=settings",
    icon: Settings,
    tab: "settings",
  },
]

export default function AppSidebar() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const activeTab = searchParams.get("tab") || "dashboard"
  const supabase = createClient()

  const handleSignOut = async () => {
    try {
      await supabase.auth.signOut()
      router.push("/login")
    } catch (error) {
      console.error("Sign out error:", error)
      router.push("/login")
    }
  }

  return (
    <Sidebar className="border-r border-emerald-100">
      <SidebarHeader className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50">
        <motion.div
          className="flex items-center space-x-3 p-4"
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5 }}
        >
          <motion.div
            className="w-10 h-10 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-md overflow-hidden"
            whileHover={{ rotate: 5, scale: 1.05 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <Image
              src="/logo.webp"
              alt="Logo Desa Cangkoak"
              width={32}
              height={32}
              className="object-contain w-6 h-6"
              priority
            />
          </motion.div>
          <div>
            <h2 className="text-lg font-bold text-emerald-800 font-serif">Desa Cangkoak</h2>
            <div className="flex items-center space-x-1 text-xs text-teal-700">
              <MapPin className="w-3 h-3" />
              <span>Kec. Dukupuntang</span>
            </div>
          </div>
        </motion.div>
      </SidebarHeader>

      <SidebarContent className="bg-gradient-to-b from-white to-emerald-50/30">
        <SidebarGroup>
          <SidebarGroupLabel className="text-emerald-700 font-medium px-4 py-2">Menu Utama</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {menuItems.map((item, index) => (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                >
                  <SidebarMenuItem>
                    <SidebarMenuButton
                      asChild
                      isActive={activeTab === item.tab}
                      className="hover:bg-emerald-50 hover:text-emerald-700 data-[active=true]:bg-emerald-100 data-[active=true]:text-emerald-800 data-[active=true]:border-r-2 data-[active=true]:border-emerald-600"
                    >
                      <a href={item.url} className="flex items-center space-x-3 px-4 py-3">
                        <item.icon className="w-5 h-5" />
                        <span className="font-medium">{item.title}</span>
                      </a>
                    </SidebarMenuButton>
                  </SidebarMenuItem>
                </motion.div>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarSeparator className="bg-emerald-100" />

        <SidebarGroup>
          <SidebarGroupLabel className="text-emerald-700 font-medium px-4 py-2">Informasi</SidebarGroupLabel>
          <SidebarGroupContent>
            <div className="px-4 py-3">
              <div className="bg-gradient-to-r from-emerald-100 to-teal-100 rounded-lg p-4 border border-emerald-200">
                <div className="flex items-center space-x-2 mb-2">
                  <Calendar className="w-4 h-4 text-emerald-700" />
                  <span className="text-sm font-medium text-emerald-800">Hari ini</span>
                </div>
                <p className="text-xs text-teal-700">
                  {new Date().toLocaleDateString("id-ID", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                  })}
                </p>
              </div>
            </div>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <SidebarMenu>
            <SidebarMenuItem>
              <Button
                variant="ghost"
                onClick={handleSignOut}
                className="w-full justify-start text-red-600 hover:text-red-700 hover:bg-red-50"
              >
                <LogOut className="w-4 h-4 mr-2" />
                Keluar
              </Button>
            </SidebarMenuItem>
          </SidebarMenu>
        </motion.div>
      </SidebarFooter>
    </Sidebar>
  )
}