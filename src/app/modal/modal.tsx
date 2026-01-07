"use client";

import React, { useEffect } from "react";
import { X } from "lucide-react";
import { motion } from "motion/react";
import { cn } from "@/lib/utils";

interface ModalProps {
  title: string;
  className?: string;
  children: React.ReactNode;
  onClose: () => void;
}

const Modal = ({ title, className, children, onClose }: ModalProps) => {
  useEffect(() => {
    const handleKeyPress = (e: Event) => {
      if (e instanceof KeyboardEvent && e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleKeyPress);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleKeyPress);
      document.body.style.overflow = "";
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div
      className="w-full h-full bg-black/50 backdrop-blur-sm fixed z-10 inset-0 flex items-center justify-center"
      onClick={onClose}
    >
      <motion.div
        className={cn(
          "rounded-lg w-[80%] h-[80%] border border-neutral-600 ",
          className
        )}
        initial={{ opacity: 0, width: 0, height: 0 }}
        exit={{ opacity: 0, width: 0, height: 0 }}
        animate={{ opacity: 1, height: "80%", width: "80%" }}
        transition={{ duration: 0.3, ease: "easeInOut" }}
        onClick={(e) => e.stopPropagation()}
        role="dialog"
        aria-modal="true"
      >
        <div className="flex items-center justify-between px-4 py-2 border-b border-neutral-800">
          <h4 className="font-bold text-2xl">{title}</h4>
          <button
            className="p-2 rounded-lg bg-neutral-400 cursor-pointer"
            onClick={onClose}
          >
            <X className="size-4 " />
          </button>
        </div>
        <>{children}</>
      </motion.div>
    </div>
  );
};

export default Modal;
