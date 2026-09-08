import React, { useEffect, useRef, useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { Bell, CheckCheck, Loader2 } from 'lucide-react';
import { useLanguage } from '../../context/LanguageContext';
import api from '../../api/client';

// جرّس الإشعارات داخل لوحة تحكم العميل
export default function NotificationBell() {
  const navigate = useNavigate();
  const { t, lang } = useLanguage();
  const n = t.dashboard.notifications;

  const loc = (item, field) => {
    if (lang === 'ar') return item[field] || item[field + 'En'] || '';
    return item[field + 'En'] || item[field] || '';
  };

  const [open, setOpen] = useState(false);
  const [items, setItems] = useState([]);
  const [unread, setUnread] = useState(0);
  const [loading, setLoading] = useState(false);
  const wrapRef = useRef(null);

  const fetchAll = useCallback(async () => {
    try {
      const { data } = await api.get('/api/notifications');
      setItems(data?.data?.notifications || []);
      setUnread(data?.data?.unreadCount || 0);
    } catch {
      /* تجاهل أخطاء الجلب (عند انقطاع الاتصال) */
    }
  }, []);

  useEffect(() => {
    fetchAll();
    const interval = setInterval(fetchAll, 30000);
    return () => clearInterval(interval);
  }, [fetchAll]);

  // إغلاق القائمة عند الضغط في أي مكان خارجها
  useEffect(() => {
    const onClickAway = (e) => {
      if (wrapRef.current && !wrapRef.current.contains(e.target)) setOpen(false);
    };
    document.addEventListener('mousedown', onClickAway);
    return () => document.removeEventListener('mousedown', onClickAway);
  }, []);

  const markAllRead = async () => {
    setLoading(true);
    try {
      await api.put('/api/notifications/read-all');
      setItems((prev) => prev.map((it) => ({ ...it, read: true })));
      setUnread(0);
    } catch {
      /* تجاهل */
    } finally {
      setLoading(false);
    }
  };

  const openNotification = async (item) => {
    if (!item.read) {
      try {
        await api.put(`/api/notifications/${item._id}/read`);
        setItems((prev) => prev.map((it) => (it._id === item._id ? { ...it, read: true } : it)));
        setUnread((u) => Math.max(0, u - 1));
      } catch {
        /* تجاهل */
      }
    }
    setOpen(false);
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

  return (
    <div ref={wrapRef} className="relative">
      <button
        onClick={() => setOpen((v) => !v)}
        className={`relative w-10 h-10 bg-white border rounded-full flex items-center justify-center transition-colors shadow-sm ${
          open ? 'text-blue-600 border-blue-300' : 'border-gray-200 text-gray-500 hover:text-gray-900'
        }`}
        aria-label={n.title}
      >
        <Bell className="w-5 h-5" />
        {unread > 0 && (
          <span className="absolute -top-1 -right-1 min-w-[18px] h-[18px] px-1 bg-red-500 text-white rounded-full text-[10px] font-bold flex items-center justify-center">
            {unread > 99 ? '99+' : unread}
          </span>
        )}
      </button>

      {open && (
        <div
          dir={t.dir}
          className="absolute top-12 right-0 rtl:right-auto rtl:left-0 w-[340px] max-w-[86vw] bg-white rounded-2xl shadow-[0_20px_60px_rgba(0,0,0,0.15)] border border-gray-100 overflow-hidden z-50"
        >
          <div className="flex items-center justify-between px-4 py-3 border-b border-gray-100">
            <span className="font-black text-sm text-gray-900 flex items-center gap-2">
              <Bell className="w-4 h-4 text-blue-600" /> {n.title}
              {unread > 0 && (
                <span className="bg-red-500 text-white text-[10px] font-bold rounded-full px-1.5 py-0.5 min-w-[18px] text-center">{unread}</span>
              )}
            </span>
            {unread > 0 && (
              <button
                onClick={markAllRead}
                disabled={loading}
                className="flex items-center gap-1 text-[11px] font-bold text-blue-600 hover:text-blue-500 disabled:opacity-50"
              >
                {loading ? <Loader2 className="w-3 h-3 animate-spin" /> : <CheckCheck className="w-3 h-3" />}
                {n.markAllRead}
              </button>
            )}
          </div>

          <div className="max-h-[380px] overflow-y-auto">
            {items.length === 0 ? (
              <div className="px-6 py-12 flex flex-col items-center text-center">
                <div className="w-12 h-12 bg-gray-50 rounded-full flex items-center justify-center mb-3">
                  <Bell className="w-5 h-5 text-gray-300" />
                </div>
                <p className="text-sm font-bold text-gray-700">{n.empty}</p>
                <p className="text-xs text-gray-400 font-medium mt-1">{n.emptySub}</p>
              </div>
            ) : (
              items.map((item) => (
                <button
                  key={item._id}
                  onClick={() => openNotification(item)}
                  className={`w-full text-right rtl:text-right text-left ltr:text-left px-4 py-3 border-b border-gray-50 hover:bg-gray-50 transition-colors flex items-start gap-3 ${
                    item.read ? 'opacity-60' : ''
                  }`}
                >
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      {!item.read && <span className="w-2 h-2 bg-blue-500 rounded-full shrink-0"></span>}
                      <span className="font-bold text-sm text-gray-900 truncate">{loc(item, 'title')}</span>
                    </div>
                    {loc(item, 'body') && <p className="text-xs text-gray-500 font-medium mt-0.5 leading-relaxed break-words">{loc(item, 'body')}</p>}
                    <span className="text-[10px] text-gray-400 font-medium mt-1 block">{relative(item.createdAt)}</span>
                  </div>
                </button>
              ))
            )}
          </div>

          <div className="border-t border-gray-100 px-4 py-2.5">
            <button
              onClick={() => { setOpen(false); navigate('/dashboard/notifications'); }}
              className="w-full text-center text-xs font-bold text-blue-600 hover:text-blue-500 py-1"
            >
              {n.viewAll}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}