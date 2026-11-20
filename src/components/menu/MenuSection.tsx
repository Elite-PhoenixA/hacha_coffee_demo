'use client';

import React, { useState, useMemo } from 'react';
import { MOCK_MENU } from '@/data/mockData';
import { MenuItemCard } from './MenuItemCard';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Search, Sparkles, Coffee, Flame, CupSoda, Croissant, Filter, X } from 'lucide-react';
import { CategoryType } from '@/types';

export function MenuSection() {
  const [activeCategory, setActiveCategory] = useState<CategoryType>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeTag, setActiveTag] = useState<string>('all');

  const categories = [
    { id: 'all', label: 'Tất cả món', icon: Sparkles },
    { id: 'signature', label: 'Signature Phố Hạ', icon: Coffee },
    { id: 'coffee', label: 'Cà phê Mộc', icon: Coffee },
    { id: 'cold-brew', label: 'Cold Brew Ủ 18h', icon: CupSoda },
    { id: 'tea', label: 'Trà Hoa Quả', icon: CupSoda },
    { id: 'pastry', label: 'Bánh Ngọt Tươi', icon: Croissant },
  ];

  const quickFilterTags = [
    { id: 'all', label: 'Tất cả' },
    { id: 'Bestseller', label: 'Bán chạy nhất' },
    { id: 'Signature', label: 'Signature' },
    { id: 'Mới', label: 'Món mới' },
    { id: 'Healthy', label: 'Thanh lọc / Ít ngọt' },
  ];

  const filteredItems = useMemo(() => {
    return MOCK_MENU.filter((item) => {
      // Category filter
      const matchCategory = activeCategory === 'all' || item.category === activeCategory;

      // Tag filter
      const matchTag =
        activeTag === 'all' ||
        item.badge === activeTag ||
        item.tags.some((t) => t.toLowerCase().includes(activeTag.toLowerCase()));

      // Search query filter (normalize Vietnamese search)
      const q = searchQuery.toLowerCase().trim();
      const matchQuery =
        !q ||
        item.name.toLowerCase().includes(q) ||
        item.subname.toLowerCase().includes(q) ||
        item.description.toLowerCase().includes(q) ||
        item.tags.some((t) => t.toLowerCase().includes(q));

      return matchCategory && matchTag && matchQuery;
    });
  }, [activeCategory, activeTag, searchQuery]);

  return (
    <section id="menu" className="py-20 sm:py-28 bg-slate-50/60 relative">
      {/* Decorative Blur */}
      <div className="absolute top-1/2 left-0 w-72 h-72 bg-sky-100/50 rounded-full blur-3xl pointer-events-none -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Thực Đơn Tinh Tế"
          title="Menu đồ uống & Bánh ngọt Phố Hạ"
          subtitle="Từng món được tinh tuyển và pha chế thủ công theo đơn đặt của bạn, cam kết sử dụng nguyên liệu mộc tự nhiên và sữa tươi thanh trùng."
        />

        {/* Search & Category Filter Navigation Bar */}
        <div className="space-y-4 mb-10">
          {/* Category Tabs (Desktop & Horizontal Scroll for Mobile) */}
          <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none sm:justify-center">
            {categories.map((cat) => {
              const IconComp = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveCategory(cat.id as CategoryType)}
                  className={`flex items-center gap-2 px-4 py-2.5 rounded-full text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-200 shadow-xs ${
                    isActive
                      ? 'bg-sky-700 text-white shadow-frost border border-sky-700'
                      : 'bg-white text-slate-700 hover:text-sky-800 hover:bg-slate-100/80 border border-slate-200/80'
                  }`}
                >
                  <IconComp className={`w-3.5 h-3.5 ${isActive ? 'text-white' : 'text-sky-600'}`} />
                  <span>{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Search bar & Tag filters */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between gap-3 pt-2">
            {/* Search Input Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
              <input
                type="text"
                placeholder="Tìm món: Cà phê muối, cold brew, trà nhài..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-9 py-2.5 bg-white border border-slate-200 rounded-full text-xs sm:text-sm text-slate-800 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-sky-500 shadow-xs"
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 p-0.5 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-3.5 h-3.5" />
                </button>
              )}
            </div>

            {/* Quick Tag Pills */}
            <div className="flex items-center gap-1.5 overflow-x-auto pb-1 sm:pb-0">
              <span className="text-xs text-slate-400 font-medium hidden md:inline">Lọc nhanh:</span>
              {quickFilterTags.map((t) => (
                <button
                  key={t.id}
                  onClick={() => setActiveTag(t.id)}
                  className={`px-3 py-1.5 rounded-full text-xs font-medium whitespace-nowrap transition-colors ${
                    activeTag === t.id
                      ? 'bg-slate-900 text-white shadow-xs'
                      : 'bg-white/80 text-slate-600 border border-slate-200 hover:border-slate-300'
                  }`}
                >
                  {t.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Product Cards Grid */}
        {filteredItems.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {filteredItems.map((item) => (
              <MenuItemCard key={item.id} item={item} />
            ))}
          </div>
        ) : (
          <div className="text-center py-16 bg-white rounded-3xl border border-slate-200/80 shadow-frost-sm max-w-md mx-auto p-8 space-y-3">
            <div className="w-12 h-12 rounded-full bg-sky-50 text-sky-600 flex items-center justify-center mx-auto">
              <Coffee className="w-6 h-6" />
            </div>
            <h4 className="text-base font-semibold text-slate-800">Không tìm thấy món phù hợp</h4>
            <p className="text-xs text-slate-500">
              Hãy thử tìm kiếm với từ khóa khác hoặc bỏ các bộ lọc để xem trọn vẹn menu nhé!
            </p>
            <button
              onClick={() => {
                setSearchQuery('');
                setActiveCategory('all');
                setActiveTag('all');
              }}
              className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-sky-700 hover:text-sky-800 underline"
            >
              Đặt lại tất cả bộ lọc
            </button>
          </div>
        )}
      </div>
    </section>
  );
}
