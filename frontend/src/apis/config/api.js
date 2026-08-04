import axios from "axios";

const api = axios.create({
  // baseURL: "http://localhost:9090",
  baseURL: "https://bulb-delivery-sanitizer.ngrok-free.dev",

  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
