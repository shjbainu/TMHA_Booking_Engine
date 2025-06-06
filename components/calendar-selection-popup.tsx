"use client"

import type React from "react"

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
}

import {
  add,
  eachDayOfInterval,
  endOfMonth,
  format,
  isAfter,
  isBefore,
  isSameDay,
  isToday,
  startOfMonth,
} from "date-fns"
import { useState } from "react"

interface Day {
  date: Date
  isToday: boolean
  isSelected: boolean
  isWithinRange: boolean
  isStart: boolean
  isEnd: boolean
  priceCategory: "low" | "medium" | "high" | null
}

const CalendarSelectionPopup: React.FC<CalendarSelectionPopupProps> = ({
  isOpen,
  onClose,
  onApply,
  initialStartDate,
  initialEndDate,
}) => {
  const [selectedStartDate, setSelectedStartDate] = useState<Date | null>(initialStartDate || null)
  const [selectedEndDate, setSelectedEndDate] = useState<Date | null>(initialEndDate || null)
  const [currentMonth, setCurrentMonth] = useState<Date>(new Date())

  const daysInMonth = eachDayOfInterval({
    start: startOfMonth(currentMonth),
    end: endOfMonth(currentMonth),
  })

  const isPastDate = (date: Date) => {
    return isBefore(date, new Date())
  }

  const isFullyBooked = (date: Date) => {
    const dateKey = format(date, "yyyy-MM-dd")
    return mockPrices[dateKey] === 650000
  }

  const generateDays = (): Day[] => {
    return daysInMonth.map((day) => {
      const isSelected =
        (selectedStartDate && isSameDay(day, selectedStartDate)) || (selectedEndDate && isSameDay(day, selectedEndDate))
      const isWithinRange =
        selectedStartDate && selectedEndDate && isAfter(day, selectedStartDate) && isBefore(day, selectedEndDate)
      const isStart = selectedStartDate && isSameDay(day, selectedStartDate)
      const isEnd = selectedEndDate && isSameDay(day, selectedEndDate)
      const dateKey = format(day, "yyyy-MM-dd")
      const price = mockPrices[dateKey]
      const priceCategory = price ? getPriceCategory(price) : null

      return {
        date: day,
        isToday: isToday(day),
        isSelected,
        isWithinRange,
        isStart,
        isEnd,
        priceCategory,
      }
    })
  }

  const days = generateDays()

  const handleDateSelection = (date: Date) => {
    if (isPastDate(date) || isFullyBooked(date)) {
      return // Do not allow selection of past dates
    }

    if (selectedStartDate && selectedEndDate) {
      // Reset selection if both dates are already selected
      setSelectedStartDate(date)
      setSelectedEndDate(null)
    } else if (selectedStartDate) {
      if (isBefore(date, selectedStartDate)) {
        setSelectedEndDate(selectedStartDate)
        setSelectedStartDate(date)
      } else {
        setSelectedEndDate(date)
      }
    } else {
      setSelectedStartDate(date)
    }
  }

  const handleApply = () => {
    onApply(selectedStartDate, selectedEndDate)
    onClose()
  }

  const handleClose = () => {
    setSelectedStartDate(initialStartDate || null)
    setSelectedEndDate(initialEndDate || null)
    onClose()
  }

  const goToPreviousMonth = () => {
    setCurrentMonth(add(currentMonth, { months: -1 }))
  }

  const goToNextMonth = () => {
    setCurrentMonth(add(currentMonth, { months: 1 }))
  }

  const getDayClasses = (date: Date, day: Day) => {
    const { isSelected, isWithinRange, isStart, isEnd } = day

    let bgColor = ""
    let textColor = "text-gray-700"
    let borderColor = "border-transparent"
    let shadowClass = ""

    if (isSelected) {
      bgColor = "bg-blue-500"
      textColor = "text-white"
      shadowClass = "shadow-md"
    } else if (isWithinRange) {
      bgColor = "bg-blue-100"
    }

    if (isStart || isEnd) {
      borderColor = "border-blue-500"
    }

    const isPastDate = isBefore(date, new Date())

    return `relative flex flex-col items-center justify-center p-2 rounded-lg aspect-square text-center cursor-pointer transition-all duration-200
        ${bgColor} ${textColor} ${borderColor} border-2 ${shadowClass}
        ${isPastDate || isFullyBooked(date) ? "opacity-60 cursor-not-allowed" : "hover:shadow-lg hover:scale-105 active:scale-95"}
        ${isStart && !isEnd ? "rounded-r-lg" : ""}
        ${isEnd && !isStart ? "rounded-l-lg" : ""}
        ${isStart && isEnd && !isSameDay(selectedStartDate!, selectedEndDate!) ? "rounded-lg" : ""}
        `
  }

  return (
    <>
      {isOpen && (
        <div className="fixed top-0 left-0 w-full h-full flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white p-6 rounded-lg shadow-xl w-full max-w-md">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-semibold">Select Dates</h2>
              <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
                <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
            </div>

            <div className="flex justify-between items-center mb-4">
              <button onClick={goToPreviousMonth}>Previous</button>
              <h2>{format(currentMonth, "MMMM yyyy")}</h2>
              <button onClick={goToNextMonth}>Next</button>
            </div>

            <div className="grid grid-cols-7 gap-2">
              {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map((day) => (
                <div key={day} className="text-center text-gray-500">
                  {day}
                </div>
              ))}

              {days.map((day) => (
                <div
                  key={day.date.toISOString()}
                  className={getDayClasses(day.date, day)}
                  onClick={() => handleDateSelection(day.date)}
                >
                  <span>{format(day.date, "d")}</span>
                  {day.priceCategory && (
                    <div className="absolute bottom-1 left-1/2 -translate-x-1/2 text-xs">
                      {day.priceCategory === "low" && <div className="w-2 h-2 rounded-full bg-[#a2e5b3]"></div>}
                      {day.priceCategory === "medium" && <div className="w-2 h-2 rounded-full bg-[#fff2d7]"></div>}
                      {day.priceCategory === "high" && <div className="w-2 h-2 rounded-full bg-[#ff8b77]"></div>}
                    </div>
                  )}
                </div>
              ))}
            </div>

            <div className="flex justify-end mt-4">
              <button
                className="bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold py-2 px-4 rounded mr-2"
                onClick={handleClose}
              >
                Cancel
              </button>
              <button
                className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                onClick={handleApply}
              >
                Apply
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}

export default CalendarSelectionPopup
