import "./winner.scss";
import React, { useState, useEffect } from "react";
import axios from "axios";

const Winner = () => {
  const [winners, setWinners] = useState([]);
  const API_URL = process.env.REACT_APP_URL_SITE;
  useEffect(() => {
    console.log("API URL:", process.env.REACT_APP_URL_SITE);
    const fetchWinners = async () => {
      try {
      const response = await axios.get(`${API_URL}/user/vinh-danh`);
        setWinners(response.data);
      } catch (error) {
        console.error("Error fetching winners:", error);
      }
    };

    fetchWinners();
  }, []);
  

  return (
    <div className="winner-container">
      <div className="winner-wrapper">
        <table>
          <thead>
            <tr>
              <th>#</th>
              <th>Winner</th>
              <th>Game</th>
              <th>Số Tiền (VNĐ)</th>
            </tr>
          </thead>
          <tbody>
            {winners.map((winner, index) => (
              <tr key={index}>
                <td>{winner.stt}</td>
                <td>{winner.name}</td>
                <td>{winner.game}</td>
                <td>{winner.reward}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default Winner;
