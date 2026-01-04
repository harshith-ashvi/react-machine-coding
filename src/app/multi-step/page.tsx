"use client";

import Stepper from "./stepper";

const steps = [
  {
    title: "Start",
    content: "Initialize the process and set up required configurations.",
  },
  {
    title: "Validate",
    content: "Check all inputs and ensure the data is correct.",
  },
  {
    title: "Process",
    content: "Run the main logic and handle the core functionality.",
  },
  {
    title: "Finish",
    content: "Complete the process and clean up resources.",
  },
];

const MultiStep = () => {
  return (
    <div className="max-w-4xl mx-auto pt-8">
      <Stepper steps={steps} />
    </div>
  );
};

export default MultiStep;
