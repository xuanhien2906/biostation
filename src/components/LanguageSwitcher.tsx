import React, { useState, useEffect } from 'react';

const LANGUAGES = [
  { code: 'vi', name: 'Tiếng Việt', flag: '🇻🇳' },
  { code: 'en', name: 'English', flag: '🇬🇧' },
  { code: 'zh-CN', name: '中文', flag: '🇨🇳' },
  { code: 'ko', name: '한국어', flag: '🇰🇷' },
  { code: 'th', name: 'ไทย', flag: '🇹🇭' },
];

export const LanguageSwitcher: React.FC = () => {
  const [activeLang, setActiveLang] = useState('vi');

  useEffect(() => {
    // Check initial language from google translate cookie
    // The cookie format is usually googtrans=/vi/en
    const match = document.cookie.match(/googtrans=\/[^\/]+\/([^;]+)/);
    if (match && match[1]) {
      setActiveLang(match[1]);
    } else {
      setActiveLang('vi');
    }
  }, []);

  const changeLanguage = (langCode: string) => {
    if (langCode === activeLang) return; // Prevent unnecessary reload
    
    setActiveLang(langCode);
    
    // Set cookie for Google Translate
    // It requires setting the cookie on the current domain and paths
    const domain = window.location.hostname;
    
    if (langCode === 'vi') {
      // Clear cookie or set to vi/vi to reset
      document.cookie = `googtrans=/vi/vi; path=/`;
      document.cookie = `googtrans=/vi/vi; domain=${domain}; path=/`;
      // We can also just delete the cookie
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
      document.cookie = `googtrans=; expires=Thu, 01 Jan 1970 00:00:00 UTC; domain=${domain}; path=/;`;
    } else {
      document.cookie = `googtrans=/vi/${langCode}; path=/`;
      document.cookie = `googtrans=/vi/${langCode}; domain=${domain}; path=/`;
    }
    
    // Reload the page to apply Google Translate
    window.location.reload();
  };

  return (
    <div className="flex items-center gap-1.5 bg-[#f0e6d8] px-2 py-1.5 rounded-full border border-[#dcd0bf] shadow-sm ml-2 skiptranslate">
      {LANGUAGES.map((lang) => (
        <button
          key={lang.code}
          onClick={() => changeLanguage(lang.code)}
          title={lang.name}
          className={`text-lg transition-all rounded-full p-0.5 leading-none flex items-center justify-center hover:scale-110 cursor-pointer ${
            activeLang === lang.code 
              ? 'ring-2 ring-[#274e23] bg-white shadow-sm scale-110' 
              : 'opacity-60 hover:opacity-100 grayscale-[30%] hover:grayscale-0'
          }`}
        >
          {lang.flag}
        </button>
      ))}
    </div>
  );
};
