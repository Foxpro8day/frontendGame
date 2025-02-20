import { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import selectIn from "../assets/audio/select3.m4a";
import baucuaImg from "../assets/images/logobaucua.webp";
import lodesieutocImg from "../assets/images/logolode.webp";
import pokerImg from "../assets/images/logopoker.webp";
import taixiuImg from "../assets/images/logotaixiu.webp";
import vongquayImg from "../assets/images/logovongquay.webp";
import xocdiaImg from "../assets/images/logoxocdia.webp";
import BaucuaMini from "../listgame/baucua/baucua";
import LodeSieutoc from "../listgame/lodesieutoc/lodesieutoc";
import Poker from "../listgame/poker/poker";
import TaixiuMini from "../listgame/taixiu/taixiumini";
import XocdiaMini from "../listgame/xocdia/xocdiamini";
import GameLoader from "../subpage/loadingpage/GameLoader";
import useIsMobile from "../utils/useIsMobile";

import "./listgame.scss";

const Listgame = () => {
  const [isActive, setIsActive] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalType, setModalType] = useState("");
  const [activeSource, setActiveSource] = useState("");
  const select1Ref = useRef(null);
  const [isSoundOn, setIsSoundOn] = useState(true);
  const [isLoaded, setIsLoaded] = useState(false);

  const navigate = useNavigate();
  const isMobile = useIsMobile();
  const isDragging = useRef(false);
  const startCoords = useRef({ x: 0, y: 0 });
  const handleMainMenu = () => {
    setIsActive(!isActive);
  };
  // Tạo các cờ để đảm bảo âm thanh chỉ phát một lần
  const hasPlayed = useRef({
    click: false,
  });

  const playSound = (ref) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.play();
    }
  };

  const handleSound = () => {
    playSound(select1Ref);
    setIsSoundOn(!isSoundOn); // Đảo trạng thái
  };

  const [positionTaixiu, setPositionTaixiu] = useState({
    x: window.innerWidth / 2 - 512, // Giả sử kích thước modal là 890x540
    y: window.innerHeight / 2 - 270,
  });

  const closeModal = () => {
    playSound(select1Ref);
    setIsModalOpen(false);
    setModalType("");
  };

  const openModalGame = (type) => {
    setModalType(type);
    setIsModalOpen(true);
  };

  const handleMouseDown = (e, setPosition, currentPosition) => {
    startCoords.current = { x: e.clientX, y: e.clientY };
    isDragging.current = false;

    const offsetX = e.clientX - currentPosition.x;
    const offsetY = e.clientY - currentPosition.y;

    const moveHandler = (moveEvent) => {
      const dx = moveEvent.clientX - startCoords.current.x;
      const dy = moveEvent.clientY - startCoords.current.y;

      if (Math.sqrt(dx * dx + dy * dy) > 5) {
        isDragging.current = true;
        const newX = moveEvent.clientX - offsetX;
        const newY = moveEvent.clientY - offsetY;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleMouseUp = (upEvent) => {
      if (!isDragging.current) {
        handleMainMenu();
      }

      document.removeEventListener("mousemove", moveHandler);
      document.removeEventListener("mouseup", handleMouseUp);
    };

    document.addEventListener("mousemove", moveHandler);
    document.addEventListener("mouseup", handleMouseUp);
  };

  // tính năng chạm kéo thả
  const handleTouchStart = (e, setPosition, currentPosition) => {
    const touch = e.touches[0]; // Lấy tọa độ touch đầu tiên
    startCoords.current = { x: touch.clientX, y: touch.clientY };
    isDragging.current = false;

    const offsetX = touch.clientX - currentPosition.x;
    const offsetY = touch.clientY - currentPosition.y;

    disableScroll(); // Chặn cuộn khi bắt đầu kéo

    const moveHandler = (moveEvent) => {
      const moveTouch = moveEvent.touches[0];
      const dx = moveTouch.clientX - startCoords.current.x;
      const dy = moveTouch.clientY - startCoords.current.y;

      // Ngưỡng phân biệt tap và drag
      const dragThreshold = 10;

      if (Math.abs(dx) > dragThreshold || Math.abs(dy) > dragThreshold) {
        isDragging.current = true;
        const newX = moveTouch.clientX - offsetX;
        const newY = moveTouch.clientY - offsetY;
        setPosition({ x: newX, y: newY });
      }
    };

    const handleTouchEnd = (endEvent) => {
      const touch = endEvent.changedTouches[0];
      const dx = touch.clientX - startCoords.current.x;
      const dy = touch.clientY - startCoords.current.y;
      enableScroll(); // Bật lại cuộn khi kết thúc kéo

      // Kiểm tra tap khi di chuyển rất ít
      const dragThreshold = 10;

      if (Math.abs(dx) < dragThreshold && Math.abs(dy) < dragThreshold) {
        console.log("Tap detected!");
        handleTap();
      }

      document.removeEventListener("touchmove", moveHandler);
      document.removeEventListener("touchend", handleTouchEnd);
    };

    document.addEventListener("touchmove", moveHandler, { passive: false });
    document.addEventListener("touchend", handleTouchEnd);
  };

  let touchMoveHandler;
  const disableScroll = () => {
    touchMoveHandler = (e) => {
      e.preventDefault();
    };
    document.addEventListener("touchmove", touchMoveHandler, {
      passive: false,
    });
  };
  const enableScroll = () => {
    if (touchMoveHandler) {
      document.removeEventListener("touchmove", touchMoveHandler);
    }
  };
  // Xử lý khi chạm (tap)
  const handleTap = () => {
    setActiveSource("popup");
  };

  return (
    <div className="listgame-container d-flex justify-content-center">
      <div className="listgame-wrapper mt-3">
        <div className="bullhorn text-white fs-5">
          <i className="fa-solid fa-bullhorn mx-2">:</i>
          <marquee>
            NĂM 2025 NGẬP TRÀN MAY MẮN☘️ VÀ THẮNG LỚN🏆 CÙNG 8DAY, TRI ÂN TOÀN
            BỘ HỘI VIÊN VIP GỒM🎁: NGÀY HỘI VIP - TUẦN LỄ VIP - THÁNG VIP GÓP
            SỨC XÂY HỦ🥔 TOP 88 HỘI VIÊN CƯỢC TRONG THÁNG. THAM KHẢO NGAY ƯU ĐÃI
            &gt; MỤC VIP TRI ÂN HOT🚩🚩🚩
          </marquee>
        </div>
        <div className="listgame-title">
          <h1 className="style-title">CHƠI LÀ THẮNG</h1>
        </div>
        <div className="listgame-items">
          <div className="game-item-wraper">
            <div className="game-item" onClick={() => openModalGame("tx")}>
              <img src={taixiuImg} alt="" />
            </div>
            <div className="game-item" onClick={() => openModalGame("xd")}>
              <img src={xocdiaImg} alt="" />
            </div>
            <div className="game-item" onClick={() => openModalGame("ld")}>
              <img src={lodesieutocImg} alt="" />
            </div>
            <div className="game-item" onClick={() => navigate("/quaythuong")}>
              <img src={vongquayImg} alt="" />
            </div>
            <div className="game-item" onClick={() => openModalGame("bc")}>
              <img src={baucuaImg} alt="" />
            </div>
            <div className="game-item" onClick={() => openModalGame("pr")}>
              <img src={pokerImg} alt="" />
            </div>
          </div>
        </div>
      </div>
      <div className="ld-sound-icon" onClick={() => handleSound()}>
        <audio ref={select1Ref} src={selectIn} type="audio/m4a" />
      </div>
      {isModalOpen && (
        <>
          {!isLoaded ? (
            <GameLoader onReady={() => setIsLoaded(true)} />
          ) : (
            <div className="game-container">
              <div
                className="game-wrapper"
                style={{
                  position: "fixed",
                  left: positionTaixiu.x,
                  top: positionTaixiu.y,
                  scale: isMobile ? ".35" : "1",
                }}
                onMouseDown={(e) =>
                  handleMouseDown(e, setPositionTaixiu, positionTaixiu)
                }
                onTouchStart={(e) =>
                  handleTouchStart(e, setPositionTaixiu, positionTaixiu)
                }
                onClick={() => setActiveSource("modal")}
              >
                {modalType === "tx" ? (
                  <TaixiuMini title="" onClose={closeModal} />
                ) : modalType === "xd" ? (
                  <XocdiaMini title="" onClose={closeModal} />
                ) : modalType === "ld" ? (
                  <LodeSieutoc title="" onClose={closeModal} />
                ) : modalType === "bc" ? (
                  <BaucuaMini title="" onClose={closeModal} />
                ) : modalType === "pr" ? (
                  <Poker title="" onClose={closeModal} />
                ) : null}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Listgame;
