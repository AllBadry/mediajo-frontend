import React from 'react';
import {
  Flame,
  TrendingUp,
  Sparkles,
  Zap,
  Star,
  Rocket,
  Gift,
  BadgePercent,
} from 'lucide-react';

// ==========================================
// 1. الأيقونات الظاهرة داخل بطاقات العروض
//    (iconKey المخزن في قاعدة البيانات يُترجَم هنا)
// ==========================================
export const OFFER_ICONS = {
  flame: Flame,
  trendingUp: TrendingUp,
  sparkles: Sparkles,
  zap: Zap,
  star: Star,
  rocket: Rocket,
  gift: Gift,
  badgePercent: BadgePercent,
};

export const DEFAULT_ICON_KEY = 'flame';

// ==========================================
// 2. الهوية البصرية (الفن التجريدي أسفل البطاقة)
//    نفس تنسيق بطاقات الصفحة الرئيسية القديمة
// ==========================================
export const OFFER_THEMES = {
  // الوكالة: دافئ وبنفسجي
  agency: {
    bg: 'bg-[#0f0c29]',
    gradients: (
      <>
        <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orange-400 to-pink-500 rounded-full mix-blend-screen filter blur-[30px] opacity-80 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full mix-blend-screen filter blur-[40px] opacity-80 group-hover:translate-x-4 transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.1)_25%,transparent_30%)]"></div>
      </>
    ),
  },
  // الانتشار: أخضر وأزرق
  reach: {
    bg: 'bg-[#0f172a]',
    gradients: (
      <>
        <div className="absolute -bottom-10 right-0 w-64 h-64 bg-gradient-to-tl from-emerald-400 to-teal-500 rounded-full mix-blend-screen filter blur-[40px] opacity-90 group-hover:scale-110 transition-transform duration-700"></div>
        <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mix-blend-screen filter blur-[30px] opacity-70 group-hover:-translate-y-4 transition-transform duration-700"></div>
        <div className="absolute inset-0 bg-[linear-gradient(75deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)]"></div>
      </>
    ),
  },
  // الصاروخ: نيون نابض
  rocket: {
    bg: 'bg-[#1a0b2e]',
    gradients: (
      <>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 mix-blend-screen filter blur-[50px] opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
        <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 11px)' }}></div>
      </>
    ),
  },
};

export const DEFAULT_THEME_KEY = 'agency';

// دالة مساعدة: ترجع الإعدادات البصرية بأمان مع قيم افتراضية
export function resolveOfferTheme(themeKey) {
  return OFFER_THEMES[themeKey] || OFFER_THEMES[DEFAULT_THEME_KEY];
}

export function resolveOfferIcon(iconKey) {
  return OFFER_ICONS[iconKey] || OFFER_ICONS[DEFAULT_ICON_KEY];
}