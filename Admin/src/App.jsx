import React, { useEffect, useState } from 'react'
import Navbar from './Components/Navbar'
import Sidebar from './Components/Sidebar'
import { Routes, Route } from 'react-router-dom'
import Add from './Pages/Add'
import List from './Pages/List'
import Order from './Pages/Order'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const App = () => {

  const baseUrl =  import.meta.env.VITE_BASE_URL;

  return (
    <>
      <div className='bg-gray-50 min-h-screen'>
        <ToastContainer />

        <Navbar />
        <hr />
        <div className='flex w-full'>
          <Sidebar />
          <div className='flex-1 ml-[20vw] mt-[5vh] p-6 text-gray-600 text-base'>
            <Routes>
              <Route path='/add' element={<Add baseUrl={baseUrl}/>}></Route>
              <Route path='/list' element={<List baseUrl={baseUrl} />}></Route>
              <Route path='/order' element={<Order baseUrl={baseUrl} />}></Route>
            </Routes>

          </div>
        </div>
      </div>
    </>

  )
}

export default App