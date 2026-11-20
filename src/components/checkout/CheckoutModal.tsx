'use client';

import React, { useState } from 'react';
import { useCart } from '@/context/CartContext';
import { useToast } from '@/context/ToastContext';
import { apiMock, OrderResult } from '@/services/apiMock';
import { CheckoutFormData } from '@/types';
import { X, CheckCircle2, Loader2, Coffee, ShoppingBag, Truck, CreditCard, QrCode, Banknote, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CheckoutModal() {
  const { isCheckoutOpen, setIsCheckoutOpen, cartItems, discountAmount, finalTotal, clearCart } = useCart();
  const { showToast } = useToast();

  const [formData, setFormData] = useState<CheckoutFormData>({
    fullName: '',
    phone: '',
    orderType: 'dine-in',
    tableNumber: '05',
    deliveryAddress: '',
    paymentMethod: 'cash',
    notes: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [orderResult, setOrderResult] = useState<OrderResult | null>(null);

  if (!isCheckoutOpen) return null;

  const handleSubmitOrder = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.fullName || !formData.phone) {
      showToast('Vui lòng cung cấp họ tên và số điện thoại.', 'error');
      return;
    }

    if (formData.orderType === 'delivery' && !formData.deliveryAddress) {
      showToast('Vui lòng cung cấp địa chỉ giao nhận hàng.', 'error');
      return;
    }

    setIsSubmitting(true);
    try {
      const res = await apiMock.createOrder(formData, cartItems, discountAmount);
      if (res.success && res.data) {
        setOrderResult(res.data);
        clearCart();
        showToast(res.message, 'success');
      } else {
        showToast(res.message, 'error');
      }
    } catch {
      showToast('Đã có lỗi xảy ra khi tạo đơn hàng.', 'error');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleClose = () => {
    setOrderResult(null);
    setIsCheckoutOpen(false);
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[140] flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.95 }}
          className="relative bg-white w-full max-w-xl rounded-3xl shadow-frost-lg border border-slate-200 overflow-hidden my-auto max-h-[96vh] flex flex-col"
        >
          {/* Close button */}
          <button
            onClick={handleClose}
            className="absolute top-4 right-4 z-10 w-9 h-9 rounded-full bg-slate-100 text-slate-500 hover:text-slate-800 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {orderResult ? (
            /* Order Success Screen */
            <div className="p-8 text-center space-y-5">
              <div className="w-16 h-16 rounded-full bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto">
                <CheckCircle2 className="w-10 h-10" />
              </div>

              <div className="space-y-2">
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-100 text-emerald-800">
                  Đã tiếp nhận đơn hàng
                </span>
                <h3 className="text-2xl font-serif font-medium text-slate-900">
                  Cảm ơn bạn, {orderResult.customerName}!
                </h3>
                <p className="text-xs text-slate-500 max-w-sm mx-auto leading-relaxed">
                  Đơn hàng của bạn đã được chuyển tới quầy Barista Hacha Phố Hạ.
                </p>
              </div>

              {/* Order Receipt */}
              <div className="p-5 rounded-2xl bg-slate-50 border border-slate-200 text-left space-y-3">
                <div className="flex justify-between items-center pb-2 border-b border-slate-200">
                  <div>
                    <span className="text-xs text-slate-400">Mã đơn hàng</span>
                    <div className="text-lg font-mono font-bold text-sky-900">
                      #{orderResult.orderId}
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs text-slate-400">Dự kiến hoàn thành</span>
                    <div className="text-xs font-semibold text-emerald-700">
                      {orderResult.estimatedTime}
                    </div>
                  </div>
                </div>

                <div className="flex justify-between text-xs text-slate-600">
                  <span>Hình thức:</span>
                  <span className="font-semibold text-slate-900 capitalize">
                    {orderResult.orderType === 'dine-in'
                      ? 'Dùng tại quán'
                      : orderResult.orderType === 'takeaway'
                      ? 'Tự mang đi'
                      : 'Giao hàng tận nơi'}
                  </span>
                </div>

                <div className="flex justify-between text-xs text-slate-600">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="font-serif font-bold text-sm text-slate-900">
                    {formatPrice(orderResult.finalAmount)}
                  </span>
                </div>
              </div>

              <button
                onClick={handleClose}
                className="w-full py-3 rounded-xl bg-sky-800 text-white font-medium text-sm hover:bg-sky-900 transition-colors"
              >
                Tiếp Tục Khám Phá Trang Chủ
              </button>
            </div>
          ) : (
            /* Checkout Form */
            <form onSubmit={handleSubmitOrder} className="overflow-y-auto p-6 sm:p-8 space-y-6">
              <div className="space-y-1">
                <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
                  Thanh Toán & Đặt Món
                </span>
                <h3 className="text-2xl font-serif font-medium text-slate-900 pt-1">
                  Xác nhận đặt hàng
                </h3>
                <p className="text-xs text-slate-500">
                  Vui lòng chọn hình thức nhận đồ uống và phương thức thanh toán thuận tiện nhất.
                </p>
              </div>

              {/* Order Type Toggle */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Hình thức phục vụ
                </label>
                <div className="grid grid-cols-3 gap-2">
                  {[
                    { id: 'dine-in', label: 'Tại Quán', icon: Coffee },
                    { id: 'takeaway', label: 'Mang Về', icon: ShoppingBag },
                    { id: 'delivery', label: 'Giao Tận Nơi', icon: Truck },
                  ].map((type) => {
                    const IconComp = type.icon;
                    return (
                      <button
                        key={type.id}
                        type="button"
                        onClick={() => setFormData({ ...formData, orderType: type.id as any })}
                        className={`p-3 rounded-xl border flex flex-col items-center gap-1.5 transition-all text-xs font-medium ${
                          formData.orderType === type.id
                            ? 'bg-sky-50 border-sky-500 text-sky-950 font-semibold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-600 hover:bg-slate-50'
                        }`}
                      >
                        <IconComp className="w-4 h-4 text-sky-700" />
                        <span>{type.label}</span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dynamic field based on order type */}
              {formData.orderType === 'dine-in' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Số bàn bạn đang ngồi
                  </label>
                  <input
                    type="text"
                    placeholder="Ví dụ: Bàn 05 (Tầng 1)"
                    value={formData.tableNumber}
                    onChange={(e) => setFormData({ ...formData, tableNumber: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              )}

              {formData.orderType === 'delivery' && (
                <div className="space-y-1">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Địa chỉ giao hàng *
                  </label>
                  <input
                    type="text"
                    required
                    placeholder="Số nhà, tên ngõ, tên đường, quận..."
                    value={formData.deliveryAddress}
                    onChange={(e) => setFormData({ ...formData, deliveryAddress: e.target.value })}
                    className="w-full px-3 py-2 text-xs bg-slate-50 border border-slate-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-sky-500"
                  />
                </div>
              )}

              {/* Customer Info */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-1">
                    Họ tên người nhận *
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
                    Số điện thoại liên hệ *
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

              {/* Payment Method Selector */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Phương thức thanh toán
                </label>
                <div className="space-y-2">
                  {[
                    { id: 'cash', label: 'Tiền mặt khi nhận món', desc: 'Thanh toán trực tiếp cho nhân viên', icon: Banknote },
                    { id: 'transfer', label: 'Chuyển khoản VietQR tức thì', desc: 'Quét mã QR chuyển khoản 24/7', icon: QrCode },
                    { id: 'momo', label: 'Ví điện tử MoMo', desc: 'Thanh toán qua app MoMo', icon: CreditCard },
                  ].map((p) => {
                    const IconComp = p.icon;
                    return (
                      <div
                        key={p.id}
                        onClick={() => setFormData({ ...formData, paymentMethod: p.id as any })}
                        className={`flex items-center justify-between p-3 rounded-xl border text-xs cursor-pointer transition-all ${
                          formData.paymentMethod === p.id
                            ? 'bg-sky-50 border-sky-400 text-sky-950 font-medium'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <IconComp className="w-4 h-4 text-sky-700" />
                          <div>
                            <div className="font-semibold">{p.label}</div>
                            <div className="text-[11px] text-slate-400 font-normal">{p.desc}</div>
                          </div>
                        </div>
                        <div
                          className={`w-4 h-4 rounded-full border-2 flex items-center justify-center ${
                            formData.paymentMethod === p.id ? 'border-sky-600 bg-sky-600' : 'border-slate-300'
                          }`}
                        >
                          {formData.paymentMethod === p.id && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Order Summary Snapshot */}
              <div className="p-3.5 rounded-xl bg-slate-50 border border-slate-200 text-xs space-y-1.5">
                <div className="flex justify-between text-slate-600">
                  <span>Số lượng món:</span>
                  <span className="font-semibold">{cartItems.length} món</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Đã giảm giá:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-slate-900 font-bold text-sm pt-1 border-t border-slate-200">
                  <span>Tổng tiền thanh toán:</span>
                  <span className="text-sky-800">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-3.5 rounded-xl bg-sky-700 text-white font-medium text-xs sm:text-sm shadow-frost hover:bg-sky-800 transition-all flex items-center justify-center gap-2"
              >
                {isSubmitting ? (
                  <>
                    <Loader2 className="w-4 h-4 animate-spin" />
                    <span>Đang gửi đơn hàng...</span>
                  </>
                ) : (
                  <span>Xác Nhận & Đặt Hàng ({formatPrice(finalTotal)})</span>
                )}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
