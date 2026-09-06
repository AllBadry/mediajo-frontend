import React, { useRef, useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { X, Mail, Lock as LockIcon, Loader2, AlertCircle, ShieldCheck, KeyRound, ShoppingBag } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';
import GoogleButton from './GoogleButton';

// نافذة تسجيل الدخول المنبثقة عند إتمام الطلب
export default function LoginModal({ open, onClose }) {
  const container = useRef();
  const { t } = useLanguage();
  const navigate = useNavigate();
  const { login } = useAuth();
  const a = t.auth;

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [unverifiedEmail, setUnverifiedEmail] = useState(null);

  const inputClass = "w-full py-3 px-4 bg-gray-50 border border-gray-200 rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all";

  // إغلاق عند الضغط على Escape
  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape') onClose();
    };
    if (open) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose]);

  // حركة الظهور
  useGSAP(() => {
    if (open) {
      gsap.fromTo(".login-modal-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(".login-modal-card",
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
      );
    }
  }, { scope: container, dependencies: [open] });

  if (!open) return null;

  const handleGoVerify = (e) => {
    e.preventDefault();
    navigate('/auth', { state: { verifyEmail: unverifiedEmail, from: '/dashboard/cart' } });
  };

  // تسجيل الدخول عبر حساب Google (التحقق يتم على الخادم)
  const handleGoogleSuccess = async ({ idToken }) => {
    if (!idToken) return;
    setLoading(true);
    setError('');
    setUnverifiedEmail(null);
    try {
      const response = await api.post('/api/auth/google', { idToken });
      if (response.data?.success) {
        login(response.data.data.user);
        onClose();
        navigate('/dashboard/cart', { replace: true });
      }
    } catch (err) {
      setError(err.response?.data?.message || (t.dir === 'rtl' ? 'فشل تسجيل الدخول عبر Google' : 'Google sign-in failed'));
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setUnverifiedEmail(null);
    try {
      const response = await api.post('/api/auth/login', {
        email,
        password,
      });

      if (response.data.success) {
        login(response.data.user || { name: email.split('@')[0], email });
        onClose();
        navigate('/dashboard/cart', { replace: true });
      }
    } catch (err) {
      const code = err.response?.data?.code;
      if (code === 'EMAIL_NOT_VERIFIED') {
        setUnverifiedEmail(err.response.data.data?.email || email);
        return;
      }
      setError(err.response?.data?.message || (t.dir === 'rtl' ? 'حدث خطأ غير متوقع' : 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div ref={container}>
      <div dir={t.dir} className="login-modal-backdrop fixed inset-0 z-[100] bg-black/50 backdrop-blur-sm flex items-center justify-center p-4" onClick={onClose}>
        <div
          className="login-modal-card relative w-full max-w-md bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_60px_120px_rgba(0,0,0,0.3)] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {/* زر الإغلاق */}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          {/* الشعار */}
          <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
            <ShoppingBag className="w-7 h-7" />
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mb-1">{a.checkoutTitle}</h2>
          <p className="text-gray-500 font-medium text-sm mb-7">{a.checkoutSub}</p>

          <GoogleButton onSuccess={handleGoogleSuccess} text="signin_with" width={300} />

          <div className="flex items-center gap-4 my-6">
            <div className="flex-1 h-px bg-gray-100"></div>
            <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">{a.or}</span>
            <div className="flex-1 h-px bg-gray-100"></div>
          </div>

          {/* خطأ عام */}
          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}

          {/* الحساب غير مفعل */}
          {unverifiedEmail && (
            <div className="mb-4 p-4 bg-blue-50/70 border border-blue-100 rounded-xl">
              <div className="flex items-start gap-3">
                <KeyRound className="w-5 h-5 text-blue-600 shrink-0 mt-0.5" />
                <div>
                  <p className="text-sm font-bold text-gray-900 mb-1">{a.verifyTitle}</p>
                  <p className="text-xs text-gray-500 font-medium mb-3">{a.checkoutUnverified}</p>
                  <button
                    onClick={handleGoVerify}
                    className="bg-blue-600 hover:bg-blue-500 text-white px-4 py-2 rounded-lg text-xs font-bold transition-colors"
                  >
                    {a.verifyNow}
                  </button>
                </div>
              </div>
            </div>
          )}

          <form onSubmit={handleLogin} className="flex flex-col gap-4">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <Mail className="w-4 h-4 text-gray-400" /> {a.email}
              </label>
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setError(''); }}
                placeholder="you@example.com"
                className={inputClass}
                required
                autoFocus
              />
            </div>

            <div>
              <div className="flex items-center justify-between mb-2">
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700">
                  <LockIcon className="w-4 h-4 text-gray-400" /> {a.password}
                </label>
                <Link to="/auth" className="text-xs font-semibold text-blue-600 hover:text-blue-500">{a.forgot}</Link>
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => { setPassword(e.target.value); setError(''); }}
                placeholder="••••••••"
                className={inputClass}
                required
              />
            </div>

            <button
              type="submit"
              disabled={loading}
              className="mt-1 w-full py-4 bg-[#1e2022] text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-[0_10px_25px_rgba(0,0,0,0.15)] disabled:opacity-70 flex justify-center items-center"
            >
              {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{a.signIn} →</>}
            </button>
          </form>

          <div className="mt-5 pt-5 border-t border-gray-100 text-center text-sm font-medium text-gray-500">
            {a.noAccount}{' '}
            <Link to="/auth" className="text-blue-600 font-bold hover:text-blue-500">{a.createOne}</Link>
          </div>

          <div className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400">
            <ShieldCheck className="w-4 h-4" /> {t.dashboard.sslEncrypted}
          </div>
        </div>
      </div>
    </div>
  );
}