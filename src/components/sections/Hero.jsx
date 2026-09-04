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
    <section dir={t.dir} className="relative w-full min-h-[75vh] bg-[#fafbfc] flex items-center justify-center overflow-hidden font-sans border-b border-gray-100">
      
      {/* شبكة خلفية أكثر نعومة (Elegant Dot Grid) */}
      <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* توهج خلفي خفيف لدمج العناصر */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-blue-50/50 to-purple-50/50 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-[85rem] w-full mx-auto px-6 py-12 lg:py-0 grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 relative z-10 items-center">
        
        {/* النصف الأيسر: النصوص (Typography) يأخذ 5 أعمدة */}
        <div className={`lg:col-span-5 flex flex-col justify-center ${t.dir === 'rtl' ? 'text-right' : 'text-left'}`}>
          
          {/* محاكاة شعار Google I/O بتفاصيل أدق */}
          <div className="flex items-center gap-2 mb-8 text-gray-900 group">
            <span className="text-2xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">MediaJo</span>
            <div className="w-3 h-8 bg-gray-900 skew-x-12 ms-1 shadow-sm"></div>
            <div className="w-5 h-5 bg-gray-900 rounded-full shadow-sm"></div>
            <span className="text-2xl font-light tracking-widest text-gray-400 ms-1">26</span>
          </div>

          {/* العناوين الضخمة */}
          <div className="flex flex-col gap-0 select-none">
            <h1 className="text-6xl sm:text-7xl lg:text-[6.5rem] leading-[0.9] font-medium text-[#1e2022] tracking-tighter">
              {t.home.heroTitle1}
            </h1>
            <div className="flex items-center gap-4 my-3 ms-2">
              <div className="h-[2px] w-12 bg-gray-300"></div>
              <span className="text-3xl lg:text-4xl text-gray-400 font-light italic">vs</span>
            </div>
            <h1 className="text-6xl sm:text-7xl lg:text-[6.5rem] leading-[0.9] font-medium text-[#1e2022] tracking-tighter">
              {t.home.heroTitle2}
            </h1>
          </div>

          <p className="mt-8 text-lg lg:text-xl text-gray-500 max-w-sm font-light leading-relaxed">
            {t.home.heroAbout}<strong className="font-semibold text-gray-800">{t.home.heroCliq}</strong>{t.home.heroAboutEnd}
          </p>

          <div className="mt-10 flex gap-4">
            <button className="px-8 py-3.5 bg-[#1e2022] text-white rounded-full font-medium hover:bg-black transition-all hover:-translate-y-1 shadow-[0_8px_20px_rgba(0,0,0,0.12)]">
              {t.home.heroBtn}
            </button>
          </div>
        </div>

        {/* النصف الأيمن: المجسمات الضخمة (يأخذ 7 أعمدة ليعطي مساحة للتنفس) */}
        <div className="lg:col-span-7 relative h-[500px] lg:h-[650px] w-full flex items-center justify-center lg:justify-end transform scale-90 lg:scale-100">
          
          <div className="relative w-full max-w-[600px] h-full">
            {/* 1. الدائرة العلوية (زر التشغيل) */}
            <div 
              className="absolute top-[5%] right-[15%] w-56 h-56 bg-gradient-to-br from-white to-gray-50 rounded-full flex items-center justify-center transition-all duration-500 hover:scale-110 hover:brightness-105 z-40 cursor-pointer"
              style={{ 
                boxShadow: shadowCircle,
                transform: 'rotateX(25deg) rotateY(-20deg) rotateZ(15deg)',
                animation: 'floatSlow 7s ease-in-out infinite'
              }}
            >
              <div 
                className="w-0 h-0 border-t-[25px] border-t-transparent border-l-[45px] border-l-blue-600 border-b-[25px] border-b-transparent transform translate-x-2"
                style={{ filter: 'drop-shadow(3px 5px 8px rgba(37, 99, 235, 0.4))' }}
              ></div>
            </div>

            {/* 2. الصندوق المستطيل العمودي */}
            <div 
              className="absolute top-[25%] left-[5%] w-48 h-72 bg-gradient-to-br from-white to-gray-50 rounded-[2rem] transition-all duration-500 hover:scale-110 z-20"
              style={{ 
                boxShadow: shadowBox,
                transform: 'rotateX(15deg) rotateY(-15deg) rotateZ(-12deg)',
                animation: 'floatFast 6s ease-in-out infinite reverse'
              }}
            ></div>

            {/* 3. الكبسولة الأفقية العريضة */}
            <div 
              className="absolute bottom-[10%] right-[5%] w-72 h-28 bg-gradient-to-br from-white to-gray-50 rounded-full transition-all duration-500 hover:scale-110 z-30"
              style={{ 
                boxShadow: shadowPill,
                transform: 'rotateX(-25deg) rotateY(15deg) rotateZ(-20deg)',
                animation: 'floatSlow 8s ease-in-out infinite 1s'
              }}
            ></div>

            {/* 4. المكعب الصغير المائل */}
            <div 
              className="absolute top-[15%] left-[35%] w-28 h-28 bg-gradient-to-br from-white to-gray-50 rounded-3xl transition-all duration-500 hover:scale-110 z-10"
              style={{ 
                boxShadow: shadowCube,
                transform: 'rotateX(35deg) rotateY(25deg) rotateZ(45deg)',
                animation: 'floatFast 5.5s ease-in-out infinite 0.5s'
              }}
            ></div>
          </div>
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
      `}</style>
    </section>
  );
}