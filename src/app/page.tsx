import React from 'react';
import { HeroSection } from '@/components/hero/HeroSection';
import { AboutSection } from '@/components/about/AboutSection';
import { MenuSection } from '@/components/menu/MenuSection';
import { CollectionsSection } from '@/components/collections/CollectionsSection';
import { EventsSection } from '@/components/events/EventsSection';
import { SpaceGallerySection } from '@/components/space/SpaceGallerySection';
import { MapAndContactSection } from '@/components/location/MapAndContactSection';

export default function HomePage() {
  return (
    <>
      {/* 1. Hero Section: Cinematic, Elegant Cool-Tone Showcase */}
      <HeroSection />

      {/* 2. Giới Thiệu (About Us): Câu chuyện Hacha Phố Hạ & Triết lý tối giản */}
      <AboutSection />

      {/* 3. Menu Quán: E-commerce modern interactive menu with tags, search, detail modal & cart */}
      <MenuSection />

      {/* 4. Các Bộ Sưu Tập Mới: Curated seasonal combinations */}
      <CollectionsSection />

      {/* 5. Các Sự Kiện Đang Diễn Ra: Acoustic night, cupping workshop, book club */}
      <EventsSection />

      {/* 6. Không Gian Quán: Real gallery mosaic with lightbox */}
      <SpaceGallerySection />

      {/* 7. Google Map, Địa Chỉ, Giờ Mở Cửa & Đánh Giá Khách Hàng */}
      <MapAndContactSection />
    </>
  );
}
