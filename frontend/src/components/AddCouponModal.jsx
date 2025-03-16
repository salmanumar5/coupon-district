// AddCouponModal.js
import { useState } from 'react';
import toast from 'react-hot-toast';
import { useCouponStore } from '../store/useCouponStore';

const AddCouponModal = ({ isOpen, onClose }) => {
  const { addCoupon } = useCouponStore();
  const [couponCode, setCouponCode] = useState('');
  const [isActive, setIsActive] = useState(true);

  const handleSubmit = async () => {
    if (!couponCode.trim()) {
      toast.error('Coupon code cannot be empty');
      return;
    }

    try {
      await addCoupon({ code: couponCode, isActive });
      console.log(couponCode)
      toast.success('Coupon added successfully!');
      setCouponCode('');
      onClose();
    } catch (error) {
      toast.error('Failed to add coupon', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="bg-white p-6 rounded-lg w-96 text-black">
        <h2 className="text-xl font-semibold mb-4">Add Coupon</h2>
        <input
          type="text"
          value={couponCode}
          onChange={(e) => setCouponCode(e.target.value)}
          placeholder="Enter coupon code"
          className="w-full p-2 border rounded mb-4"
        />
        <div className="flex items-center mb-4">
          <input
            type="checkbox"
            checked={isActive}
            onChange={() => setIsActive(!isActive)}
            className="mr-2"
          />
          <label>Active</label>
        </div>
        <div className="flex justify-end gap-2">
          <button onClick={onClose} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
          <button onClick={handleSubmit} className="bg-blue-600 text-white px-4 py-2 rounded">Add</button>
        </div>
      </div>
    </div>
  );
};

export default AddCouponModal;
