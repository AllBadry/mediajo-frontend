import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight, Plus, Sparkles, TrendingUp, Flame } from 'lucide-react';

export default function Offers() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  const offers = [
    {
      id: 1,
      tag: isRTL ? 'باقة متكاملة' : 'FULL BUNDLE',
      title: isRTL ? 'وكالات السوشال ميديا' : 'Social Media Agency',
      desc: isRTL 
        ? 'مزيج متكامل من 20K متابع انستغرام و 50K مشاهدة ريلز.' 
        : '20K IG Followers + 50K Reels Views.',
      price: '65.00',
      currency: 'JOD',
      icon: Flame,
      // ألوان الفن التجريدي السفلي (مستوحى من الألوان الدافئة والبنفسجية)
      artBg: 'bg-[#0f0c29]',
      artGradients: (
        <>
          <div className="absolute top-0 right-0 w-48 h-48 bg-gradient-to-bl from-orange-400 to-pink-500 rounded-full mix-blend-screen filter blur-[30px] opacity-80 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-violet-600 to-indigo-600 rounded-full mix-blend-screen filter blur-[40px] opacity-80 group-hover:translate-x-4 transition-transform duration-700"></div>
          {/* محاكاة شكل ثلاثي الأبعاد (Glass/3D Wave) */}
          <div className="absolute inset-0 bg-[linear-gradient(105deg,transparent_20%,rgba(255,255,255,0.1)_25%,transparent_30%)]"></div>
        </>
      )
    },
    {
      id: 2,
      tag: isRTL ? 'نمو الجمهور' : 'AUDIENCE GROWTH',
      title: isRTL ? 'الانتشار العربي' : 'Arab Reach',
      desc: isRTL 
        ? '10,000 متابع فيسبوك عربي حقيقي لتعزيز ثقة عملائك.' 
        : '10K Real Arab Facebook followers for page credibility.',
      price: '56.00',
      currency: 'JOD',
      icon: TrendingUp,
      // ألوان الفن التجريدي السفلي (أخضر وأزرق متداخل)
      artBg: 'bg-[#0f172a]',
      artGradients: (
        <>
          <div className="absolute -bottom-10 right-0 w-64 h-64 bg-gradient-to-tl from-emerald-400 to-teal-500 rounded-full mix-blend-screen filter blur-[40px] opacity-90 group-hover:scale-110 transition-transform duration-700"></div>
          <div className="absolute top-0 left-0 w-40 h-40 bg-gradient-to-br from-blue-500 to-cyan-400 rounded-full mix-blend-screen filter blur-[30px] opacity-70 group-hover:-translate-y-4 transition-transform duration-700"></div>
          <div className="absolute inset-0 bg-[linear-gradient(75deg,transparent_40%,rgba(255,255,255,0.05)_50%,transparent_60%)]"></div>
        </>
      )
    },
    {
      id: 3,
      tag: isRTL ? 'دعم الخوارزميات' : 'ALGORITHM BOOST',
      title: isRTL ? 'صاروخ الإكسبلور' : 'Explore Rocket',
      desc: isRTL 
        ? '100,000 مشاهدة تيك توك لدفع فيديوهاتك للترند السريع.' 
        : '100K TikTok Views to push your videos to the trends.',
      price: '18.00',
      currency: 'JOD',
      icon: Sparkles,
      // ألوان الفن التجريدي السفلي (ألوان نيون نابضة)
      artBg: 'bg-[#1a0b2e]',
      artGradients: (
        <>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-gradient-to-r from-fuchsia-600 via-pink-500 to-rose-500 mix-blend-screen filter blur-[50px] opacity-60 group-hover:opacity-80 transition-opacity duration-700"></div>
          {/* خطوط تمثل تأثير السرعة (Speed Lines/Glass lines) */}
          <div className="absolute inset-0 opacity-20" style={{ backgroundImage: 'repeating-linear-gradient(90deg, transparent, transparent 10px, rgba(255,255,255,0.2) 10px, rgba(255,255,255,0.2) 11px)' }}></div>
        </>
      )
    }
  ];

  return (
    <section dir={t.dir} className="w-full py-24 md:py-32 px-6 md:px-12 bg-[#fafbfc] border-t border-gray-100 font-sans">
      <div className="max-w-[85rem] mx-auto">
        
        {/* الترويسة (Header) - بأسلوب Sleek & Minimal */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="max-w-2xl">
            <h2 className="text-4xl md:text-5xl lg:text-[3.5rem] font-medium text-[#1e2022] tracking-tight leading-[1.1] mb-6">
              {isRTL ? 'أحدث العروض الحصرية' : 'Latest Exclusive Offers'} <br />
              <span className="text-gray-400 font-light">
                {isRTL ? 'نمو استثنائي بميزانية ذكية.' : 'Exceptional growth, smart budget.'}
              </span>
            </h2>
          </div>
          
          <Link to="/products" className="inline-flex items-center gap-2 font-medium text-gray-900 hover:text-blue-600 transition-colors group pb-2 border-b border-gray-300 hover:border-blue-600">
            {isRTL ? 'اكتشف جميع الخدمات' : 'Discover all services'}
            <ArrowUpRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isRTL ? '-scale-x-100' : ''}`} />
          </Link>
        </div>

        {/* شبكة البطاقات (Cards Grid) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-10">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div 
                key={offer.id}
                className="group relative bg-white rounded-[2rem] overflow-hidden flex flex-col h-[500px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500"
              >
                
                {/* 1. النصف العلوي: المحتوى النصي (Minimalist Text Area) */}
                <div className="p-8 flex flex-col flex-1 bg-white relative z-10">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-600 mb-4 block">
                      {offer.tag}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-3 tracking-tight leading-snug">
                      {offer.title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-light">
                      {offer.desc}
                    </p>
                  </div>
                  
                  {/* السعر */}
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900 tracking-tighter">
                        {offer.price}
                      </span>
                      <span className="text-sm font-medium text-gray-400 ml-1">{offer.currency}</span>
                    </div>
                  </div>
                </div>

                {/* زر عائم يربط بين النصفين (Floating Action Button) */}
                <div className={`absolute ${isRTL ? 'left-8' : 'right-8'} top-[53%] -translate-y-1/2 z-20`}>
                  <Link 
                    to="/products"
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300"
                  >
                    <Plus className="w-6 h-6" />
                  </Link>
                </div>

                {/* 2. النصف السفلي: الفن التجريدي (Vibrant 3D/Fluid Abstract Art) */}
                <div className={`relative h-[45%] w-full ${offer.artBg} overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-700 ease-out`}>
                  {offer.artGradients}
                  
                  {/* تراكب زجاجي خفيف لجعل الألوان تندمج بأناقة */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
                </div>

              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}