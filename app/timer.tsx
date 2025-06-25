import React, { useState, useEffect } from 'react';
import './styles.css';
import { generate } from 'random-words';

const CountdownTimer = ({ initialSeconds }) => {
  const [seconds, setSeconds] = useState(initialSeconds);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [wordsToType, setWordsToType] = useState<string[]>([]);
  const[textareaValue, setTextAreaValue] = useState<string>("");

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
    setTextAreaValue("");
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
    return correctWords * 100 / inputList.length;
  }

  return (
    <div>
        {isActive && <h1>{formatTime(seconds)}</h1>}
        {!isActive && <button onClick={handleStart}>Start 1 Minute Test</button>}
        {seconds <= 0 && 
            <>
            <p>Time's up!</p>
            <p>WPM: {textareaValue.split(" ").length * 60 / initialSeconds}</p>
            <p>Accuracy: {getAccuracy()}%</p>
            <button onClick={handleReset}>Reset</button>
            </>}
        {(isActive && seconds > 0) && <p className='toType'>{wordsToType.join(" ")}</p>}
        {(isActive && seconds > 0) && <textarea value={textareaValue} onChange={handleTextChange} autoFocus={true} rows={15} cols={90} />}
    </div>
  );
};

export default CountdownTimer;