import { useState, useEffect } from "react";

const LogicDice = ({ dice1, dice2, dice3, w, h, diceSize }) => {
  const containerSize = { width: w, height: h };
  const squareSize = diceSize;

  const getRandomPosition = (size, containerSize) => {
    return Math.floor(Math.random() * (containerSize - size));
  };

  const isOverlapping = (square1, square2) => {
    return (
      square1.posX < square2.posX + square2.size &&
      square1.posX + square1.size > square2.posX &&
      square1.posY < square2.posY + square2.size &&
      square1.posY + square1.size > square2.posY
    );
  };

  const generatePositions = (squareSize, containerSize, count) => {
    const positions = [];
    let attempts = 0;
    const maxAttempts = 200;

    while (positions.length < count && attempts < maxAttempts) {
      const newSquare = {
        posX: getRandomPosition(squareSize, containerSize.width),
        posY: getRandomPosition(squareSize, containerSize.height),
        size: squareSize,
      };

      const hasOverlap = positions.some((square) =>
        isOverlapping(square, newSquare)
      );

      if (!hasOverlap) {
        positions.push(newSquare);
      }

      attempts++;
    }

    if (attempts >= maxAttempts) {
      console.warn("Không thể tạo đủ vị trí ngẫu nhiên mà không bị chồng lấn.");
      return generatePositions(squareSize, containerSize, count); // Gọi lại hàm từ đầu    
    }

    return positions;
  };

  const [squares, setSquares] = useState([]);

  useEffect(() => {
    const positions = generatePositions(squareSize, containerSize, 3);
    setSquares(positions);
  }, []);

  // Main game
  const components = [dice1, dice2, dice3];

  return (
    <>
        {squares.map(({ posX, posY }, index) => {
          const SquareComponent = components[index];
          return (
            <SquareComponent
              key={index}
              style={{
                left: `${posX-5}px`,
                top: `${posY-5}px`,
              }}
            />
          );
        })}
    </>
  );
};

export default LogicDice;
