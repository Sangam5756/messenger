import React, { useEffect, useRef, useState } from 'react'
import { IoIosCloseCircle } from "react-icons/io";
import Avatar from "../components/Avatar"
import UploadImage from '../helper/UploadImage';
import Divider from './Divider';
import axios, { Axios } from 'axios';
import { toast } from "react-toastify";
import { useDispatch } from 'react-redux';
import { setUser } from '../redux/userSlice';



const EditUserDetails = ({ onClose, userdata }) => {

  const [Data, setData] = useState({
    name: userdata?.user,
    profile_pic: userdata?.profile_pic,

  });

  const uploadPhotoref = useRef();
  const dispatch = useDispatch();

  useEffect(() => {
    setData((prev) => {
      return {
        ...prev,
        ...userdata
      }
    })
  }, [userdata])

  const handleOnchange = (e) => {
    const { name, value } = e.target;

    setData((prev) => {
      return {
        ...prev,
        [name]: value

      }
    })
  }

  const handleopenUploadPhoto = (e) => {

    e.preventDefault();



    uploadPhotoref.current.click();
  }

  const handleUploadPhoto = async (e) => {
    const file = e.target.files[0];

    const uploadImg = await UploadImage(file)
    console.log(uploadImg)

    setData((prev) => {
      return {
        ...prev,
        profile_pic: uploadImg?.data?.url
      }
    })
  }



  const handleSubmit = async (e) => {

    e.preventDefault();

    try {

      const response = await axios.post("http://localhost:5001/api/update-user", Data, {
        withCredentials: true
      })


      if (response?.data?.success) {
        toast.success(response?.data?.message);
        dispatch(setUser(response?.data?.data))
        onClose();
      }


    } catch (error) {
      toast.error(response?.data?.error);

    }

  }



  return (


    <div className='fixed  bottom-0 z-10 top-0 left-0  right-0  bg-gray-700  bg-opacity-40 flex  justify-center items-center '>


      <div className='bg-white p-4 py-6 m-1 rounded w-full max-w-sm'>

        {/* heading */}
        <div className='flex justify-between'>
          <h2 className='font-semibold'>Profile Details</h2>
          <p className='hover:scale-125 duration-300 cursor-pointer text-lg' onClick={onClose}><IoIosCloseCircle /></p>
        </div>

        <p className='text-sm'>Edit user details</p>
        {/* Form */}
        <form className='grid gap-3 mt-3' onSubmit={handleSubmit}>

          {/* Name input */}
          <div className='flex flex-col gap-3'>
            <label htmlFor="name">Name : </label>
            <input
              type="text"
              name="name"
              id="name"
              value={Data?.name}
              onChange={handleOnchange}
              className='w-full  py-1 px-2 bg-slate-100 focus:outline-sky-400 border-0.5' />
          </div>

          {/* Photo Upload */}
          <div >
            {/* Profile photo */}
            <div>Photo : </div>

            <div className='my-1 flex  items-center gap-4'>
            <div className='text-center overflow-hidden rounded-full my-2'>
                <Avatar width={60} height={60} name={Data?.name} imageUrl={Data?.profile_pic} />

              </div>
              <label htmlFor="profile_pic">

                <button onClick={handleopenUploadPhoto} className='font-semibold'  >Change photo </button>
                <input ref={uploadPhotoref} type="file" name="profile_pc" id="profile_pic" onChange={handleUploadPhoto} className='hidden' />

              </label>
            </div>



          </div>

          <Divider />

          {/* Buttons for save and cancel */}
          <div className='flex gap-2 w-fit ml-auto'>
            <button onClick={onClose} className='border border-sky-400 px-4 py-1 hover:text-white duration-200  hover:bg-sky-400    text-sky-400  rounded'>Cancel</button>
            <button type='submit' className='border border-sky-400 bg-sky-400 text-white px-4 py-1 rounded'>Save </button>
          </div>

        </form>

      </div>

    </div>
  )
}

export default EditUserDetails