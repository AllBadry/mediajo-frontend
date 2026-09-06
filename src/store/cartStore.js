import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import api from '../api/client';

const CART_KEY = 'mediajo-cart';

export const SERVICE_FEE = 1.5;

export const useCartStore = create(
  persist(
    (set, get) => ({
      items: [],
      isAuth: false,

      // تعيين حالة المصادقة من AuthContext (لا تُحفظ في localStorage)
      setAuth: (value) => set({ isAuth: value }),

      // إضافة منتج للسلة (يُدمج عند تكرار نفس المنتج)
      addItem: (item) => {
        set((state) => {
          const found = state.items.find((i) => i.id === item.id);
          if (found) {
            return {
              items: state.items.map((i) =>
                i.id === item.id ? { ...i, productQty: i.productQty + 1 } : i
              ),
            };
          }
          return { items: [...state.items, { ...item, productQty: 1 }] };
        });
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
            set({ items: data.data.items });
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
            set({ items: data.data.items });
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
            set({ items: saved.data.items });
          }
        } catch {
          // إن فشلت المزامنة تبقى السلة المحلية
        }
      },
    }),
    {
      name: CART_KEY,
      partialize: (state) => ({ items: state.items }),
    }
  )
);

// ==========================================
// Selectors
// ==========================================
export const selectItemCount = (state) =>
  state.items.reduce((sum, i) => sum + i.productQty, 0);

export const selectSubtotal = (state) =>
  state.items.reduce((sum, i) => sum + i.price * i.productQty, 0);