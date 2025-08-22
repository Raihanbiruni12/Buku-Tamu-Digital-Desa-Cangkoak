"use client"

import { useState, useMemo, useCallback } from "react"
import { motion } from "framer-motion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle, CardFooter } from "@/components/ui/card"
import { Eye, ChevronLeft, ChevronRight, Search } from "lucide-react"
import { Button } from "@/components/ui/button"
import GuestList from "./GuestList"
import GuestDetailDialog from "./GuestDetailDialog"
import GuestEditDialog from "./GuestEditDialog"
import FilterPopover from "./FilterPopover"
import ExportPopover from "./ExportPopover"
import { Input } from "@/components/ui/input"
import { debounce } from "lodash"
import type { Guest } from "../../app/admin/dashboard/page"

interface GuestTableProps {
  guestData: Guest[]
  setGuestData: (guests: Guest[]) => void
  loading: boolean
}

export default function GuestTable({ guestData, setGuestData, loading }: GuestTableProps) {
  const [searchTerm, setSearchTerm] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [filters, setFilters] = useState({ day: "all", month: "all", year: "all" })
  const [appliedFilters, setAppliedFilters] = useState({ day: "all", month: "all", year: "all" })
  const [isFilterOpen, setIsFilterOpen] = useState(false)
  const [selectedGuest, setSelectedGuest] = useState<Guest | null>(null)
  const [isDetailOpen, setIsDetailOpen] = useState(false)
  const [isEditOpen, setIsEditOpen] = useState(false)

  const itemsPerPage = 10

  const uniqueYears = useMemo(
    () => Array.from(new Set(guestData.map((guest) => new Date(guest.visit_date).getFullYear()))).sort((a, b) => b - a),
    [guestData],
  )

  const debouncedSetSearchTerm = useMemo(
    () =>
      debounce((value: string) => {
        setSearchTerm(value)
        setCurrentPage(1)
      }, 1000),
    [],
  )

  const handleSearchChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      debouncedSetSearchTerm(e.target.value)
    },
    [debouncedSetSearchTerm],
  )

  const filteredGuests = useMemo(() => {
    return guestData.filter((guest) => {
      const matchesSearch =
        guest.full_name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        guest.purpose.toLowerCase().includes(searchTerm.toLowerCase())

      const visitDate = new Date(guest.visit_date)
      const matchesDay = appliedFilters.day === "all" || visitDate.getDate().toString() === appliedFilters.day
      const matchesMonth = appliedFilters.month === "all" || (visitDate.getMonth() + 1).toString() === appliedFilters.month
      const matchesYear = appliedFilters.year === "all" || visitDate.getFullYear().toString() === appliedFilters.year

      return matchesSearch && matchesDay && matchesMonth && matchesYear
    })
  }, [guestData, searchTerm, appliedFilters])

  const totalPages = Math.ceil(filteredGuests.length / itemsPerPage)
  const indexOfLastItem = currentPage * itemsPerPage
  const indexOfFirstItem = indexOfLastItem - itemsPerPage
  const currentItems = filteredGuests.slice(indexOfFirstItem, indexOfLastItem)

  const handlePageChange = useCallback((pageNumber: number) => {
    setCurrentPage(pageNumber)
  }, [])

  const handleApplyFilters = useCallback(() => {
    setAppliedFilters(filters)
    setIsFilterOpen(false)
    setCurrentPage(1)
  }, [filters])

  if (loading) {
    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="space-y-4"
      >
        <div className="h-8 bg-gray-200 rounded animate-pulse" />
        <div className="h-64 bg-gray-200 rounded animate-pulse" />
      </motion.div>
    )
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="space-y-6"
    >
      <Card className="border-0 shadow-lg">
        <CardHeader className="bg-gradient-to-r from-emerald-50 to-teal-50 border-b border-emerald-100 p-6">
          <CardTitle className="text-emerald-800 flex items-center space-x-2">
            <Eye className="w-5 h-5" />
            <span>Data Pengunjung</span>
          </CardTitle>
          <CardDescription className="text-teal-700">Kelola dan pantau data pengunjung desa</CardDescription>
        </CardHeader>
        <CardContent className="p-6">
          <div className="flex flex-col sm:flex-row gap-4 mb-6">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <Input
                placeholder="Cari nama, alamat, atau tujuan..."
                onChange={handleSearchChange}
                className="pl-10 border-emerald-200 focus:ring-2 focus:ring-emerald-500 transition-all"
              />
            </div>
            <div className="flex gap-2">
              <FilterPopover
                isOpen={isFilterOpen}
                setIsOpen={setIsFilterOpen}
                filters={filters}
                setFilters={setFilters}
                uniqueYears={uniqueYears}
                onApply={handleApplyFilters}
              />
              <ExportPopover
                filteredGuests={filteredGuests}
                filters={appliedFilters}
                searchTerm={searchTerm}
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-6">
            <div className="bg-emerald-50 p-4 rounded-lg border border-emerald-100">
              <p className="text-2xl font-bold text-emerald-800">{filteredGuests.length}</p>
              <p className="text-sm text-emerald-700">Total Ditampilkan</p>
            </div>
            <div className="bg-teal-50 p-4 rounded-lg border border-teal-100">
              <p className="text-2xl font-bold text-teal-800">{guestData.length}</p>
              <p className="text-sm text-teal-700">Total Keseluruhan</p>
            </div>
            <div className="bg-slate-50 p-4 rounded-lg border border-slate-100">
              <p className="text-2xl font-bold text-slate-800">
                {guestData.filter((g) => g.visit_date === new Date().toISOString().split("T")[0]).length}
              </p>
              <p className="text-sm text-slate-600">Hari Ini</p>
            </div>
          </div>

          <GuestList
            guests={currentItems}
            onView={(guest) => {
              setSelectedGuest(guest)
              setIsDetailOpen(true)
            }}
            onEdit={(guest) => {
              setSelectedGuest(guest)
              setIsEditOpen(true)
            }}
            onDelete={(id) => setGuestData(guestData.filter((guest) => guest.id !== id))}
          />
        </CardContent>

        {filteredGuests.length > 0 && (
          <CardFooter className="flex items-center justify-between border-t border-gray-100 px-6 py-4">
            <div className="text-sm text-gray-500">
              Menampilkan {indexOfFirstItem + 1}-{Math.min(indexOfLastItem, filteredGuests.length)} dari{" "}
              {filteredGuests.length} data
            </div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage - 1)}
                disabled={currentPage === 1}
                className="h-8 w-8 p-0 flex items-center justify-center"
              >
                <ChevronLeft className="h-4 w-4" />
              </Button>
              {Array.from({ length: Math.min(5, totalPages) }, (_, i) => {
                let pageNum = currentPage
                if (totalPages <= 5) {
                  pageNum = i + 1
                } else if (currentPage <= 3) {
                  pageNum = i + 1
                } else if (currentPage >= totalPages - 2) {
                  pageNum = totalPages - 4 + i
                } else {
                  pageNum = currentPage - 2 + i
                }
                return (
                  <Button
                    key={i}
                    variant={currentPage === pageNum ? "default" : "outline"}
                    size="sm"
                    onClick={() => handlePageChange(pageNum)}
                    className={`h-8 w-8 p-0 ${currentPage === pageNum ? "bg-emerald-600 hover:bg-emerald-700" : ""}`}
                  >
                    {pageNum}
                  </Button>
                )
              })}
              <Button
                variant="outline"
                size="sm"
                onClick={() => handlePageChange(currentPage + 1)}
                disabled={currentPage === totalPages || totalPages === 0}
                className="h-8 w-8 p-0 flex items-center justify-center"
              >
                <ChevronRight className="h-4 w-4" />
              </Button>
            </div>
          </CardFooter>
        )}
      </Card>

      <GuestDetailDialog
        isOpen={isDetailOpen}
        onOpenChange={setIsDetailOpen}
        guest={selectedGuest}
        onEdit={() => {
          setIsDetailOpen(false)
          setIsEditOpen(true)
        }}
      />

      <GuestEditDialog
        isOpen={isEditOpen}
        onOpenChange={setIsEditOpen}
        guest={selectedGuest}
        onSuccess={(updatedGuest) => {
          setGuestData(
            guestData.map((g) => (g.id === updatedGuest.id ? { ...g, ...updatedGuest } : g)),
          )
        }}
      />
    </motion.div>
  )
}