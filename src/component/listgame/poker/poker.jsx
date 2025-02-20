import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../Context/AuthContext";
import { Main, Roll, Rolling } from "../../graphic/gPoker";
import {XImg} from "../../graphic/gLode"

const Poker = ({onClose}) => {
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
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    if (isLoggedIn && user) {
      setIsAuthenticated(true);
    } else {
      setIsAuthenticated(false);
    }
  }, [isLoggedIn, user]);

  const nameAchievement = (result) => {
    switch (result) {
      case "Two Pair":
        return "Hai đôi";
      case "Full House":
        return "Cù lũ";
      case "Royal Flush":
        return "Thùng phá sảnh hoàng gia";
      default:
        return result;
    }
  };

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
        const names = spinResult.map(card => card.name)
        console.log(names)
        setHand(names);
        setHandRank(handRank);
        setWinAmount(winAmount);
      } catch (error) {
        console.error("Lỗi khi quay bài:", error);
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
      <XImg onClick={onClose} top={60} left={940} />
      <div className="pr-rolling">
        {isRolling ? <Rolling /> : <Roll onClick={handleRoll} />}
      </div>
      {/* <Achievement name={"fullHouse"} /> */}
    </div>
  );
};

export default Poker;
