import { useEffect, useState } from "react";
import axios from "axios";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Legend,
  Tooltip,
} from "recharts";

const Statistic = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const res = await axios.get("/user/statistics", {
          withCredentials: true, // gửi cookie nếu dùng auth bằng cookie
        });

        // Convert backend data → format cho biểu đồ
        const formatted = res.data.map((item) => ({
          name: formatMonth(item.month),
          Số_lượng_người_dùng: item.count,
        }));

        setData(formatted);
      } catch (err) {
        console.error("❌ Lỗi khi lấy dữ liệu thống kê:", err);
      }
    };

    fetchStats();
  }, []);

  const formatMonth = (iso) => {
    const [year, month] = iso.split("-");
    return `Tháng ${parseInt(month)} - ${year}`;
  };

  return (
    <LineChart width={600} height={320} data={data}>
      <CartesianGrid strokeDasharray="3 3" />
      <XAxis dataKey="name" stroke="white" />
      <YAxis stroke="white" />
      <Tooltip />
      <Legend />
      <Line type="monotone" dataKey="Số_lượng_người_dùng" stroke="white" />
    </LineChart>
  );
};

export default Statistic;
