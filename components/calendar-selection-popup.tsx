"use client"

import { useState, useMemo, useCallback } from "react"
import { Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { vi } from "date-fns/locale" // For Vietnamese locale

interface CalendarSelectionPopupProps {
  isOpen: boolean
  onClose: () => void
  onApply: (startDate: Date | null, endDate: Date | null) => void
  initialStartDate?: Date | null
  initialEndDate?: Date | null
}

// Helper to get days in a month
const getDaysInMonth = (year: number, month: number) => {
  const date = new Date(year, month, 1)
  const days = []
  while (date.getMonth() === month) {
    days.push(new Date(date))
    date.setDate(date.getDate() + 1)
  }
  return days
}

// Helper to get price category
const getPriceCategory = (price: number) => {
  if (price <= 300000) return "low" // Example threshold
  if (price <= 500000) return "medium" // Example threshold
  return "high"
}

// Mock data for prices (replace with actual data fetching in a real app)
const mockPrices: { [key: string]: number } = {
  "2025-05-01": 400000,
  "2025-05-02": 400000,
  "2025-05-03": 650000,
  "2025-05-04": 500000,
  "2025-05-05": 400000,
  "2025-05-06": 275000,
  "2025-05-07": 375000,
  "2025-05-08": 300000,
  "2025-05-09": 400000,
  "2025-05-10": 650000,
  "2025-05-11": 500000,
  "2025-05-12": 400000,
  "2025-05-13": 275000,
  "2025-05-14": 375000,
  "2025-05-15": 300000,
  "2025-05-16": 400000,
  "2025-05-17": 650000,
  "2025-05-18": 500000,
  "2025-05-19": 400000,
  "2025-05-20": 275000,
  "2025-05-21": 375000,
  "2025-05-22": 300000,
  "2025-05-23": 400000,
  "2025-05-24": 650000,
  "2025-05-25": 500000,
  "2025-05-26": 400000,
  "2025-05-27": 400000,
  "2025-05-28": 400000,
  "2025-05-29": 400000,
  "2025-05-30": 400000,
  "2025-05-31": 650000,
  "2025-06-01": 500000,
  "2025-06-02": 400000,
  "2025-06-03": 400000,
  "2025-06-04": 400000,
  "2025-06-05": 400000,
  "2025-06-06": 400000,
  "2025-06-07": 650000,
}

export default function CalendarSelectionPopup({
  isOpen,
  onClose,
  onApply,
  initialStartDate = null,
  initialEndDate = null,
}: CalendarSelectionPopupProps) {
  const [activeTab, setActiveTab] = useState<"day" | "hour" | "overnight">("day")
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialStartDate)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialEndDate)
  const [isMonthDropdownOpen, setIsMonthDropdownOpen] = useState(false)

  const today = new Date()
  const currentMonth = today.getMonth()
  const currentYear = today.getFullYear()

  const monthsToDisplay = useMemo(() => {
    const months = []
    for (let i = 0; i < 6; i++) {
      // Display current month + next 5 months
      const date = new Date(currentYear, currentMonth + i, 1)
      months.push(date)
    }
    return months
  }, [currentMonth, currentYear])

  const handleDateClick = useCallback(
    (date: Date) => {
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        // If no start date or both are selected, start a new selection
        setSelectedStartDate(date)
        setSelectedEndDate(null)
      } else if (date < selectedStartDate) {
        // If clicked date is before start date, make it the new start date
        setSelectedStartDate(date)
        setSelectedEndDate(null) // Clear end date to allow new range selection
      } else {
        // If clicked date is after start date, set it as end date
        setSelectedEndDate(date)
      }
    },
    [selectedStartDate, selectedEndDate],
  )

  const isDateSelected = useCallback(
    (date: Date) => {
      if (!selectedStartDate) return false
      if (selectedStartDate && !selectedEndDate) {
        return format(date, "yyyy-MM-dd") === format(selectedStartDate, "yyyy-MM-dd")
      }
      if (selectedStartDate && selectedEndDate) {
        return date >= selectedStartDate && date <= selectedEndDate
      }
      return false
    },
    [selectedStartDate, selectedEndDate],
  )

  const isDateRangeStart = useCallback(
    (date: Date) => {
      return selectedStartDate && format(date, "yyyy-MM-dd") === format(selectedStartDate, "yyyy-MM-dd")
    },
    [selectedStartDate],
  )

  const isDateRangeEnd = useCallback(
    (date: Date) => {
      return selectedEndDate && format(date, "yyyy-MM-dd") === format(selectedEndDate, "yyyy-MM-dd")
    },
    [selectedEndDate],
  )

  const getDayClasses = useCallback(
    (date: Date, price: number | undefined) => {
      const isToday = format(date, "yyyy-MM-dd") === format(today, "yyyy-MM-dd")
      const isPastDate = date < today && !isToday // Disable past dates
      const isSelected = isDateSelected(date)
      const isStart = isDateRangeStart(date)
      const isEnd = isDateRangeEnd(date)

      let bgColor = "bg-white"
      let textColor = "text-[#0a0a0a]"
      let borderColor = "border-gray-200"

      if (isPastDate) {
        bgColor = "bg-gray-100"
        textColor = "text-gray-400"
        borderColor = "border-gray-100"
      } else if (isSelected) {
        bgColor = "bg-[#a3dce8]" // Light blue for selected range
        textColor = "text-[#0a0a0a]"
        borderColor = "border-[#a3dce8]"
      } else if (price !== undefined) {
        const category = getPriceCategory(price)
        if (category === "low")
          bgColor = "bg-[#a2e5b3]" // Light green
        else if (category === "medium")
          bgColor = "bg-[#fff2d7]" // Light orange/yellow
        else if (category === "high") bgColor = "bg-[#ff8b77]" // Light red/orange
      }

      return `relative flex flex-col items-center justify-center p-1 rounded-lg aspect-square text-center cursor-pointer transition-colors duration-200
              ${bgColor} ${textColor} ${borderColor} border
              ${isPastDate ? "opacity-50 cursor-not-allowed" : "hover:bg-gray-100"}
              ${isStart ? "rounded-r-none" : ""}
              ${isEnd ? "rounded-l-none" : ""}
              ${isStart && isEnd ? "rounded-lg" : ""}
              ${isSelected && !isStart && !isEnd ? "rounded-none" : ""}
              `
    },
    [isDateSelected, isDateRangeStart, isDateRangeEnd, today],
  )

  const getDayPrice = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    return mockPrices[dateKey]
  }

  const selectedRangeText = useMemo(() => {
    if (selectedStartDate && selectedEndDate) {
      const startDay = format(selectedStartDate, "dd", { locale: vi })
      const startWeekday = format(selectedStartDate, "EEEE", { locale: vi }).split(",")[0]
      const startMonth = format(selectedStartDate, "MMMM", { locale: vi })

      const endDay = format(selectedEndDate, "dd", { locale: vi })
      const endWeekday = format(selectedEndDate, "EEEE", { locale: vi }).split(",")[0]
      const endMonth = format(selectedEndDate, "MMMM", { locale: vi })

      const diffTime = Math.abs(selectedEndDate.getTime() - selectedStartDate.getTime())
      const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)) + 1 // +1 to include both start and end day

      return (
        <div className="flex items-center justify-between w-full">
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{startDay}</span>
            <span className="text-sm">{startWeekday}</span>
            <span className="text-sm capitalize">{startMonth}</span>
          </div>
          <span className="text-base text-[#0a0a0a] font-medium">({diffDays} ngày)</span>
          <div className="flex flex-col items-center">
            <span className="text-3xl font-bold">{endDay}</span>
            <span className="text-sm">{endWeekday}</span>
            <span className="text-sm capitalize">{endMonth}</span>
          </div>
        </div>
      )
    } else if (selectedStartDate) {
      const startDay = format(selectedStartDate, "dd", { locale: vi })
      const startWeekday = format(selectedStartDate, "EEEE", { locale: vi }).split(",")[0]
      const startMonth = format(selectedStartDate, "MMMM", { locale: vi })
      return (
        <div className="flex flex-col items-center w-full">
          <span className="text-3xl font-bold">{startDay}</span>
          <span className="text-sm">{startWeekday}</span>
          <span className="text-sm capitalize">{startMonth}</span>
        </div>
      )
    }
    return <div className="text-center text-gray-500">Chọn ngày bắt đầu và kết thúc</div>
  }, [selectedStartDate, selectedEndDate])

  const handleApplyClick = () => {
    onApply(selectedStartDate, selectedEndDate)
    onClose()
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
        <div className="flex-1 px-6 py-8 space-y-6 flex flex-col">
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

          {/* Selected Date Display */}
          <div className="bg-[#a3dce8] rounded-2xl p-4 flex items-center justify-center text-[#0a0a0a] font-semibold shadow-md">
            {selectedRangeText}
          </div>

          {/* Calendar View */}
          <div className="flex-1 overflow-y-auto space-y-6 pb-4">
            {monthsToDisplay.map((monthDate, monthIndex) => {
              const year = monthDate.getFullYear()
              const month = monthDate.getMonth()
              const daysInMonth = getDaysInMonth(year, month)
              const firstDayOfMonth = new Date(year, month, 1).getDay() // 0 for Sunday, 1 for Monday...

              // Create an array with empty slots for leading blank days
              const calendarDays = Array(firstDayOfMonth).fill(null).concat(daysInMonth)

              return (
                <div key={monthIndex} className="border border-gray-200 rounded-2xl p-4 bg-white shadow-sm">
                  <div className="flex items-center gap-2 mb-4">
                    <Calendar className="h-5 w-5 text-[#0a0a0a]" />
                    <h3 className="text-lg font-semibold text-[#0a0a0a]">
                      {format(monthDate, "MMMM, yyyy", { locale: vi })}
                    </h3>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-sm font-medium text-gray-500 mb-2">
                    <div className="text-center">CN</div>
                    <div className="text-center">Th.2</div>
                    <div className="text-center">Th.3</div>
                    <div className="text-center">Th.4</div>
                    <div className="text-center">Th.5</div>
                    <div className="text-center">Th.6</div>
                    <div className="text-center">Th.7</div>
                  </div>
                  <div className="grid grid-cols-7 gap-2">
                    {calendarDays.map((day, dayIndex) => {
                      if (!day) {
                        return <div key={`empty-${dayIndex}`} className="aspect-square" />
                      }
                      const price = getDayPrice(day)
                      const formattedPrice = price ? `${(price / 1000).toLocaleString()}k` : ""
                      const isPastDate = day < today && format(day, "yyyy-MM-dd") !== format(today, "yyyy-MM-dd")

                      return (
                        <div
                          key={dayIndex}
                          className={getDayClasses(day, price)}
                          onClick={() => !isPastDate && handleDateClick(day)}
                          aria-disabled={isPastDate}
                        >
                          <span className="font-semibold text-base">{format(day, "dd")}</span>
                          {price !== undefined && <span className="text-xs font-medium mt-0.5">{formattedPrice}</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Price Legend */}
            <div className="flex justify-around gap-4 text-sm text-[#0a0a0a] font-medium mt-4">
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-[#a2e5b3]" />
                <span>Giá thấp</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-[#fff2d7]" />
                <span>Giá trung bình</span>
              </div>
              <div className="flex items-center gap-2">
                <div className="w-4 h-4 rounded-sm bg-[#ff8b77]" />
                <span>Giá cao</span>
              </div>
            </div>
          </div>

          {/* Bottom Summary and Apply Button */}
          <div className="flex items-center justify-between pt-4 border-t border-gray-100">
            <div>
              <div className="text-lg font-semibold text-[#0a0a0a]">Hiển thị 308 kết quả</div>
              <div className="text-xs text-[#999999]">Giá trên lịch hiển thị theo đơn vị VND</div>
            </div>
            <Button
              className="bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 px-8 rounded-lg font-bold text-lg"
              onClick={handleApplyClick}
              disabled={!selectedStartDate} // Disable if no start date is selected
            >
              ÁP DỤNG
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
