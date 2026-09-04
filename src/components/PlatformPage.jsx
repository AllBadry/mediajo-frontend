import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronRight, ShieldCheck, Clock, Lock, Wallet, Share2, Sparkles, TrendingUp } from 'lucide-react';
import pricingData from '../data/pricing.json';
import { useLanguage } from '../context/LanguageContext';

// تسجيل إضافة التمرير
gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. الأيقونات (SVG Icons)
// ==========================================
const InstagramIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5" /><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" /><line x1="17.5" x2="17.51" y1="6.5" y2="6.5" /></svg>);
const YoutubeIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" /><polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" /></svg>);
const TiktokIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M9 12a4 4 0 1 0 4 4V4h3.5c.08 1.44 1.3 2.5 2.5 2.5V9.5c-1.9 0-3.5-1.1-4-2.5v9a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3z" /></svg>);
const FacebookIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" /></svg>);

const iconMap = {
  instagram: <InstagramIcon className="w-10 h-10 text-white" />,
  facebook: <FacebookIcon className="w-10 h-10 text-white" />,
  tiktok: <TiktokIcon className="w-10 h-10 text-white" />,
  youtube: <YoutubeIcon className="w-10 h-10 text-white" />,
};

// ==========================================
// 2. خريطة الألوان الديناميكية (Dynamic Theme Engine)
// ==========================================
const platformStyles = {
  instagram: {
    bgBlob: 'bg-pink-300/30',
    dot1: 'bg-pink-500',
    dot2: 'bg-purple-500',
    dot3: 'bg-orange-400',
    cardHover: 'hover:border-pink-300 hover:shadow-[0_20px_50px_rgba(236,72,153,0.15)]',
    btnHover: 'group-hover/tier:bg-gradient-to-r group-hover/tier:from-pink-500 group-hover/tier:to-purple-600',
    badge: 'bg-pink-50 text-pink-600'
  },
  facebook: {
    bgBlob: 'bg-blue-300/30',
    dot1: 'bg-blue-600',
    dot2: 'bg-blue-400',
    dot3: 'bg-cyan-400',
    cardHover: 'hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]',
    btnHover: 'group-hover/tier:bg-blue-600',
    badge: 'bg-blue-50 text-blue-600'
  },
  youtube: {
    bgBlob: 'bg-red-300/30',
    dot1: 'bg-red-600',
    dot2: 'bg-red-400',
    dot3: 'bg-orange-500',
    cardHover: 'hover:border-red-300 hover:shadow-[0_20px_50px_rgba(220,38,38,0.15)]',
    btnHover: 'group-hover/tier:bg-red-600',
    badge: 'bg-red-50 text-red-600'
  },
  tiktok: {
    bgBlob: 'bg-gray-300/40',
    dot1: 'bg-gray-900',
    dot2: 'bg-cyan-500',
    dot3: 'bg-pink-500',
    cardHover: 'hover:border-gray-900 hover:shadow-[0_20px_50px_rgba(17,24,39,0.15)]',
    btnHover: 'group-hover/tier:bg-gray-900',
    badge: 'bg-gray-100 text-gray-900'
  },
  default: {
    bgBlob: 'bg-indigo-300/30',
    dot1: 'bg-indigo-500',
    dot2: 'bg-blue-500',
    dot3: 'bg-purple-500',
    cardHover: 'hover:border-indigo-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)]',
    btnHover: 'group-hover/tier:bg-indigo-600',
    badge: 'bg-indigo-50 text-indigo-600'
  }
};

// ==========================================
// 3. مكون البطاقات (Tier Cards)
// ==========================================
function getUnitLabel(group, pp) {
  const gName = group.name.toLowerCase();
  if (gName.includes('like')) return pp.svcType.likes;
  if (gName.includes('view')) return pp.svcType.views;
  if (gName.includes('subscriber')) return pp.svcType.subscribers;
  return pp.svcType.followers;
}

function TierCards({ variants, itemName, theme, orderNow }) {
  return (
    <div className="flex flex-col gap-8">
      {variants.map((variant, vi) => (
        <div key={vi}>
          {variant.name && (
            <div className="flex items-center gap-3 mb-6">
              <span className="w-8 h-1 bg-gray-200 rounded-full"></span>
              <span className="text-sm font-black text-gray-800 uppercase tracking-widest">{variant.name}</span>
            </div>
          )}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {variant.tiers.map((tier, ti) => (
              <div
                key={ti}
                className={`gsap-card group/tier bg-white rounded-[2rem] border-[1.5px] border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 cursor-pointer relative overflow-hidden hover:-translate-y-2 ${theme.cardHover}`}
              >
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 ${theme.dot1} opacity-0 group-hover/tier:opacity-10 rounded-full blur-2xl transition-opacity duration-500`}></div>

                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 z-10">{itemName}</div>
                <div className="text-4xl font-black tracking-tighter text-gray-900 mb-4 z-10">{tier.qty}</div>

                <div className="w-full h-px bg-gray-100 mb-4 z-10"></div>

                <div className="flex items-baseline gap-1 mb-6 z-10">
                  <span className="text-3xl font-black text-gray-900">{tier.price.toFixed(2)}</span>
                  <span className="text-xs font-bold text-gray-500">JOD</span>
                </div>

                <button className={`mt-auto w-full py-3 bg-gray-100 text-gray-900 group-hover/tier:text-white rounded-xl font-bold text-sm transition-all duration-300 z-10 ${theme.btnHover}`}>
                  {orderNow}
                </button>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
}

// ==========================================
// 4. المكون الرئيسي (Platform Page)
// ==========================================
export default function PlatformPage({ platformId }) {
  const container = useRef();
  const { t } = useLanguage();
  const pp = t.platformPage;

  const category = pricingData.categories.find(c => c.id === 'social-media');
  const platform = category?.platforms.find(p => p.id === platformId);
  
  const theme = platformStyles[platformId] || platformStyles.default;

  if (!platform) {
    return (
      <div dir={t.dir} className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-3xl font-black text-gray-900">{pp.notFound}</h1>
        <Link to="/products" className="text-blue-600 font-semibold hover:underline">← {pp.backToProducts}</Link>
      </div>
    );
  }

  const icon = iconMap[platform.id] || <ShieldCheck className="w-10 h-10 text-white" />;

  useGSAP(() => {
    // إصلاح مشكلة الاختفاء باستخدام fromTo بدلاً من from
    gsap.fromTo(".hero-content > *", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }
    );
    
    gsap.fromTo(".hero-icon-box", 
      { scale: 0, opacity: 0 },
      { scale: 1, opacity: 1, duration: 1, ease: "spring.out(1, 0.5)", delay: 0.2 }
    );

    // النقاط الطافية
    gsap.to(".dynamic-float-1", { y: -20, x: 10, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 2.5 });
    gsap.to(".dynamic-float-2", { y: 15, x: -10, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 3, delay: 0.5 });
    gsap.to(".dynamic-float-3", { y: -15, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 2 });

    // كروت الأسعار (إصلاح الشفافية باستخدام fromTo)
    const sections = gsap.utils.toArray('.price-section');
    sections.forEach((section) => {
      gsap.fromTo(section.querySelectorAll('.gsap-card'), 
        { y: 40, opacity: 0 },
        {
          scrollTrigger: { trigger: section, start: "top 85%" },
          y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)"
        }
      );
    });

    // قسم Why Us (إصلاح الشفافية باستخدام fromTo)
    gsap.fromTo(".trust-card", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: { trigger: ".trust-section", start: "top 80%" },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out"
      }
    );

  }, { scope: container });

  return (
    <div ref={container} dir={t.dir} className="min-h-screen bg-white font-sans overflow-hidden">
      
      {/* =========================================
          Hero Section 
          ========================================= */}
      <section className="relative w-full pt-16 pb-20 px-6 lg:px-12 bg-white overflow-hidden">
        
        <div className={`absolute top-0 right-0 w-[60vw] h-[60vw] max-w-[600px] max-h-[600px] rounded-full blur-[100px] -z-10 ${theme.bgBlob} translate-x-1/3 -translate-y-1/3`}></div>

        <div className={`dynamic-float-1 absolute top-[20%] right-[15%] w-4 h-4 rounded-full ${theme.dot1}`}></div>
        <div className={`dynamic-float-2 absolute top-[60%] left-[10%] w-3 h-3 rounded-full ${theme.dot2}`}></div>
        <div className={`dynamic-float-3 absolute bottom-[10%] right-[30%] w-5 h-5 rounded-full ${theme.dot3}`}></div>

        <div className="max-w-[85rem] mx-auto">
          
          <nav className="flex flex-wrap items-center gap-2 text-sm font-medium mb-12">
            <Link to="/" className="px-3 py-1.5 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">{pp.home}</Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <Link to="/products" className="px-3 py-1.5 bg-gray-50 rounded-full hover:bg-gray-100 text-gray-500 transition-colors">{pp.products}</Link>
            <ChevronRight className="w-4 h-4 text-gray-300" />
            <span className={`px-3 py-1.5 rounded-full font-bold ${theme.badge}`}>{platform.nameAr}</span>
          </nav>

          <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-12">
            
            <div className="hero-content flex-1">
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-[1.5px] border-gray-200 rounded-full text-xs font-bold tracking-widest text-gray-500 uppercase mb-6 shadow-sm">
                <Sparkles className="w-4 h-4 text-yellow-500" /> Top Rated
              </div>
              <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-gray-900 mb-6 leading-[1.1]">
                {platform.nameAr} <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-gray-400 to-gray-600">Growth Engine.</span>
              </h1>
              <p className="text-gray-500 text-xl font-medium max-w-lg leading-relaxed">
                {pp.subtitle} {platform.nameAr} {pp.subtitleTail}
              </p>
            </div>

            <div className="hero-icon-box lg:w-1/3 flex justify-center lg:justify-end shrink-0 relative">
              <div className="absolute inset-0 bg-white/40 blur-2xl rounded-full scale-150"></div>
              <div className={`relative w-40 h-40 md:w-56 md:h-56 bg-gradient-to-br ${platform.gradient} rounded-[3rem] rotate-3 hover:rotate-0 transition-transform duration-500 flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.15)] border-4 border-white`}>
                {icon}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          Pricing Sections 
          ========================================= */}
      <section className="w-full py-16 px-6 lg:px-12 bg-[#fafbfc]">
        <div className="max-w-[85rem] mx-auto flex flex-col gap-24">
          {platform.sections.map((section, si) => (
            <div key={si} className="price-section">
              
              <div className="flex items-center gap-4 mb-12">
                <div className={`w-14 h-14 bg-gradient-to-br ${platform.gradient} text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg shrink-0`}>
                  {String(si + 1).padStart(2, '0')}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">{t.dir === 'rtl' ? section.nameAr : section.name}</h2>
                  <p className="text-sm text-gray-500 font-bold tracking-widest uppercase mt-1">{t.dir === 'rtl' ? section.name : section.nameAr}</p>
                </div>
              </div>

              <div className="flex flex-col gap-16">
                {section.groups.map((group, gi) => (
                  <div key={gi} className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
                    
                    <div className="flex flex-wrap items-center justify-between gap-4 mb-8 pb-6 border-b border-gray-100">
                      <div className="flex items-center gap-4">
                        <div className={`w-12 h-12 rounded-2xl flex items-center justify-center ${theme.badge}`}>
                          <TrendingUp className="w-6 h-6" />
                        </div>
                        <div>
                          <h3 className="text-2xl font-black text-gray-900">{t.dir === 'rtl' ? group.nameAr : group.name}</h3>
                          {group.hint && <p className="text-sm text-gray-500 font-medium mt-1">{pp.hintMap[group.hint] || group.hint}</p>}
                        </div>
                      </div>
                      <span className="px-4 py-2 bg-gray-50 rounded-xl text-xs font-black text-gray-400 uppercase tracking-widest border border-gray-100">
                        {t.dir === 'rtl' ? group.name : group.nameAr}
                      </span>
                    </div>

                    <TierCards 
                      variants={group.variants} 
                      itemName={getUnitLabel(group, pp)}
                      theme={theme}
                      orderNow={pp.orderNow}
                    />
                  </div>
                ))}
              </div>

            </div>
          ))}
        </div>
      </section>

      {/* =========================================
          Trust / Why Us
          ========================================= */}
      <section className="trust-section relative w-full py-24 px-6 lg:px-12 bg-[#0a0a0b] text-white overflow-hidden">
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-64 ${theme.bgBlob} blur-[120px]`}></div>

        <div className="max-w-[85rem] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{pp.whyTitle}</h2>
            <p className="text-gray-400 text-lg">Engineered for safety, speed, and reliability.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="trust-card bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3">{pp.feat1Title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{pp.feat1Text}</p>
            </div>
            
            <div className="trust-card bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3">{pp.feat2Title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{pp.feat2Text}</p>
            </div>
            
            <div className="trust-card bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-colors">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Wallet className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3">{pp.feat3Title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{pp.feat3Text}</p>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}