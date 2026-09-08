import React, { useRef, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import {
  ShoppingBag, ChevronRight, CheckCircle2, Clock, Zap,
  ShoppingCart, MessageSquare, Bell, Wallet, Loader2
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../api/client';

// ==========================================
// نظرة عامة (Overview) ببيانات حقيقية من السيرفر
// ==========================================
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
      } catch {
        /* تجاهل الأخطاء — تبقى القيم الافتراضية */
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  // ==========================================
  // GSAP Animations
  // ==========================================
  useGSAP(() => {
    gsap.fromTo(".bento-card",
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.8, stagger: 0.1, ease: "back.out(1.2)" }
    );
  }, { scope: container });

  const recentOrders = orders.slice(-4).reverse();

  return (
    <div ref={container} className="flex flex-col gap-6 w-full">

      {/* =========================================
          1. Welcome Banner & Wallet
          ========================================= */}
      <div className="bento-card w-full bg-gray-900 rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
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
            <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">{t.dashboard.wallet.title}</p>
            <div className="flex items-baseline gap-1">
              <span className="text-3xl font-black text-white">{loading ? '—' : mjBalance}</span>
              <span className="text-sm font-bold text-gray-400">MJ</span>
            </div>
            <p className="text-[11px] text-gray-400 font-medium mt-1">
              ≈ {lang === 'ar' ? 'ما يعادل' : '≈'}{' '}{jodEquivalent} JOD
            </p>
          </div>
          <button
            onClick={() => navigate('/dashboard/wallet')}
            className="w-12 h-12 bg-white rounded-full flex items-center justify-center text-gray-900 hover:scale-110 transition-transform"
            aria-label={t.dashboard.wallet.title}
          >
            <Wallet className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* =========================================
         1.5 ملخص طلباتك السريع (من بيانات حقيقية)
          ========================================= */}
      <div className="grid grid-cols-3 gap-6">
        {[
          { key: 'awaiting', label: t.dashboard.orders.awaitingPayment },
          { key: 'paid', label: t.dashboard.orders.paid },
          { key: 'completed', label: t.dashboard.status.completed },
        ].map((chip) => (
          <button
            key={chip.key}
            onClick={() => navigate('/dashboard/orders')}
            className={`bento-card rounded-[1.5rem] p-5 text-start flex items-center justify-between shadow-sm transition-transform hover:scale-[1.02] ${
              chip.key === 'paid'
                ? 'bg-gradient-to-br from-blue-600 to-indigo-700 text-white'
                : 'bg-white border border-gray-200 text-gray-900'
            }`}
          >
            <div>
              <p className={`text-2xl font-black ${chip.key === 'paid' ? 'text-white' : 'text-gray-900'}`}>
                {ordersByStatus[chip.key]}
              </p>
              <p className={`text-xs font-bold ${chip.key === 'paid' ? 'text-blue-100' : 'text-gray-500'}`}>{chip.label}</p>
            </div>
            {chip.key === 'paid' && <Zap className="w-5 h-5 text-yellow-300" />}
            {chip.key === 'completed' && <CheckCircle2 className="w-5 h-5 text-emerald-500" />}
            {chip.key === 'awaiting' && <Clock className="w-5 h-5 text-amber-500" />}
          </button>
        ))}
      </div>

      {/* =========================================
          2. Bento Grid: 3 Columns Layout
          ========================================= */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">

        {/* العمود الأول والثاني: أحدث الطلبات الحقيقية */}
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

          {loading ? (
            <div className="flex-1 flex items-center justify-center py-16 text-gray-400">
              <Loader2 className="w-7 h-7 animate-spin text-blue-500" />
            </div>
          ) : recentOrders.length === 0 ? (
            <p className="text-sm text-gray-500 font-medium py-12 text-center">{t.dashboard.noOrdersWithStatus.replace('{filter}', t.dashboard.all)}</p>
          ) : (
            <div className="flex flex-col gap-4 flex-1">
              {recentOrders.map((order, i) => {
                const statusText = statusLabel(order.status, order.paymentStatus);
                const isDone = order.status === 'completed';
                const service = order.items?.map((it) => it.name).join(', ') || order.service || order.orderNumber;
                return (
                  <button
                    key={order._id || i}
                    onClick={() => navigate('/dashboard/orders')}
                    className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors gap-4 text-start"
                  >
                    <div className="flex items-start sm:items-center gap-4 flex-1 min-w-0">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${isDone ? 'bg-emerald-50 text-emerald-500' : 'bg-blue-50 text-blue-500'}`}>
                        {isDone ? <CheckCircle2 className="w-5 h-5" /> : <Clock className="w-5 h-5" />}
                      </div>
                      <div className="min-w-0">
                        <h4 className="font-bold text-gray-900 text-sm mb-1 truncate">{service}</h4>
                        <div className="flex items-center gap-3 text-xs font-mono text-gray-500">
                          <span>{order.orderNumber}</span>
                          <span>•</span>
                          <span>{t.dashboard.placedOn}{new Date(order.createdAt).toLocaleDateString(lang === 'ar' ? 'ar-JO' : 'en-US')}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex sm:flex-col items-center sm:items-end justify-between sm:justify-center gap-1 w-full sm:w-auto mt-2 sm:mt-0 shrink-0">
                      <span className="font-black text-gray-900">{order.totalJOD ?? order.total} JOD</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${isDone ? 'text-emerald-500' : 'text-blue-500'}`}>
                        {statusText}
                      </span>
                    </div>
                  </button>
                );
              })}
            </div>
          )}
        </div>

        {/* العمود الثالث: الويدجت الجانبية (السلة والإشعارات) */}
        <div className="flex flex-col gap-6">

          {/* Active Cart Widget */}
          <div
            onClick={() => navigate('/dashboard/cart')}
            className="bento-card bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden group cursor-pointer"
          >
            <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
            <div className="flex items-center gap-3 mb-6 relative z-10">
              <ShoppingCart className="w-6 h-6 text-yellow-300" />
              <h3 className="text-xl font-black">{t.dashboard.activeCart}</h3>
            </div>
            <p className="text-blue-100 text-sm font-medium leading-relaxed mb-6 relative z-10">
              {lang === 'ar'
                ? `لديك ${(user?.cart?.items?.length ?? 0)} عناصر في انتظارك في السلة.`
                : `You have ${(user?.cart?.items?.length ?? 0)} items waiting in your cart.`}
            </p>
            <button className="w-full bg-white text-blue-700 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform relative z-10 flex items-center justify-center gap-2">
              <Zap className="w-4 h-4" /> {t.dashboard.goToCheckout}
            </button>
          </div>

          {/* Notifications Widget */}
          <div className="bento-card bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-center">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                  <Bell className="w-5 h-5" />
                </div>
                <h3 className="text-xl font-black text-gray-900">{t.dashboard.notifications.title}</h3>
                {unread > 0 && (
                  <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-2 py-0.5 min-w-[18px] text-center">{unread}</span>
                )}
              </div>
            </div>

            {unread > 0 ? (
              <div className="bg-blue-50/60 border border-blue-100 rounded-xl p-4 flex gap-3">
                <MessageSquare className="w-5 h-5 text-blue-500 shrink-0" />
                <p className="text-sm font-bold text-gray-900">
                  {lang === 'ar'
                    ? `لديك ${unread} إشعارات غير مقروءة`
                    : `You have ${unread} unread notifications`}
                </p>
              </div>
            ) : (
              <p className="text-sm text-gray-500 font-medium">{t.dashboard.noNewMessages}</p>
            )}

            <button
              onClick={() => navigate('/dashboard/notifications')}
              className="w-full mt-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors"
            >
              {t.dashboard.viewAll}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}