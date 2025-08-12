"use client"
import React, { useEffect, useState } from 'react'
import Container from '../container/Container'
import Link from 'next/link'
import PersonIcon from '@mui/icons-material/Person';
import EmojiEventsIcon from '@mui/icons-material/EmojiEvents';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import Menu from '../menu/Menu';
import PsychologyAltIcon from '@mui/icons-material/PsychologyAlt';
import { RootState } from '@/redux/store';
import { fetchScoreStatus, fetchUserStatus } from '@/redux/authSlice';
import { useAppDispatch, useAppSelector } from '@/redux/useReduxApp';
import MenuIcon from '@mui/icons-material/Menu';
import { useRouter } from 'next/navigation';
import CloseIcon from '@mui/icons-material/Close';
function Header() {


    // {redux} ----



    const dispatch = useAppDispatch();
    const alu = useAppSelector((state: RootState) => state.AuthSlice);
    const router = useRouter();

    useEffect(() => {
        dispatch(fetchUserStatus());
        dispatch(fetchScoreStatus());
    }, [dispatch]);

    const [menu, setMenu] = useState<boolean>(false)


    console.log(alu, "|||||||||||||||");


    // {redux} ----



    //PHONE

    const [phoneMenu, setPhoneMenu] = useState<boolean>(false)

    //resize

    useEffect(() => {
        function handleResize() {
            if (window.innerWidth >= 640) {
                setPhoneMenu(false);
            }
        }

        window.addEventListener('resize', handleResize);


        handleResize();

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <>
            <header className='bg-[#4f46e5] w-full  py-0 sm:py-4 relative z-20'>
                <Container>
                    <nav className='flex justify-between items-center f-f-vazir-regular px-4 relative'>


                        {/*  Main UL  */}


                        <ul className={`items-center hidden sm:flex`}>
                            <li className='bg-white rounded-full'>
                                {
                                    alu.status == false && <Link href={'/login'} className='flex gap-1 px-3 py-2  text-[#4f47e6]'>
                                        <span>
                                            <PersonIcon />
                                        </span>
                                        <span>
                                            ورود
                                        </span>
                                    </Link>

                                }

                                {
                                    alu.status == true && <div className='relative p-1 w-35 text-center' onClick={() => setMenu(prev => !prev)}>
                                        <AccountCircleIcon color='action' fontSize={'large'} className='cursor-pointer ' />
                                        {
                                            menu && <Menu setMenu={setMenu} />
                                        }
                                        <span className='capitalize'>
                                            {alu.username.substring(0, 9)}
                                        </span>

                                    </div>
                                }

                            </li>
                            <li className='mr-12'>
                                <div className='flex text-white'>

                                    <p className='flex items-center gap-1 flex-row-reverse ml-1'>
                                        <span>
                                            :  امتیاز
                                        </span>
                                        <span>
                                            {
                                                alu.score ? alu.score : 0
                                            }
                                        </span>
                                    </p>
                                    <span>
                                        <EmojiEventsIcon />
                                    </span>
                                </div>
                            </li>
                        </ul>


                        {/*  Main UL  */}


                        <ul onClick={() => router.push("/")} className='cursor-pointer hidden sm:block'>
                            <li className='font-semibold text-white text-2xl'>
                                HOSHA

                                <PsychologyAltIcon fontSize={'large'} />

                            </li>
                        </ul>

                        {/*  PHONE  */}




                        <div className={` flex w-[100%] sm:hidden  justify-between cursor-pointer mt-3 `} >

                            <div>
                                <MenuIcon style={{ color: "black", fontSize: "40px" }} onClick={() => setPhoneMenu((prev) => !prev)} />
                            </div>

                            <div onClick={() => router.push("/")} className='cursor-pointer  sm:block'>
                                <div className='font-semibold text-white text-2xl'>
                                    HOSHA

                                    <PsychologyAltIcon fontSize={'large'} />

                                </div>
                            </div>

                        </div>


                        <ul className={`flex justify-between px-3 items-center z-20  w-[100%] h-[70px] bg-black absolute top-0 transition-all duration-300 ease-in-out ${phoneMenu ? "right-0" : "right-[-200rem]"}`}>
                            <li onClick={() => setPhoneMenu(false)}>

                                <CloseIcon style={{ color: "white", fontSize: "40px" }} />

                            </li>
                            <li className='bg-white rounded-full' >
                                {
                                    alu.status == false && <Link href={'/login'} className='flex gap-1 px-3 py-2  text-[#4f47e6]' onClick={() => setPhoneMenu(false)}>
                                        <span>
                                            <PersonIcon />
                                        </span>
                                        <span>
                                            ورود
                                        </span>
                                    </Link>

                                }

                                {
                                    alu.status == true && <div className='relative p-1 w-fit text-center' onClick={() => setMenu(prev => !prev)}>
                                        <AccountCircleIcon color='action' fontSize={'large'} className='cursor-pointer ' />
                                        {
                                            menu && <Menu setMenu={setMenu} />
                                        }
                                        <span className='capitalize font-bold'>
                                            {alu.username.substring(0, 1)}
                                        </span>

                                    </div>
                                }

                            </li>
                            <li className='mr-12'>
                                <div className='flex text-white'>

                                    <p className='flex items-center gap-1 flex-row-reverse ml-1 text-[14px]'>
                                        <span>
                                            :  امتیاز
                                        </span>
                                        <span>
                                            {
                                                alu.score ? alu.score : 0
                                            }
                                        </span>
                                    </p>
                                    <span>
                                        <EmojiEventsIcon />
                                    </span>
                                </div>
                            </li>
                        </ul>


                        {/*  PHONE  */}


                    </nav>

                </Container>




            </header>
            <svg
                className="absolute top-5 sm:top-10 left-0 w-full h-[70px] z-10 rotate-180"
                viewBox="0 0 1440 200"
                preserveAspectRatio="none"
                xmlns="http://www.w3.org/2000/svg"
            >
                <path
                    fill="#4f46e5"
                    d="M0,80 C240,0 480,160 720,80 C960,0 1200,160 1440,80 L1440,160 L0,160 Z"
                />
            </svg>

            {/*   Close Helper  */}
            <div className='w-full h-full fixed pointer-events-none' onClick={() => setMenu(false)}>

            </div>


        </>

    )
}

export default Header