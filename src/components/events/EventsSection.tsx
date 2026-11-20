'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MOCK_EVENTS } from '@/data/mockData';
import { CoffeeEvent } from '@/types';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { EventBookingModal } from './EventBookingModal';
import { Calendar, Clock, MapPin, Users, Ticket, ArrowRight, Sparkles } from 'lucide-react';

export function EventsSection() {
  const [selectedEvent, setSelectedEvent] = useState<CoffeeEvent | null>(null);

  return (
    <section id="events" className="py-20 sm:py-28 bg-slate-50/70 relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Sự Kiện & Workshop"
          title="Những điểm hẹn giao lưu tại Phố Hạ"
          subtitle="Không chỉ là cà phê, Hacha còn là nơi gắn kết cộng đồng qua những đêm nhạc acoustic mộc mạc, lớp học nếm cà phê specialty và những buổi sáng đọc sách thanh bình."
        />

        {/* Events Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {MOCK_EVENTS.map((event) => {
            const percentRemaining = Math.round((event.spotsLeft / event.totalSpots) * 100);

            return (
              <div
                key={event.id}
                className="bg-white rounded-3xl border border-slate-200/80 shadow-frost-sm hover:shadow-frost-lg transition-all duration-300 overflow-hidden flex flex-col justify-between group"
              >
                <div>
                  {/* Event Thumbnail */}
                  <div className="relative aspect-[16/10] w-full overflow-hidden bg-slate-100">
                    <Image
                      src={event.image}
                      alt={event.title}
                      fill
                      className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
                    />
                    <div className="absolute top-3 left-3">
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-semibold shadow-xs backdrop-blur-md ${
                          event.status === 'ongoing'
                            ? 'bg-emerald-600/90 text-white'
                            : event.status === 'upcoming'
                            ? 'bg-sky-600/90 text-white'
                            : 'bg-indigo-600/90 text-white'
                        }`}
                      >
                        {event.statusLabel}
                      </span>
                    </div>
                  </div>

                  {/* Event Content */}
                  <div className="p-5 sm:p-6 space-y-4">
                    <div className="space-y-1.5">
                      <h3 className="font-serif text-xl font-medium text-slate-900 group-hover:text-sky-800 transition-colors leading-snug">
                        {event.title}
                      </h3>
                      <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
                        {event.description}
                      </p>
                    </div>

                    {/* Metadata details */}
                    <div className="space-y-2 py-3 border-y border-slate-100 text-xs text-slate-600">
                      <div className="flex items-center gap-2">
                        <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="font-medium text-slate-800">{event.dateText}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Clock className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span>{event.timeText}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                        <span className="truncate">{event.location}</span>
                      </div>
                    </div>

                    {/* Highlights tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {event.highlights.slice(0, 3).map((hl, i) => (
                        <span
                          key={i}
                          className="px-2.5 py-0.5 rounded-md bg-slate-100 text-slate-600 text-[11px] font-medium"
                        >
                          ✓ {hl}
                        </span>
                      ))}
                    </div>

                    {/* Capacity / Spots left indicator */}
                    <div className="space-y-1.5 pt-1">
                      <div className="flex justify-between text-xs">
                        <span className="text-slate-500">Chỗ trống còn lại:</span>
                        <span className="font-semibold text-sky-800 font-mono">
                          {event.spotsLeft} / {event.totalSpots} chỗ
                        </span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div
                          className="h-full bg-sky-500 rounded-full transition-all duration-500"
                          style={{ width: `${100 - percentRemaining}%` }}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Event Footer CTA */}
                <div className="p-5 sm:p-6 pt-0">
                  <button
                    onClick={() => setSelectedEvent(event)}
                    className="w-full py-2.5 px-4 rounded-xl text-xs sm:text-sm font-semibold bg-white text-slate-800 border border-slate-300 hover:border-sky-400 hover:text-sky-900 hover:bg-sky-50/50 transition-all duration-200 flex items-center justify-center gap-2 shadow-xs group/btn"
                  >
                    <span>Đăng Ký Tham Gia</span>
                    <ArrowRight className="w-3.5 h-3.5 group-hover/btn:translate-x-1 transition-transform" />
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Booking Dialog Modal */}
      <EventBookingModal
        event={selectedEvent}
        onClose={() => setSelectedEvent(null)}
      />
    </section>
  );
}
