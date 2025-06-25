"use client"
import { useState, useMemo, useCallback, useEffect } from "react"
import { X, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  format,
  getDaysInMonth,
  startOfMonth,
  addMonths,
  isSameDay,
  isWithinInterval,
  isBefore,
  addDays,
  startOfDay,
  differenceInCalendarDays,
} from "date-fns"
import { vi } from "date-fns/locale"

// --- Interface đã được đơn giản hóa ---
interface CalendarSelectionPopupProps {
  isOpen: boolean
  onClose: () => void
  onApply: (
    startDate: Date | null,
    endDate: Date | null,
    bookingType: "day" | "hour" | "overnight",
    checkInTime: string,
    hoursOfUse: number
  ) => void // Trả về đầy đủ thông tin
  initialStartDate?: Date | null
  initialEndDate?: Date | null
}

export default function CalendarSelectionPopup({
  isOpen,
  onClose,
  onApply,
  initialStartDate = null,
  initialEndDate = null,
}: CalendarSelectionPopupProps) {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialStartDate)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialEndDate)
  
  const today = useMemo(() => startOfDay(new Date()), [])
  const currentMonthStart = useMemo(() => startOfMonth(today), [today])

  useEffect(() => {
    // Reset ngày đã chọn khi popup được mở lại
    if (isOpen) {
      setSelectedStartDate(initialStartDate)
      setSelectedEndDate(initialEndDate)
    }
  }, [isOpen, initialStartDate, initialEndDate])

  // Dữ liệu giả lập cho các ngày đã bị đặt
  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set())
  const isFullyBooked = useCallback((date: Date) => bookedDates.has(format(date, "yyyy-MM-dd")), [bookedDates])

  const monthsToDisplay = useMemo(
    () => Array.from({ length: 12 }, (_, i) => addMonths(currentMonthStart, i)),
    [currentMonthStart],
  )
  
  const handleDateClick = useCallback(
    (date: Date) => {
      if (isBefore(date, today) || isFullyBooked(date)) return

      // Logic chọn ngày cho chế độ "Theo ngày"
      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        setSelectedStartDate(date)
        setSelectedEndDate(null)
      } else if (isBefore(date, selectedStartDate)) {
        setSelectedStartDate(date)
        setSelectedEndDate(null)
      } else {
        setSelectedEndDate(date)
      }
    },
    [selectedStartDate, selectedEndDate, today, isFullyBooked],
  )

  const isDateSelected = useCallback(
    (date: Date) => {
      if (!selectedStartDate) return false
      if (selectedStartDate && !selectedEndDate) return isSameDay(date, selectedStartDate)
      if (selectedStartDate && selectedEndDate)
        return isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate })
      return false
    },
    [selectedStartDate, selectedEndDate],
  )

  const isDateRangeStart = useCallback((date: Date) => selectedStartDate && isSameDay(date, selectedStartDate), [selectedStartDate])
  const isDateRangeEnd = useCallback((date: Date) => selectedEndDate && isSameDay(date, selectedEndDate), [selectedEndDate])
  
  const getDayClasses = useCallback(
    (date: Date) => {
      const isPastOrBooked = isBefore(date, today) || isFullyBooked(date)
      const isSelected = isDateSelected(date)
      const isStart = isDateRangeStart(date)
      const isEnd = isDateRangeEnd(date)
      const inRange =
        selectedStartDate &&
        selectedEndDate &&
        isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate }) &&
        !isStart &&
        !isEnd
      const baseClasses = "aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200"
      let dynamicClasses = ""
      if (isPastOrBooked) {
        dynamicClasses = "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
      } else if (isSelected) {
        dynamicClasses = "bg-black text-white font-bold"
        if (isStart && !isEnd) dynamicClasses += " rounded-r-none"
        else if (isEnd && !isStart) dynamicClasses += " rounded-l-none"
        else if (inRange) dynamicClasses += " rounded-none bg-gray-700"
      } else {
        dynamicClasses = "bg-white border-2 border-gray-200 text-gray-700 hover:bg-gray-200"
      }
      return `${baseClasses} ${dynamicClasses}`
    },
    [isDateSelected, isDateRangeStart, isDateRangeEnd, today, selectedStartDate, selectedEndDate, isFullyBooked],
  )

  const selectedRangeText = useMemo(() => {
    if (!selectedStartDate) {
      return (
        <div className="flex items-center justify-center w-full">
          <span className="text-base text-gray-700">Vui lòng chọn ngày nhận phòng</span>
        </div>
      )
    }

    if (selectedStartDate && !selectedEndDate) {
       return (
        <div className="flex items-center justify-center w-full">
            <span className="text-base text-gray-700">Vui lòng chọn ngày trả phòng</span>
        </div>
       )
    }
    
    if (selectedStartDate && selectedEndDate) {
      const renderDateBlock = (date: Date) => (
        <div className="flex items-center gap-2">
          <div className="text-4xl font-bold">{format(date, "d")}</div>
          <div>
            <div className="text-xs font-semibold">{format(date, "EEEE", { locale: vi })}</div>
            <div className="text-xs text-gray-600">{format(date, "MMMM", { locale: vi })}</div>
          </div>
        </div>
      )
      return (
        <div className="flex items-center justify-between w-full px-4">
          {renderDateBlock(selectedStartDate)}
          <ArrowRight className="h-6 w-6 text-gray-500" />
          {renderDateBlock(selectedEndDate)}
        </div>
      )
    }

    return null; // Trường hợp dự phòng
  }, [selectedStartDate, selectedEndDate])

  const handleApplyClick = () => {
    // Nếu chỉ chọn 1 ngày, mặc định ngày trả phòng là ngày nhận phòng
    const finalEndDate = selectedStartDate && !selectedEndDate ? selectedStartDate : selectedEndDate;
    // Sử dụng giá trị mặc định cho các tham số còn lại
    onApply(selectedStartDate, finalEndDate, "day", "14:00", 1)
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 bg-black/50 flex items-end justify-center z-50">
      <div className="bg-white rounded-t-2xl w-full max-w-md p-4 animate-slide-up h-[90vh] flex flex-col">
        {/* Header Part */}
        <div>
          {/* --- KHÔNG CÒN CÁC NÚT TAB Ở ĐÂY --- */}
          <div className="bg-cyan-100 rounded-xl px-4 py-2 flex items-center justify-center text-black shadow-inner mb-4 h-16">
            {selectedRangeText}
          </div>
        </div>
        
        {/* Main Content */}
        <div className="flex-1 overflow-y-auto">
            <div className="space-y-4">
              {monthsToDisplay.map((monthDate, monthIndex) => {
                const year = monthDate.getFullYear()
                const month = monthDate.getMonth()
                const daysInCurrentMonth = getDaysInMonth(monthDate)
                const firstDayOfMonth = startOfMonth(monthDate).getDay();
                const offsetDays = (firstDayOfMonth === 0) ? 6 : firstDayOfMonth - 1;

                const calendarDays = Array(offsetDays)
                  .fill(null)
                  .concat(Array.from({ length: daysInCurrentMonth }, (_, i) => new Date(year, month, i + 1)))

                return (
                  <div key={monthIndex} className="pt-2 px-2">
                    <div className="flex items-center justify-between mb-3 px-2">
                      <h3 className="text-base font-bold text-gray-800">
                        {format(monthDate, "'Tháng' M, yyyy", { locale: vi })}
                      </h3>
                    </div>
                    <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-500 mb-2">
                      {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map((day) => (
                        <div key={day} className="text-center">
                          {day}
                        </div>
                      ))}
                    </div>
                    <div className="grid grid-cols-7 gap-2">
                      {calendarDays.map((day, dayIndex) => {
                        if (!day) return <div key={`empty-${dayIndex}`} />
                        return (
                          <div
                            key={day.toISOString()}
                            className={getDayClasses(day)}
                            onClick={() => handleDateClick(day)}
                            aria-disabled={isBefore(day, today)}
                          >
                            <span className="text-base font-semibold">{format(day, "d")}</span>
                          </div>
                        )
                      })}
                    </div>
                  </div>
                )
              })}
            </div>
        </div>

        {/* Footer Part */}
        <div className="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div>
            <div className="text-xs text-gray-500">Ngày đã chọn</div>
            <div className="text-sm font-medium">
              {selectedStartDate ? format(selectedStartDate, "dd/MM/yyyy", { locale: vi }) : "Chưa chọn"}{" "}
              {selectedEndDate ? `- ${format(selectedEndDate, "dd/MM/yyyy", { locale: vi })}` : ""}
            </div>
          </div>
          <Button
            className="bg-[#0a0a0a] hover:bg-[#000000] text-white px-6 py-2 rounded-full text-sm font-medium"
            onClick={handleApplyClick}
            disabled={!selectedStartDate || !selectedEndDate}
          >
            Áp dụng
          </Button>
        </div>
      </div>
    </div>
  )
}