import React, { useState } from "react";
import AuthLayouts from "../layout";
import { IoClose } from "react-icons/io5";
import { Link, useNavigate } from "react-router-dom"
import UploadImage from "../helper/UploadImage.jsx";
import { toast } from "react-toastify";
import axios from "axios";

const RegisterPage = () => {

    const [data, setData] = useState({
        name: "",
        email: "",
        password: "",
        profile_pic: "",
    })

    const [uploadPhoto, setUploadPhoto] = useState("");
    const navigate = useNavigate();

    const handleonChange = (e) => {

        const { name, value } = e.target;
        setData((prev) => {
            return {
                ...prev,
                [name]: value

            }
        })


    }

    const handleUploadPhoto = async (e) => {
        const file = e.target.files[0];

        const uploadImg = await UploadImage(file)
        setData((prev) => {
            return {
                ...prev,
                profile_pic: uploadImg.data?.url
            }
        })

        setUploadPhoto(file)


    }

    const handleUploadPhotoClear = (e) => {
        e.stopPropagation();
        e.preventDefault();
        setUploadPhoto("");
    }




    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post("http://localhost:5001/api/register", data);
            console.log(response);
            toast.success(response.data.message)
            if (response.data.success) {
                setData({
                    name: "",
                    email: "",
                    password: "",
                    profile_pic: "",

                })
                navigate("/email");
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
                    <h3>Welcome to chat app</h3>
                    <form action="" onSubmit={handleSubmit} className="grid gap-2 mt-5">
                        {/* Name */}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="name">Name</label>
                            <input
                                type="text"
                                name="name"
                                id="name"
                                placeholder="Enter your name"
                                className="bg-slate-100  outline-none  focus:outline-sky-400  px-2 py-1 outline"
                                value={data?.name}
                                onChange={handleonChange}
                                required

                            />

                        </div>
                        {/* Email */}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="email">Email</label>
                            <input
                                type="email"
                                name="email"
                                id="email"
                                placeholder="Enter your Email"
                                className="bg-slate-100 outline-none  focus:outline-sky-400  px-2 py-1 outline"
                                value={data?.email}
                                onChange={handleonChange}
                                required

                            />

                        </div>
                        {/* Password*/}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="password">Password</label>
                            <input
                                type="password"
                                name="password"
                                id="password"
                                placeholder="Enter your Password"
                                className="bg-slate-100  outline-none  focus:outline-sky-400  px-2 py-1 outline"
                                value={data?.password}
                                onChange={handleonChange}
                                required

                            />

                        </div>
                        {/* Profile_Pic*/}

                        <div className="flex flex-col gap-1">
                            <label htmlFor="profile_pic">
                                Photo:
                                <div className="h-14 bg-slate-200 flex justify-center items-center border rounded text-sm hover:border-sky-400 cursor-pointer">

                                    <p className="text-sm max-w-[200px] text-ellipsis line-clamp-1">{uploadPhoto?.name ? uploadPhoto.name : " upload profile photo"} </p>

                                    {uploadPhoto?.name &&
                                        <button onClick={handleUploadPhotoClear} className="ml-2 text-lg hover:text-red-600"><IoClose /></button>
                                    }

                                </div>

                            </label>



                            <input
                                type="file"
                                name="profile_pic"
                                id="profile_pic"
                                className="bg-slate-100 hidden   focus:outline-sky-400  px-2 py-1 outline"
                                onChange={handleUploadPhoto}


                            />

                        </div>

                        <button className="bg-sky-500 mt-2 font-bold text-white   leading-relaxed tracking-wide rounded text-lg px-4 py-1 hover:bg-sky-600">Register</button>
                    </form>
                    <p className="text-center mt-2">
                        Already have account ? <Link to="/email" className="font-semibold hover:text-sky-400">Login</Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
