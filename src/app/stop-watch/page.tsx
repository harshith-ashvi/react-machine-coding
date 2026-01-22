"use client";

import { cn } from "@/lib/utils";
import { useEffect, useRef, useState } from "react";

const getFormattedTime = (time: number) => {
  const timeInSeconds = time / 1000;
  const hours = `${Math.floor(timeInSeconds / 3600)}`;
  const minutes = `${Math.floor(timeInSeconds / 60)}`;
  const seconds = `${Math.floor(timeInSeconds % 60)}`;
  return `${hours.length === 1 ? `0${hours}` : hours}:${minutes.length === 1 ? `0${minutes}` : minutes}:${seconds.length === 1 ? `0${seconds}` : seconds}`;
};

const StopWatch = () => {
  const [isTimerStarted, setIsTimerStarted] = useState(false);
  const [isTimerPaused, setIsTimerPaused] = useState(false);
  const [initialTime, setInitialTime] = useState(0);
  const [timer, setTimer] = useState(0);
  const timeRef = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (isTimerStarted && !isTimerPaused) {
      timeRef.current = setInterval(() => {
        setTimer(Date.now() - initialTime);
      }, 1000);
    }

    return () => {
      if (timeRef.current) {
        clearInterval(timeRef.current);
      }
    };
  }, [isTimerStarted, isTimerPaused, initialTime]);

  const handleStartTimer = () => {
    setIsTimerStarted(true);
    setInitialTime(Date.now());
  };

  const handlePauseTimer = () => {
    setIsTimerPaused(true);
  };

  const handleResumeTimer = () => {
    setIsTimerPaused(false);
    setInitialTime((prev) => prev + timer);
  };

  const handleTimer = () => {
    if (!isTimerStarted && !isTimerPaused) {
      handleStartTimer();
    } else if (isTimerStarted && !isTimerPaused) {
      handlePauseTimer();
    } else if (isTimerStarted && isTimerPaused) {
      handleResumeTimer();
    }
  };

  const handleResetTimer = () => {
    setTimer(0);
    setIsTimerStarted(false);
    setInitialTime(0);
    setIsTimerPaused(false);
  };

  return (
    <div className="max-w-4xl mx-auto min-h-screen flex flex-col gap-2 items-center justify-center">
      <h1 className="font-bold text-4xl">Stop Watch</h1>
      <h4 className="font-bold text-2xl">{getFormattedTime(timer)}</h4>
      <div className="flex items-center gap-2">
        <button
          onClick={handleTimer}
          className={cn(
            "cursor-pointer bg-green-400 px-2 py-1 text-black rounded font-medium text-xl",
            isTimerStarted && !isTimerPaused ? "bg-yellow-400" : "",
          )}
        >
          {!isTimerStarted && !isTimerPaused
            ? "Start"
            : isTimerStarted && !isTimerPaused
              ? "Pause"
              : "Resume"}
        </button>
        <button
          className="cursor-pointer bg-gray-400 px-2 py-1 text-black rounded font-medium text-xl"
          onClick={handleResetTimer}
        >
          Reset
        </button>
      </div>
    </div>
  );
};

export default StopWatch;
