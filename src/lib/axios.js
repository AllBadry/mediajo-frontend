import axios from 'axios';

const api = axios.create({
  // الرابط الأساسي للباك إند الخاص بك
  baseURL: 'https://api.mediajo.org', 
  
  // السماح بإرسال واستقبال الـ Cookies الآمنة (ضروري جداً لعمل التوكن)
  withCredentials: true, 
  
  headers: {
    'Content-Type': 'application/json',
  },
});

// ==========================================
// 1. معترض الطلبات (Request Interceptor)
// ==========================================
api.interceptors.request.use((config) => {
  // إضافة /api تلقائياً لأي مسار لا يبدأ بها لتجنب خطأ 404
  if (config.url && !config.url.startsWith('/api')) {
    config.url = config.url.startsWith('/') ? `/api${config.url}` : `/api/${config.url}`;
  }
  return config;
});

// ==========================================
// 2. معترض الاستجابات (Response Interceptor)
// ==========================================
api.interceptors.response.use(
  (response) => {
    // إذا كان الرد ناجحاً، نمرره كما هو
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    // التحقق مما إذا كان الخطأ 401 (انتهاء الجلسة) ولم نقم بمحاولة التجديد مسبقاً،
    // والتأكد أننا لسنا في مسار التجديد نفسه أو تسجيل الدخول (لمنع Loop)
    if (
      error.response?.status === 401 && 
      !originalRequest._retry && 
      originalRequest.url !== '/api/auth/refresh-token' &&
      originalRequest.url !== '/api/auth/login'
    ) {
      originalRequest._retry = true; // وضع علامة أننا نحاول التجديد الآن

      try {
        // محاولة طلب توكن جديد بصمت من الباك إند عبر الـ Refresh Token
        await api.post('/auth/refresh-token');

        // إذا نجح التجديد، الباك إند سيقوم بتحديث الـ Cookies بالتوكن الجديد
        // الآن نقوم بإعادة إرسال الطلب الأصلي الذي فشل
        return api(originalRequest);
        
      } catch (refreshError) {
        // إذا فشل التجديد (انتهت الجلسة بالكامل أو الـ Refresh Token غير صالح)
        // نقوم بطرد المستخدم فوراً إلى صفحة تسجيل الدخول
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // إذا كان خطأ آخر غير 401، نرجعه كما هو للكومبوننت ليتعامل معه
    return Promise.reject(error);
  }
);

export default api;