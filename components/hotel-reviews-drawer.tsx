"use client"

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerDescription,
} from "@/components/ui/drawer"
import { Button } from "@/components/ui/button"
import { Star, ThumbsUp, MessageSquare, CheckCircle } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { useState, useMemo } from "react"
import { Input } from "@/components/ui/input"
import Image from "next/image" // Import thêm component Image

interface HotelReviewsDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

// 1. Cập nhật kiểu dữ liệu của review
interface Review {
  id: string
  name: string
  avatar: string
  rating: number
  date: string
  comment: string
  likes: number
  verified: boolean
  isLikedByUser: boolean
  images?: string[] // Thêm thuộc tính hình ảnh (tùy chọn)
}

// 2. Cập nhật dữ liệu mẫu
const initialReviews: Omit<Review, "isLikedByUser">[] = [
  {
    id: "1",
    name: "Vũ Nhật Minh",
    avatar: "https://github.com/shadcn.png",
    rating: 5,
    date: "Tháng 8, 2024",
    comment: "Phòng thoáng mát, riêng tư, đúng như mong đợi. Nhân viên cũng rất nhiệt tình. Chắc chắn sẽ quay lại.",
    likes: 12,
    verified: true,
    // Thêm hình ảnh cho review này
    images: [
        "https://source.unsplash.com/random/800x600?hotel,room",
        "https://source.unsplash.com/random/800x601?hotel,view",
        "https://source.unsplash.com/random/800x602?hotel,bathroom"
    ],
  },
  {
    id: "2",
    name: "Hoàng Vũ Sơn",
    avatar: "https://randomuser.me/api/portraits/men/32.jpg",
    rating: 4,
    date: "Tháng 8, 2024",
    comment: "Khách sạn sạch sẽ, vị trí thuận tiện. Chỉ có điểm trừ là cách âm giữa các phòng chưa thực sự tốt.",
    likes: 18,
    verified: true,
  },
  {
    id: "3",
    name: "AlexWin",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    date: "Tháng 7, 2024",
    comment: "This is the best destination I've ever been to. The service is impeccable and the room view is breathtaking. Highly recommended!",
    likes: 25,
    verified: false,
  },
  {
    id: "4",
    name: "Trần Thu Trang",
    avatar: "https://randomuser.me/api/portraits/women/44.jpg",
    rating: 5,
    date: "Tháng 7, 2024",
    comment: "Không gian yên tĩnh, thư giãn tuyệt đối. Rất thích hợp để nghỉ dưỡng cuối tuần. Dịch vụ spa cũng rất tuyệt vời.",
    likes: 22,
    verified: true,
     // Thêm hình ảnh cho review này
    images: [
        "https://source.unsplash.com/random/800x603?hotel,spa"
    ],
  },
  // Các review khác giữ nguyên...
]

export default function HotelReviewsDrawer({ isOpen, onClose, hotelName }: HotelReviewsDrawerProps) {
  const [reviews, setReviews] = useState<Review[]>(
    initialReviews.map(r => ({ ...r, isLikedByUser: false }))
  );
  const [activeFilter, setActiveFilter] = useState("Tất cả")
  const [replyingTo, setReplyingTo] = useState<string | null>(null)
  const [replyText, setReplyText] = useState("")

  // 3. Thay đổi tên bộ lọc
  const filters = ["Tất cả", "5 sao", "4 sao", "Có hình ảnh"]

  const reviewsToShow = useMemo(() => reviews.filter(review => review.rating >= 4), [reviews]);

  const filteredReviews = useMemo(() => {
    switch(activeFilter) {
      case '5 sao': return reviewsToShow.filter(r => r.rating === 5);
      case '4 sao': return reviewsToShow.filter(r => r.rating === 4);
      // 3. Cập nhật logic lọc
      case 'Có hình ảnh': return reviewsToShow.filter(r => r.images && r.images.length > 0);
      default: return reviewsToShow;
    }
  }, [activeFilter, reviewsToShow]);
  
  // --- Các hàm xử lý sự kiện giữ nguyên ---
  const handleLike = (reviewId: string) => { setReviews(currentReviews => currentReviews.map(review => review.id === reviewId ? { ...review, isLikedByUser: !review.isLikedByUser, likes: review.isLikedByUser ? review.likes - 1 : review.likes + 1 } : review)) }
  const handleReplyClick = (reviewId: string) => { if (replyingTo === reviewId) { setReplyingTo(null); setReplyText(""); } else { setReplyingTo(reviewId); } }
  const handleSendReply = () => { if (!replyText.trim() || !replyingTo) return; console.log(`Đã gửi trả lời cho review ID ${replyingTo}: "${replyText}"`); setReplyingTo(null); setReplyText(""); }
  const overallRating = useMemo(() => (reviewsToShow.length === 0 ? "0.0" : (reviewsToShow.reduce((sum, review) => sum + review.rating, 0) / reviewsToShow.length).toFixed(1)), [reviewsToShow]);
  const ratingDescription = useMemo(() => { const ratingValue = parseFloat(overallRating); if (ratingValue >= 4.8) return "Xuất sắc"; if (ratingValue >= 4.5) return "Tuyệt vời"; if (ratingValue >= 4.0) return "Rất tốt"; return "Được đánh giá tốt"; }, [overallRating]);

  return (
    <Drawer open={isOpen} onOpenChange={(open) => !open && onClose()}>
      <DrawerContent className="h-[90vh] flex flex-col bg-white">
        {/* Header (giữ nguyên) */}
        <DrawerHeader className="text-left p-4 border-b bg-gradient-to-r from-purple-500 via-pink-500 to-yellow-400 text-white">
          <div className="flex items-center gap-4 mb-2">
            <div className="text-4xl font-bold">{overallRating}</div>
            <div>
              <DrawerTitle className="text-xl font-bold">{ratingDescription}</DrawerTitle>
              <DrawerDescription className="text-sm text-white/80">
                Dựa trên {reviewsToShow.length} lượt đánh giá
              </DrawerDescription>
            </div>
          </div>
        </DrawerHeader>

        {/* Thân cuộn được */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4">
            {/* Bộ lọc đã được cập nhật */}
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

            {/* Danh sách đánh giá */}
            <div className="space-y-6">
              {filteredReviews.length > 0 ? (
                filteredReviews.map((review) => (
                  <div key={review.id}>
                    <div className="flex items-start gap-4">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src={review.avatar} alt={review.name} />
                        <AvatarFallback>{review.name.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        {/* Thông tin user và rating (giữ nguyên) */}
                        <div className="flex items-center justify-between">
                            {/* ... */}
                        </div>
                        <p className="mt-2 text-gray-700 leading-relaxed">{review.comment}</p>
                        
                        {/* ========================================================================= */}
                        {/* 4. THÊM KHU VỰC HIỂN THỊ HÌNH ẢNH */}
                        {/* ========================================================================= */}
                        {review.images && review.images.length > 0 && (
                          <div className="mt-3 grid grid-cols-3 gap-2">
                            {review.images.map((imgUrl, index) => (
                              <div key={index} className="relative aspect-square rounded-lg overflow-hidden cursor-pointer">
                                <Image
                                  src={imgUrl}
                                  alt={`Hình ảnh đánh giá từ ${review.name} ${index + 1}`}
                                  fill
                                  className="object-cover transition-transform hover:scale-105"
                                  sizes="(max-width: 768px) 30vw, 100px"
                                />
                              </div>
                            ))}
                          </div>
                        )}
                        {/* ========================================================================= */}
                        
                        {/* Nút Like và Trả lời (giữ nguyên) */}
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          <button
                            className={`flex items-center gap-1.5 transition-colors ${review.isLikedByUser ? "text-blue-500 font-semibold" : "hover:text-black"}`}
                            onClick={() => handleLike(review.id)}
                          >
                            <ThumbsUp className={`h-4 w-4 ${review.isLikedByUser ? 'fill-blue-500' : ''}`} />
                            <span>{review.likes}</span>
                          </button>
                          <button
                            className="flex items-center gap-1.5 hover:text-black transition-colors"
                            onClick={() => handleReplyClick(review.id)}
                          >
                            <MessageSquare className="h-4 w-4" />
                            <span>Trả lời</span>
                          </button>
                        </div>
                      </div>
                    </div>
                    
                    {/* Ô nhập liệu trả lời (giữ nguyên) */}
                    {replyingTo === review.id && (
                      <div className="mt-4 pl-14 flex items-center gap-2">
                        <Input type="text" placeholder={`Trả lời ${review.name}...`} className="flex-1" value={replyText} onChange={(e) => setReplyText(e.target.value)} autoFocus />
                        <Button size="sm" onClick={handleSendReply}>Gửi</Button>
                      </div>
                    )}
                  </div>
                ))
              ) : (
                <div className="text-center py-10 text-gray-500">
                  <p>Không tìm thấy đánh giá phù hợp.</p>
                </div>
              )}
            </div>
          </div>
        </div>
      </DrawerContent>
    </Drawer>
  )
}
