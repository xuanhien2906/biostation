import React from 'react';
import { useSite } from '../context/SiteContext';

interface BioStationLogoProps {
  variant?: 'full' | 'compact' | 'light' | 'dark' | 'badge';
  className?: string;
  showSlogan?: boolean;
}

export const BioStationLogo: React.FC<BioStationLogoProps> = ({
  variant = 'full',
  className = '',
  showSlogan = true,
}) => {
  const { siteData } = useSite();
  const brandConfig = siteData?.brandConfig || {
    logoType: 'vector',
    logoImageUrl: '',
    logoScale: 100,
    logoOffsetX: 0,
    logoOffsetY: 0,
    logoHeight: 44,
    logoMainText: 'BiO',
    logoSubText: 'Station',
    slogan: 'Chạm để trở về',
  };
  const isDark = variant === 'dark';

  const isImageMode = (brandConfig.logoType === 'image' || brandConfig.logoType === 'combined') && Boolean(brandConfig.logoImageUrl);
  const scale = (brandConfig.logoScale ?? 100) / 100;
  const offsetX = brandConfig.logoOffsetX ?? 0;
  const offsetY = brandConfig.logoOffsetY ?? 0;
  const baseHeight = brandConfig.logoHeight ?? 44;

  const imageTransformStyle: React.CSSProperties = {
    height: `${baseHeight}px`,
    transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
    transformOrigin: 'center center',
    transition: 'transform 0.05s ease-out',
  };

  return (
    <div className={`inline-flex flex-col items-center justify-center ${className}`}>
      <div className="flex items-center gap-3">
        {isImageMode ? (
          <div className="relative flex items-center justify-center shrink-0 overflow-visible py-1">
            <img
              src={brandConfig.logoImageUrl}
              alt={brandConfig.logoMainText || 'Logo'}
              style={imageTransformStyle}
              className="w-auto max-w-none object-contain select-none"
            />
          </div>
        ) : (
          /* Vector Mark of Sun + Rice Stalk + BiO Brush */
          <div className="relative flex items-center justify-center shrink-0">
            <svg
              viewBox="0 0 160 80"
              className="h-10 sm:h-12 w-auto"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              {/* Sun above 'i' */}
              <circle cx="72" cy="18" r="6" fill="#d97706" />
              <path
                d="M72 8V10M72 26V28M62 18H64M80 18H82M65 11L66.5 12.5M77.5 23.5L79 25M65 25L66.5 23.5M77.5 12.5L79 11"
                stroke="#d97706"
                strokeWidth="2"
                strokeLinecap="round"
              />

              {/* Brush Script 'B' */}
              <path
                d="M18 60 C 14 45, 18 25, 28 22 C 38 19, 44 28, 40 38 C 36 48, 22 46, 20 48 C 18 50, 32 50, 42 48 C 50 46, 52 56, 44 60 C 34 65, 18 64, 18 60 Z"
                fill={isDark ? '#4ade80' : '#274e23'}
              />

              {/* Brush Script 'i' */}
              <path
                d="M68 34 C 70 32, 73 34, 71 48 C 70 56, 68 62, 72 61 C 75 60, 77 56, 78 52"
                stroke={isDark ? '#4ade80' : '#274e23'}
                strokeWidth="5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Circle 'O' with Rice Ear Loop */}
              <path
                d="M 125 30 C 100 22, 85 45, 100 62 C 115 72, 138 58, 128 38 C 122 26, 100 26, 92 36"
                stroke={isDark ? '#4ade80' : '#274e23'}
                strokeWidth="4.5"
                strokeLinecap="round"
                fill="none"
              />

              {/* Golden Rice Stalk inside the O */}
              <path
                d="M 112 55 C 122 50, 132 40, 136 32 M 122 46 C 127 42, 131 40, 131 40 M 126 40 C 132 35, 135 33, 135 33 M 118 50 C 122 48, 125 45, 125 45"
                stroke="#d97706"
                strokeWidth="3"
                strokeLinecap="round"
              />
              {/* Rice Grain Dots */}
              <circle cx="132" cy="32" r="2.5" fill="#d97706" />
              <circle cx="128" cy="38" r="2.5" fill="#e5a038" />
              <circle cx="122" cy="44" r="2.5" fill="#d97706" />
              <circle cx="116" cy="50" r="2" fill="#e5a038" />
            </svg>
          </div>
        )}

        {/* Text Logo (Shown if vector mode OR combined mode OR if no image) */}
        {(!isImageMode || brandConfig.logoType === 'combined') && (
          <div className="flex flex-col text-left">
            <div className="flex items-baseline gap-1.5 leading-none">
              <span
                className={`text-2xl sm:text-3xl font-black font-serif tracking-tight ${
                  isDark ? 'text-white' : 'text-[#274e23]'
                }`}
              >
                {brandConfig.logoMainText}
              </span>
              <span
                className={`text-xl sm:text-2xl font-extrabold tracking-normal ${
                  isDark ? 'text-[#a3e635]' : 'text-[#1e3f1b]'
                }`}
              >
                {brandConfig.logoSubText}
              </span>
            </div>

            {showSlogan && (
              <span
                className={`text-[11px] sm:text-xs italic font-medium tracking-wide font-serif ${
                  isDark ? 'text-amber-300/90' : 'text-[#8c521f]'
                }`}
              >
                {brandConfig.slogan}
              </span>
            )}
          </div>
        )}
      </div>

      {variant === 'badge' && (
        <span className="mt-1 px-2.5 py-0.5 rounded-full bg-[#274e23]/10 text-[#274e23] border border-[#274e23]/20 text-[10px] font-bold uppercase tracking-wider">
          Hệ Sinh Thái Bách Mộc
        </span>
      )}
    </div>
  );
};
