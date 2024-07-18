import React, { useEffect, useState } from "react";
import AuthLayouts from "../layout";
import { IoClose } from "react-icons/io5";
import { Link, useLocation, useNavigate } from "react-router-dom"
import UploadImage from "../helper/UploadImage.jsx";
import { toast } from "react-toastify";
import axios from "axios";
import { PiUserCircle } from "react-icons/pi";
import Avatar from "../components/Avatar.jsx"


const CheckPasswordPage = () => {


  const [data, setData] = useState({
    password: "",
    userId: "",


  })



  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.state);

  const handleonChange = (e) => {

    const { name, value } = e.target;
    setData((prev) => {
      return {
        ...prev,
        [name]: value

      }
    })



  }

  useEffect(() => {
    if (!location?.state?.name) {
      navigate("/email")
    }
  }, []);




  const handleSubmit = async (e) => { 
    e.preventDefault();
    try {
      const response = await axios.post("http://localhost:5001/api/password",{
        userId: location?.state?._id,
        password: data?.password
      },
      {
        withCredentials:true
      }
    );
      console.log(response);
      toast.success(response.data.message)
      if (response.data.success) {
        setData({
          password: ""
        })
        navigate("/");
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

          <div className="w-fit mx-auto mb-5 flex flex-col justify-center items-center">
            {/* <PiUserCircle

              size={70} /> */}
            <Avatar
              width={70}
              height={70}
              name={location?.state?.name}
              imageUrl={location?.state?.profile_pic}
            />
            <h2 className="font-bold text-lg mt-1">{location?.state?.name}</h2>
          </div>

          <h3>Welcome to chat app</h3>
          <form onSubmit={handleSubmit} className="grid gap-2 mt-5">

            {/* Email */}

            <div className="flex flex-col gap-1">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                name="password"
                id="password"
                placeholder="Enter your Password"
                className="bg-slate-100 outline-none  focus:outline-sky-400  px-2 py-1 outline"
                value={data?.password}
                onChange={handleonChange}
                required

              />

            </div>

            <button className="bg-sky-500 mt-2 font-bold text-white   leading-relaxed tracking-wide rounded text-lg px-4 py-1 hover:bg-sky-600">Login</button>

          </form>
          <p className="text-center mt-2">
            Forget password ? <Link to="/forget-password" className="font-semibold hover:text-sky-400">Forget Password</Link>
          </p>
        </div>
      </div>
    </>
  )
}

export default CheckPasswordPage