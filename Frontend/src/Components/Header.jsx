import React, { useContext, useEffect, useState } from 'react';
import { assets } from '../assets/assets';
import { StoreContext } from '../Context/StoreContext';

const Header = () => {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        setTimeout(() => {
            setIsVisible(true);
        }, 100);
    }, []);

    return (
        <div className="min-h-[50vh] md:min-h-[60vh] lg:min-h-[75vh] w-full bg-[url(assets/header_img.png)] bg-cover bg-center bg-no-repeat flex items-center px-4 sm:px-6 md:px-[6vw] rounded-2xl my-12">
            <div 
                className={`text-white transition-opacity duration-1000 ${isVisible ? "opacity-100" : "opacity-0"}`}
            >
                <h2 className="text-[7vw] sm:text-[6vw] md:text-[4vw] lg:text-[3vw] font-semibold leading-tight">
                    Order Your Favourite Food Here
                </h2>
                <p className="hidden md:block text-[3vw] sm:text-[2.5vw] md:text-[1.8vw] lg:text-[1.2vw] max-w-[600px] mt-2">
                    Choose from a diverse menu with a delectable array of dishes made from the finest ingredients. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
                </p>
                <button className="bg-white text-[#747474] px-3 py-1 sm:px-4 sm:py-2 border border-[#747474] rounded-full mt-4 sm:mt-5 cursor-pointer hover:bg-[#f1f1f1] transition">
                    View Menu
                </button>
            </div>
        </div>
    );
};

export default Header;
