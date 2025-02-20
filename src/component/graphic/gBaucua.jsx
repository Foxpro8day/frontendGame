import baucuaImg from "../assets/images/baucua.webp";
import "./gBaucua.scss";

const Mainboard = ({ bets, selected, onClick, resultEffect }) => {
  const imgPos = { x: 35, y: 20, width: 1026, height: 570 };
  const imgPos2 = { x: 1090, y: 755, width: 145, height: 55 };

  const itemStyles = {
    Cua: {
      top: "0px",
      left: "70px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "1px solid red",
    },
    Bau: {
      top: "165px",
      left: "747px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "1px solid red",
    },
    Ga: {
      top: "-472px",
      left: "80px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "1px solid red",
    },
    Tom: {
      top: "22px",
      left: "300px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "1px solid red",
    },
    Ca: {
      top: "-142px",
      left: "522px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "1px solid red",
    },
    Nai: {
      top: "-307px",
      left: "740px",
      display: "flex",
      flexDirection: "column",
      alignItems: "center",
      justifyContent: "space-between",
      // border: "1px solid red",
    },
  };
  const subItemStyle = {
    Cua: {
      marginTop: "-12px",
      marginRight: "-100px",
    },
    Bau: {
      marginTop: "-12px",
      marginLeft: "-100px",
    },
    Ga: {
      marginTop: "-12px",
      marginRight: "-85px",
    },
    Tom: {
      marginTop: "-12px",
    },
    Ca: {
      marginTop: "-12px",
    },
    Nai: {
      marginTop: "-12px",
      marginLeft: "-80px",
    },
  };

  return (
    <>
      <div
        style={{
          position: "absolute",
          backgroundImage: `url(${baucuaImg})`,
          // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          top: "0px",
          left: "0px",
          // border: "1px solid red",
        }}
      ></div>
      {Object.entries(bets).map(([key, value]) => (
        <div
          key={key}
          className={`group-${key.toLowerCase()} ${
            selected.includes(key) ? "selected" : ""
          }`}
          onClick={() => onClick && onClick(key)}
          style={{
            position: "relative",
            width: "200px",
            height: "165px",
            ...itemStyles[key],
          }}
        >
          <div
            className={
              selected.includes(key)
                ? `${value.className} selected`
                : value.className
            }
            style={{
              // position: "absolute",
              backgroundImage: `url(${baucuaImg})`,
              backgroundPosition: `-${imgPos2.x}px -${imgPos2.y}px`,
              width: `${imgPos2.width}px`,
              height: `${imgPos2.height}px`,
              // top: "0px",
              // left: "0px",
              ...subItemStyle[key],
              transform: "scale(.8)",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // border: "1px solid red",
            }}
          >
            <i className="user fa-solid fa-users me-3"></i> {value.players || 0}
          </div>
          <div
            className={
              selected.includes(key)
                ? `${value.className} selected`
                : value.className
            }
            style={{
              // position: "absolute",
              backgroundImage: `url(${baucuaImg})`,
              backgroundPosition: `-${imgPos2.x}px -${imgPos2.y}px`,
              width: `${imgPos2.width}px`,
              height: `${imgPos2.height}px`,
              // top: "115px",
              // left: "0px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              // border: "1px solid red",
            }}
          >
            <i className="fa-solid fa-dollar-sign">
              {" "}
              {value.money?.toLocaleString() || 0}
            </i>
          </div>
          {selected.includes(key) && ["Tom", "Ca"].includes(key) ? (
            <AuraMid
              className={`${
                Array.isArray(resultEffect) && resultEffect.includes(key)
                  ? "bc-aura-effect"
                  : ""
              }`}
            />
          ) : selected.includes(key) &&
            ["Bau", "Cua", "Nai", "Ga"].includes(key) ? (
            <AuraCorner
              name={key}
              className={`${
                Array.isArray(resultEffect) && resultEffect.includes(key)
                  ? "bc-aura-effect"
                  : ""
              }`}
            />
          ) : (
            <></>
          )}
          {["Tom", "Ca"].includes(key) ? (
            <AuraMid
              className={`${
                Array.isArray(resultEffect) && resultEffect.includes(key)
                  ? "bc-aura-effect"
                  : "hidden"
              }`}
            />
          ) : ["Bau", "Cua", "Nai", "Ga"].includes(key) ? (
            <AuraCorner
              name={key}
              className={`${
                Array.isArray(resultEffect) && resultEffect.includes(key)
                  ? "bc-aura-effect"
                  : "hidden"
              }`}
            />
          ) : (
            <></>
          )}
        </div>
      ))}
    </>
  );
};
const Bucket = (props) => {
  const imgPos = { x: 1090, y: 270, width: 195, height: 196 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "100px",
        left: "414px",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const Disc = (props) => {
  const imgPos = { x: 1290, y: 680, width: 255, height: 175 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "150px",
        left: "374px",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const DisplayInfo = (props) => {
  const imgPos = { x: 1090, y: 755, width: 145, height: 55 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: props.top,
        left: props.left,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // border: "1px solid red",
      }}
    >
      {props.text}
    </div>
  );
};
const AuraCorner = (props) => {
  const imgPos = { x: 95, y: 635, width: 240, height: 185 };
  const position =
    {
      Cua: { top: "-10px", left: "-20px" },
      Bau: { top: "-10px", right: "-20px", transform: "rotateY(180deg)" },
      Ga: { top: "-10px", left: "-30px", transform: "rotateX(180deg)" },
      Nai: { top: "-10px", right: "-30px", transform: "rotate(180deg)" },
    }[props.name] || {};

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        ...position,
        // border: "1px solid red",
      }}
    ></div>
  );
};
const AuraMid = (props) => {
  const imgPos = { x: 440, y: 635, width: 230, height: 185 };

  return (
    <div
      className={props.className}
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "-10px",
        left: "-18px",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const DiceBau = ({ style }) => {
  const imgPos = { x: 1345, y: 410, width: 70, height: 85 };
  return (
    <div
      className="dice-bau"
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        ...style,
        //   border: "1px solid red",
        scale: ".68",
      }}
    ></div>
  );
};
const DiceCa = ({ style }) => {
  const imgPos = { x: 1431, y: 407, width: 70, height: 85 };
  return (
    <div
      className="dice-ca"
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        ...style,
        scale: ".68",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const DiceCua = ({ style }) => {
  const imgPos = { x: 1433, y: 312, width: 70, height: 85 };
  return (
    <div
      className="dice-cua"
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        ...style,
        // border: "1px solid red",
        scale: ".68",
      }}
    ></div>
  );
};
const DiceGa = ({ style }) => {
  const imgPos = { x: 1341, y: 229, width: 70, height: 85 };
  return (
    <div
      className="dice-ga"
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        ...style,
        // border: "1px solid red",
        scale: ".68",
      }}
    ></div>
  );
};
const DiceNai = ({ style }) => {
  const imgPos = { x: 1341, y: 320, width: 70, height: 85 };
  return (
    <div
      className="dice-nai"
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        ...style,
        // border: "1px solid red",
        scale: ".68",
      }}
    ></div>
  );
};
const DiceTom = ({ style }) => {
  const imgPos = { x: 1435, y: 220, width: 70, height: 85 };
  return (
    <div
      className="dice-nai"
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        ...style,
        // border: "1px solid red",
        scale: ".68",
      }}
    ></div>
  );
};
const FireWork = (props) => {
  const imgPos = { x: 1070, y: 40, width: 125, height: 180 };

  return (
    <div
      className={`change-color-background ${props.className}`}
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "120px",
        left: "-60px",
        rotate: "30deg",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const Cloud = (props) => {
  const imgPos = { x: 1210, y: 80, width: 180, height: 80 };
  const side = props.left
    ? { left: "0px", transform: "rotateY(180deg)" }
    : props.right
    ? { right: "0px" }
    : {};

  return (
    <div
      className={`change-color-background ${props.className}`}
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "510px",
        ...side,
        // border: "1px solid red",
      }}
    ></div>
  );
};
const RedFlower = (props) => {
  const imgPos = { x: 1410, y: 20, width: 130, height: 160 };

  return (
    <div
      className={`change-color-background ${props.className}`}
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "370px",
        right: "-50px",
        // border: "1px solid red",
      }}
    ></div>
  );
};
const YellowFlower = (props) => {
  const imgPos = { x: 1295, y: 540, width: 265, height: 115 };
  const position = props.left
    ? { top: "0px", left: "50px", transform: "rotateY(180deg)" }
    : props.right
    ? { top: "0px", right: "50px" }
    : {};
  return (
    <div
      className={`change-color-background ${props.className}`}
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        ...position,
        // border: "1px solid red",
      }}
    ></div>
  );
};
const Lantern = (props) => {
  const imgPos = { x: 1075, y: 510, width: 165, height: 185 };

  return (
    <div
      className={`change-color-background ${props.className}`}
      style={{
        position: "absolute",
        backgroundImage: `url(${baucuaImg})`,
        // filter: props.className === "cover" ? "invert(0.3)" : "invert(0)",
        backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
        width: `${imgPos.width}px`,
        height: `${imgPos.height}px`,
        top: "110px",
        right: "-90px",
        rotate: "-40deg",
        // border: "1px solid red",
      }}
    ></div>
  );
};

export {
  AuraCorner,
  AuraMid,
  Bucket,
  Cloud,
  DiceBau,
  DiceCa,
  DiceCua,
  DiceGa,
  DiceNai,
  DiceTom,
  Disc,
  DisplayInfo,
  FireWork,
  Lantern,
  Mainboard,
  RedFlower,
  YellowFlower,
};
