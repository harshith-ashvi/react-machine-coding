"use client";

import React from "react";
import { ArrowDown } from "lucide-react";
import { cn } from "@/lib/utils";

interface AccordionInterface {
  children: React.ReactNode;
  isOpen?: boolean;
  title: string;
  className?: string;
  onChange?: (isExpanded: boolean) => void;
}

const Accordion = ({
  children,
  isOpen = false,
  title,
  className,
  onChange,
}: AccordionInterface) => {
  const handleToggle = () => {
    if (onChange) onChange(!isOpen);
  };

  return (
    <div className="w-full border-b border-neutral-500 py-1">
      <div
        className={cn(
          "flex items-center justify-between py-1 px-2 cursor-pointer",
          className
        )}
        onClick={handleToggle}
      >
        <p className="font-bold text-lg">{title}</p>
        <ArrowDown
          className={cn("size-4 duration-300", isOpen ? "rotate-x-180" : "")}
        />
      </div>
      {isOpen && <div className="px-2">{children}</div>}
    </div>
  );
};

export default Accordion;
