import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { Activity, Zap, ShieldCheck, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  return (
    <section 
      id="about-section" 
      dir={t.dir} 
      className="relative w-full py-24 md:py-32 px-6 md:px-12 bg-white border-t border-gray-100 font-sans overflow-hidden"
    >
      
      {/* شبكة خلفية خفيفة جداً (Subtle Dot Grid) للمسة تقنية نظيفة */}
      <div 
        className="absolute inset-0 z-0 opacity-[0.03]" 
        style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '32px 32px' }}
      ></div>

      <div className="max-w-[85rem] mx-auto relative z-10">
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-16 items-center">
          
          {/* =========================================
              النصف الأيمن/الأيسر: النصوص والرسالة (The Narrative)
              ========================================= */}
          <div className="lg:col-span-5 flex flex-col justify-center">
            
            <div className="inline-flex items-center gap-2 mb-6">
              <div className="w-2 h-2 bg-blue-600 rounded-full"></div>
              <span className="text-sm font-bold tracking-widest uppercase text-gray-500">
                {t.about.discover || (isRTL ? 'اكتشف ميديا جو' : 'DISCOVER MEDIAJO')}
              </span>
            </div>
            
            <h2 className="text-4xl sm:text-5xl md:text-6xl font-black text-[#1e2022] tracking-tighter leading-[1.1] mb-6">
              {t.about.title1} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-600 to-cyan-500">
                {t.about.title2}
              </span>
            </h2>
            
            <p className="text-lg md:text-xl text-gray-500 font-light leading-relaxed mb-10 max-w-lg">
              {t.about.para}
            </p>

            <Link 
              to="/products"
              className="inline-flex items-center gap-2 text-blue-600 font-bold uppercase tracking-wider hover:text-blue-800 transition-colors group w-max"
            >
              {isRTL ? 'ابدأ رحلة النمو' : 'Start Growing Now'}
              <ArrowUpRight className={`w-5 h-5 transition-transform group-hover:translate-x-1 group-hover:-translate-y-1 ${isRTL ? '-scale-x-100' : ''}`} />
            </Link>
          </div>

          {/* =========================================
              النصف الآخر: شبكة الإحصائيات (Bento Grid Stats)
              ========================================= */}
          <div className="lg:col-span-7 grid grid-cols-1 sm:grid-cols-2 gap-6">
            
            {/* البطاقة الأولى (عريضة) - Uptime */}
            <div className="sm:col-span-2 group bg-[#fafbfc] border border-gray-200 rounded-[2rem] p-8 md:p-10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 overflow-hidden relative">
              <div className="absolute top-0 right-0 w-40 h-40 bg-green-500/5 rounded-full blur-3xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="flex justify-between items-start mb-12">
                <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-green-500">
                  <Activity className="w-6 h-6" />
                </div>
                <span className="text-green-600 text-sm font-bold tracking-widest uppercase bg-green-50 px-3 py-1 rounded-full">
                  Status: Online
                </span>
              </div>
              
              <div>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-6xl md:text-7xl font-black text-[#1e2022] tracking-tighter">99.9</h3>
                  <span className="text-3xl font-bold text-green-500">%</span>
                </div>
                <p className="text-gray-500 font-medium text-lg mt-2 uppercase tracking-widest">
                  {t.about.uptime || (isRTL ? 'استقرار الخدمة' : 'Service Uptime')}
                </p>
              </div>
            </div>

            {/* البطاقة الثانية (مربعة) - Speed */}
            <div className="group bg-[#fafbfc] border border-gray-200 rounded-[2rem] p-8 md:p-10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.04)] transition-all duration-500 relative overflow-hidden">
              <div className="absolute -bottom-10 -right-10 w-32 h-32 bg-blue-500/5 rounded-full blur-2xl pointer-events-none group-hover:scale-150 transition-transform duration-700"></div>
              
              <div className="p-3 bg-white rounded-xl shadow-sm border border-gray-100 text-blue-500 w-max mb-10">
                <Zap className="w-6 h-6" />
              </div>
              
              <div>
                <div className="flex items-baseline gap-1">
                  <h3 className="text-5xl md:text-6xl font-black text-[#1e2022] tracking-tighter">0.5</h3>
                  <span className="text-2xl font-bold text-blue-500">s</span>
                </div>
                <p className="text-gray-500 font-medium mt-2 uppercase tracking-widest text-sm">
                  {t.about.execution || (isRTL ? 'سرعة التنفيذ' : 'Execution Speed')}
                </p>
              </div>
            </div>

            {/* البطاقة الثالثة (مربعة) - Security/Quality */}
            <div className="group bg-[#202124] rounded-[2rem] p-8 md:p-10 hover:shadow-[0_20px_40px_rgba(0,0,0,0.1)] transition-all duration-500 relative overflow-hidden flex flex-col justify-between">
              
              {/* رسمة هندسية بسيطة في الخلفية */}
              <div className="absolute top-0 right-0 w-full h-full opacity-10 pointer-events-none">
                <svg viewBox="0 0 100 100" className="w-full h-full absolute -right-12 -top-12 transform group-hover:rotate-12 transition-transform duration-1000">
                  <circle cx="50" cy="50" r="40" fill="none" stroke="white" strokeWidth="2" strokeDasharray="4 4" />
                  <circle cx="50" cy="50" r="20" fill="none" stroke="white" strokeWidth="1" />
                </svg>
              </div>

              <div className="p-3 bg-white/10 rounded-xl w-max mb-10 text-white relative z-10">
                <ShieldCheck className="w-6 h-6" />
              </div>
              
              <div className="relative z-10">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-2 leading-tight">
                  {isRTL ? 'أمان وموثوقية' : 'Secure & Reliable'}
                </h3>
                <p className="text-gray-400 text-sm font-light leading-relaxed">
                  {isRTL 
                    ? 'بنية تحتية متطورة تضمن حماية حساباتك وسرية بياناتك بالكامل.' 
                    : 'Advanced infrastructure ensuring complete account protection and data privacy.'}
                </p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}