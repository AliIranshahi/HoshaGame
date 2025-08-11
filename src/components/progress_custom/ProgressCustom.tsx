"use client"
import LinearProgress from '@mui/material/LinearProgress'
import React, { useEffect, useRef, useState } from 'react'

function ProgressCustom({ setShowOption, showOption }: { showOption: boolean, setShowOption: React.Dispatch<React.SetStateAction<boolean>> }) {
    const [progress, setProgress] = useState<number>(100);
    const timeRef = useRef<NodeJS.Timeout | null>(null)

    const stopTimer = () => {
        if (timeRef.current) {
            clearTimeout(timeRef.current);
            timeRef.current = null;
        }
    };



    useEffect(() => {

        if (!showOption && progress > 0) {

            timeRef.current = setTimeout(() => setProgress((prev) => prev - 1), 120)

        } else if (showOption) {
            stopTimer();
        } else if (progress == 0) {
            setShowOption(true)
        }


        // if (progress == 0) {
        //     alert("تمام")
        // }

    }, [progress, showOption])
    return (
        <>
            <LinearProgress variant="determinate" value={progress} className='rounded-full mt-8 h-20' sx={{
                height: 10,
                backgroundColor: '#1f2937',
                '& .MuiLinearProgress-bar': {
                    background: 'linear-gradient(to right, #ac4cf1, #00caff)',
                    borderRadius: '5px',
                }
            }} />
        </>
    )
}

export default ProgressCustom