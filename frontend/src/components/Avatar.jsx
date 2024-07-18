import React from 'react'
import { PiUserCircle } from 'react-icons/pi'

const Avatar = ({ userId, name, imageUrl, width, height }) => {

    let avtarName = "";

    if (name) {
        let splitname = name.split(" ");
        if (splitname.length > 1) {
            avtarName = splitname[0][0] + splitname[1][0];
        } else {
            avtarName = splitname[0][0];
        }
    }

    const  bgcolor = [
        "bg-slate-200",
        "bg-teal-200",
        "bg-red-200",
        "bg-green-200",
        "bg-blue-200",
        "bg-sky-200",
        "bg-yellow-200",
        "bg-orange-200",
    ]

    const randomcolor = Math.floor(Math.random() * 10)
    
    

    return (
        <div className={`text-slate-800  overflow-hidden rounded-full   font-bold `} style={{ width: width + "px", height: height + "px" }} >
            {
                imageUrl ? (

                    <img src={imageUrl} alt={name} width={width} height={height} />
                )
                    :
                    (

                        name ?
                            (
                                <div style={{ width: width + "px", height: height + "px" }} className={`overflow-hidden rounded-full flex  justify-center items-center text-xl ${bgcolor[randomcolor]} `}>
                                    {avtarName}
                                </div>)

                            :
                            (
                                <PiUserCircle
                                    size={width} />
                            )
                    )
            }
        </div >
    )
}

export default Avatar