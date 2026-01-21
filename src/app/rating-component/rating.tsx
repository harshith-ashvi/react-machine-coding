"use client";

import { cn } from "@/lib/utils";
import { Star } from "lucide-react";
import { useState } from "react";

interface RatingProps {
  maxRating: number;
  rating: number;
  disabled?: boolean;
  isChangeOnHover?: boolean;
  onChange: (rating: number) => void;
}

const Rating = ({
  maxRating = 5,
  rating = 0,
  disabled = false,
  isChangeOnHover = false,
  onChange,
}: RatingProps) => {
  const [hoverRating, setHoverRating] = useState(0);

  const handleOnMouseEnter = (rating: number) => {
    if (!disabled && isChangeOnHover) {
      setHoverRating(rating);
    }
  };

  const handleOnMouseLeave = () => {
    if (!disabled && isChangeOnHover) {
      setHoverRating(0);
    }
  };

  const handleChangeRating = (rating: number) => {
    if (!disabled) {
      onChange(rating);
    }
  };

  return (
    <div className="flex items-center gap-1">
      {[...Array(maxRating)].map((_, i) => {
        const starIndex = i + 1;
        return (
          <Star
            key={starIndex}
            className={cn(
              "cursor-pointer",
              hoverRating !== 0 && starIndex <= hoverRating
                ? "text-yellow-200"
                : hoverRating === 0 && starIndex <= rating
                  ? "text-yellow-400"
                  : "",
            )}
            onMouseEnter={() => handleOnMouseEnter(starIndex)}
            onMouseLeave={handleOnMouseLeave}
            onClick={() => handleChangeRating(starIndex)}
          />
        );
      })}
    </div>
  );
};

export default Rating;
