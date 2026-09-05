import { 
  LogIn, 
  LogOut,
  ChevronDown, 
  MonitorPlay, 
  Share2, 
  PenTool, 
  GraduationCap, 
  Sparkles,
  Cpu,
  Headphones,
  Film,
  LayoutDashboard,
  ShoppingCart
} from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useCartStore, selectItemCount } from '../../store/cartStore';
import { Languages } from 'lucide-react';

// ==========================================
// 1. الأيقونات المخصصة (Custom Brand SVGs)
// ==========================================
const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const YoutubeIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22.54 6.42a2.78 2.78 0 0 0-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 0 0-1.94 2A29 29 0 0 0 1 11.75a29 29 0 0 0 .46 5.33 2.78 2.78 0 0 0 1.94 2c1.72.46 8.6.46 8.6.46s6.88 0 8.6-.46a2.78 2.78 0 0 0 1.94-2 29 29 0 0 0 .46-5.33 29 29 0 0 0-.46-5.33z" />
    <polygon points="9.75 15.02 15.5 11.75 9.75 8.48 9.75 15.02" />
  </svg>
);

const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);

const TiktokIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M9 12a4 4 0 1 0 4 4V4h3.5c.08 1.44 1.3 2.5 2.5 2.5V9.5c-1.9 0-3.5-1.1-4-2.5v9a6 6 0 1 1-6-6v3a3 3 0 1 0 3 3z" />
  </svg>
);

export default function Navbar() {
  const location = useLocation();
  const isActive = (path) => location.pathname === path;
  const { t, lang, toggleLang } = useLanguage();
  const { isAuthenticated, user, logout } = useAuth();
  const cartCount = useCartStore(selectItemCount);

  return (
    <nav dir={t.dir} className="bg-white/90 backdrop-blur-xl border-b border-gray-100 px-6 lg:px-12 py-4 flex justify-between items-center sticky top-0 z-50">
      
      {/* =========================================
          الشعار (Logo)
          ========================================= */}
      <Link to="/" className="flex items-center gap-3 group shrink-0">
        <span className="text-2xl font-bold tracking-tight bg-gradient-to-r from-slate-900 to-slate-700 bg-clip-text text-transparent group-hover:opacity-90 transition-opacity">
          MediaJo
        </span>
        <div className="flex items-center gap-1">
          <div className="w-2.5 h-6 bg-gradient-to-b from-pink-500 to-orange-400 rounded-sm skew-x-12 shadow-sm"></div>
          <div className="w-3.5 h-3.5 bg-gradient-to-br from-blue-500 to-purple-600 rounded-full shadow-sm"></div>
        </div>
      </Link>

      {/* =========================================
          روابط التنقل والقوائم
          ========================================= */}
      <div className="hidden lg:flex items-center gap-8">
        
        <Link to="/about" className={`text-sm font-medium transition-colors ${isActive('/about') ? 'text-blue-600' : 'text-gray-600 hover:text-black'}`}>
          {t.nav.about}
        </Link>

        {/* 1. قائمة الخدمات البسيطة */}
        <div className="relative group">
         
          
          <div className="absolute top-full left-0 w-full h-4"></div>
          
          <div className="absolute top-[calc(100%+10px)] left-0 w-56 bg-white border border-gray-100 rounded-2xl shadow-xl opacity-0 invisible translate-y-2 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 p-2">
            <Link to="/products" className="flex flex-col p-3 hover:bg-gray-50 rounded-xl transition-colors">
              <span className="font-bold text-gray-900 text-sm">{t.nav.servicesSocial}</span>
              <span className="text-xs text-gray-500 mt-0.5">{t.nav.servicesSocialDesc}</span>
            </Link>
            <Link to="/products" className="flex flex-col p-3 hover:bg-gray-50 rounded-xl transition-colors mt-1">
              <span className="font-bold text-gray-900 text-sm">{t.nav.servicesAccounts}</span>
              <span className="text-xs text-gray-500 mt-0.5">{t.nav.servicesAccountsDesc}</span>
            </Link>
          </div>
        </div>

        {/* 2. قائمة المنتجات العملاقة المليئة بالتفاصيل (Massive Mega Menu) */}
        <div className="relative group">
          <Link 
            to="/products" 
            className={`flex items-center gap-1 text-sm font-medium py-2 transition-colors ${isActive('/products') ? 'text-blue-600' : 'text-gray-600 hover:text-black'}`}
          >
            {t.nav.products} <ChevronDown className={`w-4 h-4 transition-transform duration-300 group-hover:rotate-180 ${isActive('/products') ? 'text-blue-600' : 'text-gray-400'}`} />
          </Link>
          
          <div className="absolute top-full left-1/2 -translate-x-1/2 w-full h-4"></div>
          
          <div className="absolute top-[calc(100%+10px)] left-1/2 -translate-x-1/2 w-[900px] bg-white border border-gray-100 rounded-[2rem] shadow-[0_40px_100px_rgba(0,0,0,0.1)] opacity-0 invisible translate-y-4 group-hover:opacity-100 group-hover:visible group-hover:translate-y-0 transition-all duration-300 p-8 flex gap-8 cursor-default">
            
            {/* العمود الأول: Social Media */}
            <div className="flex-1">
              <h3 className="text-xs font-bold tracking-widest uppercase text-blue-600 mb-5 flex items-center gap-2">
                <Share2 className="w-4 h-4" /> {t.nav.socialEngagement}
              </h3>
              <div className="flex flex-col gap-2">
                
                <Link to="/products/instagram" className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group/link border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-pink-100 transition-colors">
                    <InstagramIcon className="w-5 h-5 text-gray-500 group-hover/link:text-pink-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.nav.instagram}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Followers, Likes, Views, Reels</p>
                  </div>
                </Link>

                <Link to="/products/tiktok" className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group/link border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-gray-900 transition-colors">
                    <TiktokIcon className="w-5 h-5 text-gray-500 group-hover/link:text-white" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.nav.tiktok}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Followers, Likes, Views, Shares</p>
                  </div>
                </Link>

                <Link to="/products/youtube" className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group/link border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-red-100 transition-colors">
                    <YoutubeIcon className="w-5 h-5 text-gray-500 group-hover/link:text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.nav.youtube}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Subscribers, Watch time, Views</p>
                  </div>
                </Link>

                <Link to="/products/facebook" className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group/link border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-blue-100 transition-colors">
                    <FacebookIcon className="w-5 h-5 text-gray-500 group-hover/link:text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.nav.facebook}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Page Likes, Post Engagement</p>
                  </div>
                </Link>

              </div>
            </div>

            {/* خط فاصل */}
            <div className="w-px bg-gray-100 my-4"></div>

            {/* العمود الثاني: Subscriptions & Streaming */}
            <div className="flex-1">
              <h3 className="text-xs font-bold tracking-widest uppercase text-red-500 mb-5 flex items-center gap-2">
                <MonitorPlay className="w-4 h-4" /> {t.nav.entertainment}
              </h3>
              <div className="flex flex-col gap-2">
                
                <Link to="/products/netflix" className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group/link border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-red-100 transition-colors">
                    <Film className="w-5 h-5 text-gray-500 group-hover/link:text-red-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.nav.netflix}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">4K Ultra HD, Private Profiles</p>
                  </div>
                </Link>

                <Link to="/products/spotify" className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group/link border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-green-100 transition-colors">
                    <Headphones className="w-5 h-5 text-gray-500 group-hover/link:text-green-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.nav.spotify}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Premium Individual & Family</p>
                  </div>
                </Link>

                <Link to="/products/shahid" className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group/link border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-orange-100 transition-colors">
                    <MonitorPlay className="w-5 h-5 text-gray-500 group-hover/link:text-orange-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.nav.shahid}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Sports & Entertainment</p>
                  </div>
                </Link>

              </div>
            </div>

            {/* العمود الثالث: Work & AI Tools */}
            <div className="flex-1">
              <h3 className="text-xs font-bold tracking-widest uppercase text-emerald-500 mb-5 flex items-center gap-2">
                <Cpu className="w-4 h-4" /> {t.nav.workTools}
              </h3>
              <div className="flex flex-col gap-2">
                
                <Link to="/products/chatgpt" className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group/link border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-emerald-100 transition-colors">
                    <Sparkles className="w-5 h-5 text-gray-500 group-hover/link:text-emerald-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.nav.chatgpt}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">GPT-4, DALL-E 3 Access</p>
                  </div>
                </Link>

                <Link to="/products/canva" className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group/link border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-blue-100 transition-colors">
                    <PenTool className="w-5 h-5 text-gray-500 group-hover/link:text-blue-600" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.nav.canva}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Lifetime & Yearly Accounts</p>
                  </div>
                </Link>

                <Link to="/products/coursera" className="flex gap-4 p-3 hover:bg-gray-50 rounded-xl transition-colors group/link border border-transparent hover:border-gray-100">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center group-hover/link:bg-blue-100 transition-colors">
                    <GraduationCap className="w-5 h-5 text-gray-500 group-hover/link:text-blue-700" />
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-900 text-sm tracking-tight">{t.nav.coursera}</h4>
                    <p className="text-xs text-gray-500 mt-0.5">Unlimited Certificates & Courses</p>
                  </div>
                </Link>

              </div>
            </div>

          </div>
        </div>

        <Link to="/contact" className={`text-sm font-medium transition-colors ${isActive('/contact') ? 'text-blue-600' : 'text-gray-600 hover:text-black'}`}>
          {t.nav.contact}
        </Link>

      </div>

      {/* =========================================
          الأكشن الجانبي + زر اللغة
          ========================================= */}
      <div className="flex items-center gap-3">
        {/* أيقونة السلة */}
        <Link
          to="/dashboard/cart"
          title="Cart"
          className="relative flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 text-gray-600 hover:text-black hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <ShoppingCart className="w-4.5 h-4.5" />
          {cartCount > 0 && (
            <span className="absolute -top-1 -right-1 rtl:-right-auto rtl:-left-1 min-w-5 h-5 px-1 rounded-full bg-gradient-to-br from-pink-500 to-orange-400 text-white text-[11px] font-bold flex items-center justify-center shadow-sm">
              {cartCount}
            </span>
          )}
        </Link>

        {/* زر اللغة */}
        <button
          onClick={toggleLang}
          dir="ltr"
          className="flex items-center gap-2 px-4 py-2.5 rounded-full border border-gray-200 text-sm font-medium text-gray-700 hover:bg-gray-50 hover:border-gray-300 transition-all"
        >
          <Languages className="w-4 h-4" />
          {lang === 'en' ? t.toggle.ar : t.toggle.en}
        </button>

        {isAuthenticated ? (
          <>
            <Link 
              to="/dashboard"
              className={`flex items-center gap-2 bg-[#1e2022] hover:bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:-translate-y-0.5 ${isActive('/dashboard') ? 'ring-2 ring-blue-500' : ''}`}
            >
              <LayoutDashboard className="w-4 h-4" />
              <span>{user?.name || t.nav.dashboard}</span>
            </Link>
            <button
              onClick={logout}
              title={t.auth.signOut}
              className="flex items-center justify-center w-11 h-11 rounded-full border border-gray-200 text-gray-500 hover:text-red-600 hover:border-red-200 transition-all"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </>
        ) : (
          <Link 
            to="/auth"
            className="flex items-center gap-2 bg-[#1e2022] hover:bg-black text-white px-6 py-2.5 rounded-full font-medium text-sm transition-all shadow-[0_4px_10px_rgba(0,0,0,0.1)] hover:-translate-y-0.5"
          >
            <span>{t.nav.signIn}</span>
            <LogIn className="w-4 h-4" />
          </Link>
        )}
      </div>

    </nav>
  );
}