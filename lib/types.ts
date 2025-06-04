export interface Room {
  id: string
  name: string
  type: string
  beds: string
  amenities: string[]
  area: string
  guests: number
  rooms: number
  price: number
  images: string[]
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
