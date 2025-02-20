import { useContext, useEffect, useState } from "react";
import api from "../../../api/axiosConfig";
import { AuthContext } from "../../Context/AuthContext"; // ✅ Import AuthContext
const DepositForm = ({ onClose }) => {
  const { user, isLoggedIn } = useContext(AuthContext); // ✅ Lấy thông tin user từ context
  const [banks, setBanks] = useState([]);
  const [selectedBank, setSelectedBank] = useState("");
  const [formData, setFormData] = useState({
    accountNumber: "",
    accountName: "",
    branch: "",
    amount: "",
    sender: user?.username || "", // ✅ Lấy tên user từ context
    note: "",
  });

  // Fetch danh sách ngân hàng từ API khi component mount
  useEffect(() => {
    api
      .get("/user/deposit-info") // ✅ Thêm URL API đầy đủ
      .then((response) => {
        setBanks(response.data);
      })
      .catch((error) => {
        console.error("Error fetching deposit data:", error);
      });
  }, []);

  // Khi user đăng nhập, cập nhật người gửi
  useEffect(() => {
    if (isLoggedIn && user?.username) {
      setFormData((prevData) => ({
        ...prevData,
        sender: user.username,
      }));
    }
  }, [user, isLoggedIn]);

  // Xử lý chọn ngân hàng
  const handleBankChange = (event) => {
    const bank = banks.find((bank) => bank.bankName === event.target.value);
    setSelectedBank(event.target.value);
    if (bank) {
      setFormData((prevData) => ({
        ...prevData,
        accountNumber: bank.accountNumber,
        accountName: bank.accountName,
        branch: bank.branch,
      }));
    }
  };

  // Xử lý nhập dữ liệu form
  const handleChange = (event) => {
    setFormData({ ...formData, [event.target.name]: event.target.value });
  };

  // Xử lý submit form
  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!isLoggedIn) {
      alert("Bạn cần đăng nhập để nạp tiền!");
      return;
    }

    try {
      const response = await api.post(
        "/user/deposit",
        formData,
        { withCredentials: true } // ✅ Gửi cookie
      );
      alert(response.data.message || "Yêu cầu nạp tiền đã được gửi!");
    } catch (error) {
      console.error("Error submitting deposit:", error);
      alert("Lỗi khi gửi yêu cầu nạp tiền.");
    }
  };

  return (
    <div className="deposite-container">
      <div onSubmit={handleSubmit} className="">
        {/* <XImg left={330} onClick={onClose} /> */}
        <h2 className="text-2xl font-bold mb-4 text-center">Nạp Tiền</h2>
        {/* Chọn ngân hàng */}
        <label className="block">Chọn ngân hàng:</label>
        <select
          name="bankName"
          value={selectedBank}
          onChange={handleBankChange}
          required
          className="p-2 border rounded"
        >
          <option value="">-- Chọn ngân hàng --</option>
          {banks.map((bank, index) => (
            <option key={index} value={bank.bankName}>
              {bank.bankName}
            </option>
          ))}
        </select>

        {/* Số tài khoản */}
        <label className="block">Số tài khoản:</label>
        <input
          type="text"
          name="accountNumber"
          value={formData.accountNumber}
          readOnly
          className="p-2  mt-2 "
        />

        {/* Tên tài khoản */}
        <label className="block">Tên tài khoản:</label>
        <input
          type="text"
          name="accountName"
          value={formData.accountName}
          readOnly
          className=" p-2   "
        />

        {/* Chi nhánh */}
        <label className="block">Chi nhánh:</label>
        <input
          type="text"
          name="branch"
          value={formData.branch}
          readOnly
          className=" p-2   "
        />

        {/* Số tiền */}
        <label className="block">Số tiền:</label>
        <input
          type="number"
          name="amount"
          value={formData.amount}
          onChange={handleChange}
          required
          className=" p-2 border rounded"
        />

        {/* Người gửi */}
        <label className="block">Người gửi:</label>
        <input
          type="text"
          name="sender"
          value={formData.sender}
          readOnly
          className=" p-2 border rounded "
        />

        {/* Ghi chú */}
        <label className="block">Ghi chú:</label>
        <input
          name="note"
          value={formData.note}
          onChange={handleChange}
          className=" p-2 border rounded"
        ></input>

        {/* Nút nạp tiền */}
        <button type="submit" className=" text-white py-2 mt-2">
          Xác nhận nạp tiền
        </button>
      </div>
    </div>
  );
};

export default DepositForm;
