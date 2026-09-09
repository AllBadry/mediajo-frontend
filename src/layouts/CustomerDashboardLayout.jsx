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

  useGSAP(() => {
    gsap.from(".sidebar", { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" });
    gsap.from(".topbar", { y: -20, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out" });
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

  // دالة ظلال 3D خفيفة للقائمة الجانبية عند التفعيل
  const activeShadow = `inset -2px -2px 5px rgba(0,0,0,0.02), inset 2px 2px 5px rgba(255,255,255,0.8), 2px 3px 0px rgb(37,99,235), 4px 6px 15px rgba(37,99,235,0.2)`;

  return (
    <div ref={container} dir={t.dir} className="flex min-h-screen bg-[#fafbfc] font-sans text-[#1e2022] overflow-hidden">
      
      {/* =========================================
          Background Tech Grid & Soft Orbs (Hero Style)
          ========================================= */}
      <div className="fixed inset-0 z-0 opacity-40 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>
      <div className="fixed top-0 left-1/4 w-[600px] h-[600px] bg-gradient-to-tr from-blue-100/40 to-purple-100/40 rounded-full blur-[100px] -z-10 pointer-events-none"></div>

      {/* =========================================
          1. Sidebar (Elegant White Panel)
          ========================================= */}
      <aside className="sidebar w-64 bg-white/80 backdrop-blur-xl border-r border-gray-100 flex flex-col hidden md:flex md:sticky md:top-0 md:h-screen shrink-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.02)]">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-2xl font-bold tracking-tight text-gray-900 group-hover:text-blue-600 transition-colors">MediaJo</span>
            <div className="w-2 h-6 bg-gray-900 skew-x-12 ms-1 shadow-sm group-hover:bg-blue-600 transition-colors"></div>
          </Link>
        </div>

        <nav className="flex-1 px-5 py-8 flex flex-col gap-2">
          <p className="px-3 text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-2">{t.dashboard.menu}</p>
          
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/dashboard'}
              style={({ isActive }) => isActive ? { boxShadow: activeShadow, transform: 'translateY(-2px)' } : {}}
              className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-2xl transition-all duration-300 font-medium text-sm border border-transparent ${
                isActive 
                  ? 'bg-gradient-to-br from-white to-blue-50/50 text-blue-700 border-gray-100' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span className="tracking-tight">{item.label}</span>
              </div>
              {item.badge > 0 && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600 shadow-sm">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-5 border-t border-gray-100 bg-white/50">
          <NavLink 
            to="/dashboard/profile" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 w-full text-left rounded-2xl transition-all font-medium text-sm mb-1 ${isActive ? 'bg-gray-100 text-gray-900 shadow-sm' : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}`}
          >
            <User className="w-5 h-5" /> {t.dashboard.profileSettings}
          </NavLink>
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-2xl hover:bg-red-50 text-gray-500 hover:text-red-600 font-medium text-sm transition-colors">
            <LogOut className="w-5 h-5" /> {t.auth.signOut}
          </button>
        </div>
      </aside>

      {/* =========================================
          2. Main Content Area
          ========================================= */}
      <main className="flex-1 min-w-0 flex flex-col relative z-20">
        
        {/* Topbar (Glassmorphism & Clean Typography) */}
        <header className="topbar h-20 px-6 lg:px-10 flex items-center justify-between sticky top-0 bg-[#fafbfc]/80 backdrop-blur-md border-b border-gray-100/50 z-30">
          <div className="flex items-center gap-3">
            <div className="hidden sm:flex items-center gap-2 text-gray-400 text-xs font-mono tracking-widest uppercase">
              <span>MediaJo</span>
              <ChevronRight className="w-3 h-3 rtl:rotate-180" />
            </div>
            <h1 className="text-2xl font-medium text-[#1e2022] tracking-tighter">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/products" className="hidden sm:flex items-center gap-2 bg-[#1e2022] text-white px-5 py-2.5 rounded-full text-sm font-medium hover:bg-black transition-all hover:-translate-y-0.5 shadow-[0_4px_12px_rgba(0,0,0,0.1)]">
              <Sparkles className="w-4 h-4" /> {t.dashboard.newOrder}
            </Link>
            
            <div className="flex items-center gap-3 border-l border-gray-200 pl-4 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-4">
              <NotificationBell className="text-gray-600 hover:text-blue-600 transition-colors" />
              <TicketSoundWatcher />
            </div>
          </div>
        </header>

        {/* Page Content */}
        <div className="p-6 lg:p-10 max-w-[1400px] w-full mx-auto flex flex-col gap-8 pb-24">
          <Outlet /> 
        </div>
      </main>
    </div>
  );
}