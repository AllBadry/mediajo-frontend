import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight, ArrowRight, ArrowLeft, ShieldCheck, Zap, TrendingUp, Check } from 'lucide-react';

export default function Offers() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  const offers = [
    {
      id: 1,
      title: isRTL ? 'باقة وكالات السوشال ميديا' : 'Social Media Agency',
      desc: isRTL 
        ? 'مزيج متكامل من 20K متابع انستغرام و 50K مشاهدة ريلز لدعم الثقة.' 
        : '20K IG Followers + 50K Reels Views to build absolute trust.',
      price: '65.00',
      oldPrice: '120.00',
      currency: 'JOD',
      features: isRTL ? ['حسابات عالية الجودة', 'ضمان 30 يوم', 'تنفيذ فوري'] : ['HQ Accounts', '30-Day Warranty', 'Instant Start'],
      // نمط جوجل: أزرق (ثقة) وأصفر (تنبيه/طاقة)
      mainColor: 'bg-blue-600',
      textColor: 'text-blue-600',
      badgeText: isRTL ? 'الأكثر مبيعاً' : 'Best Seller',
      colSpan: 'lg:col-span-8',
      icon: ShieldCheck,
      geometricShape: (
        <>
          <div className="absolute -top-32 -right-32 w-80 h-80 bg-blue-500 rounded-full opacity-10 group-hover:scale-110 transition-transform duration-700 ease-out"></div>
          <div className={`absolute bottom-0 ${isRTL ? 'left-10' : 'right-10'} w-24 h-12 bg-yellow-400 rounded-t-full opacity-90 transform translate-y-6 group-hover:translate-y-2 transition-transform duration-500`}></div>
        </>
      )
    },
    {
      id: 2,
      title: isRTL ? 'الانتشار العربي' : 'Arab Reach',
      desc: isRTL 
        ? '10,000 متابع فيسبوك عربي حقيقي لتعزيز مصداقية صفحتك.' 
        : '10K Real Arab Facebook followers for page credibility.',
      price: '56.00',
      oldPrice: '80.00',
      currency: 'JOD',
      features: isRTL ? ['عرب 100%', 'أمان تام للصفحة'] : ['100% Arab', 'Page Safe'],
      // نمط جوجل: أخضر (نمو، أمان)
      mainColor: 'bg-green-500',
      textColor: 'text-green-600',
      badgeText: isRTL ? 'موثوق' : 'Trusted',
      colSpan: 'lg:col-span-4',
      icon: TrendingUp,
      geometricShape: (
        <div className={`absolute -bottom-16 ${isRTL ? '-right-16' : '-left-16'} w-48 h-48 bg-green-50 rounded-full border-[20px] border-green-500 opacity-20 group-hover:scale-125 transition-transform duration-700 ease-out`}></div>
      )
    },
    {
      id: 3,
      title: isRTL ? 'صاروخ الإكسبلور' : 'Explore Rocket',
      desc: isRTL 
        ? '100,000 مشاهدة تيك توك + لايكات لزيادة فرص الظهور.' 
        : '100K TikTok Views + Likes to boost explore chances.',
      price: '18.00',
      oldPrice: '35.00',
      currency: 'JOD',
      features: isRTL ? ['سرعة فائقة', 'تفاعل حقيقي'] : ['Super Fast', 'Real Interaction'],
      // نمط جوجل: أحمر (عاجل، ساخن)
      mainColor: 'bg-red-500',
      textColor: 'text-red-600',
      badgeText: isRTL ? 'عرض سريع' : 'Flash Deal',
      colSpan: 'lg:col-span-12',
      icon: Zap,
      geometricShape: (
        <>
          <div className={`absolute top-0 ${isRTL ? 'left-0' : 'right-0'} w-32 h-full bg-red-50 opacity-50 transform ${isRTL ? '-skew-x-12 -translate-x-10' : 'skew-x-12 translate-x-10'} group-hover:scale-110 transition-transform duration-700`}></div>
          <div className={`absolute top-1/2 -translate-y-1/2 ${isRTL ? 'left-20' : 'right-20'} w-16 h-16 bg-red-500 rounded-lg rotate-45 opacity-10 group-hover:rotate-90 transition-transform duration-700`}></div>
        </>
      )
    }
  ];

  return (
    <section dir={t.dir} className="w-full py-20 md:py-28 px-4 md:px-8 bg-[#fafbfc] border-t border-gray-200 font-sans">
      <div className="max-w-[85rem] mx-auto">
        
        {/* الترويسة (Header) - جدية ومباشرة */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12">
          <div>
            <div className="flex items-center gap-3 mb-4">
              <div className="w-3 h-3 bg-red-500 rounded-full animate-pulse"></div>
              <span className="text-sm font-bold tracking-widest uppercase text-gray-900">
                {isRTL ? 'عروض حصرية محدودة' : 'Limited Exclusive Offers'}
              </span>
            </div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-[#202124] tracking-tight leading-none">
              {isRTL ? 'باقات النمو.' : 'Growth Packages.'} <br />
              <span className="text-gray-500">{isRTL ? 'أسعار لا تُنافس.' : 'Unbeatable prices.'}</span>
            </h2>
          </div>
          
          <Link to="/products" className="inline-flex items-center gap-2 font-bold text-blue-600 hover:text-blue-800 transition-colors group">
            {isRTL ? 'عرض جميع الخدمات' : 'View All Services'}
            {isRTL ? (
              <ArrowLeft className="w-5 h-5 transition-transform group-hover:-translate-x-1" />
            ) : (
              <ArrowRight className="w-5 h-5 transition-transform group-hover:translate-x-1" />
            )}
          </Link>
        </div>

        {/* شبكة العروض (Bento Grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {offers.map((offer) => {
            const Icon = offer.icon;
            return (
              <div 
                key={offer.id}
                className={`${offer.colSpan} group relative bg-white border border-gray-200 rounded-[2rem] overflow-hidden flex flex-col justify-between transition-all duration-300 hover:shadow-[0_20px_40px_rgba(0,0,0,0.06)] hover:border-gray-300`}
              >
                {/* الأشكال الهندسية الخلفية (Google Geometry) */}
                <div className="absolute inset-0 pointer-events-none overflow-hidden z-0">
                  {offer.geometricShape}
                </div>

                <div className="relative z-10 p-8 md:p-10 flex flex-col h-full">
                  
                  {/* رأس الكرت (الشارة والأيقونة) */}
                  <div className="flex justify-between items-start mb-8">
                    <span className={`inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest text-white ${offer.mainColor}`}>
                      {offer.badgeText}
                    </span>
                    <div className={`p-3 rounded-2xl bg-gray-50 border border-gray-100 ${offer.textColor}`}>
                      <Icon className="w-6 h-6" />
                    </div>
                  </div>

                  {/* معلومات العرض */}
                  <div className="mb-8">
                    <h3 className="text-3xl md:text-4xl font-black text-[#202124] mb-4 tracking-tight leading-tight">
                      {offer.title}
                    </h3>
                    <p className="text-gray-600 text-lg font-medium leading-relaxed max-w-[90%]">
                      {offer.desc}
                    </p>
                  </div>

                  {/* الميزات (بشكل جدي ونظيف) */}
                  <div className={`flex flex-wrap gap-4 mb-10 ${offer.id === 3 ? 'lg:w-1/2' : ''}`}>
                    {offer.features.map((feat, idx) => (
                      <div key={idx} className="flex items-center gap-2 text-sm font-bold text-gray-700 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                        <Check className={`w-4 h-4 ${offer.textColor}`} />
                        {feat}
                      </div>
                    ))}
                  </div>

                  {/* قسم السعر والشراء (أسفل الكرت) */}
                  <div className="mt-auto flex flex-col sm:flex-row sm:items-end justify-between gap-6 pt-8 border-t border-gray-100">
                    <div className="flex flex-col">
                      <span className="text-gray-400 line-through text-sm font-bold mb-1">{offer.oldPrice} {offer.currency}</span>
                      <div className="flex items-baseline gap-1">
                        <span className={`text-5xl font-black tracking-tighter ${offer.textColor}`}>
                          {offer.price.split('.')[0]}
                        </span>
                        <span className="text-2xl font-black text-gray-900">
                          .{offer.price.split('.')[1]}
                        </span>
                        <span className="text-gray-500 font-bold ml-1">{offer.currency}</span>
                      </div>
                    </div>
                    
                    <Link 
                      to="/products"
                      className={`inline-flex items-center justify-center gap-2 px-8 py-4 rounded-xl text-white font-bold uppercase tracking-wider transition-all duration-300 hover:-translate-y-1 shadow-sm hover:shadow-md ${offer.mainColor}`}
                    >
                      {isRTL ? 'شراء العرض' : 'Purchase'}
                      <ArrowUpRight className={`w-5 h-5 ${isRTL ? '-scale-x-100' : ''}`} />
                    </Link>
                  </div>

                </div>
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
}