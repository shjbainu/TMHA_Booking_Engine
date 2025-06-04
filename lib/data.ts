import type { Room, PaymentMethod } from "./types"

export const rooms: Room[] = [
  {
    id: "1",
    name: "Căn hộ 1 ngủ",
    type: "1 giường king, 2 giường đôi",
    beds: "1 giường king, 2 giường đôi",
    amenities: ["Hướng mặt phố", "Còn 3 phòng"],
    area: "30m2",
    guests: 3,
    rooms: 3,
    price: 500000,
    images: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: "2",
    name: "Căn hộ hạng sang",
    type: "1 giường king, 2 giường đôi",
    beds: "1 giường king, 2 giường đôi",
    amenities: ["Hướng mặt phố", "Còn 3 phòng"],
    area: "30m2",
    guests: 3,
    rooms: 3,
    price: 500000,
    images: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: "3",
    name: "Căn hộ hạng thương gia",
    type: "1 giường king, 2 giường đôi",
    beds: "1 giường king, 2 giường đôi",
    amenities: ["Hướng mặt phố", "Còn 3 phòng"],
    area: "30m2",
    guests: 3,
    rooms: 3,
    price: 500000,
    images: ["/placeholder.svg?height=200&width=300"],
  },
]

export const paymentMethods: PaymentMethod[] = [
  { id: "card", name: "Thẻ tín dụng hoặc thẻ ghi nợ", icon: "💳" },
  { id: "momo", name: "Momo", icon: "📱" },
  { id: "zalopay", name: "ZaloPay", icon: "💰" },
  { id: "crypto", name: "Crypto", icon: "₿" },
]
