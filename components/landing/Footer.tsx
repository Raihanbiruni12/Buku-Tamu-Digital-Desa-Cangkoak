"use client"

import { motion } from "framer-motion"
import Link from "next/link"
import Image from "next/image"
import { staggerContainer, fadeIn } from "@/lib/animations"
import { footerData } from "@/lib/data"

export function Footer() {
  return (
    <motion.footer
      className="bg-gradient-to-bl from-teal-900 to-emerald-900 text-white py-10 sm:py-12 px-4 sm:px-6 lg:px-8"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.7 }}
    >
      <div className="container mx-auto">
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <motion.div variants={fadeIn}>
            <div className="flex items-center space-x-3 sm:space-x-4 mb-4 sm:mb-5">
              <Link href="/">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-white rounded-lg flex items-center justify-center shadow-md overflow-hidden">
                  <Image
                    src="/logo.webp"
                    alt="Logo Desa Cangkoak"
                    width={48}
                    height={48}
                    className="object-contain w-6 h-6 sm:w-8 sm:h-8"
                  />
                </div>
              </Link>
              <div>
                <h3 className="text-xl sm:text-2xl font-bold font-serif">Buku Tamu Digital</h3>
                <p className="text-teal-200 text-sm sm:text-base">Desa Cangkoak</p>
              </div>
            </div>
            <p className="text-teal-200 text-sm sm:text-base leading-relaxed">
              Solusi digital inovatif untuk administrasi desa Cangkoak, Dukupuntang, Cirebon.
            </p>
          </motion.div>
          {footerData.map((section, index) => (
            <motion.div key={index} variants={fadeIn}>
              <h4 className="text-lg sm:text-xl font-semibold mb-3 sm:mb-4 font-serif">{section.title}</h4>
              <div className="space-y-2 sm:space-y-3">
                {section.items.map((item, itemIndex) => (
                  <motion.div
                    key={itemIndex}
                    initial={{ opacity: 0, x: -10 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: itemIndex * 0.1 }}
                  >
                    {"href" in item ? (
                      <Link
                        href={item.href}
                        className="block text-teal-200 hover:text-white hover:underline text-sm sm:text-base"
                      >
                        {item.text}
                      </Link>
                    ) : (
                      <div className="text-teal-200 text-sm sm:text-base flex items-start">
                        {item.icon && <item.icon className="w-4 h-4 sm:w-5 sm:h-5 mr-2 mt-0.5 flex-shrink-0" />}
                        <span>{item.text}</span>
                      </div>
                    )}
                  </motion.div>
                ))}
              </div>
            </motion.div>
          ))}
        </motion.div>
        <motion.div
          className="border-t border-teal-800 mt-8 pt-5 text-center"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.3 }}
        >
          <p className="text-teal-200 text-xs sm:text-sm">
            &copy; {new Date().getFullYear()} Buku Tamu Digital Desa Cangkoak. All rights reserved.
          </p>
        </motion.div>
      </div>
    </motion.footer>
  )
}