import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { XImg } from "../../graphic/gLode";
import { Achievement, Main, Roll, Rolling } from "../../graphic/gPoker";
import "./poker.scss";

const Poker = ({ onClose }) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const [isRolling, setIsRolling] = useState(false);
  const [hand, setHand] = useState([
    "tenHearts",
    "jackHearts",
    "queenHearts",
    "kingHearts",
    "aceHearts",
  ]); // Mặc định 5 lá bài
  const [handRank, setHandRank] = useState(""); // Lưu hạng bài
  const [winAmount, setWinAmount] = useState(0); // Lưu số tiền thắng
  const [showWinEffect, setShowWinEffect] = useState(false); // ✅ State hiệu ứng
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isShowModalTransfer, setIsShowModalTranfer] = useState(false);
  const [option, setOption] = useState("1");
  const [amount, setAmount] = useState("");

  useEffect(() => {
    if (isLoggedIn && user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isLoggedIn, user]);

  const handleRoll = async () => {
    if (!isAuthenticated) return;

    setIsRolling(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL_SITE}/poker/spin`,
          {
            userId: user.id, // Thay ID người dùng bằng giá trị thực tế
            betAmount: 1000, // Giá trị cược
          }
        );

        const { spinResult, handRank, winAmount } = response.data;
        const names = spinResult.map((card) => card.name);
        console.log(response.data);
        setHand(names);
        setHandRank(handRank);
        setWinAmount(winAmount);

        // ✅ Nếu không phải "NoWin", kích hoạt hiệu ứng
        if (handRank !== "NoWin") {
          setShowWinEffect(true);
          setTimeout(() => setShowWinEffect(false), 2000); // Ẩn sau 2 giây
        }
      } catch (error) {
        console.error("Lỗi khi quay bài:", error);
      }

      setIsRolling(false);
    }, 3900); // Giả lập thời gian quay bài
  };

  const handleModalTransfer = () => {
    setIsShowModalTranfer(!isShowModalTransfer);
  };
  
  const handleTransfer = async () => {
    if (!amount || amount <= 0) {
      alert("Vui lòng nhập số tiền hợp lệ.");
      return;
    }

    try {
      const response = await axios.post(
        "https://your-server.com/api/transfer",
        { value: option, amount: Number(amount) },
        { withCredentials: true }
      );

      alert(`Chuyển đổi thành công: ${response.data.message}`);
    } catch (error) {
      alert(`Lỗi: ${error.response?.data?.error || "Có lỗi xảy ra."}`);
    }
  };

  return (
    <div>
      <Main
        type={isRolling ? "cardsBlur" : "cards"}
        cards={hand}
        isRolling={isRolling}
      />
      <XImg onClick={onClose} top={60} left={940} />
      <div className="p-money">
        <div className="diamond">
          <i class="fa-regular fa-gem me-2"></i>
          {user.point}
        </div>
        <i
          class="fa-solid fa-arrow-right-arrow-left arrow-updown"
          onClick={handleModalTransfer}
        ></i>{" "}
        <div className="diamond">
          <i class="fa-solid fa-leaf me-2"></i>
          {user.point}
        </div>
      </div>
      <div className="pr-rolling">
        {isRolling ? <Rolling /> : <Roll onClick={handleRoll} />}
      </div>
      {showWinEffect && <div className="win-effect"></div>}
      {showWinEffect && <Achievement name={handRank} />}
      {console.log(isShowModalTransfer)}
      {isShowModalTransfer && (
        <>
          <div className="modal-transfer">
            <label for="options">Đổi tiền</label>
            <select
              id="options"
              value={option}
              onChange={(e) => setOption(e.target.value)}
            >
              <option value="1">Lá đổi kim cương</option>
              <option value="2">Kim cương đổi lá</option>
            </select>
            <div className="tf-source">
              <input
                className=""
                type="number"
                min="1"
                step="1"
                value={amount}
                onChange={(e) =>
                  setAmount(e.target.value.replace(/[^0-9]/g, ""))
                }
              ></input>

              <i class="fa-solid fa-check" onClick={() => handleTransfer()}></i>
              <i
                class="fa-solid fa-xmark ms-3"
                onClick={() => setIsShowModalTranfer(false)}
              ></i>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Poker;
