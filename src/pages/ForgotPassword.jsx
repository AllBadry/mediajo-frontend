import React, { useState } from 'react';
import { Link, useNavigate, useSearchParams } from 'react-router-dom';
import { KeyRound, Mail, Lock as LockIcon, Loader2, AlertCircle, CheckCircle2, RefreshCw } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import api from '../api/client';

export default function ForgotPassword() {
  const { t } = useLanguage();
  const a = t.auth;
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const token = searchParams.get('token') || '';

  const isReset = !!token;
  const [email, setEmail] = useState('');
  const [newPass, setNewPass] = useState('');
  const [confirmPass, setConfirmPass] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const inputClass = "w-full py-3.5 px-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all";

  const handleRequestLink = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    try {
      await api.post('/api/auth/forgot-password', { email });
      setSuccess(a.resetSent);
    } catch (err) {
      setError(err.response?.data?.message || 'حدث خطأ غير متوقع');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');
    setSuccess('');
    if (newPass.length < 6) {
      setError(a.passwordMin);
      setLoading(false);
      return;
    }
    if (newPass !== confirmPass) {
      setError(a.passwordMismatch);
      setLoading(false);
      return;
    }
    try {
      await api.post('/api/auth/reset-password', { token, newPassword: newPass });
      setSuccess(a.resetSuccess);
      setTimeout(() => navigate('/auth'), 1600);
    } catch (err) {
      setError(err.response?.data?.message || a.resetInvalid);
    } finally {
      setLoading(false);
    }
  };

  return (
    <section dir={t.dir} className="relative w-full min-h-[80vh] bg-[#fafbfc] flex items-center justify-center overflow-hidden font-sans px-6 py-16">
      <div className="absolute inset-0 z-0 opacity-30" style={{ backgroundImage: 'radial-gradient(#cbd5e1 1px, transparent 1px)', backgroundSize: '32px 32px' }}></div>

      <div className="relative z-10 w-full max-w-md">
        <div className="bg-white/80 backdrop-blur-xl border border-gray-200 rounded-[2.5rem] p-8 md:p-10 shadow-[0_40px_80px_rgba(0,0,0,0.06)]">
          <div className="flex items-center justify-center mb-6">
            <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 text-white rounded-2xl flex items-center justify-center shadow-lg">
              {isReset ? <KeyRound className="w-7 h-7" /> : <Mail className="w-7 h-7" />}
            </div>
          </div>

          <h2 className="text-3xl font-black tracking-tight text-gray-900 mb-1 text-center">
            {isReset ? a.resetPageTitle : a.forgotPageTitle}
          </h2>
          <p className="text-gray-500 font-medium text-sm mb-7 text-center">
            {isReset ? a.resetPageSub : a.forgotPageSub}
          </p>

          {error && (
            <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" /> {error}
            </div>
          )}
          {success && (
            <div className="mb-4 p-3 bg-green-50 text-green-700 rounded-xl text-sm font-medium flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 shrink-0" /> {success}
            </div>
          )}

          {isReset ? (
            <form onSubmit={handleReset} className="flex flex-col gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <LockIcon className="w-4 h-4 text-gray-400" /> {a.newPassword}
                </label>
                <input type="password" value={newPass} onChange={(e) => setNewPass(e.target.value)} placeholder="••••••••" className={inputClass} required minLength={6} />
              </div>
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <LockIcon className="w-4 h-4 text-gray-400" /> {a.confirmNewPassword}
                </label>
                <input type="password" value={confirmPass} onChange={(e) => setConfirmPass(e.target.value)} placeholder="••••••••" className={inputClass} required minLength={6} />
              </div>
              <button type="submit" disabled={loading} className="mt-2 w-full py-4 bg-blue-600 text-white rounded-2xl font-bold text-sm hover:bg-blue-500 transition-all shadow-[0_10px_25px_rgba(37,99,235,0.25)] disabled:opacity-70 flex justify-center items-center">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : a.updatePassword}
              </button>
            </form>
          ) : (
            <form onSubmit={handleRequestLink} className="flex flex-col gap-4">
              <div>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  <Mail className="w-4 h-4 text-gray-400" /> {a.email}
                </label>
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="you@example.com" className={inputClass} required />
              </div>
              <button type="submit" disabled={loading} className="mt-2 w-full py-4 bg-[#1e2022] text-white rounded-2xl font-bold text-sm hover:bg-black transition-all shadow-[0_10px_25px_rgba(0,0,0,0.15)] disabled:opacity-70 flex justify-center items-center">
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : a.sendResetLink}
              </button>
            </form>
          )}

          <div className="mt-6 text-center">
            <Link to="/auth" className="inline-flex items-center gap-1 text-sm font-bold text-blue-600 hover:text-blue-500">
              <RefreshCw className="w-4 h-4" /> {a.goToLogin}
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}