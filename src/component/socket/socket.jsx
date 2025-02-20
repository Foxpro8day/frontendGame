import { io } from "socket.io-client";
const desUrl = process.env.REACT_APP_URL_SITE;

// Kết nối đến backend (thay đổi địa chỉ nếu cần)
const socket = io(desUrl);

export default socket;
