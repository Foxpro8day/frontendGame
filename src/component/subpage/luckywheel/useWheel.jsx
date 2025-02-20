import { useEffect, useRef, useState } from "react";

export const useWheel = () => {
  const canvasRef = useRef(null);
  const angleRef = useRef(0);
  const autoSpinAngleRef = useRef(0);
  const [isSpinning, setIsSpinning] = useState(false);
  const [isAutoSpinning, setIsAutoSpinning] = useState(true); // ✅ Quay chậm tự động
  const [radianData, setRadianData] = useState([]); // ✅ Lưu radian của từng phần thưởng
  const [winningValue, setWinningValue] = useState(null); // ✅ Lưu giá trị phần thưởng
  // const [radius, setRadius] = useState(0)

  // 🎯 Danh sách giải thưởng
  const prizes = [
    { name: "TRÚNG LỚN\n8888K", amount: 0, value: 6 },
    { name: "38K", amount: 20, value: 0 },
    { name: "MAY MẮN\n128K", amount: 0, value: 1 },
    { name: "8K", amount: 60, value: 2 },
    { name: "68K", amount: 20, value: 3 },
    { name: "TÀI LỘC\n188K", amount: 0, value: 4 },
    { name: "88K", amount: 0, value: 5 },
  ];
  const sections = prizes.length;
  const sectionAngle = (2 * Math.PI) / sections;

  // 🟢 **Đặt vị trí vòng quay ban đầu**
  useEffect(() => {
    angleRef.current = Math.random() * 2 * Math.PI; // Ngẫu nhiên từ 0 đến 360 độ
    updateRadianData();
  }, []);

  // 🎡 Hàm random phần thưởng từ danh sách có xác suất
  const getRandomPrize = () => {
    let prizePool = [];
    prizes.forEach(({ name, amount }) => {
      prizePool.push(...Array(amount).fill(name));
    });

    // Xáo trộn mảng (Fisher-Yates Shuffle Algorithm)
    for (let i = prizePool.length - 1; i > 0; i--) {
      let j = Math.floor(Math.random() * (i + 1));
      [prizePool[i], prizePool[j]] = [prizePool[j], prizePool[i]];
    }

    // Chọn ngẫu nhiên một phần thưởng
    const selectedPrize =
      prizePool.length > 0
        ? prizePool[Math.floor(Math.random() * prizePool.length)]
        : "Không có phần thưởng!";

    const foundPrize = prizes.find((prize) => prize.name === selectedPrize);
    return foundPrize ? foundPrize.value : null;
  };

  // 🎡 Hàm bắt đầu quay chính
  const startSpin = () => {
    if (isSpinning) return;
    setIsSpinning(true);
    setWinningValue(null);
    setIsAutoSpinning(false); // 🛑 Dừng quay chậm khi người dùng quay thật

    const correctionAngle = 0; //2 * Math.PI - autoSpinAngleRef.current;
    angleRef.current = (angleRef.current + correctionAngle) % (2 * Math.PI);
    autoSpinAngleRef.current = 0; // ✅ Reset autoSpin góc về 0

    const selectedValue = getRandomPrize();
    if (selectedValue === null) {
      setIsSpinning(false);
      return;
    }

    const initRounds = 20;
    //                              0.1428      +     (0.0714    - 0.01)
    const extraRoundsUnder =
      selectedValue * (1 / sections) + (1 / sections / 2 - 0.01); // 7 phần,  mỗi phần 0,1428 , 0,0714, ban đầu cộng thêm 0.035 để đến mốc cuối
    //                              0.1428      -     (0.714     - 0.01)
    const extraRoundsUpper =
      selectedValue * (1 / sections) - (1 / sections / 2 - 0.01);
    const extraRandomRounds =
      -0.03571 +
      Math.random() * (extraRoundsUpper - extraRoundsUnder) +
      extraRoundsUnder;

    const totalRounds = initRounds + extraRandomRounds;

    const initialSpeed = 2;
    let startTime = Date.now();
    let totalAngle = totalRounds * 2 * Math.PI;
    let duration = totalRounds / initialSpeed; // Giảm tốc độ quay
    let animationFrameId; // Lưu ID để kiểm soát requestAnimationFrame
    // console.log("abc", selectedValue);

    const animate = () => {
      const elapsed = (Date.now() - startTime) / 1000;
      const progress = elapsed / duration;

      if (progress >= 1) {
        setIsSpinning(false);
        angleRef.current = totalAngle; // 🔹 Giữ vòng quay đúng góc
        autoSpinAngleRef.current = 0; // ✅ Dừng quay chậm ngay khi vòng quay kết thúc
        setTimeout(() => {
          setIsAutoSpinning(true); // ✅ Bật lại quay chậm
        }, 5000); // 5000ms = 5 giây
        updateRadianData();
        return;
      }

      const easedProgress = 1 - Math.pow(2, -14 * progress);
      angleRef.current = easedProgress * totalAngle;
      updateRadianData(); // 🔹 Cập nhật dữ liệu để canvas vẽ lại

      animationFrameId = requestAnimationFrame(animate);
    };

    animate();
  };

  // 🔄 **Animation quay chậm tự động**
  useEffect(() => {
    let animationFrameId; // Lưu ID của requestAnimationFrame để hủy sau này
    const autoSpin = () => {
      if (!isAutoSpinning) return; // 🛑 Ngăn chạy tiếp khi isAutoSpinning bị tắt
      autoSpinAngleRef.current += 0.002; // ✅ Tốc độ quay chậm
      if (autoSpinAngleRef.current >= 2 * Math.PI) {
        autoSpinAngleRef.current = 0;
      }
      updateRadianData();
      animationFrameId = requestAnimationFrame(autoSpin);
    };

    autoSpin();
    return () => {
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
    };
  }, [isAutoSpinning]);

  // 🎯 Cập nhật `radianData`
  const updateRadianData = () => {
    const newData = prizes.map((prize, i) => {
      const baseStart = 2 * Math.PI - (i + 1) * sectionAngle;
      const baseEnd = 2 * Math.PI - i * sectionAngle;

      return {
        prize: prize.name,
        startAngle: (baseStart + angleRef.current) % (2 * Math.PI),
        endAngle: (baseEnd + angleRef.current) % (2 * Math.PI),
      };
    });

    setRadianData(newData);
  };

  // 🔹 Vẽ vòng quay
  const drawWheel = (ctx, angle) => {
    if (!ctx) return;

    const colors = [
      "#ff5733",
      "#33ff57",
      "#5733ff",
      "#f1c40f",
      "#e74c3c",
      "#8e44ad",
      "#3498db",
      "#2ecc71",
    ];
    const centerX = ctx.canvas.width / 2;
    const centerY = ctx.canvas.height / 2;
    const calculatedRadius = Math.min(centerX, centerY) - 10;

    ctx.clearRect(0, 0, ctx.canvas.width, ctx.canvas.height);
    ctx.save();
    ctx.translate(centerX, centerY);

    for (let i = 0; i < sections; i++) {
      const startAngle =
        2 * Math.PI - (i + 1) * sectionAngle + angle + autoSpinAngleRef.current;
      const endAngle =
        2 * Math.PI - i * sectionAngle + angle + autoSpinAngleRef.current;

      // 🎨 **Vẽ từng phần của vòng quay**
      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.arc(0, 0, calculatedRadius, startAngle, endAngle);
      ctx.fillStyle = colors[i % colors.length];
      ctx.fill();

      // 🏆 **Vẽ tên giải thưởng**
      ctx.save();
      ctx.fillStyle = "#ffffff"; // Màu chữ trắng
      ctx.font = "bold 20px Arial"; // Kích thước chữ
      ctx.textAlign = "center";
      ctx.textBaseline = "middle";

      const textAngle = (startAngle + endAngle) / 2;
      const textX = Math.cos(textAngle) * (calculatedRadius * 0.7);
      const textY = Math.sin(textAngle) * (calculatedRadius * 0.7);

      ctx.translate(textX, textY);
      ctx.rotate(textAngle + Math.PI / 2); // Căn chỉnh chữ theo vòng quay

      // ✨ **Hiển thị tên giải thưởng, hỗ trợ xuống dòng nếu có "\n"**
      const prizeText = prizes[i].name.split("\n");
      prizeText.forEach((line, index) => {
        ctx.fillText(line, 0, index * 22); // 22px khoảng cách giữa dòng
      });
      ctx.restore();
    }
    ctx.restore();
  };


  // 🎯 Cập nhật canvas khi `angleRef` hoặc `autoSpinAngleRef` thay đổi
  useEffect(() => {
    if (!canvasRef.current) return;
    const ctx = canvasRef.current.getContext("2d");
    drawWheel(ctx, angleRef.current);
  }, [angleRef.current, autoSpinAngleRef.current]);

  return {
    canvasRef,
    startSpin,
    isSpinning,
    isAutoSpinning,
    radianData, // ✅ Trả về radian của từng phần thưởng
    winningValue,
  };
};
