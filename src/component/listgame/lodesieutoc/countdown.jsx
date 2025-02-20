import { useState, useEffect } from "react";

const useCountdown = (initialTime, onCountdownEnd) => {
  const [countdown, setCountdown] = useState(initialTime);

  useEffect(() => {
    if (countdown > 0) {
      const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
      return () => clearTimeout(timer);
    } else if (countdown === 0 && onCountdownEnd) {
      onCountdownEnd(); // Gọi callback khi đếm ngược kết thúc
    }
  }, [countdown, onCountdownEnd]);

  const resetCountdown = (time) => {
    setCountdown(time); // Reset thời gian đếm ngược
  };

  return [countdown, resetCountdown];
};

export default useCountdown;
