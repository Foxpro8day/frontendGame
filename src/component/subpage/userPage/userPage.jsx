import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify"; // ✅ Import Toastify
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
  const [amount, setAmount] = useState("");
  const [selected, setSelected] = useState("option1");
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

  const handleTransfer = async () => {
    if (!amount || amount <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ.");
      return;
    }

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_URL_SITE}/user/transfer`,
        { userId: user.id, value: selected, amount: Number(amount) },
        { withCredentials: true }
      );

      alert(`Chuyển đổi thành công: ${response.data.message}`);
      window.location.reload();
    } catch (error) {
      alert(`Lỗi: ${error.response?.data?.error || "Có lỗi xảy ra."}`);
    }
  };

  const handleChange = (e) => {
    let value = e.target.value;
    let oldValue = amount; // Lưu giá trị trước khi thay đổi

    // Chỉ giữ số nguyên dương
    if (/[^0-9]/g.test(value)) {
      toast.warning("⚠️ Chỉ nhập số nguyên dương!", { autoClose: 2000 });
      value = value.replace(/[^0-9]/g, ""); // Xóa ký tự không hợp lệ
    }

    // Không cho phép số 0 ở đầu
    if (/^0+/.test(value)) {
      toast.warning("⚠️ Không được nhập số 0 ở đầu!", { autoClose: 2000 });
      value = value.replace(/^0+/, ""); // Xóa số 0 ở đầu
    }

    if (!value && oldValue) {
      toast.error("❌ Thông số không hợp lệ!", { autoClose: 2000 });
    }

    setAmount(value);
  };

  const clearInput = () => {
    setAmount("");
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
            <div>Thành viên: {user.role}</div>
            <div>Level: 1</div>
            <div>{user.username}</div>
          </div>
          <img src={avatarImg} />
          <div className="resources">
            <div className="info-wallet">
              <i class="fa-solid fa-vault me-2"></i>
              {userData.credit.toLocaleString("vi-VN")}
            </div>
            <div className="info-point">
              <i class="fa-solid fa-coins me-2"></i>
              {userData.point.toLocaleString("vi-VN")}
            </div>
          </div>
        </div>
        <div className="info-wrapper">
          {isShowModal === "info" ? (
            <div className="info-field">
              <div className="info-field-modal">
                <span onClick={backToMainMenu} className="back">
                  <i className="fa-solid fa-arrow-left me-2"></i>Back
                </span>
                <h4 className="user-title">Thông tin cá nhân</h4>

                <div className="">ID: {userData.id}</div>
                <div className="">Tên: {userData.username}</div>
                <div className="">SĐT: {userData.phone}</div>
                <div className="">Điểm: {userData.point}</div>
                <div className="">Credit: {userData.credit}</div>
                <div className="">
                  Ngày tạo: {new Date(userData.createdAt).toLocaleDateString()}
                </div>
              </div>
            </div>
          ) : isShowModal === "history" ? (
            <div className="info-field">
              <div className="info-field-modal">
                <span onClick={backToMainMenu} className="back">
                  <i className="fa-solid fa-arrow-left me-2"></i>Back
                </span>
                <h4 className="user-title">Lịch sử cược</h4>

                <div className="">Đang xây dựng</div>
              </div>
            </div>
          ) : isShowModal === "trans" ? (
            <div className="info-field2">
              <span onClick={backToMainMenu} className="back">
                <i className="fa-solid fa-arrow-left iconmodal"></i> Back
              </span>

              <div className="info-field-modal">
                <div className="conect8d-title">Đổi tiền game</div>
                <div className="conect8d-body">
                  <div className="p-money">
                    <div>
                      <i class="fa-solid fa-vault me-2"></i>Két hiện có:{" "}
                      {user.credit.toLocaleString("vi-VN")}
                    </div>
                    <div>
                      <i class="fa-solid fa-coins me-2"></i>Xu hiện có:{" "}
                      {user.point.toLocaleString("vi-VN")}
                    </div>
                    {/* Option 1 */}
                    <div className="group-tran1">
                      <input
                        className="trans-radio"
                        type="radio"
                        id="option1"
                        name="options"
                        value="option1"
                        checked={selected === "option1"}
                        onChange={(e) => setSelected(e.target.value)}
                      />
                      <label htmlFor="option1" className="radio-box">
                        <div className="content">
                          <div className="trans1">
                            <div className="trans-title">
                              Rút xu từ két
                              <i class="fa-solid fa-vault mx-2"></i>
                              <i class="fa-solid fa-arrow-right me-2"></i>
                              <i class="fa-solid fa-coins"></i>:
                            </div>
                          </div>
                        </div>
                      </label>
                    </div>
                    {/* Option 2 */}
                    <div className="group-tran1">
                      <input
                        className="trans-radio"
                        type="radio"
                        id="option2"
                        name="options"
                        value="option2"
                        checked={selected === "option2"}
                        onChange={(e) => setSelected(e.target.value)}
                      />
                      <label htmlFor="option2" className="radio-box">
                        <div className="content">
                          <div className="trans1">
                            <div className="trans-title">
                              Đưa Xu vào két
                              <i class="fa-solid fa-coins mx-2"></i>
                              <i class="fa-solid fa-arrow-right me-2"></i>
                              <i class="fa-solid fa-vault"></i>:
                            </div>
                          </div>
                        </div>
                      </label>
                      <div className="trans-input">
                        <input
                          className="trans-input"
                          type="text"
                          value={amount}
                          onChange={handleChange}
                        />
                        <i
                          class="fa-solid fa-check trans-check"
                          onClick={() => handleTransfer()}
                        ></i>
                        <i
                          class="fa-solid fa-x trans-x"
                          onClick={clearInput}
                        ></i>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
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
                className="fa-solid fa-arrow-left iconmodal"
                onClick={backToMainMenu}
              ></i>
              <div className="info-field-modal">
                <div className="conect8d-title">Liên kết tài khoản 8Day</div>
                <div className="conect8d-body">Liên kết tài khoản 8Day</div>
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
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("history")}
              >
                <span className="title">
                  <i className="fa-solid fa-clock-rotate-left me-2"></i>Lịch sử
                  cược
                </span>
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("trans")}
              >
                <span className="title">
                  <i className="fa-solid fa-money-bill-transfer me-2"></i>Đổi
                  tiền game
                </span>
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("deposite")}
              >
                <span className="title">
                  <i class="fa-solid fa-circle-dollar-to-slot me-2"></i>Nạp tiền
                </span>
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("withdraw")}
              >
                <span className="title">
                  <i className="fa-solid fa-hand-holding-dollar me-2"></i>Rút
                  tiền
                </span>
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("8dacc")}
              >
                <span className="title">
                  <i className="fa-solid fa-link me-2"></i>Liên kết tài khoản
                  8day
                </span>
              </div>
              <div
                className="info-field"
                onClick={() => setIsShowModal("contact")}
              >
                <span className="title">
                  <i className="fa-solid fa-headset me-2"></i>Hỗ trợ
                </span>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserPage;
