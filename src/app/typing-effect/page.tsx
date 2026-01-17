"use client";

import { useEffect, useRef, useState } from "react";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const wordsPerMinutes = 10;

const TypingEffect = () => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<Timeout | null>(null);

  const generateText = () => {
    clearTimeout(timerRef.current);

    if (index < text.length) {
      const speed = 1000 / wordsPerMinutes;
      timerRef.current = setTimeout(() => {
        setIndex(index + 1);
      }, speed);
    } else {
      clearTimeout(timerRef.current);
    }
  };

  useEffect(() => {
    generateText();

    return () => {
      clearTimeout(timerRef.current);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [index]);

  return (
    <div className="max-w-4xl mx-auto pt-20 h-screen">
      <div>
        {text.slice(0, index)}
        <span>|</span>
      </div>
    </div>
  );
};

export default TypingEffect;
