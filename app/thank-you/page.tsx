"use client"

import { Suspense } from "react"
import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { CheckCircle, Home, Printer, Leaf, MapPin, Calendar, Heart, User, FileText, Phone } from "lucide-react"
import Link from "next/link"
import { Header } from "@/components/landing/Header"
import { Footer } from "@/components/landing/Footer"
import { format, parse, isValid } from "date-fns"
import { id } from "date-fns/locale"

const confettiColors = ["#10b981", "#14b8a6", "#059669", "#047857", "#065f46"]

const Confetti = () => {
  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {Array.from({ length: 50 }).map((_, i) => (
        <motion.div
          key={i}
          className="absolute w-2 h-2 rounded-full"
          style={{
            backgroundColor: confettiColors[Math.floor(Math.random() * confettiColors.length)],
            left: `${Math.random() * 100}%`,
            top: `-10px`,
          }}
          initial={{ y: -10, opacity: 1, rotate: 0 }}
          animate={{
            y: window.innerHeight + 10,
            opacity: 0,
            rotate: 360,
            x: Math.random() * 200 - 100,
          }}
          transition={{
            duration: Math.random() * 3 + 2,
            delay: Math.random() * 2,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}

const ThankYouContent = () => {
  const [showConfetti, setShowConfetti] = useState(false)
  const searchParams = useSearchParams()

  const parseVisitDate = (dateStr: string | null) => {
    if (!dateStr) return "Tanggal tidak diisi"
    try {
      const parsedDate = parse(dateStr, "dd MMMM yyyy", new Date(), { locale: id })
      return isValid(parsedDate) ? format(parsedDate, "dd MMMM yyyy", { locale: id }) : "Tanggal tidak valid"
    } catch {
      return "Tanggal tidak valid"
    }
  }

  const guestData = {
    fullName: searchParams.get("fullName") || "Tamu",
    address: searchParams.get("address") || "Tidak diisi",
    phone: searchParams.get("phone") || null,
    visitDate: parseVisitDate(searchParams.get("visitDate")),
    purpose: searchParams.get("purpose") || "Tidak diisi",
  }

  useEffect(() => {
    setShowConfetti(true)
    const timer = setTimeout(() => setShowConfetti(false), 4000)
    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="min-h-screen bg-gradient-to-tr from-emerald-50 to-teal-50 relative overflow-hidden">
      {showConfetti && <Confetti />}
      <div className="fixed inset-0 pointer-events-none">
        <motion.div
          className="absolute top-20 left-10 w-4 h-4 bg-emerald-300 rounded-full opacity-60"
          animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <motion.div
          className="absolute top-40 right-20 w-6 h-6 bg-teal-300 rounded-full opacity-40"
          animate={{ y: [0, 15, 0], x: [0, -15, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        />
        <motion.div
          className="absolute bottom-40 left-1/4 w-3 h-3 bg-emerald-200 rounded-full opacity-50"
          animate={{ y: [0, -25, 0], rotate: [0, 180, 360] }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        />
        <motion.div
          className="absolute bottom-1/3 right-20 w-5 h-5 bg-teal-200 rounded-full opacity-30"
          animate={{ x: [0, 10, -10, 0], y: [0, -15, 5, 0] }}
          transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        />
      </div>

      <Header />
      <main>
        <section className="py-12 sm:py-16 lg:py-20 px-4 sm:px-6 lg:px-8">
          <div className="container mx-auto max-w-3xl text-center">
            <motion.div
              className="mb-8 sm:mb-12"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
            >
              <Card className="border-emerald-200 shadow-2xl bg-white/95 backdrop-blur-sm hover:shadow-3xl transition-all duration-500">
                <CardContent className="p-8 sm:p-12 lg:p-16">
                  <motion.div
                    className="w-24 h-24 sm:w-28 sm:h-28 lg:w-32 lg:h-32 bg-gradient-to-br from-emerald-100 to-teal-200 rounded-full flex items-center justify-center mx-auto mb-8 shadow-lg"
                    initial={{ scale: 0, rotate: -180 }}
                    animate={{ scale: 1, rotate: 0 }}
                    transition={{ type: "spring", stiffness: 200 }}
                    whileHover={{ scale: 1.1, rotate: 5 }}
                  >
                    <CheckCircle className="w-14 h-14 sm:w-16 sm:h-16 lg:w-20 lg:h-20 text-emerald-600" />
                  </motion.div>

                  <motion.h1
                    className="text-3xl sm:text-4xl lg:text-5xl font-bold text-emerald-900 mb-6 font-serif"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.5 }}
                  >
                    Terima Kasih, {guestData.fullName}!
                    <motion.span
                      className="inline-block ml-2"
                      animate={{ rotate: [0, 10, -10, 0] }}
                      transition={{ duration: 2, repeat: Infinity, delay: 2 }}
                    >
                      <Heart className="w-8 h-8 text-red-500" />
                    </motion.span>
                  </motion.h1>

                  <motion.p
                    className="text-base sm:text-lg lg:text-xl text-gray-600 mb-8 leading-relaxed"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.7 }}
                  >
                    Data kunjungan Anda telah berhasil tercatat dalam sistem buku tamu digital Desa Cangkoak.
                  </motion.p>

                  <motion.div
                    className="bg-gradient-to-r from-emerald-50 to-teal-50 border border-emerald-200 rounded-2xl p-6 sm:p-8 mb-10"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.6, delay: 0.9 }}
                    whileHover={{ scale: 1.02 }}
                  >
                    <div className="space-y-4 text-sm sm:text-base">
                      <div className="flex items-center gap-3 bg-white/50 p-3 rounded-lg">
                        <User className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-emerald-800 font-medium">Nama: {guestData.fullName}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white/50 p-3 rounded-lg">
                        <MapPin className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-emerald-800 font-medium">Alamat: {guestData.address}</span>
                      </div>
                      {guestData.phone && (
                        <div className="flex items-center gap-3 bg-white/50 p-3 rounded-lg">
                          <Phone className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                          <span className="text-emerald-800 font-medium">No. HP: {guestData.phone}</span>
                        </div>
                      )}
                      <div className="flex items-center gap-3 bg-white/50 p-3 rounded-lg">
                        <FileText className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-emerald-800 font-medium">Tujuan: {guestData.purpose}</span>
                      </div>
                      <div className="flex items-center gap-3 bg-white/50 p-3 rounded-lg">
                        <Calendar className="w-5 h-5 text-emerald-600 flex-shrink-0" />
                        <span className="text-emerald-800 font-medium text-wrap">Tanggal Kunjungan: {guestData.visitDate}</span>
                      </div>
                    </div>
                  </motion.div>

                  <motion.div
                    className="space-y-6"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 1.5 }}
                  >
                    <Link href="/" className="block">
                      <motion.div whileHover={{ scale: 1.05, y: -2 }} whileTap={{ scale: 0.95 }}>
                        <Button className="w-full bg-gradient-to-r from-emerald-600 to-teal-700 hover:from-emerald-700 hover:to-teal-800 text-white py-4 text-lg rounded-xl shadow-lg hover:shadow-xl transition-all duration-300 relative overflow-hidden">
                          <motion.div
                            className="absolute inset-0 bg-gradient-to-r from-white/0 via-white/20 to-white/0"
                            initial={{ x: "-100%" }}
                            whileHover={{ x: "100%" }}
                            transition={{ duration: 0.6 }}
                          />
                          <Home className="w-5 h-5 mr-2" />
                          Kembali ke Beranda
                        </Button>
                      </motion.div>
                    </Link>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        variant="outline"
                        className="w-full border-emerald-200 text-emerald-700 hover:bg-emerald-50 py-4 text-lg rounded-xl bg-white/80 backdrop-blur-sm hover:shadow-lg transition-all duration-300"
                        onClick={() => window.print()}
                      >
                        <Printer className="w-5 h-5 mr-2" />
                        Cetak Bukti Kunjungan
                      </Button>
                    </motion.div>
                  </motion.div>
                </CardContent>
              </Card>
            </motion.div>

            <motion.div
              className="mt-12 text-center space-y-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 1.8 }}
            >
              <motion.div
                className="bg-white/90 backdrop-blur-md border border-emerald-200 rounded-xl p-6 sm:p-8 max-w-2xl mx-auto shadow-md"
                whileHover={{ scale: 1.02, boxShadow: "0 8px 16px rgba(16, 185, 129, 0.15)" }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <motion.p
                  className="text-emerald-900 font-semibold text-base sm:text-lg flex items-center justify-center mb-3"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2 }}
                >
                  <motion.span
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 2, repeat: Infinity, delay: 3 }}
                  >
                    <Leaf className="w-6 h-6 mr-2 text-emerald-600" />
                  </motion.span>
                  Terima Kasih atas Kunjungan Anda ke Kantor Desa Cangkoak!
                </motion.p>
                <motion.p
                  className="text-emerald-800 text-sm sm:text-base leading-relaxed"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 2.2 }}
                >
                  Kami berharap dapat melayani kebutuhan administrasi atau kegiatan komunitas Anda dengan baik.
                </motion.p>
              </motion.div>

              <motion.p
                className="text-sm sm:text-base text-gray-600 font-medium"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 2.4 }}
              >
                Untuk informasi lebih lanjut, silakan hubungi staf Kantor Desa Cangkoak.
              </motion.p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  )
}

export default function ThankYouPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-screen bg-gradient-to-tr from-emerald-50 to-teal-50">Memuat...</div>}>
      <ThankYouContent />
    </Suspense>
  )
}