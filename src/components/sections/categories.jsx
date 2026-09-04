import React from 'react';
import { Gamepad2, Share2, Sparkles, Hexagon } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

export default function Categories() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';
  const textSide = isRTL ? 'pr-8 md:pr-16 pl-0 text-right' : 'pl-8 md:pl-16 pr-0 text-left';
  const visualSide = isRTL ? 'left-0 -scale-x-100' : 'right-0';
  return (
    // 1. استخدام نفس لون الخلفية الفاتح الموجود في الهيرو (bg-[#fafbfc])
    <section dir={t.dir} className="relative w-full pb-24 pt-32 px-4 md:px-8 font-sans bg-[#fafbfc] -mt-20 z-20">
      
      {/* =========================================
          الجسر البصري الأبيض (The Light Visual Bridge)
          هذا الديف يطفو فوق نهاية قسم About (فوق صورة المدينة) 
          ويحولها تدريجياً إلى الأبيض النقي دون حواف قاسية
          ========================================= */}
      <div className="absolute top-0 left-0 w-full h-48 bg-gradient-to-b from-transparent to-[#fafbfc] -translate-y-full pointer-events-none"></div>

      {/* لمسة تصميمية: خط رفيع يفصل بين نهاية الصورة وبداية البطاقات بشكل أنيق */}
      <div className="absolute top-10 left-1/2 -translate-x-1/2 w-px h-16 bg-gradient-to-b from-gray-300 to-transparent"></div>

      <div className="max-w-[85rem] mx-auto flex flex-col gap-10 relative z-10">
        
        {/* =========================================
            البطاقة الأولى: الحسابات والاشتراكات
            ========================================= */}
        <Link to="/products" className="group relative w-full h-[350px] md:h-[400px] bg-[#050510] rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(234,88,12,0.2)]">
          
          {/* الأشكال الهندسية */}
          <div className={`absolute ${visualSide} top-0 w-full md:w-1/2 h-full overflow-hidden pointer-events-none z-0`}>
            <div className="absolute inset-0 flex items-center justify-end pr-10 md:pr-32 transition-transform duration-700 group-hover:scale-110">
              {[...Array(8)].map((_, i) => (
                <div 
                  key={i} 
                  className="absolute w-[300px] h-[300px] md:w-[500px] md:h-[500px] rounded-full border border-orange-400/20"
                  style={{ 
                    background: 'linear-gradient(135deg, #ea580c, #fdba74)',
                    right: `${(i * 15) - 100}px`,
                    zIndex: 10 - i,
                    boxShadow: '-10px 0 25px rgba(0,0,0,0.6)'
                  }}
                ></div>
              ))}
              <div className="absolute right-10 bottom-[-50px] w-64 h-64 bg-gradient-to-t from-purple-600 to-blue-500 rounded-t-full transform rotate-45 mix-blend-screen opacity-80"></div>
            </div>
          </div>

          {/* خطوط الشبكة والعناصر الطافية */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-60">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1={isRTL ? '70%' : '30%'} y1="50%" x2={isRTL ? '15%' : '85%'} y2="50%" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="transition-all duration-700 group-hover:x2-[90%]" />
            </svg>
            <div className={`absolute top-1/2 ${isRTL ? 'left-[10%] md:left-[15%]' : 'right-[10%] md:right-[15%]'} -translate-y-1/2 text-yellow-400 drop-shadow-[0_0_15px_rgba(250,204,21,0.8)] transition-all duration-700 group-hover:scale-125 group-hover:rotate-12`}>
              <Sparkles className="w-8 h-8 fill-yellow-400" />
            </div>
          </div>

          {/* المحتوى النصي */}
          <div className={`relative z-20 ${textSide} w-full md:w-1/2 flex flex-col justify-center`}>
            <h2 className="text-5xl md:text-[5.5rem] font-black text-white leading-none tracking-tighter mb-4 drop-shadow-lg">
              {t.home.categoriesAccounts}
            </h2>
            <div className={`flex flex-col gap-1 text-gray-400 font-mono text-sm tracking-widest uppercase ${isRTL ? 'border-r-2 border-orange-500 pr-4 mr-1' : 'border-l-2 border-orange-500 pl-4 ml-1'}`}>
              <p className="text-white font-sans text-lg tracking-normal font-bold">{t.home.categoriesAccountsDesc}</p>
              <p>{t.home.categoriesAccountsText1}</p>
              <p>{t.home.categoriesAccountsText2}</p>
              <p>{t.home.categoriesAccountsText3}</p>
            </div>
            
            <div className="mt-8 flex items-center gap-3" dir="ltr">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                <Gamepad2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/50 text-xs font-mono">MEDIAJO.ORG/SUBS</span>
            </div>
          </div>
        </Link>

        {/* =========================================
            البطاقة الثانية: السوشال ميديا
            ========================================= */}
        <Link to="/products" className="group relative w-full h-[350px] md:h-[400px] bg-[#050510] rounded-[2.5rem] overflow-hidden shadow-2xl flex items-center cursor-pointer transition-all duration-500 hover:-translate-y-2 hover:shadow-[0_30px_60px_rgba(37,99,235,0.2)]">
          
          {/* الأشكال الهندسية */}
          <div className={`absolute ${visualSide} top-0 w-full md:w-1/2 h-full overflow-hidden pointer-events-none z-0`}>
            <div className="absolute inset-0 transition-transform duration-700 group-hover:scale-110">
              <div className="absolute bottom-[-20%] left-[-10%] w-[120%] h-[120%] md:w-[400px] md:h-[400px] bg-gradient-to-tr from-blue-800 to-blue-500 rounded-full mix-blend-lighten blur-[2px]"></div>
              <div 
                className="absolute top-0 right-10 w-[300px] h-[300px] bg-gradient-to-bl from-green-400 to-emerald-600 mix-blend-screen opacity-90 blur-[1px]"
                style={{ clipPath: 'polygon(100% 0, 0% 100%, 100% 100%)' }}
              ></div>
            </div>
          </div>

          {/* خطوط الشبكة والعناصر الطافية */}
          <div className="absolute inset-0 pointer-events-none z-10 opacity-60">
            <svg className="w-full h-full" xmlns="http://www.w3.org/2000/svg">
              <line x1={isRTL ? '90%' : '10%'} y1="60%" x2={isRTL ? '55%' : '45%'} y2="60%" stroke="white" strokeWidth="1" />
              <line x1={isRTL ? '55%' : '45%'} y1="60%" x2={isRTL ? '15%' : '85%'} y2="70%" stroke="white" strokeWidth="1" strokeDasharray="4 4" className="transition-all duration-700 group-hover:y2-[65%]" />
              <circle cx={isRTL ? '55%' : '45%'} cy="60%" r="3" fill="white" />
            </svg>
            <div className={`absolute top-[65%] ${isRTL ? 'left-[10%] md:left-[15%]' : 'right-[10%] md:right-[15%]'} text-purple-400 drop-shadow-[0_0_20px_rgba(168,85,247,0.8)] transition-all duration-700 group-hover:scale-125 group-hover:-rotate-12`}>
              <Hexagon className="w-8 h-8 fill-purple-500 text-purple-200" />
            </div>
          </div>

          {/* المحتوى النصي */}
          <div className={`relative z-20 ${textSide} w-full md:w-1/2 flex flex-col justify-center`}>
            <h2 className="text-5xl md:text-[5.5rem] font-black text-white leading-none tracking-tighter mb-4 drop-shadow-lg">
              {t.home.categoriesSocial}
            </h2>
            <div className={`flex flex-col gap-1 text-gray-400 font-mono text-sm tracking-widest uppercase ${isRTL ? 'border-r-2 border-green-500 pr-4 mr-1' : 'border-l-2 border-green-500 pl-4 ml-1'}`}>
              <p className="text-white font-sans text-lg tracking-normal font-bold">{t.home.categoriesSocialDesc}</p>
              <p>{t.home.categoriesSocialText1}</p>
              <p>{t.home.categoriesSocialText2}</p>
              <p>{t.home.categoriesSocialText3}</p>
            </div>
            
            <div className="mt-8 flex items-center gap-3" dir="ltr">
              <div className="p-2 bg-white/10 rounded-full backdrop-blur-md border border-white/10">
                <Share2 className="w-6 h-6 text-white" />
              </div>
              <span className="text-white/50 text-xs font-mono">MEDIAJO.ORG/SOCIAL</span>
            </div>
          </div>
        </Link>

      </div>
    </section>
  );
}