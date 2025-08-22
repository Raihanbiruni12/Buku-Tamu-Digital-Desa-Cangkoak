import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MapPin, Phone, FileText, Calendar, Edit } from "lucide-react"
import type { Guest } from "../../app/admin/dashboard/page"

interface GuestDetailDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  guest: Guest | null
  onEdit: () => void
}

export default function GuestDetailDialog({ isOpen, onOpenChange, guest, onEdit }: GuestDetailDialogProps) {
  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-w-[90%] p-4 sm:p-6 rounded-xl bg-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-800">Detail Pengunjung</DialogTitle>
          <DialogDescription className="text-sm text-gray-600">Informasi lengkap pengunjung</DialogDescription>
        </DialogHeader>
        {guest && (
          <div className="space-y-4">
            <div className="bg-gradient-to-br from-gray-50 to-gray-100 p-4 rounded-lg border border-gray-200">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-2">
                <h3 className="font-semibold text-gray-900 text-base sm:text-lg">{guest.full_name}</h3>
              </div>
              <div className="space-y-3 text-sm sm:text-base">
                <div className="flex items-start gap-2">
                  <MapPin className="w-4 h-4 text-emerald-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{guest.address}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-teal-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{guest.phone || "Tidak diisi"}</span>
                </div>
                <div className="flex items-start gap-2">
                  <FileText className="w-4 h-4 text-violet-600 mt-0.5 flex-shrink-0" />
                  <span className="text-gray-700">{guest.purpose}</span>
                </div>
                <div className="flex items-start gap-2">
                  <Calendar className="w-4 h-4 text-amber-500 mt-0.5 flex-shrink-0" />
                  <div className="space-y-1">
                    <div>
                      <span className="text-gray-700">Tanggal Kunjungan: </span>
                      <span className="font-medium">
                        {new Date(guest.visit_date).toLocaleDateString("id-ID")}
                      </span>
                    </div>
                    <div>
                      <span className="text-gray-700">Waktu Input: </span>
                      <span className="font-medium">
                        {new Date(guest.created_at).toLocaleString("id-ID")}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row justify-between gap-2">
              <Button
                variant="outline"
                onClick={onEdit}
                className="w-full sm:w-auto border-teal-200 text-teal-700 hover:bg-teal-50 rounded-lg"
              >
                <Edit className="w-4 h-4 mr-2" />
                Edit Data
              </Button>
              <Button
                onClick={() => onOpenChange(false)}
                className="w-full sm:w-auto bg-emerald-600 hover:bg-emerald-700 text-white rounded-lg"
              >
                Tutup
              </Button>
            </div>
          </div>
        )}
      </DialogContent>
    </Dialog>
  )
}