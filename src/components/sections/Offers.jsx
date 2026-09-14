import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight, Sparkles, Zap, Flame, CheckCircle2 } from 'lucide-react';

export default function Offers() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  const [currentSlide, setCurrentSlide] = useState(0);

  // إعداد بيانات العروض مع تحديد لوحات لونية (Palettes) مطابقة للصور المرفقة
  const offersList = [
    {
      id: 1,
      titleTop: isRTL ? 'وكالات' : 'AGENCY',
      titleBottom: isRTL ? 'السوشال ميديا' : 'BUNDLE',
      desc: isRTL 
        ? 'الكومبو الأقوى لحسابك: 20,000 متابع انستغرام + 50,000 مشاهدة ريلز.'
        : 'The ultimate combo: 20K IG Followers + 50K Reels Views.',
      features: isRTL ? ['حسابات بجودة عالية', 'ضمان تعويض 30 يوم'] : ['HQ Accounts', '30-Day Refill Warranty'],
      price: '65.00',
      oldPrice: '120.00',
      // ألوان مستوحاة من الصورة الثانية (وردي، برتقالي، بنفسجي)
      blob1: 'bg-gradient-to-tr from-pink-500 to-rose-400',
      blob2: 'bg-gradient-to-br from-orange-400 to-amber-300',
      blob3: 'bg-gradient-to-bl from-purple-500 to-fuchsia-400',
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
      // ألوان مستوحاة من الصورة الأولى (أزرق فاتح، سماوي، بنفسجي ناعم)
      blob1: 'bg-gradient-to-tr from-blue-500 to-cyan-400',
      blob2: 'bg-gradient-to-br from-indigo-400 to-purple-400',
      blob3: 'bg-gradient-to-bl from-teal-300 to-emerald-300',
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
      // ألوان مستوحاة من الصورة الأخيرة (أحمر قرمزي، بنفسجي داكن، نيلي)
      blob1: 'bg-gradient-to-tr from-purple-600 to-violet-500',
      blob2: 'bg-gradient-to-br from-fuchsia-500 to-pink-500',
      blob3: 'bg-gradient-to-bl from-red-500 to-orange-500',
      textColor: 'text-purple-600',
      icon: Sparkles
    }
  ];

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev === offersList.length - 1 ? 0 : prev + 1));
    }, 6000); // تغيير العرض كل 6 ثواني
    return () => clearInterval(timer);
  }, [offersList.length]);

  const activeOffer = offersList[currentSlide];
  const ActiveIcon = activeOffer.icon;

  return (
    <section dir={t.dir} className="relative w-full py-20 md:py-28 px-4 md:px-8 bg-[#fdfdfd] overflow-hidden font-sans border-t border-gray-100">
      
      {/* 1. تأثيرات الخلفية الانسيابية (Fluid Gradient Blobs) التي تمثل الفن التجريدي */}
      <div className="absolute inset-0 w-full h-full pointer-events-none z-0 overflow-hidden flex items-center justify-center opacity-60 mix-blend-multiply">
        {/* نستخدم key لإجبار إعادة تشغيل الأنيميشن عند تغير العرض */}
        <div key={`blob1-${currentSlide}`} className={`absolute w-[40vw] h-[40vw] max-w-[600px] max-h-[600px] rounded-full blur-[80px] md:blur-[120px] ${activeOffer.blob1} animate-[blobFloat_10s_ease-in-out_infinite_alternate]`} style={{ top: '10%', left: '10%' }}></div>
        <div key={`blob2-${currentSlide}`} className={`absolute w-[35vw] h-[35vw] max-w-[500px] max-h-[500px] rounded-full blur-[80px] md:blur-[120px] ${activeOffer.blob2} animate-[blobFloat_12s_ease-in-out_infinite_alternate-reverse]`} style={{ bottom: '10%', right: '10%' }}></div>
        <div key={`blob3-${currentSlide}`} className={`absolute w-[30vw] h-[30vw] max-w-[450px] max-h-[450px] rounded-full blur-[80px] md:blur-[100px] ${activeOffer.blob3} animate-[blobFloat_8s_ease-in-out_infinite_alternate]`} style={{ top: '40%', left: '40%' }}></div>
      </div>

      <div className="max-w-[85rem] mx-auto relative z-10 flex flex-col md:flex-row items-center gap-12 md:gap-16 lg:gap-24">
        
        {/* =======================================
            الجزء الأيمن (النصوص والطباعة العملاقة)
            ======================================= */}
        <div className="w-full md:w-1/2 flex flex-col justify-center">
          
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-white/50 backdrop-blur-md border border-white/60 rounded-full mb-8 shadow-sm w-max">
            <ActiveIcon className={`w-5 h-5 ${activeOffer.textColor}`} />
            <span className="text-sm font-bold tracking-widest uppercase text-gray-800">
              {isRTL ? 'عروض حصرية 2026' : 'EXCLUSIVE OFFERS 2026'}
            </span>
          </div>

          {/* الطباعة العملاقة (Typography Overlap) */}
          <div className="relative mb-8">
            <h2 className="flex flex-col gap-0 select-none">
              <span className="text-[4.5rem] sm:text-[6rem] lg:text-[8rem] font-black text-transparent bg-clip-text bg-gradient-to-b from-gray-900 to-gray-600 leading-[0.85] tracking-tighter drop-shadow-sm uppercase">
                {activeOffer.titleTop}
              </span>
              <span className={`text-[3.5rem] sm:text-[5rem] lg:text-[6.5rem] font-black ${activeOffer.textColor} leading-[0.9] tracking-tighter uppercase drop-shadow-md`}>
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

          {/* التنقل بين العروض (Custom Pagination) */}
          <div className="flex items-center gap-4">
            {offersList.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentSlide(index)}
                className={`transition-all duration-500 rounded-full h-2 ${currentSlide === index ? `w-16 ${activeOffer.blob1} shadow-md` : 'w-4 bg-gray-300 hover:bg-gray-400'}`}
                aria-label={`Go to offer ${index + 1}`}
              />
            ))}
          </div>
        </div>

        {/* =======================================
            الجزء الأيسر (بطاقة الشراء الزجاجية)
            ======================================= */}
        <div className="w-full md:w-1/2 flex justify-center md:justify-end relative">
          
          {/* كرت الشراء الفاخر (Glassmorphism Effect) */}
          <div className="relative w-full max-w-sm bg-white/40 backdrop-blur-2xl border border-white/60 rounded-[3rem] p-10 shadow-[0_40px_80px_-20px_rgba(0,0,0,0.1)] flex flex-col items-center text-center transform transition-transform duration-700 hover:-translate-y-2">
            
            {/* لمعة زجاجية داخلية (Inner Reflection) */}
            <div className="absolute inset-0 rounded-[3rem] border-2 border-white/80 pointer-events-none"></div>
            <div className="absolute top-0 left-10 w-32 h-1 bg-gradient-to-r from-white/0 via-white to-white/0 opacity-80"></div>

            <div className="w-20 h-20 rounded-full bg-white shadow-xl flex items-center justify-center mb-8 border border-gray-100">
              <ActiveIcon className={`w-10 h-10 ${activeOffer.textColor}`} />
            </div>

            <span className="text-gray-500 font-bold uppercase tracking-widest text-sm mb-2">{isRTL ? 'السعر الشامل' : 'TOTAL PRICE'}</span>
            
            <div className="mb-2">
              <span className="text-gray-400 line-through text-lg font-medium">{activeOffer.oldPrice} JOD</span>
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
              className={`w-full py-5 rounded-2xl flex items-center justify-center gap-3 text-white font-black uppercase tracking-wider transition-all duration-300 hover:shadow-xl hover:scale-105 ${activeOffer.blob1}`}
            >
              {isRTL ? 'اطلب العرض' : 'CLAIM OFFER'}
              <ArrowUpRight className={`w-6 h-6 ${isRTL ? '-scale-x-100' : ''}`} />
            </Link>

            <p className="text-xs text-gray-500 font-medium mt-6">
              {isRTL ? 'ينتهي هذا العرض قريباً.' : 'This offer expires soon.'}
            </p>
          </div>
        </div>

      </div>

      <style>{`
        /* حركة الأشكال اللونية التجريدية */
        @keyframes blobFloat {
          0% { transform: translate(0, 0) scale(1) rotate(0deg); }
          33% { transform: translate(30px, -50px) scale(1.1) rotate(10deg); }
          66% { transform: translate(-20px, 20px) scale(0.9) rotate(-5deg); }
          100% { transform: translate(0, 0) scale(1) rotate(0deg); }
        }
      `}</style>
    </section>
  );
}