import "./Dashboard.scss";
import Statistic from "./DashboardItem/Statistic";
import UserList from "./DashboardItem/UserList";
import { useState } from "react";

const Dashboard = () => {
  const [selected, setSelected] = useState("Thống kê");
  const menuItems = [
    { label: "Thống kê", icon: "fa-solid fa-chart-pie" },
    { label: "Lịch sử dòng tiền", icon: "fa-solid fa-clock-rotate-left" },
    { label: "Lịch sử cược", icon: "fa-regular fa-clock" },
    { label: "Chi tiết vé cược", icon: "fa-solid fa-ticket" },
    { label: "Thông tin hội viên", icon: "fa-solid fa-id-card" },
  ];

  return (
    <>
      <div className="dashboard">
        <div className="dashboard-header">
          <h3>Dashboard</h3>
        </div>
        <div className="dashboard-content">
          <div className="dbd-leftside">
            <ul>
              {menuItems.map((item) => (
                <li
                  key={item.label}
                  className={selected === item.label ? "selected" : ""}
                  onClick={() => setSelected(item.label)}
                >
                  <i className={item.icon} style={{ marginRight: "8px" }}></i>
                  {item.label}
                </li>
              ))}
            </ul>
            <button
              className="btn-back"
              onClick={() => {
                window.location.href = "/";
              }}
            >
              <i className="fa-solid fa-arrow-right-from-bracket"></i>
              Trở về trang chủ
            </button>
          </div>
          <div className="dbd-rightside">
            {selected === "Thống kê" && <Statistic />}
            {selected === "Lịch sử dòng tiền" && <div>Đang xây dựng</div>}
            {selected === "Lịch sử cược" && <div>Đang xây dựng</div>}
            {selected === "Chi tiết vé cược" && <div>Đang xây dựng</div>}
            {selected === "Thông tin hội viên" && <UserList />}
          </div>
        </div>
      </div>
    </>
  );
};
export default Dashboard;
