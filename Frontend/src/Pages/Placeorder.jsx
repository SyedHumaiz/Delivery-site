import React, { useContext, useState } from 'react';
import { StoreContext } from '../Context/StoreContext';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Placeorder = () => {
  const { getTotalAmount, cartItem, url, token, clearCart  } = useContext(StoreContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState({
    firstName: "", lastName: "", email: "",
    street: "", city: "", state: "",
    zipCode: "", country: "", phone: ""
  });

  const handleInput = (e) => {
    setAddress(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const placeOrder = async (e) => {
    e.preventDefault();
    const amount = getTotalAmount() === 0 ? 0 : getTotalAmount() + 2;

    try {
      const res = await axios.post(
        `${url}/api/order/place`,
        { cartItems: cartItem, amount, address },
        { headers: { token } }
      );

      if (res.data.success) {
        alert("Order placed successfully!");
        clearCart();
        navigate("/userOrder");
      } else {
        alert("Something went wrong!");
      }
    } catch (err) {
      console.error("Order Error:", err.response?.data || err.message);
      alert("Failed to place order");
    }
  };

  return (
    <form onSubmit={placeOrder} className='flex flex-col sm:flex-row justify-between pt-5 sm:pt-14 gap-4 min-h-[60vh]'>
      <div className='flex flex-col gap-4 w-full sm:w-[30%]'>
        <div className='text-2xl font-semibold mb-[1vw]'>Delivery Information</div>
        <div className='flex gap-3'>
          <input required name='firstName' onChange={handleInput} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='First Name' />
          <input required name='lastName' onChange={handleInput} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Last Name' />
        </div>
        <input required name='email' onChange={handleInput} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="email" placeholder='Email Address' />
        <input required name='street' onChange={handleInput} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Street' />
        <div className='flex gap-3'>
          <input required name='city' onChange={handleInput} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='City' />
          <input required name='state' onChange={handleInput} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='State' />
        </div>
        <div className='flex gap-3'>
          <input required name='zipCode' onChange={handleInput} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Zipcode' />
          <input required name='country' onChange={handleInput} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="text" placeholder='Country' />
        </div>
        <input name='phone' onChange={handleInput} className='border border-gray-300 rounded py-1.5 px-3.5 w-full' type="number" placeholder='Phone' />
        <button type="submit" className='bg-[#FF6347] text-white py-2 px-4 mt-4 rounded cursor-pointer'>
          Place Order
        </button>
      </div>

      <div className='w-full sm:w-[60%] md:w-[40%]'>
        <h2 className='text-4xl font-semibold text-black mb-4'>Cart Totals</h2>
        <div className='flex justify-between mt-3'><p>Subtotal</p><p>${getTotalAmount()}</p></div>
        <hr className='h-[1.5px] bg-gray-300 border-none' />
        <div className='flex justify-between mt-3'><p>Delivery Fee</p><p>${getTotalAmount() === 0 ? 0 : 2}</p></div>
        <hr className='h-[1.5px] bg-gray-300 border-none' />
        <div className='flex justify-between mt-3'><b>Total</b><b>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</b></div>
      </div>
    </form>
  );
};

export default Placeorder;
