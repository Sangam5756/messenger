import React, { useState } from 'react'
import { IoChatbubbleEllipses } from "react-icons/io5";
import { FaUserPlus } from "react-icons/fa";
import { BiLogOut } from "react-icons/bi";
import { Link, NavLink } from 'react-router-dom';
import { GoArrowUpLeft } from "react-icons/go";

import Avatar from "../components/Avatar";
import { useSelector } from 'react-redux';
import EditUserDetails from './EditUserDetails';
import Divider from './Divider';
import SearchUser from './SearchUser';
const Sidebar = () => {




  const user = useSelector(state => state.user);
  const [editUserOpen, setEditUserOpen] = useState(false);
  const [allUser, setAllUser] = useState([]);
  const [openSearchUser, setOpenSearchUser] = useState(false)



  return (
    <div className='w-full h-full grid grid-cols-[48px,1fr] bg-white'>

      <div className='bg-slate-100 w-12 h-full rounded-tr-lg rounded-br-lg py-5 text-slate-600 flex justify-between flex-col'>

        <div>

          {/* Chat button */}
          <NavLink to={"/"} className={({ isActive }) => `w-12 h-12  cursor-pointer hover:bg-slate-300 hover:rounded-md duration-300 flex justify-center items-center ${isActive && "bg-slate-300"}`} title='chat'>
            <IoChatbubbleEllipses size={20} />
          </NavLink>

          {/* add friend logo */}
          <div title='add friend' onClick={() =>  setOpenSearchUser(true)} className='w-12 h-12  cursor-pointer hover:bg-slate-300 hover:rounded-md duration-300 flex justify-center items-center'>
            <FaUserPlus size={20} />
          </div>

        </div>

        <div className='flex flex-col items-center justify-center'>
          {/* Avatar name */}
          <button className='mx-auto' title={user?.name} onClick={() => setEditUserOpen(true)}>
          <div className='text-center overflow-hidden rounded-full my-2'>
            <Avatar
              width={40}
              height={40}
              name={user?.name}
              imageUrl={user?.profile_pic}
              userId={user?._id}

            />
            </div>
          </button>

          <button title='logout' className='w-12 h-12  cursor-pointer hover:bg-slate-300 hover:rounded-md duration-300 flex justify-center items-center'>

            <span className='mr-2'><BiLogOut size={20} /></span>
          </button>
        </div>


      </div>

      <div className='w-full'>
        <h2 className='text-xl font-semibold p-4 h-18 text-slate-800 mb-1'>Message</h2>
        <Divider />

        <div className='h-[calc(100vh-70px)] scrollbar overflow-x-hidden overflow-y-auto'>
          {
            allUser.length == 0 && (

              <div className="mt-12">
                <div className="flex items-center font-semibold text-slate-500 my-4 justify-center">
                  <GoArrowUpLeft size={50} />
                </div>
                <p className="text-slate-400  text-lg text-center">
                  Explore user to start a conversation with.
                </p>
              </div>

            )

          }
        </div>

      </div>

      {/* edit user details */}
      {
        (editUserOpen) && (<EditUserDetails onClose={() => setEditUserOpen(false)} userdata={user} />)
      }

      {/* search user */}
      {
        openSearchUser && (<SearchUser onClose={() => setOpenSearchUser(false)} />)

      }



    </div>
  )
}

export default Sidebar