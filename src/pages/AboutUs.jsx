import React, { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Sparkles, TrendingUp, Zap, ArrowUpRight, PlayCircle } from 'lucide-react';
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
    // 1. حركة الأوربات (Gradient Orbs) العائمة
    gsap.to('.aura-orb-1', {
      x: '10vw',
      y: '5vh',
      scale: 1.1,
      rotation: 15,
      duration: 12,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    gsap.to('.aura-orb-2', {
      x: '-15vw',
      y: '-10vh',
      scale: 1.2,
      rotation: -20,
      duration: 15,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 2. حركة التمرير البارالاكس للترويسة
    gsap.to('.hero-title', {
      y: 100,
      opacity: 0.2,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 3. ظهور العناصر المتتابع (Fade Up)
    const revealElements = gsap.utils.toArray('.reveal-up');
    revealElements.forEach((el) => {
      gsap.from(el, {
        y: 60,
        opacity: 0,
        duration: 1,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
        }
      });
    });

    // 4. تأثير الشرائح الزجاجية (Crunchy Style Effect)
    gsap.from('.glass-strip', {
      y: 100,
      opacity: 0,
      duration: 1,
      stagger: 0.15,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: '.glass-strips-container',
        start: 'top 75%',
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} dir={t.dir} className="relative min-h-screen bg-[#f5f5f7] font-sans overflow-hidden text-[#111]">
      
      {/* =========================================
          طبقة الحبيبات (Noise / Grain Texture)
          تغطي الشاشة بالكامل لإعطاء مظهر Ideogram و ls.graphics
          ========================================= */}
      <div className="fixed inset-0 z-50 pointer-events-none opacity-[0.04] mix-blend-multiply" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

      {/* =========================================
          1. Hero Section (Samsung Design / ls.graphics Style)
          ========================================= */}
      <section className="hero-section relative w-full h-[90vh] flex flex-col justify-center items-center overflow-hidden">
        
        {/* التدرجات الفنية الضخمة (Aura / Blobs) */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <div className="aura-orb-1 absolute w-[60vw] h-[60vw] min-w-[600px] min-h-[600px] bg-gradient-to-tr from-[#ff3366] via-[#ff9933] to-[#ffcc00] rounded-full blur-[120px] opacity-60 mix-blend-multiply top-[-10%] right-[-10%]"></div>
          <div className="aura-orb-2 absolute w-[70vw] h-[70vw] min-w-[700px] min-h-[700px] bg-gradient-to-bl from-[#00c6ff] via-[#0072ff] to-[#bd00ff] rounded-full blur-[140px] opacity-40 mix-blend-multiply bottom-[-20%] left-[-20%]"></div>
        </div>

        {/* النص المركزي */}
        <div className="hero-title relative z-10 text-center flex flex-col items-center px-6">
          <span className="px-5 py-2 bg-white/40 backdrop-blur-md border border-white/50 rounded-full text-xs font-bold uppercase tracking-[0.2em] mb-8 shadow-sm">
            {isRTL ? 'رؤيتنا الإبداعية' : 'Our Creative Vision'}
          </span>
          <h1 className="text-[12vw] md:text-[8vw] lg:text-[7rem] font-medium tracking-tighter leading-[0.9] text-gray-900 drop-shadow-sm">
            The Dream <br />
            <span className="font-light italic text-gray-700">Navigator</span>
          </h1>
          <p className="mt-8 text-lg md:text-xl text-gray-600 font-medium max-w-lg leading-relaxed">
            {isRTL 
              ? 'ميديا جو هي بوابتك نحو الإلهام والابتكار في عالم النمو الرقمي.' 
              : 'MediaJo is your path to inspiration and innovation in digital growth.'}
          </p>
        </div>
      </section>

      {/* =========================================
          2. Split Layout (Ideogram Style)
          ========================================= */}
      <section className="relative w-full py-32 px-6 lg:px-12 bg-[#f5f5f7]">
        <div className="max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div className="reveal-up order-2 lg:order-1 flex flex-col justify-center">
            <h2 className="text-4xl md:text-6xl font-medium tracking-tighter mb-8 leading-[1.1]">
              {isRTL ? 'إبداع يتجاوز' : 'Creativity beyond'}<br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-purple-600">
                {isRTL ? 'المألوف.' : 'the ordinary.'}
              </span>
            </h2>
            <p className="text-gray-500 font-light text-xl leading-relaxed mb-10 max-w-md">
              {isRTL 
                ? 'نحن لا نقدم مجرد خدمات، بل نصنع واجهات وتجارب رقمية تعيد صياغة مفهوم السيطرة على وسائل التواصل الاجتماعي.' 
                : 'We don’t just offer services; we craft digital interfaces and experiences that redefine social media dominance.'}
            </p>
            
            <div className="flex gap-4">
              <Link to="/products" className="px-8 py-4 bg-gray-900 text-white rounded-full font-bold tracking-wide hover:bg-gray-800 transition-colors flex items-center gap-2">
                {isRTL ? 'ابدأ الآن' : 'Get Started'} <ArrowUpRight className="w-5 h-5" />
              </Link>
            </div>
          </div>

          {/* لوحة زجاجية فنية فوق التدرجات (Glassmorphism Artwork) */}
          <div className="reveal-up order-1 lg:order-2 relative h-[500px] w-full rounded-[3rem] overflow-hidden bg-white/20 border border-white/50 backdrop-blur-xl shadow-2xl p-8 flex flex-col justify-between">
            <div className="absolute inset-0 bg-gradient-to-br from-blue-400/30 via-purple-400/20 to-pink-400/30 -z-10"></div>
            
            <div className="flex justify-between items-start">
              <div className="w-12 h-12 bg-white/50 rounded-full flex items-center justify-center backdrop-blur-md">
                <Sparkles className="w-6 h-6 text-blue-600" />
              </div>
              <span className="px-4 py-2 bg-white/40 rounded-full text-xs font-bold uppercase tracking-widest backdrop-blur-md">
                {isRTL ? 'تحليلات ذكية' : 'Smart Analytics'}
              </span>
            </div>

            <div>
              <h3 className="text-4xl font-medium tracking-tight mb-2">MediaJo Engine</h3>
              <p className="text-gray-700 font-medium">Illuminating your path to digital triumph.</p>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          3. Vertical Glass Strips (Crunchy Style)
          ========================================= */}
      <section className="relative w-full py-32 bg-gray-900 text-white overflow-hidden">
        
        {/* خلفية زرقاء عميقة مشعة (Deep Blue Glow) */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[120vw] h-[100vh] bg-gradient-to-b from-[#0011ff] to-[#000000] blur-[100px] opacity-50 pointer-events-none"></div>

        <div className="max-w-[85rem] mx-auto px-6 lg:px-12 relative z-10">
          <div className="text-center mb-20 reveal-up">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter uppercase">
              {isRTL ? 'استوديو النمو' : 'Growth Studio'}
            </h2>
          </div>

          {/* شرائح زجاجية عامودية */}
          <div className="glass-strips-container grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
            
            {[
              { id: '01', title: isRTL ? 'السرعة' : 'Speed', icon: Zap, desc: isRTL ? 'تنفيذ فوري للطلبات' : 'Instant execution' },
              { id: '02', title: isRTL ? 'الجودة' : 'Quality', icon: Sparkles, desc: isRTL ? 'حسابات حقيقية ونشطة' : 'Real active accounts' },
              { id: '03', title: isRTL ? 'التحليل' : 'Analytics', icon: TrendingUp, desc: isRTL ? 'تقارير نمو مفصلة' : 'Detailed growth reports' }
            ].map((item) => (
              <div key={item.id} className="glass-strip relative group h-full rounded-[2rem] bg-white/5 border border-white/10 backdrop-blur-2xl p-8 flex flex-col justify-between overflow-hidden hover:bg-white/10 transition-colors duration-500 cursor-pointer">
                <div className="absolute inset-0 bg-gradient-to-b from-blue-500/0 via-blue-500/0 to-blue-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                
                <div className="flex justify-between items-center relative z-10">
                  <span className="text-xl font-mono text-gray-400">{item.id}</span>
                  <item.icon className="w-6 h-6 text-blue-400" />
                </div>
                
                <div className="relative z-10">
                  <h3 className="text-3xl font-medium mb-2">{item.title}</h3>
                  <p className="text-gray-400 text-sm font-light">{item.desc}</p>
                </div>
              </div>
            ))}

          </div>
        </div>
      </section>

      {/* =========================================
          4. Stats Pill-Shaped Cards (Spark Style)
          ========================================= */}
      <section className="relative w-full py-32 px-6 lg:px-12 bg-[#f5f5f7]">
        <div className="max-w-[85rem] mx-auto">
          
          <div className="flex flex-col md:flex-row gap-8">
            
            {/* عنوان القسم */}
            <div className="reveal-up md:w-1/3 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4">
                Fueling growth with data insights.
              </h2>
              <Link to="/products" className="text-blue-600 font-bold hover:underline flex items-center gap-1 w-max">
                Create project <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            {/* الإحصائيات (كبسولات بيضاء مسطحة) */}
            <div className="md:w-2/3 grid grid-cols-2 md:grid-cols-4 gap-4">
              
              <div className="reveal-up bg-white rounded-3xl p-6 flex flex-col justify-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Impressions</span>
                <span className="text-3xl font-medium tracking-tighter">2.3M</span>
              </div>
              
              <div className="reveal-up bg-white rounded-3xl p-6 flex flex-col justify-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Conversion</span>
                <span className="text-3xl font-medium tracking-tighter">99%</span>
              </div>

              <div className="reveal-up bg-white rounded-3xl p-6 flex flex-col justify-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Clients</span>
                <span className="text-3xl font-medium tracking-tighter">+1000</span>
              </div>

              <div className="reveal-up bg-white rounded-3xl p-6 flex flex-col justify-center border border-gray-100 shadow-sm hover:shadow-md transition-shadow">
                <span className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">Uptime</span>
                <span className="text-3xl font-medium tracking-tighter">24/7</span>
              </div>

            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          5. CTA (Audio Player Inspired - Image 662240...)
          ========================================= */}
      <section className="relative w-full py-40 px-6 lg:px-12 flex justify-center items-center">
        
        {/* خلفية ضبابية خضراء/زرقاء (طبيعة/صوتيات) */}
        <div className="absolute inset-0 flex items-center justify-center -z-10 overflow-hidden">
          <div className="w-[80vw] h-[80vw] bg-gradient-to-r from-green-400/40 to-blue-400/40 rounded-full blur-[100px]"></div>
        </div>

        <div className="reveal-up relative z-10 w-full max-w-4xl bg-white/60 backdrop-blur-2xl border border-white/80 rounded-[3rem] p-10 md:p-16 flex flex-col md:flex-row items-center gap-10 shadow-[0_20px_60px_rgba(0,0,0,0.05)]">
          
          <div className="flex-1">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tight mb-4 leading-tight">
              {isRTL ? 'ابدأ في بناء وكالتك الرقمية الآن.' : 'Start building your digital agency now.'}
            </h2>
            <p className="text-gray-500 mb-8 font-medium">
              {isRTL ? 'خدمات مؤتمتة، دعم فني متواصل، ونتائج مضمونة.' : 'Automated services, continuous support, and guaranteed results.'}
            </p>
            <Link to="/products" className="px-8 py-4 bg-[#111] text-white rounded-full font-bold flex items-center gap-2 w-max hover:bg-blue-600 transition-colors">
              <PlayCircle className="w-5 h-5" /> {isRTL ? 'اشترك الآن' : 'Join Now'}
            </Link>
          </div>

          {/* محاكاة مشغل زجاجي (Glass Player Mockup) */}
          <div className="w-full md:w-80 h-24 bg-white/40 backdrop-blur-md border border-white rounded-2xl p-4 flex flex-col justify-center shadow-lg relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-blue-400/20 rounded-full blur-xl"></div>
            <div className="flex justify-between items-center mb-2 text-xs font-bold tracking-widest text-gray-500 uppercase">
              <span>{isRTL ? 'النمو الرقمي' : 'Digital Growth'}</span>
              <span>100%</span>
            </div>
            <div className="w-full h-2 bg-gray-200/50 rounded-full overflow-hidden">
              <div className="h-full bg-blue-500 w-[75%] rounded-full"></div>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
}