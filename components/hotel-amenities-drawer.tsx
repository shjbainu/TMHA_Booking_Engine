"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import {
  BedDouble,
  Bath,
  Sofa,
  Wifi,
  Tv2,
  Snowflake,
  EarOff,
  CreditCard,
  FireExtinguisher,
  Sparkles,
  ShowerHead,
  Droplets,
} from "lucide-react"
import { ReactElement, cloneElement } from "react"

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
  // === Phân loại tiện ích (loại bỏ thuộc tính color không cần thiết) ===
  const amenitiesByCategory = [
    {
      category: "Tiện nghi nổi bật",
      items: [
        { icon: <Wifi />, label: "Wi-Fi miễn phí" },
        { icon: <Snowflake />, label: "Điều hòa" },
        { icon: <Tv2 />, label: "Smart TV" },
        { icon: <Sparkles />, label: "Dọn phòng" },
      ],
    },
    {
      category: "Phòng ngủ",
      items: [
        { icon: <BedDouble />, label: "Giường cỡ King" },
        { icon: <Sofa />, label: "Ghế Sofa" },
        { icon: <EarOff />, label: "Cách âm" },
      ],
    },
    {
      category: "Phòng tắm",
      items: [
        { icon: <Bath />, label: "Bồn tắm" },
        { icon: <ShowerHead />, label: "Vòi sen" },
        { icon: <Droplets />, label: "Đồ dùng VSCN" },
      ],
    },
    {
      category: "An toàn & An ninh",
      items: [
        { icon: <CreditCard />, label: "Khóa thẻ từ" },
        { icon: <FireExtinguisher />, label: "PCCC" },
      ],
    },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-white">
        <DrawerHeader className="text-left p-4 border-b">
          <DrawerTitle className="text-xl font-bold text-gray-900">
            Tiện nghi tại {hotelName}
          </DrawerTitle>
          <DrawerDescription className="text-sm text-gray-500">
            Tất cả các tiện nghi được cung cấp trong phòng
          </DrawerDescription>
        </DrawerHeader>

        {/* Nội dung tiện ích với layout mới */}
        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {amenitiesByCategory.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">
                  {category.category}
                </h3>
                {/* Thay đổi grid-cols để hiển thị nhiều item hơn trên một hàng */}
                <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                  {category.items.map((amenity) => (
                    // Thay đổi cấu trúc item sang flex-col để icon ở trên, text ở dưới
                    <div
                      key={amenity.label}
                      className="flex flex-col items-center justify-start gap-2 text-center"
                    >
                      {/* Vòng tròn đen bao quanh icon */}
                      <div
                        className="flex h-16 w-16 items-center justify-center rounded-full bg-black text-white"
                      >
                        {cloneIcon(amenity.icon)}
                      </div>
                      {/* Text bên dưới */}
                      <span className="text-sm font-medium text-gray-700">
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

// Helper: Clone icon với kích thước phù hợp
function cloneIcon(icon: ReactElement) {
  // Tăng kích thước icon cho phù hợp với vòng tròn lớn hơn
  return cloneElement(icon, { className: "h-8 w-8" })
}
