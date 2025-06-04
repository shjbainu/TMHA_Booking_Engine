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

export interface PaymentMethod {
  id: string
  name: string
  icon: string
}

// New types for booking
export interface RoomSelectionDetails {
  roomId: string
  quantity: number
  policies: {
    breakfast: string | null
    cancellation: string | null
  }
}

export interface BookingEntry {
  id: string
  checkInDate: Date | null
  checkOutDate: Date | null
  selectedRooms: RoomSelectionDetails[]
  isCalendarOpen: boolean
}
