import { useEffect, useState } from "react";
import luckywheelImg from "../assets/images/luckywheel.webp";
import wheelPrizes from "../assets/images/wheel-prizes.png";
import "./gLuckyWheel.scss";

const MainImg = (props) => {
  const imgPos = { x: 90, y: 160, width: 476, height: 610 };
  const logoPos = { x: 276, y: 346, width: 104, height: 104 };
  const listPos = { x: 580, y: 134, width: 514, height: 610 };
  const signImg = { x: 1065, y: 86, width: 56, height: 56 };

  return (
    <>
      <div
        className={`${props.className}`}
        style={{
          position: "relative",
          backgroundImage: `url(${luckywheelImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          marginTop: "20px",
          zIndex: "1",
        }}
      >
        {!props.isSpinning && (
          <div
            className={`${props.className}`}
            onClick={props.onClick}
            style={{
              position: "absolute",
              top: "186px",
              left: "186px",
              backgroundImage: `url(${luckywheelImg})`,
              backgroundPosition: `-${logoPos.x}px -${logoPos.y}px`,
              width: `${logoPos.width}px`,
              height: `${logoPos.height}px`,
              cursor: "pointer",
              // border: "1px solid red",
            }}
            disable={props.isSpinning}
          ></div>
        )}
      </div>
    </>
  );
};
const Title = (props) => {
  const imgPos = { x: 20, y: 18, width: 870, height: 116 };

  return (
    <>
      <div
        className={`${props.className}`}
        onClick={props.onClick}
        style={{
          backgroundImage: `url(${luckywheelImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          //   border: "1px solid red",
        }}
      ></div>
    </>
  );
};

const List = (props) => {
  const [whoWin, setWhoWin] = useState([]);

  useEffect(() => {
    fetch("./WheelList.json") // Fetch từ public/WheelList.json
      .then((response) => response.json())
      .then((data) => setWhoWin(data))
      .catch((error) => console.error("Lỗi khi tải JSON:", error));
  }, []);

  const imgPos = { x: 580, y: 134, width: 514, height: 610 };
  return (
    <>
      <div
        className={`${props.className}`}
        onClick={props.onClick}
        style={{
          position: "relative",
          backgroundImage: `url(${luckywheelImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          // border: "1px solid red",
        }}
      >
        <table className="table-winer">
          <tbody>
            {whoWin.map((item, index) => (
              <tr key={index} style={{ border: "none", padding: "10px" }}>
                <td style={{ border: "none", padding: "10px" }}>{item.name}</td>
                <td
                  style={{
                    border: "none",
                    padding: "10px",
                  }}
                >
                  --------------------------------
                </td>
                <td style={{ border: "none", padding: "10px" }}>
                  {item.prize}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
};

const Prize8k = (props) => {
  const imgPos = { x: 30, y: 40, width: 470, height: 270 };
  const imgPos2 = { x: 0, y: 10, width: 515, height: 320 };
  const imgPos3 = { x: 5, y: 335, width: 165, height: 60 };

  const alignPos = props.pc
    ? {
        top: "30%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }
    : props.mb
    ? {
        top: "10%",
        left: "-9%",
        scale: "0.4",
      }
    : {};

  return (
    <>
      <div
        className={`${props.className}`}
        style={{
          position: "absolute",
          backgroundImage: `url(${wheelPrizes})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          ...alignPos,
          // border: "1px solid red",
        }}
      >
        {/* <div
          className={`${props.className}`}
          style={{
            position: "absolute",
            top: "280px",
            left: "-30px",
            backgroundImage: `url(${formImg})`,
            backgroundPosition: `-${imgPos2.x}px -${imgPos2.y}px`,
            width: `${imgPos2.width}px`,
            height: `${imgPos2.height}px`,
            // border: "1px solid red",
          }}
        ></div>
        <div
          className={`${props.className}`}
          onClick={props.onClick}
          style={{
            position: "absolute",
            top: "490px",
            left: "60px",
            backgroundImage: `url(${formImg})`,
            backgroundPosition: `-${imgPos3.x}px -${imgPos3.y}px`,
            width: `${imgPos3.width}px`,
            height: `${imgPos3.height}px`,
            cursor:"pointer",
            border: "1px solid red",
          }}
        ></div> */}
      </div>
    </>
  );
};

const Prize38k = (props) => {
  const imgPos = { x: 545, y: 50, width: 470, height: 250 };
  const alignPos = props.pc
    ? {
        top: "30%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }
    : props.mb
    ? {
        top: "10%",
        left: "-9%",
        scale: "0.4",
      }
    : {};

  return (
    <>
      <div
        className={`${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${wheelPrizes})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          ...alignPos,
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};

const Prize68k = (props) => {
  const imgPos = { x: 1075, y: 50, width: 470, height: 250 };

  const alignPos = props.pc
    ? {
        top: "30%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }
    : props.mb
    ? {
        top: "10%",
        left: "-9%",
        scale: "0.4",
      }
    : {};

  return (
    <>
      <div
        className={`${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${wheelPrizes})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          ...alignPos,
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};

const Prize88k = (props) => {
  const imgPos = { x: 30, y: 380, width: 470, height: 260 };
  const alignPos = props.pc
    ? {
        top: "30%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }
    : props.mb
    ? {
        top: "10%",
        left: "-9%",
        scale: "0.4",
      }
    : {};

  return (
    <>
      <div
        className={`${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${wheelPrizes})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          ...alignPos,
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};

const Prize128k = (props) => {
  const imgPos = { x: 560, y: 380, width: 470, height: 260 };
  const alignPos = props.pc
    ? {
        top: "30%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }
    : props.mb
    ? {
        top: "10%",
        left: "-9%",
        scale: "0.4",
      }
    : {};

  return (
    <>
      <div
        className={`${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${wheelPrizes})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          ...alignPos,
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};
const Prize188k = (props) => {
  const imgPos = { x: 1085, y: 375, width: 470, height: 260 };
  const alignPos = props.pc
    ? {
        top: "30%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }
    : props.mb
    ? {
        top: "10%",
        left: "-9%",
        scale: "0.4",
      }
    : {};

  return (
    <>
      <div
        className={`${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${wheelPrizes})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          ...alignPos,
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};
const Prize8888k = (props) => {
  const imgPos = { x: 35, y: 735, width: 535, height: 260 };
  const alignPos = props.pc
    ? {
        top: "30%",
        left: "50%",
        transform: "translateX(-50%) translateY(-50%)",
      }
    : props.mb
    ? {
        top: "10%",
        left: "-9%",
        scale: "0.4",
      }
    : {};

  return (
    <>
      <div
        className={`${props.className}`}
        onClick={props.onClick}
        style={{
          position: "absolute",
          backgroundImage: `url(${wheelPrizes})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          ...alignPos,
          border: "1px solid red",
        }}
      ></div>
    </>
  );
};
export {
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
};
