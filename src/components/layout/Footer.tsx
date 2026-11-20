'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { CAFE_INFO } from '@/data/mockData';
import { useToast } from '@/context/ToastContext';
import { MapPin, Phone, Mail, Clock, Send, Heart, ArrowUp } from 'lucide-react';

export function Footer() {
  const { showToast } = useToast();
  const [email, setEmail] = useState('');

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) return;
    showToast('Cảm ơn bạn đã đăng ký nhận tin từ Hacha Phố Hạ!', 'success');
    setEmail('');
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="bg-slate-900 text-slate-300 pt-16 pb-12 border-t border-slate-800 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-10 lg:gap-8 pb-12 border-b border-slate-800">
          {/* Col 1: Brand Info */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="relative w-10 h-10 rounded-full overflow-hidden border border-sky-400/50">
                <Image
                  src="/images/logo.jpg"
                  alt="Hacha Logo"
                  fill
                  className="object-cover"
                />
              </div>
              <span className="font-serif text-2xl text-white font-light tracking-wide">
                HACHA <span className="text-sky-400 font-normal">Phố Hạ</span>
              </span>
            </div>

            <p className="text-xs sm:text-sm text-slate-400 leading-relaxed max-w-sm">
              Không gian cà phê thủ công với phong cách đơn giản, thanh lịch và tone sáng lạnh.
              Nơi nuôi dưỡng những khoảnh khắc bình yên và hương vị cà phê mộc nguyên bản.
            </p>

            <div className="text-xs text-slate-400 space-y-1">
              <div>{CAFE_INFO.tagline}</div>
              <div className="text-sky-400 font-mono">{CAFE_INFO.subtagline}</div>
            </div>
          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Khám Phá
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <a href="#about" className="hover:text-sky-400 transition-colors">
                  Về Hacha Phố Hạ
                </a>
              </li>
              <li>
                <a href="#menu" className="hover:text-sky-400 transition-colors">
                  Thực đơn Cà Phê & Trà
                </a>
              </li>
              <li>
                <a href="#collections" className="hover:text-sky-400 transition-colors">
                  Bộ sưu tập mới
                </a>
              </li>
              <li>
                <a href="#events" className="hover:text-sky-400 transition-colors">
                  Sự kiện & Workshop
                </a>
              </li>
              <li>
                <a href="#space" className="hover:text-sky-400 transition-colors">
                  Không gian quán
                </a>
              </li>
              <li>
                <a href="#location" className="hover:text-sky-400 transition-colors">
                  Bản đồ & Chỉ đường
                </a>
              </li>
            </ul>
          </div>

          {/* Col 3: Contact & Hours */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Thông Tin Liên Hệ
            </h4>
            <div className="space-y-2.5 text-xs text-slate-400">
              <div className="flex items-start gap-2">
                <MapPin className="w-4 h-4 text-sky-400 shrink-0 mt-0.5" />
                <span className="leading-relaxed">{CAFE_INFO.address}</span>
              </div>
              <div className="flex items-center gap-2">
                <Phone className="w-4 h-4 text-sky-400 shrink-0" />
                <span>Hotline: {CAFE_INFO.phone}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-sky-400 shrink-0" />
                <span>{CAFE_INFO.openingHours}</span>
              </div>
            </div>
          </div>

          {/* Col 4: Newsletter Subscription */}
          <div className="lg:col-span-3 space-y-3">
            <h4 className="text-xs font-bold uppercase tracking-widest text-white">
              Nhận Ưu Đãi & Sự Kiện Mới
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed">
              Đăng ký để nhận voucher giảm 20% cho lần ghé thăm tiếp theo và thông báo workshop mới nhất.
            </p>

            <form onSubmit={handleSubscribe} className="flex gap-2">
              <input
                type="email"
                required
                placeholder="Email của bạn..."
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-3 py-2 text-xs bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-slate-500 focus:outline-none focus:ring-1 focus:ring-sky-500"
              />
              <button
                type="submit"
                className="p-2 rounded-xl bg-sky-600 text-white hover:bg-sky-500 transition-colors"
                aria-label="Đăng ký nhận tin"
              >
                <Send className="w-4 h-4" />
              </button>
            </form>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-slate-500">
          <div>
            © {new Date().getFullYear()} Hacha Phố Hạ Coffee. All rights reserved. Phong cách tối giản & thanh lịch.
          </div>

          <div className="flex items-center gap-4">
            <span>Thiết kế thanh lịch với tone sáng lạnh</span>
            <button
              onClick={scrollToTop}
              className="p-2 rounded-full bg-slate-800 hover:bg-slate-700 text-slate-300 transition-colors"
              title="Lên đầu trang"
            >
              <ArrowUp className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>
    </footer>
  );
}
