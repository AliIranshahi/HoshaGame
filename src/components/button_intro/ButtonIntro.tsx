"use client"
import { useRouter } from 'next/navigation'

import React from 'react'

function ButtonIntro() {
    const router = useRouter();

    return (

        <div className='flex gap-10 justify-center mt-10'>

            <button className='f-f-vazir-regular bg-linear-to-r text-[18px] sm:w-46 sm:text-[20px] md:w-46 from-purple-500 via-blue-500 to-blue-400 text-white  rounded-sm md:text-2xl tracking-wider cursor-pointer px-7 py-3 duration-200 hover:scale-110 hover:via-blue-900 hover:to-blue-700 hover:from-purple-900' onClick={() => router.push('/match')}>

                شروع بازی

            </button>
            <button className='f-f-vazir-regular border-2 text-[18px] sm:w-46 sm:text-[20px]  md:w-46 border-cyan-400 bg-inherit text-cyan-400 rounded-sm md:text-2xl tracking-wider cursor-pointer px-7 py-3 hover:scale-110 hover:bg-cyan-400 duration-200 hover:text-black' onClick={() => router.push("/leaderbord")}>

                لیدربورد

            </button>
        </div>
    )
}

export default ButtonIntro
