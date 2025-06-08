"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
  DrawerFooter,
  DrawerClose,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import {
  BedDouble,
  Bath,
  Sofa,
  Wifi,
  Tv,
  AirVent,
  Wind,
  ShieldCheck,
  Flame,
  UserCheck,
  Sparkles,
  Coffee,
} from "lucide-react"

interface HotelAmenitiesDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

export default function HotelAmenitiesDrawer({ isOpen, onClose, hotelName }: HotelAmenitiesDrawerProps) {
  // === Phân loại tiện ích thành các nhóm logic ===
  const amenitiesByCategory = [
    {
      category: "Tiện nghi nổi bật",
      items: [
        { icon: <Wifi />, label: "Wi-Fi miễn phí" },
        { icon: <AirVent />, label: "Điều hòa không khí" },
        { icon: <Tv />, label: "Smart TV màn hình phẳng" },
        { icon: <Sparkles />, label: "Dọn phòng hàng ngày" },
      ],
    },
    {
      category: "Phòng ngủ",
      items: [
        { icon: <BedDouble />, label: "Giường cỡ King" },
        { icon: <Sofa />, label: "Ghế Sofa" },
        { icon: <Wind />, label: "Phòng cách âm" },
      ],
    },
    {
      category: "Phòng tắm",
      items: [
        { icon: <Bath />, label: "Bồn tắm riêng" },
        { icon: <Coffee />, label: "Vòi sen cây" }, // Using a different icon for Shower
        { icon: <UserCheck />, label: "Đồ dùng vệ sinh cá nhân" }, // Using a different icon for Toiletries
      ],
    },
    {
      category: "An toàn & An ninh",
      items: [
        { icon: <ShieldCheck />, label: "Khóa thẻ từ" },
        { icon: <Flame />, label: "Báo cháy & Bình chữa cháy" },
      ],
    },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-gray-50">
        <DrawerHeader className="text-left p-4 border-b bg-white">
          <DrawerTitle className="text-xl font-bold text-gray-900">Tiện nghi tại {hotelName}</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-500">
            Khám phá các dịch vụ và tiện nghi của chúng tôi
          </DrawerDescription>
        </DrawerHeader>

        {/* === Phần thân có thể cuộn === */}
        <div className="flex-1 overflow-y-auto p-4">
          <div className="space-y-8">
            {amenitiesByCategory.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {category.items.map((amenity) => (
                    <div key={amenity.label} className="flex items-center gap-4 p-3 bg-white rounded-lg shadow-sm">
                      <div className="flex-shrink-0 h-10 w-10 bg-gray-100 rounded-lg flex items-center justify-center text-gray-600">
                        {amenity.icon}
                      </div>
                      <span className="font-medium text-gray-700">{amenity.label}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* === Footer === */}
        <DrawerFooter className="border-t bg-white">
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
