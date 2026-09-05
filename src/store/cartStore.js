import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const CART_KEY = 'mediajo-cart';

export const SERVICE_FEE = 1.5;

export const useCartStore = create(
  persist(
    (set) => ({
      items: [],

      // إضافة منتج للسلة (يُدمج عند تكرار نفس المنتج)
      addItem: (item) =>
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
        }),

      removeItem: (id) =>
        set((state) => ({ items: state.items.filter((i) => i.id !== id) })),

      // تغيير الكمية (الحد الأدنى 1)
      updateQty: (id, delta) =>
        set((state) => ({
          items: state.items.map((i) =>
            i.id === id ? { ...i, productQty: Math.max(1, i.productQty + delta) } : i
          ),
        })),

      clearCart: () => set({ items: [] }),
    }),
    { name: CART_KEY }
  )
);

// ==========================================
// Selectors
// ==========================================
export const selectItemCount = (state) =>
  state.items.reduce((sum, i) => sum + i.productQty, 0);

export const selectSubtotal = (state) =>
  state.items.reduce((sum, i) => sum + i.price * i.productQty, 0);