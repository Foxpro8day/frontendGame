import './UserList.scss';
import { useEffect, useState } from "react";
import axios from "axios";

const UserList = () => {
  const [users, setUsers] = useState([]);
  const [pagination, setPagination] = useState({
    currentPage: 1,
    totalPages: 1,
  });
  const formatVNDate = (isoString) => {
    const date = new Date(isoString);
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      hour12: false,
      timeZone: "Asia/Ho_Chi_Minh",
    }).format(date);
  };

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await axios.get(
          `user/users?page=${pagination.currentPage}&limit=10`
        );
        setUsers(res.data.users);
        setPagination(res.data.pagination);
      } catch (error) {
        console.error("❌ Lỗi khi lấy danh sách user:", error);
      }
    };

    fetchUsers();
  }, [pagination.currentPage]);

  return (
    <div className="user-list">
      <table border="1" cellPadding="8" cellSpacing="0">
        <thead>
          <tr>
            <th>ID</th>
            <th>Username</th>
            <th>Phone</th>
            <th>Credit</th>
            <th>Point</th>
            <th>Thời gian tạo acc</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.phone}</td>
              <td>{u.credit}</td>
              <td>{u.point}</td>
              <td>{formatVNDate(u.createdAt)}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <div style={{ marginTop: "1rem" }}>
        Trang: {pagination.currentPage} / {pagination.totalPages}
        <br />
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: prev.currentPage - 1,
            }))
          }
                  disabled={pagination.currentPage <= 1}
                  className="me-3"
        >
          ← Trang trước
        </button>
        <button
          onClick={() =>
            setPagination((prev) => ({
              ...prev,
              currentPage: prev.currentPage + 1,
            }))
          }
          disabled={pagination.currentPage >= pagination.totalPages}
        >
          Trang sau →
        </button>
      </div>
    </div>
  );
};

export default UserList;
