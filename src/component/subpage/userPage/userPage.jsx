import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { AuthContext } from "../../Context/AuthContext"; // ✅ Sửa lỗi import
import DepositForm from "./depositModal";
import WithdrawForm from "./withdrawModal";

const UserPage = () => {
  const { user, isLoggedIn } = useContext(AuthContext); // ✅ Lấy user từ context
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isShowModal, setIsShowModal] = useState("")

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

  if (!isLoggedIn) return <p>Bạn chưa đăng nhập.</p>;
  if (loading) return <p>Đang tải...</p>;
  if (error) return <p>{error}</p>;
  if (!userData) return <p>Không tìm thấy người dùng.</p>;

  const handleOnclose = () => {
    setIsShowModal(false)
  }

  return (
    <div className="p-4 max-w-md mx-auto bg-white shadow-lg rounded-lg">
      <h1 className="text-2xl font-bold">Thông tin người dùng</h1>
      <button className="me-2" onClick={() => setIsShowModal("deposite")}>
        Nạp tiền
      </button>
      <button className="me-2" onClick={() => setIsShowModal("withdraw")}>
        Rút tiền
      </button>
      <button className="me-2" onClick={() => setIsShowModal("giftcode")}>
        Gift code
      </button>
      <p>
        <strong>Avatar:</strong>
      </p>
      <p>
        <strong>ID:</strong> {userData.id}
      </p>
      <p>
        <strong>Tên:</strong> {userData.username}
      </p>
      <p>
        <strong>SĐT:</strong> {userData.phone}
      </p>
      <p>
        <strong>Điểm:</strong> {userData.point}
      </p>
      <p>
        <strong>Credit:</strong> {userData.credit}
      </p>
      {isShowModal === "deposite" && <DepositForm onClose={handleOnclose} />}
      {isShowModal === "withdraw" && <WithdrawForm onClose={handleOnclose} />}
      <p>
        <strong>Ngày tạo:</strong>{" "}
        {new Date(userData.createdAt).toLocaleDateString()}
      </p>
    </div>
  );
};

export default UserPage;
