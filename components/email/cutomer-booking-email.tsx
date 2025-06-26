// components/emails/customer-booking-email.tsx
import * as React from 'react';
import { Html, Head, Body, Container, Heading, Text, Section, Hr, Row, Column } from '@react-email/components';

export interface CustomerEmailProps {
  customerName: string;
  bookings: any[]; // === SỬA ĐỔI: Nhận vào một mảng các booking ===
  bookingCode: string;
}

export const CustomerBookingEmail: React.FC<Readonly<CustomerEmailProps>> = ({ customerName, bookings, bookingCode }) => {
  // Tính tổng tiền của tất cả các booking
  const overallTotal = bookings.reduce((sum, booking) => sum + booking.bookingTotalPrice, 0);

  return (
    <Html>
      <Head />
      <Body style={{ backgroundColor: '#f6f6f6', fontFamily: 'Arial, sans-serif' }}>
        <Container style={{ backgroundColor: '#ffffff', margin: '0 auto', padding: '20px', borderRadius: '8px', border: '1px solid #eaeaea' }}>
          <Heading as="h1" style={{ color: '#333' }}>Cảm ơn bạn đã đặt phòng tại The Mansion Hoi An!</Heading>
          <Text style={{ color: '#555' }}>Chào {customerName},</Text>
          <Text style={{ color: '#555' }}>Chúng tôi đã xác nhận (các) đặt phòng của bạn. Dưới đây là thông tin chi tiết:</Text>
          
          <Hr />

          {/* === SỬA ĐỔI: Lặp qua từng booking để hiển thị === */}
          {bookings.map((booking, index) => (
            <Section key={booking.id} style={{ marginBottom: '20px' }}>
              <Heading as="h2" style={{ fontSize: '18px', borderBottom: '1px solid #eee', paddingBottom: '5px' }}>
                Mã booking: {bookingCode}
              </Heading>
              <Row>
                <Column><strong>Ngày nhận phòng:</strong></Column>
                <Column align="right">{booking.checkInDate}</Column>
              </Row>
              <Row>
                <Column><strong>Ngày trả phòng:</strong></Column>
                <Column align="right">{booking.checkOutDate}</Column>
              </Row>
              <Hr style={{ borderColor: '#eee', margin: '10px 0' }}/>
              <Text><strong>Các phòng đã đặt:</strong></Text>
              {/* === SỬA ĐỔI: Lặp qua từng phòng trong booking === */}
              {booking.rooms.map((room: any) => (
  <div key={room.id} style={{ margin: '0 0 10px 15px' }}>
    {/* Tên phòng nổi bật hơn, ví dụ màu xanh dương */}
    <Text style={{ color: '#1976d2', fontWeight: 600 }}>
      • {room.name} x{room.quantity}
    </Text>
    {room.policies && (
      <ul style={{ margin: '0 0 0 15px', padding: 0, fontSize: 13 }}>
        {room.policies.breakfast && (<li style={{ color: '#000' }}>Bữa sáng: {room.policies.breakfast}</li>)}
        {room.policies.cancellation && (<li style={{ color: '#000' }}>Chính sách hủy: {room.policies.cancellation}</li>)}
      </ul>
    )}
  </div>
))}
              <Hr style={{ borderColor: '#eee', margin: '10px 0' }}/>
              <Row>
                <Column><strong>Tổng tiền Booking #{index + 1}:</strong></Column>
                <Column align="right"><strong>{booking.bookingTotalPrice.toLocaleString('vi-VN')}đ</strong></Column>
              </Row>
            </Section>
          ))}

          <Hr />

          <Section style={{ marginTop: '20px' }}>
            <Row>
              <Column><Heading as="h2">TỔNG CỘNG</Heading></Column>
              <Column align="right"><Heading as="h2">{overallTotal.toLocaleString('vi-VN')}đ</Heading></Column>
            </Row>
          </Section>
          
          <Text>Chúng tôi rất mong được chào đón bạn.</Text>
          <Text>Trân trọng,<br/>Đội ngũ The Mansion Hoi An</Text>
        </Container>
      </Body>
    </Html>
  );
};