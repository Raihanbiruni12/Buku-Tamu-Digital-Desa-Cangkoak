"use client"

import { motion } from "framer-motion"
import Image from "next/image"
import { Leaf } from "lucide-react"
import { staggerContainer, fadeIn, scaleUp } from "@/lib/animations"
import { villageStats } from "@/lib/data"

export function VillageInfo() {
  return (
    <motion.section
      className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-lime-50 to-emerald-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <div className="grid md:grid-cols-2 gap-8 lg:gap-12 items-center">
          <motion.div variants={staggerContainer} initial="initial" whileInView="animate" viewport={{ once: true }}>
            <motion.h2
              className="text-2xl sm:text-3xl md:text-4xl font-bold text-emerald-900 mb-4 sm:mb-6 font-serif"
              variants={fadeIn}
            >
              Profil Desa Cangkoak
            </motion.h2>
            <motion.p
              className="text-gray-700 mb-4 sm:mb-6 text-sm sm:text-base md:text-lg leading-relaxed"
              variants={fadeIn}
            >
              Desa Cangkoak, terletak di Kecamatan Dukupuntang, Kabupaten Cirebon, dikenal dengan pertanian subur dan komunitas yang harmonis.
            </motion.p>
            <motion.div
              className="grid grid-cols-2 sm:grid-cols-3 gap-4 sm:gap-6"
              variants={staggerContainer}
            >
              {villageStats.map((stat, index) => (
                <motion.div
                  key={index}
                  className={`text-center p-3 sm:p-4 bg-${stat.color}-50 border border-${stat.color}-200 rounded-lg ${
                    index === 2 ? "col-span-2 sm:col-span-1" : ""
                  }`}
                  variants={scaleUp}
                  whileHover={{ scale: 1.1, y: -5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <div className={`text-xl sm:text-2xl font-bold text-${stat.color}-800`}>{stat.number}</div>
                  <div className={`text-xs sm:text-sm text-${stat.color}-600`}>{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
          <motion.div
            className="relative mt-6 md:mt-0"
            variants={fadeIn}
          >
            <motion.div
              className="relative rounded-xl sm:rounded-2xl overflow-hidden shadow-lg"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <Image
                src="/placeholder.svg?height=600&width=800&text=Kantor+Desa+Cangkoak"
                alt="Kantor Desa Cangkoak"
                width={800}
                height={600}
                className="w-full h-48 sm:h-64 md:h-80 object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-emerald-900/30 to-transparent" />
            </motion.div>
            <motion.div
              className="absolute -bottom-4 -right-4 w-16 h-16 sm:w-20 sm:h-20 bg-emerald-600 rounded-full flex items-center justify-center shadow-md"
              initial={{ scale: 0 }}
              whileInView={{ scale: 1 }}
              viewport={{ once: true }}
              transition={{ type: "spring", stiffness: 200, delay: 0.3 }}
              whileHover={{ rotate: 15, scale: 1.1 }}
            >
              <Leaf className="w-8 h-8 sm:w-10 sm:h-10 text-white" />
            </motion.div>
          </motion.div>
        </div>
      </div>
    </motion.section>
  )
}