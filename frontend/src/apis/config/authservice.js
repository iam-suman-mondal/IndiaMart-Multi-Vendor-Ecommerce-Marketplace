import axios from "axios";

const BASE_URL = "http://localhost:7070";
export const refreshAccessToken = async () => {
    const refreshToken = localStorage.getItem("refreshToken");

    const response = await axios.post(
        `${BASE_URL}/auth/refresh`,
        {
            refreshToken,
        },
        {
            headers: {
                "ngrok-skip-browser-warning": "true",
            },
        }
    );

    const accessToken = response.data.accessToken;

    localStorage.setItem("token", accessToken);

    return accessToken;
};