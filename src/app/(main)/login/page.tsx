import LoginSection from '@/components/login_section/LoginSection';
import { ReduxProvider } from '@/redux/feauture/Provider';
import React from 'react'


function page() {

    return (
        <div className=" sm:200 sm:h-100 w-[90%] mt-20 sm:mt-40 md:mt-0 md:w-[100%] md:h-200  mx-auto flex items-center justify-center  rounded-bl-4xl rounded-tr-4xl">
            <div className='bg-[#0c263850] w-120 h-120 flex flex-col justify-center rounded-sm'>
                <ReduxProvider>
                    <LoginSection />
                </ReduxProvider>

            </div>
        </div>
    )
}

export default page