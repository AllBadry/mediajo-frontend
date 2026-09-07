import React, { useRef, useState } from 'react';
import { useEffect } from 'react';
import { ShoppingBag, CheckCircle2, Clock, Search, Filter, XCircle, ExternalLink, Package, Upload, X, Loader2, Banknote, Mail } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import api from '../../api/client';

// ==========================================
// طلباتي الحقيقية: تتبع الطلب + رفع إيصال الدفع
// ==========================================
const API_BASE = 'https://api.mediajo.org';

const paymentStatusKeys = {
  unpaid: 'awaitingPayment',
  pending_review: 'awaitingReview',
  paid: 'paid',
  rejected: 'rejected',
  refunded: 'refunded',
};

const orderStatusKeys = {
  pending_payment: 'awaitingPayment',
  processing: 'processing',
  completed: 'completed',
  cancelled: 'cancelled',
};

const orderTypeKeys = {
  SOCIAL_GROWTH: 'growth',
  SUBSCRIPTION: 'subscription',
  MIXED: 'mixed',
};

// تسمية مقروءة لمدخل العميل حسب الحقل
const inputLabel = (key, ar) => {
  const map = ar
    ? { targetLink: 'الرابط', accountEmail: 'الإيميل', email: 'الإيميل', link: 'الرابط', username: 'المعرف', usernameTarget: 'المعرف' }
    : { targetLink: 'Link', accountEmail: 'Email', email: 'Email', link: 'Link', username: 'Username', usernameTarget: 'Username' };
  return map[key] || key;
};

// دالة لعرض القيمة (رابط قابل للنقر أو نص)
const InputValue = ({ k, v, ar }) =>
  /^https?:\/\//i.test(String(v)) ? (
    <a href={v} target="_blank" rel="noreferrer" className="text-blue-600 underline break-all text-xs font-medium">{inputLabel(k, ar)}: {v}</a>
  ) : (
    <span className="text-gray-700 break-all text-xs font-medium">{inputLabel(k, ar)}: {v}</span>
  );

export default function MyOrders() {
  const container = useRef();
  const { t } = useLanguage();
  const { user } = useAuth();
  const d = t.dashboard;
  const o = d.orders;
  const ar = t.dir === 'rtl';

  const [orders, setOrders] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [filter, setFilter] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const [payingOrder, setPayingOrder] = useState(null); // الطلب الجاري دفعه (نافذة رفع الإيصال)
  const [detailOrder, setDetailOrder] = useState(null); // نافذة تفاصيل الطلب

  // بيانات نافذة رفع الإيصال
  const [receiptFile, setReceiptFile] = useState(null);
  const [receiptName, setReceiptName] = useState(user?.name || '');
  const [receiptEmail, setReceiptEmail] = useState(user?.email || '');
  const [uploading, setUploading] = useState(false);
  const [uploadMsg, setUploadMsg] = useState('');

  const fetchOrders = async () => {
    try {
      setIsLoading(true);
      const { data } = await api.get('/api/orders/my-orders');
      setOrders(data?.data?.orders || []);
      setError('');
    } catch {
      setError(ar ? 'تعذر جلب طلباتك' : 'Failed to load your orders');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchOrders();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const payLabel = (status) => (paymentStatusKeys[status] ? o[paymentStatusKeys[status]] : status);
  const stLabel = (status) => {
    if (!orderStatusKeys[status]) return status;
    return o[orderStatusKeys[status]] || d.status[orderStatusKeys[status]] || status;
  };
  const typeLabel = (type) => (orderTypeKeys[type] ? o[orderTypeKeys[type]] : type);

  // شارة نوع الطلب
  const typeBadge = (order) => {
    const base = 'px-2 py-0.5 rounded-full text-[10px] font-bold uppercase tracking-widest';
    if (order.orderType === 'SUBSCRIPTION') return <span className={`${base} bg-purple-100 text-purple-700`}>S</span>;
    if (order.orderType === 'SOCIAL_GROWTH') return <span className={`${base} bg-blue-100 text-blue-700`}>G</span>;
    return <span className={`${base} bg-amber-100 text-amber-700`}>M</span>;
  };

  // شارة حالة الدفع
  const payBadge = (order) => {
    switch (order.paymentStatus) {
      case 'paid': return <span className="flex items-center gap-1 text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-1 rounded-full text-[10px] font-bold"><CheckCircle2 className="w-3 h-3" /> {payLabel('paid')}</span>;
      case 'pending_review': return <span className="flex items-center gap-1 text-yellow-700 bg-yellow-50 border border-yellow-100 px-2 py-1 rounded-full text-[10px] font-bold"><Clock className="w-3 h-3" /> {payLabel('pending_review')}</span>;
      case 'rejected': return <span className="flex items-center gap-1 text-red-700 bg-red-50 border border-red-100 px-2 py-1 rounded-full text-[10px] font-bold"><XCircle className="w-3 h-3" /> {payLabel('rejected')}</span>;
      case 'refunded': return <span className="flex items-center gap-1 text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded-full text-[10px] font-bold">{payLabel('refunded')}</span>;
      default: return <span className="flex items-center gap-1 text-gray-700 bg-gray-100 border border-gray-200 px-2 py-1 rounded-full text-[10px] font-bold">{payLabel('unpaid')}</span>;
    }
  };

  // مرشحات حسب حالة الدفع والتنفيذ
  const filters = [
    { key: 'All', label: d.all },
    { key: 'unpaid', label: o.awaitingPayment },
    { key: 'pending_review', label: o.awaitingReview },
    { key: 'paid', label: o.paid },
    { key: 'processing', label: d.status.processing },
    { key: 'completed', label: d.status.completed },
    { key: 'rejected', label: o.rejected },
  ];

  const filtered = orders
    .filter((order) => {
      if (filter === 'unpaid') return order.paymentStatus === 'unpaid';
      if (filter === 'pending_review') return order.paymentStatus === 'pending_review';
      if (filter === 'paid') return order.paymentStatus === 'paid';
      if (filter === 'processing') return order.status === 'processing';
      if (filter === 'completed') return order.status === 'completed';
      if (filter === 'rejected') return order.paymentStatus === 'rejected';
      return true;
    })
    .filter((order) => {
      if (!searchTerm.trim()) return true;
      const q = searchTerm.toLowerCase();
      return (
        order.orderNumber?.toLowerCase().includes(q) ||
        order.targetLink?.toLowerCase().includes(q) ||
        order.items?.some((i) => i.name?.toLowerCase().includes(q)) ||
        Object.values(order.items?.[0]?.dynamicInputs || {}).some((v) => String(v).toLowerCase().includes(q))
      );
    });

  useGSAP(() => {
    gsap.fromTo(".order-item", { y: 20, opacity: 0 }, { y: 0, opacity: 1, duration: 0.5, stagger: 0.1, ease: 'power2.out' });
  }, { scope: container, dependencies: [filter, orders] });

  const fmtDate = (iso) =>
    new Date(iso).toLocaleDateString(ar ? 'ar-JO' : 'en-GB', { year: 'numeric', month: 'short', day: 'numeric' });

  const fullReceiptUrl = (path) => (path ? (path.startsWith('http') ? path : `${API_BASE}${path}`) : '');

  // فتح نافذة رفع الإيصال
  const openPay = (order) => {
    setPayingOrder(order);
    setReceiptName(user?.name || '');
    setReceiptEmail(user?.email || '');
    setReceiptFile(null);
    setUploadMsg('');
  };

  // رفع الإيصال
  const handleUpload = async (e) => {
    e.preventDefault();
    if (!payingOrder) return;
    if (!receiptFile) {
      setUploadMsg(ar ? 'اختر صورة الإيصال أولاً' : 'Please choose the receipt image first');
      return;
    }
    setUploading(true);
    setUploadMsg('');
    try {
      const form = new FormData();
      form.append('receipt', receiptFile);
      if (receiptName.trim()) form.append('name', receiptName.trim());
      if (receiptEmail.trim()) form.append('email', receiptEmail.trim());
      await api.post(`/api/orders/${payingOrder._id}/receipt`, form);
      setUploadMsg(o.uploadSuccess);
      setPayingOrder(null);
      fetchOrders();
    } catch {
      setUploadMsg(o.uploadError);
    } finally {
      setUploading(false);
    }
  };

  return (
    <div ref={container} className="w-full flex flex-col gap-6">

      {/* ===== Header ===== */}
      <div className="bg-white border border-gray-200 rounded-[2rem] p-6 md:p-8">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-8">
          <div>
            <h2 className="text-2xl font-black text-gray-900 tracking-tight flex items-center gap-3">
              <div className="w-10 h-10 bg-gray-100 text-gray-900 rounded-xl flex items-center justify-center">
                <ShoppingBag className="w-5 h-5" />
              </div>
              {o.title}
            </h2>
            <p className="text-gray-500 font-medium mt-2">{o.subtitle}</p>
          </div>

          <div className="flex items-center gap-3 w-full md:w-auto">
            <div className="relative flex-1 md:w-64">
              <Search className="w-4 h-4 text-gray-400 absolute left-4 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder={d.searchOrders}
                className="w-full bg-gray-50 border border-gray-200 rounded-full py-2.5 pl-10 pr-4 text-sm font-medium text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500/40 focus:border-blue-500 transition-all"
                dir={t.dir}
              />
            </div>
            <button className="w-10 h-10 bg-gray-50 border border-gray-200 rounded-full flex items-center justify-center text-gray-600 hover:bg-gray-100 transition-colors shrink-0">
              <Filter className="w-4 h-4" />
            </button>
          </div>
        </div>

        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-hide">
          {filters.map((f) => (
            <button
              key={f.key}
              onClick={() => setFilter(f.key)}
              className={`px-5 py-2 rounded-full text-sm font-bold whitespace-nowrap transition-all ${
                filter === f.key ? 'bg-gray-900 text-white shadow-md' : 'bg-white border border-gray-200 text-gray-600 hover:bg-gray-50'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>
      </div>

      {/* ===== Error ===== */}
      {error && <div className="bg-red-50 text-red-600 p-4 rounded-2xl text-sm font-medium">{error}</div>}

      {/* ===== Loading ===== */}
      {isLoading ? (
        <div className="flex justify-center py-16">
          <Loader2 className="w-8 h-8 animate-spin text-gray-400" />
        </div>
      ) : filtered.length > 0 ? (
        /* ===== Orders List ===== */
        <div className="flex flex-col gap-4">
          {filtered.map((order) => {
            const canPay = order.paymentStatus === 'unpaid' || order.paymentStatus === 'rejected';
            return (
              <div key={order._id} className="order-item bg-white border border-gray-200 rounded-[1.5rem] p-6 hover:shadow-[0_8px_30px_rgba(0,0,0,0.04)] hover:border-gray-300 transition-all duration-300">
                {/* Top: number + badges */}
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="flex items-center gap-3 flex-wrap">
                    <span className="text-xs font-bold text-gray-400 bg-gray-100 px-2 py-0.5 rounded-md font-mono">{order.orderNumber}</span>
                    {typeBadge(order)}
                    {payBadge(order)}
                    {order.status === 'processing' && (
                      <span className="flex items-center gap-1 text-blue-700 bg-blue-50 border border-blue-100 px-2 py-1 rounded-full text-[10px] font-bold">
                        <Clock className="w-3 h-3" /> {stLabel('processing')}
                      </span>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 font-medium shrink-0">{d.placedOn} {fmtDate(order.createdAt)}</span>
                </div>

                {/* Items */}
                <div className="space-y-1.5 mb-4">
                  {order.items?.map((item, idx) => (
                    <div key={idx} className="flex items-start justify-between gap-3 py-1.5 border-b border-gray-50 last:border-0">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 flex-wrap">
                          <span className="font-bold text-gray-900 text-sm">{item.name}</span>
                          <span className="text-xs text-gray-500 font-medium">×{item.quantity ?? 1}</span>
                        </div>
                        {item.dynamicInputs && Object.keys(item.dynamicInputs).length > 0 && (
                          <div className="flex flex-col gap-0.5 mt-1">
                            {Object.entries(item.dynamicInputs)
                              .filter(([, v]) => (v || '').trim())
                              .map(([k, v]) => (
                                <InputValue key={k} k={k} v={v} ar={ar} />
                              ))}
                          </div>
                        )}
                      </div>
                      <span className="font-bold text-gray-900 text-sm shrink-0">{(item.price || 0).toFixed(2)} JOD</span>
                    </div>
                  ))}
                </div>

                {/* Total + Actions */}
                <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pt-4 border-t border-gray-100">
                  <div className="text-xl font-black text-gray-900">
                    {d.total} <span className="text-gray-400 text-sm font-bold">—</span> {order.totalPrice?.toFixed(2)} <span className="text-sm text-gray-400">JOD</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <button
                      onClick={() => setDetailOrder(order)}
                      className="flex items-center gap-2 text-sm font-bold text-gray-600 hover:text-gray-900 bg-gray-50 hover:bg-gray-100 px-4 py-2 rounded-xl transition-colors"
                    >
                      {d.viewDetails} <ExternalLink className="w-4 h-4 rtl:rotate-180" />
                    </button>
                    {canPay && (
                      <button
                        onClick={() => openPay(order)}
                        className="flex items-center gap-2 text-sm font-bold text-emerald-700 bg-emerald-50 hover:bg-emerald-100 px-5 py-2 rounded-xl transition-colors"
                      >
                        <Banknote className="w-4 h-4" /> {o.payNow}
                      </button>
                    )}
                    {order.paymentStatus === 'pending_review' && (
                      <button
                        onClick={() => openPay(order)}
                        className="flex items-center gap-2 text-sm font-bold text-yellow-700 bg-yellow-50 hover:bg-yellow-100 px-4 py-2 rounded-xl transition-colors"
                      >
                        <Upload className="w-4 h-4" /> {ar ? 'إعادة الرفع' : 'Re-upload'}
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      ) : (
        /* ===== Empty ===== */
        <div className="bg-white border border-gray-200 rounded-[2rem] p-12 flex flex-col items-center justify-center text-center">
          <Package className="w-16 h-16 text-gray-300 mb-4" />
          <h3 className="text-xl font-black text-gray-900 mb-2">{d.noOrdersFound}</h3>
          <p className="text-gray-500 font-medium max-w-sm">{o.subtitle}</p>
        </div>
      )}

      {/* ===== نافذة رفع الإيصال ===== */}
      {payingOrder && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => !uploading && setPayingOrder(null)}>
          <div className="bg-white rounded-[2rem] w-full max-w-md p-8 max-h-[90vh] overflow-y-auto" dir={t.dir} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-5">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center">
                  <Banknote className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-gray-900">{o.uploadReceiptTitle}</h3>
                  <p className="text-xs font-mono font-bold text-indigo-600">{payingOrder.orderNumber}</p>
                </div>
              </div>
              <button onClick={() => !uploading && setPayingOrder(null)} className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="p-3 bg-amber-50 border border-amber-100 rounded-xl text-xs text-amber-800 font-medium mb-5">
              {o.bankNote} <span className="font-black">(JOD {payingOrder.totalPrice?.toFixed(2)})</span>
            </div>

            <form onSubmit={handleUpload} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">{o.nameLabel}</label>
                <input
                  value={receiptName}
                  onChange={(e) => setReceiptName(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  dir={t.dir}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">{o.emailLabel}</label>
                <input
                  type="email"
                  value={receiptEmail}
                  onChange={(e) => setReceiptEmail(e.target.value)}
                  className="w-full bg-gray-50 border border-gray-200 rounded-xl px-4 py-2.5 text-sm font-medium focus:outline-none focus:ring-2 focus:ring-emerald-500/40"
                  dir={t.dir}
                />
              </div>
              <div>
                <label className="block text-xs font-bold text-gray-600 mb-1.5">{o.receiptLabel}</label>
                <label className="flex flex-col items-center justify-center gap-2 border-2 border-dashed border-gray-200 rounded-xl px-4 py-6 cursor-pointer hover:border-emerald-400 transition-colors bg-gray-50">
                  <Upload className="w-6 h-6 text-gray-400" />
                  <span className="text-xs font-medium text-gray-500">{receiptFile ? receiptFile.name : o.chooseFile}</span>
                  <input
                    type="file"
                    accept="image/*"
                    className="hidden"
                    onChange={(e) => setReceiptFile(e.target.files?.[0] || null)}
                  />
                </label>
              </div>

              {uploadMsg && (
                <div className={`p-3 rounded-xl text-sm font-medium ${uploadMsg === o.uploadSuccess ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-600'}`}>
                  {uploadMsg}
                </div>
              )}

              <button
                type="submit"
                disabled={uploading}
                className="w-full py-3.5 bg-emerald-600 hover:bg-emerald-500 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-sm flex items-center justify-center gap-2 transition-all"
              >
                {uploading ? <Loader2 className="w-5 h-5 animate-spin" /> : <Upload className="w-4 h-4" />} {uploading ? o.uploading : o.uploadBtn}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* ===== نافذة تفاصيل الطلب ===== */}
      {detailOrder && (
        <div className="fixed inset-0 z-[110] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm" onClick={() => setDetailOrder(null)}>
          <div className="bg-white rounded-[2rem] w-full max-w-lg p-8 max-h-[90vh] overflow-y-auto" dir={t.dir} onClick={(e) => e.stopPropagation()}>
            <div className="flex items-start justify-between mb-6">
              <div>
                <h3 className="text-xl font-black text-gray-900">{o.detailsTitle}</h3>
                <p className="text-sm font-mono font-bold text-indigo-600">{detailOrder.orderNumber}</p>
              </div>
              <button onClick={() => setDetailOrder(null)} className="w-9 h-9 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 flex items-center justify-center">
                <X className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-2 gap-3 mb-5">
              <div className="bg-gray-50 rounded-xl p-3">
                <span className="block text-xs text-gray-500 font-bold mb-1">{o.statusLabel}</span>
                <span className="font-bold text-gray-800 text-sm">{stLabel(detailOrder.status)}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <span className="block text-xs text-gray-500 font-bold mb-1">{o.paymentStatusLabel}</span>
                <span className="font-bold text-gray-800 text-sm">{payLabel(detailOrder.paymentStatus)}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <span className="block text-xs text-gray-500 font-bold mb-1">{d.placedOn}</span>
                <span className="font-bold text-gray-800 text-sm">{fmtDate(detailOrder.createdAt)}</span>
              </div>
              <div className="bg-gray-50 rounded-xl p-3">
                <span className="block text-xs text-gray-500 font-bold mb-1">{d.total}</span>
                <span className="font-bold text-gray-800 text-sm">{detailOrder.totalPrice?.toFixed(2)} JOD</span>
              </div>
            </div>

            <h4 className="font-black text-gray-900 text-sm mb-3">{ar ? 'العناصر' : 'Items'}</h4>
            <div className="space-y-2 mb-5">
              {detailOrder.items?.map((item, idx) => (
                <div key={idx} className="p-3 bg-gray-50 rounded-xl border border-gray-100">
                  <div className="flex items-center justify-between gap-2">
                    <span className="font-bold text-gray-900 text-sm">{item.name} <span className="text-xs text-gray-500 font-medium">×{item.quantity ?? 1}</span></span>
                    <span className="font-bold text-gray-900 text-sm">{(item.price || 0).toFixed(2)} JOD</span>
                  </div>
                  {item.dynamicInputs && Object.keys(item.dynamicInputs).length > 0 && (
                    <div className="mt-1 flex flex-col gap-0.5">
                      {Object.entries(item.dynamicInputs)
                        .filter(([, v]) => (v || '').trim())
                        .map(([k, v]) => (
                          <InputValue key={k} k={k} v={v} ar={ar} />
                        ))}
                    </div>
                  )}
                </div>
              ))}
            </div>

            {detailOrder.paymentProof ? (
              <div>
                <h4 className="font-black text-gray-900 text-sm mb-2">{ar ? 'إيصال التحويل المرفوع' : 'Uploaded receipt'}</h4>
                <a href={fullReceiptUrl(detailOrder.paymentProof)} target="_blank" rel="noreferrer">
                  <img src={fullReceiptUrl(detailOrder.paymentProof)} alt="receipt" className="w-full max-h-56 object-contain rounded-xl border border-gray-200 hover:opacity-90 transition-opacity" />
                </a>
              </div>
            ) : (
              <div className="p-3 bg-amber-50 text-amber-800 rounded-xl text-sm font-medium flex items-center gap-2">
                <Mail className="w-4 h-4 shrink-0" /> {ar ? 'لم يتم رفع الإيصال بعد.' : 'No receipt uploaded yet.'}
              </div>
            )}

            <button onClick={() => setDetailOrder(null)} className="mt-6 w-full py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 rounded-xl font-bold text-sm transition-colors">
              {ar ? 'إغلاق' : 'Close'}
            </button>
          </div>
        </div>
      )}
    </div>
  );
}