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
    gsap.from(".topbar", { y: -100, opacity: 0, duration: 0.8, ease: "expo.out" });
    gsap.from(".sidebar", { x: -50, opacity: 0, duration: 0.8, delay: 0.2, ease: "expo.out" });
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
      
      {/* Background Tech Grid */}
      <div className="fixed inset-0 z-0 pointer-events-none opacity-50" 
           style={{ backgroundImage: 'radial-gradient(#d1d5db 1px, transparent 1px)', backgroundSize: '24px 24px' }}>
      </div>

      {/* =========================================
          1. Top Navbar (Full Width - Contains Logo)
          ========================================= */}
      <header className="topbar h-20 w-full bg-white border-b-2 border-gray-200 sticky top-0 z-40 flex items-center justify-between px-6 lg:px-10 shadow-sm">
        <div className="flex items-center gap-6 lg:gap-10">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-black tracking-tighter text-gray-900 uppercase group-hover:text-blue-600 transition-colors">MediaJo</span>
            <div className="flex gap-0.5 ml-1">
              <div className="w-2.5 h-5 bg-blue-600"></div>
              <div className="w-2.5 h-5 bg-emerald-500"></div>
            </div>
          </Link>

          {/* Page Title & Breadcrumb (Separated by strict border) */}
          <div className="hidden md:flex items-center gap-3 border-l-2 border-gray-200 pl-6 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-6">
            <div className="flex items-center gap-2 text-gray-400 text-[10px] font-bold font-mono uppercase tracking-[0.2em]">
              <span>System</span>
              <ChevronRight className="w-3 h-3 rtl:rotate-180" />
            </div>
            <h1 className="text-xl font-black text-gray-900 tracking-tight uppercase">{getPageTitle()}</h1>
          </div>
        </div>
        
        {/* Actions (Right Side) */}
        <div className="flex items-center gap-5">
          <Link 
            to="/products" 
            className="hidden sm:flex items-center gap-2 bg-gray-900 text-white border-2 border-gray-900 px-5 py-2 text-xs font-bold uppercase tracking-wider hover:bg-white hover:text-gray-900 transition-colors shadow-[2px_2px_0px_0px_#d1d5db]"
          >
            <Sparkles className="w-4 h-4" /> {t.dashboard.newOrder}
          </Link>
          
          <div className="flex items-center gap-4 border-l-2 border-gray-200 pl-5 rtl:border-l-0 rtl:border-r-2 rtl:pl-0 rtl:pr-5">
            <NotificationBell className="text-gray-600 hover:text-gray-900 transition-colors" />
            <TicketSoundWatcher />
          </div>
        </div>
      </header>

      {/* =========================================
          2. Main Layout (Sidebar + Content)
          ========================================= */}
      <div className="flex flex-1 relative z-10 max-w-[1920px] mx-auto w-full">
        
        {/* Sidebar (Under Navbar, Strict Geometric Style) */}
        <aside className="sidebar w-64 bg-white border-r-2 border-gray-200 hidden md:flex flex-col sticky top-20 h-[calc(100vh-5rem)] shrink-0">
          
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
          <div className="p-6 lg:p-10 w-full flex flex-col gap-6 pb-24">
            <Outlet /> 
          </div>
        </main>
        
      </div>
    </div>
  );
}