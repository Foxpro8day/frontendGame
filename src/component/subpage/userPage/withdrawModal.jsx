import React, { useContext, useState } from "react";
import api from "../../../api/axiosConfig"; // ✅ Import axios đã config
import { AuthContext } from "../../Context/AuthContext"; // ✅ Lấy user từ context
import "./withdrawModal.scss";

const WithdrawForm = ({ onClose }) => {
  const { user, isLoggedIn } = useContext(AuthContext); // ✅ Lấy user đang đăng nhập
  const bankList = [
    { name: "Vietcombank" },
    { name: "Techcombank" },
    { name: "BIDV" },
    { name: "Agribank" },
    { name: "ACB" },
    { name: "Sacombank" },
  ];
  const [formData, setFormData] = useState({
    amount: "",
    bankName: "",
    accountNumber: "",
    accountName: user?.username || "", // ✅ Tự động điền tên người gửi
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  // Xử lý thay đổi input
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  // Xử lý submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để rút tiền!");
      return;
    }

    // Kiểm tra dữ liệu đầu vào
    if (!formData.amount || formData.amount <= 0) {
      setMessage("⚠️ Số tiền rút phải lớn hơn 0!");
      return;
    }
    if (
      !formData.bankName ||
      !formData.accountNumber ||
      !formData.accountName
    ) {
      setMessage("⚠️ Vui lòng nhập đầy đủ thông tin ngân hàng!");
      return;
    }

    setLoading(true);
    setMessage("");

    try {
      const response = await api.post("/user/withdraw", formData);
      setMessage(response.data.message || "✅ Yêu cầu rút tiền đã được gửi!");
      setFormData({
        amount: "",
        bankName: "",
        accountNumber: "",
        accountName: user?.username || "",
      });
    } catch (error) {
      setMessage("❌ Lỗi khi gửi yêu cầu rút tiền.");
      console.error("Withdraw error:", error);
    }

    setLoading(false);
  };

  return (
    <div className="withdraw-container">
      <div onSubmit={handleSubmit} className="space-y-3">
        <h2 className="text-2xl font-bold mb-4 text-center">Rút Tiền</h2>

        {message && (
          <p
            className={`text-center p-2 rounded ${
              message.includes("✅")
                ? "bg-green-100 text-green-700"
                : "bg-red-100 text-red-700"
            }`}
          >
            {message}
          </p>
        )}
        <label className="block">Số tiền:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className=" p-2 border rounded no-spinner"
          placeholder="Nhập số tiền cần rút"
        />

        <label className="block">Ngân hàng:</label>
        <input
          type="text"
          name="bankName"
          value={formData.bankName}
          onChange={handleChange}
          required
          className=" p-2 border rounded"
          placeholder="Tên ngân hàng"
        />

        <label className="block">Số tài khoản:</label>
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          onChange={handleChange}
          required
          className=" p-2 border rounded"
          placeholder="Số tài khoản nhận tiền"
        />

        <label className="block">Tên tài khoản:</label>
        <input
          type="text"
          name="accountName"
          value={formData.accountName}
          readOnly
          className=" p-2 border rounded "
        />

        <button
          type="submit"
          className={` py-2 mt-2 rounded text-white ${
            loading
              ? "bg-gray-500 cursor-not-allowed"
              : "bg-green-600 hover:bg-green-700"
          }`}
          disabled={loading}
        >
          {loading ? "Đang xử lý..." : "Xác nhận rút tiền"}
        </button>
      </div>
    </div>
  );
};

export default WithdrawForm;
