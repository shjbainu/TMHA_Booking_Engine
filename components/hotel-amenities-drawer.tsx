"use client"

import { ReactNode, cloneElement, isValidElement, ReactElement } from "react"
import { Drawer, DrawerContent, DrawerTitle } from "@/components/ui/drawer"
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
  Smartphone,
  Waves,
} from "lucide-react"

interface HotelAmenitiesDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

function cloneIcon(icon: ReactNode): ReactNode {
  if (isValidElement(icon)) {
    return cloneElement(icon as ReactElement<any>, {
      className: "h-5 w-5",
    })
  }
  return icon
}

export default function HotelAmenitiesDrawer({
  isOpen,
  onClose,
  hotelName,
}: HotelAmenitiesDrawerProps) {
  const amenitiesByCategory = [
    {
      category: "Tiện nghi nổi bật",
      items: [
        { icon: <Wifi />, label: "Wi-Fi miễn phí" },
        { icon: <Snowflake />, label: "Điều hòa" },
        { icon: <Tv2 />, label: "Smart TV" },
        { icon: <Sparkles />, label: "Dọn phòng" },
        { icon: <Waves />, label: "Bể bơi" },
      ],
    },
    {
      category: "Phòng ngủ",
      items: [
        { icon: <BedDouble />, label: "Giường cỡ King" },
        { icon: <BedDouble />, label: "Giường cỡ Queen" },
        { icon: <BedDouble />, label: "Giường đơn" },
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
        { icon: <CreditCard />, label: "Khóa an toàn" },
        { icon: <FireExtinguisher />, label: "PCCC" },
      ],
    },
    {
      category: "Công nghệ cao cấp",
      items: [
        { icon: <Smartphone />, label: "Điều khiển phòng thông minh" },
      ],
    },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-white">
        {/* ✅ Bắt buộc phải có DialogTitle hoặc DrawerTitle */}
        <DrawerTitle className="text-xl font-semibold px-6 pt-4 pb-2 text-gray-900">
          Tiện nghi tại {hotelName}
        </DrawerTitle>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="space-y-8">
            {amenitiesByCategory.map((category) => (
              <div key={category.category}>
                <h3 className="text-lg font-semibold text-gray-800 mb-4">{category.category}</h3>
                <div className="grid grid-cols-4 gap-x-4 gap-y-6">
                  {category.items.map((amenity) => (
                    <div
                      key={amenity.label}
                      className="flex flex-col items-center justify-start gap-2 text-center"
                    >
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-black text-white">
                        {cloneIcon(amenity.icon)}
                      </div>
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