import React from "react";
import { menu_list } from "../assets/assets";

const ExploreMenu = ({ category, setCategory }) => {
    return (
        <div id="menu" className="text-center px-4">
            <h2 className="font-semibold text-2xl md:text-3xl text-[#5e5d5d]">Explore our menu</h2>
            <p className="max-w-[600px] mx-auto text-[#747474] text-sm md:text-base mt-2">
                Choose from a diverse menu with a delectable array of dishes. Our mission is to satisfy your cravings and elevate your dining experience, one delicious meal at a time.
            </p>

                <div className="mt-10  gap-6 sm:gap-8 grid lg:grid-cols-6 xl:grid-cols-8 md:grid-cols-6 sm:grid-cols-4 grid-cols-3">
                    {menu_list.map((item, index) => {
                        return (
                            <div
                                key={index}
                                onClick={() => setCategory((prev) => (prev === item.menu_name ? "All" : item.menu_name))}
                                className="flex flex-col items-center gap-2 cursor-pointer transition-transform hover:scale-105"
                            >
                                <img
                                    className={`w-[20vw] sm:w-[15vw] md:w-[10vw] lg:w-[7.5vw] min-w-[80px] rounded-full ${category === item.menu_name ? "border-[4px] border-[#FF6347] p-[2px]" : ""
                                        }`}
                                    src={item.menu_image}
                                    alt={item.menu_name}
                                />
                                <p className="text-[#747474] text-sm sm:text-lg">{item.menu_name}</p>
                            </div>
                        );
                    })}
                </div>
                
            <hr className="h-[2px] bg-[#e2e2e2] border-none mt-5 mb-5" />
        </div>
    );
};

export default ExploreMenu;
