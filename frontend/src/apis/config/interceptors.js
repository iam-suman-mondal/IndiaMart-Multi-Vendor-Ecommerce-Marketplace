import api from "./api";
import { refreshAccessToken } from "./authservice";
import { toast } from "react-toastify";

api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("token");

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    (error) => Promise.reject(error)
);

api.interceptors.response.use(
    (response) => response,

    async (error) => {
        const originalRequest = error.config;

        if (
            error.response?.status === 401 &&
            !originalRequest._retry
        ) {
            originalRequest._retry = true;

            try {
                const accessToken = await refreshAccessToken();

                originalRequest.headers.Authorization =
                    `Bearer ${accessToken}`;

                return api(originalRequest);
            } catch (refreshError) {
                localStorage.removeItem("token");
                localStorage.removeItem("refreshToken");

                toast.error(
                    "Session expired. Please log in again."
                );

                window.location.href = "/auth/login";

                return Promise.reject(refreshError);
            }
        }

        const message =
            error.response?.data?.message ||
            "Something went wrong.";

        toast.error(message);

        return Promise.reject(error);
    }
);

export default api;