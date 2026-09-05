import React, { useRef } from 'react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../context/LanguageContext';
import { 
  Sparkles, MonitorPlay, TrendingUp, Zap, 
  ArrowRight, ShieldCheck, CheckCircle2, Star, Lock, Wallet
} from 'lucide-react';
import { SiInstagram, SiTiktok, SiYoutube, SiFacebook, SiNetflix, SiSpotify, SiCanvas, SiCoursera } from 'react-icons/si';


// ==========================================
// الأيقونات 
// ==========================================
const ChatGPTIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M12 2v6" /><path d="M12 16v6" /><path d="M2 7v4a3 3 0 0 0 3 3h1" /><path d="M18 14h1a3 3 0 0 0 3-3V7" /><path d="M5.5 3.7 12 12l-6.5 8.3" /><path d="M18.5 3.7 12 12l6.5 8.3" /></svg>);
const ShahidIcon = ({ className }) => (<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" className={className}><circle cx="12" cy="12" r="10" /><path d="M10 8l6 4-6 4Z" fill="currentColor" stroke="none" /><path d="M7 6.5s-2 2.5-2 5.5 2 5.5 2 5.5" /><path d="M17 6.5s2 2.5 2 5.5-2 5.5-2 5.5" /></svg>);

export default function Products() {
  const container = useRef();
  const { t } = useLanguage();

  // ==========================================
  // بيانات الأسعار - السوشال ميديا
  // ==========================================
  const socialPlatforms = [
    {
      name: 'Instagram',
      icon: <SiInstagram className="w-8 h-8 text-white" />,
      gradient: 'from-pink-500 to-purple-500',
      link: '/products/instagram',
      popular: true,
      services: [
        { name: 'Arab Followers', qty: '1,000', price: '4.99' },
        { name: 'Followers (No Warranty)', qty: '1,000', price: '1.99' },
        { name: 'Likes (Reels/Posts)', qty: '1,000', price: '0.99' },
        { name: 'Reels Views', qty: '10,000', price: '8.99' },
      ]
    },
    {
      name: 'TikTok',
      icon: <SiTiktok className="w-8 h-8 text-white" />,
      gradient: 'from-gray-900 to-gray-700',
      link: '/products/tiktok',
      services: [
        { name: 'Followers (30-day)', qty: '1,000', price: '5.99' },
        { name: 'Followers (No Warranty)', qty: '1,000', price: '4.99' },
        { name: 'Reels Views', qty: '10,000', price: '8.99' },
        { name: 'Reels Likes', qty: '1,000', price: '0.99' },
      ]
    },
    {
      name: 'YouTube',
      icon: <SiYoutube className="w-8 h-8 text-white" />,
      gradient: 'from-red-500 to-orange-500',
      link: '/products/youtube',
      services: [
        { name: 'Subscribers', qty: '1,000', price: '8.00' },
        { name: 'Views', qty: '1,000', price: '3.00' },
        { name: 'Likes', qty: '1,000', price: '2.50' },
        { name: 'Watch Hours', qty: '1,000', price: '10.00' },
      ]
    },
    {
      name: 'Facebook',
      icon: <SiFacebook className="w-8 h-8 text-white" />,
      gradient: 'from-blue-600 to-blue-400',
      link: '/products/facebook',
      services: [
        { name: 'Jordanian Followers', qty: '100', price: '5.00' },
        { name: 'Arab Followers', qty: '1,000', price: '6.99' },
        { name: 'Followers (No Warranty)', qty: '1,000', price: '2.99' },
        { name: 'Reels Views', qty: '10,000', price: '8.99' },
      ]
    }
  ];

  // ==========================================
  // بيانات الأسعار - الأردنيين
  // ==========================================
  const jordanianServices = [
    { name: 'Jordanian Followers', qty: '1,000', price: '6.0', desc: 'Real & active Jordanian accounts' },
    { name: 'Jordanian Likes', qty: '1,000', price: '4.0', desc: 'From trusted Jordanian accounts' },
    { name: 'Jordanian Views', qty: '5,000', price: '5.0', desc: 'Views from Jordan only' },
    { name: 'Jordanian Comments', qty: '100', price: '8.0', desc: 'Realistic Arabic & Jordanian comments' },
  ];

  // ==========================================
  // بيانات الأسعار - الاشتراكات
  // ==========================================
  const subscriptions = [
    { id: 'netflix', name: 'Netflix Premium', category: 'Entertainment', icon: <SiNetflix className="w-8 h-8 text-[#E50914]" />, price: '5.0', period: '/month', features: ['4K Ultra HD', '4 Devices', 'Private Profile'] },
    { id: 'spotify', name: 'Spotify Premium', category: 'Audio', icon: <SiSpotify className="w-8 h-8 text-[#1DB954]" />, price: '2.5', period: '/month', features: ['No Ads', 'Offline Download', 'High Quality'] },
    { id: 'shahid', name: 'Shahid VIP', category: 'Streaming', icon: <ShahidIcon className="w-8 h-8 text-[#E6091C]" />, price: '4.0', period: '/month', features: ['Exclusive Shows', 'Live Sports', 'Ad-Free'] },
    { id: 'chatgpt', name: 'ChatGPT Plus', category: 'AI Tools', icon: <ChatGPTIcon className="w-8 h-8 text-[#10A37F]" />, price: '7.0', period: '/month', features: ['GPT-4', 'DALL-E 3', 'Priority Access'] },
    { id: 'canva', name: 'Canva Pro', category: 'Design', icon: <SiCanvas className="w-8 h-8 text-[#00C4CC]" />, price: '3.0', period: '/month', features: ['Pro Templates', 'Transparent BGs', 'BG Erase'] },
    { id: 'coursera', name: 'Coursera Plus', category: 'Education', icon: <SiCoursera className="w-8 h-8 text-[#0056D2]" />, price: '8.0', period: '/month', features: ['Certificates', 'Unlimited Courses', 'Applied Projects'] },
  ];

  const processSteps = [
    { num: '01', title: 'Choose Your Boost', desc: 'Select from our wide range of social growth services or premium subscriptions.' },
    { num: '02', title: 'Provide Link', desc: 'Just paste your profile or post link. We never ask for your passwords—ever.' },
    { num: '03', title: 'Watch It Grow', desc: 'Pay securely via CliQ or card, and watch the results appear almost instantly.' }
  ];

  const faqs = [
    { q: 'Is it safe for my social media accounts?', a: 'Absolutely. We use highly secure, password-free methods that comply with platform limits, keeping your accounts 100% safe from bans.' },
    { q: 'How long does delivery take?', a: 'Most social media orders start within 1-5 minutes. Subscriptions and digital accounts are delivered instantly to your email after payment.' },
    { q: 'Can I pay using local methods?', a: 'Yes! We support instant local payments including CliQ, alongside standard credit/debit cards.' },
    { q: 'What if my followers drop?', a: 'We focus on high-retention services. However, if a drop occurs, our premium packages include a 30-day automatic refill guarantee.' }
  ];

  // ==========================================
  // GSAP Animations (Hero only)
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

  }, { scope: container });

  return (
    <div ref={container} dir={t.dir} className="min-h-screen bg-white font-sans">
      
      {/* =========================================
          1. Hero Section 
          ========================================= */}
      <section className="relative w-full pt-32 pb-24 flex flex-col items-center justify-center">
        <div className="float-1 absolute top-[20%] left-[15%] w-4 h-4 bg-blue-600 rounded-full"></div>
        <div className="float-2 absolute top-[25%] left-[18%] w-2 h-2 bg-red-500 rounded-full"></div>
        <div className="float-3 absolute bottom-[20%] right-[20%] w-5 h-5 bg-orange-400 rounded-full"></div>
        
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0">
          <path className="svg-line" d="M 200 200 C 400 200, 600 400, 1000 300" fill="transparent" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4 4" />
        </svg>

        <div className="relative z-10 flex flex-col items-center gap-2 md:gap-0">
          <div className="flex flex-col md:flex-row items-center justify-center md:-mb-6 z-10 relative">
            <div className="hero-pill-1 bg-white border-[1.5px] border-gray-200 rounded-full px-12 py-4 md:py-6 shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <h1 className="text-6xl md:text-[5.5rem] font-black tracking-tighter text-gray-900 leading-none">{t.products.hero1}</h1>
            </div>
            <div className="hero-icon hidden md:flex w-48 h-24 bg-gradient-to-r from-blue-600 via-indigo-500 to-purple-500 rounded-full -ml-12 items-center justify-end pr-6 shadow-[0_10px_30px_rgba(79,70,229,0.3)]">
              <div className="w-12 h-12 bg-white/20 backdrop-blur-md rounded-full flex items-center justify-center">
                <Zap className="w-6 h-6 text-white" />
              </div>
            </div>
          </div>

          <div className="flex flex-col md:flex-row items-center justify-center z-20 relative md:-mb-6 mt-4 md:mt-0">
            <div className="hero-pill-2 bg-gradient-to-r from-blue-600 via-indigo-600 to-violet-600 rounded-full px-14 py-4 md:py-6 shadow-[0_10px_40px_rgba(79,70,229,0.4)] flex items-center gap-6">
              <h1 className="text-6xl md:text-[6rem] font-black tracking-tighter text-white leading-none">{t.products.hero2}</h1>
              <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center border border-white/20">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
            </div>
            <div className="hero-icon hidden md:flex w-24 h-24 bg-white border-[1.5px] border-gray-200 rounded-full -ml-8 items-center justify-center shadow-[0_10px_30px_rgba(0,0,0,0.05)]">
              <div className="w-10 h-10 bg-gradient-to-br from-green-400 to-emerald-500 rounded-full flex items-center justify-center">
                <div className="w-3 h-3 bg-white rounded-full"></div>
              </div>
            </div>
          </div>

          <div className="flex items-center justify-center z-30 relative mt-4 md:mt-0 ml-0 md:ml-24">
            <div className="hero-pill-3 bg-white border-[1.5px] border-gray-200 rounded-full px-14 py-4 md:py-6 shadow-[0_20px_50px_rgba(0,0,0,0.08)] flex items-center gap-4">
              <h1 className="text-6xl md:text-[6rem] font-black tracking-tighter text-gray-900 leading-none">
                {t.products.hero3} <span className="text-orange-400 animate-pulse">.</span>
              </h1>
            </div>
          </div>
        </div>
      </section>

      {/* =========================================
          2. Social Media Pricing
          ========================================= */}
      <section className="social-section relative w-full py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-[85rem] mx-auto">
          
          <div className="flex flex-col md:flex-row justify-between items-end mb-16">
            <div className="social-header">
              <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">{t.products.pricingTitle}</h2>
              <p className="text-gray-500 mt-2 text-lg">{t.products.pricingSub}</p>
            </div>
            
            <div className="hidden md:flex items-center gap-3 px-5 py-3 bg-gray-50 rounded-full border border-gray-200">
              <div className="flex -space-x-1">
                <div className="w-7 h-7 bg-gradient-to-br from-pink-500 to-purple-500 rounded-full border-2 border-white flex items-center justify-center">
                  <InstagramIcon className="w-3 h-3 text-white" />
                </div>
                <div className="w-7 h-7 bg-gradient-to-br from-red-500 to-orange-500 rounded-full border-2 border-white flex items-center justify-center">
                  <YoutubeIcon className="w-3 h-3 text-white" />
                </div>
                <div className="w-7 h-7 bg-gradient-to-br from-blue-600 to-blue-400 rounded-full border-2 border-white flex items-center justify-center">
                  <FacebookIcon className="w-3 h-3 text-white" />
                </div>
              </div>
              <span className="text-sm font-bold text-gray-700">{t.products.platforms}</span>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {socialPlatforms.map((platform, index) => (
              <div key={index} className="social-pricing-card bg-white rounded-[2.5rem] p-7 border border-gray-200 hover:border-transparent hover:-translate-y-2 hover:shadow-[0_24px_60px_rgba(0,0,0,0.08)] transition-all duration-300 group flex flex-col overflow-hidden relative">
                
                {/* Popular badge */}
                {platform.popular && (
                  <span className="absolute top-5 right-5 z-10 flex items-center gap-1 px-3 py-1 bg-gradient-to-r from-orange-400 to-amber-500 text-white text-[11px] font-bold rounded-full shadow-sm">
                    <Zap className="w-3 h-3" /> {t.products.mostPopular}
                  </span>
                )}

                {/* Icon */}
                <div className={`w-16 h-16 bg-gradient-to-br ${platform.gradient} rounded-2xl flex items-center justify-center shadow-lg group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 mb-6`}>
                  {platform.icon}
                </div>

                <h3 className="text-2xl font-black text-gray-900 tracking-tight mb-1">{platform.name}</h3>
                <p className="text-sm text-gray-400 font-medium mb-6">{t.products.startingFrom}</p>

                {/* Prices */}
                <div className="flex flex-col gap-2.5 mb-7">
                  {platform.services.map((service, i) => (
                    <div key={i} className="flex items-center justify-between py-2.5 px-4 bg-gray-50 rounded-2xl border border-gray-100 group-hover:border-gray-200 group-hover:bg-white transition-all duration-300">
                      <span className="text-sm font-semibold text-gray-700">{t.products.svc[service.name] || service.name}</span>
                      <div className="flex items-baseline gap-1">
                        <span className="text-xl font-black text-gray-900">{service.price}</span>
                        <span className="text-[11px] font-bold text-gray-400">JD</span>
                      </div>
                    </div>
                  ))}
                </div>

                {/* CTA */}
                <Link to={platform.link} className="mt-auto flex items-center justify-center gap-2 w-full py-3.5 bg-gray-900 text-white rounded-2xl font-bold text-sm hover:bg-blue-600 transition-colors duration-300 group-hover:bg-gray-900">
                  {t.products.seePricing} <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          3. Jordanian Section
          ========================================= */}
      <section className="jordan-section relative w-full py-24 px-6 lg:px-12 bg-[#0a0a0f] text-white overflow-hidden">
        {/* Background decorations */}
        <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
          <div className="absolute top-10 left-10 w-72 h-72 bg-green-600/10 rounded-full blur-[100px]"></div>
          <div className="absolute bottom-10 right-10 w-96 h-96 bg-red-600/10 rounded-full blur-[120px]"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] border border-white/5 rounded-full"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] border border-white/5 rounded-full"></div>
        </div>

        <div className="max-w-[85rem] mx-auto relative z-10">
          
          <div className="flex flex-col lg:flex-row gap-16 items-start">
            
            {/* Left: Header */}
            <div className="lg:w-5/12">
              <div className="jordan-header">
                <div className="inline-flex items-center gap-3 px-4 py-2 bg-white/5 rounded-full border border-white/10 mb-8">
                  <span className="text-2xl">🇯🇴</span>
                  <span className="text-sm font-bold text-green-400 tracking-widest uppercase">{t.products.jordanBadge}</span>
                </div>
                
                <h2 className="text-4xl md:text-5xl font-black tracking-tight mb-6">
                  {t.products.jordanTitleA} <span className="text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-500">{t.products.jordanTitleB}</span>
                </h2>
                <p className="text-gray-400 text-lg leading-relaxed mb-8">
                  {t.products.jordanDesc}
                </p>

                <div className="flex flex-col gap-4">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300 font-medium">{t.products.jordanCheck1}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300 font-medium">{t.products.jordanCheck2}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="w-5 h-5 text-green-400" />
                    <span className="text-gray-300 font-medium">{t.products.jordanCheck3}</span>
                  </div>
                </div>

                <a href="/products/jordan" className="inline-flex items-center gap-2 mt-10 px-8 py-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-full font-bold hover:shadow-[0_10px_40px_rgba(34,197,94,0.3)] hover:-translate-y-0.5 transition-all duration-300">
                  {t.products.viewAllJordan} <ArrowRight className="w-4 h-4" />
                </a>
              </div>
            </div>

            {/* Right: Pricing Cards */}
            <div className="lg:w-7/12 grid grid-cols-1 sm:grid-cols-2 gap-4">
              {jordanianServices.map((service, index) => (
                <div key={index} className="jordan-card bg-white/5 backdrop-blur-sm rounded-[2rem] p-6 border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all duration-300 group">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-10 h-10 bg-green-500/20 rounded-full flex items-center justify-center group-hover:bg-green-500/30 transition-colors">
                      <Star className="w-5 h-5 text-green-400" />
                    </div>
                    <span className="text-xs font-bold text-green-400 bg-green-500/10 px-3 py-1 rounded-full">JO</span>
                  </div>
                  
                  <h4 className="text-lg font-black text-white mb-1">{t.products.svc[service.name] || service.name}</h4>
                  <p className="text-sm text-gray-500 mb-4">{t.products.jordanDescMap[service.desc] || service.desc}</p>
                  
                  <div className="flex items-end gap-2 mb-4">
                    <span className="text-xs text-gray-400 mb-1">{t.products.from}</span>
                    <span className="text-3xl font-black text-white">{service.price}</span>
                    <span className="text-sm font-bold text-gray-400 mb-1">JD</span>
                    <span className="text-xs text-gray-500 mb-1">/ {service.qty}</span>
                  </div>

                  <div className="w-full h-px bg-gradient-to-r from-green-500/30 via-transparent to-transparent mb-4"></div>
                  
                  <span className="text-xs font-bold text-gray-500 uppercase tracking-widest">{t.products.svc[service.name] || service.name}</span>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* =========================================
          4. Subscriptions Pricing
          ========================================= */}
      <section className="subs-section relative w-full py-24 px-6 lg:px-12 bg-gray-50/50 border-t border-gray-100">
        <div className="max-w-[85rem] mx-auto">
          
          <div className="subs-header text-center mb-16">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-gray-100 rounded-full text-xs font-bold tracking-widest uppercase mb-4 text-gray-600">
              <MonitorPlay className="w-4 h-4" /> {t.products.subsBadge}
            </div>
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900">{t.products.subsTitle}</h2>
            <p className="text-gray-500 mt-3 text-lg max-w-2xl mx-auto">{t.products.subsSub}</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {subscriptions.map((sub, index) => (
              <div key={index} className="sub-card bg-white p-6 rounded-[2rem] border border-gray-200 shadow-sm hover:shadow-xl hover:-translate-y-1 transition-all duration-300 group cursor-pointer">
                
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-14 h-14 bg-gray-50 rounded-2xl flex items-center justify-center group-hover:bg-blue-50 transition-colors duration-300">
                    {sub.icon}
                  </div>
                  <div>
                    <h4 className="text-lg font-black text-gray-900 tracking-tight">{sub.name}</h4>
                    <p className="text-xs font-medium text-gray-500 mt-0.5">{t.products.cat[sub.category] || sub.category}</p>
                  </div>
                </div>

                <div className="flex items-end gap-2 mb-6">
                  <span className="text-4xl font-black text-gray-900">{sub.price}</span>
                  <span className="text-sm font-bold text-gray-500 mb-1">JD {t.products.perMonth}</span>
                </div>

                <div className="flex flex-col gap-2 mb-6">
                  {sub.features.map((feature, i) => (
                    <div key={i} className="flex items-center gap-2">
                      <CheckCircle2 className="w-4 h-4 text-green-500" />
                      <span className="text-sm text-gray-600 font-medium">{feature}</span>
                    </div>
                  ))}
                </div>

                <Link to={`/products/${sub.id}`} className="flex items-center justify-center gap-2 w-full py-3 bg-gray-900 text-white rounded-full font-bold text-sm hover:bg-blue-600 transition-colors duration-300">
                  {t.products.viewDetails} <ArrowRight className="w-4 h-4" />
                </Link>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* =========================================
          5. Trust Section
          ========================================= */}
      <section className="creators-section relative w-full py-24 px-6 lg:px-12 bg-[#1a1b1e] text-white">
        <div className="max-w-[85rem] mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          <div className="creators-content">
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-white/10 rounded-full text-xs font-mono tracking-widest uppercase mb-6 text-gray-300 border border-white/10">
              <Star className="w-4 h-4 text-yellow-400" /> {t.products.trustBadge}
            </div>
            <h2 className="text-4xl md:text-6xl font-black tracking-tighter mb-6">{t.products.trustTitle}</h2>
            <p className="text-gray-400 text-lg mb-8 leading-relaxed max-w-lg">
              {t.products.trustPara}
            </p>
            <ul className="space-y-4 mb-10">
              <li className="flex items-center gap-3">
                <Lock className="w-5 h-5 text-blue-500" />
                <span className="text-gray-300 font-medium">{t.products.trustCheck1}</span>
              </li>
              <li className="flex items-center gap-3">
                <Wallet className="w-5 h-5 text-purple-500" />
                <span className="text-gray-300 font-medium">{t.products.trustCheck2}</span>
              </li>
              <li className="flex items-center gap-3">
                <ShieldCheck className="w-5 h-5 text-emerald-500" />
                <span className="text-gray-300 font-medium">{t.products.trustCheck3}</span>
              </li>
            </ul>
            <button className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-4 rounded-full font-bold transition-colors">
              {t.products.createAccount}
            </button>
          </div>
          
          <div className="creators-visual relative h-[400px] w-full bg-white/5 rounded-[2.5rem] border border-white/10 p-8 shadow-2xl flex flex-col justify-center items-center overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-blue-600/20 rounded-full blur-[80px]"></div>
            
            {/* Mockup of a Success Notification */}
            <div className="bg-white rounded-2xl p-6 w-full max-w-sm shadow-2xl relative z-10 flex flex-col gap-4 transform rotate-2">
              <div className="flex justify-between items-center border-b border-gray-100 pb-4">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <div>
                    <h4 className="text-black font-bold text-sm">{t.products.orderCompleted}</h4>
                    <p className="text-gray-500 text-xs">{t.products.justNow}</p>
                  </div>
                </div>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{t.products.serviceLabel}</span>
                <span className="text-black font-bold">1,000 Instagram Likes</span>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-gray-500">{t.products.targetLabel}</span>
                <span className="text-blue-600 font-medium truncate max-w-[120px]">@your_profile</span>
              </div>
              <button className="w-full py-2 bg-gray-50 text-gray-900 rounded-lg text-sm font-bold mt-2 border border-gray-100">
                {t.products.trackOrder}
              </button>
            </div>
            
          </div>
        </div>
      </section>

      {/* =========================================
          6. FAQ Section 
          ========================================= */}
      <section className="faq-section relative w-full py-24 px-6 lg:px-12 bg-white">
        <div className="max-w-[85rem] mx-auto flex flex-col lg:flex-row gap-16">
          <div className="faq-header lg:w-1/3">
            <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-gray-900 mb-4">{t.products.faqTitle}</h2>
            <p className="text-gray-500 text-lg">{t.products.faqSub}</p>
          </div>
          <div className="lg:w-2/3 grid grid-cols-1 md:grid-cols-2 gap-8">
            {faqs.map((faq, index) => (
              <div key={index} className="faq-item bg-gray-50 p-8 rounded-[2rem] border border-gray-100 hover:border-gray-200 transition-colors">
                <div className="w-10 h-10 bg-white rounded-full flex items-center justify-center mb-6 shadow-sm">
                  <ShieldCheck className="w-5 h-5 text-blue-600" />
                </div>
                <h4 className="text-lg font-black text-gray-900 mb-3">{faq.q}</h4>
                <p className="text-gray-600 font-medium leading-relaxed text-sm">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      
    </div>
  );
}
