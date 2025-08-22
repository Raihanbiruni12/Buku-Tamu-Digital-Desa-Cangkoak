import { Shield, Clock, MapPin, Phone, Mail, FileText, Zap, Users, BarChart3, History } from "lucide-react"
import { ComponentType } from "react"

export type FooterLink =
  | {
      text: string
      icon?: ComponentType<{ className?: string }>
    }
  | {
      text: string
      href: string
    }

export const villageStats = [
  { number: "6.225", label: "Penduduk", color: "teal" },
  { number: "173 ha", label: "Luas Wilayah", color: "lime" },
  { number: "30 RT / 7 RW", label: "Pembagian RT/RW", color: "emerald" },
];

export const features = [
  {
    icon: Shield,
    title: "Privasi Terlindungi",
    description:
      "Setiap data kunjungan diamankan dengan sistem enkripsi modern dan disimpan dengan backup otomatis.",
    color: "green",
    delay: 0,
  },
  {
    icon: History,
    title: "Data Kunjungan Lengkap",
    description:
      "Pantau semua jejak kunjungan tamu dalam satu dashboard yang rapi dan mudah dinavigasi.",
    color: "amber",
    delay: 0.1,
  },
  {
    icon: BarChart3,
    title: "Statistik Interaktif",
    description:
      "Tampilkan tren kunjungan dan insight data secara visual untuk bantu pengambilan keputusan desa.",
    color: "blue",
    delay: 0.2,
  },
  {
    icon: Users,
    title: "Kontrol Tamu Fleksibel",
    description:
      "Filter, cari, dan kelola data tamu dengan fitur lengkap yang memudahkan pengelolaan harian.",
    color: "green",
    delay: 0.3,
  },
  {
    icon: Zap,
    title: "Input Super Cepat",
    description:
      "Formulir dirancang intuitif dan responsif, membuat proses pendaftaran tamu jadi lebih singkat.",
    color: "amber",
    delay: 0.4,
  },
  {
    icon: FileText,
    title: "Ekspor & Backup Mudah",
    description:
      "Unduh data kunjungan ke format populer seperti Excel dan PDF untuk kebutuhan laporan atau dokumentasi.",
    color: "blue",
    delay: 0.5,
  },
]

export const footerData: { title: string; items: FooterLink[] }[] = [
  {
    title: "Kontak Kami",
    items: [
      { icon: MapPin, text: "Desa Cangkoak, Dukupuntang, Cirebon" },
      { icon: Phone, text: "085314377814" },
      { icon: Mail, text: "cangkoakdesa2023@gmail.com" },
    ],
  },
  {
    title: "Jam Kerja",
    items: [
      { icon: Clock, text: "Senin - Jumat: 08:00 - 15:30" },
      { text: "Sabtu - Minggu: Tutup" },
    ],
  },
  {
    title: "Link Cepat",
    items: [
      { text: "Isi Buku Tamu", href: "/guest-book" },
      { text: "Admin Login", href: "/login" },
    ],
  },
]