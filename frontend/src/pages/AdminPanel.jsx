import { useState, useEffect } from 'react';
import { useAdminStore } from '../store/useAdminStore';
import { useCouponStore } from '../store/useCouponStore';
import CouponsList from '../components/CouponList';
import ClaimHistory from '../components/ClaimHistory';
import AddCouponModal from '../components/AddCouponModal';

const AdminPanel = () => {
  const { logout } = useAdminStore();
  const { coupons, fetchCoupons } = useCouponStore();
  const [isModalOpen, setIsModalOpen] = useState(false);

  console.log(coupons)

  useEffect(() => {
    fetchCoupons();
  }, []);

  return (
    <div className="min-h-screen bg-gray-900 text-white p-6">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-bold">Admin Panel</h1>
        <div className="flex gap-3">
          <button onClick={() => setIsModalOpen(true)} className="bg-white text-black px-4 py-2 rounded-full">Add Coupon</button>
          <button onClick={logout} className="bg-red-600 px-4 py-2 rounded-full">Logout</button>
        </div>
      </div>

      <div className="grid grid-cols-3 gap-4">
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Total Coupons</h2>
          <p className="text-2xl">{coupons.length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Active Coupons</h2>
          <p className="text-2xl">{coupons.filter(c => c.isActive).length}</p>
        </div>
        <div className="bg-gray-800 p-4 rounded-lg text-center">
          <h2 className="text-lg font-semibold">Claimed Coupons</h2>
          <p className="text-2xl">{coupons.filter(c => c.isClaimed).length}</p>
        </div>
      </div>

      <button onClick={fetchCoupons} className="mt-6 bg-blue-500 px-4 py-2 rounded-md">Refresh Coupons</button>

      <CouponsList />
      <ClaimHistory />

      <AddCouponModal isOpen={isModalOpen} onClose={() => setIsModalOpen(false)} />
    </div>
  );
};

export default AdminPanel;
