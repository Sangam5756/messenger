import React, { useEffect, useState } from 'react'
import { Link, useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './Avatar';
import { FaAngleLeft } from "react-icons/fa6";

import { FaEllipsisVertical } from "react-icons/fa6";

const MessagePage = () => {

  const socketConnection = useSelector(state => state?.user?.socketConnection)
  const user = useSelector(state => state?.user);

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    online: false,
    profile_pic: "",
    _id: ""
  })

  const params = useParams()
  console.log("params", params.userId)


  useEffect(() => {

    if (socketConnection) {
      socketConnection.emit("message-page", params.userId)

      socketConnection.on("message-user", (data) => {
        console.log(data)
        setDataUser(data)
      })
    }

  }, [socketConnection, params?.userId, user]);


  console.log("userdata", dataUser)
  return (
    <div >

      <header className=' sticky top-0 h-16  bg-white flex items-center justify-between px-4'>

        <div className='flex items-center gap-4'>
          <Link to={"/"} className='text-2xl lg:hidden'>
            <FaAngleLeft/>
          </Link>
          <div className='text-center  overflow-hidden rounded-full my-2'>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className='font-semibold text-lg '>{dataUser?.name}</h3>
            <p className='-my-1 text-sm'>
              {dataUser?.online ? <span className='text-sky-400'>online</span> : <span className='text-slate-400'>offline</span>}
            </p>

          </div>

        </div>
        <div>
          <button className='hover:text-sky-500'><FaEllipsisVertical /></button>
        </div>

      </header>


    </div>
  )
}

export default MessagePage