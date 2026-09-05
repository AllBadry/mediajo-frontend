import React, { useRef, useState } from 'react';
import { ShoppingBag, CheckCircle2, Clock, Search, Filter, XCircle, ExternalLink, Package } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../context/LanguageContext';

// ==========================================
// Mock Data (بيانات وهمية للطلبات)
// ==========================================
const mockOrders = [
  { id: "ORD-992X", service: "10,000 Instagram Followers", status: "Processing", date: "Oct 24, 2026", price: 12.00, link: "https://instagram.com/user" },
  { id: "ORD-991A", service: "Netflix Premium (1 Month)", status: "Completed", date: "Oct 23, 2026", price: 4.50, link: "Account delivered in tickets" },
  { id: "ORD-988B", service: "500 TikTok Likes", status: "Completed", date: "Oct 12, 2026", price: 1.20, link: "https://tiktok.com/@user/video" },
  { id: "ORD-985C", service: "Website SEO Audit", status: "Canceled", date: "Oct 10, 2026", price: 25.00, link: "Refunded to wallet" },
  { id: "ORD-982D", service: "1000 YouTube Views", status: "Processing", date: "Oct 08, 2026", price: 3.50, link: "https://youtube.com/watch?v=..." },
];

export default function MyOrders() {
  const container = useRef();
  const { t } = useLanguage();
  const [filter, setFilter] = useState('All');

  const statusLabel = (status) => t.dashboard.status[status.toLowerCase()] || status;

  const statusFilters = ['All', 'Processing', 'Completed', 'Canceled'];

  const filteredOrders = filter === 'All' 
    ? mockOrders 
    : mockOrders.filter(o => o.status === filter);

  // أنيميشن GSAP عند تغيير الفلتر
  useGSAP(() => {
    gsap.fromTo(".order-item", 
      { y: 20, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: "power2.out" }
    );
  }, { scope: container, dependencies: [filter] });

  // دالة لاختيار الألوان والأيقونات حسب حالة الطلب
  const getStatusConfig = (status) => {
    switch(status) {
      case 'Completed': return { icon: <CheckCircle2 className="w-4 h-4"/>, color: 'text-emerald-600', bg: 'bg-emerald-50', border: 'border-emerald-100' };
      case 'Processing': return { icon: <Clock className="w-4 h-4"/>, color: 'text-blue-600', bg: 'bg-blue-50', border: 'border-blue-100' };
      case 'Canceled': return { icon: <XCircle className="w-4 h-4"/>, color: 'text-red-600', bg: 'bg-red-50', border: 'border-red-100' };
      default: return { icon: <Package className="w-4 h-4"/>, color: 'text-gray-600', bg: 'bg-gray-50', border: 'border-gray-100' };
    }
  };

  return (
    <div ref={container} className="w-full flex flex-col gap-6">
      
      {/* Header & Controls */}
      <div className="bg-white border border-gray-200 rounded-[2rem] p-6 md:p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 text-gray-900 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              {t.dashboard.orderHistory}
            </h2>
            <p className="text-gray-500 font-medium mt-2">{t.dashboard.orderHistorySub}</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input 
                type="text" 
                placeholder={t.dashboard.searchOrders} 
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                dir={t.dir}
              />
            </div>
            <button className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Custom Tabs (Filters) */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {statusFilters.map((status) => (
            <button
              key={status}
              onClick={() => setFilter(status)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                filter === status 
                  ? 'bg-gray-900 text-white shadow-md' 
                  : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {status === 'All' ? t.dashboard.all : statusLabel(status)}
            </button>
          ))}
        </div>
      </div>

      {/* Orders List */}
      <div className="flex flex-col gap-4">
        {filteredOrders.length > 0 ? (
          filteredOrders.map((order) => {
            const config = getStatusConfig(order.status);
            return (
              <div key={order.id} className="order-item bg-white border border-gray-200 rounded-[1.5rem] p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-gray-300 transition-all duration-300 flex flex-col md:flex-row md:items-center justify-between gap-6">
                
                {/* Service Details */}
                <div className="flex items-start gap-5">
                  <div className={`w-12 h-12 rounded-2xl flex items-center justify-center shrink-0 border ${config.bg} ${config.color} ${config.border}`}>
                    {config.icon}
                  </div>
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md font-mono">{order.id}</span>
                      <span className={`text-[10px] font-bold uppercase tracking-widest px-2 py-0.5 rounded-full ${config.bg} ${config.color}`}>
                        {statusLabel(order.status)}
                      </span>
                    </div>
                    <h4 className="font-black text-gray-900 text-lg mb-1">{order.service}</h4>
                    <p className="text-sm text-gray-500 font-medium">{t.dashboard.placedOn} {order.date}</p>
                  </div>
                </div>

                {/* Price & Action */}
                <div className="flex md:flex-col items-center md:items-end justify-between gap-4 border-t md:border-t-0 pt-4 md:pt-0 border-gray-100">
                  <div className="text-xl font-black text-gray-900">
                    {order.price.toFixed(2)} <span className="text-sm text-gray-400">JOD</span>
                  </div>
                  <button className="flex items-center gap-2 text-sm font-bold text-blue-600 hover:text-blue-700 bg-blue-50 hover:bg-blue-100 px-4 py-2 rounded-xl transition-colors">
                    {t.dashboard.viewDetails} <ExternalLink className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>

              </div>
            );
          })
        ) : (
          <div className="bg-white border border-gray-200 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center">
            <Package className="w-16 h-16 text-gray-300 mb-4" />
            <h3 className="text-xl font-black text-gray-900 mb-2">{t.dashboard.noOrdersFound}</h3>
            <p className="text-gray-500 font-medium max-w-sm">{t.dashboard.noOrdersWithStatus.replace('{filter}', filter === 'All' ? t.dashboard.all : statusLabel(filter))}</p>
          </div>
        )}
      </div>

    </div>
  );
}