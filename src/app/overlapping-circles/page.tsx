"use client";

import { cn } from "@/lib/utils";
import { MouseEvent, useState } from "react";

type CircleInterface = {
  x: number;
  y: number;
  radius: number;
  isOverlapping: boolean;
};

const checkIsOverlapping = (
  circles: CircleInterface[],
  newCircle: { x: number; y: number },
) => {
  for (let i = 0; i < circles.length; i++) {
    const dx = newCircle.x - circles[i].x;
    const dy = newCircle.y - circles[i].y;
    const distance = Math.sqrt(dx * dx + dy * dy);
    if (distance < 100) {
      return true;
    }
  }
  return false;
};

const Circle = ({ circle }: { circle: CircleInterface }) => {
  return (
    <div
      style={{ top: circle.y, left: circle.x }}
      className={cn(
        "w-[100] h-[100] rounded-full bg-red-400 absolute",
        circle.isOverlapping ? "bg-amber-400" : "",
      )}
    />
  );
};

const OverlappingCircle = () => {
  const [circles, setCircles] = useState<CircleInterface[]>([]);

  const handleOnClick = (e: MouseEvent<HTMLDivElement>) => {
    const { clientX, clientY } = e;
    setCircles((prev) => [
      ...prev,
      {
        x: clientX - 50,
        y: clientY - 50,
        radius: 50,
        isOverlapping: checkIsOverlapping(prev, {
          x: clientX - 50,
          y: clientY - 50,
        }),
      },
    ]);
  };

  return (
    <div
      className="w-full min-h-screen bg-white relative"
      onClick={handleOnClick}
    >
      {circles.map((circle, i) => (
        <Circle key={i} circle={circle} />
      ))}
    </div>
  );
};

export default OverlappingCircle;
