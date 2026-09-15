import React, { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { TrendingUp, Key, ArrowUpRight, Zap, Users, Star } from 'lucide-react';
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
    // استخدمنا fromTo لتجنب مشكلة بقاء العناصر مخفية في React
    gsap.fromTo('.category-card', 
      { 
        y: 100, 
        opacity: 0 
      },
      {
        y: 0,
        opacity: 1,
        duration: 1.5,
        stagger: 0.2,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 90%', // جعلناها 90% ليتم التفعيل بمجرد ظهور جزء بسيط من القسم
          // markers: true, // يمكنك إزالة التعليق عن هذا السطر لتشاهد خطوط التفعيل وتتأكد أنها تعمل
        }
      }
    );

    // حركة خفيفة للعناصر الزجاجية الداخلية (Parallax Effect)
    gsap.fromTo('.glass-panel', 
      { y: 0 },
      {
        y: -20,
        ease: 'none',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top bottom',
          end: 'bottom top',
          scrub: 1,
        }
      }
    );
  }, { scope: sectionRef });

  return (
    // نستخدم نفس خلفية الموقع (أو transparent) للحفاظ على اللوحة المتصلة
    <section ref={sectionRef} dir={t.dir} className="relative w-full py-24 md:py-32 px-6 lg:px-12 font-sans z-20">
      
      <div className="max-w-[85rem] mx-auto">
        
        {/* الترويسة الأنيقة (Editorial Header) */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 px-2 category-card">
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1] w-full md:w-1/2 text-[#111]">
            {isRTL ? 'حلول صُممت' : 'Solutions crafted'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {isRTL ? 'للهيمنة الرقمية.' : 'for digital dominance.'}
            </span>
          </h2>
          <p className="text-gray-500 font-medium text-lg leading-relaxed w-full md:w-1/3">
            {isRTL 
              ? 'سواء كنت تبحث عن تضخيم أرقامك على منصات التواصل، أو امتلاك حسابات واشتراكات حصرية، لدينا البنية التحتية لتحقيق ذلك فوراً.' 
              : 'Whether you seek to amplify your social metrics or acquire exclusive premium accounts, we have the infrastructure to deliver instantly.'}
          </p>
        </div>

        {/* شبكة البطاقات (Bento Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* =========================================
              البطاقة الأولى: خدمات السوشال ميديا (Social Media)
              تأخذ 7 أعمدة - مستوحاة من ستايل Canvas & Ideogram
              ========================================= */}
          <Link to="/products" className="category-card lg:col-span-7 group relative h-[500px] md:h-[600px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_80px_-20px_rgba(37,99,235,0.1)] transition-all duration-500 flex flex-col justify-between block">
            
            {/* الأوربات الفنية المتحركة في الخلفية (Fluid Abstract Gradients) */}
            <div className="absolute top-[-20%] right-[-10%] w-[80%] h-[80%] bg-gradient-to-bl from-blue-400 via-cyan-300 to-transparent rounded-full mix-blend-multiply blur-[80px] opacity-60 group-hover:scale-110 transition-transform duration-1000 ease-out animate-[pulse_8s_ease-in-out_infinite_alternate]"></div>
            <div className="absolute bottom-[-20%] left-[-10%] w-[60%] h-[60%] bg-gradient-to-tr from-purple-400 via-indigo-300 to-transparent rounded-full mix-blend-multiply blur-[80px] opacity-50 group-hover:scale-110 transition-transform duration-1000 ease-out"></div>

            {/* الجزء العلوي للبطاقة */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm text-blue-600 border border-white group-hover:rotate-12 transition-transform duration-500">
                <TrendingUp className="w-7 h-7" />
              </div>
              <span className="px-5 py-2 bg-white/60 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-gray-700 border border-white shadow-sm">
                01
              </span>
            </div>

            {/* اللوحة الزجاجية الداخلية (Glass Panel) - تحتوي على النصوص */}
            <div className="glass-panel relative z-20 w-full bg-white/70 backdrop-blur-xl border border-white/80 rounded-[2rem] p-8 shadow-xl mt-auto">
              <div className="flex justify-between items-end gap-4">
                <div>
                  <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-[#111] mb-3">
                    {t.home.categoriesSocial || (isRTL ? 'النمو والتفاعل' : 'Social Growth')}
                  </h3>
                  <p className="text-gray-600 font-medium max-w-sm">
                    {t.home.categoriesSocialDesc || (isRTL ? 'متابعين، لايكات، ومشاهدات بجودة فائقة لتعزيز مصداقيتك الرقمية.' : 'Premium followers, likes, and views to boost your digital credibility.')}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#111] rounded-full flex items-center justify-center text-white shrink-0 group-hover:bg-blue-600 transition-colors duration-300 shadow-md">
                  <ArrowUpRight className={`w-5 h-5 ${isRTL ? '-scale-x-100' : ''}`} />
                </div>
              </div>

              {/* شريط الإحصائيات/المميزات الصغير */}
              <div className="flex flex-wrap gap-4 mt-8 pt-6 border-t border-gray-200/50">
                <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                  <Zap className="w-4 h-4 text-yellow-500" /> {isRTL ? 'تنفيذ فوري' : 'Instant Start'}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                  <Users className="w-4 h-4 text-blue-500" /> {isRTL ? 'حسابات حقيقية' : 'Real Accounts'}
                </span>
                <span className="flex items-center gap-1.5 text-sm font-bold text-gray-700">
                  <Star className="w-4 h-4 text-purple-500" /> {isRTL ? 'ضمان تعويض' : 'Refill Guarantee'}
                </span>
              </div>
            </div>
          </Link>

          {/* =========================================
              البطاقة الثانية: الحسابات والاشتراكات (Accounts & Subs)
              تأخذ 5 أعمدة - مستوحاة من ألوان Samsung و Spark المشرقة
              ========================================= */}
          <Link to="/products" className="category-card lg:col-span-5 group relative h-[500px] md:h-[600px] bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-8 md:p-12 overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.03)] hover:shadow-[0_30px_80px_-20px_rgba(236,72,153,0.1)] transition-all duration-500 flex flex-col justify-between block">
            
            {/* الأوربات الفنية المتحركة (ألوان دافئة: وردي، برتقالي) */}
            <div className="absolute top-[10%] left-[-20%] w-[120%] h-[80%] bg-gradient-to-tr from-pink-400 via-rose-300 to-orange-300 rounded-full mix-blend-multiply blur-[80px] opacity-50 group-hover:scale-105 group-hover:rotate-12 transition-all duration-1000 ease-out"></div>
            
            {/* تأثير الخطوط الشبكية الدقيقة (Wireframe Touch) */}
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03] mix-blend-overlay"></div>

            {/* الجزء العلوي للبطاقة */}
            <div className="relative z-10 flex justify-between items-start">
              <div className="w-14 h-14 bg-white/80 backdrop-blur-md rounded-2xl flex items-center justify-center shadow-sm text-pink-600 border border-white group-hover:-rotate-12 transition-transform duration-500">
                <Key className="w-7 h-7" />
              </div>
              <span className="px-5 py-2 bg-white/60 backdrop-blur-md rounded-full text-xs font-bold uppercase tracking-widest text-gray-700 border border-white shadow-sm">
                02
              </span>
            </div>

            {/* المحتوى النصي الأنيق (بدون كرت زجاجي، نصوص مباشرة على الخلفية المضيئة) */}
            <div className="relative z-20 mt-auto">
              <h3 className="text-3xl md:text-4xl font-medium tracking-tight text-[#111] mb-4">
                {t.home.categoriesAccounts || (isRTL ? 'حسابات واشتراكات' : 'Premium Subscriptions')}
              </h3>
              <p className="text-gray-700 font-medium mb-8 leading-relaxed">
                {t.home.categoriesAccountsDesc || (isRTL ? 'وصول غير محدود. اشتراكات نتفلكس، يوتيوب بريميوم، وحسابات موثقة وجاهزة بأسعار تنافسية.' : 'Unlimited access. Netflix, YouTube Premium, and verified ready-to-use accounts at competitive rates.')}
              </p>
              
              {/* زر الشراء الدائري */}
              <div className="inline-flex items-center gap-3 px-6 py-3 bg-white/80 backdrop-blur-md border border-white rounded-full text-sm font-bold uppercase tracking-widest text-gray-900 shadow-sm group-hover:bg-[#111] group-hover:text-white transition-colors duration-300">
                {isRTL ? 'تصفح الباقات' : 'View Packages'} 
                <ArrowUpRight className={`w-4 h-4 ${isRTL ? '-scale-x-100' : ''}`} />
              </div>
            </div>

          </Link>

        </div>
      </div>
    </section>
  );
}