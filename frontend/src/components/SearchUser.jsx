import React, { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { IoSearchOutline } from "react-icons/io5";
import Loading from "./Loading";
import axios from "axios";
import UserSearchCard from "./UserSearchCard";

const SearchUser = () => {

    const [searchUser, setSearchUser] = useState([]);
    const [loading, setLoading] = useState(true);
    const [search, setSearch] = useState();
    const handleSearchUser = async () => {

        try {

            const response = await axios.post("http://localhost:5001/api/search-user", search)

            console.log(response);
            setSearchUser(response.data.data)

        } catch (error) {
            console.log(error)
            toast.error(response?.data?.error);


        } 
        

    }

    useEffect(()=>{
        handleSearchUser();
    },[search])



    return (
        <>
            <div className="fixed   bottom-0 left-0 right-0 top-0 bg-slate-700 p-2 bg-opacity-50 ">
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
                    <div className="bg-white mt-2 rounded-none w-full p-4">
                        {/* no user found */}
                        {searchUser?.length == 0 && !loading &&
                            (

                                <p className="text-center text-slate-500">no user found!</p>

                            )
                        }
                        {
                            loading && (
                                <p><Loading /></p>
                            )
                        }

                        {
                            searchUser?.length == 0 && (
                                searchUser?.map((user, index) => {
                                    return (
                                        <UserSearchCard key={user?._id} user={user} />

                                    )
                                })

                            )
                        }

                    </div>

                </div>
            </div>
        </>
    );
};

export default SearchUser;
