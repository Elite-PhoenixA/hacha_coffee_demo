'use client';

import React from 'react';
import { CAFE_INFO, MOCK_TESTIMONIALS } from '@/data/mockData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useCart } from '@/context/CartContext';
import {
  MapPin,
  Clock,
  Phone,
  Wifi,
  Car,
  Navigation,
  Star,
  Quote,
  Calendar,
  ExternalLink,
} from 'lucide-react';

export function MapAndContactSection() {
  const { setIsTableReservationOpen } = useCart();

  return (
    <section id="location" className="py-20 sm:py-28 bg-slate-50/80 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Bản Đồ & Kết Nối"
          title="Ghé thăm Hacha Phố Hạ"
          subtitle="Tọa lạc tại vị trí yên tĩnh, dễ tìm với bãi gửi xe rộng rãi và không gian ngập tràn ánh sáng đón chào bạn mỗi ngày."
        />

        {/* Map & Information Box Container */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch mb-16">
          {/* Left: Contact Info & Facilities Card */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200/80 shadow-frost-sm flex flex-col justify-between space-y-6">
            <div className="space-y-6">
              <div>
                <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
                  Thông Tin Chi Tiết
                </span>
                <h3 className="text-2xl font-serif font-medium text-slate-900 mt-1">
                  {CAFE_INFO.name}
                </h3>
                <p className="text-xs text-slate-500 mt-0.5">{CAFE_INFO.subtagline}</p>
              </div>

              {/* Details List */}
              <div className="space-y-4 text-xs sm:text-sm text-slate-600">
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Địa chỉ quán:</div>
                    <div className="text-slate-600 mt-0.5 leading-relaxed">{CAFE_INFO.address}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Clock className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Giờ phục vụ:</div>
                    <div className="text-slate-600 mt-0.5">{CAFE_INFO.openingHours}</div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Hotline hỗ trợ:</div>
                    <a
                      href={`tel:${CAFE_INFO.phone.replace(/\s+/g, '')}`}
                      className="text-sky-700 font-semibold hover:underline mt-0.5 block"
                    >
                      {CAFE_INFO.phone}
                    </a>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Wifi className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Wifi & Internet tốc độ cao:</div>
                    <div className="text-slate-600 mt-0.5">
                      Tên: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sky-900 font-mono text-xs">{CAFE_INFO.wifiName}</code>
                      {' '}| Pass: <code className="bg-slate-100 px-1.5 py-0.5 rounded text-sky-900 font-mono text-xs">{CAFE_INFO.wifiPass}</code>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 rounded-xl bg-sky-50 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                    <Car className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="font-semibold text-slate-900">Bãi đỗ xe:</div>
                    <div className="text-slate-600 mt-0.5 leading-relaxed">{CAFE_INFO.parkingNote}</div>
                  </div>
                </div>
              </div>
            </div>

            {/* Quick Actions */}
            <div className="pt-4 border-t border-slate-100 flex flex-col sm:flex-row gap-2.5">
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-sky-700 text-white hover:bg-sky-800 transition-colors flex items-center justify-center gap-2 shadow-xs"
              >
                <Navigation className="w-4 h-4" />
                <span>Xem đường đi</span>
              </a>

              <button
                onClick={() => setIsTableReservationOpen(true)}
                className="flex-1 py-2.5 px-4 rounded-xl text-xs sm:text-sm font-medium bg-slate-100 text-slate-800 hover:bg-slate-200 transition-colors flex items-center justify-center gap-2"
              >
                <Calendar className="w-4 h-4 text-sky-700" />
                <span>Đặt bàn trước</span>
              </button>
            </div>
          </div>

          {/* Right: Interactive Google Map */}
          <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden border border-slate-200/80 shadow-frost-sm min-h-[380px] relative flex flex-col">
            <div className="p-4 bg-slate-100/90 border-b border-slate-200/80 flex items-center justify-between text-xs text-slate-700">
              <span className="flex items-center gap-1.5 font-medium">
                <MapPin className="w-4 h-4 text-sky-700" /> Vị trí Hacha Phố Hạ trên Google Maps
              </span>
              <a
                href={CAFE_INFO.googleMapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sky-700 hover:underline flex items-center gap-1 font-semibold"
              >
                <span>Phóng to bản đồ</span>
                <ExternalLink className="w-3.5 h-3.5" />
              </a>
            </div>

            <div className="flex-1 w-full h-full min-h-[340px]">
              <iframe
                title="Google Maps Hacha Pho Ha"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3725.1957488349195!2d105.78368567586884!3d20.98478838928065!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135accf492b49c7%3A0xb3551532822a94f6!2zMTAyIFRy4bqnbiBQaMO6LCBQLiBN4buZIExhbywgSMOgIMSQw7RuZywgSMOgIE7hu5lp!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                width="100%"
                height="100%"
                style={{ border: 0, minHeight: '380px' }}
                allowFullScreen={true}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>
        </div>

        {/* Customer Testimonials Carousel/Cards */}
        <div className="mt-16 pt-12 border-t border-slate-200">
          <div className="text-center max-w-xl mx-auto mb-10">
            <span className="text-xs font-bold uppercase tracking-wider text-sky-700">
              Cảm Nhận Từ Khách Hàng
            </span>
            <h3 className="text-2xl sm:text-3xl font-serif font-light text-slate-900 mt-1">
              Những yêu thương dành cho Phố Hạ
            </h3>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {MOCK_TESTIMONIALS.map((t) => (
              <div
                key={t.id}
                className="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-frost-sm flex flex-col justify-between space-y-4"
              >
                <div className="space-y-3">
                  <div className="flex items-center gap-1 text-amber-400">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400" />
                    ))}
                  </div>

                  <p className="text-xs sm:text-sm text-slate-600 leading-relaxed italic">
                    &ldquo;{t.comment}&rdquo;
                  </p>
                </div>

                <div className="pt-3 border-t border-slate-100 flex items-center justify-between text-xs">
                  <div>
                    <div className="font-semibold text-slate-900">{t.author}</div>
                    <div className="text-slate-400">{t.role}</div>
                  </div>
                  <span className="px-2 py-0.5 rounded-md bg-sky-50 text-sky-800 text-[11px] font-medium">
                    Món thích: {t.favoriteItem.split('&')[0]}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
