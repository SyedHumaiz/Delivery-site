import React, { useState } from 'react'
import Header from '../Components/Header'
import Exloremenu from '../Components/Exloremenu'
import FoodDisplay from '../Components/FoodDisplay'
import AppDownload from '../Components/AppDownload'

const Home = () => {
  const [category, setCategory] = useState("All")
  return (
    <>
    <Header/>
    <Exloremenu category = {category} setCategory = {setCategory} />
    <FoodDisplay category ={category}/>
    <AppDownload/>
    </>
  )
}

export default Home