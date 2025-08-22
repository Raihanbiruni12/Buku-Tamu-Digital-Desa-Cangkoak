"use client"

import { useState, useEffect } from "react"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { z } from "zod"
import { useForm, useWatch, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { toast } from "sonner"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { Calendar } from "lucide-react"
import { format, parse, isValid, startOfDay } from "date-fns"
import { id } from "date-fns/locale"
import { cn } from "@/lib/utils"
import type { Guest } from "../../app/admin/dashboard/page"

const guestSchema = z.object({
  fullName: z.string().min(2, "Nama lengkap minimal 2 karakter"),
  address: z.string().min(5, "Alamat minimal 5 karakter"),
  phone: z.string().optional(),
  visitDate: z.date().refine(isValid, { message: "Tanggal kunjungan tidak valid" }),
  purpose: z.string().min(5, "Tujuan kunjungan minimal 5 karakter"),
})

type GuestFormData = z.infer<typeof guestSchema>

interface GuestEditDialogProps {
  isOpen: boolean
  onOpenChange: (open: boolean) => void
  guest: Guest | null
  onSuccess: (updatedGuest: Guest) => void
}

export default function GuestEditDialog({ isOpen, onOpenChange, guest, onSuccess }: GuestEditDialogProps) {
  const [originalData, setOriginalData] = useState<Guest | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  const { register, handleSubmit, reset, control, formState: { errors } } = useForm<GuestFormData>({
    resolver: zodResolver(guestSchema),
  })

  const watchedValues = useWatch({ control })

  const parseVisitDate = (dateString: string): Date => {
    const formats = [
      "dd MMMM yyyy", 
      "yyyy-MM-dd",   
      "dd/MM/yyyy",   
    ]
    
    for (const formatStr of formats) {
      const parsed = parse(dateString, formatStr, new Date(), { locale: id })
      if (isValid(parsed)) {
        return startOfDay(parsed)
      }
    }
    
    const nativeDate = new Date(dateString)
    return isValid(nativeDate) ? startOfDay(nativeDate) : startOfDay(new Date())
  }

  useEffect(() => {
    if (!guest) return

    setOriginalData(guest)
    
    const formData: GuestFormData = {
      fullName: guest.full_name,
      address: guest.address,
      phone: guest.phone || "",
      visitDate: guest.visit_date ? parseVisitDate(guest.visit_date) : startOfDay(new Date()),
      purpose: guest.purpose,
    }

    reset(formData)
  }, [guest, reset])

  const hasChanges = (): boolean => {
    if (!originalData || !watchedValues) return false

    const originalVisitDate = originalData.visit_date 
      ? parseVisitDate(originalData.visit_date)
      : null

    return (
      watchedValues.fullName !== originalData.full_name ||
      watchedValues.address !== originalData.address ||
      watchedValues.phone !== (originalData.phone || '') ||
      watchedValues.purpose !== originalData.purpose ||
      (watchedValues.visitDate && originalVisitDate
        ? format(watchedValues.visitDate, "yyyy-MM-dd") !== format(originalVisitDate, "yyyy-MM-dd")
        : watchedValues.visitDate !== originalVisitDate)
    )
  }

  const onSubmit = async (data: GuestFormData) => {
    if (!guest || !originalData) return

    setIsSubmitting(true)
    
    try {
      const response = await fetch('/api/guests', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          id: guest.id,
          fullName: data.fullName,
          address: data.address,
          phone: data.phone || '',
          purpose: data.purpose,
          visitDate: format(data.visitDate, "yyyy-MM-dd"),
        }),
      })

      if (!response.ok) {
        const errorData = await response.json()
        throw new Error(errorData.error || 'Gagal memperbarui data')
      }

      const updatedGuest: Guest = {
        ...guest,
        full_name: data.fullName,
        address: data.address,
        phone: data.phone || null,
        purpose: data.purpose,
        visit_date: format(data.visitDate, "yyyy-MM-dd"),
      }

      onSuccess(updatedGuest)
      onOpenChange(false)
      toast.success("Data berhasil diubah")
    } catch (error) {
      console.error('Update error:', error)
      toast.error(error instanceof Error ? error.message : "Terjadi kesalahan saat memperbarui data")
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleCancel = () => {
    if (hasChanges()) {
      const confirmDiscard = window.confirm("Ada perubahan yang belum disimpan. Yakin ingin membatalkan?")
      if (!confirmDiscard) return
    }
    onOpenChange(false)
  }

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-md max-w-[90%] p-4 sm:p-6 rounded-xl bg-white shadow-2xl">
        <DialogHeader>
          <DialogTitle className="text-lg sm:text-xl font-semibold text-gray-800">
            Edit Data Pengunjung
          </DialogTitle>
          <DialogDescription className="text-sm text-gray-600">
            Ubah informasi pengunjung
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="fullName" className="text-sm font-medium text-gray-700">
              Nama Lengkap
            </Label>
            <Input
              id="fullName"
              {...register("fullName")}
              className={cn(
                "w-full border-gray-300 focus:ring-emerald-500 focus:border-emerald-500",
                errors.fullName && "border-red-500"
              )}
              placeholder="Masukkan nama lengkap"
            />
            {errors.fullName && (
              <p className="text-xs text-red-600">{errors.fullName.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="address" className="text-sm font-medium text-gray-700">
              Alamat
            </Label>
            <Input
              id="address"
              {...register("address")}
              className={cn(
                "w-full border-gray-300 focus:ring-emerald-500 focus:border-emerald-500",
                errors.address && "border-red-500"
              )}
              placeholder="Masukkan alamat lengkap"
            />
            {errors.address && (
              <p className="text-xs text-red-600">{errors.address.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
              No HP (Opsional)
            </Label>
            <Input
              id="phone"
              {...register("phone")}
              className={cn(
                "w-full border-gray-300 focus:ring-emerald-500 focus:border-emerald-500",
                errors.phone && "border-red-500"
              )}
              placeholder="Masukkan nomor HP"
            />
            {errors.phone && (
              <p className="text-xs text-red-600">{errors.phone.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="visitDate" className="text-sm font-medium text-gray-700">
              Tanggal Kunjungan
            </Label>
            <Controller
              control={control}
              name="visitDate"
              render={({ field }) => (
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      type="button"
                      variant="outline"
                      className={cn(
                        "w-full justify-start text-left font-normal border-gray-300 focus:ring-emerald-500 focus:border-emerald-500 h-10",
                        !field.value && "text-gray-500",
                        errors.visitDate && "border-red-500"
                      )}
                    >
                      <Calendar className="mr-2 h-4 w-4 text-gray-700" />
                      {field.value ? (
                        format(field.value, "dd MMMM yyyy", { locale: id })
                      ) : (
                        <span>Pilih tanggal</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent
                      mode="single"
                      selected={field.value}
                      onSelect={(date) => {
                        if (date && isValid(date)) {
                          field.onChange(startOfDay(date))
                        }
                      }}
                      initialFocus
                      className="bg-white border-gray-300 rounded-xl"
                      locale={id}
                      defaultMonth={field.value}
                    />
                  </PopoverContent>
                </Popover>
              )}
            />
            {errors.visitDate && (
              <p className="text-xs text-red-600">{errors.visitDate.message}</p>
            )}
          </div>

          <div className="space-y-2">
            <Label htmlFor="purpose" className="text-sm font-medium text-gray-700">
              Tujuan Kunjungan
            </Label>
            <Input
              id="purpose"
              {...register("purpose")}
              className={cn(
                "w-full border-gray-300 focus:ring-emerald-500 focus:border-emerald-500",
                errors.purpose && "border-red-500"
              )}
              placeholder="Masukkan tujuan kunjungan"
            />
            {errors.purpose && (
              <p className="text-xs text-red-600">{errors.purpose.message}</p>
            )}
          </div>

          <DialogFooter className="flex justify-end gap-2 pt-4">
            <Button
              type="button"
              variant="outline"
              onClick={handleCancel}
              disabled={isSubmitting}
              className="border-gray-300 text-gray-700 hover:bg-gray-50 disabled:opacity-50"
            >
              Batal
            </Button>
            <Button
              type="submit"
              disabled={!hasChanges() || isSubmitting}
              className={cn(
                "bg-emerald-600 hover:bg-emerald-700 text-white",
                "disabled:bg-gray-400 disabled:cursor-not-allowed disabled:opacity-50"
              )}
            >
              {isSubmitting ? "Menyimpan..." : "Simpan Perubahan"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  )
}