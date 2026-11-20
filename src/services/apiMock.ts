import { MenuItem, CollectionItem, CoffeeEvent, ReservationFormData, CheckoutFormData, CartItem } from '@/types';
import { MOCK_MENU, MOCK_COLLECTIONS, MOCK_EVENTS } from '@/data/mockData';

// Giả lập network delay để trải nghiệm UI mượt mà với loading skeleton / spinners
const delay = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  message: string;
}

export interface OrderResult {
  orderId: string;
  customerName: string;
  totalAmount: number;
  discount: number;
  finalAmount: number;
  estimatedTime: string;
  orderType: string;
}

export const apiMock = {
  // 1. Lấy danh sách menu
  async getMenu(): Promise<ApiResponse<MenuItem[]>> {
    await delay(300);
    return {
      success: true,
      data: MOCK_MENU,
      message: 'Lấy thực đơn thành công',
    };
  },

  // 2. Lấy bộ sưu tập mới
  async getCollections(): Promise<ApiResponse<CollectionItem[]>> {
    await delay(250);
    return {
      success: true,
      data: MOCK_COLLECTIONS,
      message: 'Lấy bộ sưu tập thành công',
    };
  },

  // 3. Lấy sự kiện đang diễn ra
  async getEvents(): Promise<ApiResponse<CoffeeEvent[]>> {
    await delay(250);
    return {
      success: true,
      data: MOCK_EVENTS,
      message: 'Lấy danh sách sự kiện thành công',
    };
  },

  // 4. Đặt bàn trực tuyến
  async createReservation(data: ReservationFormData): Promise<ApiResponse<{ reservationId: string }>> {
    await delay(600);
    if (!data.fullName || !data.phone || !data.date || !data.time) {
      return {
        success: false,
        message: 'Vui lòng điền đầy đủ các thông tin bắt buộc.',
      };
    }
    const reservationId = 'RES-' + Math.floor(100000 + Math.random() * 900000);
    return {
      success: true,
      data: { reservationId },
      message: `Đặt bàn thành công! Mã giữ chỗ của bạn là #${reservationId}. Nhân viên Hacha sẽ gọi xác nhận trong 10 phút.`,
    };
  },

  // 5. Đăng ký tham gia sự kiện
  async registerEvent(eventId: string, guest: { name: string; phone: string; count: number }): Promise<ApiResponse<{ ticketId: string }>> {
    await delay(500);
    const ticketId = 'EVT-TICKET-' + Math.floor(1000 + Math.random() * 9000);
    return {
      success: true,
      data: { ticketId },
      message: `Đăng ký vé tham gia thành công! Mã vé của bạn là #${ticketId}. Hẹn gặp bạn tại Hacha Phố Hạ!`,
    };
  },

  // 6. Áp dụng mã giảm giá
  async validateCoupon(code: string): Promise<ApiResponse<{ discountPercent: number; code: string }>> {
    await delay(300);
    const clean = code.trim().toUpperCase();
    if (clean === 'HACHA10' || clean === 'PHOHA10') {
      return {
        success: true,
        data: { discountPercent: 10, code: clean },
        message: 'Áp dụng mã ưu đãi thành công: Giảm 10% tổng hóa đơn!',
      };
    }
    if (clean === 'WELCOME' || clean === 'HACHA20') {
      return {
        success: true,
        data: { discountPercent: 20, code: clean },
        message: 'Áp dụng mã giảm giá 20% cho thành viên mới!',
      };
    }
    return {
      success: false,
      message: 'Mã ưu đãi không hợp lệ hoặc đã hết hạn. Hãy thử "HACHA10" nhé!',
    };
  },

  // 7. Tạo đơn hàng (Checkout)
  async createOrder(formData: CheckoutFormData, cartItems: CartItem[], discountAmount: number): Promise<ApiResponse<OrderResult>> {
    await delay(700);
    if (!formData.fullName || !formData.phone) {
      return {
        success: false,
        message: 'Vui lòng cung cấp họ tên và số điện thoại nhận hàng.',
      };
    }
    const totalRaw = cartItems.reduce((acc, it) => acc + it.itemTotalPrice, 0);
    const final = Math.max(0, totalRaw - discountAmount);
    const orderId = 'HC-' + Math.floor(100000 + Math.random() * 900000);

    return {
      success: true,
      data: {
        orderId,
        customerName: formData.fullName,
        totalAmount: totalRaw,
        discount: discountAmount,
        finalAmount: final,
        estimatedTime: formData.orderType === 'dine-in' ? '5 - 10 phút' : '20 - 30 phút',
        orderType: formData.orderType,
      },
      message: `Đơn hàng #${orderId} đã được tiếp nhận thành công! Barista đang chuẩn bị món cho bạn.`,
    };
  },
};
