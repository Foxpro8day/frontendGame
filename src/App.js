import { useContext } from "react";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import "./App.scss";
import AuthProvider, { AuthContext } from "./component/Context/AuthContext.js";
import MainPage from "./component/mainpage/mainpage.jsx";
import Dashboard from "./component/subpage/afterLogin/Dashboard.jsx";
import LuckyWheelMembers from "./component/subpage/afterLogin/LuckyWheelMembers.jsx";
import Luckywheel from "./component/subpage/luckywheel/Luckywheel.jsx";
import Page404 from "./component/subpage/page404/Page404.jsx";
import UserPage from "./component/subpage/userPage/userPage.jsx";
import { SoundProvider } from "./component/utils/soundEffect.jsx";
import Chat from "./component/subpage/chatApp/ChatApp.jsx";
import { ToastContainer, toast } from "react-toastify"; // ✅ Import Toastify
import "react-toastify/dist/ReactToastify.css"; // ✅ Import CSS Toastify

function App() {
  return (
    <AuthProvider>
      <SoundProvider>
        <ToastContainer position="top-right" autoClose={3000} />
        <Router>
          <Routes>
            {/* <Route path="/" element={<Minigame />} /> */}
            <Route
              path="/"
              element={<ProtectedRoute component={<MainPage />} />}
            />
            <Route
              path="/quaythuong"
              element={<ProtectedRoute component={<Luckywheel />} />}
            />
            <Route
              path="/dashboard"
              element={<ProtectedRoute component={<Dashboard />} />}
            />
            <Route
              path="/luckywheelmember"
              element={<ProtectedRoute component={<LuckyWheelMembers />} />}
            />
            <Route
              path="/user"
              element={<ProtectedRoute component={<UserPage />} />}
            />
            <Route path="/chat" element={<Chat />} />
            <Route path="*" element={<Page404 />} />
          </Routes>
        </Router>
      </SoundProvider>
    </AuthProvider>
  );
}

// ✅ Component kiểm tra đăng nhập để hiển thị FooterMenu
const ProtectedRoute = ({ component }) => {
  const { isLoggedIn } = useContext(AuthContext);

  return <>{component}</>;
};

export default App;
