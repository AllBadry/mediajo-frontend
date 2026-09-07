import React, { useEffect, useRef, useState } from 'react';
import { X, Loader2, ShoppingBag, CheckCircle2, AlertCircle, ShieldCheck, ArrowRight, Mail, Pencil, Wallet, Landmark } from 'lucide-react';
import gsap from 'gsap';
import { useGSAP } from '@gsap/react';
import { useLanguage } from '../../context/LanguageContext';
import { useAuth } from '../../context/AuthContext';
import { useCartStore, selectSubtotal, selectItemCount, SERVICE_FEE } from '../../store/cartStore';
import api from '../../api/client';
import PackageInputModal from './PackageInputModal';

// نافذة تأكيد إتمام الطلب (تُرسل الطلب للباك إند ويصل للأدمن)
export default function CheckoutModal({ open, onClose }) {
  const container = useRef();
  const { t } = useLanguage();
  const { user } = useAuth();
  const d = t.dashboard;

  const items = useCartStore((s) => s.items);
  const clearCart = useCartStore((s) => s.clearCart);
  const updateItemDynamicInputs = useCartStore((s) => s.updateItemDynamicInputs);
  const subtotal = useCartStore(selectSubtotal);
  const count = useCartStore(selectItemCount);

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [createdOrder, setCreatedOrder] = useState(null);

  // طريقة الدفع: حوالة بنكية (افتراضي) أو رصيد عملات MJ
  const [payMethod, setPayMethod] = useState('bank');
  const [mjBalance, setMjBalance] = useState(null);

  // فهرس المنتجات الحية من الباك إند (للتأكد من المدخلات المطلوبة محلياً قبل الإرسال)
  const [productsIndex, setProductsIndex] = useState({});
  const [missingInput, setMissingInput] = useState(null); // { item, product } بانتظار تعبئة المدخلات

  const fees = subtotal > 0 ? SERVICE_FEE : 0;
  const total = subtotal + fees;
  // ما يعادله بالعملات MJ (1 دينار = 10 MJ)
  const mjNeeded = Math.round(total * 10);
  const hasMjBalance = mjBalance != null;
  const canPayMj = hasMjBalance && mjBalance >= mjNeeded && mjNeeded > 0;

  useEffect(() => {
    const onKey = (e) => {
      if (e.key === 'Escape' && !loading) onClose();
    };
    if (open) {
      window.addEventListener('keydown', onKey);
      document.body.style.overflow = 'hidden';
      setError('');
      setCreatedOrder(null);
      setPayMethod('bank');
      // جلب المنتجات مرة واحدة لمعرفة المتطلبات الفعلية لكل منتج
      api
        .get('/api/products')
        .then(({ data }) => {
          const index = {};
          (data?.data?.products || []).forEach((p) => { index[p._id] = p; });
          setProductsIndex(index);
        })
        .catch(() => {});
      // جلب رصيد عملات MJ عند تسجيل الدخول لعرض خيار الدفع بالرصيد
      if (user) {
        api
          .get('/api/auth/me')
          .then(({ data }) => setMjBalance(data?.data?.user?.mjBalance ?? 0))
          .catch(() => {});
      } else {
        setMjBalance(null);
      }
    }
    return () => {
      window.removeEventListener('keydown', onKey);
      document.body.style.overflow = '';
    };
  }, [open, onClose, loading, user]);

  useGSAP(() => {
    if (open) {
      gsap.fromTo(".co-backdrop", { opacity: 0 }, { opacity: 1, duration: 0.25 });
      gsap.fromTo(".co-card",
        { y: 40, opacity: 0, scale: 0.95 },
        { y: 0, opacity: 1, scale: 1, duration: 0.4, ease: "back.out(1.4)" }
      );
    }
  }, { scope: container, dependencies: [open] });

  if (!open) return null;

  const label = (item) => (t.dir === 'rtl' ? item.nameAr : item.name);

  // أول مدخل مطلوب ناقص في بند معين (وقيمته فارغة)
  const firstMissingReq = (item) => {
    const product = productsIndex[item.id];
    if (!product) return null;
    for (const req of product.inputRequirements || []) {
      if (req.required === false) continue;
      const value = item.dynamicInputs?.[req.name];
      if (!value || !String(value).trim()) return req;
    }
    return null;
  };

  const targetLink =
    items
      .map((i) => i.dynamicInputs?.targetLink)
      .find((v) => typeof v === 'string' && v.trim()) || '';

  const handleConfirm = async () => {
    setError('');
    // تحقق محلي قبل الإرسال: أي بند مدخلاته الإلزامية ناقصة → فتح نافذة التعبئة
    for (const item of items) {
      const product = productsIndex[item.id];
      if (!product) continue;
      const missingReq = firstMissingReq(item);
      if (missingReq) {
        setMissingInput({ item, product });
        return;
      }
    }

    setLoading(true);
    try {
      const { data } = await api.post('/api/orders', {
        items: items.map((i) => ({
          productId: i.id,
          quantity: parseInt(i.productQty, 10) || 1,
          dynamicInputs: i.dynamicInputs || {},
        })),
        targetLink,
        customerEmail: user?.email || '',
        paymentMethod: payMethod === 'mj' ? 'mj' : 'union_bank',
      });
      if (data?.status === 'success') {
        setCreatedOrder(data.data.order);
        clearCart();
      } else {
        setError(data?.message || (t.dir === 'rtl' ? 'فشل إنشاء الطلب' : 'Failed to create order'));
      }
    } catch (err) {
      setError(err.response?.data?.message || (t.dir === 'rtl' ? 'حدث خطأ أثناء إنشاء الطلب' : 'Something went wrong'));
    } finally {
      setLoading(false);
    }
  };

  const missingProduct = missingInput
    ? {
        _id: missingInput.item.id,
        name: missingInput.item.name,
        nameAr: missingInput.item.nameAr,
        inputRequirements: missingInput.product.inputRequirements || [],
        _pendingInputs: missingInput.item.dynamicInputs || {},
      }
    : null;

  return (
    <div ref={container}>
      <div dir={t.dir} className="co-backdrop fixed inset-0 z-[110] bg-black/60 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => !loading && onClose()}>
        <div
          className="co-card relative w-full max-w-md bg-white rounded-[2rem] p-8 md:p-10 shadow-[0_60px_120px_rgba(0,0,0,0.35)] max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          {!loading && !createdOrder && (
            <button
              onClick={onClose}
              className="absolute top-4 right-4 rtl:right-auto rtl:left-4 w-10 h-10 rounded-full bg-gray-50 hover:bg-gray-100 text-gray-500 hover:text-gray-900 flex items-center justify-center transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          )}

          {/* ====== حالة النجاح ====== */}
          {createdOrder ? (
            <div className="flex flex-col items-center text-center">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mb-6">
                <CheckCircle2 className="w-12 h-12" />
              </div>
              <h2 className="text-2xl font-black tracking-tight text-gray-900 mb-2">{d.orderSuccessTitle}</h2>
              <div className="bg-gray-50 border border-gray-100 rounded-xl px-5 py-3 mb-4">
                <p className="text-xs text-gray-500 font-bold mb-1">{d.orderNumber}</p>
                <p className="font-mono font-black text-indigo-600 text-lg">{createdOrder.orderNumber || createdOrder._id}</p>
              </div>
              <p className="text-gray-500 font-medium text-sm leading-relaxed mb-6">
                {t.dir === 'rtl' ? d.orderSuccessSubAr : d.orderSuccessSub}
              </p>
              <button
                onClick={onClose}
                className="w-full py-4 bg-[#1e2022] text-white rounded-xl font-bold text-sm hover:bg-black transition-all flex items-center justify-center gap-2"
              >
                {d.done} <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          ) : (
            /* ====== شاشة التأكيد ====== */
            <>
              <div className="w-14 h-14 bg-gradient-to-br from-blue-600 to-indigo-600 rounded-2xl flex items-center justify-center text-white shadow-lg mb-6">
                <ShoppingBag className="w-7 h-7" />
              </div>

              <h2 className="text-2xl md:text-3xl font-black tracking-tight text-gray-900 mb-1">{d.confirmOrder}</h2>
              <p className="text-gray-500 font-medium text-sm mb-6">{d.confirmOrderSub}</p>

              <div className="max-h-44 overflow-y-auto space-y-2.5 mb-5">
                {items.map((item) => {
                  const hasInputs = item.dynamicInputs && Object.keys(item.dynamicInputs).filter((k) => (item.dynamicInputs[k] || '').trim()).length > 0;
                  const missingReq = firstMissingReq(item);
                  return (
                    <div key={item.id} className="flex items-start justify-between gap-3 p-3 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="text-sm">
                        <span className="font-bold text-gray-900 block leading-tight">{label(item)}</span>
                        <span className="text-xs text-gray-500 font-medium">{item.unit} × {item.productQty}</span>
                        {missingReq ? (
                          <span className="flex items-center gap-1 text-[11px] text-amber-600 font-semibold mt-1">
                            <AlertCircle className="w-3 h-3" />
                            {missingReq.label}
                          </span>
                        ) : hasInputs ? (
                          <span className="flex items-center gap-1 text-[11px] text-indigo-600 font-medium mt-1">
                            <Mail className="w-3 h-3" />
                            {Object.entries(item.dynamicInputs)
                              .filter(([, v]) => (v || '').trim())
                              .map(([, v]) => v)
                              .join(' • ')}
                          </span>
                        ) : null}
                        {missingReq && (
                          <button
                            onClick={() => setMissingInput({ item, product: productsIndex[item.id] })}
                            className="flex items-center gap-1 text-[11px] text-blue-600 font-bold hover:text-blue-500 mt-0.5"
                          >
                            <Pencil className="w-3 h-3" /> {d.fillInputs}
                          </button>
                        )}
                      </div>
                      <span className="font-bold text-gray-900 text-sm shrink-0">{(item.price * item.productQty).toFixed(2)}</span>
                    </div>
                  );
                })}
              </div>

              <div className="space-y-3 text-sm font-medium border-y border-gray-100 py-5 mb-6">
                <div className="flex justify-between text-gray-500">
                  <span>{d.subtotal} ({count})</span>
                  <span>{subtotal.toFixed(2)} JOD</span>
                </div>
                <div className="flex justify-between text-gray-500">
                  <span>{d.serviceFee}</span>
                  <span>{fees.toFixed(2)} JOD</span>
                </div>
                <div className="flex justify-between text-gray-900 font-black text-base">
                  <span>{d.total}</span>
                  <span>{total.toFixed(2)} JOD</span>
                </div>
              </div>

              {/* ===== طريقة الدفع: رصيد MJ أو حوالة يدوية ===== */}
              <div className="mb-4">
                <p className="text-xs font-bold text-gray-500 mb-2">{d.payMethod}</p>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => setPayMethod('bank')}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-colors ${
                      payMethod === 'bank'
                        ? 'bg-gray-900 text-white border-gray-900'
                        : 'border-gray-200 text-gray-600 hover:border-gray-400 bg-white'
                    }`}
                  >
                    <Landmark className="w-5 h-5" />
                    {d.payWithBank}
                  </button>
                  <button
                    type="button"
                    onClick={() => (hasMjBalance ? setPayMethod('mj') : setPayMethod('bank'))}
                    className={`flex flex-col items-center gap-1.5 p-3 rounded-xl border text-xs font-bold transition-colors ${
                      payMethod === 'mj'
                        ? 'bg-indigo-600 text-white border-indigo-600'
                        : 'border-gray-200 text-gray-600 hover:border-indigo-400 bg-white'
                    }`}
                  >
                    <Wallet className="w-5 h-5" />
                    {d.payWithMj}
                  </button>
                </div>

                {payMethod === 'mj' && (
                  <div className={`mt-2 p-3 rounded-xl text-xs font-bold flex items-center justify-between ${
                    canPayMj ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'
                  }`}>
                    <span>
                      {d.yourBalance}: {mjBalance ?? '—'} MJ · {d.mjNeeded.replace('{mj}', mjNeeded)} MJ
                    </span>
                    {!canPayMj ? (
                      <a href="/dashboard/wallet" className="underline underline-offset-2 shrink-0">{d.topUpNow}</a>
                    ) : null}
                  </div>
                )}
              </div>

              {!canPayMj && payMethod === 'mj' && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {d.mjInsufficient}
                </div>
              )}

              {error && (
                <div className="mb-4 p-3 bg-red-50 text-red-600 rounded-xl text-sm font-medium flex items-center gap-2">
                  <AlertCircle className="w-4 h-4 shrink-0" /> {error}
                </div>
              )}

              <button
                onClick={handleConfirm}
                disabled={loading || items.length === 0 || (payMethod === 'mj' && !canPayMj)}
                className="w-full py-4 bg-blue-600 hover:bg-blue-500 disabled:bg-gray-200 disabled:text-gray-400 text-white rounded-xl font-bold text-sm transition-all shadow-[0_10px_25px_rgba(37,99,235,0.3)] flex items-center justify-center gap-2"
              >
                {loading ? <Loader2 className="w-5 h-5 animate-spin" /> : <>{d.placeOrder} <ArrowRight className="w-4 h-4 rtl:rotate-180" /></>}
              </button>

              <p className="mt-4 flex items-center justify-center gap-1.5 text-xs text-gray-400 font-medium">
                <ShieldCheck className="w-4 h-4" /> {d.sslEncrypted}
              </p>
            </>
          )}
        </div>
      </div>

      {/* نافذة تعبئة المدخلات الإلزامية الناقصة قبل إتمام الطلب */}
      <PackageInputModal
        open={!!missingInput}
        product={missingProduct}
        onConfirm={(inputs) => {
          if (missingInput) updateItemDynamicInputs(missingInput.item.id, inputs);
          setMissingInput(null);
          setError('');
        }}
        onClose={() => setMissingInput(null)}
      />
    </div>
  );
}