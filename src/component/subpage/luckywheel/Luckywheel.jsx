import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import beginSound from "../../assets/audio/lucky.m4a";
import winSound from "../../assets/audio/win.m4a";
import musicOff from "../../assets/images/soundOff.svg";
import musicOn from "../../assets/images/soundOn.svg";
import { XImg } from "../../graphic/gLode";
import {
  List,
  MainImg,
  Prize128k,
  Prize188k,
  Prize38k,
  Prize68k,
  Prize8888k,
  Prize88k,
  Prize8k,
  Title,
} from "../../graphic/gLuckyWheel";
import useIsMobile from "../../utils/useIsMobile";
import "./Luckywheel.scss";
import { useWheel } from "./useWheel";
import WheelCanvas from "./WheelCanvas";
const desUrl = process.env.REACT_APP_URL_SITE;
const feUrl = process.env.REACT_APP_FRONT_END;

const LuckyWheel = () => {
  const isMobile = useIsMobile();
  const [isSoundOn, setIsSoundOn] = useState(false);
  const bgAudioRef = useRef(null);
  const beginRef = useRef(null);
  const winRef = useRef(null);
  const [enableSound, setEnableSound] = useState(false);

  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [message, setMessage] = useState("");
  const [isShowModalForm, setIsShowModalForm] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Ngăn form reload trang

    // 🔍 Kiểm tra dữ liệu trên Frontend trước khi gửi lên Server
    if (!name || !phone) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Lỗi!",
        text: "Vui lòng nhập đầy đủ thông tin!",
      });
      return;
    }

    if (name.length > 256) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Lỗi!",
        text: "Tên không được vượt quá 256 ký tự!",
      });
      return;
    }

    if (!/^\d{10}$/.test(phone)) {
      Swal.fire({
        icon: "warning",
        title: "⚠️ Lỗi!",
        text: "Số điện thoại phải có đúng 10 chữ số!",
      });
      return;
    }

    try {
      const response = await fetch(`${desUrl}/luckywheel/add-member`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, phone, prize: winningPrize }),
      });

      const data = await response.json();
      if (response.ok) {
        Swal.fire({
          icon: "success",
          title: "✅ Đăng ký thành công!",
          text: "Cảm ơn bạn đã tham gia!",
          confirmButtonColor: "#3085d6",
          confirmButtonText: "OK",
        }).then(() => {
          setName("");
          setPhone("");
          navigate("/");
        });
      } else {
        setMessage(`❌ Lỗi: ${data.message}`);
      }
    } catch (error) {
      setMessage("❌ Lỗi kết nối đến server!");
      // console.error(error);
    }
  };

  const playAndSlowDown = () => {
    if (beginRef.current) {
      beginRef.current.currentTime = 0;
      beginRef.current.play();
      beginRef.current.playbackRate = 1.0; // Tốc độ phát bình thường

      // Sau 3 giây, bắt đầu giảm tốc độ
      setTimeout(() => {
        let speed = 1.0;
        const slowDownInterval = setInterval(() => {
          if (speed > 0.5) {
            speed -= 0.05; // Giảm tốc độ dần
            beginRef.current.playbackRate = speed;
          } else {
            clearInterval(slowDownInterval); // Dừng giảm tốc độ khi đạt 0.5
          }
        }, 150); // Mỗi 150ms giảm tốc độ để hiệu ứng mượt hơn
      }, 1700); // Bắt đầu giảm tốc độ sau 3 giây
    }
    setTimeout(() => {
      setIsShowModalForm(true);
    }, 8000);
  };

  const handleSound = () => {
    // playSound(select1Ref);
    if (isSoundOn) {
      setEnableSound(true);
    } else {
      setEnableSound(false);
    }
    setIsSoundOn(!isSoundOn); // Đảo trạng thái
  };

  useEffect(() => {
    const playAudio = () => {
      if (bgAudioRef.current) {
        bgAudioRef.current.volume = 0.3; // Thiết lập âm lượng
        const playPromise = bgAudioRef.current.play();

        if (playPromise !== undefined) {
          playPromise
            .then(() => console.log("🔊 Âm thanh nền đã phát thành công"))
            .catch((error) =>
              console.error("⚠️ Không thể phát âm thanh:", error)
            );
        }
      }
      // Sau khi phát âm thanh, bỏ lắng nghe sự kiện để tránh gọi lại nhiều lần
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };

    // Chỉ lắng nghe sự kiện nếu âm thanh chưa phát
    if (isSoundOn) {
      document.addEventListener("click", playAudio);
      document.addEventListener("touchstart", playAudio);
    }

    return () => {
      document.removeEventListener("click", playAudio);
      document.removeEventListener("touchstart", playAudio);
    };
  }, [isSoundOn]);

  const playSound = (ref) => {
    if (ref.current) {
      ref.current.currentTime = 0;
      ref.current.play();
    }
  };

  const {
    canvasRef,
    startSpin,
    isSpinning,
    radianData, // ✅ Lấy danh sách góc quay từ useWheel.js
  } = useWheel();

  // console.log(isSpinning)

  const [winningPrize, setWinningPrize] = useState(""); // ✅ Lưu phần thưởng trúng
  const [initialRadianData, setInitialRadianData] = useState([]); // ✅ Lưu tọa độ ban đầu

  // 🔥 Hàm xác định phần thưởng trúng dựa trên góc quay
  const determineWinningPrize = () => {
    const arrowPosition1 = 4.7123; // 🎯 Mũi tên chỉ vào góc này 4.7123

    for (const item of radianData) {
      const startRad = parseFloat(item.startAngle);
      const endRad = parseFloat(item.endAngle);

      // console.log(
      //   `🧐 Kiểm tra phần thưởng: ${item.prize}, Start: ${startRad}, End: ${endRad}`
      // );

      if (startRad < arrowPosition1 && endRad > arrowPosition1) {
        // console.log(`✅ Trúng thưởng: ${item.prize}`);
        setWinningPrize(item.prize); // ✅ Cập nhật phần thưởng trúng
        return;
      }
    }
  };

  // 🔥 Khi vòng quay dừng, xác định phần thưởng
  useEffect(() => {
    if (!isSpinning && radianData.length > 0) {
      determineWinningPrize(); // ✅ Gọi hàm xác định kết quả
    }
  }, [isSpinning]); // ✅ Theo dõi thay đổi của `isSpinning`

  // 🔥 Lưu tọa độ ban đầu khi component mount
  useEffect(() => {
    if (radianData.length > 0 && initialRadianData.length === 0) {
      setInitialRadianData(radianData); // ✅ Lưu lại tọa độ ban đầu
    }
  }, [radianData]); // ✅ Chỉ chạy khi radianData có dữ liệu

  useEffect(() => {
    if (winningPrize) {
      playSound(winRef); // Chỉ phát âm thanh khi có phần thưởng mới
    }
  }, [winningPrize]); // Theo dõi thay đổi của winningPrize

  const onClose = () => {
    setIsShowModalForm(false);
  };

  return (
    <div className="wheel-wrapper">
      <div
        className={`${isMobile ? "wheel-container-mobile" : "wheel-container"}`}
      >
        <a href={feUrl}>Trở về trang chủ</a>

        <Title className="title-wheel" />
        <div className={`${isMobile ? "group-wheel-mb" : "group-wheel-pc"}`}>
          <div className="group-wheel-canvas">
            <MainImg
              className="main-wheel"
              onClick={() => {
                startSpin();
                playAndSlowDown();
              }}
              disable={isSpinning}
            />
            <WheelCanvas canvasRef={canvasRef} className="wheel-canvas" />
          </div>
          <List />
        </div>
      </div>
      {console.log(winningPrize, isShowModalForm)}
      {winningPrize && isShowModalForm && (
        <div className="prizes-container">
          {winningPrize === "8K" ? (
            isMobile ? (
              <Prize8k mb />
            ) : (
              <Prize8k pc onClick={handleSubmit} />
            )
          ) : winningPrize === "38K" ? (
            isMobile ? (
              <Prize38k mb />
            ) : (
              <Prize38k pc />
            )
          ) : winningPrize === "68K" ? (
            isMobile ? (
              <Prize68k mb />
            ) : (
              <Prize68k pc />
            )
          ) : winningPrize === "88K" ? (
            isMobile ? (
              <Prize88k mb />
            ) : (
              <Prize88k pc />
            )
          ) : winningPrize === "128K" ? (
            isMobile ? (
              <Prize128k mb />
            ) : (
              <Prize128k pc />
            )
          ) : winningPrize === "188K" ? (
            isMobile ? (
              <Prize188k mb />
            ) : (
              <Prize188k pc />
            )
          ) : winningPrize === "8888K" ? (
            isMobile ? (
              <Prize8888k mb />
            ) : (
              <Prize8888k pc />
            )
          ) : null}
          <div
            className="form-gift"
            style={{
              textAlign: "center",
              marginTop: "0px",
              scale: isMobile ? ".4" : "1",
              left: isMobile ? "10%" : "50%",
              top: isMobile ? "20%" : "43%",
            }}
          >
            <XImg onClick={onClose} top={40} left={480} />
            <div className="form-sign">
              <input
                type="text"
                placeholder="Nhập tên hoặc nickname..."
                value={name}
                maxLength={256}
                onChange={(e) => setName(e.target.value)}
                required
              />
              <input
                type="tel"
                placeholder="Nhập số điện thoại..."
                value={phone}
                onChange={(e) => {
                  const sanitizedValue = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                  setPhone(sanitizedValue);
                }}
                required
                maxLength={10} // ✅ Giới hạn nhập 10 số
                pattern="[0-9]{10}" // ✅ Chỉ cho phép số
                onInput={(e) => {
                  // Chặn nhập chữ, chỉ cho phép số
                  e.target.value = e.target.value
                    .replace(/\D/g, "")
                    .slice(0, 10);
                }}
              />
              <button
                type="submit"
                onClick={handleSubmit} // Gửi dữ liệu về backend khi bấm
                style={{
                  padding: "10px 20px",
                  color: "white",
                  border: "1px solid rgb(5, 68, 151)",
                  borderRadius: "10px",
                  boxShadow: "5px 5px 15px rgba(0, 0, 0, 0.7)",
                  background: "rgb(30, 93, 187)",
                  width: "100px",
                  height: "50px",
                  cursor: "pointer",
                  marginTop: "10px",
                  fontWeight: "700",
                }}
              >
                Gửi
              </button>
            </div>
            {message && (
              <p style={{ marginTop: "20px", fontWeight: "bold" }}>{message}</p>
            )}
          </div>
        </div>
      )}

      <div className="lw-sound-icon" onClick={() => handleSound()}>
        {isSoundOn ? (
          <>
            <img src={musicOn} />
            <audio ref={beginRef} src={beginSound} type="audio/m4a" />
            <audio ref={winRef} src={winSound} type="audio/m4a" volume="0.2" />
          </>
        ) : (
          <>
            <img src={musicOff} />
          </>
        )}
      </div>
    </div>
  );
};

export default LuckyWheel;
