import React, { useRef, useState } from 'react';
import { ShoppingCart, ShoppingBag, Globe, Trash2, Plus, Minus, Tag, ArrowRight, ShieldCheck } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../context/LanguageContext';

export default function Cart() {
  const container = useRef();
  const { t } = useLanguage();
  
  const [cartItems, setCartItems] = useState([
    { id: 1, service: "10,000 Instagram Followers", category: "Social Media", price: 12.00, qty: 1, icon: <ShoppingBag className="w-5 h-5"/>, bg: "bg-pink-50", color: "text-pink-600" },
    { id: 2, service: "Website SEO Audit Pro", category: "Marketing", price: 25.00, qty: 1, icon: <Globe className="w-5 h-5"/>, bg: "bg-indigo-50", color: "text-indigo-600" },
  ]);

  const [promoCode, setPromoCode] = useState("");

  const subtotal = cartItems.reduce((acc, item) => acc + (item.price * item.qty), 0);
  const fees = subtotal > 0 ? 1.50 : 0;
  const total = subtotal + fees;

  const updateQty = (id, delta) => {
    setCartItems(prev => prev.map(item => {
      if (item.id === id) {
        const newQty = item.qty + delta;
        return { ...item, qty: newQty > 0 ? newQty : 1 };
      }
      return item;
    }));
  };

  const removeItem = (id) => {
    gsap.to(`#cart-item-${id}`, { 
      x: -50, opacity: 0, height: 0, marginBottom: 0, padding: 0, duration: 0.4, 
      onComplete: () => setCartItems(prev => prev.filter(item => item.id !== id))
    });
  };

  useGSAP(() => {
    gsap.fromTo(".cart-item", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.2)" }
    );
    gsap.fromTo(".summary-card",
      { x: 30, opacity: 0 },
      { x: 0, opacity: 1, duration: 0.6, delay: 0.3, ease: "power3.out" }
    );
  }, { scope: container });

  return (
    <div ref={container} className="w-full flex flex-col lg:flex-row gap-8">
      
      {/* القسم الأول: قائمة المشتريات */}
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-2xl font-black text-gray-900 flex items-center gap-3">
            <ShoppingCart className="w-6 h-6 text-blue-600" />
            {t.dashboard.yourCart}
          </h2>
          <span className="bg-gray-200 text-gray-700 py-1 px-3 rounded-full text-sm font-bold">
            {cartItems.length} {cartItems.length === 1 ? t.dashboard.itemSingle : t.dashboard.itemPlural}
          </span>
        </div>

        {cartItems.length > 0 ? (
          cartItems.map((item) => (
            <div 
              key={item.id} 
              id={`cart-item-${item.id}`}
              className="cart-item bg-white border border-gray-200 rounded-[1.5rem] p-5 flex flex-col sm:flex-row sm:items-center justify-between gap-5 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] transition-all overflow-hidden"
            >
              <div className="flex items-center gap-4 flex-1">
                <div className={`w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 ${item.bg} ${item.color}`}>
                  {item.icon}
                </div>
                <div>
                  <h3 className="font-bold text-gray-900 text-lg leading-tight mb-1">{item.service}</h3>
                  <p className="text-xs font-bold uppercase tracking-widest text-gray-400">{item.category}</p>
                </div>
              </div>

              <div className="flex items-center justify-between sm:justify-end gap-6 w-full sm:w-auto border-t sm:border-t-0 pt-4 sm:pt-0 border-gray-100">
                <div className="flex items-center bg-gray-50 border border-gray-200 rounded-full p-1">
                  <button onClick={() => updateQty(item.id, -1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-gray-900 shadow-sm transition-colors">
                    <Minus className="w-4 h-4" />
                  </button>
                  <span className="w-10 text-center font-bold text-sm text-gray-900">{item.qty}</span>
                  <button onClick={() => updateQty(item.id, 1)} className="w-8 h-8 flex items-center justify-center rounded-full bg-white text-gray-600 hover:text-gray-900 shadow-sm transition-colors">
                    <Plus className="w-4 h-4" />
                  </button>
                </div>

                <div className="flex items-center gap-4 w-28 justify-end">
                  <span className="font-black text-gray-900 text-lg">{(item.price * item.qty).toFixed(2)}</span>
                  <button onClick={() => removeItem(item.id)} className="text-gray-300 hover:text-red-500 transition-colors p-2 rounded-full hover:bg-red-50">
                    <Trash2 className="w-5 h-5" />
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="bg-white border border-gray-200 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center h-full min-h-[300px]">
            <div className="w-20 h-20 bg-gray-50 rounded-full flex items-center justify-center mb-4">
              <ShoppingCart className="w-10 h-10 text-gray-300" />
            </div>
            <h3 className="text-xl font-black text-gray-900 mb-2">{t.dashboard.cartEmpty}</h3>
            <p className="text-gray-500 font-medium mb-6">{t.dashboard.cartEmptySub}</p>
          </div>
        )}
      </div>

      {/* القسم الثاني: ملخص الطلب */}
      <div className="summary-card w-full lg:w-[380px] shrink-0">
        <div className="bg-gray-900 rounded-[2rem] p-8 text-white sticky top-28 shadow-2xl relative overflow-hidden">
          <div className="absolute -top-20 -right-20 w-48 h-48 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"></div>
          
          <h3 className="text-xl font-black mb-6 relative z-10">{t.dashboard.orderSummary}</h3>

          <div className="relative mb-8 z-10">
            <Tag className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 rtl:right-4 rtl:left-auto" />
            <input 
              type="text" 
              placeholder={t.dashboard.promoCode} 
              value={promoCode}
              onChange={(e) => setPromoCode(e.target.value)}
              dir={t.dir}
              className="w-full bg-white/10 border border-white/20 rounded-xl py-3 pl-11 pr-24 text-sm font-medium text-white placeholder-gray-400 focus:outline-none focus:border-blue-400 transition-all"
            />
            <button className="absolute right-2 top-1/2 -translate-y-1/2 bg-white text-gray-900 px-4 py-1.5 rounded-lg text-xs font-bold hover:bg-gray-200 transition-colors rtl:left-2 rtl:right-auto">
              {t.dashboard.apply}
            </button>
          </div>

          <div className="space-y-4 text-sm font-medium text-gray-300 border-b border-white/10 pb-6 mb-6 relative z-10">
            <div className="flex justify-between">
              <span>{t.dashboard.subtotal}</span>
              <span className="text-white">{subtotal.toFixed(2)} JOD</span>
            </div>
            <div className="flex justify-between">
              <span>{t.dashboard.serviceFee}</span>
              <span className="text-white">{fees.toFixed(2)} JOD</span>
            </div>
          </div>

          <div className="flex justify-between items-end mb-8 relative z-10">
            <span className="text-gray-400 font-medium">{t.dashboard.total}</span>
            <div className="text-right">
              <span className="text-3xl font-black text-white">{total.toFixed(2)}</span>
              <span className="text-sm font-bold text-gray-400 ms-1">JOD</span>
            </div>
          </div>

          <button 
            disabled={cartItems.length === 0}
            className="w-full bg-blue-600 hover:bg-blue-500 disabled:bg-gray-700 disabled:text-gray-500 text-white py-4 rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_10px_25px_rgba(37,99,235,0.3)] disabled:shadow-none relative z-10 group"
          >
            <ShoppingCart className="w-5 h-5" /> 
            {t.dashboard.checkoutSecurely}
            <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform rtl:rotate-180 rtl:group-hover:-translate-x-1" />
          </button>

          <p className="text-center text-xs text-gray-500 mt-4 relative z-10 flex items-center justify-center gap-1">
            <ShieldCheck className="w-4 h-4" /> {t.dashboard.sslEncrypted}
          </p>
        </div>
      </div>

    </div>
  );
}