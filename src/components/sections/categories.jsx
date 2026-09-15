import React, { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight, TrendingUp, Key, Youtube, Instagram, MonitorPlay, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

export default function Categories() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';
  const sectionRef = useRef(null);

  useGSAP(() => {
    // 1. ظهور البطاقات (بدون مشكلة الاختفاء)
    gsap.fromTo('.cat-card', 
      { y: 100, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.15,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      }
    );

    // 2. حركة الأوربات الداخلية للبطاقات (Samsung Style)
    gsap.utils.toArray('.orb-float').forEach(orb => {
      gsap.to(orb, {
        y: 'random(-20, 20)',
        x: 'random(-20, 20)',
        rotation: 'random(-15, 15)',
        duration: 'random(5, 10)',
        repeat: -1,
        yoyo: true,
        ease: 'sine.inOut'
      });
    });

  }, { scope: sectionRef });

  return (
    // نفس الخلفية اللؤلؤية للحفاظ على "اللوحة المتصلة"
    <section ref={sectionRef} dir={t.dir} className="relative w-full py-24 md:py-32 bg-[#fcfcfd] font-sans z-20 overflow-hidden">
      
      {/* الخطوط الهندسية الخفيفة (Google I/O Grid) */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-30" 
           style={{ backgroundImage: `radial-gradient(#d1d5db 1px, transparent 1px)`, backgroundSize: '40px 40px' }}>
      </div>

      <div className="max-w-[85rem] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* الترويسة الأنيقة المباشرة */}
        <div className="cat-card flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <div className="w-full md:w-1/2">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 shadow-sm">
              <Sparkles className="w-4 h-4 text-blue-500" />
              {isRTL ? 'اكتشف خدماتنا' : 'Explore Categories'}
            </div>
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter leading-[1.05] text-[#111]">
              {isRTL ? 'اختر مسارك نحو' : 'Choose your path to'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {isRTL ? 'القمة الرقمية.' : 'Digital Peak.'}
              </span>
            </h2>
          </div>
          <div className="w-full md:w-1/3">
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              {isRTL 
                ? 'بوابتان رئيسيتان تفصلك عن الهيمنة. اختر القسم المناسب لاحتياجاتك وابدأ رحلة النمو الفوري.' 
                : 'Two main gateways separate you from dominance. Choose your category and start growing instantly.'}
            </p>
          </div>
        </div>

        {/* =========================================
            شبكة الأقسام (Categories Grid)
            استايل كروت Google I/O مع خلفيات Samsung
            ========================================= */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
          
          {/* -------------------------------------
              القسم الأول: السوشال ميديا 
              ------------------------------------- */}
          <Link to="/products" className="cat-card group relative h-[550px] bg-white/40 backdrop-blur-3xl border border-white rounded-[3rem] p-10 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_80px_-20px_rgba(37,99,235,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col block">
            
            {/* الألوان العائمة (Samsung Aura) */}
            <div className="orb-float absolute top-[-10%] right-[-10%] w-[80%] h-[80%] bg-gradient-to-bl from-blue-400 via-cyan-200 to-transparent rounded-full mix-blend-multiply blur-[80px] opacity-60 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
            
            {/* رأس البطاقة */}
            <div className="relative z-10 flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-white/80 backdrop-blur-md border border-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm group-hover:rotate-12 transition-transform duration-500">
                <TrendingUp className="w-7 h-7" />
              </div>
              <div className="w-12 h-12 bg-[#111] text-white rounded-full flex items-center justify-center group-hover:bg-blue-600 transition-colors duration-300 shadow-lg">
                <ArrowUpRight className={`w-5 h-5 ${isRTL ? '-scale-x-100' : ''}`} />
              </div>
            </div>

            {/* المحتوى النصي */}
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-blue-600 mb-2 block">
                Category 01
              </span>
              <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-[#111] mb-4">
                {t.home.categoriesSocial || (isRTL ? 'دعم السوشال ميديا' : 'Social Media')}
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed max-w-sm">
                {isRTL 
                  ? 'متابعون، لايكات، ومشاهدات بجودة فائقة لتضخيم حضورك على جميع المنصات بخوارزميات آمنة 100%.' 
                  : 'Premium followers, likes, and views to amplify your presence across all platforms safely.'}
              </p>
            </div>

            {/* كبسولات فرعية (Google I/O Pills) تظهر المنصات المدعومة */}
            <div className="relative z-10 mt-auto flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full text-sm font-bold text-gray-700 shadow-sm">
                <Instagram className="w-4 h-4 text-pink-500" /> Instagram
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full text-sm font-bold text-gray-700 shadow-sm">
                TikTok
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full text-sm font-bold text-gray-700 shadow-sm">
                <Youtube className="w-4 h-4 text-red-500" /> YouTube
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full text-sm font-bold text-gray-700 shadow-sm">
                +40 More
              </span>
            </div>
          </Link>

          {/* -------------------------------------
              القسم الثاني: الحسابات والاشتراكات 
              ------------------------------------- */}
          <Link to="/products" className="cat-card group relative h-[550px] bg-white/40 backdrop-blur-3xl border border-white rounded-[3rem] p-10 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_80px_-20px_rgba(236,72,153,0.15)] hover:-translate-y-2 transition-all duration-500 flex flex-col block">
            
            {/* الألوان العائمة (Samsung Aura) */}
            <div className="orb-float absolute top-[-10%] left-[-10%] w-[80%] h-[80%] bg-gradient-to-tr from-pink-400 via-orange-200 to-transparent rounded-full mix-blend-multiply blur-[80px] opacity-50 pointer-events-none group-hover:scale-110 transition-transform duration-700"></div>
            
            {/* رأس البطاقة */}
            <div className="relative z-10 flex justify-between items-start mb-8">
              <div className="w-14 h-14 bg-white/80 backdrop-blur-md border border-white rounded-2xl flex items-center justify-center text-pink-600 shadow-sm group-hover:-rotate-12 transition-transform duration-500">
                <Key className="w-7 h-7" />
              </div>
              <div className="w-12 h-12 bg-[#111] text-white rounded-full flex items-center justify-center group-hover:bg-pink-500 transition-colors duration-300 shadow-lg">
                <ArrowUpRight className={`w-5 h-5 ${isRTL ? '-scale-x-100' : ''}`} />
              </div>
            </div>

            {/* المحتوى النصي */}
            <div className="relative z-10">
              <span className="text-xs font-bold uppercase tracking-widest text-pink-600 mb-2 block">
                Category 02
              </span>
              <h3 className="text-4xl md:text-5xl font-medium tracking-tight text-[#111] mb-4">
                {t.home.categoriesAccounts || (isRTL ? 'الاشتراكات والحسابات' : 'Premium Subscriptions')}
              </h3>
              <p className="text-gray-600 font-medium leading-relaxed max-w-sm">
                {isRTL 
                  ? 'وصول غير محدود. اشتراكات لأشهر المنصات العالمية، وحسابات موثقة وجاهزة بأسعار لا تُنافس.' 
                  : 'Unlimited access. Subscriptions to top global platforms and verified accounts at unbeatable prices.'}
              </p>
            </div>

            {/* كبسولات فرعية (Google I/O Pills) تظهر المنصات المدعومة */}
            <div className="relative z-10 mt-auto flex flex-wrap gap-2">
              <span className="flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full text-sm font-bold text-gray-700 shadow-sm">
                <MonitorPlay className="w-4 h-4 text-red-600" /> Netflix
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full text-sm font-bold text-gray-700 shadow-sm">
                Canva Pro
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full text-sm font-bold text-gray-700 shadow-sm">
                Spotify
              </span>
              <span className="flex items-center gap-1.5 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-100 rounded-full text-sm font-bold text-gray-700 shadow-sm">
                Verified Accs
              </span>
            </div>
          </Link>

        </div>

      </div>
    </section>
  );
}