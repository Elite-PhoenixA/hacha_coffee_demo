'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { MOCK_COLLECTIONS, MOCK_MENU } from '@/data/mockData';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { useCart } from '@/context/CartContext';
import { Sparkles, ArrowRight, Check, ShoppingBag, Layers } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export function CollectionsSection() {
  const [selectedColId, setSelectedColId] = useState(MOCK_COLLECTIONS[0].id);
  const { addToCart, openCustomizeModal } = useCart();

  const activeCollection = MOCK_COLLECTIONS.find((c) => c.id === selectedColId) || MOCK_COLLECTIONS[0];

  // Get products included in this collection
  const featuredProducts = MOCK_MENU.filter((m) =>
    activeCollection.featuredProductIds.includes(m.id)
  );

  const handleAddAllToCart = () => {
    featuredProducts.forEach((item) => {
      addToCart(item);
    });
  };

  const formatPrice = (p: number) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(p);
  };

  const comboTotal = featuredProducts.reduce((sum, item) => sum + item.price, 0);

  return (
    <section id="collections" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Bộ Sưu Tập Mới"
          title="Những câu chuyện đượm hương Phố Hạ"
          subtitle="Mỗi bộ sưu tập là một chương cảm xúc được chúng tôi kể lại bằng sự kết hợp tinh tế giữa nghệ thuật phối hạt và nguồn thảo mộc bản địa."
        />

        {/* Collection Selector Tabs */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 flex-wrap mb-10 sm:mb-12">
          {MOCK_COLLECTIONS.map((col) => (
            <button
              key={col.id}
              onClick={() => setSelectedColId(col.id)}
              className={`px-4 sm:px-6 py-2.5 rounded-full text-xs sm:text-sm font-medium transition-all duration-300 shadow-xs ${
                selectedColId === col.id
                  ? 'bg-sky-800 text-white shadow-frost-sm scale-105'
                  : 'bg-slate-100/80 text-slate-700 hover:bg-slate-200/80'
              }`}
            >
              {col.title}
            </button>
          ))}
        </div>

        {/* Active Collection Showcase Card */}
        <AnimatePresence mode="wait">
          <motion.div
            key={activeCollection.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            transition={{ duration: 0.4 }}
            className="rounded-3xl border border-slate-200/80 bg-gradient-to-br from-slate-50 via-white to-sky-50/40 p-6 sm:p-10 shadow-frost-lg"
          >
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
              {/* Left Visual Banner */}
              <div className="lg:col-span-5 relative aspect-[4/3] sm:aspect-[1/1] rounded-2xl overflow-hidden shadow-frost border-2 border-white">
                <Image
                  src={activeCollection.image}
                  alt={activeCollection.title}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-white/90 backdrop-blur-md text-sky-900 shadow-sm border border-white">
                    {activeCollection.badge}
                  </span>
                </div>
              </div>

              {/* Right Content & Paired Products */}
              <div className="lg:col-span-7 space-y-6">
                <div>
                  <div className="text-xs font-bold uppercase tracking-widest text-sky-700 mb-1">
                    {activeCollection.subtitle}
                  </div>
                  <h3 className="text-3xl sm:text-4xl font-serif font-light text-slate-900 leading-tight">
                    {activeCollection.title}
                  </h3>
                  <p className="mt-3 text-sm sm:text-base text-slate-600 leading-relaxed font-normal">
                    {activeCollection.description}
                  </p>
                </div>

                {/* Flavor Notes Chips */}
                <div className="space-y-2">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-400">
                    Nốt hương chủ đạo:
                  </span>
                  <div className="flex flex-wrap gap-2">
                    {activeCollection.flavorNotes.map((note, idx) => (
                      <span
                        key={idx}
                        className="px-3 py-1 rounded-lg text-xs font-medium bg-white text-slate-700 border border-slate-200 shadow-2xs"
                      >
                        ✦ {note}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Featured Products Included in this Collection */}
                <div className="space-y-3 pt-2">
                  <div className="flex items-center justify-between text-xs font-bold uppercase tracking-wider text-slate-500">
                    <span>Các món trong bộ sưu tập:</span>
                    <span>{featuredProducts.length} món</span>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    {featuredProducts.map((p) => (
                      <div
                        key={p.id}
                        onClick={() => openCustomizeModal(p)}
                        className="flex sm:flex-col items-center sm:items-start gap-3 p-3 rounded-xl bg-white border border-slate-200/80 hover:border-sky-300 shadow-xs cursor-pointer transition-all group"
                      >
                        <div className="relative w-12 h-12 sm:w-full sm:aspect-[4/3] rounded-lg overflow-hidden bg-slate-100 shrink-0">
                          <Image
                            src={p.image}
                            alt={p.name}
                            fill
                            className="object-cover group-hover:scale-105 transition-transform"
                          />
                        </div>
                        <div className="flex-1 min-w-0">
                          <h4 className="text-xs font-bold text-slate-800 truncate group-hover:text-sky-800">
                            {p.name}
                          </h4>
                          <p className="text-[11px] text-sky-700 font-semibold mt-0.5">
                            {formatPrice(p.price)}
                          </p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Action CTA */}
                <div className="pt-4 border-t border-slate-200/70 flex flex-col sm:flex-row items-center justify-between gap-4">
                  <div className="text-xs text-slate-500 text-center sm:text-left">
                    Giá trọn bộ combo:{' '}
                    <span className="text-lg font-serif font-bold text-slate-900 ml-1">
                      {formatPrice(comboTotal)}
                    </span>
                  </div>

                  <button
                    onClick={handleAddAllToCart}
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full text-xs sm:text-sm font-semibold bg-sky-700 text-white shadow-frost hover:bg-sky-800 transition-all duration-200"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    <span>Thêm Cả Bộ Sưu Tập Vào Giỏ</span>
                  </button>
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </section>
  );
}
