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
import { Star } from "lucide-react"

interface ReviewsDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function ReviewsDrawer({ isOpen, onClose }: ReviewsDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold text-[#0a0a0a]">Đánh giá khách sạn</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-600">
            Xem những gì khách hàng của chúng tôi nói về trải nghiệm của họ.
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4 text-gray-700 leading-relaxed">
          <div className="mb-6 border-b pb-4">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm font-semibold">Tuyệt vời</span>
            </div>
            <p className="text-sm text-gray-800 mb-2">
              "Khách sạn rất đẹp, phòng ốc sạch sẽ và tiện nghi. Nhân viên thân thiện và nhiệt tình. Vị trí thuận lợi để
              khám phá thành phố. Chắc chắn sẽ quay lại!"
            </p>
            <p className="text-xs text-gray-500">- Nguyễn Văn A, 15/05/2025</p>
          </div>

          <div className="mb-6 border-b pb-4">
            <div className="flex items-center mb-2">
              {[...Array(4)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <Star className="h-5 w-5 text-gray-300" />
              <span className="ml-2 text-sm font-semibold">Rất tốt</span>
            </div>
            <p className="text-sm text-gray-800 mb-2">
              "Trải nghiệm tốt, phòng rộng rãi và có view đẹp. Bữa sáng đa dạng. Có một chút tiếng ồn từ đường phố nhưng
              không đáng kể."
            </p>
            <p className="text-xs text-gray-500">- Trần Thị B, 10/05/2025</p>
          </div>

          <div className="mb-6 border-b pb-4">
            <div className="flex items-center mb-2">
              {[...Array(5)].map((_, i) => (
                <Star key={i} className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              ))}
              <span className="ml-2 text-sm font-semibold">Hoàn hảo</span>
            </div>
            <p className="text-sm text-gray-800 mb-2">
              "Mọi thứ đều hoàn hảo từ lúc check-in đến check-out. Dịch vụ xuất sắc, phòng ốc sang trọng. Rất hài lòng!"
            </p>
            <p className="text-xs text-gray-500">- Phạm Minh C, 01/05/2025</p>
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
