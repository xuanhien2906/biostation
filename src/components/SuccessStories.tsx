import React from 'react';
import { Sprout, Quote, MapPin, Heart, ShieldCheck, Award } from 'lucide-react';
import { useSite } from '../context/SiteContext';

export const SuccessStories: React.FC = () => {
  const { siteData } = useSite();
  const stories = siteData?.stories || [];

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 text-[#2d241e] space-y-10">
      {/* Header */}
      <div className="text-center space-y-3">
        <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#274e23]/10 text-[#274e23] text-xs font-bold uppercase tracking-wider">
          <Heart className="w-4 h-4 text-amber-600 fill-amber-500" />
          Nông Dân & Khách Hàng Đồng Hành
        </div>

        <h2 className="text-3xl sm:text-4xl font-black font-serif text-[#274e23]">
          Câu Chuyện Tử Tế Từ Cộng Đồng BiO Station
        </h2>

        <p className="text-[#5c4d43] text-sm max-w-2xl mx-auto leading-relaxed">
          Những trải nghiệm chân thật từ các nông hộ đối tác canh tác thuận tự nhiên và các gia đình đã tin dùng nông sản Bách Mộc.
        </p>
      </div>

      {/* Stories Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {stories.map((story) => (
          <div
            key={story.id}
            className="bg-white rounded-2xl border border-[#e2d5c3] p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between space-y-6"
          >
            <div className="space-y-4">
              <div className="flex items-center gap-3">
                <img
                  src={story.afterImage}
                  alt={story.name}
                  className="w-14 h-14 rounded-full object-cover border-2 border-[#274e23]"
                />
                <div>
                  <h3 className="font-bold font-serif text-base text-[#274e23]">{story.name}</h3>
                  <p className="text-xs font-semibold text-[#a66e2c]">{story.role}</p>
                  <p className="text-[11px] text-[#7a6858] flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-amber-600" />
                    {story.location}
                  </p>
                </div>
              </div>

              <div className="p-4 bg-[#f4ebe0] rounded-2xl border border-[#e2d5c3] relative">
                <Quote className="w-6 h-6 text-[#274e23]/20 absolute top-2 right-2" />
                <p className="text-xs text-[#2d241e] italic font-medium leading-relaxed">
                  "{story.quote}"
                </p>
              </div>

              <p className="text-xs text-[#5c4d43] leading-relaxed">{story.story}</p>
            </div>

            <div className="pt-4 border-t border-[#f0e6d8] space-y-2 text-xs">
              <div className="flex justify-between text-[#7a6858]">
                <span>Mô hình áp dụng:</span>
                <span className="font-bold text-[#274e23]">{story.stationType}</span>
              </div>
              <div className="flex justify-between text-[#7a6858]">
                <span>Kết quả nổi bật:</span>
                <span className="font-bold text-[#a66e2c]">{story.impactMetric}</span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
