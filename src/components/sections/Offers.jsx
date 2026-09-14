import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Flame, Sparkles, Clock, ChevronRight, ChevronLeft, Zap, ShieldCheck } from 'lucide-react';

export default function Offers() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';
  
  // حالة الـ Slider
  const [currentSlide, setCurrentSlide] = useState(0);

  // بيانات العروض (يمكنك جلبها من الـ API لاحقاً)
  const offersList = [
    {
      id: 1,
      title: isRTL ? 'باقة وكالات السوشال ميديا' : 'Social Media Agency Bundle',
      desc: isRTL 
        ? 'الكومبو الأقوى لحسابك: 20,000 متابع انستغرام + 50,000 مشاهدة ريلز مع تفاعل حقيقي.'
        : 'The ultimate combo: 20K IG Followers + 50K Reels Views with real engagement.',
      features: isRTL ? ['حسابات عالية الجودة', 'ضمان تعويض 30 يوم', 'تنفيذ فوري'] : ['HQ Accounts', '30-Day Refill', 'Instant Start'],
      oldPrice: '120.00',
      newPrice: '65.00',
      badge: isRTL ? 'الأكثر مبيعاً' : 'Best Seller',
      colorFrom: 'from-orange-500',
      colorTo: 'to-pink-600',
      glowColor: 'bg-orange-500/20',
      icon: Flame
    },
    {
      id: 2,
      title: isRTL ? 'باقة الانتشار العربي (فيسبوك)' : 'Arab Reach Bundle (FB)',
      desc: isRTL 
        ? 'استهدف الجمهور العربي بقوة مع 10,000 متابع حقيقي لصفحتك لتعزيز ثقة عملائك.'
        : 'Target the Arab audience with 10K real page followers to build brand trust.',
      features: isRTL ? ['متابعين عرب 100%', 'ثبات عالي جداً', 'أمان تام للصفحة'] : ['100% Arab Followers', 'High Retention', 'Page Safe'],
      oldPrice: '80.00',
      newPrice: '56.00',
      badge: isRTL ? 'خصم حصري' : 'Exclusive Deal',
      colorFrom: 'from-blue-500',
      colorTo: 'to-cyan-400',
      glowColor: 'bg-blue-500/20',
      icon: Zap
    },
    {
      id: 3,
      title: isRTL ? 'صاروخ الإكسبلور (تيك توك)' : 'Explore Rocket (TikTok)',
      desc: isRTL 
        ? 'دفعة قوية للفيديو الخاص بك: 100,000 مشاهدة + 5,000 لايك لتصدر الترند.'
        : 'A massive push for your video: 100K Views + 5K Likes to hit the trends.',
      features: isRTL ? ['سرعة فائقة', 'تفاعل حقيقي', 'دعم خوارزميات تيك توك'] : ['Super Fast', 'Real Interaction', 'Algorithm Boost'],
      oldPrice: '35.00',
      newPrice: '18.00',
      badge: isRTL ? 'فرصة ذهبية' : 'Golden Chance',
      colorFrom: 'from-purple-600',
      colorTo: 'to-fuchsia-500',
      glowColor: 'bg-purple-500/20',
      icon: Sparkles
    }
  ];

  // دالة التقدم التلقائي للـ Slider
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === offersList.length - 1 ? 0 : prev + 1));
    }, 6000); // يقلب كل 6 ثواني
    return () => clearInterval(timer);
  }, [offersList.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === offersList.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? offersList.length - 1 : prev - 1));

  const activeOffer = offersList[currentSlide];
  const Icon = activeOffer.icon;

  return (
    // القسم أصبح داكناً ليفصل بصرياً ويجذب الانتباه بشدة
    <section dir={t.dir} className="relative w-full py-24 md:py-32 px-4 md:px-12 bg-[#050508] overflow-hidden font-sans">
      
      {/* توهج خلفي ديناميكي يتغير لونه حسب العرض النشط */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full blur-[120px] pointer-events-none transition-colors duration-1000 ease-in-out ${activeOffer.glowColor} opacity-50`}></div>

      <div className="max-w-[85rem] mx-auto relative z-10">
        
        {/* عنوان القسم */}
        <div className="text-center mb-12 md:mb-16">
          <div className="inline-flex items-center justify-center gap-2 px-4 py-2 bg-white/5 border border-white/10 rounded-full mb-6 backdrop-blur-sm">
            <Flame className="w-5 h-5 text-orange-500 animate-pulse" />
            <span className="text-sm font-bold tracking-widest uppercase text-gray-300">
              {isRTL ? 'عروض الحرق' : 'Flash Deals'}
            </span>
          </div>
          <h2 className="text-4xl md:text-6xl font-black text-white tracking-tighter leading-tight">
            {isRTL ? 'أسعار تدمر المنافسة' : 'Prices That Destroy Competition'}
          </h2>
        </div>

        {/* حاوية الـ Slider */}
        <div className="relative w-full max-w-5xl mx-auto">
          
          {/* أزرار التنقل للكمبيوتر */}
          <button 
            onClick={isRTL ? nextSlide : prevSlide}
            className="hidden md:flex absolute top-1/2 -left-16 -translate-y-1/2 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full items-center justify-center text-white transition-all hover:scale-110 z-20"
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          
          <button 
            onClick={isRTL ? prevSlide : nextSlide}
            className="hidden md:flex absolute top-1/2 -right-16 -translate-y-1/2 w-12 h-12 bg-white/5 hover:bg-white/10 border border-white/10 rounded-full items-center justify-center text-white transition-all hover:scale-110 z-20"
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* الكرت الفردي (The Single Showpiece Card) */}
          <div className="relative w-full bg-[#0a0a0f]/80 backdrop-blur-2xl border border-white/10 rounded-[2.5rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] flex flex-col lg:flex-row transition-all duration-700 ease-in-out">
            
            {/* لمعان يمر على الكرت */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent animate-[shimmer_3s_infinite] pointer-events-none z-10"></div>

            {/* الجزء الأيمن (معلومات العرض) */}
            <div className="w-full lg:w-3/5 p-8 md:p-12 lg:p-16 flex flex-col justify-center relative z-20">
              <div className="flex flex-wrap items-center gap-4 mb-6">
                <span className={`inline-flex items-center gap-2 px-4 py-1.5 bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo} rounded-full text-white text-sm font-bold shadow-lg`}>
                  <Icon className="w-4 h-4" /> {activeOffer.badge}
                </span>
                
                {/* مؤقت العرض */}
                <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-4 py-1.5 rounded-full text-gray-300 font-mono text-sm">
                  <Clock className="w-4 h-4 text-red-400 animate-pulse" />
                  <span>12:45:30</span>
                </div>
              </div>

              <h3 className="text-3xl sm:text-4xl md:text-5xl font-black text-white mb-6 leading-tight tracking-tight">
                {activeOffer.title}
              </h3>
              
              <p className="text-gray-400 text-lg md:text-xl font-light leading-relaxed mb-8 max-w-lg">
                {activeOffer.desc}
              </p>

              <div className="flex flex-wrap gap-4 mb-2">
                {activeOffer.features.map((feat, idx) => (
                  <div key={idx} className="flex items-center gap-2 text-sm md:text-base font-medium text-gray-300">
                    <ShieldCheck className={`w-5 h-5 text-transparent bg-clip-text bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo}`} />
                    {feat}
                  </div>
                ))}
              </div>
            </div>

            {/* الجزء الأيسر (السعر وزر الشراء) */}
            <div className="w-full lg:w-2/5 p-8 md:p-12 lg:p-16 bg-white/5 border-t lg:border-t-0 lg:border-l border-white/10 flex flex-col items-center justify-center text-center relative z-20">
              
              <div className="mb-2">
                <span className="text-gray-500 line-through text-xl font-medium">{activeOffer.oldPrice} JOD</span>
              </div>
              
              <div className="flex items-baseline gap-2 mb-10">
                <span className={`text-6xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo}`}>
                  {activeOffer.newPrice.split('.')[0]}
                </span>
                <span className={`text-3xl font-black text-transparent bg-clip-text bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo}`}>
                  .{activeOffer.newPrice.split('.')[1]}
                </span>
                <span className="text-gray-400 font-bold tracking-widest ml-1">JOD</span>
              </div>

              <Link 
                to="/products" 
                className={`w-full py-5 bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo} text-white text-lg font-black uppercase tracking-wider rounded-2xl hover:scale-105 transition-transform shadow-[0_15px_40px_rgba(0,0,0,0.4)] relative overflow-hidden group`}
              >
                <span className="relative z-10">{isRTL ? 'اقتنص العرض الآن' : 'Grab Deal Now'}</span>
                <div className="absolute inset-0 w-full h-full bg-white/20 -translate-x-full group-hover:animate-[shimmer_1s_forwards]"></div>
              </Link>
            </div>
            
          </div>

          {/* أزرار التنقل للجوال والمؤشرات (Dots) */}
          <div className="flex items-center justify-center gap-6 mt-10">
            <button onClick={isRTL ? nextSlide : prevSlide} className="md:hidden text-white/50 hover:text-white p-2"><ChevronLeft className="w-8 h-8" /></button>
            
            <div className="flex gap-3">
              {offersList.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentSlide(index)}
                  className={`transition-all duration-500 rounded-full ${currentSlide === index ? 'w-10 h-2.5 bg-white' : 'w-2.5 h-2.5 bg-white/20 hover:bg-white/50'}`}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <button onClick={isRTL ? prevSlide : nextSlide} className="md:hidden text-white/50 hover:text-white p-2"><ChevronRight className="w-8 h-8" /></button>
          </div>

        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
      `}</style>
    </section>
  );
}