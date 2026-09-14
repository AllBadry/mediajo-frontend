// ==========================================
// أدوات مساعدة لطلبات العروض (Bundles)
// ==========================================

// القيمة الكتالوجية الكاملة للباقة (مجموع أسعار الباقات المضاعفة بالكميات)
export function offerCatalogValue(offer) {
  return (offer?.items || []).reduce(
    (sum, x) => sum + (Number(x.product?.price) || 0) * (Number(x.quantity) || 1),
    0
  );
}

// تجميع كل المتطلبات الإلزامية عبر مكونات الباقة (رابط / إيميل...) بدون تكرار
export function unifiedOfferRequirements(offer) {
  const map = new Map();
  for (const x of offer?.items || []) {
    const product = x.product;
    for (const req of product?.inputRequirements || []) {
      if (!map.has(req.name)) {
        map.set(req.name, req);
      }
    }
  }
  return Array.from(map.values());
}

// تحويل مكونات العرض إلى أسطر سلة:
// - كل بند يحمل id الباقة الحقيقية (لكي يعمل الإرسال والمزود كالمعتاد)
// - السعر موزَّع نسبياً بحيث يكون إجمالي السلة = سعر العرض الترويجي
// - الحقول المطلوبة تملأ بمدخلات موحدة (الرابط مثلاً)
export function buildOfferCartLines(offer, inputs = {}) {
  const items = offer?.items || [];
  const catalogSum = offerCatalogValue(offer);
  const offerPrice = Number(offer?.price) || 0;

  return items
    .filter((x) => x.product && x.product._id)
    .map((x) => {
      const p = x.product;
      const qty = Number(x.quantity) || 1;
      const base = Number(p.price) || 0;
      // السعر لكل وحدة: نسبة البند من سعر العرض حسب قيمته في الكتالوج.
      // الكمية (productQty) تُضرب في السعر لاحقاً فيصبح الإجمالي = سعر العرض.
      const price = catalogSum > 0 ? offerPrice * (base / catalogSum) : offerPrice;
      return {
        id: p._id,
        platformId: p.platform,
        name: p.name,
        nameAr: p.nameAr || p.name,
        unit: p.qty || String(qty),
        price,
        productType: p.productType,
        inputRequirements: p.inputRequirements || [],
        productQty: qty,
        dynamicInputs: { ...inputs },
        offerId: offer._id,
        isActive: true,
      };
    });
}