// Typewriter.js
import React, { useState, useEffect } from 'react';
import './typewriter.css'; // Import CSS file for styling

const Typewriter = ({ text }) => {
  const [displayText, setDisplayText] = useState('');

  useEffect(() => {
    let currentIndex = 0;

    if(!text) return;
    const intervalId = setInterval(() => {
      if (currentIndex <= text.length) {
        setDisplayText(text.substring(0, currentIndex));
        currentIndex++;
      } else {
        clearInterval(intervalId);
      }
    }, 70); // Adjust typing speed here (milliseconds)

    return () => clearInterval(intervalId);
  }, [text]);

  return <span className="typewriter">{displayText}</span>;
};

export default Typewriter;
