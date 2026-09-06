import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ShoppingCart } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useLanguage } from '../context/LanguageContext';
import CartContent from '../components/cart/CartContent';
import LoginModal from '../components/auth/LoginModal';

// صفحة سلة عامة (متاحة دون تسجيل دخول)
export default function CartPage() {
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { isAuthenticated } = useAuth();
  const [showLogin, setShowLogin] = useState(false);

  const handleCheckout = () => {
    if (isAuthenticated) {
      navigate('/dashboard/cart');
    } else {
      setShowLogin(true);
    }
  };

  return (
    <div dir={t.dir} className="min-h-screen bg-gray-50 font-sans pt-24 pb-24 px-6 lg:px-12">
      <div className="max-w-[1400px] w-full mx-auto flex flex-col gap-6">
        {/* Header بسيط للسلة العامة */}
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center shadow-sm">
              <ShoppingCart className="w-6 h-6" />
            </div>
            <div>
              <h1 className="text-3xl font-black text-gray-900 tracking-tight">{t.dashboard.yourCart}</h1>
              <p className="text-sm text-gray-500 font-medium">{t.dashboard.cartHeaderSub}</p>
            </div>
          </div>
          <Link 
            to="/products"
            className="text-sm font-bold text-blue-600 hover:text-blue-700 transition-colors"
          >
            <span className="rtl:inline-block rtl:rotate-180">←</span> {t.dashboard.newOrder}
          </Link>
        </div>

        <CartContent onCheckout={handleCheckout} />
      </div>

      <LoginModal 
        open={showLogin} 
        onClose={() => setShowLogin(false)} 
      />
    </div>
  );
}