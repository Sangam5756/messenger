import React, { useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, NavLink } from 'react-router-dom';
import Avatar from "../components/Avatar";
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
const Sidebar = () => {


  const user = useSelector(state => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  console.log(user)
  return (
    <div className='w-full h-full'>

      <div className='bg-slate-200 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex justify-between flex-col'>

        <div>

          {/* Chat button */}
          <NavLink to={"/"} className={({ isActive }) => `w-12 h-12  cursor-pointer hover:bg-slate-300 hover:rounded-md duration-300 flex justify-center items-center ${isActive && "bg-slate-300"}`} title='chat'>
            <IoChatbubbleEllipses size={20} />
          </NavLink>

          {/* add friend logo */}
          <div title='add friend' className='w-12 h-12  cursor-pointer hover:bg-slate-300 hover:rounded-md duration-300 flex justify-center items-center'>
            <FaUserPlus size={20} />
          </div>

        </div>

        <div className='flex flex-col items-center justify-center'>
          {/* Avatar name */}
          <button className='mx-auto' title={user?.name} onClick={() => setEditUserOpen(true)}>
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}

            />
          </button>

          <button title='logout' className='w-12 h-12  cursor-pointer hover:bg-slate-300 hover:rounded-md duration-300 flex justify-center items-center'>
            <span className='mr-2'><BiLogOut size={20} /></span>
          </button>
        </div>

      </div>

      {/* edit user details */}
      {
        (editUserOpen) && (<EditUserDetails onClose={() => setEditUserOpen(false)} userdata={user} />)
      }



    </div>
  )
}

export default Sidebar