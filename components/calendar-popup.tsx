"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X, ChevronLeft, ChevronRight } from "lucide-react"

interface CalendarPopupProps {
  isOpen: boolean
  onClose: () => void
  onApply: (bookingId: string, checkIn: Date, checkOut: Date) => void
  bookingId: string
  initialCheckIn?: Date | null
  initialCheckOut?: Date | null
}

export function CalendarPopup({
  isOpen,
  onClose,
  onApply,
  bookingId,
  initialCheckIn,
  initialCheckOut,
}: CalendarPopupProps) {
  const [selectedTab, setSelectedTab] = useState<"day" | "hour" | "overnight">("day")
  const [currentMonth, setCurrentMonth] = useState(new Date())
  const [selectedDates, setSelectedDates] = useState<Date[]>([])
  const [selectedTimeRange, setSelectedTimeRange] = useState<{ start: string | null; end: string | null }>({
    start: null,
    end: null,
  })

  useEffect(() => {
    if (isOpen) {
      setCurrentMonth(new Date())
      setSelectedDates(initialCheckIn && initialCheckOut ? [initialCheckIn, initialCheckOut] : [])
      setSelectedTimeRange({ start: null, end: null })
    }
  }, [isOpen, initialCheckIn, initialCheckOut])

  if (!isOpen) return null

  const getDaysInMonth = (date: Date) => {
    const year = date.getFullYear()
    const month = date.getMonth()
    const firstDay = new Date(year, month, 1)
    const lastDay = new Date(year, month + 1, 0)
    const days = []
    for (let i = 1; i <= lastDay.getDate(); i++) {
      days.push(new Date(year, month, i))
    }
    return days
  }

  const getStartDayOfWeek = (date: Date) => {
    const firstDay = new Date(date.getFullYear(), date.getMonth(), 1)
    return firstDay.getDay() // 0 for Sunday, 1 for Monday, etc.
  }

  const handleDateClick = (date: Date) => {
    if (isDateUnavailable(date)) return

    if (selectedDates.length === 0) {
      setSelectedDates([date])
    } else if (selectedDates.length === 1) {
      const [start] = selectedDates
      if (date.getTime() === start.getTime()) {
        setSelectedDates([])
      } else if (date < start) {
        setSelectedDates([date, start])
      } else {
        setSelectedDates([start, date])
      }
    } else {
      setSelectedDates([date])
    }
  }

  const isDateSelected = (date: Date) => {
    if (selectedDates.length === 0) return false
    if (selectedDates.length === 1) return selectedDates[0].toDateString() === date.toDateString()
    const [start, end] = selectedDates
    return date >= start && date <= end
  }

  const isDateUnavailable = (date: Date) => {
    // Simulate unavailable dates (e.g., past dates or specific holidays)
    const today = new Date()
    today.setHours(0, 0, 0, 0)
    if (date < today) return true // Past dates are unavailable

    // Simulate some random unavailable dates
    const unavailableDays = [10, 15, 20] // Example unavailable days of the month
    return unavailableDays.includes(date.getDate()) && date.getMonth() === currentMonth.getMonth()
  }

  const getPriceForDate = (date: Date) => {
    // Simulate prices
    const day = date.getDate()
    if (day % 7 === 0) return "750.000đ" // Weekends
    if (day % 5 === 0) return "600.000đ" // Mid-week special
    return "500.000đ"
  }

  const handleApply = () => {
    if (selectedTab === "day" && selectedDates.length === 2) {
      onApply(bookingId, selectedDates[0], selectedDates[1])
      onClose()
    } else if (selectedTab === "hour" && selectedTimeRange.start && selectedTimeRange.end) {
      // For hour/overnight, we'll just pass a dummy date for now and focus on time range
      const today = new Date()
      onApply(bookingId, today, today) // Placeholder dates
      onClose()
    } else if (selectedTab === "overnight" && selectedTimeRange.start && selectedTimeRange.end) {
      const today = new Date()
      onApply(bookingId, today, today) // Placeholder dates
      onClose()
    }
  }

  const renderCalendar = () => {
    const daysInMonth = getDaysInMonth(currentMonth)
    const startDay = getStartDayOfWeek(currentMonth)
    const emptyCells = Array(startDay).fill(null)

    return (
      <div className="grid grid-cols-7 gap-1 text-center text-sm">
        {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map((day) => (
          <div key={day} className="font-medium text-gray-500">
            {day}
          </div>
        ))}
        {emptyCells.map((_, i) => (
          <div key={`empty-${i}`} className="h-12 w-full" />
        ))}
        {daysInMonth.map((date, i) => {
          const isSelected = isDateSelected(date)
          const isUnavailable = isDateUnavailable(date)
          const isStart = selectedDates.length > 0 && selectedDates[0].toDateString() === date.toDateString()
          const isEnd = selectedDates.length > 1 && selectedDates[1].toDateString() === date.toDateString()
          const isRange = selectedDates.length === 2 && date > selectedDates[0] && date < selectedDates[1]

          return (
            <div
              key={i}
              className={`
                relative h-16 w-full flex flex-col items-center justify-center p-1 rounded-lg cursor-pointer
                ${isUnavailable ? "bg-gray-100 text-gray-400 line-through cursor-not-allowed" : ""}
                ${isSelected && !isUnavailable ? "bg-blue-500 text-white" : ""}
                ${isRange && !isUnavailable ? "bg-blue-100 text-blue-800" : ""}
                ${!isSelected && !isUnavailable ? "hover:bg-gray-100" : ""}
                ${isStart && selectedDates.length === 2 ? "rounded-r-none" : ""}
                ${isEnd && selectedDates.length === 2 ? "rounded-l-none" : ""}
              `}
              onClick={() => handleDateClick(date)}
            >
              <span className={`font-semibold ${isSelected ? "text-white" : "text-[#0a0a0a]"}`}>{date.getDate()}</span>
              {!isUnavailable && (
                <span className={`text-xs ${isSelected ? "text-white" : "text-gray-600"}`}>
                  {getPriceForDate(date)}
                </span>
              )}
            </div>
          )
        })}
      </div>
    )
  }

  const renderTimeSelection = () => {
    const timeSlots = Array.from({ length: 24 }, (_, i) => `${String(i).padStart(2, "0")}:00`)
    const overnightSlots = Array.from(
      { length: 12 },
      (_, i) => `${String(i + 18).padStart(2, "0")}:00 - ${String((i + 18 + 8) % 24).padStart(2, "0")}:00`,
    ) // Example overnight slots

    const handleTimeClick = (time: string) => {
      if (!selectedTimeRange.start) {
        setSelectedTimeRange({ start: time, end: null })
      } else if (!selectedTimeRange.end) {
        setSelectedTimeRange((prev) => ({ ...prev, end: time }))
      } else {
        setSelectedTimeRange({ start: time, end: null })
      }
    }

    return (
      <div className="grid grid-cols-3 gap-2 max-h-60 overflow-y-auto">
        {selectedTab === "hour" &&
          timeSlots.map((time) => (
            <Button
              key={time}
              variant={selectedTimeRange.start === time || selectedTimeRange.end === time ? "default" : "outline"}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </Button>
          ))}
        {selectedTab === "overnight" &&
          overnightSlots.map((time) => (
            <Button
              key={time}
              variant={selectedTimeRange.start === time ? "default" : "outline"}
              onClick={() => handleTimeClick(time)}
            >
              {time}
            </Button>
          ))}
      </div>
    )
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 p-4">
      <div className="bg-white rounded-lg shadow-lg w-full max-w-md">
        <div className="flex items-center justify-between p-4 border-b">
          <h2 className="text-lg font-semibold">Chọn ngày & giờ</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>
        <div className="p-4">
          <div className="flex justify-around mb-4 border-b">
            <Button
              variant="ghost"
              className={`flex-1 rounded-none ${selectedTab === "day" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setSelectedTab("day")}
            >
              Theo ngày
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 rounded-none ${selectedTab === "hour" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setSelectedTab("hour")}
            >
              Theo giờ
            </Button>
            <Button
              variant="ghost"
              className={`flex-1 rounded-none ${selectedTab === "overnight" ? "border-b-2 border-blue-500" : ""}`}
              onClick={() => setSelectedTab("overnight")}
            >
              Qua đêm
            </Button>
          </div>

          {selectedTab === "day" && (
            <div>
              <div className="flex items-center justify-between mb-4">
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1, 1))}
                >
                  <ChevronLeft className="h-5 w-5" />
                </Button>
                <span className="font-semibold">
                  Tháng {currentMonth.getMonth() + 1}, {currentMonth.getFullYear()}
                </span>
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1, 1))}
                >
                  <ChevronRight className="h-5 w-5" />
                </Button>
              </div>
              {renderCalendar()}
            </div>
          )}

          {(selectedTab === "hour" || selectedTab === "overnight") && renderTimeSelection()}
        </div>
        <div className="p-4 border-t">
          <Button
            className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg"
            onClick={handleApply}
            disabled={
              (selectedTab === "day" && selectedDates.length !== 2) ||
              ((selectedTab === "hour" || selectedTab === "overnight") &&
                (!selectedTimeRange.start || !selectedTimeRange.end))
            }
          >
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  )
}
