import { useState } from "react";
// eslint-disable-next-line no-unused-vars
import { motion } from "framer-motion";
import { FaUserShield } from "react-icons/fa";
import axios from "axios";
import { Link } from "react-router-dom";
import { axiosInstance } from "../lib/axios";


export default function LandingPage() {
  const [coupon, setCoupon] = useState(null);
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const claimCoupon = async () => {
    setLoading(true);
    setMessage("");
    setCoupon(null);
    try {
      const response = await axiosInstance.post("/coupons/claim");
      setCoupon(response.data.coupon);
      setMessage(response.data.message);
    } catch (error) {
      setMessage(error.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full h-screen bg-black flex flex-col items-center justify-center overflow-hidden">
      <div className="absolute inset-0 bg-gradient-to-r from-purple-800 via-black to-purple-900 opacity-50 animate-pulse"></div>
      <Link to={'/admin/login'} className="absolute top-5 right-5 text-white bg-purple-700 px-4 py-2 rounded-lg flex items-center hover:bg-purple-800 transition">
        <FaUserShield className="mr-2" /> Admin Login
      </Link>
      <motion.div
        className="bg-white shadow-2xl rounded-lg p-8 text-center max-w-md z-10"
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        <h2 className="text-2xl font-bold text-black mb-4">Claim Your Coupon</h2>
        <motion.button
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
          className="bg-purple-700 text-white px-6 py-3 rounded-lg font-bold text-lg shadow-md hover:bg-purple-800 transition"
          onClick={claimCoupon}
          disabled={loading}
        >
          {loading ? "Claiming..." : "Get Your Coupon"}
        </motion.button>
        {message && <p className="mt-4 text-gray-700">{message}</p>}
        {coupon && <p className="mt-4 text-3xl font-bold text-purple-700">{coupon}</p>}
      </motion.div>
    </div>
  );
}
