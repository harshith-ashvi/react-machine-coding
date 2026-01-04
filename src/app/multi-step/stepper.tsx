"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface StepperProps {
  steps: { title: string; content: string }[];
}

const Stepper = ({ steps }: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);
  return (
    <div>
      <div className="flex items-center justify-between relative">
        {steps.map((step, index) => {
          return (
            <div key={index} className="flex flex-col items-center gap-2 z-2">
              <p
                className={cn(
                  "size-4 bg-blue-600 text-white flex items-center justify-center rounded-4xl p-4",
                  currentStep === index ? "bg-blue-800" : ""
                )}
              >
                {index}
              </p>
              <p className="font-medium text-sm ">{step.title}</p>
            </div>
          );
        })}
        <div className="h-2 w-[98%] bg-blue-600 absolute inset-x-0 top-3 " />
      </div>
      <div className="flex flex-col items-center justify-center mt-8 gap-4">
        <h4 className="font-bold text-4xl">
          Step {currentStep + 1}: {steps[currentStep].title}
        </h4>
        <p className="font-bold text-center text-lg">
          {steps[currentStep].content}
        </p>
        <div className="flex items-center justify-between px-8 w-full">
          <button
            className="border border-neutral-400 rounded px-2 py-1 cursor-pointer hover:bg-neutral-800 disabled:border-neutral-700 disabled:hover:bg-neutral-950"
            disabled={currentStep === 0}
            onClick={() => setCurrentStep(currentStep - 1)}
          >
            Previous
          </button>
          <button
            className="border border-neutral-400 rounded px-2 py-1 cursor-pointer hover:bg-neutral-800 disabled:border-neutral-700 disabled:hover:bg-neutral-950"
            disabled={currentStep === steps.length - 1}
            onClick={() => setCurrentStep(currentStep + 1)}
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default Stepper;
