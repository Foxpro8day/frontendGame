import txObj from "../assets/images/taixiuObj.png";
import diceImg from "../assets/images/xucxac.png";
import "./gTaiXiu.scss";

// Bàn chơi
const Deck = (props) => {
  const taixiuDeck = { x: 18, y: 20, width: 1025, height: 570 };

  return (
    <div
      style={{
        position: "relative",
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${taixiuDeck.x}px -${taixiuDeck.y}px`,
        width: `${taixiuDeck.width}px`,
        height: `${taixiuDeck.height}px`,
        scale: props.scale,
      }}
    >
      <div className="tx-money-left">
        <i className="fa-solid fa-dollar-sign"> {props.textMoneyLeft || 0}</i>
      </div>
      <div className="tx-money-right">
        <i className="fa-solid fa-dollar-sign"> {props.textMoneyRight || 0}</i>
      </div>
    </div>
  );
};
// Đĩa che xúc xắc
const Disc = ({ className }) => {
  const discIcon = { x: 1220, y: 424, width: 334, height: 334 };

  return (
    <div
      className={`disc ${className}`}
      style={{
        position: "absolute",
        top: "169px",
        right: "345px",
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${discIcon.x}px -${discIcon.y}px`,
        width: `${discIcon.width}px`,
        height: `${discIcon.height}px`,
      }}
    ></div>
  );
};
// Icon tài
const TaiIcon = (props) => {
  const taiIcon = { x: 1056, y: 20, width: 176, height: 110 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "180px",
        right: "120px",
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${taiIcon.x}px -${taiIcon.y}px`,
        width: `${taiIcon.width}px`,
        height: `${taiIcon.height}px`,
        // border: '1px solid red'
      }}
    >
      <div className="players-tai">
        <i className="fa-solid fa-user userIcon-right">
          {" "}
          <span className="ms-3">{props.textPlayerTai}</span>
        </i>
      </div>
    </div>
  );
};
// Aura  tài xỉu
const Aura = (props) => {
  const auraIcon = { x: 1240, y: 10, width: 200, height: 410 };
  const positionStyle = props.left
    ? {
        left: "169px",
        transform: "rotate(180deg)",
      }
    : props.right
    ? {
        left: "655px",
        transform: "rotateY(180deg)",
      }
    : {};

  return (
    <div
      className="aura-img"
      style={{
        position: "absolute",
        top: "33px",
        ...positionStyle,
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${auraIcon.x}px -${auraIcon.y}px`,
        width: `${auraIcon.width}px`,
        height: `${auraIcon.height}px`,
        rotate: "90deg",
      }}
    ></div>
  );
};
// Icon xỉu
const XiuIcon = (props) => {
  const xiuIcon = { x: 1056, y: 140, width: 176, height: 120 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        top: "170px",
        left: "120px",
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${xiuIcon.x}px -${xiuIcon.y}px`,
        width: `${xiuIcon.width}px`,
        height: `${xiuIcon.height}px`,
      }}
    >
      <div className="players-xiu">
        <i className="fa-solid fa-user userIcon-left">
          <span className="ms-3">{props.textPlayerXiu}</span>
        </i>
      </div>
    </div>
  );
};
// Nút đặt cược
const BetButton = (props) => {
  const betArea = { x: 32, y: 620, width: 224, height: 63 };
  const betText = { x: 262, y: 620, width: 166, height: 63 };
  const positionText = props.textLeft
    ? { left: "110px" }
    : props.textRight
    ? { right: "110px" }
    : {};
  const positionArea = props.areaLeft
    ? { left: "80px" }
    : props.areaRight
    ? { right: "80px" }
    : {};

  return (
    <>
      <div
        className={`betIcon ${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          bottom: "86px",
          ...positionArea,
          backgroundImage: `url(${txObj})`,
          backgroundPosition: `-${betArea.x}px -${betArea.y}px`,
          width: `${betArea.width}px`,
          height: `${betArea.height}px`,
          // border: '1px solid red'
        }}
      ></div>
      <div
        className={`betIcon ${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          bottom: "86px",
          ...positionText,
          backgroundImage: `url(${txObj})`,
          backgroundPosition: `-${betText.x}px -${betText.y}px`,
          width: `${betText.width}px`,
          height: `${betText.height}px`,
          // border: '1px solid red'
        }}
      ></div>
    </>
  );
};
// Nút đặt cược
const BetAura = (props) => {
  const betArea = { x: 32, y: 620, width: 224, height: 63 };
  const positionArea = props.areaLeft
    ? { left: "80px" }
    : props.areaRight
    ? { right: "80px" }
    : {};

  return (
    <>
      <div
        className={`betAura ${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          bottom: "86px",
          ...positionArea,
          backgroundImage: `url(${txObj})`,
          backgroundPosition: `-${betArea.x}px -${betArea.y}px`,
          width: `${betArea.width}px`,
          height: `${betArea.height}px`,
          animationDelay: "0s",
        }}
      ></div>
      <div
        className={`betAura ${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          bottom: "86px",
          ...positionArea,
          backgroundImage: `url(${txObj})`,
          backgroundPosition: `-${betArea.x}px -${betArea.y}px`,
          width: `${betArea.width}px`,
          height: `${betArea.height}px`,
          animationDelay: ".2s",
        }}
      ></div>
      <div
        className={`betAura ${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          bottom: "86px",
          ...positionArea,
          backgroundImage: `url(${txObj})`,
          backgroundPosition: `-${betArea.x}px -${betArea.y}px`,
          width: `${betArea.width}px`,
          height: `${betArea.height}px`,
          animationDelay: ".4s",
        }}
      ></div>
    </>
  );
};

//// Dices
const Sf1 = ({ style }) => {
  const sf1 = { x: 1, y: 24, width: 77, height: 77 };
  return (
    <div
      className="sf1"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf1.x}px -${sf1.y}px`,
        width: `${sf1.width}px`,
        height: `${sf1.height}px`,
      }}
    ></div>
  );
};

const Sf2 = ({ style }) => {
  const sf2 = { x: 1, y: 104, width: 76, height: 77 };

  return (
    <div
      className="sf2"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf2.x}px -${sf2.y}px`,
        width: `${sf2.width}px`,
        height: `${sf2.height}px`,
      }}
    ></div>
  );
};

const Sf3 = ({ style }) => {
  const sf3 = { x: 1, y: 184, width: 76, height: 77 };

  return (
    <div
      className="sf3"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf3.x}px -${sf3.y}px`,
        width: `${sf3.width}px`,
        height: `${sf3.height}px`,
      }}
    ></div>
  );
};

const Sf4 = ({ style }) => {
  const sf4 = { x: 1, y: 264, width: 76, height: 77 };

  return (
    <div
      className="sf4"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf4.x}px -${sf4.y}px`,
        width: `${sf4.width}px`,
        height: `${sf4.height}px`,
      }}
    ></div>
  );
};

const Sf5 = ({ style }) => {
  const sf5 = { x: 1, y: 344, width: 76, height: 77 };

  return (
    <div
      className="sf5"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf5.x}px -${sf5.y}px`,
        width: `${sf5.width}px`,
        height: `${sf5.height}px`,
      }}
    ></div>
  );
};

const Sf6 = ({ style }) => {
  const sf6 = { x: 79, y: 24, width: 76, height: 77 };

  return (
    <div
      className="sf6"
      style={{
        position: "absolute",
        ...style,
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sf6.x}px -${sf6.y}px`,
        width: `${sf6.width}px`,
        height: `${sf6.height}px`,
      }}
    ></div>
  );
};

const SfRolling1 = () => {
  const sfRolling1 = { x: 189, y: 7, width: 97, height: 84 };

  return (
    <div
      className="sfRolling1"
      style={{
        position: "absolute",
        top: "-35px",
        left: "20px",
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sfRolling1.x}px -${sfRolling1.y}px`,
        width: `${sfRolling1.width}px`,
        height: `${sfRolling1.height}px`,
      }}
    ></div>
  );
};

const SfRolling2 = () => {
  const sfRolling2 = { x: 192, y: 111, width: 97, height: 84 };

  return (
    <div
      className="sfRolling2"
      style={{
        position: "absolute",
        top: "-35px",
        left: "20px",
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sfRolling2.x}px -${sfRolling2.y}px`,
        width: `${sfRolling2.width}px`,
        height: `${sfRolling2.height}px`,
      }}
    ></div>
  );
};

const SfRolling3 = () => {
  const sfRolling3 = { x: 192, y: 201, width: 97, height: 84 };

  return (
    <div
      className="sfRolling3"
      style={{
        position: "absolute",
        top: "-35px",
        left: "20px",
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sfRolling3.x}px -${sfRolling3.y}px`,
        width: `${sfRolling3.width}px`,
        height: `${sfRolling3.height}px`,
      }}
    ></div>
  );
};

const SfRolling4 = () => {
  const sfRolling4 = { x: 192, y: 291, width: 97, height: 84 };

  return (
    <div
      className="sfRolling4"
      style={{
        position: "absolute",
        top: "-35px",
        left: "20px",
        backgroundImage: `url(${diceImg})`,
        backgroundPosition: `-${sfRolling4.x}px -${sfRolling4.y}px`,
        width: `${sfRolling4.width}px`,
        height: `${sfRolling4.height}px`,
      }}
    ></div>
  );
};

//// Sprite decorate
// Hoa
const Flower = () => {
  const flower = { x: 1454, y: 46, width: 110, height: 110 };

  return (
    <div
      className="flower rotating-image"
      style={{
        position: "absolute",
        top: "140px",
        left: "-40px",
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${flower.x}px -${flower.y}px`,
        width: `${flower.width}px`,
        height: `${flower.height}px`,
      }}
    ></div>
  );
};
// Lồng đèn
const Lantern = () => {
  const lantern = { x: 1440, y: 156, width: 110, height: 240 };

  return (
    <div
      className="lantern shaking-image"
      style={{
        position: "absolute",
        top: "210px",
        left: "-60px",
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${lantern.x}px -${lantern.y}px`,
        width: `${lantern.width}px`,
        height: `${lantern.height}px`,
      }}
    ></div>
  );
};
// Cành mai
const Tree = () => {
  const tree = { x: 920, y: 600, width: 300, height: 90 };

  return (
    <div
      className="canhmai scaling-rotate-image"
      style={{
        position: "absolute",
        bottom: "160px",
        right: "-180px",
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${tree.x}px -${tree.y}px`,
        width: `${tree.width}px`,
        height: `${tree.height}px`,
        rotate: "-60deg",
      }}
    ></div>
  );
};
// Bao lì xì
const RedEvt = () => {
  const redEnt = { x: 1105, y: 430, width: 110, height: 130 };

  return (
    <div
      className="lixi scaling-image"
      style={{
        position: "absolute",
        bottom: "-50px",
        left: "770px",
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${redEnt.x}px -${redEnt.y}px`,
        width: `${redEnt.width}px`,
        height: `${redEnt.height}px`,
      }}
    ></div>
  );
};
// Đám mây
const Cloud = () => {
  const cloudIcon = { x: 704, y: 608, width: 184, height: 84 };

  return (
    <div
      className="cloudIcon"
      style={{
        position: "absolute",
        bottom: "0px",
        right: "8px",
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${cloudIcon.x}px -${cloudIcon.y}px`,
        width: `${cloudIcon.width}px`,
        height: `${cloudIcon.height}px`,
      }}
    ></div>
  );
};

const Cloud2 = () => {
  const cloudIcon = { x: 704, y: 608, width: 184, height: 84 };

  return (
    <div
      className="cloudIcon"
      style={{
        position: "absolute",
        bottom: "0px",
        left: "8px",
        backgroundImage: `url(${txObj})`,
        backgroundPosition: `-${cloudIcon.x}px -${cloudIcon.y}px`,
        width: `${cloudIcon.width}px`,
        height: `${cloudIcon.height}px`,
        transform: "rotateY(180deg)",
      }}
    ></div>
  );
};

export {
  Aura,
  BetAura,
  BetButton,
  Cloud,
  Cloud2,
  Deck,
  Disc,
  Flower,
  Lantern,
  RedEvt,
  Sf1,
  Sf2,
  Sf3,
  Sf4,
  Sf5,
  Sf6,
  SfRolling1,
  SfRolling2,
  SfRolling3,
  SfRolling4,
  TaiIcon,
  Tree,
  XiuIcon,
};
