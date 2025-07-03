import React from 'react'
import { assets } from '../assets/assets'

const AppDownload = () => {
  return (
    <div id='app' className='my-20'>
        <p className='text-3xl md:text-5xl font-semibold text-center'>
            For Better Experience Download <br /> Tomato App
        </p>
        <div className='flex flex-col md:flex-row items-center justify-center gap-4 mt-5'>
            <img className='cursor-pointer hover:scale-[1.05] transition  w-[13vw] min-w-[240px]' src={assets.play_store} alt="" />
            <img className='cursor-pointer hover:scale-[1.05] transition  w-[13vw] min-w-[240px]' src={assets.app_store} alt="" />
        </div>
    </div>
  )
}

export default AppDownload