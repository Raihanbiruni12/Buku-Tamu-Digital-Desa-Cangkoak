"use client"

import { motion } from "framer-motion"
import { Card, CardContent } from "@/components/ui/card"
import { Shield, History, BarChart3, Users, Zap, FileText } from "lucide-react"
import { staggerContainer, fadeIn } from "@/lib/animations"

export const features = [
  { icon: Shield, title: "Privasi Terlindungi", description: "Setiap data kunjungan diamankan dengan sistem enkripsi modern.", color: "green", delay: 0 },
  { icon: History, title: "Data Kunjungan Lengkap", description: "Pantau semua jejak kunjungan tamu dalam satu dashboard yang rapi.", color: "amber", delay: 0.1 },
  { icon: BarChart3, title: "Statistik Interaktif", description: "Tampilkan tren kunjungan untuk bantu pengambilan keputusan desa.", color: "blue", delay: 0.2 },
  { icon: Users, title: "Kontrol Tamu Fleksibel", description: "Filter, cari, dan kelola data tamu dengan fitur lengkap.", color: "green", delay: 0.3 },
  { icon: Zap, title: "Input Super Cepat", description: "Formulir dirancang intuitif, membuat pendaftaran tamu lebih singkat.", color: "amber", delay: 0.4 },
  { icon: FileText, title: "Ekspor Data Mudah", description: "Unduh data kunjungan ke format Excel dan PDF untuk laporan.", color: "blue", delay: 0.5 },
]

const colorStyles: { [key: string]: { card: string; iconContainer: string; icon: string; title: string; } } = {
  green: {
    card: 'border-green-200',
    iconContainer: 'bg-green-100 border-2 border-green-200',
    icon: 'text-green-700',
    title: 'text-green-900'
  },
  amber: {
    card: 'border-amber-200',
    iconContainer: 'bg-amber-100 border-2 border-amber-200',
    icon: 'text-amber-700',
    title: 'text-amber-900'
  },
  blue: {
    card: 'border-blue-200',
    iconContainer: 'bg-blue-100 border-2 border-blue-200',
    icon: 'text-blue-700',
    title: 'text-blue-900'
  }
}

export function Features() {
  return (
    <motion.section
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-white"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <motion.div className="text-center mb-10 sm:mb-12" variants={fadeIn}>
          <h2 className="text-3xl sm:text-4xl font-bold text-teal-900 mb-4 font-serif">
            Keunggulan Sistem
          </h2>
          <p className="text-gray-700 max-w-xl sm:max-w-2xl mx-auto text-base md:text-lg leading-relaxed">
            Nikmati fitur modern yang dirancang untuk mempermudah administrasi desa dengan teknologi canggih dan ramah pengguna.
          </p>
        </motion.div>
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {features.map((feature, index) => {
            const styles = colorStyles[feature.color] || colorStyles.blue;
            return (
              <motion.div
                key={index}
                variants={{
                  initial: { opacity: 0, y: 40 },
                  animate: { opacity: 1, y: 0, transition: { duration: 0.6, delay: feature.delay, ease: "easeOut" } },
                }}
                whileHover={{ y: -5, scale: 1.02, transition: { type: "spring", stiffness: 300 } }}
              >
                <Card className={`${styles.card} hover:shadow-lg transition-all duration-300 bg-white/90 rounded-xl h-full`}>
                  <CardContent className="p-6 text-center">
                    <motion.div
                      className={`w-16 h-16 sm:w-20 sm:h-20 ${styles.iconContainer} rounded-full flex items-center justify-center mx-auto mb-5 shadow-sm`}
                      whileHover={{ rotate: 360, scale: 1.1 }}
                      transition={{ duration: 0.7 }}
                    >
                      <feature.icon className={`w-8 h-8 sm:w-10 sm:h-10 ${styles.icon}`} />
                    </motion.div>
                    <h3 className={`text-lg sm:text-xl font-semibold ${styles.title} mb-2 font-serif`}>
                      {feature.title}
                    </h3>
                    <p className="text-gray-700 text-sm sm:text-base leading-relaxed">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            )
          })}
        </motion.div>
      </div>
    </motion.section>
  )
}