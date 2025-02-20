// Lô Đề Siêu Tốc với React - 4 Đài
import React, { useEffect, useRef, useState } from "react";
import bgSound from "../../assets/audio/bgSound.mp3";
import loseSound from "../../assets/audio/lose.m4a";
import beginSound from "../../assets/audio/readyGo.m4a";
import rollingball from "../../assets/audio/rollingBall.m4a";
import selectIn from "../../assets/audio/select1.m4a";
import selectX from "../../assets/audio/select2.m4a";
import selectOn from "../../assets/audio/select3.m4a";
import clockSound from "../../assets/audio/tiktak.m4a";
import winSound from "../../assets/audio/win.m4a";
import {
  BacangText,
  BacangTextImg,
  BaoloText,
  DanhdeText,
  DauduoiText,
  DauTextImg,
  DBPrice,
  DeDauTextImg,
  DeDBTextImg,
  DuoiTextImg,
  IImg,
  Lo2soTextImg,
  Lo3soTextImg,
  LotruotText,
  LoxienText,
  MainFront,
  MainTab1,
  MainTab1Selected,
  MainTab2,
  MainTab2Selected,
  MainTab3,
  MainTab3Selected,
  Num10,
  Num100,
  Num300,
  ResultTable,
  SignImg,
  TabSelected,
  TabWinNum,
  Truot10soTextImg,
  Truot4soTextImg,
  Truot8soTextImg,
  Xien2soTextImg,
  Xien3soTextImg,
  Xien4soTextImg,
  XImg,
} from "../../graphic/gLode";
import {
  BeginImg,
  BgInsImg,
  ChatInfoImg,
  ChibiImg,
  LoseImg,
  ReplayImg,
  WinImg,
} from "../../graphic/gOther";
import { checkValidateTicket } from "./checkValidateTicket";
import {
  generateNumbers,
  generateNumbers2,
  generateNumbers3,
} from "./generateNumber";
import "./lodesieutoc.scss";
import ResultCalc from "./result";

// Hàm tạo số ngẫu nhiên với độ dài tuỳ chỉnh
const generateRandomNumber = (length) => {
  const max = Math.pow(10, length) - 1; // max vẫn giữ nguyên
  const randomNumber = Math.floor(Math.random() * (max + 1)); // Từ 0 đến max
  return randomNumber.toString().padStart(length, "0");
};

// Cấu trúc các giải MB
const PRIZE_STRUCTURE = {
  g7: { count: 4, length: 2 },
  g6: { count: 3, length: 3 },
  g5: { count: 6, length: 4 },
  g4: { count: 4, length: 4 },
  g3: { count: 6, length: 5 },
  g2: { count: 2, length: 5 },
  g1: { count: 1, length: 5 },
  gdb: { count: 1, length: 5 },
};

const NAME_STRUCTURE = {
  Lo2so: "Lô 2 số",
  Lo3so: "Lô 3 số",
  Xien2so: "Lô xiên 2 số",
  Xien3so: "Lô xiên 3 số",
  Xien4so: "Lô xiên 4 số",
  Truot4so: "Lô trượt 4 số",
  Truot8so: "Lô trượt 8 số",
  Truot10so: "Lô trượt 10 số",
  Dau: "Đầu",
  Duoi: "Đuôi",
  Dedau: "Đề đầu",
  DeDB: "Đề đặc biêt",
  Bacang: "Ba càng",
};

// Hàm tạo giải trúng thưởng
const generateLotteryStations = () => {
  const stations = [];
  const station = {}; // Tạo 1 đài duy nhất
  for (const [prize, { count, length }] of Object.entries(PRIZE_STRUCTURE)) {
    station[prize] = Array.from({ length: count }, () =>
      generateRandomNumber(length)
    );
  }
  stations.push(station);
  console.log("stations", stations);
  return stations;
};

const LotteryGame = ({ onClose }) => {
  const [stage, setStage] = useState("waiting");
  const [countdown, setCountdown] = useState(0);
  // giai thuong
  const [winningResults, setWinningResults] = useState([]);
  const [caseSelected, setCaseSelected] = useState("Lo2so");
  const [isShowIntructor, setIsShowIntructor] = useState(false);
  const [isShowModalSign, setIsShowModalSign] = useState(false);
  const [isShowResultTable, setIsShowResultTable] = useState(false);
  const [isShowModalTabSelected, setIsShowModalTabSelected] = useState(false);
  const [selectedGroup, setSelectedGroup] = useState(0); // Mặc định là 0
  const [randomNumber, setRandomNumber] = useState([1, 2, 3, 4, 5]);
  const [isAnimating, setIsAnimating] = useState(false); // Trạng thái hiệu ứng
  const [allNumbers, setAllNumbers] = useState([]);
  const [splitGDB, setSplitGDB] = useState([]);
  const [showChat, setShowChat] = useState(false);
  const [chatNum, setChatNum] = useState(null);
  const [confirmSelected, setConfirmSelected] = useState([]);

  const [isSoundOn, setIsSoundOn] = useState(true);
  const bgAudioRef = useRef(null);
  const beginRef = useRef(null);
  const clockRef = useRef(null);
  const select1Ref = useRef(null);
  const select2Ref = useRef(null);
  const select3Ref = useRef(null);
  const winRef = useRef(null);
  const loseRef = useRef(null);
  const rolling = useRef(null);

  const handleSound = () => {
    playSound(select1Ref);
    if (isSoundOn) {
      bgAudioRef.current.pause(); // Dừng âm thanh nền
    } else {
      bgAudioRef.current.play(); // Phát âm thanh nền
    }
    setIsSoundOn(!isSoundOn); // Đảo trạng thái
  };

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

  //start result finish finish1
  useEffect(() => {
    // Phát âm thanh khi bắt đầu ván cược
    if (stage === "start" && !hasPlayed.current.begin) {
      playSound(beginRef);
      hasPlayed.current.begin = true;
    }

    // Phát âm thanh đồng hồ đếm ngược
    if (
      stage === "start" &&
      countdown <= 5 &&
      countdown > 0 &&
      !hasPlayed.current.clock
    ) {
      playSound(clockRef);
      hasPlayed.current.clock = true;
    }

    // Phát âm thanh khi kết thúc - thắng/thua
    if (stage === "finish") {
      if (
        winningResults.winningResults.length !== 0 &&
        !hasPlayed.current.win
      ) {
        playSoundWinLose(winRef);
        hasPlayed.current.win = true;
      } else if (
        winningResults.winningResults.length === 0 &&
        !hasPlayed.current.lose
      ) {
        playSoundWinLose(loseRef);
        hasPlayed.current.lose = true;
      }
    }

    // Reset cờ khi ván mới bắt đầu
    if (stage === "waiting") {
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
  }, [stage, countdown, confirmSelected]);

  // chatting
  const chating = {
    1: "Chào mừng đến với Lô đề 8day",
    2: "Chọn vé cược và bấm bắt đầu",
    3: "Đợi 10s và bắt đầu xổ số",
    4: "Chúc mừng, bạn đã trúng số...",
    5: "Đừng nản, chơi lại ván nữa nào",
    6: "Chọn xong rồi bấm bắt đầu nhé",
    7: "Hồi hộp đợi kết quả",
    8: "Đã đạt số lượng cược 2 số",
    9: "Vé không hợp lệ",
    10: "Đã đạt số lượng cược 100 số",
    11: "Đã đạt số lượng cược 2 số",
    12: "Đã đạt số lượng cược 3 số",
    13: "Đã đạt số lượng cược 4 số",
    14: "Đã đạt số lượng cược 8 số",
    15: "Đã đạt số lượng cược 10 số",
  };

  const handleChating = (chatNum, timer) => {
    setChatNum(chatNum); // Cập nhật số chat
    setShowChat(true); // Đảm bảo ẩn chat cũ
    if (timer !== Infinity) {
      setTimeout(() => {
        setShowChat(false); // Hiển thị chat mới sau thời gian trễ
      }, timer);
    }
  };

  // stage chating
  useEffect(() => {
    if (stage === "waiting") {
      handleChating(1, 3000); // Hiển thị tin nhắn chào mừng
      setTimeout(() => {
        handleChating(2, Infinity); // Hiển thị tin nhắn 2 sau khi tin nhắn 1 kết thúc
      }, 3000); // Độ dài của tin nhắn 1
    }
    if (stage === "start") {
      handleChating(3, 8000);
    }
    if (stage === "result") {
      handleChating(7, 35000);
      setIsShowModalSign(false);
    }
    if (stage === "finish") {
      winningResults.winningResults.length !== 0
        ? handleChating(4, Infinity)
        : handleChating(5, Infinity); // 4 hoặc 5
    }
  }, [stage]);

  // small component
  const handleIicon = () => {
    playSound(select1Ref);
    setIsShowIntructor(true);
  };
  const onHide = () => {
    playSound(select2Ref);
    setIsShowIntructor(false);
    setIsShowModalSign(false);
  };
  const handleSignIcon = () => {
    playSound(select1Ref);
    setIsShowModalSign(true);
    setIsShowModalTabSelected(true);
  };

  const [ticket, setTicket] = useState([
    { caseSelected: "Lo2so", numbers: [] },
  ]);

  const handleUpdateTicket = (caseSelected, number) => {
    if (number === null) return; // Nếu số bị null, không thực hiện gì
    playSound(select3Ref);

    setTicket((prev) => {
      // Kiểm tra xem vé hiện tại đã tồn tại chưa
      const existingTicket = prev.find(
        (item) => item.caseSelected === caseSelected
      );

      if (existingTicket) {
        // Kiểm tra xem số đã được chọn chưa
        const isSelected = existingTicket.numbers.includes(number);
        const updatedNumbers = isSelected
          ? existingTicket.numbers.filter((n) => n !== number) // Nếu đã chọn, loại bỏ
          : [...existingTicket.numbers, number]; // Nếu chưa chọn, thêm số vào

        // Kiểm tra các điều kiện giới hạn
        if (
          ["Lo2so", "Dedau", "DeDB"].includes(caseSelected) &&
          updatedNumbers.length === 11
        ) {
          handleChating(9, 5000);
          return prev;
        } else if (
          ["Dau", "Duoi", "Xien2so"].includes(caseSelected) &&
          updatedNumbers.length === 3
        ) {
          handleChating(11, 5000);
          return prev;
        } else if (
          ["Xien3so"].includes(caseSelected) &&
          updatedNumbers.length === 4
        ) {
          handleChating(12, 5000);
          return prev;
        } else if (
          ["Xien4so", "Truot4so"].includes(caseSelected) &&
          updatedNumbers.length === 5
        ) {
          handleChating(13, 5000);
          return prev;
        } else if (
          ["Truot8so"].includes(caseSelected) &&
          updatedNumbers.length === 9
        ) {
          handleChating(14, 5000);
          return prev;
        } else if (
          ["Truot10so"].includes(caseSelected) &&
          updatedNumbers.length === 11
        ) {
          handleChating(15, 5000);
          return prev;
        } else if (
          ["Lo3so", "Dedau", "Bacang"].includes(caseSelected) &&
          updatedNumbers.length === 101
        ) {
          handleChating(10, 5000);
          return prev;
        }

        // Xoá vé nếu không còn số nào, hoặc cập nhật số
        return updatedNumbers.length === 0
          ? prev.filter((item) => item.caseSelected !== caseSelected)
          : prev.map((item) =>
              item.caseSelected === caseSelected
                ? { ...item, numbers: updatedNumbers }
                : item
            );
      } else {
        // Nếu vé chưa tồn tại, thêm vé mới với số được chọn
        const newTicket = { caseSelected, numbers: [number] };

        // Kiểm tra các điều kiện giới hạn
        if (
          ["Lo2so", "Dedau", "DeDB"].includes(caseSelected) &&
          newTicket.numbers.length === 10
        ) {
          handleChating(9, 5000);
          return prev;
        } else if (
          ["Dau", "Duoi", "Xien2so"].includes(caseSelected) &&
          newTicket.numbers.length === 2
        ) {
          handleChating(11, 5000);
          return prev;
        } else if (
          ["Xien3so"].includes(caseSelected) &&
          newTicket.numbers.length === 3
        ) {
          handleChating(12, 5000);
          return prev;
        } else if (
          ["Xien4so", "Truot4so"].includes(caseSelected) &&
          newTicket.numbers.length === 4
        ) {
          handleChating(13, 5000);
          return prev;
        } else if (
          ["Truot8so"].includes(caseSelected) &&
          newTicket.numbers.length === 8
        ) {
          handleChating(14, 5000);
          return prev;
        } else if (
          ["Truot10so"].includes(caseSelected) &&
          newTicket.numbers.length === 10
        ) {
          handleChating(15, 5000);
          return prev;
        } else if (
          ["Lo3so", "Dedau", "Bacang"].includes(caseSelected) &&
          newTicket.numbers.length === 100
        ) {
          handleChating(10, 5000);
          return prev;
        }

        return [...prev, newTicket];
      }
    });
  };

  useEffect(() => {
    console.log("ticket", ticket);
  }, [ticket]);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && stage !== "waiting") {
      handleNextStage();
    }
  }, [countdown]);

  // handle stage
  const handleNextStage = () => {
    if (stage === "start") {
      startRolling();
      setCountdown(35);
      setIsShowResultTable(true);
      console.log("confirmSelected", confirmSelected);
    } else if (stage === "result") {
      setStage("finish");
    } else if (stage === "finish") {
      setStage("finish1");
    } else if (stage === "finish1") {
      handleReplay();
    }
  };

  //bắt đàu quay số
  const startRolling = () => {
    handleGenerateResults();
    setStage("result");
    setIsAnimating(true);
  };

  // Hàm quay số
  const handleGenerateResults = () => {
    const newStations = generateLotteryStations();
    const resultCals = ResultCalc(confirmSelected, newStations); // Gọi ResultCalc để lấy kết quả
    setAllNumbers(resultCals.allPrices);
    const { isWinner, winningResults } = resultCals.checkWin();
    setWinningResults({ isWinner, winningResults });
    // Trích xuất các giá trị từ stations
    console.log("checkwin", { isWinner, winningResults });
    console.log("winningResults", winningResults);
  };

  // render chọn kiểu chơi
  const handleCaseSelected = (caseSelected) => {
    switch (caseSelected) {
      case "Lo2so":
        return (
          <>
            <MainTab1Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <Lo2soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <Lo3soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo3so")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Lo3so":
        return (
          <>
            <MainTab1
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <Lo2soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <Lo3soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo3so")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Xien2so":
        return (
          <>
            <MainTab1Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab3
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <Xien2soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <Xien3soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien3so")}
            />
            <Xien4soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien4so")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Xien3so":
        return (
          <>
            <MainTab1
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab3
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <Xien2soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <Xien3soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien3so")}
            />
            <Xien4soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien4so")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Xien4so":
        return (
          <>
            <MainTab1
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab3Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <Xien2soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <Xien3soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien3so")}
            />
            <Xien4soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien4so")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Truot4so":
        return (
          <>
            <MainTab1Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab3
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <Truot4soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <Truot8soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot8so")}
            />
            <Truot10soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot10so")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Truot8so":
        return (
          <>
            <MainTab1
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab3
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <Truot4soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <Truot8soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot8so")}
            />
            <Truot10soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot10so")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Truot10so":
        return (
          <>
            <MainTab1
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab3Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <Truot4soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <Truot8soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot8so")}
            />
            <Truot10soTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot10so")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Dau":
        return (
          <>
            <MainTab1Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <DauTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DuoiTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Duoi")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Duoi":
        return (
          <>
            <MainTab1
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <DauTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DuoiTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Duoi")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Dedau":
        return (
          <>
            <MainTab1Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <DeDauTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <DeDBTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("DeDB")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "DeDB":
        return (
          <>
            <MainTab1
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <DeDauTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <DeDBTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("DeDB")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      case "Bacang":
        return (
          <>
            <MainTab1Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <BacangTextImg
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
            <BaoloText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Lo2so")}
            />
            <LoxienText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Xien2so")}
            />
            <LotruotText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Truot4so")}
            />
            <DauduoiText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dau")}
            />
            <DanhdeText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Dedau")}
            />
            <BacangText
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
              onClick={() => handleItemClick("Bacang")}
            />
          </>
        );
      default:
        return (
          <>
            <MainTab1Selected
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <MainTab2
              className={
                stage === "result" || stage === "finish" ? "cover" : ""
              }
            />
            <Lo2soTextImg onClick={() => handleItemClick("Lo2so")} />
            <Lo3soTextImg onClick={() => handleItemClick("Lo3so")} />
            <BaoloText onClick={() => handleItemClick("Lo2so")} />
            <LoxienText onClick={() => handleItemClick("Xien2so")} />
            <LotruotText onClick={() => handleItemClick("Truot4so")} />
            <DauduoiText onClick={() => handleItemClick("Dau")} />
            <DanhdeText onClick={() => handleItemClick("Dedau")} />
            <BacangText onClick={() => handleItemClick("Bacang")} />
          </>
        );
    }
  };

  // xử lý người chơi click vào kiểu chơi
  const handleItemClick = (item) => {
    playSound(select1Ref);
    setCaseSelected(item);
    // Reset vé khi chuyển caseSelected
    setTicket((prev) => {
      // Giữ lại vé chỉ liên quan đến caseSelected mới
      const existingTicket = prev.find(
        (ticket) => ticket.caseSelected === item
      );
      return existingTicket
        ? [existingTicket]
        : [{ caseSelected: item, numbers: [] }];
    });
    console.log(`User clicked on: ${item}`);
  };

  //hiệu ứng chọn số
  useEffect(() => {
    // Find the element with the class "ld-aura"
    const auraElements = document.querySelectorAll(".ld-aura");

    auraElements.forEach((element) => {
      // Remove "hidden" class for all "ld-aura" elements
      element.classList.add("hidden");

      if (
        ["Lo2so", "Lo3so"].includes(caseSelected) &&
        element.classList.contains("baolo")
      ) {
        element.classList.remove("hidden");
      } else if (
        ["Xien2so", "Xien3so", "Xien4so"].includes(caseSelected) &&
        element.classList.contains("loxien")
      ) {
        element.classList.remove("hidden");
      } else if (
        ["Truot4so", "Truot8so", "Truot10so"].includes(caseSelected) &&
        element.classList.contains("lotruot")
      ) {
        element.classList.remove("hidden");
      } else if (
        ["Dau", "Duoi"].includes(caseSelected) &&
        element.classList.contains("dauduoi")
      ) {
        element.classList.remove("hidden");
      } else if (
        ["Dedau", "DeDB"].includes(caseSelected) &&
        element.classList.contains("danhde")
      ) {
        element.classList.remove("hidden");
      } else if (
        caseSelected === "Bacang" &&
        element.classList.contains("bacang")
      ) {
        element.classList.remove("hidden");
      }
    });
  }, [caseSelected]);

  const handleCloseTabSelected = () => {
    playSound(select2Ref);
    setIsShowModalTabSelected(false);
  };

  const handleShowNumber = (caseSelected) => {
    switch (caseSelected) {
      case "Dau":
      case "Duoi":
        return (
          <>
            {isShowModalSign && (
              <>
                <Num10 onClick={handleClickModalNumSelected} />
                <TabSelected
                  text={confirmSelected}
                  onClick={handleCloseTabSelected}
                />
                <div className="number1-grid">
                  {generateNumbers().map(({ id, value }) => {
                    const isSelected = ticket.some(
                      (bet) =>
                        bet.caseSelected === caseSelected &&
                        bet.numbers.includes(value)
                    );
                    return (
                      <div
                        key={id}
                        className={`grid-item ${
                          isSelected ? "num-selected" : ""
                        }`}
                        onClick={() => handleUpdateTicket(caseSelected, value)}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        );
      case "Lo3so":
      case "Bacang":
        return (
          <>
            {isShowModalSign && (
              <>
                <Num300 onClick={handleClickModalNumSelected} />
                <div className="number3-header">
                  {Array.from({ length: 10 }, (_, i) => (
                    <div
                      key={i}
                      className={`grid ${
                        selectedGroup === i ? "grid-active" : ""
                      }`}
                      onClick={() => setSelectedGroup(i)}
                    >
                      {i}00
                    </div>
                  ))}
                </div>
                <div className="number3-grid">
                  {generateNumbers3(selectedGroup).map(({ id, value }) => {
                    const isSelected = ticket.some(
                      (bet) =>
                        bet.caseSelected === caseSelected &&
                        bet.numbers.includes(value)
                    );
                    return (
                      <div
                        key={id}
                        className={`grid-item ${
                          isSelected ? "num-selected" : ""
                        }`}
                        onClick={() => handleUpdateTicket(caseSelected, value)}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        );
      default:
        return (
          <>
            {isShowModalSign && (
              <>
                <Num100 onClick={handleClickModalNumSelected} />
                <div className="number2-grid">
                  {generateNumbers2().map(({ id, value }) => {
                    const isSelected = ticket.some(
                      (bet) =>
                        bet.caseSelected === caseSelected &&
                        bet.numbers.includes(value)
                    );
                    return (
                      <div
                        key={id}
                        className={`grid-item ${
                          isSelected ? "num-selected" : ""
                        }`}
                        onClick={() => {
                          // console.log("Clicked number:", value); // Giá trị của số
                          handleUpdateTicket(caseSelected, value);
                        }}
                      >
                        {value}
                      </div>
                    );
                  })}
                </div>
              </>
            )}
          </>
        );
    }
  };

  //tạo hiệu ứng nhảy số đặc biệt
  useEffect(() => {
    if (isAnimating && stage === "result" && countdown > 0) {
      const interval = setInterval(() => {
        setRandomNumber([
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
          Math.floor(Math.random() * 10),
        ]);
      }, 50);
      return () => {
        clearInterval(interval);
      };
    }
  }, [isAnimating]);

  const handleStartGame = () => {
    playSound(select1Ref);
    setStage("start"); // Đặt trạng thái game là "start"
    setCountdown(3);
  };

  const handleReplay = () => {
    playSound(select1Ref);
    setStage("waiting"); // Quay lại trạng thái waiting
    setCountdown(0);
    setConfirmSelected([]);
    setTicket([{ caseSelected: "Lo2so", numbers: [] }]);
  };

  const handleResultTable = () => {
    if (stage === "result" && countdown !== 0) {
      playSound(rolling);
    }

    return (
      <div className="result-table-wrapper">
        <ResultTable />
        <DBPrice />
        <TabWinNum />
        {countdown === 0 && (
          <XImg onClick={handleCloseResultTable} top="20px" left="959px" />
        )}
      </div>
    );
  };

  const handleCloseResultTable = () => {
    playSound(select2Ref);
    setIsShowResultTable(false);
    setStage("finish1");
  };

  useEffect(() => {
    // Lấy giá trị đầu tiên từ gdb
    const specialPrize = allNumbers[0]?.gdb?.[0];
    if (specialPrize) {
      // Phân tách giá trị thành từng chữ số
      const digits = specialPrize.split(""); // Tách thành mảng các chữ số
      setSplitGDB(digits);
    }
  }, [allNumbers]);

  const handleConfirmSelected = () => {
    const selectedTicket = ticket[0];
    // console.log(selectedTicket.numbers);
    // Ngăn chặn xác nhận nếu không có số hợp lệ
    if (!selectedTicket || selectedTicket.numbers.length === 0) {
      console.log("Không thể xác nhận vé rỗng hoặc không hợp lệ.");
      handleChating(9, 5000); // Hiển thị thông báo lỗi
      return;
    }

    // Kiểm tra số lượng tối thiểu theo loại cược
    const requiredNumbers = {
      Xien2so: 2,
      Xien3so: 3,
      Xien4so: 4,
      Truot4so: 4,
      Truot8so: 8,
      Truot10so: 10,
    };

    if (
      requiredNumbers[selectedTicket.caseSelected] &&
      selectedTicket.numbers.length !==
        requiredNumbers[selectedTicket.caseSelected]
    ) {
      console.log(
        `Loại cược ${selectedTicket.caseSelected} yêu cầu chọn ${
          requiredNumbers[selectedTicket.caseSelected]
        } số.`
      );
      handleChating(9, 5000); // Hiển thị thông báo lỗi
      return;
    }

    if (checkValidateTicket(confirmSelected, [selectedTicket])) {
      setConfirmSelected((prev) => [...prev, selectedTicket]); // Thêm vé vào danh sách confirmSelected
      setTicket([{ caseSelected: caseSelected, numbers: [] }]); // Reset ticket
      console.log("Vé đã xác nhận:", selectedTicket);
      setIsShowModalSign(false);
    } else {
      console.log("vé không hợp lệ");
      handleChating(9, 5000);
      setIsShowModalSign(true);
    }
  };

  const handleClickModalNumSelected = (type) => {
    switch (type) {
      case "xImg":
        playSound(select2Ref);
        setIsShowModalSign(false);
        break;
      case "confirmImg":
        playSound(select1Ref);
        handleConfirmSelected(ticket);
        break;
      default:
        break;
    }
  };

  return (
    <div className="lottery-container">
      {/* {console.log(stage)} */}
      <MainFront
        className={stage === "result" || stage === "finish" ? "cover" : ""}
      />
      <div className="ld-sound-icon" onClick={() => handleSound()}>
        {isSoundOn ? (
          <i className="fa-solid fa-volume-high"></i>
        ) : (
          <i className="fa-solid fa-volume-xmark"></i>
        )}
        <audio ref={bgAudioRef} src={bgSound} type="audio/mp3" loop></audio>
        <audio ref={beginRef} src={beginSound} type="audio/m4a" />
        <audio ref={clockRef} src={clockSound} type="audio/m4a" />
        <audio ref={select1Ref} src={selectIn} type="audio/m4a" />
        <audio ref={select2Ref} src={selectX} type="audio/m4a" />
        <audio ref={select3Ref} src={selectOn} type="audio/m4a" />
        <audio ref={rolling} src={rollingball} type="audio/m4a" />
        <audio ref={winRef} src={winSound} type="audio/m4a" volume="0.2" />
        <audio ref={loseRef} src={loseSound} type="audio/m4a" />
      </div>
      {stage === "waiting" ? (
        <div className="begin-img" onClick={handleStartGame}>
          <BeginImg
            className={stage === "result" || stage === "finish" ? "cover" : ""}
            transform="scale(.6)"
            top="130px"
            left="320px"
          />
        </div>
      ) : (
        <></>
      )}
      {stage === "finish1" ? (
        <div className="begin-img" onClick={handleReplay}>
          <ReplayImg
            // className={stage === "result" || stage === "finish1" ? "cover" : ""}
            transform="scale(.6)"
            top="130px"
            left="320px"
          />
        </div>
      ) : (
        <></>
      )}
      {handleCaseSelected(caseSelected)}
      <IImg
        className={stage === "result" || stage === "finish" ? "cover" : ""}
        onClick={handleIicon}
      />
      <XImg
        className={stage === "result" || stage === "finish" ? "cover" : ""}
        onClick={onClose}
        top="0px"
        left="980px"
      />
      <SignImg
        className={stage === "result" || stage === "finish" ? "cover" : ""}
        onClick={handleSignIcon}
      />
      <div className="ghiso" onClick={handleSignIcon}>
        Ghi số
      </div>
      {handleShowNumber(caseSelected)}
      <div className="ld-countdown">{countdown}</div>
      {showChat && (
        <ChatInfoImg
          className="ld-text"
          top="-150px"
          left="420px"
          scale="2"
          text={chating[chatNum]}
        />
      )}
      {/* {infoComponent && infoComponent} */}
      <ChibiImg top="-320px" left="650px" />
      {/* {stage === "result" && <WinImg bottom="-400px" />} */}
      {(stage === "result" || stage === "finish") &&
        isShowResultTable === true && <>{handleResultTable()}</>}
      {(stage === "result" || stage === "finish") &&
        isShowResultTable === true && (
          <div className="">
            <div className="result-table-num">
              <div className="result-row row1">
                <div
                  className={`result-row1-item ${
                    countdown < 30 ? "" : "pending"
                  }`}
                >
                  {countdown < 30 ? `${allNumbers[0]?.g7?.[0]}` : ""}
                </div>
                <div
                  className={`result-row1-item ${
                    countdown < 29 ? "" : "pending"
                  }`}
                >
                  {countdown < 29 ? `${allNumbers[0]?.g7?.[1]}` : ""}
                </div>
                <div
                  className={`result-row1-item ${
                    countdown < 28 ? "" : "pending"
                  }`}
                >
                  {countdown < 28 ? `${allNumbers[0]?.g7?.[2]}` : ""}
                </div>
                <div
                  className={`result-row1-item ${
                    countdown < 27 ? "" : "pending"
                  }`}
                >
                  {countdown < 27 ? `${allNumbers[0]?.g7?.[3]}` : ""}
                </div>
              </div>
              <div className="result-row row2">
                <div
                  className={`result-row1-item ${
                    countdown < 26 ? "" : "pending"
                  }`}
                >
                  {countdown < 26 ? `${allNumbers[0]?.g6?.[0]}` : ""}
                </div>
                <div
                  className={`result-row1-item ${
                    countdown < 25 ? "" : "pending"
                  }`}
                >
                  {countdown < 25 ? `${allNumbers[0]?.g6?.[1]}` : ""}
                </div>
                <div
                  className={`result-row1-item ${
                    countdown < 24 ? "" : "pending"
                  }`}
                >
                  {countdown < 24 ? `${allNumbers[0]?.g6?.[2]}` : ""}
                </div>
              </div>
              <div className="result-row row3">
                <div className="row-31">
                  <div
                    className={`result-row1-item ${
                      countdown < 23 ? "" : "pending"
                    }`}
                  >
                    {countdown < 23 ? `${allNumbers[0]?.g5?.[0]}` : ""}
                  </div>
                  <div
                    className={`result-row1-item ${
                      countdown < 22 ? "" : "pending"
                    }`}
                  >
                    {countdown < 22 ? `${allNumbers[0]?.g5?.[1]}` : ""}
                  </div>
                  <div
                    className={`result-row1-item ${
                      countdown < 21 ? "" : "pending"
                    }`}
                  >
                    {countdown < 21 ? `${allNumbers[0]?.g5?.[2]}` : ""}
                  </div>
                </div>
                <div className="row-32">
                  <div
                    className={`result-row1-item ${
                      countdown < 20 ? "" : "pending"
                    }`}
                  >
                    {countdown < 20 ? `${allNumbers[0]?.g5?.[3]}` : ""}
                  </div>
                  <div
                    className={`result-row1-item ${
                      countdown < 19 ? "" : "pending"
                    }`}
                  >
                    {countdown < 19 ? `${allNumbers[0]?.g5?.[4]}` : ""}
                  </div>
                  <div
                    className={`result-row1-item ${
                      countdown < 18 ? "" : "pending"
                    }`}
                  >
                    {countdown < 18 ? `${allNumbers[0]?.g5?.[5]}` : ""}
                  </div>
                </div>
              </div>
              <div className="result-row row4">
                <div
                  className={`result-row1-item ${
                    countdown < 17 ? "" : "pending"
                  }`}
                >
                  {countdown < 17 ? `${allNumbers[0]?.g4?.[0]}` : ""}
                </div>
                <div
                  className={`result-row1-item ${
                    countdown < 16 ? "" : "pending"
                  }`}
                >
                  {countdown < 16 ? `${allNumbers[0]?.g4?.[1]}` : ""}
                </div>
                <div
                  className={`result-row1-item ${
                    countdown < 15 ? "" : "pending"
                  }`}
                >
                  {countdown < 15 ? `${allNumbers[0]?.g4?.[2]}` : ""}
                </div>
                <div
                  className={`result-row1-item ${
                    countdown < 14 ? "" : "pending"
                  }`}
                >
                  {countdown < 14 ? `${allNumbers[0]?.g4?.[3]}` : ""}
                </div>
              </div>
              <div className="result-row row5">
                <div className="row-51">
                  <div
                    className={`result-row1-item ${
                      countdown < 13 ? "" : "pending"
                    }`}
                  >
                    {countdown < 13 ? `${allNumbers[0]?.g3?.[0]}` : ""}
                  </div>
                  <div
                    className={`result-row1-item ${
                      countdown < 12 ? "" : "pending"
                    }`}
                  >
                    {countdown < 12 ? `${allNumbers[0]?.g3?.[1]}` : ""}
                  </div>
                  <div
                    className={`result-row1-item ${
                      countdown < 11 ? "" : "pending"
                    }`}
                  >
                    {countdown < 11 ? `${allNumbers[0]?.g3?.[2]}` : ""}
                  </div>
                </div>
                <div className="row-52">
                  <div
                    className={`result-row1-item ${
                      countdown < 10 ? "" : "pending"
                    }`}
                  >
                    {countdown < 10 ? `${allNumbers[0]?.g3?.[3]}` : ""}
                  </div>
                  <div
                    className={`result-row1-item ${
                      countdown < 9 ? "" : "pending"
                    }`}
                  >
                    {countdown < 9 ? `${allNumbers[0]?.g3?.[4]}` : ""}
                  </div>
                  <div
                    className={`result-row1-item ${
                      countdown < 8 ? "" : "pending"
                    }`}
                  >
                    {countdown < 8 ? `${allNumbers[0]?.g3?.[5]}` : ""}
                  </div>
                </div>
              </div>
              <div className="result-row row6">
                <div
                  className={`result-row1-item ${
                    countdown < 7 ? "" : "pending"
                  }`}
                >
                  {countdown < 7 ? `${allNumbers[0]?.g2?.[0]}` : ""}
                </div>
                <div
                  className={`result-row1-item ${
                    countdown < 6 ? "" : "pending"
                  }`}
                >
                  {countdown < 6 ? `${allNumbers[0]?.g2?.[1]}` : ""}
                </div>
              </div>
              <div className="result-row row7">
                <div
                  className={`result-row1-item ${
                    countdown < 5 ? "" : "pending"
                  }`}
                >
                  {countdown < 5 ? `${allNumbers[0]?.g1?.[0]}` : ""}
                </div>
              </div>
              <div className="result-row row8">
                <div
                  className={`result-row1-item ${
                    countdown === 0 ? "" : "pending"
                  }`}
                >
                  {countdown === 0 ? `${allNumbers[0]?.gdb?.[0]}` : ""}
                </div>
              </div>
            </div>
            <div className="quay-so-db">
              <div className="o1">
                {countdown < 4 ? `${splitGDB[0]}` : `${randomNumber[0]}`}
              </div>
              <div className="o2">
                {countdown < 3 ? `${splitGDB[1]}` : `${randomNumber[1]}`}
              </div>
              <div className="o3">
                {countdown < 2 ? `${splitGDB[2]}` : `${randomNumber[2]}`}
              </div>
              <div className="o4">
                {countdown < 1 ? `${splitGDB[3]}` : `${randomNumber[3]}`}
              </div>
              <div className="o5">
                {countdown === 0 ? `${splitGDB[4]}` : `${randomNumber[4]}`}
              </div>
            </div>
          </div>
        )}

      {isShowModalTabSelected && (
        <TabSelected text={confirmSelected} onClick={handleCloseTabSelected} />
      )}

      {countdown === 0 && stage === "finish" ? (
        winningResults.winningResults.length === 0 ? (
          <LoseImg bottom="0px" left="250px" />
        ) : (
          <>
            <WinImg bottom="0px" left="250px" />
            <>
              {Array.isArray(winningResults.winningResults) &&
              winningResults.winningResults.length > 0 ? (
                <div className="result-win">
                  <ul>
                    {winningResults.winningResults.map((result, index) => (
                      <li key={index} className="result-item">
                        <strong>Loại cược:</strong>{" "}
                        {NAME_STRUCTURE[result.caseSelected]}
                        {Array.isArray(result.winningNumbers) &&
                        result.winningNumbers.length > 0 ? (
                          <ul className="winning-numbers">
                            {result.winningNumbers.map((number, i) =>
                              Array.isArray(number) ? ( // Kiểm tra nếu `number` cũng là mảng
                                <li key={i} className="number-group">
                                  {number.join(", ")}{" "}
                                  {/* Hiển thị danh sách số trong nhóm */}
                                </li>
                              ) : (
                                <li key={i} className="winning-number">
                                  {number} {/* Hiển thị số đơn lẻ */}
                                </li>
                              )
                            )}
                          </ul>
                        ) : (
                          <span>Không có số trúng nào.</span>
                        )}
                      </li>
                    ))}
                  </ul>
                </div>
              ) : (
                <p>Không có kết quả trúng thưởng.</p>
              )}
            </>
          </>
        )
      ) : (
        <></>
      )}

      {/* {countdown === 0 && stage === "finish" && (
        
      )} */}

      {isShowIntructor ? (
        <BgInsImg
          top="150px"
          left="325px"
          gameName={caseSelected}
          onClick={onHide}
        />
      ) : (
        <></>
      )}
    </div>
  );
};

export default LotteryGame;
