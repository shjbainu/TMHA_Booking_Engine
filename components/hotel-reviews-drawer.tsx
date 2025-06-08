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
import { Star, ThumbsUp, MessageSquare, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState } from "react"

interface HotelReviewsDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

export default function HotelReviewsDrawer({ isOpen, onClose, hotelName }: HotelReviewsDrawerProps) {
  // Bổ sung thêm dữ liệu để giao diện trông thực tế hơn
  const reviews = [
    {
      id: "1",
      name: "Vũ Nhật Minh",
      avatar: "https://github.com/shadcn.png", // Sử dụng ảnh thật để đẹp hơn
      rating: 5,
      date: "Tháng 8, 2024",
      comment: "Phòng thoáng mát, riêng tư, đúng như mong đợi. Nhân viên cũng rất nhiệt tình. Chắc chắn sẽ quay lại.",
      likes: 12,
      verified: true,
    },
    {
      id: "2",
      name: "Hoàng Vũ Sơn",
      avatar: "/placeholder-user.jpg",
      rating: 4,
      date: "Tháng 8, 2024",
      comment: "Khách sạn sạch sẽ, gọn gàng. Vị trí thuận tiện đi lại. Chỉ có điểm trừ là cách âm chưa tốt lắm.",
      likes: 5,
      verified: true,
    },
    {
      id: "3",
      name: "AlexWin",
      avatar: "https://randomuser.me/api/portraits/men/32.jpg",
      rating: 5,
      date: "Tháng 7, 2024",
      comment: "This is the best destination I've ever been to. The service is impeccable and the room view is breathtaking. Highly recommended!",
      likes: 25,
      verified: false,
    },
    {
      id: "4",
      name: "Hoàng Nhật Anh",
      avatar: "https://randomuser.me/api/portraits/women/44.jpg",
      rating: 5,
      date: "Tháng 7, 2024",
      comment: "Nhân viên thân thiện, dịch vụ rất oke. Bữa sáng đa dạng và ngon miệng. Mình rất hài lòng.",
      likes: 8,
      verified: true,
    },
    {
      id: "5",
      name: "Lê Trọng",
      avatar: "/placeholder-user.jpg",
      rating: 3,
      date: "Tháng 6, 2024",
      comment: "Mọi thứ ở mức ổn. Phòng hơi nhỏ so với hình ảnh. Được cái tiện nghi đầy đủ.",
      likes: 2,
      verified: true,
    },
  ]

  const [activeFilter, setActiveFilter] = useState("Tất cả")
  const filters = ["Tất cả", "5 sao", "4 sao", "3 sao", "Có bình luận"]

  const overallRating = (reviews.reduce((sum, review) => sum + review.rating, 0) / reviews.length).toFixed(1)

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-white">
        {/* === Header với tóm tắt điểm số === */}
        <DrawerHeader className="text-left p-4 border-b">
          <div className="flex items-center gap-4 mb-2">
            <div className="text-4xl font-bold text-[#0a0a0a]">{overallRating}</div>
            <div>
              <DrawerTitle className="text-xl font-bold text-[#0a0a0a]">Tuyệt vời</DrawerTitle>
              <DrawerDescription className="text-sm text-gray-500">
                Dựa trên {reviews.length} lượt đánh giá
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        {/* === Phần thân có thể cuộn === */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {/* === Bộ lọc dạng "Chips" === */}
            <div className="flex gap-2 mb-6 overflow-x-auto pb-2 scrollbar-hide">
              {filters.map((filter) => (
                <Button
                  key={filter}
                  variant="outline"
                  className={`rounded-full h-8 px-4 text-sm whitespace-nowrap ${
                    activeFilter === filter
                      ? "bg-black text-white border-black"
                      : "bg-white text-gray-700 border-gray-300"
                  }`}
                  onClick={() => setActiveFilter(filter)}
                >
                  {filter}
                </Button>
              ))}
            </div>

            {/* === Danh sách đánh giá được thiết kế lại === */}
            <div className="space-y-6">
              {reviews.map((review) => (
                <div key={review.id} className="flex items-start gap-4">
                  <Avatar className="h-10 w-10">
                    <AvatarImage src={review.avatar} alt={review.name} />
                    <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                  </Avatar>
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div>
                        <p className="font-semibold text-gray-900">{review.name}</p>
                        <div className="flex items-center gap-2 text-xs text-gray-500">
                           {/* Hiển thị sao và ngày tháng */}
                          <div className="flex items-center">
                            {Array.from({ length: 5 }).map((_, i) => (
                              <Star
                                key={i}
                                className={`h-3.5 w-3.5 ${
                                  i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                          <span>·</span>
                          <span>{review.date}</span>
                        </div>
                      </div>
                      {review.verified && (
                        <div className="flex items-center gap-1 text-xs text-green-600">
                           <CheckCircle className="h-4 w-4" />
                           <span>Đã ở lại</span>
                        </div>
                      )}
                    </div>

                    <p className="mt-2 text-gray-700 leading-relaxed">{review.comment}</p>
                    
                    {/* Các nút tương tác */}
                    <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                      <button className="flex items-center gap-1.5 hover:text-black transition-colors">
                        <ThumbsUp className="h-4 w-4" />
                        <span>{review.likes}</span>
                      </button>
                       <button className="flex items-center gap-1.5 hover:text-black transition-colors">
                        <MessageSquare className="h-4 w-4" />
                        <span>Trả lời</span>
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* === Footer === */}
        <DrawerFooter className="border-t bg-white">
          <Button variant="outline" onClick={onClose}>
            Đóng
          </Button>
        </DrawerFooter>
      </DrawerContent>
    </Drawer>
  )
}
