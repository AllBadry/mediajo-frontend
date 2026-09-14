import React from 'react';
import { useLanguage } from '../../context/LanguageContext';
import { PlayCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

export default function About() {
  const { t } = useLanguage();
  const isRTL = t.dir === 'rtl';

  return (
    <section 
      id="about-section" 
      dir={t.dir} 
      // القسم يأخذ عرض الشاشة بالكامل بلون فاتح جداً ونظيف
      className="relative w-full py-24 md:py-32 bg-[#fafbfc] font-sans overflow-hidden border-t border-gray-100"
    >
      
      {/* الحاوية الرئيسية (واسعة جداً لإعطاء مساحات فارغة ضخمة) */}
      <div className="max-w-[95rem] mx-auto px-6 md:px-12 lg:px-20 grid grid-cols-1 lg:grid-cols-12 gap-16 lg:gap-24 items-center">
        
        {/* =========================================
            النصف الأول: النصوص والإحصائيات (مساحات فارغة حرة)
            ========================================= */}
        <div className="lg:col-span-7 flex flex-col">
          
          <div className="mb-12">
            <h2 className="text-5xl sm:text-6xl lg:text-[5.5rem] font-medium text-[#111] tracking-tighter leading-[1.05] mb-8">
              {isRTL ? 'فن السيطرة' : 'The Art of the'} <br />
              <span className="text-gray-400">{isRTL ? 'على العالم الرقمي' : 'Digital World'}</span>
            </h2>
            
            <p className="text-gray-500 font-light text-lg md:text-xl leading-relaxed max-w-xl">
              {isRTL 
                ? 'نقدم لك في ميديا جو رحلة استثنائية في عالم النمو الرقمي. هنا، المساحة لك لتتقن فن السيطرة على السوشال ميديا بأدوات احترافية ونتائج حقيقية.'
                : 'Our digital services offer an exciting journey into the world of social growth. Master the art of online presence with professional tools and real results.'}
            </p>
          </div>

          {/* الأزرار */}
          <div className="flex flex-wrap items-center gap-8 mb-24">
            <Link to="/products" className="px-10 py-5 bg-[#111] text-white rounded-full font-bold text-sm tracking-wider hover:bg-blue-600 transition-colors shadow-lg hover:shadow-xl hover:-translate-y-1 transform duration-300">
              {isRTL ? 'تسوق الآن' : 'SHOP NOW'}
            </Link>
            <button className="flex items-center gap-3 text-[#111] font-bold text-sm hover:text-blue-600 transition-colors group">
              <PlayCircle className="w-8 h-8 text-gray-300 group-hover:text-blue-600 transition-colors" />
              <span className="tracking-widest uppercase">{isRTL ? 'شاهد كيف نعمل' : "SEE HOW IT'S WORK"}</span>
            </button>
          </div>

          {/* الإحصائيات (بدون فواصل، تعتمد على التباعد البصري) */}
          <div className="flex flex-col sm:flex-row gap-16 sm:gap-28">
            
            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
                {isRTL ? 'سرعة فائقة' : 'HIGH SPEED'}
              </span>
              <div className="text-5xl lg:text-6xl font-medium text-[#111] mb-2 tracking-tighter">
                0.5s
              </div>
              <span className="text-sm text-gray-500 font-medium">
                {isRTL ? 'متوسط سرعة التنفيذ' : 'Average execution time'}
              </span>
            </div>

            <div className="flex flex-col">
              <span className="text-xs font-bold tracking-[0.2em] text-gray-400 uppercase mb-4">
                {isRTL ? 'عميل يثق بنا' : 'CLIENTS TRUST US'}
              </span>
              <div className="text-5xl lg:text-6xl font-medium text-[#111] mb-2 tracking-tighter">
                +1000
              </div>
              
              <div className="flex items-center gap-4 mt-2">
                <div className="flex items-center">
                  {/* تم استبدال الصور هنا لتكون لرجال */}
                  <img src="https://i.pravatar.cc/100?img=11" alt="Client" className="w-8 h-8 rounded-full border-2 border-white z-30" />
                  <img src="https://i.pravatar.cc/100?img=33" alt="Client" className="w-8 h-8 rounded-full border-2 border-white -ml-3 z-20" />
                  <img src="https://i.pravatar.cc/100?img=52" alt="Client" className="w-8 h-8 rounded-full border-2 border-white -ml-3 z-10" />
                </div>
                <span className="text-sm text-gray-500 font-medium">
                  {isRTL ? 'شريك نجاح' : 'Success partners'}
                </span>
              </div>
            </div>

          </div>
        </div>

        {/* =========================================
            النصف الثاني: الصورة التجريدية الحرة والكرت العائم
            ========================================= */}
        <div className="lg:col-span-5 relative h-[600px] lg:h-[800px] w-full flex items-center justify-center">
          
          {/* الصورة التجريدية (تأخذ مساحة عامودية أنيقة) */}
          <div className="w-full h-full rounded-[2.5rem] overflow-hidden relative shadow-2xl">
            <img 
              src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?q=80&w=2000&auto=format&fit=crop" 
              alt="3D Abstract Art" 
              className="w-full h-full object-cover transform scale-110 animate-[slowPan_20s_ease-in-out_infinite_alternate]"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent mix-blend-overlay"></div>
          </div>

          {/* الكرت الداكن (يطفو فوق الصورة ويكسر الشبكة بجمالية) */}
          <div className={`absolute bottom-10 ${isRTL ? 'right-10 lg:-right-16' : 'left-10 lg:-left-16'} w-[85%] sm:w-[400px] bg-[#15161c] text-white p-8 md:p-10 rounded-[2rem] shadow-[0_30px_60px_rgba(0,0,0,0.3)] backdrop-blur-md`}>
            
            <div className="absolute -top-6 left-8">
              <div className="p-1 bg-[#15161c] rounded-full">
                {/* تم استبدال صورة التقييم لتكون لرجل */}
                <img 
                  src="https://i.pravatar.cc/150?img=68" 
                  alt="Reviewer" 
                  className="w-12 h-12 rounded-full object-cover"
                />
              </div>
            </div>

            <div className="mt-4">
              <h4 className="text-sm font-bold tracking-widest uppercase mb-1 text-gray-100">
                {isRTL ? 'عمر الخطيب' : 'OMAR AL-KHATEEB'}
              </h4>
              <p className="text-xs text-gray-400 mb-6 font-medium uppercase tracking-wider">
                {isRTL ? 'مشتري موثق' : 'Verified buyer'}
              </p>
              
              <p className="text-base text-gray-300 font-light leading-relaxed">
                {isRTL 
                  ? "أنا سعيد للغاية بخدمات ميديا جو! لقد كانت رحلة مذهلة في عالم الإبداع والنمو. من الدقائق الأولى، وجدت نفسي في عالم آسر من الدعم السريع والنتائج الحقيقية."
                  : "I am absolutely thrilled with MediaJo services! It was an incredible journey into the world of growth. From the very first minutes, I immersed myself in the captivating results."}
              </p>
            </div>
          </div>

        </div>

      </div>

      <style>{`
        @keyframes slowPan {
          0% { transform: scale(1.1) translate(0, 0); }
          50% { transform: scale(1.15) translate(-2%, 2%); }
          100% { transform: scale(1.1) translate(2%, -2%); }
        }
      `}</style>
    </section>
  );
}