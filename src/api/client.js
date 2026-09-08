import axios from 'axios';

// إعداد Axios ليتعامل مع الكوكيز عبر الـ Subdomains
const api = axios.create({
  baseURL: 'https://api.mediajo.org',
  withCredentials: true,
});

// ---------------------------------------------------------------
// جلسة منزلقة (Sliding Session):
// - طالما العميل نشط يتم تجديد الـ Access Token تلقائياً.
// - عند انتهاء الجلسة (خمول 15 دقيقة أو مضي 24 ساعة) يُطرد العميل
//   من الداشبورد وتُمسح الجلسة (يتم أيضاً إبطال التوكن على الخادم).
// ---------------------------------------------------------------
let isRefreshing = false;
let failedQueue = [];

const clearLocalSession = () => {
  const storage = ['mediajo_user', 'mediajo_lang', 'mediajo_theme', 'cart'];
  storage.forEach((key) => localStorage.removeItem(key));
};

const onRefreshFailed = () => {
  clearLocalSession();
  // إشعار السيرفر بسحب التوكن وتسجيل الخروج (حتى لو فشل، الجلسة أُبطلت على الخادم)
  axios
    .post('https://api.mediajo.org/api/auth/logout', {}, { withCredentials: true })
    .catch(() => {});
  if (window.location.pathname !== '/auth') {
    window.location.href = '/auth';
  }
};

const flushQueue = (accessToken) => {
  failedQueue.forEach(({ resolve, reject }) =>
    accessToken ? resolve(accessToken) : reject(new Error('Session expired'))
  );
  failedQueue = [];
};

api.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;
    const status = error.response?.status;

    // تجديد التوكن تلقائياً عند انتهاء صلاحيته (مرة واحدة فقط)
    if (
      status === 401 &&
      error.response?.data?.code !== 'INVALID_REFRESH_TOKEN' &&
      !originalRequest._retry &&
      !String(originalRequest.url).includes('/auth/login') &&
      !String(originalRequest.url).includes('/auth/refresh-token')
    ) {
      if (isRefreshing) {
        // طلبات أخرى أثناء التجديد — تنتظر نتيجته
        return new Promise((resolve, reject) => {
          failedQueue.push({ resolve, reject });
        }).then(() => api(originalRequest));
      }

      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const { data } = await axios.post(
          'https://api.mediajo.org/api/auth/refresh-token',
          {},
          { withCredentials: true }
        );
        flushQueue(true);
        return api(originalRequest);
      } catch (refreshError) {
        flushQueue(false);
        onRefreshFailed();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(error);
  }
);

export default api;