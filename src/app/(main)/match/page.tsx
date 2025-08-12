"use client"
import React, { useState } from 'react'
import StarIcon from '@mui/icons-material/Star';
import WatchLaterIcon from '@mui/icons-material/WatchLater';
import ProgressCustom from '@/components/progress_custom/ProgressCustom';
import TipsAndUpdatesIcon from '@mui/icons-material/TipsAndUpdates';
import { game, geography, history, knowledge, science, sport } from '@/constans/Quiz';
import { categories } from '@/constans/Sort';
import UndoIcon from '@mui/icons-material/Undo';
import { useDispatch, useSelector } from 'react-redux';
import { RootState } from '@/redux/store';
import { authSlice, fetchScoreStatus } from '@/redux/authSlice';
import axios from 'axios';
import { useAppDispatch } from '@/redux/useReduxApp';
import { useRouter } from 'next/navigation';
import Container from '@/components/container/Container';

interface IData {
  id: number,
  question: string,
  level: string,
  score: number,
  options: {
    id: string,
    text: string,
    correct: boolean,
  }[]
}

function Match() {
  const alu = useSelector((state: RootState) => state.AuthSlice.questionStatus);
  const action = useDispatch();
  const dispatch = useAppDispatch();
  console.log(alu?.game, "++++++++++++++");




  const [matchStarted, setMatchStarted] = useState(false);
  const [matchCategory, setMatchCategory] = useState("");



  const [matchQuiz, setMatchQuiz] = useState<IData[]>([]);


  const [currentQuiz, setCurrentQuiz] = useState<IData | null>(null);
  const [matchQUizNumber, setMatchQuizNumber] = useState<number>(0);


  const [showOption, setShowOption] = useState<boolean>(false);
  const [indexNumber, setIndexNumber] = useState<number | null>(null)
  const router = useRouter();






  const handleChoise = (type: string) => {

    let selectedQuiz: IData[] = [];
    let startIndex = 0;
    if (type === "game") {
      setMatchCategory("game")
      selectedQuiz = game;
      startIndex = Number(alu?.game);



    }
    else if (type === "sport") {
      setMatchCategory("sport")
      selectedQuiz = sport;
      startIndex = Number(alu?.sport);


    }
    else if (type === "knowledge") {
      setMatchCategory("knowledge")
      selectedQuiz = knowledge;
      startIndex = Number(alu?.knowledge);


    }
    else if (type === "history") {
      setMatchCategory("history")
      selectedQuiz = history;
      startIndex = Number(alu?.history);


    }
    else if (type === "geography") {
      setMatchCategory("geography")
      selectedQuiz = geography;
      startIndex = Number(alu?.geography);


    }
    else if (type === "science") {
      setMatchCategory("science")
      selectedQuiz = science;
      startIndex = Number(alu?.science);


    }

    console.log(startIndex);


    setMatchStarted(true)

    setMatchQuiz(selectedQuiz)

    setCurrentQuiz(selectedQuiz[startIndex]);

    setMatchQuizNumber(startIndex)


    console.log(currentQuiz);





  }
  const nextQuestion = async () => {
    setMatchQuizNumber(prevIndex => {
      const nextIndex = prevIndex + 1;

      if (nextIndex < matchQuiz.length) {
        setCurrentQuiz(matchQuiz[nextIndex]);
        axios.post("api/reupdate", { category: matchCategory, freshnumber: nextIndex })
          .then(res => console.log(res.data));

        return nextIndex;
      } else {
        alert("WWWWWWWWWWWWWWWWWWWWWWWWWWWWWWWW");
        return prevIndex;
      }
    });
    dispatch(fetchScoreStatus());
    setShowOption(false);
  };

  const handleCheck = async ({ index, score, postion }: { index: number, postion: boolean, score: number }) => {
    setShowOption(true);
    setIndexNumber(index);

    if (postion && score) {
      const requsetScore = await axios.post("api/newscore", { score: score, postion: postion })
      const responseScore = await requsetScore.data;
      console.log(responseScore);
      dispatch(fetchScoreStatus());
    }

  }

  const handleExitMatch = () => {
    setMatchStarted(false)
    setCurrentQuiz(null)
    router.push('/match')
    dispatch(fetchScoreStatus());
  }
  return (

    <>

      {
        matchStarted && currentQuiz ?
          <>
            {
              currentQuiz && currentQuiz.id < 13 ? <div className=' w-[95%] sm:w-[95%] md:w-[90%] lg:w-[950px] h-[600px] bg-[#0c0c14] mx-auto mt-15 border-1 border-[#6c5ce7] rounded-lg  shadow-[1px_0px_7px_1px_#6c5ce7] p-6' key={currentQuiz.id}>
                <div className='flex justify-between'>
                  <div className='flex gap-2'>
                    <div className='flex flex-col items-center sm:items-start'>
                      <h3 className='f-spe text-gray-300  font-bold text-[13px] sm:text-[16px]'>
                        Score
                      </h3>
                      <p className='font-bold text-white font-mono'>
                        {currentQuiz.score}
                      </p>
                    </div>
                    <div className=' w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-r from-amber-500 to-pink-500 rounded-full font-game justify-center text-white mx-auto flex items-center'>
                      0
                    </div>
                  </div>
                  <div className='flex gap-2 '>
                    <div className='flex flex-col items-center sm:items-start'>
                      <h3 className='f-spe text-gray-300  font-bold text-[13px] sm:text-[16px]'>
                        QUESTION
                      </h3>
                      <p className='font-bold text-white font-mono'>
                        {
                          matchQuiz.length
                        }
                      </p>
                    </div>
                    <div className='w-9 h-9 sm:w-12 sm:h-12 bg-gradient-to-r from-purple-600 to-cyan-600 rounded-full font-game justify-center text-white mx-auto flex items-center'>
                      {
                        currentQuiz.id
                      }
                    </div>
                  </div>
                </div>
                <div>
                  <ProgressCustom setShowOption={setShowOption} showOption={showOption} />
                </div>

                <div className='border-1 border-[#00cec9] mt-10 h-34 rounded-lg p-4 bg-gradient-to-r from-[#1e1e2e] to-[#2d2d42] relative overflow-hidden'>

                  <p className='text-white font-bold sm:text-[20px] f-f-vazir-regular md:text-[22px] lg:text-[25px]'>
                    {currentQuiz.question}
                  </p>

                  <div className='flex gap-7 text-cyan-400 justify-end mt-5 absolute bottom-6 left-5'>
                    <div className='flex items-center'>
                      <span className='text-[19px] font-medium'>
                        12s
                      </span>
                      <span>
                        <WatchLaterIcon />
                      </span>
                    </div>
                    <div className='flex items-center'>
                      <span className='text-[19px] font-medium'>
                        {currentQuiz.level}
                      </span>
                      <span>
                        <StarIcon />
                      </span>
                    </div>
                  </div>




                  <div className="absolute -right-10 -top-10 w-32 h-32 bg-purple-600 rounded-full opacity-20"></div>
                  <div className="absolute -left-10 -bottom-10 w-32 h-32 bg-cyan-600 rounded-full opacity-20"></div>
                </div>

                {/*  Quees  */}
                <div className='grid grid-cols-12 mx-auto text-center gap-5 mt-10 f-f-vazir-regular'>
                  {
                    currentQuiz.options.map((option, index) => {
                      let bgColor = "bg-[#1e1e2eb3]";
                      if (showOption) {
                        if (option.correct) {
                          bgColor = "bg-green-500";

                        } else if (index === indexNumber && !option.correct) {
                          bgColor = "bg-red-500";
                        }

                      }





                      return ((
                        <div className={`col-span-6 border-1 border-[#3d3d5c] ${bgColor}`} key={index}>
                          <div className={`  text-white  h-14 rounded-lg mx-auto flex items-center justify-center cursor-pointer f-f-vazir-regular font-normal text-[clamp(12px,4vw,1rem)]  sm:text-[20px]`} onClick={() => !showOption && handleCheck({ index: index, score: currentQuiz.score, postion: option.correct })}>
                            {option.text}
                          </div>
                        </div>
                      ))
                    })
                  }
                </div>
                {/*  Quees  */}

                {/* Button */}

                <div className='flex  justify-between items-center mt-10 text-white  text-[clamp(12px,3vw,1rem)] gap-3 sm:gap-0 sm:text-[20px] font-orb font-bold'>
                  <button className={` w-[50%] h-12 sm:w-64 sm:h-12 bg-gradient-to-t ${!showOption ? "from-purple-900 to-cyan-900" : "from-purple-600 to-cyan-600  hover:from-purple-700 hover:to-cyan-700 "}  rounded-lg  cursor-pointer transition duration-300`} onClick={nextQuestion} disabled={!showOption}>
                    NEXT QUESTION
                  </button>
                  <button className='flex gap-1 sm:gap-2 items-center justify-center bg-amber-500 w-[50%] h-12 sm:w-64 sm:h-12 rounded-lg cursor-pointer hover:bg-amber-700  transition duration-300' dir='ltr'>
                    <span>
                      <TipsAndUpdatesIcon />
                    </span>
                    <p>

                      HINT (<span>3</span> LEFT)
                    </p>

                  </button>
                </div>

                {/* Button */}


              </div> : <div className=' w-[95%] sm:w-[90%] md:w-[70%] lg:w-[52%] h-[600px] bg-[#0c0c14] mx-auto mt-15 border-1 border-[#6c5ce7] rounded-lg  shadow-[1px_0px_7px_1px_#6c5ce7] p-4 sm:p-6'>
                <h4 className='text-[25px] font-bold text-white f-f-vazir-bold text-center'>
                  پایان فصل <span className='bg-gradient-to-r bg-clip-text from-purple-500 to-cyan-400 text-transparent'>{currentQuiz.level}</span>
                </h4>
                <div className='text-right p-2 sm:p-7 mt-1 text-white'>
                  <p className='f-f-vazir-regular text-[16px]' style={{ lineHeight: "40px" }}>
                    شما این فصل از چالش را با موفقیت به اتمام رساندید و هم اکنون امتیاز را دریافت کردید . شما میتوانید به چالش های دیگر بپیوندید و امتیاز های دیگر دریافت کنید . توجه کنید درصورت شروع مجدد این چالش باید در بخش تنظیمات امتیاز های خود را ریست کنید . شما هم اکنون میتوانید به قسمت لیدربورد بروید و امتیاز خود را چک نمایید <br />
                  </p>
                </div>
                <div className='flex justify-center gap-10 text-white mt-20'>
                  <button className='flex gap-2 f-f-vazir-medium items-center justify-center bg-amber-500 w-35 h-12 rounded-lg cursor-pointer hover:bg-amber-700 relative  transition duration-300 soonaspossible hover:after:duration-150 hover:before::duration-150' dir='ltr'>
                    <span>
                      <TipsAndUpdatesIcon />
                    </span>
                    <p>

                      تحلیل مچ
                    </p>

                  </button>
                  <button className='flex gap-2 f-f-vazir-medium items-center justify-center bg-cyan-600 w-35 h-12 rounded-lg cursor-pointer hover:bg-cyan-700  transition duration-300' dir='ltr' onClick={handleExitMatch}>
                    <span>
                      <UndoIcon />
                    </span>
                    <p>
                      بازگشت
                    </p>

                  </button>
                </div>
              </div>
            }
          </>
          :

          <Container>

            <div className='text-white out-match  text-center  grid grid-cols-12 mt-10'>
              {categories.map(cat => (
                <div key={cat.key} className='match-card  h-50 group  overflow-hidden col-span-12 sm:col-span-6 lg:col-span-4 mx-auto rounded-lg cursor-pointer flex flex-col items-center justify-center' onClick={() => handleChoise(cat.key)}>
                  <div className='h-full w-full relative rounded-tl-lg rounded-tr-lg' style={{ background: `linear-gradient(to bottom, rgba(0,0,0,0) 1%, rgba(0,0,0,0.8) 100%), url(${cat.image})`, backgroundPosition: "center", backgroundRepeat: "no-repeat", backgroundSize: "cover" }} >
                    <div className='flex flex-col absolute bottom-4 left-4 '>
                      <span className='f-f-vazir-bold text-[25px] text-white'>
                        {cat.label}
                      </span>
                      <span className='f-f-vazir-bold text-[16px] text-gray-300 transform translate-x-[-200px] group-hover:translate-x-[0] duration-300' >
                        12 سوال
                      </span>
                    </div>
                  </div>


                </div>
              ))}
            </div>
          </Container>

      }


    </>



  )
}

export default Match