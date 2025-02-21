import "./LoadingScreen.scss"; // Import file CSS

const LoadingScreen = ({ progress }) => {
  return (
    <div className="loading-container">
      <div className="loading-bar">
        <div className="loading-progress" style={{ width: `${progress}%` }}>
          <div className="loading-text">
            {progress !== 100
              ? `loading...${progress}%`
              : "...chuẩn bị vào game"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
