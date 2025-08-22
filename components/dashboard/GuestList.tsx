"use client"

import { motion } from "framer-motion"
import { Eye, Edit, Trash2 } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { MapPin, Phone, Calendar } from "lucide-react"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { toast } from "sonner"
import type { Guest } from "../../app/admin/dashboard/page"

interface GuestListProps {
  guests: Guest[]
  onView: (guest: Guest) => void
  onEdit: (guest: Guest) => void
  onDelete: (id: string) => void
}

export default function GuestList({ guests, onView, onEdit, onDelete }: GuestListProps) {
  const handleDelete = async (id: string) => {
    try {
      const response = await fetch('/api/guests', {
        method: 'DELETE',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ id }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Gagal menghapus data')
      }

      onDelete(id)
      toast.success("Data pengunjung berhasil dihapus")
    } catch (error) {
      console.error('Delete error:', error)
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan saat menghapus data")
    }
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className="w-full"
    >
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-emerald-50">
              <TableHead className="text-emerald-800 font-semibold">Nama</TableHead>
              <TableHead className="text-emerald-800 font-semibold">Alamat</TableHead>
              <TableHead className="text-emerald-800 font-semibold">Telepon</TableHead>
              <TableHead className="text-emerald-800 font-semibold">Tujuan</TableHead>
              <TableHead className="text-emerald-800 font-semibold">Tanggal Kunjungan</TableHead>
              <TableHead className="text-emerald-800 font-semibold text-center">Aksi</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {guests.length > 0 ? (
              guests.map((guest) => (
                <TableRow
                  key={guest.id}
                  className="hover:bg-emerald-50 transition-colors duration-200"
                >
                  <TableCell className="font-medium text-gray-900">{guest.full_name}</TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex items-center space-x-1">
                      <MapPin className="w-3 h-3 text-emerald-600" />
                      <span>{guest.address}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    {guest.phone ? (
                      <div className="flex items-center space-x-1">
                        <Phone className="w-3 h-3 text-emerald-600" />
                        <span>{guest.phone}</span>
                      </div>
                    ) : (
                      "-"
                    )}
                  </TableCell>
                  <TableCell className="text-gray-600">
                    <Badge className="bg-emerald-100 text-emerald-800 hover:bg-emerald-100">
                      {guest.purpose.length > 30 ? guest.purpose.substring(0, 30) + "..." : guest.purpose}
                    </Badge>
                  </TableCell>
                  <TableCell className="text-gray-600">
                    <div className="flex items-center space-x-1">
                      <Calendar className="w-3 h-3 text-emerald-600" />
                      <span>{new Date(guest.visit_date).toLocaleDateString("id-ID")}</span>
                    </div>
                  </TableCell>
                  <TableCell className="text-center">
                    <div className="flex justify-center space-x-2">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onView(guest)}
                        className="border-emerald-200 text-emerald-700 hover:bg-emerald-50"
                      >
                        <Eye className="w-4 h-4" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => onEdit(guest)}
                        className="border-teal-200 text-teal-700 hover:bg-teal-50"
                      >
                        <Edit className="w-4 h-4" />
                      </Button>
                      <AlertDialog>
                        <AlertDialogTrigger asChild>
                          <Button
                            variant="outline"
                            size="sm"
                            className="border-red-200 text-red-700 hover:bg-red-50"
                          >
                            <Trash2 className="w-4 h-4" />
                          </Button>
                        </AlertDialogTrigger>
                        <AlertDialogContent>
                          <AlertDialogHeader>
                            <AlertDialogTitle>Hapus Data Pengunjung</AlertDialogTitle>
                            <AlertDialogDescription>
                              Apakah Anda yakin ingin menghapus data pengunjung {guest.full_name}? Tindakan ini
                              tidak dapat dibatalkan.
                            </AlertDialogDescription>
                          </AlertDialogHeader>
                          <AlertDialogFooter>
                            <AlertDialogCancel>Batal</AlertDialogCancel>
                            <AlertDialogAction
                              onClick={() => handleDelete(guest.id)}
                              className="bg-red-600 hover:bg-red-700"
                            >
                              Hapus
                            </AlertDialogAction>
                          </AlertDialogFooter>
                        </AlertDialogContent>
                      </AlertDialog>
                    </div>
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={6} className="text-center py-12">
                  <Eye className="w-12 h-12 mx-auto mb-4 text-gray-300" />
                  <p className="text-gray-500">Tidak ada data pengunjung yang ditemukan</p>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </motion.div>
  )
}