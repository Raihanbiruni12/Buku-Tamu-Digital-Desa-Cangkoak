import type { Metadata } from "next"
import { Geist, Geist_Mono } from "next/font/google"
import "./globals.css"
import { Toaster } from "@/components/ui/sonner"

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
})

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
})

export const metadata: Metadata = {
  title: "Buku Tamu Desa Cangkoak | Dukupuntang, Cirebon",
  description:
    "Website resmi Buku Tamu Digital Desa Cangkoak, Kecamatan Dukupuntang, Kabupaten Cirebon. Catat kunjunganmu secara digital dengan mudah dan aman.",
  keywords: [
    "buku tamu desa",
    "cangkoak",
    "dukupuntang",
    "cirebon",
    "buku tamu digital",
    "buku tamu online",
    "desa digital",
    "kunjungan desa",
  ],
  authors: [{ name: "Tim Pengembang Desa Cangkoak" }],
  creator: "Tim Pengembang Desa Cangkoak",
  metadataBase: new URL("https://guest-book-cangkoak.vercel.app/"),
  openGraph: {
    title: "Buku Tamu Digital Desa Cangkoak",
    description:
      "Catat kunjungan secara digital di Desa Cangkoak, Dukupuntang, Cirebon. Praktis dan efisien.",
    url: "https://guest-book-cangkoak.vercel.app/",
    siteName: "Buku Tamu Desa Cangkoak",
    locale: "id_ID",
    type: "website",
    images: [
      {
        url: "/logo.png",
        width: 1200,
        height: 630,
        alt: "Buku Tamu Digital Desa Cangkoak",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Buku Tamu Digital Desa Cangkoak",
    description:
      "Website resmi untuk pencatatan kunjungan di Desa Cangkoak, Dukupuntang, Cirebon.",
    images: ["/logo.png"],
    creator: "@timdesacangkoak",
  },
  icons: {
    icon: "/favicon.ico",
  },
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="id">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}