"use client";

import { cn } from "@/lib/utils";
import { useState } from "react";

interface StepperProps {
  steps: { title: string; content: string }[];
}

interface StepperIndicator {
  showTitle?: boolean;
  currentStep: number;
  steps: { title: string; content: string }[];
}

interface StepperNavigation {
  currentStep: number;
  totalSteps: number;
  onPreviousClick: () => void;
  onNextClick: () => void;
}

export const StepperIndicator = ({
  showTitle = false,
  currentStep,
  steps,
}: StepperIndicator) => {
  return (
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
            {showTitle && <p className="font-medium text-sm ">{step.title}</p>}
          </div>
        );
      })}
      <div className="w-full h-2 bg-blue-400 rounded-full absolute inset-x-0 top-3">
        <div
          className="h-full bg-blue-600 rounded-full transition-all duration-300"
          style={{
            width: `${(currentStep / (steps.length - 1)) * 100}%`,
          }}
        />
      </div>
    </div>
  );
};

const StepperNavigation = ({
  currentStep,
  totalSteps,
  onPreviousClick,
  onNextClick,
}: StepperNavigation) => {
  return (
    <div className="flex items-center justify-between px-8 w-full">
      <button
        className="border border-neutral-400 rounded px-2 py-1 cursor-pointer hover:bg-neutral-800 disabled:border-neutral-700 disabled:hover:bg-neutral-950"
        disabled={currentStep === 0}
        onClick={onPreviousClick}
      >
        Previous
      </button>
      <button
        className="border border-neutral-400 rounded px-2 py-1 cursor-pointer hover:bg-neutral-800 disabled:border-neutral-700 disabled:hover:bg-neutral-950"
        disabled={currentStep === totalSteps}
        onClick={onNextClick}
      >
        Next
      </button>
    </div>
  );
};

const Stepper = ({ steps }: StepperProps) => {
  const [currentStep, setCurrentStep] = useState(0);

  const onPreviousClick = () => setCurrentStep(currentStep - 1);

  const onNextClick = () => setCurrentStep(currentStep + 1);

  return (
    <div>
      <StepperIndicator currentStep={currentStep} steps={steps} />
      <div className="flex flex-col items-center justify-center mt-8 gap-4">
        <h4 className="font-bold text-4xl">
          Step {currentStep + 1}: {steps[currentStep].title}
        </h4>
        <p className="font-bold text-center text-lg">
          {steps[currentStep].content}
        </p>
        <StepperNavigation
          onNextClick={onNextClick}
          onPreviousClick={onPreviousClick}
          currentStep={currentStep}
          totalSteps={steps.length - 1}
        />
      </div>
    </div>
  );
};

export default Stepper;
