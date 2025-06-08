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

interface AmenitiesDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function AmenitiesDrawer({ isOpen, onClose }: AmenitiesDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold text-[#0a0a0a]">Tiện ích khách sạn</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-600">
            Khám phá các tiện nghi và dịch vụ mà khách sạn chúng tôi cung cấp.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 text-gray-700 leading-relaxed">
          <h3 className="text-lg font-semibold mb-2">Tiện nghi phòng</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Điều hòa không khí</li>
            <li>TV màn hình phẳng</li>
            <li>Minibar</li>
            <li>Phòng tắm riêng với vòi sen nước nóng/lạnh</li>
            <li>Wifi miễn phí</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Dịch vụ khách sạn</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Lễ tân 24/7</li>
            <li>Dịch vụ phòng</li>
            <li>Giặt là</li>
            <li>Bãi đỗ xe miễn phí</li>
            <li>Hồ bơi ngoài trời</li>
            <li>Nhà hàng và quán bar</li>
            <li>Phòng tập thể dục</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Các tiện ích khác</h3>
          <ul className="list-disc list-inside">
            <li>Khu vực tiếp khách chung</li>
            <li>Dịch vụ đưa đón sân bay (có tính phí)</li>
            <li>Cho thuê xe máy/ô tô</li>
          </ul>
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
