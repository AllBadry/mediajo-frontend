import React, { useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, MessageSquare, 
  User, LogOut, Bell, ChevronRight, Zap, CheckCircle2, 
  Clock, CreditCard, Sparkles, AlertCircle
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

// ==========================================
// 1. Mock Data (بيانات وهمية للتجربة)
// ==========================================
const balance = 45.50;
const unreadMessages = 1;

const recentOrders = [
  { id: "ORD-992X", service: "10,000 Instagram Followers", status: "Processing", date: "Today", price: 12.00, color: "text-blue-500", bg: "bg-blue-50" },
  { id: "ORD-991A", service: "Netflix Premium (1 Month)", status: "Completed", date: "Yesterday", price: 4.50, color: "text-emerald-500", bg: "bg-emerald-50" },
  { id: "ORD-988B", service: "500 TikTok Likes", status: "Completed", date: "Oct 12", price: 1.20, color: "text-emerald-500", bg: "bg-emerald-50" },
];

export default function CustomerDashboard() {
  const container = useRef();
  const [activeTab, setActiveTab] = useState('overview'); // للتحكم في القائمة الجانبية
  const { user, logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const name = user?.name || 'User';

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  // ==========================================
  // GSAP Animations
  // ==========================================
  useGSAP(() => {
    // دخول القائمة الجانبية (Sidebar)
    gsap.from(".sidebar", { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" });
    
    // دخول الشريط العلوي (Topbar)
    gsap.from(".topbar", { y: -20, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out" });

    // ظهور كروت الـ Bento Grid بشكل متسلسل (Staggered Entry)
    gsap.from(".bento-card", {
      y: 40, 
      opacity: 0, 
      duration: 0.8, 
      stagger: 0.1, 
      ease: "back.out(1.2)",
      delay: 0.3
    });

    // حركة النبض الخفيفة لأيقونة الإشعارات
    gsap.to(".notification-dot", { scale: 1.5, opacity: 0, repeat: -1, duration: 1.5, ease: "sine.out" });

  }, { scope: container });

  return (
    <div ref={container} dir="ltr" className="flex h-screen bg-[#f6f8fa] font-sans overflow-hidden">
      
      {/* =========================================
          1. Sidebar (GitHub Universe Style)
          ========================================= */}
      <aside className="sidebar w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0 z-20">
        
        {/* Logo */}
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tight text-gray-900 group-hover:opacity-80">MediaJo</span>
            <div className="w-2 h-5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-sm skew-x-12"></div>
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">Menu</p>
          
          {[
            { id: 'overview', icon: <LayoutDashboard className="w-5 h-5" />, label: 'Overview' },
            { id: 'orders', icon: <ShoppingBag className="w-5 h-5" />, label: 'My Orders' },
            { id: 'cart', icon: <ShoppingCart className="w-5 h-5" />, label: 'Cart' },
            { id: 'messages', icon: <MessageSquare className="w-5 h-5" />, label: 'Support Tickets', badge: unreadMessages },
          ].map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                activeTab === item.id 
                  ? 'bg-gray-900 text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)]' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${activeTab === item.id ? 'bg-white/20 text-white' : 'bg-red-100 text-red-600'}`}>
                  {item.badge}
                </span>
              )}
            </button>
          ))}
        </nav>

        {/* Bottom Actions (Profile & Logout) */}
        <div className="p-4 border-t border-gray-100">
          <button className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-gray-100 text-gray-600 font-medium text-sm transition-colors">
            <User className="w-5 h-5" /> Profile Settings
          </button>
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-red-50 text-red-600 font-medium text-sm transition-colors mt-1">
            <LogOut className="w-5 h-5" /> {t.auth.signOut}
          </button>
        </div>
      </aside>

      {/* =========================================
          2. Main Content Area
          ========================================= */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto overflow-x-hidden">
        
        {/* Abstract Background Elements (Google I/O Vibe) */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-400/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        <div className="absolute top-[20%] left-[10%] w-[20vw] h-[20vw] bg-purple-400/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

        {/* Topbar */}
        <header className="topbar h-20 px-6 lg:px-10 flex items-center justify-between sticky top-0 bg-[#f6f8fa]/80 backdrop-blur-md z-10">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">Dashboard</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/products" className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-bold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm">
              <Sparkles className="w-4 h-4" /> New Order
            </Link>
            
            <button className="relative w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full z-10"></span>
              <span className="notification-dot absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* Dashboard Content (Bento Grid Layout) */}
        <div className="p-6 lg:p-10 max-w-[1400px] w-full mx-auto flex flex-col gap-6 pb-24">
          
          {/* Welcome Banner */}
          <div className="bento-card w-full bg-gray-900 rounded-[2rem] p-8 md:p-10 relative overflow-hidden flex flex-col md:flex-row items-start md:items-center justify-between gap-6 shadow-xl">
            {/* Shapes */}
            <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-bl from-blue-500/30 to-transparent rounded-full blur-3xl pointer-events-none"></div>
            
            <div className="relative z-10">
              <p className="text-blue-400 font-mono text-sm mb-2 flex items-center gap-2">
                <span className="w-2 h-2 bg-blue-400 rounded-full animate-pulse"></span> System Online
              </p>
              <h2 className="text-3xl md:text-4xl font-black text-white tracking-tight mb-2">
                Welcome back, {name}!
              </h2>
              <p className="text-gray-400 font-medium">Ready to boost your digital presence today?</p>
            </div>
            
            <div className="relative z-10 bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl p-6 flex items-center gap-6">
              <div>
                <p className="text-gray-400 text-xs font-bold uppercase tracking-widest mb-1">Wallet Balance</p>
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

          {/* Bento Grid: 3 Columns */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            
            {/* Col 1 & 2: Recent Orders */}
            <div className="bento-card md:col-span-2 bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col">
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center">
                    <ShoppingBag className="w-5 h-5" />
                  </div>
                  <h3 className="text-xl font-black text-gray-900">Recent Orders</h3>
                </div>
                <button className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1">
                  View All <ChevronRight className="w-4 h-4" />
                </button>
              </div>

              <div className="flex flex-col gap-4 flex-1">
                {recentOrders.map((order, i) => (
                  <div key={i} className="flex flex-col sm:flex-row sm:items-center justify-between p-4 rounded-2xl border border-gray-100 hover:border-gray-200 hover:bg-gray-50 transition-colors gap-4">
                    <div className="flex items-start sm:items-center gap-4">
                      <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${order.bg} ${order.color}`}>
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
                      <span className={`text-[10px] font-bold uppercase tracking-widest ${order.color}`}>
                        {order.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Col 3: Side Widgets */}
            <div className="flex flex-col gap-6">
              
              {/* Quick Cart / Active Order */}
              <div className="bento-card bg-gradient-to-br from-blue-600 to-indigo-700 rounded-[2rem] p-8 text-white shadow-lg relative overflow-hidden group">
                <div className="absolute -top-10 -right-10 w-32 h-32 bg-white/10 rounded-full blur-2xl group-hover:bg-white/20 transition-colors"></div>
                <div className="flex items-center gap-3 mb-6 relative z-10">
                  <Zap className="w-6 h-6 text-yellow-300" />
                  <h3 className="text-xl font-black">Active Cart</h3>
                </div>
                <p className="text-blue-100 text-sm font-medium leading-relaxed mb-6 relative z-10">
                  You have <span className="font-black text-white">1</span> item waiting in your cart. Checkout now to start processing.
                </p>
                <button className="w-full bg-white text-blue-700 py-3 rounded-xl font-bold text-sm hover:scale-[1.02] transition-transform relative z-10 flex items-center justify-center gap-2">
                  <ShoppingCart className="w-4 h-4" /> Go to Checkout
                </button>
              </div>

              {/* Support / Messages */}
              <div className="bento-card bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)] flex flex-col justify-center">
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-orange-50 text-orange-500 rounded-xl flex items-center justify-center">
                      <MessageSquare className="w-5 h-5" />
                    </div>
                    <h3 className="text-xl font-black text-gray-900">Support</h3>
                  </div>
                  {unreadMessages > 0 && (
                    <span className="w-6 h-6 bg-red-500 text-white text-xs font-bold flex items-center justify-center rounded-full">
                      {unreadMessages}
                    </span>
                  )}
                </div>
                
                {unreadMessages > 0 ? (
                  <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 flex gap-3">
                    <AlertCircle className="w-5 h-5 text-orange-500 shrink-0" />
                    <div>
                      <h4 className="text-sm font-bold text-gray-900">New reply on Ticket #441</h4>
                      <p className="text-xs text-gray-500 mt-1">"Your Netflix account is ready..."</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-gray-500 font-medium">No new messages. Need help with an order?</p>
                )}
                
                <button className="w-full mt-4 py-2.5 bg-gray-50 hover:bg-gray-100 border border-gray-200 text-gray-700 rounded-xl font-bold text-sm transition-colors">
                  Open New Ticket
                </button>
              </div>

            </div>
          </div>

        </div>
      </main>

    </div>
  );
}