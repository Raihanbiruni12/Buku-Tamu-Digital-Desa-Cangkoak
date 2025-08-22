"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Users, ArrowRight } from "lucide-react"
import { staggerContainer, fadeIn, slideIn } from "@/lib/animations"

export function Hero() {
  return (
    <section className="relative min-h-[calc(100vh-64px)] flex items-center bg-gradient-to-tr from-emerald-50 to-teal-50">
      <div className="fixed inset-0 pointer-events-none">
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
        <motion.div
          className="absolute top-1/3 left-20 w-3 h-3 bg-emerald-200 rounded-full opacity-50"
          animate={{ scale: [1, 1.5, 1], opacity: [0.5, 0.8, 0.5] }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-20 w-5 h-5 bg-teal-200 rounded-full opacity-30"
          animate={{ x: [0, 10, -10, 0], y: [0, -15, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <motion.div
          className="max-w-4xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          animate="animate"
        >
          <motion.div variants={fadeIn} className="mb-6 sm:mb-8">
            <Badge className="bg-emerald-200 text-emerald-800 px-3 py-1.5 sm:px-4 sm:py-2 text-sm sm:text-base rounded-lg shadow-sm inline-flex items-center">
              <MapPin className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
              Desa Cangkoak, Kec. Dukupuntang, Kab. Cirebon
            </Badge>
          </motion.div>
          <motion.h1
            className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-gray-900 mb-4 sm:mb-6 leading-tight font-serif"
            variants={slideIn}
          >
            Selamat Datang di
            <motion.span
              className="block text-transparent bg-clip-text bg-gradient-to-r from-emerald-600 to-teal-600 mt-1 sm:mt-2"
            >
              Buku Tamu Digital
            </motion.span>
            <span className="block text-emerald-800 text-xl sm:text-2xl md:text-3xl mt-1 sm:mt-2">Desa Cangkoak</span>
          </motion.h1>
          <motion.p
            className="text-base sm:text-lg md:text-xl text-gray-700 mb-6 sm:mb-8 max-w-xl sm:max-w-2xl lg:max-w-3xl mx-auto leading-relaxed text-center"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
          >
            Kami menghadirkan pelayanan desa yang lebih cepat, transparan, dan efisien melalui pemanfaatan teknologi digital. Komitmen ini menjadi langkah nyata menuju tata kelola desa yang lebih baik dan berorientasi pada kebutuhan masyarakat.
          </motion.p>
          <motion.div
            className="flex flex-col sm:flex-row justify-center items-center gap-3 sm:gap-4"
            variants={fadeIn}
          >
            <Link href="/guest-book">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-xl shadow-md hover:shadow-lg transition-all duration-300"
                >
                  <Users className="w-5 h-5 sm:w-6 sm:h-6 mr-2" />
                  Daftar Kunjungan
                  <ArrowRight className="w-4 h-4 sm:w-5 sm:h-5 ml-2 animate-pulse" />
                </Button>
              </motion.div>
            </Link>
            <Link href="#about">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }}>
                <Button
                  variant="outline"
                  size="lg"
                  className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 px-6 py-3 sm:px-8 sm:py-4 text-base sm:text-lg rounded-xl"
                >
                  Tentang Kami
                </Button>
              </motion.div>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}