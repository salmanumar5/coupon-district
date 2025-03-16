import { useEffect } from "react";
import { useCouponStore } from "../store/useCouponStore";

const CouponsList = () => {
  const { fetchCoupons, deleteCoupon, toggleStatus, setFilter, getFilteredCoupons } = useCouponStore();

  useEffect(() => {
    fetchCoupons();
  }, []);

  const filteredCoupons = getFilteredCoupons();
  console.log(filteredCoupons)

  return (
    <div className="bg-gray-800 p-6 rounded-lg mt-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-semibold">Coupons List</h2>
        <div>
          <button onClick={() => setFilter("all")} className="mx-2 border py-1 px-3 cursor-pointer bg-black rounded-full">All</button>
          <button onClick={() => setFilter("claimed")} className="mx-2 border py-1 px-3 cursor-pointer bg-black rounded-full">Claimed</button>
          <button onClick={() => setFilter("active")} className="mx-2 border py-1 px-3 cursor-pointer bg-black rounded-full">Active</button>
        </div>
      </div>
      <table className="w-full text-center">
  <thead>
    <tr>
      <th className="p-2 w-1/4">Code</th>
      <th className="p-2 w-1/4">Availability</th>
      <th className="p-2 w-1/4">Status</th>
      <th className="p-2 w-1/4">Actions</th>
    </tr>
  </thead>
  <tbody>
    {filteredCoupons.map((coupon) => (
      <tr key={coupon._id}>
        <td className="p-2">{coupon.code}</td>
        <td className="p-2">{coupon.isClaimed ? "Claimed" : "Unclaimed"}</td>
        <td className="p-2">
          <span className="inline-block w-16">{coupon.isActive ? "Active" : "Disabled"}</span>
        </td>
        <td className="p-2 flex justify-center gap-2">
          <button 
            onClick={() => toggleStatus(coupon._id)} 
            className="bg-black cursor-pointer text-white px-3 py-1 rounded w-20 text-center"
          >
            {coupon.isActive ? "Disable" : "Enable"}
          </button>
          <button 
            onClick={() => deleteCoupon(coupon._id)} 
            className="bg-white text-black cursor-pointer border px-3 py-1 rounded w-20 text-center"
          >
            Delete
          </button>
        </td>
      </tr>
    ))}
  </tbody>
</table>

    </div>
  );
};

export default CouponsList;
