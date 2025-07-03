import React, { useState, useEffect, useContext } from 'react';
import { assets } from '../assets/assets';
import axios from "axios"
import { StoreContext } from '../Context/StoreContext';


const Login = ({ setsignin }) => {
    const { url, setToken } = useContext(StoreContext);
    const [request, setrequest] = useState("Sign Up");
    const [err, setErr] = useState(null)
    const [loginValues, setloginValues] = useState({
        name: "",
        email: "",
        password: "",
    });

    const onChnageHandler = (event) => {
        const name = event.target.name;
        const value = event.target.value;
        setloginValues(loginValues => ({ ...loginValues, [name]: value }))
    }

    const onSubmitHandler = (event) => {
        event.preventDefault();
        let newUrl = url;
        if (request === "Login") {
            newUrl = newUrl + "/api/user/login";
        } else {
            newUrl = newUrl + "/api/user/register";
        }

        axios.post(newUrl, loginValues)
            .then(result => {
                if (result.data.success) {
                    console.log(result.data)
                    setloginValues({
                        name: "",
                        email: "",
                        password: "",
                    })
                    setToken(result.data.token)
                    localStorage.setItem("token", result.data.token)
                    setsignin(false);
                } else {
                    setErr(result.data.message)
                }
            }).catch(error => {
                console.log(error)
            })
    }

    useEffect(() => {
        console.log(request)
    }, [request])



    return (
        <div className='fixed top-0 left-0 w-full h-full bg-[#00000090] flex items-center justify-center z-50'>
            <form onSubmit={onSubmitHandler} className='bg-white p-10 rounded-2xl w-[95vw] h-[55vh] sm:w-[53vw] md:w-[43vw] lg:w-[37vw] xl:w-[24vw]'>
                {/* Header */}
                <div className='flex items-center justify-between'>
                    <p className='font-bold text-2xl'>{request}</p>
                    <img className='mt-[7px] cursor-pointer' onClick={() => setsignin(false)} src={assets.cross_icon} alt="Close" />
                </div>

                {/* Input Fields */}
                <div className='flex flex-col gap-7 mt-7 sm:w-[42vw] md:w-[35vw] lg:w-[30vw] xl:w-[20vw]'>
                    <input name='email' onChange={onChnageHandler} value={loginValues.email} className='border border-gray-300 px-3 py-2 rounded' type="email" placeholder='Your Email' required />

                    {request === "Sign Up" && (
                        <input name='name' onChange={onChnageHandler} value={loginValues.name} className='border border-gray-300 px-3 py-2 rounded' type="text" placeholder='Your Name' required />
                    )}
                    <input name='password' onChange={onChnageHandler} value={loginValues.password} className='border border-gray-300 px-3 py-2 rounded' type="password" placeholder='Your Password' required />
                </div>

                {/* Submit Button */}
                <div>
                    <button className='text-white bg-[#FF6347] w-full cursor-pointer px-3 py-2 rounded mt-5' type="submit">
                        {request === "Sign Up" ? "Create Account" : "Login"}
                    </button>
                </div>
                {/* err */}

                {err &&
                    <p className='text-red-700'>* {err}</p>
                }

                {/* Terms and Switch */}
                <div className='flex flex-col items-start mt-3 gap-2 text-gray-500'>
                    {request === "Sign Up" && <label className='flex flex-col items-start gap-2 cursor-pointer'>
                        <input className='cursor-pointer' type="checkbox" required />
                        <span>By continuing, I agree to the terms and privacy policy</span>
                    </label>}
                    {request === "Sign Up" ? (
                        <p className='text-gray-500 cursor-pointer'>
                            Already have an account? <span className='text-[#FF6347]' onClick={() => setrequest("Login")}>Login here</span>
                        </p>
                    ) : (
                        <p className='text-gray-500 cursor-pointer'>
                            Create a new account? <span className='text-[#FF6347]' onClick={() => setrequest("Sign Up")}>Sign up here</span>
                        </p>
                    )}
                </div>
            </form>
        </div>
    );
};

export default Login;
