"use client"

import { useState, useEffect, useCallback } from "react"
import { vi } from "date-fns/locale"

import { Calendar } from "@/components/ui/calendar"
import { Button } from "@/components/ui/button"

interface CalendarSelectionPopupProps {
  isOpen: boolean
  onClose: () => void
  onApply: (startDate: Date | null, endDate: Date | null) => void
  initialStartDate?: Date | null
  initialEndDate?: Date | null
}

export default function CalendarSelectionPopup({
  isOpen,
  onClose,
  onApply,
  initialStartDate,
  initialEndDate,
}: CalendarSelectionPopupProps) {
  const [date, setDate] = useState<[Date | null, Date | null]>([initialStartDate || null, initialEndDate || null])

  useEffect(() => {
    setDate([initialStartDate || null, initialEndDate || null])
  }, [initialStartDate, initialEndDate])

  const handleApply = useCallback(() => {
    onApply(date[0], date[1])
  }, [date, onApply])

  return isOpen ? (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h2 className="text-lg font-medium mb-4">Chọn ngày</h2>
        <Calendar
          mode="range"
          defaultMonth={initialStartDate || new Date()}
          selected={date}
          onSelect={setDate}
          locale={vi}
          numberOfMonths={1}
        />
        <div className="flex justify-end mt-4 gap-2">
          <Button variant="ghost" onClick={onClose}>
            Hủy
          </Button>
          <Button onClick={handleApply}>Áp dụng</Button>
        </div>
      </div>
    </div>
  ) : null
}
