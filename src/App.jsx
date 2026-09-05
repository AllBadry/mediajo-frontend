import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider, useAuth } from './context/AuthContext';

// استيراد الصفحات التي قمنا ببنائها
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Instagram from './pages/Instagram';
import Facebook from './pages/Facebook';
import TikTok from './pages/TikTok';
import YouTube from './pages/YouTube';
import Netflix from './pages/Netflix';
import Spotify from './pages/Spotify';
import Shahid from './pages/Shahid';
import ChatGPT from './pages/ChatGPT';
import Canva from './pages/Canva';
import Coursera from './pages/Coursera';
import Auth from './pages/Auth';
import ContactUs from './pages/ContactUs';
import CustomerDashboard from './pages/CustomerDashboard';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// حماية مسار الداشبورد: لا يمكن الوصول إلا عند تسجيل الدخول
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}

// توجيه صفحة تسجيل الدخول: لو المستخدم مسجل بالفعل يذهب للداشبورد مباشرة
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* الصفحة الرئيسية */}
      <Route path="/" element={<Home />} />
      
      {/* صفحة من نحن */}
      <Route path="/about" element={<AboutUs />} />
      
      {/* صفحة المنتجات (الرابط العام الذي طلبته) */}
      <Route path="/products" element={<Products />} />

      {/* صفحات المنصات */}
      <Route path="/products/instagram" element={<Instagram />} />
      <Route path="/products/facebook" element={<Facebook />} />
      <Route path="/products/tiktok" element={<TikTok />} />
      <Route path="/products/youtube" element={<YouTube />} />

      {/* صفحات الاشتراكات */}
      <Route path="/products/netflix" element={<Netflix />} />
      <Route path="/products/spotify" element={<Spotify />} />
      <Route path="/products/shahid" element={<Shahid />} />
      <Route path="/products/chatgpt" element={<ChatGPT />} />
      <Route path="/products/canva" element={<Canva />} />
      <Route path="/products/coursera" element={<Coursera />} />

      {/* لوحة التحكم (محمية) */}
      <Route path="/dashboard" element={<ProtectedRoute><CustomerDashboard /></ProtectedRoute>} />

      {/* صفحة تسجيل الدخول */}
      <Route path="/auth" element={<GuestRoute><Auth /></GuestRoute>} />

      {/* صفحة تواصل معنا */}
      <Route path="/contact" element={<ContactUs />} />
    </Routes>
  );
}

export default function App() {
  return (
    <AuthProvider>
      <ScrollToTop />
      <Navbar />
      <AppRoutes />
      <Footer />
    </AuthProvider>
  );
}