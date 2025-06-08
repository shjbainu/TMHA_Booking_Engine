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

interface MoreInfoDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function MoreInfoDrawer({ isOpen, onClose }: MoreInfoDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold text-[#0a0a0a]">Thông tin thêm</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-600">
            Các thông tin chi tiết khác về khách sạn và chính sách.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 text-gray-700 leading-relaxed">
          <h3 className="text-lg font-semibold mb-2">Chính sách nhận/trả phòng</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Giờ nhận phòng: 14:00</li>
            <li>Giờ trả phòng: 12:00</li>
            <li>Yêu cầu nhận phòng sớm/trả phòng muộn có thể áp dụng phụ phí và tùy thuộc vào tình trạng phòng.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Chính sách trẻ em và giường phụ</h3>
          <ul className="list-disc list-inside mb-4">
            <li>Trẻ em dưới 6 tuổi được miễn phí khi ở chung giường với bố mẹ.</li>
            <li>Trẻ em từ 6-12 tuổi có thể áp dụng phụ phí.</li>
            <li>Giường phụ có sẵn theo yêu cầu và có tính phí.</li>
          </ul>

          <h3 className="text-lg font-semibold mb-2">Quy định về vật nuôi</h3>
          <p className="mb-4">Khách sạn không cho phép vật nuôi.</p>

          <h3 className="text-lg font-semibold mb-2">Thông tin liên hệ</h3>
          <ul className="list-disc list-inside">
            <li>Điện thoại: +84 123 456 789</li>
            <li>Email: info@69boutique.com</li>
            <li>Website: www.69boutique.com</li>
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
