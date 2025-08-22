"use client"

import { motion } from "framer-motion"

export function FloatingElements() {
  return (
    <div className="fixed inset-0 pointer-events-none z-10">
      <motion.div
        className="absolute top-20 left-10 w-3 h-3 sm:w-4 sm:h-4 bg-teal-300 rounded-full opacity-60"
        animate={{ y: [0, -20, 0], x: [0, 15, 0], scale: [1, 1.2, 1] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute top-40 right-10 w-4 h-4 sm:w-5 sm:h-5 bg-lime-300 rounded-full opacity-50"
        animate={{ y: [0, 25, 0], x: [0, -15, 0], scale: [1, 1.3, 1] }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute bottom-20 left-1/3 w-3 h-3 sm:w-4 sm:h-4 bg-emerald-300 rounded-full opacity-40"
        animate={{ y: [0, -25, 0], rotate: [0, 180, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
      <motion.div
        className="absolute bottom-40 right-1/4 w-2 h-2 sm:w-3 sm:h-3 bg-teal-200 rounded-full opacity-50"
        animate={{ y: [0, -15, 0], x: [0, 10, 0] }}
        transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 1.5 }}
      />
    </div>
  )
}