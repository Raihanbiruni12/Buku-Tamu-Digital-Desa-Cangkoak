"use client"

import { FloatingElements } from "@/components/landing/FloatingElements"
import { Header } from "@/components/landing/Header"
import { Hero } from "@/components/landing/Hero"
import { AboutSection } from "@/components/landing/AboutSection"
import { Features } from "@/components/landing/Features"
import { FAQSection } from "@/components/landing/FAQSection"
import { Footer } from "@/components/landing/Footer"

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-tr from-teal-50 to-emerald-50">
      <FloatingElements />
      <Header />
      <main>
        <Hero />
        <AboutSection />
        <Features />
        <FAQSection />
      </main>
      <Footer />
    </div>
  )
}