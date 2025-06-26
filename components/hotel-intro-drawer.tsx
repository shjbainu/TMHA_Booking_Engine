"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import { MapPin, Star, Sparkles } from "lucide-react"

export interface HotelIntroDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelAddress: string
  hotelName: string
}

export default function HotelIntroDrawer({ isOpen, onClose }: HotelIntroDrawerProps) {
  const hotelAddress = "The Mansion Hoi An"
  const mapUrl = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(hotelAddress)}`

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-gradient-to-b from-white via-gray-50 to-gray-100">
        {/* === Header === */}
        <div className="relative">
          <DrawerHeader className="absolute inset-0 bg-gradient-to-t from-black/80 to-transparent z-10 flex flex-col justify-end p-4 text-white">
            <DrawerTitle className="text-2xl font-bold">The Mansion Hoi An by Minova</DrawerTitle>
            <DrawerDescription className="text-sm text-gray-200 flex items-center gap-1.5 mt-1">
              <MapPin className="h-4 w-4" />
              <span className="whitespace-nowrap overflow-hidden text-ellipsis inline-block max-w-full align-bottom">
              170 Nguyễn Duy Hiệu, Cẩm Châu, Hội An, Quảng Nam
              </span>
            </DrawerDescription>
          </DrawerHeader>
          <div className="h-48 w-full relative">
            <Image
              src="/00_Final/Public/Entrance_1.jpg"
              alt="The Mansion Hoi An"
              layout="fill"
              objectFit="cover"
            />
          </div>
        </div>

        {/* === Phần thân === */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 space-y-6 text-justify text-gray-700">
            
            {/* Về chúng tôi */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Về chúng tôi</h3>
              <p>
                Lưu trú tại The Mansion Hoi An by Minova là một lựa chọn tuyệt vời khi bạn ghé thăm phường Cẩm Châu. Lễ tân phục vụ 24 giờ luôn sẵn sàng hỗ trợ bạn từ khi nhận phòng đến khi trả phòng, cũng như bất kỳ yêu cầu nào khác. Nếu bạn cần hỗ trợ thêm, đừng ngần ngại liên hệ với lễ tân — chúng tôi luôn sẵn sàng phục vụ bạn. WiFi có sẵn tại các khu vực công cộng của khách sạn để giúp bạn giữ kết nối với gia đình và bạn bè.

              </p>
            </div>

            {/* Vị trí đắc địa */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Vị trí đắc địa</h3>
              <p className="mb-3">
                Từ khách sạn, du khách dễ dàng di chuyển đến các địa điểm nổi tiếng như phố cổ Hội An, chùa cầu Nhật Bản, chợ Hội An, bãi biển An Bàng chỉ trong 10–25 phút lái xe.
              </p>

              <Button asChild variant="outline" className="w-full flex items-center">
                <a
                  href={mapUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center"
                >
                  <MapPin className="mr-2 h-4 w-4 flex-shrink-0" />
                  Xem trên bản đồ
                </a>
              </Button>
            </div>

            {/* Dịch vụ & Đội ngũ */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-2">Dịch vụ & Đội ngũ</h3>
              <p>
                Đội ngũ nhân viên thân thiện, chuyên nghiệp, có thể giao tiếp bằng tiếng Việt, Anh và Nhật, luôn sẵn
                sàng phục vụ 24/7. Chúng tôi cung cấp các dịch vụ như cho thuê xe, đưa đón sân bay và giặt ủi để đảm bảo
                trải nghiệm tiện lợi nhất cho quý khách.
              </p>
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
