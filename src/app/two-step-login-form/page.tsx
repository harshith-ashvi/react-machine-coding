"use client";

import { useState } from "react";

const TwoStepLoginForm = () => {
  const [step, setStep] = useState(0);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleEmailNext = () => {
    if (email.length > 0) {
      setStep(1);
    }
  };

  return (
    <div className="max-w-6xl mx-auto h-screen flex items-center justify-center">
      <div className="flex flex-col items-center p-8 border border-neutral-400 rounded-lg w-full h-64 shadow-blue-500 shadow-[2px_2px_8px]">
        <h1 className="font-bold text-4xl text-shadow-blue-500  text-shadow-[2px_2px_4px]">
          Login
        </h1>
        <div className="flex items-center gap-4 flex-col pt-8">
          {step === 0 ? (
            <>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="Enter Email"
                className="pl-2 border border-neutral-600 rounded-sm invalid:border-red-500 invalid:text-red-700 focus:outline focus:outline-sky-300 focus:border-transparent focus:invalid:outline-red-500"
              />
              <button
                className="bg-blue-500 px-4 py-1 rounded-2xl shadow-2xl hover:bg-blue-600 cursor-pointer"
                onClick={handleEmailNext}
              >
                Next
              </button>
            </>
          ) : (
            <>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Enter password"
                className="pl-2 border border-neutral-600 rounded-sm invalid:border-red-500 invalid:text-red-700 focus:outline focus:outline-sky-300 focus:border-transparent focus:invalid:outline-red-500"
              />
              <div className="flex items-center gap-4">
                <button
                  className="cursor-pointer border border-neutral-400 px-4 py-1 rounded-2xl shadow-2xl"
                  onClick={() => setStep(0)}
                >
                  Back
                </button>
                <button className="bg-blue-500 px-4 py-1 rounded-2xl shadow-2xl hover:bg-blue-600 cursor-pointer">
                  Login
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default TwoStepLoginForm;
