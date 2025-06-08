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

interface HotelIntroDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function HotelIntroDrawer({ isOpen, onClose }: HotelIntroDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold text-[#0a0a0a] flex items-center justify-center gap-2">
            69 Boutique
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-external-link h-5 w-5 text-gray-500"
            >
              <path d="M15 3h6v6" />
              <path d="M10 14 21 3" />
              <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
            </svg>
          </DrawerTitle>
          <DrawerDescription className="text-sm text-gray-600">
            69.Ng 53, Nguyễn Ngọc Vũ, Trung Hoà Cầu Giấy, Hà Nội
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 text-gray-700 leading-relaxed">
          <ul className="list-disc list-inside space-y-4">
            <li>
              69 Boutique by Minova tọa lạc tại số 69 Ngõ 53 Nguyễn Ngọc Vũ, quận Cầu Giấy, Hà Nội – vị trí trung tâm
              nhưng vẫn giữ được sự yên tĩnh và riêng tư. Khách sạn có 15 phòng nghỉ được thiết kế theo nhiều phong cách
              từ tối giản hiện đại đến sang trọng ấm cúng, đầy đủ tiện nghi như điều hòa, TV, minibar, Wi-Fi tốc độ cao.
              Một số phòng cao cấp còn có bồn tắm jacuzzi riêng, phù hợp cho nhu cầu nghỉ ngơi, thư giãn.
            </li>
            <li>
              Giá phòng linh hoạt, từ 200.000 VNĐ/giờ đến 1.500.000 VNĐ/đêm, phù hợp với nhiều nhu cầu từ nghỉ ngắn đến
              lưu trú dài ngày. Từ khách sạn, du khách dễ dàng di chuyển đến các địa điểm nổi tiếng như Hồ Tây, Hồ Hoàn
              Kiếm, Lăng Bác, Văn Miếu chỉ trong 10–25 phút lái xe.
            </li>
            <li>
              Dịch vụ tại khách sạn bao gồm lễ tân 24/7, cho thuê xe, đưa đón sân bay, giặt ủi, thang máy tiện lợi. Nhân
              viên thân thiện, chuyên nghiệp, giao tiếp được bằng tiếng Việt, Anh và Nhật. Khách sạn được đánh giá cao
              trên Booking.com, MoMo, Trip.com nhờ không gian sạch sẽ, yên tĩnh và dịch vụ chu đáo. Đặt phòng dễ dàng
              với nhiều ưu đãi.
            </li>
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
