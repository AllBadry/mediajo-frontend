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
  // GSAP Animations (Google Style: Smooth, Expo Easing)
  // ==========================================
  useGSAP(() => {
    gsap.fromTo(".google-card",
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.08, ease: "power3.out" }
    );
  }, { scope: container });

  const recentOrders = orders.slice(-4).reverse();

  return (
    <div ref={container} className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10">

      {/* =========================================
          1. Welcome Banner (Google I/O Premium Style)
          ========================================= */}
      <div className="google-card w-full bg-[#0B132B] rounded-[2.5rem] p-8 md:p-12 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl shadow-slate-900/10 border border-slate-800">
        {/* Google-like abstract mesh gradient background */}
        <div className="absolute top-[-50%] right-[-10%] w-[80%] h-[200%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-500/20 via-transparent to-transparent blur-3xl pointer-events-none rotate-12"></div>
        <div className="absolute bottom-[-50%] left-[-10%] w-[60%] h-[150%] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-emerald-500/10 via-transparent to-transparent blur-3xl pointer-events-none"></div>

        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-white/5 border border-white/10 backdrop-blur-md mb-6">
            <span className="w-2 h-2 bg-emerald-400 rounded-full animate-pulse"></span>
            <span className="text-slate-300 font-medium text-xs tracking-wide uppercase">{t.dashboard.systemOnline}</span>
          </div>
          
          <h2 className="text-4xl md:text-5xl font-bold text-white tracking-tight mb-4 leading-tight">
            {t.dashboard.welcomeBack.split('{name}')[0]} 
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400"> {name}</span>
          </h2>
          <p className="text-slate-400 font-medium text-lg max-w-xl leading-relaxed">
            {t.dashboard.readyBoost}
          </p>
        </div>

        {/* Premium Wallet Display */}
        <div className="relative z-10 bg-white/5 backdrop-blur-xl border border-white/10 rounded-[2rem] p-7 flex items-center gap-8 shadow-inner shadow-white/5 min-w-[280px] group hover:bg-white/10 transition-colors duration-500">
          <div className="flex-1">
            <p className="text-slate-400 text-xs font-bold uppercase tracking-widest mb-2">{t.dashboard.wallet.title}</p>
            <div className="flex items-baseline gap-1.5">
              <span className="text-4xl font-bold text-white tracking-tight">{loading ? '—' : mjBalance}</span>
              <span className="text-lg font-bold text-blue-400">MJ</span>
            </div>
            <p className="text-xs text-slate-500 font-medium mt-2 flex items-center gap-1">
              ≈ {jodEquivalent.toFixed(2)} JOD
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/wallet')}
            className="w-14 h-14 bg-blue-500 hover:bg-blue-400 rounded-full flex items-center justify-center text-white shadow-lg shadow-blue-500/30 transition-all duration-300 group-hover:scale-105 group-hover:rotate-3"
            aria-label={t.dashboard.wallet.title}
          >
            <Wallet className="w-6 h-6" />
          </button>
        </div>
      </div>

      {/* =========================================
          1.5 Quick Stats (Material You Clean Cards)
          ========================================= */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {[
          { key: 'awaiting', label: t.dashboard.orders.awaitingPayment, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-50', border: 'border-amber-100/50' },
          { key: 'paid', label: t.dashboard.orders.paid, icon: Zap, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100/50' },
          { key: 'completed', label: t.dashboard.status.completed, icon: CheckCircle2, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100/50' },
        ].map((chip) => (
          <button
            key={chip.key}
            onClick={() => navigate('/dashboard/orders')}
            className={`google-card group bg-white rounded-[2rem] p-6 text-start flex items-center justify-between shadow-[0_8px_30px_rgb(0,0,0,0.03)] border border-slate-100 hover:shadow-[0_8px_30px_rgb(0,0,0,0.08)] hover:-translate-y-1 transition-all duration-300`}
          >
            <div>
              <p className="text-3xl font-bold text-slate-800 tracking-tight mb-1">
                {ordersByStatus[chip.key]}
              </p>
              <p className="text-sm font-semibold text-slate-500">{chip.label}</p>
            </div>
            <div className={`w-14 h-14 rounded-2xl flex items-center justify-center ${chip.bg} ${chip.color} group-hover:scale-110 transition-transform duration-300`}>
              <chip.icon className="w-6 h-6" />
            </div>
          </button>
        ))}
      </div>

      {/* =========================================
          2. Grid Layout (Orders & Widgets)
          ========================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Orders (Clean Line UI) */}
        <div className="google-card lg:col-span-2 bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col">
          <div className="flex items-center justify-between mb-8">
            <div className="flex items-center gap-3">
              <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-[1.2rem] flex items-center justify-center border border-slate-100">
                <ShoppingBag className="w-5 h-5" />
              </div>
              <h3 className="text-2xl font-bold text-slate-800 tracking-tight">{t.dashboard.recentOrders}</h3>
            </div>
            <button
              onClick={() => navigate('/dashboard/orders')}
              className="text-sm font-bold text-blue-600 hover:text-blue-800 flex items-center gap-1 transition-colors px-4 py-2 hover:bg-blue-50 rounded-full"
            >
              {t.dashboard.viewAll} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center py-16 text-slate-400">
              <Loader2 className="w-8 h-8 animate-spin text-blue-500" />
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
              <div className="w-16 h-16 bg-slate-50 rounded-full flex items-center justify-center mb-4">
                <ShoppingBag className="w-6 h-6 text-slate-300" />
              </div>
              <p className="text-slate-500 font-medium">{t.dashboard.noOrdersWithStatus.replace('{filter}', t.dashboard.all)}</p>
            </div>
          ) : (
            <div className="flex flex-col gap-3 flex-1">
              {recentOrders.map((order, i) => {
                const statusText = statusLabel(order.status, order.paymentStatus);
                const isDone = order.status === 'completed';
                const service = order.items?.map((it) => it.name).join(', ') || order.service || order.orderNumber;
                return (
                  <button
                    key={order._id || i}
                    onClick={() => navigate('/dashboard/orders')}
                    className="group flex flex-col sm:flex-row sm:items-center justify-between p-5 rounded-[1.5rem] border border-transparent hover:border-slate-100 hover:bg-slate-50 hover:shadow-sm transition-all duration-300 gap-4 text-start"
                  >
                    <div className="flex items-center gap-5 flex-1 min-w-0">
                      <div className={`w-12 h-12 rounded-[1.2rem] flex items-center justify-center shrink-0 transition-transform group-hover:scale-105 ${isDone ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-slate-800 text-base mb-1 truncate">{service}</h4>
                        <div className="flex items-center gap-2 text-xs font-medium text-slate-500">
                          <span className="font-mono bg-white border border-slate-200 px-2 py-0.5 rounded-md">{order.orderNumber}</span>
                          <span>•</span>
                          <span>{new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-US', { month: 'short', day: 'numeric' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-2 w-full sm:w-auto shrink-0">
                      <span className="font-bold text-slate-800 text-lg tracking-tight">{order.totalJOD ?? order.total} JOD</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${isDone ? 'bg-emerald-50 text-emerald-600' : 'bg-blue-50 text-blue-600'}`}>
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
        <div className="flex flex-col gap-6">

          {/* Active Cart Widget (Luxury Tech Vibe) */}
          <div
            onClick={() => navigate('/dashboard/cart')}
            className="google-card bg-[#1A73E8] hover:bg-[#1557B0] transition-colors duration-500 rounded-[2rem] p-8 text-white shadow-xl shadow-blue-500/20 relative overflow-hidden group cursor-pointer flex flex-col justify-between min-h-[220px]"
          >
            {/* Subtle light flares */}
            <div className="absolute top-0 right-0 w-48 h-48 bg-white/10 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2 group-hover:bg-white/20 transition-all duration-700"></div>
            
            <div className="relative z-10">
              <div className="w-12 h-12 bg-white/10 backdrop-blur-md rounded-[1.2rem] flex items-center justify-center mb-5 border border-white/20">
                <ShoppingCart className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-2xl font-bold mb-2 tracking-tight">{t.dashboard.activeCart}</h3>
              <p className="text-blue-100 text-sm font-medium leading-relaxed">
                {lang === 'ar'
                  ? `لديك ${(user?.cart?.items?.length ?? 0)} عناصر في انتظار إتمام الدفع.`
                  : `You have ${(user?.cart?.items?.length ?? 0)} items pending checkout.`}
              </p>
            </div>
            
            <div className="relative z-10 mt-6 flex justify-end">
              <div className="w-10 h-10 rounded-full bg-white text-blue-600 flex items-center justify-center group-hover:translate-x-2 transition-transform rtl:group-hover:-translate-x-2">
                 <ArrowUpRight className="w-5 h-5 rtl:-scale-x-100" />
              </div>
            </div>
          </div>

          {/* Notifications Widget (Clean Material) */}
          <div className="google-card bg-white border border-slate-100 rounded-[2rem] p-8 shadow-[0_8px_30px_rgb(0,0,0,0.03)] flex flex-col justify-center min-h-[220px]">
            <div className="flex items-center justify-between mb-6">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-slate-50 text-slate-700 rounded-[1.2rem] flex items-center justify-center border border-slate-100 relative">
                  <Bell className="w-5 h-5" />
                  {unread > 0 && (
                    <span className="absolute -top-1 -right-1 w-3.5 h-3.5 bg-red-500 border-2 border-white rounded-full animate-pulse"></span>
                  )}
                </div>
                <h3 className="text-xl font-bold text-slate-800 tracking-tight">{t.dashboard.notifications.title}</h3>
              </div>
            </div>

            {unread > 0 ? (
              <div className="bg-red-50 border border-red-100 rounded-[1.2rem] p-5 flex items-start gap-3">
                <div className="mt-0.5"><MessageSquare className="w-5 h-5 text-red-500 shrink-0" /></div>
                <div>
                  <p className="text-sm font-bold text-red-900 mb-0.5">
                    {lang === 'ar' ? 'تنبيهات جديدة' : 'New Alerts'}
                  </p>
                  <p className="text-xs font-medium text-red-700">
                    {lang === 'ar'
                      ? `لديك ${unread} إشعارات تحتاج لمراجعتك.`
                      : `You have ${unread} notifications to review.`}
                  </p>
                </div>
              </div>
            ) : (
              <div className="flex flex-col items-center justify-center py-4 text-center">
                <p className="text-sm text-slate-500 font-medium">{t.dashboard.noNewMessages}</p>
              </div>
            )}

            <button
              onClick={() => navigate('/dashboard/notifications')}
              className="w-full mt-6 py-3.5 bg-slate-50 hover:bg-slate-100 text-slate-700 rounded-[1.2rem] font-bold text-sm transition-colors flex items-center justify-center gap-2"
            >
              {t.dashboard.viewAll}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}