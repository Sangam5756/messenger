import React, { useEffect, useState } from 'react'
import { useParams } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux';
import Avatar from './Avatar';
const MessagePage = () => {

  const socketConnection = useSelector(state => state?.user?.socketConnection)
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

  }, [socketConnection, params?.userId]);


  console.log("userdata",dataUser)
  return (
    <div >

      <header className=' sticky top-0 h-16  bg-white'>

        <div>

          <div>
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
        </div>

      </header>

    </div>
  )
}

export default MessagePage