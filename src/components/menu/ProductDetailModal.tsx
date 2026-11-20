'use client';

import React, { useState, useEffect } from 'react';
import Image from 'next/image';
import { useCart } from '@/context/CartContext';
import { Topping } from '@/types';
import { X, Star, Plus, Minus, Check, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function ProductDetailModal() {
  const { activeCustomizeItem, closeCustomizeModal, addToCart } = useCart();

  const [quantity, setQuantity] = useState(1);
  const [selectedTemp, setSelectedTemp] = useState<'hot' | 'iced'>('iced');
  const [selectedSize, setSelectedSize] = useState<'M' | 'L'>('M');
  const [selectedSugar, setSelectedSugar] = useState('50%');
  const [selectedIce, setSelectedIce] = useState('Đá vừa');
  const [selectedToppings, setSelectedToppings] = useState<Topping[]>([]);
  const [specialNote, setSpecialNote] = useState('');

  // Reset local state whenever opened with a new item
  useEffect(() => {
    if (activeCustomizeItem) {
      setQuantity(1);
      setSelectedTemp(activeCustomizeItem.temperatureOptions[0] || 'iced');
      setSelectedSize('M');
      setSelectedSugar(activeCustomizeItem.sugarOptions[1] || activeCustomizeItem.sugarOptions[0] || '50%');
      setSelectedIce(activeCustomizeItem.iceOptions[0] || 'Đá vừa');
      setSelectedToppings([]);
      setSpecialNote('');
    }
  }, [activeCustomizeItem]);

  if (!activeCustomizeItem) return null;

  const item = activeCustomizeItem;

  const sizeExtra = item.sizeOptions.find((s) => s.size === selectedSize)?.extraPrice || 0;
  const toppingsExtra = selectedToppings.reduce((acc, t) => acc + t.price, 0);
  const unitPrice = item.price + sizeExtra + toppingsExtra;
  const currentTotal = unitPrice * quantity;

  const toggleTopping = (topping: Topping) => {
    setSelectedToppings((prev) => {
      const exists = prev.some((t) => t.id === topping.id);
      if (exists) {
        return prev.filter((t) => t.id !== topping.id);
      } else {
        return [...prev, topping];
      }
    });
  };

  const handleAddToCart = () => {
    addToCart(item, {
      quantity,
      selectedTemp,
      selectedSize,
      selectedSugar,
      selectedIce,
      selectedToppings,
      specialNote,
    });
    closeCustomizeModal();
  };

  const formatPrice = (amount: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(amount);
  };

  return (
    <AnimatePresence>
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-0 sm:p-4 bg-slate-900/60 backdrop-blur-sm overflow-y-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.96, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.96, y: 20 }}
          transition={{ duration: 0.25 }}
          className="relative bg-white w-full max-w-2xl sm:rounded-3xl shadow-frost-lg border border-slate-200/80 overflow-hidden my-auto max-h-[96vh] flex flex-col"
        >
          {/* Close Button */}
          <button
            onClick={closeCustomizeModal}
            className="absolute top-4 right-4 z-20 w-9 h-9 rounded-full bg-white/90 backdrop-blur-md text-slate-700 hover:text-slate-900 hover:bg-white flex items-center justify-center shadow-frost-sm border border-slate-200/60 transition-colors"
            aria-label="Đóng"
          >
            <X className="w-5 h-5" />
          </button>

          {/* Modal Header Media & Summary */}
          <div className="overflow-y-auto flex-1 p-5 sm:p-7 space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              <div className="sm:col-span-5 relative aspect-[4/3] rounded-2xl overflow-hidden bg-slate-100 border border-slate-200/60 shadow-xs">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
              </div>

              <div className="sm:col-span-7 space-y-2">
                <div className="flex items-center gap-2">
                  {item.badge && (
                    <span className="px-2.5 py-0.5 rounded-full text-xs font-semibold bg-sky-100 text-sky-800">
                      {item.badge}
                    </span>
                  )}
                  <div className="flex items-center gap-1 text-xs text-amber-500 font-medium">
                    <Star className="w-3.5 h-3.5 fill-amber-400" />
                    <span>{item.rating}</span>
                    <span className="text-slate-400">({item.reviewsCount} đánh giá)</span>
                  </div>
                </div>

                <h2 className="text-2xl font-serif font-medium text-slate-900 leading-tight">
                  {item.name}
                </h2>
                <p className="text-xs text-sky-800 font-medium">{item.subname}</p>
                <p className="text-xs text-slate-500 leading-relaxed">{item.description}</p>

                <div className="text-xl font-serif font-bold text-slate-900 pt-1">
                  {formatPrice(item.price)}
                </div>
              </div>
            </div>

            {/* Customization Options */}
            <div className="space-y-5 pt-3 border-t border-slate-100">
              {/* Temperature Selector */}
              {item.temperatureOptions.length > 1 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Nhiệt độ thưởng thức
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.temperatureOptions.map((temp) => (
                      <button
                        key={temp}
                        type="button"
                        onClick={() => setSelectedTemp(temp)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border text-center transition-all ${
                          selectedTemp === temp
                            ? 'bg-sky-600 text-white border-sky-600 shadow-sm'
                            : 'bg-slate-50 text-slate-700 border-slate-200 hover:bg-slate-100'
                        }`}
                      >
                        {temp === 'iced' ? '❄️ Thức uống Đá' : '☕ Thức uống Nóng'}
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Size Selector */}
              {item.sizeOptions.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                    Kích cỡ ly (Size)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {item.sizeOptions.map((opt) => (
                      <button
                        key={opt.size}
                        type="button"
                        onClick={() => setSelectedSize(opt.size)}
                        className={`py-2 px-3 rounded-xl text-xs font-medium border flex items-center justify-between transition-all ${
                          selectedSize === opt.size
                            ? 'bg-sky-50 border-sky-400 text-sky-900 font-semibold shadow-xs'
                            : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                        }`}
                      >
                        <span>Size {opt.size} {opt.size === 'M' ? '(Vừa)' : '(Lớn)'}</span>
                        <span>{opt.extraPrice > 0 ? `+${formatPrice(opt.extraPrice)}` : 'Chuẩn'}</span>
                      </button>
                    ))}
                  </div>
                </div>
              )}

              {/* Sugar & Ice Levels */}
              {item.category !== 'pastry' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Sugar */}
                  {item.sugarOptions.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Lượng đường
                      </label>
                      <select
                        value={selectedSugar}
                        onChange={(e) => setSelectedSugar(e.target.value)}
                        className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {item.sugarOptions.map((s) => (
                          <option key={s} value={s}>
                            Đường: {s}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}

                  {/* Ice */}
                  {selectedTemp === 'iced' && item.iceOptions.length > 0 && (
                    <div className="space-y-2">
                      <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                        Lượng đá
                      </label>
                      <select
                        value={selectedIce}
                        onChange={(e) => setSelectedIce(e.target.value)}
                        className="w-full text-xs font-medium bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-sky-500"
                      >
                        {item.iceOptions.map((i) => (
                          <option key={i} value={i}>
                            {i}
                          </option>
                        ))}
                      </select>
                    </div>
                  )}
                </div>
              )}

              {/* Toppings Selection */}
              {item.toppings && item.toppings.length > 0 && (
                <div className="space-y-2">
                  <label className="text-xs font-bold uppercase tracking-wider text-slate-700 flex items-center justify-between">
                    <span>Topping đặc biệt thêm</span>
                    <span className="text-[11px] text-slate-400 font-normal">Tùy chọn</span>
                  </label>
                  <div className="space-y-2">
                    {item.toppings.map((top) => {
                      const isChecked = selectedToppings.some((t) => t.id === top.id);
                      return (
                        <div
                          key={top.id}
                          onClick={() => toggleTopping(top)}
                          className={`flex items-center justify-between p-2.5 rounded-xl border text-xs cursor-pointer transition-all ${
                            isChecked
                              ? 'bg-sky-50/80 border-sky-300 text-sky-950 font-medium'
                              : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                          }`}
                        >
                          <div className="flex items-center gap-2.5">
                            <div
                              className={`w-4 h-4 rounded-md border flex items-center justify-center transition-colors ${
                                isChecked ? 'bg-sky-600 border-sky-600 text-white' : 'border-slate-300 bg-white'
                              }`}
                            >
                              {isChecked && <Check className="w-3 h-3 stroke-[3]" />}
                            </div>
                            <span>{top.name}</span>
                          </div>
                          <span className="font-semibold text-slate-700">+{formatPrice(top.price)}</span>
                        </div>
                      );
                    })}
                  </div>
                </div>
              )}

              {/* Barista Note */}
              <div className="space-y-2">
                <label className="text-xs font-bold uppercase tracking-wider text-slate-700">
                  Ghi chú cho Barista
                </label>
                <input
                  type="text"
                  placeholder="Ví dụ: Lấy nhiều bọt sữa, tách đá riêng mang về..."
                  value={specialNote}
                  onChange={(e) => setSpecialNote(e.target.value)}
                  className="w-full text-xs bg-slate-50 border border-slate-200 rounded-xl p-2.5 text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500"
                />
              </div>
            </div>
          </div>

          {/* Modal Footer: Quantity Stepper & Add to Cart Button */}
          <div className="p-4 sm:p-5 bg-slate-50/90 border-t border-slate-200/80 flex items-center justify-between gap-4">
            {/* Quantity Stepper */}
            <div className="flex items-center border border-slate-300 rounded-xl bg-white shadow-xs overflow-hidden">
              <button
                type="button"
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
                aria-label="Giảm số lượng"
              >
                <Minus className="w-4 h-4" />
              </button>
              <span className="w-10 text-center text-sm font-bold text-slate-800 font-mono">
                {quantity}
              </span>
              <button
                type="button"
                onClick={() => setQuantity((q) => q + 1)}
                className="w-9 h-9 flex items-center justify-center text-slate-600 hover:bg-slate-100 active:scale-95 transition-all"
                aria-label="Tăng số lượng"
              >
                <Plus className="w-4 h-4" />
              </button>
            </div>

            {/* Submit Action */}
            <button
              type="button"
              onClick={handleAddToCart}
              className="flex-1 py-3 px-5 rounded-xl bg-sky-700 text-white font-medium text-sm shadow-frost hover:bg-sky-800 active:scale-[0.99] transition-all flex items-center justify-between"
            >
              <span>Thêm vào giỏ hàng</span>
              <span className="font-semibold">{formatPrice(currentTotal)}</span>
            </button>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );
}
