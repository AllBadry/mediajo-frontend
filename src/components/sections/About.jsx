import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PlayCircle, ArrowUpRight } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  return (
    <section 
      id="about-section" 
      dir={t.dir} 
      // خلفية رمادية فاتحة جداً لإبراز الكرت الأبيض
      className="relative w-full py-20 md:py-28 px-4 md:px-8 bg-[#eef0f3] font-sans flex justify-center items-center"
    >
      
      {/* الكرت المركزي الضخم (The Main Wrapper) */}
      <div className="w-full max-w-[85rem] bg-[#f9fafb] rounded-[2rem] md:rounded-[3rem] overflow-hidden shadow-[0_30px_60px_-15px_rgba(0,0,0,0.1)] flex flex-col lg:flex-row">
        
        {/* =========================================
            الجزء الأيمن/الأيسر (النصوص والإحصائيات - 65% من العرض)
            ========================================= */}
        <div className="w-full lg:w-[65%] flex flex-col">
          
          {/* الجزء العلوي: النصوص الرئيسية */}
          <div className="p-10 md:p-16 flex-1 flex flex-col justify-center">
            <h2 className="text-5xl md:text-6xl lg:text-7xl font-medium text-[#111] tracking-tight leading-[1.05] mb-6">
              {isRTL ? 'فن السيطرة' : 'The Art of the'} <br />
              {isRTL ? 'على العالم الرقمي' : 'Digital World'}
            </h2>
            
            <p className="text-gray-500 font-medium text-sm md:text-base leading-relaxed max-w-md mb-10">
              {isRTL 
                ? 'نقدم لك في ميديا جو رحلة استثنائية في عالم النمو الرقمي، حيث يمكنك إتقان فن السيطرة على السوشال ميديا بأدوات احترافية.'
                : 'Our digital services offer an exciting journey into the world of social growth, where you can master the art of online presence.'}
            </p>

            <div className="flex flex-wrap items-center gap-6">
              <Link to="/products" className="px-8 py-4 bg-[#111] text-white rounded-full font-bold text-sm hover:scale-105 transition-transform">
                {isRTL ? 'تسوق الآن' : 'SHOP NOW'}
              </Link>
              <button className="flex items-center gap-2 text-[#111] font-bold text-sm hover:text-blue-600 transition-colors">
                <PlayCircle className="w-6 h-6" />
                {isRTL ? 'شاهد كيف نعمل' : "SEE HOW IT'S WORK"}
              </button>
            </div>
          </div>

          {/* الجزء السفلي: الإحصائيات (مفصولة بخطوط) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 border-t border-gray-200">
            
            {/* إحصائية 1 */}
            <div className={`p-8 md:p-10 ${isRTL ? 'sm:border-l' : 'sm:border-r'} border-b sm:border-b-0 border-gray-200 flex flex-col justify-between`}>
              <div>
                <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2 block">
                  {isRTL ? 'بدءاً من' : 'FROM'}
                </span>
                <div className="text-3xl font-medium text-[#111] leading-tight mb-6">
                  {isRTL ? 'سرعة فائقة' : 'High Speed'}<br/> 0.5s
                </div>
              </div>
              
              <div className="flex items-center justify-between">
                <div className="flex flex-col gap-1 text-sm text-gray-600 font-medium">
                  <span>{isRTL ? 'نسبة الاستقرار' : 'Uptime Status'} <strong className="text-[#111]">99.9%</strong></span>
                  <span>{isRTL ? 'ضمان تعويض' : 'Refill Warranty'} <strong className="text-[#111]">30 Days</strong></span>
                </div>
                <div className="w-10 h-10 bg-[#111] rounded-full flex items-center justify-center text-white hover:bg-blue-600 cursor-pointer transition-colors">
                  <ArrowUpRight className={`w-5 h-5 ${isRTL ? '-scale-x-100' : ''}`} />
                </div>
              </div>
            </div>

            {/* إحصائية 2 */}
            <div className="p-8 md:p-10 flex flex-col justify-between">
              <div>
                <span className="text-xs font-bold tracking-widest text-gray-500 uppercase mb-2 block">
                  {isRTL ? 'العديد من العملاء اختارونا' : 'SO MANY CLIENTS CHOSE US'}
                </span>
                <div className="text-4xl md:text-5xl font-medium text-[#111] mt-4 mb-2">
                  +1850
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {isRTL ? 'عميل راضٍ' : 'Satisfied clients'}
                </span>
              </div>
              
              {/* صور العملاء المتداخلة */}
              <div className="flex items-center mt-6">
                <img src="https://i.pravatar.cc/100?img=32" alt="Client" className="w-12 h-12 rounded-full border-2 border-[#f9fafb] z-30" />
                <img src="https://i.pravatar.cc/100?img=12" alt="Client" className="w-12 h-12 rounded-full border-2 border-[#f9fafb] -ml-4 z-20" />
                <img src="https://i.pravatar.cc/100?img=47" alt="Client" className="w-12 h-12 rounded-full border-2 border-[#f9fafb] -ml-4 z-10" />
                <div className="w-12 h-12 rounded-full border-2 border-[#f9fafb] bg-gray-200 -ml-4 flex items-center justify-center text-xs font-bold text-gray-600 z-0">
                  +2k
                </div>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            الجزء الآخر (الصورة الفنية + الكرت الداكن - 35% من العرض)
            ========================================= */}
        <div className="w-full lg:w-[35%] flex flex-col relative">
          
          {/* الصورة التجريدية (3D Art) من الإنترنت مع أنيميشن */}
          <div className="h-64 lg:h-[60%] w-full bg-gray-100 overflow-hidden relative">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
              alt="3D Abstract Art" 
              className="w-full h-full object-cover transform scale-110 animate-[slowPan_15s_ease-in-out_infinite_alternate]"
            />
            {/* فلتر خفيف فوق الصورة لتبدو ناعمة */}
            <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
          </div>

          {/* الكرت الداكن (Testimonial Card) */}
          <div className="bg-[#1a1b26] text-white p-10 flex-1 relative flex flex-col justify-center">
            
            {/* الصورة الشخصية العائمة (تتداخل مع حدود الصورة العلوية) */}
            <div className="absolute -top-8 left-10">
              <div className="p-1 bg-[#1a1b26] rounded-full">
                <img 
                  src="https://i.pravatar.cc/150?img=44" 
                  alt="Reviewer" 
                  className="w-14 h-14 rounded-full object-cover"
                />
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-bold tracking-wider uppercase mb-1">
                {isRTL ? 'صوفيا زينتشنكو' : 'SOFIA ZINCHENKO'}
              </h4>
              <p className="text-xs text-gray-400 mb-6 font-medium">
                {isRTL ? 'مشتري موثق' : 'Verified buyer'}
              </p>
              
              <p className="text-sm text-gray-300 font-light leading-relaxed">
                {isRTL 
                  ? "أنا سعيدة للغاية بخدمات ميديا جو! لقد كانت رحلة مذهلة في عالم الإبداع والنمو. من الدقائق الأولى، وجدت نفسي في عالم آسر من الدعم السريع والنتائج الحقيقية."
                  : "I am absolutely thrilled with MediaJo services! It was an incredible journey into the world of growth. From the very first minutes, I immersed myself in the captivating results."}
              </p>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        /* أنيميشن ناعم جداً لتحريك الصورة 3D ببطء لتعطي إيحاء بأنها حية */
        @keyframes slowPan {
          0% { transform: scale(1.1) translate(0, 0); }
          50% { transform: scale(1.15) translate(-2%, 2%); }
          100% { transform: scale(1.1) translate(2%, -2%); }
        }
      `}</style>
    </section>
  );
}