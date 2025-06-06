"use client"

export function ReviewsContent() {
  const reviews = [
    {
      name: "Nguyễn Văn A",
      rating: 5,
      date: "2 ngày trước",
      comment: "Khách sạn rất đẹp, phòng sạch sẽ, nhân viên thân thiện. Sẽ quay lại lần sau!",
      avatar: "🧑‍💼",
    },
    {
      name: "Trần Thị B",
      rating: 4,
      date: "1 tuần trước",
      comment: "Vị trí thuận tiện, gần trung tâm. Bữa sáng ngon. Chỉ có điều hồ bơi hơi nhỏ.",
      avatar: "👩‍💼",
    },
    {
      name: "Lê Minh C",
      rating: 5,
      date: "2 tuần trước",
      comment: "Dịch vụ tuyệt vời! Phòng rộng rãi, view đẹp. Đặc biệt là spa rất thư giãn.",
      avatar: "👨‍💻",
    },
    {
      name: "Phạm Thu D",
      rating: 4,
      date: "3 tuần trước",
      comment: "Khách sạn sang trọng, thiết kế hiện đại. Nhân viên nhiệt tình hỗ trợ.",
      avatar: "👩‍🎨",
    },
  ]

  const renderStars = (rating: number) => {
    return Array.from({ length: 5 }, (_, i) => (
      <span key={i} className={`text-sm ${i < rating ? "text-yellow-400" : "text-gray-300"}`}>
        ⭐
      </span>
    ))
  }

  return (
    <div className="space-y-6">
      {/* Overall Rating */}
      <div className="bg-orange-50 rounded-lg p-4">
        <div className="flex items-center justify-between">
          <div>
            <div className="flex items-center space-x-2">
              <span className="text-3xl font-bold text-orange-600">4.8</span>
              <div className="flex">{renderStars(5)}</div>
            </div>
            <p className="text-sm text-gray-600 mt-1">Dựa trên 127 đánh giá</p>
          </div>
          <div className="text-right">
            <p className="text-sm text-gray-600">Tuyệt vời</p>
            <p className="text-xs text-gray-500">Được khách yêu thích</p>
          </div>
        </div>
      </div>

      {/* Rating Breakdown */}
      <div className="space-y-3">
        <h3 className="text-lg font-semibold text-gray-900">Chi tiết đánh giá</h3>
        {[
          { label: "Sạch sẽ", score: 4.9 },
          { label: "Dịch vụ", score: 4.8 },
          { label: "Vị trí", score: 4.7 },
          { label: "Giá trị", score: 4.6 },
        ].map((item, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-gray-700">{item.label}</span>
            <div className="flex items-center space-x-2">
              <div className="w-20 h-2 bg-gray-200 rounded-full">
                <div className="h-full bg-orange-400 rounded-full" style={{ width: `${(item.score / 5) * 100}%` }} />
              </div>
              <span className="text-sm font-medium text-gray-900">{item.score}</span>
            </div>
          </div>
        ))}
      </div>

      {/* Individual Reviews */}
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Đánh giá từ khách hàng</h3>
        {reviews.map((review, index) => (
          <div key={index} className="border-b border-gray-100 pb-4 last:border-b-0">
            <div className="flex items-start space-x-3">
              <div className="w-10 h-10 bg-gray-100 rounded-full flex items-center justify-center">
                <span className="text-lg">{review.avatar}</span>
              </div>
              <div className="flex-1">
                <div className="flex items-center justify-between">
                  <h4 className="font-medium text-gray-900">{review.name}</h4>
                  <span className="text-xs text-gray-500">{review.date}</span>
                </div>
                <div className="flex items-center mt-1">{renderStars(review.rating)}</div>
                <p className="text-gray-600 mt-2 text-sm leading-relaxed">{review.comment}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
