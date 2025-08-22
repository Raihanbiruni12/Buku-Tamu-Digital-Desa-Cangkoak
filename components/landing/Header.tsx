"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

export function Header() {
  return (
    <motion.header
      className="bg-transparent backdrop-blur-md shadow-sm border-b border-teal-100 sticky top-0 z-50"
      style={{ position: "sticky", top: 0 }}
      initial={{ opacity: 0, y: -50 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6, ease: "easeOut" }}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-2 sm:py-3">
        <div className="flex items-center justify-between">
          <Link href="/">
            <div className="flex items-center space-x-3 sm:space-x-4">
              <motion.div
                className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-teal-600 to-emerald-700 rounded-lg flex items-center justify-center shadow-md overflow-hidden"
                whileHover={{ rotate: 5, scale: 1.05 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <Image
                  src="/logo.webp"
                  alt="Logo Desa Cangkoak"
                  width={48}
                  height={48}
                  className="object-contain w-6 h-6 sm:w-8 sm:h-8"
                />
              </motion.div>
              <div>
                <h1 className="text-lg sm:text-xl font-bold text-teal-900 font-serif">Buku Tamu Digital</h1>
                <p className="text-xs sm:text-sm text-teal-600">Desa Cangkoak</p>
              </div>
            </div>
          </Link>
          <Link href="/login">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
              <Button
                variant="outline"
                size="sm"
                className="border-teal-200 text-teal-700 hover:bg-teal-100 px-3 py-1 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium"
              >
                Admin Login
              </Button>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.header>
  )
}