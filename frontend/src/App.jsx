import { Navigate, Route, Routes } from "react-router-dom";
import { useEffect } from "react";
import { Toaster } from "react-hot-toast";
import { Loader } from "lucide-react";
import LandingPage from "./pages/LandingPage";
import { useAdminStore } from "./store/useAdminStore";
import AdminLogin from "./pages/AdminLoginPage";
import AdminPanel from "./pages/AdminPanel";

const App = () => {
  const { admin } = useAdminStore();

  return (
    <div>
      <Routes>

        <Route path="/" element={<LandingPage />} />
        <Route path="admin/login" element={!admin ? <AdminLogin /> : <Navigate to="/admin/dashboard" />} />

        {/* Protected Admin Routes */}
        <Route path='/admin/dashboard' element={admin ? <AdminPanel /> : <Navigate to='/admin/login' />} />
        {/* <Route path="/admin/dashboard" element={admin ? <AdminDashboard /> : <Navigate to="/login" />} />
        <Route path="/admin/coupons" element={admin ? <ManageCoupons /> : <Navigate to="/login" />} />
        <Route path="/admin/history" element={admin ? <ClaimHistory /> : <Navigate to="/login" />} /> */}
      </Routes>
    </div>
  );
};

export default App;
