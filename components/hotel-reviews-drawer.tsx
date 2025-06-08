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
import { Star, ThumbsUp, MessageSquare, ChevronDown } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar" // Assuming Avatar component is available

interface HotelReviewsDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

export default function HotelReviewsDrawer({ isOpen, onClose, hotelName }: HotelReviewsDrawerProps) {
  const reviews = [
    {
      id: "1",
      name: "Vũ Nhật Minh",
      hotel: "The Sun Apartment",
      avatar: "/placeholder-user.jpg", // Placeholder image
      rating: 5,
      comment: "Thoáng mát riêng tư",
    },
    {
      id: "2",
      name: "Hoàng Vũ Sơn",
      hotel: "The Sun Apartment",
      avatar: "/placeholder-user.jpg", // Placeholder image
      rating: 5,
      comment: "Sạch sẽ, gọn gàng",
    },
    {
      id: "3",
      name: "AlexWin",
      hotel: "The Sun Apartment",
      avatar: "/placeholder-user.jpg", // Placeholder image
      rating: 5,
      comment: "This is best destination",
    },
    {
      id: "4",
      name: "Hoàng Nhật Anh",
      hotel: "The Sun Apartment",
      avatar: "/placeholder-user.jpg", // Placeholder image
      rating: 5,
      comment: "Nhân viên thân thiện, dịch vụ oke",
    },
    {
      id: "5",
      name: "Vũ Ánh Kiên",
      hotel: "The Sun Apartment",
      avatar: "/placeholder-user.jpg", // Placeholder image
      rating: 5,
      comment: "Thoáng mát riêng tư",
    },
    {
      id: "6",
      name: "Lê Trọng",
      hotel: "The Sun Apartment",
      avatar: "/placeholder-user.jpg", // Placeholder image
      rating: 5,
      comment: "Thoáng mát riêng tư",
    },
    {
      id: "7",
      name: "Vũ Kim Bính",
      hotel: "The Sun Apartment",
      avatar: "/placeholder-user.jpg", // Placeholder image
      rating: 5,
      comment: "Thoáng mát riêng tư",
    },
  ]

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col">
        <DrawerHeader className="text-center">
          <DrawerTitle className="text-2xl font-bold text-[#0a0a0a]">Đánh giá về {hotelName}</DrawerTitle>
          <DrawerDescription className="text-sm text-gray-600">
            Tổng hợp ý kiến từ khách hàng của chúng tôi
          </DrawerDescription>
        </DrawerHeader>
        <div className="flex-1 overflow-y-auto p-4">
          <div className="flex gap-2 mb-4">
            <Button className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium">Tất cả</Button>
            <Button
              variant="outline"
              className="bg-black text-white rounded-lg px-4 py-2 text-sm font-medium flex items-center gap-1"
            >
              Lượt đánh giá theo sao <ChevronDown className="h-4 w-4" />
            </Button>
          </div>

          <div className="space-y-4">
            {reviews.map((review) => (
              <div key={review.id} className="bg-gray-100 rounded-lg p-4 flex items-start gap-4">
                <Avatar className="h-12 w-12">
                  <AvatarImage src={review.avatar || "/placeholder.svg"} alt={review.name} />
                  <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div>
                      <p className="font-semibold text-[#0a0a0a]">{review.name}</p>
                      <p className="text-xs text-gray-600">{review.hotel}</p>
                    </div>
                    <div className="flex items-center">
                      {Array.from({ length: 5 }).map((_, i) => (
                        <Star
                          key={i}
                          className={`h-4 w-4 ${
                            i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                          }`}
                        />
                      ))}
                    </div>
                  </div>
                  <div className="flex items-center gap-2 text-sm text-gray-700 mb-2">
                    <MessageSquare className="h-4 w-4" />
                    <span>{review.comment}</span>
                  </div>
                  <div className="text-right">
                    <Button variant="ghost" size="icon" className="h-8 w-8">
                      <ThumbsUp className="h-5 w-5 text-gray-500" />
                    </Button>
                  </div>
                </div>
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
