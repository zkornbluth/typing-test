/**
 * @fileoverview This file creates the TypingTest component that handles the typing speed test
 * @author Zachary Kornbluth <github.com/zkornbluth>
 */

import React, { useState, useEffect } from 'react';
import { generate } from 'random-words'; // JS package that generates random words

const TypingTest: React.FC = () => {
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
  }, [isActive, seconds, isDone]);

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
      const color =
        correct && char !== " "
          ? "rgb(22, 163, 74)" /* correct non-space: green */
          : !correct && char !== " "
            ? "rgb(185, 28, 28)" /* incorrect non-space: red */
            : undefined; /* spaces: use background only when incorrect */
      const backgroundColor =
        char === " " && !correct ? "rgb(185, 28, 28)" : undefined; /* incorrect space: red highlight */
      const style = { ...(color && { color }), ...(backgroundColor && { backgroundColor }) };
      return (
        <span key={i} style={Object.keys(style).length ? style : undefined}>
          {char === "\n" ? "\n" : char}
        </span>
      );
    });
  };

  const btnClass =
    'inline-flex items-center justify-center rounded-lg border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-slate-800 shadow-sm hover:bg-slate-50 hover:border-slate-400 dark:border-slate-600 dark:bg-slate-800 dark:text-slate-100 dark:hover:bg-slate-700 transition-colors';

  return (
    <div>
      {/* Countdown Timer - centered and larger */}
      {isActive && (
        <div className="flex justify-center my-6">
          <span className="text-5xl font-semibold tabular-nums text-slate-900 dark:text-slate-100">
            {formatTime(seconds)}
          </span>
        </div>
      )}

      {/* Start Buttons - side by side, centered */}
      {!isActive && (
        <div className="flex flex-wrap justify-center gap-3 my-6">
          <button type="button" onClick={() => handleStart(1)} className={btnClass}>
            Start 1 Minute Test
          </button>
          <button type="button" onClick={() => handleStart(2)} className={btnClass}>
            Start 2 Minute Test
          </button>
        </div>
      )}

      {/* End Screen: Display WPM, Accuracy, Reset Button - centered */}
      {isDone && (
        <div className="flex flex-col items-center gap-3 my-6 text-center">
          <p className="text-lg font-medium text-slate-700 dark:text-slate-300">Time's up!</p>
          <p className="text-slate-800 dark:text-slate-200">WPM: {getWPM()}</p>
          <p className="text-slate-800 dark:text-slate-200">Accuracy: {getAccuracy()}%</p>
          <button type="button" onClick={handleReset} className={btnClass}>
            Reset
          </button>
        </div>
      )}

      {/* Words to type - widened so no horizontal scroll */}
      {(isActive && seconds > 0) && (
        <p className="toType text-slate-700 dark:text-slate-300">{wordsToType.join(" ")}</p>
      )}

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
              rows={8}
              cols={90}
            />
          )}
        </div>
      )}
    </div>
  );
};

export default TypingTest;