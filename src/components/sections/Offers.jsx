import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowRight, ArrowLeft, ArrowUpRight } from 'lucide-react';

export default function Offers() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  const offers = [
    {
      id: 1,
      title: isRTL ? 'وكالات السوشال ميديا' : 'Agency Bundle',
      desc: isRTL ? '20K انستغرام + 50K مشاهدات' : '20K IG Followers + 50K Views',
      price: '65',
      currency: 'JOD',
      // ستايل Google I/O: أزرق مع شكل كبسولة
      colorText: 'text-blue-600',
      bgShape: 'bg-blue-500',
      shapeClass: 'w-32 h-48 rounded-full -top-10 -right-10 group-hover:scale-[2.5] group-hover:-rotate-45',
    },
    {
      id: 2,
      title: isRTL ? 'الانتشار العربي' : 'Arab Reach',
      desc: isRTL ? '10,000 متابع فيسبوك حقيقي' : '10K Real Facebook Followers',
      price: '56',
      currency: 'JOD',
      // ستايل Google I/O: برتقالي مع شكل دائرة عملاقة
      colorText: 'text-orange-500',
      bgShape: 'bg-orange-400',
      shapeClass: 'w-40 h-40 rounded-full -bottom-10 -left-10 group-hover:scale-[2.5]',
    },
    {
      id: 3,
      title: isRTL ? 'صاروخ الإكسبلور' : 'Explore Rocket',
      desc: isRTL ? '100K مشاهدة تيك توك + لايكات' : '100K TikTok Views + Likes',
      price: '18',
      currency: 'JOD',
      // ستايل Google I/O: بنفسجي مع شكل نصف دائرة
      colorText: 'text-purple-600',
      bgShape: 'bg-purple-500',
      shapeClass: 'w-48 h-24 rounded-b-full top-0 left-1/2 -translate-x-1/2 group-hover:scale-[2.5] group-hover:translate-y-10',
    }
  ];

  return (
    <section dir={t.dir} className="w-full py-24 md:py-32 px-6 md:px-12 bg-[#fafbfc] overflow-hidden font-sans border-t border-gray-100 relative">
      
      {/* 1. أشكال هندسية عائمة في الخلفية (Google I/O Vibe) */}
      <div className="absolute top-10 left-10 w-4 h-4 rounded-full bg-blue-500 animate-[float_4s_ease-in-out_infinite]"></div>
      <div className="absolute bottom-20 right-20 w-6 h-6 bg-orange-400 rotate-45 animate-[float_6s_ease-in-out_infinite_reverse]"></div>
      <div className="absolute top-1/2 left-1/2 w-8 h-8 rounded-full border-4 border-purple-300 opacity-50 animate-[float_5s_ease-in-out_infinite]"></div>

      <div className="max-w-[85rem] mx-auto relative z-10">
        
        {/* 2. عنوان القسم (Minimalist Header) */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-16">
          <div className="flex items-center gap-4">
            {/* كبسولة العنوان */}
            <div className="px-6 py-3 bg-white border-2 border-gray-900 rounded-full inline-flex items-center shadow-[4px_4px_0px_0px_rgba(17,24,39,1)]">
              <h2 className="text-2xl md:text-4xl font-black text-gray-900 tracking-tight uppercase">
                {isRTL ? 'عروض حصرية' : 'Exclusive Deals'}
              </h2>
            </div>
            {/* دائرة تزيينية */}
            <div className="hidden md:block w-12 h-12 bg-blue-500 rounded-full animate-pulse"></div>
          </div>

          <Link to="/products" className="inline-flex items-center gap-2 font-bold text-gray-600 hover:text-gray-900 transition-colors group">
            {isRTL ? 'تصفح الكل' : 'View All'}
            {isRTL ? (
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-2" />
            ) : (
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-2" />
            )}
          </Link>
        </div>

        {/* 3. شبكة الكروت (Bento/Grid Layout) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {offers.map((offer) => (
            <div 
              key={offer.id}
              className="group relative bg-white border-2 border-gray-100 rounded-[2.5rem] p-8 md:p-10 overflow-hidden transition-all duration-500 hover:border-gray-200 hover:shadow-[0_20px_40px_-15px_rgba(0,0,0,0.1)] flex flex-col min-h-[380px]"
            >
              
              {/* الشكل الهندسي التفاعلي في الخلفية (Google Style Morphing) */}
              <div 
                className={`absolute ${offer.shapeClass} ${offer.bgShape} opacity-10 transition-all duration-700 ease-[cubic-bezier(0.34,1.56,0.64,1)] z-0`}
              ></div>

              {/* المحتوى */}
              <div className="relative z-10 flex flex-col h-full">
                
                {/* معلومات العرض */}
                <div className="mb-auto">
                  <h3 className="text-3xl font-black text-gray-900 mb-3 tracking-tight leading-tight group-hover:text-black transition-colors duration-300">
                    {offer.title}
                  </h3>
                  <p className="text-gray-500 font-medium text-lg leading-relaxed max-w-[90%]">
                    {offer.desc}
                  </p>
                </div>

                {/* السعر والزر */}
                <div className="mt-8 flex items-end justify-between">
                  <div className="flex items-start gap-1">
                    <span className={`text-6xl font-black tracking-tighter ${offer.colorText} transition-transform duration-500 group-hover:scale-110 origin-bottom-left`}>
                      {offer.price}
                    </span>
                    <span className="text-gray-400 font-bold tracking-widest mt-2">{offer.currency}</span>
                  </div>
                  
                  {/* زر دائري بسيط */}
                  <Link 
                    to="/products"
                    className={`w-14 h-14 rounded-full flex items-center justify-center bg-gray-50 group-hover:${offer.bgShape} group-hover:text-white text-gray-400 transition-all duration-500`}
                  >
                    <ArrowUpRight className={`w-6 h-6 ${isRTL ? '-scale-x-100' : ''}`} />
                  </Link>
                </div>

              </div>
            </div>
          ))}
        </div>

      </div>

      <style>{`
        @keyframes float {
          0%, 100% { transform: translateY(0) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(10deg); }
        }
      `}</style>
    </section>
  );
}