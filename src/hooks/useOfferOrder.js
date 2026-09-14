import { useState, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import { useCartStore } from '../store/cartStore';
import { buildOfferCartLines } from '../utils/offerCart';

// سلوك موحّد لزر "اطلب العرض":
// - إذا حُدد رابط خارجي من الأدمن → يُفتح في تبويب جديد
// - وإلا → نافذة إدخال التفاصيل ثم إضافة الباقة كاملة للسلة والتوجه إليها
export function useOfferOrder() {
  const navigate = useNavigate();
  const addOfferToCart = useCartStore((s) => s.addOfferToCart);
  const [pendingOffer, setPendingOffer] = useState(null);

  const requestOffer = useCallback((offer) => {
    if (!offer) return;
    if (offer.actionLink) {
      window.open(offer.actionLink, '_blank', 'noopener,noreferrer');
      return;
    }
    setPendingOffer(offer);
  }, []);

  const confirmOffer = useCallback(
    (inputs = {}) => {
      if (!pendingOffer) return;
      const lines = buildOfferCartLines(pendingOffer, inputs);
      addOfferToCart(lines);
      setPendingOffer(null);
      navigate('/cart');
    },
    [pendingOffer, addOfferToCart, navigate]
  );

  const closeOffer = useCallback(() => setPendingOffer(null), []);

  return { pendingOffer, requestOffer, confirmOffer, closeOffer };
}