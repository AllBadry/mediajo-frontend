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

  // ==========================================
  // GSAP Animations (Sharp, Expo Easing for Tech Vibe)
  // ==========================================
  useGSAP(() => {
    gsap.from(".sidebar", { x: -30, opacity: 0, duration: 0.8, ease: "expo.out" });
    gsap.from(".topbar", { y: -20, opacity: 0, duration: 0.8, delay: 0.1, ease: "expo.out" });
    gsap.from(".menu-item", { 
      x: -10, opacity: 0, duration: 0.5, stagger: 0.05, delay: 0.2, ease: "power2.out" 
    });
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
    // استخدام خلفية سوداء عميقة مع لون نص أبيض/رمادي
    <div ref={container} dir={t.dir} className="flex min-h-screen bg-[#050505] text-gray-300 font-sans selection:bg-white selection:text-black">
      
      {/* =========================================
          1. Sidebar (Executive Dark Theme)
          ========================================= */}
      <aside className="sidebar w-64 bg-[#0a0a0a] border-r border-white/5 flex flex-col hidden md:flex md:sticky md:top-0 md:h-screen shrink-0 z-30 shadow-[4px_0_24px_rgba(0,0,0,0.5)]">
        
        {/* Logo Section */}
        <div className="h-20 flex items-center px-8 border-b border-white/5 relative overflow-hidden">
          {/* Subtle top glow line */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>
          
          <Link to="/" className="flex items-center gap-3 group w-full">
            <span className="text-xl font-bold tracking-tight text-white group-hover:text-gray-300 transition-colors">MediaJo</span>
            {/* Sharp geometric accent instead of a skewed pill */}
            <div className="flex flex-col gap-[2px] ml-auto rtl:ml-0 rtl:mr-auto">
              <div className="w-1.5 h-1.5 bg-white"></div>
              <div className="w-1.5 h-1.5 bg-gray-600"></div>
            </div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-8 flex flex-col gap-1.5">
          <p className="px-4 text-[10px] font-bold text-gray-500 uppercase tracking-[0.2em] mb-4">{t.dashboard.menu}</p>
          
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/dashboard'}
              className={({ isActive }) => `menu-item flex items-center justify-between px-4 py-2.5 rounded-md transition-all duration-300 font-medium text-sm group ${
                isActive 
                  ? 'bg-white/10 text-white border-l-2 border-white rtl:border-l-0 rtl:border-r-2 shadow-inner shadow-white/5' 
                  : 'text-gray-400 hover:bg-white/5 hover:text-white border-l-2 border-transparent rtl:border-l-0 rtl:border-r-2'
              }`}
            >
              <div className="flex items-center gap-3">
                <span className={`transition-transform duration-300 ${item.path === location.pathname ? 'scale-110 text-white' : 'text-gray-500 group-hover:text-gray-300'}`}>
                  {item.icon}
                </span>
                <span>{item.label}</span>
              </div>
              
              {/* Badge with sharp edges */}
              {item.badge > 0 && (
                <span className="px-1.5 py-0.5 rounded-sm text-[10px] font-bold bg-white text-black">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-white/5 bg-[#080808]">
          <NavLink 
            to="/dashboard/profile" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 w-full text-left rounded-md transition-colors font-medium text-sm mb-1 ${isActive ? 'bg-white/10 text-white' : 'text-gray-400 hover:bg-white/5 hover:text-white'}`}
          >
            <User className="w-4 h-4" /> {t.dashboard.profileSettings}
          </NavLink>
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-md hover:bg-red-500/10 hover:text-red-400 text-gray-400 font-medium text-sm transition-colors">
            <LogOut className="w-4 h-4" /> {t.auth.signOut}
          </button>
        </div>
      </aside>

      {/* =========================================
          2. Main Content Area (Tech / Glassmorphism Vibe)
          ========================================= */}
      <main className="flex-1 min-w-0 flex flex-col relative overflow-hidden">
        
        {/* Background Elements (Inspired by ElevenLabs / Abstract Suprematic) */}
        {/* Subtle grainy/mesh glow instead of solid colorful blobs */}
        <div className="absolute top-[-10%] right-[-5%] w-[50vw] h-[50vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-blue-900/10 via-transparent to-transparent blur-3xl -z-10 pointer-events-none mix-blend-screen"></div>
        <div className="absolute bottom-[-10%] left-[-5%] w-[40vw] h-[40vw] bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-purple-900/10 via-transparent to-transparent blur-3xl -z-10 pointer-events-none mix-blend-screen"></div>
        
        {/* CSS Noise overlay for that premium "Enterprise" texture */}
        <div className="absolute inset-0 opacity-[0.015] mix-blend-overlay pointer-events-none -z-10" style={{ backgroundImage: 'url("data:image/svg+xml,%3Csvg viewBox=%220 0 200 200%22 xmlns=%22http://www.w3.org/2000/svg%22%3E%3Cfilter id=%22noiseFilter%22%3E%3CfeTurbulence type=%22fractalNoise%22 baseFrequency=%220.65%22 numOctaves=%223%22 stitchTiles=%22stitch%22/%3E%3C/filter%3E%3Crect width=%22100%25%22 height=%22100%25%22 filter=%22url(%23noiseFilter)%22/%3E%3C/svg%3E")' }}></div>

        {/* Topbar (Sleek Glassmorphism) */}
        <header className="topbar h-20 px-6 lg:px-10 flex items-center justify-between sticky top-0 bg-[#050505]/70 backdrop-blur-xl border-b border-white/5 z-20">
          <div className="flex items-center gap-3">
            {/* Decorative breadcrumb-like accent */}
            <div className="hidden sm:flex items-center gap-2 text-gray-600 text-xs font-mono uppercase tracking-wider">
              <span>System</span>
              <ChevronRight className="w-3 h-3 rtl:rotate-180" />
            </div>
            <h1 className="text-xl font-bold text-white tracking-tight">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-5">
            <Link 
              to="/products" 
              className="hidden sm:flex items-center gap-2 bg-white text-black px-4 py-2 rounded-md text-xs font-bold uppercase tracking-wider hover:bg-gray-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.1)]"
            >
              <Sparkles className="w-3 h-3" /> {t.dashboard.newOrder}
            </Link>
            
            {/* Notification icons container */}
            <div className="flex items-center gap-3 border-l border-white/10 pl-5 rtl:border-l-0 rtl:border-r rtl:pl-0 rtl:pr-5">
              <NotificationBell className="text-gray-400 hover:text-white transition-colors" />
              <TicketSoundWatcher />
            </div>
          </div>
        </header>

        {/* Dynamic Content Area */}
        <div className="p-6 lg:p-10 max-w-[1400px] w-full mx-auto flex flex-col gap-6 pb-24 relative z-10">
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}