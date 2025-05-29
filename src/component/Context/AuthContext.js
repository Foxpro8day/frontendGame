import { createContext, useState, useEffect } from "react";
import axios from "axios";

export const AuthContext = createContext();

// ✅ Cấu hình axios chỉ một lần
const API_URL = process.env.REACT_APP_URL_SITE;
axios.defaults.baseURL = API_URL;
axios.defaults.withCredentials = true; // 🚀 Quan trọng để gửi cookie

const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState(null);
  const [role, setRole] = useState(null);
  const [loading, setLoading] = useState(true); // ✅ Thêm loading để chờ xác thực
  const [error, setError] = useState("")

  // ✅ Kiểm tra trạng thái đăng nhập khi load trang
  useEffect(() => {
    const checkLoginStatus = async () => {
      try {
        const response = await axios.get("/user/me", { withCredentials: true });
        // ✅ Nếu không có dữ liệu, coi như chưa đăng nhập
        if (!response.data) {
          setIsLoggedIn(false);
          return;
        }
        setUser(response.data);
        setRole(response.data.role);
        setIsLoggedIn(true);
      } catch (error) {

        // ✅ Chỉ báo lỗi nếu thực sự có lỗi, không báo khi trang mới load
        if (error.response && [401, 403].includes(error.response.status)) {
          setError("❌ Lỗi khi xác thực đăng nhập!");
        }

        setIsLoggedIn(false);
        setUser(null);
        setRole(null);
      } finally {
        setLoading(false); // ✅ Tắt loading khi hoàn tất kiểm tra
      }
    };

    checkLoginStatus();
  }, []);

  // ✅ Hàm đăng nhập (gọi API `/user/me` sau khi login)
  const login = async (username, password) => {
    try {
      await axios.post("/login", { username, password });

      // Sau khi đăng nhập, gọi lại API để lấy thông tin user
      const response = await axios.get("/user/me");
      setUser(response.data);
      setRole(response.data.role);
      setIsLoggedIn(true);
    } catch (error) {
      console.error("Lỗi đăng nhập:", error);
    }
  };

  // ✅ Hàm đăng xuất (reset state ngay cả khi API lỗi)
  const logout = async () => {
    try {
      await axios.post("/user/logout");
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    } finally {
      setIsLoggedIn(false);
      setUser(null);
      setRole(null);
    }
  };

  // ✅ Trả về loading nếu đang kiểm tra đăng nhập
  if (loading) {
    return <p>Đang kiểm tra đăng nhập...</p>;
  }

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn, // ✅ thêm
        user,
        setUser, // ✅ thêm
        role,
        login,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
