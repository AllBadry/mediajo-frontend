import React from 'react';
import { ArrowUpRight, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';

// تعريف أيقونات السوشال ميديا برمجياً (SVG) لتفادي أخطاء مكتبة Lucide
const GithubIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
    <path d="M9 18c-4.51 2-5-2-7-2" />
  </svg>
);

const TwitterIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z" />
  </svg>
);

const InstagramIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <rect width="20" height="20" x="2" y="2" rx="5" ry="5" />
    <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
    <line x1="17.5" x2="17.51" y1="6.5" y2="6.5" />
  </svg>
);

const LinkedinIcon = ({ className }) => (
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}>
    <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
    <rect width="4" height="12" x="2" y="9" />
    <circle cx="4" cy="4" r="2" />
  </svg>
);


export default function Footer() {
  const currentYear = new Date().getFullYear();
  const { t } = useLanguage();

  // مصفوفة الأيقونات مع روابطها
  const socialLinks = [
    { Icon: GithubIcon, url: '#' },
    { Icon: TwitterIcon, url: '#' },
    { Icon: InstagramIcon, url: '#' },
    { Icon: LinkedinIcon, url: '#' },
  ];

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

            {/* أيقونات السوشال ميديا */}
            <div className="flex items-center gap-4">
              {socialLinks.map((item, idx) => {
                const IconComponent = item.Icon;
                return (
                  <a key={idx} href={item.url} className="w-12 h-12 rounded-full border border-white/10 bg-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:bg-white/10 hover:border-white/30 transition-all duration-300 hover:-translate-y-1">
                    <IconComponent className="w-5 h-5" />
                  </a>
                );
              })}
            </div>
          </div>

          {/* أعمدة الروابط */}
          <div className="lg:col-span-7 grid grid-cols-2 sm:grid-cols-3 gap-8">
            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-2">{t.footer.platform}</h4>
              {t.footer.platformLinks.map((link, idx) => (
                <a key={idx} href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group font-light">
                  {link} <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              ))}
            </div>

            <div className="flex flex-col gap-6">
              <h4 className="text-sm font-bold tracking-widest uppercase text-white mb-2">{t.footer.company}</h4>
              {t.footer.companyLinks.map((link, idx) => (
                <a key={idx} href="#" className="text-gray-400 hover:text-white transition-colors flex items-center gap-1 group font-light">
                  {link} <ArrowUpRight className="w-3 h-3 opacity-0 -translate-x-2 translate-y-2 group-hover:opacity-100 group-hover:translate-x-0 group-hover:translate-y-0 transition-all duration-300" />
                </a>
              ))}
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