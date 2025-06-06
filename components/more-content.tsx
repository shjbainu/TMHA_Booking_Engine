"use client"

export function MoreContent() {
  const sections = [
    {
      title: "Chính sách khách sạn",
      items: [
        "Nhận phòng: 14:00",
        "Trả phòng: 12:00",
        "Hủy miễn phí trước 24h",
        "Không hút thuốc trong phòng",
        "Cho phép thú cưng (phụ phí)",
        "Trẻ em dưới 12 tuổi miễn phí",
      ],
    },
    {
      title: "Thông tin liên hệ",
      items: [
        "📞 Hotline: 1900 1234",
        "📧 Email: info@69boutique.com",
        "🌐 Website: www.69boutique.com",
        "📱 Facebook: 69 Boutique Hotel",
        "📷 Instagram: @69boutique",
        "💬 Zalo: 0901234567",
      ],
    },
    {
      title: "Hỗ trợ khách hàng",
      items: [
        "Tư vấn đặt phòng 24/7",
        "Hỗ trợ kỹ thuật",
        "Giải quyết khiếu nại",
        "Chăm sóc khách hàng VIP",
        "Hướng dẫn sử dụng dịch vụ",
        "Thông tin khuyến mãi",
      ],
    },
  ]

  return (
    <div className="space-y-6">
      {sections.map((section, index) => (
        <div key={index} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">{section.title}</h3>
          <div className="space-y-3">
            {section.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-blue-400 rounded-full flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}

      {/* Emergency Contact */}
      <div className="bg-red-50 rounded-lg p-4 mt-6">
        <h3 className="text-lg font-semibold text-red-800 mb-3">Liên hệ khẩn cấp</h3>
        <div className="space-y-2">
          <p className="text-red-700">🚨 Cấp cứu: 115</p>
          <p className="text-red-700">🚒 Cứu hỏa: 114</p>
          <p className="text-red-700">👮 Công an: 113</p>
          <p className="text-red-700">🏨 Lễ tân khách sạn: 0901234567</p>
        </div>
      </div>
    </div>
  )
}
