import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Flame, Sparkles, Clock, ChevronRight, ChevronLeft, Zap, ShieldCheck, ArrowUpRight } from 'lucide-react';

export default function Offers() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // تم تقسيم العناوين لتناسب التصميم الطباعي الضخم (Stacked Typography)
  const offersList = [
    {
      id: 1,
      title1: isRTL ? 'وكالات' : 'AGENCY',
      title2: isRTL ? 'السوشال ميديا' : 'BUNDLE',
      desc: isRTL 
        ? 'الكومبو الأقوى لحسابك: 20,000 متابع انستغرام + 50,000 مشاهدة ريلز.'
        : 'The ultimate combo: 20K IG Followers + 50K Reels Views.',
      features: isRTL ? ['جودة عالية', 'ضمان 30 يوم'] : ['HQ Accounts', '30-Day Refill'],
      oldPrice: '120.00',
      newPrice: '65.00',
      badge: isRTL ? 'الأكثر مبيعاً' : 'BEST SELLER',
      colorFrom: 'from-red-600',
      colorTo: 'to-orange-500',
      bgGlow: 'bg-red-600',
      icon: Flame
    },
    {
      id: 2,
      title1: isRTL ? 'الانتشار' : 'ARAB',
      title2: isRTL ? 'العربي' : 'REACH',
      desc: isRTL 
        ? 'استهدف الجمهور العربي بقوة مع 10,000 متابع حقيقي لصفحتك.'
        : 'Target the Arab audience with 10K real page followers.',
      features: isRTL ? ['عرب 100%', 'أمان تام'] : ['100% Arab', 'Page Safe'],
      oldPrice: '80.00',
      newPrice: '56.00',
      badge: isRTL ? 'خصم حصري' : 'EXCLUSIVE',
      colorFrom: 'from-blue-600',
      colorTo: 'to-cyan-400',
      bgGlow: 'bg-blue-600',
      icon: Zap
    },
    {
      id: 3,
      title1: isRTL ? 'صاروخ' : 'EXPLORE',
      title2: isRTL ? 'الإكسبلور' : 'ROCKET',
      desc: isRTL 
        ? 'دفعة قوية للفيديو الخاص بك: 100,000 مشاهدة + 5,000 لايك.'
        : 'Massive push for your video: 100K Views + 5K Likes.',
      features: isRTL ? ['سرعة فائقة', 'تفاعل حقيقي'] : ['Super Fast', 'Real Interaction'],
      oldPrice: '35.00',
      newPrice: '18.00',
      badge: isRTL ? 'فرصة ذهبية' : 'GOLDEN DEAL',
      colorFrom: 'from-purple-600',
      colorTo: 'to-pink-500',
      bgGlow: 'bg-purple-600',
      icon: Sparkles
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === offersList.length - 1 ? 0 : prev + 1));
    }, 6000);
    return () => clearInterval(timer);
  }, [offersList.length]);

  const nextSlide = () => setCurrentSlide((prev) => (prev === offersList.length - 1 ? 0 : prev + 1));
  const prevSlide = () => setCurrentSlide((prev) => (prev === 0 ? offersList.length - 1 : prev - 1));

  const activeOffer = offersList[currentSlide];
  const Icon = activeOffer.icon;

  return (
    <section dir={t.dir} className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-[#030305] overflow-hidden font-sans">
      
      {/* توهج محيطي داكن وفخم */}
      <div className={`absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] rounded-full blur-[150px] pointer-events-none transition-colors duration-1000 ease-in-out ${activeOffer.bgGlow} opacity-20`}></div>

      <div className="max-w-[85rem] mx-auto relative z-10">
        
        {/* حاوية الـ Slider */}
        <div className="relative w-full h-[600px] md:h-[500px] bg-[#0a0a0f] border border-white/5 rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-2xl flex flex-col md:flex-row transition-all duration-700">
          
          {/* =======================================
              الخلفية البصرية (الجانب الدائري المضيء المستوحى من الصورة)
              ======================================= */}
          <div className={`absolute top-0 h-full w-full md:w-[60%] pointer-events-none z-0 ${isRTL ? 'left-0' : 'right-0'}`}>
            {/* دائرة متوهجة خلفية */}
            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? '-left-20' : '-right-20'} w-[300px] h-[300px] md:w-[500px] md:h-[500px] bg-gradient-to-tr ${activeOffer.colorFrom} ${activeOffer.colorTo} rounded-full blur-3xl opacity-40 transition-all duration-1000`}></div>
            
            {/* الدائرة المركزية الحادة (الزجاجية) */}
            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-10' : 'right-10'} w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-gradient-to-tr ${activeOffer.colorFrom} ${activeOffer.colorTo} rounded-full border-4 border-white/20 shadow-[inset_0_0_50px_rgba(255,255,255,0.2)] flex items-center justify-center transition-all duration-1000 overflow-visible`}>
              
              {/* العنصر البصري يخرج من الإطار (Breaking the Frame) */}
              <Icon 
                className="w-48 h-48 md:w-80 md:h-80 text-white drop-shadow-[0_20px_50px_rgba(0,0,0,0.6)] transform scale-125 md:-translate-y-12 md:translate-x-8 transition-transform duration-1000"
                style={{ mixBlendMode: 'overlay' }}
              />
            </div>
            
            {/* فلتر زجاجي لدمج الألوان بأسلوب فخم */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#0a0a0f] via-transparent to-transparent z-10" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}></div>
          </div>

          {/* =======================================
              المحتوى النصي (الطباعة العملاقة)
              ======================================= */}
          <div className="relative z-20 w-full md:w-[60%] p-8 md:p-16 flex flex-col justify-center h-full">
            
            {/* شارة التقييم أو الأكثر مبيعاً (مثل شارة NOTA MAXIMA) */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${activeOffer.colorFrom} ${activeOffer.colorTo} p-0.5 shadow-lg`}>
                <div className="w-full h-full bg-[#0a0a0f] rounded-[10px] flex items-center justify-center">
                  <span className={`text-xl font-black text-transparent bg-clip-text bg-gradient-to-tr ${activeOffer.colorFrom} ${activeOffer.colorTo}`}>%</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className="text-white font-black uppercase tracking-wider text-sm">{activeOffer.badge}</span>
                <span className="text-gray-500 text-xs font-bold tracking-widest uppercase">{isRTL ? 'ميديا جو 2026' : 'MEDIAJO 2026'}</span>
              </div>
            </div>

            {/* العنوان العملاق المتراص (Massive Stacked Typography) */}
            <h2 className="flex flex-col gap-0 mb-6 drop-shadow-xl">
              <span className="text-[4rem] md:text-[7rem] font-black text-white leading-[0.85] tracking-tighter uppercase mix-blend-screen">
                {activeOffer.title1}
              </span>
              <span className={`text-[3.5rem] md:text-[6rem] font-black text-transparent bg-clip-text bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo} leading-[0.9] tracking-tighter uppercase`}>
                {activeOffer.title2}
              </span>
            </h2>

            {/* الوصف القصير */}
            <p className="text-gray-300 text-base md:text-lg max-w-sm font-medium leading-relaxed mb-8 backdrop-blur-sm bg-black/20 p-4 rounded-2xl border border-white/5">
              {activeOffer.desc}
            </p>

            {/* السعر وزر الشراء */}
            <div className="flex items-center gap-6 mt-auto">
              <div className="flex flex-col">
                <span className="text-gray-500 line-through text-sm font-bold mb-1">{activeOffer.oldPrice} JOD</span>
                <span className="text-4xl font-black text-white leading-none">{activeOffer.newPrice}</span>
              </div>
              
              <Link 
                to="/products" 
                className={`flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo} text-white font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(0,0,0,0.3)]`}
              >
                {isRTL ? 'شراء' : 'BUY NOW'}
                <ArrowUpRight className={`w-5 h-5 ${isRTL ? '-scale-x-100' : ''}`} />
              </Link>
            </div>
          </div>

          {/* =======================================
              عناصر عائمة إضافية (مثل موقع iesp.edu.br)
              ======================================= */}
          <div className={`hidden md:flex absolute top-12 ${isRTL ? 'left-12' : 'right-12'} z-20 flex-col items-center gap-2`}>
            <div className="bg-white/10 backdrop-blur-md px-4 py-2 rounded-full border border-white/20">
              <span className="text-white text-xs font-mono tracking-widest uppercase">MEDIAJO.ORG</span>
            </div>
          </div>

        </div>

        {/* أزرار التنقل السفلية المستقلة */}
        <div className="flex items-center justify-between mt-8 max-w-[85rem] mx-auto px-4">
          <div className="flex gap-3">
            {offersList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full h-1.5 ${currentSlide === index ? `w-12 bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo}` : 'w-4 bg-white/20 hover:bg-white/40'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={isRTL ? nextSlide : prevSlide}
              className="w-12 h-12 bg-[#0a0a0f] hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={isRTL ? prevSlide : nextSlide}
              className="w-12 h-12 bg-[#0a0a0f] hover:bg-white/10 border border-white/10 rounded-full flex items-center justify-center text-white transition-all hover:scale-105"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}