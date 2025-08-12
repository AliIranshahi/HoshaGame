import { createClient } from '@/utils/supabase/server'
import React from 'react'
import PersonIcon from '@mui/icons-material/Person';
export default async function LeaderBord() {

  interface IUserLeaderBord {
    id: number,
    username: string,
    score: number
  }

  const supabase = await createClient();
  const { data: userLeader, error } = await supabase.from("UserAccount").select("id , username , score").order("score", { ascending: false }).limit(6);





  return (
    <div className='w-[100%] h-[100%] flex items-center justify-center'>
      <ul className='w-400 h-200  border-5 rounded-[10px] border-gray-600 mt-5 p-5 bg-gray-950  grid grid-cols-12'>
        {
          userLeader && userLeader.map((items: IUserLeaderBord, index) => (
            <li className='shadow w-[100%] h-20 bg-gray-900 mt-10 px-5 flex justify-between col-span-12 ' key={items.id}>
              <div className='flex items-center gap-1 sm:gap-40'>
                <p className='text-white font-orb sm:text-[17px] md:text-[23px]'>
                  {
                    items.score
                  }
                </p>
                <div className={`${index + 1 == 1 ? "bg-amber-300" : ""} ${index+1 ==2 ? "bg-orange-900" : ""} ${index + 1 ==3 ? "bg-gray-600" : ""}  rounded-full px-4 hidden md:block`}>
                  {
                    index + 1 == 2 && <img src="/assest/Badge (1).png" alt="" className='w-10' />
                  }
                  {
                    index + 1 == 1 && <img src="/assest/Badge (2).png" alt="" className='w-10' />
                  }
                  {
                    index + 1 == 3 && <img src="/assest/Badge.png" alt=""  className='w-10'/>
                  }
                </div>
              </div>
              <div className='flex items-center gap-4 sm:gap-40 font-orb  text-white'>
                <div className='sm:text-[17px] md:text-[23px]'>
                  {
                    items.username.substring(0, 9)
                  }
                </div>
                <div className='sm:text-[17px] md:text-[23px]'>
                  #{index + 1}
                </div>
              </div>
            </li>
          ))
        }

      </ul>
    </div>
  )
}
