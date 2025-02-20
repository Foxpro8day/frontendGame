import React, { useState, useEffect } from "react";
import io from "socket.io-client";

const socket = io(process.env.REACT_APP_URL_SITE); // Kết nối với backend

const Chat = () => {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("general");
  const [message, setMessage] = useState("");
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    socket.on("receive_message", (data) => {
      setMessages((prevMessages) => [...prevMessages, data]);
    });

    return () => {
      socket.off("receive_message");
    };
  }, []);

  // Tham gia phòng chat
  const joinRoom = () => {
    if (username.trim()) {
      socket.emit("join_room", room);
    } else {
      alert("Vui lòng nhập tên của bạn!");
    }
  };

  // Gửi tin nhắn
  const sendMessage = () => {
    if (message.trim() && username.trim()) {
      socket.emit("send_message", {
        username,
        room,
        message,
      });
      setMessage("");
    }
  };

  return (
    <div>
      <h2>Chat Realtime</h2>

      {/* Nhập tên và chọn phòng */}
      <div>
        <input
          type="text"
          placeholder="Nhập tên..."
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <select value={room} onChange={(e) => setRoom(e.target.value)}>
          <option value="general">General</option>
          <option value="tech">Technology</option>
          <option value="gaming">Gaming</option>
        </select>
        <button onClick={joinRoom}>Vào phòng</button>
      </div>

      {/* Khu vực hiển thị tin nhắn */}
      <div
        style={{
          height: "200px",
          overflowY: "scroll",
          border: "1px solid gray",
          padding: "10px",
          marginTop: "10px",
        }}
      >
        {messages.map((msg, index) => (
          <div key={index}>
            <strong>{msg.username}:</strong> {msg.message}
          </div>
        ))}
      </div>

      {/* Nhập tin nhắn */}
      <div>
        <input
          type="text"
          placeholder="Nhập tin nhắn..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
        />
        <button onClick={sendMessage}>Gửi</button>
      </div>
    </div>
  );
};

export default Chat;
