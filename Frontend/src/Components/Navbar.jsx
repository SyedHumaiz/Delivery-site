import React, { useState, useEffect, useContext } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { assets } from "../assets/assets";
import { StoreContext } from "../Context/StoreContext";

const Navbar = ({ setsignin }) => {
  const { getTotalAmount, token, setToken } = useContext(StoreContext);
  const [Visible, setVisible] = useState(false);
  const [activeLink, setActiveLink] = useState("/");
  const location = useLocation();
  const navigate = useNavigate();


  const handleNavigation = (target) => {


    if (location.pathname !== "/") {
      navigate("/");
      setTimeout(() => {
        scrollToSection(target);
      }, 100);
    } else {
      scrollToSection(target);
    }
  };
  const scrollToSection = (id) => {
    setActiveLink(id);
    const section = document.querySelector(id);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  const onLogout = () => {
    localStorage.removeItem("token")
    setToken("");
    navigate("/")
  }

  return (
    <>
      {/* ✅ Fixed Navbar */}
      <div className="fixed top-0 left-0 w-full bg-white shadow-md z-10 px-10 py-4">
        <div className="hidden md:flex justify-between items-center">
          <Link onClick={() => setActiveLink("/")} to="/"> <img src={assets.logo} alt="Logo" /> </Link>

          <ul className="hidden sm:flex gap-6 text-lg">
            <Link to="/" onClick={() => setActiveLink("/")} className="relative">
              <p>Home</p>
              <hr className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#FF6347] border-none transition-all duration-300 ${activeLink === "/" ? "block" : "hidden"}`} />
            </Link>
            {["#menu", "#app", "#footer"].map((link, index) => (
              <button key={index} onClick={() => handleNavigation(link)} className="relative cursor-pointer">
                <p>{link === "#app" ? "Mobile-App" : link === "#footer" ? "Contact-Us" : "Menu"}</p>
                <hr className={`absolute bottom-0 left-0 w-full h-[2px] bg-[#FF6347] border-none transition-all duration-300 ${activeLink === link ? "block" : "hidden"}`} />
              </button>
            ))}
          </ul>

          <div className="flex items-center gap-6">
            <img className="w-7 cursor-pointer" src={assets.search_icon} alt="Search" />
            <div className="relative">
              <Link to="/cart">
                <img className="w-7 cursor-pointer" src={assets.basket_icon} alt="Basket" />
                <div className={`${getTotalAmount() === 0 ? "hidden" : "h-[12px] w-[12px] rounded-full bg-[#FF6347] absolute top-[-0.3vw] right-[-0.5vw]"}`}></div>
              </Link>
            </div>
            {
              !token ? <button onClick={() => setsignin(true)} className="px-4 py-2 rounded-full border border-[#FF6347] cursor-pointer hover:bg-[#fbeeec] transition duration-300">
                Sign In
              </button> :
                <div className="group relative">
                  <img src={assets.profile_icon} alt="" />
                  <div className="absolute hidden group-hover:block dropdown-menu right-0 border border-[#aeaeae]  ">
                    <ul className="flex flex-col cursor-pointer gap-2 py-1 px-10 bg-slate-100 text-gray-500 ">
                      <Link to={"/userOrder"}>
                        <li className="list-none flex items-center justify-center">
                          <img className="w-8 cursor-pointer" src={assets.bag_icon} alt="" />
                          <p>Orders</p>
                        </li>
                      </Link>
                      <hr />
                      <li className="list-none flex items-center justify-center">
                        <img className="w-8 cursor-pointer" src={assets.logout_icon} alt="" />
                        <p onClick={() => onLogout()}>Logout</p>
                      </li>
                    </ul>
                  </div>
                </div>
            }
          </div>
        </div>

        {/* Mobile Navbar */}
        <div className="md:hidden flex justify-between items-center px-4 py-3">
          <img onClick={() => setVisible(true)} className="w-6 cursor-pointer" src={assets.menu_icon} alt="Menu" />
          <Link to="/"><img className="w-[28vw] cursor-pointer" src={assets.logo} alt="Logo" /></Link>
          <div className="flex items-center gap-3">
            <img className="w-6 cursor-pointer" src={assets.search_icon} alt="Search" />
            <div className="relative">
              <Link to="/cart">
                <img className="w-7 cursor-pointer" src={assets.basket_icon} alt="Basket" />
                <div className={`${getTotalAmount() === 0 ? "hidden" : "h-[12px] w-[12px] rounded-full bg-[#FF6347] absolute top-[-1.5vw] right-[-1.5vw]"}`}></div>
              </Link>
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Menu */}
      <div className={`fixed top-0 right-0 bottom-0 bg-white transition-all overflow-hidden z-50 ${Visible ? "w-full" : "w-0"}`}>
        <div className="flex flex-col">
          <div onClick={() => setVisible(false)} className="px-6 py-4 cursor-pointer flex items-center gap-3 text-medium">
            <img className="w-4 rotate-180" src={assets.dropdown_icon} alt="Back" />
            <p>Back</p>
          </div>
          <Link to="/" onClick={() => { setVisible(false); setActiveLink("/"); }} className="border text-center pl-6 py-3">
            Home
          </Link>
          {["#menu", "#app", "#footer"].map((link, index) => (
            <button key={index} onClick={() => { setVisible(false); handleNavigation(link); }} className="border pl-6 py-3">
              {link === "#app" ? "Mobile-App" : link === "#footer" ? "Contact" : "Menu"}
            </button>
          ))}
        </div>
      </div>

      {/* ✅ Push Content Down to Avoid Overlap */}
      <div className="mt-[80px] sm:mt-[90px]"></div>
    </>
  );
};

export default Navbar;
