import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import avatarImg from "../../assets/images/fox.jpg";
import { AuthContext } from "../../Context/AuthContext"; // ✅ Sửa lỗi import
import DepositForm from "./depositModal";
import "./userPage.scss";
import WithdrawForm from "./withdrawModal";

const UserPage = () => {
  const { user, isLoggedIn, logout } = useContext(AuthContext); // ✅ Lấy user từ context
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShowModal, setIsShowModal] = useState("");
  const navigate = useNavigate();

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

  if (!isLoggedIn) {
    navigate("/");
    return null;
  }
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>Không tìm thấy người dùng.</p>;

  const backToMainMenu = () => {
    setIsShowModal(false);
  };

  const clickIcon = () => {
    navigate("/");
  };

  return (
    <div className="user-page-container ">
      <div className="user-page-wrapper">
        <div className="group-icon-userpage">
          <i className="fa-solid fa-house" onClick={clickIcon}></i>
          <i
            className="fa-solid fa-envelope"
            onClick={() => setIsShowModal("notification")}
          ></i>
          <i
            className="fa-solid fa-gear"
            onClick={() => setIsShowModal("config")}
          ></i>
          <i className="fa-solid fa-power-off" onClick={() => logout()}></i>
        </div>
        <div className="basic-info">
          <div className="info">
            <div>Level: 1</div>
            <div>Foxpro</div>
          </div>
          <img src={avatarImg} />
          <div className="resources">
            <div className="info-wallet">
              <i class="fa-solid fa-wallet me-2"></i>
              {userData.credit}
            </div>
            <div className="info-point">
              <i class="fa-solid fa-gem me-2"></i>
              {userData.point}
            </div>
          </div>
        </div>
        <div className="info-wrapper">
          {isShowModal === "info" ? (
            <div className="info-field">
              <div className="info-field-modal">
                <div className="">ID: {userData.id}</div>
                <div className="">Tên: {userData.username}</div>
                <div className="">SĐT: {userData.phone}</div>
                <div className="">Điểm: {userData.point}</div>
                <div className="">Credit: {userData.credit}</div>
                <div className="">
                  Ngày tạo: {new Date(userData.createdAt).toLocaleDateString()}
                </div>
              </div>
              <i
                className="fa-solid fa-arrow-left"
                onClick={backToMainMenu}
              ></i>
            </div>
          ) : isShowModal === "history" ? (
            <div className="info-field">
              <div className="info-field-modal">
                <div className="">Lịch sử cược</div>
              </div>
              <i
                className="fa-solid fa-arrow-left"
                onClick={backToMainMenu}
              ></i>
            </div>
          ) : isShowModal === "deposite" ? (
            <div className="info-field">
              <i
                className="fa-solid fa-arrow-left"
                onClick={backToMainMenu}
              ></i>
              <div className="info-field-modal">
                <DepositForm onClose={backToMainMenu} />
              </div>
            </div>
          ) : isShowModal === "withdraw" ? (
            <div className="info-field">
              <i
                className="fa-solid fa-arrow-left"
                onClick={backToMainMenu}
              ></i>
              <div className="info-field-modal">
                <WithdrawForm onClose={backToMainMenu} />
              </div>
            </div>
          ) : isShowModal === "8dacc" ? (
            <div className="info-field">
              <i
                className="fa-solid fa-arrow-left"
                onClick={backToMainMenu}
              ></i>
              <div className="info-field-modal">
                <WithdrawForm onClose={backToMainMenu} />
              </div>
            </div>
          ) : isShowModal === "contact" ? (
            <div className="info-field">
              <i
                className="fa-solid fa-arrow-left"
                onClick={backToMainMenu}
              ></i>
              <div className="info-field-modal">
                <WithdrawForm onClose={backToMainMenu} />
              </div>
            </div>
          ) : isShowModal === "notification" ? (
            <div className="info-field">
              <i
                className="fa-solid fa-arrow-left"
                onClick={backToMainMenu}
              ></i>
              <div className="info-field-modal">
                <div className="notifi">notification</div>
              </div>
            </div>
          ) : isShowModal === "config" ? (
            <div className="info-field">
              <i
                className="fa-solid fa-arrow-left"
                onClick={backToMainMenu}
              ></i>
              <div className="info-field-modal">
                <div className="config">config</div>
              </div>
            </div>
          ) : (
            <>
              <div
                className="info-field"
                onClick={() => setIsShowModal("info")}
              >
                <span className="title">
                  <i className="fa-solid fa-id-card me-2"></i>Thông tin cá nhân
                </span>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("history")}
              >
                <span className="title">
                  <i className="fa-solid fa-clock-rotate-left me-2"></i>Lịch sử
                  cược
                </span>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("deposite")}
              >
                <span className="title">
                  <i className="fa-solid fa-money-bill-transfer me-2"></i>Nạp
                  tiền
                </span>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("withdraw")}
              >
                <span className="title">
                  <i className="fa-solid fa-hand-holding-dollar me-2"></i>Rút
                  tiền
                </span>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("8dacc")}
              >
                <span className="title">
                  <i className="fa-solid fa-link me-2"></i>Liên kết tài khoản
                  8day
                </span>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("contact")}
              >
                <span className="title">
                  <i className="fa-solid fa-headset me-2"></i>Hỗ trợ
                </span>
                <i className="fa-solid fa-arrow-right"></i>
              </div>
            </>
          )}
        </div>
        {/* <button className="me-2" onClick={() => setIsShowModal("deposite")}>
          Nạp tiền
        </button>
        <button className="me-2" onClick={() => setIsShowModal("withdraw")}>
          Rút tiền
        </button>
        <button className="me-2" onClick={() => setIsShowModal("giftcode")}>
          Gift code
        </button> */}

        {/* {isShowModal === "deposite" && <DepositForm onClose={handleOnclose} />}
        {isShowModal === "withdraw" && <WithdrawForm onClose={handleOnclose} />} */}
      </div>
    </div>
  );
};

export default UserPage;
