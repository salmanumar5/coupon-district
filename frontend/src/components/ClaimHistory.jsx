import { useEffect, useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

const ClaimHistory = () => {
  const [claimHistory, setClaimHistory] = useState([]);
  console.log(claimHistory)

  // Fetch claim history
  const fetchClaimHistory = async () => {
    try {
      const res = await axiosInstance.get("/coupons/history");
      setClaimHistory(res.data);
    } catch (error) {
      toast.error("Failed to fetch claim history", error);
    }
  };

  useEffect(() => {
    fetchClaimHistory();
  }, []);

  return (
    <div className="mt-8 bg-gray-800 p-6 rounded-lg">
      <h2 className="text-xl font-semibold mb-4">Claim History</h2>
      <div className="overflow-x-auto">
        <table className="w-full text-left border-collapse border border-gray-600">
          <thead className="bg-gray-700">
            <tr>
              <th className="p-2 border border-gray-600">User IP</th>
              <th className="p-2 border border-gray-600">User SessionID</th>
              <th className="p-2 border border-gray-600">Coupon Code</th>
              <th className="p-2 border border-gray-600">Date</th>
            </tr>
          </thead>
          <tbody>
            {claimHistory.length > 0 ? (
              claimHistory.map((claim, index) => (
                <tr key={index} className="hover:bg-gray-700">
                  <td className="p-2 border border-gray-600">{claim.ipAddress}</td>
                  <td className="p-2 border border-gray-600">{claim.browserSession ? claim.browserSession : "-"}</td>
                  <td className="p-2 border border-gray-600">{claim.couponCode}</td>
                  <td className="p-2 border border-gray-600">{new Date(claim.claimedAt).toLocaleString()}</td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="4" className="text-center p-4">No claims yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ClaimHistory;
