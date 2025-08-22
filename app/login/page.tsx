"use client"

import { motion } from "framer-motion"
import { LoginForm } from "@/components/auth/LoginForm"

export default function LoginPage() {
  return (
    <main className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-gradient-to-br from-emerald-50 to-teal-50 px-4">
      <motion.div
        className="absolute -top-40 -right-40 w-96 h-96 bg-emerald-200/50 rounded-full filter blur-3xl"
        animate={{
          x: [0, 20, -30, 40, 0],
          y: [0, -40, 30, -20, 0],
          scale: [1, 1.1, 0.9, 1.05, 1],
          rotate: [0, 180, -90, 90, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute -bottom-40 -left-40 w-96 h-96 bg-teal-200/50 rounded-full filter blur-3xl"
        animate={{
          x: [0, -30, 40, -20, 0],
          y: [0, 50, -20, 30, 0],
          scale: [1, 0.9, 1.1, 1.05, 1],
          rotate: [0, -120, 180, 60, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "loop",
          ease: "easeInOut",
        }}
      />
      <motion.div
        className="absolute top-20 right-10 w-4 h-4 bg-emerald-300 rounded-full opacity-60"
        animate={{ y: [0, -20, 0], x: [0, -10, 0] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute bottom-40 left-10 w-6 h-6 bg-teal-300 rounded-full opacity-40"
        animate={{ y: [0, 15, 0], rotate: [0, 180, 360] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <LoginForm />
    </main>
  )
}