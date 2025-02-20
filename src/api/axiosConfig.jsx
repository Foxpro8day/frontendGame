import axios from "axios";

// ✅ Tạo một instance của axios
const api = axios.create({
  baseURL: process.env.REACT_APP_API_URL, // ✅ Lấy từ .env hoặc mặc định
  withCredentials: true, // ✅ Gửi cookie với mỗi request
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Interceptor để tự động thêm Token nếu có
api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // Lấy token từ localStorage
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default api; // ✅ Xuất axios đã config
