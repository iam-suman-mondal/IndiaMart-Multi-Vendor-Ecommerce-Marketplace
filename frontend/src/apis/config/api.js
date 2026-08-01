import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:7070",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
