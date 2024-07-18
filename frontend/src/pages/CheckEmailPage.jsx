import React, { useState } from "react";
import AuthLayouts from "../layout";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"
import UploadImage from "../helper/UploadImage.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { PiUserCircle } from "react-icons/pi";


const CheckEmailPage = () => {


  const [data, setData] = useState({
    email: ""

  })

  const navigate = useNavigate();

  const handleonChange = (e) => {

    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value

      }
    })



  }



  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/email", data);
      console.log(response);
      toast.success(response.data.message)
      if (response.data.success) {
        setData({
          email: ""
        })
        navigate("/password",
          { state: response.data.data }
        );
      }


    } catch (error) {
      console.log("error" + error);
      toast.error(error.response.data.message)


    }

  }


  return (
    <>
      <AuthLayouts />

      <div className="mt-5 ">
        <div className="bg-white w-full max-w-sm mx-auto rounded overflow-hidden p-4 ">

          <div className="w-fit mx-auto mb-5">
            <PiUserCircle
              size={70} />
          </div>

          <h3>Welcome to chat app</h3>
          <form action="" onSubmit={handleSubmit} className="grid gap-2 mt-5">

            {/* Email */}

            <div className="flex flex-col gap-1">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                placeholder="Enter your Email"
                className="bg-slate-100 outline-none  focus:outline-sky-400  px-2 py-1 outline"
                value={data?.email}
                onChange={handleonChange}
                required

              />

            </div>

            <button className="bg-sky-500 mt-2 font-bold text-white   leading-relaxed tracking-wide rounded text-lg px-4 py-1 hover:bg-sky-600">Let's Go</button>

          </form>
          <p className="text-center mt-2">
            New User ? <Link to="/register" className="font-semibold hover:text-sky-400">Register</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default CheckEmailPage