"use client"

import { useState } from "react"
import { Calendar, ChevronUp, ChevronDown, X } from "lucide-react" // Added X for close button
import { Button } from "@/components/ui/button" // Import shadcn Button

interface CalendarSelectionPopupProps {
  isOpen: boolean
  onClose: () => void
  onApply: (startDate: string, endDate: string) => void // Add onApply prop
}

export default function CalendarSelectionPopup({ isOpen, onClose, onApply }: CalendarSelectionPopupProps) {
  const [activeTab, setActiveTab] = useState<"day" | "hour" | "overnight">("day")
  const [selectedMonth, setSelectedMonth] = useState("Tháng 5, 2025")
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false) // Renamed to avoid conflict
  const months = [
    "Tháng 1, 2025",
    "Tháng 2, 2025",
    "Tháng 3, 2025",
    "Tháng 4, 2025",
    "Tháng 5, 2025",
    "Tháng 6, 2025",
    "Tháng 7, 2025",
    "Tháng 8, 2025",
    "Tháng 9, 2025",
    "Tháng 10, 2025",
    "Tháng 11, 2025",
    "Tháng 12, 2025",
  ]

  const handleApplyClick = () => {
    // In a real application, you would pass selected dates here.
    // For now, we'll just close the popup and simulate an apply.
    onApply("25/04", "27/04") // Example dates
    onClose()
  }

  const handleMonthSelect = (month: string) => {
    setSelectedMonth(month)
    setIsMonthDropdownOpen(false)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={onClose} />

      {/* Popup Content */}
      <div
        className={`relative w-full max-w-md bg-white rounded-t-3xl shadow-lg h-[90vh] flex flex-col transform transition-transform duration-300 ease-out
          ${isOpen ? "translate-y-0" : "translate-y-full"}`}
      >
        {/* Header */}
        <div className="w-full py-6 bg-[#0a0a0a] text-white flex items-center justify-center relative rounded-t-3xl">
          <h1 className="text-center text-xl font-semibold">Thời gian đặt phòng</h1>
          <Button
            variant="ghost"
            size="icon"
            className="absolute right-4 top-1/2 -translate-y-1/2 text-white hover:bg-white/10"
            onClick={onClose}
          >
            <X className="h-6 w-6" />
          </Button>
        </div>

        {/* Main Content */}
        <div className="flex-1 px-6 py-8 space-y-6 overflow-y-auto">
          {/* Booking Tabs */}
          <div className="flex rounded-full overflow-hidden border-2 border-[#0a0a0a] p-1 bg-[#0a0a0a] shadow-lg">
            <Button
              onClick={() => setActiveTab("day")}
              className={`flex-1 py-4 text-center rounded-full transition-all duration-300 font-semibold ${
                activeTab === "day"
                  ? "bg-white text-[#0a0a0a] shadow-md transform scale-105"
                  : "bg-[#0a0a0a] text-white hover:bg-gray-800"
              }`}
            >
              Theo ngày
            </Button>
            <Button
              onClick={() => setActiveTab("hour")}
              className={`flex-1 py-4 text-center rounded-full transition-all duration-300 font-semibold ${
                activeTab === "hour"
                  ? "bg-white text-[#0a0a0a] shadow-md transform scale-105"
                  : "bg-[#0a0a0a] text-white hover:bg-gray-800"
              }`}
            >
              Theo giờ
            </Button>
            <Button
              onClick={() => setActiveTab("overnight")}
              className={`flex-1 py-4 text-center rounded-full transition-all duration-300 font-semibold ${
                activeTab === "overnight"
                  ? "bg-white text-[#0a0a0a] shadow-md transform scale-105"
                  : "bg-[#0a0a0a] text-white hover:bg-gray-800"
              }`}
            >
              Qua đêm
            </Button>
          </div>

          {/* Month Selector */}
          <div className="relative">
            <Button
              onClick={() => setIsMonthDropdownOpen(!isMonthDropdownOpen)}
              className="w-full bg-gray-100 text-[#0a0a0a] rounded-2xl p-6 flex items-center justify-between shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105"
            >
              <div className="flex items-center">
                <Calendar className="w-6 h-6 mr-3" />
                <span className="text-lg font-semibold">{selectedMonth}</span>
              </div>
              <div className="flex flex-col">
                <ChevronUp
                  className={`w-5 h-5 transition-transform duration-300 ${isMonthDropdownOpen ? "rotate-180" : ""}`}
                />
                <ChevronDown
                  className={`w-5 h-5 transition-transform duration-300 ${isMonthDropdownOpen ? "rotate-180" : ""}`}
                />
              </div>
            </Button>

            {/* Month Dropdown */}
            {isMonthDropdownOpen && (
              <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-2xl shadow-2xl border border-gray-100 z-50 max-h-64 overflow-y-auto">
                {months.map((month, index) => (
                  <Button
                    key={index}
                    variant="ghost"
                    onClick={() => handleMonthSelect(month)}
                    className={`w-full text-left px-6 py-4 hover:bg-gray-50 transition-colors duration-200 ${
                      month === selectedMonth ? "bg-gray-100 text-[#0a0a0a] font-semibold" : "text-gray-700"
                    } ${index === 0 ? "rounded-t-2xl" : ""} ${index === months.length - 1 ? "rounded-b-2xl" : ""}`}
                  >
                    {month}
                  </Button>
                ))}
              </div>
            )}
          </div>

          {/* Apply Button */}
          <Button
            className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-6 rounded-2xl font-bold text-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 active:scale-95"
            onClick={handleApplyClick}
          >
            ÁP DỤNG
          </Button>
        </div>
      </div>
    </div>
  )
}
