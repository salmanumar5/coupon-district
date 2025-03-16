import { create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

export const useCouponStore = create((set) => ({
  coupons: [],
  filter: "all",

  fetchCoupons: async () => {
    try {
      const res = await axiosInstance.get("/coupons/all");
      set({ coupons: res.data });
    } catch (error) {
      toast.error("Failed to fetch coupons");
    }
  },

  addCoupon: async (data) => {
    try {
      const res = await axiosInstance.post("/coupons/add", data);
      set((state) => ({ coupons: [...state.coupons, res.data] }));
      toast.success("Coupon added successfully!");
    } catch (error) {
      toast.error("Failed to add coupon");
    }
  },

  deleteCoupon: async (id) => {
    try {
      await axiosInstance.delete(`/coupons/delete/${id}`);
      toast.success("Coupon deleted!");
      set((state) => ({
        coupons: state.coupons.filter((coupon) => coupon._id !== id),
      }));
    } catch (error) {
      toast.error("Failed to delete coupon");
    }
  },

  toggleStatus: async (id) => {
    try {
        await axiosInstance.patch(`/coupons/toggle/${id}`);

        set((state) => ({
            coupons: state.coupons.map((coupon) =>
                coupon._id === id ? { ...coupon, isActive: !coupon.isActive } : coupon
            ),
        }));

        toast.success("Coupon status updated!");
    } catch (error) {
        toast.error("Failed to update status");
    }
},


  setFilter: (filter) => set({ filter }),

  getFilteredCoupons: () => {
    const { coupons, filter } = useCouponStore.getState();
    if (filter === "all") return coupons;
    if (filter === "claimed") return coupons.filter((c) => c.isClaimed);
    if (filter === "active") return coupons.filter((c) => c.isActive);
    return coupons;
  },
}));
