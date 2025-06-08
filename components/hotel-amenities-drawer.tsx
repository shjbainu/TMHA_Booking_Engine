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
  BathIcon as Bathtub,
  Sofa,
  Wifi,
  Lightbulb,
  BellRing,
  TableIcon as Toilet,
  Lamp,
  ShipIcon as Sink,
  VolumeX,
} from "lucide-react"

interface HotelAmenitiesDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

export default function HotelAmenitiesDrawer({ isOpen, onClose, hotelName }: HotelAmenitiesDrawerProps) {
  const amenities = [
    { icon: <BedDouble className="h-8 w-8 text-white" />, label: "Giường đôi" },
    { icon: <Bathtub className="h-8 w-8 text-white" />, label: "Bồn tắm" },
    { icon: <Sofa className="h-8 w-8 text-white" />, label: "Ghế Sofa" },
    { icon: <Wifi className="h-8 w-8 text-white" />, label: "Wifi" },
    { icon: <Lightbulb className="h-8 w-8 text-white" />, label: "Đèn sưởi" },
    { icon: <BellRing className="h-8 w-8 text-white" />, label: "Báo cháy" },
    { icon: <Toilet className="h-8 w-8 text-white" />, label: "Bồn cầu" },
    { icon: <Lamp className="h-8 w-8 text-white" />, label: "Đèn ngủ" },
    { icon: <Sink className="h-8 w-8 text-white" />, label: "Bồn rửa mặt" },
    { icon: <VolumeX className="h-8 w-8 text-white" />, label: "Cách âm" },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold text-[#0a0a0a]">Tiện ích tại {hotelName}</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-600">
            Khám phá các dịch vụ và tiện nghi của chúng tôi
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="grid grid-cols-4 gap-y-6 gap-x-4 justify-items-center">
            {amenities.map((amenity, index) => (
              <div key={index} className="flex flex-col items-center text-center">
                <div className="w-16 h-16 rounded-full bg-black flex items-center justify-center mb-2">
                  {amenity.icon}
                </div>
                <span className="text-sm font-medium text-[#0a0a0a]">{amenity.label}</span>
              </div>
            ))}
          </div>
        </div>
        <DrawerFooter>
          <DrawerClose asChild>
            <Button variant="outline">Đóng</Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
