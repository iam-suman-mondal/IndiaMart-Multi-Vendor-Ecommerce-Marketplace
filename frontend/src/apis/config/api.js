import axios from "axios";

const api = axios.create({
  baseURL: "https://bulb-delivery-sanitizer.ngrok-free.dev",
  headers: {
    "ngrok-skip-browser-warning": "true",
  },
});

export default api;
