import React, { useEffect } from 'react'
import { Outlet, useNavigate, useNavigation } from "react-router-dom";
import axios from "axios";
import { useDispatch, useSelector } from 'react-redux';
import { logOut, setUser } from '../redux/userSlice';
const Home = () => {
  const user = useSelector(state => state.user)
  console.log(user)

  const dispatch = useDispatch();
  const navigate = useNavigate();


  const fetchUserDetails = async () => {
    try {
      const response = await axios.get("http://localhost:5001/api/user-details", {
        withCredentials: true
      })
      console.log(response);
      dispatch(setUser(response.data.data))
      if (response.data.data.logout) {
        dispatch(logOut())
        navigate("/email")
      }
    } catch (error) {
      console.log(error)
    }
  }


  useEffect(() => {
    fetchUserDetails();
  }, [])

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