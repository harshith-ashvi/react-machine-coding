"use client";

import { useState } from "react";
import Image from "next/image";
import { motion } from "motion/react";
import { CircleChevronLeft, CircleChevronRight } from "lucide-react";

const images = [
  "https://images.unsplash.com/photo-1480074568708-e7b720bb3f09?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1449844908441-8829872d2607?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1452626212852-811d58933cae?q=80&w=1200&auto=format",
  "https://images.unsplash.com/photo-1572120360610-d971b9d7767c?q=80&w=1200&auto=format",
];

const ImageSlideshow = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handlePrev = () => {
    setActiveIndex((prev) => (prev === 0 ? images.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setActiveIndex((prev) => (prev === images.length - 1 ? 0 : prev + 1));
  };

  return (
    <div className="max-w-3xl mx-auto h-screen pt-40">
      <div className="relative overflow-hidden rounded-lg select-none">
        <motion.div
          className="flex"
          animate={{ x: `-${activeIndex * 100}%` }}
          transition={{ duration: 0.5, ease: "easeInOut" }}
        >
          {images.map((image, index) => (
            <div key={index} className="min-w-full h-[400] relative">
              <Image
                src={image}
                alt={`slide-${index}`}
                fill
                className="object-cover"
                draggable={false}
              />
            </div>
          ))}
        </motion.div>

        <CircleChevronLeft
          onClick={handlePrev}
          className="absolute left-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
          aria-label="Previous slide"
        />
        <CircleChevronRight
          onClick={handleNext}
          className="absolute right-3 top-1/2 -translate-y-1/2 cursor-pointer z-10"
          aria-label="Next slide"
        />
      </div>

      <div className="flex justify-center gap-2 mt-3">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveIndex(index)}
            className={`h-3 w-3 rounded-full cursor-pointer ${
              activeIndex === index ? "bg-blue-500" : "bg-neutral-400"
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default ImageSlideshow;
