import React, { useRef, useState, useEffect, useMemo } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { useGSAP } from '@gsap/react';
import { ChevronRight, ShieldCheck, Clock, Lock, Wallet, Sparkles, TrendingUp, Check, Loader2 } from 'lucide-react';
import { SiInstagram, SiTiktok, SiYoutube, SiFacebook, SiNetflix, SiSpotify, SiCanvas, SiCoursera } from 'react-icons/si';
import { useLanguage } from '../context/LanguageContext';
import { useCartStore } from '../store/cartStore';
import api from '../lib/axios'; // 👈 استيراد axios
import PackageInputModal from './cart/PackageInputModal';

gsap.registerPlugin(ScrollTrigger);

// ==========================================
// 1. الأيقونات 
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
// 2. خريطة الألوان الديناميكية (بدون بيانات، للتصميم فقط)
// ==========================================
const platformStyles = {
  instagram: {
    titleEn: 'Instagram', titleAr: 'إنستغرام',
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
    titleEn: 'TikTok', titleAr: 'تيك توك',
    bgGradient: 'bg-[#111111]', 
    iconGradient: 'from-gray-900 via-cyan-600 to-teal-500',
    overlay: 'from-black/80 via-black/40 to-transparent',
    cardHover: 'hover:border-gray-900 hover:shadow-[0_20px_50px_rgba(17,24,39,0.15)]',
    btnHover: 'group-hover/tier:bg-gray-900',
    badge: 'bg-gray-200 text-gray-900',
    glow: 'bg-cyan-500/30',
    shapes: (
      <>
        <div className="float-shape absolute top-10 right-20 w-56 h-56 bg-gradient-to-br from-cyan-300 to-cyan-600 rounded-full shadow-[inset_-10px_-10px_30px_rgba(0,0,0,0.3)] z-10"></div>
        <div className="float-shape absolute -bottom-10 right-56 w-64 h-64 bg-gradient-to-tr from-pink-500 to-rose-600 rounded-[3rem] rotate-12 shadow-[inset_-15px_-15px_30px_rgba(0,0,0,0.3)] z-10"></div>
      </>
    )
  },
  youtube: {
    titleEn: 'YouTube', titleAr: 'يوتيوب',
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
    titleEn: 'Facebook', titleAr: 'فيسبوك',
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
    titleEn: 'Platform', titleAr: 'المنصة',
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
function TierCards({ productsList, itemName, theme, orderNow, onAdd, addedText, addedId, onViewDetail, detailLabel }) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
      {productsList.map((product) => (
        <div
          key={product._id}
          className={`gsap-card group/tier bg-white rounded-[2rem] border-[1.5px] border-gray-100 p-6 flex flex-col items-center text-center transition-all duration-300 cursor-pointer relative overflow-hidden hover:-translate-y-2 ${theme.cardHover}`}
        >
          <div className={`absolute -top-12 left-1/2 -translate-x-1/2 w-32 h-32 ${theme.glow} opacity-0 group-hover/tier:opacity-100 rounded-full blur-2xl transition-opacity duration-500`}></div>

          <div className="text-xs font-bold text-gray-400 uppercase tracking-widest mb-1 z-10">{itemName}</div>
          <div className="text-3xl md:text-4xl font-black tracking-tighter text-gray-900 mb-2 z-10">{product.qty}</div>

          {product.name && product.name !== itemName && (
            <h5 className="text-sm font-bold text-gray-700 mb-3 z-10 leading-snug">{product.name}</h5>
          )}

          {product.features && product.features.length > 0 && (
            <div className="flex flex-col gap-1 mb-3 z-10 w-full">
              {product.features.slice(0, 2).map((feat, fi) => (
                <span key={fi} className="inline-flex items-center justify-center gap-1 text-[11px] font-medium text-gray-500 leading-tight">
                  <Check className="w-3 h-3 text-emerald-500 shrink-0" />
                  <span className="truncate">{feat}</span>
                </span>
              ))}
            </div>
          )}

          <div className="w-full h-px bg-gray-100 mb-4 z-10"></div>

          <div className="flex items-baseline gap-1 mb-5 z-10">
            <span className="text-2xl md:text-3xl font-black text-gray-900">{product.price.toFixed(2)}</span>
            <span className="text-xs font-bold text-gray-500">JOD</span>
          </div>

          <div className="mt-auto w-full flex flex-col gap-2 z-10">
            <button
              onClick={() => onAdd(product)}
              className={`w-full py-3 bg-gray-100 text-gray-900 group-hover/tier:text-white rounded-xl font-bold text-sm transition-all duration-300 flex items-center justify-center gap-1.5 ${theme.btnHover} ${addedId === product._id ? '!bg-emerald-500 !text-white group-hover/tier:!bg-emerald-500' : ''}`}
            >
              {addedId === product._id ? (
                <><Check className="w-4 h-4" /> {addedText}</>
              ) : (
                orderNow
              )}
            </button>
            <button
              onClick={() => onViewDetail(product._id)}
              className="w-full py-2.5 border-2 border-gray-200 text-gray-500 hover:text-indigo-600 hover:border-indigo-300 rounded-xl font-bold text-xs transition-all duration-300 flex items-center justify-center gap-1.5"
            >
              {detailLabel}
            </button>
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
  const navigate = useNavigate();
  const { t } = useLanguage();
  const pp = t.platformPage;
  const addItem = useCartStore((s) => s.addItem);

  // حالات الباك إند
  const [platformProducts, setPlatformProducts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);

  // حالات جمع المدخلات الديناميكية (الرابط/الإيميل) والتحقق من الإضافة
  const [pendingProduct, setPendingProduct] = useState(null);
  const [addedId, setAddedId] = useState(null);
  const addedTimer = useRef(null);

  const flashAdded = (productId) => {
    setAddedId(productId);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAddedId(null), 1200);
  };

  // اختيار التنسيق البصري الخاص بالمنصة
  const theme = platformStyles[platformId] || platformStyles.default;
  const platformName = t.dir === 'rtl' ? theme.titleAr : theme.titleEn;
  const icon = iconMap[platformId] || <ShieldCheck className="w-12 h-12 text-white" />;

  // 1. جلب البيانات من الباك إند
  useEffect(() => {
    const fetchPlatformData = async () => {
      try {
        setIsLoading(true);
        const response = await api.get('/products');
        // فلترة المنتجات الخاصة بهذه المنصة فقط
        const filtered = response.data.data.products.filter(p => p.platform === platformId);
        setPlatformProducts(filtered);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchPlatformData();
  }, [platformId]);

  // 2. تجميع البيانات (Grouping) لتطابق التصميم
  // نقوم بتجميعها أولاً حسب groupName (مثال: المتابعين)
  // ثم داخلها حسب subGroup (مثال: عرب، أجانب)
  const groupedSections = useMemo(() => {
    const groups = platformProducts.reduce((acc, product) => {
      // قراءة المستويات الثلاثة
      const cat = product.category || 'خدمات عامة'; // القسم
      const grp = product.groupName || 'باقات أساسية'; // المجموعة
      const sub = product.subGroup || ''; // المجموعة الفرعية (ممكن تكون فارغة)

      // بناء الشجرة الهرمية
      if (!acc[cat]) acc[cat] = {};
      if (!acc[cat][grp]) acc[cat][grp] = {};
      if (!acc[cat][grp][sub]) acc[cat][grp][sub] = [];

      acc[cat][grp][sub].push(product);
      return acc;
    }, {});

    return Object.entries(groups);
  }, [platformProducts]);

  // 3. دالة الإضافة للسلة بناءً على المنتج من الـ DB
  const handleAddToCart = (product, dynamicInputs = {}) => {
    addItem({
      id: product._id, // المعرف الحقيقي من قاعدة البيانات
      platformId: product.platform,
      name: product.name,
      nameAr: product.name,
      unit: product.qty,
      price: product.price,
      productType: product.productType,
      inputRequirements: product.inputRequirements || [],
      dynamicInputs,
    });
  };

  // 4. نقطة الدخول لزر "اطلب الآن": إن احتاج المنتج مدخلات نفتح البوب-آب وإلا نضيف مباشرة
  const requestAdd = (product) => {
    const reqs = product.inputRequirements || [];
    if (reqs.length > 0) {
      setPendingProduct(product);
    } else {
      handleAddToCart(product);
      flashAdded(product._id);
    }
  };

  const confirmPendingInputs = (dynamicInputs) => {
    if (pendingProduct) {
      handleAddToCart(pendingProduct, dynamicInputs);
      flashAdded(pendingProduct._id);
    }
    setPendingProduct(null);
  };

  // ==========================================
  // GSAP Animations (تتنفذ بعد انتهاء التحميل)
  // ==========================================
  useGSAP(() => {
    if (isLoading) return; // ننتظر حتى تظهر الكروت في الـ DOM

    gsap.fromTo(".hero-content > *", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.15, ease: "back.out(1.2)" }
    );
    
    gsap.fromTo(".hero-icon-box", 
      { scale: 0, opacity: 0, rotation: -45 },
      { scale: 1, opacity: 1, rotation: 0, duration: 1, ease: "spring.out(1, 0.5)", delay: 0.2 }
    );

    gsap.to(".float-shape", {
      y: -30, rotation: 5, repeat: -1, yoyo: true, ease: "sine.inOut", duration: 4, stagger: 0.5
    });

    // كروت الأسعار (ScrollTrigger) يجب عمل Refresh لها بعد تحديث الـ DOM
    ScrollTrigger.refresh();
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

    gsap.fromTo(".trust-card", 
      { y: 50, opacity: 0 },
      {
        scrollTrigger: { trigger: ".trust-section", start: "top 80%" },
        y: 0, opacity: 1, duration: 0.8, stagger: 0.2, ease: "power2.out"
      }
    );

  }, { scope: container, dependencies: [isLoading, platformProducts] }); // 👈 نمرر حالات التحميل كمتغيرات متابعة للأنيميشن

  return (
    <div ref={container} dir={t.dir} className="min-h-screen bg-gray-50 font-sans overflow-hidden pt-20">
      
      {/* Hero Section */}
      <section className="relative w-full max-w-[1400px] mx-auto px-6 lg:px-10 mb-10 md:mb-16">
        <div className={`relative w-full h-[340px] md:h-[500px] rounded-[3rem] overflow-hidden shadow-2xl ${theme.bgGradient}`}>
          
          <div className="absolute inset-0 pointer-events-none rtl:-scale-x-100">
            {theme.shapes}
          </div>

          <div className={`absolute inset-0 bg-gradient-to-r rtl:bg-gradient-to-l ${theme.overlay}`}></div>

          <div className="absolute inset-0 flex flex-col justify-center px-6 md:px-20 z-10 hero-content">
            <nav className="flex flex-wrap items-center gap-2 text-sm font-medium mb-4 md:mb-8">
              <Link to="/" className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">{pp.home}</Link>
              <ChevronRight className="w-4 h-4 text-white/50 rtl:rotate-180" />
              <Link to="/products" className="px-3 py-1.5 bg-white/20 backdrop-blur-md rounded-full text-white hover:bg-white/30 transition-colors">{pp.products}</Link>
              <ChevronRight className="w-4 h-4 text-white/50 rtl:rotate-180" />
              <span className="px-3 py-1.5 rounded-full font-bold bg-white text-gray-900">{platformName}</span>
            </nav>

            <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-white/20 backdrop-blur-md border border-white/30 rounded-full text-xs font-bold tracking-widest text-white uppercase mb-4 md:mb-6 shadow-sm w-max">
              <Sparkles className="w-4 h-4 text-yellow-300" /> {pp.premiumQuality}
            </div>
            
            <h1 className="text-4xl md:text-[6rem] font-black tracking-tighter text-white mb-3 md:mb-4 leading-none drop-shadow-lg">
              {platformName}
            </h1>
            
            <p className="text-white/90 text-base md:text-xl font-medium max-w-lg leading-relaxed drop-shadow-md">
              {pp.subtitle} {platformName} {pp.subtitleTail}
            </p>

            <div className="hero-icon-box absolute bottom-6 right-6 rtl:left-6 rtl:right-auto md:bottom-20 md:right-20 md:rtl:left-20 md:rtl:right-auto">
              <div className={`w-20 h-20 md:w-32 md:h-32 bg-gradient-to-br ${theme.iconGradient} rounded-[2rem] flex items-center justify-center shadow-[0_30px_60px_rgba(0,0,0,0.3)] border-4 border-white/20 backdrop-blur-xl rtl:-scale-x-100`}>
                {icon}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Sections */}
      <section className="w-full pb-16 md:pb-24 px-6 lg:px-12 min-h-[400px]">
        <div className="max-w-[85rem] mx-auto flex flex-col gap-14 md:gap-24">
          
          {isLoading ? (
            // شاشة التحميل
            <div className="flex flex-col items-center justify-center py-20 text-indigo-600">
              <Loader2 className="w-12 h-12 animate-spin mb-4" />
              <p className="font-medium text-gray-500">{t.dir === 'rtl' ? 'جاري تحميل الباقات...' : 'Loading packages...'}</p>
            </div>
          ) : platformProducts.length === 0 ? (
            // شاشة عدم وجود باقات
            <div className="text-center py-20 text-gray-500 font-medium text-lg">
              {pp.notFound || "لا توجد باقات متاحة حالياً لهذه المنصة."}
            </div>
          ) : (
            // عرض الباقات بعد تجميعها (قسم -> مجموعة -> مجموعة فرعية)
            groupedSections.map(([categoryName, groups], ci) => (
              <div key={ci} className="price-section mb-12">
                
                {/* 1. رأس القسم (Category) مثل: المتابعين */}
                <div className="flex items-center gap-4 mb-8 md:mb-12">
                  <div className={`w-12 h-12 md:w-14 md:h-14 bg-gradient-to-br ${theme.iconGradient} text-white rounded-full flex items-center justify-center text-xl font-black shadow-lg shrink-0`}>
                    {String(ci + 1).padStart(2, '0')}
                  </div>
                  <div>
                    <h2 className="text-2xl md:text-4xl font-black tracking-tight text-gray-900">{categoryName}</h2>
                    <p className="text-xs md:text-sm text-gray-500 font-bold tracking-widest uppercase mt-1">{platformName}</p>
                  </div>
                </div>

                <div className="flex flex-col gap-10">
                  {/* 2. المجموعات داخل القسم (Group) مثل: متابعين عرب */}
                  {Object.entries(groups).map(([groupName, subGroups], gi) => (
                    <div key={gi} className="bg-white rounded-[2rem] md:rounded-[2.5rem] p-5 md:p-10 border border-gray-200 shadow-[0_15px_40px_rgba(0,0,0,0.03)]">
                      
                      <div className="flex flex-wrap items-center justify-between gap-4 mb-6 md:mb-8 pb-5 md:pb-6 border-b border-gray-100">
                        <div className="flex items-center gap-4">
                          <div className={`w-10 h-10 md:w-12 md:h-12 rounded-2xl flex items-center justify-center ${theme.badge}`}>
                            <TrendingUp className="w-5 h-5 md:w-6 md:h-6" />
                          </div>
                          <div>
                            <h3 className="text-xl md:text-2xl font-black text-gray-900">{groupName}</h3>
                          </div>
                        </div>
                      </div>

                      <div className="flex flex-col gap-8 md:gap-12">
                        {/* 3. المجموعات الفرعية (SubGroup) مثل: مع ضمان */}
                        {Object.entries(subGroups).map(([subGroupName, productsList], si) => (
                          <div key={si}>
                            {/* إذا كان هناك اسم للمجموعة الفرعية، اعرضه كعنوان صغير */}
                            {subGroupName && (
                              <h4 className="text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                                <Sparkles className="w-5 h-5 text-indigo-500" />
                                {subGroupName}
                              </h4>
                            )}
                            
                            {/* 4. عرض الكروت الفعلية للمنتجات */}
                            <TierCards 
                              productsList={productsList} 
                              itemName={categoryName}
                              theme={theme}
                              orderNow={pp.orderNow}
                              onAdd={requestAdd}
                              addedText={pp.added}
                              addedId={addedId}
                              detailLabel={pp.detail}
                              onViewDetail={(productId) => navigate(`/product/${productId}`)}
                            />
                          </div>
                        ))}
                      </div>

                    </div>
                  ))}
                </div>

              </div>
            ))
          )}

          
        </div>
      </section>

      {/* Trust / Why Us - (باقي كما هو) */}
      <section className="trust-section relative w-full py-16 md:py-24 px-6 lg:px-12 bg-[#0a0a0b] text-white overflow-hidden rounded-t-[3rem]">
        <div className={`absolute bottom-0 left-1/2 -translate-x-1/2 w-[80vw] h-64 ${theme.glow} blur-[120px]`}></div>

        <div className="max-w-[85rem] mx-auto relative z-10">
          <div className="text-center mb-10 md:mb-16">
            <h2 className="text-3xl md:text-5xl font-black tracking-tighter mb-4">{pp.whyTitle}</h2>
            <p className="text-gray-400 text-base md:text-lg">{pp.trustSub}</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="trust-card bg-white/5 border border-white/10 rounded-[2rem] md:rounded-[2.5rem] p-6 md:p-8 hover:bg-white/10 transition-colors backdrop-blur-md">
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

      {/* نافذة جمع مدخلات المنتج (رابط النمو / إيميل الاشتراك) */}
      <PackageInputModal
        open={!!pendingProduct}
        product={pendingProduct}
        onConfirm={confirmPendingInputs}
        onClose={() => setPendingProduct(null)}
      />

    </div>
  );
}