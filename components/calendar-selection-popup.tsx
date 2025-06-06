"use client"

import { useEffect } from "react"
import { useState, useMemo, useCallback } from "react"
import { Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, getDaysInMonth, startOfMonth, addMonths, isSameDay, isWithinInterval, isBefore, getDate, getDay } from "date-fns"
import { vi } from "date-fns/locale"

interface CalendarSelectionPopupProps {
  isOpen: boolean
  onClose: () => void
  onApply: (startDate: Date | null, endDate: Date | null) => void
  initialStartDate?: Date | null
  initialEndDate?: Date | null
}

// Helper to get price category
const getPriceCategory = (price: number) => {
  if (price > 500000) return "high"   // Cao điểm
  if (price > 400000) return "medium" // Trung bình
  return "low" // Cơ bản
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
  const today = useMemo(() => new Date(), [])
  const currentMonthStart = useMemo(() => startOfMonth(new Date()), [])

  // =================================================================
  //  BẮT ĐẦU PHẦN CODE MỚI: TỰ ĐỘNG TẠO GIÁ CHO TẤT CẢ CÁC THÁNG   
  // =================================================================
  const generatedPrices = useMemo(() => {
    const prices: { [key: string]: number } = {}
    const startDate = new Date()

    for (let i = 0; i < 12; i++) {
      const currentMonth = addMonths(startDate, i)
      const daysInMonth = getDaysInMonth(currentMonth)

      for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
        const dayOfWeek = getDay(date) // 0 for Sunday, 6 for Saturday
        const dateKey = format(date, "yyyy-MM-dd")
        
        // Weekend prices (Friday, Saturday)
        if (dayOfWeek === 5 || dayOfWeek === 6) {
          prices[dateKey] = 650000
        } 
        // Sunday price
        else if (dayOfWeek === 0) {
          prices[dateKey] = 500000
        } 
        // Weekday prices
        else {
          prices[dateKey] = 400000
        }
      }
    }
    return prices
  }, [])

  const getDayPrice = useCallback((date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    return generatedPrices[dateKey]
  }, [generatedPrices])
  // =================================================================
  //  KẾT THÚC PHẦN CODE MỚI                                          
  // =================================================================

  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set(["2025-06-09", "2025-06-14"]))
  const isFullyBooked = useCallback((date: Date) => bookedDates.has(format(date, "yyyy-MM-dd")), [bookedDates])
  
  const monthsToDisplay = useMemo(() => {
    return Array.from({ length: 12 }, (_, i) => addMonths(currentMonthStart, i));
  }, [currentMonthStart]);


  const handleDateClick = useCallback(
    (date: Date) => {
      if ((isBefore(date, today) && !isSameDay(date, today)) || isFullyBooked(date)) {
        return
      }

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

  const isDateSelected = useCallback((date: Date) => {
    if (!selectedStartDate) return false
    if (selectedStartDate && !selectedEndDate) return isSameDay(date, selectedStartDate)
    if (selectedStartDate && selectedEndDate) return isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate })
    return false
  }, [selectedStartDate, selectedEndDate])

  const isDateRangeStart = useCallback((date: Date) => selectedStartDate && isSameDay(date, selectedStartDate), [selectedStartDate])
  const isDateRangeEnd = useCallback((date: Date) => selectedEndDate && isSameDay(date, selectedEndDate), [selectedEndDate])

  const getDayClasses = useCallback(
    (date: Date, price: number | undefined) => {
      const isPastOrBooked = (isBefore(date, today) && !isSameDay(date, today)) || isFullyBooked(date)
      const isSelected = isDateSelected(date)
      const isStart = isDateRangeStart(date)
      const isEnd = isDateRangeEnd(date)
      const inRange = selectedStartDate && selectedEndDate && isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate }) && !isStart && !isEnd

      let baseClasses = "aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200"
      let dynamicClasses = ""

      if (isPastOrBooked) {
        dynamicClasses = "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70"
      } else if (isSelected) {
        dynamicClasses = "bg-blue-500 text-white font-bold"
        if (isStart && !isEnd) dynamicClasses += " rounded-r-none"
        else if (isEnd && !isStart) dynamicClasses += " rounded-l-none"
        else if(inRange) dynamicClasses += " rounded-none"
      } else {
        const category = price ? getPriceCategory(price) : 'low'
        switch (category) {
          case "high":
            dynamicClasses = "bg-white border-2 border-red-500 text-red-600"
            break
          case "medium":
            dynamicClasses = "bg-white border-2 border-orange-400 text-orange-500"
            break
          default: // 'low' - Giá cơ bản
            // =================================================================
            //  SỬA MÀU SẮC CHO GIÁ CƠ BẢN THÀNH MÀU XANH LÁ
            // =================================================================
            dynamicClasses = "bg-green-50 border-2 border-green-500 text-green-700"
        }
         dynamicClasses += " hover:bg-gray-200"
      }

      return `${baseClasses} ${dynamicClasses}`
    },
    [isDateSelected, isDateRangeStart, isDateRangeEnd, today, selectedStartDate, selectedEndDate, isFullyBooked],
  )
  
  const selectedRangeText = useMemo(() => {
    if (selectedStartDate && selectedEndDate) {
      const startDay = format(selectedStartDate, "d")
      const startWeekday = format(selectedStartDate, "EEEE", { locale: vi })
      const startMonth = format(selectedStartDate, "MMMM", { locale: vi })
      const endDay = format(selectedEndDate, "d")
      const endWeekday = format(selectedEndDate, "EEEE", { locale: vi })
      const endMonth = format(selectedEndDate, "MMMM", { locale: vi })
      const diffDays = Math.round((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24))

      return (
        <div className="flex items-center justify-between w-full px-2">
          <div className="text-center">
            <div className="text-3xl font-bold">{startDay}</div>
            <div className="text-xs">{startWeekday}</div>
            <div className="text-xs text-gray-600">{startMonth}</div>
          </div>
          <div className="text-center">
            <div className="text-sm font-semibold text-black">({diffDays} đêm)</div>
            <div className="w-12 h-px bg-black mx-auto mt-1"></div>
          </div>
          <div className="text-center">
            <div className="text-3xl font-bold">{endDay}</div>
            <div className="text-xs">{endWeekday}</div>
            <div className="text-xs text-gray-600">{endMonth}</div>
          </div>
        </div>
      )
    }
    return (
        <div className="flex items-center justify-center w-full">
            <span className="text-base text-gray-700">Vui lòng chọn ngày nhận và trả phòng</span>
        </div>
    )
  }, [selectedStartDate, selectedEndDate])

  const handleApplyClick = () => {
    onApply(selectedStartDate, selectedEndDate)
    onClose()
  }

  if (!isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-end justify-center">
      <div className="absolute inset-0 bg-black/50" onClick={onClose} />
      <div className="relative w-full max-w-md bg-white rounded-t-3xl h-[95vh] flex flex-col">
       
        <div className="flex items-center justify-between p-4 border-b">
          <div className="w-8"></div>
          <h2 className="text-lg font-bold text-center">Thời gian đặt phòng</h2>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-5 w-5" />
          </Button>
        </div>

        <div className="flex-1 px-4 py-4 flex flex-col overflow-hidden">
          <div className="flex rounded-full p-1 bg-black mb-4">
            <Button onClick={() => setActiveTab("day")} className={`flex-1 rounded-full text-sm h-10 ${activeTab === "day" ? "bg-white text-black" : "bg-black text-white"}`}>Theo ngày</Button>
            <Button onClick={() => setActiveTab("hour")} className={`flex-1 rounded-full text-sm h-10 ${activeTab === "hour" ? "bg-white text-black" : "bg-black text-white"}`}>Theo giờ</Button>
            <Button onClick={() => setActiveTab("overnight")} className={`flex-1 rounded-full text-sm h-10 ${activeTab === "overnight" ? "bg-white text-black" : "bg-black text-white"}`}>Qua đêm</Button>
          </div>
          
          <div className="bg-red-100 rounded-xl p-2 flex items-center justify-center text-black shadow-inner min-h-[80px] mb-4">
            {selectedRangeText}
          </div>

          <div className="flex-1 overflow-y-auto space-y-4 pb-24">
            {monthsToDisplay.map((monthDate, monthIndex) => {
              const year = monthDate.getFullYear()
              const month = monthDate.getMonth()
              const daysInCurrentMonth = getDaysInMonth(monthDate)
              const firstDayOfMonth = new Date(year, month, 1).getDay()
              const calendarDays = Array(firstDayOfMonth).fill(null).concat(Array.from({ length: daysInCurrentMonth }, (_, i) => new Date(year, month, i + 1)))

              return (
                <div key={monthIndex}>
                  <div className="flex items-center justify-between mb-3 px-2">
                    <h3 className="text-base font-bold text-gray-800">
                      {format(monthDate, "MMMM yyyy", { locale: vi })}
                    </h3>
                    <div className="flex items-center gap-3">
                      {/* ================================================================= */}
                      {/*  SỬA MÀU CHẤM TRÒN CỦA GIÁ CƠ BẢN THÀNH MÀU XANH LÁ             */}
                      {/* ================================================================= */}
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-green-500"></div>
                        <span className="text-xs text-gray-600">Cơ bản</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div>
                        <span className="text-xs text-gray-600">Trung bình</span>
                      </div>
                      <div className="flex items-center gap-1.5">
                        <div className="w-2.5 h-2.5 rounded-full bg-red-500"></div>
                        <span className="text-xs text-gray-600">Cao điểm</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-500 mb-2">
                    {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(day => <div key={day} className="text-center">{day}</div>)}
                  </div>
                  <div className="grid grid-cols-7 gap-1">
                    {calendarDays.map((day, dayIndex) => {
                      if (!day) {
                        return <div key={`empty-${dayIndex}`} />
                      }
                      const price = getDayPrice(day)
                      const formattedPrice = price ? `${Math.round(price / 1000)}k` : ""
                      const isPastOrBooked = (isBefore(day, today) && !isSameDay(day, today)) || isFullyBooked(day)

                      return (
                        <div
                          key={day.toISOString()}
                          className={getDayClasses(day, price)}
                          onClick={() => !isPastOrBooked && handleDateClick(day)}
                          aria-disabled={isPastOrBooked}
                        >
                          <span className="text-base font-semibold">{format(day, "d")}</span>
                          {!isPastOrBooked && <span className="text-[10px] font-medium">{formattedPrice}</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}
          </div>

          <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-sm font-semibold">Hiển thị 308 kết quả</div>
                <div className="text-xs text-gray-500">Giá trên lịch hiển thị theo đơn vị VND</div>
              </div>
              <Button
                className="bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-bold text-base"
                onClick={handleApplyClick}
                disabled={!selectedStartDate || !selectedEndDate}
              >
                ÁP DỤNG
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
