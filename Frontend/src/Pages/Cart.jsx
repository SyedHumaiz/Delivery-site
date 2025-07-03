import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import { assets } from '../assets/assets';
import CartTotal from '../Components/CartTotal';
import { Link } from 'react-router-dom';


const Cart = () => {

  const { food_list, cartItem, addToCart, removeFromCart, getTotalAmount, url } = useContext(StoreContext);

  return (
    <div>
      <div className='grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_0.5fr] gap-2'>
        <p>Items</p>
        <p>Title</p>
        <p>Price</p>
        <p>Quantity</p>
        <p>Total</p>
        <p>Remove</p>
      </div>
      <hr className='h-[1.5px] bg-gray-300 border-none'></hr>
      {
        food_list.map((item, index) => {
          if (cartItem[item._id] > 0) {
            return (
              <>
                <div className='grid grid-cols-[1.5fr_1.5fr_1fr_1fr_1fr_0.5fr] mt-2 items-center gap-2'>
                  <img className='w-16' src={url + "/images/" + item.image} alt="" />
                  <p>{item.name}</p>
                  <p>${item.price}</p>
                  <p>{cartItem[item._id]}</p>
                  <p>${cartItem[item._id] * item.price}</p>
                  <img onClick={() => removeFromCart(item._id)} className='cursor-pointer' src={assets.cross_icon} alt="" />
                </div>
                <hr className='h-[1.5px] bg-gray-300 border-none'></hr>
              </>
            )

          }
        })
      }
      <div className=' flex flex-col md:flex-row items-center justify-between text-gray-500 mt-20'>
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


          <Link to={"/placeOrder"}>  <button className='w-[25vw] md:w-[18vw] text-white bg-[#FF6347] rounded px-2 py-2 mt-3 cursor-pointer'>
            Proceed to checkout
          </button></Link>



        </div>
        <div className='mt-10 md:mt-0 ]'>
          <p>If you hava a Promo code, Enter it here</p>
          <form className='w-[60vw] md:w-[30vw] flex items-center mx-auto  gap-3 my-4 bg-[#eaeaea] rounded' >
            <input required className='w-full sm:flex-1 outline-none px-2 ' type="text" placeholder='promo code' />
            <button type='submit' className='bg-black text-white text-sm py-3 px-10 rounded cursor-pointer'>Subscribe</button>
          </form>
        </div>

      </div>
    </div>
  )
}

export default Cart