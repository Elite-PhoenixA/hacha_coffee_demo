'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { ShoppingBag, Calendar, Menu, X, Coffee, MapPin, Phone, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { totalItems, setIsCartOpen, setIsTableReservationOpen } = useCart();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'Về Hacha', href: '#about' },
    { name: 'Thực Đơn', href: '#menu' },
    { name: 'Bộ Sưu Tập', href: '#collections' },
    { name: 'Sự Kiện', href: '#events' },
    { name: 'Không Gian', href: '#space' },
    { name: 'Bản Đồ & Giờ Mở Cửa', href: '#location' },
  ];

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? 'bg-white/90 backdrop-blur-md shadow-frost-sm border-b border-slate-200/70 py-3'
          : 'bg-gradient-to-b from-white/90 via-white/70 to-transparent py-4 sm:py-5'
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo Brand */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="relative w-10 h-10 sm:w-11 sm:h-11 rounded-full overflow-hidden border-2 border-sky-200 shadow-sm group-hover:scale-105 transition-transform duration-300">
              <Image
                src="/images/logo.jpg"
                alt="Logo Hacha Phố Hạ"
                fill
                className="object-cover"
                priority
              />
            </div>
            <div className="flex flex-col">
              <span className="font-serif text-xl sm:text-2xl font-light tracking-wide text-slate-900 group-hover:text-sky-800 transition-colors">
                HACHA <span className="font-normal text-sky-700">Phố Hạ</span>
              </span>
              <span className="text-[10px] uppercase tracking-[0.2em] text-slate-500 font-sans -mt-0.5">
                Artisanal Coffee & Tea
              </span>
            </div>
          </Link>

          {/* Desktop Nav Links */}
          <nav className="hidden lg:flex items-center gap-1 xl:gap-2 bg-slate-100/70 backdrop-blur-sm p-1.5 rounded-full border border-slate-200/60 shadow-xs">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="px-3.5 py-1.5 text-xs xl:text-sm font-medium text-slate-700 hover:text-sky-900 hover:bg-white/80 rounded-full transition-all duration-200"
              >
                {link.name}
              </a>
            ))}
          </nav>

          {/* Action Buttons */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Đặt bàn button */}
            <button
              onClick={() => setIsTableReservationOpen(true)}
              className="hidden sm:inline-flex items-center gap-2 px-4 py-2 rounded-full text-xs sm:text-sm font-medium bg-white text-slate-800 border border-slate-300/80 shadow-xs hover:border-sky-400 hover:text-sky-900 hover:bg-sky-50/50 transition-all duration-200"
            >
              <Calendar className="w-3.5 h-3.5 text-sky-600" />
              <span>Đặt bàn</span>
            </button>

            {/* Giỏ hàng button */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="relative p-2 sm:px-4 sm:py-2 rounded-full text-xs sm:text-sm font-medium bg-sky-600 text-white shadow-frost hover:bg-sky-700 active:scale-95 transition-all duration-200 flex items-center gap-2"
              aria-label="Mở giỏ hàng"
            >
              <ShoppingBag className="w-4 h-4" />
              <span className="hidden sm:inline">Giỏ hàng</span>
              {totalItems > 0 && (
                <span className="flex items-center justify-center min-w-[20px] h-5 px-1 rounded-full bg-white text-sky-800 text-xs font-bold shadow-xs">
                  {totalItems}
                </span>
              )}
            </button>

            {/* Mobile Hamburger Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-700 hover:bg-slate-100/80 transition-colors"
              aria-label="Menu"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.25 }}
            className="lg:hidden bg-white/95 backdrop-blur-xl border-b border-slate-200/80 shadow-frost-lg overflow-hidden"
          >
            <div className="max-w-7xl mx-auto px-5 pt-3 pb-6 space-y-3">
              <div className="grid grid-cols-1 gap-1">
                {navLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                    className="flex items-center justify-between py-2.5 px-3 rounded-lg text-slate-700 hover:text-sky-800 hover:bg-sky-50/70 text-sm font-medium transition-colors"
                  >
                    <span>{link.name}</span>
                    <span className="text-slate-300">→</span>
                  </a>
                ))}
              </div>

              <div className="pt-3 border-t border-slate-100 flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setMobileMenuOpen(false);
                    setIsTableReservationOpen(true);
                  }}
                  className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-medium bg-slate-900 text-white shadow-sm hover:bg-slate-800 transition-colors"
                >
                  <Calendar className="w-4 h-4 text-sky-300" />
                  <span>Đặt bàn trải nghiệm tại quán</span>
                </button>
                <div className="flex items-center justify-center gap-4 text-xs text-slate-500 pt-1">
                  <span className="flex items-center gap-1">
                    <MapPin className="w-3.5 h-3.5 text-sky-600" /> Hà Đông, Hà Nội
                  </span>
                  <span>•</span>
                  <span className="flex items-center gap-1">
                    <Phone className="w-3.5 h-3.5 text-sky-600" /> 0984 628 388
                  </span>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
