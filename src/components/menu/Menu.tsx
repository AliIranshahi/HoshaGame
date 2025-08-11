"use client"
import { authSlice } from '@/redux/authSlice';
import axios from 'axios'
import { useRouter } from 'next/navigation'
import React from 'react'
import { useDispatch } from 'react-redux';
function Menu({ setMenu }: { setMenu: React.Dispatch<React.SetStateAction<boolean>> }) {

    const router = useRouter();
    const dispatch = useDispatch();
    const handleExit = async () => {
        const response = await axios.post("api/removecookies");
        if (response.status == 200) {
            console.log("عملیات با موفقیت بود");
            router.push("/");
            setMenu(false)
            dispatch(authSlice.actions.logout())
        } else {
            console.log("خطا");

        }
    }


    return (
        <ul className='absolute top-12 right-[5px] w-30 h-30 bg-white rounded-lg text-center flex flex-col justify-center gap-5' onClick={(e) => e.stopPropagation()}>
            <li className='cursor-pointer'>
                تنظیمات
            </li>
            <li className='cursor-pointer' onClick={handleExit}>
                خروج
            </li>
        </ul>
    )
}

export default Menu