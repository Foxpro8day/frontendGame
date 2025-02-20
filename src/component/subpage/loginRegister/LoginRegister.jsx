import React, { useState } from "react";
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

  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [selectInform, setSelectInform] = useState(select);

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

  // ✅ Xử lý Đăng Ký
  const handleRegister = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (
      !formRegisterData.username ||
      !formRegisterData.phone ||
      !formRegisterData.password ||
      !formRegisterData.confirmPassword
    ) {
      setError("⚠️ Vui lòng điền đầy đủ thông tin!");
      return;
    }

    if (formRegisterData.phone.length !== 10) {
      setError("⚠️ Số điện thoại phải đúng 10 số.");
      return;
    }

    if (formRegisterData.password !== formRegisterData.confirmPassword) {
      setError("❌ Mật khẩu xác nhận không khớp!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${desUrl}/user/register`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formRegisterData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("✅ Đăng ký thành công! Hãy đăng nhập.");
        setError("");
        setSelectInform("login"); // Chuyển về form đăng nhập sau khi đăng ký thành công
      } else {
        setError(data.message || "❌ Thất bại! Kiểm tra lại thông tin.");
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      setError("❌ Lỗi máy chủ! Hãy thử lại sau.");
    } finally {
      setLoading(false);
    }
  };

  // ✅ Xử lý Đăng Nhập
  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    if (!formLoginData.username || !formLoginData.password) {
      setError("⚠️ Vui lòng nhập tài khoản và mật khẩu!");
      return;
    }

    setLoading(true);
    try {
      const response = await fetch(`${desUrl}/user/login`, {
        method: "POST",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formLoginData),
      });

      const data = await response.json();

      if (response.ok) {
        setSuccess("✅ Đăng nhập thành công!");
        setError("");
        window.location.reload(); // Reload trang sau khi đăng nhập thành công
      } else {
        setError(data.message || "❌ Thất bại! Kiểm tra lại thông tin.");
      }
    } catch (error) {
      console.error("Lỗi kết nối:", error);
      setError("❌ Lỗi máy chủ! Hãy thử lại sau.");
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

        {error && <p className="error-message">{error}</p>}
        {success && <p className="success-message">{success}</p>}
      </div>
    </div>
  );
};

export default LoginRegister;
