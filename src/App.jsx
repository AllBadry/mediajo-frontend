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
import YouTube from './pages/YouTube';
import Netflix from './pages/Netflix';
import Spotify from './pages/Spotify';
import Shahid from './pages/Shahid';
import ChatGPT from './pages/ChatGPT';
import Canva from './pages/Canva';
import Coursera from './pages/Coursera';
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
      <Route path="/products/youtube" element={<YouTube />} />

      {/* صفحات الاشتراكات */}
      <Route path="/products/netflix" element={<Netflix />} />
      <Route path="/products/spotify" element={<Spotify />} />
      <Route path="/products/shahid" element={<Shahid />} />
      <Route path="/products/chatgpt" element={<ChatGPT />} />
      <Route path="/products/canva" element={<Canva />} />
      <Route path="/products/coursera" element={<Coursera />} />

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