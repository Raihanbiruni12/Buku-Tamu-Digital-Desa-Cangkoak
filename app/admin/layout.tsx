import type React from "react"
import { createClient } from "@/lib/supabase/server"
import { redirect } from "next/navigation"
import { SidebarProvider } from "@/components/ui/sidebar"
import AppSidebar from "@/components/dashboard/AppSidebar"

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const supabase = await createClient()

  const {
    data: { user },
  } = await supabase.auth.getUser()

  if (!user) {
    redirect("/login")
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 via-white to-amber-50">
      <SidebarProvider>
        <AppSidebar />
        {children}
      </SidebarProvider>
    </div>
  )
}