import React, { useState, useEffect } from 'react';
import './styles.css';

const CountdownTimer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState(false);

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
  };

  const handleReset = () => {
    setSeconds(initialSeconds);
    setIsActive(false);
  }

  return (
    <div>
      {isActive && <h1>{formatTime(seconds)}</h1>}
      {!isActive && <button className='--bs-primary-border-subtle' onClick={handleStart}>Start</button>}
      {seconds <= 0 && 
        <>
          <p>Time's up!</p>
          {/* Eventually - add stats here */}
          <button onClick={handleReset}>Reset</button>
        </>}
    </div>
  );
};

export default CountdownTimer;