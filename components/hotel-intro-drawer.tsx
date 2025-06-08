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
import Image from "next/image"
import { MapPin, Star, Sparkles, ExternalLink } from "lucide-react"

interface HotelIntroDrawerProps {
  isOpen: boolean
  onClose: () => void
}

export default function HotelIntroDrawer({ isOpen, onClose }: HotelIntroDrawerProps) {
  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-gray-50">
        {/* === Header được thiết kế lại với hình ảnh === */}
        <div className="relative">
          <DrawerHeader className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex flex-col justify-end p-4 text-white">
            <DrawerTitle className="text-2xl font-bold">69 Boutique by Minova</DrawerTitle>
            <DrawerDescription className="text-sm text-gray-200 flex items-center gap-1.5 mt-1">
              <MapPin className="h-4 w-4" />
              <span>Nguyễn Ngọc Vũ, Cầu Giấy, Hà Nội</span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="h-48 w-full">
            <Image
              src="https://s3.go2joy.vn/1000w/hotel/543/9167_1722484553_66ab07495d890.webp" // Thay bằng ảnh đại diện của khách sạn
              alt="69 Boutique Hotel"
              layout="fill"
              objectFit="cover"
              className="rounded-t-lg"
            />
          </div>
        </div>

        {/* === Phần thân có thể cuộn === */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6">
            {/* === Các điểm nổi bật === */}
            <div>
                <h3 className="text-lg font-semibold text-gray-800 mb-3">Điểm nổi bật</h3>
                 <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                        <Star className="h-5 w-5 text-yellow-500" />
                        <span className="font-medium text-gray-700">Đánh giá cao</span>
                    </div>
                    <div className="flex items-center gap-2 p-3 bg-white rounded-lg shadow-sm">
                        <Sparkles className="h-5 w-5 text-blue-500" />
                        <span className="font-medium text-gray-700">Không gian riêng tư</span>
                    </div>
                 </div>
            </div>

            {/* === Đoạn giới thiệu === */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Về chúng tôi</h3>
              <p className="text-gray-600 leading-relaxed">
                69 Boutique by Minova tọa lạc tại vị trí trung tâm nhưng vẫn giữ được sự yên tĩnh và riêng tư. Với 15
                phòng nghỉ được thiết kế đa dạng phong cách, từ tối giản hiện đại đến sang trọng ấm cúng, chúng tôi đáp
                ứng mọi nhu cầu nghỉ dưỡng của bạn. Các phòng đều được trang bị đầy đủ tiện nghi cao cấp, một số phòng
                còn có bồn tắm jacuzzi riêng cho những giây phút thư giãn tuyệt đối.
              </p>
            </div>
            
             {/* === Vị trí === */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Vị trí đắc địa</h3>
              <p className="text-gray-600 leading-relaxed mb-3">
                 Từ khách sạn, du khách dễ dàng di chuyển đến các địa điểm nổi tiếng như Hồ Tây, Hồ Hoàn Kiếm, Lăng Bác,
                và Văn Miếu chỉ trong 10–25 phút lái xe.
              </p>
               <Button variant="outline" className="w-full">
                <MapPin className="mr-2 h-4 w-4" /> Xem trên bản đồ
              </Button>
            </div>

            {/* === Dịch vụ === */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dịch vụ & Đội ngũ</h3>
              <p className="text-gray-600 leading-relaxed">
                Đội ngũ nhân viên thân thiện, chuyên nghiệp, có thể giao tiếp bằng tiếng Việt, Anh và Nhật, luôn sẵn
                sàng phục vụ 24/7. Chúng tôi cung cấp các dịch vụ như cho thuê xe, đưa đón sân bay và giặt ủi để đảm bảo
                trải nghiệm tiện lợi nhất cho quý khách.
              </p>
            </div>
          </div>
        </div>

        {/* === Footer === */}
        <DrawerFooter className="border-t bg-white">
          <DrawerClose asChild>
            <Button variant="outline" onClick={onClose}>
              Đóng
            </Button>
          </DrawerClose>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
