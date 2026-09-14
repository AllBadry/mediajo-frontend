import React from 'react';
import { Link } from 'react-router-dom';
import { useLanguage } from '../../context/LanguageContext';
import { Flame, Sparkles, Clock, ArrowRight, Zap } from 'lucide-react';

export default function Offers() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  return (
    <section dir={t.dir} className="relative w-full py-20 md:py-32 px-6 md:px-12 font-sans bg-[#fafbfc] overflow-hidden border-t border-gray-100">
      
      {/* 1. تأثيرات الخلفية (Soft Glowing Blobs) */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-gradient-to-bl from-orange-200/40 to-pink-200/40 blur-[100px] rounded-full pointer-events-none -translate-y-1/2 translate-x-1/4 z-0"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-gradient-to-tr from-blue-200/40 to-purple-200/40 blur-[120px] rounded-full pointer-events-none translate-y-1/3 -translate-x-1/4 z-0"></div>

      <div className="max-w-[85rem] mx-auto relative z-10">
        
        {/* 2. عنوان القسم */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 md:mb-16 gap-6">
          <div className="flex flex-col">
            <div className="flex items-center gap-3 mb-4">
              <Flame className="w-6 h-6 text-orange-500 animate-pulse" />
              <span className="text-sm font-bold tracking-widest uppercase text-orange-500">
                {isRTL ? 'عروض لفترة محدودة' : 'Limited Time Offers'}
              </span>
            </div>
            <h2 className="text-4xl md:text-6xl font-black text-[#1e2022] tracking-tighter leading-tight">
              {isRTL ? 'باقات الحرق' : 'Flash Deals'} <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-orange-500 to-pink-600">
                {isRTL ? 'أسعار لا تقبل المنافسة' : 'Unbeatable Prices'}
              </span>
            </h2>
          </div>
          
          <Link to="/products" className="inline-flex items-center gap-2 font-bold text-gray-500 hover:text-gray-900 transition-colors group">
            {isRTL ? 'عرض كل الباقات' : 'View all packages'}
            <ArrowRight className={`w-5 h-5 transition-transform ${isRTL ? 'rotate-180 group-hover:-translate-x-2' : 'group-hover:translate-x-2'}`} />
          </Link>
        </div>

        {/* 3. شبكة العروض (Bento Grid Layout) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 md:gap-8">
          
          {/* =======================================
              البطاقة الرئيسية (Mega Offer) - داكنة وفخمة
              ======================================= */}
          <div className="lg:col-span-7 relative group rounded-[2rem] md:rounded-[2.5rem] bg-[#0a0a0f] overflow-hidden shadow-2xl flex flex-col justify-between p-8 md:p-12">
            
            {/* تأثير اللمعان المتحرك (Shimmer Effect) */}
            <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/5 to-transparent group-hover:animate-[shimmer_2s_infinite] pointer-events-none z-10"></div>
            
            {/* أشكال في الخلفية */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-gradient-to-br from-orange-500/20 to-purple-600/20 rounded-full blur-3xl pointer-events-none z-0"></div>

            <div className="relative z-20">
              <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
                <span className="inline-flex items-center gap-2 px-4 py-1.5 bg-orange-500/10 border border-orange-500/20 text-orange-400 rounded-full text-sm font-bold">
                  <Sparkles className="w-4 h-4" /> {isRTL ? 'الأكثر مبيعاً' : 'Best Seller'}
                </span>
                
                {/* عداد تنازلي (شكلي) */}
                <div className="flex items-center gap-2 bg-white/5 backdrop-blur-md border border-white/10 px-4 py-2 rounded-xl text-white font-mono text-sm">
                  <Clock className="w-4 h-4 text-pink-400" />
                  <span>12 : 45 : 30</span>
                </div>
              </div>

              <h3 className="text-4xl md:text-5xl font-black text-white mb-4 leading-tight tracking-tight">
                {isRTL ? 'باقة وكالات السوشال ميديا' : 'Social Media Agency Bundle'}
              </h3>
              <p className="text-gray-400 text-lg max-w-md font-light leading-relaxed mb-8">
                {isRTL 
                  ? 'مزيج احترافي يتضمن 20,000 متابع انستغرام، 50,000 مشاهدة، وتفاعل حقيقي لدعم حسابك.' 
                  : 'A professional mix including 20K IG followers, 50K views, and real engagement.'}
              </p>
            </div>

            <div className="relative z-20 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 mt-8 pt-8 border-t border-white/10">
              <div className="flex flex-col">
                <span className="text-gray-500 line-through text-lg font-medium mb-1">120.00 JOD</span>
                <div className="flex items-baseline gap-2">
                  <span className="text-5xl md:text-6xl font-black text-white">65<span className="text-2xl text-orange-400">.00</span></span>
                  <span className="text-orange-400 font-bold tracking-widest">JOD</span>
                </div>
              </div>
              <Link to="/products" className="w-full sm:w-auto px-8 py-4 bg-gradient-to-r from-orange-500 to-pink-600 text-white font-bold rounded-2xl hover:scale-105 transition-transform shadow-[0_10px_30px_rgba(249,115,22,0.3)] text-center">
                {isRTL ? 'اقتنص العرض' : 'Grab the Deal'}
              </Link>
            </div>
          </div>

          {/* =======================================
              البطاقات الفرعية (مكدسة عمودياً) - زجاجية
              ======================================= */}
          <div className="lg:col-span-5 flex flex-col gap-6 md:gap-8">
            
            {/* العرض الفرعي 1 */}
            <Link to="/products" className="group flex-1 relative bg-white rounded-[2rem] p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-blue-500/10 rounded-bl-full pointer-events-none"></div>
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center">
                    <Zap className="w-6 h-6" />
                  </div>
                  <span className="bg-red-500 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider animate-[float_3s_ease-in-out_infinite]">
                    -30%
                  </span>
                </div>
                <h4 className="text-2xl font-black text-[#1e2022] mb-2">{isRTL ? 'متابعين فيسبوك عرب' : 'Arab FB Followers'}</h4>
                <p className="text-gray-500 font-medium text-sm">{isRTL ? '10,000 متابع حقيقي مع ضمان 30 يوم.' : '10K Real followers with 30-day refill.'}</p>
              </div>
              
              <div className="mt-6 flex items-end gap-3">
                <span className="text-3xl font-black text-blue-600">56.00</span>
                <span className="text-gray-400 font-bold text-sm mb-1">JOD</span>
                <span className="text-gray-300 line-through text-sm mb-1 ms-2">80.00</span>
              </div>
            </Link>

            {/* العرض الفرعي 2 */}
            <Link to="/products" className="group flex-1 relative bg-white rounded-[2rem] p-6 md:p-8 border border-gray-200 shadow-xl hover:shadow-2xl transition-all hover:-translate-y-1 overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-bl-full pointer-events-none"></div>
              
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center">
                    <Sparkles className="w-6 h-6" />
                  </div>
                  <span className="bg-purple-600 text-white text-xs font-black px-3 py-1 rounded-full uppercase tracking-wider">
                    {isRTL ? 'عروض تيك توك' : 'TikTok Deals'}
                  </span>
                </div>
                <h4 className="text-2xl font-black text-[#1e2022] mb-2">{isRTL ? '100,000 مشاهدة' : '100K Views'}</h4>
                <p className="text-gray-500 font-medium text-sm">{isRTL ? 'سرعة فائقة ودعم لظهور الفيديو في الاكسبلور.' : 'Super fast delivery to boost explore page chances.'}</p>
              </div>
              
              <div className="mt-6 flex items-end gap-3">
                <span className="text-3xl font-black text-purple-600">12.00</span>
                <span className="text-gray-400 font-bold text-sm mb-1">JOD</span>
                <span className="text-gray-300 line-through text-sm mb-1 ms-2">25.00</span>
              </div>
            </Link>

          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          100% { transform: translateX(100%); }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-5px); }
        }
      `}</style>
    </section>
  );
}