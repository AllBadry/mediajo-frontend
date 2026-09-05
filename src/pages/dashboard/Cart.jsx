import React, { useRef, useState } from 'react';
import { ShoppingCart, Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck, Headphones, MonitorPlay, Sparkles, PenTool, GraduationCap } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useCartStore, selectSubtotal, selectItemCount, SERVICE_FEE } from '../../store/cartStore';
import { useLanguage } from '../../context/LanguageContext';

// ==========================================
// مكونات أيقونات المنصات (SVG مخصصة محلية)
// ==========================================
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const Music2Icon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 18V5l12-2v13" />
    <circle cx="6" cy="18" r="3" />
    <circle cx="18" cy="16" r="3" />
  </svg>
);

const ClapperboardIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M20.2 6 3 11l-.9-2.4c-.3-1.1.3-2.2 1.3-2.5l13.5-4c1-.3 2.1.3 2.3 1.4l.9 2.5Z" />
    <path d="m5 13-1.4 7.7c-.2 1.1.6 2.1 1.7 2.3l13.5 2.7c1 .2 2-.6 2.2-1.6L22 13" />
    <path d="M7 13l1-6" />
    <path d="M13 11l1-6" />
  </svg>
);

// ==========================================
// علامات وألوان المنصات داخل السلة
// ==========================================
const toneMap = {
  instagram: { bg: 'bg-pink-50', color: 'text-pink-600', icon: <InstagramIcon className="w-5 h-5" /> },
  tiktok: { bg: 'bg-neutral-900', color: 'text-white', icon: <Music2Icon className="w-5 h-5" /> },
  youtube: { bg: 'bg-red-50', color: 'text-red-600', icon: <YoutubeIcon className="w-5 h-5" /> },
  facebook: { bg: 'bg-blue-50', color: 'text-blue-600', icon: <FacebookIcon className="w-5 h-5" /> },
  netflix: { bg: 'bg-red-50', color: 'text-[#E50914]', icon: <ClapperboardIcon className="w-5 h-5" /> },
  spotify: { bg: 'bg-green-50', color: 'text-[#1DB954]', icon: <Headphones className="w-5 h-5" /> },
  shahid: { bg: 'bg-orange-50', color: 'text-orange-600', icon: <MonitorPlay className="w-5 h-5" /> },
  chatgpt: { bg: 'bg-emerald-50', color: 'text-emerald-600', icon: <Sparkles className="w-5 h-5" /> },
  canva: { bg: 'bg-cyan-50', color: 'text-[#00C4CC]', icon: <PenTool className="w-5 h-5" /> },
  coursera: { bg: 'bg-indigo-50', color: 'text-indigo-600', icon: <GraduationCap className="w-5 h-5" /> },
};

export default function Cart() {
  const container = useRef();
  const { t } = useLanguage();
  const d = t.dashboard;

  const items = useCartStore((s) => s.items);
  const updateQty = useCartStore((s) => s.updateQty);
  const removeItem = useCartStore((s) => s.removeItem);
  const subtotal = useCartStore(selectSubtotal);
  const count = useCartStore(selectItemCount);

  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);

  const fees = subtotal > 0 ? SERVICE_FEE : 0;
  const discount = promoApplied ? subtotal * 0.1 : 0;
  const total = Math.max(0, subtotal + fees - discount);

  // دالة الحذف مع الأنيميشن
  const handleRemove = (id) => {
    gsap.to(`#cart-item-${id}`, {
      x: -50, opacity: 0, height: 0, marginBottom: 0, padding: 0, duration: 0.4,
      onComplete: () => removeItem(id),
    });
  };

  useGSAP(() => {
    if (items.length > 0) {
      gsap.fromTo(".cart-item",
        { y: 30, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" }
      );
    }
    gsap.fromTo(".summary-card",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "power3.out" }
    );
  }, { scope: container, dependencies: [items.length] });

  // اسم العرض حسب اللغة
  const label = (item) => (t.dir === 'rtl' ? item.nameAr : item.name);

  return (
    <div ref={container} className="w-full flex flex-col lg:flex-row gap-8">
      
      {/* القسم الأول: قائمة المشتريات */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            {d.yourCart}
          </h2>
          <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm font-bold">
            {count} {count === 1 ? d.itemSingle : d.itemPlural}
          </span>
        </div>

        {items.length > 0 ? (
          items.map((item) => {
            const tone = toneMap[item.platformId] || { bg: 'bg-blue-50', color: 'text-blue-600', icon: <Star className="w-5 h-5" /> };
            return (
              <div 
                key={item.id} 
                id={`cart-item-${item.id}`}
                className="cart-item bg-white border border-gray-200 rounded-[1.5rem] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all overflow-hidden"
              >
                <div className="flex items-center gap-4 flex-1">
                  <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${tone.bg} ${tone.color}`}>
                    {tone.icon}
                  </div>
                  <div>
                    <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{label(item)}</h3>
                    <span className="inline-block px-2.5 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs font-bold uppercase tracking-widest text-gray-500">
                      {item.unit}
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                  <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-1">
                    <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-gray-900 shadow-sm transition-colors">
                      <Minus className="w-4 h-4" />
                    </button>
                    <span className="w-10 text-center font-bold text-sm text-gray-900">{item.productQty}</span>
                    <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-gray-900 shadow-sm transition-colors">
                      <Plus className="w-4 h-4" />
                    </button>
                  </div>

                  <div className="flex items-center gap-4 w-28 justify-end">
                    <span className="font-black text-gray-900 text-lg">{(item.price * item.productQty).toFixed(2)}</span>
                    <button onClick={() => handleRemove(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                      <Trash2 className="w-5 h-5" />
                    </button>
                  </div>
                </div>
              </div>
            );
          })
        ) : (
          <div className="bg-white border border-gray-200 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">{d.cartEmpty}</h3>
            <p className="text-gray-500 font-medium mb-6">{d.cartEmptySub}</p>
          </div>
        )}
      </div>

      {/* القسم الثاني: ملخص الطلب */}
      <div className="summary-card w-full lg:w-[380px] shrink-0">
        <div className="bg-gray-900 rounded-[2rem] p-8 text-white sticky top-28 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-xl font-black mb-6 relative z-10">{d.orderSummary}</h3>

          <div className="relative mb-8 z-10">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rtl:left-auto rtl:right-4" />
            <input 
              type="text" 
              placeholder={d.promoCode} 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-11 pr-24 text-sm font-medium text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all rtl:pr-11 rtl:pl-24"
            />
            <button 
              onClick={() => setPromoApplied(!!promoCode.trim())}
              className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors rtl:right-auto rtl:left-2"
            >
              {d.apply}
            </button>
          </div>

          <div className="space-y-4 text-sm font-medium text-gray-300 border-b border-white/10 pb-6 mb-6 relative z-10">
            <div className="flex justify-between">
              <span>{d.subtotal}</span>
              <span className="text-white">{subtotal.toFixed(2)} JOD</span>
            </div>
            <div className="flex justify-between">
              <span>{d.serviceFee}</span>
              <span className="text-white">{fees.toFixed(2)} JOD</span>
            </div>
            {discount > 0 && (
              <div className="flex justify-between text-emerald-400">
                <span>10% OFF</span>
                <span>– {discount.toFixed(2)} JOD</span>
              </div>
            )}
          </div>

          <div className="flex justify-between items-end mb-8 relative z-10">
            <span className="text-gray-400 font-medium">{d.total}</span>
            <div className="text-right">
              <span className="text-3xl font-black text-white">{total.toFixed(2)}</span>
              <span className="text-sm font-bold text-gray-400 ml-1">JOD</span>
            </div>
          </div>

          <button 
            disabled={items.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_10px_25px_rgba(37,99,235,0.3)] disabled:shadow-none relative z-10 group"
          >
            <ShoppingCart className="w-5 h-5" /> 
            {d.checkoutSecurely}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </button>

          <p className="text-center text-xs text-gray-500 mt-4 relative z-10 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4" /> {d.sslEncrypted}
          </p>
        </div>
      </div>

    </div>
  );
}