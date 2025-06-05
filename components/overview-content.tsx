import { Share } from "lucide-react"
import Link from "next/link"

export function OverviewContent() {
  return (
    <div className="p-4 space-y-4 overflow-y-auto h-full">
      <div className="flex items-center justify-between">
        <h1 className="text-xl font-bold text-[#0a0a0a]">69 Boutique</h1>
        <Link
          href="https://www.google.com/maps/search/69+Boutique+by+Minova"
          target="_blank"
          rel="noopener noreferrer"
          className="text-blue-600 flex items-center gap-1"
        >
          <Share className="h-4 w-4" />
        </Link>
      </div>
      <p className="text-sm text-gray-600">69.Ngõ 53, Nguyễn Ngọc Vũ, Trung Hòa Cầu Giấy, Hà Nội</p>

      <div className="space-y-3 text-sm text-[#0a0a0a]">
        <p>
          • 69 Boutique by Minova tọa lạc tại số 69 Ngõ 53 Nguyễn Ngọc Vũ, quận Cầu Giấy, Hà Nội – vị trí trung tâm
          nhưng vẫn giữ được sự yên tĩnh và riêng tư. Khách sạn có 15 phòng nghỉ được thiết kế theo nhiều phong cách tối
          giản hiện đại đến sang trọng ấm cúng, đầy đủ tiện nghi như điều hòa, TV, minibar, Wi-Fi tốc độ cao. Một số
          phòng cao cấp còn có bồn tắm jacuzzi riêng, phù hợp cho nhu cầu nghỉ ngơi, thư giãn.
        </p>
        <p>
          • Giá phòng linh hoạt, từ 200.000 VNĐ/giờ đến 1.500.000 VNĐ/đêm, phù hợp với nhiều nhu cầu từ nghỉ ngắn đến
          lưu trú dài ngày. Từ khách sạn, du khách dễ dàng di chuyển đến các địa điểm nổi tiếng như Hồ Tây, Hồ Hoàn
          Kiếm, Lăng Bác, Văn Miếu chỉ trong 10-25 phút lái xe.
        </p>
        <p>
          • Dịch vụ tại khách sạn bao gồm lễ tân 24/7, cho thuê xe, đưa đón sân bay, giặt ủi, thang máy tiện lợi. Nhân
          viên thân thiện, chuyên nghiệp, giao tiếp được bằng tiếng Việt, Anh và Nhật. Khách sạn được đánh giá cao trên
          Booking.com, MoMo, Trip.com nhờ không gian sạch sẽ, yên tĩnh và dịch vụ chu đáo. Đặt phòng dễ dàng với nhiều
          ưu đãi.
        </p>
      </div>
    </div>
  )
}
