import React, { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight, TrendingUp, Key, Zap, Check } from 'lucide-react';
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
    // 1. حركة ظهور البطاقات بأمان تام (استخدام fromTo)
    gsap.fromTo('.modern-card', 
      { 
        y: 80, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        stagger: 0.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 85%',
        }
      }
    );

    // 2. حركة الألوان الحيوية (Fluid Aura) المستوحاة من الصور
    gsap.to('.vibrant-aura', {
      rotation: 360,
      scale: 1.1,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut',
      transformOrigin: 'center center'
    });

    // 3. تأثير "البارالاكس" الخفيف للصور/التدرجات داخل الكروت
    gsap.fromTo('.inner-fluid',
      { backgroundPosition: '0% 50%' },
      {
        backgroundPosition: '100% 50%',
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: true,
        }
      }
    );
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} dir={t.dir} className="relative w-full py-24 md:py-32 font-sans z-20 bg-[#fcfcfd] overflow-hidden">
      
      {/* =========================================
          الخلفية الهندسية (Editorial Grid Lines) 
          مستوحاة من صورة Basit Design والصورة الأخيرة
          ========================================= */}
      <div className="absolute inset-0 pointer-events-none z-0 opacity-20" 
           style={{ 
             backgroundImage: `linear-gradient(to right, #888 1px, transparent 1px), linear-gradient(to bottom, #888 1px, transparent 1px)`, 
             backgroundSize: '80px 80px' 
           }}>
      </div>

      {/* بقع لونية (Vibrant Orbs) مستوحاة من صورة Blurr */}
      <div className="absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-fuchsia-400 rounded-full mix-blend-multiply filter blur-[120px] opacity-30 vibrant-aura"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40vw] h-[40vw] bg-cyan-400 rounded-full mix-blend-multiply filter blur-[100px] opacity-30 vibrant-aura" style={{ animationDelay: '-5s' }}></div>
      <div className="absolute top-[40%] right-[20%] w-[30vw] h-[30vw] bg-yellow-300 rounded-full mix-blend-multiply filter blur-[90px] opacity-20 vibrant-aura" style={{ animationDelay: '-10s' }}></div>

      <div className="max-w-[85rem] mx-auto px-6 lg:px-12 relative z-10">
        
        {/* الترويسة الأنيقة ذات الخطوط النظيفة */}
        <div className="modern-card flex flex-col md:flex-row justify-between items-end mb-16 gap-8 border-b border-gray-200/60 pb-10">
          <div className="w-full md:w-2/3">
            <span className="inline-block px-4 py-1.5 bg-white border border-gray-200 rounded-full text-xs font-bold uppercase tracking-widest text-gray-500 mb-6 shadow-sm">
              {isRTL ? 'مجالات خبرتنا' : 'Our Expertise'}
            </span>
            <h2 className="text-4xl md:text-5xl lg:text-7xl font-medium tracking-tighter leading-[1.05] text-[#111]">
              {isRTL ? 'حلول هندسية' : 'Engineered for'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-purple-500 to-fuchsia-500">
                {isRTL ? 'للهيمنة الرقمية.' : 'Digital Dominance.'}
              </span>
            </h2>
          </div>
          <div className="w-full md:w-1/3">
            <p className="text-gray-500 font-medium text-lg leading-relaxed">
              {isRTL 
                ? 'من تفاعل السوشال ميديا الفوري إلى الاشتراكات الحصرية. بنية تحتية متطورة لتسريع نموك الرقمي.' 
                : 'From instant social engagement to exclusive premium accounts. Advanced infrastructure to accelerate your growth.'}
            </p>
          </div>
        </div>

        {/* =========================================
            شبكة الخدمات (Editorial Layout)
            ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          
          {/* البطاقة الأولى (السوشال ميديا) - تصميم الكبسولة مع التدرج السائل */}
          <Link to="/products" className="modern-card lg:col-span-8 group relative bg-white/60 backdrop-blur-2xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] p-2 flex flex-col md:flex-row overflow-hidden hover:shadow-[0_30px_80px_-15px_rgba(37,99,235,0.15)] transition-all duration-500">
            
            {/* الجزء النصي (الزجاجي النظيف) */}
            <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col justify-between z-10">
              <div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-8 border border-blue-100 shadow-sm group-hover:scale-110 transition-transform">
                  <TrendingUp className="w-6 h-6" />
                </div>
                <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-[#111] mb-4">
                  {isRTL ? 'تفاعل ونمو السوشال ميديا' : 'Social Media Growth'}
                </h3>
                <p className="text-gray-500 font-medium leading-relaxed mb-8">
                  {isRTL 
                    ? 'ضاعف أرقامك فوراً. متابعون حقيقيون، لايكات، ومشاهدات لدعم حساباتك عبر جميع المنصات (تيك توك، انستغرام، فيسبوك).' 
                    : 'Multiply your numbers instantly. Real followers, likes, and views to boost your presence across all platforms.'}
                </p>
              </div>

              <div className="flex flex-col gap-3">
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white/80 w-max px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                  <Zap className="w-4 h-4 text-yellow-500" /> {isRTL ? 'بدء التنفيذ في 0.5 ثانية' : '0.5s Execution time'}
                </div>
                <div className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-white/80 w-max px-4 py-2 rounded-full border border-gray-100 shadow-sm">
                  <Check className="w-4 h-4 text-green-500" /> {isRTL ? 'ضمان تعويض تلقائي' : 'Auto-refill guarantee'}
                </div>
              </div>
            </div>

            {/* الجزء الجمالي (التدرج السائل المستوحى من الصور) */}
            <div className="w-full md:w-1/2 h-[300px] md:h-auto rounded-[2.5rem] overflow-hidden relative">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-fuchsia-500 to-orange-500 inner-fluid" style={{ backgroundSize: '200% 200%' }}></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
              
              {/* زر استكشاف طافي فوق الشكل الملون */}
              <div className="absolute bottom-6 right-6 w-14 h-14 bg-white/20 backdrop-blur-md rounded-full border border-white/50 flex items-center justify-center text-white group-hover:bg-white group-hover:text-blue-600 transition-colors duration-300 shadow-lg">
                <ArrowUpRight className={`w-6 h-6 ${isRTL ? '-scale-x-100' : ''}`} />
              </div>
            </div>
          </Link>

          {/* البطاقة الثانية (الاشتراكات) - أسلوب القوائم (Blurr Style) */}
          <div className="modern-card lg:col-span-4 bg-white/60 backdrop-blur-2xl border border-white shadow-[0_20px_60px_-15px_rgba(0,0,0,0.05)] rounded-[3rem] p-8 md:p-10 flex flex-col justify-between hover:shadow-[0_30px_80px_-15px_rgba(236,72,153,0.15)] transition-all duration-500 relative overflow-hidden">
            
            {/* توهج خفيف في الزاوية */}
            <div className="absolute top-[-20%] right-[-20%] w-[80%] h-[80%] bg-gradient-to-bl from-pink-300 to-orange-200 rounded-full mix-blend-multiply filter blur-[60px] opacity-60 pointer-events-none"></div>

            <div className="relative z-10 mb-10">
              <div className="w-12 h-12 bg-pink-50 text-pink-600 rounded-2xl flex items-center justify-center mb-8 border border-pink-100 shadow-sm">
                <Key className="w-6 h-6" />
              </div>
              <h3 className="text-3xl font-medium tracking-tight text-[#111] mb-4">
                {isRTL ? 'حسابات واشتراكات' : 'Premium Accounts'}
              </h3>
              <p className="text-gray-500 font-medium">
                {isRTL ? 'وصول حصري لأشهر المنصات العالمية بأسعار لا تُنافس.' : 'Exclusive access to top global platforms at unbeatable prices.'}
              </p>
            </div>

            {/* قائمة كلاسيكية بخطوط رفيعة وأرقام بارزة */}
            <div className="relative z-10 flex flex-col">
              {[
                { num: '01', text: 'Netflix & Entertainment' },
                { num: '02', text: 'Canva Pro & Tools' },
                { num: '03', text: 'YouTube Premium' }
              ].map((item, idx) => (
                <div key={idx} className="flex items-center gap-4 py-4 border-t border-gray-200/60 group cursor-pointer">
                  <span className="text-2xl font-light text-gray-400 group-hover:text-pink-500 transition-colors">{item.num}</span>
                  <span className="text-lg font-medium text-[#111]">{item.text}</span>
                  <ArrowUpRight className={`w-4 h-4 ml-auto text-gray-300 group-hover:text-pink-500 transition-colors ${isRTL ? '-scale-x-100' : ''}`} />
                </div>
              ))}
            </div>

            <Link to="/products" className="relative z-10 mt-8 block w-full py-4 bg-[#111] text-white text-center rounded-full font-bold uppercase tracking-widest text-sm hover:bg-gray-800 transition-colors shadow-lg">
              {isRTL ? 'تصفح الباقات' : 'View Packages'}
            </Link>
          </div>

        </div>

        {/* شريط الإحصائيات السفلي الأنيق (أرقام ضخمة مع نصوص صغيرة) */}
        <div className="modern-card mt-8 bg-white/40 backdrop-blur-md border border-gray-200/50 rounded-full px-10 py-6 hidden md:flex justify-between items-center">
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-medium text-[#111]">100%</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{isRTL ? 'أمان وسرية' : 'Secure & Private'}</span>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-medium text-[#111]">24/7</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{isRTL ? 'دعم فني أردني' : 'Local Support'}</span>
          </div>
          <div className="w-px h-8 bg-gray-300"></div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-medium text-[#111]">+50</span>
            <span className="text-xs font-bold uppercase tracking-widest text-gray-500">{isRTL ? 'منصة مدعومة' : 'Platforms'}</span>
          </div>
        </div>

      </div>
    </section>
  );
}