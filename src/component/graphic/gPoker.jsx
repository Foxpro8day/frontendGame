import { motion } from "framer-motion";
import { useState } from "react";
import cardsBlur from "../assets/images/Poker/cards-blur.webp";
import cardsImg from "../assets/images/Poker/cards.png";
import mainImg from "../assets/images/Poker/poker-main.webp";
import shuffleDeck from "../utils/deckCardLogic";
import achievementImg from "../assets/images/Poker/achievements.webp"
import "./gPoker.scss";

const cardVariants = {
  rollingIn: {
    y: [0, 300],
    opacity: 1,
    transition: { duration: .7 },
  },
  rollingOut: (index) => ({
    y: [-300, 0],
    opacity: 1,
    transition: { duration: .4, ease: "easeInOut", delay: index * 0.3 },
  }),
};

const Main = (props) => {
  const imgPos = { x: 50, y: 50, width: 1025, height: 540 };

  const [otherCards, setOtherCards] = useState(
    Array.from({ length: 10 }, () => shuffleDeck().slice(0, 5))
  );

  return (
    <>
      <div
        className={props.className}
        onClick={props.onClick}
        style={{
          position: "relative",
          // bottom: props.bottom,
          // left: props.left,
          backgroundImage: `url(${mainImg})`,
          backgroundPosition: `-${imgPos.x}px -${imgPos.y}px`,
          width: `${imgPos.width}px`,
          height: `${imgPos.height}px`,
          // border: "1px solid red"
        }}
      ></div>
      {/* Hiển thị 10 dòng, mỗi dòng có 5 lá bài ngẫu nhiên */}
      <div className="cards-container">
        <motion.div
          className={`card-row ${props.isRolling ? "main-cards-effect" : ""}`}
          variants={cardVariants}
          initial="hidden"
          animate={props.isRolling ? "rollingIn" : "rollingOut"}
        >
          <div
            className={`card-row ${props.isRolling ? "main-cards-effect" : ""}`}
          >
            {props.cards.map((card, index) => (
              <motion.div
                key={index}
                className={`card card${index + 1}`}
                custom={index}
                variants={cardVariants}
                initial="hidden"
                animate={props.isRolling ? "rollingIn" : "rollingOut"}
              >
                <Cards cardName={card} />
              </motion.div>
            ))}
          </div>
        </motion.div>

        <div
          className={`group-cards ${
            props.isRolling ? "group-cards-effect" : ""
          }`}
        >
          <div className="other-cards-container">
            {otherCards.map((row, rowIndex) => (
              <div key={rowIndex} className="card-row">
                {row.map((card, cardIndex) => (
                  <div
                    key={cardIndex}
                    className={`card card-${rowIndex + 1}-${cardIndex + 1}`}
                  >
                    <Cards cardName={card} />
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

const Cards = ({ cardName, top, left, className, onClick }) => {
  const cardPositions = {
    aceSpades: { x: 672, y: 122, w: 154, h: 118, r: -90 },
    aceHearts: { x: 764, y: 2, w: 154, h: 118, r: -90 },
    aceDiamonds: { x: 982, y: 742, w: 118, h: 154, r: 0 },
    aceClubs: { x: 587, y: 672, w: 154, h: 118, r: -90 },

    kingSpades: { x: 432, y: 862, w: 118, h: 154, r: 0 },
    kingHearts: { x: 2, y: 178, w: 154, h: 118, r: -90 },
    kingDiamonds: { x: 2, y: 608, w: 118, h: 154, r: 0 },
    kingClubs: { x: 277, y: 397, w: 154, h: 118, r: -90 },

    queenSpades: { x: 552, y: 792, w: 154, h: 118, r: -90 },
    queenHearts: { x: 826, y: 277, w: 154, h: 118, r: -90 },
    queenDiamonds: { x: 552, y: 398, w: 154, h: 118, r: -90 },
    queenClubs: { x: 588, y: 517, w: 118, h: 154, r: 0 },

    jackSpades: { x: 144, y: 2, w: 154, h: 118, r: -90 },
    jackHearts: { x: 433, y: 587, w: 154, h: 118, r: -90 },
    jackDiamonds: { x: 983, y: 587, w: 118, h: 154, r: 0 },
    jackClubs: { x: 983, y: 432, w: 118, h: 154, r: 0 },

    tenSpades: { x: 158, y: 122, w: 118, h: 154, r: 0 },
    tenHearts: { x: 299, y: 3, w: 154, h: 118, r: -90 },
    tenDiamonds: { x: 433, y: 277, w: 118, h: 154, r: 0 },
    tenClubs: { x: 707, y: 398, w: 154, h: 118, r: -90 },

    nineSpades: { x: 828, y: 122, w: 118, h: 154, r: 0 },
    nineHearts: { x: 278, y: 518, w: 154, h: 118, r: -90 },
    nineDiamonds: { x: 157, y: 278, w: 154, h: 118, r: -90 },
    nineClubs: { x: 454, y: 3, w: 154, h: 118, r: -90 },

    eightSpades: { x: 610, y: 3, w: 154, h: 118, r: -90 },
    eightHearts: { x: 122, y: 398, w: 154, h: 118, r: -90 },
    eightDiamonds: { x: 708, y: 242, w: 118, h: 154, r: 0 },
    eightClubs: { x: 610, y: 3, w: 154, h: 118, r: -90 },

    sevenSpades: { x: 863, y: 552, w: 118, h: 154, r: 0 },
    sevenHearts: { x: 277, y: 878, w: 154, h: 118, r: -90 },
    sevenDiamonds: { x: 277, y: 638, w: 154, h: 118, r: -90 },
    sevenClubs: { x: 863, y: 707, w: 118, h: 154, r: 0 },

    sixSpades: { x: 277, y: 123, w: 154, h: 118, r: -90 },
    sixHearts: { x: 552, y: 277, w: 154, h: 118, r: -90 },
    sixDiamonds: { x: 2, y: 298, w: 118, h: 154, r: 0 },
    sixClubs: { x: 277, y: 122, w: 154, h: 118, r: -90 },

    fiveSpades: { x: 122, y: 877, w: 154, h: 118, r: -90 },
    fiveHearts: { x: 742, y: 636, w: 118, h: 154, r: 0 },
    fiveDiamonds: { x: 278, y: 758, w: 154, h: 118, r: -90 },
    fiveClubs: { x: 553, y: 122, w: 118, h: 154, r: 0 },

    fourSpades: { x: 983, y: 277, w: 118, h: 154, r: 0 },
    fourHearts: { x: 3, y: 453, w: 118, h: 154, r: 0 },
    fourDiamonds: { x: 122, y: 638, w: 154, h: 118, r: -90 },
    fourClubs: { x: 863, y: 397, w: 118, h: 154, r: 0 },

    threeSpades: { x: 433, y: 432, w: 118, h: 154, r: 0 },
    threeHearts: { x: 707, y: 793, w: 154, h: 118, r: -90 },
    threeDiamonds: { x: 122, y: 758, w: 154, h: 118, r: -90 },
    threeClubs: { x: 983, y: 122, w: 118, h: 154, r: 0 },

    twoSpades: { x: 707, y: 518, w: 154, h: 118, r: -90 },
    twoHearts: { x: 433, y: 122, w: 118, h: 154, r: 0 },
    twoDiamonds: { x: 863, y: 862, w: 118, h: 154, r: 0 },
    twoClubs: { x: 313, y: 242, w: 118, h: 154, r: 0 },

    cardSelected: { x: 3, y: 3, w: 137, h: 172, r: 0 },
    cardBack: { x: 2, y: 763, w: 118, h: 154, r: 0 },
  };
  const card = cardPositions[cardName];

  return (
    <>
      <div
        className={className}
        onClick={onClick}
        style={{
          position: "absolute",
          top: top,
          left: left,
          backgroundImage: `url(${cardsImg})`,
          backgroundPosition: `-${card.x}px -${card.y}px`,
          width: `${card.w}px`,
          height: `${card.h}px`,
          rotate: `${card.r}deg`,
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};

const CardsBlur = ({ cardName, top, left, className, onClick }) => {
  const cardPositions = {
    aceHearts: { x: 132, y: 233, w: 184, h: 115, r: -90 },
    aceClubs: { x: 620, y: 349, w: 184, h: 115, r: -90 },
    aceSpades: { x: 713, y: 605, w: 184, h: 115, r: -90 },
    aceDiamonds: { x: 360, y: 582, w: 115, h: 184, r: 0 },

    kingClubs: { x: 13, y: 188, w: 115, h: 184, r: 0 },
    kingDiamonds: { x: 504, y: 1, w: 184, h: 115, r: -90 },
    kingHearts: { x: 689, y: 233, w: 184, h: 115, r: -90 },
    kingSpades: { x: 434, y: 349, w: 184, h: 115, r: -90 },

    queenHearts: { x: 13, y: 744, w: 115, h: 184, r: 0 },
    queenDiamonds: { x: 504, y: 233, w: 184, h: 115, r: -90 },
    queenClubs: { x: 248, y: 465, w: 184, h: 115, r: -90 },
    queenSpades: { x: 318, y: 883, w: 184, h: 115, r: -90 },

    jackSpades: { x: 504, y: 117, w: 184, h: 115, r: -90 },
    jackClubs: { x: 686, y: 117, w: 184, h: 115, r: -90 },
    jackDiamonds: { x: 620, y: 465, w: 184, h: 115, r: -90 },
    jackHearts: { x: 807, y: 721, w: 184, h: 115, r: -90 },

    tenSpades: { x: 128, y: 722, w: 115, h: 184, r: 0 },
    tenDiamonds: { x: 434, y: 465, w: 184, h: 115, r: -90 },
    tenClubs: { x: 688, y: 883, w: 184, h: 115, r: -90 },
    tenHearts: { x: 996, y: 511, w: 184, h: 115, r: -90 },

    nineHearts: { x: 132, y: 116, w: 184, h: 115, r: -90 },
    nineSpades: { x: 873, y: 2, w: 115, h: 184, r: 0 },
    nineDiamonds: { x: 873, y: 188, w: 115, h: 184, r: 0 },
    nineClubs: { x: 996, y: 743, w: 184, h: 115, r: -90 },

    eightSpades: { x: 13, y: 560, w: 115, h: 184, r: 0 }, //8
    eightDiamonds: { x: 320, y: 116, w: 184, h: 115, r: -90 }, //8
    eightHearts: { x: 435, y: 766, w: 184, h: 115, r: -90 }, //8
    eightClubs: { x: 996, y: 858, w: 184, h: 115, r: -90 }, //8

    sevenHearts: { x: 128, y: 350, w: 115, h: 184, r: 0 },
    sevenSpades: { x: 128, y: 536, w: 115, h: 184, r: 0 },
    sevenDiamonds: { x: 620, y: 766, w: 184, h: 115, r: -90 },
    sevenClubs: { x: 504, y: 883, w: 184, h: 115, r: -90 },

    sixSpades: { x: 806, y: 488, w: 184, h: 115, r: -90 },
    sixHearts: { x: 593, y: 582, w: 115, h: 184, r: 0 },
    sixClubs: { x: 248, y: 767, w: 184, h: 115, r: -90 },
    sixDiamonds: { x: 873, y: 836, w: 115, h: 184, r: 0 },

    fiveDiamonds: { x: 13, y: 2, w: 115, h: 184, r: 0 },
    fiveSpades: { x: 688, y: 1, w: 184, h: 115, r: -90 },
    fiveClubs: { x: 320, y: 233, w: 184, h: 115, r: -90 },
    fiveHearts: { x: 996, y: 395, w: 184, h: 115, r: -90 },

    fourSpades: { x: 320, y: 1, w: 184, h: 115, r: -90 },
    fourHearts: { x: 248, y: 349, w: 184, h: 115, r: -90 },
    fourClubs: { x: 244, y: 582, w: 115, h: 184, r: 0 },
    fourDiamonds: { x: 132, y: 906, w: 184, h: 115, r: -90 },

    threeHearts: { x: 13, y: 374, w: 115, h: 184, r: 0 },
    threeDiamonds: { x: 132, y: 1, w: 184, h: 115, r: -90 },
    threeSpades: { x: 996, y: 163, w: 184, h: 115, r: -90 },
    threeClubs: { x: 996, y: 279, w: 184, h: 115, r: -90 },

    twoHearts: { x: 806, y: 372, w: 184, h: 115, r: -90 },
    twoDiamonds: { x: 476, y: 582, w: 115, h: 184, r: 0 },
    twoClubs: { x: 996, y: 47, w: 184, h: 115, r: -90 },
    twoSpades: { x: 996, y: 626, w: 184, h: 115, r: -90 },
  };

  const card = cardPositions[cardName];
  return (
    <>
      <div
        className={className}
        onClick={onClick}
        style={{
          // position: "absolute",
          // top:  "0px",
          // left:  "0px" ,
          backgroundImage: `url(${cardsBlur})`,
          backgroundPosition: `-${card.x}px -${card.y}px`,
          width: `${card.w}px`,
          height: `${card.h}px`,
          rotate: `${card.r}deg`,
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};

const Rolling = (props) => {
  const posImg = { x: 1180, y: 485, w: 296, h: 80 };

  return (
    <>
      <div
        className={props.className}
        onClick={props.onClick}
        style={{
          position: "absolute",
          top: "430px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundImage: `url(${mainImg})`, //cardsMissing
          backgroundPosition: `-${posImg.x}px -${posImg.y}px`,
          width: `${posImg.w}px`,
          height: `${posImg.h}px`,
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};

const Roll = (props) => {
  const posImg = { x: 1170, y: 350, w: 316, h: 136 };

  return (
    <>
      <div
        className={props.className}
        onClick={props.onClick}
        style={{
          position: "absolute",
          top: "402px",
          left: "50%",
          transform: "translateX(-50%)",
          backgroundImage: `url(${mainImg})`, //cardsMissing
          backgroundPosition: `-${posImg.x}px -${posImg.y}px`,
          width: `${posImg.w}px`,
          height: `${posImg.h}px`,
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};

const Achievement = (props) => {
  const achievementPos = {
    twoPair: { x: 30, y: 645, w: 710, h: 300 }, // 2 doi
    straigh: { x: 30, y: 986, w: 710, h: 300 }, // sanh
    straightFlush: { x: 23, y: 1295, w: 710, h: 440 }, // thung pha sanh rong
    flush: { x: 30, y: 1730, w: 710, h: 300 }, // thung
    fourOfAKind: { x: 30, y: 2045, w: 710, h: 300 }, // tu quy
    threeOfAKind: { x: 775, y: 60, w: 710, h: 300 }, // tam co
    aPair: { x: 805, y: 395, w: 710, h: 300 }, // doi a
    kPair: { x: 805, y: 730, w: 710, h: 300 }, // doi k
    qPair: { x: 805, y: 1055, w: 710, h: 300 }, // doi q
    jPair: { x: 810, y: 1395, w: 710, h: 300 }, // doi j
    fullHouse: { x: 805, y: 1720, w: 710, h: 300 }, // tam co & 1 doi
  };

  const posImg = achievementPos[props.name];

  return (
    <>
      <div
        className={props.className}
        onClick={props.onClick}
        style={{
          position: "absolute",
          top: "10px",
          left: "160px",
          backgroundImage: `url(${achievementImg})`,
          backgroundPosition: `-${posImg.x}px -${posImg.y}px`,
          width: `${posImg.w}px`,
          height: `${posImg.h}px`,
          scale: ".5",
          // border: "1px solid red",
        }}
      ></div>
    </>
  );
};

export { Cards, CardsBlur, Main, Roll, Rolling, Achievement };
