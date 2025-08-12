"use client"
import { fetchUserStatus } from '@/redux/authSlice';
import { fetchScoreStatus } from '@/redux/authSlice';
import { useAppDispatch } from '@/redux/useReduxApp';
import axios, { Axios } from 'axios';
import { useRouter } from 'next/navigation';
import React, { useState } from 'react'
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
type TForm = {
    username: string,
    password: string,
    repeatpassword: string
}
function LoginSection() {
    const [statusPage, setStatusPage] = useState<"login" | "signup">("login")
    const { register, handleSubmit, reset, watch, formState: { errors } } = useForm<TForm>();
    const [errorMessage, setErrorMessage] = useState("");
    const router = useRouter();
    const password = watch("password")
    const dispatch = useAppDispatch();
    const onSubmit = async (data: TForm) => {

        console.log("ارسال صحیح", data);

        const formatData = {
            ...data,
            username: data.username.toLocaleLowerCase(),

        }

        if (statusPage == "login") {

            setErrorMessage("");

            try {
                const response = await axios.post("api/login", formatData, { withCredentials: true })
                const dataResponse = await response.data
                // console.log(dataResponse);
                if (dataResponse.message == "secsuse") {
                    await dispatch(fetchUserStatus());
                    await dispatch(fetchScoreStatus());
                    console.log(dataResponse, "LOG IS ");
                    toast.success("ورود با موفقیت انجام شد")
                    router.push("/")
                }
            } catch (error) {


                if (axios.isAxiosError(error) && error.response) {
                    const errorType = error.response.data;
                    setErrorMessage(errorType.message)
                }

            }



        }

        if (statusPage == "signup") {
            try {
                setErrorMessage("")
                const response = await axios.post("api/signup", formatData, { withCredentials: true });
                const dataResponse = await response.data;
                // console.log(dataResponse, "++++++++++++");
                if (dataResponse.message === "secsuse") {
                    await dispatch(fetchUserStatus());
                    await dispatch(fetchScoreStatus());
                    toast.success("ثبت نام با موفقیت انجام شد")
                    return router.push("/")
                }
            } catch (error) {
                if (axios.isAxiosError(error) && error.response?.data) {
                    setErrorMessage(error.response.data.message)

                }
            }
        }


        reset()
    };


    return (

        <>

            {
                statusPage == "login" ? <form className='mx-auto' onSubmit={handleSubmit(onSubmit)}>
                    <div className={`flex flex-col ${errors.username?.message ? "mb-4" : "mb-7"}`}>
                        <label htmlFor="username " className='text-white f-f-vazir-medium mb-2 '>نام کاربری</label>
                        <input type="text" id='username' className='bg-white rounded-sm w-55 h-9 text-left px-2 font-medium' autoComplete='username'   {...register("username", {
                            validate: (value) => {
                                const object = value.trim();
                                if (object == "") {
                                    return "نام کاربری را وارد نمایید"
                                }
                                return true
                            }
                        })} />
                        <p className='text-red-500 f-f-vazir-light mt-2'>
                            {errors.username?.message && <span>{errors.username.message}</span>}
                        </p>
                    </div>

                    <div className='flex flex-col'>
                        <label htmlFor="password " className='text-white f-f-vazir-medium mb-2'>رمزعبور</label>
                        <input type="password" id='password' className='bg-white rounded-sm w-55 h-9 text-left px-2 font-medium' autoComplete='current-password' {...register("password", {
                            validate: (value) => {
                                const object = value.trim();
                                if (object == "") {
                                    return "رمز عبور را وارد نمایید"
                                }
                                return true
                            }
                        })} />
                        <p className='text-red-500 f-f-vazir-light mt-2'>
                            {errors.password?.message && <span>{errors.password.message}</span>}
                        </p>
                        <p className='text-red-500 f-f-vazir-light mt-2'>
                            {errorMessage && <span>{errorMessage}</span>}
                        </p>
                    </div>

                    <div className='flex justify-between mt-10'>
                        <button type='submit' className='f-f-vazir-light text-[19px] text-black bg-white w-20 h-10 rounded-sm cursor-pointer ' >ورود</button>
                        <button type='button' className='f-f-vazir-light text-[19px] border-1 border-white text-white bg-inherit w-20 h-10 rounded-sm cursor-pointer hover:bg-white hover:text-black hover:border-white duration-300' onClick={(e) => {
                            e.preventDefault();
                            setStatusPage('signup');
                            setErrorMessage("")
                            reset();
                        }}>ثبت نام</button>
                    </div>

                </form> : <form className='mx-auto' onSubmit={handleSubmit(onSubmit)}>
                    <div className={`flex flex-col ${errors.username?.message ? "mb-2" : "mb-5"}`}>
                        <label htmlFor="username " className='text-white f-f-vazir-medium mb-2'>نام کاربری</label>
                        <input type="text" id='username' className='bg-white rounded-sm w-55 h-9 text-left px-2 font-medium' autoComplete='username' {...register("username", {
                            validate: (value) => {
                                const object = value.trim();
                                if (object == "") {
                                    return "نام کاربری را وارد نمایید"
                                }
                                if (object.length < 5) {
                                    return "نام کاربری باید حداقل 5 کاراکتر باشد"
                                }
                                const persianPattern = /[\u0600-\u06FF]/;
                                if (persianPattern.test(object)) {
                                    return "نام نباید شامل حروف فارسی باشد"
                                }
                                return true
                            }
                        })} />
                        <p className='text-red-500 f-f-vazir-light mt-2'>
                            {errors.username?.message && <span>{errors.username.message}</span>}
                        </p>
                    </div>
                    <div className={`flex flex-col ${errors.password?.message ? "mb-2" : "mb-5"}`}>
                        <label htmlFor="password " className='text-white f-f-vazir-medium mb-2'>رمزعبور</label>
                        <input type="password" id='password' className='bg-white rounded-sm w-55 h-9 text-left px-2 font-medium' autoComplete='current-password' {...register("password", {
                            validate: (value) => {
                                const object = value.trim();

                                if (object == "") {
                                    return "رمز عبور را وارد نمایید"
                                }
                                if (object.length < 8) {
                                    return "رمز عبور باید حداقل 8 کاراکتر باشد";
                                }
                                return true
                            }
                        })} />
                        <p className='text-red-500 f-f-vazir-light mt-2'>
                            {errors.password?.message && <span>{errors.password.message}</span>}
                        </p>
                    </div>
                    <div className={`flex flex-col ${errors.repeatpassword?.message ? "mb-2" : "mb-5"}`}>
                        <label htmlFor="repeatpassword " className='text-white f-f-vazir-medium mb-2 '>تکرار رمز عبور</label>
                        <input type="password" id='repeatpassword' className='bg-white rounded-sm w-55 h-9 text-left px-2 font-medium' autoComplete='new-password' {...register("repeatpassword", {
                            validate: (value) => {
                                if (value.trim() == "") return "تکرار رمز عبور را وارد نمایید"
                                if (value.trim() !== password) return "رمز عبور یکسان نمیباشد"
                                return true
                            }
                        })
                        } />
                        <p className='text-red-500 f-f-vazir-light mt-2'>
                            {errors.repeatpassword?.message && <span>{errors.repeatpassword.message}</span>}
                        </p>

                        <p className='text-red-500 f-f-vazir-light mt-2'>
                            {errorMessage && <span>{errorMessage}</span>}
                        </p>

                    </div>
                    <div className='flex justify-between mt-10'>
                        <button type='submit' className='f-f-vazir-light text-[19px] text-black bg-white w-20 h-10 rounded-sm cursor-pointer '>ثبت نام</button>
                        <button type='button' className='f-f-vazir-light text-[19px] border-1 border-white text-white bg-inherit w-20 h-10 rounded-sm cursor-pointer hover:bg-white hover:text-black hover:border-white duration-300' onClick={(e) => {
                            e.preventDefault();
                            setStatusPage('login');
                            setErrorMessage("")
                            reset();
                        }}>ورود</button>


                    </div>

                </form>
            }


        </>

    )
}

export default LoginSection