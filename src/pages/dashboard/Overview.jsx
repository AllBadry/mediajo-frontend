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

  // ==========================================
  // GSAP Animations (Sharp, Expo Easing)
  // ==========================================
  useGSAP(() => {
    gsap.fromTo(".premium-card",
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "expo.out" }
    );
  }, { scope: container });

  const recentOrders = orders.slice(-4).reverse();

  return (
    <div ref={container} className="flex flex-col gap-6 w-full max-w-[1400px] mx-auto pb-10 font-sans">

      {/* =========================================
          1. Welcome Banner (Executive / High-End Style)
          ========================================= */}
      <div className="premium-card w-full bg-[#0a0a0a] border border-gray-800 rounded-lg p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-8 shadow-2xl">
        {/* Sharp geometric accent line instead of a soft glow */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-gray-800 via-gray-400 to-gray-800 opacity-20"></div>
        <div className="absolute -right-20 -top-20 w-64 h-64 border border-gray-800 rotate-45 opacity-20 pointer-events-none"></div>

        <div className="relative z-10 flex-1">
          <div className="inline-flex items-center gap-2 mb-6">
            {/* Square indicator instead of a circle */}
            <span className="w-1.5 h-1.5 bg-emerald-500 animate-pulse"></span>
            <span className="text-gray-400 font-mono text-[10px] tracking-[0.2em] uppercase">{t.dashboard.systemOnline}</span>
          </div>
          
          <h2 className="text-3xl md:text-4xl font-bold text-white tracking-tight mb-3">
            {t.dashboard.welcomeBack.split('{name}')[0]} 
            <span className="text-gray-300"> {name}</span>
          </h2>
          <p className="text-gray-500 font-medium text-sm max-w-xl">
            {t.dashboard.readyBoost}
          </p>
        </div>

        {/* Premium Wallet Display (Strict & Monochromatic) */}
        <div className="relative z-10 bg-[#111] border border-gray-800 rounded-md p-6 flex items-center gap-8 min-w-[280px]">
          <div className="flex-1">
            <p className="text-gray-500 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{t.dashboard.wallet.title}</p>
            <div className="flex items-baseline gap-2">
              <span className="text-3xl font-bold text-white tracking-tight">{loading ? '—' : mjBalance}</span>
              <span className="text-sm font-bold text-gray-500">MJ</span>
            </div>
            <p className="text-xs text-gray-600 font-medium mt-2">
              ≈ {jodEquivalent.toFixed(2)} JOD
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/wallet')}
            className="w-12 h-12 bg-white hover:bg-gray-200 rounded-sm flex items-center justify-center text-black transition-colors duration-200"
            aria-label={t.dashboard.wallet.title}
          >
            <Wallet className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* =========================================
          1.5 Quick Stats (Segmented Panel Layout)
          ========================================= */}
      <div className="premium-card w-full bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col sm:flex-row divide-y sm:divide-y-0 sm:divide-x sm:divide-gray-100 rtl:divide-x-reverse">
        {[
          { key: 'awaiting', label: t.dashboard.orders.awaitingPayment, icon: Clock, color: 'text-gray-900' },
          { key: 'paid', label: t.dashboard.orders.paid, icon: Zap, color: 'text-gray-900' },
          { key: 'completed', label: t.dashboard.status.completed, icon: CheckCircle2, color: 'text-gray-900' },
        ].map((chip) => (
          <button
            key={chip.key}
            onClick={() => navigate('/dashboard/orders')}
            className="flex-1 p-6 text-start flex items-start justify-between hover:bg-gray-50 transition-colors group"
          >
            <div>
              <p className="text-gray-400 text-[10px] font-bold uppercase tracking-[0.2em] mb-2">{chip.label}</p>
              <p className="text-3xl font-bold text-gray-900 tracking-tight">
                {ordersByStatus[chip.key]}
              </p>
            </div>
            <div className={`p-2 bg-gray-50 border border-gray-100 rounded-md group-hover:bg-white transition-colors ${chip.color}`}>
              <chip.icon className="w-4 h-4" />
            </div>
          </button>
        ))}
      </div>

      {/* =========================================
          2. Grid Layout (Orders & Widgets)
          ========================================= */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">

        {/* Recent Orders (Strict Table List Style) */}
        <div className="premium-card lg:col-span-2 bg-white border border-gray-200 rounded-lg shadow-sm flex flex-col">
          <div className="flex items-center justify-between p-6 border-b border-gray-100">
            <div className="flex items-center gap-3">
              <Activity className="w-5 h-5 text-gray-400" />
              <h3 className="text-lg font-bold text-gray-900">{t.dashboard.recentOrders}</h3>
            </div>
            <button
              onClick={() => navigate('/dashboard/orders')}
              className="text-xs font-bold text-gray-500 hover:text-gray-900 uppercase tracking-wider flex items-center gap-1 transition-colors"
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
              <p className="text-gray-400 font-medium text-sm">{t.dashboard.noOrdersWithStatus.replace('{filter}', t.dashboard.all)}</p>
            </div>
          ) : (
            <div className="flex flex-col flex-1 divide-y divide-gray-50">
              {recentOrders.map((order, i) => {
                const statusText = statusLabel(order.status, order.paymentStatus);
                const isDone = order.status === 'completed';
                const service = order.items?.map((it) => it.name).join(', ') || order.service || order.orderNumber;
                return (
                  <button
                    key={order._id || i}
                    onClick={() => navigate('/dashboard/orders')}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-6 hover:bg-gray-50 transition-colors gap-4 text-start group"
                  >
                    <div className="flex items-center gap-4 flex-1 min-w-0">
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm mb-1 truncate group-hover:text-blue-600 transition-colors">{service}</h4>
                        <div className="flex items-center gap-2 text-[11px] font-mono text-gray-500">
                          <span>{order.orderNumber}</span>
                          <span className="text-gray-300">/</span>
                          <span>{new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-US', { year: 'numeric', month: '2-digit', day: '2-digit' })}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 w-full sm:w-auto shrink-0">
                      <span className="font-bold text-gray-900 text-sm">{order.totalJOD ?? order.total} JOD</span>
                      <span className={`text-[9px] font-bold uppercase tracking-widest px-2 py-1 rounded-sm border ${isDone ? 'bg-green-50 border-green-200 text-green-700' : 'bg-gray-50 border-gray-200 text-gray-700'}`}>
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

          {/* Active Cart Widget (High Contrast / Dark Mode Vibe) */}
          <div
            onClick={() => navigate('/dashboard/cart')}
            className="premium-card bg-gray-900 border border-gray-800 rounded-lg p-6 text-white relative overflow-hidden group cursor-pointer flex flex-col min-h-[180px]"
          >
            <div className="flex items-start justify-between mb-auto">
              <div className="p-2 bg-gray-800 border border-gray-700 rounded-md">
                <ShoppingCart className="w-5 h-5 text-white" />
              </div>
              <div className="w-8 h-8 rounded-sm bg-white text-black flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                 <ArrowUpRight className="w-4 h-4 rtl:-scale-x-100" />
              </div>
            </div>
            
            <div className="mt-6">
              <h3 className="text-lg font-bold mb-1">{t.dashboard.activeCart}</h3>
              <p className="text-gray-400 text-xs font-medium">
                {lang === 'ar'
                  ? `يتوفر ${(user?.cart?.items?.length ?? 0)} عنصر بانتظار الدفع`
                  : `${(user?.cart?.items?.length ?? 0)} pending items`}
              </p>
            </div>
          </div>

          {/* Notifications Widget (Strict Design) */}
          <div className="premium-card bg-white border border-gray-200 rounded-lg flex flex-col min-h-[180px]">
            <div className="p-6 border-b border-gray-100 flex items-center justify-between">
              <h3 className="text-sm font-bold text-gray-900">{t.dashboard.notifications.title}</h3>
              <div className="relative">
                <Bell className="w-4 h-4 text-gray-400" />
                {unread > 0 && (
                  <span className="absolute -top-1 -right-1 w-2 h-2 bg-red-500 rounded-sm"></span>
                )}
              </div>
            </div>

            <div className="flex-1 flex flex-col justify-center p-6">
              {unread > 0 ? (
                <div className="flex items-start gap-3">
                  <div className="mt-0.5 p-1.5 bg-gray-100 rounded-sm"><MessageSquare className="w-4 h-4 text-gray-700" /></div>
                  <div>
                    <p className="text-sm font-bold text-gray-900 mb-0.5">
                      {lang === 'ar' ? 'تنبيهات النظام' : 'System Alerts'}
                    </p>
                    <p className="text-xs font-medium text-gray-500">
                      {lang === 'ar'
                        ? `يوجد ${unread} إشعار غير مقروء.`
                        : `${unread} unread notifications.`}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="text-xs text-gray-400 font-medium text-center">{t.dashboard.noNewMessages}</p>
              )}
            </div>

            <div className="p-4 border-t border-gray-100">
              <button
                onClick={() => navigate('/dashboard/notifications')}
                className="w-full py-2 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-md font-bold text-xs uppercase tracking-widest transition-colors"
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