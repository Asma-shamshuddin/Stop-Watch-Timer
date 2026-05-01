import React, { useRef, useState } from 'react'
import { FaPlay, FaStop, FaRedo, FaFlag } from "react-icons/fa";
import { FaMoon, FaSun } from "react-icons/fa";

const StopWatchtimer = () => {

  const [time , setTime] = useState(0);
  const [now , setNow] = useState(0);
  const [laps , setLaps] =useState([]);
  const [darkMode, setDarkMode] = useState(false);

  const intervalRef = useRef(null);

  const handleStart = () =>{
    clearInterval(intervalRef.current);

    setTime(Date.now());
    setNow(Date.now());

     intervalRef.current = setInterval( () =>{
      setTime(Date.now());
    }, 10); 
  };

  const handleStop = () =>{
    clearInterval(intervalRef.current)
  };

  const handleReset = () =>{
    clearInterval(intervalRef.current);
    setTime(0);
    setNow(0);
    setLaps([]);
  };

  const handleLap = () =>{
    const newLap = formatTime();

    setLaps((prevLaps) => {
      const updatedLaps = [...prevLaps, newLap];

      updatedLaps.sort((a,b) => {
        const convertTOMs = (time) =>{
          const [minutes, seconds, milliseconds] = time.split(":").map(Number);

          return(
            minutes * 60 * 1000 +
            seconds * 1000 +
            milliseconds * 10
          );
        };
        return convertTOMs(a) - convertTOMs(b);
      });
      return updatedLaps;
    });
  };

  // let timePassed = (time - now) / 1000;
  const formatTime = () => {
     let difference = time-now;

    let hours = Math.floor((difference / (1000 * 60 * 60)));
    let minutes = Math.floor((difference /(1000 *60)% 60));
    let seconds = Math.floor((difference /(1000)% 60));
    let milliseconds = Math.floor(difference % 1000/10);

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");
    milliseconds = String(milliseconds).padStart(2, "0");


    return `${minutes}:${seconds}:${milliseconds}`;

  }
    

  return (
    <div className={` min-h-screen w-full  flex justify-center items-center flex-col 
      ${darkMode ? "bg-[#F7D7D9] ": "bg-[#C94F67]"}`}
    >
      <div>
        <button
        onClick={() => setDarkMode(!darkMode)}
        className=' text-white rounded-2xl p-2  flex items-center bg-white/40 border-3  mt-1'>
          {darkMode ? <FaSun size={20} className='text-yellow-400' /> : <FaMoon size={20} className='text-yellow-400' />}
          {darkMode ?  " Light Mode  " : " Dark Mode"}
        </button>

      </div>
      <div className={`flex items-center justify-center flex-col mt-5    border border-white/50 rounded-3xl w-[80%] sm:w-[90%] max-w-md h-[500px] sm:h-[600px]   shadow-[0_10px_30px_rgba(0,0,0,0.15)] p-6 sm:p-8
        ${darkMode ? "bg-[#F4C9CC] text-[#2B1E1E]" : "bg-[#B63E57] text-white"}`} >

      <div className='flex items-center justify-center flex-col   '>
        <h1 className='text-2xl sm:text-3xl font-bold text-center '>StopWatchtimer</h1>
        <div className=' h-32 w-32 sm:h-45 sm:w-45 rounded-full bg-white/40  flex justify-center items-center border border-white/40 mt-3 '>
        <h2 className='text-2xl sm:text-4xl font-semibold '>{formatTime()} </h2>
        </div>      
      </div>

      <div className='flex flex-wrap gap-3 mt-3 justify-center '>
      <button
      onClick={handleStart}
       className='bg-emerald-500 px-4 py-2 m-2 rounded-2xl text-sm sm:text-base flex items-center gap-2'>
        <FaPlay />
          Start
       </button>
      <button 
      onClick={handleStop}
      className= 'bg-rose-500  px-4 py-2 m-2 rounded-2xl text-sm sm:text-base flex items-center gap-2'>
        <FaStop />
        Stop
      </button>
      <button 
      onClick={handleReset}
       className= 'bg-amber-500 px-4 py-2 m-2 rounded-2xl text-sm sm:text-base flex items-center gap-2'>
        <FaRedo />
        Reset
      </button>

       <button 
      onClick={handleLap}
       className= 'bg-violet-500  px-4 py-2  m-2 rounded-2xl text-sm sm:text-base flex items-center gap-2'>
         <FaFlag />
        Lap
      </button>
     </div>

      <div className='mt-5 w-full overflow-y-auto '>
             
        {laps.map((lap,index) => (
                   
          <div key={index}
          className=" bg-[#f4dfe0] w-full mt-2 px-4 py-2 m-2 flex items-center  justify-between rounded-2xl text-sm sm:text-base 
          ">
            <span className='font-medium'>Lap {index + 1}</span>
            <span className= {`font-semibold
               ${
               index === 0
               ? "text-green-500"
               : index === laps.length -1
               ? "text-red-500"
               : "text-black"
              }`}>{lap}
             </span>
             <span className={`font-medium
              ${
                index === 0 ? "text-green-500" : index === laps.length - 1 ? "text-red-500" : "text-transparent"}`}>
                  {index === 0 ? "Fastest" : index === laps.length-1 ? "slowest" : "hidden"}
             </span>
          </div>
        ))}
      </div>
      
      </div>
    </div>
    
  )
}

export default StopWatchtimer
