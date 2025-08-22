"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Leaf } from "lucide-react"
import { staggerContainer, fadeIn, scaleUp } from "@/lib/animations"
import { villageStats } from "@/lib/data"

export function AboutSection() {
  const colorClasses = [
    { bg: 'bg-teal-50', border: 'border-teal-200', textNumber: 'text-teal-800', textLabel: 'text-teal-600' },
    { bg: 'bg-emerald-50', border: 'border-emerald-200', textNumber: 'text-emerald-800', textLabel: 'text-emerald-600' },
    { bg: 'bg-lime-50', border: 'border-lime-200', textNumber: 'text-lime-800', textLabel: 'text-lime-600' },
  ]

  return (
    <motion.section
      id="about"
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-b from-teal-50/60 via-lime-50/60 to-emerald-50/60"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.9 }}
    >
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          {/* Left Content */}
          <motion.div variants={fadeIn}>
            <motion.h2
              className="text-3xl sm:text-4xl md:text-5xl font-extrabold text-teal-900 mb-4 sm:mb-6 font-serif"
              variants={fadeIn}
            >
              Tentang Desa Cangkoak
            </motion.h2>
            <motion.p
              className="text-gray-700 text-base sm:text-lg leading-relaxed mb-6"
              variants={fadeIn}
            >
              Desa Cangkoak, di Kecamatan Dukupuntang, Kabupaten Cirebon, adalah desa agraris yang kaya budaya.
              Dikenal dengan sawah hijau, gotong royong, dan keramahan warganya, Cangkoak kini melangkah menuju modernisasi
              demi pembangunan yang berkelanjutan dan berbasis digital.
            </motion.p>

            {/* Village Stats */}
            <motion.div
              className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 mt-8"
              variants={staggerContainer}
            >
              {villageStats.map((stat, index) => {
                const colors = colorClasses[index % colorClasses.length]
                return (
                  <motion.div
                    key={index}
                    className={`text-center p-5 min-h-[100px] rounded-xl border ${colors.bg} ${colors.border}`}
                    variants={scaleUp}
                    whileHover={{ scale: 1.05, y: -4 }}
                    transition={{ type: "spring", stiffness: 300 }}
                  >
                    <div className={`text-xl sm:text-2xl font-bold ${colors.textNumber}`}>
                      {stat.number}
                    </div>
                    <div className={`text-sm sm:text-base mt-1 ${colors.textLabel}`}>
                      {stat.label}
                    </div>
                  </motion.div>
                )
              })}
            </motion.div>
          </motion.div>

          {/* Right Image */}
          <motion.div className="relative" variants={fadeIn}>
            <motion.div
              className="relative rounded-2xl overflow-hidden shadow-lg border border-teal-200"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/desa-cangkoak.webp"
                alt="Desa Cangkoak"
                width={800}
                height={600}
                className="w-full h-auto object-cover"
                priority
              />
              <div className="absolute inset-0 bg-gradient-to-t from-teal-900/40 to-transparent" />
            </motion.div>

            {/* Floating Icon */}
            <motion.div
              className="absolute -bottom-6 -right-6 w-20 h-20 bg-teal-600 rounded-full flex items-center justify-center shadow-lg"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.4 }}
              whileHover={{ rotate: 20, scale: 1.1 }}
            >
              <Leaf className="w-10 h-10 text-white" />
            </motion.div>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  )
}
