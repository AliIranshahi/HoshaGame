import React from 'react'
import FavoriteIcon from '@mui/icons-material/Favorite';
function Footer() {
    return (
        <div className='w-[100%] text-[14px] sm:text-[16px] h-7 flex items-center justify-center text-white f-f-vazir-regular tracking-wider gap-2 bg-black py-6'>
            توسعه داده شده با  <span className='text-red-500'><FavoriteIcon /></span>  توسط علی ایرانشاهی
        </div>
    )
}

export default Footer