import React from 'react'
import { assets } from '../assets/assets'

const Footer = () => {
    return (
        <div id='footer' className='bg-[#323232] p-20  text-white mt-15 bottom-[]'>
            <div className='flex flex-col sm:grid lg:grid-cols-[2fr_1fr_1fr] gap-8 m-auto '>
                <div className=''>
                    <img className='' src={assets.logo} alt="" />
                    <p className='my-7 lg:w-[80%]'>Lorem ipsum dolor sit amet consectetur, adipisicing elit. Pariatur voluptatem eligendi laboriosam modi a hic ipsa. Minus deleniti impedit id labore nostrum doloribus assumenda natus. Libero necessitatibus quibusdam consequatur eius!</p>
                    <div className='flex gap-3 mt-5 '>
                        <img className='cursor-pointer' src={assets.facebook_icon} alt="" />
                        <img className='cursor-pointer' src={assets.linkedin_icon} alt="" />
                        <img className='cursor-pointer' src={assets.twitter_icon} alt="" />
                    </div>
                </div>
                <div>
                    <h2 className='uppercase text-2xl  md:text-3xl lg:text-4xl font-bold'>Company</h2>
                    <ul className='mt-5 text-md sm:text-lg'>
                        <li>Home</li>
                        <li>About US</li>
                        <li>Delivery</li>
                        <li>Privacy policy</li>
                    </ul>
                </div>
                <div>
                    <h2 className='uppercase text-2xl  md:text-3xl lg:text-4xl font-bold'>Get in touch</h2>
                    <ul className='mt-5 text-md sm:text-lg'>
                        <li>+1-202-304-3</li>
                        <li>contact@tomato.com</li>
                    </ul>
                </div>

            </div>
            <hr className='bg-[#e2e2e2] h-[1.5px] mt-20' />
            <p className='text-center mt-5'>Copyright 2025 Tomato.com -All rights reserved</p>
        </div>
    )
}

export default Footer
