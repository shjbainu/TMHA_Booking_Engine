export interface Room {
  id: string
  name: string
  type: string
  beds: string
  amenities: string[]
  area: string
  guests: number
  rooms: number
  images: string[]
  priceWeekday: number; // Giá cho ngày trong tuần (T2-T5)
  priceWeekend: number; // Giá cho ngày cuối tuần (T6, T7, CN)
}

export interface Booking {
  id: string
  checkIn: string
  checkOut: string
  nights: number
  rooms: Room[]
  total: number
}

export interface Customer {
  name: string
  phone: string
  email: string
}

export interface PaymentMethod {
  id: string
  name: string
  icon: string
}
