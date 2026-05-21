import { useState, useEffect } from 'react';

export default function useTerminalTyping(
  codeBlocks: string[],
  typingSpeed: number = 20,
  switchDelay: number = 4000
) {
  const [currentBlockIndex, setCurrentBlockIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    let timer: any;
    const code = codeBlocks[currentBlockIndex];
    let currentCharIndex = 0;
    
    setDisplayedText('');
    setIsComplete(false);

    const type = () => {
      if (currentCharIndex < code.length) {
        // Dynamic typing delay based on character type (pacing/breathing effect)
        const char = code[currentCharIndex];
        let delay = typingSpeed;

        if (char === '\n') delay = typingSpeed * 3; // Pause on line breaks
        else if (char === ';' || char === ',') delay = typingSpeed * 2.5; // Pause on semicolons

        setDisplayedText((prev) => prev + char);
        currentCharIndex++;
        timer = setTimeout(type, delay);
      } else {
        setIsComplete(true);
        // Switch to the next code block after a delay
        timer = setTimeout(() => {
          setCurrentBlockIndex((prev) => (prev + 1) % codeBlocks.length);
        }, switchDelay);
      }
    };

    timer = setTimeout(type, 500);

    return () => clearTimeout(timer);
  }, [currentBlockIndex, codeBlocks, typingSpeed, switchDelay]);

  return { displayedText, currentBlockIndex, isComplete };
}
