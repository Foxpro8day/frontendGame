import buttonImg from "../assets/images/buttons.webp";
import chibiImg from "../assets/images/chibi.webp";
import otherImg from "../assets/images/other.webp";
import "./gOther.scss";

// button blue
const ButtonBlue = (props) => {
  const imgPos = { x: 10, y: 147, width: 234, height: 100 };

  return (
    <>
      <div
        className={`button-styles ${props.className}`}
        onClick={props.onClick}
        style={{
          // position: "absolute",
          // bottom: props.bottom,
          // left: props.left,
          backgroundImage: `url(${buttonImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          // transform: 'scale(.5)',
          scale: ".5",
        }}
      >
        <div className="button-text">
          <span>{props.icon}</span>
          {props.text}
        </div>
      </div>
    </>
  );
};
// chiến thắng
const WinImg = (props) => {
  const imgPos = { x: 640, y: 350, width: 570, height: 570 };

  return (
    <>
      <div
        className="win-img"
        style={{
          position: "absolute",
          bottom: props.bottom,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
        }}
      ></div>
    </>
  );
};
// thua
const LoseImg = (props) => {
  const imgPos = { x: 5, y: 350, width: 570, height: 570 };

  return (
    <>
      <div
        className="win-img"
        style={{
          position: "absolute",
          bottom: props.bottom,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
        }}
      ></div>
    </>
  );
};
// khung hướng dẫn chơi
const BgInsImg = (props) => {
  const imgPos = { x: 11, y: 71, width: 421, height: 269 };
  const gameIntruction = (gameName) => {
    switch (gameName) {
      case "tx":
        return <ContentInsTX />;
      case "xd":
        return <ContentInsXD />;
      case "bc":
        return <ContentInsBC />;
      case "Lo2so":
        return <ContentInsLD className="ld-Lo2so" />;
      case "Lo3so":
        return <ContentInsLD className="ld-Lo3so" />;
      case "Xien2so":
        return <ContentInsLD className="ld-Xien2so" />;
      case "Xien3so":
        return <ContentInsLD className="ld-Xien3so" />;
      case "Xien4so":
        return <ContentInsLD className="ld-Xien4so" />;
      case "Truot4so":
        return <ContentInsLD className="ld-Truot4so" />;
      case "Truot8so":
        return <ContentInsLD className="ld-Truot8so" />;
      case "Truot10so":
        return <ContentInsLD className="ld-Truot10so" />;
      case "Dau":
        return <ContentInsLD className="ld-Dau" />;
      case "Duoi":
        return <ContentInsLD className="ld-Duoi" />;
      case "Dedau":
        return <ContentInsLD className="ld-Dedau" />;
      case "DeDB":
        return <ContentInsLD className="ld-DeDB" />;
      case "Bacang":
        return <ContentInsLD className="ld-Bacang" />;
      default:
        return <div>Không tìm thấy hướng dẫn cho trò chơi này.</div>;
    }
  };

  return (
    <>
      <div
        className=""
        style={{
          position: "absolute",
          transform: "rotate(90deg)",
          top: props.top, //150,
          left: props.left, // 305,
          backgroundImage: `url(${otherImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
        }}
      ></div>
      <div className="ins-content">
        <i className="fa-solid fa-x close-icon" onClick={props.onClick}></i>
        <div className="intrustion-title">Hướng Dẫn</div>
        {gameIntruction(props.gameName)}
      </div>
    </>
  );
};

// nội dung hướng dẫn: tùy trò
const ContentInsTX = (props) => {
  return (
    <div className="intrustion-content">
      <div className="rule-title">Luật chơi</div>
      <div className="rule-content">
        <ul>
          <li>
            Dễ chơi, dễ trúng. Người chơi chỉ cần lựa chọn đặt Tài hoặc Xỉu để
            chiến thắng.
          </li>
          <li>Tổng số điểm của xúc xắc từ 11 điểm đến 18 điểm: Tài.</li>
          <li>Tổng số điểm của xúc xắc từ 3 điểm đến 10 điểm: Xỉu.</li>
        </ul>
      </div>
      <div className="htp-title">Cách chơi</div>
      <div className="htp-content">
        <ul>
          <li>Nhấn vào nút bắt đầu</li>
          <li>Bắt đầu đặt cược</li>
          <li>Nhấp chơi lại để bắt đầu ván mới</li>
        </ul>
      </div>
    </div>
  );
};
const ContentInsXD = (props) => {
  return (
    <div className="intrustion-content">
      <div className="rule-title-xd">Luật chơi</div>
      <div className="rule-content-xd">
        <ul>
          <li>
            Trò xóc đĩa là trò chơi đơn giản chỉ gồm có dụng cụ xóc dĩa và bàn
            cược.
          </li>
          <li>
            Dụng cụ xóc đĩa gồm có 1 cái bát, 1 cái đĩa và 4 đồng xu được phân
            biệt bởi 2 màu trắng và đỏ.
          </li>
          <li>Bạn sẽ dự đoán kết quả cho mỗi lượt chơi.</li>
        </ul>
      </div>
      <div className="htp-title">Cách chơi</div>
      <div className="htp-content">
        <ul>
          <li>Nhấn vào nút bắt đầu</li>
          <li>Bắt đầu đặt cược</li>
          <li>Nhấp chơi lại để bắt đầu ván mới</li>
        </ul>
      </div>
    </div>
  );
};
const ContentInsLD = (props) => {
  const renderContent = () => {
    switch (props.className) {
      case "ld-Lo2so":
        return (
          <div className="htp-content">
            <ul>
              <li>Đánh 2 chữ số cuối trong lô 27 giải.</li>
              <li>
                Thắng gấp 98 lần, nếu số đó về N lần thì tính kết quả x N lần.
              </li>
              <li>
                Ví dụ: đánh lô 00 - 1 con 1k, tổng thanh toán: 1k x 27 = 27k.
                Nếu trong lô có 2 chữ sô cuối là 00 thì tiền thắng: 1x x 98 =
                98k, nếu có N lần 2 chữ số cuối là 00 thì tiền thắng: 1k x 98 x
                N.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Lo3so":
        return (
          <div className="htp-content">
            <ul>
              <li>Đánh 3 chữ số cuối trong lô 23 giải.</li>
              <li>
                Thắng gấp 980 lần, nếu số đó về N lần thì tính kết quả x N lần.
              </li>
              <li>
                Ví dụ: đánh lô 000 - 1 con 1k, tổng thanh toán: 1k x 23 = 23k.
                Nếu trong lô có 2 chữ sô cuối là 000 thì tiền thắng: 1x x 980 =
                980k, nếu có N lần 3 chữ số cuối là 000 thì tiền thắng: 1k x 980
                x N.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Xien2so":
        return (
          <div className="htp-content">
            <ul>
              <li>Xiên 2 của 2 chữ số cuối trong lô 27 giải.</li>
              <li>Thắng gấp 16.87 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho xiên 00 - 01, tổng thanh toán: 1k. Nếu
                trong lô có "2 chữ sô cuối là 00 và 01" thì tiền thắng: 1x x
                16.87 = 16.87k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Xien3so":
        return (
          <div className="htp-content">
            <ul>
              <li>Xiên 3 của 2 chữ số cuối trong lô 27 giải.</li>
              <li>Thắng gấp 67.23 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho xiên 00 - 01 - 02, tổng thanh toán: 1k.
                Nếu trong lô có "2 chữ sô cuối là 00, 01, 02" thì tiền thắng: 1x
                x 67.23 = 67.23k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Xien4so":
        return (
          <div className="htp-content">
            <ul>
              <li>Xiên 4 của 2 chữ số cuối trong lô 27 giải.</li>
              <li>Thắng gấp 261 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho xiên 00 - 01 - 02 - 03, tổng thanh toán:
                1k. Nếu trong lô có "2 chữ sô cuối là 00, 01, 02, 03" thì tiền
                thắng: 1x x 261 = 261k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Truot4so":
        return (
          <div className="htp-content">
            <ul>
              <li>Trượt xiên 4 của 2 chữ số cuối trong lô 27 giải.</li>
              <li>Thắng gấp 2.95 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho xiên 00 - 01 - 02 - 03, tổng thanh toán:
                1k. Nếu trong lô có "2 chữ sô cuối là 00, 01, 02, 03" thì tiền
                thắng: 1x x 2.95 = 2.95k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Truot8so":
        return (
          <div className="htp-content">
            <ul>
              <li>Trượt xiên 8 của 2 chữ số cuối trong lô 27 giải.</li>
              <li>Thắng gấp 9.31 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho xiên 00 - 01 - 02 - 03 - 04 - 05 - 06 -
                07, tổng thanh toán: 1k. Nếu trong lô có "2 chữ sô cuối là 00,
                01, 02, 03, 04, 05, 06, 07" thì tiền thắng: 1x x 9.31 = 9.31k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Truot10so":
        return (
          <div className="htp-content">
            <ul>
              <li>Trượt xiên 10 của 2 chữ số cuối trong lô 27 giải.</li>
              <li>Thắng gấp 16.85 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho xiên 00 - 01 - 02 - 03 - 04 - 05 - 06 -
                07 - 08 - 09, tổng thanh toán: 1k. Nếu trong lô có "2 chữ sô
                cuối là 00, 01, 02, 03, 04, 05, 06, 07, 08, 09" thì tiền thắng:
                1 x 16.85 = 16.85k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Dau":
        return (
          <div className="htp-content">
            <ul>
              <li>Đánh 1 chữ số ở hàng chục của giải ĐB.</li>
              <li>Thắng gấp 9.5 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho số 0, tổng thanh toán: 1k. Nếu giải ĐB là
                xxx0x thì tiền thắng: 1 x 9.5 = 9.5k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Duoi":
        return (
          <div className="htp-content">
            <ul>
              <li>Đánh 1 chữ số cuối của giải ĐB.</li>
              <li>Thắng gấp 9.5 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho số 0, tổng thanh toán: 1k. Nếu giải ĐB là
                xxxx0 thì tiền thắng: 1 x 9.5 = 9.5k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Dedau":
        return (
          <div className="htp-content">
            <ul>
              <li>Đánh lô giải 7(có 4 giải, thanh toán đủ).</li>
              <li>Thắng gấp 98 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho số 00, tổng thanh toán: 1k x 4 = 4k. Nếu
                trong lô giải 7 có 1 số là 00 thì tiền thắng: 1 x 98 = 98k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-DeDB":
        return (
          <div className="htp-content">
            <ul>
              <li>Đánh 2 chữ số cuối trong giải ĐB</li>
              <li>Thắng gấp 98 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho số 00, tổng thanh toán: 1k. Nếu giải ĐB
                là xxx00 thì tiền thắng: 1 x 98 = 98k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      case "ld-Bacang":
        return (
          <div className="htp-content">
            <ul>
              <li>Đánh 3 chữ số cuối trong giải ĐB</li>
              <li>Thắng gấp 980 lần.</li>
              <li>
                Ví dụ: đánh con 1k cho số 000, tổng thanh toán: 1k. Nếu giải ĐB
                là xx000 thì tiền thắng: 1 x 980 = 980k.
              </li>
              <li>Nhấp chơi lại để bắt đầu ván mới</li>
            </ul>
          </div>
        );
      default:
        return <>Không tim Thấy hướng dẫn</>;
    }
  };

  return (
    <div className={`intrustion-content ${props.className}`}>
      <div className="htp-title">Cách chơi</div>
      {renderContent()}
    </div>
  );
};
const ContentInsBC = (props) => {
  return (
    <div className="intrustion-content">
      <div className="rule-title">Luật chơi</div>
      <div className="rule-content">
        <ul>
          <li>Tiền thắng = tiền cược x2 nếu ra 1 xí ngầu</li>
          <li>Tiền thắng = tiền cược x3 nếu ra 2 xí ngầu giống nhau</li>
          <li>Nổ hũ nếu 3 xí ngầu giống nhau</li>
        </ul>
      </div>
      <div className="htp-title">Cách chơi</div>
      <div className="htp-content">
        <ul>
          <li>Khi bắt đầu ván mới hãy nhấp vào linh vật mà bạn thích</li>
          <li>chỉ đặt tối đa được 3 linh vật</li>
          <li>Chờ đồng hồ đếm ngược và xem kết quả</li>
        </ul>
      </div>
    </div>
  );
};

// khung giây đếm ngược
const TimerImg = (props) => {
  const imgPos = { x: 453, y: 68, width: 90, height: 90 };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: props.top,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
        }}
      >
        <div className={props.className}>{props.text}</div>
      </div>
    </>
  );
};
const PointImg = (props) => {
  const imgPos = { x: 900, y: 90, width: 41, height: 46 };

  return (
    <>
      <div
        style={{
          position: "absolute",
          top: props.top,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
        }}
      >
        <div className={props.className}>{props.text}</div>
      </div>
    </>
  );
};
// chat final background
const ChatFnBgImg = (props) => {
  const imgPos = { x: 575, y: 80, width: 252, height: 55 };

  return (
    <>
      <div
        className="final-chat"
        onClick={props.onClick}
        style={{
          position: "absolute",
          top: props.top,
          left: props.left,
          scale: "2",
          transform: props.transform,
          backgroundImage: `url(${otherImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
        }}
      >
        <a
          href="https://t.me/cskh8daychinhthuc"
          target="_blank"
          className={props.className}
        >
          Đăng ký ngay tài khoản tại 8day nhận code tân thủ
        </a>
      </div>
    </>
  );
};

const ChatInfoImg = (props) => {
  const imgPos = { x: 575, y: 80, width: 252, height: 55 };

  return (
    <>
      <div
        className="final-chat"
        onClick={props.onClick}
        style={{
          position: "absolute",
          top: props.top,
          left: props.left,
          scale: props.scale,
          transform: props.transform,
          backgroundImage: `url(${otherImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
        }}
      ></div>
      <div className={props.className}>{props.text}</div>
    </>
  );
};
// bắt đầu
const BeginImg = (props) => {
  const imgPos = { x: 843, y: 181, width: 390, height: 115 };

  return (
    <>
      <div
        className=""
        style={{
          position: "absolute",
          top: props.top,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          cursor: "pointer",
          transform: props.transform,
        }}
      ></div>
    </>
  );
};
// chơi lại
const ReplayImg = (props) => {
  const imgPos = { x: 440, y: 181, width: 390, height: 115 };
  return (
    <>
      <div
        className=""
        style={{
          position: "absolute",
          transform: props.transform,
          top: props.top,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          cursor: "pointer",
        }}
      ></div>
    </>
  );
};

const ChibiImg = (props) => {
  return (
    <div
      className=""
      style={{
        position: "absolute",
        top: props.top,
        left: props.left,
        backgroundImage: `url(${chibiImg})`,
        width: "370px",
        height: "490px",
        transform: "scale(.4)",
        zIndex: "1",
      }}
    ></div>
  );
};
const XIcon = (props) => {
  const imgPos = { x: 985, y: 86, width: 75, height: 75 };

  return (
    <>
      <div
        className=""
        onClick={props.onClick}
        style={{
          position: "absolute",
          transform: props.transform,
          top: props.top,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          cursor: "pointer",
          // border: "1px solid red"
        }}
      ></div>
    </>
  );
};
const IIcon = (props) => {
  const imgPos = { x: 1075, y: 86, width: 75, height: 75 };

  return (
    <>
      <div
        className=""
        onClick={props.onClick}
        style={{
          position: "absolute",
          transform: props.transform,
          top: props.top,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          cursor: "pointer",
          // border: "1px solid red"
        }}
      ></div>
    </>
  );
};
const ChatIcon = (props) => {
  const imgPos = { x: 1075, y: 6, width: 75, height: 75 };

  return (
    <>
      <div
        className=""
        onClick={props.onClick}
        style={{
          position: "absolute",
          transform: props.transform,
          top: props.top,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          cursor: "pointer",
          // border: "1px solid red"
        }}
      ></div>
    </>
  );
};
const CupIcon = (props) => {
  const imgPos = { x: 985, y: 6, width: 75, height: 75 };

  return (
    <>
      <div
        className=""
        onClick={props.onClick}
        style={{
          position: "absolute",
          transform: props.transform,
          top: props.top,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          cursor: "pointer",
          // border: "1px solid red"
        }}
      ></div>
    </>
  );
};
const QuestionIcon = (props) => {
  const imgPos = { x: 895, y: 6, width: 75, height: 75 };

  return (
    <>
      <div
        className=""
        onClick={props.onClick}
        style={{
          position: "absolute",
          transform: props.transform,
          top: props.top,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          cursor: "pointer",
          border: "1px solid red",
        }}
      ></div>
    </>
  );
};
const HistoryIcon = (props) => {
  const imgPos = { x: 805, y: 6, width: 75, height: 75 };

  return (
    <>
      <div
        className=""
        onClick={props.onClick}
        style={{
          position: "absolute",
          transform: props.transform,
          top: props.top,
          left: props.left,
          backgroundImage: `url(${otherImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          cursor: "pointer",
        }}
      ></div>
    </>
  );
};
export {
  BeginImg,
  BgInsImg,
  ButtonBlue,
  ChatFnBgImg,
  ChatIcon,
  ChatInfoImg,
  ChibiImg,
  CupIcon,
  HistoryIcon,
  IIcon,
  LoseImg,
  PointImg,
  QuestionIcon,
  ReplayImg,
  TimerImg,
  WinImg,
  XIcon,
};
