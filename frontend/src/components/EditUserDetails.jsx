import React, { useEffect, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
const EditUserDetails = ({ onClose, data }) => {

  const [Data, setData] = useState({
    name: data?.user,
    profile_pic: data?.profile_pic
  });

  useEffect(()=>{
    setData((prev)=>{
      return{
        ...prev,
        ...data
      }

    })
  },[data])

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value

      }
    })
  }

  console.log(Data)

  return (
    <div className='fixed bottom-0 top-0 left-0 right-0 bg-gray-700 bg-opacity-40 flex  justify-center items-center '>

      <div className='bg-white p-4 m-1 rounded w-full max-w-sm'>
        <div className='flex justify-between'>
        <h2 className='font-semibold'>Profile Details</h2>
        <p className='hover:scale-125 duration-300 cursor-pointer text-lg' onClick={onClose}><IoIosCloseCircle /></p>
        </div>
        <p className='text-sm'>Edit user details</p>


        <form >

          <div>
            <label htmlFor="name">Name : </label>
            <input type="text" name="name" id="name" value={Data?.name} onChange={handleOnchange} />
          </div>

        </form>

      </div>

    </div>
  )
}

export default EditUserDetails