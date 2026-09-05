import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  CreditCard, ShoppingBag, ChevronRight, CheckCircle2, 
  Clock, Zap, ShoppingCart, MessageSquare, AlertCircle 
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import { useCartStore, selectItemCount } from '../../store/cartStore';

// ==========================================
// 1. Mock Data (بيانات وهمية للتجربة)
// ==========================================
const balance = 45.50;
const unreadMessages = 1;

const recentOrders = [
  { id: "ORD-992X", service: "10,000 Instagram Followers", status: "Processing", date: "Today", price: 12.00 },
  { id: "ORD-991A", service: "Netflix Premium (1 Month)", status: "Completed", date: "Yesterday", price: 4.50 },
  { id: "ORD-988B", service: "500 TikTok Likes", status: "Completed", date: "Oct 12", price: 1.20 },
];

export default function Overview() {
  const container = useRef();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t } = useLanguage();
  
  const name = user?.name || 'User';
  const statusLabel = (status) => t.dashboard.status[status.toLowerCase()] || status;

  const cartCount = useCartStore(selectItemCount);
  const cartMsg = cartCount === 1
    ? t.dashboard.cartWaiting
    : t.dashboard.cartWaitingPlural.replace('{count}', cartCount);

  // ==========================================
  // GSAP Animations
  // ==========================================
  useGSAP(() => {
    gsap.fromTo(".bento-card", 
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }
    );
  }, { scope: container });

  return (
    <div ref={container} className="flex flex-col gap-6 w-full">
      
      {/* =========================================
          1. Welcome Banner & Wallet
          ========================================= */}
      <div className="bento-card w-full bg-gray-900 rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
        {/* Shapes for Luxury Effect */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>
        
        <div className="relative z-10">
          <p className="text-blue-400 font-mono text-sm mb-2 flex items-center gap-2">
            <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span> {t.dashboard.systemOnline}
          </p>
          <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
            {t.dashboard.welcomeBack.replace('{name}', name)}
          </h2>
          <p className="text-gray-400 font-medium">{t.dashboard.readyBoost}</p>
        </div>
        
        <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-center gap-6">
          <div>
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{t.dashboard.walletBalance}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">{balance.toFixed(2)}</span>
              <span className="text-sm font-bold text-gray-400">JOD</span>
            </div>
          </div>
          <button className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:scale-110 transition-transform">
            <CreditCard className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* =========================================
          2. Bento Grid: 3 Columns Layout
          ========================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        
        {/* العمود الأول والثاني: أحدث الطلبات */}
        <div className="bento-card md:col-span-2 bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-xl font-black text-gray-900">{t.dashboard.recentOrders}</h3>
            </div>
            <button 
              onClick={() => navigate('/dashboard/orders')} 
              className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1"
            >
              {t.dashboard.viewAll} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          <div className="flex flex-col gap-4 flex-1">
            {recentOrders.map((order, i) => (
              <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors gap-4">
                <div className="flex items-start sm:items-center gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${order.status === 'Completed' ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'}`}>
                    {order.status === 'Completed' ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm mb-1">{order.service}</h4>
                    <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                      <span>{order.id}</span>
                      <span>•</span>
                      <span>{order.date}</span>
                    </div>
                  </div>
                </div>
                <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 w-full sm:w-auto mt-2 sm:mt-0">
                  <span className="font-black text-gray-900">{order.price.toFixed(2)} JOD</span>
                  <span className={`text-[10px] font-bold uppercase tracking-widest ${order.status === 'Completed' ? 'text-emerald-500' : 'text-blue-500'}`}>
                    {statusLabel(order.status)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* العمود الثالث: الويدجت الجانبية (السلة والدعم) */}
        <div className="flex flex-col gap-6">
          
          {/* Active Cart Widget */}
          <div 
            onClick={() => navigate('/dashboard/cart')} 
            className="bento-card bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <Zap className="w-6 h-6 text-yellow-300" />
              <h3 className="text-xl font-black">{t.dashboard.activeCart}</h3>
            </div>
            <p className="text-blue-100 text-sm font-medium leading-relaxed mb-6 relative z-10">
              {cartMsg}
            </p>
            <button className="w-full bg-white text-blue-700 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform relative z-10 flex items-center justify-center gap-2">
              <ShoppingCart className="w-4 h-4" /> {t.dashboard.goToCheckout}
            </button>
          </div>

          {/* Support Tickets Widget */}
          <div className="bento-card bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                  <MessageSquare className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-gray-900">{t.dashboard.support}</h3>
              </div>
            </div>
            
            {unreadMessages > 0 ? (
              <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 flex gap-3">
                <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
                <div>
                  <h4 className="text-sm font-bold text-gray-900">{t.dashboard.newReply}</h4>
                  <p className="text-xs text-gray-500 mt-1">{t.dashboard.replyPreview}</p>
                </div>
              </div>
            ) : (
              <p className="text-sm text-gray-500 font-medium">{t.dashboard.noNewMessages}</p>
            )}
            
            <button 
              onClick={() => navigate('/dashboard/tickets')} 
              className="w-full mt-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors"
            >
              {t.dashboard.openSupport}
            </button>
          </div>
          
        </div>
      </div>
    </div>
  );
}