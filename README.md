# Hacha Phố Hạ Coffee - Official Website

Website trang chủ chính thức của quán cà phê **Hacha Phố Hạ**, được thiết kế theo phong cách tối giản (minimalism), thanh lịch (elegant) với bảng màu **sáng tone lạnh (cool-tone)** hiện đại chuẩn e-commerce.

---

## 🌟 Tính Năng Nổi Bật

1. **Header & Navigation thông minh**:
   - Thanh điều hướng kính mờ (Frosted Glassmorphism) tự động thích ứng khi cuộn trang.
   - Nút đặt bàn nhanh, nút mở giỏ hàng với hiệu ứng số lượng động và menu trượt mượt mà trên Mobile.
2. **Hero Section nghệ thuật**:
   - Tiêu đề nghệ thuật kết hợp phông chữ Serif thanh thoát (`Cormorant Garamond` & `Plus Jakarta Sans`).
   - Hình ảnh không gian và đồ uống thực tế của quán, các nhãn thông số: Chiết xuất Cold Drip 18 giờ, 100% Cà phê Arabica rang mộc.
3. **Phần Giới Thiệu (About Story)**:
   - Kể câu chuyện thương hiệu và 3 giá trị cốt lõi: Hạt Cà Phê Tuyển Lựa, Không Gian Sáng Lạnh Tinh Tế, và Trải Nghiệm Chân Thành.
   - Bố cục lưới hình ảnh nghệ thuật (Photo Mosaic) và chỉ số đánh giá 4.9/5 sao.
4. **Menu Quán Chuẩn E-Commerce (Thực đơn tương tác)**:
   - Bộ lọc đa danh mục: *Tất cả*, *Signature Phố Hạ*, *Cà phê Mộc*, *Cold Brew*, *Trà Hoa Quả Tươi*, *Bánh Ngọt*.
   - Thanh tìm kiếm tức thì theo tên món, mô tả, nguyên liệu.
   - Thẻ sản phẩm với giá VND, huy hiệu (*Signature*, *Bestseller*, *Món Mới*), nút thêm nhanh vào giỏ.
   - **Product Detail Modal**: Tùy chỉnh chi tiết kích cỡ (Size M / L), mức đường (0 - 100%), mức đá, nhiệt độ (Nóng / Đá), topping cao cấp (Kem cheese muối, thạch cà phê espresso, hạt sen...) và ghi chú riêng cho Barista.
5. **Bộ Sưu Tập Mới (Seasonal Collections)**:
   - Giới thiệu các bộ sưu tập theo mùa (*Hơi Thở Phố Hạ*, *Nghệ Thuật Cà Phê Mộc*, *Combo Bình Yên Sáng Sớm*).
   - Tầng hương chủ đạo và tính năng "Thêm Cả Bộ Sưu Tập Vào Giỏ" với 1 cú click.
6. **Các Sự Kiện Đang Diễn Ra (Events & Workshops)**:
   - Sự kiện Acoustic Night, Workshop Cupping V60, Góc đọc sách cuối tuần.
   - Huy hiệu trạng thái *Đang diễn ra*, *Sắp diễn ra*, thanh tiến trình số chỗ còn lại.
   - Modal đăng ký vé tham gia trực tuyến với mã giữ chỗ tự động.
7. **Không Gian Quán & Lightbox Preview**:
   - Thư viện ảnh thực tế của Hacha Phố Hạ: quầy bar, ánh sáng tự nhiên, góc bàn làm việc yên tĩnh.
   - Xem ảnh phóng to với chế độ Lightbox cao cấp.
8. **Bản Đồ Google Maps & Thông Tin Chi Tiết**:
   - Bản đồ Google Maps tương tác trực tiếp.
   - Thông tin hotline, địa chỉ, giờ mở cửa (07:00 - 22:30), thông tin Wifi và hướng dẫn bãi đỗ xe ô tô/xe máy miễn phí.
   - Đánh giá chân thực từ khách hàng thân thiết.
9. **Hệ Thống Giỏ Hàng (Cart Drawer) & Đặt Hàng (Checkout)**:
   - Slide-over Drawer quản lý số lượng, xóa món, áp dụng voucher ưu đãi (mã test: `HACHA10` hoặc `WELCOME`).
   - Modal thanh toán hỗ trợ 3 hình thức: *Dùng tại quán* (chọn số bàn), *Mang về (Take-away)*, *Giao hàng tận nơi*.
   - Phương thức thanh toán: Tiền mặt, Chuyển khoản QR ngân hàng, Ví điện tử MoMo.
   - Biên lai đơn hàng hoàn tất với mã đơn `#HC-XXXXXX` và thời gian chuẩn bị dự kiến.

---

## 🛠️ Công Nghệ Sử Dụng

- **Framework**: [Next.js 14](https://nextjs.org/) (App Router, Server Components + Client Interactivity)
- **UI Library**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/) (Bảng màu custom sáng tone lạnh: `hacha`, `frost`, `glacier`)
- **Animations**: [Framer Motion](https://www.framer.com/motion/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **State Management**: React Context (`CartContext`, `ToastContext`) + LocalStorage persistence
- **Mock Service**: Giả lập API bất đồng bộ với delay thực tế (`apiMock.ts`)

---

## 🚀 Khởi Chạy Dự Án

```bash
# Cài đặt thư viện phụ thuộc (nếu clone mới)
npm install

# Khởi chạy môi trường phát triển (Development)
npm run dev
# Mở trình duyệt tại: http://localhost:3000

# Kiểm tra & Build phiên bản Production
npm run build
npm start
```

---

## 📂 Cấu Trúc Thư Mục

```
src/
├── app/
│   ├── layout.tsx                # Root layout, Google Fonts, Global Modals & Providers
│   ├── page.tsx                  # Home page kết nối 7 section chính
│   └── globals.css               # Tone màu sáng lạnh, glassmorphism, scrollbars
├── components/
│   ├── about/AboutSection.tsx    # Câu chuyện Hacha & 3 giá trị cốt lõi
│   ├── checkout/CheckoutModal.tsx# Quy trình thanh toán & biên lai đơn hàng
│   ├── collections/CollectionsSection.tsx # Bộ sưu tập đồ uống theo mùa
│   ├── events/                   # Sự kiện, workshop & modal đăng ký vé
│   ├── hero/HeroSection.tsx      # Banner chính phong cách thanh lịch
│   ├── layout/                   # Navbar, Footer, CartDrawer
│   ├── location/MapAndContactSection.tsx # Google Maps & thông tin liên hệ
│   ├── menu/                     # Thực đơn e-commerce, cards, modal tùy chỉnh món
│   ├── reservation/TableReservationModal.tsx # Form đặt bàn trực tuyến
│   ├── space/SpaceGallerySection.tsx # Thư viện ảnh không gian & Lightbox
│   └── ui/                       # Badge, SectionHeading
├── context/
│   ├── CartContext.tsx           # Quản lý giỏ hàng, tùy chọn món, voucher
│   └── ToastContext.tsx          # Thông báo phản hồi toast thanh lịch
├── data/
│   └── mockData.ts               # Dữ liệu thực đơn, hình ảnh thực tế, sự kiện
├── services/
│   └── apiMock.ts                # Mock API bất đồng bộ
└── types/
    └── index.ts                  # Toàn bộ định nghĩa TypeScript types chuẩn
```
