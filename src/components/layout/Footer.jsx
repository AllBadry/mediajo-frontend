import React from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// تعريف أيقونة الفيسبوك برمجياً (SVG) لتفادي أخطاء مكتبة Lucide
const FacebookIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  return (
    <footer dir={t.dir} className="relative w-full bg-[#03000a] text-white pt-24 overflow-hidden border-t border-white/10">
      
      {/* الإضاءة المتحركة في الخلفية */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-blue-600/20 rounded-full blur-[120px] pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-purple-600/20 rounded-full blur-[150px] pointer-events-none" style={{ animation: 'pulse 6s infinite reverse' }}></div>

      {/* المحتوى العلوي للفوتر */}
      <div className="relative z-20 max-w-[85rem] mx-auto px-6 lg:px-8 mb-20 lg:mb-32">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8">
          
          {/* عمود العلامة التجارية */}
          <div className="lg:col-span-5 flex flex-col items-start">
            <Link to="/" className="flex items-center gap-2 group mb-6">
              <span className="text-3xl font-bold tracking-tight text-white group-hover:text-blue-400 transition-colors">MediaJo</span>
              <div className="w-3 h-8 bg-white skew-x-12 ml-1"></div>
              <div className="w-4 h-4 bg-white rounded-full"></div>
            </Link>
            
            <p className="text-gray-400 font-light text-lg max-w-sm mb-8 leading-relaxed">
              {t.footer.desc}
            </p>

            {/* أيقونة السوشال ميديا (فيسبوك فقط) */}
            <div className="flex items-center gap-4">
              <a href="#" aria-label="Facebook" className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                <FacebookIcon className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* أعمدة الروابط */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-2">{t.footer.platform}</h4>
              <Link to="/products/youtube" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group font-light">
                {t.nav.youtube} <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </Link>
              <Link to="/products/facebook" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group font-light">
                {t.nav.facebook} <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </Link>
              <Link to="/products/instagram" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group font-light">
                {t.nav.instagram} <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </Link>
              <Link to="/products/tiktok" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group font-light">
                {t.nav.tiktok} <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-2">{t.footer.company}</h4>
              <Link to="/about" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group font-light">
                {t.nav.about} <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </Link>
              <Link to="/products" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group font-light">
                {t.nav.products} <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </Link>
              <Link to="/contact" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group font-light">
                {t.nav.contact} <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
              </Link>
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-2">{t.footer.legal}</h4>
              {t.footer.legalLinks.map((link, idx) => (
                <a key={idx} href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group font-light">
                  {link} <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* الكلمة العملاقة في الخلفية */}
      <div className="relative w-full flex justify-center items-end overflow-hidden select-none pointer-events-none mt-10">
        <style>{`
          .massive-text {
            font-size: 18vw; 
            line-height: 0.75;
            font-family: 'Arial Black', Impact, sans-serif;
            color: transparent;
            -webkit-text-stroke: 2px rgba(255, 255, 255, 0.05);
            white-space: nowrap;
          }
          .massive-text-glow {
            background: linear-gradient(to bottom, rgba(255,255,255,0.1), transparent);
            -webkit-background-clip: text;
          }
        `}</style>
        
        <div className="massive-text massive-text-glow font-black tracking-tighter text-center w-full transform translate-y-[20%]">
          MEDIAJO
        </div>

        <div className="absolute bottom-0 left-0 w-full h-1/2 bg-gradient-to-t from-[#03000a] to-transparent z-10"></div>
      </div>

      {/* الحقوق السفلية */}
      <div className="relative z-20 w-full border-t border-white/5 bg-[#03000a]/80 backdrop-blur-sm">
        <div className="max-w-[85rem] mx-auto px-6 py-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-gray-500 text-sm font-light">
            &copy; {currentYear} MediaJo. {t.footer.rights}
          </p>
          <div className="flex items-center gap-2 text-gray-500 text-sm font-mono">
            <Zap className="w-4 h-4 text-yellow-500" /> {t.footer.systemStatus} <span className="text-green-500 font-bold">{t.footer.operational}</span>
          </div>
        </div>
      </div>

    </footer>
  );
}