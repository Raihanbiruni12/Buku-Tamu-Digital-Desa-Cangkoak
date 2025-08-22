import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Filter } from "lucide-react"
import { Badge } from "@/components/ui/badge"

interface FilterPopoverProps {
  isOpen: boolean
  setIsOpen: (open: boolean) => void
  filters: { day: string; month: string; year: string }
  setFilters: (filters: { day: string; month: string; year: string }) => void
  uniqueYears: number[]
  onApply: () => void
}

export default function FilterPopover({ isOpen, setIsOpen, filters, setFilters, uniqueYears, onApply }: FilterPopoverProps) {
  const resetFilters = () => {
    setFilters({ day: "all", month: "all", year: "all" })
    setIsOpen(false)
  }

  return (
    <Popover open={isOpen} onOpenChange={setIsOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          className="border-emerald-200 text-emerald-700 hover:bg-emerald-50 bg-transparent flex gap-2"
        >
          <Filter className="w-4 h-4" />
          Filter
          {Object.values(filters).some((v) => v !== "all") && (
            <Badge className="ml-1 bg-emerald-600 text-white h-5 w-5 flex items-center justify-center p-0 rounded-full">
              {Object.values(filters).filter((v) => v !== "all").length}
            </Badge>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-80 p-4">
        <div className="space-y-6">
          <h4 className="font-medium text-sm text-gray-700">Filter Data Pengunjung</h4>
          <div className="grid grid-cols-1 gap-4">
            <div className="space-y-2">
              <Label htmlFor="day" className="text-xs font-medium text-gray-600">Hari</Label>
              <Select value={filters.day} onValueChange={(value) => setFilters({ ...filters, day: value })}>
                <SelectTrigger id="day" className="h-9 text-sm border-gray-300 focus:ring-emerald-500">
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent className="border-gray-200">
                  <SelectItem value="all" className="text-sm">Semua</SelectItem>
                  {Array.from({ length: 31 }, (_, i) => i + 1).map((day) => (
                    <SelectItem key={day} value={day.toString()} className="text-sm">
                      {day}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="month" className="text-xs font-medium text-gray-600">Bulan</Label>
              <Select value={filters.month} onValueChange={(value) => setFilters({ ...filters, month: value })}>
                <SelectTrigger id="month" className="h-9 text-sm border-gray-300 focus:ring-emerald-500">
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent className="border-gray-200">
                  <SelectItem value="all" className="text-sm">Semua</SelectItem>
                  {[
                    "Januari", "Februari", "Maret", "April", "Mei", "Juni",
                    "Juli", "Agustus", "September", "Oktober", "November", "Desember"
                  ].map((month, index) => (
                    <SelectItem key={index + 1} value={(index + 1).toString()} className="text-sm">
                      {month}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="year" className="text-xs font-medium text-gray-600">Tahun</Label>
              <Select value={filters.year} onValueChange={(value) => setFilters({ ...filters, year: value })}>
                <SelectTrigger id="year" className="h-9 text-sm border-gray-300 focus:ring-emerald-500">
                  <SelectValue placeholder="Semua" />
                </SelectTrigger>
                <SelectContent className="border-gray-200">
                  <SelectItem value="all" className="text-sm">Semua</SelectItem>
                  {uniqueYears.map((year) => (
                    <SelectItem key={year} value={year.toString()} className="text-sm">
                      {year}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              size="sm"
              onClick={resetFilters}
              className="text-gray-500 border-gray-300 hover:bg-gray-50"
            >
              Reset
            </Button>
            <Button
              size="sm"
              onClick={onApply}
              className="bg-emerald-600 hover:bg-emerald-700 text-white"
            >
              Terapkan Filter
            </Button>
          </div>
        </div>
      </PopoverContent>
    </Popover>
  )
}