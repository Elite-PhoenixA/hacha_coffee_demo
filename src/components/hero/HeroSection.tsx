'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Coffee, Sparkles, Clock, ArrowRight, ShieldCheck, MapPin } from 'lucide-react';
import { useCart } from '@/context/CartContext';
import { CAFE_INFO } from '@/data/mockData';

export function HeroSection() {
  const { setIsTableReservationOpen } = useCart();

  return (
    <section className="relative min-h-[92vh] flex items-center justify-center pt-28 pb-16 overflow-hidden bg-gradient-to-b from-sky-50/60 via-slate-50 to-white">
      {/* Background Decorative Gradient Orbs */}
      <div className="absolute top-10 left-1/4 w-96 h-96 bg-sky-200/40 rounded-full blur-3xl -z-10 pointer-events-none animate-pulse-subtle" />
      <div className="absolute bottom-10 right-10 w-[500px] h-[500px] bg-slate-200/50 rounded-full blur-3xl -z-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Hero Copy */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: 'easeOut' }}
            className="lg:col-span-7 space-y-6 text-center lg:text-left"
          >
            {/* Pill Tag */}
            <div className="inline-flex items-center gap-2.5 px-4 py-1.5 rounded-full bg-white/90 border border-sky-200/80 shadow-frost-sm backdrop-blur-sm">
              <span className="flex h-2 w-2 relative">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-sky-500"></span>
              </span>
              <span className="text-xs font-medium uppercase tracking-wider text-sky-900">
                Không gian cà phê thủ công • Phố Hạ
              </span>
            </div>

            {/* Main Headline */}
            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-serif font-light text-slate-900 leading-[1.15] tracking-tight">
              Nốt lặng <span className="italic font-normal text-sky-800">tinh khôi</span>
              <br />
              giữa lòng phố thị.
            </h1>

            {/* Sub-text */}
            <p className="max-w-2xl text-base sm:text-lg text-slate-600 font-normal leading-relaxed mx-auto lg:mx-0">
              Hacha Phố Hạ mang tới phong vị cà phê mộc thủ công, trà thanh thuần mát lành trong
              một không gian tone sáng lạnh thanh lịch, ngập tràn ánh sáng tự nhiên và sự an yên.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 sm:gap-4 pt-2">
              <a
                href="#menu"
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2.5 px-7 py-3.5 rounded-full text-sm font-semibold bg-sky-700 text-white shadow-frost hover:bg-sky-800 hover:shadow-frost-lg transition-all duration-300 group"
              >
                <span>Khám Phá Menu</span>
                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </a>

              <button
                onClick={() => setIsTableReservationOpen(true)}
                className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-7 py-3.5 rounded-full text-sm font-medium bg-white text-slate-800 border border-slate-300/80 shadow-frost-sm hover:border-sky-300 hover:bg-sky-50/50 hover:text-sky-900 transition-all duration-300"
              >
                <span>Đặt Bàn Trực Tuyến</span>
              </button>
            </div>

            {/* Key Value Badges */}
            <div className="pt-6 border-t border-slate-200/80 grid grid-cols-3 gap-3 sm:gap-6 text-left max-w-lg mx-auto lg:mx-0">
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-serif font-medium text-slate-900">18 Giờ</div>
                <div className="text-xs text-slate-500 font-sans">Chiết xuất Cold Drip chậm</div>
              </div>
              <div className="space-y-1 border-x border-slate-200 px-3 sm:px-4">
                <div className="text-xl sm:text-2xl font-serif font-medium text-slate-900">100%</div>
                <div className="text-xs text-slate-500 font-sans">Hạt Arabica Cầu Đất rang mộc</div>
              </div>
              <div className="space-y-1">
                <div className="text-xl sm:text-2xl font-serif font-medium text-slate-900">Tone Lạnh</div>
                <div className="text-xs text-slate-500 font-sans">Không gian tối giản thanh lịch</div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Hero Visual Showcase */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.9, delay: 0.2, ease: 'easeOut' }}
            className="lg:col-span-5 relative"
          >
            {/* Main Image Frame with Subtle Cool Tone Border */}
            <div className="relative mx-auto max-w-md lg:max-w-none">
              <div className="relative rounded-3xl overflow-hidden shadow-frost-lg border-4 border-white aspect-[4/5] bg-slate-100">
                <Image
                  src="/images/hero-main.jpg"
                  alt="Không gian và đồ uống Hacha Phố Hạ"
                  fill
                  className="object-cover hover:scale-105 transition-transform duration-700 ease-out"
                  priority
                />
                {/* Subtle Cool Tint Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950/60 via-transparent to-sky-950/10 pointer-events-none" />

                {/* Bottom Overlay Label */}
                <div className="absolute bottom-6 left-6 right-6 p-4 rounded-2xl bg-white/85 backdrop-blur-md border border-white/60 shadow-lg text-slate-900">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-wider text-sky-700">
                        Đặc sản Phố Hạ
                      </div>
                      <div className="text-base font-serif font-medium mt-0.5">
                        Phố Hạ Cold Drip Signature
                      </div>
                    </div>
                    <span className="text-sm font-semibold text-sky-900 bg-sky-100/90 px-3 py-1 rounded-full">
                      58.000đ
                    </span>
                  </div>
                </div>
              </div>

              {/* Floating Aesthetic Badge 1: Top Right */}
              <motion.div
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.5 }}
                className="absolute -top-4 -right-4 sm:-right-6 bg-white/95 backdrop-blur-md px-4 py-3 rounded-2xl shadow-frost border border-sky-100 hidden sm:flex items-center gap-3"
              >
                <div className="w-9 h-9 rounded-full bg-sky-50 flex items-center justify-center text-sky-600">
                  <Sparkles className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-slate-900">Menu Mới Nhất</div>
                  <div className="text-[11px] text-slate-500">Mùa Thu Đông 2026</div>
                </div>
              </motion.div>

              {/* Floating Aesthetic Badge 2: Bottom Left */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.7 }}
                className="absolute -bottom-5 -left-4 sm:-left-6 bg-white/95 backdrop-blur-md px-4 py-2.5 rounded-2xl shadow-frost border border-slate-200/80 hidden sm:flex items-center gap-2.5"
              >
                <div className="w-8 h-8 rounded-full bg-emerald-50 flex items-center justify-center text-emerald-600">
                  <Clock className="w-4 h-4" />
                </div>
                <div className="text-xs">
                  <div className="font-semibold text-slate-800">Mở cửa hàng ngày</div>
                  <div className="text-slate-500 font-sans">07:00 — 22:30</div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
