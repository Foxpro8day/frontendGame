import "bootstrap/dist/css/bootstrap.min.css";
import { useContext, useState, useRef, useEffect } from "react";
import { AuthContext } from "../Context/AuthContext"; // ✅ Import context
import logoImg from "../assets/images/logo126x60.png";
import headerVidMb from "../assets/videos/headermb.mp4";
import headerVidPc from "../assets/videos/headerpc.mp4";
import LoginRegister from "../subpage/loginRegister/LoginRegister";
import useIsMobile from "../utils/useIsMobile";
import "./header.scss";

const Header = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [select, setSelect] = useState("");
  const isMobile = useIsMobile();
  const { isLoggedIn, logout } = useContext(AuthContext); // ✅ Dùng context
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

  const videoSrc = isMobile ? headerVidMb : headerVidPc;
  const headerClass = isMobile ? "header-top-mb" : "header-top-pc";

  return (
    <div className="header-container">
      {/* Video Background */}
      <div className="header-video">
        <video
          src={videoSrc}
          autoPlay
          loop
          playsInline
          muted
          aria-hidden="true"
        ></video>
      </div>

      {/* Header Content */}
      <div className={headerClass}>
        <div className={isMobile ? "logo-mobile" : "logo"}>
          <img src={logoImg} alt="logo" className="logo-img" />
        </div>
        {!isLoggedIn ? (
          <ButtonGroup
            onLogin={() => {
              handleOpenModal("login");
            }}
            onRegister={() => handleOpenModal("register")}
          />
        ) : (
          <div className="welcome-text">Chào mừng đến với trang chủ 8Day</div>
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
