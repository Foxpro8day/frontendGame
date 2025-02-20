const WheelCanvas = ({ canvasRef, className }) => {
  return <canvas ref={canvasRef} width={400} height={400} className={className} />;
};

export default WheelCanvas;
