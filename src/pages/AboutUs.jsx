import React, { useRef } from 'react';
import { Zap, ShieldCheck, TrendingUp, ArrowUpRight } from 'lucide-react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

// تفعيل إضافة ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

export default function AboutUs() {
  const containerRef = useRef(null);

  // استخدام useGSAP (الـ Hook الرسمي للرياكت لضمان الأداء الممتاز)
  useGSAP(() => {
    // 1. تأثير البارالاكس للترويسة (Hero Parallax)
    gsap.to('.hero-text', {
      y: 150,
      opacity: 0,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true, // يربط الحركة بعجلة الماوس مباشرة
      }
    });

    gsap.to('.bg-grid', {
      y: 200,
      scrollTrigger: {
        trigger: '.hero-section',
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      }
    });

    // 2. حركة التدرج الفني المستمرة (Fluid Gradient Infinite Animation)
    gsap.to('.fluid-gradient', {
      scale: 1.05,
      rotation: 5,
      duration: 10,
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });

    // 3. انبثاق العناصر عند السكرول (Scroll Reveal)
    const revealSections = gsap.utils.toArray('.reveal-section');
    revealSections.forEach((section) => {
      const items = section.querySelectorAll('.reveal-item');
      gsap.from(items, {
        y: 50,
        opacity: 0,
        duration: 1.2,
        stagger: 0.15, // تتابع ظهور العناصر وراء بعضها
        ease: 'power3.out',
        scrollTrigger: {
          trigger: section,
          start: 'top 80%', // يبدأ الأنيميشن عندما يصل القسم لـ 80% من الشاشة
        }
      });
    });

    // 4. الدوائر الهندسية تتفاعل مع السكرول (Scrub Rotation)
    gsap.to('.cta-circle-1', {
      rotation: 180,
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1, // وضعنا 1 لجعل الحركة ناعمة (Smooth Scrubbing)
      }
    });

    gsap.to('.cta-circle-2', {
      rotation: -180,
      scrollTrigger: {
        trigger: '.cta-section',
        start: 'top bottom',
        end: 'bottom top',
        scrub: 1,
      }
    });

  }, { scope: containerRef }); // ربط الأنيميشن بالحاوية لتجنب تداخل الـ Classes

  return (
    <div ref={containerRef} dir="ltr" className="min-h-screen bg-[#fafbfc] font-sans overflow-hidden selection:bg-blue-200">
      
      {/* =========================================
          1. Hero Section (Cinematic Parallax)
          ========================================= */}
      <section className="hero-section relative w-full pt-32 pb-20 px-6 lg:px-12 flex flex-col justify-center min-h-[85vh] overflow-hidden">
        
        {/* شبكة الخلفية */}
        <div 
          className="bg-grid absolute inset-0 z-0 opacity-[0.03] pointer-events-none" 
          style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
        />
        
        {/* التدرجات الفنية الحرة */}
        <div 
          className="fluid-gradient absolute top-[-10%] right-[-5%] w-[60vw] h-[60vw] max-w-[800px] max-h-[800px] bg-gradient-to-bl from-pink-400/30 via-purple-400/20 to-blue-400/30 rounded-full blur-[100px] -z-10 mix-blend-multiply"
        />

        <div className="hero-text max-w-[90rem] mx-auto w-full relative z-10">
          <div className="flex items-center gap-3 mb-8 reveal-item">
            <span className="px-4 py-1.5 bg-gray-900 text-white font-bold text-xs tracking-widest uppercase rounded-full">
              Our Story
            </span>
            <span className="text-gray-500 font-mono text-sm tracking-widest uppercase">
              Est. 2026 // Amman, Jordan
            </span>
          </div>

          <h1 className="text-[14vw] md:text-[11vw] font-medium leading-[0.85] tracking-tighter text-[#1e2022] mb-6">
            <span className="block reveal-item">We Engineer</span>
            <span className="block reveal-item text-transparent bg-clip-text bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-600 italic pr-4">
              Growth.
            </span>
          </h1>
        </div>
      </section>

      {/* =========================================
          2. The Manifesto (Scroll Reveal)
          ========================================= */}
      <section className="reveal-section relative w-full py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          <div className="lg:col-span-5">
            <h2 className="reveal-item text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter text-gray-900 mb-8 leading-[1.1]">
              We don't just deliver. We build fame.
            </h2>
            <div className="reveal-item w-20 h-1 bg-blue-600"></div>
          </div>

          <div className="lg:col-span-7 flex flex-col gap-10 text-xl lg:text-3xl text-gray-500 font-light leading-relaxed">
            <p className="reveal-item">
              MediaJo was built on a single promise: to make you impossible to miss. We don't just grow numbers on a screen — we engineer real presence for brands, creators, and rising stars, turning attention into momentum.
            </p>
            <p className="reveal-item">
              By combining smart automation with local payment solutions like <strong className="font-semibold text-gray-900">CliQ</strong>, we've built an ecosystem where speed meets uncompromised quality.
            </p>
          </div>
        </div>
      </section>

      {/* =========================================
          3. Core Values (Bento Box)
          ========================================= */}
      <section className="reveal-section relative w-full py-32 px-6 lg:px-12 bg-[#fafbfc]">
        <div className="max-w-[85rem] mx-auto">
          <div className="mb-20 reveal-item">
            <h2 className="text-5xl md:text-7xl font-medium tracking-tighter text-[#1e2022]">
              The Core <span className="text-gray-400 italic">Matrix</span>
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            
            <div className="reveal-item bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                <Zap className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-medium text-gray-900 mb-4 tracking-tight">Lightning Speed</h3>
              <p className="text-gray-500 font-light leading-relaxed text-lg">
                Automated API routing ensures that 99% of our orders start within seconds of payment confirmation.
              </p>
            </div>

            <div className="reveal-item bg-white p-10 rounded-[2.5rem] border border-gray-100 shadow-sm hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group">
              <div className="w-16 h-16 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500">
                <ShieldCheck className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-medium text-gray-900 mb-4 tracking-tight">Premium Quality</h3>
              <p className="text-gray-500 font-light leading-relaxed text-lg">
                We filter our networks rigorously. Zero drop-offs, real engagement, and guaranteed premium accounts.
              </p>
            </div>

            <div className="reveal-item bg-[#111] p-10 rounded-[2.5rem] shadow-xl hover:-translate-y-2 hover:shadow-2xl transition-all duration-500 group md:col-span-2 lg:col-span-1 relative overflow-hidden text-white">
              <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-purple-500/30 to-transparent rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-1000"></div>
              
              <div className="w-16 h-16 bg-white/10 text-white rounded-2xl flex items-center justify-center mb-10 group-hover:scale-110 transition-transform duration-500 relative z-10 backdrop-blur-md">
                <TrendingUp className="w-8 h-8" />
              </div>
              <h3 className="text-3xl font-medium mb-4 tracking-tight relative z-10">Growth Engineering</h3>
              <p className="text-gray-400 font-light leading-relaxed text-lg relative z-10">
                Every campaign is architected with intention. We turn your goals into a measurable upward curve.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          4. Giant Stats Section
          ========================================= */}
      <section className="reveal-section relative w-full py-32 px-6 lg:px-12 bg-white">
        <div className="max-w-[85rem] mx-auto grid grid-cols-1 md:grid-cols-3 gap-16 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-gray-100">
          
          <div className="reveal-item flex flex-col items-center justify-center text-center pt-8 md:pt-0">
            <span className="text-[6rem] md:text-[7rem] lg:text-[8rem] font-medium tracking-tighter text-[#1e2022] leading-none mb-4">
              1M<span className="text-blue-600">+</span>
            </span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400">Orders Processed</span>
          </div>

          <div className="reveal-item flex flex-col items-center justify-center text-center pt-8 md:pt-0">
            <span className="text-[6rem] md:text-[7rem] lg:text-[8rem] font-medium tracking-tighter text-[#1e2022] leading-none mb-4">
              99<span className="text-purple-600">%</span>
            </span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400">Uptime SLA</span>
          </div>

          <div className="reveal-item flex flex-col items-center justify-center text-center pt-8 md:pt-0">
            <span className="text-[6rem] md:text-[7rem] lg:text-[8rem] font-medium tracking-tighter text-[#1e2022] leading-none mb-4">
              24<span className="text-green-500">/7</span>
            </span>
            <span className="text-sm font-bold tracking-[0.2em] uppercase text-gray-400">Active Support</span>
          </div>

        </div>
      </section>

      {/* =========================================
          5. Call to Action (Scroll Scub Trigger)
          ========================================= */}
      <section className="cta-section reveal-section relative w-full py-40 px-6 lg:px-12 bg-[#fafbfc] flex items-center justify-center text-center overflow-hidden">
        
        {/* دوائر فنية تدور مع السكرول بفضل GSAP Scrub */}
        <div className="cta-circle-1 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-gray-200 rounded-full pointer-events-none origin-center" />
        <div className="cta-circle-2 absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-gray-100 rounded-full pointer-events-none origin-center" />

        <div className="reveal-item relative z-10 flex flex-col items-center">
          <h2 className="text-6xl md:text-8xl font-medium tracking-tighter text-[#1e2022] mb-10">
            Ready to scale?
          </h2>
          <button className="group relative flex items-center gap-4 bg-[#111] text-white px-12 py-6 rounded-full font-bold text-lg overflow-hidden shadow-2xl hover:scale-105 transition-transform duration-300">
            <span className="relative z-10">Create Free Account</span>
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center relative z-10 group-hover:bg-blue-600 transition-colors duration-300">
              <ArrowUpRight className="w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform duration-300" />
            </div>
            {/* لمعة تتحرك داخل الزر CSS Only */}
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] pointer-events-none"></div>
          </button>
        </div>
      </section>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </div>
  );
}