import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ShoppingBag, ChevronRight, CheckCircle2, Clock, Zap,
  ShoppingCart, MessageSquare, Bell, Wallet, Loader2, ArrowUpRight
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../api/client';

export default function Overview() {
  const container = useRef();
  const navigate = useNavigate();
  const { user } = useAuth();
  const { t, lang } = useLanguage();

  const [myUser, setMyUser] = useState(null);
  const [orders, setOrders] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);

  const mjBalance = myUser?.mjBalance ?? user?.mjBalance ?? 0;
  const jodEquivalent = mjBalance / 10;
  const name = user?.name || myUser?.name || 'User';

  const statusLabel = (status, paymentStatus) => {
    const o = t.dashboard.orders;
    if (paymentStatus === 'paid' || ['processing', 'paid', 'completed'].includes(status)) {
      if (status === 'completed') return t.dashboard.status.completed;
      return o.paid;
    }
    if (paymentStatus === 'rejected') return o.rejected;
    if (paymentStatus === 'refunded') return o.refunded;
    if (paymentStatus === 'cancelled' || status === 'canceled') return o.cancelled;
    return o.awaitingPayment;
  };

  const ordersByStatus = {
    awaiting: orders.filter((o) => o.paymentStatus === 'awaiting_payment').length,
    paid: orders.filter((o) => o.paymentStatus === 'paid' || o.status === 'processing').length,
    completed: orders.filter((o) => o.status === 'completed').length,
  };

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const [meRes, ordersRes, notifRes] = await Promise.all([
          api.get('/api/auth/me'),
          api.get('/api/orders/my-orders'),
          api.get('/api/notifications'),
        ]);
        if (!mounted) return;
        setMyUser(meRes?.data?.data?.user || meRes?.data?.user || null);
        setOrders(ordersRes?.data?.data?.orders || []);
        setUnread(notifRes?.data?.data?.unreadCount || 0);
      } catch { } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ==========================================
  // دالة الـ 3D Extrusion المستوحاة من الـ Hero
  // ==========================================
  const getGradientExtrusion = (depth, r1, g1, b1, r2, g2, b2, xDir = 1, yDir = 1) => {
    let shadows = [];
    shadows.push(`inset -4px -4px 10px rgba(0,0,0,0.03)`);
    shadows.push(`inset 4px 4px 10px rgba(255,255,255,0.8)`);
    shadows.push(`inset 0px 0px 0px 1px rgba(255,255,255,0.5)`);

    for (let i = 1; i <= depth; i++) {
      const ratio = i / depth;
      const r = Math.round(r1 + (r2 - r1) * ratio);
      const g = Math.round(g1 + (g2 - g1) * ratio);
      const b = Math.round(b1 + (b2 - b1) * ratio);
      shadows.push(`${i * xDir}px ${i * yDir}px 0px rgb(${r}, ${g}, ${b})`);
    }
    
    shadows.push(`${(depth + 10) * xDir}px ${(depth + 10) * yDir}px 25px rgba(0,0,0,0.06)`);
    return shadows.join(', ');
  };

  // إعداد ظلال البطاقات بألوان الفخامة الخاصة بـ Google I/O
  const dirMultiplier = t.dir === 'rtl' ? -1 : 1;
  const shadowMain = getGradientExtrusion(10, 241, 245, 249, 226, 232, 240, dirMultiplier, 1); // Gray Extrusion
  const shadowBlue = getGradientExtrusion(10, 59, 130, 246, 37, 99, 235, dirMultiplier, 1);   // Blue Extrusion
  const shadowEmerald = getGradientExtrusion(8, 16, 185, 129, 5, 150, 105, dirMultiplier, 1); // Emerald Extrusion
  const shadowAmber = getGradientExtrusion(8, 245, 158, 11, 217, 119, 6, dirMultiplier, 1);   // Amber Extrusion

  useGSAP(() => {
    gsap.fromTo(".io-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "power3.out" }
    );
  }, { scope: container });

  const recentOrders = orders.slice(-4).reverse();

  return (
    <div ref={container} className="flex flex-col gap-8 w-full max-w-[1400px] mx-auto font-sans text-[#1e2022]">

      {/* =========================================
          1. Welcome Banner (Google I/O 3D Extrusion)
          ========================================= */}
      <div 
        className="io-card w-full bg-gradient-to-br from-white to-gray-50 rounded-[2.5rem] border border-white p-8 md:p-12 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8 transition-transform hover:-translate-y-1 duration-300"
        style={{ boxShadow: shadowMain }}
      >
        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2.5 h-2.5 bg-blue-600 rounded-full animate-pulse shadow-sm"></span>
            <span className="text-gray-500 font-mono text-[11px] tracking-widest uppercase">{t.dashboard.systemOnline}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-medium tracking-tighter mb-4">
            {t.dashboard.welcomeBack.split('{name}')[0]} 
            <span className="font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-purple-600"> {name}</span>
          </h2>
          <p className="text-gray-500 font-light text-lg max-w-xl leading-relaxed">
            {t.dashboard.readyBoost}
          </p>
        </div>

        {/* Premium Wallet Display */}
        <div className="relative z-10 bg-white border border-gray-100 rounded-[2rem] p-8 flex items-center gap-8 min-w-[320px]" style={{ boxShadow: shadowBlue }}>
          <div className="flex-1">
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-2">{t.dashboard.wallet.title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-5xl font-medium tracking-tighter text-[#1e2022]">{loading ? '—' : mjBalance}</span>
              <span className="text-lg font-bold text-blue-600">MJ</span>
            </div>
            <p className="text-sm text-gray-500 font-mono mt-2">
              ≈ {jodEquivalent.toFixed(2)} JOD
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/wallet')}
            className="w-16 h-16 bg-[#1e2022] hover:bg-black rounded-full flex items-center justify-center text-white transition-all duration-300 hover:scale-105 shadow-md"
            aria-label={t.dashboard.wallet.title}
          >
            <Wallet className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* =========================================
          1.5 Quick Stats (Floating 3D Pills)
          ========================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { key: 'awaiting', label: t.dashboard.orders.awaitingPayment, icon: Clock, shadow: shadowAmber, text: 'text-amber-600' },
          { key: 'paid', label: t.dashboard.orders.paid, icon: Zap, shadow: shadowBlue, text: 'text-blue-600' },
          { key: 'completed', label: t.dashboard.status.completed, icon: CheckCircle2, shadow: shadowEmerald, text: 'text-emerald-600' },
        ].map((chip) => (
          <button
            key={chip.key}
            onClick={() => navigate('/dashboard/orders')}
            className="io-card bg-gradient-to-br from-white to-gray-50 border border-white rounded-[2rem] p-8 text-start flex items-start justify-between transition-transform hover:-translate-y-1 duration-300"
            style={{ boxShadow: chip.shadow }}
          >
            <div>
              <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-3">{chip.label}</p>
              <p className="text-4xl font-medium tracking-tighter text-[#1e2022]">
                {ordersByStatus[chip.key]}
              </p>
            </div>
            <div className={`p-3 bg-white rounded-2xl shadow-sm border border-gray-50 ${chip.text}`}>
              <chip.icon className="w-6 h-6" />
            </div>
          </button>
        ))}
      </div>

      {/* =========================================
          2. Grid Layout (Orders & Widgets)
          ========================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">

        {/* Recent Orders (Clean Surface with Extrusion) */}
        <div 
          className="io-card lg:col-span-2 bg-gradient-to-br from-white to-gray-50 border border-white rounded-[2.5rem] flex flex-col transition-transform hover:-translate-y-1 duration-300 overflow-hidden"
          style={{ boxShadow: shadowMain }}
        >
          <div className="flex items-center justify-between p-8 border-b border-gray-100/50 bg-white/50">
            <div className="flex items-center gap-4">
              <div className="w-3 h-8 bg-gray-900 skew-x-12 rounded-sm"></div>
              <h3 className="text-2xl font-medium tracking-tighter text-[#1e2022]">{t.dashboard.recentOrders}</h3>
            </div>
            <button
              onClick={() => navigate('/dashboard/orders')}
              className="text-sm font-bold text-blue-600 hover:text-blue-800 uppercase tracking-widest flex items-center gap-1 transition-colors"
            >
              {t.dashboard.viewAll} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center py-20 text-gray-400">
              <Loader2 className="w-8 h-8 animate-spin text-blue-600" />
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-20 text-center">
              <ShoppingBag className="w-12 h-12 text-gray-300 mb-4" />
              <p className="text-gray-500 font-medium text-lg">{t.dashboard.noOrdersWithStatus.replace('{filter}', t.dashboard.all)}</p>
            </div>
          ) : (
            <div className="flex flex-col flex-1 divide-y divide-gray-100/50 p-4">
              {recentOrders.map((order, i) => {
                const statusText = statusLabel(order.status, order.paymentStatus);
                const isDone = order.status === 'completed';
                const service = order.items?.map((it) => it.name).join(', ') || order.service || order.orderNumber;
                return (
                  <button
                    key={order._id || i}
                    onClick={() => navigate('/dashboard/orders')}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 hover:bg-white rounded-2xl transition-colors gap-4 text-start group"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="min-w-0">
                        <h4 className="font-bold text-[#1e2022] text-base mb-1 truncate group-hover:text-blue-600 transition-colors">{service}</h4>
                        <div className="flex items-center gap-3 text-xs font-mono text-gray-400">
                          <span className="text-gray-600 font-bold">{order.orderNumber}</span>
                          <span className="text-gray-300">|</span>
                          <span>{new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-US', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto shrink-0">
                      <span className="font-medium tracking-tighter text-[#1e2022] text-lg">{order.totalJOD ?? order.total} JOD</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full ${isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-gray-100 text-gray-600'}`}>
                        {statusText}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* Widgets Column */}
        <div className="flex flex-col gap-8">

          {/* Active Cart Widget (Electric Blue 3D Box) */}
          <div
            onClick={() => navigate('/dashboard/cart')}
            className="io-card bg-gradient-to-br from-blue-500 to-blue-600 text-white rounded-[2.5rem] p-8 relative group cursor-pointer flex flex-col min-h-[220px] transition-transform hover:-translate-y-1 duration-300 overflow-hidden"
            style={{ boxShadow: shadowBlue }}
          >
            {/* Soft inner glow representing light scattering */}
            <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/20 rounded-full blur-3xl group-hover:bg-white/30 transition-colors"></div>
            
            <div className="flex items-start justify-between mb-auto relative z-10">
              <div className="p-3 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <div className="w-10 h-10 bg-white text-blue-600 rounded-full flex items-center justify-center transform group-hover:scale-110 transition-transform shadow-lg">
                 <ArrowUpRight className="w-5 h-5 rtl:-scale-x-100" />
              </div>
            </div>
            
            <div className="mt-8 relative z-10">
              <h3 className="text-2xl font-medium tracking-tighter mb-2">{t.dashboard.activeCart}</h3>
              <p className="text-blue-100 text-sm font-light">
                {lang === 'ar'
                  ? `يوجد ${(user?.cart?.items?.length ?? 0)} عنصر بانتظار الدفع.`
                  : `You have ${(user?.cart?.items?.length ?? 0)} items pending.`}
              </p>
            </div>
          </div>

          {/* Notifications Widget (Clean 3D Card) */}
          <div 
            className="io-card bg-gradient-to-br from-white to-gray-50 border border-white rounded-[2.5rem] flex flex-col min-h-[220px] transition-transform hover:-translate-y-1 duration-300"
            style={{ boxShadow: shadowMain }}
          >
            <div className="p-8 pb-4 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-400 uppercase tracking-widest">{t.dashboard.notifications.title}</h3>
              <div className="relative">
                <Bell className="w-5 h-5 text-gray-800" />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-red-500 rounded-full shadow-sm animate-pulse"></span>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center px-8 py-2">
              {unread > 0 ? (
                <div className="flex items-start gap-4 p-4 bg-gray-50 rounded-2xl border border-gray-100">
                  <div className="mt-0.5"><MessageSquare className="w-5 h-5 text-blue-600" /></div>
                  <div>
                    <p className="text-base font-bold text-[#1e2022] mb-1">
                      {lang === 'ar' ? 'تنبيهات النظام' : 'System Alerts'}
                    </p>
                    <p className="text-sm font-medium text-gray-500">
                      {lang === 'ar'
                        ? `يوجد ${unread} إشعار غير مقروء.`
                        : `${unread} unread notifications.`}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-sm text-gray-400 font-medium text-center">{t.dashboard.noNewMessages}</p>
              )}
            </div>

            <div className="p-6 pt-2">
              <button
                onClick={() => navigate('/dashboard/notifications')}
                className="w-full py-3.5 bg-[#1e2022] hover:bg-black text-white rounded-full font-medium text-sm transition-colors shadow-md"
              >
                {t.dashboard.viewAll}
              </button>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
}