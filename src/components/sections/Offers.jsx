import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Flame, Sparkles, ChevronRight, ChevronLeft, Zap, ArrowUpRight } from 'lucide-react';

export default function Offers() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';
  
  const [currentSlide, setCurrentSlide] = useState(0);

  // العناوين مقسمة للطباعة العملاقة المتراصة (Stacked Typography)
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
      colorFrom: 'from-orange-400',
      colorTo: 'to-pink-500',
      shadowColor: 'rgba(249, 115, 22, 0.2)',
      blobColor: 'bg-orange-100',
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
      colorFrom: 'from-blue-500',
      colorTo: 'to-cyan-400',
      shadowColor: 'rgba(59, 130, 246, 0.2)',
      blobColor: 'bg-blue-100',
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
      colorFrom: 'from-purple-500',
      colorTo: 'to-fuchsia-500',
      shadowColor: 'rgba(168, 85, 247, 0.2)',
      blobColor: 'bg-purple-100',
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
    <section dir={t.dir} className="relative w-full py-16 md:py-24 px-4 md:px-8 bg-[#fafbfc] overflow-hidden font-sans border-t border-gray-100">
      
      <div className="max-w-[85rem] mx-auto relative z-10">
        
        {/* حاوية الـ Slider (بيضاء مع ظلال ناعمة فخمة) */}
        <div className="relative w-full h-[600px] md:h-[500px] bg-white rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_20px_60px_-15px_rgba(0,0,0,0.08)] border border-gray-100 flex flex-col md:flex-row transition-all duration-700">
          
          {/* =======================================
              الخلفية البصرية الفاتحة (الجانب الدائري المضيء)
              ======================================= */}
          <div className={`absolute top-0 h-full w-full md:w-[55%] pointer-events-none z-0 ${isRTL ? 'left-0' : 'right-0'}`}>
            
            {/* بقعة لونية ناعمة (Pastel Blob) */}
            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? '-left-20' : '-right-20'} w-[400px] h-[400px] md:w-[600px] md:h-[600px] ${activeOffer.blobColor} rounded-full blur-[80px] opacity-60 transition-colors duration-1000`}></div>
            
            {/* الدائرة المركزية الزجاجية (Frosted Glass) */}
            <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-10' : 'right-10'} w-[250px] h-[250px] md:w-[450px] md:h-[450px] bg-white/40 backdrop-blur-xl rounded-full border-[8px] border-white shadow-[0_30px_60px_rgba(0,0,0,0.05)] flex items-center justify-center transition-all duration-1000 overflow-visible`}>
              
              {/* العنصر البصري يخرج من الإطار (Breaking the Frame) مع تدرج لوني */}
              <div className="relative transform scale-125 md:-translate-y-8 md:translate-x-8 transition-transform duration-1000">
                <svg width="0" height="0">
                  <linearGradient id="icon-gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop stopColor="currentColor" offset="0%" className={activeOffer.colorFrom.replace('from-', 'text-')} />
                    <stop stopColor="currentColor" offset="100%" className={activeOffer.colorTo.replace('to-', 'text-')} />
                  </linearGradient>
                </svg>
                <Icon 
                  className="w-48 h-48 md:w-72 md:h-72 drop-shadow-2xl"
                  style={{ stroke: 'url(#icon-gradient)', fill: 'url(#icon-gradient)', filter: `drop-shadow(0px 20px 30px ${activeOffer.shadowColor})` }}
                  strokeWidth={1}
                />
              </div>
            </div>
            
            {/* تدرج لوني شفاف لدمج النص مع الصورة بنعومة */}
            <div className="absolute inset-0 bg-gradient-to-r from-white via-white/80 to-transparent z-10" style={{ transform: isRTL ? 'rotate(180deg)' : 'none' }}></div>
          </div>

          {/* =======================================
              المحتوى النصي الفاتح (الطباعة العملاقة)
              ======================================= */}
          <div className="relative z-20 w-full md:w-[60%] p-8 md:p-16 flex flex-col justify-center h-full">
            
            {/* شارة التقييم */}
            <div className="flex items-center gap-3 mb-6">
              <div className={`w-12 h-12 rounded-xl bg-gradient-to-tr ${activeOffer.colorFrom} ${activeOffer.colorTo} p-[2px] shadow-md`}>
                <div className="w-full h-full bg-white rounded-[10px] flex items-center justify-center">
                  <span className={`text-xl font-black text-transparent bg-clip-text bg-gradient-to-tr ${activeOffer.colorFrom} ${activeOffer.colorTo}`}>%</span>
                </div>
              </div>
              <div className="flex flex-col">
                <span className={`font-black uppercase tracking-wider text-sm text-transparent bg-clip-text bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo}`}>{activeOffer.badge}</span>
                <span className="text-gray-400 text-xs font-bold tracking-widest uppercase">{isRTL ? 'ميديا جو 2026' : 'MEDIAJO 2026'}</span>
              </div>
            </div>

            {/* العنوان العملاق المتراص (Massive Stacked Typography) */}
            <h2 className="flex flex-col gap-0 mb-6 relative">
              <span className="text-[3.5rem] sm:text-[4rem] md:text-[6.5rem] font-black text-[#1e2022] leading-[0.85] tracking-tighter uppercase drop-shadow-sm">
                {activeOffer.title1}
              </span>
              <span className={`text-[3.2rem] sm:text-[3.5rem] md:text-[5.5rem] font-black text-transparent bg-clip-text bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo} leading-[0.9] tracking-tighter uppercase`}>
                {activeOffer.title2}
              </span>
            </h2>

            {/* الوصف القصير في فقاعة أنيقة */}
            <p className="text-gray-600 text-base md:text-lg max-w-sm font-medium leading-relaxed mb-8 bg-gray-50/80 backdrop-blur-sm p-4 rounded-2xl border border-gray-100 shadow-sm">
              {activeOffer.desc}
            </p>

            {/* السعر وزر الشراء */}
            <div className="flex items-center gap-6 mt-auto">
              <div className="flex flex-col">
                <span className="text-gray-400 line-through text-sm font-bold mb-1">{activeOffer.oldPrice} JOD</span>
                <span className="text-4xl font-black text-[#1e2022] leading-none">{activeOffer.newPrice}</span>
              </div>
              
              <Link 
                to="/products" 
                className={`flex items-center gap-2 px-8 py-4 bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo} text-white font-black uppercase tracking-widest rounded-full hover:scale-105 transition-transform shadow-[0_15px_30px_${activeOffer.shadowColor}]`}
              >
                {isRTL ? 'شراء' : 'BUY NOW'}
                <ArrowUpRight className={`w-5 h-5 ${isRTL ? '-scale-x-100' : ''}`} />
              </Link>
            </div>
          </div>

        </div>

        {/* أزرار التنقل السفلية المستقلة (Light Style) */}
        <div className="flex items-center justify-between mt-8 max-w-[85rem] mx-auto px-4">
          <div className="flex gap-3">
            {offersList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full h-1.5 ${currentSlide === index ? `w-12 bg-gradient-to-r ${activeOffer.colorFrom} ${activeOffer.colorTo}` : 'w-4 bg-gray-200 hover:bg-gray-300'}`}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
          
          <div className="flex gap-2">
            <button 
              onClick={isRTL ? nextSlide : prevSlide}
              className="w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-700 shadow-sm transition-all hover:scale-105 hover:shadow-md"
            >
              <ChevronLeft className="w-5 h-5" />
            </button>
            <button 
              onClick={isRTL ? prevSlide : nextSlide}
              className="w-12 h-12 bg-white hover:bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-700 shadow-sm transition-all hover:scale-105 hover:shadow-md"
            >
              <ChevronRight className="w-5 h-5" />
            </button>
          </div>
        </div>

      </div>
    </section>
  );
}