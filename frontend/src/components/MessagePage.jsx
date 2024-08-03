import React, { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import Avatar from "./Avatar";
import { FaAngleLeft } from "react-icons/fa6";
import { FaPlus } from "react-icons/fa6";
import { FaEllipsisVertical } from "react-icons/fa6";
import { FaImage } from "react-icons/fa6";
import { FaVideo } from "react-icons/fa";
import UploadImage from "../helper/UploadImage";
import backgroundImage from "../assets/wallapaper.jpeg";
import { IoCloseSharp } from "react-icons/io5";
import { IoMdSend } from "react-icons/io";
import Loading from "./Loading";
import moment from "moment"
const MessagePage = () => {
  const socketConnection = useSelector(
    (state) => state?.user?.socketConnection
  );
  const user = useSelector((state) => state?.user);
  const params = useParams();
  const [loading, setLoading] = useState(false);
  const [openImageVideUpload, setOpenImageVideUpload] = useState(false);
  const [allMessage, setAllMessage] = useState([]);
  const currentmessage = useRef(null);

  useEffect(() => {
    if (currentmessage.current) {
      currentmessage.current.scrollIntoView({ behavior: 'smooth', block: 'end' })
    }
  }, [allMessage])

  const [dataUser, setDataUser] = useState({
    name: "",
    email: "",
    online: false,
    profile_pic: "",
    _id: "",
  });
  const [message, setMessage] = useState({
    text: "",
    imageUrl: "",
    videoUrl: "",
  });

  useEffect(() => {
    if (socketConnection) {
      socketConnection.emit("message-page", params.userId);

      socketConnection.on("message-user", (data) => {
        console.log(data);
        setDataUser(data);
      });



      socketConnection.on('message', (data) => {

        setAllMessage(data)


      })
    }
  }, [socketConnection, params?.userId, user, message]);

  const handleImageUpload = async (e) => {
    const file = e.target.files[0];
    console.log(file);
    setLoading(true);
    const uploadImg = await UploadImage(file);

    console.log(uploadImg);

    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: uploadImg.data.url,
      };
    });
    setLoading(false);
    setOpenImageVideUpload(false);
  };

  const handleVideoUpload = async (e) => {
    const file = e.target.files[0];
    setLoading(true);

    const uploadImg = await UploadImage(file);
    console.log(uploadImg);
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: uploadImg?.data.url,
      };
    });
    setLoading(false);
    setOpenImageVideUpload(false);
  };

  const handleClearImage = () => {
    setMessage((prev) => {
      return {
        ...prev,
        imageUrl: "",
      };
    });
  };
  const handleClearVideo = () => {
    setMessage((prev) => {
      return {
        ...prev,
        videoUrl: "",
      };
    });
  };

  const handleOnChange = (e) => {
    const { name, value } = e.target;

    setMessage((prev) => {
      return {
        ...prev,
        text: value
      }
    })
  }

  const handleSendMessage = (e) => {
    e.preventDefault();

    if (message.text || message.imageUrl || message.videoUrl) {
      if (socketConnection) {
        socketConnection.emit('new-message', {
          sender: user?._id,
          receiver: params?.userId,
          text: message?.text,
          imageUrl: message?.imageUrl,
          videoUrl: message?.videoUrl,
          msgByUserId: user?._id

        })
      }

    }

    setMessage((prev) => {
      return {
        ...prev,
        text: ""
      }
    })

  }

  return (
    <div
      style={{ backgroundImage: `url(${backgroundImage})` }}
      className=" bg-no-repeat bg-cover"
    >
      <header className=" sticky top-0 h-16  bg-white flex items-center justify-between px-4">
        <div className="flex items-center gap-4">
          <Link to={"/"} className="text-2xl lg:hidden">
            <FaAngleLeft />
          </Link>
          <div className="text-center  overflow-hidden rounded-full my-2">
            <Avatar
              width={50}
              height={50}
              imageUrl={dataUser?.profile_pic}
              name={dataUser?.name}
              userId={dataUser?._id}
            />
          </div>
          <div>
            <h3 className="font-semibold text-lg ">{dataUser?.name}</h3>
            <p className="-my-1 text-sm">
              {dataUser?.online ? (
                <span className="text-sky-400">online</span>
              ) : (
                <span className="text-slate-400">offline</span>
              )}
            </p>
          </div>
        </div>
        <div>
          <button className="hover:text-sky-500">
            <FaEllipsisVertical />
          </button>
        </div>
      </header>

      {/* show all message */}
      <section className="h-[calc(100vh-128px)]  relative overflow-x-hidden overflow-y-scroll bg-slate-200 bg-opacity-50 ">

        {/* image */}
        {message.imageUrl && (
          <div className="w-full h-full bg-slate-700 rounded  overflow-hidden bg-opacity-30  flex items-center justify-center">
            <div
              onClick={handleClearImage}
              className="w-fit absolute top-0 right-0 p-2 cursor-pointer hover:text-red-600"
            >
              <IoCloseSharp size={30} />
            </div>

            <div className="bg-white p-3 ">
              <img
                src={message?.imageUrl}
                alt="uploadimg"
                height={300}
                width={300}
              />
            </div>
          </div>
        )}

        {/* video */}
        {message.videoUrl && (
          <div className="w-full h-full bg-slate-700 rounded  overflow-hidden bg-opacity-30  flex items-center justify-center">
            <div
              onClick={handleClearVideo}
              className="w-fit absolute top-0 right-0 p-2 cursor-pointer hover:text-red-600"
            >
              <IoCloseSharp size={30} />
            </div>
            <div className="bg-white p-3 ">
              <video src={message?.videoUrl} />
            </div>
          </div>
        )}

        {/* loading */}
        {loading && (
          <div className="w-full h-full flex items-center  justify-center">
            <Loading />
          </div>
        )}

        {/* all message show here */}
        <div className="flex flex-col gap-2 py-2 mx-2" ref={currentmessage}>
          {
            allMessage.map((msg, index) => {
              return (
                <div className={`bg-white py-1 rounded p-1 w-fit ${user._id === msg.msgByUserId ? "ml-auto bg-teal-100" : ""}`}>
                  <p className="px-2">{msg.text}</p>
                  <p className="text-xs ml-auto w-fit">{moment(msg.createdAt).format('hh:mm')}</p>
                </div>
              )
            })
          }
        </div>


      </section>

      {/* send message */}
      <section className=" bg-white h-16 flex items-center">
        <div className="relative">
          <button
            onClick={() => setOpenImageVideUpload((prev) => !prev)}
            className="flex   justify-center items-center w-11 h-11 hover:bg-sky-500 hover:text-white rounded-full"
          >
            <FaPlus size={20} />
          </button>

          {/* video and image */}
          {openImageVideUpload && (
            <div className=" absolute bg-white shadow rounded   bottom-14  w-36 p-2">
              <form>
                <label
                  htmlFor="uploadImage"
                  className="flex items-center p-2 gap-2 hover:bg-slate-200 cursor-pointer"
                >
                  <div className="text-sky-500">
                    <FaImage size={18} />
                  </div>
                  <p>image</p>
                </label>
                <label
                  htmlFor="uploadVideo"
                  className="flex items-center p-2 gap-2 hover:bg-slate-200 cursor-pointer"
                >
                  <div className=" text-purple-600">
                    <FaVideo size={18} />
                  </div>
                  <p>video</p>
                </label>

                <div>
                  <input
                    type="file"
                    onClick={handleImageUpload}
                    name="uploadImage"
                    id="uploadImage"
                    className="hidden"
                  />
                  <input
                    type="file"
                    onClick={handleVideoUpload}
                    name="uploadVideo"
                    id="uploadVideo"
                    className="hidden"
                  />
                </div>
              </form>
            </div>
          )}
        </div>

        {/* input box */}
        <form onSubmit={handleSendMessage} className="flex h-full w-full gap-2 mr-3">

          <input type="text"
            name="message"
            id="message"
            placeholder="Type here message..."
            className="py-1 px-4 outline-none w-full h-full"
            value={message.text}
            onChange={handleOnChange}
          />

          <button className="hover:text-sky-600 text-sky-400"><IoMdSend size={28} /></button>
        </form>
      </section>
    </div>
  );
};

export default MessagePage;
