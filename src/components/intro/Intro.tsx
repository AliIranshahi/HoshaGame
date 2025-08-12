"use client"
import React, { useState } from 'react'
import Container from '../container/Container'
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import { ReactTyped } from 'react-typed';
import ButtonIntro from '../button_intro/ButtonIntro';
function Faq() {

    const [active, setActive] = useState<"about" | "rank" | "rule">("about")
    const [mouseAnimation, setMouseAnimation] = useState<boolean>(false);
    console.log(mouseAnimation);
    const handleScrol = () => {
        window.scrollBy({
            top: 200,
            behavior: 'smooth'
        })
    }


    return (
        <>
            <Container>
                {/* <div className="grid grid-cols-12 pt-10">
                    <div className="col-span-2 items-center flex flex-col justify-center text-center gap-2 f-f-vazir-regular ">
                        <div className={`border-1 border-blue-500   px-2 py-2 rounded-md cursor-pointer ${active == "about" ? "bg-blue-500 text-white" : "bg-white text-black"}`} onClick={() => setActive('about')}>
                            درباره گیم
                        </div>
                        <div className={`border-1 border-blue-500  text-black px-2 py-2 rounded-md cursor-pointer ${active == "rank" ? "bg-blue-500 text-white" : "bg-white text-black"}`} onClick={() => setActive('rank')}>
                            رنک و امتیاز ها
                        </div>
                        <div className={`border-1 border-blue-500  text-black px-2 py-2 rounded-md cursor-pointer ${active == "rule" ? "bg-blue-500 text-white" : "bg-white text-black"}`} onClick={() => setActive("rule")}>
                            قوانین
                        </div>
                    </div>
                    {
                        active == "about" && <div className="shadow p-4  bg-white rounded-sm col-span-10 h-100">
                            <h1 className="text-2xl f-f-vazir-bold text-[#4f47e6]">
                                هوشا چیه دقیقا ؟
                            </h1>
                            <p className="f-f-vazir-regular mt-10 mb-2 bg-gray-50">
                                هوشا یه دنیای کوچیک برای آدمای کنجکاوه!
                                اگه از فکر کردن، حدس زدن، کل‌کل کردن، یا حتی فقط دونستن چیزای عجیب‌غریب لذت می‌بری، اینجا دقیقاً جای توئه.

                                تو هوشا گیم هر روز با کلی کوییز چهارگزینه‌ای سر و کار داری. سوالا از زمین و زمانه!
                                از اطلاعات عمومی و تاریخ گرفته تا سینما، موسیقی، ادبیات، ورزش، تکنولوژی، شخصیت‌های معروف، برندها، فرهنگ پاپ، و حتی سوالای فان و باحال که شاید هیچ‌وقت فکر نمی‌کردی یه روز توی بازی ببینیشون!
                            </p>
                            <ul className='grid grid-cols-12 mt-10 f-f-vazir-medium list-disc p-4'>
                                <li className='col-span-6'>
                                    هر روز دسته‌بندی‌های جدید داریم تا هیچ‌وقت تکراری نشه.
                                </li>
                                <li className='col-span-6'>
                                    می‌تونی با بقیه رقابت کنی و ببینی چقدر سریع‌تر و دقیق‌تر جواب می‌دی.
                                </li>
                                <li className='col-span-6'>
                                    با هر سوالی که درست جواب بدی، امتیاز می‌گیری و وارد سیستم رنکینگ می‌شی.
                                </li>
                                <li className='col-span-6'>
                                    کوییز کلاسیک
                                </li>

                            </ul>
                        </div>
                    }
                    {
                        active == "rank" && <div className="shadow p-4  bg-white rounded-sm col-span-10 h-100">
                            <h1 className="text-2xl f-f-vazir-bold text-[#4f47e6]">
                                سیستم رنکینگ هوشا ؟
                            </h1>
                            <p className="f-f-vazir-regular mt-10 mb-2 bg-gray-50">
                                ما در هوشا گیم یه سیستم رتبه‌بندی منظم و انگیزشی طراحی کردیم تا بازیکن‌ها بتونن پیشرفت خودشونو دنبال کنن و با بقیه رقابت کنن.
                            </p>
                        </div>
                    }
                    {
                        active == "rule" && <div className="shadow p-4  bg-white rounded-sm col-span-10 h-100">
                            <h1 className="text-2xl f-f-vazir-bold text-[#4f47e6]">
                                هوشا چیه دقیقا ؟
                            </h1>
                            <p className="f-f-vazir-regular mt-10 mb-2 bg-gray-50">
                                هوشا یه دنیای کوچیک برای کساییه که از فکر کردن، حدس زدن و دونستن لذت می‌برن!
                                اینجا هر روز با کلی کوییز چهارگزینه‌ای سر و کار داری  از اطلاعات عمومی و تاریخ گرفته تا فیلم، موسیقی، فوتبال و حتی سوال‌های فان و عجیب‌غریب!

                                تو هوشا فقط بازی نمی‌کنی؛ خودتو به چالش می‌کشی، با بقیه رقابت می‌کنی، امتیاز می‌گیری و شاید حتی چیزای جدیدی یاد می‌گیری که هیچ‌وقت بهشون فکر نکرده بودی.


                            </p>
                        </div>
                    }
                </div> */}

                <div className='w-full h-[100vh] flex flex-col justify-center items-center text-center '>
                    <h1 className={` mx-auto  flex flex-col  f-spe text-[clamp(1.8rem,6vw,4rem)] sm:text-6xl md:text-7xl mb-20 text-transparent bg-gradient-to-r bg-clip-text  from-purple-400 to-cyan-400  ${!mouseAnimation ? "glitch-effect" : ""}`} onMouseEnter={() => setMouseAnimation(true)} onMouseLeave={() => setMouseAnimation(false)}>
                        <span >
                            HOSHA QUIZ
                        </span>
                        <span className='tracking-widest'>
                            CHALLENGE
                        </span>
                    </h1>

                    <div className='grid grid-cols-12 w-[90%] sm:w-[65%] md:w-[60%] mx-auto gap-5 '>
                        <div className='object-center col-span-6 md:col-span-3 border-1 border-cyan-300 bunnyUpDow1' >
                            <img src="assest/game.jpg" alt="saf" />
                        </div>
                        <div className='object-center col-span-6 md:col-span-3 border-1 border-purple-500 bunnyUpDow2'>
                            <img src="assest/11.jpg" alt="saf" />
                        </div>
                        <div className='object-center col-span-6 md:col-span-3 border-1 border-cyan-300 bunnyUpDow3'>
                            <img src="assest/22.jpg" alt="saf" />
                        </div>
                        <div className='object-center col-span-6 md:col-span-3 border-1 border-purple-500 bunnyUpDow4'>
                            <img src="assest/222.png" alt="saf" />
                        </div>
                    </div>
                    <div className='f-f-vazir-medium  mt-10 text-[#00cec9] tracking-wider'>

                        <ReactTyped strings={["دانش خود را در این چالش نهایی بازی محک بزنید! :)", "امتیاز کسب کنید !", "با دریافت امتیاز در لیدر بورد اول شوید !"]} loop backDelay={1500} backSpeed={30} typeSpeed={40} />

                    </div>

                    <>

                        <ButtonIntro />

                    </>

                    <p className='flex flex-col text-center text-gray-400 f-spe text-[clamp(15px,3vw,4rem)] sm:text-[16px] mt-10'>
                        <span onClick={handleScrol} className='cursor-pointer'>
                            Scroll down for more
                        </span>
                        <span className='mt-3 buny-jump' >
                            <KeyboardArrowDownIcon />
                        </span>
                    </p>

                </div>



            </Container>
        </>
    )
}

export default Faq