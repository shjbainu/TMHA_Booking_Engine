"use client"

import { useState, useMemo, useCallback } from "react"
import { ArrowLeft, Plus, Users, Bed, Wifi, Trash2, Loader, Check } from "lucide-react"
import { Button } from "@/components/ui/button" // Đảm bảo bạn có component này
import Link from "next/link"
import Image from "next/image"
import { rooms, RoomData } from "@/lib/data" // Import từ file data của bạn

// Định nghĩa kiểu cho một booking
interface Booking {
  id: string
  roomQuantities: { [roomId: string]: number }
  roomPolicies: { [roomId: string]: { breakfast: string | null; cancellation: string | null } }
  expandedRooms: string[] // Danh sách các roomId đang được mở rộng
}

export default function RoomSelection() {
  const [bookings, setBookings] = useState<Booking[]>([
    {
      id: "booking-1", // Booking chính, các lựa chọn phòng sẽ áp dụng cho booking này
      roomQuantities: {},
      roomPolicies: {},
      expandedRooms: [],
    },
  ])
  const [isLoading, setIsLoading] = useState(false)
  const [includeBreakfastFilter, setIncludeBreakfastFilter] = useState(false)
  const [freeCancellationFilter, setFreeCancellationFilter] = useState(false)

  // Booking đầu tiên trong mảng `bookings` sẽ là booking chính để tương tác với các thẻ phòng.
  const primaryBookingId = bookings.length > 0 ? bookings[0].id : null
  const primaryBooking = primaryBookingId ? bookings.find(b => b.id === primaryBookingId) : null

  const handleAddBooking = () => {
    const newBookingId = `booking-${bookings.length + 1}`
    setBookings((prev) => [
      ...prev,
      {
        id: newBookingId,
        roomQuantities: {},
        roomPolicies: {},
        expandedRooms: [],
      },
    ])
  }

  const handleRemoveBooking = (bookingIdToRemove: string) => {
    // Không cho phép xóa booking chính nếu nó là booking duy nhất
    if (bookings.length === 1 && bookingIdToRemove === primaryBookingId) {
      return
    }
    // Nếu xóa booking chính và còn booking khác, cần logic phức tạp hơn (ví dụ: chọn booking tiếp theo làm chính)
    // Hiện tại, chỉ cho phép xóa các booking không phải là booking chính một cách dễ dàng
    if (bookingIdToRemove === primaryBookingId) {
        alert("Không thể xóa booking đang được chọn. Vui lòng chọn booking khác hoặc reset.");
        return;
    }
    setBookings((prev) => prev.filter((booking) => booking.id !== bookingIdToRemove))
  }

  const updatePrimaryBooking = useCallback((updater: (booking: Booking) => Booking) => {
    if (!primaryBookingId) return;
    setBookings(prevBookings =>
      prevBookings.map(b => (b.id === primaryBookingId ? updater(b) : b))
    );
  }, [primaryBookingId]);


  const handleRoomExpand = (roomId: string) => {
    updatePrimaryBooking(booking => {
      const isExpanded = booking.expandedRooms.includes(roomId);
      let newExpandedRooms = booking.expandedRooms;
      let newRoomQuantities = { ...booking.roomQuantities };
      let newRoomPolicies = { ...booking.roomPolicies };

      if (isExpanded) {
        // Nếu đang mở rộng và click lại -> thu gọn (và xóa lựa chọn)
        newExpandedRooms = booking.expandedRooms.filter(id => id !== roomId);
        delete newRoomQuantities[roomId];
        delete newRoomPolicies[roomId];
      } else {
        // Nếu chưa mở rộng -> mở rộng và đặt số lượng là 1, khởi tạo policy
        newExpandedRooms = [...booking.expandedRooms, roomId];
        if (!newRoomQuantities[roomId]) {
          newRoomQuantities[roomId] = 1;
        }
        if (!newRoomPolicies[roomId]) {
          newRoomPolicies[roomId] = { breakfast: null, cancellation: null };
        }
      }
      return { ...booking, expandedRooms: newExpandedRooms, roomQuantities: newRoomQuantities, roomPolicies: newRoomPolicies };
    });
  }

  const handleDeselectRoom = (roomId: string) => {
    updatePrimaryBooking(booking => {
        const newExpandedRooms = booking.expandedRooms.filter(id => id !== roomId);
        const newRoomQuantities = { ...booking.roomQuantities };
        delete newRoomQuantities[roomId];
        const newRoomPolicies = { ...booking.roomPolicies };
        delete newRoomPolicies[roomId];
        return { ...booking, expandedRooms: newExpandedRooms, roomQuantities: newRoomQuantities, roomPolicies: newRoomPolicies };
    });
  }


  const updateQuantity = (roomId: string, change: number) => {
    updatePrimaryBooking(booking => {
      const currentQuantity = booking.roomQuantities[roomId] || 0;
      const newQuantity = Math.max(1, currentQuantity + change); // Số lượng tối thiểu là 1
      return {
        ...booking,
        roomQuantities: { ...booking.roomQuantities, [roomId]: newQuantity },
      };
    });
  }

  const updatePolicy = (
    roomId: string,
    type: "breakfast" | "cancellation",
    value: string | null,
  ) => {
    updatePrimaryBooking(booking => ({
      ...booking,
      roomPolicies: {
        ...booking.roomPolicies,
        [roomId]: {
          ...(booking.roomPolicies[roomId] || { breakfast: null, cancellation: null }),
          [type]: value,
        },
      },
    }));
  }

  const handleReset = () => {
    setIsLoading(true)
    setTimeout(() => {
      setIsLoading(false)
      // Reset booking chính hoặc reset toàn bộ về 1 booking
      setBookings([
        {
          id: "booking-1",
          roomQuantities: {},
          roomPolicies: {},
          expandedRooms: [],
        },
      ])
      setIncludeBreakfastFilter(false)
      setFreeCancellationFilter(false)
    }, 2000)
  }

  const totalOverallPrice = useMemo(() => {
    if (!primaryBooking) return 0;
    return Object.entries(primaryBooking.roomQuantities).reduce((sum, [roomId, quantity]) => {
      const room = rooms.find((r) => r.id === roomId)
      return sum + (room?.price || 0) * quantity
    }, 0)
  }, [primaryBooking, rooms])

  const totalSelectedRoomsCount = useMemo(() => {
    if (!primaryBooking) return 0;
    return Object.values(primaryBooking.roomQuantities).reduce((sum, quantity) => sum + quantity, 0)
  }, [primaryBooking])

  if (!primaryBooking) {
    // Xử lý trường hợp không có booking chính (ví dụ: sau khi xóa hết)
    // Có thể hiển thị một thông báo hoặc tự động tạo một booking mới
    if (bookings.length === 0 && !isLoading) { // Check isLoading để tránh tạo lại khi đang reset
        // Tự động thêm lại booking nếu không còn booking nào
        // setTimeout(() => handleAddBooking(), 0); // Dùng setTimeout để tránh lỗi render loop
        return <div className="p-4">Đang khởi tạo booking... Vui lòng đợi hoặc làm mới trang.</div>;
    }
     return <div className="p-4">Không tìm thấy booking chính.</div>;
  }


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
        <div className="flex flex-wrap items-center gap-2 mb-4">
          {bookings.map((booking, index) => (
            <Button
              key={booking.id}
              variant={booking.id === primaryBookingId ? "default" : "secondary"}
              className={`h-10 px-4 flex items-center justify-center rounded-full 
                ${booking.id === primaryBookingId 
                  ? "bg-[#0a0a0a] text-white hover:bg-[#0a0a0a]" 
                  : "bg-gray-200 text-gray-700 hover:bg-gray-300"}`}
              // onClick={() => { /* Có thể thêm logic chuyển primaryBookingId ở đây */ }}
            >
              BOOKING {index + 1}
              {booking.id !== primaryBookingId && bookings.length > 1 && (
                <Trash2 
                  className="h-4 w-4 ml-2 text-gray-500 hover:text-red-500 cursor-pointer" 
                  onClick={(e) => { e.stopPropagation(); handleRemoveBooking(booking.id); }}
                />
              )}
            </Button>
          ))}
          <Button variant="ghost" size="icon" className="h-10 w-10" onClick={handleAddBooking}>
            <Plus className="h-4 w-4" />
          </Button>
        </div>

        {/* Filter Tags */}
        <div className="flex gap-2 mb-4">
          <Button
            variant="outline"
            className={`rounded-full h-10 px-4 ${
              includeBreakfastFilter
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-[#0a0a0a]"
            }`}
            onClick={() => setIncludeBreakfastFilter(!includeBreakfastFilter)}
          >
            Bao gồm bữa sáng
          </Button>
          <Button
            variant="outline"
            className={`rounded-full h-10 px-4 ${
              freeCancellationFilter
                ? "border-blue-500 bg-blue-50 text-blue-700"
                : "border-gray-200 bg-white text-[#0a0a0a]"
            }`}
            onClick={() => setFreeCancellationFilter(!freeCancellationFilter)}
          >
            Hủy miễn phí
          </Button>
          <Button
            variant="outline"
            className="rounded-full h-10 px-4 cursor-pointer hover:bg-gray-100"
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>

        {isLoading && (
          <div className="absolute inset-0 z-10 flex items-center justify-center bg-white/80 max-w-md mx-auto">
            <div className="flex flex-col items-center gap-2 p-4 rounded-lg bg-white shadow-lg">
              <Loader className="h-8 w-8 animate-spin text-gray-700" />
              <p className="text-sm font-medium text-gray-700">Đang tải lại phòng</p>
            </div>
          </div>
        )}
      </div>

      {/* Room List - Hiển thị 3 thẻ phòng từ `rooms` data */}
      <div className="p-4 space-y-4">
        {rooms.slice(0, 3).map((room: RoomData) => { // Chỉ lấy 3 phòng đầu tiên
          const isExpanded = primaryBooking.expandedRooms.includes(room.id);
          const quantity = primaryBooking.roomQuantities[room.id] || 0;
          const policy = primaryBooking.roomPolicies[room.id] || { breakfast: null, cancellation: null };

          return (
            <div
              key={`${primaryBooking.id}-${room.id}`}
              className="border border-gray-200 rounded-2xl p-5 bg-white shadow-sm hover:shadow-md transition-shadow duration-200 mb-4"
            >
              {/* Room Images */}
              <div className="grid grid-cols-5 gap-2 mb-4 p-2 border border-gray-100 rounded-2xl bg-gray-50/30">
                <div className="col-span-3 relative aspect-[3/4] rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                  <Image
                    src={room.mainImage}
                    alt={room.name}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover"
                  />
                </div>
                <div className="col-span-2 grid grid-rows-2 gap-2">
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-100 to-gray-200 shadow-sm">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-3 h-3 bg-gray-400 rounded-full opacity-60"></div>
                    </div>
                  </div>
                  <div className="relative aspect-square rounded-xl overflow-hidden bg-gradient-to-br from-gray-300 to-gray-400 shadow-sm flex items-center justify-center">
                    <span className="text-white text-sm font-semibold">+{room.otherImagesCount || 0}</span>
                  </div>
                </div>
              </div>

              {/* Room Info */}
              <h3 className="text-lg font-semibold text-[#0a0a0a] mb-2">{room.name}</h3>
              <div className="mb-3">
                <span className="text-sm text-gray-600">{room.details.beds}</span>
              </div>

              {/* Amenities */}
              <div className="grid grid-cols-2 gap-2 text-sm text-[#0a0a0a] mb-4">
                <div className="flex items-center gap-2"><Bed className="h-4 w-4" /><span>{room.details.view}</span></div>
                <div className="flex items-center gap-2"><Users className="h-4 w-4" /><span>{room.details.capacity}</span></div>
                <div className="flex items-center gap-2"><Bed className="h-4 w-4" /><span>{room.details.availability}</span></div>
                <div className="flex items-center gap-2"><Wifi className="h-4 w-4" /><span>{room.details.area}</span></div>
              </div>

              {/* Price and Select */}
              <div className="flex items-center justify-between mb-4">
                <div>
                  <span className="text-lg font-semibold text-[#0a0a0a]">Giá từ {room.price.toLocaleString()}đ</span>
                </div>
                {!isExpanded || quantity === 0 ? (
                  <Button
                    className="bg-[#0a0a0a] hover:bg-[#000000] text-white px-6 py-2 rounded-full text-sm font-medium"
                    onClick={() => handleRoomExpand(room.id)}
                  >
                    Chọn phòng
                  </Button>
                ) : (
                  <div className="flex items-center gap-3 border border-gray-200 rounded-lg px-3 py-2 bg-white">
                    <Button
                      variant="outline" size="icon" className="h-8 w-8 rounded border border-gray-300"
                      onClick={() => updateQuantity(room.id, -1)}
                      disabled={quantity <= 1}
                    >
                      <span className="text-lg">-</span>
                    </Button>
                    <span className="w-8 text-center font-medium">{quantity}</span>
                    <Button
                      variant="outline" size="icon" className="h-8 w-8 rounded border border-gray-300"
                      onClick={() => updateQuantity(room.id, 1)}
                    >
                      <span className="text-lg">+</span>
                    </Button>
                    <Button
                      variant="outline" size="icon" className="h-8 w-8 rounded border border-gray-300 text-gray-500"
                      onClick={() => handleDeselectRoom(room.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </div>

              {/* Inline Options */}
              {isExpanded && quantity > 0 && (
                <div className="space-y-4 pt-2">
                  {/* Breakfast Policy */}
                  <div>
                    <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách ăn sáng</h4>
                    <div className="space-y-2">
                      {["Bao gồm bữa sáng", "Không gồm bữa sáng"].map(option => (
                        <div
                          key={option}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                            policy.breakfast === option ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                          }`}
                          onClick={() => updatePolicy(room.id, "breakfast", option)}
                        >
                          <div className="relative">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              policy.breakfast === option ? "bg-blue-500 border-blue-500 shadow-sm" : "border-gray-300"
                            }`}>
                              {policy.breakfast === option && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                          <span className="text-sm text-[#0a0a0a]">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  {/* Cancellation Policy */}
                  <div>
                    <h4 className="font-medium text-[#0a0a0a] mb-3">Chính sách hủy</h4>
                    <div className="space-y-2">
                      {["Hủy miễn phí trước 15/06/2025", "Không hoàn tiền"].map(option => (
                        <div
                          key={option}
                          className={`flex items-center gap-3 p-3 rounded-lg border cursor-pointer ${
                            policy.cancellation === option ? "border-blue-500 bg-blue-50" : "border-gray-200 bg-white"
                          }`}
                          onClick={() => updatePolicy(room.id, "cancellation", option)}
                        >
                          <div className="relative">
                            <div className={`w-5 h-5 rounded-full border-2 flex items-center justify-center ${
                              policy.cancellation === option ? "bg-blue-500 border-blue-500 shadow-sm" : "border-gray-300"
                            }`}>
                              {policy.cancellation === option && <Check className="w-3 h-3 text-white" />}
                            </div>
                          </div>
                          <span className="text-sm text-[#0a0a0a]">{option}</span>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>
              )}
            </div>
          )
        })}
      </div>

      {/* Bottom Summary */}
      {totalSelectedRoomsCount > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 p-4 shadow-top-lg">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2">
              <span className="text-sm bg-gray-100 px-2 py-1 rounded">{totalSelectedRoomsCount}</span>
              <span className="text-sm text-[#0a0a0a]">25/04 - 27/04</span> {/* Ngày tháng này có thể cần động */}
            </div>
            <div className="text-right">
              <div className="text-lg font-medium text-[#0a0a0a]">{totalOverallPrice.toLocaleString()}đ</div>
              <div className="text-xs text-[#999999]">Giá trên đã bao gồm thuế và phí dịch vụ</div>
            </div>
          </div>
          <Link href="/payment">
            <Button className="w-full bg-[#0a0a0a] hover:bg-[#000000] text-white py-3 rounded-lg">Hoàn tất</Button>
          </Link>
        </div>
      )}

      {/* Spacer for bottom bar */}
      <div className="h-28" />
    </div>
  )
}
