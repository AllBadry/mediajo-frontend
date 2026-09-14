import React, { useRef } from 'react';
import { useLanguage } from '../context/LanguageContext';
import { ArrowUpRight, Sparkles, MapPin, Globe, Play, Volume2 } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';

gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';
  const containerRef = useRef(null);

  useGSAP(() => {
    // 1. حركة الأوربات (الألوان الضبابية في الخلفية) لتتحرك ببطء عبر الصفحة كاملة
    gsap.to('.global-orb-1', {
      y: '20vh',
      x: '10vw',
      scale: 1.2,
      duration: 20,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.global-orb-2', {
      y: '-30vh',
      x: '-15vw',
      scale: 1.1,
      duration: 25,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 2. حركة التمرير البارالاكس للترويسة
    gsap.to('.hero-title', {
      y: 120,
      opacity: 0.1,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 3. ظهور العناصر المتتابع بسلاسة تامة
    const revealElements = gsap.utils.toArray('.reveal-up');
    revealElements.forEach((el) => {
      gsap.from(el, {
        y: 80,
        opacity: 0,
        duration: 1.5,
        ease: 'expo.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        }
      });
    });

    // 4. حركة الشرائح الزجاجية العمودية
    gsap.from('.glass-slice', {
      y: 100,
      opacity: 0,
      stagger: 0.15,
      duration: 1.5,
      ease: 'power3.out',
      scrollTrigger: {
        trigger: '.crunchy-section',
        start: 'top 80%',
      }
    });

  }, { scope: containerRef });

  return (
    // الخلفية الموحدة للصفحة بالكامل (لون لؤلؤي/رمادي فاتح جداً) تعطي شعور اللوحة المتصلة
    <div ref={containerRef} dir={t.dir} className="relative min-h-screen bg-[#f8f9fa] font-sans overflow-hidden text-[#1a1a1a]">
      
      {/* شبكة نقاط خفيفة جداً تربط الصفحة كاملة */}
      <div className="fixed inset-0 z-0 opacity-[0.03] pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

      {/* ألوان ضبابية عائمة (Orbs) تتحرك في خلفية الصفحة بالكامل لتكسر الجمود بانسجام */}
      <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
        <div className="global-orb-1 absolute top-[10%] left-[-10%] w-[50vw] h-[50vw] bg-blue-400/10 rounded-full blur-[120px]"></div>
        <div className="global-orb-2 absolute bottom-[20%] right-[-10%] w-[60vw] h-[60vw] bg-purple-400/10 rounded-full blur-[150px]"></div>
      </div>

      {/* =========================================
          1. Hero Section (Local Roots, Global Vision)
          ========================================= */}
      <section className="hero-section relative w-full pt-40 pb-20 px-6 lg:px-12 flex flex-col justify-center min-h-[85vh]">
        <div className="max-w-[90rem] mx-auto w-full relative z-10 flex flex-col items-center text-center">
          
          <div className="flex items-center gap-4 px-6 py-2 bg-white/60 backdrop-blur-md border border-gray-200 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-10 shadow-sm reveal-up">
            <span className="flex items-center gap-1.5 text-blue-600"><MapPin className="w-4 h-4"/> Amman, JO</span>
            <div className="w-1 h-1 bg-gray-300 rounded-full"></div>
            <span className="flex items-center gap-1.5 text-purple-600"><Globe className="w-4 h-4"/> Global Standard</span>
          </div>

          <h1 className="hero-title text-[11vw] md:text-[8vw] lg:text-[6.5rem] font-medium tracking-tighter leading-[1] text-[#111] mb-8">
            {isRTL ? 'روح محلية.' : 'Local Soul.'} <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
              {isRTL ? 'معايير عالمية.' : 'Global Standards.'}
            </span>
          </h1>
          
          <p className="reveal-up text-lg md:text-xl text-gray-500 font-medium max-w-2xl leading-relaxed">
            {isRTL 
              ? 'انطلقنا من قلب الأردن لنبني وكالة نمو رقمي تفهم لغة سوقك المحلي، وتعمل ببنية تحتية وأتمتة تنافس كبرى المنصات العالمية.' 
              : 'Born in the heart of Jordan, we built a digital growth agency that speaks your local language, powered by world-class automation and infrastructure.'}
          </p>
        </div>
      </section>

      {/* =========================================
          2. The Ecosystem (Spark Style - Seamless Blending)
          ========================================= */}
      <section className="relative w-full py-24 px-6 lg:px-12">
        <div className="max-w-[90rem] mx-auto">
          
          <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[400px] reveal-up">
            
            {/* الكرت الرئيسي المتناسق مع الخلفية */}
            <div className="flex-[2.5] relative bg-white/70 backdrop-blur-xl border border-white rounded-[3rem] p-10 flex flex-col justify-between shadow-[0_20px_40px_rgba(0,0,0,0.03)] overflow-hidden min-h-[300px]">
              <div className="absolute top-0 right-0 w-64 h-64 bg-blue-100/50 rounded-full blur-3xl -z-10"></div>
              
              <div>
                <h3 className="text-3xl lg:text-4xl font-medium tracking-tight mb-4">
                  {isRTL ? 'تكنولوجيا تفهم احتياجك' : 'Tech that understands you'}
                </h3>
                <p className="text-gray-500 font-medium max-w-md">
                  {isRTL ? 'نربط الذكاء الاصطناعي بخبرتنا في السوق الأردني والعربي لنقدم نتائج تتحدث عن نفسها.' : 'We connect AI with our deep understanding of the MENA market to deliver results that speak for themselves.'}
                </p>
              </div>

              <div className="flex gap-2 flex-wrap mt-8">
                {['دعم شبكة CliQ', 'تنفيذ بالثواني', 'حسابات حقيقية'].map((tag) => (
                  <span key={tag} className="px-5 py-2 bg-white border border-gray-100 text-gray-700 rounded-full text-sm font-bold shadow-sm">
                    {tag}
                  </span>
                ))}
              </div>
            </div>

            {/* كبسولات المعلومات (ألوان هادئة ومتناسقة) */}
            <div className="flex-[0.8] bg-blue-50 border border-blue-100/50 rounded-[3rem] flex flex-col items-center justify-between py-10 text-blue-900 min-h-[300px]">
              <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold shadow-sm">01</span>
              <span className="text-lg font-bold tracking-widest uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {isRTL ? 'أتمتة' : 'Automation'}
              </span>
            </div>

            <div className="flex-[0.8] bg-purple-50 border border-purple-100/50 rounded-[3rem] flex flex-col items-center justify-between py-10 text-purple-900 min-h-[300px]">
              <span className="w-12 h-12 bg-white rounded-full flex items-center justify-center font-bold shadow-sm">02</span>
              <span className="text-lg font-bold tracking-widest uppercase" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>
                {isRTL ? 'جودة' : 'Quality'}
              </span>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================
          3. The Smooth Cutout (Tech & Visual S-Shape)
          بدون خلفية بيضاء صلبة، تندمج مع اللوحة
          ========================================= */}
      <section className="relative w-full py-24 px-6 lg:px-12">
        <div className="max-w-[85rem] mx-auto reveal-up">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8 px-4">
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter leading-[1.1] w-full md:w-1/2 text-[#111]">
              {isRTL ? 'هندسة بصرية,' : 'Visual Engineering,'} <br /> 
              <span className="text-gray-400">{isRTL ? 'ونتائج رقمية.' : 'Digital Results.'}</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed w-full md:w-1/3">
              {isRTL 
                ? 'ندمج بين جمالية التصميم وقوة الخوارزميات، لنجعل علامتك التجارية تتصدر المشهد في الأردن والوطن العربي.' 
                : 'Merging design aesthetics with algorithm power, ensuring your brand leads the scene in Jordan and MENA.'}
            </p>
          </div>

          {/* الكبسولة الأفقية المفرغة المنسجمة مع الثيم الفاتح */}
          <div className="relative w-full h-[200px] md:h-[300px] mb-16">
            <div className="absolute left-0 top-0 w-[70%] h-[60%] bg-white/80 backdrop-blur-xl border border-white shadow-sm rounded-r-[5rem] overflow-hidden flex items-center p-8">
               <span className="text-3xl md:text-4xl font-medium tracking-tight text-gray-300">MEDIA</span>
            </div>
            <div className="absolute right-0 bottom-0 w-[60%] h-[60%] bg-gradient-to-r from-blue-600 to-purple-600 rounded-l-[5rem] overflow-hidden flex items-center justify-end p-8 shadow-lg">
               <span className="text-3xl md:text-4xl font-medium tracking-tight text-white">JO.</span>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          4. Vertical Glass Slices (Crunchy Style - Floating)
          ========================================= */}
      <section className="crunchy-section relative w-full py-24 flex overflow-hidden">
        <div className="max-w-[90rem] mx-auto w-full px-6 lg:px-12">
          
          {/* النص العائم خلف الزجاج */}
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0 opacity-5">
            <h2 className="text-[15vw] font-black tracking-tighter uppercase text-gray-900">
              TRUSTED
            </h2>
          </div>

          <div className="relative z-10 w-full h-[450px] flex justify-center items-center gap-3 sm:gap-4">
            {[
              { id: '01', title: isRTL ? 'استقرار 99.9%' : '99.9% Uptime', align: 'items-end pb-12', color: 'bg-white/60' },
              { id: '02', title: isRTL ? '+1000 عميل' : '1000+ Clients', align: 'items-start pt-12', color: 'bg-blue-50/80' },
              { id: '03', title: isRTL ? 'دعم محلي' : 'Local Support', align: 'items-end pb-12', color: 'bg-white/60' },
              { id: '04', title: isRTL ? 'سرعة 0.5s' : '0.5s Speed', align: 'items-start pt-12', color: 'bg-purple-50/80' }
            ].map((slice, i) => (
              <div 
                key={i} 
                className={`glass-slice h-[80%] w-full max-w-[220px] ${slice.color} backdrop-blur-xl border border-white shadow-[0_10px_30px_rgba(0,0,0,0.03)] rounded-[2.5rem] flex flex-col justify-between px-6 py-8 transition-transform hover:-translate-y-4 cursor-default`}
              >
                <span className="text-lg font-medium text-gray-400">{slice.id}</span>
                <span className={`text-base font-bold uppercase tracking-widest text-[#111] max-w-[120px] ${slice.align === 'items-end pb-12' ? 'text-left' : ''}`}>
                  {slice.title}
                </span>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================
          5. Transparent Audio Player Mockup (Empathy section)
          ========================================= */}
      <section className="relative w-full py-32 px-6 lg:px-12 flex justify-center items-center">
        
        <div className="reveal-up relative z-10 w-full max-w-[70rem] bg-white/50 backdrop-blur-2xl border border-white/80 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-16 shadow-[0_20px_60px_rgba(0,0,0,0.02)]">
          
          <div className="flex-1">
            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-gray-100 rounded-full text-xs font-bold uppercase tracking-widest text-gray-600 mb-6">
              <Sparkles className="w-4 h-4"/> {isRTL ? 'تواصل دائم' : 'Always Connected'}
            </div>
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-6 leading-[1.1] text-[#111]">
              {isRTL ? 'خدمة عملاء تفهمك,' : 'Support that speaks'}<br/>
              <span className="text-gray-400">{isRTL ? 'وتقنية لا تنام.' : 'your language.'}</span>
            </h2>
            <p className="text-gray-500 font-medium text-lg leading-relaxed mb-10 max-w-sm">
              {isRTL 
                ? 'نحن متواجدون في الأردن لنسمعك ونفهم متطلباتك بدقة، بينما تعمل سيرفراتنا على مدار الساعة لتنفيذ طلباتك آلياً.' 
                : 'Based in Jordan to understand your exact needs locally, while our automated servers execute your growth globally 24/7.'}
            </p>
            <Link to="/products" className="inline-flex px-10 py-5 bg-[#111] text-white rounded-full font-bold text-sm uppercase tracking-wider hover:bg-blue-600 transition-colors shadow-lg hover:-translate-y-1">
              {isRTL ? 'ابدأ رحلتك معنا' : 'Start your journey'}
            </Link>
          </div>

          {/* مشغل صوت زجاجي نظيف جداً منسجم مع اللوحة */}
          <div className="w-full md:w-[350px] relative">
            {/* هالة لونية خفيفة خلف المشغل */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-blue-200 to-purple-200 rounded-full blur-[40px] -z-10 opacity-60"></div>
            
            <div className="w-full bg-white/80 backdrop-blur-xl border border-white rounded-[2rem] p-6 shadow-xl relative overflow-hidden">
              <div className="flex justify-between items-center mb-8">
                <div className="flex items-center gap-3 text-[#111]">
                  <div className="p-2 bg-blue-50 text-blue-600 rounded-full">
                    <Volume2 className="w-4 h-4" />
                  </div>
                  <span className="text-sm font-bold tracking-wide">
                    {isRTL ? 'رسالة صوتية واردة' : 'Incoming Voice'}
                  </span>
                </div>
                <span className="text-xs font-bold text-gray-400">Amman, JO</span>
              </div>
              
              <div className="flex items-center gap-4">
                <button className="w-12 h-12 bg-[#111] text-white rounded-full flex items-center justify-center hover:scale-105 transition-transform shadow-md">
                  <Play className="w-5 h-5 ml-1" />
                </button>
                <div className="flex-1 h-2 bg-gray-200 rounded-full overflow-hidden">
                  <div className="w-1/2 h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full relative"></div>
                </div>
              </div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}