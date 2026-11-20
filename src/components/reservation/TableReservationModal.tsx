'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { apiMock } from '@/services/apiMock';
import { ReservationFormData } from '@/types';
import { X, Calendar, Clock, Users, MapPin, CheckCircle2, Loader2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function TableReservationModal() {
  const { isTableReservationOpen, setIsTableReservationOpen } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<ReservationFormData>({
    fullName: '',
    phone: '',
    email: '',
    date: new Date().toISOString().split('T')[0],
    time: '14:00',
    guestCount: 2,
    seatingArea: 'indoor',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [successId, setSuccessId] = useState<string | null>(null);

  if (!isTableReservationOpen) return null;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      showToast('Vui lòng cung cấp họ tên và số điện thoại.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiMock.createReservation(formData);
      if (res.success && res.data) {
        setSuccessId(res.data.reservationId);
        showToast(res.message, 'success');
      } else {
        showToast(res.message, 'error');
      }
    } catch {
      showToast('Đã có lỗi xảy ra. Vui lòng liên hệ hotline.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setSuccessId(null);
    setIsTableReservationOpen(false);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[115] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white w-full max-w-lg rounded-3xl shadow-frost-lg border border-slate-200 overflow-hidden my-auto max-h-[95vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {successId ? (
            <div className="p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <h3 className="text-2xl font-serif font-medium text-slate-900">
                  Đặt Bàn Thành Công!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Hacha Phố Hạ đã ghi nhận thông tin đặt bàn của bạn. Nhân viên CSKH sẽ liên hệ với
                  bạn trong vòng 10 phút để xác nhận vị trí ngồi đẹp nhất.
                </p>
              </div>

              <div className="p-4 rounded-2xl bg-sky-50 border border-sky-200 text-left space-y-2">
                <div className="text-xs text-sky-800 font-semibold uppercase tracking-wider">
                  Mã Giữ Chỗ
                </div>
                <div className="text-2xl font-mono font-bold text-sky-950">
                  #{successId}
                </div>
                <div className="text-xs text-slate-600 pt-2 border-t border-sky-100 grid grid-cols-2 gap-2">
                  <div>
                    <span className="text-slate-400">Thời gian:</span>{' '}
                    <span className="font-semibold">{formData.date} - {formData.time}</span>
                  </div>
                  <div>
                    <span className="text-slate-400">Số lượng:</span>{' '}
                    <span className="font-semibold">{formData.guestCount} người</span>
                  </div>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-sky-800 text-white font-medium text-sm hover:bg-sky-900 transition-colors"
              >
                Xong & Trở về trang chủ
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="overflow-y-auto p-6 sm:p-8 space-y-5">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
                  Dịch Vụ Giữ Chỗ
                </span>
                <h3 className="text-2xl font-serif font-medium text-slate-900 pt-1">
                  Đặt bàn trước tại Hacha Phố Hạ
                </h3>
                <p className="text-xs text-slate-500">
                  Giữ góc ngồi yêu thích để tận hưởng trọn vẹn không gian thanh tĩnh và ly cà phê thơm ngon.
                </p>
              </div>

              <div className="space-y-4">
                {/* Name & Phone */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Họ và tên *
                    </label>
                    <input
                      type="text"
                      required
                      placeholder="Nguyễn Văn A"
                      value={formData.fullName}
                      onChange={(e) => setFormData({ ...formData, fullName: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Số điện thoại *
                    </label>
                    <input
                      type="tel"
                      required
                      placeholder="0912 345 678"
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>
                </div>

                {/* Date & Time */}
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Ngày đến
                    </label>
                    <input
                      type="date"
                      required
                      value={formData.date}
                      onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                      className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Khung giờ
                    </label>
                    <select
                      value={formData.time}
                      onChange={(e) => setFormData({ ...formData, time: e.target.value })}
                      className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      <option value="08:00">08:00 Sáng</option>
                      <option value="09:30">09:30 Sáng</option>
                      <option value="11:00">11:00 Trưa</option>
                      <option value="14:00">14:00 Chiều</option>
                      <option value="16:00">16:00 Chiều</option>
                      <option value="18:30">18:30 Tối</option>
                      <option value="20:00">20:00 Tối</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                      Số lượng khách
                    </label>
                    <select
                      value={formData.guestCount}
                      onChange={(e) => setFormData({ ...formData, guestCount: Number(e.target.value) })}
                      className="w-full px-2.5 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                    >
                      {[1, 2, 3, 4, 5, 6, 8, 10, 15].map((c) => (
                        <option key={c} value={c}>
                          {c} Khách
                        </option>
                      ))}
                    </select>
                  </div>
                </div>

                {/* Seating preference */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1.5">
                    Khu vực ngồi ưu tiên
                  </label>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {[
                      { id: 'indoor', label: 'Trong nhà điều hòa' },
                      { id: 'window', label: 'Cạnh cửa kính ngắm phố' },
                      { id: 'quiet-work', label: 'Bàn yên tĩnh làm việc' },
                      { id: 'terrace', label: 'Hiên thoáng ngoài trời' },
                    ].map((area) => (
                      <button
                        key={area.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, seatingArea: area.id as any })}
                        className={`p-2.5 rounded-xl border text-left transition-all ${
                          formData.seatingArea === area.id
                            ? 'bg-sky-50 border-sky-400 text-sky-900 font-semibold'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        {area.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Special notes */}
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Ghi chú đặc biệt
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Cần chuẩn bị bánh sinh nhật, ổ cắm cho 3 laptop..."
                    value={formData.notes}
                    onChange={(e) => setFormData({ ...formData, notes: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3 rounded-xl bg-sky-700 text-white font-medium text-xs sm:text-sm shadow-frost hover:bg-sky-800 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang gửi thông tin...</span>
                  </>
                ) : (
                  <span>Xác Nhận Đặt Bàn Ngay</span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
