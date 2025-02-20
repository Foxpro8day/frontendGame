import React, { useEffect, useState } from "react";
const desUrl = process.env.REACT_APP_URL_SITE;

const Dashboard = () => {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const response = await fetch(`${desUrl}/user/luckywheelmember`, {
          method: "GET",
          credentials: "include", // ✅ Gửi cookie để xác thực token
          headers: { "Content-Type": "application/json" },
        });

        if (!response.ok) {
          throw new Error("❌ Không thể tải danh sách user!");
        }

        const data = await response.json();
        setUsers(data.users); // ✅ Lưu danh sách user vào state
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchUsers();
  }, []);

  return (
    <div className="win-user-container">
      <h2>📋 Danh Sách User</h2>
      {loading ? (
        <p>⏳ Đang tải...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <table >
          <thead>
            <tr>
              <th>STT</th>
              <th>Tên</th>
              <th>Số điện thoại</th>
              <th>Trúng giải</th>
            </tr>
          </thead>
          <tbody>
            {users?.map((user, index) => (
              <tr key={user.id || index}>
                <td>{user.stt}</td>
                <td>{user.name}</td>
                <td>{user.phone}</td>
                <td>{user.prize}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

export default Dashboard;
