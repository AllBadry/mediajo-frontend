import React from 'react';
import { Routes, Route } from 'react-router-dom';
import ScrollToTop from './components/ScrollToTop';

// استيراد الصفحات التي قمنا ببنائها
import Home from './pages/Home';
import AboutUs from './pages/AboutUs';
import Products from './pages/Products';
import Instagram from './pages/Instagram';
import Facebook from './pages/Facebook';
import TikTok from './pages/TikTok';
import Auth from './pages/Auth';
import ContactUs from './pages/ContactUs';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
export default function App() {
  return (
    <>
    <ScrollToTop />
    <Navbar /> 
   
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

      {/* صفحة تسجيل الدخول */}
      <Route path="/auth" element={<Auth />} />

      {/* صفحة تواصل معنا */}
      <Route path="/contact" element={<ContactUs />} />

      {/* يمكنك لاحقاً إضافة مسارات فرعية إذا أردت صفحات مخصصة لكل منتج */}
      {/* <Route path="/products/instagram" element={<InstagramService />} /> */}
      
      {/* صفحة تواصل معنا (إذا قررت فصلها كصفحة مستقلة لاحقاً) */}
      {/* <Route path="/contact" element={<ContactUs />} /> */}
    </Routes>
    <Footer />
    </>
  );
}