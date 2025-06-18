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
    pricing: {
      daily: 700000,
      overnight: 450000,
      hourly: {
        baseRate2Hours: 275000,
        additionalPerHour: 50000,
      },
    },
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
    pricing: {
      daily: 800000,
      overnight: 500000,
      hourly: {
        baseRate2Hours: 350000,
        additionalPerHour: 50000,
      },
    },
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
    pricing: {
      daily: 700000,
      overnight: 450000,
      hourly: {
        baseRate2Hours: 275000,
        additionalPerHour: 50000,
      },
    },
    images: ["/placeholder.svg?height=200&width=300"],
  },
  {
    id: "4",
    name: "Căn hộ hạng thương gia",
    type: "1 giường king, 2 giường đôi",
    beds: "1 giường king, 2 giường đôi",
    amenities: ["Hướng mặt phố", "Còn 3 phòng"],
    area: "30m2",
    guests: 3,
    rooms: 3,
    pricing: {
      daily: 1000000,
      overnight: 700000,
      hourly: {
        baseRate2Hours: 500000,
        additionalPerHour: 50000,
      },
    },
    images: ["/placeholder.svg?height=200&width=300"],
  },
]

export const paymentMethods: PaymentMethod[] = [
  { id: "visa_mastercard", name: "Thẻ tín dụng hoặc thẻ ghi nợ", icon: "💳" },
  { id: "momo", name: "Momo", icon: "📱" },
  { id: "zalopay", name: "ZaloPay", icon: "💰" },
  { id: "crypto", name: "Crypto", icon: "₿" },
]
