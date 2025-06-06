import { useContext, useEffect, useState } from "react";

import musicOffImg from "../../assets/images/music-off.svg";
import musicOnImg from "../../assets/images/music-on.svg";
import {
  UserInfo,
  BgInsImg,
  ChatInfoImg,
  ChibiImg,
  LoseImg,
  PointImg,
  TimerImg,
  WinImg,
} from "../../graphic/gOther";
import {
  Aura,
  BetAura,
  BetButton,
  Cloud,
  Cloud2,
  Deck,
  Disc,
  Flower,
  Lantern,
  RedEvt,
  Sf1,
  Sf2,
  Sf3,
  Sf4,
  Sf5,
  Sf6,
  TaiIcon,
  Tree,
  XiuIcon,
} from "../../graphic/gTaiXiu";
import { XdI, XdX } from "../../graphic/gXocDia";
import avatar from "../../assets/images/fox.jpg";
import socket from "../../socket/socket";
import LogicDice from "../../utils/diceLogic";
import { SoundContext } from "../../utils/soundEffect";
import DiceRoller from "./flipDices";
import "./taixiumini.scss";
import { AuthContext } from "../../Context/AuthContext";

const TaixiuMini = ({ title, onClose }) => {
  const [selectedBet, setSelectedBet] = useState(null); // "Tài" hoặc "Xỉu"
  const [countdown, setCountdown] = useState(0); // Đếm ngược thời gian
  const [gameStage, setGameStage] = useState("waiting"); // Trạng thái game: 'waiting', 'betting', 'rolling', 'finish'
  const [discClass, setDiscClass] = useState(""); // Quản lý lớp CSS
  const [isHidden, setIsHidden] = useState(true); // Trạng thái ẩn ban đầu
  const [isShowIntructor, setIsShowIntructor] = useState(false);
  const [conversation, setConversation] = useState("");

  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isMusicOn, setIsMusicOn] = useState(true);

  const { playSound, stopSound, pauseSound } = useContext(SoundContext);

  const chat = {
    // 1: "8DAY-ĐẦU TƯ LỘC PHÁT",
    1: "Bắt đầu đặt cược",
    2: "Hết giờ đặt cược",
    3: "Ván mới bắt đầu trong...",
  };
  const { user } = useContext(AuthContext);

  useEffect(() => {
    if (user) {
      console.log("👤 User hiện tại:", user);
    }
  }, [user]);

  useEffect(() => {
    if (!isSoundOn) return;

    // Phát âm thanh đồng hồ đếm ngược
    if (gameStage === "betting" && countdown <= 5 && countdown > 0) {
      playSound("clockTick");
    }

    // Phát âm thanh khi mở đĩa
    if (gameStage === "rolling" && countdown === 5) {
      playSound("plateRemove");
    }

    // Phát âm thanh xúc xắc bay
    if (gameStage === "rolling" && countdown === 3) {
      playSound("dicesFlying");
    }

    // Phát âm thanh xúc xắc vào bát
    if (gameStage === "rolling" && countdown === 2) {
      playSound("rollingTX");
    }

    // Phát âm thanh khi kết thúc - thắng/thua
    if (gameStage === "finish") {
      if (selectedBet === null) {
        return;
      }
      if (gameResult === selectedBet && countdown === 9) {
        playSound("win");
      } else if (gameResult !== selectedBet && countdown === 9) {
        playSound("lose");
      }
    }
  }, [gameStage, countdown, selectedBet, isMusicOn]);

  // Xử lý khi chọn "Tài" hoặc "Xỉu"
  const handleBet = (bet) => {
    if (gameStage === "betting") {
      if (isSoundOn) {
        playSound("select4");
      }
      setSelectedBet(bet);
    }
  };

  const handleMusic = () => {
    if (isMusicOn) {
      pauseSound("bgSound"); // Dừng âm thanh nền
    } else {
      playSound("bgSound", { loop: true, volume: 0.5 }); // Phát âm thanh nền
    }
    setIsMusicOn(!isMusicOn); // Đảo trạng thái
  };

  const handleSound = () => {
    setIsSoundOn((prev) => !prev);
  };

  useEffect(() => {
    if (isMusicOn) {
      stopSound("bgSound");
      playSound("bgSound", { loop: true, volume: 0.5 });
    } else {
      pauseSound("bgSound");
    }
  }, []);

  useEffect(() => {
    if (gameStage === "waiting") {
      // Đợi 1 giây trước khi hiển thị
      const timer = setTimeout(() => {
        setIsHidden(false);
      }, 1000);

      // Xóa timeout nếu gameStage thay đổi trước khi 1 giây hoàn tất
      return () => clearTimeout(timer);
    } else {
      // Reset lại trạng thái khi rời khỏi waiting
      setIsHidden(true);
    }
  }, [gameStage]); // Theo dõi gameStage

  const handleIicon = () => {
    setIsShowIntructor(true);
  };

  const onHide = () => {
    setIsShowIntructor(false);
  };

  // useEffect từ socket io
  const [currentRound, setCurrentRound] = useState(1);
  const [gameResult, setGameResult] = useState(null);
  const [diceValues, setDiceValues] = useState(null);
  // const [gameStage, setGameStage] = useState(null)
  const [playersTai, setPlayersTai] = useState(0);
  const [moneyTai, setMoneyTai] = useState(0);
  const [playersXiu, setPlayersXiu] = useState(0);
  const [moneyXiu, setMoneyXiu] = useState(0);
  const [dice, setDice] = useState([Sf1, Sf1, Sf1]); // Lưu component xúc xắc

  // Bảng ánh xạ số sang component
  const diceMap = {
    1: Sf1,
    2: Sf2,
    3: Sf3,
    4: Sf4,
    5: Sf5,
    6: Sf6,
  };

  // Quản lý các giai đoạn game
  useEffect(() => {
    if (gameStage === "rolling" && countdown === 3) {
      setDiscClass("disc-effect-in"); // Thêm lớp
    }
    if (gameStage === "finish") {
      setDiscClass("disc-effect-out"); // Thêm lớp
    }
  }, [countdown, gameStage]);

  useEffect(() => {
    socket.on("round_update_taixiu", (data) => {
      // console.log("🔥 Cập nhật từ server:", data);
      setCurrentRound(data.round);
      setGameStage(data.gameStage);
      setGameResult(data.result);
      setDiceValues({
        dice1: data.dice1,
        dice2: data.dice2,
        dice3: data.dice3,
        total: data.total,
      });
      setCountdown(data.countdown);
      setPlayersTai(data.bets.tai.players); // ✅ Nhận số người chơi Tài
      setMoneyTai(data.bets.tai.money); // ✅ Nhận tiền cược Tài
      setPlayersXiu(data.bets.xiu.players); // ✅ Nhận số người chơi Xỉu
      setMoneyXiu(data.bets.xiu.money); // ✅ Nhận tiền cược Xỉu

      setDice([diceMap[data.dice1], diceMap[data.dice2], diceMap[data.dice3]]);
    });

    return () => {
      socket.off("round_update");
    };
  }, []);

  const handleClose = () => {
    onClose();
    stopSound("bgSound");
  };

  useEffect(() => {
    if (gameStage === "betting") {
      setConversation(chat[1]);
      if (countdown <= 5) {
        setConversation(chat[2]);
      }
    }
    if (gameStage === "waiting") {
      setConversation(chat[3]);
    }
  }, [gameStage, countdown]);

  return (
    <div className="modal-game">
      {/* {console.log(gameStage)} */}
      <ChibiImg top="-232px" left="650px" />
      {/* <span ref={textRef}></span> */}
      <Deck
        textMoneyLeft={moneyXiu?.toLocaleString("vi-VN") || 0}
        textMoneyRight={moneyTai?.toLocaleString("vi-VN") || 0}
      />
      {/* <DeckTitle /> */}
      {/* <Tree /> */}
      {/* <Lantern /> */}
      {/* <Flower /> */}
      {/* <Cloud /> */}
      {/* <RedEvt /> */}
      <PointImg
        className="point"
        text={diceValues?.total || 3}
        top="410px"
        left="655px"
      />
      {gameStage === "finish" &&
        (gameResult === "Tài" ? <Aura right /> : <Aura left />)}
      <TaiIcon
        className={`taiIcon ${gameResult === "Tài" ? "aura" : ""}`}
        textPlayerTai={playersTai ? playersTai : 0}
      />
      <XiuIcon
        className={`xiuIcon ${gameResult === "Xỉu" ? "aura" : ""}`}
        textPlayerXiu={playersXiu ? playersXiu : 0}
      />
      {gameStage === "betting" ||
      gameStage === "rolling" ||
      gameStage === "finish" ? (
        <div className="betting-options">
          <BetAura
            areaRight
            className={`${selectedBet === "Tài" ? "betAura" : "hidden"}`}
          />
          <BetAura
            areaLeft
            className={`${selectedBet === "Xỉu" ? "betAura" : "hidden"}`}
          />
          <BetButton
            areaLeft
            textLeft
            className={` ${
              selectedBet === null
                ? ""
                : selectedBet === "Tài"
                ? "dimed"
                : "selectedBet"
            }`}
            onClick={() => handleBet("Xỉu")}
          />

          <BetButton
            areaRight
            textRight
            className={` ${
              selectedBet === null
                ? ""
                : selectedBet === "Xỉu"
                ? "dimed"
                : "selectedBet"
            }`}
            onClick={() => handleBet("Tài")}
          />
        </div>
      ) : (
        <div className="betting-options">
          <BetButton areaLeft textLeft />
          <BetButton areaRight textRight />
        </div>
      )}
      <>
        <TimerImg
          className="countdown"
          text={countdown}
          top="450px"
          left="322px"
        />
      </>

      {gameStage === "rolling" && countdown <= 3 && (
        <div className="dice-rolling-time">
          <DiceRoller x={200} y={500} />
          <DiceRoller x={100} y={420} />
          <DiceRoller x={150} y={350} />
        </div>
      )}
      {gameStage !== "rolling" && (
        <div className="tx-dice-area">
          <LogicDice
            dice3={dice[0]}
            dice2={dice[1]}
            dice1={dice[2]}
            w={230}
            h={230}
            diceSize={75}
          />
        </div>
      )}

      <Disc className={discClass} />

      <ChatInfoImg
        className="tx-text"
        top="-60px"
        left="430px"
        scale="2"
        text={`${conversation} ${
          gameStage === "waiting" ? countdown : ""
        }`.trim()}
      />

      {gameStage === "finish" &&
        (selectedBet === null ? null : gameResult === selectedBet ? (
          <WinImg bottom={0} left={225} />
        ) : (
          <LoseImg bottom={0} left={225} />
        ))}
      <div className="media-controller">
        <div className="tx-sound-icon" onClick={() => handleMusic()}>
          {isMusicOn ? (
            <i className="fa-solid fa-volume-high me-3"></i>
          ) : (
            <i className="fa-solid fa-volume-xmark me-3"></i>
          )}
        </div>
        <div className="tx-music-icon" onClick={() => handleSound()}>
          {" "}
          {isSoundOn ? <img src={musicOnImg} /> : <img src={musicOffImg} />}
        </div>
      </div>

      {isShowIntructor ? (
        <BgInsImg top="150px" left="305px" gameName="tx" onClick={onHide} />
      ) : (
        <></>
      )}
      <XdI top="60px" left="10px" onClick={handleIicon} />
      <XdX top="60px" right="10px" onClick={handleClose} />
      {/* <Cloud2 /> */}
      <UserInfo top="500px" left="0px" />
      {
        <div className="user-wrapper">
          <div className="user-info">
            <img
              src={user?.avatar || avatar} // avatar là ảnh mặc định đã import sẵn
              alt="Avatar"
              onError={(e) => {
                e.target.onerror = null; // Ngăn vòng lặp nếu ảnh fallback cũng lỗi
                e.target.src = avatar; // Gán ảnh mặc định nếu ảnh chính lỗi
              }}
            />
          </div>
          <div className="user-balance">
            <div className="username">{user?.username || "Khách"}</div>
            <div>Balance:{" "}
              {user?.balance ? user.balance.toLocaleString("vi-VN") : 0} VND
            </div>
          </div>
        </div>
      }
    </div>
  );
};

export default TaixiuMini;
