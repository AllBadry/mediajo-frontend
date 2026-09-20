import React, { useRef } from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight, TrendingUp, Key, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// أيقونات SVG 
// ==========================================
const InstagramIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5"/>
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/>
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/>
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M2.5 17a24.12 24.12 0 0 1 0-10 2 2 0 0 1 1.4-1.4 49.56 49.56 0 0 1 16.2 0A2 2 0 0 1 21.5 7a24.12 24.12 0 0 1 0 10 2 2 0 0 1-1.4 1.4 49.55 49.55 0 0 1-16.2 0A2 2 0 0 1 2.5 17"/>
    <polygon points="10 15 15 12 10 9 10 15" fill="currentColor"/>
  </svg>
);

const TikTokIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4a5 5 0 0 0 5 5"/>
  </svg>
);

const NetflixIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" fill="currentColor" className={className}>
    <path d="M5.398 0v24c1.196-.27 2.404-.51 3.633-.71V0H5.398zm9.57 0v19.46c1.23.23 2.438.49 3.634.78V0h-3.634zM9.031 0l5.937 19.86V0h3.634v24c-1.2-.29-2.404-.55-3.634-.78L9.03 3.36V24c-1.229.2-2.437.44-3.633.71V0h3.634z"/>
  </svg>
);

const SpotifyIcon = ({ className }) => (
  <svg viewBox="0 0 24 24" width="24" height="24" stroke="currentColor" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <circle cx="12" cy="12" r="10"/>
    <path d="M8 15c3-1 6-1 8.5.5"/>
    <path d="M7 12c3.5-1.5 7.5-1 10.5 1"/>
    <path d="M6.5 9C10.5 7 15 7.5 18.5 9.5"/>
  </svg>
);

export default function Categories() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';
  const sectionRef = useRef(null);

  useGSAP(() => {
    // حركة النصوص
    gsap.fromTo('.gsap-text', 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, stagger: 0.1, ease: 'power3.out', scrollTrigger: { trigger: sectionRef.current, start: 'top 80%' } }
    );

    // حركة النقاط (Nodes) داخل المربع التقني
    gsap.to('.tech-node', {
      y: 'random(-10, 10)',
      x: 'random(-10, 10)',
      duration: 'random(3, 6)',
      repeat: -1,
      yoyo: true,
      ease: 'sine.inOut'
    });
  }, { scope: sectionRef });

  return (
    <section ref={sectionRef} dir={t.dir} className="relative w-full py-24 md:py-32 bg-[#fcfcfd] font-sans z-20">
      
      <div className="max-w-[85rem] mx-auto px-6 lg:px-12">
        
        {/* =========================================
            ترويسة القسم
            ========================================= */}
        <div className="mb-24 max-w-3xl">
          <div className="gsap-text inline-flex items-center gap-2 px-4 py-1.5 bg-white border border-gray-200/60 shadow-sm rounded-full text-xs font-bold uppercase tracking-widest text-gray-600 mb-6">
            <Sparkles className="w-4 h-4 text-[#ec4899]" />
            {isRTL ? 'مجالات خبرتنا' : 'Our Expertise'}
          </div>
          <h2 className="gsap-text text-5xl md:text-7xl font-medium tracking-tighter leading-[1.05] text-[#1c2237]">
            {isRTL ? 'بنية تحتية لكل' : 'Continuous Growth'} <br />
            <span className="text-gray-400">
              {isRTL ? 'احتياج رقمي.' : 'for Every Platform.'}
            </span>
          </h2>
        </div>

        {/* =========================================
            القسم الأول: السوشال ميديا (Orange/Pink Theme)
            ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center border-t border-gray-200 py-16">
          
          <div className="order-2 lg:order-1 flex flex-col items-start">
            <div className="gsap-text w-12 h-12 bg-[#1c2237] text-white rounded-full flex items-center justify-center mb-8">
              <TrendingUp className="w-5 h-5" />
            </div>
            
            <h3 className="gsap-text text-4xl md:text-5xl font-medium tracking-tight text-[#1c2237] mb-6">
              {t.home.categoriesSocial || (isRTL ? 'دعم السوشال ميديا' : 'Social Media')}
            </h3>
            
            <p className="gsap-text text-xl text-gray-500 font-normal leading-relaxed mb-10 max-w-md">
              {isRTL 
                ? 'متابعون، لايكات، ومشاهدات بجودة فائقة لتضخيم حضورك على جميع المنصات بخوارزميات آمنة 100%.' 
                : 'Premium followers, likes, and views to amplify your presence across all platforms safely.'}
            </p>

            <div className="gsap-text flex flex-wrap gap-3 mb-10">
              <span className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-bold text-gray-700 bg-white shadow-sm hover:border-gray-300 transition-colors">
                <InstagramIcon className="w-4 h-4 text-[#E1306C]" /> Instagram
              </span>
              <span className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-bold text-gray-700 bg-white shadow-sm hover:border-gray-300 transition-colors">
                <TikTokIcon className="w-4 h-4 text-black" /> TikTok
              </span>
              <span className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-bold text-gray-700 bg-white shadow-sm hover:border-gray-300 transition-colors">
                <YoutubeIcon className="w-4 h-4 text-[#FF0000]" /> YouTube
              </span>
            </div>

            <Link to="/products" className="gsap-text inline-flex items-center gap-3 text-lg font-bold text-[#f97316] hover:text-[#ea580c] transition-colors group">
              {isRTL ? 'تصفح باقات النمو' : 'Explore Growth Packages'}
              <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isRTL ? '-scale-x-100 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>

          {/* الجانب البصري - تدرجات الوردي والبرتقالي (شعار MediaJo 1) */}
          <div className="order-1 lg:order-2 w-full aspect-square bg-[#ffecd2] relative overflow-hidden flex items-center justify-center rounded-[2rem] lg:rounded-none">
            <div className="absolute top-[-20%] left-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_30%_40%,#ec4899,transparent_50%),radial-gradient(circle_at_70%_60%,#f97316,transparent_50%),radial-gradient(circle_at_40%_80%,#fbcfe8,transparent_40%)] mix-blend-multiply opacity-80"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>

            <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
              <path d="M100 150 L250 200 L350 100 L450 300 L250 400 Z" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="4 4" />
              <path d="M250 200 L300 350 L450 300" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>

            <div className="absolute top-[30%] left-[20%] tech-node">
              <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
              <div className="absolute top-4 left-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-mono text-[#f97316] border border-gray-200 shadow-sm whitespace-nowrap">
                ('User').Social.Followers
              </div>
              <div className="absolute -inset-4 border border-white/60 border-dashed rounded-sm"></div>
            </div>

            <div className="absolute top-[40%] right-[30%] tech-node" style={{ animationDelay: '-2s' }}>
              <div className="w-4 h-4 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
              <div className="absolute bottom-5 right-5 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-mono text-[#ec4899] border border-gray-200 shadow-sm whitespace-nowrap">
                ('Algo').Engage.Reach
              </div>
            </div>

            <div className="absolute bottom-[25%] left-[45%] tech-node" style={{ animationDelay: '-4s' }}>
              <div className="w-2.5 h-2.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
              <div className="absolute -inset-6 border-2 border-white/50 border-l-0 border-b-0"></div>
            </div>
          </div>

        </div>

        {/* =========================================
            القسم الثاني: الاشتراكات (Blue/Purple Theme)
            ========================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 lg:gap-24 items-center border-t border-gray-200 py-16">
          
          {/* الجانب البصري - تدرجات الأزرق والبنفسجي (شعار MediaJo 2) */}
          <div className="order-1 w-full aspect-square bg-[#e0e7ff] relative overflow-hidden flex items-center justify-center rounded-[2rem] lg:rounded-none">
            <div className="absolute top-[-10%] right-[-20%] w-[150%] h-[150%] bg-[radial-gradient(circle_at_60%_30%,#6366f1,transparent_50%),radial-gradient(circle_at_20%_70%,#a855f7,transparent_50%),radial-gradient(circle_at_80%_80%,#e0e7ff,transparent_40%)] mix-blend-multiply opacity-80"></div>
            <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-30 mix-blend-overlay pointer-events-none"></div>

            <svg className="absolute inset-0 w-full h-full" style={{ filter: 'drop-shadow(0 4px 6px rgba(0,0,0,0.1))' }}>
              <path d="M150 350 L200 150 L400 200 L350 400 Z" fill="none" stroke="rgba(255,255,255,0.6)" strokeWidth="1.5" strokeDasharray="4 4" />
            </svg>

            <div className="absolute top-[25%] left-[35%] tech-node">
              <div className="w-3 h-3 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
              <div className="absolute top-4 right-4 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-mono text-[#6366f1] border border-gray-200 shadow-sm whitespace-nowrap">
                ('Auth').Premium.Access
              </div>
              <div className="absolute -inset-4 border border-white/60 border-dashed rounded-sm"></div>
            </div>

            <div className="absolute bottom-[35%] right-[25%] tech-node" style={{ animationDelay: '-1s' }}>
              <div className="w-3.5 h-3.5 bg-white rounded-full shadow-[0_0_15px_rgba(255,255,255,0.8)]"></div>
              <div className="absolute top-5 left-5 bg-white/90 backdrop-blur-sm px-2 py-1 text-[10px] font-mono text-[#a855f7] border border-gray-200 shadow-sm whitespace-nowrap">
                ('Sub').Validate.True
              </div>
            </div>
          </div>

          <div className="order-2 flex flex-col items-start lg:pl-10">
            <div className="gsap-text w-12 h-12 bg-[#1c2237] text-white rounded-full flex items-center justify-center mb-8">
              <Key className="w-5 h-5" />
            </div>
            
            <h3 className="gsap-text text-4xl md:text-5xl font-medium tracking-tight text-[#1c2237] mb-6">
              {t.home.categoriesAccounts || (isRTL ? 'الاشتراكات والحسابات' : 'Premium Subscriptions')}
            </h3>
            
            <p className="gsap-text text-xl text-gray-500 font-normal leading-relaxed mb-10 max-w-md">
              {isRTL 
                ? 'وصول غير محدود. اشتراكات لأشهر المنصات العالمية، وحسابات موثقة وجاهزة بأسعار لا تُنافس.' 
                : 'Unlimited access. Subscriptions to top global platforms and verified accounts at unbeatable prices.'}
            </p>

            <div className="gsap-text flex flex-wrap gap-3 mb-10">
              <span className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-bold text-gray-700 bg-white shadow-sm hover:border-gray-300 transition-colors">
                <NetflixIcon className="w-3.5 h-3.5 text-[#E50914]" /> Netflix
              </span>
              <span className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-bold text-gray-700 bg-white shadow-sm hover:border-gray-300 transition-colors">
                Canva Pro
              </span>
              <span className="flex items-center gap-2 px-4 py-2 border border-gray-200 rounded-full text-sm font-bold text-gray-700 bg-white shadow-sm hover:border-gray-300 transition-colors">
                <SpotifyIcon className="w-4 h-4 text-[#1DB954]" /> Spotify
              </span>
            </div>

            <Link to="/products" className="gsap-text inline-flex items-center gap-3 text-lg font-bold text-[#6366f1] hover:text-[#4f46e5] transition-colors group">
              {isRTL ? 'استكشف الحسابات' : 'Explore Subscriptions'}
              <ArrowUpRight className={`w-5 h-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ${isRTL ? '-scale-x-100 group-hover:-translate-x-1' : ''}`} />
            </Link>
          </div>

        </div>

      </div>
    </section>
  );
}