import React, { createContext, useContext, useEffect, useState } from 'react';
import { useCartStore } from '../store/cartStore';

const AuthContext = createContext(null);

export function AuthProvider({ children }) {
  const [user, setUser] = useState(() => {
    try {
      const saved = localStorage.getItem('mediajo_user');
      return saved ? JSON.parse(saved) : null;
    } catch {
      return null;
    }
  });

  // مزامنة حالة السلة مع حالة المصادقة
  useEffect(() => {
    const isAuth = !!user;
    useCartStore.getState().setAuth(isAuth);
    if (isAuth) {
      // عند فتح التطبيق والمستخدم مسجل مسبقاً نعيد سلة حسابه من السيرفر
      useCartStore.getState().loadFromServer();
    }
  }, [user]);

  const login = (userData) => {
    setUser(userData);
    localStorage.setItem('mediajo_user', JSON.stringify(userData));
    const store = useCartStore.getState();
    store.setAuth(true);
    store.mergeAndSync();
  };

  const logout = () => {
    const store = useCartStore.getState();
    // يجب تعطيل المصادقة أولاً كي لا تُرسل سلة فارغة للسيرفر
    store.setAuth(false);
    store.clearCart();
    setUser(null);
    localStorage.removeItem('mediajo_user');
  };

  return (
    <AuthContext.Provider value={{ user, isAuthenticated: !!user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  return useContext(AuthContext);
}