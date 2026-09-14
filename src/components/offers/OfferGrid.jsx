import React, { useEffect, useState } from 'react';
import { CheckCircle2, BadgePercent, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../lib/axios';
import { resolveOfferIcon, resolveOfferTheme } from '../../data/offerUi.jsx';
import { useOfferOrder } from '../../hooks/useOfferOrder';
import OfferOrderModal from './OfferOrderModal';

// شبكة العروض داخل صفحة المنتجات (تصميم مختلف عن بطاقات الرئيسية)
export default function OfferGrid() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  const [offers, setOffers] = useState([]);
  const [loading, setLoading] = useState(true);

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
      })
      .finally(() => {
        if (mounted) setLoading(false);
      });
    return () => {
      mounted = false;
    };
  }, []);

  // التمرير التلقائي عند الوصول عبر رابط #offers وإتمام التحميل
  useEffect(() => {
    if (!loading && offers.length && window.location.hash === '#offers') {
      const el = document.getElementById('offers');
      if (el) {
        const top = el.getBoundingClientRect().top + window.scrollY - 88;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    }
  }, [loading, offers]);

  if (loading) {
    return (
      <section id="offers" className="relative w-full py-16 px-6 lg:px-12 bg-white border-b border-gray-100">
        <div className="max-w-[85rem] mx-auto flex items-center justify-center h-40 text-indigo-600">
          <Loader2 className="w-8 h-8 animate-spin" />
        </div>
      </section>
    );
  }

  if (!offers.length) return null;

  return (
    <section id="offers" className="relative w-full py-16 md:py-24 px-6 lg:px-12 bg-white border-b border-gray-100">
      <div className="max-w-[85rem] mx-auto">
        
        {/* الترويسة */}
        <div className="flex items-end justify-between gap-6 mb-10">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 bg-orange-50 text-orange-600 rounded-full text-xs font-bold mb-4 border border-orange-100">
              <BadgePercent className="w-4 h-4" />
              {isRTL ? 'عروض حصرية' : 'EXCLUSIVE OFFERS'}
            </div>
            <h2 className="text-3xl md:text-4xl font-black tracking-tight text-gray-900 mb-2">
              {t.products.offersTitle}
            </h2>
            <p className="text-gray-500 font-medium max-w-xl">{t.products.offersSub}</p>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {offers.map((offer) => {
            const Icon = resolveOfferIcon(offer.iconKey);
            const theme = resolveOfferTheme(offer.themeKey);
            const title = isRTL ? offer.nameAr || offer.name : offer.name;
            const desc = isRTL ? offer.descAr || offer.desc : offer.desc;
            const features = isRTL
              ? offer.featuresAr?.length
                ? offer.featuresAr
                : offer.features || []
              : offer.features || [];
            const price = Number(offer.price);
            const oldPrice = Number(offer.oldPrice);
            const discountPercent =
              oldPrice > price && oldPrice > 0
                ? Math.round(((oldPrice - price) / oldPrice) * 100)
                : 0;

            return (
              <div
                key={offer._id}
                className="group flex flex-col bg-gradient-to-b from-gray-50 to-white border border-gray-100 rounded-[2rem] p-7 hover:shadow-[0_20px_60px_rgba(0,0,0,0.08)] hover:border-gray-200 transition-all duration-500"
              >
                {/* الرأس: الأيقونة + المخطط + خصم */}
                <div className="flex items-start justify-between gap-4 mb-5">
                  <div className={`w-14 h-14 ${theme.bg} rounded-2xl flex items-center justify-center text-white shadow-lg shrink-0`}>
                    <Icon className="w-7 h-7" />
                  </div>
                  {discountPercent > 0 && (
                    <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-red-50 text-red-600 rounded-full text-xs font-black">
                      -{discountPercent}%
                    </span>
                  )}
                </div>

                <h3 className="text-xl font-black text-gray-900 tracking-tight mb-1.5">{title}</h3>
                {desc && <p className="text-sm text-gray-500 font-medium leading-relaxed mb-4">{desc}</p>}

                {/* المزايا */}
                {features.length > 0 && (
                  <ul className="space-y-2 mb-5">
                    {features.slice(0, 4).map((f, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-gray-600 font-medium">
                        <CheckCircle2 className="w-4 h-4 text-emerald-500 shrink-0 mt-0.5" />
                        <span>{f}</span>
                      </li>
                    ))}
                  </ul>
                )}

                <div className="mt-auto">
                  {/* السعر */}
                  <div className="flex items-baseline gap-2 mb-4">
                    <span className="text-3xl font-black text-gray-900 tracking-tighter">
                      {price.toFixed(2)}
                    </span>
                    <span className="text-sm font-bold text-gray-400">JOD</span>
                    {oldPrice > price && (
                      <span className="text-sm font-medium text-gray-400 line-through decoration-red-400 decoration-2">
                        {oldPrice.toFixed(2)}
                      </span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => requestOffer(offer)}
                    className="w-full py-3.5 px-6 bg-[#1e2022] hover:bg-black text-white rounded-full font-bold text-sm transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.12)] cursor-pointer"
                  >
                    {isRTL ? 'اطلب العرض' : 'Order offer'}
                  </button>
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