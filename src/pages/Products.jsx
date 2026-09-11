import React, { useRef, useState, useEffect, useMemo } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import api from '../lib/axios'; // 👈 استيراد ملف axios الذي أنشأناه
import { 
  MonitorPlay, TrendingUp, Zap, 
  ArrowRight, ShieldCheck, CheckCircle2, Star, Lock, Wallet, ChevronRight, Loader2
} from 'lucide-react';
import { SiInstagram, SiTiktok, SiYoutube, SiFacebook } from 'react-icons/si';

// ==========================================
// 1. الإعدادات البصرية للمنصات (تصميم فقط بدون بيانات)
// ==========================================
const platformUIConfig = {
  tiktok: {
    title: 'TikTok',
    bgGradient: 'bg-gradient-to-br from-[#0a0a0b] via-[#111112] to-[#1a1b1e]',
    overlay: 'from-black/50 via-transparent to-transparent',
    themeColor: 'text-gray-900',
    btnColor: 'bg-gray-900 hover:bg-black',
    link: '/products/tiktok',
    popular: true,
    shapes: (
      <>
        <SiTiktok className="float-shape absolute right-10 md:right-24 top-1/2 -translate-y-1/2 w-80 h-80 md:w-[400px] md:h-[400px] text-white opacity-[0.04] rotate-12 pointer-events-none z-0" />
        <div className="float-shape absolute top-10 right-20 w-56 h-56 bg-gradient-to-br from-cyan-300 to-cyan-600 rounded-full shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.3)] z-10"></div>
        <div className="float-shape absolute -bottom-10 right-56 w-64 h-64 bg-gradient-to-tr from-pink-500 to-rose-600 rounded-[3rem] rotate-12 shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.3)] z-10"></div>
        <div className="float-shape absolute top-20 right-72 w-40 h-40 bg-gradient-to-bl from-white/10 to-white/5 backdrop-blur-xl rounded-full border border-white/20 shadow-[inset_-10px_-10px_20px_rgba(255,255,255,0.1)] z-20"></div>
      </>
    )
  },
  instagram: {
    title: 'Instagram',
    bgGradient: 'bg-gradient-to-tr from-yellow-400 via-pink-500 to-purple-600',
    overlay: 'from-black/40 via-transparent to-transparent',
    themeColor: 'text-pink-600',
    btnColor: 'bg-gradient-to-r from-pink-500 to-purple-600 hover:opacity-90',
    link: '/products/instagram',
    popular: false,
    shapes: (
      <>
        <SiInstagram className="float-shape absolute right-10 md:right-24 top-1/2 -translate-y-1/2 w-80 h-80 md:w-[400px] md:h-[400px] text-white opacity-[0.15] rotate-12 pointer-events-none z-0 mix-blend-overlay" />
        <div className="float-shape absolute top-10 right-10 w-64 h-64 bg-gradient-to-br from-white/30 to-white/5 backdrop-blur-lg rounded-full shadow-[inset_-10px_-10px_30px_rgba(255,255,255,0.2)] border border-white/20 z-10"></div>
        <div className="float-shape absolute -bottom-10 right-56 w-48 h-48 bg-gradient-to-tr from-orange-400 to-red-500 rounded-full shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.2)] z-10"></div>
        <div className="float-shape absolute top-20 right-80 w-32 h-64 bg-gradient-to-bl from-purple-700 to-indigo-800 rounded-full shadow-[inset_-10px_-10px_20px_rgba(0,0,0,0.4)] rotate-45 z-20"></div>
      </>
    )
  },
  youtube: {
    title: 'YouTube',
    bgGradient: 'bg-gradient-to-br from-[#ff0033] to-[#ff6600]',
    overlay: 'from-black/50 via-transparent to-transparent',
    themeColor: 'text-red-600',
    btnColor: 'bg-red-600 hover:bg-red-700',
    link: '/products/youtube',
    popular: false,
    shapes: (
      <>
        <SiYoutube className="float-shape absolute right-0 md:right-10 top-1/2 -translate-y-1/2 w-[350px] h-[350px] md:w-[450px] md:h-[450px] text-white opacity-[0.07] -rotate-12 pointer-events-none z-0" />
        <div className="float-shape absolute -top-20 right-20 w-80 h-80 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl rotate-12 backdrop-blur-lg border border-white/30 shadow-2xl z-10"></div>
        <div className="float-shape absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tr from-red-800 to-red-500 rounded-full shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.4)] z-20"></div>
      </>
    )
  },
  facebook: {
    title: 'Facebook',
    bgGradient: 'bg-gradient-to-br from-[#0f172a] to-[#1e293b]',
    overlay: 'from-transparent to-transparent',
    themeColor: 'text-indigo-600',
    btnColor: 'bg-indigo-600 hover:bg-indigo-700',
    link: '/products/facebook',
    popular: false,
    shapes: (
      <>
        <SiFacebook className="float-shape absolute right-10 md:right-32 top-1/2 -translate-y-1/2 w-80 h-80 md:w-96 md:h-96 text-white opacity-[0.05] rotate-12 pointer-events-none z-0" />
        <div className="float-shape absolute top-10 right-32 w-56 h-56 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl rotate-45 shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.3)] z-10"></div>
        <div className="float-shape absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-50 z-10"></div>
      </>
    )
  }
};

export default function Products() {
  const container = useRef();
  const { t } = useLanguage();
  
  // 👈 تعريف الحالات لجلب البيانات
  const [products, setProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // 👈 جلب البيانات من الباك إند
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        // نستخدم المسار العام للمنتجات (الذي يرجع المنتجات النشطة فقط)
        const response = await api.get('/products');
        setProducts(response.data.data.products);
      } catch (error) {
        console.error("Failed to fetch products", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // 👈 تجميع المنتجات حسب المنصة (لكي نأخذ عينة لصفحة الهبوط)
  const groupedPlatforms = useMemo(() => {
    // نستخرج المنصات الأربعة من الإعدادات البصرية
    const keys = Object.keys(platformUIConfig);
    const result = [];

    keys.forEach(key => {
      // نبحث عن المنتجات التي تتبع هذه المنصة في قاعدة البيانات
      const platformProducts = products.filter(
        p => p.platform === key && p.productType === 'SOCIAL_GROWTH'
      );

      // نقوم بدفع المنصة للمصفوفة بغض النظر هل يوجد بها منتجات أم لا!
      result.push({
        ...platformUIConfig[key],
        // إذا كان هناك منتجات، نأخذ أول 4. إذا لم يكن، نعيد مصفوفة فارغة.
        services: platformProducts.slice(0, 4) 
      });
    });

    return result;
  }, [products]);
  // ==========================================
  // GSAP Animations
  // ==========================================
  useGSAP(() => {
    gsap.from(".hero-pill-1", { x: -100, opacity: 0, duration: 1, ease: "back.out(1.5)" });
    gsap.from(".hero-pill-2", { x: 100, opacity: 0, duration: 1, ease: "back.out(1.5)", delay: 0.1 });
    gsap.from(".hero-pill-3", { y: 50, opacity: 0, duration: 1, ease: "back.out(1.5)", delay: 0.2 });
    gsap.from(".hero-icon", { scale: 0, opacity: 0, duration: 0.8, ease: "back.out(2)", stagger: 0.2, delay: 0.3 });

    gsap.to(".float-1", { y: -20, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 2 });
    gsap.to(".float-2", { y: 15, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 1.5, delay: 0.5 });
    gsap.to(".float-3", { y: -25, x: 10, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 2.5 });
    gsap.fromTo(".svg-line", { strokeDasharray: 2000, strokeDashoffset: 2000 }, { strokeDashoffset: 0, duration: 2.5, ease: "power2.out" });

    gsap.to(".float-shape", {
      y: -20,
      rotation: "+=3", 
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 5,
      stagger: 0.3
    });
  }, { scope: container });

  // أنيميشن دخول بطاقات المنصات بعد اكتمال جلب البيانات
  useGSAP(() => {
    if (!isLoading) {
      gsap.from(".platform-card", { y: 40, opacity: 0, duration: 0.7, stagger: 0.12, ease: "power2.out", delay: 0.15 });
    }
  }, { scope: container, dependencies: [isLoading] });

  return (
    <div ref={container} dir={t.dir} className="page-enter min-h-screen bg-gray-50 font-sans overflow-hidden">
      
      {/* =========================================
          1. Hero Section (Centered & Staggered Overlapping Layout)
          ========================================= */}
      <section className="relative w-full pt-20 pb-20 md:pt-32 md:pb-32 flex flex-col items-center justify-center bg-white overflow-visible">
        
        {/* أشكال زينة عائمة في الخلفية */}
        <div className="float-1 absolute top-[15%] left-[10%] w-4 h-4 bg-blue-600 rounded-full"></div>
        <div className="float-2 absolute top-[30%] left-[20%] w-3 h-3 bg-red-500 rounded-full"></div>
        <div className="float-3 absolute bottom-[15%] right-[15%] w-5 h-5 bg-orange-400 rounded-full"></div>
        
        {/* مسار منحني كخلفية */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <path className="svg-line" d="M -100 300 C 300 300, 600 450, 1200 250" fill="transparent" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="6 6" />
        </svg>

        {/* 
            تم إزالة md:items-start وإجبار الحاوية على items-center 
            لضمان بقاء الكتلة كاملة في منتصف الشاشة 
        */}
        <div className="relative z-10 flex flex-col items-center justify-center w-full max-w-5xl mx-auto px-4">
          
          {/* ================= الصف الأول (مُزاح قليلاً لليسار) ================= */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full relative z-10 md:-translate-x-12 rtl:md:translate-x-12 transition-transform">
            {/* الفقاعة البيضاء */}
            <div className="hero-pill-1 relative z-20 bg-white border-2 border-gray-100 rounded-full px-10 py-5 md:px-14 md:py-6 shadow-[0_8px_30px_rgba(0,0,0,0.04)]">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter text-gray-900 leading-[1.1] pb-1">
                {t.products.hero1}
              </h1>
            </div>
            {/* الذيل الملون الممتد تحت الفقاعة */}
            <div className="hero-icon relative z-10 hidden md:flex w-64 h-24 bg-gradient-to-r from-blue-600 to-purple-600 rounded-full items-center justify-end pr-6 ltr:-ml-20 rtl:-mr-20">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center border border-white/30">
                <Zap className="w-7 h-7 text-white" />
              </div>
            </div>
          </div>

          {/* ================= الصف الثاني (في المنتصف تماماً + متداخل لأعلى) ================= */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full relative z-20 md:-mt-10">
            {/* الفقاعة الملونة */}
            <div className="hero-pill-2 relative z-30 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-full px-10 py-5 md:px-16 md:py-6 shadow-[0_15px_40px_rgba(79,70,229,0.3)] flex items-center gap-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter text-white leading-[1.1] pb-1">
                {t.products.hero2}
              </h1>
            </div>
            {/* الدوائر المتداخلة على الجانب */}
            <div className="hero-icon relative z-20 hidden md:flex items-center ltr:-ml-12 rtl:-mr-12">
              <div className="w-20 h-20 bg-gray-50 border-[6px] border-white rounded-full flex items-center justify-center shadow-md relative z-30">
                <div className="w-8 h-8 bg-gradient-to-br from-emerald-400 to-emerald-500 rounded-full"></div>
              </div>
              <div className="w-40 h-16 bg-white border-2 border-gray-100 rounded-full flex items-center justify-center shadow-sm relative z-20 ltr:-ml-8 rtl:-mr-8 pl-8 rtl:pr-8 rtl:pl-0">
                <span className="text-xs font-bold text-gray-900 uppercase tracking-widest">{t.dashboard.systemOnline}</span>
              </div>
            </div>
          </div>

          {/* ================= الصف الثالث (مُزاح قليلاً لليمين + متداخل لأعلى) ================= */}
          <div className="flex flex-col md:flex-row items-center justify-center w-full relative z-30 md:-mt-10 md:translate-x-16 rtl:md:-translate-x-16 transition-transform">
            <div className="hero-pill-3 relative z-30 bg-white border-2 border-gray-100 rounded-full px-10 py-5 md:px-16 md:py-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex items-center gap-4">
              <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6.5rem] font-black tracking-tighter text-gray-900 leading-[1.1] pb-1">
                {t.products.hero3} <span className="text-orange-400 animate-pulse">.</span>
              </h1>
            </div>
          </div>
          
        </div>
      </section>

      {/* =========================================
          2. Social Media Platforms (من الباك إند)
          ========================================= */}
      <section className="relative w-full py-16 px-6 lg:px-12 min-h-[500px]">
        {isLoading ? (
          // شاشة تحميل أنيقة أثناء جلب البيانات
          <div className="flex flex-col items-center justify-center h-64 text-indigo-600">
            <Loader2 className="w-12 h-12 animate-spin mb-4" />
            <p className="font-medium text-gray-500">{t.dir === 'rtl' ? 'جاري تحميل الباقات...' : 'Loading packages...'}</p>
          </div>
        ) : groupedPlatforms.length === 0 ? (
          // في حال كانت قاعدة البيانات فارغة
          <div className="text-center py-20 text-gray-500">
            لا توجد منتجات حالياً.
          </div>
        ) : (
          <div className="max-w-[85rem] mx-auto flex flex-col gap-10 md:gap-16">
            {groupedPlatforms.map((platform, index) => (
              <div 
                key={index} 
                className="platform-card w-full flex flex-col rounded-[3rem] overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.08)] border border-gray-200 bg-white"
              >
                {/* الجزء العلوي: اللوحة الفنية (من الإعدادات الثابتة) */}
                <div className={`relative w-full h-[220px] sm:h-[260px] md:h-[400px] overflow-hidden ${platform.bgGradient || 'bg-gray-100'}`}>
                  
                  <div className="absolute inset-0 pointer-events-none rtl:-scale-x-100">
                    {platform.shapes}
                  </div>

                  <div className={`absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l ${platform.overlay} z-20`}></div>

                  <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-16 z-30">
                    {platform.popular && (
                      <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white text-sm font-bold w-max mb-3 md:mb-6 border border-white/30">
                        <Zap className="w-3.5 h-3.5 text-amber-400" /> {t.products.mostPopular}
                      </span>
                    )}
                    <h2 className="text-4xl md:text-[6rem] font-black text-white tracking-tighter leading-none drop-shadow-md">
                      {platform.title}
                    </h2>
                    <p className="text-white/90 mt-2 md:mt-6 text-xs sm:text-base md:text-2xl font-medium max-w-lg leading-relaxed drop-shadow-sm">
                      {t.products.elevate}
                    </p>
                  </div>
                </div>

                {/* الجزء السفلي: (الخدمات والأسعار من الباك إند) */}
                {/* الجزء السفلي: (الخدمات والأسعار من الباك إند) */}
                <div className="w-full bg-white p-6 md:p-16 flex flex-col lg:flex-row gap-8 md:gap-12 items-center justify-between">
                  
                  <div className="w-full lg:w-2/3">
                    {platform.services.length > 0 ? (
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 md:gap-6">
                        {platform.services.map((service, i) => (
                          <div key={i} className="flex items-center justify-between p-4 md:p-6 bg-gray-50 rounded-[1.5rem] border border-gray-100 hover:border-gray-200 hover:bg-white transition-all duration-300">
                            <div>
                              <span className="text-sm md:text-base font-black text-gray-900 block mb-1">
                                {t.dir === 'rtl' && service.subGroup ? `${service.subGroup}` : service.name}
                              </span>
                              <span className="text-xs md:text-sm text-gray-500 font-medium">
                                {service.qty} {service.groupName}
                              </span>
                            </div>
                            <div className="flex items-baseline gap-1 bg-white px-3 md:px-4 py-1.5 md:py-2 rounded-xl shadow-sm border border-gray-100">
                              <span className={`text-lg md:text-2xl font-black ${platform.themeColor}`}>{service.price}</span>
                              <span className="text-xs font-bold text-gray-400">JOD</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    ) : (
                      // 👈 تصميم جميل يظهر إذا لم يكن هناك منتجات مضافة بعد في هذه المنصة
                      <div className="flex flex-col items-center justify-center p-12 bg-gray-50 rounded-[2rem] border border-dashed border-gray-300 text-center">
                        <MonitorPlay className="w-12 h-12 text-gray-400 mb-4" />
                        <h4 className="text-xl font-bold text-gray-700 mb-2">باقات {platform.title} قريباً!</h4>
                        <p className="text-sm text-gray-500 font-medium max-w-sm">
                          نعمل حالياً على إضافة باقات حصرية ومميزة جداً لهذه المنصة. ابق بالقرب!
                        </p>
                      </div>
                    )}
                  </div>

                  {/* زر التوجه إلى صفحة المنصة يظهر دائماً */}
                  <div className="w-full lg:w-1/3 flex flex-col items-center lg:items-end justify-center">
                    <div className="text-center lg:text-right mb-6">
                      <p className="text-gray-400 font-medium mb-1">{t.products.readyToBoost}</p>
                      <h3 className="text-2xl md:text-3xl font-black text-gray-900">{t.products.growthQ.replace('{name}', platform.title)}</h3>
                    </div>
                    <Link 
                      to={platform.link} 
                      className={`inline-flex items-center justify-center gap-3 w-full sm:w-auto px-10 py-5 ${platform.btnColor} text-white rounded-full font-bold text-lg hover:scale-105 transition-all duration-300 shadow-xl`}
                    >
                      {t.products.getStarted} <ChevronRight className="w-5 h-5 rtl:rotate-180" />
                    </Link>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}
      </section>

      {/* =========================================
          3. Subscriptions (Coming Soon) - (ثابت كما هو)
          ========================================= */}
      <section className="subs-section relative w-full py-24 px-6 lg:px-12 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-[85rem] mx-auto text-center">
          <div className="max-w-4xl mx-auto bg-white rounded-[2rem] md:rounded-[3rem] border border-gray-200 p-7 sm:p-10 md:p-20 flex flex-col items-center justify-center relative overflow-hidden shadow-sm text-center">
            <div className="w-20 h-20 md:w-24 md:h-24 bg-gradient-to-br from-blue-600 to-purple-600 rounded-[1.5rem] md:rounded-[2rem] flex items-center justify-center shadow-[0_20px_50px_rgba(79,70,229,0.3)] mb-6 md:mb-8 relative z-10">
              <MonitorPlay className="w-9 h-9 md:w-10 md:h-10 text-white" />
            </div>
            <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-gray-900 tracking-tight mb-3 md:mb-4 relative z-10">{t.products.subsComingSoon}</h3>
            <p className="text-gray-500 font-medium text-base sm:text-lg max-w-xl mx-auto relative z-10">{t.products.subsComingSoonSub}</p>
          </div>
        </div>
      </section>

      {/* =========================================
          4. Trust & FAQ Section - (ثابت كما هو)
          ========================================= */}
      <section className="relative w-full py-24 px-6 lg:px-12 bg-[#131416] text-white">
        <div className="max-w-[85rem] mx-auto flex flex-col lg:flex-row gap-10 lg:gap-20">
          
          <div className="lg:w-5/12">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-mono tracking-widest uppercase mb-6 text-gray-300 border border-white/10">
              <Star className="w-4 h-4 text-yellow-400" /> {t.products.trustBadge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-8">{t.products.trustTitle}</h2>
            <ul className="space-y-6">
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                  <Lock className="w-6 h-6 text-blue-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{t.products.trustCheck1}</h4>
                  <p className="text-sm text-gray-400">{t.products.trustCheck1Desc}</p>
                </div>
              </li>
              <li className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-emerald-500/20 flex items-center justify-center shrink-0">
                  <ShieldCheck className="w-6 h-6 text-emerald-400" />
                </div>
                <div>
                  <h4 className="text-lg font-bold text-white mb-1">{t.products.trustCheck3}</h4>
                  <p className="text-sm text-gray-400">{t.products.trustCheck3Desc}</p>
                </div>
              </li>
            </ul>
          </div>

          <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-6">
             {[
              { q: 'faqSafeQ', a: 'faqSafeA' },
              { q: 'faqDeliveryQ', a: 'faqDeliveryA' },
              { q: 'faqPaymentQ', a: 'faqPaymentA' },
              { q: 'faqRefillQ', a: 'faqRefillA' }
            ].map((faq, index) => (
              <div key={index} className="bg-white/5 p-8 rounded-[2rem] border border-white/10 hover:bg-white/10 transition-colors">
                <h4 className="text-lg font-bold text-white mb-3">{t.products[faq.q]}</h4>
                <p className="text-gray-400 font-medium leading-relaxed text-sm">{t.products[faq.a]}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
}