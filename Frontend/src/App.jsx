import React , {useState} from 'react'
import Navbar from './Components/Navbar'
import { Routes , Route } from 'react-router-dom'
import Home from './Pages/Home'
import Placeorder from './Pages/Placeorder'
import Cart from './Pages/Cart'
import Footer from './Components/Footer'
import Login from './Components/Login'
import UserOrders from './Pages/UserOrders'

const App = () => {
  const [signin, setsignin] = useState(false)
  return (
    <div className='flex flex-col min-h-screen'>
      {signin ? <Login setsignin={setsignin}/> : <></>}
    <div className='px-4 sm:px-[5vw] md:px-[7vw] lg:px-[9vw] pt-3'>
      <Navbar setsignin ={setsignin}/>
      <Routes>
        <Route path='/' element = { <Home/>} />
        <Route path='/cart' element = { <Cart/>} />
        <Route path='/placeOrder' element = { <Placeorder/>} />
        <Route path='/userOrder' element = { <UserOrders/>} />
      </Routes>
    </div>
      <Footer />
    </div>
  )
}

export default App