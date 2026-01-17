"use client";

import { useEffect, useRef, useState } from "react";

const text =
  "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum.";

const CHARACTERS_PER_SECOND = 10;
const speed = 1000 / CHARACTERS_PER_SECOND;

const TypingEffect = () => {
  const [index, setIndex] = useState(0);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (index < text.length) {
      timerRef.current = setTimeout(() => {
        setIndex((prev) => prev + 1);
      }, speed);
    }

    return () => {
      if (timerRef.current) {
        clearTimeout(timerRef.current);
      }
    };
  }, [index]);

  return (
    <div className="max-w-4xl mx-auto pt-20 h-screen">
      <div>
        {text.slice(0, index)}
        <span className="animate-pulse">|</span>
      </div>
    </div>
  );
};

export default TypingEffect;
