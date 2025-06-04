"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Users, Bed, Wifi, Trash2, Loader, Check } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { rooms } from "@/lib/data"

export default function RoomSelection() {
  const [selectedRooms, setSelectedRooms] = useState<string[]>([])
  const [expandedRooms, setExpandedRooms] = useState<string[]>([])
  const [roomQuantities, setRoomQuantities] = useState<{ [key: string]: number }>({})
  const [roomPolicies, setRoomPolicies] = useState<{
    [key: string]: { breakfast: string | null; cancellation: string | null }
  }>({})
  const [isLoading, setIsLoading] = useState(false)

  const handleRoomSelect = (roomId: string) => {
    setSelectedRooms((prev) => (prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]))
  }

  const handleRoomExpand = (roomId: string) => {
    setExpandedRooms((prev) => (prev.includes(roomId) ? prev.filter((id) => id !== roomId) : [...prev, roomId]))
    if (!roomQuantities[roomId]) {
      setRoomQuantities((prev) => ({ ...prev, [roomId]: 1 }))
    }
    if (!roomPolicies[roomId]) {
      setRoomPolicies((prev) => ({
        ...prev,
        [roomId]: { breakfast: null, cancellation: null },
      }))
    }
  }

  const updateQuantity = (roomId: string, change: number) => {
    setRoomQuantities((prev) => ({
      ...prev,
      [roomId]: Math.max(1, (prev[roomId] || 1) + change),
    }))
  }

  const updatePolicy = (roomId: string, type: "breakfast" | "cancellation", value: string | null) => {
    setRoomPolicies((prev) => ({
      ...prev,
      [roomId]: {
        ...prev[roomId],
        [type]: value,
      },
    }))
  }

  const handleReset = () => {
    setIsLoading(true)
    // Giả lập thời gian tải
    setTimeout(() => {
      setIsLoading(false)
      // Reset các state khác nếu cần
      setSelectedRooms([])
      setExpandedRooms([])
      setRoomQuantities({})
      setRoomPolicies({})
    }, 2000)
  }

  const totalPrice = Object.entries(roomQuantities).reduce((sum, [roomId, quantity]) => {
    const room = rooms.find((r) => r.id === roomId)
    return sum + (room?.price || 0) * quantity
  }, 0)

  return (
    <div className="min-h-screen bg-white relative">
      {/* Header */}
      <div className="flex items-center justify-between p-4 bg-white border-b border-gray-100">
        <Link href="/">
          <Button variant="ghost" size="icon" className="h-10 w-10">
            <ArrowLeft className="h-6 w-6 text-[#0a0a0a]" />
          </Button>
        </Link>
        <h1 className="text-lg font-medium text-[#0a0a0a]">CHỌN PHÒNG</h1>
        <div className="w-10" />
      </div>

      {/* Booking Info */}
      <div className="p-4 bg-gray-50">
        <div className="flex items-center gap-2 mb-2">
          <Badge variant="secondary" className="bg-[#0a0a0a] text-white">
            BOOKING 1
          </Badge>
          <Button variant="ghost" size="icon" className="h-6 w-6">
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex gap-2 mb-4">
          <Badge variant="outline" className="rounded-full">
            Bao gồm bữa sáng
          </Badge>
          <Badge variant="outline" className="rounded-full">
            Hủy miễn phí
          </Badge>
          <Badge variant="outline" className="rounded-full cursor-pointer hover:bg-gray-100" onClick={handleReset}>
            Reset
          </Badge>
        </div>

        {/* Loading Overlay */}
        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 max-w-md mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white shadow-lg">
              <Loader className="h-8 w-8 animate-spin text-gray-700" />
              <p className="text-sm font-medium text-gray-700">Đang tải lại phòng</p>
            </div>
          </div>
        )}
      </div>

      {/* Room List */}
      <div className="p-4 space-y-4">
        {rooms.map((room) => (
          <div
            key={room.id}
            className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200"
          >
            {/* Room Images */}
            <div className="grid grid-cols-5 gap-2 mb-4 p-2 border border-gray-100 rounded-2xl bg-gray-50/30">
              {/* Large image on the left */}
              <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full opacity-60"></div>
                </div>
              </div>

              {/* Two stacked images on the right */}
              <div className="col-span-2 grid grid-rows-2 gap-2">
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                  <div className="absolute inset-0 flex items-center justify-center">
                    <div className="w-3 h-3 bg-gray-400 rounded-full opacity-60"></div>
                  </div>
                </div>
                <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                  <span className="text-white text-sm font-semibold">+8</span>
                </div>
              </div>
            </div>

            {/* Room Info */}
            <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">
              {room.id === "1" ? "Phòng Sơn Ca" : room.id === "2" ? "Phòng Nhật bản" : "Phòng Mập Mờ"}
            </h3>

            <div className="mb-3">
              <span className="text-sm text-gray-600">1 giường king, 2 giường đôi</span>
            </div>

            {/* Amenities */}
            <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <span>Hướng mặt phố</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>Tối đa 3 người</span>
              </div>
              <div className="flex items-center gap-2">
                <Bed className="h-4 w-4" />
                <span>Còn 3 phòng</span>
              </div>
              <div className="flex items-center gap-2">
                <Wifi className="h-4 w-4" />
                <span>Diện tích 30m2</span>
              </div>
            </div>

            {/* Price and Select */}
            <div className="flex items-center justify-between mb-4">
              <div>
                <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 500.000đ</span>
              </div>
              {!expandedRooms.includes(room.id) ? (
                <Button
                  className="bg-[#0a0a0a] hover:bg-[#000000] text-white px-6 py-2 rounded-full text-sm font-medium"
                  onClick={() => handleRoomExpand(room.id)}
                >
                  Chọn phòng
                </Button>
              ) : (
                <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 bg-white">
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded border border-gray-300"
                    onClick={() => updateQuantity(room.id, -1)}
                  >
                    <span className="text-lg">-</span>
                  </Button>
                  <span className="w-8 text-center font-medium">{roomQuantities[room.id] || 1}</span>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded border border-gray-300"
                    onClick={() => updateQuantity(room.id, 1)}
                  >
                    <span className="text-lg">+</span>
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    className="h-8 w-8 rounded border border-gray-300 text-gray-500"
                    onClick={() => {
                      setExpandedRooms((prev) => prev.filter((id) => id !== room.id))
                      setRoomQuantities((prev) => {
                        const newState = { ...prev }
                        delete newState[room.id]
                        return newState
                      })
                    }}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              )}
            </div>

            {/* Inline Options */}
            {expandedRooms.includes(room.id) && (
              <div className="space-y-4 pt-2">
                {/* Breakfast Policy */}
                <div>
                  <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách ăn sáng</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-300"></div>
                      </div>
                      <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-gray-100 border border-gray-200 rounded-lg">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center bg-blue-500 border-blue-500 shadow-sm">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <span className="text-sm text-[#0a0a0a]">Không gồm bữa sáng</span>
                    </label>
                  </div>
                </div>

                {/* Cancellation Policy */}
                <div>
                  <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách hủy</h4>
                  <div className="space-y-2">
                    <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-300"></div>
                      </div>
                      <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 15/06/2025</span>
                    </label>
                    <label className="flex items-center gap-3 p-3 bg-gray-100 border border-gray-200 rounded-lg">
                      <div className="relative">
                        <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center bg-blue-500 border-blue-500 shadow-sm">
                          <Check className="w-3 h-3 text-white" />
                        </div>
                      </div>
                      <span className="text-sm text-[#0a0a0a]">Không hoàn tiền</span>
                    </label>
                  </div>
                </div>
              </div>
            )}
          </div>
        ))}
        {/* Additional Santorini Room */}
        <div className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200">
          {/* Room Images */}
          <div className="grid grid-cols-5 gap-2 mb-4 p-2 border border-gray-100 rounded-2xl bg-gray-50/30">
            {/* Large image on the left */}
            <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="w-3 h-3 bg-gray-400 rounded-full opacity-60"></div>
              </div>
            </div>

            {/* Two stacked images on the right */}
            <div className="col-span-2 grid grid-rows-2 gap-2">
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-3 h-3 bg-gray-400 rounded-full opacity-60"></div>
                </div>
              </div>
              <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                <span className="text-white text-sm font-semibold">+8</span>
              </div>
            </div>
          </div>

          {/* Room Info */}
          <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">Phòng Santorini</h3>

          <div className="mb-3">
            <span className="text-sm text-gray-600">1 giường king, 2 giường đôi</span>
          </div>

          {/* Amenities */}
          <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              <span>Hướng mặt phố</span>
            </div>
            <div className="flex items-center gap-2">
              <Users className="h-4 w-4" />
              <span>Tối đa 3 người</span>
            </div>
            <div className="flex items-center gap-2">
              <Bed className="h-4 w-4" />
              <span>Còn 3 phòng</span>
            </div>
            <div className="flex items-center gap-2">
              <Wifi className="h-4 w-4" />
              <span>Diện tích 30m2</span>
            </div>
          </div>

          {/* Price and Select */}
          <div className="flex items-center justify-between mb-4">
            <div>
              <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ 500.000đ</span>
            </div>
            {!expandedRooms.includes("4") ? (
              <Button
                className="bg-[#0a0a0a] hover:bg-[#000000] text-white px-6 py-2 rounded-full text-sm font-medium"
                onClick={() => handleRoomExpand("4")}
              >
                Chọn phòng
              </Button>
            ) : (
              <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 bg-white">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded border border-gray-300"
                  onClick={() => updateQuantity("4", -1)}
                >
                  <span className="text-lg">-</span>
                </Button>
                <span className="w-8 text-center font-medium">{roomQuantities["4"] || 1}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded border border-gray-300"
                  onClick={() => updateQuantity("4", 1)}
                >
                  <span className="text-lg">+</span>
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8 rounded border border-gray-300 text-gray-500"
                  onClick={() => {
                    setExpandedRooms((prev) => prev.filter((id) => id !== "4"))
                    setRoomQuantities((prev) => {
                      const newState = { ...prev }
                      delete newState["4"]
                      return newState
                    })
                  }}
                >
                  <Trash2 className="h-4 w-4" />
                </Button>
              </div>
            )}
          </div>

          {/* Inline Options */}
          {expandedRooms.includes("4") && (
            <div className="space-y-4 pt-2">
              {/* Breakfast Policy */}
              <div>
                <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách ăn sáng</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="relative">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-300"></div>
                    </div>
                    <span className="text-sm text-[#0a0a0a]">Bao gồm bữa sáng</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-gray-100 border border-gray-200 rounded-lg">
                    <div className="relative">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center bg-blue-500 border-blue-500 shadow-sm">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <span className="text-sm text-[#0a0a0a]">Không gồm bữa sáng</span>
                  </label>
                </div>
              </div>

              {/* Cancellation Policy */}
              <div>
                <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách hủy</h4>
                <div className="space-y-2">
                  <label className="flex items-center gap-3 p-3 bg-white border border-gray-200 rounded-lg">
                    <div className="relative">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center border-gray-300"></div>
                    </div>
                    <span className="text-sm text-[#0a0a0a]">Hủy miễn phí trước 15/06/2025</span>
                  </label>
                  <label className="flex items-center gap-3 p-3 bg-gray-100 border border-gray-200 rounded-lg">
                    <div className="relative">
                      <div className="w-5 h-5 rounded-full border-2 flex items-center justify-center bg-blue-500 border-blue-500 shadow-sm">
                        <Check className="w-3 h-3 text-white" />
                      </div>
                    </div>
                    <span className="text-sm text-[#0a0a0a]">Không hoàn tiền</span>
                  </label>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Bottom Summary */}
      {Object.keys(roomQuantities).length > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">18</span>
              <span className="text-sm text-[#0a0a0a]">25/04 - 27/04</span>
            </div>
            <div className="text-right">
              <div className="text-lg font-medium text-[#0a0a0a]">{totalPrice.toLocaleString()}đ</div>
              <div className="text-xs text-[#999999]">Giá trên đã bao gồm thuế và phí dịch vụ</div>
            </div>
          </div>
          <Link href="/payment">
            <Button className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg">Hoàn tất</Button>
          </Link>
        </div>
      )}

      <div className="h-24" />
    </div>
  )
}
