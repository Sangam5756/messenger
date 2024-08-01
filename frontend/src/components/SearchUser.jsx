import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import axios from "axios";
import UserSearchCard from "./UserSearchCard";
import { IoIosCloseCircle } from "react-icons/io";


const SearchUser = ({ onClose }) => {

    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(false);
    const [search, setSearch] = useState();

    const handleSearchUser = async () => {

        try {
            setLoading(true)


            const response = await axios.post("http://localhost:5001/api/search-user", {
                search: search
            })

            console.log(response?.data?.data);
            setSearchUser(response.data.data)
            setLoading(false)

        } catch (error) {
            console.log(error)
            toast.error(response?.data?.error);


        }


    }

    useEffect(() => {
        handleSearchUser();
    }, [search])



    return (
        <>
            <div className="fixed    bottom-0 left-0 right-0 top-0 bg-slate-700 p-2  z-10 bg-opacity-50 ">
                   
                <div className="w-full  max-w-md mx-auto mt-10">
                    {/* input search user */}
                    <div className="bg-white rounded overflow-hidden h-14 flex ">
                        <input
                            type="text"
                            name="name"
                            placeholder="Search user by name, email..."
                            onChange={(e) => setSearch(e.target.value)}
                            value={search}
                            className="w-full py-1 outline-none h-full px-4"

                        />
                        <div className="flex h-14 w-14 items-center justify-center">
                            <IoSearchOutline size={25} />
                        </div>


                    </div>
                    {/* display search user */}
                    <div className="bg-white mt-2   w-full rounded-none  p-4">
                        {/* no user found */}
                        {searchUser?.length == 0 && !loading &&
                            (

                                <p className="text-center text-slate-500">no user found!</p>

                            )
                        }
                        {
                            loading && (
                                <div><Loading /></div>
                            )
                        }

                        {
                            searchUser?.length !== 0 && (
                                searchUser?.map((user, index) => {
                                    return (
                                        <UserSearchCard onClose={onClose} key={user?._id} user={user} />

                                    )
                                })

                            )
                        }

                    </div>


                </div>
                <div onClick={onClose} className=" hover:text-white absolute top-0 right-0 p-2 text-2xl lg:text-4xl">
                    <button><IoIosCloseCircle /></button>
                    </div>
                
               
            </div>
        </>
    );
};

export default SearchUser;
