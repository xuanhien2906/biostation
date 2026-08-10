import React, { useState, useEffect } from 'react';

const LANGUAGES = [
  { code: 'vi', name: 'Tiếng Việt', flagUrl: 'https://flagcdn.com/vn.svg' },
  { code: 'en', name: 'English', flagUrl: 'https://flagcdn.com/gb.svg' },
  { code: 'zh-CN', name: '中文', flagUrl: 'https://flagcdn.com/cn.svg' },
  { code: 'ko', name: '한국어', flagUrl: 'https://flagcdn.com/kr.svg' },
];

export const LanguageSwitcher: React.FC = () => {
  const [activeLang, setActiveLang] = useState('vi');

  useEffect(() => {
    try {
      const match = document.cookie.match(/googtrans=\/[^\/]+\/([^;]+)/);
      if (match && match[1]) {
        setActiveLang(match[1]);
      } else {
        setActiveLang('vi');
      }
    } catch (e) {
      console.error('Error parsing lang cookie:', e);
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    if (langCode === activeLang) return;
    
    try {
      const domain = window.location.hostname;
      if (langCode === 'vi') {
        document.cookie = `googtrans=/vi/vi; path=/`;
        document.cookie = `googtrans=/vi/vi; domain=${domain}; path=/`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
      } else {
        document.cookie = `googtrans=/vi/${langCode}; path=/`;
        document.cookie = `googtrans=/vi/${langCode}; domain=${domain}; path=/`;
      }
      
      // Force reload to apply Google Translate changes cleanly
      window.location.reload();
    } catch (e) {
      console.error('Error setting lang cookie:', e);
      window.location.reload();
    }
  };

  return (
    <div className="flex items-center gap-2 bg-[#f0e6d8] px-2 py-1.5 rounded-full border border-[#dcd0bf] shadow-sm ml-2 skiptranslate">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          title={lang.name}
          className={`relative transition-all rounded-full overflow-hidden flex items-center justify-center hover:scale-110 cursor-pointer w-6 h-6 ${
            activeLang === lang.code 
              ? 'ring-2 ring-[#274e23] ring-offset-1 ring-offset-[#f0e6d8] shadow-md scale-110' 
              : 'opacity-60 hover:opacity-100 grayscale-[40%] hover:grayscale-0'
          }`}
        >
          <img src={lang.flagUrl} alt={lang.name} className="w-full h-full object-cover" />
        </button>
      ))}
    </div>
  );
};
