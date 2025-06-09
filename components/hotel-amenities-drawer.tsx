"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
// import { Button } from "@/components/ui/button" // Button không được sử dụng, có thể xóa
import {
  BedDouble,
  Bath,
  Sofa,
  Wifi,
  Tv2, // Thay Tv bằng Tv2
  Snowflake, // Thay AirVent
  EarOff, // Thay Wind
  CreditCard, // Thay ShieldCheck
  FireExtinguisher, // Thay Flame
  Sparkles,
  ShowerHead, // Thay Coffee
  Droplets, // Thay UserCheck
} from "lucide-react"
import { ReactElement, cloneElement } from "react" // cloneElement an toàn hơn

interface HotelAmenitiesDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

export default function HotelAmenitiesDrawer({
  isOpen,
  onClose,
  hotelName,
}: HotelAmenitiesDrawerProps) {
  // === Phân loại tiện ích với icon đã được cập nhật ===
  const amenitiesByCategory = [
    {
      category: "Tiện nghi nổi bật",
      color: "from-yellow-400 via-red-400 to-pink-500",
      items: [
        { icon: <Wifi />, label: "Wi-Fi miễn phí" },
        { icon: <Snowflake />, label: "Điều hòa không khí" },
        { icon: <Tv2 />, label: "Smart TV màn hình phẳng" },
        { icon: <Sparkles />, label: "Dọn phòng hàng ngày" },
      ],
    },
    {
      category: "Phòng ngủ",
      color: "from-purple-400 via-indigo-500 to-blue-500",
      items: [
        { icon: <BedDouble />, label: "Giường cỡ King" },
        { icon: <Sofa />, label: "Ghế Sofa" },
        { icon: <EarOff />, label: "Phòng cách âm" },
      ],
    },
    {
      category: "Phòng tắm",
      color: "from-green-400 via-teal-400 to-cyan-500",
      items: [
        { icon: <Bath />, label: "Bồn tắm riêng" },
        { icon: <ShowerHead />, label: "Vòi sen cây" },
        { icon: <Droplets />, label: "Đồ dùng vệ sinh cá nhân" },
      ],
    },
    {
      category: "An toàn & An ninh",
      color: "from-orange-400 via-pink-500 to-red-500",
      items: [
        { icon: <CreditCard />, label: "Khóa thẻ từ" },
        { icon: <FireExtinguisher />, label: "Báo cháy & Bình chữa cháy" },
      ],
    },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-gray-50">
        <DrawerHeader className="text-left p-4 border-b bg-white">
          <DrawerTitle className="text-xl font-bold text-gray-900">
            Tiện nghi tại {hotelName}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-gray-500">
            Khám phá các dịch vụ và tiện nghi của chúng tôi
          </DrawerDescription>
        </DrawerHeader>

        {/* Nội dung tiện ích */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-10">
            {amenitiesByCategory.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {category.category}
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.items.map((amenity) => (
                    <div
                      key={amenity.label}
                      className="flex items-center gap-4 p-4 bg-white rounded-xl shadow-md"
                    >
                      <div
                        className={`flex-shrink-0 h-12 w-12 rounded-xl bg-gradient-to-br ${category.color} flex items-center justify-center text-white shadow-lg`}
                      >
                        {cloneIcon(amenity.icon)}
                      </div>
                      <span className="font-medium text-gray-800">
                        {amenity.label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}

// Helper: Clone icon với className lớn hơn
// Sử dụng cloneElement của React để an toàn hơn và đúng chuẩn hơn
function cloneIcon(icon: ReactElement) {
  return cloneElement(icon, { className: "h-6 w-6" })
}
