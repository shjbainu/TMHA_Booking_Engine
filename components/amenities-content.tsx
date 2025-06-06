"use client"

export function AmenitiesContent() {
  const amenities = [
    {
      category: "Tiện ích phòng",
      items: [
        "Điều hòa không khí",
        "TV màn hình phẳng",
        "Minibar",
        "Két an toàn",
        "Máy sấy tóc",
        "Đồ vệ sinh cá nhân miễn phí",
      ],
    },
    {
      category: "Tiện ích khách sạn",
      items: ["WiFi miễn phí", "Hồ bơi ngoài trời", "Phòng gym", "Spa & massage", "Nhà hàng", "Quầy bar"],
    },
    {
      category: "Dịch vụ",
      items: ["Lễ tân 24/7", "Dịch vụ phòng", "Giặt ủi", "Đưa đón sân bay", "Thuê xe", "Tour du lịch"],
    },
    {
      category: "Giải trí",
      items: ["Bàn bi-a", "Karaoke", "Khu vui chơi trẻ em", "Sân tennis", "Câu lạc bộ đêm", "Khu BBQ"],
    },
  ]

  return (
    <div className="space-y-6">
      {amenities.map((category, index) => (
        <div key={index} className="space-y-3">
          <h3 className="text-lg font-semibold text-gray-900">{category.category}</h3>
          <div className="grid grid-cols-1 gap-3">
            {category.items.map((item, itemIndex) => (
              <div key={itemIndex} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-orange-400 rounded-full flex-shrink-0" />
                <span className="text-gray-700">{item}</span>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  )
}
