import { useEffect, useRef, useState } from "react";
import './Timer.css'

export default function Timer() {
  const [timerDays, setTimerDays] = useState("0");
  const [timerHours, setTimerHours] = useState("0");
  const [timerMinutes, setTimerMinutes] = useState("0");
  let interval = useRef();

  const updateTimer = () => {
    const countDownDate = new Date("March 31, 2024 23:59").getTime();
    const now = new Date().getTime();
    const dist = countDownDate - now;
    const days = Math.floor(dist / (1000 * 60 * 60 * 24));
    const hours = Math.floor((dist % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((dist % (1000 * 60 * 60)) / (1000 * 60));

    setTimerDays(days.toString().padStart(2, "0"));
    setTimerHours(hours.toString().padStart(2, "0"));
    setTimerMinutes(minutes.toString().padStart(2, "0"));
  };

  useEffect(() => {
    updateTimer(); // Update timer immediately when component mounts
    interval.current = setInterval(updateTimer, 60000); // Update timer every minute
    return () => {
      clearInterval(interval.current);
    };
  }, []); // Empty dependency array to run effect only once

  return (
    <div className="flex justify-center items-center box p-4 mt-4">
      <div className="text-center">
        <p className="text-xl font-bold text-white">Time left:</p>
        <div className="flex items-center justify-center mt-4">
          <div className="flex items-center">
            <p className="text-3xl md:text-4xl lg:text-4xl font-bold text-white">{timerDays}</p>
            <p className="text-xs md:text-sm lg:text-base text-white ml-1">Days</p>
          </div>
          <span className="text-3xl md:text-4xl lg:text-4xl font-bold text-white mx-1">:</span>
          <div className="flex items-center">
            <p className="text-3xl md:text-4xl lg:text-4xl font-bold text-white">{timerHours}</p>
            <p className="text-xs md:text-sm lg:text-base text-white ml-1">Hours</p>
          </div>
          <span className="text-2xl md:text-3xl lg:text-3xl font-bold text-white mx-1">:</span>
          <div className="flex items-center">
            <p className="text-3xl md:text-4xl lg:text-4xl font-bold text-white">{timerMinutes}</p>
            <p className="text-xs md:text-sm lg:text-base text-white ml-1">Minutes</p>
          </div>
        </div>
      </div>
    </div>
  );
}
