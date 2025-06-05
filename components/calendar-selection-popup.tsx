"use client"

import { useEffect } from "react"

import { useState, useMemo, useCallback } from "react"
import { Calendar, X } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, getDaysInMonth, startOfMonth, addMonths, isSameDay, isWithinInterval, isBefore } from "date-fns"
import { vi } from "date-fns/locale"

interface CalendarSelectionPopupProps {
  isOpen: boolean
  onClose: () => void
  onApply: (startDate: Date | null, endDate: Date | null) => void
  initialStartDate?: Date | null
  initialEndDate?: Date | null
}

// Helper to get price category based on the provided Figma colors
const getPriceCategory = (price: number) => {
  if (price <= 300000) return "low" // Corresponds to #a2e5b3
  if (price <= 500000) return "medium" // Corresponds to #fff2d7
  return "high" // Corresponds to #ff8b77
}

// Mock data for prices (replace with actual data fetching in a real app)
const mockPrices: { [key: string]: number } = {
  // January 2025
  "2025-01-01": 650000,
  "2025-01-02": 650000,
  "2025-01-03": 500000,
  "2025-01-04": 400000,
  "2025-01-05": 400000,
  "2025-01-06": 275000,
  "2025-01-07": 275000,
  "2025-01-08": 275000,
  "2025-01-09": 275000,
  "2025-01-10": 400000,
  "2025-01-11": 500000,
  "2025-01-12": 500000,
  "2025-01-13": 275000,
  "2025-01-14": 275000,
  "2025-01-15": 275000,
  "2025-01-16": 400000,
  "2025-01-17": 400000,
  "2025-01-18": 500000,
  "2025-01-19": 500000,
  "2025-01-20": 275000,
  "2025-01-21": 275000,
  "2025-01-22": 275000,
  "2025-01-23": 400000,
  "2025-01-24": 400000,
  "2025-01-25": 650000,
  "2025-01-26": 650000,
  "2025-01-27": 275000,
  "2025-01-28": 275000,
  "2025-01-29": 275000,
  "2025-01-30": 400000,
  "2025-01-31": 650000,

  // February 2025
  "2025-02-01": 500000,
  "2025-02-02": 500000,
  "2025-02-03": 275000,
  "2025-02-04": 275000,
  "2025-02-05": 275000,
  "2025-02-06": 400000,
  "2025-02-07": 400000,
  "2025-02-08": 500000,
  "2025-02-09": 500000,
  "2025-02-10": 650000,
  "2025-02-11": 650000,
  "2025-02-12": 650000,
  "2025-02-13": 650000,
  "2025-02-14": 650000,
  "2025-02-15": 500000,
  "2025-02-16": 500000,
  "2025-02-17": 275000,
  "2025-02-18": 275000,
  "2025-02-19": 275000,
  "2025-02-20": 400000,
  "2025-02-21": 400000,
  "2025-02-22": 500000,
  "2025-02-23": 500000,
  "2025-02-24": 275000,
  "2025-02-25": 275000,
  "2025-02-26": 275000,
  "2025-02-27": 400000,
  "2025-02-28": 400000,

  // March 2025
  "2025-03-01": 500000,
  "2025-03-02": 500000,
  "2025-03-03": 275000,
  "2025-03-04": 275000,
  "2025-03-05": 275000,
  "2025-03-06": 400000,
  "2025-03-07": 400000,
  "2025-03-08": 650000,
  "2025-03-09": 650000,
  "2025-03-10": 275000,
  "2025-03-11": 275000,
  "2025-03-12": 275000,
  "2025-03-13": 400000,
  "2025-03-14": 400000,
  "2025-03-15": 500000,
  "2025-03-16": 500000,
  "2025-03-17": 275000,
  "2025-03-18": 275000,
  "2025-03-19": 275000,
  "2025-03-20": 400000,
  "2025-03-21": 400000,
  "2025-03-22": 500000,
  "2025-03-23": 500000,
  "2025-03-24": 275000,
  "2025-03-25": 275000,
  "2025-03-26": 275000,
  "2025-03-27": 400000,
  "2025-03-28": 400000,
  "2025-03-29": 650000,
  "2025-03-30": 650000,
  "2025-03-31": 275000,

  // April 2025
  "2025-04-01": 275000,
  "2025-04-02": 275000,
  "2025-04-03": 400000,
  "2025-04-04": 400000,
  "2025-04-05": 500000,
  "2025-04-06": 500000,
  "2025-04-07": 275000,
  "2025-04-08": 275000,
  "2025-04-09": 275000,
  "2025-04-10": 400000,
  "2025-04-11": 400000,
  "2025-04-12": 500000,
  "2025-04-13": 500000,
  "2025-04-14": 275000,
  "2025-04-15": 275000,
  "2025-04-16": 275000,
  "2025-04-17": 400000,
  "2025-04-18": 400000,
  "2025-04-19": 500000,
  "2025-04-20": 500000,
  "2025-04-21": 275000,
  "2025-04-22": 275000,
  "2025-04-23": 275000,
  "2025-04-24": 400000,
  "2025-04-25": 400000,
  "2025-04-26": 500000,
  "2025-04-27": 500000,
  "2025-04-28": 650000,
  "2025-04-29": 650000,
  "2025-04-30": 650000,

  // May 2025
  "2025-05-01": 650000,
  "2025-05-02": 650000,
  "2025-05-03": 650000,
  "2025-05-04": 500000,
  "2025-05-05": 400000,
  "2025-05-06": 275000,
  "2025-05-07": 275000,
  "2025-05-08": 275000,
  "2025-05-09": 400000,
  "2025-05-10": 650000,
  "2025-05-11": 500000,
  "2025-05-12": 400000,
  "2025-05-13": 275000,
  "2025-05-14": 275000,
  "2025-05-15": 275000,
  "2025-05-16": 400000,
  "2025-05-17": 650000,
  "2025-05-18": 500000,
  "2025-05-19": 400000,
  "2025-05-20": 275000,
  "2025-05-21": 275000,
  "2025-05-22": 275000,
  "2025-05-23": 400000,
  "2025-05-24": 650000,
  "2025-05-25": 500000,
  "2025-05-26": 400000,
  "2025-05-27": 400000,
  "2025-05-28": 400000,
  "2025-05-29": 400000,
  "2025-05-30": 400000,
  "2025-05-31": 650000,

  // June 2025
  "2025-06-01": 500000,
  "2025-06-02": 400000,
  "2025-06-03": 400000,
  "2025-06-04": 400000,
  "2025-06-05": 400000,
  "2025-06-06": 400000,
  "2025-06-07": 650000,
  "2025-06-08": 400000,
  "2025-06-09": 400000,
  "2025-06-10": 400000,
  "2025-06-11": 400000,
  "2025-06-12": 500000,
  "2025-06-13": 500000,
  "2025-06-14": 650000,
  "2025-06-15": 400000,
  "2025-06-16": 400000,
  "2025-06-17": 400000,
  "2025-06-18": 400000,
  "2025-06-19": 500000,
  "2025-06-20": 500000,
  "2025-06-21": 650000,
  "2025-06-22": 400000,
  "2025-06-23": 400000,
  "2025-06-24": 400000,
  "2025-06-25": 400000,
  "2025-06-26": 500000,
  "2025-06-27": 500000,
  "2025-06-28": 650000,
  "2025-06-29": 400000,
  "2025-06-30": 400000,

  // July 2025
  "2025-07-01": 500000,
  "2025-07-02": 400000,
  "2025-07-03": 400000,
  "2025-07-04": 650000,
  "2025-07-05": 650000,
  "2025-07-06": 650000,
  "2025-07-07": 500000,
  "2025-07-08": 400000,
  "2025-07-09": 400000,
  "2025-07-10": 400000,
  "2025-07-11": 500000,
  "2025-07-12": 650000,
  "2025-07-13": 650000,
  "2025-07-14": 500000,
  "2025-07-15": 400000,
  "2025-07-16": 400000,
  "2025-07-17": 400000,
  "2025-07-18": 500000,
  "2025-07-19": 650000,
  "2025-07-20": 650000,
  "2025-07-21": 500000,
  "2025-07-22": 400000,
  "2025-07-23": 400000,
  "2025-07-24": 400000,
  "2025-07-25": 500000,
  "2025-07-26": 650000,
  "2025-07-27": 650000,
  "2025-07-28": 500000,
  "2025-07-29": 400000,
  "2025-07-30": 400000,
  "2025-07-31": 400000,

  // August 2025
  "2025-08-01": 500000,
  "2025-08-02": 650000,
  "2025-08-03": 650000,
  "2025-08-04": 500000,
  "2025-08-05": 400000,
  "2025-08-06": 400000,
  "2025-08-07": 400000,
  "2025-08-08": 500000,
  "2025-08-09": 650000,
  "2025-08-10": 650000,
  "2025-08-11": 500000,
  "2025-08-12": 400000,
  "2025-08-13": 400000,
  "2025-08-14": 400000,
  "2025-08-15": 650000,
  "2025-08-16": 650000,
  "2025-08-17": 650000,
  "2025-08-18": 500000,
  "2025-08-19": 400000,
  "2025-08-20": 400000,
  "2025-08-21": 400000,
  "2025-08-22": 500000,
  "2025-08-23": 650000,
  "2025-08-24": 650000,
  "2025-08-25": 500000,
  "2025-08-26": 400000,
  "2025-08-27": 400000,
  "2025-08-28": 400000,
  "2025-08-29": 500000,
  "2025-08-30": 650000,
  "2025-08-31": 650000,

  // September 2025
  "2025-09-01": 500000,
  "2025-09-02": 650000,
  "2025-09-03": 275000,
  "2025-09-04": 275000,
  "2025-09-05": 275000,
  "2025-09-06": 400000,
  "2025-09-07": 500000,
  "2025-09-08": 275000,
  "2025-09-09": 275000,
  "2025-09-10": 275000,
  "2025-09-11": 400000,
  "2025-09-12": 400000,
  "2025-09-13": 500000,
  "2025-09-14": 500000,
  "2025-09-15": 275000,
  "2025-09-16": 275000,
  "2025-09-17": 275000,
  "2025-09-18": 400000,
  "2025-09-19": 400000,
  "2025-09-20": 500000,
  "2025-09-21": 500000,
  "2025-09-22": 275000,
  "2025-09-23": 275000,
  "2025-09-24": 275000,
  "2025-09-25": 400000,
  "2025-09-26": 400000,
  "2025-09-27": 500000,
  "2025-09-28": 500000,
  "2025-09-29": 275000,
  "2025-09-30": 650000,

  // October 2025
  "2025-10-01": 650000,
  "2025-10-02": 650000,
  "2025-10-03": 650000,
  "2025-10-04": 500000,
  "2025-10-05": 500000,
  "2025-10-06": 275000,
  "2025-10-07": 275000,
  "2025-10-08": 275000,
  "2025-10-09": 400000,
  "2025-10-10": 400000,
  "2025-10-11": 500000,
  "2025-10-12": 500000,
  "2025-10-13": 275000,
  "2025-10-14": 275000,
  "2025-10-15": 275000,
  "2025-10-16": 400000,
  "2025-10-17": 400000,
  "2025-10-18": 500000,
  "2025-10-19": 500000,
  "2025-10-20": 275000,
  "2025-10-21": 275000,
  "2025-10-22": 275000,
  "2025-10-23": 400000,
  "2025-10-24": 400000,
  "2025-10-25": 500000,
  "2025-10-26": 500000,
  "2025-10-27": 275000,
  "2025-10-28": 275000,
  "2025-10-29": 275000,
  "2025-10-30": 400000,
  "2025-10-31": 650000,

  // November 2025
  "2025-11-01": 500000,
  "2025-11-02": 500000,
  "2025-11-03": 275000,
  "2025-11-04": 275000,
  "2025-11-05": 275000,
  "2025-11-06": 400000,
  "2025-11-07": 400000,
  "2025-11-08": 500000,
  "2025-11-09": 500000,
  "2025-11-10": 275000,
  "2025-11-11": 275000,
  "2025-11-12": 275000,
  "2025-11-13": 400000,
  "2025-11-14": 400000,
  "2025-11-15": 500000,
  "2025-11-16": 500000,
  "2025-11-17": 275000,
  "2025-11-18": 275000,
  "2025-11-19": 275000,
  "2025-11-20": 400000,
  "2025-11-21": 400000,
  "2025-11-22": 500000,
  "2025-11-23": 500000,
  "2025-11-24": 275000,
  "2025-11-25": 275000,
  "2025-11-26": 275000,
  "2025-11-27": 400000,
  "2025-11-28": 400000,
  "2025-11-29": 500000,
  "2025-11-30": 500000,

  // December 2025
  "2025-12-01": 275000,
  "2025-12-02": 275000,
  "2025-12-03": 275000,
  "2025-12-04": 400000,
  "2025-12-05": 400000,
  "2025-12-06": 500000,
  "2025-12-07": 500000,
  "2025-12-08": 275000,
  "2025-12-09": 275000,
  "2025-12-10": 275000,
  "2025-12-11": 400000,
  "2025-12-12": 400000,
  "2025-12-13": 500000,
  "2025-12-14": 500000,
  "2025-12-15": 275000,
  "2025-12-16": 275000,
  "2025-12-17": 275000,
  "2025-12-18": 400000,
  "2025-12-19": 400000,
  "2025-12-20": 500000,
  "2025-12-21": 500000,
  "2025-12-22": 650000,
  "2025-12-23": 650000,
  "2025-12-24": 650000,
  "2025-12-25": 650000,
  "2025-12-26": 650000,
  "2025-12-27": 650000,
  "2025-12-28": 650000,
  "2025-12-29": 650000,
  "2025-12-30": 650000,
  "2025-12-31": 650000,
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
  const currentMonthStart = useMemo(() => startOfMonth(today), [today])

  const [bookedDates, setBookedDates] = useState<Set<string>>(new Set())

  const isFullyBooked = useCallback(
    (date: Date) => {
      return bookedDates.has(format(date, "yyyy-MM-dd"))
    },
    [bookedDates],
  )

  useEffect(() => {
    const dates = new Set<string>()
    // Randomly book up to 15 dates in the next 12 months
    for (let i = 0; i < 15; i++) {
      const randomMonth = addMonths(currentMonthStart, Math.floor(Math.random() * 12))
      const randomDay = new Date(
        randomMonth.getFullYear(),
        randomMonth.getMonth(),
        Math.floor(Math.random() * getDaysInMonth(randomMonth)) + 1,
      )
      // Ensure it's not today or in the past
      if (!isBefore(randomDay, today) || isSameDay(randomDay, today)) {
        dates.add(format(randomDay, "yyyy-MM-dd"))
      }
    }
    setBookedDates(dates)
  }, [currentMonthStart, today])

  // The `monthsToDisplay` memoized value generates an array of Date objects for the current month and the next 5 months.
  // This ensures multiple months are available for display.
  const monthsToDisplay = useMemo(() => {
    const months = []
    for (let i = 0; i < 12; i++) {
      // Display current month + next 11 months (total 12 months)
      months.push(addMonths(currentMonthStart, i))
    }
    return months
  }, [currentMonthStart])

  const handleDateClick = useCallback(
    (date: Date) => {
      if ((isBefore(date, today) && !isSameDay(date, today)) || isFullyBooked(date)) {
        // Do not allow selecting past dates (unless it's today)
        return
      }

      if (!selectedStartDate || (selectedStartDate && selectedEndDate)) {
        // If no start date or both are selected, start a new selection
        setSelectedStartDate(date)
        setSelectedEndDate(null)
      } else if (isBefore(date, selectedStartDate)) {
        // If clicked date is before current start date, make it the new start date
        setSelectedStartDate(date)
        setSelectedEndDate(null) // Clear end date to allow new range selection
      } else {
        // If clicked date is after or same as start date, set it as end date
        setSelectedEndDate(date)
      }
    },
    [selectedStartDate, selectedEndDate, today, isFullyBooked],
  )

  const isDateSelected = useCallback(
    (date: Date) => {
      if (!selectedStartDate) return false
      if (selectedStartDate && !selectedEndDate) {
        return isSameDay(date, selectedStartDate)
      }
      if (selectedStartDate && selectedEndDate) {
        return isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate })
      }
      return false
    },
    [selectedStartDate, selectedEndDate],
  )

  const isDateRangeStart = useCallback(
    (date: Date) => {
      return selectedStartDate && isSameDay(date, selectedStartDate)
    },
    [selectedStartDate],
  )

  const isDateRangeEnd = useCallback(
    (date: Date) => {
      return selectedEndDate && isSameDay(date, selectedEndDate)
    },
    [selectedEndDate],
  )

  const getDayClasses = useCallback(
    (date: Date, price: number | undefined) => {
      const isPastDate = isBefore(date, today) && !isSameDay(date, today)
      const isSelected = isDateSelected(date)
      const isStart = isDateRangeStart(date)
      const isEnd = isDateRangeEnd(date)

      let bgColor = "bg-white"
      let textColor = "text-[#0a0a0a]"
      let borderColor = "border-gray-200"
      let shadowClass = ""

      if (isPastDate || isFullyBooked(date)) {
        bgColor = "bg-gray-200"
        textColor = "text-gray-400"
        borderColor = "border-gray-300"
      } else if (isSelected) {
        bgColor = "bg-[#4a90e2]" // Blue for selected range
        textColor = "text-white"
        borderColor = "border-[#4a90e2]"
        shadowClass = "shadow-md"
      } else if (price !== undefined) {
        const category = getPriceCategory(price)
        if (category === "low") {
          bgColor = "bg-[#e8f5e8]" // Light green
          borderColor = "border-[#4caf50]"
          textColor = "text-[#2e7d32]"
        } else if (category === "medium") {
          bgColor = "bg-[#fff8e1]" // Light amber
          borderColor = "border-[#ff9800]"
          textColor = "text-[#e65100]"
        } else if (category === "high") {
          bgColor = "bg-[#ffebee]" // Light red
          borderColor = "border-[#f44336]"
          textColor = "text-[#c62828]"
        }
      }

      return `relative flex flex-col items-center justify-center p-2 rounded-xl aspect-square text-center cursor-pointer transition-all duration-200
            ${bgColor} ${textColor} ${borderColor} border-2 ${shadowClass}
            ${isPastDate || isFullyBooked(date) ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg hover:scale-105 active:scale-95"}
            ${isStart && !isEnd ? "rounded-r-lg" : ""}
            ${isEnd && !isStart ? "rounded-l-lg" : ""}
            ${isStart && isEnd && !isSameDay(selectedStartDate!, selectedEndDate!) ? "rounded-lg" : ""}
            `
    },
    [isDateSelected, isDateRangeStart, isDateRangeEnd, today, selectedStartDate, selectedEndDate, isFullyBooked],
  )

  const getDayPrice = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    return mockPrices[dateKey]
  }

  const selectedRangeText = useMemo(() => {
    if (selectedStartDate && selectedEndDate) {
      const startDay = format(selectedStartDate, "dd", { locale: vi })
      const startWeekday = format(selectedStartDate, "EEEE", { locale: vi })
      const endDay = format(selectedEndDate, "dd", { locale: vi })
      const endWeekday = format(selectedEndDate, "EEEE", { locale: vi })

      const diffDays = Math.floor((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24)) + 1

      return (
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#0a0a0a]">{startDay}</span>
            <span className="text-xs font-medium text-[#0a0a0a] opacity-80">{startWeekday}</span>
            <span className="text-xs font-medium text-[#0a0a0a] opacity-80">
              Tháng {format(selectedStartDate, "M")}
            </span>
          </div>
          <div className="flex flex-col items-center px-4">
            <span className="text-sm font-semibold text-[#0a0a0a]">({diffDays} ngày)</span>
            <div className="w-8 h-0.5 bg-[#0a0a0a] opacity-60 mt-1"></div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#0a0a0a]">{endDay}</span>
            <span className="text-xs font-medium text-[#0a0a0a] opacity-80">{endWeekday}</span>
            <span className="text-xs font-medium text-[#0a0a0a] opacity-80">Tháng {format(selectedEndDate, "M")}</span>
          </div>
        </div>
      )
    } else if (selectedStartDate) {
      const startDay = format(selectedStartDate, "dd", { locale: vi })
      const startWeekday = format(selectedStartDate, "EEEE", { locale: vi })

      return (
        <div className="flex items-center justify-between w-full px-2">
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#0a0a0a]">{startDay}</span>
            <span className="text-xs font-medium text-[#0a0a0a] opacity-80">{startWeekday}</span>
            <span className="text-xs font-medium text-[#0a0a0a] opacity-80">
              Tháng {format(selectedStartDate, "M")}
            </span>
          </div>
          <div className="flex flex-col items-center px-4">
            <span className="text-sm font-medium text-[#0a0a0a] opacity-60">Chọn ngày kết thúc</span>
            <div className="w-8 h-0.5 bg-[#0a0a0a] opacity-40 mt-1"></div>
          </div>
          <div className="flex flex-col items-center">
            <span className="text-2xl font-bold text-[#0a0a0a] opacity-40">--</span>
            <span className="text-xs font-medium text-[#0a0a0a] opacity-40">Ngày kết thúc</span>
          </div>
        </div>
      )
    }

    return (
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center">
          <div className="flex items-center gap-4">
            <span className="text-2xl font-bold text-[#0a0a0a] opacity-40">--</span>
            <div className="flex flex-col items-center">
              <span className="text-sm font-medium text-[#0a0a0a] opacity-60">Chọn lịch</span>
              <div className="w-8 h-0.5 bg-[#0a0a0a] opacity-40 mt-1"></div>
            </div>
            <span className="text-2xl font-bold text-[#0a0a0a] opacity-40">--</span>
          </div>
          <span className="text-xs font-medium text-[#0a0a0a] opacity-50 mt-2">
            Vui lòng chọn ngày nhận và trả phòng
          </span>
        </div>
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
        <div className="flex-1 px-4 py-6 space-y-4 flex flex-col">
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
          <div className="bg-[#a3dce8] rounded-xl p-3 flex items-center justify-center text-[#0a0a0a] shadow-sm border border-[#8cc8d8] min-h-[60px]">
            {selectedRangeText}
          </div>

          {/* Calendar View */}
          <div className="flex-1 overflow-y-auto space-y-6 pb-20 max-h-[50vh]">
            {monthsToDisplay.map((monthDate, monthIndex) => {
              const year = monthDate.getFullYear()
              const month = monthDate.getMonth()
              const daysInCurrentMonth = getDaysInMonth(monthDate)
              const firstDayOfMonth = new Date(year, month, 1).getDay() // 0 for Sunday, 1 for Monday...

              // Create an array with empty slots for leading blank days
              const calendarDays = Array(firstDayOfMonth)
                .fill(null)
                .concat(Array.from({ length: daysInCurrentMonth }, (_, i) => new Date(year, month, i + 1)))

              return (
                <div key={monthIndex} className="border-2 border-gray-100 rounded-3xl p-6 bg-white shadow-lg">
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-3">
                      <Calendar className="h-6 w-6 text-[#0a0a0a]" />
                      <h3 className="text-xl font-bold text-[#0a0a0a]">
                        {format(monthDate, "MMMM, yyyy", { locale: vi })}
                      </h3>
                    </div>
                    <div className="flex gap-2">
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-[#4caf50]" />
                        <span className="text-xs font-medium text-gray-600">Cơ bản</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-[#ff9800]" />
                        <span className="text-xs font-medium text-gray-600">Trung bình</span>
                      </div>
                      <div className="flex items-center gap-1">
                        <div className="w-3 h-3 rounded-full bg-[#f44336]" />
                        <span className="text-xs font-medium text-gray-600">Cao điểm</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-7 gap-2 text-sm font-bold text-gray-600 mb-4">
                    <div className="text-center py-2">CN</div>
                    <div className="text-center py-2">T2</div>
                    <div className="text-center py-2">T3</div>
                    <div className="text-center py-2">T4</div>
                    <div className="text-center py-2">T5</div>
                    <div className="text-center py-2">T6</div>
                    <div className="text-center py-2">T7</div>
                  </div>
                  <div className="grid grid-cols-7 gap-3">
                    {calendarDays.map((day, dayIndex) => {
                      if (!day) {
                        return <div key={`empty-${dayIndex}`} className="aspect-square" />
                      }
                      const price = getDayPrice(day)
                      const formattedPrice = price ? `${(price / 1000).toLocaleString()}k` : "N/A"
                      const isPastDate = isBefore(day, today) && !isSameDay(day, today)
                      const isBooked = isFullyBooked(day)

                      return (
                        <div
                          key={dayIndex}
                          className={getDayClasses(day, price)}
                          onClick={() => !(isPastDate || isBooked) && handleDateClick(day)}
                          aria-disabled={isPastDate || isBooked}
                        >
                          <span className={`font-bold text-lg ${isBooked ? "" : ""}`}>{format(day, "dd")}</span>
                          {!isBooked && <span className="text-xs font-semibold mt-1">{formattedPrice}</span>}
                        </div>
                      )
                    })}
                  </div>
                </div>
              )
            })}

            {/* Price Legend */}
            <div className="flex justify-center gap-8 text-sm text-[#0a0a0a] font-semibold mt-6 pb-6 bg-gray-50 rounded-2xl p-4">
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-lg bg-[#e8f5e8] border-2 border-[#4caf50]" />
                <span>Giá cơ bản (≤300k)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-lg bg-[#fff8e1] border-2 border-[#ff9800]" />
                <span>Giá trung bình (300k-500k)</span>
              </div>
              <div className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-lg bg-[#ffebee] border-2 border-[#f44336]" />
                <span>Giá cao điểm (>500k)</span>
              </div>
            </div>
          </div>
          {/* Bottom Summary and Apply Button */}
          <div className="sticky bottom-0 pt-4 border-t border-gray-100 bg-white">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-lg font-semibold text-[#0a0a0a]">Hiển thị 308 kết quả</div>
                <div className="text-xs text-[#999999]">Giá trên lịch hiển thị theo đơn vị VND</div>
              </div>
              <Button
                className="bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 px-8 rounded-lg font-bold text-lg"
                onClick={handleApplyClick}
                disabled={!selectedStartDate}
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
