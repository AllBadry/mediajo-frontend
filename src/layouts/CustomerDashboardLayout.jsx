import React, { useRef } from 'react';
import { NavLink, useNavigate, Outlet } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, MessageSquare, 
  User, LogOut, Wallet, BellRing
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import TicketSoundWatcher from '../components/dashboard/TicketSoundWatcher';
import { useTicketStore } from '../store/ticketStore';

export default function CustomerDashboardLayout() {
  const container = useRef();
  const { logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  // GSAP Animations (Snappy, Expo Easing for Tech Vibe)
  useGSAP(() => {
    gsap.from(".sidebar", { x: -50, opacity: 0, duration: 0.8, delay: 0.1, ease: "expo.out" });
  }, { scope: container });

  const unseenTickets = useTicketStore((s) => s.unseen);

  const menuItems = [
    { id: 'overview', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: t.dashboard.overview },
    { id: 'orders', path: '/dashboard/orders', icon: <ShoppingBag className="w-5 h-5" />, label: t.dashboard.myOrders },
    { id: 'wallet', path: '/dashboard/wallet', icon: <Wallet className="w-5 h-5" />, label: t.dashboard.wallet.title },
    { id: 'cart', path: '/dashboard/cart', icon: <ShoppingCart className="w-5 h-5" />, label: t.dashboard.cart },
    { id: 'tickets', path: '/dashboard/tickets', icon: <MessageSquare className="w-5 h-5" />, label: t.dashboard.supportTickets, badge: unseenTickets },
    { id: 'notifications', path: '/dashboard/notifications', icon: <BellRing className="w-5 h-5" />, label: t.dashboard.notifications.title },
  ];

  return (
    <div ref={container} dir={t.dir} className="min-h-screen bg-[#f8f9fa] font-sans text-gray-900 flex flex-col selection:bg-blue-600 selection:text-white">
      
      {/* TicketSoundWatcher (يراقب تذاكر الدعم ويشغّل صوت التنبيه) */}
      <TicketSoundWatcher />

      {/* Background Tech Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50" 
           style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* =========================================
          Main Layout (Sidebar + Content)
          ========================================= */}
      <div className="flex flex-1 relative z-10 max-w-[1920px] mx-auto w-full">
        
        {/* Sidebar (Under Site Navbar, Strict Geometric Style) */}
        <aside className="sidebar w-64 bg-white border-r-2 border-gray-200 hidden md:flex flex-col sticky top-[76px] h-[calc(100vh-76px)] shrink-0">
          
          <nav className="flex-1 px-4 py-8 flex flex-col gap-1 overflow-y-auto">
            <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">{t.dashboard.menu}</p>
            
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) => `flex items-center justify-between px-4 py-3 transition-all duration-200 font-bold text-sm ${
                  isActive 
                    ? 'bg-gray-100 text-gray-900 border-l-4 border-blue-600 rtl:border-l-0 rtl:border-r-4' 
                    : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent rtl:border-l-0 rtl:border-r-4'
                }`}
              >
                <div className="flex items-center gap-3">
                  {item.icon}
                  <span className="tracking-tight uppercase">{item.label}</span>
                </div>
                {item.badge > 0 && (
                  <span className="px-2 py-0.5 text-[10px] font-black bg-red-600 text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,0.1)]">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
          </nav>

          <div className="p-4 border-t-2 border-gray-200 bg-gray-50">
            <NavLink 
              to="/dashboard/profile" 
              className={({ isActive }) => `flex items-center gap-3 px-4 py-3 w-full text-left transition-colors font-bold text-sm mb-1 uppercase tracking-tight ${isActive ? 'bg-gray-200 text-gray-900 border-l-4 border-gray-900 rtl:border-l-0 rtl:border-r-4' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900 border-l-4 border-transparent rtl:border-l-0 rtl:border-r-4'}`}
            >
              <User className="w-4 h-4" /> {t.dashboard.profileSettings}
            </NavLink>
            <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-red-50 text-gray-500 hover:text-red-600 font-bold text-sm transition-colors uppercase tracking-tight border-l-4 border-transparent rtl:border-l-0 rtl:border-r-4">
              <LogOut className="w-4 h-4" /> {t.auth.signOut}
            </button>
          </div>
        </aside>

        {/* Page Content Wrapper */}
        <main className="flex-1 min-w-0 flex flex-col relative">

          {/* شريط تنقل الجوال (Horizontal Scroll Tabs) — يظهر تحت الـ md فقط */}
          <nav className="md:hidden sticky top-[76px] z-30 bg-white/95 backdrop-blur border-b border-gray-100 px-3 py-2.5 flex gap-2 overflow-x-auto scrollbar-hide">
            {menuItems.map((item) => (
              <NavLink
                key={item.id}
                to={item.path}
                end={item.path === '/dashboard'}
                className={({ isActive }) => `flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                  isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                }`}
              >
                {item.icon}
                {item.label}
                {item.badge > 0 && (
                  <span className="w-4 h-4 rounded-full bg-red-500 text-white text-[10px] flex items-center justify-center font-black">
                    {item.badge}
                  </span>
                )}
              </NavLink>
            ))}
            <NavLink
              to="/dashboard/profile"
              className={({ isActive }) => `flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap transition-colors shrink-0 ${
                isActive ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
              }`}
            >
              <User className="w-4 h-4" /> {t.dashboard.profileSettings}
            </NavLink>
            <button
              onClick={handleSignOut}
              className="flex items-center gap-1.5 px-3.5 py-2 rounded-full text-xs font-bold whitespace-nowrap shrink-0 bg-red-50 text-red-600 hover:bg-red-100 transition-colors"
            >
              <LogOut className="w-4 h-4" /> {t.auth.signOut}
            </button>
          </nav>

          <div className="p-6 lg:p-10 w-full flex flex-col gap-6 pb-24">
            <Outlet /> 
          </div>
        </main>
        
      </div>
    </div>
  );
}