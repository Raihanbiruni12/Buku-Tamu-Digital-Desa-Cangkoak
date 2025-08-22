"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { motion } from "framer-motion"
import { toast } from "sonner"
import Image from "next/image"

import { createClient } from "@/lib/supabase/client"
import {
  Lock,
  User,
  Eye,
  EyeOff,
  Loader2,
  ArrowLeft,
} from "lucide-react"

import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form"

const formSchema = z.object({
  email: z.string().email({ message: "Format email tidak valid." }),
  password: z.string().min(6, { message: "Password minimal 6 karakter." }),
})

export function LoginForm() {
  const router = useRouter()
  const supabase = createClient()
  const [showPassword, setShowPassword] = useState(false)

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: { email: "", password: "" },
    mode: "onTouched",
  })

  const onSubmit = async (values: z.infer<typeof formSchema>) => {
    const { error } = await supabase.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    })
    if (error) {
      toast.error("Gagal masuk", {
        description: "Email atau password yang Anda masukkan salah.",
      })
    } else {
      toast.success("Login berhasil!")
      router.push("/admin/dashboard")
      router.refresh()
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="w-full max-w-xs sm:max-w-sm md:max-w-md mx-auto px-4 sm:px-6 z-10"
    >
      <div className="space-y-4 sm:space-y-6">
        <div className="text-center space-y-2 sm:space-y-3">
          <Image
            src="/logo.webp"
            alt="Logo Desa Cangkoak"
            width={48}
            height={48}
            className="mx-auto w-10 h-10 sm:w-12 sm:h-12 md:w-16 md:h-16"
            priority
          />
          <h1 className="text-xl sm:text-2xl md:text-3xl font-bold text-emerald-900 tracking-tight font-serif">
            Admin Login
          </h1>
          <p className="text-emerald-600 text-xs sm:text-sm md:text-base">
            Buku Tamu Digital Desa Cangkoak
          </p>
        </div>

        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4 sm:space-y-5">
            <FormField
              control={form.control}
              name="email"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Email</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <User className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                      <Input
                        placeholder="Email"
                        {...field}
                        className="pl-10 bg-white/50 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 h-10 sm:h-11 md:h-12 rounded-lg text-sm sm:text-base"
                      />
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="password"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Password</FormLabel>
                  <FormControl>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 sm:h-5 sm:w-5 text-emerald-400" />
                      <Input
                        type={showPassword ? "text" : "password"}
                        placeholder="Password"
                        {...field}
                        className="pl-10 pr-10 bg-white/50 border-emerald-200 focus:border-emerald-500 focus:ring-emerald-500 h-10 sm:h-11 md:h-12 rounded-lg text-sm sm:text-base"
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3 text-emerald-500 hover:text-emerald-600 transition-colors"
                        aria-label={showPassword ? "Sembunyikan password" : "Tampilkan password"}
                      >
                        {showPassword ? (
                          <EyeOff className="w-4 h-4 sm:w-5 sm:h-5" />
                        ) : (
                          <Eye className="w-4 h-4 sm:w-5 sm:h-5" />
                        )}
                      </button>
                    </div>
                  </FormControl>
                  <FormMessage className="text-xs sm:text-sm" />
                </FormItem>
              )}
            />

            <Button
              type="submit"
              disabled={form.formState.isSubmitting}
              className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white font-bold h-10 sm:h-11 md:h-12 text-sm sm:text-base rounded-lg transition-all transform active:scale-[0.98]"
            >
              {form.formState.isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 sm:h-5 sm:w-5 animate-spin" />
                  <span>Memproses...</span>
                </>
              ) : (
                "Masuk"
              )}
            </Button>
          </form>
        </Form>

        <div className="text-center">
          <Button
            variant="ghost"
            className="text-emerald-700 hover:text-emerald-900 hover:bg-emerald-100/60 h-10 sm:h-11 text-xs sm:text-sm"
            onClick={() => router.push("/")}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Kembali ke Beranda
          </Button>
        </div>
      </div>
    </motion.div>
  )
}