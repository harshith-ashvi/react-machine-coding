"use client";

import React from "react";
import { ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";
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
      <button
        className={cn(
          "flex w-full items-center justify-between py-1 px-2 cursor-pointer",
          className
        )}
        onClick={handleToggle}
        aria-expanded={isOpen}
      >
        <p className="font-bold text-lg">{title}</p>
        <ChevronDown
          className={cn(
            "size-4 ease-in-out transition-all duration-300",
            isOpen ? "rotate-z-180" : ""
          )}
        />
      </button>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="px-2"
          >
            {children}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Accordion;
