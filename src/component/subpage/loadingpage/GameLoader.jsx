import { useState, useEffect } from "react";
import LoadingScreen from "./LoadingScreen";

// Import hình ảnh từ thư mục src/assets
import taixiuMain from "../../assets/images/taixiuObj.png";
import xucxac from "../../assets/images/xucxac.png";
import other from "../../assets/images/other.webp";
import decor from "../../assets/images/decor.png";
import luckyWheel from "../../assets/images/luckywheel.webp";
import xocdiaMain from "../../assets/images/Xocdia-Main.webp";
import wheelPrize from "../../assets/images/wheel-prizes.png";

// Import âm thanh từ thư mục src/assets
import bgMusic from "../../assets/audio/bgSound.mp3";

const preloadImages = (images) => {
  return Promise.all(
    images.map(
      (imgSrc) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = imgSrc;
          img.onload = resolve;
          img.onerror = reject;
        })
    )
  );
};

const preloadSounds = (sounds) => {
  return Promise.all(
    sounds.map(
      (soundSrc) =>
        new Promise((resolve, reject) => {
          const audio = new Audio(soundSrc);
          audio.oncanplaythrough = resolve;
          audio.onerror = reject;
        })
    )
  );
};

const GameLoader = ({ onReady }) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const imageUrls = [
      taixiuMain,
      xucxac,
      other,
      decor,
      luckyWheel,
      xocdiaMain,
      wheelPrize,
    ];
    const soundUrls = [bgMusic];

    const totalAssets = imageUrls.length + soundUrls.length;
    let loadedAssets = 0;

    const updateProgress = () => {
      loadedAssets += 1;
      setProgress(Math.round((loadedAssets / totalAssets) * 100));
    };

    Promise.all([
      preloadImages(imageUrls).then(updateProgress),
      preloadSounds(soundUrls).then(updateProgress),
    ])
      .then(() => {
        setProgress(100);
        setTimeout(() => onReady(), 3000); // Chờ 0.5s trước khi vào game
      })
      .catch((error) => console.error("Loading error:", error));
  }, []);

  return <LoadingScreen progress={progress} />;
};

export default GameLoader;
