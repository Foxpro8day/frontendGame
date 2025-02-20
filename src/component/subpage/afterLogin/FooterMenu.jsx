import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthContext";
import avatar from "../../assets/images/fox.jpg";
import "./FooterMenu.scss";

const FooterMenu = () => {
  const navigate = useNavigate();
  // ✅ State lưu trạng thái tooltip hiển thị hay không
  const [tooltip, setTooltip] = useState(null);
  const { user, isLoggedIn, logout } = useContext(AuthContext); // ✅ Lấy user từ context
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUser = async () => {
      if (!isLoggedIn || !user?.id) {
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get("/user/me", {
          withCredentials: true, // ✅ Đảm bảo gửi cookie với request
        });
        setUserData(response.data);
      } catch (err) {
        setError("Không thể tải thông tin người dùng.");
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [user, isLoggedIn]);

  // ✅ Khi hover vào icon, cập nhật tooltip
  const handleMouseEnter = (text) => {
    setTooltip(text);
  };

  // ✅ Khi rời chuột, ẩn tooltip
  const handleMouseLeave = () => {
    setTooltip(null);
  };
  // ✅ Xử lý đăng xuất
  const handleLogout = async () => {
    try {
      await logout(); // 🚀 Gọi hàm logout từ context (xóa cookie trên server)

      // ✅ Xóa tất cả dữ liệu client-side
      localStorage.clear();
      sessionStorage.clear();

      // ✅ Reload lại trang để đảm bảo mọi state được reset
      window.location.href = "/";
    } catch (error) {
      console.error("Lỗi đăng xuất:", error);
    }
  };

  if (!isLoggedIn) return <p>Bạn chưa đăng nhập.</p>;
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>Không tìm thấy người dùng.</p>;

  return (
    <>
      <div className="afoot-menu">
        <div className="aHeader-wrapper">
          <div className="aHeader-left" onClick={() => navigate("/user")}>
            <div className="user-group">
              <img src={avatar} alt="" />
            </div>
          </div>
          <div className="aHeader-right">
            {/* Danh sách icon */}
            {[
              { icon: "fa-tachograph-digital", text: "Dashboard", link: "/" },
              { icon: "fa-house", text: "Trang chủ", link: "/" },
              { icon: "fa-dice", text: "Games", link: "/" },
            ].map((item, index) => (
              <div
                key={index}
                className="background-icon"
                onMouseEnter={() => handleMouseEnter(item.text)}
                onMouseLeave={handleMouseLeave}
                onClick={() => navigate(item.link)}
              >
                <i className={`fa-solid ${item.icon}`}></i>
                <div className="menu-title">{item.text}</div>
              </div>
            ))}
            <div
              className="background-icon"
              onMouseEnter={() => handleMouseEnter("Đăng xuất")}
              onMouseLeave={handleMouseLeave}
              onClick={handleLogout} // 🚀 Gọi hàm đăng xuất
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              <div className="menu-title">Đăng xuất</div>
            </div>
          </div>
        </div>
        {tooltip && <div className="tooltip">{tooltip}</div>}
      </div>
    </>
  );
};

export default FooterMenu;
