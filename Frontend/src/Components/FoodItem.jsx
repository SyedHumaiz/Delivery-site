import React, { useContext } from 'react'
import { assets } from '../assets/assets'
import { StoreContext } from '../Context/StoreContext'

const FoodItem = ({id,name,price,description,image}) => {

  const {cartItem , setcartItem , addToCart , removeFromCart, url} = useContext(StoreContext);

  return (
    <div className='flex sm:flex-col md:w-[25vw] lg:w-[15vw] rounded-xl overflow-hidden mt-5 shadow-[0px_-4px_6px_rgba(0,0,0,0.1),0px_4px_6px_rgba(0,0,0,0.1)] cursor-pointer '>
        <div className='mb-5 relative w-full h-full md:h-[15vw]'>
            <img className='w-full h-full object-cover hover:scale-110 transition ease-in-out ' src={url +"/images/"+image} alt="" />
            {
              !cartItem[id] ? <img className='absolute bottom-5 right-5 w-8 sm:w-11 border-r-[50%] cursor-pointer' onClick={() => addToCart(id)} src={assets.add_icon_white} alt="" />
              : <div className='flex items-center right-5 bottom-5 absolute bg-white rounded-full gap-2 sm:px-2 sm:py-2 p-1'> 
                <img className='w-8' onClick={() => removeFromCart(id)} src={assets.remove_icon_red} alt="" />
                <p className='w-1'>{cartItem[id]}</p>
                <img className='w-8' onClick={() => addToCart(id)} src={assets.add_icon_green} alt="" />
              </div>
            }
        </div>
        <div>
        <div className='flex justify-between px-2 items-center'>
            <p className='text-[#707070] text-md '>{name}</p>
            <img className='w-[80px]' src={assets.rating_starts} alt="" />
        </div>
        <div className='px-2'>
            <p className='text-[#707070] text-xs'>{description}</p>
            <p className='text-[#FF6347] text-lg m-2'>{price}$</p>
        </div>
        </div>
    </div>
  )
}

export default FoodItem