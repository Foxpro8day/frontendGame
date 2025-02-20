import tabSelectedImg from "../assets/images/danhsachvecuoc.png";
import tabWinNumImg from "../assets/images/danhsachvetrung.png";
import lodeImg from "../assets/images/lodesieutoc.webp";
import "./gLode.scss";

const NAME_STRUCTURE = {
  Lo2so: "Lô 2 số",
  Lo3so: "Lô 3 số",
  Xien2so: "Lô xiên 2 số",
  Xien3so: "Lô xiên 3 số",
  Xien4so: "Lô xiên 4 số",
  Bacang: "Ba càng",
  Dedau: "Đề đầu",
  DeDB: "Đề đặc biệt",
  Dau: "Đầu",
  Duoi: "Đuôi",
  Truot4so: "Lô trượt 4 số",
  Truot8so: "Lô trượt 8 số",
  Truot10so: "Lô trượt 10 số",
};

const MainFront = (props) => {
  const imgPos = { x: 52, y: 86, width: 996, height: 476 };

  return (
    <div
      className={`change-color-background ${props.className}`}
      style={{
        position: "absolute",
        // backgroundImage:
        //   props.className === "cover"
        //     ? `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url(${lodeImg})`
        //     : `url(${lodeImg})`,
        backgroundImage: `url(${lodeImg})`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "20px",
        left: "20px",
      }}
    ></div>
  );
};

const MainTab1 = (props) => {
  const imgPos = { x: 48, y: 712, width: 326, height: 78 };
  return (
    <>
      <div
        className="ld-tab-1"
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          top: "-57px",
          left: "20px",
        }}
      ></div>
    </>
  );
};
const MainTab1Selected = (props) => {
  const imgPos1 = { x: 52, y: 938, width: 379, height: 129 };
  const imgPos2 = { x: 50, y: 829, width: 308, height: 78 };
  return (
    <div
      className="tab-1-wrapper"
      style={{
        position: "absolute",
        top: "-67px",
        left: "20px",
      }}
    >
      <div
        className="ld-bg-2-behind"
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos1.x}px -${imgPos1.y}px`,
          width: `${imgPos1.width}px`,
          height: `${imgPos1.height}px`,
          //   border: "1px solid red"
        }}
      ></div>
      <div
        className="ld-bg-2-front"
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos2.x}px -${imgPos2.y}px`,
          width: `${imgPos2.width}px`,
          height: `${imgPos2.height}px`,
          top: "10px",
          left: "10px",
        }}
      ></div>
    </div>
  );
};

const MainTab2 = (props) => {
  const imgPos = { x: 392, y: 710, width: 326, height: 80 };

  return (
    <>
      <div
        className="ld-tab-2"
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          top: "-60px",
          left: "356px",
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};
const MainTab2Selected = (props) => {
  const imgPos1 = { x: 457, y: 936, width: 435, height: 133 };
  const imgPos2 = { x: 402, y: 829, width: 307, height: 80 };

  return (
    <div
      className="tab-1-wrapper"
      style={{
        position: "absolute",
        top: "-69px",
        left: "297px",
      }}
    >
      <div
        className="ld-bg-3-behind"
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos1.x}px -${imgPos1.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${imgPos1.width}px`,
          height: `${imgPos1.height}px`,
          top: "0px",
          left: "0px",
          //   border: "1px solid red",
        }}
      ></div>
      <div
        className="ld-bg-3-front"
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos2.x}px -${imgPos2.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${imgPos2.width}px`,
          height: `${imgPos2.height}px`,
          top: "10px",
          left: "68px",
          // border: "1px solid red",
        }}
      ></div>
    </div>
  );
};

const MainTab3 = (props) => {
  const imgPos = { x: 728, y: 710, width: 324, height: 80 };

  return (
    <>
      <div
        className="bg-3-front"
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          top: "-59px",
          left: "690px",
        }}
      ></div>
    </>
  );
};
const MainTab3Selected = (props) => {
  const imgPos1 = { x: 951, y: 1289, width: 134, height: 364 };
  const imgPos2 = { x: 736, y: 830, width: 308, height: 78 };

  return (
    <div
      className="tab-3-wrapper"
      style={{
        position: "absolute",
        top: "-186px",
        left: "764px",
      }}
    >
      <div
        className="bg-3-behind"
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos1.x}px -${imgPos1.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          width: `${imgPos1.width}px`,
          height: `${imgPos1.height}px`,
          top: "0px",
          left: "0px",
          rotate: "-90deg",
          //   border: "1px solid red",
        }}
      ></div>
      <div
        className="bg-3-front"
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos2.x}px -${imgPos2.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${imgPos2.width}px`,
          height: `${imgPos2.height}px`,
          top: "129px",
          left: "-66px",
          //   border: "1px solid red",
        }}
      ></div>
    </div>
  );
};

const BaoloText = (props) => {
  const baoloText = { x: 2256, y: 1288, width: 110, height: 44 };
  const imgPosAura1 = { x: 52, y: 583, width: 151, height: 100 };
  return (
    <div className={`baolo-group ${props.className}`}>
      <div
        className="ld-aura baolo hidden"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPosAura1.x}px -${imgPosAura1.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          width: `${imgPosAura1.width}px`,
          height: `${imgPosAura1.height}px`,
          top: "372px",
          left: "59px",
        }}
      ></div>
      <div
        className="baolo-text-img"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${baoloText.x}px -${baoloText.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${baoloText.width}px`,
          height: `${baoloText.height}px`,
          top: "400px",
          left: "86px",
          cursor: "pointer",
          // border: "1px solid red",
        }}
      ></div>
    </div>
  );
};
const LoxienText = (props) => {
  const loxienText = { x: 2254, y: 1356, width: 110, height: 44 };
  const imgPosAura2 = { x: 218, y: 583, width: 151, height: 100 };
  return (
    <div className={`loxien-group ${props.className}`}>
      <div
        className="ld-aura loxien hidden"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPosAura2.x}px -${imgPosAura2.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${imgPosAura2.width}px`,
          height: `${imgPosAura2.height}px`,
          top: "372px",
          left: "212px",
        }}
      ></div>
      <div
        className="loxien-text-img"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${loxienText.x}px -${loxienText.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${loxienText.width}px`,
          height: `${loxienText.height}px`,
          top: "400px",
          left: "240px",
          cursor: "pointer",
          // border: "1px solid red",
        }}
      ></div>
    </div>
  );
};
const LotruotText = (props) => {
  const lotruotText = { x: 2244, y: 1422, width: 130, height: 44 };
  const imgPosAura2 = { x: 218, y: 583, width: 151, height: 100 };
  return (
    <div className={`lotruot-group ${props.className}`}>
      <div
        className="ld-aura lotruot hidden"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPosAura2.x}px -${imgPosAura2.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${imgPosAura2.width}px`,
          height: `${imgPosAura2.height}px`,
          top: "372px",
          left: "365px",
        }}
      ></div>
      <div
        className="lotruot-text-img"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${lotruotText.x}px -${lotruotText.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${lotruotText.width}px`,
          height: `${lotruotText.height}px`,
          top: "400px",
          left: "380px",
          cursor: "pointer",
          // border: "1px solid red",
        }}
      ></div>
    </div>
  );
};
const DauduoiText = (props) => {
  const dauduoiText = { x: 2244, y: 1492, width: 130, height: 44 };
  const imgPosAura2 = { x: 218, y: 583, width: 151, height: 100 };
  return (
    <div className={`dauduoi-group ${props.className}`}>
      <div
        className="ld-aura dauduoi hidden"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPosAura2.x}px -${imgPosAura2.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${imgPosAura2.width}px`,
          height: `${imgPosAura2.height}px`,
          top: "372px",
          left: "518px",
        }}
      ></div>
      <div
        className="dauduoi-text-img"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${dauduoiText.x}px -${dauduoiText.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${dauduoiText.width}px`,
          height: `${dauduoiText.height}px`,
          top: "400px",
          left: "534px",
          cursor: "pointer",
          // border: "1px solid red",
        }}
      ></div>
    </div>
  );
};
const DanhdeText = (props) => {
  const danhdeText = { x: 2246, y: 1558, width: 120, height: 44 };
  const imgPosAura2 = { x: 218, y: 583, width: 151, height: 100 };
  return (
    <div className={`danhde-group ${props.className}`}>
      <div
        className="ld-aura danhde hidden"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPosAura2.x}px -${imgPosAura2.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${imgPosAura2.width}px`,
          height: `${imgPosAura2.height}px`,
          top: "372px",
          left: "671px",
        }}
      ></div>
      <div
        className="danhde-text-img"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${danhdeText.x}px -${danhdeText.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${danhdeText.width}px`,
          height: `${danhdeText.height}px`,
          top: "400px",
          left: "690px",
          cursor: "pointer",
          // border: "1px solid red",
        }}
      ></div>
    </div>
  );
};
const BacangText = (props) => {
  const bacangText = { x: 2246, y: 1626, width: 120, height: 44 };
  const imgPosAura3 = { x: 386, y: 583, width: 151, height: 100 };
  return (
    <div className={`bacang-group ${props.className}`}>
      <div
        className="ld-aura bacang hidden"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPosAura3.x}px -${imgPosAura3.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${imgPosAura3.width}px`,
          height: `${imgPosAura3.height}px`,
          top: "372px",
          left: "826px",
        }}
      ></div>
      <div
        className="bacang-text-img"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${bacangText.x}px -${bacangText.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

          width: `${bacangText.width}px`,
          height: `${bacangText.height}px`,
          top: "400px",
          left: "845px",
          cursor: "pointer",
          // border: "1px solid red",
        }}
      ></div>
    </div>
  );
};
const SignImg = (props) => {
  const signImg = { x: 1065, y: 86, width: 56, height: 56 };

  return (
    <div
      className="sign-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${signImg.x}px -${signImg.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

        width: `${signImg.width}px`,
        height: `${signImg.height}px`,
        top: "76px",
        left: "946px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const IImg = (props) => {
  const iImg = { x: 1068, y: 19, width: 52, height: 52 };

  return (
    <div
      className="i-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${iImg.x}px -${iImg.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${iImg.width}px`,
        height: `${iImg.height}px`,
        top: "76px",
        left: "38px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const XImg = (props) => {
  const xImg = { x: 1990, y: 84, width: 60, height: 60 };

  return (
    <div
      className="x-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${xImg.x}px -${xImg.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

        width: `${xImg.width}px`,
        height: `${xImg.height}px`,
        top: props.top,
        left: props.left,
        cursor: "pointer",
        zIndex: props.zIndex,
        // border: "1px solid red",
      }}
    ></div>
  );
};

const LodeSelected1 = (props) => {
  const imgPos = { x: 52, y: 583, width: 151, height: 100 };
  return (
    <div
      className={props.className}
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "372px",
        left: "59px",
      }}
    ></div>
  );
};
const LodeSelected2 = (props) => {
  const imgPos = { x: 218, y: 583, width: 151, height: 100 };
  return (
    <div
      className={props.className}
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "372px",
        left: "212px",
      }}
    ></div>
  );
};
const LodeSelected3 = (props) => {
  const imgPos = { x: 386, y: 583, width: 151, height: 100 };
  return (
    <div
      className={props.className}
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "372px",
        left: "826px",
      }}
    ></div>
  );
};

// text depend on style
const Lo2soTextImg = (props) => {
  const lo2so = { x: 2248, y: 956, width: 120, height: 50 };
  return (
    <div
      className="lo2so-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${lo2so.x}px -${lo2so.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",

        width: `${lo2so.width}px`,
        height: `${lo2so.height}px`,
        top: "-46px",
        left: "126px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const Lo3soTextImg = (props) => {
  const lo2so = { x: 2248, y: 1022, width: 120, height: 50 };
  return (
    <div
      className="lo2so-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,

        backgroundPosition: `-${lo2so.x}px -${lo2so.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${lo2so.width}px`,
        height: `${lo2so.height}px`,
        top: "-46px",
        left: "466px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};

const Xien2soTextImg = (props) => {
  const imgPos = { x: 2248, y: 1086, width: 120, height: 50 };
  return (
    <div
      className="lo2so-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "126px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const Xien3soTextImg = (props) => {
  const imgPos = { x: 2248, y: 1148, width: 120, height: 50 };
  return (
    <div
      className="lo2so-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "466px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const Xien4soTextImg = (props) => {
  const imgPos = { x: 2248, y: 1202, width: 120, height: 50 };
  return (
    <div
      className="lo2so-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "800px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};

const Truot4soTextImg = (props) => {
  const imgPos = { x: 2208, y: 40, width: 200, height: 50 };
  return (
    <div
      className="truot4-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "86px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const Truot8soTextImg = (props) => {
  const imgPos = { x: 2208, y: 104, width: 200, height: 50 };
  return (
    <div
      className="truot8-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "426px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const Truot10soTextImg = (props) => {
  const imgPos = { x: 2200, y: 168, width: 200, height: 50 };
  return (
    <div
      className="truoc10-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "756px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};

const DauTextImg = (props) => {
  const imgPos = { x: 2094, y: 40, width: 70, height: 50 };
  return (
    <div
      className="truot4-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "146px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const DuoiTextImg = (props) => {
  const imgPos = { x: 2090, y: 104, width: 75, height: 50 };
  return (
    <div
      className="truot8-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "486px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};

const DeDauTextImg = (props) => {
  const imgPos = { x: 1528, y: 40, width: 110, height: 50 };
  return (
    <div
      className="dedau-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "126px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const DeDBTextImg = (props) => {
  const imgPos = { x: 1498, y: 104, width: 170, height: 50 };
  return (
    <div
      className="dedb-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "438px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const BacangTextImg = (props) => {
  const imgPos = { x: 1372, y: 104, width: 110, height: 50 };
  return (
    <div
      className="dedau-text-img"
      onClick={props.onClick}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-46px",
        left: "126px",
        cursor: "pointer",
        // border: "1px solid red",
      }}
    ></div>
  );
};

const Confirm = (props) => {
  const confirmPos = { x: 1538, y: 214, width: 870, height: 725 };

  return (
    <div className="select-num-container">
      <div
        className="dedau-text-img"
        onClick={props.onClick}
        onHide={props.onHide}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${confirmPos.x}px -${confirmPos.y}px`,
          width: `${confirmPos.width}px`,
          height: `${confirmPos.height}px`,
          top: "0px",
          left: "84px",
          cursor: "pointer",
          // border: "1px solid red",
        }}
      ></div>
    </div>
  );
};

const Num100 = (props) => {
  const imgPos = { x: 1538, y: 214, width: 870, height: 725 };
  const xImg = { x: 1990, y: 84, width: 60, height: 60 };
  const confirmPos = { x: 1724, y: 12, width: 164, height: 56 };

  const handleClick = (type) => {
    if (props.onClick) {
      props.onClick(type); // Gọi hàm onClick từ component cha với thông tin div
    }
  };

  return (
    <div className="select-num-container">
      <div
        className="num-table-img"
        onClick={() => handleClick("numTable")}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          top: "0px",
          left: "54px",
          zIndex: "1",
          // border: "1px solid red",
        }}
      ></div>
      <div
        className="x-img"
        onClick={() => handleClick("xImg")}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${xImg.x}px -${xImg.y}px`,
          width: `${xImg.width}px`,
          height: `${xImg.height}px`,
          top: "50px",
          left: "840px",
          cursor: "pointer",
          zIndex: "1",
          // border: "1px solid red",
        }}
      ></div>
      <div
        className="confirm-img"
        onClick={() => handleClick("confirmImg")}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${confirmPos.x}px -${confirmPos.y}px`,
          width: `${confirmPos.width}px`,
          height: `${confirmPos.height}px`,
          top: "50px",
          left: "140px",
          cursor: "pointer",
          zIndex: "1",
          // border: "1px solid red",
        }}
      ></div>
    </div>
  );
};

const Num300 = (props) => {
  const imgPos = { x: 1158, y: 940, width: 1024, height: 734 };
  const xImg = { x: 1990, y: 84, width: 60, height: 60 };
  const confirmPos = { x: 1724, y: 12, width: 164, height: 56 };

  const handleClick = (type) => {
    if (props.onClick) {
      props.onClick(type); // Gọi hàm onClick từ component cha với thông tin div
    }
  };

  return (
    <div className="select-num-container">
      <div
        className="num-table-img"
        onClick={() => handleClick("numTable")}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          top: "0px",
          left: "-100px",
          zIndex: "1",
          // border: "1px solid red",
        }}
      ></div>
      <div
        className="x-img"
        onClick={() => handleClick("xImg")}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${xImg.x}px -${xImg.y}px`,
          width: `${xImg.width}px`,
          height: `${xImg.height}px`,
          top: "60px",
          left: "830px",
          cursor: "pointer",
          zIndex: "1",
          // border: "1px solid red",
        }}
      ></div>
      <div
        className="confirm-img"
        onClick={() => handleClick("confirmImg")}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${confirmPos.x}px -${confirmPos.y}px`,
          width: `${confirmPos.width}px`,
          height: `${confirmPos.height}px`,
          top: "60px",
          left: "0px",
          cursor: "pointer",
          zIndex: "1",
          // border: "1px solid red",
        }}
      ></div>
    </div>
  );
};

const Num10 = (props) => {
  const imgPos = { x: 1100, y: 152, width: 420, height: 784 };
  const xImg = { x: 1990, y: 84, width: 60, height: 60 };
  const confirmPos = { x: 1724, y: 12, width: 164, height: 56 };

  const handleClick = (type) => {
    if (props.onClick) {
      props.onClick(type); // Gọi hàm onClick từ component cha với thông tin div
    }
  };

  return (
    <div className="select-num-container">
      <div
        className="num-table-img"
        onClick={() => handleClick("numTable")}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          top: "-180px",
          left: "310px",
          transform: "rotate(90deg)",
          zIndex: "1",
        }}
      ></div>
      <div
        className="x-img"
        onClick={() => handleClick("xImg")}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${xImg.x}px -${xImg.y}px`,
          width: `${xImg.width}px`,
          height: `${xImg.height}px`,
          top: "60px",
          left: "800px",
          cursor: "pointer",
          zIndex: "1",
          // border: "1px solid red",
        }}
      ></div>
      <div
        className="confirm-img"
        onClick={() => handleClick("confirmImg")}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${confirmPos.x}px -${confirmPos.y}px`,
          width: `${confirmPos.width}px`,
          height: `${confirmPos.height}px`,
          top: "60px",
          left: "180px",
          cursor: "pointer",
          zIndex: "1",
        }}
      ></div>
    </div>
  );
};

const ResultTable = (props) => {
  const imgPos = { x: 260, y: 1122, width: 646, height: 522 };

  return (
    <>
      <div
        className="num-table-img"
        // onClick={() => handleClick("numTable")}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          top: "70px",
          left: "450px",
          transform: "rotate(90deg)",
        }}
      ></div>
    </>
  );
};

const DBPrice = (props) => {
  const imgPos = { x: 36, y: 1100, width: 216, height: 578 };

  return (
    <div
      className="num-table-img"
      // onClick={() => handleClick("numTable")}
      style={{
        position: "absolute",
        backgroundImage: `url(${lodeImg})`,
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "180px",
        left: "120px",
        transform: "rotate(90deg)",
      }}
    ></div>
  );
};

const TabSelected = (props) => {
  const imgPos = { x: 0, y: 0, width: 521, height: 326 };
  const xImg = { x: 1990, y: 84, width: 60, height: 60 };

  const allTicketsEmpty =
    Array.isArray(props.text) &&
    props.text.every((ticket) => ticket.numbers && ticket.numbers.length === 0);

  return (
    <>
      <div
        className={`change-color-background ${props.className}`}
        style={{
          position: "absolute",
          top: "-100px",
          left: "940px",
          backgroundImage: `url(${tabSelectedImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
        }}
      ></div>
      <div
        className="x-img"
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${lodeImg})`,
          backgroundPosition: `-${xImg.x}px -${xImg.y}px`,
          width: `${xImg.width}px`,
          height: `${xImg.height}px`,
          top: "-92px",
          left: "950px",
          cursor: "pointer",
          zIndex: "1",
          // border: "1px solid red",
        }}
      ></div>
      <div className="text-confirm-selected">
        {Array.isArray(props.text) && props.text.length > 0 ? (
          allTicketsEmpty ? ( // Nếu tất cả vé không có số
            <p>Không có số chọn</p>
          ) : (
            <ul>
              {props.text.map((ticket, index) => (
                <li key={index}>
                  {NAME_STRUCTURE[ticket.caseSelected] || ticket.caseSelected}:{" "}
                  {ticket.numbers && ticket.numbers.length > 0
                    ? ticket.numbers.join(", ")
                    : ""}
                </li>
              ))}
            </ul>
          )
        ) : (
          <p>Không có vé nào được chọn</p>
        )}
      </div>
    </>
  );
};

const TabWinNum = (props) => {
  const imgPos = { x: 0, y: 0, width: 521, height: 326 };

  return (
    <>
      <div
        className={`change-color-background ${props.className}`}
        style={{
          position: "absolute",
          top: "10px",
          left: "-20px",
          backgroundImage: `url(${tabWinNumImg})`,
          filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
        }}
      ></div>
    </>
  );
};

export {
  BacangText,
  BacangTextImg,
  BaoloText,
  Confirm,
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
  LodeSelected1,
  LodeSelected2,
  LodeSelected3,
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
};
