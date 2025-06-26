// components/emails/hotel-booking-email.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Heading, Text, Section, Hr, Row, Column } from '@react-email/components';

export interface HotelEmailProps {
  customer: { name: string; email: string; phone: string };
  bookings: any[]; // === SỬA ĐỔI: Nhận vào một mảng các booking ===
  bookingCode: string;
}

export const HotelBookingEmail: React.FC<Readonly<HotelEmailProps>> = ({ customer, bookings, bookingCode }) => {
  const overallTotal = bookings.reduce((sum, booking) => sum + booking.bookingTotalPrice, 0);

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ backgroundColor: '#ffffff', margin: '0 auto', padding: '20px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
          <Heading as="h1">Có đặt phòng mới!</Heading>
          
          <Section>
            <Heading as="h2" style={{ fontSize: '18px' }}>Mã đơn đặt phòng: {bookingCode}</Heading>
            <Heading as="h2" style={{ fontSize: '18px' }}>Thông tin khách hàng</Heading>
            <Text><strong>Tên:</strong> {customer.name}</Text>
            <Text><strong>Email:</strong> {customer.email}</Text>
            <Text><strong>Điện thoại:</strong> {customer.phone}</Text>
          </Section>
          
          <Hr />
          
          <Heading as="h2" style={{ fontSize: '18px' }}>Chi tiết đặt phòng</Heading>
          
          {/* === SỬA ĐỔI: Lặp qua từng booking để hiển thị === */}
          {bookings.map((booking, index) => (
             <Section key={booking.id} style={{ marginBottom: '20px', border: '1px solid #eee', padding: '10px', borderRadius: '5px' }}>
              <Heading as="h3" style={{ fontSize: '16px', marginTop: 0 }}>Booking #{index + 1}</Heading>
              <Text><strong>Ngày nhận phòng:</strong> {booking.checkInDate}</Text>
              <Text><strong>Ngày trả phòng:</strong> {booking.checkOutDate}</Text>
              <Text><strong>Các phòng đã đặt:</strong></Text>
              {booking.rooms.map((room: any) => (
  <div key={room.id} style={{ margin: '0 0 10px 15px' }}>
    <Text>• {room.name} x{room.quantity}</Text>
    {room.policies && (
      <ul style={{ margin: '0 0 0 15px', padding: 0, fontSize: 13 }}>
        {room.policies.breakfast && <li>Bữa sáng: {room.policies.breakfast}</li>}
        {room.policies.cancellation && <li>Chính sách hủy: {room.policies.cancellation}</li>}
        {/* Thêm các trường khác nếu có */}
      </ul>
    )}
  </div>
))}
              <Text><strong>Tổng tiền booking này:</strong> {booking.bookingTotalPrice.toLocaleString('vi-VN')}đ</Text>
            </Section>
          ))}

          <Hr />
          
          <Row style={{ marginTop: '20px' }}>
            <Column><Heading as="h2">TỔNG THANH TOÁN</Heading></Column>
            <Column align="right"><Heading as="h2">{overallTotal.toLocaleString('vi-VN')}đ</Heading></Column>
          </Row>

        </Container>
      </Body>
    </Html>
  );
};