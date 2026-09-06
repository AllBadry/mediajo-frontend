import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';
import { AuthProvider, useAuth } from './context/AuthContext';

// الصفحات العامة
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
import CartPage from './pages/CartPage';

// تخطيط وصفحات لوحة التحكم المتداخلة
import CustomerDashboardLayout from './layouts/CustomerDashboardLayout';
import Overview from './pages/dashboard/Overview';
import MyOrders from './pages/dashboard/MyOrders';
import Cart from './pages/dashboard/Cart';
import SupportTickets from './pages/dashboard/SupportTickets';
import ProfileSettings from './pages/dashboard/ProfileSettings';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';

// حماية مسار الداشبورد
function ProtectedRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? children : <Navigate to="/auth" replace />;
}

// توجيه صفحة تسجيل الدخول
function GuestRoute({ children }) {
  const { isAuthenticated } = useAuth();
  return isAuthenticated ? <Navigate to="/dashboard" replace /> : children;
}

function AppRoutes() {
  return (
    <Routes>
      {/* الصفحة الرئيسية */}
      <Route path="/" element={<Home />} />
      <Route path="/about" element={<AboutUs />} />
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

      {/* 🚀 لوحة التحكم المتداخلة (محمية بالكامل) */}
      <Route path="/dashboard" element={<ProtectedRoute><CustomerDashboardLayout /></ProtectedRoute>}>
        <Route index element={<Overview />} />
        <Route path="orders" element={<MyOrders />} />
        <Route path="cart" element={<Cart />} />
        <Route path="tickets" element={<SupportTickets />} />
        <Route path="profile" element={<ProfileSettings />} />
      </Route>

      {/* صفحة السلة العامة (متاحة دون تسجيل دخول) */}
      <Route path="/cart" element={<CartPage />} />

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