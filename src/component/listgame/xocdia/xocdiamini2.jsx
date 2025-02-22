import { useEffect, useRef, useState } from "react";
import io from "socket.io-client";
import bgSound from "../../assets/audio/bgSound.mp3";
import clockSound from "../../assets/audio/clockTicking.m4a";
import diceFlying from "../../assets/audio/dicesFlying.m4a";
import loseSound from "../../assets/audio/lose.m4a";
import beginSound from "../../assets/audio/readyGo.m4a";
import dicesInBowl from "../../assets/audio/RollingTX.m4a";
import xdRoll from "../../assets/audio/RollingXD.m4a";
import selectedSound from "../../assets/audio/select4.m4a";
import winSound from "../../assets/audio/win.m4a";
import {
  BeginImg,
  BgInsImg,
  ChatInfoImg,
  ChibiImg,
  LoseImg,
  ReplayImg,
  TimerImg,
  WinImg,
} from "../../graphic/gOther";
import {
  Xd12,
  XdAura3Red,
  XdAura3White,
  XdAura4Red,
  XdAura4White,
  Xdbanhchung,
  XdBowl,
  XdCanhdao,
  XdChan,
  XdChanAura,
  XdDisc,
  XdI,
  XdLantern,
  XdLe,
  XdLeAura,
  XdMai,
  XdTable,
  XdX,
  XdXudo,
  XdXutrang,
} from "../../graphic/gXocDia";

import CoinLogic from "./coinLogic";
import "./xocdiamini.scss";

const XocdiaMini = ({ title, onClose }) => {
  const socket = io(process.env.REACT_APP_URL_SITE);
  const [gameState, setGameState] = useState({});
  const [countdown, setCountdown] = useState(0);
  const [selectedBet, setSelectedBet] = useState(null);
  const [isShowInstructor, setIsShowInstructor] = useState(false);
  const [bets, setBets] = useState({});
  const [result, setResult] = useState("");
  const [dices, setDices] = useState([]);
  const [round, setRound] = useState(1);

  const [gameStage, setGameStage] = useState("firstTime"); // Trạng thái game: 'waiting', 'betting', 'rolling', 'finish'
  const [chip, setChip] = useState([0, 1, 0, 1]);
  const [result1, setResult1] = useState(null); // Kết quả game 1
  const [result2, setResult2] = useState(null); // Kết quả game 2
  const [history, setHistory] = useState([
    XdXudo,
    XdXutrang,
    XdXudo,
    XdXutrang,
  ]); // Lịch sử các ván
  const [selectedBet1, setSelectedBet1] = useState(null); // Chẵn hoặc Lẻ
  const [selectedBet2, setSelectedBet2] = useState(null); // Đỏ/Trắng 3 hoặc 4
  const [isHidden, setIsHidden] = useState(true); // Trạng thái ẩn ban đầu
  const [isShowIntructor, setIsShowIntructor] = useState(false);

  //sound
  const [isSoundOn, setIsSoundOn] = useState(true);
  const bgAudioRef = useRef(null);
  const beginRef = useRef(null);
  const clockRef = useRef(null);
  const selectRef = useRef(null);
  const dflying = useRef(null);
  const dInBowl = useRef(null);
  const plateRef = useRef(null);
  const winRef = useRef(null);
  const loseRef = useRef(null);

  // Tạo các cờ để đảm bảo âm thanh chỉ phát một lần
  const hasPlayed = useRef({
    begin: false,
    clock: false,
    plate: false,
    flying: false,
    inBowl: false,
    win: false,
    lose: false,
  });

  useEffect(() => {
    // Phát âm thanh khi bắt đầu ván cược
    if (
      gameStage === "betting" &&
      countdown === 5 &&
      !hasPlayed.current.begin
    ) {
      playSound(beginRef);
      hasPlayed.current.begin = true;
    }

    // Phát âm thanh đồng hồ đếm ngược
    if (
      gameStage === "betting" &&
      countdown <= 5 &&
      countdown > 0 &&
      !hasPlayed.current.clock
    ) {
      playSound(clockRef);
      hasPlayed.current.clock = true;
    }

    // Phát âm thanh khi mở đĩa
    if (gameStage === "rolling" && !hasPlayed.current.plate) {
      if (countdown === 3) {
        playSound(plateRef);
      }
      if (countdown === 2) {
        playSound(plateRef);
      }
      if (countdown === 1) {
        playSound(plateRef);
      }
    }

    // Phát âm thanh khi kết thúc - thắng/thua
    if (gameStage === "finish") {
      if (
        (result1 === selectedBet1 || result2 === selectedBet2) &&
        !hasPlayed.current.win
      ) {
        playSoundWinLose(winRef);
        hasPlayed.current.win = true;
      } else if (
        result1 !== selectedBet1 &&
        result2 !== selectedBet2 &&
        !hasPlayed.current.win
      ) {
        playSoundWinLose(loseRef);
        hasPlayed.current.lose = true;
      }
    }

    // Reset cờ khi ván mới bắt đầu
    if (gameStage === "waiting") {
      hasPlayed.current = {
        begin: false,
        clock: false,
        plate: false,
        flying: false,
        inBowl: false,
        win: false,
        lose: false,
      };
    }
  }, [gameStage, countdown, result1, result2, selectedBet1, selectedBet2]);

  // conversation
  const conversation = (num) => {
    switch (num) {
      case 1:
        return "Bắt đầu đặt cược";
      case 2:
        return "Hết giờ đặt cược";
      case 3:
        return "Ban đã cược Chẵn";
      case 4:
        return "Ban đã cược Lẻ";
      case 5:
        return "Chúc mừng, Winner";
      case 6:
        return "May mắn lần sau";
      case 7:
        return "8DAY-ĐẦU TƯ LỘC PHÁT";
      default:
        return "";
    }
  };

  // Hàm xử lý chọn Chẵn/Lẻ
  const handleBet1 = (bet) => {
    if (gameStage === "betting") {
      playSound(selectRef);
      setSelectedBet1(bet);
      console.log(`Bạn đã chọn cược 1: ${bet}`);
    }
  };

  // Hàm xử lý chọn Đỏ/Trắng 3 hoặc 4
  const handleBet2 = (bet) => {
    if (gameStage === "betting") {
      playSound(selectRef);
      setSelectedBet2(bet);
      console.log(`Bạn đã chọn cược 2: ${bet}`);
    }
  };

  // Xuất console khi cả hai cược hoàn tất
  useEffect(() => {
    if (selectedBet1 && selectedBet2) {
      console.log(`Vé cược hoàn chỉnh: (${selectedBet1}, ${selectedBet2})`);
    }
  }, [selectedBet1, selectedBet2]);

  // Bảng ánh xạ số sang component
  const diceMap = {
    0: XdXudo,
    1: XdXutrang,
  };
  // Hàm random xu
  const flipCoins = () => {
    return [1, 2, 3, 4].map(() => (Math.random() < 0.5 ? 0 : 1)); // 0: xấp, 1: ngửa
  };

  // Hàm tính kết quả
  const getResult = (coins) => {
    const totalPoints = coins.reduce((acc, value) => acc + value, 0);
    return totalPoints % 2 === 0 ? "XdChan" : "XdLe";
  };

  // Xử lý khi bấm nút bắt đầu
  const startGame = () => {
    playSound(selectRef);
    setGameStage("betting");
    setCountdown(5); // Thời gian cho phép chọn "Chẵn" hoặc "lẻ"
  };

  // Cập nhật countdown và trạng thái game
  useEffect(() => {
    let timer;
    if (gameStage === "betting" || gameStage === "rolling") {
      timer = setInterval(() => {
        setCountdown((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [gameStage]);

  // Quản lý các giai đoạn game
  useEffect(() => {
    if (countdown === 0) {
      if (gameStage === "betting") {
        setGameStage("rolling");
        setCountdown(5); // Thời gian chờ để roll xúc xắc
      } else if (gameStage === "rolling") {
        const flippedCoins = flipCoins();
        const mappedHistory = flippedCoins.map((value) => diceMap[value]);
        const finalResult = getResult(flippedCoins);
        setChip(flippedCoins);
        setHistory(mappedHistory);
        setResult1(finalResult);
        setResult2(
          calcResult2(
            flippedCoins[0],
            flippedCoins[1],
            flippedCoins[2],
            flippedCoins[3]
          )
        );
        setGameStage("finish");
        setCountdown(0); // Thời gian chờ để hiển thị kết quả
      }
    }
  }, [countdown, gameStage]);

  const handlePlayAgain = () => {
    playSound(selectRef);
    setSelectedBet1(null);
    setSelectedBet2(null);
    setResult1(null); // Đặt lại kết quả
    setGameStage("waiting"); // Quay lại trạng thái waiting
    setCountdown(0); // Bắt đầu đếm ngược lại
  };

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

  const getBowlClass = (stage) => {
    switch (stage) {
      case "firstTime":
      case "finish":
        return "xd-bowl-mo";
      case "betting":
      case "waiting":
        return "xd-bowl-dong";
      default:
        return "";
    }
  };

  // final result
  const calcResult2 = (chip1, chip2, chip3, chip4) => {
    const totalChip = chip1 + chip2 + chip3 + chip4;
    switch (totalChip) {
      case 0:
        return "Xd4Red";
      case 1:
        return "Xd3Red";
      case 2:
        return "XdDraw";
      case 3:
        return "Xd3White";
      case 4:
        return "Xd4White";
    }
  };

  const renderResultComponent1 = (result1) => {
    switch (result1) {
      case "XdChan":
        return <XdChanAura className="aura-blink" />;
      case "XdLe":
        return <XdLeAura className="aura-blink" />;
      default:
        return <></>;
    }
  };

  const renderResultComponent2 = (result2) => {
    switch (result2) {
      case "Xd4Red":
        return (
          <div className="xd-4-red">
            <XdAura4Red className="aura-blink" />
          </div>
        );
      case "Xd3Red":
        return (
          <div className="xd-3-red">
            <XdAura3Red className="aura-blink" />
          </div>
        );

      case "XdDraw":
        return <></>;
      case "Xd3White":
        return (
          <div className="xd-3-white">
            <XdAura3White className="aura-blink" />
          </div>
        );
      case "Xd4White":
        return (
          <div className="xd-4-white">
            <XdAura4White className="aura-blink" />
          </div>
        );
      default:
        return <></>;
    }
  };

  const handleSound = () => {
    if (isSoundOn) {
      bgAudioRef.current.pause(); // Dừng âm thanh nền
    } else {
      bgAudioRef.current.play(); // Phát âm thanh nền
    }
    setIsSoundOn(!isSoundOn); // Đảo trạng thái
  };

  useEffect(() => {
    if (bgAudioRef.current) {
      bgAudioRef.current.volume = 0.3; // Thiết lập âm lượng
      if (isSoundOn) {
        bgAudioRef.current.play();
      } else {
        bgAudioRef.current.pause();
      }
    }
  }, [isSoundOn]);

  const playSound = (ref) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.play();
    }
  };

  const playSoundWinLose = (ref) => {
    if (ref.current) {
      ref.current.volume = 0.3;
      ref.current.currentTime = 0;
      ref.current.play();
    }
  };

  const handleIicon = () => {
    setIsShowIntructor(true);
  };

  const onHide = () => {
    setIsShowIntructor(false);
  };

  // ✅ Nhận dữ liệu từ backend thông qua Socket.IO
  // useEffect(() => {
  //   socket.on("round_update_xocdia", (data) => {
  //     console.log(data);
  //     setBets(data.bets);
  //     setResult(data.result);
  //     setRound(data.round);
  //     setDices(data.coinFaces);
  //     setGameState(data);
  //     setCountdown(data.countdown);
  //   });

  //   return () => {
  //     socket.off("round_update_xocdia");
  //   };
  // }, []);

  // useEffect(() => {
  //   if (gameState.gameStage === "betting" && countdown <= 5) {
  //     playSound(clockRef);
  //   }

  //   if (gameState.gameStage === "rolling" && countdown <= 3) {
  //     playSound(plateRef);
  //   }

  //   if (gameState.gameStage === "finish") {
  //     if (selectedBet === gameState.result) {
  //       playSound(winRef);
  //     } else {
  //       playSound(loseRef);
  //     }
  //   }
  // }, [gameState, countdown]);

  const handleBet = (bet) => {
    if (gameState.gameStage === "betting") {
      setSelectedBet(bet);
    }
  };

  return (
    <>
      <div className="modal-game">
        <XdTable />
        <ChibiImg top="-248px" left="660px" />
        <TimerImg
          className="countdown"
          text={countdown}
          top="108px"
          left="591px"
        />
        <Xd12 left />
        <Xd12 right />
        <div className="bet-section1">
          {/* <div className="group-data">
            <i className="fa-solid fa-users">{" " + bets?.ODD?.players || 0}</i>
            <i className="icon-item2 fa-solid fa-dollar-sign">
              {" " + bets?.ODD?.money || 0}
            </i>
          </div> */}
          <div onClick={() => handleBet1("XdChan")}>
            <XdChan
              className={`chanIcon ${
                gameStage === "finish" && result1 === "XdChan" && "aura"
              }`}
            />
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
            selectedBet1 === "XdChan" ? (
              <XdChanAura />
            ) : (
              <></>
            )}
          </div>
          <div onClick={() => handleBet1("XdLe")}>
            <XdLe
              className={`leIcon ${
                gameStage === "finish" && result1 === "Xdle" && "aura"
              }`}
            />
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
            selectedBet1 === "XdLe" ? (
              <XdLeAura />
            ) : (
              <></>
            )}
          </div>
        </div>
        <div className="bet-section2">
          <div className="xd-4-red" onClick={() => handleBet2("Xd4Red")}>
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
            selectedBet2 === "Xd4Red" ? (
              <XdAura4Red />
            ) : (
              <></>
            )}
          </div>
          <div className="xd-3-red" onClick={() => handleBet2("Xd3Red")}>
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
            selectedBet2 === "Xd3Red" ? (
              <XdAura3Red />
            ) : (
              <></>
            )}
          </div>
          <div className="xd-3-white" onClick={() => handleBet2("Xd3White")}>
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
              (selectedBet2 === "Xd3White" ? <XdAura3White /> : <></>)}
          </div>
          <div className="xd-4-white" onClick={() => handleBet2("Xd4White")}>
            {(gameStage === "betting" ||
              gameStage === "rolling" ||
              gameStage === "finish") &&
            selectedBet2 === "Xd4White" ? (
              <XdAura4White />
            ) : (
              <></>
            )}
          </div>
        </div>
        {gameStage === "betting" && countdown <= 10 && countdown >= 8 && (
          <ChatInfoImg
            className="xd-text"
            top="-80px"
            left="440px"
            transform="scale(2)"
            text={conversation(1)}
          />
        )}
        {gameStage === "betting" &&
          countdown <= 4 &&
          countdown >= 0 &&
          (selectedBet1 === "XdChan" ? (
            <ChatInfoImg
              className="xd-text"
              top="-80px"
              left="440px"
              transform="scale(2)"
              text={conversation(3)}
            />
          ) : selectedBet1 === "XdLe" ? (
            <ChatInfoImg
              className="xd-text"
              top="-80px"
              left="440px"
              transform="scale(2)"
              text={conversation(4)}
            />
          ) : (
            <ChatInfoImg
              className="xd-text"
              top="-80px"
              left="440px"
              transform="scale(2)"
              text={conversation(1)}
            />
          ))}
        <div className={gameStage === "rolling" ? "bowl-disc" : ""}>
          <XdDisc className="xd-disc" />
          {(gameStage === "firstTime" ||
            (gameStage === "betting" && countdown >= 5)) && (
            <div className="chipArea">
              <CoinLogic
                coin1={history[0]}
                coin2={history[1]}
                coin3={history[2]}
                coin4={history[3]}
              />
            </div>
          )}
          {(gameStage === "finish" ||
            (gameStage === "waiting" && countdown <= 3)) && (
            <div className="chipArea">
              <CoinLogic
                coin1={history[0]}
                coin2={history[1]}
                coin3={history[2]}
                coin4={history[3]}
              />
            </div>
          )}
          <XdBowl className={getBowlClass(gameStage)} />
        </div>
        {/* {console.log("selectedBet1", selectedBet1)}
        {console.log("selectedBet2", selectedBet2)}
        {console.log("result1", result1)}
        {console.log("result2", result2)} */}
        {gameStage === "finish" && renderResultComponent1(result1)}
        {gameStage === "finish" && renderResultComponent2(result2)}
        {gameStage === "finish" &&
          (selectedBet1 !== result1 && selectedBet2 !== result2 ? (
            <>
              <LoseImg bottom={0} left={230} />
            </>
          ) : (
            <>
              <WinImg bottom={0} left={230} />
            </>
          ))}
        {gameStage === "firstTime" && (
          <div className="game-stage" onClick={startGame}>
            <BeginImg top="500px" left="320px" transform="scale(.7)" />
          </div>
        )}
        {gameStage === "waiting" && (
          <div
            className={`game-stage ${isHidden ? "hidden" : ""}`}
            onClick={startGame}
          >
            <BeginImg top="500px" left="320px" transform="scale(.7)" />
          </div>
        )}
        {gameStage === "finish" && (
          <div className="game-stage" onClick={handlePlayAgain}>
            <ReplayImg top="500px" left="320px" transform="scale(.7)" />
          </div>
        )}
        <div className="sound-icon-xd" onClick={() => handleSound()}>
          {isSoundOn ? (
            <i className="fa-solid fa-volume-high"></i>
          ) : (
            <i className="fa-solid fa-volume-xmark"></i>
          )}

          <audio ref={bgAudioRef} src={bgSound} type="audio/mp3" loop></audio>
          <audio ref={beginRef} src={beginSound} type="audio/m4a" />
          <audio ref={clockRef} src={clockSound} type="audio/m4a" />
          <audio ref={selectRef} src={selectedSound} type="audio/m4a" />
          <audio ref={dflying} src={diceFlying} type="audio/m4a" />
          <audio ref={dInBowl} src={dicesInBowl} type="audio/m4a" />
          <audio ref={plateRef} src={xdRoll} type="audio/m4a" />
          <audio ref={winRef} src={winSound} type="audio/m4a" volume="0.2" />
          <audio ref={loseRef} src={loseSound} type="audio/m4a" />
        </div>
        {gameStage === "finish" && (
          <ChatInfoImg
            className="xd-text"
            top="-80px"
            left="440px"
            transform="scale(2)"
            text={conversation(7)}
          />
        )}
        <XdLantern />
        <XdX onClick={onClose} top="50px" right="0px" />
        <XdI onClick={handleIicon} top="50px" left="0px" />
        {isShowIntructor ? (
          <BgInsImg top="150px" left="305px" gameName="xd" onClick={onHide} />
        ) : (
          <></>
        )}
        <XdMai />
        <Xdbanhchung />
        <XdCanhdao />
        {/* <XdAura3Red /> */}
        {/* XdAura3Red, XdAura3White, XdAura4Red, XdAura4White, */}
      </div>
    </>
  );
};

export default XocdiaMini;
