import React, { useState, useEffect } from 'react';
import './styles.css';
import { generate } from 'random-words';

const CountdownTimer = () => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [wordsToType, setWordsToType] = useState<string[]>([]);
  const [textareaValue, setTextAreaValue] = useState<string>("");
  const [testLength, setTestLength] = useState(1);

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

  const handleStart = (mins) => {
    setTestLength(mins);
    setSeconds(mins * 60);
    setIsActive(true);
    setWordsToType(generate(125 * mins) as string[]);
  };

  const handleReset = () => {
    setIsActive(false);
    setTextAreaValue("");
    setTestLength(1);
  }

  const handleTextChange = (event) => {
    setTextAreaValue(event.target.value);
  }

  const getAccuracy = () => {
    let inputList = textareaValue.split(" ");
    let correctWords = 0;
    for (let i = 0; i < inputList.length; i++) {
      let inputWord = inputList[i];
      let toTypeWord = wordsToType[i];
      if (inputWord === toTypeWord) {
        correctWords += 1;
      }
    }
    return Math.round(correctWords * 100 / inputList.length);
  }

  return (
    <div>
        {isActive && <h1>{formatTime(seconds)}</h1>}
        {!isActive && <button onClick={() => handleStart(1)}>Start 1 Minute Test</button>}
        {!isActive && <button onClick={() => handleStart(2)}>Start 2 Minute Test</button>}
        {seconds <= 0 && 
            <>
            <p>Time's up!</p>
            <p>WPM: {textareaValue.split(" ").length / testLength}</p>
            <p>Accuracy: {getAccuracy()}%</p>
            <button onClick={handleReset}>Reset</button>
            </>}
        {(isActive && seconds > 0) && <p className='toType'>{wordsToType.join(" ")}</p>}
        {(isActive && seconds > 0) && <textarea value={textareaValue} onChange={handleTextChange} autoFocus={true} rows={15} cols={90} />}
    </div>
  );
};

export default CountdownTimer;