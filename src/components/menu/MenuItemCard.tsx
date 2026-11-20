'use client';

import React from 'react';
import Image from 'next/image';
import { MenuItem } from '@/types';
import { Badge } from '@/components/ui/Badge';
import { Star, Plus, Flame } from 'lucide-react';
import { useCart } from '@/context/CartContext';

interface MenuItemCardProps {
  item: MenuItem;
}

export function MenuItemCard({ item }: MenuItemCardProps) {
  const { openCustomizeModal, addToCart } = useCart();

  const handleQuickAdd = (e: React.MouseEvent) => {
    e.stopPropagation();
    addToCart(item);
  };

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <div
      onClick={() => openCustomizeModal(item)}
      className="group relative bg-white rounded-2xl border border-slate-200/80 shadow-frost-sm hover:shadow-frost-lg transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer"
    >
      {/* Product Image Frame */}
      <div className="relative aspect-[4/3] w-full overflow-hidden bg-slate-100">
        <Image
          src={item.image}
          alt={item.name}
          fill
          className="object-cover group-hover:scale-105 transition-transform duration-500 ease-out"
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
        />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 z-10">
          {item.badge && (
            <Badge
              variant={
                item.badge === 'Signature'
                  ? 'signature'
                  : item.badge === 'Bestseller'
                  ? 'bestseller'
                  : item.badge === 'Mới'
                  ? 'new'
                  : 'season'
              }
            >
              {item.badge}
            </Badge>
          )}
        </div>

        {/* Temperature indicator tag */}
        <div className="absolute top-3 right-3 z-10 flex gap-1">
          {item.temperatureOptions.includes('iced') && (
            <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[11px] font-medium text-sky-700 shadow-xs">
              Đá
            </span>
          )}
          {item.temperatureOptions.includes('hot') && (
            <span className="px-2 py-0.5 rounded-md bg-white/90 backdrop-blur-sm text-[11px] font-medium text-amber-700 shadow-xs">
              Nóng
            </span>
          )}
        </div>

        {/* Quick View Hover Hint */}
        <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center pointer-events-none">
          <span className="px-3 py-1.5 rounded-full bg-white/90 backdrop-blur-md text-xs font-semibold text-slate-900 shadow-sm">
            Xem chi tiết & Tùy chỉnh
          </span>
        </div>
      </div>

      {/* Product Information */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-3">
        <div className="space-y-1.5">
          {/* Rating & Calories */}
          <div className="flex items-center justify-between text-xs text-slate-500">
            <div className="flex items-center gap-1 font-medium text-slate-700">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span>{item.rating.toFixed(1)}</span>
              <span className="text-slate-400 font-normal">({item.reviewsCount})</span>
            </div>
            {item.calories && (
              <span className="text-slate-400 font-mono text-[11px]">
                {item.calories} kcal
              </span>
            )}
          </div>

          {/* Name & Subname */}
          <h3 className="font-serif text-lg sm:text-xl font-medium text-slate-900 group-hover:text-sky-800 transition-colors leading-snug line-clamp-1">
            {item.name}
          </h3>
          <p className="text-xs text-sky-900/70 font-medium line-clamp-1">
            {item.subname}
          </p>
          <p className="text-xs text-slate-500 line-clamp-2 leading-relaxed">
            {item.description}
          </p>
        </div>

        {/* Price & Action Button */}
        <div className="pt-2 border-t border-slate-100 flex items-center justify-between gap-2">
          <div className="flex items-baseline gap-2">
            <span className="text-base sm:text-lg font-serif font-semibold text-slate-900">
              {formatPrice(item.price)}
            </span>
            {item.originalPrice && (
              <span className="text-xs text-slate-400 line-through">
                {formatPrice(item.originalPrice)}
              </span>
            )}
          </div>

          <button
            onClick={handleQuickAdd}
            className="w-8 h-8 sm:w-9 sm:h-9 rounded-full bg-sky-50 text-sky-700 hover:bg-sky-600 hover:text-white flex items-center justify-center transition-all duration-200 shadow-xs active:scale-95 border border-sky-200/80"
            title="Thêm vào giỏ"
            aria-label="Thêm nhanh"
          >
            <Plus className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
