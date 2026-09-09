import React, { useRef } from 'react';
import { NavLink, Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, MessageSquare, 
  User, LogOut, Sparkles, Wallet, BellRing, ChevronRight
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import NotificationBell from '../components/dashboard/NotificationBell';
import TicketSoundWatcher from '../components/dashboard/TicketSoundWatcher';
import { useTicketStore } from '../store/ticketStore';

export default function CustomerDashboardLayout() {
  const container = useRef();
  const { logout } = useAuth();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const handleSignOut = () => {
    logout();
    navigate('/');
  };

  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('orders')) return t.dashboard.myOrders;
    if (path.includes('wallet')) return t.dashboard.wallet.title;
    if (path.includes('cart')) return t.dashboard.yourCart;
    if (path.includes('tickets')) return t.dashboard.supportTickets;
    if (path.includes('profile')) return t.dashboard.profileSettings;
    if (path.includes('notifications')) return t.dashboard.notifications.title;
    return t.dashboard.dashboardOverview;
  };

  // GSAP Animations (Snappy, Expo Easing for Tech Vibe)
  useGSAP(() => {
    gsap.from(".sidebar", { x: -50, opacity: 0, duration: 0.7, ease: "expo.out" });
    gsap.from(".topbar", { y: -20, opacity: 0, duration: 0.7, delay: 0.1, ease: "expo.out" });
  }, { scope: container });

  const unseenTickets = useTicketStore((s) => s.unseen);

  const menuItems = [
    { id: 'overview', path: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" />, label: t.dashboard.overview },
    { id: 'orders', path: '/dashboard/orders', icon: <ShoppingBag className="w-4 h-4" />, label: t.dashboard.myOrders },
    { id: 'wallet', path: '/dashboard/wallet', icon: <Wallet className="w-4 h-4" />, label: t.dashboard.wallet.title },
    { id: 'cart', path: '/dashboard/cart', icon: <ShoppingCart className="w-4 h-4" />, label: t.dashboard.cart },
    { id: 'tickets', path: '/dashboard/tickets', icon: <MessageSquare className="w-4 h-4" />, label: t.dashboard.supportTickets, badge: unseenTickets },
    { id: 'notifications', path: '/dashboard/notifications', icon: <BellRing className="w-4 h-4" />, label: t.dashboard.notifications.title },
  ];

  return (
    <div ref={container} dir={t.dir} className="flex min-h-screen bg-[#F5F5F7] font-sans text-gray-900 selection:bg-blue-600 selection:text-white">
      
      {/* Background Tech Grid (GitHub Universe / Google I/O style) */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-40" 
           style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* =========================================
          1. Sidebar (Strict & Geometric)
          ========================================= */}
      <aside className="sidebar w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex md:sticky md:top-0 md:h-screen shrink-0 z-20 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="h-20 flex items-center px-8 border-b border-gray-200 bg-gray-50/50">
          <Link to="/" className="flex items-center gap-2 group w-full">
            <span className="text-xl font-black tracking-tighter text-gray-900 uppercase">MediaJo</span>
            {/* Suprematic geometric accent */}
            <div className="flex gap-0.5 ml-auto rtl:ml-0 rtl:mr-auto">
              <div className="w-2 h-4 bg-blue-600"></div>
              <div className="w-2 h-4 bg-emerald-500"></div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 flex flex-col gap-1">
          <p className="px-4 text-[10px] font-bold text-gray-400 uppercase tracking-[0.2em] mb-4">{t.dashboard.menu}</p>
          
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `flex items-center justify-between px-4 py-2.5 transition-all duration-200 font-bold text-sm ${
                isActive 
                  ? 'bg-gray-100 text-gray-900 border-l-4 border-blue-600 rtl:border-l-0 rtl:border-r-4' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900 border-l-4 border-transparent rtl:border-l-0 rtl:border-r-4'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="tracking-tight">{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="px-1.5 py-0.5 text-[10px] font-black bg-red-600 text-white shadow-sm">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-200 bg-gray-50">
          <NavLink 
            to="/dashboard/profile" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 w-full text-left transition-colors font-bold text-sm mb-1 ${isActive ? 'bg-gray-200 text-gray-900' : 'text-gray-500 hover:bg-gray-200 hover:text-gray-900'}`}
          >
            <User className="w-4 h-4" /> {t.dashboard.profileSettings}
          </NavLink>
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 w-full text-left hover:bg-red-50 text-gray-500 hover:text-red-600 font-bold text-sm transition-colors">
            <LogOut className="w-4 h-4" /> {t.auth.signOut}
          </button>
        </div>
      </aside>

      {/* =========================================
          2. Main Content Area
          ========================================= */}
      <main className="flex-1 min-w-0 flex flex-col relative z-10">
        
        {/* Topbar (Strict Borders) */}
        <header className="topbar h-20 px-6 lg:px-10 flex items-center justify-between sticky top-0 bg-white/90 backdrop-blur-md border-b border-gray-200 z-30">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-gray-400 text-xs font-mono uppercase tracking-widest">
              <span>Terminal</span>
              <ChevronRight className="w-3 h-3 rtl:rotate-180" />
            </div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight uppercase">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/products" className="hidden sm:flex items-center gap-2 bg-gray-900 text-white border border-gray-900 px-4 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-colors">
              <Sparkles className="w-3 h-3" /> {t.dashboard.newOrder}
            </Link>
            
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-4">
              <NotificationBell className="text-gray-600 hover:text-gray-900" />
              <TicketSoundWatcher />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-10 max-w-[1400px] w-full mx-auto flex flex-col gap-6 pb-24">
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}