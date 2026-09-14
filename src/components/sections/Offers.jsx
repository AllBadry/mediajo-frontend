import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { ArrowUpRight, Plus } from 'lucide-react';
import api from '../../lib/axios';
import { resolveOfferIcon, resolveOfferTheme } from '../../data/offerUi.jsx';
import { useOfferOrder } from '../../hooks/useOfferOrder';
import OfferOrderModal from '../offers/OfferOrderModal';

export default function Offers() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  const [offers, setOffers] = useState([]);

  const { pendingOffer, requestOffer, confirmOffer, closeOffer } = useOfferOrder();

  useEffect(() => {
    let mounted = true;
    api
      .get('/offers')
      .then(({ data }) => {
        if (mounted) setOffers(data?.data?.offers || []);
      })
      .catch(() => {
        if (mounted) setOffers([]);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // إخفاء القسم بالكامل عند عدم وجود عروض نشطة
  if (!offers.length) return null;

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
            const Icon = resolveOfferIcon(offer.iconKey);
            const theme = resolveOfferTheme(offer.themeKey);
            const title = isRTL ? offer.nameAr || offer.name : offer.name;
            const desc = isRTL ? offer.descAr || offer.desc : offer.desc;
            const tag =
              (isRTL
                ? offer.featuresAr?.[0] || offer.features?.[0]
                : offer.features?.[0]) ||
              (isRTL ? 'عرض مميز' : 'FEATURED OFFER');
            return (
              <div 
                key={offer._id}
                className="group relative bg-white rounded-[2rem] overflow-hidden flex flex-col h-[500px] border border-gray-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:shadow-[0_20px_50px_rgb(0,0,0,0.1)] transition-all duration-500"
              >
                
                {/* 1. النصف العلوي: المحتوى النصي (Minimalist Text Area) */}
                <div className="p-8 flex flex-col flex-1 bg-white relative z-10">
                  <div className="mb-6">
                    <span className="text-[10px] font-bold tracking-[0.2em] uppercase text-blue-600 mb-4 block">
                      {tag}
                    </span>
                    <h3 className="text-2xl lg:text-3xl font-medium text-gray-900 mb-3 tracking-tight leading-snug">
                      {title}
                    </h3>
                    <p className="text-sm text-gray-500 leading-relaxed font-light">
                      {desc}
                    </p>
                  </div>
                  
                  {/* السعر */}
                  <div className="mt-auto">
                    <div className="flex items-baseline gap-1">
                      <span className="text-3xl font-bold text-gray-900 tracking-tighter">
                        {Number(offer.price).toFixed(2)}
                      </span>
                      <span className="text-sm font-medium text-gray-400 ml-1">JOD</span>
                      {offer.oldPrice && Number(offer.oldPrice) > Number(offer.price) && (
                        <span className="text-sm font-medium text-gray-400 ml-1 line-through decoration-red-400 decoration-2">
                          {Number(offer.oldPrice).toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* زر عائم يربط بين النصفين (Floating Action Button) */}
                <div className={`absolute ${isRTL ? 'left-8' : 'right-8'} top-[53%] -translate-y-1/2 z-20`}>
                  <button
                    type="button"
                    onClick={() => requestOffer(offer)}
                    className="w-12 h-12 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg hover:bg-blue-700 hover:scale-110 transition-all duration-300 cursor-pointer"
                    aria-label={isRTL ? 'أضف العرض' : 'Add offer'}
                  >
                    <Plus className="w-6 h-6" />
                  </button>
                </div>

                {/* 2. النصف السفلي: الفن التجريدي (Vibrant 3D/Fluid Abstract Art) */}
                <div className={`relative h-[45%] w-full ${theme.bg} overflow-hidden transform group-hover:scale-[1.02] transition-transform duration-700 ease-out`}>
                  {theme.gradients}
                  
                  {/* أيقونة العرض في الزاوية */}
                  <div className="absolute bottom-6 left-6 rtl:left-auto rtl:right-6 z-10">
                    <Icon className="w-8 h-8 text-white/80" />
                  </div>

                  {/* تراكب زجاجي خفيف لجعل الألوان تندمج بأناقة */}
                  <div className="absolute inset-0 bg-white/5 backdrop-blur-[2px]"></div>
                </div>

              </div>
            );
          })}
        </div>

      </div>

      <OfferOrderModal
        offer={pendingOffer}
        onConfirm={confirmOffer}
        onClose={closeOffer}
      />
    </section>
  );
}