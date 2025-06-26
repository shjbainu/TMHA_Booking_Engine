// app/actions/send-booking-email.ts
'use server';

import { Resend } from 'resend';
// Update the import path below if '@/lib/email-renderer' is incorrect
import { renderCustomerEmail, renderHotelEmail } from '@/lib/email-renderer';

const resend = new Resend(process.env.RESEND_API_KEY_2);
const hotelAdminEmail = process.env.HOTEL_ADMIN_EMAIL;

interface CustomerData {
  name: string;
  phone: string;
  email: string;
}

type BookingData = any;

export async function sendBookingConfirmationEmail(
  customerData: CustomerData,
  bookingData: BookingData[],
  bookingCode: string
) {
  // === THAY ĐỔI: Thêm kiểm tra biến môi trường ngay từ đầu ===
  if (!hotelAdminEmail) {
    console.error("LỖI CẤU HÌNH: Biến môi trường HOTEL_ADMIN_EMAIL chưa được thiết lập.");
    // Chúng ta vẫn tiếp tục để gửi mail cho khách, nhưng báo lỗi trong log.
    // Hoặc bạn có thể return lỗi ở đây nếu muốn:
    // return { error: "Lỗi hệ thống: Email quản lý chưa được cấu hình." };
  }

  try {
    const customerEmailHtml = await renderCustomerEmail({ 
      customerName: customerData.name, 
      bookings: bookingData,
      bookingCode
    })
    
    // Gửi email cho khách hàng trước
    const { error: customerEmailError } = await resend.emails.send({
      from: 'The Mansion Hoi An by Minova <booking@tmha.minova.vn>',
      to: [customerData.email],
      subject: `Xác nhận đặt phòng tại The Mansion Hoi An `,
      html: customerEmailHtml,
    });

    if (customerEmailError) {
      console.error("Lỗi gửi email cho khách hàng:", customerEmailError);
      return { error: "Không thể gửi email xác nhận cho khách hàng." };
    }

    // === THAY ĐỔI: Chỉ gửi mail cho quản lý nếu email đã được cấu hình ===
    if (hotelAdminEmail) {
      const hotelEmailHtml = await renderHotelEmail({
        customer: customerData,
        bookings: bookingData,
        bookingCode
      });

      const { error: hotelEmailError } = await resend.emails.send({
        from: 'Hệ Thống Đặt Phòng <booking@tmha.minova.vn>',
        to: [hotelAdminEmail],
        subject: `Có đặt phòng mới từ khách hàng: ${customerData.name}`,
        html: hotelEmailHtml,
      });

      if (hotelEmailError) {
        // Lỗi này không nên chặn người dùng, chỉ cần log lại để admin kiểm tra
        console.error("Lỗi gửi email cho khách sạn:", hotelEmailError);
      }
    }
    
    return { success: true };

  } catch (error) {
    console.error("Lỗi không xác định khi gửi email:", error);
    return { error: "Đã xảy ra lỗi hệ thống, vui lòng thử lại." };
  }
}