import React, { useState, useEffect } from 'react';
import '../styles/Loader.css';

const Loader = () => {
  const [text, setText] = useState('');
  const fullText = "Initializing Saurabh's Portfolio... [100%]";

  useEffect(() => {
    let i = 0;
    const timer = setInterval(() => {
      setText(fullText.substring(0, i));
      i++;
      if (i > fullText.length) {
        clearInterval(timer);
      }
    }, 30); // Speed of typing

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="terminal-loader-container">
      <div className="terminal-loader">
        <span className="terminal-prefix">&gt; </span>
        <span className="terminal-text">{text}</span>
        <span className="terminal-cursor">_</span>
      </div>
    </div>
  );
};

export default Loader;
