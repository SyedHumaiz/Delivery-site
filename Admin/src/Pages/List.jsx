import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify'

const List = ({ baseUrl }) => {

  const [list, setlist] = useState([])

  const fetchList = async () => {
    await axios.get(`${baseUrl}/api/food/list`)
      .then((result) => {
        if (result.data.success) {
          setlist(result.data.data)
        } else {
          toast.error("Error")
        }
      }).catch(
        err => toast.error(err.message)
      )
  }

  const removeProduct = (id) => {
    axios.post(baseUrl + "/api/food/remove", { id })
      .then(result => {
        if (result.data.success) {
          toast.success(result.data.message)
          fetchList()
        }
        else {
          toast.error(result.data.message)
        }
      }).catch(err => {
        toast.error(err.message)
      })
  }

  const confirmDelete = (id, handleDelete) => {
    toast.info(
      <div>
        <p>Are you sure you want to delete this data?</p>
        <div className="flex justify-end gap-2 mt-2">
          <button
            className="bg-red-500 text-white px-4 py-2 rounded"
            onClick={() => {
              handleDelete(id);
              toast.dismiss(); // Close the toast after confirmation
            }}>  Yes  </button>
          <button
            className="bg-gray-500 text-white px-4 py-2 rounded"
            onClick={() => toast.dismiss()} // Close the toast without action
          >No</button>
        </div>
      </div>,
      {
        position: "top-right",
        autoClose: false, // Prevent auto-closing
        closeOnClick: false, // Disable close on click
      }
    );
  };


  useEffect(() => {
    fetchList();
  }, [])


  return (
    <div >
      <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-1 px-2  border bg-gray-100 text-sm'>
        <b>Image</b>
        <b>Name</b>
        <b>Category</b>
        <b>Price</b>
        <b className='text-center'>Action</b>
      </div>

      { list.length === 0 ? (
            <p>No products found.</p>
          ) :
        (list.map((item) => {
          return (
            <div key={item._id} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 border text-sm px-2 py-1'>
              <img src={`${baseUrl}/images/${item.image}`} alt="" />
              <b>{item.name}</b>
              <b>{item.category}</b>
              <b>{item.price}</b>
              <b onClick={() => confirmDelete(item._id , removeProduct)} className='text-right md:text-center cursor-pointer text-lg'>X</b>
            </div>
          )
        }))
      }

    </div>
  )
}

export default List