'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { X, ZoomIn, Camera } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface GalleryPhoto {
  id: string;
  src: string;
  title: string;
  category: 'space' | 'drinks' | 'work';
  desc: string;
}

export function SpaceGallerySection() {
  const [activeTab, setActiveTab] = useState<'all' | 'space' | 'drinks' | 'work'>('all');
  const [previewImage, setPreviewImage] = useState<GalleryPhoto | null>(null);

  const photos: GalleryPhoto[] = [
    {
      id: 'p-1',
      src: '/images/space/atmosphere-1.jpg',
      title: 'Hiên Quán Sáng Lạnh',
      category: 'space',
      desc: 'Ánh sáng sớm mai chan hòa qua khung cửa kính tràn viền',
    },
    {
      id: 'p-2',
      src: '/images/products/coffee-1.jpg',
      title: 'Quầy Bar Pha Chế Thủ Công',
      category: 'drinks',
      desc: 'Nơi từng giọt cold drip được chiết xuất chậm rãi',
    },
    {
      id: 'p-3',
      src: '/images/space/atmosphere-2.jpg',
      title: 'Góc Tĩnh Lặng Làm Việc',
      category: 'work',
      desc: 'Bàn gỗ sồi thanh lịch, cắm sạc đa năng và không gian yên ắng',
    },
    {
      id: 'p-4',
      src: '/images/products/tea-pastry-1.jpg',
      title: 'Trà Nhài Mộc Lan',
      category: 'drinks',
      desc: 'Hương thơm thanh thuần xoa dịu tinh thần',
    },
    {
      id: 'p-5',
      src: '/images/space/atmosphere-3.jpg',
      title: 'Bàn Trà Dưới Vòm Cây',
      category: 'space',
      desc: 'Mảng xanh mát lành bên trong tone kiến trúc sáng lạnh',
    },
    {
      id: 'p-6',
      src: '/images/products/tea-pastry-4.jpg',
      title: 'Bánh Bơ Nướng Giòn',
      category: 'drinks',
      desc: 'Món ăn kèm hoàn hảo cho ly cà phê sáng',
    },
  ];

  const filtered = photos.filter((p) => activeTab === 'all' || p.category === activeTab);

  return (
    <section id="space" className="py-20 sm:py-28 bg-white relative">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Không Gian Quán"
          title="Từng góc nhỏ đều mang sự bình yên"
          subtitle="Được thiết kế theo phong cách tối giản thanh lịch với bảng màu sáng tone lạnh, ánh sáng tự nhiên và cây xanh tạo nên sự cân bằng hoàn hảo."
        />

        {/* Gallery Tabs */}
        <div className="flex items-center justify-center gap-2 mb-10 flex-wrap">
          {[
            { id: 'all', label: 'Tất Cả Góc Quán' },
            { id: 'space', label: 'Không Gian & Kiến Trúc' },
            { id: 'work', label: 'Góc Làm Việc & Đọc Sách' },
            { id: 'drinks', label: 'Nghệ Thuật Pha Chế' },
          ].map((tab) => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id as any)}
              className={`px-4 py-2 rounded-full text-xs sm:text-sm font-medium transition-all ${
                activeTab === tab.id
                  ? 'bg-sky-800 text-white shadow-xs'
                  : 'bg-slate-100 text-slate-600 hover:bg-slate-200'
              }`}
            >
              {tab.label}
            </button>
          ))}
        </div>

        {/* Masonry / Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {filtered.map((photo) => (
            <div
              key={photo.id}
              onClick={() => setPreviewImage(photo)}
              className="group relative rounded-2xl overflow-hidden aspect-[4/3] bg-slate-100 cursor-pointer shadow-frost-sm hover:shadow-frost-lg transition-all duration-300 border border-slate-200/80"
            >
              <Image
                src={photo.src}
                alt={photo.title}
                fill
                className="object-cover group-hover:scale-105 transition-transform duration-500"
              />

              {/* Hover Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-slate-950/80 via-slate-900/30 to-transparent opacity-0 group-hover:opacity-100 transition-opacity flex flex-col justify-end p-5 text-white">
                <span className="text-xs uppercase tracking-wider text-sky-300 font-semibold">
                  Hacha Phố Hạ
                </span>
                <h4 className="text-lg font-serif font-medium">{photo.title}</h4>
                <p className="text-xs text-slate-200 mt-1">{photo.desc}</p>
                <div className="mt-3 flex items-center gap-1.5 text-xs text-sky-200 font-medium">
                  <ZoomIn className="w-3.5 h-3.5" />
                  <span>Xem ảnh phóng to</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Lightbox Modal */}
      <AnimatePresence>
        {previewImage && (
          <div
            onClick={() => setPreviewImage(null)}
            className="fixed inset-0 z-[120] bg-slate-950/85 backdrop-blur-md flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              onClick={(e) => e.stopPropagation()}
              className="relative max-w-4xl w-full bg-white rounded-3xl overflow-hidden shadow-2xl"
            >
              <button
                onClick={() => setPreviewImage(null)}
                className="absolute top-4 right-4 z-20 w-10 h-10 rounded-full bg-slate-900/70 text-white hover:bg-slate-900 flex items-center justify-center transition-colors"
              >
                <X className="w-5 h-5" />
              </button>

              <div className="relative aspect-[16/10] w-full bg-slate-950">
                <Image
                  src={previewImage.src}
                  alt={previewImage.title}
                  fill
                  className="object-contain"
                />
              </div>

              <div className="p-5 sm:p-6 bg-white flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
                <div>
                  <h3 className="text-xl font-serif font-medium text-slate-900">
                    {previewImage.title}
                  </h3>
                  <p className="text-xs text-slate-500 mt-0.5">{previewImage.desc}</p>
                </div>
                <span className="px-3 py-1 rounded-full text-xs font-semibold bg-sky-100 text-sky-900">
                  Không Gian Hacha
                </span>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </section>
  );
}
