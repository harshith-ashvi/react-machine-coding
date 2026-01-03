"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { ChevronRight, Minus } from "lucide-react";

import { AccordionNode } from "./page";
import { cn } from "@/lib/utils";

interface AccordionItemProps {
  node: AccordionNode;
}

const AccordionItem = ({ node }: AccordionItemProps) => {
  const [isOpen, setIsOpen] = useState(false);

  const hasChildren = node.children.length > 0;

  return (
    <div className="pl-2">
      <button
        className="flex items-center gap-2"
        onClick={() => setIsOpen(!isOpen)}
        aria-expanded={isOpen}
      >
        {hasChildren ? (
          <ChevronRight
            className={cn(
              "size-4 duration-300 transition-all cursor-pointer",
              isOpen ? "rotate-z-90" : ""
            )}
          />
        ) : (
          <Minus className="size-4" />
        )}
        <p className="font-medium text-lg">{node.name}</p>
      </button>
      <AnimatePresence>
        {isOpen && hasChildren && (
          <motion.div
            initial={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            animate={{ opacity: 1, height: "auto", filter: "blur(0px)" }}
            exit={{ opacity: 0, height: 0, filter: "blur(10px)" }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            {node.children.map((acc) => (
              <AccordionItem key={acc.id} node={acc} />
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccordionItem;
