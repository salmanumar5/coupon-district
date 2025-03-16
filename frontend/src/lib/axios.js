import axios from "axios";

export const axiosInstance = axios.create({
    baseURL: import.meta.env.MODE === "development" ? "https://coupon-district.onrender.com/api" : "/api",
    withCredentials: true,
});

// Add Authorization header dynamically
axiosInstance.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem("adminToken");
        if (token) {
            config.headers["Authorization"] = `Bearer ${token}`; // Ensure correct format
        }
        return config;
    },
    (error) => Promise.reject(error)
);
