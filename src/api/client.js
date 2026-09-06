import axios from 'axios';

// إعداد Axios ليتعامل مع الكوكيز عبر الـ Subdomains
const api = axios.create({
  baseURL: 'https://api.mediajo.org',
  withCredentials: true,
});

export default api;