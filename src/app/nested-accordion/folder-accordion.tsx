"use client";

import { ChevronRight, Minus } from "lucide-react";
import { AnimatePresence, motion } from "motion/react";

import { cn } from "@/lib/utils";
import { NestedAccordionInterface } from "./page";

interface FolderAccordionProps {
  accordionId: number;
  openIndex: number[];
  title: string;
  className?: string;
  childAccordions: Record<string, NestedAccordionInterface[]>;
  handleToggle: (accordionId: number) => void;
}

const FolderAccordion = ({
  accordionId,
  openIndex,
  title,
  className,
  childAccordions,
  handleToggle,
}: FolderAccordionProps) => {
  const isOpen = openIndex.includes(accordionId);
  const childAccordion = childAccordions[`${accordionId}`] ?? [];

  return (
    <div className={cn("", className)}>
      <button
        className="flex items-center gap-2"
        onClick={() => handleToggle(accordionId)}
        aria-expanded={isOpen}
      >
        {childAccordion.length ? (
          <ChevronRight
            className={cn(
              "size-4 duration-300 transition-all cursor-pointer",
              isOpen ? "rotate-z-90" : ""
            )}
          />
        ) : (
          <Minus className="size-4" />
        )}
        <p className="font-medium text-lg">{title}</p>
      </button>
      <AnimatePresence>
        {Boolean(childAccordion.length && isOpen) && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {childAccordion.map((acc) => (
              <FolderAccordion
                key={acc.id}
                className="pl-1"
                accordionId={acc.id}
                openIndex={openIndex}
                title={acc.name}
                handleToggle={handleToggle}
                childAccordions={childAccordions}
              />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default FolderAccordion;
