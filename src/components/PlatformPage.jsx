import React, { useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronRight, ShieldCheck, Clock, Lock, Wallet, Sparkles, TrendingUp, Check } from 'lucide-react';
import { SiInstagram, SiTiktok, SiYoutube, SiFacebook, SiNetflix, SiSpotify, SiCanvas, SiCoursera } from 'react-icons/si';
import pricingData from '../data/pricing.json';
import { useLanguage } from '../context/LanguageContext';
import { useCartStore } from '../store/cartStore';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. الأيقونات (SVG Icons)
// ==========================================
const ChatGPTIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2v6" /><path d="M12 16v6" /><path d="M2 7v4a3 3 0 0 0 3 3h1" /><path d="M18 14h1a3 3 0 0 0 3-3V7" /><path d="M5.5 3.7 12 12l-6.5 8.3" /><path d="M18.5 3.7 12 12l6.5 8.3" /></svg>);
const ShahidIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M10 8l6 4-6 4Z" fill="currentColor" stroke="none" /><path d="M7 6.5s-2 2.5-2 5.5 2 5.5 2 5.5" /><path d="M17 6.5s2 2.5 2 5.5-2 5.5-2 5.5" /></svg>);

const iconMap = {
  instagram: <SiInstagram className="w-12 h-12 text-white" />,
  facebook: <SiFacebook className="w-12 h-12 text-white" />,
  tiktok: <SiTiktok className="w-12 h-12 text-white" />,
  youtube: <SiYoutube className="w-12 h-12 text-white" />,
  netflix: <SiNetflix className="w-12 h-12 text-white" />,
  spotify: <SiSpotify className="w-12 h-12 text-white" />,
  canva: <SiCanvas className="w-12 h-12 text-white" />,
  coursera: <SiCoursera className="w-12 h-12 text-white" />,
  chatgpt: <ChatGPTIcon className="w-12 h-12 text-white" />,
  shahid: <ShahidIcon className="w-12 h-12 text-white" />,
};

// ==========================================
// 2. خريطة الألوان الديناميكية (Dynamic Theme Engine - Artistic Edition)
// ==========================================
const platformStyles = {
  instagram: {
    bgGradient: 'bg-gradient-to-br from-amber-400 via-pink-500 to-purple-600',
    iconGradient: 'from-amber-400 via-pink-500 to-purple-600',
    overlay: 'from-black/40 via-transparent to-transparent',
    cardHover: 'hover:border-pink-300 hover:shadow-[0_20px_50px_rgba(236,72,153,0.15)]',
    btnHover: 'group-hover/tier:bg-gradient-to-r group-hover/tier:from-pink-500 group-hover/tier:to-purple-600',
    badge: 'bg-pink-100 text-pink-600',
    glow: 'bg-pink-500/30',
    shapes: (
      <>
        <div className="float-shape absolute top-10 right-10 w-64 h-64 bg-gradient-to-tr from-purple-500 to-pink-400 rounded-full shadow-[inset_-20px_-20px_40px_rgba(0,0,0,0.2)]"></div>
        <div className="float-shape absolute -bottom-10 right-40 w-48 h-48 bg-gradient-to-tr from-yellow-400 to-orange-500 rounded-full shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.2)]"></div>
      </>
    )
  },
  tiktok: {
    bgGradient: 'bg-[#111111]', // خلفية داكنة لتبرز صورة التيك توك
    image: '/tiktokpic.jpg', // استخدام الصورة المطلوبة
    iconGradient: 'from-gray-900 via-cyan-600 to-teal-500',
    overlay: 'from-black/80 via-black/40 to-transparent',
    cardHover: 'hover:border-gray-900 hover:shadow-[0_20px_50px_rgba(17,24,39,0.15)]',
    btnHover: 'group-hover/tier:bg-gray-900',
    badge: 'bg-gray-200 text-gray-900',
    glow: 'bg-cyan-500/30',
    shapes: null
  },
  youtube: {
    bgGradient: 'bg-gradient-to-br from-red-600 via-rose-500 to-orange-500',
    iconGradient: 'from-red-600 via-rose-500 to-orange-500',
    overlay: 'from-black/50 via-transparent to-transparent',
    cardHover: 'hover:border-red-300 hover:shadow-[0_20px_50px_rgba(220,38,38,0.15)]',
    btnHover: 'group-hover/tier:bg-red-600',
    badge: 'bg-red-100 text-red-600',
    glow: 'bg-red-500/30',
    shapes: (
      <>
        <div className="float-shape absolute -top-20 right-20 w-80 h-80 bg-gradient-to-br from-white/20 to-white/5 rounded-3xl rotate-12 backdrop-blur-lg border border-white/30 shadow-2xl"></div>
        <div className="float-shape absolute bottom-10 right-10 w-40 h-40 bg-gradient-to-tr from-red-800 to-red-500 rounded-full shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.4)]"></div>
      </>
    )
  },
  facebook: {
    bgGradient: 'bg-gradient-to-br from-blue-700 via-blue-500 to-cyan-400',
    iconGradient: 'from-blue-700 via-blue-500 to-cyan-400',
    overlay: 'from-black/30 via-transparent to-transparent',
    cardHover: 'hover:border-blue-300 hover:shadow-[0_20px_50px_rgba(37,99,235,0.15)]',
    btnHover: 'group-hover/tier:bg-blue-600',
    badge: 'bg-blue-100 text-blue-600',
    glow: 'bg-blue-500/30',
    shapes: (
      <>
        <div className="float-shape absolute top-10 right-32 w-56 h-56 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-2xl rotate-45 shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.3)]"></div>
        <div className="float-shape absolute bottom-0 right-0 w-72 h-72 bg-gradient-to-tl from-indigo-500 to-purple-500 rounded-full blur-2xl opacity-50"></div>
      </>
    )
  },
  default: {
    bgGradient: 'bg-gradient-to-br from-indigo-600 via-blue-500 to-purple-500',
    iconGradient: 'from-indigo-600 via-blue-500 to-purple-500',
    overlay: 'from-black/40 via-transparent to-transparent',
    cardHover: 'hover:border-indigo-300 hover:shadow-[0_20px_50px_rgba(99,102,241,0.15)]',
    btnHover: 'group-hover/tier:bg-indigo-600',
    badge: 'bg-indigo-100 text-indigo-600',
    glow: 'bg-indigo-500/30',
    shapes: (
      <div className="float-shape absolute top-10 right-10 w-64 h-64 bg-gradient-to-tr from-white/20 to-transparent rounded-full blur-xl"></div>
    )
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

function TierCards({ variants, itemName, theme, orderNow, onAdd, addedText }) {
  const [addedKey, setAddedKey] = useState(null);

  const handleAdd = (variant, tier) => {
    onAdd(variant, tier);
    const key = `${variant.name || 'default'}:${tier.qty}`;
    setAddedKey(key);
    setTimeout(() => setAddedKey(null), 1200);
  };

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
                <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 ${theme.glow} opacity-0 group-hover/tier:opacity-100 rounded-full blur-2xl transition-opacity duration-500`}></div>

                <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 z-10">{itemName}</div>
                <div className="text-4xl font-black tracking-tighter text-gray-900 mb-4 z-10">{tier.qty}</div>

                <div className="w-full h-px bg-gray-100 mb-4 z-10"></div>

                <div className="flex items-baseline gap-1 mb-6 z-10">
                  <span className="text-3xl font-black text-gray-900">{tier.price.toFixed(2)}</span>
                  <span className="text-xs font-bold text-gray-500">JOD</span>
                </div>

                <button
                  onClick={() => handleAdd(variant, tier)}
                  className={`mt-auto w-full py-3 bg-gray-100 text-gray-900 group-hover/tier:text-white rounded-xl font-bold text-sm transition-all duration-300 z-10 flex items-center justify-center gap-1.5 ${theme.btnHover} ${addedKey === `${variant.name || 'default'}:${tier.qty}` ? '!bg-emerald-500 !text-white group-hover/tier:!bg-emerald-500' : ''}`}
                >
                  {addedKey === `${variant.name || 'default'}:${tier.qty}` ? (
                    <><Check className="w-4 h-4" /> {addedText}</>
                  ) : (
                    orderNow
                  )}
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
  const addItem = useCartStore((s) => s.addItem);

  // بناء معرف وبطاقة منتج فريدة ثم إضافتها للسلة
  const makeAddHandler = (group) => (variant, tier) => {
    const periodAr = { Monthly: 'شهري', Quarterly: 'ربع سنوي', 'Semi-Annual': 'نصف سنوي', Annual: 'سنوي' };
    const vLabel = variant.name || group.name;
    const vAr = variant.name ? periodAr[variant.name] || variant.name : group.nameAr;
    addItem({
      id: `${platform.id}:${group.id}:${variant.name || 'default'}:${tier.qty}`,
      platformId: platform.id,
      name: `${platform.name} ${vLabel}`,
      nameAr: `${platform.nameAr} ${vAr}`,
      unit: tier.qty,
      price: tier.price,
    });
  };

  const platform = pricingData.categories.flatMap(c => c.platforms).find(p => p.id === platformId);
  const theme = platformStyles[platformId] || platformStyles.default;

  if (!platform) {
    return (
      <div dir={t.dir} className="min-h-screen bg-white flex flex-col items-center justify-center gap-4 p-8 text-center">
        <h1 className="text-3xl font-black text-gray-900">{pp.notFound}</h1>
        <Link to="/products" className="text-blue-600 font-semibold hover:underline">← {pp.backToProducts}</Link>
      </div>
    );
  }

  const icon = iconMap[platform.id] || <ShieldCheck className="w-12 h-12 text-white" />;

  useGSAP(() => {
    // حركات الهيرو الفني
    gsap.fromTo(".hero-content > *", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }
    );
    
    gsap.fromTo(".hero-icon-box", 
      { scale: 0, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "spring.out(1, 0.5)", delay: 0.2 }
    );

    // حركات الأشكال الفنية (3D Blobs)
    gsap.to(".float-shape", {
      y: -30,
      rotation: 5,
      repeat: -1,
      yoyo: true,
      ease: "sine.inOut",
      duration: 4,
      stagger: 0.5
    });

    // كروت الأسعار (ScrollTrigger)
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

    // قسم Trust
    gsap.fromTo(".trust-card", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: { trigger: ".trust-section", start: "top 80%" },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out"
      }
    );

  }, { scope: container });

  return (
    <div ref={container} dir={t.dir} className="min-h-screen bg-gray-50 font-sans overflow-hidden pt-20">
      
      {/* =========================================
          Hero Section (Artistic Banner Style)
          ========================================= */}
      <section className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-10 mb-16">
        <div className={`relative w-full h-[450px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl ${theme.bgGradient}`}>
          
          {/* الصورة الخلفية أو الأشكال الهندسية */}
          {theme.image && (
            <img 
              src={theme.image} 
              alt={platform.name} 
              className="absolute inset-0 w-full h-full object-cover float-shape scale-110" 
            />
          )}
          {!theme.image && (
            <div className="absolute inset-0 pointer-events-none rtl:-scale-x-100">
              {theme.shapes}
            </div>
          )}

          {/* التدرج اللوني فوق الصورة لضمان وضوح النص */}
          <div className={`absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l ${theme.overlay}`}></div>

          <div className="absolute inset-0 flex flex-col justify-center px-10 md:px-20 z-10 hero-content">
            
            {/* الفتات (Breadcrumbs) */}
            <nav className="flex flex-wrap items-center gap-2 text-sm font-medium mb-8">
              <Link to="/" className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">{pp.home}</Link>
              <ChevronRight className="w-4 h-4 text-white/50 rtl:rotate-180" />
              <Link to="/products" className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">{pp.products}</Link>
              <ChevronRight className="w-4 h-4 text-white/50 rtl:rotate-180" />
              <span className="px-3 py-1.5 rounded-full font-bold bg-white text-gray-900">{platform.nameAr}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold tracking-widest text-white uppercase mb-6 shadow-sm w-max">
              <Sparkles className="w-4 h-4 text-yellow-300" /> {pp.premiumQuality}
            </div>
            
            <h1 className="text-6xl md:text-[6rem] font-black tracking-tighter text-white mb-4 leading-none drop-shadow-lg">
              {platform.nameAr}
            </h1>
            
            <p className="text-white/90 text-xl font-medium max-w-lg leading-relaxed drop-shadow-md">
              {pp.subtitle} {platform.nameAr} {pp.subtitleTail}
            </p>

            {/* الأيقونة العائمة */}
            <div className="hero-icon-box absolute bottom-10 right-10 rtl:left-10 rtl:right-auto md:bottom-20 md:right-20 md:rtl:left-20 md:rtl:right-auto">
              <div className={`w-24 h-24 md:w-32 md:h-32 bg-gradient-to-br ${theme.iconGradient} rounded-[2rem] flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-4 border-white/20 backdrop-blur-xl rtl:-scale-x-100`}>
                {icon}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          Pricing Sections 
          ========================================= */}
      <section className="w-full pb-24 px-6 lg:px-12">
        <div className="max-w-[85rem] mx-auto flex flex-col gap-24">
          {platform.sections.map((section, si) => (
            <div key={si} className="price-section">
              
              <div className="flex items-center gap-4 mb-12">
                <div className={`w-14 h-14 bg-gradient-to-br ${theme.iconGradient} text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg shrink-0`}>
                  {String(si + 1).padStart(2, '0')}
                </div>
                <div>
                  <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900">{t.dir === 'rtl' ? section.nameAr : section.name}</h2>
                  <p className="text-sm text-gray-500 font-bold tracking-widest uppercase mt-1">{t.dir === 'rtl' ? section.name : section.nameAr}</p>
                </div>
              </div>

              <div className="flex flex-col gap-16">
                {section.groups.map((group, gi) => (
                  <div key={gi} className="bg-white rounded-[2.5rem] p-6 md:p-10 border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
                    
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
                      onAdd={makeAddHandler(group)}
                      addedText={pp.added}
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
      <section className="trust-section relative w-full py-24 px-6 lg:px-12 bg-[#0a0a0b] text-white overflow-hidden rounded-t-[3rem]">
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-64 ${theme.glow} blur-[120px]`}></div>

        <div className="max-w-[85rem] mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter mb-4">{pp.whyTitle}</h2>
            <p className="text-gray-400 text-lg">{pp.trustSub}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="trust-card bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-colors backdrop-blur-md">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Lock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3">{pp.feat1Title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{pp.feat1Text}</p>
            </div>
            
            <div className="trust-card bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-colors backdrop-blur-md">
              <div className="w-14 h-14 bg-white/10 rounded-2xl flex items-center justify-center mb-6">
                <Clock className="w-7 h-7 text-white" />
              </div>
              <h3 className="text-2xl font-black mb-3">{pp.feat2Title}</h3>
              <p className="text-gray-400 font-medium leading-relaxed">{pp.feat2Text}</p>
            </div>
            
            <div className="trust-card bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-colors backdrop-blur-md">
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