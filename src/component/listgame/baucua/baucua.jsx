import { useContext, useEffect, useState } from "react";
import io from "socket.io-client";
import musicOffImg from "../../assets/images/music-off.svg";
import musicOnImg from "../../assets/images/music-on.svg";
import {
  Bucket,
  Cloud,
  DiceBau,
  DiceCa,
  DiceCua,
  DiceGa,
  DiceNai,
  DiceTom,
  Disc,
  DisplayInfo,
  FireWork,
  Lantern,
  Mainboard,
  RedFlower,
  YellowFlower,
} from "../../graphic/gBaucua";
import {
  BgInsImg,
  ChatInfoImg,
  ChibiImg,
  IIcon,
  LoseImg,
  TimerImg,
  WinImg,
  XIcon,
} from "../../graphic/gOther";
import LogicDice from "../../utils/diceLogic";
import { SoundContext } from "../../utils/soundEffect";
import "./baucua.scss";

// Kết nối đến backend thông qua Socket.io
const desUrl = process.env.REACT_APP_URL_SITE;
const socket = io(desUrl); // Thay URL của server nếu cần

const BaucuaMini = ({ title, onClose }) => {
  const [countdown, setCountdown] = useState(10); // Thời gian đếm ngược
  const [gameStage, setGameStage] = useState("waiting"); // Trạng thái game: 'waiting', 'betting', 'rolling', 'finish'
  const [dice, setDice] = useState(["", "", ""]); // 3 viên xúc xắc
  const [result, setResult] = useState([]); // Kết quả cuối cùng
  const [bets, setBets] = useState({}); // Thống kê cược từ server
  const [round, setRound] = useState(1); // Số vòng hiện tại
  const [isShowInstructor, setIsShowInstructor] = useState(false);
  const [selected, setSelected] = useState([]);
  const [conversation, setConversation] = useState("");
  const { playSound, stopSound, pauseSound } = useContext(SoundContext);
  const [isMusicOn, setIsMusicOn] = useState(true);
  const [isSoundOn, setIsSoundOn] = useState(true);

  const chat = {
    1: "Bắt đầu đặt cược",
    2: "Hồi hộp đợi kết quả",
    3: "Chúc mừng, bạn đã chiến thắng",
    4: "Không sao, lại ván nữa nào",
    5: "Ván mới sẽ bắt đầu trong...",
    6: "Chỉ được chọn tối đa 3 linh vật",
  };

  const symbols = {
    Bau: {
      image: DiceBau,
      name: "Bầu",
      icon: "Bau",
    },
    Cua: {
      image: DiceCua,
      name: "Cua",
      icon: "Cua",
    },
    Tom: { image: DiceTom, name: "Tôm", icon: "Tom" },
    Ca: { image: DiceCa, name: "Cá", icon: "Ca" },
    Ga: {
      image: DiceGa,
      name: "Gà",
      icon: "Ga",
    },
    Nai: {
      image: DiceNai,
      name: "Nai",
      icon: "Nai",
    },
  };

  // Kết nối tới server và lắng nghe dữ liệu từ backend
  useEffect(() => {
    socket.on("round_update_baucua", (data) => {
      // console.log(data)
      setGameStage(data.gameStage); // Trạng thái hiện tại
      setCountdown(data.countdown); // Đếm ngược
      setRound(data.round); // Số vòng
      setResult(data.result || []); // Kết quả
      setDice([data.result[0], data.result[1], data.result[2]]); // Xúc xắc
      setBets(data.bets || {}); // Thống kê cược
    });

    return () => {
      socket.off("round_update_baucua");
    };
  }, []);

  const handleIicon = () => {
    setIsShowInstructor(true);
  };

  const onHide = () => {
    setIsShowInstructor(false);
  };

  useEffect(() => {
    if (!isSoundOn) return;
    if (gameStage === "betting" && countdown <= 5) {
      playSound("clockTick");
    }
    if (gameStage === "finish" && countdown <= 4 && countdown >= 2) {
      playSound("rollingBC");
    }
    if (gameStage === "waiting" && countdown === 10) {
      playSound("reveal");
    }
  }, [gameStage, countdown, isSoundOn]);

  useEffect(() => {
    if (gameStage === "betting") {
      setSelected([]);
      setConversation(chat[1]);
    }
    if (gameStage === "waiting") {
      setConversation(chat[5]);
    }
    if (gameStage === "rolling") {
      setConversation(chat[2]);
    }
    if (gameStage === "finish") {
    }
  }, [gameStage]);

  const handleSelect = (group) => {
    playSound("select1");
    setSelected((prevSelected) => {
      if (prevSelected.includes(group)) {
        return prevSelected.filter((item) => item !== group); // Bỏ chọn nếu đã có
      } else if (selected.length < 3) {
        return [...prevSelected, group]; // Thêm vào nếu chưa có
      } else {
        setConversation(chat[6]);
        return prevSelected;
      }
    });
  };

  const handleClose = () => {
    stopSound("bgSound"); // Tắt nhạc nền
    onClose(); // Gọi hàm đóng giao diện
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

  return (
    <div className="baucua-container">
      <YellowFlower left />
      <YellowFlower right />
      <div className="group-mainboard">
        <Mainboard
          bets={bets}
          selected={selected}
          onClick={gameStage === "betting" ? handleSelect : undefined}
          // className={`${ gameStage === "waiting" && countdown <= 9 ? "bc-aura-effect" : ""}`
          resultEffect={
            gameStage === "waiting" &&
            countdown <= 9 &&
            dice.map((d) => symbols[d]?.icon)
          }
        />
      </div>
      <ChatInfoImg
        className="bc-chat"
        top={-60}
        left={370}
        scale={2}
        text={`${conversation} ${
          gameStage === "waiting" ? countdown : ""
        }`.trim()}
      />
      <DisplayInfo
        className="bc-result"
        top={300}
        left={435}
        text={
          ["rolling", "finish"].includes(gameStage) ||
          (gameStage === "waiting" && countdown > 9)
            ? "... - ... - ..."
            : dice.map((d) => symbols[d]?.name).join(" - ")
        }
      />
      <ChibiImg top={-220} left={600} />

      {/* <div className="bc-aura-effect">{dice.map((d) => symbols[d]?.aura)}</div>

      {gameStage === "waiting" && countdown <= 9 && (
        <div className="bc-aura-effect">
          {dice.map((d) => symbols[d]?.aura)}
        </div>
      )} */}
      <FireWork />
      <TimerImg
        className={"bc-countdown"}
        top={140}
        left={630}
        text={countdown}
      />

      <div
        className={`${gameStage === "finish" ? "group-dice-bucket-disc" : ""} `}
      >
        <Disc />
        <div className="bc-dice-area">
          <LogicDice
            key={gameStage === "finish"}
            dice1={symbols[result[0]]?.image || DiceBau}
            dice2={symbols[result[1]]?.image || DiceBau}
            dice3={symbols[result[2]]?.image || DiceBau}
            w={135}
            h={125}
            diceSize={47}
          />
        </div>
        <Bucket
          className={`${
            !["finish", "rolling"].includes(gameStage)
              ? "bc-bucket-in"
              : gameStage !== "betting"
              ? "bc-bucket-out"
              : ""
          } `}
        />
      </div>

      {/* {console.log(gameStage)} */}
      {gameStage === "waiting" &&
        (selected.length === 0 ? null : result.some((res) =>
            selected.includes(res)
          ) ? (
          <WinImg bottom={100} left={220} />
        ) : (
          <LoseImg bottom={100} left={220} />
        ))}

      <RedFlower />
      <Cloud left />
      <Cloud right />
      <Lantern />
      <XIcon top={70} left={940} onClick={handleClose} />
      <IIcon top={70} left={12} onClick={handleIicon} />
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
      {isShowInstructor && (
        <BgInsImg top="150px" left="305px" gameName="bc" onClick={onHide} />
      )}
    </div>
  );
};

export default BaucuaMini;
