import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ShoppingBag, ChevronRight, CheckCircle2, Clock, Zap,
  ShoppingCart, MessageSquare, Bell, Wallet, Loader2, ArrowUpRight, Activity
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

  // GSAP Animations (Snappy, Expo Easing)
  useGSAP(() => {
    gsap.fromTo(".geo-card",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: "expo.out" }
    );
  }, { scope: container });

  const recentOrders = orders.slice(-4).reverse();

  return (
    <div ref={container} className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10 font-sans">

      {/* =========================================
          1. Welcome Banner (Suprematic Flat Style)
          ========================================= */}
      <div className="geo-card w-full bg-white border-2 border-gray-200 p-8 md:p-10 relative flex flex-col md:flex-row items-start md:items-center justify-between gap-8">
        {/* Geometric Abstract Shapes */}
        <div className="absolute top-0 right-0 w-32 h-32 bg-blue-600 opacity-5 pointer-events-none transform rotate-45 translate-x-16 -translate-y-16"></div>
        <div className="absolute bottom-0 left-1/2 w-40 h-2 bg-emerald-500 pointer-events-none transform -translate-x-1/2"></div>

        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="w-2 h-2 bg-emerald-500 rounded-none animate-pulse"></span>
            <span className="text-gray-400 font-mono text-[10px] tracking-[0.2em] uppercase">{t.dashboard.systemOnline}</span>
          </div>
          
          <h2 className="text-3xl md:text-5xl font-black text-gray-900 tracking-tighter mb-3 uppercase">
            {t.dashboard.welcomeBack.split('{name}')[0]} 
            <span className="text-blue-600"> {name}</span>
          </h2>
          <p className="text-gray-500 font-bold text-sm max-w-xl">
            {t.dashboard.readyBoost}
          </p>
        </div>

        {/* Premium Wallet Display (Stark Contrast Block) */}
        <div className="relative z-10 bg-gray-900 text-white rounded-none p-6 flex items-center gap-8 min-w-[280px] shadow-[4px_4px_0px_0px_#2563EB]">
          <div className="flex-1">
            <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{t.dashboard.wallet.title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-4xl font-black tracking-tighter">{loading ? '—' : mjBalance}</span>
              <span className="text-sm font-bold text-blue-400">MJ</span>
            </div>
            <p className="text-xs text-gray-500 font-mono mt-2">
              ≈ {jodEquivalent.toFixed(2)} JOD
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/wallet')}
            className="w-12 h-12 bg-white hover:bg-gray-200 text-gray-900 flex items-center justify-center transition-colors duration-200 rounded-none"
            aria-label={t.dashboard.wallet.title}
          >
            <Wallet className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* =========================================
          1.5 Quick Stats (Segmented Grid Layout)
          ========================================= */}
      <div className="geo-card w-full bg-white border-2 border-gray-200 flex flex-col sm:flex-row divide-y-2 sm:divide-y-0 sm:divide-x-2 sm:divide-gray-200 rtl:divide-x-reverse">
        {[
          { key: 'awaiting', label: t.dashboard.orders.awaitingPayment, icon: Clock, accent: 'bg-amber-400' },
          { key: 'paid', label: t.dashboard.orders.paid, icon: Zap, accent: 'bg-blue-600' },
          { key: 'completed', label: t.dashboard.status.completed, icon: CheckCircle2, accent: 'bg-emerald-500' },
        ].map((chip) => (
          <button
            key={chip.key}
            onClick={() => navigate('/dashboard/orders')}
            className="flex-1 p-6 text-start flex items-start justify-between hover:bg-gray-50 transition-colors group relative overflow-hidden"
          >
            {/* Geometric Hover Accent */}
            <div className={`absolute top-0 left-0 w-full h-1 transform -translate-y-full group-hover:translate-y-0 transition-transform ${chip.accent}`}></div>
            
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{chip.label}</p>
              <p className="text-4xl font-black text-gray-900 tracking-tighter">
                {ordersByStatus[chip.key]}
              </p>
            </div>
            <div className="p-2 bg-gray-100 text-gray-900 group-hover:bg-white transition-colors">
              <chip.icon className="w-5 h-5" />
            </div>
          </button>
        ))}
      </div>

      {/* =========================================
          2. Grid Layout (Orders & Widgets)
          ========================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Orders (Strict Table List Style) */}
        <div className="geo-card lg:col-span-2 bg-white border-2 border-gray-200 flex flex-col">
          <div className="flex items-center justify-between p-6 border-b-2 border-gray-200 bg-gray-50">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 bg-gray-900"></div>
              <h3 className="text-lg font-black text-gray-900 uppercase tracking-tight">{t.dashboard.recentOrders}</h3>
            </div>
            <button
              onClick={() => navigate('/dashboard/orders')}
              className="text-xs font-bold text-blue-600 hover:text-blue-800 uppercase tracking-wider flex items-center gap-1 transition-colors"
            >
              {t.dashboard.viewAll} <ChevronRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>

          {loading ? (
            <div className="flex-1 flex items-center justify-center py-16 text-gray-400">
              <Loader2 className="w-6 h-6 animate-spin text-gray-400" />
            </div>
          ) : recentOrders.length === 0 ? (
            <div className="flex-1 flex flex-col items-center justify-center py-16 text-center">
              <ShoppingBag className="w-8 h-8 text-gray-200 mb-4" />
              <p className="text-gray-400 font-bold text-sm">{t.dashboard.noOrdersWithStatus.replace('{filter}', t.dashboard.all)}</p>
            </div>
          ) : (
            <div className="flex flex-col flex-1 divide-y divide-gray-100">
              {recentOrders.map((order, i) => {
                const statusText = statusLabel(order.status, order.paymentStatus);
                const isDone = order.status === 'completed';
                const service = order.items?.map((it) => it.name).join(', ') || order.service || order.orderNumber;
                return (
                  <button
                    key={order._id || i}
                    onClick={() => navigate('/dashboard/orders')}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-5 hover:bg-gray-50 transition-colors gap-4 text-start group"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm mb-1 truncate group-hover:text-blue-600 transition-colors uppercase">{service}</h4>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-gray-400">
                          <span className="text-gray-900 font-bold">{order.orderNumber}</span>
                          <span>/</span>
                          <span>{new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 w-full sm:w-auto shrink-0">
                      <span className="font-black text-gray-900 text-base">{order.totalJOD ?? order.total} JOD</span>
                      <span className={`text-[9px] font-black uppercase tracking-widest px-2 py-1 border ${isDone ? 'bg-emerald-50 border-emerald-200 text-emerald-700' : 'bg-gray-100 border-gray-200 text-gray-700'}`}>
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

          {/* Active Cart Widget (Electric Blue Suprematic Block) */}
          <div
            onClick={() => navigate('/dashboard/cart')}
            className="geo-card bg-blue-600 border-2 border-blue-600 hover:bg-blue-700 text-white relative group cursor-pointer flex flex-col min-h-[180px] shadow-[4px_4px_0px_0px_#0a0a0a] transition-all"
          >
            <div className="p-6 flex-1 flex flex-col justify-between">
              <div className="flex items-start justify-between mb-auto">
                <div className="bg-white/10 p-2">
                  <ShoppingCart className="w-6 h-6 text-white" />
                </div>
                <div className="w-8 h-8 bg-white text-blue-600 flex items-center justify-center transform group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">
                   <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
                </div>
              </div>
              
              <div className="mt-8">
                <h3 className="text-xl font-black mb-1 uppercase tracking-tight">{t.dashboard.activeCart}</h3>
                <p className="text-blue-100 text-xs font-bold font-mono">
                  {lang === 'ar'
                    ? `[ ${(user?.cart?.items?.length ?? 0)} ] عناصر بانتظار الدفع`
                    : `[ ${(user?.cart?.items?.length ?? 0)} ] pending items`}
                </p>
              </div>
            </div>
          </div>

          {/* Notifications Widget (Strict Design) */}
          <div className="geo-card bg-white border-2 border-gray-200 flex flex-col min-h-[180px]">
            <div className="p-5 border-b-2 border-gray-200 flex items-center justify-between bg-gray-50">
              <h3 className="text-sm font-black text-gray-900 uppercase tracking-tight">{t.dashboard.notifications.title}</h3>
              <div className="relative">
                <Bell className="w-4 h-4 text-gray-900" />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-600"></span>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center p-6">
              {unread > 0 ? (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-gray-900 text-white"><MessageSquare className="w-4 h-4" /></div>
                  <div>
                    <p className="text-sm font-black text-gray-900 mb-0.5 uppercase tracking-tight">
                      {lang === 'ar' ? 'تنبيهات النظام' : 'System Alerts'}
                    </p>
                    <p className="text-xs font-bold text-gray-500 font-mono">
                      {lang === 'ar'
                        ? `يوجد [ ${unread} ] إشعار غير مقروء.`
                        : `[ ${unread} ] unread notifications.`}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 font-bold text-center uppercase tracking-widest">{t.dashboard.noNewMessages}</p>
              )}
            </div>

            <button
              onClick={() => navigate('/dashboard/notifications')}
              className="w-full py-4 bg-gray-900 hover:bg-black text-white font-black text-xs uppercase tracking-[0.2em] transition-colors"
            >
              {t.dashboard.viewAll}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}