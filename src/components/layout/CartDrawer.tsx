'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { X, Trash2, Plus, Minus, ShoppingBag, ArrowRight, Tag, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CartDrawer() {
  const {
    isCartOpen,
    setIsCartOpen,
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    subtotal,
    discountAmount,
    finalTotal,
    coupon,
    applyCouponCode,
    removeCoupon,
    setIsCheckoutOpen,
  } = useCart();

  const [couponInput, setCouponInput] = useState('');
  const [isApplying, setIsApplying] = useState(false);

  const handleApplyCoupon = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    setIsApplying(true);
    await applyCouponCode(couponInput);
    setIsApplying(false);
    setCouponInput('');
  };

  const handleProceedCheckout = () => {
    setIsCartOpen(false);
    setIsCheckoutOpen(true);
  };

  const formatPrice = (val: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);
  };

  if (!isCartOpen) return null;

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[130] flex justify-end">
        {/* Backdrop */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setIsCartOpen(false)}
          className="fixed inset-0 bg-slate-900/50 backdrop-blur-xs transition-opacity"
        />

        {/* Drawer Panel */}
        <motion.div
          initial={{ x: '100%' }}
          animate={{ x: 0 }}
          exit={{ x: '100%' }}
          transition={{ type: 'spring', damping: 28, stiffness: 280 }}
          className="relative w-full max-w-md bg-white h-full shadow-2xl flex flex-col z-10"
        >
          {/* Drawer Header */}
          <div className="p-4 sm:p-5 border-b border-slate-200/80 flex items-center justify-between bg-slate-50/70">
            <div className="flex items-center gap-2">
              <ShoppingBag className="w-5 h-5 text-sky-700" />
              <h3 className="font-serif text-lg font-medium text-slate-900">
                Giỏ Hàng Của Bạn
              </h3>
              <span className="px-2 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
                {cartItems.reduce((acc, it) => acc + it.quantity, 0)} món
              </span>
            </div>

            <button
              onClick={() => setIsCartOpen(false)}
              className="p-1.5 rounded-full text-slate-400 hover:text-slate-700 hover:bg-slate-200/70 transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          {/* Cart Items List */}
          <div className="flex-1 overflow-y-auto p-4 sm:p-5 space-y-4">
            {cartItems.length === 0 ? (
              <div className="h-full flex flex-col items-center justify-center text-center p-6 space-y-4">
                <div className="w-16 h-16 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center">
                  <ShoppingBag className="w-8 h-8 stroke-[1.5]" />
                </div>
                <div className="space-y-1">
                  <div className="text-base font-semibold text-slate-800">
                    Giỏ hàng của bạn đang trống
                  </div>
                  <p className="text-xs text-slate-500 max-w-xs leading-relaxed">
                    Hãy lựa chọn những món cà phê và trà thanh khiết tại thực đơn của Hacha nhé!
                  </p>
                </div>
                <button
                  onClick={() => setIsCartOpen(false)}
                  className="px-5 py-2.5 rounded-full text-xs font-medium bg-sky-700 text-white hover:bg-sky-800 shadow-xs transition-colors"
                >
                  Khám Phá Menu Ngay
                </button>
              </div>
            ) : (
              cartItems.map((cartItem) => (
                <div
                  key={cartItem.cartId}
                  className="p-3.5 rounded-2xl bg-white border border-slate-200/80 shadow-frost-sm flex gap-3 relative group"
                >
                  {/* Item Image */}
                  <div className="relative w-16 h-16 rounded-xl overflow-hidden bg-slate-100 shrink-0 border border-slate-100">
                    <Image
                      src={cartItem.item.image}
                      alt={cartItem.item.name}
                      fill
                      className="object-cover"
                    />
                  </div>

                  {/* Item Info */}
                  <div className="flex-1 min-w-0 space-y-1">
                    <div className="flex items-start justify-between gap-1">
                      <h4 className="text-xs sm:text-sm font-semibold text-slate-900 truncate">
                        {cartItem.item.name}
                      </h4>
                      <button
                        onClick={() => removeFromCart(cartItem.cartId)}
                        className="text-slate-300 hover:text-rose-500 transition-colors p-0.5"
                        title="Xóa món"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>

                    {/* Customization Details */}
                    <div className="text-[11px] text-slate-500 flex flex-wrap gap-1">
                      <span className="px-1.5 py-0.2 rounded bg-slate-100">
                        Size {cartItem.selectedSize}
                      </span>
                      {cartItem.item.category !== 'pastry' && (
                        <>
                          <span className="px-1.5 py-0.2 rounded bg-slate-100">
                            {cartItem.selectedTemp === 'iced' ? 'Đá' : 'Nóng'}
                          </span>
                          <span className="px-1.5 py-0.2 rounded bg-slate-100">
                            {cartItem.selectedSugar} đường
                          </span>
                        </>
                      )}
                      {cartItem.selectedToppings.map((top) => (
                        <span key={top.id} className="px-1.5 py-0.2 rounded bg-sky-50 text-sky-800">
                          +{top.name}
                        </span>
                      ))}
                    </div>

                    {cartItem.specialNote && (
                      <p className="text-[10px] text-slate-400 italic truncate">
                        Note: {cartItem.specialNote}
                      </p>
                    )}

                    {/* Price & Quantity Stepper */}
                    <div className="pt-2 flex items-center justify-between">
                      <span className="text-xs sm:text-sm font-serif font-bold text-slate-900">
                        {formatPrice(cartItem.itemTotalPrice)}
                      </span>

                      <div className="flex items-center border border-slate-200 rounded-lg bg-slate-50">
                        <button
                          onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity - 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800"
                        >
                          <Minus className="w-3 h-3" />
                        </button>
                        <span className="w-6 text-center text-xs font-mono font-semibold text-slate-800">
                          {cartItem.quantity}
                        </span>
                        <button
                          onClick={() => updateQuantity(cartItem.cartId, cartItem.quantity + 1)}
                          className="w-6 h-6 flex items-center justify-center text-slate-500 hover:text-slate-800"
                        >
                          <Plus className="w-3 h-3" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            )}
          </div>

          {/* Drawer Footer: Coupon & Summary & Checkout */}
          {cartItems.length > 0 && (
            <div className="p-4 sm:p-5 bg-slate-50/90 border-t border-slate-200 space-y-4">
              {/* Coupon input */}
              {coupon ? (
                <div className="flex items-center justify-between p-2.5 rounded-xl bg-emerald-50 border border-emerald-200 text-xs">
                  <div className="flex items-center gap-2 text-emerald-800 font-medium">
                    <Tag className="w-3.5 h-3.5" />
                    <span>Mã &quot;{coupon.code}&quot; (Giảm {coupon.percent}%)</span>
                  </div>
                  <button
                    onClick={removeCoupon}
                    className="text-xs text-rose-600 hover:underline font-medium"
                  >
                    Hủy mã
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <div className="relative flex-1">
                    <Tag className="absolute left-3 top-1/2 -translate-y-1/2 w-3.5 h-3.5 text-slate-400" />
                    <input
                      type="text"
                      placeholder="Nhập mã ưu đãi (Thử 'HACHA10')"
                      value={couponInput}
                      onChange={(e) => setCouponInput(e.target.value)}
                      className="w-full pl-8 pr-3 py-2 text-xs bg-white border border-slate-200 rounded-xl uppercase tracking-wider placeholder:normal-case focus:outline-none focus:ring-1 focus:ring-sky-500"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={isApplying || !couponInput.trim()}
                    className="px-4 py-2 rounded-xl text-xs font-medium bg-slate-900 text-white hover:bg-slate-800 disabled:opacity-40 transition-colors"
                  >
                    Áp dụng
                  </button>
                </form>
              )}

              {/* Price Calculation */}
              <div className="space-y-1.5 text-xs text-slate-600">
                <div className="flex justify-between">
                  <span>Tạm tính món:</span>
                  <span className="font-medium text-slate-800">{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex justify-between text-emerald-700">
                    <span>Ưu đãi voucher:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex justify-between text-sm sm:text-base font-serif font-bold text-slate-900 pt-2 border-t border-slate-200">
                  <span>Tổng thanh toán:</span>
                  <span className="text-sky-800">{formatPrice(finalTotal)}</span>
                </div>
              </div>

              {/* Checkout Button */}
              <button
                onClick={handleProceedCheckout}
                className="w-full py-3.5 px-4 rounded-xl bg-sky-700 text-white font-semibold text-xs sm:text-sm shadow-frost hover:bg-sky-800 active:scale-[0.99] transition-all flex items-center justify-center gap-2"
              >
                <span>Tiến Hành Đặt Hàng</span>
                <ArrowRight className="w-4 h-4" />
              </button>
            </div>
          )}
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
