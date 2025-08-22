"use client"

import type React from "react"
import { useState, useEffect } from "react"
import { motion } from "framer-motion"
import { User, Lock, Settings, Shield } from "lucide-react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { z } from "zod"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { createClient } from "@/lib/supabase/client"

const userSchema = z.object({
  name: z.string().min(1, "Nama wajib diisi"),
  email: z.string().email("Email tidak valid"),
  newPassword: z.string().min(6, "Password minimal 6 karakter").optional(),
  confirmPassword: z.string().optional(),
}).refine((data) => !data.newPassword || data.newPassword === data.confirmPassword, {
  message: "Password tidak cocok",
  path: ["confirmPassword"],
})

type UserFormData = z.infer<typeof userSchema>

export default function SettingsContent() {
  const [loading, setLoading] = useState(false)
  const supabase = createClient()

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
  } = useForm<UserFormData>({
    resolver: zodResolver(userSchema),
    defaultValues: {
      name: "Admin Desa Cangkoak",
      email: "admin@desacangkoak.id",
      newPassword: "",
      confirmPassword: "",
    },
  })

  useEffect(() => {
    const getUserData = async () => {
      const { data: { user }, error } = await supabase.auth.getUser()
      if (error) {
        console.warn("Error fetching user or no session:", error.message)
        return
      }
      if (user) {
        setValue("name", user.user_metadata?.name || "Admin Desa Cangkoak")
        setValue("email", user.email || "admin@desacangkoak.id")
      }
    }
    getUserData()
  }, [setValue])

  const onSubmit = async (data: UserFormData) => {
    setLoading(true)
    try {
      const response = await fetch("/api/admin/update", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })
      const result = await response.json()
      if (!response.ok) throw new Error(result.error || "Gagal memperbarui data admin")
      toast.success(result.message || "Data admin berhasil diperbarui")
      reset({
        name: data.name,
        email: data.email,
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast.error("Gagal memperbarui data admin")
      console.error("Update error:", error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <motion.div
      key="settings"
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
        className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-emerald-600 via-teal-700 to-teal-800 p-8 text-white"
      >
        <div className="absolute -top-4 -right-4 opacity-10">
          <Settings className="h-32 w-32" />
        </div>
        <div className="absolute -bottom-4 -left-4 opacity-10">
          <Shield className="h-24 w-24" />
        </div>
        <div className="relative z-10">
          <h1 className="mb-2 text-3xl font-bold font-serif">Pengaturan Sistem</h1>
          <p className="mb-4 text-emerald-100">Kelola konfigurasi dan keamanan akun admin</p>
          <div className="flex items-center space-x-2 text-emerald-200">
            <Shield className="h-4 w-4" />
            <span className="text-sm">Admin Dashboard Desa Cangkoak</span>
          </div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.5, delay: 0.1 }}
      >
        <Card className="border-0 shadow-lg">
          <CardHeader className="border-b border-emerald-100 bg-gradient-to-r from-emerald-50 to-teal-50 p-6">
            <CardTitle className="flex items-center space-x-2 text-emerald-800">
              <User className="h-5 w-5" />
              <span>Akun Admin</span>
            </CardTitle>
            <CardDescription className="text-teal-700">Informasi dan pengaturan akun</CardDescription>
          </CardHeader>
          <CardContent className="p-6 space-y-6">
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div className="space-y-4">
                <div>
                  <Label htmlFor="name">Nama Admin</Label>
                  <Input
                    id="name"
                    {...register("name")}
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                  {errors.name && <p className="text-xs text-red-600">{errors.name.message}</p>}
                </div>
                <div>
                  <Label htmlFor="email">Email</Label>
                  <Input
                    id="email"
                    type="email"
                    {...register("email")}
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                  {errors.email && <p className="text-xs text-red-600">{errors.email.message}</p>}
                </div>
              </div>
              <Separator />
              <div className="space-y-4">
                <h3 className="font-semibold text-gray-900 flex items-center space-x-2">
                  <Lock className="h-4 w-4" />
                  <span>Ubah Password</span>
                </h3>
                <div>
                  <Label htmlFor="newPassword">Password Baru</Label>
                  <Input
                    id="newPassword"
                    type="password"
                    {...register("newPassword")}
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                  {errors.newPassword && <p className="text-xs text-red-600">{errors.newPassword.message}</p>}
                </div>
                <div>
                  <Label htmlFor="confirmPassword">Konfirmasi Password</Label>
                  <Input
                    id="confirmPassword"
                    type="password"
                    {...register("confirmPassword")}
                    className="border-emerald-200 focus:border-emerald-500"
                  />
                  {errors.confirmPassword && <p className="text-xs text-red-600">{errors.confirmPassword.message}</p>}
                </div>
              </div>
              <Button type="submit" disabled={loading} className="bg-emerald-600 hover:bg-emerald-700 w-full">
                {loading ? "Menyimpan..." : "Simpan Perubahan"}
              </Button>
            </form>
          </CardContent>
        </Card>
      </motion.div>
    </motion.div>
  )
}