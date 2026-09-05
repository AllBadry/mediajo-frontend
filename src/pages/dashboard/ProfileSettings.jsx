import React, { useRef, useState } from 'react';
import { User, Mail, Phone, Lock, ShieldCheck, Save, Loader2, CheckCircle2, AlertCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useAuth } from '../../context/AuthContext';
import { useLanguage } from '../../context/LanguageContext';
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.mediajo.org',
  withCredentials: true,
});

export default function ProfileSettings() {
  const container = useRef();
  const { user, login } = useAuth();
  const { t } = useLanguage();

  // حالات تحديث البيانات الشخصية
  const [formData, setFormData] = useState({
    name: user?.name || '',
    email: user?.email || '',
    phone: user?.phone || '',
  });

  // حالات تغيير كلمة المرور
  const [passData, setPassData] = useState({
    currentPassword: '',
    newPassword: '',
  });

  const [loadingProfile, setLoadingProfile] = useState(false);
  const [loadingPass, setLoadingPass] = useState(false);
  const [profileMsg, setProfileMsg] = useState({ type: '', text: '' });
  const [passMsg, setPassMsg] = useState({ type: '', text: '' });

  useGSAP(() => {
    gsap.fromTo(".profile-card", 
      { y: 30, opacity: 0 },
      { y: 0, opacity: 1, duration: 0.6, stagger: 0.2, ease: "power3.out" }
    );
  }, { scope: container });

  const handleProfileChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setProfileMsg({ type: '', text: '' });
  };

  const handlePassChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
    setPassMsg({ type: '', text: '' });
  };

  // إرسال تحديث البيانات الشخصية
  const updateProfile = async (e) => {
    e.preventDefault();
    setLoadingProfile(true);
    setProfileMsg({ type: '', text: '' });

    try {
      const response = await api.patch('/api/auth/me', {
        name: formData.name,
        phone: formData.phone,
      });

      if (response.data.success) {
        setProfileMsg({ type: 'success', text: t.dashboard.profileUpdated });
        // تحديث الـ Context
        login(response.data.data.user);
      }
    } catch (err) {
      setProfileMsg({ type: 'error', text: err.response?.data?.message || t.dashboard.profileUpdateFailed });
    } finally {
      setLoadingProfile(false);
    }
  };

  // إرسال تغيير كلمة المرور
  const updatePassword = async (e) => {
    e.preventDefault();
    setLoadingPass(true);
    setPassMsg({ type: '', text: '' });

    try {
      const response = await api.post('/api/auth/change-password', {
        currentPassword: passData.currentPassword,
        newPassword: passData.newPassword,
      });

      if (response.data.success) {
        setPassMsg({ type: 'success', text: t.dashboard.passwordChanged });
        setPassData({ currentPassword: '', newPassword: '' });
      }
    } catch (err) {
      setPassMsg({ type: 'error', text: err.response?.data?.message || t.dashboard.passwordChangeFailed });
    } finally {
      setLoadingPass(false);
    }
  };

  const inputClass = "w-full py-3.5 px-4 bg-white border border-gray-200 rounded-2xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all";

  return (
    <div ref={container} className="w-full max-w-4xl mx-auto flex flex-col gap-8">
      
      {/* رأس الصفحة */}
      <div>
        <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
          <div className="w-10 h-10 bg-gray-900 text-white rounded-xl flex items-center justify-center">
            <User className="w-5 h-5" />
          </div>
          {t.dashboard.profileSettings}
        </h2>
        <p className="text-gray-500 font-medium mt-1">{t.dashboard.manageAccount}</p>
      </div>

      {/* بطاقة تعديل المعلومات الشخصية */}
      <div className="profile-card bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <ShieldCheck className="w-5 h-5 text-blue-600" /> {t.dashboard.personalInfo}
        </h3>

        {profileMsg.text && (
          <div className={`mb-6 p-4 rounded-2xl text-sm font-semibold flex items-center gap-2 ${profileMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {profileMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {profileMsg.text}
          </div>
        )}

        <form onSubmit={updateProfile} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <User className="w-4 h-4 text-gray-400" /> {t.dashboard.fullName}
              </label>
              <input 
                type="text" 
                name="name" 
                value={formData.name} 
                onChange={handleProfileChange} 
                className={inputClass} 
                required 
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <Mail className="w-4 h-4 text-gray-400" /> {t.dashboard.emailAddress}
              </label>
              <input 
                type="email" 
                value={formData.email} 
                disabled 
                className={`${inputClass} bg-gray-50 text-gray-400 cursor-not-allowed`} 
              />
              <span className="text-[11px] text-gray-400 mt-1 block">{t.dashboard.emailCannotChange}</span>
            </div>
          </div>

          <div>
            <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
              <Phone className="w-4 h-4 text-gray-400" /> {t.dashboard.phoneWhatsapp}
            </label>
            <input 
              type="text" 
              name="phone" 
              value={formData.phone} 
              onChange={handleProfileChange} 
              placeholder="+962 7..." 
              className={inputClass} 
            />
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loadingProfile}
              className="bg-gray-900 hover:bg-black text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex items-center gap-2 disabled:opacity-70"
            >
              {loadingProfile ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {t.dashboard.saveChanges}
            </button>
          </div>
        </form>
      </div>

      {/* بطاقة تغيير كلمة المرور */}
      <div className="profile-card bg-white border border-gray-200 rounded-[2rem] p-8 shadow-[0_4px_20px_rgba(0,0,0,0.02)]">
        <h3 className="text-xl font-black text-gray-900 mb-6 flex items-center gap-2">
          <Lock className="w-5 h-5 text-blue-600" /> {t.dashboard.securityPassword}
        </h3>

        {passMsg.text && (
          <div className={`mb-6 p-4 rounded-2xl text-sm font-semibold flex items-center gap-2 ${passMsg.type === 'success' ? 'bg-green-50 text-green-700 border border-green-100' : 'bg-red-50 text-red-600 border border-red-100'}`}>
            {passMsg.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertCircle className="w-5 h-5" />}
            {passMsg.text}
          </div>
        )}

        <form onSubmit={updatePassword} className="space-y-5">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <Lock className="w-4 h-4 text-gray-400" /> {t.dashboard.currentPassword}
              </label>
              <input 
                type="password" 
                name="currentPassword" 
                value={passData.currentPassword} 
                onChange={handlePassChange} 
                placeholder="••••••••" 
                className={inputClass} 
                required 
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                <Lock className="w-4 h-4 text-gray-400" /> {t.dashboard.newPassword}
              </label>
              <input 
                type="password" 
                name="newPassword" 
                value={passData.newPassword} 
                onChange={handlePassChange} 
                placeholder="••••••••" 
                className={inputClass} 
                required 
                minLength={6}
              />
            </div>
          </div>

          <div className="flex justify-end pt-4">
            <button 
              type="submit" 
              disabled={loadingPass}
              className="bg-blue-600 hover:bg-blue-500 text-white px-8 py-3.5 rounded-2xl font-bold text-sm transition-all shadow-[0_10px_25px_rgba(37,99,235,0.25)] flex items-center gap-2 disabled:opacity-70"
            >
              {loadingPass ? <Loader2 className="w-4 h-4 animate-spin" /> : <Save className="w-4 h-4" />}
              {t.dashboard.updatePassword}
            </button>
          </div>
        </form>
      </div>

    </div>
  );
}