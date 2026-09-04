import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { LogIn, Mail, Lock as LockIcon, User, ShieldCheck, CheckCircle2 } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';

// ==========================================
// دالة توليد الظلال ثلاثية الأبعاد
// ==========================================
const getGradientExtrusion = (depth, r1, g1, b1, r2, g2, b2, xDir, yDir) => {
  let shadows = [];
  shadows.push(`inset -8px -8px 20px rgba(0,0,0,0.06)`);
  shadows.push(`inset 8px 8px 20px rgba(255,255,255,0.9)`);
  shadows.push(`inset 0px 0px 0px 1px rgba(255,255,255,0.5)`);

  for (let i = 1; i <= depth; i++) {
    const ratio = i / depth;
    const r = Math.round(r1 + (r2 - r1) * ratio);
    const g = Math.round(g1 + (g2 - g1) * ratio);
    const b = Math.round(b1 + (b2 - b1) * ratio);
    shadows.push(`${i * xDir}px ${i * yDir}px 0px rgb(${r}, ${g}, ${b})`);
  }

  shadows.push(`${(depth + 10) * xDir}px ${(depth + 10) * yDir}px 30px rgba(0,0,0,0.08)`);
  shadows.push(`${(depth + 30) * xDir}px ${(depth + 30) * yDir}px 60px rgba(0,0,0,0.05)`);
  return shadows.join(', ');
};

// ==========================================
// شعار Google الرسمي
// ==========================================
const GoogleIcon = ({ className }) => (
  <svg className={className} viewBox="0 0 48 48" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path fill="#FFC107" d="M43.611 20.083H42V20H24v8h11.303c-1.649 4.657-6.08 8-11.303 8-6.627 0-12-5.373-12-12s5.373-12 12-12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 12.955 4 4 12.955 4 24s8.955 20 20 20 20-8.955 20-20c0-1.341-.138-2.65-.389-3.917z" />
    <path fill="#FF3D00" d="M6.306 14.691l6.571 4.819C14.655 15.108 18.961 12 24 12c3.059 0 5.842 1.154 7.961 3.039l5.657-5.657C34.046 6.053 29.268 4 24 4 16.318 4 9.656 8.337 6.306 14.691z" />
    <path fill="#4CAF50" d="M24 44c5.166 0 9.86-1.977 13.409-5.192l-6.19-5.238C29.211 35.091 26.715 36 24 36c-5.202 0-9.619-3.317-11.283-7.946l-6.522 5.025C9.505 39.556 16.227 44 24 44z" />
    <path fill="#1976D2" d="M43.611 20.083H42V20H24v8h11.303c-.792 2.237-2.231 4.166-4.087 5.571.001-.001.002-.001.003-.002l6.19 5.238C36.971 39.205 44 34 44 24c0-1.341-.138-2.65-.389-3.917z" />
  </svg>
);

export default function Auth() {
  const { t } = useLanguage();
  const shadowCircle = getGradientExtrusion(50, 236, 72, 153, 250, 204, 21, -1, 1.5);
  const shadowBox = getGradientExtrusion(60, 6, 182, 212, 139, 92, 246, -1.2, 1);
  const shadowRound = getGradientExtrusion(45, 99, 102, 241, 255, 255, 255, 1.2, 1.2);

  const inputClass = "w-full py-3.5 px-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all";

  const [mode, setMode] = useState('login');

  return (
    <section dir={t.dir} className="relative w-full min-h-[85vh] bg-[#fafbfc] flex items-center justify-center overflow-hidden font-sans">
      
      {/* شبكة النقاط */}
      <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      {/* التوهج الخلفي */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[900px] h-[900px] bg-gradient-to-tr from-blue-50/60 to-purple-50/60 rounded-full blur-3xl -z-10"></div>

      <div className="max-w-[85rem] w-full mx-auto px-6 py-16 grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 relative z-10 items-center">

        {/* =========================================
            النصف الأيسر: العناصر الثلاثية الأبعاد + نصوص
            ========================================= */}
        <div className="lg:col-span-6 flex flex-col justify-center items-center text-center lg:text-left lg:items-start">
          
          {/* الشعار */}
          <div className="flex items-center gap-2 mb-8 text-gray-900 group">
            <span className="text-2xl font-bold tracking-tight group-hover:text-blue-600 transition-colors">{t.auth.brand}</span>
            <div className="w-3 h-8 bg-gray-900 skew-x-12 ml-1 shadow-sm"></div>
            <div className="w-5 h-5 bg-gray-900 rounded-full shadow-sm"></div>
            <span className="text-2xl font-light tracking-widest text-gray-400 ml-1">26</span>
          </div>

          {/* العناوين الضخمة */}
          <h1 className="text-5xl sm:text-6xl lg:text-[5rem] leading-[0.95] font-medium text-[#1e2022] tracking-tighter mb-6">
            {t.auth.welcome}
            <br />
            {t.auth.back}<span className="text-blue-500">.</span>
          </h1>

          <p className="text-lg lg:text-xl text-gray-500 max-w-md font-light leading-relaxed mb-10">
            {t.auth.sub}
          </p>

          {/* المجسمات الثلاثية الأبعاد */}
          <div className="relative w-full max-w-[500px] h-[300px] hidden lg:block">
            <div
              className="absolute top-[10%] left-[8%] w-32 h-32 bg-gradient-to-br from-white to-gray-50 rounded-full flex items-center justify-center z-20"
              style={{ boxShadow: shadowCircle, transform: 'rotateX(25deg) rotateY(-20deg) rotateZ(15deg)', animation: 'floatSlow 7s ease-in-out infinite' }}
            >
              <LogIn className="w-8 h-8 text-blue-600" />
            </div>

            <div
              className="absolute bottom-[8%] left-[38%] w-36 h-56 bg-gradient-to-br from-white to-gray-50 rounded-[2rem] z-10"
              style={{ boxShadow: shadowBox, transform: 'rotateX(15deg) rotateY(-15deg) rotateZ(-12deg)', animation: 'floatFast 6s ease-in-out infinite reverse' }}
            ></div>

            <div
              className="absolute top-[15%] right-[5%] w-28 h-28 bg-gradient-to-br from-white to-gray-50 rounded-full z-30"
              style={{ boxShadow: shadowRound, transform: 'rotateX(30deg) rotateY(20deg) rotateZ(20deg)', animation: 'floatSlow 8s ease-in-out infinite 1s' }}
            ></div>
          </div>
        </div>

        {/* =========================================
            النصف الأيمن: بطاقة Flip (تسجيل دخول / انشاء حساب)
            ========================================= */}
        <div className="lg:col-span-6 flex justify-center">
          <div className={`relative w-full max-w-md h-[590px] [perspective:1400px]`}>
            {/* حاوية الدوران */}
            <div className={`relative w-full h-full transition-transform duration-700 [transform-style:preserve-3d] ${mode === 'register' ? '[transform:rotateY(180deg)]' : ''}`}>

              {/* الوجه الأمامي: تسجيل الدخول */}
              <div className="absolute inset-0 w-full h-full bg-white/80 backdrop-blur-xl border border-gray-200 rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.06)] [backface-visibility:hidden] overflow-y-auto">
                
                <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-1">{t.auth.signInTitle}</h2>
                <p className="text-gray-500 font-medium text-sm mb-7">{t.auth.signInSub}</p>

                <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-sm text-gray-800 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300 shadow-sm mb-6">
                  <GoogleIcon className="w-5 h-5" />
                  {t.auth.signInGoogle}
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.auth.or}</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <form className="flex flex-col gap-4">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 text-gray-400" /> {t.auth.email}
                    </label>
                    <input type="email" placeholder="you@example.com" className={inputClass} />
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                        <LockIcon className="w-4 h-4 text-gray-400" /> {t.auth.password}
                      </label>
                      <button type="button" className="text-xs font-semibold text-blue-600 hover:text-blue-500">{t.auth.forgot}</button>
                    </div>
                    <input type="password" placeholder="••••••••" className={inputClass} />
                  </div>

                  <button type="submit" className="mt-2 w-full py-4 bg-[#1e2022] text-white rounded-2xl font-bold text-sm hover:bg-black hover:-translate-y-0.5 transition-all duration-300 shadow-[0_10px_25px_rgba(0,0,0,0.15)]">
                    {t.auth.signIn}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm font-medium text-gray-500">
                  {t.auth.noAccount}{' '}
                  <button onClick={() => setMode('register')} className="text-blue-600 font-bold hover:text-blue-500">{t.auth.createOne}</button>
                </p>
              </div>

              {/* الوجه الخلفي: انشاء حساب */}
              <div className="absolute inset-0 w-full h-full bg-white/80 backdrop-blur-xl border border-gray-200 rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.06)] [transform:rotateY(180deg)] [backface-visibility:hidden] overflow-y-auto">
                
                <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-1">{t.auth.createTitle}</h2>
                <p className="text-gray-500 font-medium text-sm mb-7">{t.auth.createSub}</p>

                <button className="w-full flex items-center justify-center gap-3 py-3.5 bg-white border border-gray-200 rounded-2xl font-bold text-sm text-gray-800 hover:bg-gray-50 hover:border-gray-300 hover:-translate-y-0.5 transition-all duration-300 shadow-sm mb-6">
                  <GoogleIcon className="w-5 h-5" />
                  {t.auth.signUpGoogle}
                </button>

                <div className="flex items-center gap-4 mb-6">
                  <div className="flex-1 h-px bg-gray-200"></div>
                  <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{t.auth.or}</span>
                  <div className="flex-1 h-px bg-gray-200"></div>
                </div>

                <form className="flex flex-col gap-3.5">
                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <User className="w-4 h-4 text-gray-400" /> {t.auth.fullName}
                    </label>
                    <input type="text" placeholder={t.auth.yourName} className={inputClass} />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <Mail className="w-4 h-4 text-gray-400" /> {t.auth.email}
                    </label>
                    <input type="email" placeholder="you@example.com" className={inputClass} />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <LockIcon className="w-4 h-4 text-gray-400" /> {t.auth.password}
                    </label>
                    <input type="password" placeholder="••••••••" className={inputClass} />
                  </div>

                  <div>
                    <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                      <ShieldCheck className="w-4 h-4 text-gray-400" /> {t.auth.confirmPassword}
                    </label>
                    <input type="password" placeholder="••••••••" className={inputClass} />
                  </div>

                  <button type="submit" className="mt-2 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-500 hover:-translate-y-0.5 transition-all duration-300 shadow-[0_10px_25px_rgba(37,99,235,0.25)]">
                    {t.auth.createAccount}
                  </button>
                </form>

                <p className="mt-6 text-center text-sm font-medium text-gray-500">
                  {t.auth.haveAccount}{' '}
                  <button onClick={() => setMode('login')} className="text-blue-600 font-bold hover:text-blue-500">{t.auth.signIn}</button>
                </p>
              </div>

            </div>
          </div>
        </div>

      </div>

      <style>{`
        @keyframes floatSlow {
          0%, 100% { transform: translateY(0) rotateX(25deg) rotateY(-20deg) rotateZ(15deg); }
          50% { transform: translateY(-25px) rotateX(28deg) rotateY(-18deg) rotateZ(12deg); }
        }
        @keyframes floatFast {
          0%, 100% { transform: translateY(0) rotateX(15deg) rotateY(-15deg) rotateZ(-12deg); }
          50% { transform: translateY(-15px) rotateX(12deg) rotateY(-18deg) rotateZ(-10deg); }
        }
      `}</style>
    </section>
  );
}
