import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight, Sparkles, Zap, Flame, CheckCircle2 } from 'lucide-react';

export default function Offers() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  const [currentSlide, setCurrentSlide] = useState(0);

  const offersList = [
    {
      id: 1,
      titleTop: isRTL ? 'وكالات' : 'AGENCY',
      titleBottom: isRTL ? 'السوشال ميديا' : 'BUNDLE',
      desc: isRTL 
        ? 'الكومبو الأقوى لحسابك: 20,000 متابع انستغرام + 50,000 مشاهدة ريلز.'
        : 'The ultimate combo: 20K IG Followers + 50K Reels Views.',
      features: isRTL ? ['حسابات بجودة عالية', 'ضمان تعويض 30 يوم'] : ['HQ Accounts', '30-Day Refill'],
      price: '65.00',
      oldPrice: '120.00',
      // ألوان المجسمات الهندسية للعرض الأول (حار: برتقالي/وردي)
      shapeRing: 'border-orange-400',
      shapePill: 'from-pink-500 to-rose-400',
      shapeCircle: 'from-orange-400 to-amber-300',
      textColor: 'text-rose-500',
      icon: Flame
    },
    {
      id: 2,
      titleTop: isRTL ? 'الانتشار' : 'ARAB',
      titleBottom: isRTL ? 'العربي' : 'REACH',
      desc: isRTL 
        ? 'استهدف الجمهور العربي بقوة مع 10,000 متابع حقيقي لصفحتك.'
        : 'Target the Arab audience with 10K real page followers.',
      features: isRTL ? ['عرب 100% حقيقيون', 'أمان تام للصفحة'] : ['100% Real Arab', 'Completely Page Safe'],
      price: '56.00',
      oldPrice: '80.00',
      // ألوان المجسمات الهندسية للعرض الثاني (بارد: أزرق/سماوي)
      shapeRing: 'border-blue-400',
      shapePill: 'from-blue-500 to-cyan-400',
      shapeCircle: 'from-indigo-400 to-purple-400',
      textColor: 'text-blue-600',
      icon: Zap
    },
    {
      id: 3,
      titleTop: isRTL ? 'صاروخ' : 'EXPLORE',
      titleBottom: isRTL ? 'الإكسبلور' : 'ROCKET',
      desc: isRTL 
        ? 'دفعة قوية للفيديو الخاص بك: 100,000 مشاهدة + 5,000 لايك.'
        : 'Massive push for your video: 100K Views + 5K Likes.',
      features: isRTL ? ['سرعة تنفيذ فائقة', 'تفاعل حقيقي ونشط'] : ['Super Fast Delivery', 'Real Active Interaction'],
      price: '18.00',
      oldPrice: '35.00',
      // ألوان المجسمات الهندسية للعرض الثالث (غامض: بنفسجي/وردي)
      shapeRing: 'border-purple-400',
      shapePill: 'from-purple-600 to-violet-500',
      shapeCircle: 'from-fuchsia-500 to-pink-500',
      textColor: 'text-purple-600',
      icon: Sparkles
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === offersList.length - 1 ? 0 : prev + 1));
    }, 6000); 
    return () => clearInterval(timer);
  }, [offersList.length]);

  const activeOffer = offersList[currentSlide];
  const ActiveIcon = activeOffer.icon;

  return (
    <section dir={t.dir} className="relative w-full py-20 md:py-28 px-4 md:px-8 bg-[#fafbfc] overflow-hidden font-sans border-t border-gray-100">
      
      {/* =======================================
          مجسمات الخلفية الملموسة (Concrete Geometric Background)
          أشكال هندسية حادة الأطراف وواضحة المعالم تطفو كديكور مسرحي
          ======================================= */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden">
        
        {/* 1. حلقة ضخمة مفرغة (Torus Ring) */}
        <div 
          className={`absolute w-[400px] h-[400px] md:w-[600px] md:h-[600px] rounded-full border-[30px] md:border-[50px] ${activeOffer.shapeRing} opacity-20 transition-colors duration-1000 animate-[spinSlow_40s_linear_infinite] shadow-xl`}
          style={{ top: '-10%', right: '-10%' }}
        ></div>

        {/* 2. كبسولة هندسية مائلة (Elongated Pill) */}
        <div 
          className={`absolute w-[120px] md:w-[180px] h-[400px] md:h-[600px] rounded-[100px] bg-gradient-to-t ${activeOffer.shapePill} opacity-30 transition-colors duration-1000 animate-[floatObj_8s_ease-in-out_infinite] shadow-2xl border border-white/50 backdrop-blur-sm`}
          style={{ bottom: '-15%', left: '15%', transform: 'rotate(-35deg)' }}
        ></div>

        {/* 3. دائرة صلبة صغيرة (Solid Sphere) */}
        <div 
          className={`absolute w-[150px] h-[150px] md:w-[250px] md:h-[250px] rounded-full bg-gradient-to-tr ${activeOffer.shapeCircle} opacity-40 transition-colors duration-1000 animate-[floatObj_10s_ease-in-out_infinite_reverse] shadow-2xl border border-white/50 backdrop-blur-sm`}
          style={{ top: '25%', left: '45%' }}
        ></div>

        {/* فلتر تشتت خفيف لدمج المجسمات مع الخلفية بشكل أنيق (بدون تضييع حوافها) */}
        <div className="absolute inset-0 bg-white/30 backdrop-blur-[2px]"></div>
      </div>

      <div className="max-w-[85rem] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24">
        
        {/* =======================================
            الجزء الأيمن (النصوص والطباعة العملاقة)
            ======================================= */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-md border border-gray-200 rounded-full mb-8 shadow-sm w-max">
            <ActiveIcon className={`w-5 h-5 ${activeOffer.textColor}`} />
            <span className="text-sm font-bold tracking-widest uppercase text-gray-800">
              {isRTL ? 'عروض حصرية 2026' : 'EXCLUSIVE OFFERS 2026'}
            </span>
          </div>

          <div className="relative mb-8">
            <h2 className="flex flex-col gap-0 select-none">
              <span className="text-[4rem] sm:text-[5.5rem] lg:text-[7rem] font-black text-[#1e2022] leading-[0.85] tracking-tighter drop-shadow-sm uppercase">
                {activeOffer.titleTop}
              </span>
              <span className={`text-[3.2rem] sm:text-[4.5rem] lg:text-[5.5rem] font-black ${activeOffer.textColor} leading-[0.9] tracking-tighter uppercase drop-shadow-sm`}>
                {activeOffer.titleBottom}
              </span>
            </h2>
          </div>

          <p className="text-gray-600 text-lg md:text-xl font-medium leading-relaxed max-w-md mb-8">
            {activeOffer.desc}
          </p>

          <div className="flex flex-col gap-3 mb-10">
            {activeOffer.features.map((feat, idx) => (
              <div key={idx} className="flex items-center gap-3">
                <CheckCircle2 className={`w-5 h-5 ${activeOffer.textColor}`} />
                <span className="text-gray-700 font-semibold">{feat}</span>
              </div>
            ))}
          </div>

          <div className="flex items-center gap-4">
            {offersList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full h-2 ${currentSlide === index ? `w-16 bg-gradient-to-r ${activeOffer.shapePill} shadow-md` : 'w-4 bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to offer ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* =======================================
            الجزء الأيسر (بطاقة الشراء الزجاجية الأنيقة)
            ======================================= */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          
          <div className="relative w-full max-w-sm bg-white/60 backdrop-blur-xl border border-white rounded-[3rem] p-10 shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col items-center text-center transform transition-transform duration-700 hover:-translate-y-2">
            
            <div className="w-20 h-20 rounded-full bg-white shadow-lg flex items-center justify-center mb-8 border border-gray-100">
              <ActiveIcon className={`w-10 h-10 ${activeOffer.textColor}`} />
            </div>

            <span className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">{isRTL ? 'السعر الشامل' : 'TOTAL PRICE'}</span>
            
            <div className="mb-2">
              <span className="text-gray-400 line-through text-lg font-bold">{activeOffer.oldPrice} JOD</span>
            </div>
            
            <div className="flex items-start justify-center gap-1 mb-10">
              <span className="text-6xl font-black text-gray-900 tracking-tighter leading-none">{activeOffer.price.split('.')[0]}</span>
              <div className="flex flex-col items-start justify-start mt-1">
                <span className="text-2xl font-black text-gray-900 leading-none">.{activeOffer.price.split('.')[1]}</span>
                <span className={`text-sm font-bold mt-1 ${activeOffer.textColor}`}>JOD</span>
              </div>
            </div>

            <Link 
              to="/products" 
              className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-white font-black uppercase tracking-wider transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 bg-gradient-to-r ${activeOffer.shapePill}`}
            >
              {isRTL ? 'اطلب العرض' : 'CLAIM OFFER'}
              <ArrowUpRight className={`w-6 h-6 ${isRTL ? '-scale-x-100' : ''}`} />
            </Link>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes floatObj {
          0%, 100% { transform: translateY(0) rotate(-35deg); }
          50% { transform: translateY(-30px) rotate(-30deg); }
        }
        @keyframes spinSlow {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
      `}</style>
    </section>
  );
}