import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

// أيقونات السوشال ميديا برمجياً (SVG مدمج)
const TwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);

const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

export default function Contact() {
  const { t } = useLanguage();
  return (
    <section dir={t.dir} className="w-full min-h-screen bg-[#fafbfc] pt-32 pb-16 px-6 lg:px-12 font-sans flex flex-col justify-between overflow-hidden">
      
      {/* 1. العنوان العملاق في الأعلى (Massive Typography) */}
      <div className="w-full relative mb-16 lg:mb-24 flex items-center justify-center">
        {/* تأثير لوني ناعم جداً خلف النص (Google I/O Touch) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60vw] h-[300px] bg-gradient-to-r from-blue-100 via-purple-100 to-green-50 blur-[80px] rounded-full -z-10 opacity-70"></div>
        
        <h1 className="text-[16vw] leading-[0.8] font-medium tracking-tighter text-[#1e2022] w-full text-left">
          {t.home.contactTitle}
        </h1>
      </div>

      {/* 2. القسم السفلي: مقسم إلى عمودين مع خطوط فاصلة دقيقة */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 border-t border-gray-300 pt-12">
        
        {/* العمود الأيسر: النص الترحيبي والتأثير البصري (Wireframe) */}
        <div className="lg:col-span-5 flex flex-col justify-between h-full">
          <div>
            <p className="text-3xl lg:text-4xl font-light text-[#1e2022] leading-[1.3] max-w-lg mb-8 tracking-tight">
              {t.home.contactParagraph}
            </p>
          </div>

          {/* رسمة الشبكة الهندسية (Wireframe) لمحاكاة تضاريس الصورة */}
          <div className="mt-12 w-64 h-32 relative overflow-hidden opacity-30">
            <svg viewBox="0 0 100 50" className="w-full h-full" preserveAspectRatio="none">
              <defs>
                <linearGradient id="fade" x1="0" y1="1" x2="0" y2="0">
                  <stop offset="0%" stopColor="#000" stopOpacity="1" />
                  <stop offset="100%" stopColor="#000" stopOpacity="0" />
                </linearGradient>
                <mask id="grid-mask">
                  <rect width="100" height="50" fill="url(#fade)" />
                </mask>
              </defs>
              <g mask="url(#grid-mask)">
                {/* خطوط أفقية متقاربة في الأسفل ومتباعدة في الأعلى (منظور 3D) */}
                <line x1="0" y1="10" x2="100" y2="10" stroke="#1e2022" strokeWidth="0.5" />
                <line x1="0" y1="25" x2="100" y2="25" stroke="#1e2022" strokeWidth="0.5" />
                <line x1="0" y1="35" x2="100" y2="35" stroke="#1e2022" strokeWidth="0.5" />
                <line x1="0" y1="42" x2="100" y2="42" stroke="#1e2022" strokeWidth="0.5" />
                <line x1="0" y1="48" x2="100" y2="48" stroke="#1e2022" strokeWidth="0.5" />
                
                {/* خطوط عمودية */}
                {[0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 100].map((x) => (
                  <line key={x} x1={50} y1="0" x2={x} y2="50" stroke="#1e2022" strokeWidth="0.5" />
                ))}
              </g>
            </svg>
          </div>
        </div>

        {/* العمود الأيمن: جدول البيانات الأنيق (The Grid Layout) */}
        <div className="lg:col-span-7 flex flex-col">
          
          {/* سطر 1: السوشال ميديا */}
          <div className="flex flex-col sm:flex-row border-b border-gray-300 py-6 hover:bg-gray-50/50 transition-colors">
            <div className="w-full sm:w-1/4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 sm:mb-0">{t.home.contactSocial}</div>
            <div className="w-full sm:w-3/4 flex gap-8 text-[#1e2022]">
              <a href="#" className="hover:text-blue-600 transition-colors flex items-center gap-2">
                <LinkedinIcon className="w-5 h-5" /> <span className="font-medium hidden sm:inline">LinkedIn</span>
              </a>
              <a href="#" className="hover:text-blue-400 transition-colors flex items-center gap-2">
                <TwitterIcon className="w-5 h-5" /> <span className="font-medium hidden sm:inline">Twitter</span>
              </a>
              <a href="#" className="hover:text-gray-600 transition-colors flex items-center gap-2">
                <GithubIcon className="w-5 h-5" /> <span className="font-medium hidden sm:inline">GitHub</span>
              </a>
            </div>
          </div>

          {/* سطر 2: الهاتف المحمول */}
          <div className="flex flex-col sm:flex-row border-b border-gray-300 py-6 hover:bg-gray-50/50 transition-colors">
            <div className="w-full sm:w-1/4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 sm:mb-0">{t.home.contactPhone}</div>
            <div className="w-full sm:w-3/4 text-lg font-medium text-[#1e2022]">
              +962 798 500 771
            </div>
          </div>

          {/* سطر 3: البريد الإلكتروني (مقسم لعدة أقسام كما في الصورة) */}
          <div className="flex flex-col sm:flex-row border-b border-gray-300 py-6 hover:bg-gray-50/50 transition-colors">
            <div className="w-full sm:w-1/4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 sm:mb-0">{t.home.contactEmail}</div>
            <div className="w-full sm:w-3/4 flex flex-col gap-4 text-sm md:text-base">
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span className="text-gray-500 w-48 mb-1 sm:mb-0">{t.home.contactSupport}</span>
                <a href="mailto:support@mediajo.org" className="font-medium text-[#1e2022] hover:underline">support@mediajo.org</a>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span className="text-gray-500 w-48 mb-1 sm:mb-0">{t.home.contactApi}</span>
                <a href="mailto:api@mediajo.org" className="font-medium text-[#1e2022] hover:underline">api@mediajo.org</a>
              </div>
              
              <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center">
                <span className="text-gray-500 w-48 mb-1 sm:mb-0">{t.home.contactBilling}</span>
                <a href="mailto:billing@mediajo.org" className="font-medium text-[#1e2022] hover:underline">billing@mediajo.org</a>
              </div>

            </div>
          </div>

          {/* سطر 4: المواقع (Locations) */}
          <div className="flex flex-col sm:flex-row border-b border-gray-300 py-6 hover:bg-gray-50/50 transition-colors">
            <div className="w-full sm:w-1/4 text-xs font-bold text-gray-500 uppercase tracking-widest mb-4 sm:mb-0">{t.home.contactLocations}</div>
            <div className="w-full sm:w-3/4 flex flex-col gap-6 text-sm md:text-base">
              
              <div className="flex flex-col sm:flex-row justify-between items-start">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest w-48 mb-2 sm:mb-0">{t.home.contactAmman}</span>
                <span className="font-medium text-[#1e2022] text-left sm:text-right max-w-xs">
                {t.home.contactAmmanValue}
                </span>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-start">
                <span className="text-xs font-bold text-gray-500 uppercase tracking-widest w-48 mb-2 sm:mb-0">{t.home.contactGlobal}</span>
                <span className="font-medium text-[#1e2022] text-left sm:text-right max-w-xs">
                  {t.home.contactGlobalValue1} <br /> {t.home.contactGlobalValue2}
                </span>
              </div>

            </div>
          </div>

        </div>
      </div>
    </section>
  );
}