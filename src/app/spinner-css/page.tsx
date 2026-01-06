import { Loader } from "lucide-react";
import React from "react";

const SpinnerCss = () => {
  return (
    <div className="flex items-center justify-center gap-4 w-full min-h-screen">
      <Loader className="animate-spin" />
      <div className="w-[50] h-[50] border-4 border-[#f3f3f3] border-t-[blue] rounded-4xl animate-spin" />
    </div>
  );
};

export default SpinnerCss;
