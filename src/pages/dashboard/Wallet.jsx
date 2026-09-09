import React, { useEffect, useRef, useState } from 'react';
import { Wallet as WalletIcon, Coins, Loader2, Upload, X, CheckCircle2, Clock, XCircle, Banknote, MessageCircle } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';

const API_BASE = 'https://api.mediajo.org';
const MJ_PER_JOD = 10; // 1 دينار = 10 MJ
const PRESETS = [100, 250, 500, 1000, 2500, 5000];

const toJod = (mj) => mj / MJ_PER_JOD;

const statusKeys = {
  unpaid: { key: 'unpaid', icon: <Clock className="w-3.5 h-3.5" />, cls: 'bg-gray-100 text-gray-700 border-gray-200' },
  pending_review: { key: 'pendingReview', icon: <Clock className="w-3.5 h-3.5" />, cls: 'bg-yellow-50 text-yellow-800 border-yellow-100' },
  approved: { key: 'approved', icon: <CheckCircle2 className="w-3.5 h-3.5" />, cls: 'bg-emerald-50 text-emerald-700 border-emerald-100' },
  rejected: { key: 'rejected', icon: <XCircle className="w-3.5 h-3.5" />, cls: 'bg-red-50 text-red-700 border-red-100' },
};

export default function Wallet() {
  const container = useRef();
  const { t } = useLanguage();
  const { user } = useAuth();
  const d = t.dashboard;
  const w = d.wallet;
  const ar = t.dir === 'rtl';

  const [balance, setBalance] = useState(null);
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  // بيانات نموذج الشحن
  const [mjInput, setMjInput] = useState(100);
  const jodDue = toJod(Number(mjInput) || 0);

  // نافذة إرفاق الحوالة
  const [showPay, setShowPay] = useState(false);
  const [receiptFile, setReceiptFile] = useState(null);
  const [payName, setPayName] = useState('');
  const [payEmail, setPayEmail] = useState('');
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');
  const [toast, setToast] = useState('');

  const load = async () => {
    try {
      const [{ data: me }, { data: list }] = await Promise.all([
        api.get('/api/auth/me'),
        api.get('/api/charges/my-requests'),
      ]);
      setBalance(me?.data?.user?.mjBalance ?? 0);
      setRequests(list?.data?.requests || []);
    } catch {
      setBalance(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useGSAP(() => {
    gsap.fromTo(".wallet-card", { y: 24, opacity: 0 }, { y: 0, opacity: 1, duration: 0.55, stagger: 0.1, ease: 'power2.out' });
  }, { scope: container, dependencies: [balance, requests] });

  const openPay = () => {
    if (!Number.isInteger(Number(mjInput)) || Number(mjInput) < 100) {
      setUploadMsg(ar ? 'أدخل عدد عملات صحيح (الحد الأدنى 100 MJ = 10 دينار)' : 'Enter a valid MJ amount (min 100 MJ = 10 JOD)');
      return;
    }
    setShowPay(true);
    setPayName(user?.name || '');
    setPayEmail(user?.email || '');
    setReceiptFile(null);
    setUploadMsg('');
  };

  const handleUpload = async () => {
    if (!receiptFile) {
      setUploadMsg(ar ? 'اختر صورة الحوالة أولاً' : 'Please choose the transfer receipt image');
      return;
    }
    setUploading(true);
    setUploadMsg('');
    try {
      // 1) إنشاء طلب الشحن (المبلغ يُعرف فقط بعدد العملات)
      const createRes = await api.post('/api/charges', { mjAmount: Number(mjInput) });
      const charge = createRes.data?.data?.request;
      if (!charge?._id) throw new Error('no_id');

      // 2) رفع صورة الحوالة
      const form = new FormData();
      form.append('receipt', receiptFile);
      if (payName.trim()) form.append('name', payName.trim());
      if (payEmail.trim()) form.append('email', payEmail.trim());
      await api.post(`/api/charges/${charge._id}/receipt`, form);

      setShowPay(false);
      setToast(w.successMsg.replace('{mj}', charge.mjAmount));
      load();
      setTimeout(() => setToast(''), 6000);
    } catch (e) {
      setUploadMsg(e?.response?.data?.message || (ar ? 'فشل تنفيذ الشحن، حاول مرة أخرى' : 'Failed to process your top-up'));
    } finally {
      setUploading(false);
    }
  };

  const fullUrl = (p) => (p ? (p.startsWith('http') ? p : `${API_BASE}${p}`) : '');

  return (
    <div ref={container} className="w-full flex flex-col gap-6">

      {/* ===== بطاقة الرصيد ===== */}
      <div className="wallet-card bg-gray-900 rounded-lg p-8 md:p-10 relative overflow-hidden">
        <div className="absolute -top-20 -left-20 w-72 h-72 bg-gradient-to-br from-blue-500/30 to-purple-600/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="relative z-10 flex flex-col md:flex-row md:items-center justify-between gap-8">
          <div>
            <p className="text-blue-300 font-mono text-[10px] tracking-[0.2em] uppercase mb-4 flex items-center gap-2">
              <WalletIcon className="w-4 h-4" /> {w.balanceLabel}
            </p>
            <div className="flex items-end gap-3 mb-2">
              <span className="text-5xl font-black text-white tracking-tight">{loading ? '—' : (balance ?? '—')}</span>
              <span className="text-lg font-black text-blue-400 mb-1.5">MJ</span>
            </div>
            <p className="text-gray-400 text-sm font-medium">{w.rateInfo}</p>
          </div>
          <div className="flex items-center gap-2 bg-white/10 border border-white/10 rounded-md px-5 py-3 self-start">
            <MessageCircle className="w-4 h-4 text-blue-300" />
            <span className="text-sm font-bold text-white">{w.needHelp}</span>
          </div>
        </div>
      </div>

      {/* ===== نموذج الشحن ===== */}
      <div className="wallet-card bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 bg-gray-50 border border-gray-100 text-gray-500 rounded-md flex items-center justify-center">
            <Coins className="w-5 h-5" />
          </div>
          <div>
            <h3 className="text-lg font-black text-gray-900">{w.topUpTitle}</h3>
            <p className="text-sm text-gray-500 font-medium">{w.topUpSub}</p>
          </div>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          {/* اختيار المبلغ */}
          <div>
            <label className="block text-xs font-bold text-gray-600 mb-2">{w.amountLabel}</label>
            <input
              type="number"
              min="100"
              step="10"
              value={mjInput}
              onChange={(e) => setMjInput(e.target.value)}
              className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-3 text-lg font-black text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500"
              dir="ltr"
            />
            <div className="flex items-center justify-between mt-2 text-sm font-medium">
              <span className="text-gray-500">{w.mjUnit}</span>
              <span className="text-indigo-600 font-bold">= {jodDue.toFixed(2)} JOD</span>
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {PRESETS.map((p) => (
                <button
                  key={p}
                  onClick={() => setMjInput(p)}
                  className={`px-4 py-2 rounded-md text-sm font-bold border transition-colors ${
                    Number(mjInput) === p
                      ? 'bg-gray-900 text-white border-gray-900'
                      : 'bg-white text-gray-600 border-gray-200 hover:border-gray-900'
                  }`}
                >
                  {p} MJ
                </button>
              ))}
            </div>

            <div className="mt-6 p-4 bg-amber-50 border border-amber-100 rounded-md text-xs text-amber-800 font-medium leading-relaxed">
              {w.bankNote}
            </div>
          </div>

          {/* ملخص + زر */}
          <div className="flex flex-col justify-between gap-6 bg-gray-50 rounded-lg p-6">
            <div className="space-y-3 text-sm font-medium">
              <div className="flex justify-between">
                <span className="text-gray-500">{w.youGet}</span>
                <span className="font-black text-gray-900">{Number(mjInput) || 0} MJ</span>
              </div>
              <div className="flex justify-between">
                <span className="text-gray-500">{w.transferAmount}</span>
                <span className="font-black text-gray-900">{jodDue.toFixed(2)} JOD</span>
              </div>
              <div className="flex justify-between border-t border-dashed border-gray-200 pt-3">
                <span className="text-gray-500">{w.rate}</span>
                <span className="font-black text-indigo-600">1 JOD = {MJ_PER_JOD} MJ</span>
              </div>
            </div>
            <button
              onClick={openPay}
              className="w-full py-4 bg-blue-600 hover:bg-blue-500 text-white rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-[0_10px_25px_rgba(37,99,235,0.3)]"
            >
              <Upload className="w-4 h-4" /> {w.attachReceipt}
            </button>
          </div>
        </div>
      </div>

      {/* رسالة نجاح */}
      {toast && (
        <div className="wallet-card p-4 bg-emerald-50 border border-emerald-100 text-emerald-700 rounded-lg text-sm font-bold flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {toast}
        </div>
      )}

      {/* ===== سجل طلبات الشحن ===== */}
      <div className="wallet-card bg-white border border-gray-200 rounded-lg p-6 md:p-8 shadow-sm">
        <h3 className="text-lg font-black text-gray-900 mb-5">{w.historyTitle}</h3>

        {requests.length === 0 ? (
          <div className="text-center py-10 text-gray-400 font-medium text-sm">{w.noRequests}</div>
        ) : (
          <div className="flex flex-col gap-3">
            {requests.map((r) => {
              const cfg = statusKeys[r.paymentStatus] || statusKeys.unpaid;
              return (
                <div key={r._id} className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-white border border-gray-200 flex items-center justify-center">
                      <Banknote className="w-5 h-5 text-gray-400" />
                    </div>
                    <div>
                      <div className="flex items-center gap-2">
                        <span className="font-mono font-bold text-indigo-600 text-sm">{r.chargeNumber}</span>
                        <span className={`flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold border ${cfg.cls}`}>
                          {cfg.icon} {w[cfg.key]}
                        </span>
                      </div>
                      <p className="text-sm font-bold text-gray-900 mt-0.5">
                        {r.mjAmount} MJ <span className="text-gray-400 font-medium">· {r.jodAmount.toFixed(2)} JOD</span>
                      </p>
                      <span className="text-xs text-gray-400 font-medium">
                        {new Date(r.createdAt).toLocaleDateString(ar ? 'ar-JO' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' })}
                      </span>
                    </div>
                  </div>
                  {r.paymentProof && r.paymentStatus !== 'rejected' && (
                    <a
                      href={fullUrl(r.paymentProof)}
                      target="_blank"
                      rel="noreferrer"
                      className="text-xs font-bold text-blue-600 hover:text-blue-500 shrink-0"
                    >
                      {r.paymentProof.split('/').pop()}
                    </a>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* ===== نافذة إرفاق الحوالة ===== */}
      {showPay && (
        <div className="fixed inset-0 z-[110] flex items-start justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto" onClick={() => !uploading && setShowPay(false)}>
          <div className="bg-white rounded-lg w-full max-w-md p-8 m-auto" dir={t.dir} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div>
                <h3 className="text-xl font-black text-gray-900">{w.payTitle}</h3>
                <p className="text-sm text-gray-500 font-medium mt-1">{w.paySub}</p>
              </div>
              <button onClick={() => !uploading && setShowPay(false)} className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-100 rounded-md text-xs text-amber-800 font-medium mb-5">
              {Number(mjInput) || 0} MJ ← <b>{jodDue.toFixed(2)} JOD</b> — {w.bankNote}
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">{w.nameLabel}</label>
                <input
                  value={payName}
                  onChange={(e) => setPayName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  dir={t.dir}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">{w.emailLabel}</label>
                <input
                  type="email"
                  value={payEmail}
                  onChange={(e) => setPayEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-md px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-blue-500/40"
                  dir={t.dir}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">{w.receiptLabel}</label>
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-md px-4 py-6 cursor-pointer hover:border-blue-400 transition-colors bg-gray-50">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-xs font-medium text-gray-500">{receiptFile ? receiptFile.name : w.chooseFile}</span>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    className="hidden"
                    onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              {uploadMsg && (
                <div className="p-3 bg-red-50 text-red-600 rounded-md text-sm font-medium">{uploadMsg}</div>
              )}

              <button
                onClick={handleUpload}
                disabled={uploading}
                className="w-full py-3.5 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-md font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-4 h-4" />} {uploading ? w.uploading : w.sendBtn}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}