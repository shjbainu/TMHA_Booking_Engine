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
import { Input } from "@/components/ui/input" // Import thêm Input

interface HotelReviewsDrawerProps {
  isOpen: boolean
  onClose: () => void
  hotelName: string
}

// Thêm isLikedByUser vào kiểu dữ liệu của review
interface Review {
  id: string
  name: string
  avatar: string
  rating: number
  date: string
  comment: string
  likes: number
  verified: boolean
  isLikedByUser: boolean // Trạng thái đã thích
}

const initialReviews: Omit<Review, "isLikedByUser">[] = [
  // ... (giữ nguyên dữ liệu review gốc của bạn)
  {
    id: "1",
    name: "Vũ Nhật Minh",
    avatar: "https://github.com/shadcn.png",
    rating: 5,
    date: "Tháng 8, 2024",
    comment: "Phòng thoáng mát, riêng tư, đúng như mong đợi. Nhân viên cũng rất nhiệt tình. Chắc chắn sẽ quay lại.",
    likes: 12,
    verified: true,
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
  },
  {
    id: "5",
    name: "Lê Trọng",
    avatar: "/placeholder-user.jpg",
    rating: 4,
    date: "Tháng 7, 2024",
    comment: "Mọi thứ đều rất tốt. Tiện nghi đầy đủ và hiện đại. Bữa sáng có thể đa dạng hơn một chút thì sẽ hoàn hảo.",
    likes: 15,
    verified: true,
  },
  {
    id: "6",
    name: "Nguyễn Quang Huy",
    avatar: "https://randomuser.me/api/portraits/men/75.jpg",
    rating: 5,
    date: "Tháng 6, 2024",
    comment: "Dịch vụ khách hàng xuất sắc! Mọi yêu cầu của tôi đều được đáp ứng nhanh chóng và chuyên nghiệp. 10/10 điểm!",
    likes: 30,
    verified: true,
  },
]

export default function HotelReviewsDrawer({ isOpen, onClose, hotelName }: HotelReviewsDrawerProps) {
  // === QUẢN LÝ TRẠNG THÁI ĐỘNG ===
  const [reviews, setReviews] = useState<Review[]>(
    // Thêm isLikedByUser vào mỗi review khi khởi tạo
    initialReviews.map(r => ({ ...r, isLikedByUser: false }))
  );
  const [activeFilter, setActiveFilter] = useState("Tất cả")
  const [replyingTo, setReplyingTo] = useState<string | null>(null) // ID của review đang được trả lời
  const [replyText, setReplyText] = useState("") // Nội dung trả lời

  const filters = ["Tất cả", "5 sao", "4 sao", "Có bình luận"]

  const reviewsToShow = useMemo(() => reviews.filter(review => review.rating >= 4), [reviews]);

  const filteredReviews = useMemo(() => {
    switch(activeFilter) {
      case '5 sao': return reviewsToShow.filter(r => r.rating === 5);
      case '4 sao': return reviewsToShow.filter(r => r.rating === 4);
      case 'Có bình luận': return reviewsToShow.filter(r => r.comment && r.comment.length > 0);
      default: return reviewsToShow;
    }
  }, [activeFilter, reviewsToShow]);
  
  // === CÁC HÀM XỬ LÝ SỰ KIỆN ===
  const handleLike = (reviewId: string) => {
    setReviews(currentReviews =>
      currentReviews.map(review => {
        if (review.id === reviewId) {
          return {
            ...review,
            isLikedByUser: !review.isLikedByUser,
            likes: review.isLikedByUser ? review.likes - 1 : review.likes + 1,
          }
        }
        return review
      })
    )
  }

  const handleReplyClick = (reviewId: string) => {
    // Nếu đang trả lời review này rồi thì đóng lại, nếu không thì mở ra
    if (replyingTo === reviewId) {
      setReplyingTo(null)
      setReplyText("")
    } else {
      setReplyingTo(reviewId)
    }
  }

  const handleSendReply = () => {
    if (!replyText.trim() || !replyingTo) return;
    
    // Ở đây bạn có thể gửi bình luận lên server
    console.log(`Đã gửi trả lời cho review ID ${replyingTo}: "${replyText}"`);
    
    // Reset trạng thái sau khi gửi
    setReplyingTo(null);
    setReplyText("");
  }


  const overallRating = useMemo(() => {
    if (reviewsToShow.length === 0) return "0.0";
    return (reviewsToShow.reduce((sum, review) => sum + review.rating, 0) / reviewsToShow.length).toFixed(1)
  }, [reviewsToShow]);

  const ratingDescription = useMemo(() => {
    const ratingValue = parseFloat(overallRating);
    if (ratingValue >= 4.8) return "Xuất sắc";
    if (ratingValue >= 4.5) return "Tuyệt vời";
    if (ratingValue >= 4.0) return "Rất tốt";
    return "Được đánh giá tốt";
  }, [overallRating]);

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
            {/* Bộ lọc (giữ nguyên) */}
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
                        <div className="flex items-center justify-between">
                          <div>
                            <p className="font-semibold text-gray-900">{review.name}</p>
                            <div className="flex items-center gap-2 text-xs text-gray-500">
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
                        <div className="flex items-center gap-4 mt-3 text-sm text-gray-500">
                          {/* --- Nút Like đã được cập nhật --- */}
                          <button
                            className={`flex items-center gap-1.5 transition-colors ${
                              review.isLikedByUser ? "text-blue-500 font-semibold" : "hover:text-black"
                            }`}
                            onClick={() => handleLike(review.id)}
                          >
                            <ThumbsUp className={`h-4 w-4 ${review.isLikedByUser ? 'fill-blue-500' : ''}`} />
                            <span>{review.likes}</span>
                          </button>
                          {/* --- Nút Trả lời đã được cập nhật --- */}
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
                    
                    {/* --- Ô nhập liệu trả lời (hiển thị có điều kiện) --- */}
                    {replyingTo === review.id && (
                      <div className="mt-4 pl-14 flex items-center gap-2">
                        <Input
                          type="text"
                          placeholder={`Trả lời ${review.name}...`}
                          className="flex-1"
                          value={replyText}
                          onChange={(e) => setReplyText(e.target.value)}
                          autoFocus
                        />
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
