import React, { useState, useEffect } from 'react';
import './styles.css';
import { generate } from 'random-words';

const CountdownTimer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [wordsToType, setWordsToType] = useState<string[]>([]);

  useEffect(() => {
    if (!isActive || seconds <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId); // cleanup
  }, [isActive, seconds]);

  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setWordsToType(generate(150) as string[]);
  };

  const handleReset = () => {
    setSeconds(initialSeconds);
    setIsActive(false);
  }

  return (
    <div>
        {isActive && <h1>{formatTime(seconds)}</h1>}
        {!isActive && <button onClick={handleStart}>Start</button>}
        {seconds <= 0 && 
            <>
            <p>Time's up!</p>
            {/* Eventually - add stats here. Will import whatever that component is */}
            <button onClick={handleReset}>Reset</button>
            </>}
        {(isActive && seconds > 0) && <p className='toType'>{wordsToType.join(" ")}</p>}
    </div>
  );
};

export default CountdownTimer;