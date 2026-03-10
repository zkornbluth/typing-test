/** 
 * @fileoverview This file creates the TypingTest component that handles the typing speed test
 * @author Zachary Kornbluth <github.com/zkornbluth>
 */

import React, { useState, useEffect } from 'react';
import './styles.css';
import { generate } from 'random-words'; // JS package that generates random words

const TypingTest = () => {
  const [seconds, setSeconds] = useState(60);
  const [isActive, setIsActive] = useState<boolean>(false);
  const [wordsToType, setWordsToType] = useState<string[]>([]);
  const [textareaValue, setTextAreaValue] = useState<string>("");
  const [testLength, setTestLength] = useState(1);
  const [isDone, setIsDone] = useState<boolean>(false);

  useEffect(() => {
    if (seconds <= 0 && !isDone) {
      setIsDone(true);
    }
    if (!isActive || seconds <= 0) {
      return;
    }

    const timerId = setInterval(() => {
      setSeconds((prev) => prev - 1);
    }, 1000);

    return () => clearInterval(timerId); // cleanup
  }, [isActive, seconds]);

  // Show minutes:seconds
  const formatTime = (totalSeconds) => {
    const minutes = Math.floor(totalSeconds / 60);
    const remainingSeconds = totalSeconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const handleStart = (mins) => {
    setTestLength(mins);
    setSeconds(mins * 60);
    setIsActive(true);
    setWordsToType(generate(125 * mins) as string[]); // generate 125 words for each minute of test - way more than nearly every human can type
  };

  const handleReset = () => {
    setIsActive(false);
    setTextAreaValue("");
    setTestLength(1);
    setIsDone(false);
    setSeconds(60);
  }

  const handleTextChange = (event) => {
    setTextAreaValue(event.target.value);
  }

  const getAccuracy = () => {
    const target = wordsToType.join(" ");
    if (!textareaValue.length) return 0;

    let correctChars = 0;
    const totalChars = textareaValue.length;

    for (let i = 0; i < totalChars; i++) {
      if (i < target.length && textareaValue[i] === target[i]) {
        correctChars += 1;
      }
    }

    return Math.round((correctChars * 100) / totalChars);
  }
  
  const getWPM = () => {
    let numChars = textareaValue.length;

    let numWords = numChars / 5; // Standard for typing speed is 5 characters (including spaces) per word

    return numWords / testLength;
  }

  const targetText = wordsToType.join(" ");
  const showInput = isActive && seconds > 0;
  const showLockedResult = isDone && textareaValue.length > 0;

  const renderColoredText = () => {
    return textareaValue.split("").map((char, i) => {
      const correct = i < targetText.length && targetText[i] === char;
      const color = correct ? "#22c55e" : "#ef4444"; // green-500 / red-500
      return (
        <span key={i} style={{ color }}>
          {char === "\n" ? "\n" : char}
        </span>
      );
    });
  };

  return (
    <div>
      {/* Countdown Timer */}
      {isActive && <h1>{formatTime(seconds)}</h1>}

      {/* Start Buttons */}
      {!isActive && <button onClick={() => handleStart(1)}>Start 1 Minute Test</button>}
      {!isActive && <button onClick={() => handleStart(2)}>Start 2 Minute Test</button>}

      {/* End Screen: Display WPM, Accuracy, Reset Button */}
      {isDone &&
        <>
        <p>Time's up!</p>
        <p>WPM: {getWPM()}</p>
        <p>Accuracy: {getAccuracy()}%</p>
        <button onClick={handleReset}>Reset</button>
        </>}

      {/* Words to type */}
      {(isActive && seconds > 0) && <p className='toType'>{wordsToType.join(" ")}</p>}

      {/* Typing area: colored text (green/red) with optional textarea on top */}
      {(showInput || showLockedResult) && (
        <div className="typing-area-wrapper">
          <div
            className="typing-area-colored"
            aria-hidden={showInput}
          >
            {renderColoredText()}
          </div>
          {showInput && (
            <textarea
              className="typing-area-input"
              value={textareaValue}
              onChange={handleTextChange}
              autoFocus={true}
              rows={15}
              cols={90}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TypingTest;