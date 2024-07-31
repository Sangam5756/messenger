import React, { useEffect } from 'react'
import { Outlet, useLocation, useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { logOut, setUser } from '../redux/userSlice';
import Sidebar from "../components/Sidebar"
import logo from "../assets/logo.png"



const Home = () => {
  const user = useSelector(state => state.user)
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/user-details", {
        withCredentials: true
      });

      dispatch(setUser(response.data.data));
      if (response.data.data.logout) {
        dispatch(logOut());
        navigate("/email");
      }

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    fetchUserDetails();
  }, [])

  const basePath = location?.pathname == "/";

  return (
    <div className='grid lg:grid-cols-[280px,1fr] h-screen max-h-screen'>

      <section className={`bg-white ${!basePath && "hidden"} lg:block`}>
        <Sidebar />
      </section >

      {/* Message Component */}
      <section className={`${basePath && "hidden"}`} >
        <Outlet />
      </section>


      {/* Image logo */}
      <div className={` justify-center items-center flex-col gap-2 hidden {${!basePath ? "hidden" : "lg:flex"}`}>
        <div>
          <img 
          src={logo}
           width={200}
            alt="logo" />

        </div>

        <p className='text-lg mt-2 text-slate-500'>Select user to send message</p>


      </div>

    </div >
  )
}

export default Home