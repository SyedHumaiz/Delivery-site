import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { toast } from 'react-toastify'

const Add = ({baseUrl}) => {

    const [image, setimage] = useState(false);

    const [name, setname] = useState("")
    const [description, setdescription] = useState("")
    const [price, setprice] = useState("")
    const [category, setcategory] = useState("Salad")

    const handleSubmit = (e) => {
        e.preventDefault();
        const formData = new FormData();

        formData.append("name", name);
        formData.append("description", description);
        formData.append("price", Number(price));
        formData.append("category", category);
        formData.append("image", image);




        axios.post(baseUrl + "/api/food/add", formData,)
            .then(result => {
                if (result.data.success) {
                    toast.success(result.data.message)
                    setname("")
                    setdescription("")
                    setprice("")
                    setimage(false)

                } else {
                    toast.error(result.data.message)
                }
            }).catch(err => {
                toast.error(err.message)
            })

    }

    return (
        <div>
            <form className='flex flex-col w-full items-start gap-3' onSubmit={handleSubmit}>
                <div >
                    <p className='mb-2'>Upload Image</p>
                    <div className='gap-2 flex '>
                        <label htmlFor="image">
                            <img className='w-20' src={!image ? assets.upload_area : URL.createObjectURL(image)} alt="" />
                            <input onChange={(e) => setimage(e.target.files[0])} type="file" id='image' hidden />
                        </label>
                    </div>
                    <div></div>
                </div>
                <div className='w-full'>
                    <p>Product name</p>
                    <input onChange={(e) => setname(e.target.value)} value={name} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded' type="text" placeholder='Enter product name' required />
                </div>
                <div className='w-full'>
                    <p>Product description</p>
                    <textarea onChange={(e) => setdescription(e.target.value)} value={description} className='w-full max-w-[500px] px-3 py-2 border border-gray-300 rounded' placeholder='Write Content here' required></textarea>
                </div>
                <div className='flex flex-col sm:flex-row gap-2 w-full sm:gap-8'>
                    <div>
                        <p className='mb-2'>Product Category</p>
                        <select required onChange={(e) => setcategory(e.target.value)} className='w-full px-3 py-2 border border-gray-300 rounded'>
                            <option value="Salad">Salad</option>
                            <option value="Rolls">Rolls</option>
                            <option value="Deserts">Deserts</option>
                            <option value="Sandwich">Sandwich</option>
                            <option value="Cake">Cake</option>
                            <option value="Pure veg">Pure veg</option>
                            <option value="Pasta">Pasta</option>
                            <option value="Noodles">Noodles</option>
                        </select>
                    </div>

                    <div >
                        <p className='mb-2'>Price</p>
                        <input required onChange={(e) => setprice(e.target.value)} value={price} className='w-full px-3 py-2 sm:w-[120px] border border-gray-300 rounded' type="number" placeholder='25' />
                    </div>
                </div>

                <button className='bg-black text-white px-4 py-3 w-28'>ADD</button>
            </form>
        </div>
    )
}

export default Add