import React, { useEffect, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Loader2, ArrowUpRight, Trash2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../api/client';

// صفحة الإشعارات الكاملة داخل لوحة تحكم العميل (عربية / إنجليزية)
export default function Notifications() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const n = t.dashboard.notifications;

  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(true);
  const [marking, setMarking] = useState(false);

  const loc = (item, field) => {
    if (lang === 'ar') return item[field] || item[field + 'En'] || '';
    return item[field + 'En'] || item[field] || '';
  };

  const fetchAll = useCallback(async () => {
    setLoading(true);
    try {
      const { data } = await api.get('/api/notifications');
      setItems(data?.data?.notifications || []);
      setUnread(data?.data?.unreadCount || 0);
    } catch {
      setItems([]);
      setUnread(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchAll();
  }, [fetchAll]);

  const markAllRead = async () => {
    setMarking(true);
    try {
      await api.put('/api/notifications/read-all');
      setItems((prev) => prev.map((it) => ({ ...it, read: true })));
      setUnread(0);
    } catch { /* تجاهل */ } finally {
      setMarking(false);
    }
  };

  const openNotification = async (item) => {
    if (!item.read) {
      try {
        await api.put(`/api/notifications/${item._id}/read`);
        setItems((prev) => prev.map((it) => (it._id === item._id ? { ...it, read: true } : it)));
        setUnread((u) => Math.max(0, u - 1));
      } catch { /* تجاهل */ }
    }
    if (item.link) navigate(item.link);
  };

  const relative = (iso) => {
    const diff = Date.now() - new Date(iso).getTime();
    const min = Math.floor(diff / 60000);
    if (min < 1) return n.justNow;
    if (min < 60) return n.minAgo.replace('{m}', min);
    const h = Math.floor(min / 60);
    if (h < 24) return n.hourAgo.replace('{h}', h);
    return n.dayAgo.replace('{d}', Math.floor(h / 24));
  };

  const typeLabel = (type) => {
    const map = {
      order: lang === 'ar' ? 'طلب' : 'Order',
      charge: lang === 'ar' ? 'شحن رصيد' : 'Top-up',
      profile: lang === 'ar' ? 'ملف شخصي' : 'Profile',
      general: lang === 'ar' ? 'عام' : 'General',
    };
    return map[type] || map.general;
  };

  if (loading) {
    return (
      <div className="flex-1 flex flex-col items-center justify-center py-24 text-gray-400">
        <Loader2 className="w-8 h-8 animate-spin mb-3 text-blue-500" />
        <p className="text-sm font-bold">{n.loading}</p>
      </div>
    );
  }

  return (
    <div className="w-full max-w-3xl mx-auto">
      {/* الرأس: عدد غير المقروء + تعليم الكل مقروء */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2 text-sm text-gray-500 font-bold">
          <span className="w-9 h-9 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center">
            <Bell className="w-4 h-4" />
          </span>
          {unread > 0
            ? lang === 'ar'
              ? `لديك ${unread} إشعار غير مقروء`
              : `You have ${unread} unread notification${unread > 1 ? 's' : ''}`
            : lang === 'ar'
            ? 'جميع الإشعارات مقروءة'
            : 'All caught up'}
        </div>
        {unread > 0 && (
          <button
            onClick={markAllRead}
            disabled={marking}
            className="flex items-center gap-1.5 text-xs font-bold text-blue-600 hover:text-blue-500 disabled:opacity-50 transition-colors"
          >
            {marking ? <Loader2 className="w-3.5 h-3.5 animate-spin" /> : <CheckCheck className="w-3.5 h-3.5" />}
            {n.markAllRead}
          </button>
        )}
      </div>

      {/* قائمة الإشعارات */}
      {items.length === 0 ? (
        <div className="bg-white rounded-2xl border border-gray-100 px-6 py-20 flex flex-col items-center text-center shadow-sm">
          <div className="w-16 h-16 bg-gray-50 rounded-full flex items-center justify-center mb-4">
            <Bell className="w-7 h-7 text-gray-300" />
          </div>
          <p className="text-base font-black text-gray-800">{n.empty}</p>
          <p className="text-sm text-gray-400 font-medium mt-1.5 max-w-xs">{n.emptySub}</p>
        </div>
      ) : (
        <div className="bg-white rounded-2xl border border-gray-100 divide-y divide-gray-50 shadow-sm overflow-hidden">
          {items.map((item) => (
            <button
              key={item._id}
              onClick={() => openNotification(item)}
              className={`w-full text-start px-5 py-4 transition-colors flex items-start gap-3.5 ${
                item.read ? 'hover:bg-gray-50' : 'bg-blue-50/40 hover:bg-blue-50'
              }`}
            >
              <span className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${
                item.read ? 'bg-gray-100 text-gray-400' : 'bg-blue-100 text-blue-600'
              }`}>
                <Bell className="w-4.5 h-4.5" />
              </span>
              <span className="flex-1 min-w-0">
                <span className="flex items-center gap-2">
                  <span className="text-xs font-black uppercase tracking-wide text-gray-400">{typeLabel(item.type)}</span>
                  {!item.read && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></span>}
                </span>
                <span className={`block text-sm font-black mt-0.5 ${item.read ? 'text-gray-700' : 'text-gray-900'}`}>
                  {loc(item, 'title')}
                </span>
                {loc(item, 'body') && (
                  <span className="block text-sm text-gray-500 font-medium mt-1 leading-relaxed break-words">{loc(item, 'body')}</span>
                )}
                <span className="block text-[11px] text-gray-400 font-medium mt-2">{relative(item.createdAt)}</span>
              </span>
              {item.link && (
                <span className="mt-1 text-gray-300 shrink-0">
                  <ArrowUpRight className="w-4 h-4" />
                </span>
              )}
            </button>
          ))}
        </div>
      )}
    </div>
  );
}