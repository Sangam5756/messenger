import React, { useEffect } from 'react'
import { Outlet } from "react-router-dom";
import axios from "axios";
const Home = () => {

  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/user-details",{
        withCredentials:true
      })
      console.log(response);
    } catch (error) {
        console.log(error)
    }
  }

  useEffect(()=>{
      fetchUserDetails();
  },[])

  return (
    <div>Home

      {/* Message Component */}
      <section>
        <Outlet />
      </section>

    </div>
  )
}

export default Home