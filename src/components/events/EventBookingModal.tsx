'use client';

import React, { useState } from 'react';
import { CoffeeEvent } from '@/types';
import { apiMock } from '@/services/apiMock';
import { useToast } from '@/context/ToastContext';
import { X, Calendar, Clock, MapPin, CheckCircle2, Loader2, Sparkles, User, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface EventBookingModalProps {
  event: CoffeeEvent | null;
  onClose: () => void;
}

export function EventBookingModal({ event, onClose }: EventBookingModalProps) {
  const { showToast } = useToast();
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [ticketCount, setTicketCount] = useState(1);
  const [notes, setNotes] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successTicketId, setSuccessTicketId] = useState<string | null>(null);

  if (!event) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName || !phone) {
      showToast('Vui lòng điền họ tên và số điện thoại.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiMock.registerEvent(event.id, {
        name: fullName,
        phone,
        count: ticketCount,
      });

      if (res.success && res.data) {
        setSuccessTicketId(res.data.ticketId);
        showToast(res.message, 'success');
      } else {
        showToast(res.message || 'Không thể đăng ký lúc này.', 'error');
      }
    } catch {
      showToast('Có lỗi xảy ra, vui lòng thử lại.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReset = () => {
    setSuccessTicketId(null);
    setFullName('');
    setPhone('');
    setTicketCount(1);
    setNotes('');
    onClose();
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white w-full max-w-lg rounded-3xl shadow-frost-lg border border-slate-200 overflow-hidden my-auto"
        >
          {/* Close button */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {successTicketId ? (
            /* Registration Success View */
            <div className="p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-medium text-slate-900">
                  Đăng Ký Thành Công!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Cảm ơn bạn đã tham gia sự kiện cùng Hacha Phố Hạ. Chúng tôi đã giữ chỗ cho bạn và
                  sẽ gửi tin nhắn SMS xác nhận.
                </p>
              </div>

              {/* Ticket Card Receipt */}
              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-left space-y-2">
                <div className="text-xs text-sky-800 font-semibold uppercase tracking-wider">
                  Mã vé tham gia sự kiện
                </div>
                <div className="text-xl font-mono font-bold text-sky-950">
                  #{successTicketId}
                </div>
                <div className="text-xs text-slate-600 pt-1 border-t border-sky-100 flex justify-between">
                  <span>{event.title}</span>
                  <span className="font-semibold">{ticketCount} Vé</span>
                </div>
              </div>

              <button
                onClick={handleReset}
                className="w-full py-3 rounded-xl bg-sky-800 text-white font-medium text-sm hover:bg-sky-900 transition-colors"
              >
                Hoàn tất & Đóng
              </button>
            </div>
          ) : (
            /* Registration Form */
            <form onSubmit={handleSubmit} className="p-6 sm:p-8 space-y-5">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
                  {event.statusLabel}
                </span>
                <h3 className="text-xl sm:text-2xl font-serif font-medium text-slate-900 leading-snug pt-1">
                  Đăng ký tham gia sự kiện
                </h3>
                <p className="text-xs text-slate-500 leading-relaxed">{event.title}</p>
              </div>

              {/* Event quick metadata info */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs text-slate-600 space-y-1.5">
                <div className="flex items-center gap-2">
                  <Calendar className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{event.dateText} ({event.timeText})</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="w-3.5 h-3.5 text-sky-600 shrink-0" />
                  <span>{event.location}</span>
                </div>
                <div className="text-sky-800 font-medium pt-1">
                  Chi phí: {event.feeText}
                </div>
              </div>

              {/* Inputs */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Họ và tên của bạn *
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Số điện thoại nhận vé *
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      className="w-full pl-9 pr-3 py-2.5 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Số lượng người tham gia
                  </label>
                  <select
                    value={ticketCount}
                    onChange={(e) => setTicketCount(Number(e.target.value))}
                    className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <option key={num} value={num}>
                        {num} người tham dự
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Ghi chú thêm
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Cần bàn gần sân khấu, muốn đến sớm 15 phút..."
                    value={notes}
                    onChange={(e) => setNotes(e.target.value)}
                    className="w-full py-2.5 px-3 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-sky-700 text-white font-medium text-xs sm:text-sm shadow-frost hover:bg-sky-800 transition-all flex items-center justify-center gap-2 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang giữ chỗ...</span>
                  </>
                ) : (
                  <span>Xác Nhận Giữ Chỗ Ngay</span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
