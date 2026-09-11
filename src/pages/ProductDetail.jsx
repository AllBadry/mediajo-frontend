import React, { useRef, useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useGSAP } from '@gsap/react';
import gsap from 'gsap';
import { ChevronRight, Star, ShoppingCart, Loader2, ShieldCheck, Clock, Check, MessageSquare, User } from 'lucide-react';
import { useLanguage } from '../context/LanguageContext';
import { useAuth } from '../context/AuthContext';
import { useCartStore } from '../store/cartStore';
import api from '../lib/axios';
import PackageInputModal from '../components/cart/PackageInputModal';

function StarRating({ count, size = 'w-5 h-5' }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1,2,3,4,5].map(s => (
        <Star key={s} className={`${size} ${s <= count ? 'text-amber-400 fill-amber-400' : 'text-gray-200'}`} />
      ))}
    </div>
  );
}

export default function ProductDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const containerRef = useRef();
  const { t } = useLanguage();
  const { user, isAuthenticated } = useAuth();
  const addItem = useCartStore((s) => s.addItem);

  const [product, setProduct] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [reviewStats, setReviewStats] = useState({ avgRating: 0, count: 0 });
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');
  const [addedId, setAddedId] = useState(null);
  const addedTimer = useRef(null);

  // Review form state
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [comment, setComment] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [reviewSuccess, setReviewSuccess] = useState('');
  const [reviewError, setReviewError] = useState('');

  // Product input modal
  const [showInputModal, setShowInputModal] = useState(false);

  const flashAdded = (productId) => {
    setAddedId(productId);
    if (addedTimer.current) clearTimeout(addedTimer.current);
    addedTimer.current = setTimeout(() => setAddedId(null), 1200);
  };

  // Fetch product + reviews
  useEffect(() => {
    const fetchData = async () => {
      try {
        setIsLoading(true);
        const [prodRes, revRes] = await Promise.all([
          api.get(`/products/${id}`),
          api.get(`/reviews/product/${id}`),
        ]);
        setProduct(prodRes.data.data.product || prodRes.data.data);
        setReviews(revRes.data.data.reviews || []);
        setReviewStats({
          avgRating: revRes.data.data.avgRating || 0,
          count: revRes.data.data.count || 0,
        });
      } catch (err) {
        console.error(err);
        setError('المنتج غير موجود أو حدث خطأ في الاتصال.');
      } finally {
        setIsLoading(false);
      }
    };
    fetchData();
  }, [id]);

  // GSAP entrance
  useGSAP(() => {
    if (!isLoading && product) {
      gsap.from('.detail-hero > *', { y: 30, opacity: 0, duration: 0.7, stagger: 0.12, ease: 'back.out(1.2)' });
      gsap.from('.review-section', { y: 40, opacity: 0, duration: 0.8, ease: 'power2.out', delay: 0.3 });
    }
  }, { scope: containerRef, dependencies: [isLoading, product] });

  const handleAddToCart = (dynamicInputs = {}) => {
    if (!product) return;
    addItem({
      id: product._id,
      platformId: product.platform,
      name: product.name,
      nameAr: product.name,
      unit: product.qty,
      price: product.price,
      productType: product.productType,
      inputRequirements: product.inputRequirements || [],
      dynamicInputs,
    });
    flashAdded(product._id);
  };

  const handleSubmitReview = async (e) => {
    e.preventDefault();
    if (!rating || rating < 1) { setReviewError(t.productDetail?.reviewRequired || 'يرجى اختيار تقييم'); return; }
    if (!comment.trim()) { setReviewError(t.productDetail?.commentRequired || 'يرجى كتابة مراجعة'); return; }
    try {
      setIsSubmitting(true);
      setReviewError('');
      setReviewSuccess('');
      await api.post('/reviews', { productId: id, rating, comment: comment.trim() });
      setReviewSuccess(t.productDetail?.reviewSubmitted || 'تم إرسال تقييمك! سيظهر بعد موافقة الإدارة.');
      setRating(0);
      setComment('');
    } catch (err) {
      setReviewError(err.response?.data?.message || 'حدث خطأ أثناء الإرسال.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const pp = t.productDetail || {};
  const pName = product?.name || '';

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-[60vh]">
        <Loader2 className="w-10 h-10 animate-spin text-indigo-600" />
      </div>
    );
  }

  if (error || !product) {
    return (
      <div className="min-h-[60vh] flex flex-col items-center justify-center gap-4 px-4 pt-20">
        <p className="text-lg font-bold text-gray-600">{error || pp.notFound || 'المنتج غير موجود'}</p>
        <Link to="/products" className="px-6 py-3 bg-indigo-600 text-white rounded-xl font-bold hover:bg-indigo-700 transition-colors">
          {pp.backToProducts || 'العودة للمنتجات'}
        </Link>
      </div>
    );
  }

  return (
    <div ref={containerRef} dir={t.dir} className="min-h-screen bg-gray-50 pt-20">
      {/* Hero / Product Info */}
      <section className="detail-hero max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
        {/* Breadcrumb */}
        <nav className="flex items-center gap-2 text-sm font-medium mb-8">
          <Link to="/" className="text-gray-500 hover:text-indigo-600 transition-colors">{pp.home || t.platformPage?.home || 'الرئيسية'}</Link>
          <ChevronRight className="w-4 h-4 text-gray-300 rtl:rotate-180" />
          <Link to="/products" className="text-gray-500 hover:text-indigo-600 transition-colors">{pp.products || t.platformPage?.products || 'المنتجات'}</Link>
          <ChevronRight className="w-4 h-4 text-gray-300 rtl:rotate-180" />
          <Link to={`/products/${product.platform}`} className="text-gray-500 hover:text-indigo-600 transition-colors capitalize">{product.platform}</Link>
          <ChevronRight className="w-4 h-4 text-gray-300 rtl:rotate-180" />
          <span className="text-gray-900 font-bold truncate max-w-[200px]">{pName}</span>
        </nav>

        <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-10">
            {/* Title & Rating */}
            <div className="flex flex-col sm:flex-row sm:items-start justify-between gap-4 mb-8">
              <div className="flex-1">
                {product.badge && (
                  <span className="inline-block px-3 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold mb-3 uppercase tracking-wide">
                    {product.badge}
                  </span>
                )}
                <h1 className="text-3xl sm:text-4xl font-black tracking-tight text-gray-900 mb-2">{pName}</h1>
                <div className="flex flex-wrap items-center gap-3 text-sm text-gray-500">
                  <span className="capitalize bg-gray-100 px-3 py-1 rounded-full font-bold">{product.platform}</span>
                  <span className="bg-gray-100 px-3 py-1 rounded-full font-bold">{product.category}</span>
                  {product.groupName && <span className="bg-gray-100 px-3 py-1 rounded-full font-bold">{product.groupName}</span>}
                  {product.subGroup && <span className="bg-gray-50 px-3 py-1 rounded-full text-xs">{product.subGroup}</span>}
                </div>
              </div>
              <div className="text-left sm:text-right shrink-0">
                <div className="text-4xl font-black text-gray-900 mb-1">{product.price.toFixed(2)} <span className="text-lg font-bold text-gray-400">JOD</span></div>
                <div className="text-sm text-gray-500 font-bold">{product.qty} {pp.units || 'units'}</div>
              </div>
            </div>

            {/* Features */}
            {product.features && product.features.length > 0 && (
              <div className="mb-8 p-5 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="text-sm font-bold text-gray-500 uppercase tracking-widest mb-3">{pp.features || 'المميزات'}</h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                  {product.features.map((feat, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-gray-700">
                      <Check className="w-4 h-4 text-emerald-500 shrink-0" />
                      <span>{feat}</span>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Description */}
            {product.description && (
              <p className="text-gray-600 leading-relaxed mb-8 text-sm">{product.description}</p>
            )}

            {/* Input Requirements Info */}
            {product.inputRequirements && product.inputRequirements.length > 0 && (
              <div className="mb-8 p-5 bg-amber-50 rounded-2xl border border-amber-100">
                <h3 className="text-sm font-bold text-amber-700 uppercase tracking-widest mb-3">{pp.requiredInfo || 'المعلومات المطلوبة عند الطلب'}</h3>
                <div className="space-y-2">
                  {product.inputRequirements.map((req, idx) => (
                    <div key={idx} className="flex items-center gap-2 text-sm text-amber-800">
                      <span className="w-5 h-5 bg-amber-200 rounded-full flex items-center justify-center text-[10px] font-bold text-amber-900 shrink-0">{idx + 1}</span>
                      <span className="font-bold">{req.label}</span>
                      {req.required !== false && <span className="text-[10px] text-red-500 font-bold">*</span>}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Add to Cart Button */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4 pt-4 border-t border-gray-100">
              <button
                onClick={() => {
                  const reqs = product.inputRequirements || [];
                  if (reqs.length > 0) setShowInputModal(true);
                  else handleAddToCart();
                }}
                className={`flex items-center justify-center gap-3 px-8 py-4 rounded-2xl font-bold text-lg transition-all duration-300 shadow-lg ${
                  addedId === product._id
                    ? 'bg-emerald-500 text-white'
                    : 'bg-indigo-600 text-white hover:bg-indigo-700 hover:scale-[1.02]'
                }`}
              >
                {addedId === product._id ? (
                  <><Check className="w-5 h-5" /> {pp.added || t.platformPage?.added || 'تمت الإضافة'}</>
                ) : (
                  <><ShoppingCart className="w-5 h-5" /> {pp.addToCart || t.platformPage?.orderNow || 'أضف للسلة'}</>
                )}
              </button>
              <Link
                to={`/products/${product.platform}`}
                className="text-sm font-bold text-indigo-600 hover:text-indigo-800 transition-colors text-center"
              >
                ← {pp.backToPlatform || 'العودة لباقات المنصة'}
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Reviews Section */}
      <section className="review-section max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 pb-20">
        <div className="bg-white rounded-[2rem] border border-gray-200 shadow-sm overflow-hidden">
          <div className="p-6 sm:p-10">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-8">
              <h2 className="text-2xl font-black text-gray-900 flex items-center gap-2">
                <MessageSquare className="w-6 h-6 text-indigo-600" />
                {pp.reviewsTitle || 'مراجعات المنتج'}
              </h2>
              {reviewStats.count > 0 && (
                <div className="flex items-center gap-3">
                  <StarRating count={Math.round(reviewStats.avgRating)} />
                  <span className="text-sm font-bold text-gray-600">{reviewStats.avgRating.toFixed(1)} ({reviewStats.count})</span>
                </div>
              )}
            </div>

            {/* Reviews List */}
            {reviews.length === 0 ? (
              <p className="text-gray-400 text-center py-8 text-sm">{pp.noReviews || 'لا توجد مراجعات بعد. كن أول من يقيّم!'}</p>
            ) : (
              <div className="space-y-4 mb-10">
                {reviews.map((review) => (
                  <div key={review._id} className="p-5 bg-gray-50 rounded-2xl border border-gray-100">
                    <div className="flex items-start justify-between mb-2">
                      <div className="flex items-center gap-3">
                        <div className="w-9 h-9 bg-indigo-100 rounded-full flex items-center justify-center">
                          <User className="w-4 h-4 text-indigo-600" />
                        </div>
                        <div>
                          <span className="font-bold text-gray-900 text-sm block">{review.user?.name || 'مستخدم'}</span>
                          <span className="text-[10px] text-gray-400">{new Date(review.createdAt).toLocaleDateString(t.dir === 'rtl' ? 'ar-JO' : 'en-US')}</span>
                        </div>
                      </div>
                      <StarRating count={review.rating} size="w-4 h-4" />
                    </div>
                    <p className="text-sm text-gray-700 leading-relaxed mt-2">{review.comment}</p>
                  </div>
                ))}
              </div>
            )}

            {/* Submit Review Form */}
            {isAuthenticated ? (
              <form onSubmit={handleSubmitReview} className="p-6 bg-gray-50 rounded-2xl border border-gray-100">
                <h3 className="font-bold text-gray-900 mb-4">{pp.writeReview || 'اكتب مراجعتك'}</h3>

                {reviewSuccess && <div className="mb-4 p-3 bg-emerald-50 text-emerald-700 rounded-xl text-sm font-bold">{reviewSuccess}</div>}
                {reviewError && <div className="mb-4 p-3 bg-red-50 text-red-700 rounded-xl text-sm font-bold">{reviewError}</div>}

                {/* Star selector */}
                <div className="flex items-center gap-1 mb-4">
                  {[1,2,3,4,5].map(s => (
                    <button
                      key={s}
                      type="button"
                      onClick={() => setRating(s)}
                      onMouseEnter={() => setHoverRating(s)}
                      onMouseLeave={() => setHoverRating(0)}
                      className="p-0.5 transition-transform hover:scale-125"
                    >
                      <Star className={`w-7 h-7 ${(hoverRating || rating) >= s ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}`} />
                    </button>
                  ))}
                  <span className="text-sm font-bold text-gray-500 mr-2">{rating > 0 ? `${rating}/5` : ''}</span>
                </div>

                <textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder={pp.reviewPlaceholder || 'اكتب رأيك في المنتج...'}
                  className="w-full p-4 border border-gray-200 rounded-xl text-sm resize-none h-28 outline-none focus:border-indigo-400 transition-colors"
                />

                <button
                  type="submit"
                  disabled={isSubmitting || !rating || !comment.trim()}
                  className="mt-3 px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 disabled:opacity-50 transition-colors flex items-center gap-2"
                >
                  {isSubmitting ? <Loader2 className="w-4 h-4 animate-spin" /> : null}
                  {pp.submitReview || 'إرسال المراجعة'}
                </button>
              </form>
            ) : (
              <div className="text-center py-8 bg-gray-50 rounded-2xl border border-gray-100">
                <p className="text-gray-500 text-sm mb-3">{pp.loginToReview || 'سجّل دخولك لكتابة مراجعة'}</p>
                <Link to="/auth" className="px-6 py-2.5 bg-indigo-600 text-white rounded-xl font-bold text-sm hover:bg-indigo-700 transition-colors">
                  {t.nav?.signIn || 'تسجيل الدخول'}
                </Link>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Package Input Modal */}
      <PackageInputModal
        open={showInputModal}
        product={product}
        onConfirm={(dynamicInputs) => {
          handleAddToCart(dynamicInputs);
          setShowInputModal(false);
        }}
        onClose={() => setShowInputModal(false)}
      />
    </div>
  );
}
