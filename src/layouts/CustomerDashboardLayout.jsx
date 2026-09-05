import React, { useRef } from 'react';
import { NavLink, Link, useNavigate, Outlet, useLocation } from 'react-router-dom';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { 
  LayoutDashboard, ShoppingBag, ShoppingCart, MessageSquare, 
  User, LogOut, Bell, Sparkles
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';

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

  // استخراج عنوان الصفحة من الرابط الحالي
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('orders')) return t.dashboard.myOrders;
    if (path.includes('cart')) return t.dashboard.yourCart;
    if (path.includes('tickets')) return t.dashboard.supportTickets;
    if (path.includes('profile')) return t.dashboard.profileSettings;
    return t.dashboard.dashboardOverview;
  };

  // ==========================================
  // GSAP Animations
  // ==========================================
  useGSAP(() => {
    gsap.from(".sidebar", { x: -50, opacity: 0, duration: 0.8, ease: "power3.out" });
    gsap.from(".topbar", { y: -20, opacity: 0, duration: 0.8, delay: 0.2, ease: "power3.out" });
    gsap.to(".notification-dot", { scale: 1.5, opacity: 0, repeat: -1, duration: 1.5, ease: "sine.out" });
  }, { scope: container });

  const menuItems = [
    { id: 'overview', path: '/dashboard', icon: <LayoutDashboard className="w-5 h-5" />, label: t.dashboard.overview },
    { id: 'orders', path: '/dashboard/orders', icon: <ShoppingBag className="w-5 h-5" />, label: t.dashboard.myOrders },
    { id: 'cart', path: '/dashboard/cart', icon: <ShoppingCart className="w-5 h-5" />, label: t.dashboard.cart },
    { id: 'tickets', path: '/dashboard/tickets', icon: <MessageSquare className="w-5 h-5" />, label: t.dashboard.supportTickets, badge: 1 },
  ];

  return (
    <div ref={container} dir={t.dir} className="flex h-screen bg-[#f6f8fa] font-sans overflow-hidden">
      
      {/* =========================================
          1. Sidebar (باستخدام NavLink للتوجيه)
          ========================================= */}
      <aside className="sidebar w-64 bg-white border-r border-gray-200 flex flex-col hidden md:flex shrink-0 z-20">
        <div className="h-20 flex items-center px-8 border-b border-gray-100">
          <Link to="/" className="flex items-center gap-2 group">
            <span className="text-xl font-black tracking-tight text-gray-900 group-hover:opacity-80">MediaJo</span>
            <div className="w-2 h-5 bg-gradient-to-b from-blue-500 to-purple-600 rounded-sm skew-x-12"></div>
          </Link>
        </div>

        <nav className="flex-1 px-4 py-6 flex flex-col gap-2">
          <p className="px-4 text-xs font-bold text-gray-400 uppercase tracking-widest mb-2">{t.dashboard.menu}</p>
          
          {menuItems.map((item) => (
            <NavLink
              key={item.id}
              to={item.path}
              end={item.path === '/dashboard'} // هام جداً لكي لا يظل محدداً دائماً
              className={({ isActive }) => `flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-300 font-medium text-sm ${
                isActive 
                  ? 'bg-gray-900 text-white shadow-[0_4px_15px_rgba(0,0,0,0.1)]' 
                  : 'text-gray-500 hover:bg-gray-100 hover:text-gray-900'
              }`}
            >
              <div className="flex items-center gap-3">
                {item.icon}
                <span>{item.label}</span>
              </div>
              {item.badge && (
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-red-100 text-red-600">
                  {item.badge}
                </span>
              )}
            </NavLink>
          ))}
        </nav>

        <div className="p-4 border-t border-gray-100">
          <NavLink 
            to="/dashboard/profile" 
            className={({ isActive }) => `flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-gray-100 transition-colors font-medium text-sm mb-1 ${isActive ? 'bg-gray-900 text-white hover:bg-gray-900' : 'text-gray-600'}`}
          >
            <User className="w-5 h-5" /> {t.dashboard.profileSettings}
          </NavLink>
          <button onClick={handleSignOut} className="flex items-center gap-3 px-4 py-3 w-full text-left rounded-xl hover:bg-red-50 text-red-600 font-medium text-sm transition-colors">
            <LogOut className="w-5 h-5" /> {t.auth.signOut}
          </button>
        </div>
      </aside>

      {/* =========================================
          2. Main Content Area
          ========================================= */}
      <main className="flex-1 flex flex-col h-full relative overflow-y-auto overflow-x-hidden">
        
        {/* Background Elements */}
        <div className="absolute top-0 right-0 w-[40vw] h-[40vw] bg-blue-400/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>
        <div className="absolute top-[20%] left-[10%] w-[20vw] h-[20vw] bg-purple-400/5 rounded-full blur-[80px] -z-10 pointer-events-none"></div>

        {/* Topbar */}
        <header className="topbar h-20 px-6 lg:px-10 flex items-center justify-between sticky top-0 bg-[#f6f8fa]/80 backdrop-blur-md z-10">
          <div>
            <h1 className="text-2xl font-black text-gray-900 tracking-tight">{getPageTitle()}</h1>
          </div>
          
          <div className="flex items-center gap-4">
            <Link to="/products" className="hidden sm:flex items-center gap-2 bg-white border border-gray-200 px-4 py-2 rounded-full text-sm font-bold text-gray-700 hover:border-blue-500 hover:text-blue-600 transition-colors shadow-sm">
              <Sparkles className="w-4 h-4" /> {t.dashboard.newOrder}
            </Link>
            
            <button className="relative w-10 h-10 bg-white border border-gray-200 rounded-full flex items-center justify-center text-gray-500 hover:text-gray-900 transition-colors shadow-sm">
              <Bell className="w-5 h-5" />
              <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full z-10"></span>
              <span className="notification-dot absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full"></span>
            </button>
          </div>
        </header>

        {/* هنا يتم عرض الصفحات الفرعية (Overview, Orders, Cart...) */}
        <div className="p-6 lg:p-10 max-w-[1400px] w-full mx-auto flex flex-col gap-6 pb-24">
          <Outlet /> 
        </div>
      </main>

    </div>
  );
}