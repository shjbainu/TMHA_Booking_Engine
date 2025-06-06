"use client"

export function OverviewContent() {
  return (
    <div className="space-y-6">
      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Về 69 Boutique Hotel</h3>
        <p className="text-gray-600 leading-relaxed">
          69 Boutique Hotel là một khách sạn boutique sang trọng tọa lạc tại trung tâm thành phố. Với thiết kế hiện đại
          và dịch vụ đẳng cấp, chúng tôi mang đến cho quý khách những trải nghiệm nghỉ dưỡng tuyệt vời nhất.
        </p>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Tiện ích nổi bật</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">📶</span>
            </div>
            <span className="text-gray-700">WiFi miễn phí</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">🏊</span>
            </div>
            <span className="text-gray-700">Hồ bơi</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">🍽️</span>
            </div>
            <span className="text-gray-700">Nhà hàng</span>
          </div>
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <span className="text-blue-600 text-sm">🚗</span>
            </div>
            <span className="text-gray-700">Bãi đỗ xe</span>
          </div>
        </div>
      </div>

      <div className="space-y-4">
        <h3 className="text-lg font-semibold text-gray-900">Vị trí</h3>
        <div className="bg-gray-100 rounded-lg p-4">
          <p className="text-gray-600">📍 123 Đường ABC, Quận 1, TP.HCM</p>
          <p className="text-sm text-gray-500 mt-2">Cách sân bay 30 phút, trung tâm thành phố 5 phút</p>
        </div>
      </div>
    </div>
  )
}
