import React from 'react'
import Avatar from "../components/Avatar"
import { Link } from 'react-router-dom'
const UserSearchCard = ({ user, onClose }) => {
  return (

    <Link to={"/"+user?._id} onClick={onClose} className='flex gap-3 p-2 lg:p-4 rounded  duration-75 hover:bg-slate-100 border border-transparent hover:border-sky-400 cursor-pointer border-b-slate-300'>
      <div>
        <Avatar width={50} imageUrl={user?.profile_pic} height={50} name={user?.name} />
      </div>

      <div>
        <div className='font-semibold text-ellipsis line-clamp-1'>
          {user?.name}
        </div>
        <p className='text-ellipsis line-clamp-1'>{user?.email}</p>
      </div>
    </Link>
  )
}

export default UserSearchCard