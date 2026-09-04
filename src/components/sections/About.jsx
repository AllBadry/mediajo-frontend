import React, { useState, useEffect, useRef, useMemo } from 'react';
import { useLanguage } from '../../context/LanguageContext';

export default function About() {
  const { t } = useLanguage();
  const [isRevealed, setIsRevealed] = useState(false);
  const sectionRef = useRef(null);

  // مراقبة السكرول لتفعيل الأنيميشن
  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        // بمجرد ظهور 30% من القسم، يبدأ التفاعل
        if (entry.isIntersecting) {
          setIsRevealed(true);
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    return () => observer.disconnect();
  }, []);

  // توليد بكسلات تغطي الشاشة بالكامل (بناء ذكي للألوان)
  const pixels = useMemo(() => {
    const grid = [];
    // إنشاء 240 بكسل (24 عمود × 10 صفوف) لتغطية الخلفية
    for (let i = 0; i < 240; i++) {
      // خوارزمية ذكية: 70% من البكسلات ستكون بيضاء لتندمج مع الموقع، 30% ملونة لتكوين الشكل التجريدي
      const isColored = Math.random() > 0.7; 
      
      const colors = ['bg-[#0a1128]', 'bg-[#1e3a8a]', 'bg-[#2563eb]', 'bg-[#e11d48]'];
      const color = isColored 
        ? colors[Math.floor(Math.random() * colors.length)] 
        : 'bg-[#f8f9fa]'; // لون خلفية الموقع

      grid.push({
        id: i,
        color: color,
        delay: Math.random() * 2, // وقت عشوائي بين 0 و 2 ثانية لكل بكسل
      });
    }
    return grid;
  }, []);

  return (
    <section 
      id="about-section" 
      ref={sectionRef}
      dir="ltr" 
      className="relative w-full min-h-[100vh] flex items-center justify-center font-sans overflow-hidden"
    >
      {/* 1. الطبقة السفلية: صورة المدينة الأصلية (تمدد على كامل الشاشة) */}
      <img 
        src="/city.jpg" 
        alt="Digital City Infrastructure" 
        className={`absolute inset-0 w-full h-full object-cover transition-all duration-[3000ms] ease-out ${isRevealed ? 'scale-100 opacity-100' : 'scale-110 opacity-0'}`}
        onError={(e) => e.target.style.display = 'none'}
      />

      {/* 2. طبقة البكسلات (Overlay Grid) التي تغطي الصورة وتتلاشى تدريجياً */}
      <div className="absolute inset-0 grid grid-cols-12 md:grid-cols-24 grid-rows-10 z-0">
        {pixels.map((pixel) => (
          <div 
            key={pixel.id}
            className={`${pixel.color} w-full h-full transform transition-all duration-1000 ease-out`}
            style={{
              opacity: isRevealed ? 0 : 1,
              transform: isRevealed ? 'scale(0) rotate(10deg)' : 'scale(1.05) rotate(0deg)', 
              transitionDelay: `${pixel.delay}s`
            }}
          ></div>
        ))}
      </div>

      {/* 3. عناصر تجريدية مثل الصورة المرفقة (Discover / علامات تنصيص) تطفو في الخلفية */}
      <div className={`absolute top-1/4 right-1/4 text-9xl font-serif font-black text-white/20 transition-opacity duration-[2s] ${isRevealed ? 'opacity-0' : 'opacity-100'} pointer-events-none z-10`}>
        “ ”
      </div>
      <div className={`absolute bottom-20 left-10 font-mono text-sm tracking-[0.3em] text-blue-900 transition-opacity duration-[2s] ${isRevealed ? 'opacity-0' : 'opacity-100'} pointer-events-none z-10`}>
        SYS_NODE // 2026.GLOBAL
      </div>

      {/* 4. الطبقة العلوية: المحتوى والنصوص (تطفو فوق التأثير بتصميم زجاجي) */}
      <div className="relative z-20 max-w-5xl w-full mx-6 px-8 py-12 md:p-16 bg-white/70 backdrop-blur-xl border border-white/40 rounded-[2.5rem] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] transition-transform duration-1000">
        
        <div className="flex flex-col md:flex-row gap-12 items-center justify-between">
          
          <div className="flex-1">
            <div className="inline-block mb-4">
              <span className="text-xs font-bold tracking-widest uppercase text-white bg-[#202124] px-4 py-2 rounded-full">
                {t.about.discover}
              </span>
            </div>
            
            <h2 className="text-5xl md:text-7xl font-normal text-[#202124] tracking-tighter leading-[1.1] mb-6" dir={t.dir}>
              {t.about.title1} <br />
              <strong className="font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">{t.about.title2}</strong>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-600 font-light leading-relaxed max-w-lg">
              {t.about.para}
            </p>
          </div>

          {/* عدادات وإحصائيات داخل البطاقة */}
          <div className="flex flex-row md:flex-col gap-8 bg-white/50 p-8 rounded-3xl border border-white/60 shadow-sm">
            <div className="flex flex-col">
              <span className="text-5xl font-semibold text-[#202124]">99<span className="text-2xl text-blue-600">%</span></span>
              <span className="text-sm text-gray-500 mt-2 font-medium uppercase tracking-wider">{t.about.uptime}</span>
            </div>
            <div className="w-px h-full md:w-full md:h-px bg-gray-200"></div>
            <div className="flex flex-col">
              <span className="text-5xl font-semibold text-[#202124]">0.5<span className="text-2xl text-purple-600">s</span></span>
              <span className="text-sm text-gray-500 mt-2 font-medium uppercase tracking-wider">{t.about.execution}</span>
            </div>
          </div>
          
        </div>
      </div>
    </section>
  );
}