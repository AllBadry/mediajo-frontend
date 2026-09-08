import React, { useEffect, useRef, useState } from 'react';
import { X, Link2, Mail, User, FileText, AlertCircle, Check } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../context/LanguageContext';

const typeIcons = {
  url: <Link2 className="w-4 h-4" />,
  email: <Mail className="w-4 h-4" />,
  username: <User className="w-4 h-4" />,
  text: <FileText className="w-4 h-4" />,
  textarea: <FileText className="w-4 h-4" />,
};

// نافذة منبثقة لجمع مدخلات المنتج (مثل رابط الحساب للنمو أو الإيميل للاشتراكات)
export default function PackageInputModal({ open, product, onConfirm, onClose }) {
  const container = useRef();
  const { t } = useLanguage();
  const pp = t.platformPage;

  const requirements = product?.inputRequirements || [];
  const [values, setValues] = useState({});
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (open && product) {
      const initial = {};
      requirements.forEach((req) => {
        initial[req.name] = product._pendingInputs?.[req.name] || '';
      });
      setValues(initial);
      setErrors({});
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [open, product]);

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

  useGSAP(() => {
    if (open) {
      gsap.fromTo(".pkg-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(".pkg-card",
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
      );
    }
  }, { scope: container, dependencies: [open] });

  if (!open || !product) return null;

  const label = t.dir === 'rtl' ? product.nameAr : product.name;

  // العنوان/نص الحقل مترجم حسب اللغة (من قاعدة الترجمة) مع الرجوع لليبل المخزن بالـ DB
  const reqLabel = (req) => pp.inputFields?.[req.name] || req.label;
  const reqPlaceholder = (req) =>
    pp.inputPlaceholders?.[req.name] ||
    (req.type === 'email' ? 'you@example.com' : req.type === 'url' ? 'https://...' : req.placeholder);

  const validate = () => {
    const nextErrors = {};
    requirements.forEach((req) => {
      const raw = String(values[req.name] || '').trim();
      if (req.required !== false && !raw) {
        nextErrors[req.name] = pp.required || 'Required';
        return;
      }
      if (raw && req.type === 'url' && !/^https?:\/\/.+/i.test(raw)) {
        nextErrors[req.name] = pp.urlInvalid || 'Please enter a valid link (http:// or https://)';
      }
      if (raw && req.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(raw)) {
        nextErrors[req.name] = pp.emailInvalid || 'Please enter a valid email';
      }
    });
    setErrors(nextErrors);
    return Object.keys(nextErrors).length === 0;
  };

  const handleConfirm = () => {
    if (!validate()) return;
    const cleaned = {};
    requirements.forEach((req) => {
      cleaned[req.name] = String(values[req.name] || '').trim();
    });
    onConfirm(cleaned);
    onClose();
  };

  const setField = (name, value) => {
    setValues((v) => ({ ...v, [name]: value }));
    setErrors((e) => {
      if (!e[name]) return e;
      const next = { ...e };
      delete next[name];
      return next;
    });
  };

  return (
    <div ref={container}>
      <div dir={t.dir} className="pkg-backdrop fixed inset-0 z-[105] bg-black/60 backdrop-blur-sm flex items-start justify-center p-4 overflow-y-auto" onClick={onClose}>
        <div
          className="pkg-card relative w-full max-w-md bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_60px_120px_rgba(0,0,0,0.35)] m-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            onClick={onClose}
            className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors"
          >
            <X className="w-5 h-5" />
          </button>

          <div className="w-14 h-14 bg-gradient-to-br from-violet-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
            <FileText className="w-7 h-7" />
          </div>

          <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mb-1">{pp.inputTitle}</h2>
          <p className="text-gray-500 font-medium text-sm mb-2">{label}</p>
          <p className="text-gray-500 font-medium text-sm mb-6">{pp.inputSub}</p>

          <form
            className="flex flex-col gap-5"
            onSubmit={(e) => { e.preventDefault(); handleConfirm(); }}
          >
            {requirements.map((req) => (
              <div key={req.name}>
                <label className="flex items-center gap-2 text-sm font-bold text-gray-700 mb-2">
                  {typeIcons[req.type] || <FileText className="w-4 h-4 text-gray-400" />}
                  {reqLabel(req)}
                  {req.required !== false && (
                    <span className="text-xs font-bold text-red-500">*</span>
                  )}
                </label>
                {req.type === 'textarea' ? (
                  <textarea
                    rows={3}
                    value={values[req.name] || ''}
                    onChange={(e) => setField(req.name, e.target.value)}
                    placeholder={reqPlaceholder(req)}
                    className={`w-full py-3 px-4 bg-gray-50 border rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all ${errors[req.name] ? 'border-red-300' : 'border-gray-200'}`}
                  />
                ) : (
                  <input
                    type={req.type === 'email' ? 'email' : 'text'}
                    dir="ltr"
                    value={values[req.name] || ''}
                    onChange={(e) => setField(req.name, e.target.value)}
                    placeholder={reqPlaceholder(req)}
                    className={`w-full py-3 px-4 bg-gray-50 border rounded-xl text-sm font-medium text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-violet-500/40 focus:border-violet-500 transition-all ${errors[req.name] ? 'border-red-300' : 'border-gray-200'}`}
                  />
                )}
                {errors[req.name] && (
                  <div className="mt-1.5 flex items-center gap-1.5 text-xs font-medium text-red-500">
                    <AlertCircle className="w-3.5 h-3.5" /> {errors[req.name]}
                  </div>
                )}
              </div>
            ))}

            <button
              type="submit"
              className="mt-2 w-full py-4 bg-[#1e2022] text-white rounded-xl font-bold text-sm hover:bg-black transition-all shadow-[0_10px_25px_rgba(0,0,0,0.15)] flex items-center justify-center gap-2"
            >
              <Check className="w-5 h-5" />
              {pp.confirm}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}