import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { Link, useLocation } from 'react-router-dom';

const CartTotal = () => {

  const location = useLocation();
  const { getTotalAmount } = useContext(StoreContext);

  return (
    <div className='w-[60vw] md:w-[40vw]'>
      <h2 className='text-4xl font-semibold text-black'>Cart Totals</h2>
      <div className='flex  justify-between mt-3'>
        <p>Subtotal</p>
        <p>${getTotalAmount()}</p>
      </div>
      <hr className='h-[1.5px] bg-gray-300 border-none' />
      <div className='flex justify-between mt-3'>
        <p>Delivery Fee</p>
        <p>${getTotalAmount() === 0 ? 0 : 2}</p>
      </div>
      <hr className='h-[1.5px] bg-gray-300 border-none ' />
      <div className='flex justify-between mt-3'>
        <b>Total</b>
        <b>${getTotalAmount() === 0 ? 0 : getTotalAmount() + 2}</b>
      </div>

      {
        location.pathname.includes("order") ?
          <button className='w-[25vw] md:w-[18vw] text-white bg-[#FF6347] rounded px-2 py-2 mt-3 cursor-pointer'>
            Place order
          </button> :
          <Link to={"/order"}>  <button className='w-[25vw] md:w-[18vw] text-white bg-[#FF6347] rounded px-2 py-2 mt-3 cursor-pointer'>
            Proceed to checkout
          </button></Link>
      }


    </div>
  )
}

export default CartTotal