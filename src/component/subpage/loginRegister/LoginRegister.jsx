import React, { useState } from "react";
import axios from "axios"; // ✅ Import Axios
import { toast } from "react-toastify"; // ✅ Import Toastify
import "./LoginRegister.scss";

const desUrl = process.env.REACT_APP_URL_SITE;

const LoginRegister = ({ select, onClick }) => {
  const [formRegisterData, setFormRegisterData] = useState({
    username: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [formLoginData, setFormLoginData] = useState({
    username: "",
    password: "",
  });

  const [loading, setLoading] = useState(false);
  const [selectInform, setSelectInform] = useState(select);

  // Hàm hiển thị thông báo
  const showToast = (message, type = "success") => {
    if (type === "error") {
      toast.error(message);
    } else {
      toast.success(message);
    }
  };

  // Xử lý input thay đổi cho đăng ký
  const handleChangeRegister = (e) => {
    const { name, value } = e.target;

    setFormRegisterData((prev) => {
      if (name === "username" && value.length > 10) return prev;
      if (name === "phone" && (!/^\d*$/.test(value) || value.length > 10))
        return prev;
      return { ...prev, [name]: value };
    });
  };

  // Xử lý input thay đổi cho đăng nhập
  const handleChangeLogin = (e) => {
    const { name, value } = e.target;
    setFormLoginData((prev) => ({ ...prev, [name]: value }));
  };

  // ✅ Xử lý Đăng Ký với Axios
  const handleRegister = async (e) => {
    e.preventDefault();

    if (
      !formRegisterData.username ||
      !formRegisterData.phone ||
      !formRegisterData.password ||
      !formRegisterData.confirmPassword
    ) {
      showToast("⚠️ Vui lòng điền đầy đủ thông tin!", "error");
      return;
    }

    if (formRegisterData.phone.length !== 10) {
      showToast("⚠️ Số điện thoại phải đúng 10 số.", "error");
      return;
    }

    if (formRegisterData.password !== formRegisterData.confirmPassword) {
      showToast("❌ Mật khẩu xác nhận không khớp!", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(
        `${desUrl}/user/register`,
        formRegisterData,
        { withCredentials: true }
      );

      showToast("✅ Đăng ký thành công! Hãy đăng nhập.");
      setSelectInform("login"); // Chuyển về form đăng nhập sau khi đăng ký thành công
    } catch (error) {
      showToast(
        error.response?.data?.message || "❌ Thất bại! Kiểm tra lại thông tin.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  // ✅ Xử lý Đăng Nhập với Axios
  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formLoginData.username || !formLoginData.password) {
      showToast("⚠️ Vui lòng nhập tài khoản và mật khẩu!", "error");
      return;
    }

    setLoading(true);
    try {
      const response = await axios.post(`${desUrl}/user/login`, formLoginData, {
        withCredentials: true,
      });

      showToast("✅ Đăng nhập thành công!");
      setTimeout(() => {
        window.location.reload(); // Reload trang sau khi đăng nhập thành công
      }, 2000);
    } catch (error) {
      showToast(
        error.response?.data?.message || "❌ Thất bại! Kiểm tra lại thông tin.",
        "error"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <form
          onSubmit={selectInform === "login" ? handleLogin : handleRegister}
        >
          <i className="x-icon fa-solid fa-xmark" onClick={onClick}></i>
          <h2>{selectInform === "login" ? "Đăng nhập" : "Đăng ký"}</h2>

          {/* Form Đăng Nhập */}
          {selectInform === "login" && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Tài khoản (tối đa 10 ký tự)"
                value={formLoginData.username}
                onChange={handleChangeLogin}
                maxLength={10}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formLoginData.password}
                onChange={handleChangeLogin}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Đang đăng nhập..." : "Đăng nhập 🚀"}
              </button>
            </>
          )}

          {/* Form Đăng Ký */}
          {selectInform === "register" && (
            <>
              <input
                type="text"
                name="username"
                placeholder="Tài khoản (tối đa 10 ký tự)"
                value={formRegisterData.username}
                onChange={handleChangeRegister}
                maxLength={10}
                required
              />
              <input
                type="text"
                name="phone"
                placeholder="Số điện thoại (10 số)"
                value={formRegisterData.phone}
                onChange={handleChangeRegister}
                maxLength={10}
                required
              />
              <input
                type="password"
                name="password"
                placeholder="Mật khẩu"
                value={formRegisterData.password}
                onChange={handleChangeRegister}
                required
              />
              <input
                type="password"
                name="confirmPassword"
                placeholder="Xác nhận mật khẩu"
                value={formRegisterData.confirmPassword}
                onChange={handleChangeRegister}
                required
              />
              <button type="submit" disabled={loading}>
                {loading ? "Đang đăng ký..." : "Đăng ký 📝"}
              </button>
            </>
          )}

          <div>
            {selectInform === "login" ? (
              <>
                Chưa có tài khoản?{" "}
                <a
                  className="switch-form"
                  onClick={() => setSelectInform("register")}
                >
                  Đăng ký ngay
                </a>
              </>
            ) : (
              <>
                Đã có tài khoản?{" "}
                <a
                  className="switch-form"
                  onClick={() => setSelectInform("login")}
                >
                  Đăng nhập
                </a>
              </>
            )}
          </div>
        </form>
      </div>
    </div>
  );
};

export default LoginRegister;
