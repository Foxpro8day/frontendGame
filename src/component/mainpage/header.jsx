import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext"; // ✅ Import context
import logoImg from "../assets/images/logo126x60.png";
import LoginRegister from "../subpage/loginRegister/LoginRegister";
import useIsMobile from "../utils/useIsMobile";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import avatar from "../assets/images/fox.jpg";
import "./header.scss";

const Header = () => {
  const navigate = useNavigate();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [select, setSelect] = useState("");
  const [loading, setLoading] = useState(true);
  const isMobile = useIsMobile();
  const { user, isLoggedIn, logout } = useContext(AuthContext); // ✅ Dùng context
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const modalRef = useRef(null); // ✅ Tạo ref để theo dõi modal

  // ✅ Xử lý sự kiện click ra ngoài modal
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        handleCloseModal();
      }
    };

    if (isModalOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isModalOpen]);

  // ✅ Kiểm tra nếu click ngoài modal thì đóng
  const handleClickOutside = (event) => {
    if (modalRef.current && !modalRef.current.contains(event.target)) {
      handleCloseModal();
    }
  };

  const handleOpenModal = (type) => {
    setIsModalOpen(true);
    setSelect(type);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
  const headerClass = isMobile ? "header-top-mb" : "header-top-pc";

  return (
    <div className="header-container">
      {/* Header Content */}
      <div className={headerClass}>
        <div className={isMobile ? "logo-mobile" : "logo"}>
          <img src={logoImg} alt="logo" className="logo-img" />
        </div>
        <div className={isMobile || isLoggedIn ? "logo-mobile" : "slogan"}>
          <h2>MAKE YOUR DAY</h2>
        </div>
        {!isLoggedIn ? (
          <ButtonGroup
            onLogin={() => {
              handleOpenModal("login");
            }}
            onRegister={() => handleOpenModal("register")}
          />
        ) : (
          <>
            <div className="header-menu">
              <div className="aHeader-wrapper">
                <div className="aHeader-left" onClick={() => navigate("/user")}>
                  <div className="user-group">
                    <img src={avatar} alt="" />
                  </div>
                </div>
                <div className="aHeader-right">
                  {/* Danh sách icon */}
                  {[
                    {
                      icon: "fa-tachograph-digital",
                      text: "Dashboard",
                      link: "/dashboard",
                    },
                    { icon: "fa-house", text: "Trang chủ", link: "/" },
                    { icon: "fa-dice", text: "Games", link: "/" },
                  ].map((item, index) => (
                    <div
                      key={index}
                      className="background-icon"
                      onClick={() => navigate(item.link)}
                    >
                      <i className={`fa-solid ${item.icon}`}></i>
                      <div className="menu-title">{item.text}</div>
                    </div>
                  ))}
                  <div
                    className="background-icon"
                    onClick={handleLogout} // 🚀 Gọi hàm đăng xuất
                  >
                    <i className="fa-solid fa-arrow-right-from-bracket"></i>
                    <div className="menu-title">Đăng xuất</div>
                  </div>
                </div>
              </div>
            </div>
            <div className="welcome-text">Chào mừng đến với trang chủ 8Day</div>
          </>
        )}
      </div>
      {/* Modal */}
      {isModalOpen && (
        <LoginRegister onClick={handleCloseModal} select={select} />
      )}
    </div>
  );
};

// ✅ Component nhóm button để tránh lặp code
const ButtonGroup = ({ onLogin, onRegister }) => {
  const isMobile = useIsMobile();

  return (
    <div className="group-button" style={{ scale: isMobile ? ".7" : "1" }}>
      <div className="login-button" onClick={onLogin} data-text="Login">
        <span>Login</span>
      </div>
      <div
        className="register-button"
        onClick={onRegister}
        data-text="Register"
      ><span>Register</span></div>
    </div>
  );
};

export default Header;
