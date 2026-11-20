import type { Metadata } from 'next';
import './globals.css';
import { ToastProvider } from '@/context/ToastContext';
import { CartProvider } from '@/context/CartContext';
import { Navbar } from '@/components/layout/Navbar';
import { Footer } from '@/components/layout/Footer';
import { CartDrawer } from '@/components/layout/CartDrawer';
import { ProductDetailModal } from '@/components/menu/ProductDetailModal';
import { TableReservationModal } from '@/components/reservation/TableReservationModal';
import { CheckoutModal } from '@/components/checkout/CheckoutModal';

export const metadata: Metadata = {
  title: 'Hacha Phố Hạ | Cà Phê Thủ Công & Không Gian Thanh Lịch Tone Sáng Lạnh',
  description:
    'Website chính thức của Hacha Phố Hạ - Quán cà phê với phong cách tối giản, thanh lịch, tone sáng lạnh. Thưởng thức cà phê rang mộc, Cold Drip 18h, trà hoa quả tươi mát và không gian an yên.',
  keywords: [
    'Hacha Phố Hạ',
    'Cà phê Phố Hạ',
    'Hacha Coffee',
    'Cà phê Hà Đông',
    'Quán cà phê tone sáng lạnh',
    'Cold Brew Hà Nội',
    'Cà phê muối',
  ],
  icons: {
    icon: '/images/logo.jpg',
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi">
      <body className="min-h-screen flex flex-col justify-between selection:bg-sky-200 selection:text-sky-900">
        <ToastProvider>
          <CartProvider>
            {/* Main Navigation */}
            <Navbar />

            {/* Main Content */}
            <main className="flex-grow">{children}</main>

            {/* Footer */}
            <Footer />

            {/* Global Overlays & Modals */}
            <CartDrawer />
            <ProductDetailModal />
            <TableReservationModal />
            <CheckoutModal />
          </CartProvider>
        </ToastProvider>
      </body>
    </html>
  );
}
