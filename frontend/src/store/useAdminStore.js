import { create } from "zustand";
import { axiosInstance } from "../lib/axios"; // Axios instance (handles API requests)
import toast from "react-hot-toast";

export const useAdminStore = create((set, get) => ({
  admin: null,  // Stores logged-in admin data
  isLoggingIn: false,
  isCheckingAuth: true,

  // Check if admin is authenticated
  checkAuth: async () => {
    try {
      const res = await axiosInstance.post("/admin/check");
      set({ admin: res.data });
    } catch (error) {
      set({ admin: null });
    } finally {
      set({ isCheckingAuth: false });
    }
  },

  // Admin Login
  login: async (credentials) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/admin/login", credentials);
      const { token } = res.data;
      console.log(token)
      if (token) {
        localStorage.setItem("adminToken", token);
      }
      set({ admin: res.data });
      toast.success("Logged in successfully!");
    } catch (error) {
      toast.error(error.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  // Admin Logout
  logout: async () => {
    try {
      await axiosInstance.post("/api/admin/logout");
      set({ admin: null });
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Logout failed");
    }
  }
}));
