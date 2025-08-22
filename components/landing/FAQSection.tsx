"use client"

import { motion } from "framer-motion"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { staggerContainer, fadeIn } from "@/lib/animations"

const faqs = [
  { question: "Apa itu Buku Tamu Digital?", answer: "Buku Tamu Digital adalah sistem online untuk mencatat data kunjungan ke Desa Cangkoak. Tak perlu nulis manual—semua jadi lebih cepat, rapi, dan ramah lingkungan." },
  { question: "Gimana cara akses sistemnya?", answer: "Anda bisa buka langsung lewat website resmi Desa Cangkoak. Untuk tamu, tinggal isi data kunjungan. Kalau Anda admin, ada halaman login khusus untuk mengelola data." },
  { question: "Apakah data saya aman di sini?", answer: "Tenang, semua data disimpan dengan enkripsi dan backup berkala. Privasi dan keamanan jadi prioritas utama kami." },
  { question: "Siapa aja yang bisa pakai Buku Tamu Digital?", answer: "Semua tamu atau warga yang datang ke kantor desa bisa pakai sistem ini. Admin desa juga punya akses khusus buat memantau dan mengelola data kunjungan." }
]

export function FAQSection() {
  return (
    <motion.section
      className="py-16 sm:py-20 lg:py-24 px-4 sm:px-6 lg:px-8 bg-gradient-to-br from-teal-50 to-emerald-100"
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
    >
      <div className="container mx-auto">
        <motion.h2
          className="text-3xl sm:text-4xl font-bold text-teal-900 mb-8 sm:mb-12 text-center font-serif"
          variants={fadeIn}
        >
          Pertanyaan Umum
        </motion.h2>
        <motion.div
          className="max-w-xl sm:max-w-2xl mx-auto"
          variants={staggerContainer}
          initial="initial"
          whileInView="animate"
          viewport={{ once: true }}
        >
          <Accordion type="single" collapsible className="space-y-3 sm:space-y-4">
            {faqs.map((faq, index) => (
              <motion.div key={index} variants={fadeIn}>
                <AccordionItem value={`item-${index}`} className="bg-white/90 border border-teal-200 rounded-xl shadow-sm hover:shadow-md transition-all duration-300">
                  <AccordionTrigger className="text-left px-4 sm:px-6 py-3 sm:py-4 text-base sm:text-lg font-semibold text-teal-900 hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="px-4 sm:px-6 pb-3 sm:pb-4 text-gray-700 text-sm sm:text-base">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              </motion.div>
            ))}
          </Accordion>
        </motion.div>
      </div>
    </motion.section>
  )
}