import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { toast } from "react-toastify";
import io from "socket.io-client";
import chibiImg from "../../assets/images/chibi2.png";
import { AuthContext } from "../../Context/AuthContext";
import { XImg } from "../../graphic/gLode";
import { Achievement, Main, Roll, Rolling } from "../../graphic/gPoker";
import "./poker.scss";

// Kết nối với server Socket.io
const socket = io(process.env.REACT_APP_URL_SITE, {
  withCredentials: true, // Nếu server yêu cầu gửi cookie
});

const Poker = ({ onClose }) => {
  const { user, isLoggedIn, logout } = useContext(AuthContext);
  const anonymousUser = {
    id: "anonymousUser",
    point: 0,
    // Thêm các thuộc tính khác nếu cần
  };
  const effectiveUser = user || anonymousUser;
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
  const [point, setPoint] = useState(effectiveUser.point || 0);

  const userId = effectiveUser.id;

  useEffect(() => {
    if (!userId) return;

    // Khi vào game, tham gia vào room riêng của user
    socket.emit("joinRoom", { userId });

    // Lắng nghe sự kiện cập nhật điểm số
    socket.on("updatePoint", (data) => {
      console.log("📩 Nhận update từ server:", data);
      setPoint(data.point); // Cập nhật điểm trên UI
    });

    return () => {
      // Cleanup khi component unmount
      socket.emit("leaveRoom", { userId });
      socket.off("updatePoint");
    };
  }, [userId]);

  useEffect(() => {
    if (isLoggedIn && effectiveUser) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isLoggedIn, effectiveUser]);

  const handleRoll = async () => {
    if (!isAuthenticated) {
      toast.error("Bạn chưa đăng nhập!");
      return;
    }

    setIsRolling(true);

    setTimeout(async () => {
      try {
        const response = await axios.post(
          `${process.env.REACT_APP_URL_SITE}/poker/spin`,
          {
            userId: effectiveUser.id, // Thay ID người dùng bằng giá trị thực tế
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
        console.error("Lỗi khi quay bài:", error.response.data);
      }

      setIsRolling(false);
    }, 3900); // Giả lập thời gian quay bài
  };

  return (
    <div>
      <Main
        type={isRolling ? "cardsBlur" : "cards"}
        cards={hand}
        isRolling={isRolling}
      />
      <div className="pr-mascot">
        <img src={chibiImg} />{" "}
      </div>
      <div className="pr-money">{point.toLocaleString("vi-VN")}</div>
      <XImg onClick={onClose} top={60} left={940} />

      <div className="pr-rolling">
        {isRolling ? <Rolling /> : <Roll onClick={handleRoll} />}
      </div>
      {showWinEffect && <div className="win-effect"></div>}
      {showWinEffect && <Achievement name={handRank} />}
    </div>
  );
};

export default Poker;
