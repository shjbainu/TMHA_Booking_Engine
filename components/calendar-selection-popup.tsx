"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { X } from "lucide-react"
import { format, isSameDay, isAfter, isBefore, addMonths } from "date-fns"
import { vi } from "date-fns/locale"

interface CalendarSelectionPopupProps {
  onClose: () => void
  onApply: (startDate: Date | null, endDate: Date | null) => void
  initialStartDate?: Date | null
  initialEndDate?: Date | null
  bookingId?: string
}

export default function CalendarSelectionPopup({
  onClose,
  onApply,
  initialStartDate = null,
  initialEndDate = null,
  bookingId = "booking-1",
}: CalendarSelectionPopupProps) {
  const [startDate, setStartDate] = useState<Date | null>(initialStartDate)
  const [endDate, setEndDate] = useState<Date | null>(initialEndDate)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())
  const [nextMonth, setNextMonth] = useState<Date>(addMonths(new Date(), 1))

  useEffect(() => {
    setStartDate(initialStartDate)
    setEndDate(initialEndDate)
  }, [initialStartDate, initialEndDate, bookingId])

  const handleDateClick = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(date)
      setEndDate(null)
    } else {
      if (isBefore(date, startDate)) {
        setStartDate(date)
        setEndDate(null)
      } else {
        setEndDate(date)
      }
    }
  }

  const isDateSelected = (date: Date) => {
    if (startDate && endDate) {
      return (
        isSameDay(date, startDate) || isSameDay(date, endDate) || (isAfter(date, startDate) && isBefore(date, endDate))
      )
    }
    return startDate ? isSameDay(date, startDate) : false
  }

  const isStartDate = (date: Date) => {
    return startDate ? isSameDay(date, startDate) : false
  }

  const isEndDate = (date: Date) => {
    return endDate ? isSameDay(date, endDate) : false
  }

  const renderCalendar = (month: Date) => {
    const firstDayOfMonth = new Date(month.getFullYear(), month.getMonth(), 1)
    const lastDayOfMonth = new Date(month.getFullYear(), month.getMonth() + 1, 0)
    const daysInMonth = lastDayOfMonth.getDate()
    const firstDayOfWeek = firstDayOfMonth.getDay() // 0 for Sunday, 1 for Monday, etc.

    const days = []
    const weekDays = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"]

    // Render week days
    const weekDaysRow = (
      <div className="grid grid-cols-7 mb-2">
        {weekDays.map((day, index) => (
          <div key={index} className="text-center text-xs font-medium text-gray-500 py-1">
            {day}
          </div>
        ))}
      </div>
    )

    // Add empty cells for days before the first day of the month
    const emptyCells = []
    for (let i = 0; i < firstDayOfWeek; i++) {
      emptyCells.push(<div key={`empty-${i}`} className="p-2"></div>)
    }

    // Add cells for each day of the month
    const dayCells = []
    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(month.getFullYear(), month.getMonth(), i)
      const isSelected = isDateSelected(date)
      const isStart = isStartDate(date)
      const isEnd = isEndDate(date)

      dayCells.push(
        <div
          key={`day-${i}`}
          className={`p-2 text-center cursor-pointer relative ${
            isSelected
              ? isStart
                ? "bg-black text-white rounded-l-full"
                : isEnd
                  ? "bg-black text-white rounded-r-full"
                  : "bg-gray-200"
              : "hover:bg-gray-100"
          }`}
          onClick={() => handleDateClick(date)}
        >
          <span
            className={`inline-block w-8 h-8 leading-8 rounded-full ${(isStart || isEnd) && "bg-black text-white"}`}
          >
            {i}
          </span>
        </div>,
      )
    }

    days.push(...emptyCells, ...dayCells)

    return (
      <div className="mb-4">
        <h3 className="text-center font-medium mb-2">{format(month, "MMMM yyyy", { locale: vi })}</h3>
        {weekDaysRow}
        <div className="grid grid-cols-7">{days}</div>
      </div>
    )
  }

  const handlePrevMonth = () => {
    setCurrentMonth(addMonths(currentMonth, -1))
    setNextMonth(addMonths(nextMonth, -1))
  }

  const handleNextMonth = () => {
    setCurrentMonth(addMonths(currentMonth, 1))
    setNextMonth(addMonths(nextMonth, 1))
  }

  const handleApply = () => {
    onApply(startDate, endDate)
  }

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-w-md p-4 animate-slide-up">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-lg font-medium">Chọn ngày</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex items-center justify-between mb-2">
          <Button variant="ghost" size="sm" onClick={handlePrevMonth}>
            &lt;
          </Button>
          <span className="text-sm font-medium">
            {format(currentMonth, "MM/yyyy", { locale: vi })} - {format(nextMonth, "MM/yyyy", { locale: vi })}
          </span>
          <Button variant="ghost" size="sm" onClick={handleNextMonth}>
            &gt;
          </Button>
        </div>

        <div className="overflow-y-auto max-h-[60vh]">
          {renderCalendar(currentMonth)}
          {renderCalendar(nextMonth)}
        </div>

        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div>
            <div className="text-xs text-gray-500">Ngày đã chọn</div>
            <div className="text-sm font-medium">
              {startDate ? format(startDate, "dd/MM/yyyy", { locale: vi }) : "Chưa chọn"}{" "}
              {endDate ? `- ${format(endDate, "dd/MM/yyyy", { locale: vi })}` : ""}
            </div>
          </div>
          <Button
            className="bg-[#0a0a0a] hover:bg-[#000000] text-white px-6 py-2 rounded-full text-sm font-medium"
            onClick={handleApply}
          >
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  )
}
