"use client";

import { CircleChevronLeft, CircleChevronRight } from "lucide-react";
import Image from "next/image";
import { useState } from "react";

const images = [
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=500&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=500&auto=format",
];

const ImageSlideshow = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const onPreviousClick = () => {
    setActiveIndex(activeIndex === 0 ? images.length - 1 : activeIndex - 1);
  };

  const onNextClick = () => {
    setActiveIndex(activeIndex === images.length - 1 ? 0 : activeIndex + 1);
  };

  return (
    <div className="max-w-4xl mx-auto h-screen flex flex-col  items-center justify-center">
      <div className="flex items-center justify-center relative">
        {images.map((image, i) => (
          <div key={i} className={`${activeIndex !== i ? "hidden" : ""}`}>
            <Image
              width={400}
              height={400}
              src={image}
              alt={`image-${i}`}
              className="rounded-lg w-full h-[400] object-fit mask-origin-content"
            />
          </div>
        ))}

        <CircleChevronLeft
          className="absolute left-2 top-[50%] z-10 cursor-pointer"
          onClick={onPreviousClick}
          aria-label="button"
        />
        <CircleChevronRight
          className="absolute right-2 top-[50%] z-10 cursor-pointer"
          onClick={onNextClick}
          aria-label="button"
        />
      </div>
      <div className="flex items-center justify-center gap-2 pt-2">
        {images.map((_, index) => (
          <div
            key={index}
            className={`size-4 rounded-4xl cursor-pointer shadow-2xl ${activeIndex === index ? "bg-blue-500" : "bg-neutral-500"}`}
            onClick={() => setActiveIndex(index)}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;
