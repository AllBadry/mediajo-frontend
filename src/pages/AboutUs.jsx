import React, { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight, Sparkles, Play, Volume2 } from 'lucide-react';
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
    // حركة الكبسولة الأفقية (Tech & Visual Image)
    gsap.to('.fluid-inner', {
      backgroundPosition: '200% center',
      duration: 15,
      repeat: -1,
      ease: 'none'
    });

    // دخول العناصر عند السكرول
    const sections = gsap.utils.toArray('.gsap-reveal');
    sections.forEach((sec) => {
      gsap.from(sec, {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: 'power3.out',
        scrollTrigger: {
          trigger: sec,
          start: 'top 85%',
        }
      });
    });

    // حركة الشرائح الزجاجية العمودية (Crunchy Image)
    gsap.from('.glass-slice', {
      x: (i) => (i + 1) * 50,
      opacity: 0,
      stagger: 0.1,
      duration: 1,
      ease: 'power2.out',
      scrollTrigger: {
        trigger: '.crunchy-section',
        start: 'top 70%',
      }
    });

  }, { scope: containerRef });

  return (
    <div ref={containerRef} dir={t.dir} className="min-h-screen bg-[#f7f7f9] text-[#111] font-sans overflow-hidden">
      
      {/* =========================================
          1. Hero Section (Samsung Design + Spark Style)
          ========================================= */}
      <section className="relative w-full pt-32 pb-16 px-6 lg:px-12 flex flex-col justify-center min-h-[70vh]">
        
        {/* أوربات لونية ضبابية جداً في الزوايا */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-gradient-to-bl from-pink-300 via-purple-200 to-transparent rounded-full blur-[100px] opacity-60 pointer-events-none -translate-y-1/2 translate-x-1/4"></div>
        <div className="absolute bottom-0 left-0 w-[30vw] h-[30vw] bg-gradient-to-tr from-blue-300 via-cyan-100 to-transparent rounded-full blur-[100px] opacity-60 pointer-events-none translate-y-1/2 -translate-x-1/4"></div>

        <div className="max-w-[90rem] mx-auto w-full relative z-10 gsap-reveal">
          <div className="flex flex-col lg:flex-row justify-between items-start gap-10">
            
            <h1 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-medium leading-[1.1] tracking-tighter uppercase w-full lg:w-3/4">
              {isRTL ? 'ميديا جو هي بوابتك نحو' : 'THE DREAM NAVIGATOR IS YOUR PATH TO'} <br />
              <span className="flex items-center gap-4">
                {isRTL ? 'الإلهام والابتكار' : 'INSPIRATION AND INNOVATION'} 
                <Sparkles className="w-10 h-10 md:w-14 md:h-14 text-blue-600" />
              </span>
            </h1>

            <div className="w-full lg:w-1/4 pt-4">
              <p className="text-sm font-bold tracking-widest text-gray-500 uppercase mb-2">
                {isRTL ? 'تحليلات النمو' : 'Growth Analytics'}
              </p>
              <p className="text-base text-gray-700 font-medium">
                {isRTL 
                  ? 'نضيء طريقك نحو النجاح الرقمي عبر فك رموز البيانات المعقدة.' 
                  : 'Illuminating your path to digital triumph by decoding data intricacies.'}
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          2. Vertical Pills Layout (Spark Style Image)
          ========================================= */}
      <section className="relative w-full pb-24 px-6 lg:px-12">
        <div className="max-w-[90rem] mx-auto gsap-reveal">
          
          {/* شبكة الكبسولات المعقدة */}
          <div className="flex flex-col lg:flex-row gap-4 h-auto lg:h-[450px]">
            
            {/* كرت عريض (3D Sphere Placeholder) */}
            <div className="flex-[3] relative bg-[#5e6ad2] rounded-[3rem] overflow-hidden p-8 flex flex-col justify-between min-h-[300px]">
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-30 mix-blend-overlay"></div>
              {/* مجسمات دائرية تحاكي الـ 3D */}
              <div className="absolute top-1/2 left-1/4 w-32 h-32 bg-white rounded-full shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.2),0_20px_40px_rgba(0,0,0,0.4)] -translate-y-1/2"></div>
              <div className="absolute top-1/2 left-1/2 w-40 h-40 bg-white rounded-full shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.2),0_20px_40px_rgba(0,0,0,0.4)] -translate-y-1/2"></div>
              
              <div className="relative z-10 flex gap-2 flex-wrap mb-4">
                {['SEO', 'Digital Marketing', 'Data Analytics'].map((tag) => (
                  <span key={tag} className="px-4 py-1.5 border border-white/40 text-white rounded-full text-xs font-bold backdrop-blur-md">
                    {tag}
                  </span>
                ))}
              </div>
              <div className="relative z-10 text-white font-bold text-lg">
                01 <span className="ml-2 font-medium">Creativity, innovation, progress</span>
              </div>
            </div>

            {/* كبسولات رفيعة (Vertical Text) */}
            <div className="flex-[0.5] bg-[#4a55c2] rounded-full flex flex-col items-center justify-between py-8 text-white min-h-[300px]">
              <span className="text-xl font-medium tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Marketing</span>
              <span className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center font-bold">02</span>
            </div>

            <div className="flex-[0.5] bg-[#d3d8f5] rounded-full flex flex-col items-center justify-between py-8 text-[#4a55c2] min-h-[300px]">
              <span className="text-xl font-medium tracking-widest" style={{ writingMode: 'vertical-rl', transform: 'rotate(180deg)' }}>Innovate</span>
              <span className="w-10 h-10 bg-[#4a55c2]/10 rounded-full flex items-center justify-center font-bold">03</span>
            </div>

            {/* كرت زجاجي مع صورة */}
            <div className="flex-[1.5] relative bg-gradient-to-br from-blue-100 to-blue-200 rounded-[3rem] p-8 flex flex-col justify-between overflow-hidden min-h-[300px]">
              <div className="flex justify-between items-start mb-10">
                <span className="w-10 h-10 bg-white rounded-full flex items-center justify-center font-bold text-blue-900">04</span>
                <img src="https://i.pravatar.cc/100?img=11" alt="Avatar" className="w-12 h-12 rounded-full border-2 border-white shadow-md" />
              </div>
              <div>
                <h3 className="text-3xl font-medium text-blue-900 leading-tight mb-2 uppercase">Spark Your <br/> Creativity</h3>
                <Link to="/products" className="inline-block mt-4 px-6 py-2 bg-white text-blue-900 rounded-full text-xs font-bold uppercase hover:scale-105 transition-transform shadow-sm">
                  Explore Now
                </Link>
              </div>
            </div>

          </div>

          {/* شريط الإحصائيات السفلي */}
          <div className="flex flex-wrap justify-between items-center mt-6 py-6 border-b border-gray-300 gap-4">
            <span className="text-sm font-bold">98% Satisfied Clients</span>
            <span className="text-sm font-bold">24/7 Customer Support</span>
            <span className="text-sm font-bold">10K+ Happy Customers</span>
            <div className="flex gap-2">
              <div className="w-10 h-10 bg-[#4a55c2] rounded-full text-white flex items-center justify-center font-bold text-xl">Bē</div>
              <div className="w-10 h-10 bg-[#4a55c2] rounded-full text-white flex items-center justify-center font-bold text-xl">In</div>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          3. The Horizontal Cutout (Tech & Visual Image)
          ========================================= */}
      <section className="relative w-full py-24 px-6 lg:px-12 bg-white rounded-t-[3rem]">
        <div className="max-w-[85rem] mx-auto gsap-reveal">
          
          <div className="flex flex-col md:flex-row justify-between items-start mb-16 gap-8">
            <h2 className="text-4xl md:text-5xl font-medium tracking-tighter leading-tight w-full md:w-1/2">
              Pushing the boundaries <br /> between <span className="font-bold">Tech & Visual</span>
            </h2>
            <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed w-full md:w-1/3">
              We merge technology and visual design to create innovative, impactful solutions. Our mission is to deliver growth that is both striking and highly functional.
            </p>
          </div>

          {/* الكبسولة الأفقية العملاقة التي تقطع الشاشة وتلتوي */}
          <div className="relative w-full h-[250px] md:h-[350px] mb-12">
            {/* شكل يجمع بين كبسولتين ليعطي شكل الانحناء (S-shape curve cutout) */}
            <div className="absolute left-0 top-0 w-3/4 h-[70%] bg-[#111] rounded-r-full overflow-hidden">
               <div className="fluid-inner absolute inset-0 bg-gradient-to-r from-red-600 via-purple-600 to-red-600 opacity-80" style={{ backgroundSize: '200% auto' }}></div>
            </div>
            <div className="absolute right-0 bottom-0 w-1/2 h-[70%] bg-[#111] rounded-l-full overflow-hidden">
               <div className="fluid-inner absolute inset-0 bg-gradient-to-r from-purple-600 via-red-600 to-purple-600 opacity-80" style={{ backgroundSize: '200% auto' }}></div>
            </div>
          </div>

          {/* الإحصائيات أسفل الكبسولة */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center pt-8 border-t border-gray-100">
            <div>
              <div className="text-3xl font-medium mb-1">50+</div>
              <div className="text-gray-500 text-sm">Industries</div>
            </div>
            <div>
              <div className="text-3xl font-medium mb-1">4 Week</div>
              <div className="text-gray-500 text-sm">Turnaround</div>
            </div>
            <div>
              <div className="text-3xl font-medium mb-1">100%</div>
              <div className="text-gray-500 text-sm">Satisfaction</div>
            </div>
            <div>
              <div className="text-3xl font-medium mb-1">5000+</div>
              <div className="text-gray-500 text-sm">Clients</div>
            </div>
          </div>

        </div>
      </section>

      {/* =========================================
          4. Vertical Glass Slices (Crunchy Image)
          ========================================= */}
      <section className="crunchy-section relative w-full h-[80vh] bg-[#0f172a] text-white flex overflow-hidden">
        
        {/* خلفية زرقاء مشعة من المنتصف */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[80vh] h-[80vh] bg-blue-600 rounded-full blur-[100px] opacity-80"></div>

        {/* النص العملاق خلف الشرائح الزجاجية */}
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none z-0">
          <h2 className="text-[12vw] font-black tracking-[0.2em] text-white opacity-90 uppercase">
            MEDIAJO
          </h2>
        </div>

        {/* الشرائح الزجاجية العمودية التي تقطع النص */}
        <div className="relative z-10 w-full h-full flex justify-center items-center gap-1 sm:gap-2 px-4">
          {[
            { title: 'Modern equipment', align: 'items-end pb-20' },
            { title: 'Experienced engineers', align: 'items-start pt-20' },
            { title: 'Premium quality', align: 'items-end pb-20' },
            { title: 'Individual approach', align: 'items-start pt-20' }
          ].map((slice, i) => (
            <div 
              key={i} 
              className={`glass-slice h-[90%] w-full max-w-[200px] bg-white/5 backdrop-blur-xl border border-white/20 rounded-3xl flex flex-col justify-center px-4 transition-all hover:bg-white/10 ${slice.align}`}
            >
              <span className="text-[10px] sm:text-xs font-bold uppercase tracking-widest text-white/70 max-w-[120px]">
                {slice.title}
              </span>
            </div>
          ))}
        </div>

      </section>

      {/* =========================================
          5. Empathetic Audio Player (Customer Service Image)
          ========================================= */}
      <section className="relative w-full py-32 px-6 lg:px-12 bg-[#ebede8]">
        <div className="max-w-[85rem] mx-auto gsap-reveal">
          
          <div className="w-full bg-white rounded-l-none rounded-r-[3rem] sm:rounded-[3rem] overflow-hidden flex flex-col md:flex-row shadow-sm min-h-[400px]">
            
            {/* الجزء النصي الأبيض */}
            <div className="w-full md:w-1/2 p-12 lg:p-20 flex flex-col justify-center">
              <h2 className="text-4xl md:text-5xl font-medium tracking-tight text-gray-900 mb-6 leading-tight">
                Build digital presence <br/> with empathy
              </h2>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-10 max-w-sm">
                Bring human-like growth strategies online to handle campaigns, qualify leads, and support customers 24/7.
              </p>
              <Link to="/products" className="inline-flex w-max items-center gap-2 px-8 py-4 bg-gray-900 text-white rounded-full font-bold text-sm uppercase tracking-wider hover:bg-blue-600 transition-colors">
                Start Growing
              </Link>
            </div>

            {/* الجزء الأيمن ذو الخلفية الضبابية مع مشغل الصوت الزجاجي */}
            <div className="w-full md:w-1/2 relative p-12 flex items-center justify-center overflow-hidden bg-[#8cb369]">
              {/* تدرجات تحاكي الطبيعة والخلفية المشفرة */}
              <div className="absolute inset-0 bg-gradient-to-br from-blue-300/50 to-transparent mix-blend-overlay"></div>
              <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-20 mix-blend-overlay"></div>
              
              {/* مشغل الصوت الزجاجي (Glassmorphism Audio Player) */}
              <div className="relative z-10 w-full max-w-sm bg-white/20 backdrop-blur-2xl border border-white/40 rounded-3xl p-6 shadow-2xl">
                <div className="flex justify-between items-center mb-6">
                  <div className="flex items-center gap-2 text-white">
                    <Volume2 className="w-4 h-4" />
                    <span className="text-sm font-medium tracking-wide">Incoming growth</span>
                  </div>
                  <span className="text-xs font-bold text-white/80">09:17</span>
                </div>
                
                <div className="flex items-center gap-4">
                  <button className="w-10 h-10 bg-white text-[#8cb369] rounded-full flex items-center justify-center hover:scale-105 transition-transform">
                    <Play className="w-4 h-4 ml-1" />
                  </button>
                  <div className="flex-1 h-1.5 bg-white/30 rounded-full overflow-hidden">
                    <div className="w-1/3 h-full bg-white rounded-full relative">
                      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-3 h-3 bg-white rounded-full shadow-md"></div>
                    </div>
                  </div>
                  <span className="text-[10px] font-mono text-white/80">0:00 / 0:05</span>
                </div>
              </div>

            </div>
          </div>

        </div>
      </section>

    </div>
  );
}