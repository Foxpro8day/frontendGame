const WheelControls = ({ startSpin, isSpinning }) => {
  return (
    <button
      onClick={startSpin}
      className={`mt-4 px-4 py-2 bg-red-500 text-white font-bold rounded ${
        isSpinning ? "opacity-50 cursor-not-allowed" : ""
      }`}
      disabled={isSpinning}
    >
      {isSpinning ? "Đang quay..." : "Quay"}
    </button>
  );
};

export default WheelControls;
