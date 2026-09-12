import React from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function Hero() {
  const { t } = useLanguage();
  
  // دالة توليد العمق ثلاثي الأبعاد مع تحسينات الفخامة (Soft Ambient Lighting)
  const getGradientExtrusion = (depth, r1, g1, b1, r2, g2, b2, xDir, yDir) => {
    let shadows = [];
    
    // إضاءة محيطية داخلية تعطي لمسة زجاجية/بلاستيكية
    shadows.push(`inset -8px -8px 20px rgba(0,0,0,0.06)`);
    shadows.push(`inset 8px 8px 20px rgba(255,255,255,0.9)`);
    // حدود بيضاء خفيفة جداً للمعة
    shadows.push(`inset 0px 0px 0px 1px rgba(255,255,255,0.5)`);

    // بناء المجسم طبقة بطبقة بظلال أنعم
    for (let i = 1; i <= depth; i++) {
      const ratio = i / depth;
      const r = Math.round(r1 + (r2 - r1) * ratio);
      const g = Math.round(g1 + (g2 - g1) * ratio);
      const b = Math.round(b1 + (b2 - b1) * ratio);
      shadows.push(`${i * xDir}px ${i * yDir}px 0px rgb(${r}, ${g}, ${b})`);
    }
    
    // ظل متدرج ناعم جداً على الأرضية (Ambient Floor Shadow)
    shadows.push(`${(depth + 10) * xDir}px ${(depth + 10) * yDir}px 30px rgba(0,0,0,0.08)`);
    shadows.push(`${(depth + 30) * xDir}px ${(depth + 30) * yDir}px 60px rgba(0,0,0,0.05)`);
    
    return shadows.join(', ');
  };

  // إعدادات ظلال المجسمات (Depth, StartColorRGB, EndColorRGB, X-Dir, Y-Dir)
  const shadowCircle = getGradientExtrusion(60, 236, 72, 153, 250, 204, 21, -1, 1.5);
  const shadowBox = getGradientExtrusion(80, 6, 182, 212, 139, 92, 246, -1.2, 1);
  const shadowPill = getGradientExtrusion(50, 16, 185, 129, 37, 99, 235, 1.2, 1.2);
  const shadowCube = getGradientExtrusion(55, 249, 115, 22, 225, 29, 72, 1.5, -0.8);

  return (
    // التعديل هنا: min-h محسوب بدقة للشاشة، توسيط عمودي (justify-center)، مسافة علوية خفيفة (pt-8 md:pt-12)
    <section dir={t.dir} className="relative w-full min-h-[calc(100vh-80px)] pt-8 md:pt-12 pb-12 bg-[#fafbfc] flex flex-col justify-center overflow-hidden font-sans border-t border-b border-gray-100 shadow-[inset_0_4px_20px_rgba(0,0,0,0.01)]">
      
      {/* شبكة خلفية أكثر نعومة (Elegant Dot Grid) */}
      <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* توهج خلفي خفيف لدمج العناصر */}
      <div className="absolute top-[40%] left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -z-10 pointer-events-none"></div>

      <div className="max-w-[85rem] w-full mx-auto px-6 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 relative z-10">
        
        {/* النصف الأيسر: النصوص (Typography) */}
        <div className={`lg:col-span-5 flex flex-col justify-center ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          
          {/* محاكاة شعار Google I/O بتفاصيل أدق */}
          <div className="flex items-center gap-2 mb-8 md:mb-10 text-gray-900 group">
            <span className="text-xl md:text-2xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">MediaJo</span>
            <div className="w-2 md:w-3 h-6 md:h-8 bg-gray-900 skew-x-12 ms-1 shadow-sm"></div>
            <div className="w-4 h-4 md:w-5 md:h-5 bg-gray-900 rounded-full shadow-sm"></div>
            <span className="text-xl md:text-2xl font-light tracking-widest text-gray-400 ms-1">26</span>
          </div>

          {/* العناوين الضخمة */}
          <div className="flex flex-col gap-0 select-none">
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-bold text-[#1e2022] tracking-tight">
              {t.home.heroTitle1}
            </h1>
            <div className="flex items-center gap-3 my-3 md:my-4 ms-2">
              <div className="h-[2px] w-8 md:w-10 bg-blue-500"></div>
              <span className="text-xl md:text-3xl text-blue-600 font-semibold leading-none">»</span>
            </div>
            <h1 className="text-4xl sm:text-5xl md:text-6xl lg:text-7xl leading-[0.95] font-bold text-[#1e2022] tracking-tight">
              {t.home.heroTitle2}
            </h1>
          </div>

          <p className="mt-6 md:mt-8 text-base sm:text-lg lg:text-xl text-gray-500 max-w-sm font-light leading-relaxed">
            {t.home.heroAbout}<strong className="font-semibold text-gray-800">{t.home.heroCliq}</strong>{t.home.heroAboutEnd}
          </p>

          <div className="mt-8 md:mt-10 flex gap-4">
            <button className="px-8 py-3.5 bg-[#1e2022] text-white rounded-none font-bold uppercase tracking-wider hover:bg-black transition-all hover:-translate-y-1 shadow-[4px_4px_0px_0px_rgba(203,213,225,0.5)]">
              {t.home.heroBtn}
            </button>
          </div>
        </div>

        {/* النصف الأيمن: المجسمات الثلاثية */}
        {/* التعديل هنا: تقليل الارتفاع قليلاً ليتناسب مع الشاشات */}
        <div className="hidden md:flex lg:col-span-7 relative h-[380px] lg:h-[500px] w-full items-center justify-center lg:justify-end transform scale-[0.8] lg:scale-100">
          
          <div className="relative w-full max-w-[550px] h-full">
            {/* 1. الدائرة العلوية (زر التشغيل) */}
            <div 
              className="absolute top-[5%] right-[15%] w-48 h-48 lg:w-56 lg:h-56 bg-gradient-to-br from-white to-gray-50 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 hover:brightness-105 z-40 cursor-pointer"
              style={{ 
                boxShadow: shadowCircle,
                transform: 'rotateX(25deg) rotateY(-20deg) rotateZ(15deg)',
                animation: 'floatSlow 7s ease-in-out infinite'
              }}
            >
              <div 
                className="w-0 h-0 border-t-[20px] lg:border-t-[25px] border-t-transparent border-l-[35px] lg:border-l-[45px] border-l-blue-600 border-b-[20px] lg:border-b-[25px] border-b-transparent transform translate-x-2"
                style={{ filter: 'drop-shadow(3px 5px 8px rgba(37, 99, 235, 0.4))' }}
              ></div>
            </div>

            {/* 2. الصندوق المستطيل العمودي */}
            <div 
              className="absolute top-[25%] left-[5%] w-40 h-60 lg:w-48 lg:h-72 bg-gradient-to-br from-white to-gray-50 rounded-[2rem] transition-all duration-500 hover:scale-110 z-20"
              style={{ 
                boxShadow: shadowBox,
                transform: 'rotateX(15deg) rotateY(-15deg) rotateZ(-12deg)',
                animation: 'floatFast 6s ease-in-out infinite reverse'
              }}
            ></div>

            {/* 3. الكبسولة الأفقية العريضة */}
            <div 
              className="absolute bottom-[10%] right-[5%] w-60 h-24 lg:w-72 lg:h-28 bg-gradient-to-br from-white to-gray-50 rounded-full transition-all duration-500 hover:scale-110 z-30"
              style={{ 
                boxShadow: shadowPill,
                transform: 'rotateX(-25deg) rotateY(15deg) rotateZ(-20deg)',
                animation: 'floatSlow 8s ease-in-out infinite 1s'
              }}
            ></div>

            {/* 4. المكعب الصغير المائل */}
            <div 
              className="absolute top-[15%] left-[35%] w-24 h-24 lg:w-28 lg:h-28 bg-gradient-to-br from-white to-gray-50 rounded-3xl transition-all duration-500 hover:scale-110 z-10"
              style={{ 
                boxShadow: shadowCube,
                transform: 'rotateX(35deg) rotateY(25deg) rotateZ(45deg)',
                animation: 'floatFast 5.5s ease-in-out infinite 0.5s'
              }}
            ></div>
          </div>
        </div>

        {/* بديل الجوال: ألوان متحركة خفيفة بدل المجسمات */}
        <div className="md:hidden absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
          <div className="absolute w-64 h-64 bg-blue-100/40 rounded-full blur-3xl animate-[blobFloat_12s_ease-in-out_infinite] -top-10 -right-16"></div>
          <div className="absolute w-56 h-56 bg-purple-100/40 rounded-full blur-3xl animate-[blobFloat_10s_ease-in-out_infinite_3s] top-1/3 -left-12"></div>
          <div className="absolute w-48 h-48 bg-pink-100/30 rounded-full blur-3xl animate-[blobFloat_14s_ease-in-out_infinite_6s] bottom-8 right-1/4"></div>
        </div>
      </div>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotateX(25deg) rotateY(-20deg) rotateZ(15deg); }
          50% { transform: translateY(-25px) rotateX(28deg) rotateY(-18deg) rotateZ(12deg); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0) rotateX(15deg) rotateY(-15deg) rotateZ(-12deg); }
          50% { transform: translateY(-15px) rotateX(12deg) rotateY(-18deg) rotateZ(-10deg); }
        }
        @keyframes blobFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33% { transform: translate(12px, -18px) scale(1.05); }
          66% { transform: translate(-10px, 14px) scale(0.95); }
        }
      `}</style>
    </section>
  );
}