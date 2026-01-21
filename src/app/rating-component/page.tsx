"use client";

import { useState } from "react";
import Rating from "./rating";

const RatingComponent = () => {
  const [rating, setRating] = useState(0);

  const handleRatingUpdate = (rating: number) => setRating(rating);

  return (
    <div className="max-w-4xl mx-auto pt-20 min-h-screen">
      <div className="flex flex-col gap-2">
        <p>Rating 1</p>
        <Rating
          isChangeOnHover
          rating={rating}
          maxRating={5}
          onChange={handleRatingUpdate}
        />
      </div>

      <div className="flex flex-col gap-2 mt-10">
        <p>Rating 2 - Disabled</p>
        <Rating
          disabled
          isChangeOnHover
          rating={2}
          maxRating={5}
          onChange={() => {}}
        />
      </div>
    </div>
  );
};

export default RatingComponent;
