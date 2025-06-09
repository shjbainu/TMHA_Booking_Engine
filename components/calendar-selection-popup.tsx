"use client"

import { useEffect } from "react"
import { useState, useMemo, useCallback } from "react"
import { Calendar, X, ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { format, getDaysInMonth, startOfMonth, addMonths, isSameDay, isWithinInterval, isBefore, getDate, getDay, addDays, startOfWeek } from "date-fns"
import { vi } from "date-fns/locale"

// --- (Toàn bộ phần code còn lại giữ nguyên như trước) ---
// ...

interface CalendarSelectionPopupProps {
    isOpen: boolean
    onClose: () => void
    onApply: (startDate: Date | null, endDate: Date | null) => void
    initialStartDate?: Date | null
    initialEndDate?: Date | null
}

const getPriceCategory = (price: number) => {
    if (price > 500000) return "high"
    if (price > 400000) return "medium"
    return "low"
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
    const [checkInTime, setCheckInTime] = useState<string>("08:00");
    const [hoursOfUse, setHoursOfUse] = useState<number>(2);
    const [currentWeekIndex, setCurrentWeekIndex] = useState(0);

    const checkInTimeOptions = useMemo(() => Array.from({ length: 15 }, (_, i) => `${String(i + 8).padStart(2, '0')}:00`), []);
    const hoursOfUseOptions = useMemo(() => [2, 3, 4, 5, 6], []);
    const today = useMemo(() => new Date(), [])
    const currentMonthStart = useMemo(() => startOfMonth(new Date()), [])

    const generatedPrices = useMemo(() => {
        const prices: { [key: string]: number } = {}
        const startDate = new Date()
        for (let i = 0; i < 12; i++) {
            const currentMonth = addMonths(startDate, i)
            const daysInMonth = getDaysInMonth(currentMonth)
            for (let day = 1; day <= daysInMonth; day++) {
                const date = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day)
                const dayOfWeek = getDay(date)
                const dateKey = format(date, "yyyy-MM-dd")
                if (dayOfWeek === 5 || dayOfWeek === 6) prices[dateKey] = 650000
                else if (dayOfWeek === 0) prices[dateKey] = 500000
                else prices[dateKey] = 400000
            }
        }
        return prices
    }, [])

    const getDayPrice = useCallback((date: Date) => generatedPrices[format(date, "yyyy-MM-dd")], [generatedPrices])
    const [bookedDates, setBookedDates] = useState<Set<string>>(new Set())
    const isFullyBooked = useCallback((date: Date) => bookedDates.has(format(date, "yyyy-MM-dd")), [bookedDates])
    
    const monthsToDisplay = useMemo(() => Array.from({ length: 12 }, (_, i) => addMonths(currentMonthStart, i)), [currentMonthStart]);
    const weeksToDisplay = useMemo(() => {
        const firstDay = startOfWeek(today, { locale: vi });
        return Array.from({ length: 12 }, (_, weekIndex) => {
            return Array.from({ length: 7 }, (_, dayIndex) => {
                return addDays(firstDay, weekIndex * 7 + dayIndex);
            });
        });
    }, [today]);

    const handleDateClick = useCallback(
        (date: Date) => {
            if ((isBefore(date, today) && !isSameDay(date, today)) || isFullyBooked(date)) return;
            if (activeTab === 'overnight') {
                const nextDay = addDays(date, 1);
                if (isFullyBooked(nextDay)) { console.warn("Ngày hôm sau đã được đặt."); return; }
                setSelectedStartDate(date);
                setSelectedEndDate(nextDay);
            } else if (activeTab === 'hour') {
                setSelectedStartDate(date);
                setSelectedEndDate(null);
            } else {
                if (!selectedStartDate || (selectedStartDate && selectedEndDate)) { setSelectedStartDate(date); setSelectedEndDate(null); }
                else if (isBefore(date, selectedStartDate)) { setSelectedStartDate(date); setSelectedEndDate(null); }
                else { setSelectedEndDate(date); }
            }
        }, [activeTab, selectedStartDate, selectedEndDate, today, isFullyBooked]
    )

    const handleTabChange = (tab: "day" | "hour" | "overnight") => {
        setActiveTab(tab);
        setSelectedStartDate(null);
        setSelectedEndDate(null);
        setCurrentWeekIndex(0);
    }
    
    const handleNextWeek = () => {
        if (currentWeekIndex < weeksToDisplay.length - 1) {
            setCurrentWeekIndex(prev => prev + 1);
        }
    };

    const handlePrevWeek = () => {
        if (currentWeekIndex > 0) {
            setCurrentWeekIndex(prev => prev - 1);
        }
    };
    
    const isDateSelected = useCallback((date: Date) => {
        if (!selectedStartDate) return false;
        if (activeTab === 'hour') return isSameDay(date, selectedStartDate);
        if (selectedStartDate && !selectedEndDate) return isSameDay(date, selectedStartDate);
        if (selectedStartDate && selectedEndDate) return isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate });
        return false;
      }, [activeTab, selectedStartDate, selectedEndDate]);
    
      const isDateRangeStart = useCallback((date: Date) => activeTab !== 'hour' && selectedStartDate && isSameDay(date, selectedStartDate), [activeTab, selectedStartDate]);
      const isDateRangeEnd = useCallback((date: Date) => activeTab !== 'hour' && selectedEndDate && isSameDay(date, selectedEndDate), [activeTab, selectedEndDate]);
    
      const getDayClasses = useCallback(
        (date: Date, price: number | undefined) => {
          const isPastOrBooked = (isBefore(date, today) && !isSameDay(date, today)) || isFullyBooked(date);
          const isSelected = isDateSelected(date);
          const isStart = isDateRangeStart(date);
          const isEnd = isDateRangeEnd(date);
          const inRange = activeTab !== 'hour' && selectedStartDate && selectedEndDate && isWithinInterval(date, { start: selectedStartDate, end: selectedEndDate }) && !isStart && !isEnd;
          let baseClasses = "aspect-square rounded-xl flex flex-col items-center justify-center cursor-pointer transition-all duration-200";
          let dynamicClasses = "";
          if (isPastOrBooked) {
            dynamicClasses = "bg-gray-100 text-gray-400 cursor-not-allowed opacity-70";
          } else if (isSelected) {
            if (activeTab === 'hour' || (isStart && isEnd) || (isStart && !isEnd)) {
                dynamicClasses = "bg-blue-500 text-white font-bold";
            } else {
                dynamicClasses = "bg-blue-500 text-white font-bold";
                if (isStart && !isEnd) dynamicClasses += " rounded-r-none";
                else if (isEnd && !isStart) dynamicClasses += " rounded-l-none";
                else if (inRange) dynamicClasses += " rounded-none";
            }
          } else {
            const category = price ? getPriceCategory(price) : 'low';
            switch (category) {
              case "high": dynamicClasses = "bg-white border-2 border-red-500 text-red-600"; break;
              case "medium": dynamicClasses = "bg-white border-2 border-orange-400 text-orange-500"; break;
              default: dynamicClasses = "bg-green-50 border-2 border-green-500 text-green-700"; break;
            }
            dynamicClasses += " hover:bg-gray-200";
          }
          return `${baseClasses} ${dynamicClasses}`;
        }, [isDateSelected, isDateRangeStart, isDateRangeEnd, today, selectedStartDate, selectedEndDate, isFullyBooked, activeTab]
      );
      
    // =========================================================================
    // THAY ĐỔI: Tối ưu hóa hiển thị cho "Theo giờ"
    // =========================================================================
    const selectedRangeText = useMemo(() => {
        // ---- Chế độ "Theo giờ" ----
        if (activeTab === 'hour' && selectedStartDate) {
            const [startHour, startMinute] = checkInTime.split(':').map(Number);
            const endHour = startHour + hoursOfUse;
            const formattedEndTime = `${String(endHour % 24).padStart(2, '0')}:${String(startMinute).padStart(2, '0')}`;
            
            // Helper function để render một khối thời gian cho gọn gàng
            const renderTimeBlock = (time: string, date: Date) => (
                <div className="flex items-center gap-1.5">
                    {/* Giảm cỡ chữ giờ */}
                    <div className="text-3xl font-bold text-gray-900">{time}</div>
                    {/* Căn chỉnh lại khối ngày tháng */}
                    <div className="leading-tight">
                        <div className="text-xs font-semibold text-gray-800">Ngày {format(date, "d")}</div>
                        <div className="text-xs text-gray-600">Tháng {format(date, "M")}</div>
                    </div>
                </div>
            );

            return (
                <div className="flex items-center justify-between w-full px-2 sm:px-4">
                    {renderTimeBlock(checkInTime, selectedStartDate)}
                    <div className="text-sm font-semibold text-gray-700 mx-2">({hoursOfUse} giờ)</div>
                    {renderTimeBlock(formattedEndTime, selectedStartDate)}
                </div>
            );
        }

        // ---- Chế độ "Theo ngày" & "Qua đêm" ----
        if ((activeTab === 'day' || activeTab === 'overnight') && selectedStartDate && selectedEndDate) {
            const diffInDays = Math.round((selectedEndDate.getTime() - selectedStartDate.getTime()) / (1000 * 60 * 60 * 24));
            const diffText = activeTab === 'day' ? `(${diffInDays + 1} ngày)` : `(${diffInDays} đêm)`;
            const renderDateBlock = (date: Date) => (
                <div className="flex items-center gap-2">
                    <div className="text-4xl font-bold">{format(date, "d")}</div>
                    <div>
                        <div className="text-xs font-semibold">{format(date, "EEEE", { locale: vi })}</div>
                        <div className="text-xs text-gray-600">{format(date, "MMMM", { locale: vi })}</div>
                    </div>
                </div>
            );
            return (
                <div className="flex items-center justify-between w-full px-4">
                    {renderDateBlock(selectedStartDate)}
                    <div className="text-sm font-semibold text-gray-700">{diffText}</div>
                    {renderDateBlock(selectedEndDate)}
                </div>
            );
        }

        // ---- Trạng thái mặc định ----
        return (
            <div className="flex items-center justify-center w-full">
                <span className="text-base text-gray-700">Vui lòng chọn thời gian</span>
            </div>
        )
    }, [activeTab, selectedStartDate, selectedEndDate, checkInTime, hoursOfUse]);
    // =========================================================================

    const handleApplyClick = () => {
        onApply(selectedStartDate, selectedEndDate);
        onClose();
    }

    if (!isOpen) return null

    // --- (Phần JSX return bên dưới giữ nguyên) ---
    return (
        <div className="fixed inset-0 z-50 flex items-end justify-center">
            <div className="absolute inset-0 bg-black/50" onClick={onClose} />
            <div className="relative w-full max-w-md bg-white rounded-t-3xl h-[95vh] flex flex-col">

                <div className="flex-1 px-4 py-4 flex flex-col overflow-hidden">
                    <div className="flex rounded-full p-1 bg-black mb-4">
                        <Button onClick={() => handleTabChange("day")} className={`flex-1 rounded-full text-sm h-10 ${activeTab === "day" ? "bg-white text-black" : "bg-black text-white"}`}>Theo ngày</Button>
                        <Button onClick={() => handleTabChange("hour")} className={`flex-1 rounded-full text-sm h-10 ${activeTab === "hour" ? "bg-white text-black" : "bg-black text-white"}`}>Theo giờ</Button>
                        <Button onClick={() => handleTabChange("overnight")} className={`flex-1 rounded-full text-sm h-10 ${activeTab === "overnight" ? "bg-white text-black" : "bg-black text-white"}`}>Qua đêm</Button>
                    </div>

                    <div className="bg-cyan-100 rounded-xl px-4 py-2 flex items-center justify-center text-black shadow-inner mb-4 h-16">
                        {selectedRangeText}
                    </div>
                    
                    

                    <div className="flex-1 overflow-y-auto pb-32">
                        {activeTab === 'hour' ? (
                            <div className="px-2">
                                <div className="flex items-center justify-between mb-3 px-2">
                                    <Button variant="ghost" size="icon" onClick={handlePrevWeek} disabled={currentWeekIndex === 0}>
                                        <ChevronLeft className="h-5 w-5" />
                                    </Button>
                                    <h3 className="text-base font-bold text-gray-800">
                                        {`Tháng ${format(weeksToDisplay[currentWeekIndex][0], "MM yyyy", { locale: vi })}`}
                                    </h3>
                                    <Button variant="ghost" size="icon" onClick={handleNextWeek} disabled={currentWeekIndex === weeksToDisplay.length - 1}>
                                        <ChevronRight className="h-5 w-5" />
                                    </Button>
                                </div>
                                <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-500 mb-2">
                                    {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(day => <div key={day} className="text-center">{day}</div>)}
                                </div>
                                <div className="grid grid-cols-7 gap-2">
                                    {weeksToDisplay[currentWeekIndex].map((day) => {
                                        const price = getDayPrice(day);
                                        const formattedPrice = price ? `${Math.round(price / 1000)}k` : "";
                                        const isPastOrBooked = (isBefore(day, today) && !isSameDay(day, today)) || isFullyBooked(day);
                                        return (
                                            <div key={day.toISOString()} className={getDayClasses(day, price)} onClick={() => !isPastOrBooked && handleDateClick(day)} aria-disabled={isPastOrBooked}>
                                                <span className="text-base font-semibold">{format(day, "d")}</span>
                                                {!isPastOrBooked && <span className="text-[10px] font-medium">{formattedPrice}</span>}
                                            </div>
                                        );
                                    })}
                                </div>
                            </div>
                        ) : (
                            <div className="space-y-4">
                                {monthsToDisplay.map((monthDate, monthIndex) => {
                                    const year = monthDate.getFullYear();
                                    const month = monthDate.getMonth();
                                    const daysInCurrentMonth = getDaysInMonth(monthDate);
                                    const firstDayOfMonth = new Date(year, month, 1).getDay();
                                    const calendarDays = Array(firstDayOfMonth).fill(null).concat(Array.from({ length: daysInCurrentMonth }, (_, i) => new Date(year, month, i + 1)));

                                    return (
                                        <div key={monthIndex} className="pt-2 px-2">
                                            <div className="flex items-center justify-between mb-3 px-2">
                                                <h3 className="text-base font-bold text-gray-800">
                                                    {format(monthDate, "M/yyyy", { locale: vi })}
                                                </h3>
                                                 <div className="flex items-center gap-3">
                                                     <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-green-500"></div><span className="text-xs text-gray-600">Cơ bản</span></div>
                                                     <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-orange-400"></div><span className="text-xs text-gray-600">Trung bình</span></div>
                                                     <div className="flex items-center gap-1.5"><div className="w-2.5 h-2.5 rounded-full bg-red-500"></div><span className="text-xs text-gray-600">Cao điểm</span></div>
                                                </div>
                                            </div>
                                            <div className="grid grid-cols-7 gap-2 text-xs font-semibold text-gray-500 mb-2">
                                                {["CN", "T2", "T3", "T4", "T5", "T6", "T7"].map(day => <div key={day} className="text-center">{day}</div>)}
                                            </div>
                                            <div className="grid grid-cols-7 gap-2">
                                                {calendarDays.map((day, dayIndex) => {
                                                    if (!day) return <div key={`empty-${dayIndex}`} />;
                                                    const price = getDayPrice(day);
                                                    const formattedPrice = price ? `${Math.round(price / 1000)}k` : "";
                                                    const isPastOrBooked = (isBefore(day, today) && !isSameDay(day, today)) || isFullyBooked(day);
                                                    return (
                                                        <div key={day.toISOString()} className={getDayClasses(day, price)} onClick={() => !isPastOrBooked && handleDateClick(day)} aria-disabled={isPastOrBooked}>
                                                            <span className="text-base font-semibold">{format(day, "d")}</span>
                                                            {!isPastOrBooked && <span className="text-[10px] font-medium">{formattedPrice}</span>}
                                                        </div>
                                                    );
                                                })}
                                            </div>
                                        </div>
                                    );
                                })}
                            </div>
                        )}
                    </div>
                    {activeTab === 'hour' && (
                        <div className="flex items-center gap-4 mb-4">
                            <div className="flex-1">
                                <label htmlFor="check-in-time" className="block text-xs font-medium text-gray-700 mb-10">Giờ nhận phòng</label>
                                <select id="check-in-time" value={checkInTime} onChange={(e) => setCheckInTime(e.target.value)} className="w-full p-2 border border-gray-300 rounded-lg shadow-sm">
                                    {checkInTimeOptions.map(time => <option key={time} value={time}>{time}</option>)}
                                </select>
                            </div>
                            <div className="flex-1">
                                <label htmlFor="hours-of-use" className="block text-xs font-medium text-gray-700 mb-10">Số giờ sử dụng</label>
                                <select id="hours-of-use" value={hoursOfUse} onChange={(e) => setHoursOfUse(Number(e.target.value))} className="w-full p-2 border border-gray-300 rounded-lg shadow-sm">
                                    {hoursOfUseOptions.map(hour => <option key={hour} value={hour}>{hour} giờ</option>)}
                                </select>
                            </div>
                        </div>
                    )}
                    <div className="absolute bottom-0 left-0 right-0 p-4 border-t bg-white">
                        <div className="flex items-center justify-between">
                            <div>
                                <div className="text-sm font-semibold">Hiển thị 308 kết quả</div>
                                <div className="text-xs text-gray-500">Giá trên lịch hiển thị theo đơn vị VND</div>
                            </div>
                            <Button className="bg-black hover:bg-gray-800 text-white py-3 px-6 rounded-lg font-bold text-base" onClick={handleApplyClick} disabled={!selectedStartDate || (activeTab === 'day' && !selectedEndDate)} >
                                ÁP DỤNG
                            </Button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
