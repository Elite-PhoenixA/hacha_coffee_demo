'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Sparkles, Feather, Wind, HeartHandshake, CheckCircle2 } from 'lucide-react';

export function AboutSection() {
  const pillars = [
    {
      icon: Feather,
      title: 'Hương Vị Tinh Khôi',
      desc: 'Chúng tôi ưu tiên cà phê rang mộc sáng màu (light & medium roast), bảo tồn nguyên vẹn nốt hương hoa cỏ, mật ong và vị chua thanh tao từ vùng cao Cầu Đất.',
    },
    {
      icon: Wind,
      title: 'Không Gian Sáng Lạnh Tinh Tế',
      desc: 'Từng mét vuông tại Hacha được kiến tạo với tinh thần tối giản: ánh sáng tự nhiên ngập tràn, bảng màu xám bạc - xanh băng thanh khiết, xua tan mọi ồn ã phố phường.',
    },
    {
      icon: HeartHandshake,
      title: 'Khoảnh Khắc An Yên',
      desc: 'Dù bạn ghé thăm để làm việc, đọc một cuốn sách hay hẹn hò bạn bè, Hacha luôn dành cho bạn một góc bàn êm ái cùng sự phục vụ chân thành, tinh tế nhất.',
    },
  ];

  return (
    <section id="about" className="py-20 sm:py-28 bg-white relative overflow-hidden">
      {/* Decorative Light Backdrop */}
      <div className="absolute top-0 right-0 w-80 h-80 bg-sky-50/70 rounded-full blur-3xl -z-10" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <SectionHeading
          badge="Câu Chuyện Thương Hiệu"
          title="Nét bình yên tinh tế mang tên Phố Hạ"
          subtitle="Hacha ra đời từ ước vọng tạo dựng một trạm dừng chân trong trẻo, nơi tách cà phê không chỉ là thức uống mà còn là nhịp cầu kết nối tâm hồn."
        />

        {/* Story Narrative & Visual Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
          {/* Photos Mosaic */}
          <div className="lg:col-span-6 grid grid-cols-2 gap-4 sm:gap-5">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="space-y-4 sm:space-y-5"
            >
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-frost border border-slate-200/70 group">
                <Image
                  src="/images/space/atmosphere-2.jpg"
                  alt="Không gian sáng lạnh Hacha Phố Hạ"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
              <div className="p-4 sm:p-5 rounded-2xl bg-sky-50/80 border border-sky-100 shadow-frost-sm">
                <div className="text-2xl sm:text-3xl font-serif font-light text-sky-900">100%</div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">Cà phê rang mộc thủ công không tẩm ướp phụ gia</div>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="space-y-4 sm:space-y-5 pt-6 sm:pt-8"
            >
              <div className="p-4 sm:p-5 rounded-2xl bg-slate-100/80 border border-slate-200 shadow-frost-sm">
                <div className="text-2xl sm:text-3xl font-serif font-light text-slate-900">4.9 / 5.0</div>
                <div className="text-xs sm:text-sm text-slate-600 mt-1">Mức độ hài lòng của khách hàng thân thiết</div>
              </div>
              <div className="relative aspect-[3/4] rounded-2xl overflow-hidden shadow-frost border border-slate-200/70 group">
                <Image
                  src="/images/space/atmosphere-3.jpg"
                  alt="Ly cà phê thủ công tại Hacha"
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              </div>
            </motion.div>
          </div>

          {/* Narrative Content */}
          <div className="lg:col-span-6 space-y-8">
            <div className="space-y-4">
              <h3 className="text-2xl sm:text-3xl font-serif font-normal text-slate-900 leading-snug">
                Triết lý đơn giản, thanh tao trong từng tách thức uống
              </h3>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Tại Hacha Phố Hạ, chúng tôi tin rằng cái đẹp nằm ở sự tối giản. Giữa những tất bật
                của cuộc sống hiện đại, một không gian thoáng đãng với ánh sáng tự nhiên dịu nhẹ,
                tiếng nước chảy chậm rãi qua bộ lọc pour over và mùi thơm thoang thoảng của bơ bánh
                mới nướng chính là món quà tinh thần quý giá nhất.
              </p>
              <p className="text-slate-600 text-sm sm:text-base leading-relaxed">
                Từng công thức từ Phố Hạ Cold Drip, Cà Phê Muối Sương Mai đến Trà Nhài Mộc Lan đều
                được tinh chỉnh qua hàng trăm lần thử nghiệm để đạt độ cân bằng lý tưởng: thanh
                khiết ở đầu lưỡi và êm dịu nơi cuống họng.
              </p>
            </div>

            {/* 3 Pillars List */}
            <div className="space-y-5 pt-2">
              {pillars.map((item, idx) => {
                const IconComponent = item.icon;
                return (
                  <div key={idx} className="flex items-start gap-4 p-4 rounded-xl hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-200/80">
                    <div className="w-10 h-10 rounded-xl bg-sky-100/80 text-sky-700 flex items-center justify-center shrink-0 mt-0.5">
                      <IconComponent className="w-5 h-5" />
                    </div>
                    <div>
                      <h4 className="text-base font-semibold text-slate-900">{item.title}</h4>
                      <p className="text-xs sm:text-sm text-slate-500 mt-1 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
