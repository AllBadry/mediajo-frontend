import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/client';

const CART_KEY = 'mediajo-cart';

// تطبيع عناصر السلة القادمة من أي مصدر (localStorage قديم / سيرفر)
// لضمان وجود productQty دائماً وعدم ظهور "Subtotal (0)"
const normalizeItems = (items) =>
  (items || [])
    .filter((i) => i && typeof i === 'object' && i.id && i.isActive !== false)
    .map((i) => ({
      ...i,
      productQty: Number.isFinite(i.productQty) && i.productQty >= 1 ? Math.floor(i.productQty) : 1,
      dynamicInputs: i.dynamicInputs || {},
    }));

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isAuth: false,

      // تعيين حالة المصادقة من AuthContext (لا تُحفظ في localStorage)
      setAuth: (value) => set({ isAuth: value }),

      // إضافة منتج للسلة (يُدمج عند تكرار نفس المنتج)
      addItem: (item) => {
        // رفض أي منتج معلَّم كمخفِيّ (حماية إضافية — لا يُعرضون للعملاء أصلاً)
        if (!item || item.isActive === false) return;
        set((state) => {
          const found = state.items.find((i) => i.id === item.id);
          if (found) {
            return {
              items: state.items.map((i) =>
                i.id === item.id
                  ? {
                      ...i,
                      productQty: i.productQty + 1,
                      dynamicInputs: item.dynamicInputs || i.dynamicInputs,
                    }
                  : i
              ),
            };
          }
          return {
            items: [
              ...state.items,
              { ...item, productQty: 1, dynamicInputs: item.dynamicInputs || {} },
            ],
          };
        });
        get().saveToServer();
      },

      // تحديث المدخلات الديناميكية لبند محدد (الرابط/الإيميل...)
      updateItemDynamicInputs: (id, dynamicInputs) => {
        set((state) => ({
          items: state.items.map((i) => (i.id === id ? { ...i, dynamicInputs } : i)),
        }));
        get().saveToServer();
      },

      removeItem: (id) => {
        set((state) => ({ items: state.items.filter((i) => i.id !== id) }));
        get().saveToServer();
      },

      // تغيير الكمية (الحد الأدنى 1)
      updateQty: (id, delta) => {
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, productQty: Math.max(1, i.productQty + delta) } : i
          ),
        }));
        get().saveToServer();
      },

      clearCart: () => {
        set({ items: [] });
        get().saveToServer();
      },

      // حفظ السلة الحالية على السيرفر (فقط عند تسجيل الدخول)
      saveToServer: async () => {
        if (!get().isAuth) return;
        try {
          const { data } = await api.put('/api/cart', { items: get().items });
          if (data?.success && Array.isArray(data.data?.items)) {
            set({ items: normalizeItems(data.data.items) });
          }
        } catch {
          // تبقى السلة محلية في حال فشل المزامنة
        }
      },

      // جلب سلة المستخدم من السيرفر (عند فتح التطبيق أو التحديث)
      loadFromServer: async () => {
        if (!get().isAuth) return;
        try {
          const { data } = await api.get('/api/cart');
          if (data?.success && Array.isArray(data.data?.items)) {
            set({ items: normalizeItems(data.data.items) });
          }
        } catch {
          // تجاهل
        }
      },

      // دمج العناصر المحلية مع سلة الحساب مرة واحدة عند تسجيل الدخول
      mergeAndSync: async () => {
        if (!get().isAuth) return;
        try {
          const { data } = await api.get('/api/cart');
          const serverItems =
            data?.success && Array.isArray(data.data?.items) ? data.data.items : [];
          const localItems = get().items;

          const merged = [...serverItems];
          for (const local of localItems) {
            const idx = merged.findIndex((i) => i.id === local.id);
            if (idx !== -1) {
              merged[idx] = {
                ...merged[idx],
                productQty: merged[idx].productQty + (local.productQty || 1),
              };
            } else {
              merged.push({ ...local });
            }
          }

          const { data: saved } = await api.put('/api/cart', { items: merged });
          if (saved?.success && Array.isArray(saved.data?.items)) {
            set({ items: normalizeItems(saved.data.items) });
          }
        } catch {
          // إن فشلت المزامنة تبقى السلة المحلية
        }
      },
    }),
    {
      name: CART_KEY,
      partialize: (state) => ({ items: state.items }),
      merge: (persisted, current) => ({
        ...current,
        ...persisted,
        items: normalizeItems(persisted?.items),
      }),
    }
  )
);

// ==========================================
// Selectors
// ==========================================
export const selectItemCount = (state) =>
  state.items.reduce((sum, i) => sum + (i.productQty || 1), 0);

export const selectSubtotal = (state) =>
  state.items.reduce((sum, i) => sum + (i.price || 0) * (i.productQty || 1), 0);