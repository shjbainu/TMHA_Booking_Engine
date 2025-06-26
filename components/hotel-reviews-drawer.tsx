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
    name: "Vũ Nhật Ánh",
    avatar: "https://scontent.fhan2-3.fna.fbcdn.net/v/t39.30808-6/502486633_1373557483975045_769978862160278242_n.jpg?stp=cp6_dst-jpg_tt6&_nc_cat=108&ccb=1-7&_nc_sid=833d8c&_nc_eui2=AeGL1YdaRyJQMcFoBjRlseat2sBzMAA_CH7awHMwAD8IfrTCP0ChyEN2jLMdVSJq0nLexZ8y0aUoAIJ0L5m8flH-&_nc_ohc=N-cx10_sOMEQ7kNvwHTp58l&_nc_oc=AdnE5SBHkTNFm9bk0GtNkisHAs6baJfX-45mLRVO6DEmiACSPa4WQx-XOCLAULJV9g8&_nc_zt=23&_nc_ht=scontent.fhan2-3.fna&_nc_gid=bkj3WX8tSlKp71K_ol1xxg&oh=00_AfMHuHQRkhTINV2BDWn-OjDBwohLBRcvuvEr5BShTrM4tg&oe=68619F69",
    rating: 5,
    date: "Tháng 2, 2025",
    comment: "Phòng thoáng mát, riêng tư, đúng như mong đợi. Nhân viên cũng rất nhiệt tình. Chắc chắn sẽ quay lại.",
    likes: 12,
    verified: true,
    // Thêm hình ảnh cho review này
    images: [
        "/00_Final/Public/Alex Pool_8.jpg",
        "/00_Final/Public/Alex Pool_14.jpg",
        "/00_Final/Public/Backpool_6.jpg"
    ],
  },
  {
    id: "2",
    name: "Lê Ngọc Minh",
    avatar: "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/434152356_1486971345575839_6628096773211736152_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=6ee11a&_nc_eui2=AeGZ9DpEqmZdJVRoBcrOCKSsXCtiFd3yeGZcK2IV3fJ4Zq3j_f_7YA3n8sKB5oihPuLFNLjgI97-Ob6R_y9sCGop&_nc_ohc=_AN3IL3g2KwQ7kNvwFULJL0&_nc_oc=AdkU3xJ8zL3E2TsqS2yhJdIS3GR8H1mvtpGFqI8P7yK7W4MUIMWkJFUKWgVDNrAf6h0&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=zCZO7mp2bKcWxpfd47RRrA&oh=00_AfMOc_OP0pS02IFSC66w3IqW9n4OzY1OS_3p6qqed-5zvw&oe=686198A7",
    rating: 4,
    date: "Tháng 3, 2025",
    comment: "Khách sạn sạch sẽ, vị trí thuận tiện. Nhân viên take care nhiệt tình. Hồ bơi rất đẹp, phù hợp checkin sống ảo 😊",
    likes: 18,
    verified: true,
    images: [
        "/00_Final/Public/chung1.jpg",
    ],
  },
  {
    id: "3",
    name: "Atony Smith",
    avatar: "https://randomuser.me/api/portraits/men/4.jpg",
    rating: 5,
    date: "Tháng 4, 2025",
    comment: "This is the best destination I've ever been to. The service is impeccable and the room view is breathtaking. Highly recommended!",
    likes: 25,
    verified: false,
    images: [ 
        "/00_Final/Public/Floating Breakfast_3.jpeg",
        "/00_Final/Public/Floating Breakfast_5.jpeg",
        "/00_Final/Public/Public_2.jpg",
    ],
  },
  {
    id: "4",
    name: "Phạm Thu Trang",
    avatar: "https://scontent.fhan2-4.fna.fbcdn.net/v/t39.30808-6/484826397_2326664554399669_5836388249226436559_n.jpg?_nc_cat=110&ccb=1-7&_nc_sid=a5f93a&_nc_eui2=AeEQF6HfGMtuVSlUeAgrsW8mrZXMa9VdESOtlcxr1V0RI6vlJIjKyEYwldMziYjlOglksDiP528SC454YWzb50rt&_nc_ohc=Xyvji4C2guYQ7kNvwFqyewB&_nc_oc=AdlHsoRyqkgF3kii9D8BkiH0WtPa9wVGAjRlMrmqEq7Ws_8vOyd49vScs5HoL8-7wys&_nc_zt=23&_nc_ht=scontent.fhan2-4.fna&_nc_gid=P3Aii92H1Is0JCdZDQTJ_w&oh=00_AfOc8DDKVgfO56uU4SD4uECVZRazDxw9AEc1TUugH2bhhQ&oe=686196F2",
    rating: 5,
    date: "Tháng 3, 2025",
    comment: "Không gian yên tĩnh, thư giãn tuyệt đối. Rất thích hợp để nghỉ dưỡng cuối tuần. Dịch vụ spa cũng rất tuyệt vời.",
    likes: 22,
    verified: true,
    
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
        <DrawerHeader className="text-left p-4 border-b border-gray-200 bg-white">
  <div className="flex items-center gap-4 mb-1">
    <div className="text-5xl font-bold text-gray-900">{overallRating}</div>
    <div>
      <DrawerTitle className="text-lg font-semibold text-gray-900">{ratingDescription}</DrawerTitle>
      <DrawerDescription className="text-sm text-gray-500">
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
                        <div className="flex items-center gap-2">
  <span
  className="font-semibold text-gray-900"
  style={{
    whiteSpace: "nowrap",
    overflow: "hidden",
    textOverflow: "ellipsis",
    maxWidth: 120, // hoặc giá trị phù hợp với giao diện của bạn
    display: "inline-block",
    verticalAlign: "bottom"
  }}
>
  {review.name}
</span>
  <span className="flex items-center ml-2">
    {Array.from({ length: 5 }).map((_, i) => (
      <Star
        key={i}
        className={`h-4 w-4 ${i < review.rating ? "text-yellow-400 fill-yellow-400" : "text-gray-300"}`}
        strokeWidth={1.5}
      />
    ))}
  </span>
  <span className="ml-2 text-xs text-gray-500">{review.date}</span>
  
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
