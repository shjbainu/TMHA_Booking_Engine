// lib/email-renderer.tsx

import * as React from 'react';
import { render } from '@react-email/render';
import { CustomerBookingEmail, type CustomerEmailProps } from '@/components/email/cutomer-booking-email';
import { HotelBookingEmail, type HotelEmailProps } from '@/components/email/hotel-booking-email';

/**
 * Render component email của khách hàng thành chuỗi HTML.
 */
// === SỬA ĐỔI: Thêm async và Promise<string> ===
export async function renderCustomerEmail(props: CustomerEmailProps): Promise<string> {
  return render(<CustomerBookingEmail {...props} />);
}

/**
 * Render component email của khách sạn thành chuỗi HTML.
 */
// === SỬA ĐỔI: Thêm async và Promise<string> ===
export async function renderHotelEmail(props: HotelEmailProps): Promise<string> {
  return render(<HotelBookingEmail {...props} />);
}