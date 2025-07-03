import React, { useContext } from 'react'
import { StoreContext } from '../Context/StoreContext'
import FoodItem from './FoodItem'

const FoodDisplay = ({ category }) => {

    const { food_list } = useContext(StoreContext)

    return (
        <div>
            <h2 className='text-2xl md:text-3xl font-medium'>Top Dishes near you</h2>
            <div className='grid sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-7 '>
                {
                    food_list.map((item, index) => {
                        if (category === "All" || category === item.category) {
                            return (
                                <FoodItem id={item._id} name={item.name} description={item.description} price={item.price} image={item.image} />
                            )

                        }
                    })
                }
            </div>
        </div>
    )
}

export default FoodDisplay