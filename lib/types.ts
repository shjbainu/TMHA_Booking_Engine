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
  pricing: {
    daily: number
    overnight: number
    hourly: {
      baseRate2Hours: number
      additionalPerHour: number
    }
  }
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
