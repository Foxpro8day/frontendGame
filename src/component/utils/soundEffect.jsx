import { Howl } from "howler";
import React, { createContext, useEffect, useState } from "react";
// list âm thanh
import sndBackground from "../assets/audio/bgSound.mp3";
import sndClockTick from "../assets/audio/clockTick.m4a";
import {
  default as sndDicesFlying,
  default as sndRollingBall,
} from "../assets/audio/dicesFlying.m4a";
import sndLose from "../assets/audio/lose.m4a";
import sndLucky from "../assets/audio/lucky.m4a";
import sndPlateRemove from "../assets/audio/plateRemove.m4a";
import sndReadyGo from "../assets/audio/readyGo.m4a";
import sndReveal from "../assets/audio/reveal.m4a";
import sndRollingBC from "../assets/audio/RollingBC.m4a";
import sndRollingBC2 from "../assets/audio/RollingBC2.m4a";
import sndRollingTX from "../assets/audio/RollingTX.m4a";
import sndRollingXD from "../assets/audio/RollingXD.m4a";
import sndSelect1 from "../assets/audio/select1.m4a";
import sndSelect2 from "../assets/audio/select2.m4a";
import sndSelect3 from "../assets/audio/select3.m4a";
import sndSelect4 from "../assets/audio/select4.m4a";
import sndWin from "../assets/audio/win.m4a";

export const SoundContext = createContext();
export const SoundProvider = ({ children }) => {
  const [sounds, setSounds] = useState(null);

  useEffect(() => {
    const soundList = {
      bgSound: new Howl({ src: sndBackground }),
      clockTick: new Howl({ src: sndClockTick }),
      dicesFlying: new Howl({ src: sndDicesFlying }),
      lose: new Howl({ src: sndLose }),
      lucky: new Howl({ src: sndLucky }),
      plateRemove: new Howl({ src: sndPlateRemove }),
      readyGo: new Howl({ src: sndReadyGo }),
      rollingBall: new Howl({ src: sndRollingBall }),
      select1: new Howl({ src: sndSelect1 }),
      select2: new Howl({ src: sndSelect2 }),
      select3: new Howl({ src: sndSelect3 }),
      select4: new Howl({ src: sndSelect4 }),
      win: new Howl({ src: sndWin }),
      rollingTX: new Howl({ src: sndRollingTX }),
      rollingXD: new Howl({ src: sndRollingXD }),
      rollingBC: new Howl({ src: sndRollingBC }),
      rollingBC2: new Howl({ src: sndRollingBC2 }),
      reveal: new Howl({ src: sndReveal }),
    };

    setSounds(soundList);

    return () => {
      Object.values(soundList).forEach((sound) => sound.unload());
    };
  }, []);

  const playSound = (soundName, options = {}) => {
    const { loop = false, volume = 1 } = options;

    if (sounds[soundName]) {
      sounds[soundName].loop(loop); // Bật loop nếu có
      sounds[soundName].volume(volume); // Đặt volume nếu có
      sounds[soundName].play();
    } else {
      console.warn(`Âm thanh "${soundName}" không tồn tại!`);
    }
  };

  const stopSound = (soundName) => {
    if (sounds[soundName]) {
      sounds[soundName].stop();
    }
    };
    
    const pauseSound = (soundName) => {
      if (sounds[soundName]) {
        sounds[soundName].pause(); // Dừng tạm thời (pause)
      }
    };

  return (
    <SoundContext.Provider value={{ playSound, stopSound, pauseSound }}>
      {children}
    </SoundContext.Provider>
  );
};
